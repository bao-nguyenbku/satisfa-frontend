import React from 'react';

type Props = {
  title: string;
  [key: string]: any;
};

export default function SectionTitle(props: Props) {
  const { title, ...rest } = props;
  return (
    <h2 className="text-slate-800 font-thin md:text-6xl text-5xl" {...rest}>
      {title}
    </h2>
  );
}
