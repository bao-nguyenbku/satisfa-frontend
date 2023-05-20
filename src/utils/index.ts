import dayjs, { Dayjs } from 'dayjs';
import * as _ from 'lodash';
import customeParseFormat from 'dayjs/plugin/customParseFormat';
import { DATE_INPUT_FORMAT } from '@/types';
import { hasCookie, getCookie } from 'cookies-next';
dayjs.extend(customeParseFormat);

export const getDataFromCookie = (key: string) => {
  if (hasCookie(key)) {
    try {
      const data = getCookie(key);
      return JSON.parse(data as string);
    } catch (error: any) {
      throw new Error(error);
    }
  }
  return;
};
export const compareDate = (date_1: string | Dayjs, date_2: string | Dayjs) => {
  const _date_1 = dayjs(date_1, DATE_INPUT_FORMAT).isValid()
    ? dayjs(date_1, DATE_INPUT_FORMAT)
    : undefined;
  const _date_2 = dayjs(date_2).isValid() ? dayjs(date_2) : undefined;
  if (!_date_1 || !_date_2) {
    return;
  }
  if (_date_1.diff(_date_2) < 0) {
    return false;
  }
  return true;
};
export function isValidDate(date: string) {
  const temp = date.split('/');
  const d = new Date(temp[1] + '/' + temp[0] + '/' + temp[2]);
  return (
    d &&
    d.getMonth() + 1 == parseInt(temp[1]) &&
    d.getDate() == Number(temp[0]) &&
    d.getFullYear() == Number(temp[2])
  );
}

export function isValidTime(inputField: string) {
  const isValid = /^([0][8-9]|2[0-3]|1[0-9]):([0,3][0])$/.test(inputField);
  return isValid;
}

export function validateDatetime(datetime: string) {
  const currentDate = dayjs();
  const inputDate = dayjs(datetime, DATE_INPUT_FORMAT, true);
  if (!inputDate.isValid())
    return {
      status: false,
      message: 'Input date is invalid',
    };
  if (inputDate.diff(currentDate) < 0)
    return {
      status: false,
      message: 'You can not pick a date in the past',
    };
  return {
    status: true,
  };
}

export function isValidDatetime(datetime: string) {
  const temp = datetime.split(' ');
  if (temp.length !== 2) {
    return false;
  }
  const date = temp[0];
  const time = temp[1];
  const datePattern = /^\d{2}([./-])\d{2}\1\d{4}$/;
  const timePattern = /^([0][8-9]|2[0-3]|1[0-9]):([0,3][0])$/;
  if (!datePattern.test(date) || !timePattern.test(time)) {
    return false;
  }
  return true;
}
export function isValidPhoneNumber(phone: string) {
  const pattern = /^(\d{10})|(\d{11})$/;
  return pattern.test(phone);
}
export function isNumber(value: string) {
  return +value;
}

export const formatCurrency = (num: number) => {
  if (typeof num === 'number') {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND';
  }
  return 0;
};

const parseOption = ['DD/MM/YYYY HH:mm', 'MM/DD/YYYY HH:mm'];
export const formatDate = (date: string | Dayjs): string => {
  if (_.isEmpty(date)) return '';
  if (dayjs(date).isValid()) {
    return dayjs(date).format('DD/MM/YYYY HH:mm A');
  }
  return dayjs(date, parseOption).format('DD/MM/YYYY HH:mm A');
};
