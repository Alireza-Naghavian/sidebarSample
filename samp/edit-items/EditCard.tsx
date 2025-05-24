import { Card, CardProps, IconButton, IconButtonProps } from '@mui/material';
import { ReactNode } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { IoCloseSharp } from 'react-icons/io5';
import { MdModeEdit } from 'react-icons/md';

interface Props {
  cardProps?: CardProps;
  submitButtonProps?: IconButtonProps;
  handleClickCancel: VoidFunction;
  handleClickEdit: VoidFunction;
  showButtons: boolean;
  children: ReactNode;
}

export default function EditCard({
  cardProps,
  submitButtonProps,
  handleClickCancel,
  handleClickEdit,
  showButtons,
  children,
}: Props) {
  return (
    <Card {...cardProps} sx={{ position: 'relative', pt: 5, ...cardProps?.sx }} className="group">
      <div className="z-1 opacity-1 visible absolute left-0 top-0 flex items-center gap-1 p-1 transition-[opacity] duration-300 group-hover:visible group-hover:opacity-100 lg:invisible lg:opacity-0">
        {showButtons ? (
          <>
            <IconButton size="small" color="error" onClick={handleClickCancel}>
              <IoCloseSharp />
            </IconButton>
            <IconButton size="small" color="success" {...submitButtonProps}>
              <FaCheck />
            </IconButton>
          </>
        ) : (
          <IconButton size="small" color="primary" onClick={handleClickEdit}>
            <MdModeEdit />
          </IconButton>
        )}
      </div>

      <div
        className={`transition-[filter] duration-300 ${!showButtons && 'group-hover:blur-[2px]'}`}
        onClick={(e) => {
          if (!showButtons) e.preventDefault();
        }}
      >
        {children}
      </div>
    </Card>
  );
}
