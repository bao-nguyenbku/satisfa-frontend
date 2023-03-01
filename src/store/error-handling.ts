import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.log('Rejected:', action);
      if (action.payload && action.payload?.status === 'FETCH_ERROR') {
        toast.error(action.payload.error + ', Can not connect to server');
      }
      toast.error(action.payload?.data?.message);
    }

    return next(action);
  };
