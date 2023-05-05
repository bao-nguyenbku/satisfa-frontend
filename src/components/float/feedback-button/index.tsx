import React from 'react';
import FeedbackIcon from '@mui/icons-material/Feedback';
import Wrapper from '@/components/float/wrapper';
import useModal from '@/hooks/useModal';
import FeedbacksForm from '@/components/feedback';

export default function FeedbacksButton() {
  const { modal } = useModal();
  const handleClick = () => {
    modal({
      title: 'Feedback',
      children: <FeedbacksForm />,
      cancelText: '',
      saveText: '',
    });
  };
  return (
    <Wrapper>
      <button onClick={handleClick}>
        <div className="w-full h-full flex items-center justify-center">
          <FeedbackIcon />
        </div>
      </button>
    </Wrapper>
  );
}
