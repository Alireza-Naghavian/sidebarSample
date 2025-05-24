import { LatestTicketList, sortTicketOptions } from '@/_mocks';
import { TicketTypes } from '@/_types/tickets';
import MuiLink from '@/components/Link';
import LatestTicketCard from '@/components/tickets/LatestTicketCard';
import { LeftSidebarContext } from '@/contexts/LeftTicketSideBarContext';
import { PATH_MAIN } from '@/paths';
import { leftTicketDrawerWidth } from '@/theme/config';
import { Fab, FormControl, SelectChangeEvent, Tooltip } from '@mui/material';
import { useContext, useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { IoChevronDownOutline } from 'react-icons/io5';
import { StyledMenuItem, StyledSelect } from '../../styled';
import PersistentDrawer from '../PersistentDrawer';
import FilteredBtnGroup from './FilteredBtnGroup';

function LatestTicketSideBar() {
  // hooks
  const leftSideBar = useContext(LeftSidebarContext);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <PersistentDrawer
      drawerWidth={leftTicketDrawerWidth}
      containerRef={containerRef}
      handleCloseDrawer={leftSideBar?.close}
      anchor="right"
      isOpen={leftSideBar?.isOpen as boolean}
    >
      <div className="relative flex h-full w-full flex-col items-center bg-primary-lighter/55 p-4 shadow-lg">
        {/* filtered btn group */}
        <FilteredBtnGroup />

        {/* sort tickets */}
        <div className="relative mt-6 flex w-full items-center justify-between px-3">
          {/* navigate to add ticket form */}
          <MuiLink href={PATH_MAIN.tickets.add}>
            <Tooltip
              className="!will-change-transform"
              arrow
              slotProps={{
                arrow: {
                  sx: {
                    color: `secondary.main`,
                  },
                },
                tooltip: {
                  sx: {
                    willChange: 'transform',
                    fontSize: '13px',
                    bgcolor: 'secondary.main',
                  },
                },
              }}
              title="تیکت جدید"
              placement="top"
            >
              <Fab
                className="!bg-secondary-main hover:!bg-secondary-dark"
                size="small"
                aria-label="add"
              >
                <FaPlus className="size-4 text-common-white" />
              </Fab>
            </Tooltip>
          </MuiLink>

          {/* sort select component */}
          <SortTicket />
        </div>
        {/* ticket list */}
        <div className="mt-4 flex h-full w-full flex-col items-center gap-y-4 overflow-y-auto px-2.5 py-2">
          {LatestTicketList.map((item) => {
            return <LatestTicketCard key={item.id} {...item} />;
          })}
        </div>
      </div>
    </PersistentDrawer>
  );
}

export default LatestTicketSideBar;




const SortTicket = () => {
  // states
  const [sortTicket, setSortTicket] = useState<TicketTypes.SortTicketProp>({
    label: 'جدیدترین',
    value: 'latest',
  });

  // handlers
  const handleSortTicket = (e: SelectChangeEvent<unknown>) => {
    setSortTicket({ value: e.target.value as string, label: '' } as TicketTypes.SortTicketProp);
  };
  return (
    <div className="">
      <FormControl fullWidth>
        <StyledSelect
          IconComponent={IoChevronDownOutline}
          value={sortTicket.value}
          onChange={handleSortTicket}
          MenuProps={{
            MenuListProps: {
              sx: {
                paddingTop: 0,
                paddingBottom: 0,
              },
            },
          }}
        >
          {sortTicketOptions.map((option) => {
            return (
              <StyledMenuItem disableRipple key={option.value} value={option.value}>
                {option.label}
              </StyledMenuItem>
            );
          })}
        </StyledSelect>
      </FormControl>
    </div>
  );
};
