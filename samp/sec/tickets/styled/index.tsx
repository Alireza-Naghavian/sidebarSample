import { RHFTextField } from '@/components/react-hook-form';
import palette from '@/theme/palette';
import { customShadows } from '@/theme/shadows';
import { Button, MenuItem, Select, styled } from '@mui/material';

export const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: 'transparent',
  border: 'none',
  fontWeight: '600  !important',
  fontSize: '20px !important',
  padding: '0px  !important',
  color: theme.palette.text.primary,
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiSelect-icon': {
    transition: 'all 0.2s ease',
    color: theme.palette.common.black,
    right: 0,
  },
  '& .MuiSelect-select': {
    paddingRight: '32px  !important',
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: '6px 12px',
  fontSize: '16px',
  borderRadius:"0px",
  fontWeight: 500,
  color: theme.palette.common.black,
  backgroundColor: 'transparent',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.divider,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    fontWeight: 600,
  },
  '&.Mui-focusVisible': {
    backgroundColor: theme.palette.primary.light,
  },
  '& .MuiList-root-MuiMenu-list': {
    padding: '16px 12px ',
  },
}));

export const StyledFilteredButton = styled(Button)(() => ({
  transition: 'all .5s ease',
  width: '100%',
  padding: '20px 12px !important',
  borderRadius: '8px',
  border: '4px solid',
  textWrap: 'nowrap',
  fontSize: '17px',
  fontWeight: 600,
  color: `${palette.light.secondary.main}`,
}));



export const StyledRHFTextField = styled(RHFTextField)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  borderRadius: '12px',
  '& fieldset': { border: 'none', boxShadow: customShadows[2] },
}));