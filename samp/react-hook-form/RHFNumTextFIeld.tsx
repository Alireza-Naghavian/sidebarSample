import { useFormContext, Controller } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import { ChangeEvent } from "react";
import { convertToLatinNumbers } from "@/utils/persianToLatinNumber";

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  max?: number;
  min?: number;
  maxLength?: number;
  minLength?: number;
};

type Props = IProps & TextFieldProps;

export default function RHFNumTextField({
  name,
  onChange,
  max,
  min,
  maxLength,
  minLength,
  ...other
}: Props) {
  const { control, setValue, clearErrors } = useFormContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = convertToLatinNumbers(e.target.value);

    if (value === ' ' || isNaN(value as any)) {
      if(value.length > 1) return;
      setValue(name, "")
      return
    };

    if (max && +value > max) {
      return;
    } else if (maxLength && value.length > maxLength) {
      return;
    }

    if (min && +value < min) {
      return;
    } else if (minLength && value.length < minLength) {
      return;
    } else {
    }

    setValue(name, value);
    clearErrors(name);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          type="tel"
          autoComplete="off"
          inputMode="numeric"
          /* @ts-ignore */
          pattern="[0-9]*"
          value={
            typeof field.value === "number" && field.value === 0
              ? ""
              : field.value
          }
          error={!!error}
          helperText={error?.message}
          slotProps={{
            htmlInput: {
              sx:{
                direction: 'ltr'
              }
            }
          }}
          {...other}
          onChange={onChange ? onChange : handleChange}
        />
      )}
    />
  );
}