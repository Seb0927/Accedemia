import { WebContainer } from '@webcontainer/api';

import projectFiles from '../projectFiles.json';

let webContainerInstance = null;

export async function setupWebContainer() {
  webContainerInstance = await WebContainer.boot();

  await webContainerInstance.mount(projectFiles)
  
  const installProcess = await webContainerInstance.spawn('npm', ['install']);

  const installExitCode = await installProcess.exit;

  if (installExitCode !== 0) {
    throw new Error('Unable to run npm install');
  }

  await webContainerInstance.spawn('npm', ['run', 'dev'])

  const serverReady = new Promise((resolve) => {
    webContainerInstance.on('server-ready', (port, url) => {
      resolve(url);
    });
  });

  const url = await serverReady;
  return url;
}

/** @param {string} content*/

export async function writeIndexJS(content) {
  console.log(webContainerInstance)
  await webContainerInstance.fs.writeFile('/src/components/background/Background.jsx', content);
};

