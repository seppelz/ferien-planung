const fs = require('fs-extra');
const path = require('path');

async function copyAppBuild() {
  const appBuildDir = path.join(__dirname, '../dist');
  const websiteAppDir = path.join(__dirname, '../website/out/app');

  try {
    // Ensure the target directory exists
    await fs.ensureDir(websiteAppDir);

    // Copy the app build to the website's output directory
    await fs.copy(appBuildDir, websiteAppDir, {
      overwrite: true,
    });

    console.log('Successfully copied app build to website output directory');
  } catch (error) {
    console.error('Error copying app build:', error);
    process.exit(1);
  }
}

copyAppBuild(); 