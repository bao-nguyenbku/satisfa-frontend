import React from 'react';
import { InputChangeEvent } from '@/types/html-types';

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

const Input = (props: Props) => {
  const {
    type = 'text',
    placeholder = 'Text...',
    label = 'Label',
    value = '',
    name,
    onChange,
  } = props;
  return (
    <div className="flex flex-col gap-1">
      <label className="text-zinc-400 font-bold">{label}</label>
      <input
        type={type}
        name={name}
        className="border-gray-600 border bg-white/5 h-16 focus:border-gray-500 outline-none px-2 text-zinc-400 w-full placeholder:text-zinc-500"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
