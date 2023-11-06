// function to add n days in provided date
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// function to remove n days in provided date
export const removeDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

// function to check if user is authentication
export const isAuthenticated = () => {
  return localStorage.getItem('ac_cd_token');
};

// function to format number to thousand formatter
export const thousandsSeparators = (num: number) => {
  const numParts = num.toString().split('.');
  numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return numParts.join('.');
};

// function to format date in YYYY/MM/DD
export const formatDate = (date: Date) => {
  const offset = date.getTimezoneOffset();
  const newDate = new Date(date.getTime() - offset * 60 * 1000);
  return newDate.toISOString().split('T')[0];
};

// function to verify dates
export const verifyDates = (startDate: Date, endDate: Date) => {
  // checking startDate
  if (startDate > new Date()) return 'START_DATE_GREATER';

  // checking endDate
  if (endDate > new Date()) return 'END_DATE_GREATER';

  if (endDate < startDate) return 'START_GREATER_THAN_END';

  // Removed as requested by BE Team
  // if (endDate < addDays(startDate, 7)) {
  //   return 'MIN_DATE_RANGE';
  // }
  return '';
};

// function to create header data
export const createHeaderData = (name: string, align?: string) => {
  return { name, align };
};

// function for storage event listener to logout user from all tabs
export const handleLogout = (e: any) => {
  if ((e.key === 'ac_cd_token' && !e.newValue) || !e.key) window.location.replace('/');
};
