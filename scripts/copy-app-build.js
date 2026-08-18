import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(from, to);
    } else {
      fs.copyFileSync(from, to);
    }
  }
}

const appBuildDir = path.join(__dirname, '../dist');
const websiteAppDir = path.join(__dirname, '../website/out/app');

if (!fs.existsSync(appBuildDir)) {
  console.error('Planner dist/ is missing. Run npm run build first.');
  process.exit(1);
}

fs.rmSync(websiteAppDir, { recursive: true, force: true });
copyDir(appBuildDir, websiteAppDir);
console.log('Copied planner build to website/out/app');
