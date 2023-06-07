import {
  isRejectedWithValue,
  // MiddlewareAPI,
  Middleware,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { signOut } from 'next-auth/react';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    // console.log('🚀 ~ file: error-handling.ts:14 ~ action:', action);
    if (action.payload && action.payload?.status === 'FETCH_ERROR') {
      const message = 'Can not connect to server, you are offline';
      toast.error(message, {
        toastId: message,
      });
    }
    if (action.type === 'auth/me/rejected') {
      signOut({
        redirect: false,
      });
    }
    let resMessage = action.payload?.data?.message || action.payload?.message;
    if (action.payload?.status === 401 && action.type !== 'auth/me/rejected') {
      resMessage = 'You must sign in to do the action';
    }

    if (resMessage && Array.isArray(resMessage)) {
      toast.error(resMessage.join('\n'), {
        toastId: resMessage.join('\n'),
      });
    } else if (resMessage) {
      toast.error(resMessage, {
        toastId: resMessage,
      });
    }
  }

  return next(action);
};
