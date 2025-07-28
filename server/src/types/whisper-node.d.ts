declare module 'whisper-node' {
  interface WhisperOptions {
    modelName?: string;
    modelPath?: string;
    whisperOptions?: {
      language?: string;
      gen_file_txt?: boolean;
      gen_file_subtitle?: boolean;
      gen_file_vtt?: boolean;
      word_timestamps?: boolean;
      timestamp_size?: number;
      print_progress?: boolean;
    };
  }

  interface TranscriptResult {
    text: string;

    [key: string]: any;
  }

  function whisper(
    filePath: string,
    options?: WhisperOptions,
  ): Promise<TranscriptResult>;

  export default whisper;
}
