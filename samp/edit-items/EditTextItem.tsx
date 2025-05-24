import { IconButton, TextField, TextFieldProps, Typography, TypographyProps } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { MdModeEdit } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';

interface Props {
  handleSubmit: (value: string) => void;
  value: string;
  textFieldProps?: TextFieldProps;
  typoProps?: TypographyProps;
}

export default function EditTextItem({ handleSubmit, value, textFieldProps, typoProps }: Props) {
  const [showTextField, setShowTextField] = useState(false);
  const [newValue, setNewValue] = useState('');

  const handleClickEdit = () => {
    setShowTextField(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewValue(e.target.value);
  };

  const handleClickCancel = () => {
    setShowTextField(false);
    setNewValue('');
  };

  const handleClickSubmit = () => {
    handleSubmit(newValue);
    setShowTextField(false);
  };

  return (
    <div className="group flex h-[50px] w-full items-center gap-1 py-1 sm:w-auto">
      <div
        className={`transition-[filter] duration-300 ${!showTextField && 'group-hover:blur-[2px]'}`}
      >
        {showTextField ? (
          <TextField value={newValue} onChange={handleChange} {...textFieldProps} />
        ) : (
          <Typography
            variant="body2"
            color="text.disabled"
            {...typoProps}
            sx={{ userSelect: 'none', ...typoProps?.sx }}
          >
            {value ? value : 'xxxxxxxxxx'}
          </Typography>
        )}
      </div>
      <div className="opacity-1 visible flex items-center gap-1 transition-[opacity] duration-300 group-hover:visible group-hover:opacity-100 lg:invisible lg:opacity-0">
        {showTextField ? (
          <>
            <IconButton size="small" color="error" onClick={handleClickCancel}>
              <IoCloseSharp />
            </IconButton>
            <IconButton size="small" color="success" onClick={handleClickSubmit}>
              <FaCheck />
            </IconButton>
          </>
        ) : (
          <IconButton size="small" color="primary" onClick={handleClickEdit}>
            <MdModeEdit />
          </IconButton>
        )}
      </div>
    </div>
  );
}
