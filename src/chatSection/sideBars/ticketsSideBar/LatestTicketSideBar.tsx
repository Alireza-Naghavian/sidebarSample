import MuiLink from '@/components/links/MuiLink';
import { useLeftSidebar } from '@/contexts/TicketSideBarsProvider';
import { PRIMARY } from '@/theme/pallete';
import { Fab, FormControl, SelectChangeEvent, Tooltip } from '@mui/material';
import { useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { IoChevronDownOutline } from 'react-icons/io5';
import { StyledMenuItem, StyledSelect } from '../../styled';
import PersistentDrawer, { leftDrawerWidth } from '../PersistentDrawer';
import FilteredBtnGroup from './FilteredBtnGroup';
import LatestTicketCard from './LatestTicketCard';

function LatestTicketSideBar() {
  // hooks
  const leftSideBar = useLeftSidebar();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <PersistentDrawer
      drawerWidth={leftDrawerWidth}
      containerRef={containerRef}
      handleCloseDrawer={leftSideBar.close}
      anchor="left"
      isOpen={leftSideBar.isOpen}
    >
      <div
        className="h-full  w-full relative bg-slate-300
       shadow-lg flex flex-col items-center p-4 "
      >
        {/* filtered btn group */}
        {/* must use primary colors */}
        <FilteredBtnGroup />

        {/* sort tickets */}
        <div
          className="w-full relative 
                    flex items-center
                    justify-between  px-3 mt-6"
        >
          {/* push to add form */}
          <MuiLink href="/ticket/add">
            <Tooltip
              className="!will-change-transform"
              arrow
              slotProps={{
                arrow: {
                  sx: {
                    color: `${PRIMARY.dark}`,
                  },
                },
                tooltip: {
                  sx: {
                    willChange: 'transform',
                    fontSize: '13px',
                    bgcolor: 'primary.dark',
                  },
                },
              }}
              title="تیکت جدید"
              placement="top"
            >
              <Fab
                className="!bg-primary-main  hover:!bg-primary-dark"
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
        <div className="mt-4 py-2 w-full flex flex-col 
        items-center px-2.5 gap-y-4 h-full overflow-y-auto ">
         <LatestTicketCard/>
         <LatestTicketCard/>
         <LatestTicketCard/>
         <LatestTicketCard/>
         <LatestTicketCard/>
         <LatestTicketCard/>
        </div>
      </div>
    </PersistentDrawer>
  );
}

// must moved to types
type SortTicketProp = {
  label: string;
  value: 'latest' | 'earliest';
};

const sortTicketOptions: SortTicketProp[] = [
  { label: 'جدیدترین', value: 'latest' },
  { label: 'قدیمی ترین', value: 'earliest' },
];

const SortTicket = () => {
  // states
  const [sortTicket, setSortTicket] = useState<SortTicketProp>({
    label: 'جدیدترین',
    value: 'latest',
  });

  // handlers
  const handleSortTicket = (e: SelectChangeEvent<unknown>) => {
    setSortTicket({ value: e.target.value as string, label: '' } as SortTicketProp);
  };
  return (
    <div className="">
      <FormControl fullWidth>
        <StyledSelect
          IconComponent={IoChevronDownOutline}
          value={sortTicket.value}
          onChange={handleSortTicket}
          MenuProps={{
            slotProps: {
              paper: {
                sx: {
                  top: '260px !important',
                },
              },
            },
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
              <StyledMenuItem 
                disableRipple
                key={option.value} 
                value={option.value}>
                {option.label}
              </StyledMenuItem>
            );
          })}
        </StyledSelect>
      </FormControl>
    </div>
  );
};

export default LatestTicketSideBar;
