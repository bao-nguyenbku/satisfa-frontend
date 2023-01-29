import React from "react";
import UserAvatar from "./user-avatar";
type Props = {
  message: string
}

const MeMessageItem = (props: Props) => {
  const { message } = props;
  return (
    <div className="flex items-end gap-2 ml-auto">
      <div className="bg-dark-2 rounded-xl p-2 max-w-xs text-white">
        {message}
      </div>
      <UserAvatar />
    </div>
  );
};

export default MeMessageItem;