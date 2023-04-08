import dayjs, { Dayjs } from 'dayjs';
import _ from 'lodash';

export const formatCurrency = (num: number) => {
    if (typeof num === 'number') {
      return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " VND";
    }
    return 0;
  }

export const formatDate = (date: string | Dayjs): string => {
    if (_.isEmpty(date)) return '';
    return dayjs(date).format('DD/MM/YYYY HH:mm a');
};