'use client';
import { ChildrenProps } from '@/_types/global';
import { LeftSidebarContext } from '@/contexts/LeftTicketSideBarContext';
import { RightSidebarContext } from '@/contexts/RightTicketSideBarContext';
import { leftTicketDrawerWidth, rightTicketDrawerWidth } from '@/theme/config';
import { Button, Typography } from '@mui/material';
import { useContext, useRef } from 'react';
import { FaBarsStaggered } from 'react-icons/fa6';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import LatestTicketSideBar from './sideBars/TicketsSideBar/LatestTicketSideBar';
import UserSideBar from './sideBars/UserSideBar/UserSideBar';
import TicketChatBox from './TicketChatBox/TicketChatBox';
function Ticket() {
  const leftSideBar = useContext(LeftSidebarContext);
  const rightSideBar = useContext(RightSidebarContext);
  const containerRightRef = useRef<HTMLDivElement>(null);

  // persistent chat box styles
  const marginLeft = leftSideBar?.isOpen ? leftTicketDrawerWidth : 0;
  const marginRight = rightSideBar?.isOpen ? rightTicketDrawerWidth : 0;

  return (
    <div className="relative h-screen max-h-[70vh] w-full rounded-md bg-common-white shadow-lg">
      {/* sticky header  */}
      <div className="flex w-full items-center justify-between rounded-t-md !bg-mainBG/75 p-5 shadow-md">
        <SideBtnTrigger onClick={rightSideBar?.toggle as VoidFunction}>
          <FaBarsStaggered className="size-10 text-common-black" />
        </SideBtnTrigger>

        {/* ticket subject  */}
        <div className="mx-auto w-full text-center">
          <Typography variant="h4" color="common.black">
            تیکت:مشکل در پنل کاربری
          </Typography>
        </div>

        <SideBtnTrigger onClick={leftSideBar?.toggle as VoidFunction}>
          <HiOutlineDotsHorizontal className="size-12 text-common-black" />
        </SideBtnTrigger>
      </div>

      {/* content */}
      <div className="relative mx-auto flex h-full min-h-[100%] w-full items-start overflow-x-hidden rounded-b-md">
        <div
          ref={containerRightRef}
          style={{ marginLeft, marginRight }}
          className="transition-margin static z-10 h-full w-full flex-1 overflow-auto bg-mainBG/25 duration-300"
        >
          {/* left side bar (latest ticket list ) */}
          <LatestTicketSideBar />
          {/* main ticket chat form */}
          <TicketChatBox />
          {/* right side bar */}
          <UserSideBar containerRef={containerRightRef} />
        </div>
      </div>
    </div>
  );
}

const SideBtnTrigger = ({ children, onClick }: ChildrenProps & { onClick: VoidFunction }) => {
  return (
    <Button
      className="!w-fit !shadow-none hover:!bg-transparent"
      onClick={onClick}
      sx={{ '&.MuiButton-root:hover': { bgcolor: 'transparent' } }}
    >
      {children}
    </Button>
  );
};

export default Ticket;
