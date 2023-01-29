import React from 'react';
import MeMessageItem from './me-message-item';
import GuestMessageItem from './guest-message-item';

import { MessagePayload } from '.';
type Props = {
  messages?: MessagePayload
}
const MessageSection = (props: Props) => {
  const { messages } = props;
  return (
    <div className="w-full flex flex-col gap-6 px-2">
      <MeMessageItem message="Hello" />
      <GuestMessageItem message={`I'm satisgi! How can I help you?`} />
      <MeMessageItem message="I want to book a table right now" />
      <GuestMessageItem message="Of courses, There are some available table for you, What time do you want to book?" />
      <MeMessageItem message="How about 28 Jan?" />
      <MeMessageItem message="It will be fine if one table is free at 6pm" />
      <GuestMessageItem message="Hmmm, In 28 Jan, We have two options near 6pm, one is 6:30pm and one is 7:30pm?" />
      <GuestMessageItem message="What would you choose?" />
      <MeMessageItem message="Hmmm....! Okie, Make a reservation for me at 6:30pm. Thanks" />
      <GuestMessageItem message="Ok. We are generating reservation for you, please wait in a minute...." />
      <GuestMessageItem message="All done! Your reservation id is 180443832. Please check your new reservation. Do you need more help?" />
      <MeMessageItem message="Ok. I saw the reservation. Thank you so much. I can not waiting for tomorrow." />
    </div>
  );
};

export default MessageSection;
