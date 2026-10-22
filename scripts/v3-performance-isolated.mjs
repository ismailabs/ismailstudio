import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import { mkdir, writeFile } from 'node:fs/promises';
import os from 'node:os';
import { createServer } from 'node:net';

const url=process.env.TEST_BASE_URL || 'http://127.0.0.1:4321/';
const phase=process.env.AUDIT_PHASE || 'v3-stable';
if(!/^[a-z0-9-]+$/.test(phase))throw Error('Invalid audit phase');
await mkdir('.local/lighthouse',{recursive:true});
const reports=[];
const availablePort=() => new Promise((resolve,reject)=>{
  const server=createServer();server.on('error',reject);server.listen(0,'127.0.0.1',()=>{
    const address=server.address();const port=address.port;server.close(error=>error?reject(error):resolve(port));
  });
});
const closeAuditBrowser = async chrome => {
  if(!chrome) return;
  try {
    // Edge can relaunch its process on Windows. Close the actual browser over
    // its owned CDP connection before asking the launcher to clean its profile.
    const version=await (await fetch(`http://127.0.0.1:${chrome.port}/json/version`,{signal:AbortSignal.timeout(5000)})).json();
    const socket=new WebSocket(version.webSocketDebuggerUrl);
    await new Promise((resolve,reject)=>{
      let requested=false;
      const timeout=setTimeout(()=>{socket.close();reject(Error('Audit browser close timed out'));},5000);
      socket.addEventListener('open',()=>{requested=true;socket.send(JSON.stringify({id:1,method:'Browser.close'}));});
      socket.addEventListener('close',()=>{clearTimeout(timeout);resolve();});
      socket.addEventListener('error',error=>{clearTimeout(timeout);if(requested)resolve();else reject(error);});
    });
  } finally { await chrome.kill(); }
};
for(const formFactor of ['mobile','desktop'])for(let run=1;run<=3;run++) {
  let complete=false;
  for(let attempt=1;attempt<=2&&!complete;attempt++) {
    // A new profile and automatically selected port for EVERY navigation avoids
    // attaching to a browser that is still closing on Windows. No reused session.
    let chrome;
    const freeMemory=os.freemem();
    try {
      // Edge does not consistently emit the dynamic-port log expected by
      // chrome-launcher. Select a free explicit port, never reuse the prior one.
      chrome=await launch({port:await availablePort(),chromePath:process.env.CHROME_PATH || (process.platform==='win32'?'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe':undefined),chromeFlags:['--headless=new','--no-sandbox'],logLevel:'silent'});
      const result=await lighthouse(url,{port:chrome.port,logLevel:'silent',output:'json',onlyCategories:['performance','accessibility','best-practices','seo']},formFactor==='desktop'?desktopConfig:undefined);
      const lhr=result.lhr;
      if(lhr.runtimeError)throw Error(lhr.runtimeError.message);
      await writeFile(`.local/lighthouse/${phase}-${formFactor}-${run}.json`,result.report);
      const report={phase,formFactor,run,attempt,url,fetchTime:lhr.fetchTime,lighthouseVersion:lhr.lighthouseVersion,environment:lhr.environment,settings:lhr.configSettings,hostMemoryBytes:{total:os.totalmem(),freeBeforeRun:freeMemory},launcher:'fresh profile and auto-selected port per navigation',scores:Object.fromEntries(Object.entries(lhr.categories).map(([key,value])=>[key,Math.round(value.score*100)])),metrics:Object.fromEntries(['largest-contentful-paint','cumulative-layout-shift','total-blocking-time','first-contentful-paint','speed-index'].map(key=>[key,lhr.audits[key]?.numericValue])),findings:Object.entries(lhr.audits).filter(([,a])=>a.score!==null&&a.score<1&&!['informative','notApplicable'].includes(a.scoreDisplayMode)).map(([id,a])=>({id,title:a.title,score:a.score,displayValue:a.displayValue}))};
      reports.push(report);await writeFile(`docs/redesign-v3/evidence/lighthouse-${phase}.json`,JSON.stringify(reports,null,2));
      console.log(JSON.stringify({formFactor,run,attempt,scores:report.scores,metrics:report.metrics}));complete=true;
    } catch(error) {
      await writeFile(`.local/lighthouse/${phase}-${formFactor}-${run}-failure-${attempt}.json`,JSON.stringify({at:new Date().toISOString(),url,formFactor,run,attempt,error:String(error)},null,2));
      if(attempt===2)throw error;
      console.log(JSON.stringify({formFactor,run,attempt,browserFailure:String(error),retry:'one fresh browser allowed; failed metrics are not counted'}));
    } finally { await closeAuditBrowser(chrome); }
  }
}
