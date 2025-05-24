import { useState } from 'react';
import { StyledFilteredButton } from '../../styled';
import { TicketTypes } from '@/_types/tickets';

const ticketStatuses: TicketTypes.TicketStatusProp[] = [
  { label: 'در‌ انتظار پاسخ', value: 'pending' },
  { label: 'پاسخ داده شده', value: 'replied' },
];

const btnGroupStyles = {
  activeStyle: `
    !text-primary-dark 
    !border-common-white  
    !bg-common-white 
    !scale-[1.05] !z-50
    `,
  deActiveStyle: `
    !bg-transparent !border-common-white !text-common-black
    `,
};

const FilteredBtnGroup = () => {
  // states
  const [ticketStatus, setTicketStatus] = useState<TicketTypes.TicketStatusProp>({
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
    <div className="mt-4 flex w-[90%] items-center gap-x-1 rounded-sm shadow-xl">
      {/* // must override main btn mui theme */}

      {ticketStatuses.map((status) => {
        const activeStatus = status.value === ticketStatus.value;
        return (
          <StyledFilteredButton
            key={status.value}
            className={` ${
              status.value === 'pending'
                ? '!rounded-l-none !border-l-0'
                : '!rounded-r-none !border-r-0'} 
            ${
              activeStatus ? 
              btnGroupStyles.activeStyle :
               btnGroupStyles.deActiveStyle}

              !transform !will-change-transform`}
            onClick={status.value === 'replied' ? handleRepliedStatus : handlePendingStatus}
          >
            {status.label}
          </StyledFilteredButton>
        );
      })}
    </div>
  );
};

export default FilteredBtnGroup;
