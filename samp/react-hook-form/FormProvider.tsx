import { DetailedHTMLProps, FormHTMLAttributes, ReactNode } from 'react';
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  formProps?: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
};

export default function FormProvider({ children, onSubmit, methods, formProps }: Props) {
  return (
    <Form {...methods}>
      <form {...formProps} onSubmit={onSubmit}>
        {children}
      </form>
    </Form>
  );
}
