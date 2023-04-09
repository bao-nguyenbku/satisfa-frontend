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
