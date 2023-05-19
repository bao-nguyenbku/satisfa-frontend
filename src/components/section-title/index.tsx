import React from 'react';

type Props = {
  title: string;
};

export default function SectionTitle(props: Props) {
  const { title } = props;
  return <h2 className="text-slate-800 font-thin text-6xl">{title}</h2>;
}
