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

export function isNumber(value: string) {
  return +value;
}
