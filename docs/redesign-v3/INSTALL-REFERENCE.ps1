param([Parameter(Mandatory=$true)][string]$RepositoryPath)
$ErrorActionPreference = 'Stop'
$repo = (Resolve-Path -LiteralPath $RepositoryPath).Path
if (-not (Test-Path (Join-Path $repo 'package.json'))) { throw 'Target must be existing Ismail Studio project (package.json missing).' }
if (-not (Test-Path (Join-Path $repo '.git'))) { throw 'Target must be existing Git checkout (.git missing).' }
$source = Split-Path -Parent $MyInvocation.MyCommand.Path
$target = Join-Path $repo 'docs\redesign-v3'
if (Test-Path -LiteralPath $target) { throw ('Refusing to overwrite existing directory: ' + $target + '. Choose a fresh name or reconcile manually.') }
New-Item -ItemType Directory -Path $target | Out-Null
Copy-Item -Path (Join-Path $source '*') -Destination $target -Recurse -Force
Write-Host ('Installed reference files at: ' + $target)
Write-Host 'Next: open the repo in Codex Desktop; read docs/redesign-v3/START_HERE.md.'
