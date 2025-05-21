import { WebContainer, auth } from '@webcontainer/api';

let webcontainerInstance: WebContainer | null = null;

export async function getWebContainer() {
  if (!webcontainerInstance) {    
    auth.init({
      clientId: 'wc_api_jamie_maxwell_webster_d5d94a8735574195607c41e7c009f250',
      scope: '',
    });
    webcontainerInstance = await WebContainer.boot({coep: 'credentialless' });
  }
  return webcontainerInstance;
}

export async function mountFiles(files: Record<string, any>) {
  const instance = await getWebContainer();
  await instance.mount(files);
  return instance;
}

export async function runCommand(command: string, args: string[] = []) {
  const instance = await getWebContainer();
  return instance.spawn(command, args);
}