import FormProvider from '@/components/react-hook-form/FormProvider';
import { UploadMediaContext } from '@/contexts/UploadContext';
import { VoiceManagementContext } from '@/contexts/VoiceManagmentContext';
import { Fab, Typography } from '@mui/material';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuSendHorizontal } from 'react-icons/lu';
import AttachedData from './AttachedData';
import AttachFileField from './AttachField';
import { StyledRHFTextField } from './styled';
import VoiceMessages from './VoiceMessages';
import VoicePlayer from './VoicePlayer';

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
    cancelRecording,
    handleUploadVoice,
    isRecording,
    file: VoiceFile,
    audioURL,
    isUploadStarted: isVoiceUploading,
    isLoading:isVoiceLoading,
    uploadProgress:uploadVoiceProgress
  } = useContext(VoiceManagementContext);

  const {
    submitUpload,
    file: mediaFile,
    previewUrl: MediaPreviewUrl,
    isUploadStart: isMediaUploading,
    uploadProgress,
    isUploadLoading,
    handleCancelMediaUpload,
  } = useContext(UploadMediaContext);



  // user can only one file in preview mode
  const choosenActivePreviewFile = VoiceFile ?? mediaFile;

  const choosenActivePreviewUrl = VoiceFile ? audioURL : MediaPreviewUrl;

  const choosenActiveUploading = VoiceFile ? isVoiceUploading : isMediaUploading;

  const choosenActiveUploadLoading = VoiceFile ? isVoiceLoading : isUploadLoading

  const choosenUploadProgress = VoiceFile ? uploadVoiceProgress : uploadProgress;

  console.log(VoiceFile)
  // Wrap the voice upload handler to match the expected signature
  const wrappedVoiceUploadHandler = async () => {

    if (VoiceFile) {
      await handleUploadVoice(VoiceFile);
    }
  };

  const choosenSubmitformHanlder = VoiceFile ? wrappedVoiceUploadHandler : submitUpload;


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
    <FormProvider onSubmit={handleSubmit(choosenSubmitformHanlder)} methods={methods}>
      {/* shared attached data voice / media */}
      <AttachedData
        isUploadLoading={choosenActiveUploadLoading}
        previewUrl={choosenActivePreviewUrl}
        file={choosenActivePreviewFile}
        isUploadStarted={choosenActiveUploading}
        handleCancelProcess={handleCancelPreview as VoidFunction}
        uploadProgress={choosenUploadProgress}
        dialogText="آیا از لغو فرایند آپلود اطمینان دارید ؟"
      >
        <div className="!absolute left-20 flex w-full items-center justify-end gap-x-1">
          {choosenActivePreviewFile && !VoiceFile ? (
            <>
              {/* preview for other medias */}
              <div className="flex w-full flex-col items-end">
                <Typography
                  variant="caption"
                  fontWeight={500}
                  className="!relative !ml-1 !line-clamp-1 max-w-[20%] !text-left !text-sm"
                >
                  {mediaFile?.name}
                </Typography>
                <Typography
                  variant="caption"
                  fontWeight={600}
                  className="!relative !ml-2 !line-clamp-1 max-w-[20%] !text-left !text-xs"
                >
                  200 کیلوبایت
                </Typography>
              </div>
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
            <>
              <VoicePlayer isOutGoing src={audioURL as string} />
            </>
          )}
        </div>
      </AttachedData>

      <div className="absolute bottom-0 left-0 right-0 z-50 flex min-h-[85px] w-full 
      items-center justify-center overflow-y-auto bg-common-white py-2 shadow-inner">
        {/* text field */}
        <div className="relative flex w-full items-center justify-center gap-x-2">
          {/* submit btn handler */}
          <Fab type="submit" size="small" className="!bg-secondary-main">
            <LuSendHorizontal className="size-6 text-common-white" />
          </Fab>

          <div className="w-[80%] rounded-base bg-grey-300">
            <StyledRHFTextField
              multiline
              maxRows={3}
              slotProps={{
                input: {
                  // avoid typing message during record
                  readOnly: isRecording,
                  endAdornment: (
                    <div className="ml-[-14px] flex items-center gap-x-1">
                      <VoiceMessages key={attachVoiceKey} />
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
    </FormProvider>
  );
}

export default TicketFormDetails;
