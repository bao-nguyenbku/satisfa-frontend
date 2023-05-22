import React from 'react';
import { InputChangeEvent } from '@/types/event-types';

type Props = {
  type?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  name?: string;
  onChange?: (e: InputChangeEvent) => void;
  error?: boolean;
  errorMessage?: string;
};
const defaultClasses =
  'border border-neutral-400 bg-neutral-100 h-16 text-slate-800 outline-none px-2 w-full placeholder:text-neutral-400 focus:border-neutral-500 ';

const Input = (props: Props) => {
  const {
    type = 'text',
    placeholder = 'Text...',
    label = 'Label',
    value = '',
    name,
    error,
    errorMessage,
    onChange,
  } = props;
  let errorClasses = '';
  if (error) {
    errorClasses = 'border-red-500';
  }
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-slate-800 font-bold">{label}</label>
      <input
        type={type}
        name={name}
        autoComplete="new-password"
        className={`${defaultClasses} ${error ? errorClasses : ''}`}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <span className="text-red-500">{errorMessage}</span>}
    </div>
  );
};

export default Input;
