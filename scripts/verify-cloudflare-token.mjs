// This endpoint verifies validity; it does not enumerate or grant permissions.
const response = await fetch('https://api.cloudflare.com/client/v4/user/tokens/verify', { headers: { Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}` } });
const payload = await response.json();
if (!response.ok || !payload.success || payload.result?.status !== 'active') throw new Error(`Token verification failed: HTTP ${response.status}`);
console.log(JSON.stringify({ active: true, verifiedAt: new Date().toISOString(), note: 'DNS permissions are verified separately by the permitted read calls. No write probe is made.' }));
