let realtimer;
let isPaused;
var beep = $('#beep')[0];

//To get two digits, append 0 to front when less than 10;
//Watch out for types


$(document).ready(function() {
    var parseTimeAsMMSS = function(timeS) {
      let a = timeS.split(':');
      return (parseInt(a[0]) * 60) + parseInt(a[1]);
    };
  
    var formatTimeToMMSS = function(timeN) {
      let minutes = Math.floor(timeN / 60);
      let seconds = timeN % 60;

      if (minutes < 10) {
          minutes = '0' + minutes.toString();
      };
      if (seconds < 10) {
          seconds = '0' + seconds.toString();
      };
      return minutes.toString() + ':' + seconds.toString();
    };

    var parseTimeAsMinutes = function(timeM) {
        return timeM * 60;
    };

    var formatTimeAsMinutes = function(timeN) {
        let formMinutes = Math.floor(timeN / 60);
        return formMinutes.toString();
    };
  
    var count = parseTimeAsMinutes($('#session-length').html());
      console.log(count);
    
    var breakCount = parseTimeAsMinutes($('#break-length').html());
      console.log(breakCount);  
  
    $('#session-increment').click(function() {
        if(count >= 60 && count < 3600) {
            count += 60;
            $('#session-length').html(formatTimeAsMinutes(count));
            $('#time-left').html(formatTimeToMMSS(count));
            console.log(count);
        }
    });
      
    $('#session-decrement').click(function() {
        if (count > 60) {
            count -= 60;
            $('#session-length').html(formatTimeAsMinutes(count));
            $('#time-left').html(formatTimeToMMSS(count));
            console.log(count);
        }
    }); 
  
    $('#break-increment').click(function() {
        if(breakCount >= 60 && breakCount < 3600) {
            breakCount += 60;
            console.log(breakCount);
            $('#break-length').html(formatTimeAsMinutes(breakCount));
        }
    });
  
    $('#break-decrement').click(function() {
        if(breakCount > 60) {
            breakCount -= 60;
            console.log(breakCount);
            $('#break-length').html(formatTimeAsMinutes(breakCount));
        }
    });
  
    $('#reset').click(function() {
        $('#session-length').html(formatTimeAsMinutes(1500));
        count = 1500;
        $('#break-length').html(formatTimeAsMinutes(300));
        breakCount = 300;
        $('#timer-label').html('Session');
        $('#time-left').html(formatTimeToMMSS(count));
        clearInterval(realtimer);
        beep.pause();
        beep.currentTime = 0;
        console.log(count, breakCount);
    });
    
    $('#start_stop').click(function() {
        if($('#start_stop').html() == 'start') {
            $('#start_stop').html('stop');
            isPaused = false;
            realtimer = setInterval(timer, 1000);
            console.log("DEBUG:" + ":SESSION-LENGTH:" + $("#session-length").html() + ":BREAK-LENGTH:" + $("#break-length").html());
      
            $('#timer-label').html('Session');
            //$('#time-left').html(formatTimeToMMSS(count));
      
            function timer() {
                let currentTimer = parseTimeAsMMSS($('#time-left').html());
                if(isPaused == false) {
                  currentTimer -= 1;
                };
                
                console.log("DEBUG:TIMER-LABEL:" + $("#timer-label").html() + ":TIME-LEFT:" + $("#time-left").html());
  
                $('#time-left').html(formatTimeToMMSS(currentTimer));
                if(currentTimer < 0) {
                    beep.play();
          
                    if($('#timer-label').html() == 'Session') {
                        $('#timer-label').html('Break');
                        $('#time-left').html(formatTimeToMMSS(breakCount));
                    } else { 
                        $('#timer-label').html('Session');
                        $('#time-left').html(formatTimeToMMSS(count));
                    };
                }
            }
        } else if($('#start_stop').html() == 'stop') {
            $('#start_stop').html('start');
            isPaused = true;
            clearInterval(realtimer);
        };
    });
});
    
/*
An alternate method is to define the interval as a global variable and change it on click;
*/