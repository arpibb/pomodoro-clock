const breakDown = document.getElementById('break-length-down')
const breakUp = document.getElementById('break-length-up')
const breakNum = document.getElementById('break-length-num')

const sessionDown = document.getElementById('session-length-down')
const sessionNum = document.getElementById('session-length-num')
const sessionUp = document.getElementById('session-length-up')

const min = document.getElementById('min')
const sec = document.getElementById('sec')

const playPauseButton = document.getElementById('play-pause')
const restartButton = document.getElementById('restart')

let isSession = false
let isBreak = false
let sessionMins = sessionNum.innerHTML

function setBreakDuration(){
  if(!isBreak){
    if(this.id==="break-length-down"){
      if(parseInt(breakNum.innerHTML)>1)
        breakNum.innerHTML = parseInt(breakNum.innerHTML) - 1
        if(parseInt(breakNum.innerHTML) < 10 && parseInt(breakNum.innerHTML) > 0){
          breakNum.innerHTML = "0" + breakNum.innerHTML
        }    
      }
    else{
      breakNum.innerHTML = parseInt(breakNum.innerHTML) + 1
      if(parseInt(breakNum.innerHTML) < 10 && parseInt(breakNum.innerHTML) > 0){
        breakNum.innerHTML = "0" + breakNum.innerHTML
      }   
    }
  }
}

function setSessionDuration(e){
  if(!isSession){
    if(this.id==="session-length-down"){
      if(parseInt(min.innerHTML)>1)
        if(min.innerHTML !==sessionNum.innerHTML){
          sessionNum.innerHTML = parseInt(sessionNum.innerHTML) - 1
          min.innerHTML = sessionNum.innerHTML
          sec.innerHTML = "00"
        }
        else{
          min.innerHTML = parseInt(min.innerHTML) - 1
          sessionNum.innerHTML = parseInt(sessionNum.innerHTML) - 1
          sessionMins = sessionNum.innerHTML
        }
    }
    else{
      if(min.innerHTML !==sessionNum.innerHTML){
        sessionNum.innerHTML = parseInt(sessionNum.innerHTML) + 1
        min.innerHTML = sessionNum.innerHTML
        sec.innerHTML = "00"
      }
      else{
        min.innerHTML = parseInt(min.innerHTML) + 1
        sessionNum.innerHTML = parseInt(sessionNum.innerHTML) + 1
        sessionMins = sessionNum.innerHTML
      }
    }
  }
}

let interval

function playPause(){
  isSession = !isSession
  if(isSession){
    interval = setInterval(function(){
      if(parseInt(sec.innerHTML) === 0 && parseInt(min.innerHTML) !== 0){
        sec.innerHTML = 60
        min.innerHTML = parseInt(min.innerHTML) - 1
      }
      sec.innerHTML = parseInt(sec.innerHTML) - 5
      if(parseInt(sec.innerHTML) === 0 && parseInt(min.innerHTML) === 0){
        isBreak = !isBreak
        if(isBreak){
          console.log(breakNum.innerHTML)
          min.innerHTML = breakNum.innerHTML
        }
        else{
          min.innerHTML = sessionNum.innerHTML
        }
      }
    }, 1000);
  }
  else{
      clearInterval(interval)
  }
}

function restart(){
  if(isSession){
    isSession = !isSession
    clearInterval(interval)
    sessionNum.innerHTML= "25"
    breakNum.innerHTML = "5"
    min.innerHTML = sessionNum.innerHTML
    sec.innerHTML = "00"
  }
  else{
    clearInterval(interval)
    sessionNum.innerHTML= "25"
    breakNum.innerHTML = "5"
    min.innerHTML = sessionNum.innerHTML
    sec.innerHTML = "00"
  }
  console.log(isSession)
}


breakDown.addEventListener('click', setBreakDuration)
breakUp.addEventListener('click', setBreakDuration)

sessionDown.addEventListener('click',setSessionDuration)
sessionUp.addEventListener('click',setSessionDuration)

playPauseButton.addEventListener('click', playPause)
restartButton.addEventListener('click',restart)