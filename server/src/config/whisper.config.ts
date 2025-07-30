export const whisperConfig = {
  modelPath:
    process.env.WHISPER_MODEL_PATH || '/whisper.cpp/models/ggml-base.bin',
  whisperPath: process.env.WHISPER_PATH || '/whisper.cpp',
};
