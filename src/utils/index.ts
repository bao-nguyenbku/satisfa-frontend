export function isValidDate(date: string) {
    const temp = date.split('/');
    const d = new Date(temp[1] + '/' + temp[0] + '/' + temp[2]);
     return (d && (d.getMonth() + 1) == parseInt(temp[1]) && d.getDate() == Number(temp[0]) && d.getFullYear() == Number(temp[2]));
}

export function isValidTime(inputField: string) {
    const isValid = /^([0-1][8-9]|2[0-3]):([0,3][0])$/.test(inputField);
    return isValid;
  }