import { useRightSidebar } from '@/contexts/TicketSideBarsProvider';
import { Avatar, Typography } from '@mui/material';
import React from 'react';
import PersistentDrawer, { rigthDrawerWidth } from '../PersistentDrawer';

type SideBarProps = {
  containerRef?: React.RefObject<HTMLElement | null>;
};

function UserSideBar({ containerRef }: SideBarProps) {
  const rightSideBar = useRightSidebar();
  return (
    <PersistentDrawer
      drawerWidth={rigthDrawerWidth}
      containerRef={containerRef}
      handleCloseDrawer={rightSideBar.close}
      anchor="right"
      isOpen={rightSideBar.isOpen}
    >
      <div
        className="h-full relative bg-slate-100h-full  w-full  bg-slate-100
                    shadow-lg flex flex-col items-center p-4 "
      >
        <div className="w-full flex items-start mt-6">
          {/* main user avatart */}
          <div className="w-full flex items-center max-h-[200px]">
            <Avatar alt="user.jpg" className="!size-[100px] !mx-auto" src="/images/user.jpg" />
          </div>
        </div>
        {/* user name & role */}
        <div className="flex flex-col items-center gap-y-1 w-full mt-4 ">
          <Typography variant="body1" fontWeight={500}>
            علیرضا نقویان
          </Typography>
          <Typography variant="caption" fontWeight={700} className="!text-gray-600 !text-base">
            نقش :کاربر
          </Typography>
        </div>
        {/* phone & account status */}
        <div className="w-full flex flex-col items-start gap-y-1 mt-6 pr-4">
          <Typography variant="body2" fontWeight={500}>
            موبایل: ۰۹۱۵۸۹۵۲۴۴۹
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            وضعیت:&nbsp;
            <span className="text font-semibold text-secondary-main">فعال</span>
          </Typography>
        </div>
      </div>
    </PersistentDrawer>
  );
}

export default UserSideBar;
