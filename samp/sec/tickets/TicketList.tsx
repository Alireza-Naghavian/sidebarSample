import Typography from '@mui/material/Typography';
import TicketTable from './Table/TicketTable';

function TicketList() {
  return (
    <div className="relative flex h-full w-full flex-col items-start rounded-md
     bg-common-white p-5 shadow-md">
      {/* header */}
      <div className="relative w-full pr-3 pt-3">
        <Typography variant="h5" color="common.black">
          لیست تیکت های ارسال شده
        </Typography>
      </div>
      <TicketTable />
    </div>
  );
}

export default TicketList;
