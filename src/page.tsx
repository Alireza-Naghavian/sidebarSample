import ChatSection from '@/components/chatSection';
import TicketSideBarsProvider from '@/contexts/TicketSideBarsProvider';
import { Container } from '@mui/material';
import React from 'react';

function page() {
  return (
    <div className="flex items-start w-full relative">
      <div className="min-w-[280px] overflow-y-auto h-screen   bg-primary-main"></div>
      <Container maxWidth={'xl'}>
        {/* sidebars context behaviors  */}
        <TicketSideBarsProvider>
          <ChatSection />
        </TicketSideBarsProvider>
      </Container>
    </div>
  );
}

export default page;
