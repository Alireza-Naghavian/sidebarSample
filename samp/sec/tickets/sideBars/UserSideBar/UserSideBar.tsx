import { RightSidebarContext } from '@/contexts/RightTicketSideBarContext';
import { rightTicketDrawerWidth } from '@/theme/config';
import { Avatar, Typography } from '@mui/material';
import React, { useContext } from 'react';
import PersistentDrawer from '../PersistentDrawer';

type SideBarProps = {
  containerRef?: React.RefObject<HTMLElement | null>;
};

function UserSideBar({ containerRef }: SideBarProps) {
  const rightSideBar = useContext(RightSidebarContext);
  return (
    <PersistentDrawer
      drawerWidth={rightTicketDrawerWidth}
      containerRef={containerRef}
      handleCloseDrawer={rightSideBar?.close}
      anchor="left"
      isOpen={rightSideBar?.isOpen as boolean}
    >
      <div className="bg-slate-100 relative flex h-full w-full flex-col items-center bg-primary-lighter/55 p-4 shadow-lg">
        <div className="mt-6 flex w-full items-start">
          {/* main user avatar */}
          <div className="flex max-h-[200px] w-full items-center">
            <Avatar
              alt="user.jpg"
              className="!mx-auto !size-[100px]"
              src={`
                https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit
                =crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
                `}
            />
          </div>
        </div>
        {/* user name & role */}
        <div className="mt-4 flex w-full flex-col items-center gap-y-1">
          <Typography variant="h4" component={'p'} fontWeight={500}>
            علیرضا نقویان
          </Typography>
        </div>
        {/* phone & account status */}
        <div className="mt-6 flex w-full flex-col items-start gap-y-1 pr-4">
          <Typography variant="h5" fontWeight={500}>
            موبایل: 091511111111
          </Typography>
          
          {/* <Typography variant="body2" fontWeight={500}>
            وضعیت:&nbsp;
            <span className="text font-semibold text-secondary-main">فعال</span>
          </Typography> */}
        </div>
      </div>
    </PersistentDrawer>
  );
}

export default UserSideBar;
