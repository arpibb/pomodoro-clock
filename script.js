const breakDown = document.getElementById('break-decrement')
const breakUp = document.getElementById('break-increment')
const breakNum = document.getElementById('break-length')
console.log(breakDown)

const sessionDown = document.getElementById('session-decrement')
const sessionNum = document.getElementById('session-length')
const sessionUp = document.getElementById('session-increment')

const min = document.getElementById('min')
const sec = document.getElementById('sec')

const playPauseButton = document.getElementById('start_stop')
const restartButton = document.getElementById('reset')
console.log(playPauseButton)

const sessionOrBreakTitle = document.querySelector('#timer-label')

console.log(sessionNum)

let isTicking = false
let isBreak = false
let isSession = true
let interval

function setBreakDuration(){
  if(!isTicking){
    if(this.id==="break-decrement"){
      if(parseInt(breakNum.innerHTML)>1){
        if(isBreak){
          if(min.innerHTML !== breakNum.innerHTML){
            min.innerHTML = parseInt(breakNum.innerHTML) - 1
            breakNum.innerHTML = min.innerHTML
            sec.innerHTML = "00"
          }
          else if(min.innerHTML === breakNum.innerHTML){
            min.innerHTML = parseInt(min.innerHTML) - 1
            breakNum.innerHTML = parseInt(breakNum.innerHTML) - 1
          }
          if(parseInt(breakNum.innerHTML) < 10 && parseInt(breakNum.innerHTML) > 1){
            min.innerHTML = "0" + min.innerHTML
          }
          if(parseInt(breakNum.innerHTML)=== 1){
            min.innerHTML = "01"
          }
        }
        else if(isSession){
          breakNum.innerHTML = parseInt(breakNum.innerHTML) - 1
        }
      }
    }
    else {
      if(isBreak && parseInt(breakNum.innerHTML)<60){
        if(min.innerHTML !== breakNum.innerHTML){
          breakNum.innerHTML = parseInt(breakNum.innerHTML) + 1
          min.innerHTML = breakNum.innerHTML
          sec.innerHTML = "00"
        }
        else if(min.innerHTML === breakNum.innerHTML){
          min.innerHTML = parseInt(min.innerHTML) + 1
          breakNum.innerHTML = parseInt(breakNum.innerHTML) + 1
        }
        if(parseInt(breakNum.innerHTML) < 10 && parseInt(breakNum.innerHTML) > 1){
          min.innerHTML = "0" + min.innerHTML
        }
      }
      else if(isSession && parseInt(breakNum.innerHTML)<60){
        breakNum.innerHTML = parseInt(breakNum.innerHTML) + 1
      }
    }
  }
}

function setSessionDuration(e){
  if(!isTicking){
    if(this.id==="session-decrement"){
      if(parseInt(sessionNum.innerHTML)>1){
        if(isSession){
          if(min.innerHTML !== sessionNum.innerHTML){
            sessionNum.innerHTML = parseInt(sessionNum.innerHTML) - 1
            min.innerHTML = parseInt(sessionNum.innerHTML)
            sec.innerHTML = "00"
          }
          else if(min.innerHTML === sessionNum.innerHTML){
            min.innerHTML = parseInt(min.innerHTML) - 1
            sessionNum.innerHTML = parseInt(sessionNum.innerHTML) - 1
          }
          if(parseInt(sessionNum.innerHTML) < 10 && parseInt(sessionNum.innerHTML) > 1){
            min.innerHTML = "0" + min.innerHTML
          }
          if(parseInt(sessionNum.innerHTML)=== 1){
            min.innerHTML = "01"
          }
        }
        else if(isBreak){
          sessionNum.innerHTML = parseInt(sessionNum.innerHTML) - 1
        }
      }
    }
    else {
      if(isSession && parseInt(sessionNum.innerHTML)<60){
        if(min.innerHTML !== sessionNum.innerHTML){
          sessionNum.innerHTML = parseInt(sessionNum.innerHTML) + 1
          min.innerHTML = sessionNum.innerHTML
          sec.innerHTML = "00"
        }
        else if(min.innerHTML === sessionNum.innerHTML){
          min.innerHTML = parseInt(min.innerHTML) + 1
          sessionNum.innerHTML = parseInt(sessionNum.innerHTML) + 1
        }
        if(parseInt(sessionNum.innerHTML) < 10 && parseInt(sessionNum.innerHTML) > 1){
          min.innerHTML = "0" + min.innerHTML
        }
      }
      else if(isBreak && parseInt(sessionNum.innerHTML)<60){
        sessionNum.innerHTML = parseInt(sessionNum.innerHTML) + 1
      }
    }
  }
}

function playPause(){
  isTicking = !isTicking
  if(isTicking){
    interval = setInterval(function(){
      if(parseInt(sec.innerHTML) === 0 && parseInt(min.innerHTML) !== 0){
        console.log("param")
        sec.innerHTML = 60
        min.innerHTML = parseInt(min.innerHTML) - 1
        if(parseInt(min.innerHTML)<10){
          min.innerHTML = "0" + min.innerHTML
        }
      }
      sec.innerHTML = parseInt(sec.innerHTML) - 10
      if(parseInt(sec.innerHTML)<10){
        sec.innerHTML = "0" + sec.innerHTML
      }
      if(parseInt(sec.innerHTML) === 0 && parseInt(min.innerHTML) === 0){
        sec.innerHTML = "00"
        min.innerHTML = "00"
      }
      if(parseInt(sec.innerHTML) < 0 && parseInt(min.innerHTML) === 0){
        isBreak = !isBreak
        isSession = !isSession
        if(isBreak){
          sessionOrBreakTitle.innerHTML = "Break"
          parseInt(breakNum.innerHTML) < 10 ? min.innerHTML = "0" + breakNum.innerHTML : min.innerHTML = breakNum.innerHTML 
        }
        else{
          sessionOrBreakTitle.innerHTML = "Session"
          parseInt(sessionNum.innerHTML) < 10 ? min.innerHTML = "0" + sessionNum.innerHTML : min.innerHTML = sessionNum.innerHTML 
        }
      }
      
    }, 1000);
  }
  else{
      clearInterval(interval)
  }
}

function restart(){
  if(isTicking){
    isTicking = !isTicking
    isSession = true
    isBreak = false
    clearInterval(interval)
    sessionNum.innerHTML= "25"
    breakNum.innerHTML = "5"
    min.innerHTML = "25"
    sec.innerHTML = "00"
  }
  else{
    isSession = true
    isBreak = false
    clearInterval(interval)
    sessionNum.innerHTML= "25"
    breakNum.innerHTML = "5"
    min.innerHTML = "25"
    sec.innerHTML = "00"
  }
}

breakDown.addEventListener('click', setBreakDuration)
breakUp.addEventListener('click', setBreakDuration)

sessionDown.addEventListener('click',setSessionDuration)
sessionUp.addEventListener('click',setSessionDuration)

playPauseButton.addEventListener('click', playPause)
restartButton.addEventListener('click',restart)