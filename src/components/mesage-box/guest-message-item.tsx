import React from 'react';
import UserAvatar from './user-avatar';
import { motion } from 'framer-motion';
// type Props = {
//   message: string;
//   loading: boolean;
// };

const GuestMessageItem = (props: any) => {
  const { message } = props;
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 0.3,
      }}
      style={{
        originX: 0,
      }}
      className="flex items-end gap-2">
      <UserAvatar />
      <div className="bg-white rounded-xl p-2 max-w-xs">{message}</div>
    </motion.div>
  );
};

export default GuestMessageItem;
