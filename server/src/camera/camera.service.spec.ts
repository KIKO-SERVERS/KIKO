import { Test } from '@nestjs/testing';
import { CameraService } from './camera.service';
import { HttpService } from '@nestjs/axios';
import { WhisperService } from '../whisper/whisper.service';
import { of } from 'rxjs';

describe('CameraService', () => {
  let cameraService: CameraService;
  let mockHttpService: jest.Mocked<HttpService>;
  let mockWhisperService: jest.Mocked<WhisperService>;

  beforeEach(async () => {
    mockHttpService = {
      post: jest.fn(),
      get: jest.fn(),
    } as any;

    mockWhisperService = {
      transcribe: jest.fn().mockResolvedValue('test transcription'),
    } as any;

    const moduleRef = await Test.createTestingModule({
      providers: [
        CameraService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: WhisperService, useValue: mockWhisperService },
      ],
    }).compile();

    cameraService = moduleRef.get<CameraService>(CameraService);
  });

  it('should enable microphone', async () => {
    mockHttpService.post.mockReturnValue(of({ data: {} } as any));
    
    await cameraService.enableMicrophone('192.168.1.100', 'admin:password');
    
    expect(mockHttpService.post).toHaveBeenCalled();
    expect(mockWhisperService.transcribe).toHaveBeenCalled();
  });
});