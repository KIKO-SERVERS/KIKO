declare module 'mic' {
  interface MicInstance {
    getAudioStream(): NodeJS.ReadableStream;
    start(): void;
    stop(): void;
  }

  interface MicOptions {
    rate?: string;
    channels?: string;
    debug?: boolean;
    fileType?: string;
  }

  function mic(options?: MicOptions): MicInstance;

  export = mic;
}
