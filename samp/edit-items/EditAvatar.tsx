import { Avatar, AvatarProps, ButtonBase, ButtonBaseProps, IconButton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { IoCloseSharp } from 'react-icons/io5';
import { MdModeEdit } from 'react-icons/md';
import GradientCircularProgress from '../GradientCircularProgress';
import { EditAvatarState } from '@/_types/editAvatar';
import toast from 'react-hot-toast';

interface Props {
  avatarProps?: AvatarProps;
  buttonProps?: ButtonBaseProps;
  handleSubmit: (imageUrl: string) => void;
  defaultUrl?: string;
  disableFilter?: boolean;
  reset?: boolean;
  handleReset?: VoidFunction;
}

export default function EditAvatar({
  avatarProps,
  buttonProps,
  handleSubmit,
  defaultUrl,
  disableFilter,
  reset,
  handleReset,
}: Props) {
  //hooks
  const imageInputRef = useRef<HTMLInputElement>(null);

  //states
  const [avatar, setAvatar] = useState<EditAvatarState>({
    loading: false,
    progress: 0,
    isProgress: false,
    url: defaultUrl ? defaultUrl : '',
    value: null,
  });
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(avatar.url);
  const [showButtons, setShowButtons] = useState(false);

  //effects
  useEffect(() => {
    if (avatar.url) handleSubmit(avatar.url);
  }, [avatar.url]);

  useEffect(() => {
    if (reset) {
      setShowButtons(false);
      setAvatar({ value: null, isProgress: false, loading: false, progress: 0, url: '' });
      setAvatarSrc(undefined);
      handleReset && handleReset();
    }
  }, [reset]);

  useEffect(() => {
    if (avatar.progress >= 100) {
      toast.success('تصویر با موفقیت بارگذاری شد', {
        position: 'bottom-right',
      });
    }
  }, [avatar.progress]);

  //handlers
  const handleClickCancel = () => {
    setShowButtons(false);
    setAvatar({ ...avatar, value: null });
    setAvatarSrc(avatar.url);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (avatar.isProgress) return;

    const file = event.target.files?.[0];
    if (file) {
      setAvatar({ ...avatar, value: file });
      setShowButtons(true);

      const reader = new FileReader();
      reader.onload = () => {
        setAvatarSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickSubmit = () => {
    if (avatar.isProgress) return;

    setAvatar((prev) => ({
      ...prev,
      loading: true,
      isProgress: true,
      url: '',
    }));

    const handleUpload = async () => {
      const data = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 2000);
      });

      if (data) {
        const progressInterval = setInterval(() => {
          setAvatar((prev) => {
            if (prev.progress >= 100) {
              clearInterval(progressInterval);

              return {
                loading: false,
                progress: 0,
                isProgress: false,
                value: null,
                url: avatarSrc as string,
              };
            }

            return {
              ...prev,
              progress: prev.progress + 10,
            };
          });
        }, 700);
      } else {
        toast.error('بارگزاری تصویر با خطا مواجه شد', {
          position: 'bottom-right',
        });
      }
    };
    handleUpload();

    setShowButtons(false);
  };

  return (
    <div className="group relative flex w-full flex-col items-center gap-1 py-1 sm:w-auto">
      <div
        className={`transition-[filter] duration-300 ${!showButtons && 'group-hover:blur-[2px]'} ${disableFilter && 'group-hover:!blur-[0px]'}`}
      >
        <ButtonBase
          ref={imageInputRef}
          component="label"
          role={undefined}
          tabIndex={-1}
          aria-label="Avatar image"
          disableRipple
          disabled={avatar.isProgress}
          {...buttonProps}
          sx={{
            '&:has(:focus-visible)': {
              outline: '2px solid',
              outlineOffset: '2px',
            },
            borderRadius: '50%',
            position: 'relative',
            ...buttonProps?.sx,
          }}
        >
          <Avatar
            alt="Upload new avatar"
            src={avatarSrc}
            sx={{ width: 1, height: 1, ...avatarProps?.sx }}
            {...avatarProps}
          />
          {avatar.isProgress ? (
            <GradientCircularProgress
              variant={avatar.progress ? 'determinate' : 'indeterminate'}
              value={avatar.progress}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100% !important',
                height: '100% !important',
                zIndex: 1,
              }}
            />
          ) : null}
          <input
            disabled={avatar.isProgress}
            type="file"
            accept="image/*"
            style={{
              border: 0,
              clipPath: 'rect(0 0 0 0)',
              visibility: 'hidden',
              height: '1px',
              margin: '-1px',
              overflow: 'hidden',
              padding: 0,
              position: 'absolute',
              whiteSpace: 'nowrap',
              width: '1px',
            }}
            onChange={handleAvatarChange}
          />
        </ButtonBase>
      </div>
      <div className="flex items-center gap-1">
        {showButtons && (
          <>
            <IconButton size="small" color="error" onClick={handleClickCancel}>
              <IoCloseSharp />
            </IconButton>
            <IconButton size="small" color="success" onClick={handleClickSubmit}>
              <FaCheck />
            </IconButton>
          </>
        )}
        {!showButtons && (
          <IconButton
            size="small"
            color="primary"
            onClick={() => imageInputRef.current?.click()}
            disabled={avatar.isProgress}
            sx={{
              visibility: 'visible',
              zIndex: 1,
              opacity: 1,
              transition: 'opacity 300ms',
            }}
            className="group-hover:!visible group-hover:!opacity-100 lg:!invisible lg:!opacity-0"
          >
            <MdModeEdit className="h-full w-full" />
          </IconButton>
        )}
      </div>
    </div>
  );
}
