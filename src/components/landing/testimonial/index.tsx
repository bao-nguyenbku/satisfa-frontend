import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import styles from './styles.module.scss';
import SingleItem from './single-item';
import { useGetReviewsServiceQuery } from '@/service/review';
import Loading from '@/components/common/loading';

// const data = [
//   {
//     id: '644f7b32a107fb5d122e3f5f',
//     customerId: {
//       fullname: 'Bao Nguyen',
//       avatar:
//         'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2062&q=80',
//     },
//     review:
//       'This cozy restaurant has left the best impressions! Hospitable hosts, delicious dishes, beautiful presentation, wide wine list and wonderful dessert. I recommend to everyone! I would like to come back here again and again.',
//     foodRating: 5,
//     serviceRating: 5,
//     createdAt: '2023-05-01T08:41:22.992Z',
//     updatedAt: '2023-05-01T08:41:22.992Z',
//   },
//   {
//     id: '644f7b41a107fb5d122e3f61',
//     customerId: {
//       fullname: 'Bao Nguyen',
//       avatar:
//         'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2062&q=80',
//     },
//     review:
//       'This place is great! Atmosphere is chill and cool but the staff is also really friendly. They know what they’re doing and what they’re talking about, and you can tell making the customers happy is their main priority. Food is pretty good, some italian classics and some twists, and for their prices it’s 100% worth it',
//     foodRating: 5,
//     serviceRating: 5,
//     createdAt: '2023-05-01T08:41:37.478Z',
//     updatedAt: '2023-05-01T08:41:37.478Z',
//   },
//   {
//     id: '644f7b4fa107fb5d122e3f63',
//     customerId: {
//       fullname: 'Bao Nguyen',
//       avatar:
//         'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2062&q=80',
//     },
//     review:
//       'Excellent food. Menu is extensive and seasonal to a particularly high standard. Definitely fine dining. It can be expensive but worth it and they do different deals on different nights so it’s worth checking them out before you book. Highly recommended.',
//     foodRating: 5,
//     serviceRating: 5,
//     createdAt: '2023-05-01T08:41:51.617Z',
//     updatedAt: '2023-05-01T08:41:51.617Z',
//   },
// ];
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  arrows: true,
  slidesToShow: 1,
  slidesPerRow: 1,
  slidesToScroll: 1,
  vertical: false,
  autoplay: true,
  autoplaySpeed: 5000,
};

export default function TestimonalSection() {
  const { data, isLoading } = useGetReviewsServiceQuery({
    limit: 8,
  });
  return (
    <div className="h-[1000px] bg-transparent flex flex-col items-center py-20">
      <h1 className="text-7xl mb-24 text-primary-yellow">
        What customers say about Satisfa?
      </h1>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="relative z-20 w-full max-w-7xl px-20">
          <Slider className={styles.customSlick} {...settings}>
            {data &&
              data.map((item) => {
                return <SingleItem key={item.id} data={item} />;
              })}
          </Slider>
        </div>
      )}
    </div>
  );
}