

export function convertDate(date){
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate
}

export const formatFrenchDate = (inputDate) => {
  const months = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ];

  const [year, month, day] = inputDate.split('-');
  const monthIndex = parseInt(month, 10) - 1; // Months in JavaScript are 0-based

  const formattedDate = `${parseInt(day, 10)} ${months[monthIndex]} ${year}`;

  return formattedDate;
};

export function getCurrentFormattedDate() {
  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  const currentDate = new Date();
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const day = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  // Get hours and minutes with leading zeros
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');


  return {
    day: day,
    month: month,
    year: year,
    dayOfWeek: dayOfWeek,
    time: `${hours}:${minutes}`
  };
}


export function updateCurrentTime() {
  const currentDate = new Date();

  // Get hours and minutes with leading zeros
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');

  return`${hours}:${minutes}`
}


export function getIndexOfWeek(){
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();

  const startOfYear = new Date(currentYear, 0, 1); // January 1st of the current year
  const daysSinceStartOfYear = Math.ceil((currentDate - startOfYear) / (24 * 60 * 60 * 1000));

  // Calculate the ISO week number
  const isoWeekNumber = Math.ceil((daysSinceStartOfYear + startOfYear.getDay() + 1) / 7);

  return isoWeekNumber
}

export const useMoneySeparator = (amount) => {
  // Check if the input is a valid number
  if (isNaN(amount)) {
    return 'Invalid Input';
  }

  // Use toLocaleString to format the number with a money separator
  const formattedAmount= amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD', // You can change the currency code as needed
    minimumFractionDigits: 0,
  });

  return formattedAmount.replace(/^./, '')
};


