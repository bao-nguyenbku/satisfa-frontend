import React from 'react';
// import UserAvatar from "./user-avatar";
import { motion } from 'framer-motion';
type Props = {
  message: string;
};

const MeMessageItem = (props: Props) => {
  const { message } = props;
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="flex items-end gap-2 ml-auto"
      transition={{
        duration: 0.3,
      }}>
      <div className="bg-dark-2 rounded-xl p-2 max-w-xs text-white border border-gray-600">
        {message}
      </div>
      {/* <UserAvatar /> */}
    </motion.div>
  );
};

export default MeMessageItem;
