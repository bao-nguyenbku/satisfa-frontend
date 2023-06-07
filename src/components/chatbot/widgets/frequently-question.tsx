import Button from '@/components/common/button';
import React from 'react';

export default function FrequentlyQuestion(props: any) {
  const { createUserMessage } = props;
  const questions = {
    1: {
      text: 'Where is your restaurant?',
      handler: () => createUserMessage(questions[1].text),
    },
    2: {
      text: 'Can I host private parties or events at your restaurant?',
      handler: () => createUserMessage(questions[2].text),
    },
    3: {
      text: 'What is your operating hours?',
      handler: () => createUserMessage(questions[3].text),
    },
    4: {
      text: 'Is there parking available?',
      handler: () => createUserMessage(questions[4].text),
    },
  };

  return (
    <div className="text-slate-800 flex flex-wrap gap-2 justify-end">
      {Object.keys(questions).map((key) => {
        return (
          <Button
            className="bg-neutral-100 text-start text-slate-800 hover:bg-neutral-200 rounded-xl"
            key={questions[key as unknown as keyof typeof questions].text}
            onClick={
              questions[key as unknown as keyof typeof questions].handler
            }>
            {questions[key as unknown as keyof typeof questions].text}
          </Button>
        );
      })}
    </div>
  );
}
