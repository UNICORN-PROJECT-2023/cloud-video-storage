export default class DateUtils {

    static getAgeFromDate(date) {
      const currentDate = new Date();
      const timeDifference = currentDate - date;
      const millisecondsInSecond = 1000;
      const millisecondsInMinute = millisecondsInSecond * 60;
      const millisecondsInHour = millisecondsInMinute * 60;
      const millisecondsInDay = millisecondsInHour * 24;
      const millisecondsInMonth = millisecondsInDay * 30; // Assumption: 30 days per month
      const millisecondsInYear = millisecondsInDay * 365; // Assumption: 365 days per year
  
      const years = Math.floor(timeDifference / millisecondsInYear);
      const months = Math.floor((timeDifference % millisecondsInYear) / millisecondsInMonth);
      const days = Math.floor((timeDifference % millisecondsInMonth) / millisecondsInDay);
      const hours = Math.floor((timeDifference % millisecondsInDay) / millisecondsInHour);
      const minutes = Math.floor((timeDifference % millisecondsInHour) / millisecondsInMinute);
      const seconds = Math.floor((timeDifference % millisecondsInMinute) / millisecondsInSecond);
  
      let ageString = '';
      if (years > 0) {
        ageString += `${years} year${years > 1 ? 's' : ''}`;
      }
      if (months > 0) {
        ageString += `${ageString ? ', ' : ''}${months} month${months > 1 ? 's' : ''}`;
      }
      if (days > 0) {
        ageString += `${ageString ? ', ' : ''}${days} day${days > 1 ? 's' : ''}`;
      }
      if (hours > 0) {
        ageString += `${ageString ? ', ' : ''}${hours} hour${hours > 1 ? 's' : ''}`;
      }
      if (minutes > 0) {
        ageString += `${ageString ? ', ' : ''}${minutes} minute${minutes > 1 ? 's' : ''}`;
      }
      if (seconds > 0) {
        ageString += `${ageString ? ', ' : ''}${seconds} second${seconds > 1 ? 's' : ''}`;
      }
  
      return ageString || 'just now';
    }

  }