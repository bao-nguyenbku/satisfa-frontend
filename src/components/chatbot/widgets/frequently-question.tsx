import Button from '@/components/common/button';
import React from 'react';

export default function FrequentlyQuestion(props: any) {
  const { actions, createUserMessage } = props;
  const questions = [
    {
      text: 'Where is your restaurant?',
      handler: () => {
        createUserMessage(questions[0].text);
        actions.showLocation();
      },
    },
    {
      text: 'Can I host private parties or events at your restaurant?',
      handler: () => {
        createUserMessage(questions[1].text);
        actions.answerHostEvent();
      },
    },
    {
      text: 'What is your operating hours?',
      handler: () => {
        createUserMessage(questions[2].text);
        actions.answerOperatingHours();
      },
    },
    {
      text: 'Is there parking available?',
      handler: () => {
        createUserMessage(questions[3].text);
        actions.answerParking();
      },
    },
  ];
  return (
    <div className="text-slate-800 flex flex-wrap gap-2 justify-end">
      {questions.map((question) => {
        return (
          <Button
            className="bg-neutral-100 text-start text-slate-800 hover:bg-neutral-200 rounded-xl"
            key={question.text}
            onClick={question.handler}>
            {question.text}
          </Button>
        );
      })}
    </div>
  );
}
