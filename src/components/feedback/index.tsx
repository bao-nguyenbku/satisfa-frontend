import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import RatingOption from './rating-option';
import Button from '@/components/common/button';
import { useCreateReviewServiceMutation } from '@/services/review';
// import useModal from '@/hooks/useModal';

export default function FeedbacksForm() {
  const [values, setValues] = useState({
    foodRating: 0,
    serviceRating: 0,
    review: '',
  });
  const [isShowThankNoti, setIsShowThankNoti] = useState<boolean>(false);
  // const { close } = useModal();
  const [createReview, createReviewRes] = useCreateReviewServiceMutation();
  const onChangeFoodRating = (point: number) => {
    setValues((prev) => {
      return {
        ...prev,
        foodRating: point,
      };
    });
  };
  const onChangeServiceRating = (point: number) => {
    setValues((prev) => {
      return {
        ...prev,
        serviceRating: point,
      };
    });
  };
  const onChangeReview = (text: string) => {
    setValues((prev) => {
      return {
        ...prev,
        review: text,
      };
    });
  };
  const handleSubmit = async () => {
    createReview(values);
  };
  useEffect(() => {
    if (
      !createReviewRes.isLoading &&
      createReviewRes.isSuccess &&
      createReviewRes.data
    ) {
      setIsShowThankNoti(true);
    }
  }, [createReviewRes]);
  return (
    <div className="flex flex-col items-center gap-4 text-slate-800">
      <h1 className="font-bold text-2xl">
        Thanks for choosing us to have your food
      </h1>
      <h2 className="mb-8">
        Please take only 5 minutes to leave a review for our restaurant, it help
        us to improve and serve better as per your taste
      </h2>
      {isShowThankNoti ? (
        <h1>Thank you for feedback. We appreciate it.</h1>
      ) : (
        <div className='flex flex-col gap-4'>
          <RatingOption
            onChange={onChangeFoodRating}
            question="Are food delicious?"
          />
          <RatingOption
            onChange={onChangeServiceRating}
            question="Do you pleasure of our services?"
          />
          <TextField
            placeholder="Write everything you want about us..."
            InputProps={{
              className: 'text-inherit',
            }}
            fullWidth
            value={values.review}
            onChange={(e) => onChangeReview(e.target.value)}
            minRows={4}
            multiline
          />
          <Button
            className="text-white bg-primary-orange py-4 w-full rounded-none hover:bg-primary-orange/80 mt-4 text-xl"
            onClick={handleSubmit}>
            Submit feedback
          </Button>
        </div>
      )}
    </div>
  );
}
