import React, { useMemo } from 'react';
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
const defaultClasses = "border bg-white/5 h-16 outline-none px-2 text-zinc-400 w-full placeholder:text-zinc-500 ";

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
  let errorClasses = "";
  if (error) {
    errorClasses = "border-red-500"
  }
  return (
    <div className="flex flex-col gap-1">
      <label className="text-zinc-400 font-bold">{label}</label>
      <input
        type={type}
        name={name}
        className={`${defaultClasses} ${(error ? errorClasses : 'border-gray-500')}`}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <span className='text-red-500'>{errorMessage}</span>}
      
    </div>
  );
};

export default Input;
