import { Typography } from '@mui/material';
import MuiLink from '../Link';
import { LatestTicketCardProps } from '@/_types/tickets';
import Label from '../Label';
import { PATH_MAIN } from '@/paths';

function LatestTicketCard(props: LatestTicketCardProps) {
  const { title, body, status, createdAt,id } = props;
  const ticketStatus =
    status.value === 'pending' ? (
      <Label className="!text-sm" color="primary" value={status.label} />
    ) : status.value === 'replied' ? (
      <Label className="!text-sm" color="success" value={status.label} />
    ) : (
      <Label className="!text-sm" color="info" value={status.label} />
    );
  return (
    <MuiLink
      href={`${PATH_MAIN.tickets.ticket(id)}`}
      sx={{
        willChange: 'transform !important',
      }}
      className="flex w-full flex-col gap-y-2 rounded-sm bg-common-white p-4 
      shadow-md transition-[transform,box-shadow] duration-700 will-change-transform 
      [backface-visibility:hidden] [transform:translate3d(0,0,0)] hover:scale-[1.03]
       hover:shadow-2xl"
    >
      <div className="flex w-full items-center justify-between">
        <Typography
          component={'p'}
          variant="body1"
          fontWeight={600}
          className="line-clamp-1 w-[70%] tracking-tight"
          color="common.black"
        >
          {title}
        </Typography>
        {/* ticket status */}
        <div className="!w-fit !text-nowrap *:text-common-white">{ticketStatus}</div>
      </div>
      {/* body */}
      <div className="w-full">
        <div className="w-full">
          <Typography
            variant="body2"
            fontWeight={500}
            component={'p'}
            className="!line-clamp-2 text-right !text-sm text-common-black"
          >
            {body}
          </Typography>
        </div>
        <div className="mt-1.5 flex w-full justify-end">
          {/* must use day ago package */}
          <Typography variant="caption" fontWeight={600} className="!text-sm text-common-black/55">
            3 روز پیش
          </Typography>
        </div>
      </div>
    </MuiLink>
  );
}

export default LatestTicketCard;
