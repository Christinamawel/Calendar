export default class Holidays {
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