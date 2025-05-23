'use client';
import { ChildrenProp } from '@/_types/global.t';
import { useLeftSidebar, useRightSidebar } from '@/contexts/TicketSideBarsProvider';
import UploadMediaProvider from '@/contexts/UploadContext';
import { Button, Typography } from '@mui/material';
import { useRef } from 'react';
import { FaBarsStaggered } from 'react-icons/fa6';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { leftDrawerWidth, rigthDrawerWidth } from './sideBars/PersistentDrawer';
import LatestTicketSideBar from './sideBars/ticketsSideBar/LatestTicketSideBar';
import UserSideBar from './sideBars/userSideBar/UserSideBar';
import TicketChatBox from './TicketChatBox';
import VoiceManagementProvider from '@/contexts/VoiceManagementContext';

function ChatSection() {
  const leftSideBar = useLeftSidebar();
  const rightSideBar = useRightSidebar();
  const containerRightRef = useRef<HTMLDivElement>(null);

  const marginLeft = leftSideBar.isOpen ? leftDrawerWidth : 0;
  const marginRight = rightSideBar.isOpen ? rigthDrawerWidth : 0;
  return (
    <VoiceManagementProvider>
      <div className="relative h-screen max-h-[70vh] w-full rounded-md bg-common-white shadow-lg">
        {/* sticky header  */}
        <div className="flex w-full items-center justify-between rounded-t-md !bg-mainBG/75 p-5 shadow-md">
          <SideBtnTrigger onClick={rightSideBar.toggle}>
            <FaBarsStaggered className="size-10 text-common-black" />
          </SideBtnTrigger>

          {/* ticket subject  */}
          <div className="mx-auto w-full text-center">
            <Typography variant="h4" color="common.black">
              تیکت:مشکل در پنل کاربری
            </Typography>
          </div>

          <SideBtnTrigger onClick={leftSideBar.toggle}>
            <HiOutlineDotsHorizontal className="size-12 text-common-black" />
          </SideBtnTrigger>
        </div>

        {/* content */}
        <div
          className="relative mx-auto flex h-full min-h-[100%] w-full 
       items-start overflow-x-hidden rounded-b-md"
        >
          <div
            ref={containerRightRef}
            style={{ marginLeft, marginRight }}
            className="transition-margin static z-10 h-full w-full flex-1 overflow-auto bg-mainBG/25 duration-300"
          >
            {/* left side bar (latest ticket list ) */}
            <LatestTicketSideBar />
            {/* main ticket chat form */}
            <UploadMediaProvider>
              <TicketChatBox />
            </UploadMediaProvider>
            {/* right side bar */}
            <UserSideBar containerRef={containerRightRef} />
          </div>
        </div>
      </div>
    </VoiceManagementProvider>
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
