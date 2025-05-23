
import { ChildrenProp } from '@/_types/global.t';
import { Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import ProgressLabelBar from './ProgressLabelBar';

type AttachedDataProps = ChildrenProp & {
  handleCancelProcess: VoidFunction;
  dialogText: string;
  previewUrl?: string | File | null;
  isUploadStarted: boolean;
  file?: File | null;
  uploadProgress: number;
};

const AttachedData = (props: AttachedDataProps) => {
  const {
    handleCancelProcess,
    dialogText,
    previewUrl,
    isUploadStarted,
    file,
    uploadProgress,
    children,
  } = props;

  const [isShowModal, setIsShowModal] = useState(false);

  // handlers
  const handleOpenModal = () => setIsShowModal(true);

  const handleCloseModal = () => setIsShowModal(false);

  const isFileSelected = previewUrl && file;
  return (
    <>
      <Dialog
        open={isShowModal}
        onClose={handleCloseModal}
        slotProps={{
          paper: {
            sx: { width: '400px', py: '12px', px: '12px' },
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h5" component={'p'}>
            {dialogText}
          </Typography>
        </DialogTitle>

        <DialogActions>
          <Button
            variant="contained"
            sx={{ width: '100px', bgcolor: 'primary.light' }}
            onClick={handleCloseModal}
          >
            <Typography variant="body2">خیر</Typography>
          </Button>
          <Button
            variant="contained"
            sx={{ width: '100px', bgcolor: 'error.main' }}
            onClick={() => {
              if (handleCancelProcess) {
                handleCancelProcess();
              }
              handleCloseModal();
            }}
            autoFocus
          >
            <Typography variant="body2">بله</Typography>
          </Button>
        </DialogActions>
      </Dialog>

      <div
        className={`absolute left-0 right-0 z-50 mx-auto flex w-[70%] flex-col rounded-t-base bg-primary-lighter p-4 transition-transform duration-300 ${isFileSelected ? 'bottom-10 h-[65px] -translate-y-10' : 'bottom-0 translate-y-0'} `}
      >
        <div className="relative flex w-full items-start justify-between">
          <IoClose
            className="z-50 size-5 cursor-pointer rounded-full bg-common-white p-0.5 text-primary-main"
            onClick={handleOpenModal}
          />
          {/* upload progress bar */}
          <div className={`tr-300 w-fit transform`}>
            <ProgressLabelBar
              className={`tr-300 ${
                isUploadStarted ? 'visible block opacity-100' : 'invisible hidden opacity-0'
              }`}
              value={uploadProgress}
            />
          </div>
        </div>

        {previewUrl && (
          <>
            <div className="!absolute left-20 flex w-fit items-center justify-end gap-x-1">
              {children}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AttachedData;
