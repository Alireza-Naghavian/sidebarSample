import { useFormContext, Controller } from 'react-hook-form';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  FormControl,
  FormLabel,
  RadioGroupProps,
} from '@mui/material';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  options: {
    label: string;
    value: any;
  }[];
  label?: string;
};

type Props = IProps & RadioGroupProps;

export default function RHFRadio({ name, options, label, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error}>
          {label && <FormLabel>{label}</FormLabel>}

          <RadioGroup {...field} {...other}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>

          {error?.message && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
