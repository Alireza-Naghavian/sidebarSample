'use client';
import { ticketDetailMessages } from '@/_mocks';
import TicketFormDetails from '../TicketFormDetails';
import ChatContentCard from '@/components/tickets/ChatContentCard';

function TicketChatBox() {
  // handlers

  return (
    <div className="relative h-full w-full overflow-x-hidden overflow-y-hidden bg-transparent">
      {/* backgournd chat img */}
      <div className="absolute left-0 right-[15%] top-20 h-[70%] w-[70%] bg-transparent bg-[url('/assets/images/vitaminet-logo.png')] bg-contain bg-center bg-no-repeat opacity-20"></div>

      {/* chat messages */}
      <div className="h-full max-h-[88%] min-h-[500px] w-full overflow-y-auto bg-mainBG/15 py-4 px-[8%] ">
        <div className="flex h-auto w-full flex-col child:my-4">
          {ticketDetailMessages.map((message) => {
            return <ChatContentCard {...message} key={message.id} createdAt={new Date()} />;
          })}
        </div>
      </div>

      {/* ticket form */}
      <TicketFormDetails />
    </div>
  );
}

export default TicketChatBox;
