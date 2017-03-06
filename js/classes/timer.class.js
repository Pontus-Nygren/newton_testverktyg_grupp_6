class Timer extends Base {

  static defaultPropertyValues(){

    return {
        endingTime: '2017-03-05 12:00:00'
      }
    }

  constructor(propertyValues){
    super(propertyValues);
    this.endingTime = propertyValues;
  }

  startTimer(deadline){
    console.log('deadline',deadline);
    function getTimeRemaining(endtime) {
      var t = Date.parse(endtime) - Date.parse(new Date());
      var seconds = Math.floor((t / 1000) % 60);
      var minutes = Math.floor((t / 1000 / 60) % 60);
      var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      var days = Math.floor(t / (1000 * 60 * 60 * 24));
      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    }

    function initializeClock(id, endtime) {
      var clock = document.getElementById(id);
      var daysSpan = clock.querySelector('.days');
      var hoursSpan = clock.querySelector('.hours');
      var minutesSpan = clock.querySelector('.minutes');
      var secondsSpan = clock.querySelector('.seconds');

      function updateClock() {
        var t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) { 
          clearInterval(timeinterval); 
          var user = JSON.parse(localStorage.getItem('user')); 
          var u_role = user.role; 
          if(u_role == 'student'){ 
          window.location.href = "/time-is-up"; 
          } 
        }
      }

      updateClock();
      var timeinterval = setInterval(updateClock, 1000);

    }
    var deadline = new Date(this.endingTime);
    initializeClock('clockdiv', deadline);
  }
}

