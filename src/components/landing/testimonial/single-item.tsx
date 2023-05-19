import React from 'react';
import Image from '@/components/common/image';
import { Review } from '@/types';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { Divider } from '@mui/material';

type Props = {
  data: Review;
};

export default function SingleItem(props: Props) {
  const { data } = props;
  if (!data) {
    return <></>;
  }
  return (
    <div className='bg-transparent p-4 flex h-full w-full'>
      <div className="child-card shadow-md flex flex-col gap-8 items-center text-slate-800 bg-neutral-100 max-w-lg p-4 h-full w-full">
        <span className="flex gap-3 ml-auto">
          {[1, 2, 3, 4, 5].map((item) => (
            <StarOutlinedIcon key={item} className="text-yellow-500" />
          ))}
        </span>
        <p className="tracking-widest text-xl min-h-[300px]">{data?.review}</p>
        <div className='mt-auto flex flex-col items-center gap-2'>
          <Image
            src={data?.customerId?.avatar}
            alt="testimonial-avatar"
            quality={75}
            width={100}
            height={100}
            sizes="(max-width: 768px) 100vw"
            className="object-cover rounded-full aspect-square mb-4"
          />
          <Divider className='border-primary-orange bg-primary-orange w-20 h-2'/>
          <div className="">{data?.customerId?.fullname ?? 'Unknown'}</div>
        </div>
      </div>
    </div>
  );
}
