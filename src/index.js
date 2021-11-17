import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import Holidays from './holidays.js'

$(document).ready(function() {
  const now = new Date(Date.now());
  const months = ['January', 'February', 'March', 'April', 'May', "June", "July", "August", "September", "October", "November", "December"]
  function monthDays() {
    if(now.getMonth()+1 === 2 && now.getFullYear() % 4 === 0) {
      return 29
    } else if (now.getMonth()+1 === 2) {
      return 28
    }else if(now.getMonth()+1 % 2 === 0) {
      return 31
    } else {
      return 30
    }
  }

  Holidays.getHolidays(now.getFullYear())
  .then(function(response) {
    let holidays = response.response.holidays;
    let holidaysInMonth = []
    holidays.forEach(function(holiday){
      if (holiday.date.datetime.month === now.getMonth()+1) {
        holidaysInMonth.push(holiday)
      }
    })

    for(let i=1; i <= monthDays(); i++) {
      $("#calanderContainer").append(`
      <div class="dayCard">
      <h2>${i}</h2>
      <p id="day${i}"></p>
      </div>`)

      holidaysInMonth.forEach(function(holiday) {
        if (holiday.date.datetime.day === i) {
          $(`#day${i}`).append(holiday.name)
        }
      })
    }

    $("#monthName").text(months[now.getMonth()]);
  })
})

