export const formatCurrency = (num: number) => {
    if (typeof num === 'number') {
      return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " VND";
    }
    return 0;
  }