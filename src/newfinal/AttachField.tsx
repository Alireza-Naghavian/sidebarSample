import { useUploadMedia } from '@/contexts/UploadContext';
import { VoiceManagementContext } from '@/contexts/VoiceManagementContext';
import { TextField } from '@mui/material';
import { useContext } from 'react';
import { ImAttachment } from 'react-icons/im';

const AttachFileField = () => {
  const { handleSelectedFile, } = useUploadMedia();
  const { isRecording,file:voiceFile,audioURL } = useContext(VoiceManagementContext);

  const isVoiceSelected =Boolean(voiceFile && audioURL);

  return (
    <TextField
      slotProps={{
        input: {
          endAdornment: <ImAttachment />,
        },
        htmlInput: {
          onChange: handleSelectedFile,
          disabled: isRecording || isVoiceSelected,
          // ref: inputRef,
        },
      }}
      sx={{
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
      }}
      label={null}
      name="file"
      type="file"
    />
  );
};

export default AttachFileField;
