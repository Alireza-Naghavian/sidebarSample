import * as React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  label: string;
};

type Props = IProps & TextFieldProps;

export default function RHFSelect({ name, ...other }: Props) {
  const { control } = useFormContext();
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Select {...other}>
          <MenuItem value={'10'}>Ten</MenuItem>
          <MenuItem value={'20'}>Twenty</MenuItem>
        </Select>
      )}
    />
  );
}
