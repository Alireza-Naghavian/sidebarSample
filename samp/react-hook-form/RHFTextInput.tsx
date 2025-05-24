import { useFormContext, Controller } from 'react-hook-form';
import { ChangeEvent, HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import CUSTOM_COLORS from '@/theme/colors';
import { convertToLatinNumbers } from '@/utils/persianToLatinNumber';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  type: HTMLInputTypeAttribute | undefined;
  max?: number;
  min?: number;
  maxLength?: number;
  minLength?: number;
};

type Props = IProps & InputHTMLAttributes<HTMLInputElement>;

export default function RHFTextInput({
  name,
  type,
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
      if (value.length > 1) return;
      setValue(name, '');
      return;
    }

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
        <>
          <input
            {...field}
            autoComplete="off"
            inputMode={type === 'text' ? 'text' : 'numeric'}
            pattern={type === 'tel' ? '[0-9]*' : undefined}
            value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
            style={{
              borderBottomColor: error && CUSTOM_COLORS.error,
              direction: 'rtl',
            }}
            onChange={type === 'tel' ? handleChange : field.onChange}
            type={type}
            {...other}
          />
          <p className="text_error mt-2">{error?.message}</p>
        </>
      )}
    />
  );
}
