import { TicketTypes } from '@/_types/tickets';
import Label from '@/components/Label';
import { PATH_MAIN } from '@/paths';
import { IconButton, TableCell, TableRow, Tooltip, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { AiOutlineEye } from 'react-icons/ai';

export type TicketTRowProps = {
  id: string;
  user: string;
  subject: string;
  dept: string;
  priority: {
    label: string;
    value: string;
  };
  status: TicketTypes.TicketStatusProp;
  createtAt: Date;
  updatedAt: Date;
};

function TicketTRow({ index, user, subject, ...rest }: TicketTRowProps & { index: number }) {
  const theme = useTheme();
  const { push } = useRouter();
  const handleTicketNavigate = () => {
    push(`${PATH_MAIN.tickets.ticket(rest.id)}`);
  };

  const ticketStatus =
    rest.status.value === 'pending' ? (
      <Label color="warning"  value={rest.status.label} />
    ) : rest.status.value === 'replied' ? (
      <Label color="success" value={rest.status.label} />
    ) : (
      <Label color="info" value={rest.status.label} />
    );

  return (
    <TableRow
      className="!transition-all !duration-300"
      hover
      sx={{
        '&:nth-of-type(odd)': {
          bgcolor: `${theme.palette.grey[300]} `,
        },
        '&:nth-of-type(even)': {
          bgcolor: `${theme.palette.grey[100]} `,
        },
        '& > *': {
          textAlign: 'center !important',
          fontWeight: '500 !important',
          fontSize: '16px !important',
          padding: '18px !important',
        },
      }}
    >
      <TableCell>{index + 1}</TableCell>

      <TableCell >{rest.id}</TableCell>

      <TableCell>{user}</TableCell>

      <TableCell >{subject}</TableCell>

      <TableCell>{rest.dept}</TableCell>

      <TableCell>{rest.priority.label}</TableCell>

      <TableCell
        sx={{
          mx: 'auto',
          display: 'flex',
          justifyContent: 'center',
          border: 'none',
          pt:"26px !important",
  
        }}
      >
        {ticketStatus}
      </TableCell>

      <TableCell>{new Date(rest.createtAt).toLocaleDateString('fa-IR')}</TableCell>

      <TableCell>{new Date(rest.updatedAt).toLocaleDateString('fa-IR')}</TableCell>

      <TableCell>
        <Tooltip
          slotProps={{
            tooltip: {
              sx: {
                fontSize: '13px',
              },
            },
          }}
          title="جزییات تیکت"
          placement="top"
        >
          <IconButton color="primary" onClick={handleTicketNavigate}>
            <AiOutlineEye />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}

export default TicketTRow;
