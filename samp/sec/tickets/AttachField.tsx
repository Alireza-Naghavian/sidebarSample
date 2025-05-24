import { RHFUploadFile } from '@/components/react-hook-form';
import { UploadMediaContext } from '@/contexts/UploadContext';
import { VoiceManagementContext } from '@/contexts/VoiceManagmentContext';
import { useContext } from 'react';
import { ImAttachment } from 'react-icons/im';

const AttachFileField = () => {
  const { handleSelectedFile } = useContext(UploadMediaContext);

  const { isRecording, file: voiceFile, audioURL } = useContext(VoiceManagementContext);

  // disable upload media when voice preveiw activated

  const isVoiceSelected = Boolean(voiceFile && audioURL);
  return (
    <RHFUploadFile
      inputProps={{
        onChange: handleSelectedFile,
        disabled: isRecording || isVoiceSelected,
      }}
      buttonProps={{
        sx: {
          borderRadius: '10px',
          boxShadow: 'none',
          ':hover': {
            boxShadow: 'none',
          },
          bgcolor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'secondary.main',
          width: '100%',
          height: '100%',
          padding: '6px',
        },
      }}
      label={null}
      name="file"
      InputIcon={ImAttachment}
    />
  );
};

export default AttachFileField;
