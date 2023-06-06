import React from 'react';
import Image from '@/components/common/image';
import { Review } from '@/types';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { Divider } from '@mui/material';
import { formatDate } from '@/utils';

type Props = {
  data: Review;
};

export default function SingleItem(props: Props) {
  const { data } = props;
  if (!data) {
    return <></>;
  }
  return (
    <div className="bg-transparent p-4 flex w-full" data-aos='fade-up'>
      <div className="flex flex-col gap-4 text-slate-800 bg-transparent max-w-lg p-4 w-full mx-auto">
        <div className='flex items-center gap-2'>
          <Image
            src={data?.customerId?.avatar}
            alt="testimonial-avatar"
            quality={75}
            width={60}
            height={60}
            sizes="(max-width: 768px) 100vw"
            className="object-cover rounded-full aspect-square"
          />
          <span className="">{data?.customerId?.fullname ?? 'Unknown'}</span>
        </div>
        <span className="flex gap-1">
          {[1, 2, 3, 4, 5].map((item) => (
            <StarOutlinedIcon key={item} className="text-yellow-500 text-4xl"/>
          ))}
        </span>
        <div className="min-h-[50px] flex">
          <p className="tracking-widest text-base md:text-xl text-justify">{data?.review}</p>
        </div>
        <span>{formatDate(data.createdAt, 'MMM D, YYYY')}</span>
        <div className="mt-auto flex flex-col gap-2">
          <Divider className="border-primary-orange bg-primary-orange w-20 h-2" />
        </div>
      </div>
    </div>
  );
}
