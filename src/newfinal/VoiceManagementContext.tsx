'use client';
import { createContext, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export type VoiceInitialProps = {
  // setters & handlers
  cancelRecording: VoidFunction;
  stopRecording: VoidFunction;
  requestMicPermission: VoidFunction;
  handleUploadVoice: (voiceFile: File) => Promise<void>;
  startRecordProccess: VoidFunction;
  // init states
  isRecording: boolean;
  isMicPermGranted: boolean;
  isLoading: boolean;
  isUploadStarted: boolean;
  audioURL: string | null;
  timer: number;
  file: File | null;
};

const initialState: VoiceInitialProps = {
  // setters & handlers
  cancelRecording: () => {},
  startRecordProccess: () => {},
  stopRecording: () => {},
  requestMicPermission: () => {},
  handleUploadVoice: async () => {},
  // init states
  isRecording: false,
  isMicPermGranted: false,
  isLoading: false,
  isUploadStarted: false,
  audioURL: null,
  timer: 0,
  file: null,
};

export const VoiceManagementContext = createContext<VoiceInitialProps>(initialState);

function VoiceManagementProvider({ children }: { children: ReactNode }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadStarted, setIsUploadStarted] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [isMicPermGranted, setIsMicPermGranted] = useState(false);
  // refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef(timer);
  const isCancelledRef = useRef(false);
  const recordIntervalRef = useRef<NodeJS.Timeout | null>(null);

  //   effects
  // set record timer
  useEffect(() => {
    if (!isRecording || isLoading) {
      setTimer(0);

      if (recordIntervalRef.current) {
        clearInterval(recordIntervalRef.current);
        recordIntervalRef.current = null;
      }
      return;
    }

    recordIntervalRef.current = setInterval(() => {
      setTimer((prev) => {
        const next = prev + 1;
        timerRef.current = next;
        return next;
      });
    }, 1000);

    return () => {
      if (recordIntervalRef.current) {
        clearInterval(recordIntervalRef.current);
        recordIntervalRef.current = null;
      }
    };
  }, [isLoading, isRecording]);

  
  const checkMicPermission = useCallback(async () => {

    if (!navigator.permissions) {
      setIsMicPermGranted(false);
      return;
    }
    try {
      const status = await navigator.permissions.query({ name: 'microphone' });

      if (status.state === 'granted') {
        setIsMicPermGranted(true);
      } else {
        setIsMicPermGranted(false);
      }

      // if user change mic permisison manually
      status.onchange = () => {
        setIsMicPermGranted(status.state === 'granted');
      };
    } catch (error) {
      console.log('خطا در بررسی مجوز میکروفون ', error);
      setIsMicPermGranted(false);
    }
  }, []);

//   if user doesn't have mic permission
  const requestMicPermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      setIsMicPermGranted(true);

      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.log('کاربر مجوز را رد کرد', error);
      toast.error('برای ضبط باید دسترسی میکروفون را اجازه دهید.', { position: 'top-center' });
      setIsMicPermGranted(false);
    }
  }, []);


useEffect(()=>{
    checkMicPermission();
},[checkMicPermission])




  // cut mic record flow for all voice tracks
  const stopStream = useCallback((stream: MediaStream) => {
    stream.getTracks().forEach((track) => track.stop());
  }, []);

  // cancel record process (microphone behaviors)
  const cancelRecording = useCallback(() => {
    try {
      // is record start ?
      if (mediaRecorderRef.current) {
        const stream = mediaRecorderRef.current.stream;
        if (stream) stopStream(stream);
        mediaRecorderRef.current = null;
      }
    } catch (error) {
      console.log('Error canceling recording:', error);
    } finally {
      if (recordIntervalRef.current) {
        clearInterval(recordIntervalRef.current);
        recordIntervalRef.current = null;
      }
      isCancelledRef.current = true;
      audioChunksRef.current = [];
      setIsRecording(false);
      setIsLoading(false);
      setTimer(0);
      setAudioURL(null);
      setFile(null);
    }
  }, [stopStream]);

  // stop whole record process
  const stopRecording = useCallback(() => {
    try {
      if (mediaRecorderRef.current) {
        // stop current record
        mediaRecorderRef.current.stop();
        const stream = mediaRecorderRef.current.stream;
        if (stream) stopStream(stream);
        mediaRecorderRef.current = null;
      }
    } catch (error) {
      console.log('Error stopping recording:', error);
    } finally {
      setIsRecording(false);
      setIsLoading(false);
      setTimer(0);
    }
  }, [stopStream]);

  //   handle upload proces into server

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleUploadVoice = useCallback(async (voiceFile: File) => {
    setIsLoading(true);
    setIsUploadStarted(true);
    try {
      // mock request
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve(true);
        }, 2000),
      ).then(() => {
        setIsUploadStarted(false);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);

      toast.error('خطا هنگام آپلود صدای کاربر');

      setIsUploadStarted(false);

      setIsLoading(false);

    }
  }, []);

  // start record
  const startRecordProccess = useCallback(async () => {
    // check browser support
    if (!navigator.mediaDevices) {
      return toast.error('مرورگر شما از ضبط صدا پشتیبانی نمیکند', {
        position: 'top-center',
      });
    }
    try {
      setIsRecording(true);
      // set stream file type
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];
      isCancelledRef.current = false;

      // add audio chunks to audio refs
      recorder.ondataavailable = (event: BlobEvent) => {
        audioChunksRef.current.push(event.data);
      };

      recorder.onstop = async () => {
        if (isCancelledRef.current) return;

        if (audioChunksRef.current.length) {
          const audiBlob = new Blob(audioChunksRef.current, {
            type: 'audio/ogg',
          });

          const url = URL.createObjectURL(audiBlob);

          // make  a audio file to upload
          const file = new File([audiBlob], `voice-message-${Date.now()}.ogg`, {
            type: 'audio/ogg',
          });
          // handle voice file preview
          setAudioURL(url);
          // upload async process
          setFile(file);
          handleUploadVoice(file);
        }
        // empty chunk at the end
        audioChunksRef.current = [];
      };

      // start record
      recorder.start();
    } catch (error) {
      console.log(error);
      return toast.error(`دسترسی میکروفون مسدود است \n لطفا دسترسی میکروفون را فعال کنید`, {
        position: 'top-center',
      });
    }
  }, [handleUploadVoice]);

  const valueProps: VoiceInitialProps = {
    audioURL,
    file,
    isRecording,
    isUploadStarted,
    isMicPermGranted,
    timer,
    isLoading,
    cancelRecording,
    handleUploadVoice,
    startRecordProccess,
    requestMicPermission,
    stopRecording,
  };

  return (
    <VoiceManagementContext.Provider value={valueProps}>{children}</VoiceManagementContext.Provider>
  );
}

export default VoiceManagementProvider;
