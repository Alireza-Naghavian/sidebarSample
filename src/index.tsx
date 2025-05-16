'use client';
import { useLeftSidebar, useRightSidebar } from '@/contexts/TicketSideBarsProvider';
import { Button, Typography } from '@mui/material';
import { useRef } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { FaBarsStaggered } from 'react-icons/fa6';
import LatestTicketSideBar from './sideBars/ticketsSideBar/LatestTicketSideBar';
import UserSideBar from './sideBars/userSideBar/UserSideBar';
import { ChildrenProp } from '@/_types/global.t';
import MainChatBox from './MainChatBox';
import { leftDrawerWidth, rigthDrawerWidth } from './sideBars/PersistentDrawer';

function ChatSection() {
  const leftSideBar = useLeftSidebar();
  const rightSideBar = useRightSidebar();
  const containerRightRef = useRef<HTMLDivElement>(null);

  const marginLeft = leftSideBar.isOpen ? leftDrawerWidth : 0;
  const marginRight = rightSideBar.isOpen ? rigthDrawerWidth : 0;
  return (
    <div
      className=" min-w-[900px] mt-10 w-full h-full min-h-[650px] 
                    overflow-y-auto relative rounded-xl shadow-lg "
    >
      {/* fixed  header */}
      <div
        className=" sticky top-0 left-0  right-0 z-50  w-full
                    rounded-t-xl shadow-md flex items-center 
                    justify-between bg-gray-200 px-4 py-3"
      >
        <SideBtnTrigger onClick={rightSideBar.toggle}>
          <FaBarsStaggered className="size-[40px] text-common-black" />
        </SideBtnTrigger>

        {/* ticket subject */}
        <div className="text-center ">
          <Typography variant="h5" color="common.black">
            موضوع تیکت :ضعف در پشتیبانی
          </Typography>
        </div>

        <SideBtnTrigger onClick={leftSideBar.toggle}>
          <BsThreeDots className="text-common-black size-10" />
        </SideBtnTrigger>
      </div>

      {/* min-h must be removed */}
      <div
        className="bg-red-50 w-full  overflow-x-hidden
                     mx-auto relative flex items-start h-full 
                    min-h-[580px] max-h-[580px]"
      >
        <div
          ref={containerRightRef}
          style={{ marginLeft, marginRight }}
          className="h-full  w-full flex-1 bg-primary-main
           p-4 overflow-auto transition-margin duration-300"
        >
          {/* right side bar */}
          <UserSideBar containerRef={containerRightRef} />
          {/* main content */}
          <MainChatBox />

          {/* left side bar */}
          <LatestTicketSideBar />
        </div>
      </div>
    </div>
  );
}

const SideBtnTrigger = ({ children, onClick }: ChildrenProp & { onClick: VoidFunction }) => {
  return (
    // must override main btn mui theme
    <Button onClick={onClick} sx={{ '&.MuiButton-root:hover': { bgcolor: 'transparent' } }}>
      {children}
    </Button>
  );
};

export default ChatSection;
