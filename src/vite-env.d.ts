/// <reference types="vite/client" />

declare module '@webcontainer/api' {
  export class WebContainer {
    static boot(): Promise<WebContainer>;
    mount(files: any): Promise<void>;
    spawn(command: string, args?: string[]): Promise<SpawnProcess>;
    on(event: string, callback: (port: number, url: string) => void): void;
  }

  export interface SpawnProcess {
    output: ReadableStream;
    exit: Promise<number>;
  }
}