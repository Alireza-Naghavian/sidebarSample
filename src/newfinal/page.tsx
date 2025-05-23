import ChatSection from '@/components/chatSection';
import TicketSideBarsProvider from '@/contexts/TicketSideBarsProvider';

function page() {
  return (
    <div className="flex items-start w-full relative">

        {/* sidebars context behaviors  */}
        <TicketSideBarsProvider>
          <ChatSection />
        </TicketSideBarsProvider>

    </div>
  );
}

export default page;
