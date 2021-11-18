import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import {Holidays} from './holidays.js';
import {monthDays} from './holidays.js';
import {findHoliday} from './holidays.js';

$(document).ready(function() {

  let now = new Date(Date.now());
  const months = ['January', 'February', 'March', 'April', 'May', "June", "July", "August", "September", "October", "November", "December"]
  $("#calendar").submit(function(event){
    event.preventDefault();
    now = new Date($('#month').val());
    holidays(now);
  })
  
  holidays(now);
  function holidays(now){
    Holidays.getHolidays(now.getFullYear())
    .then(function(response) {
      let holidays = response.response.holidays;
      let holidaysInMonth = []
      holidays.forEach(function(holiday){
        if (holiday.date.datetime.month === now.getMonth()+1) {
          holidaysInMonth.push(holiday)
        }
      })
      $("#calanderContainer").html("");
      for(let i=1; i <= monthDays(now); i++) {
        $("#calanderContainer").append(`
        <div class="dayCard">
        <h2>${i}</h2>
        <div id="day${i}"></div>
        </div>`)
        
        holidaysInMonth.forEach(function(holiday, index) {
          if(index === 0 && holiday.date.datetime.day === i) {
            $(`#day${i}`).append(`<p class='holiday' id="${holiday.name}">${holiday.name}</p>`)
          } else if (holiday.date.datetime.day === i && holiday.name != holidaysInMonth[index -1].name) {
            $(`#day${i}`).append(`<p class='holiday' id="${holiday.name}">${holiday.name}</p>`)
          }
        })
        $(".holiday").click(function () {
          let id = $(this).attr('id');
          $("#holidayName").text(`${id}`)
          $("#holidayDescription").text(`${holidaysInMonth[findHoliday(holidaysInMonth, id)].description}`)
        })
      }
      
      $("#monthName").text(months[now.getMonth()]);
    })
  }
})

