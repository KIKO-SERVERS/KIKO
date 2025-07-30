export interface CameraConfig {
    ip: string;
    port: number;
    username: string;
    password: string;
    protocol: 'http' | 'https';
  }
  
  export interface Stream {
    audio: any; // Replace with actual audio stream type
    video: any; // Replace with actual video stream type
  }