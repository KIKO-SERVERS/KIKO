import { Readable } from 'stream';

export interface AudioStream {
  stream: Readable;
  metadata: {
    codec: string;
    sampleRate: number;
    channels: number;
  };
}

export interface AudioStatus {
  enabled: boolean;
  lastActivity: Date;
  streamActive: boolean;
}
