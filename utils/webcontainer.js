import { WebContainer } from '@webcontainer/api';

import projectFiles from '../projectFiles.json';

// Maintain a reference to the webcontainer instance
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

// Read file from WebContainer
export async function readFileFromWebContainer(path) {
  if (!webContainerInstance) {
    throw new Error('WebContainer not initialized');
  }
  
  const fileContent = await webContainerInstance.fs.readFile(path, 'utf-8');
  return fileContent;
}

// Write file to WebContainer
export async function writeIndexJS(path, content) {
  if (!webContainerInstance) {
    throw new Error('WebContainer not initialized');
  }
  
  await webContainerInstance.fs.writeFile(path, content);
  console.log(`File ${path} updated successfully`);
};