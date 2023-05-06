import React, { useEffect, useState } from 'react';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

type Props = {
  question?: string;
  onChange?: (point: number) => void;
};

export default function RatingOption(props: Props) {
  const { question = 'Question?', onChange } = props;
  const [currentIdx, setCurrentIdx] = useState<number>(-1);
  const handleClick = (index: number) => {
    setCurrentIdx(index);
  };
  useEffect(() => {
    if (onChange) {
      onChange(currentIdx + 1);
    }
  }, [currentIdx]);
  return (
    <div className="flex items-center">
      <span className="text-xl font-bold">{question}</span>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((item, index) => {
          return (
            <IconButton key={item} onClick={() => handleClick(index)}>
              {index <= currentIdx ? (
                <StarIcon className="text-4xl text-primary-yellow" />
              ) : (
                <StarOutlineIcon className="text-4xl text-white" />
              )}
            </IconButton>
          );
        })}
      </div>
    </div>
  );
}
