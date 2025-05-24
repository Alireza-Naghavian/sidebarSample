import {
  Button,
  ButtonProps,
  FormHelperText,
  styled
} from '@mui/material';
import { InputHTMLAttributes } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { IconType } from 'react-icons/lib';
import { MdDriveFolderUpload } from 'react-icons/md';

//----------------------------------------------------------------

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

//----------------------------------------------------------------

type Props = {
  name: string;
  buttonProps?: ButtonProps;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  InputIcon?:IconType,
  label?:string|null,

};

export default function RHFUploadFile(props: Props) {
  const { control } = useFormContext();

  const {
    name,
    buttonProps,
    inputProps,
    InputIcon = MdDriveFolderUpload,
    label = 'بارگزاری فایل',
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;

        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              width: 'fit-content',
              gap: 5,
            }}
          >
            <Button
              {...buttonProps}
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<InputIcon className="!mx-auto size-6" />}
            >
              <VisuallyHiddenInput {...field} type="file" {...inputProps} />
            </Button>
            {label}
            {checkError && (
              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {error.message}
              </FormHelperText>
            )}
          </div>
        );
      }}
    />
  );
}
