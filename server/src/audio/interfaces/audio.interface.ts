export interface AudioStream {
  stream: any; // Replace with actual stream type
  format: string;
  sampleRate: number;
}

export interface AudioStatus {
  enabled: boolean;
  lastActivity: Date;
  streamActive: boolean;
}