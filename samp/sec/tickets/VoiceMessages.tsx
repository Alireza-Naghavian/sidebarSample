import { UploadMediaContext } from '@/contexts/UploadContext';
import { VoiceManagementContext } from '@/contexts/VoiceManagmentContext';
import secondsToTimeString from '@/utils/secondTimeToString';
import { Fade } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useContext, useState } from 'react';
import { MdKeyboardVoice } from 'react-icons/md';

function VoiceMessages() {
  const {
    stopRecording,
    startRecordProccess,
    isRecording,
    timer,
    isMicPermGranted,
    requestMicPermission,
  } = useContext(VoiceManagementContext);

  const { file: mediaFile, previewUrl: mediaUrl } = useContext(UploadMediaContext);

  const isMediaSelected = Boolean(mediaUrl && mediaFile);

  // this is a flag for remove conflict between diferent  devices bahaviors
  const [pointerActive, setPointerActive] = useState(false);

  // use prevent default for unwanted zoom & scrolls bahaviors
  const handleClickDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!pointerActive) {
      setPointerActive(true);
      if (!isMicPermGranted) {
        requestMicPermission();
      } else {
        startRecordProccess();
      }
    }
  };

  const handleClickUp = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (pointerActive) {
      setPointerActive(false);
      if (isMicPermGranted && isRecording) {
        stopRecording();
      }
    }
  };

  return (
    <>
      <div className="relative flex w-full items-center gap-x-4">
        <Fade in={isRecording} unmountOnExit>
          <div
            className={`tr-300 left-0 top-0 mr-2 flex w-[190px] items-center rounded-sm bg-secondary-main px-2 py-1.5 ${isRecording ? 'visible opacity-100' : 'invisible opacity-0'} `}
          >
            <div className="relative flex size-4 items-center justify-center">
              <div className="size-4 rounded-full bg-error-main p-1">
                <PingRecordBadge />
              </div>
            </div>

            <Typography
              variant="body2"
              color="common.white"
              className="!mr-auto !mt-0.5"
              fontWeight={500}
            >
              Recording : &nbsp;
              <Typography variant="body1" component={'span'} color="common.white">
                {secondsToTimeString(timer)}
              </Typography>
            </Typography>
          </div>
        </Fade>

        <div className="relative py-1">
          <button
            className={`tr-300 relative z-50 flex size-10 cursor-pointer items-center justify-center rounded-full border-none outline-none
              ${isRecording ? 'bg-secondary-main p-1 text-common-white' : 'bg-transparent text-secondary-main'}`}
            onMouseUp={handleClickUp}
            onTouchEnd={handleClickUp}
            onMouseDown={handleClickDown}
            onTouchStart={handleClickDown}
            disabled={isMediaSelected}
          >
            <MdKeyboardVoice
              className={`tr-300 relative z-50 size-10 cursor-pointer rounded-full`}
            />
          </button>
          {/* ping active animation */}
          <div
            className={`${isRecording ? 'absolute top-0 z-10 size-10 animate-ping rounded-full bg-secondary-main p-1' : ''}`}
          />
        </div>
      </div>
    </>
  );
}

const PingRecordBadge =() => {
  return (
    <span className="size-.5 absolute inset-0 left-full z-50 inline-flex h-full
      w-full animate-ping cursor-pointer rounded-full bg-error-main opacity-75" />
  );
};

export default VoiceMessages;
