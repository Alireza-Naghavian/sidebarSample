import { useUploadMedia } from '@/contexts/UploadContext';
import { VoiceManagementContext } from '@/contexts/VoiceManagementContext';
import { Fab, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuSendHorizontal } from 'react-icons/lu';
import AttachedData from './AttachedData';
import AttachFileField from './AttachField';
import VoicePlayer from './CustomAudio';
import VoiceMessages from './VoiceMessages';

function TicketFormDetails() {
  const [attachFieldKey, setAttachFieldKey] = useState(0);

  // hooks
  const methods = useForm({
    // resolver: yupResolver(AddProductFormSchema) as any,
    // defaultValues,
    mode: 'onSubmit',
  });
  const { handleSubmit } = methods;

  const {
    isRecording,
    file: VoiceFile,
    audioURL,
    isUploadStarted: isVoiceUploading,
    cancelRecording,
  } = useContext(VoiceManagementContext);

  const {
    submitUpload,
    file: mediaFile,
    previewUrl: MediaPreviewUrl,
    isUploadStart: isMediaUploading,
    uploadProgress,
    handleCancelMediaUpload,
  } = useUploadMedia();

  // user can only one file in preview mode
  const activePreviewFile = VoiceFile ?? mediaFile;

  const activePreviewUrl = VoiceFile ? audioURL : MediaPreviewUrl;

  const activeUploading = VoiceFile ? isVoiceUploading : isMediaUploading;

  // handler for cancel active preview
  const handleCancelPreview = () => {
    if (VoiceFile) {
      cancelRecording();
    } else if (mediaFile && handleCancelMediaUpload) {
      handleCancelMediaUpload();
      setAttachFieldKey((prev) => prev + 1);
    }
  };

  return (
    <form className="relative" onSubmit={handleSubmit(submitUpload)}>
      {/* attached data */}
      <AttachedData
        previewUrl={activePreviewUrl}
        file={activePreviewFile}
        isUploadStarted={activeUploading}
        handleCancelProcess={handleCancelPreview as VoidFunction}
        uploadProgress={uploadProgress}
        dialogText="آیا از لغو فرایند آپلود اطمینان دارید ؟"
      >
        <div className="!absolute left-20 flex w-fit items-center justify-end gap-x-1">
          {/* preview for other medias */}
          {activePreviewFile && !VoiceFile ? (
            <>
              <Typography
                variant="caption"
                fontWeight={500}
                className="!relative !ml-1 !line-clamp-1 max-w-[40%] !text-left !text-sm"
              >
                {mediaFile?.name}
              </Typography>
              <div className="size-[40px] rounded-full bg-grey-100 p-0.5">
                <Image
                  fill
                  src={
                    mediaFile?.type.startsWith('video')
                      ? '/assets/images/samples/videoSample.webp'
                      : (MediaPreviewUrl as string)
                  }
                  alt={mediaFile?.name as string}
                  className="!relative !h-full !w-full rounded-full object-cover"
                />
              </div>
            </>
          ) : (
            activePreviewFile &&
            VoiceFile && (
              <>
                <VoicePlayer isOutgoing src={audioURL ?? ''} />
              </>
            )
          )}
        </div>
      </AttachedData>

      <div className=" bottom-0 left-0 right-0 z-50 flex min-h-[85px] w-full items-center justify-center overflow-y-auto bg-common-white py-2 shadow-inner">
        {/* text field */}
        <div className="relative flex w-full items-center justify-center gap-x-2">
          {/* submit btn handler */}
          <Fab type="submit" size="small" className="!bg-secondary-main">
            <LuSendHorizontal className="size-6 text-common-white" />
          </Fab>

          <div className="w-[80%] rounded-base bg-grey-300">
            <TextField
              multiline
              maxRows={3}
              slotProps={{
                input: {
                  // avoid typing message during record
                  readOnly: isRecording,

                  endAdornment: (
                    <div className=" ml-[-14px] flex items-center gap-x-1">
                      <VoiceMessages />
                      <AttachFileField key={attachFieldKey} />
                    </div>
                  ),
                },
                htmlInput: {
                  sx: {
                    height: '30px',
                    pr: '4px',
                  },
                },
              }}
              name="ticketBody"
              placeholder="پیام خود را بنویسید"
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default TicketFormDetails;
