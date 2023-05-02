import React from 'react';
import Image from 'next/image';
import { Review } from '@/types/data-types';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

type Props = {
  data: Review;
};

export default function SingleItem(props: Props) {
  const { data } = props;
  if (!data) {
    return <></>;
  }
  return (
    <div className="flex gap-10 items-center relative my-8">
      <figure className="relative w-100 h-100">
        <Image
          src={data.customerId.avatar}
          alt="testimonial-avatar"
          fill
          className="object-cover rounded-t-full rounded-r-full -z-10"
        />
      </figure>
      <div className="bg-white/20 backdrop-blur-md p-6 absolute -bottom-5 left-60 z-10 text-2xl font-bold shadow-xl">
        {data.customerId.fullname}
      </div>
      <div className="flex-1 flex flex-col gap-10 bg-zinc-800 p-4">
        <p className="tracking-widest text-xl">{data.review}</p>
        <span className="flex gap-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <StarOutlinedIcon key={item} className="text-yellow-500" />
          ))}
        </span>
      </div>
    </div>
  );
}
