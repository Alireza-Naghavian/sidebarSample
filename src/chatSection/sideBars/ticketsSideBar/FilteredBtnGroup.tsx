import { Button } from '@mui/material';
import { useState } from 'react';

export type TicketStatusProp = {
  label: string;
  value: 'pending' | 'replied' | 'all';
};

const ticktStatuses: TicketStatusProp[] = [
  { label: 'در‌انتظار پاسخ', value: 'pending' },
  { label: 'پاسخ داده شده', value: 'replied' },
];

const btnGroupStyles = {
  activeStyle: `
  !text-primary-dark !border-common-white   !bg-common-white 
    !scale-[1.05] !z-50
  `,
  deActiveStyle: `
  !bg-transparent !border-primary-dark !text-common-black
  `,

  default: ` !transition-all !duration-500  w-full
    !px-3 !py-2 !rounded-lg !text-nowrap !border  !transform`,
};

const FilteredBtnGroup = () => {
  // states
  const [ticketStatus, setTicketStatus] = useState<TicketStatusProp>({
    label: '',
    value: 'replied',
  });

  const handleRepliedStatus = () => {
    setTicketStatus({ value: 'replied', label: 'پاسخ داده شده' });
  };

  const handlePendingStatus = () => {
    setTicketStatus({ value: 'pending', label: 'در‌انتظار پاسخ' });
  };

  return (
    <div className="mt-4 flex items-center shadow-xl gap-x-1 w-[90%]">
      {/* // must override main btn mui theme */}

      {ticktStatuses.map((status) => {
        const activeStatus = status.value === ticketStatus.value;
        return (
          <Button
            key={status.value}
            variant="outlined"
            className={`
           ${
             status.value === 'pending'
               ? '!rounded-l-none !border-l-0 '
               : '!rounded-r-none !border-r-0 '
           } 

          ${btnGroupStyles.default}
          ${activeStatus ? btnGroupStyles.activeStyle : btnGroupStyles.deActiveStyle}
          `}
            onClick={status.value === 'replied' ? handleRepliedStatus : handlePendingStatus}
          >
            {status.label}
          </Button>
        );
      })}
    </div>
  );
};

export default FilteredBtnGroup;
