'use client';
import { ticketTable, ticketTRow } from '@/_mocks';
import Scrollbar from '@/components/Scrollbar';
import { TableHeadCustom } from '@/components/Table';
import CUSTOM_COLORS from '@/theme/colors';
import { Table, TableBody, TableContainer, Typography } from '@mui/material';
import TicketTRow from './TicketTRow';

function TicketTable() {
  return (
    <div className="relative flex w-full flex-col items-start gap-y-1">
      <Typography className="pr-3 pt-3" variant="body1" color={`${CUSTOM_COLORS.noteLight}`}>
        نمایش 1 تا 20 مورد از کل 130 مورد
      </Typography>
      {/* table */}
      <div className="w-full">
        <Scrollbar>
          <TableContainer sx={{ minWidth: 900 }}>
            <Table>
              <TableHeadCustom
                className="!bg-grey-200"
                tableCellSx={{
                  fontWeight: 700,
                  fontSize: '18px',
                }}
                rowCount={ticketTable.ticketTHead.length}
                headLabel={ticketTable.ticketTHead}
              />
              <TableBody>
                {ticketTRow.map((row, index) => {
                  return <TicketTRow 
                  key={`${index}-${row.user}`}
                   index={index} {...row}
                    />
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </div>
    </div>
  );
}

export default TicketTable;
