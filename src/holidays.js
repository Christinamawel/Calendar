export class Holidays {
  static getHolidays(year) {
    return fetch(`https://calendarific.com/api/v2/holidays?api_key=${process.env.API_KEY}&country=US&year=${year}`)
    .then(function(response) {
      if(!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .catch(function(error) {
      return error
    })
  }
}

export function monthDays(now) {
  if(now.getMonth()+1 === 2 && now.getFullYear() % 4 === 0) {
    return 29
  } else if (now.getMonth()+1 === 2) {
    return 28
  }else if((now.getMonth()+1) % 2 === 0) {
    return 31
  } else {
    return 30
  }
}

export function findHoliday(holidayArray, name) {
  let nameIndex
  holidayArray.forEach(function(holiday, index) {
    if(holiday.name === name) {
      nameIndex = index
    }
  })
  return nameIndex
}