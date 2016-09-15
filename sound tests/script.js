// Call 'onDocumentReady' when page is loaded
console.log('Script running');
if (document.readyState != 'loading') {
  onDocumentReady();
} else {
  //document.addEventListener('DOMContentLoaded', onDocumentReady);
}

var amountOfInfectedNearby = 0;
var timerInterval = 0;
var audio = new Audio('assets/1.mp3');


function timerAdjustment() {
  console.log("hej")
  if (amountOfInfectedNearby == 0) {
    clearTimeout(timer);
    var updateTimer = setTimeout(timerAdjustment, 1000);
    console.log("bajs")
  } else {
    timerInterval = Math.max(10000/amountOfInfectedNearby, 3000);
    var timer = setTimeout(timerAdjustment, timerInterval);
    clearTimeout(updateTimer);
    playCough();
  }
}

timerAdjustment();

var coughs = ['assets/1.mp3', 'assets/2.wav', 'assets/3.wav'];

timerAdjustment();

function infect() {
  amountOfInfectedNearby++;
  console.log("INFECTED")
}

function playCough() {
  randomiseCough();
  console.log(amountOfInfectedNearby)
  console.log(timerInterval)
  audio.play();
}

function randomiseCough() {
  console.log("wat")
  audio = new Audio(coughs[(Math.floor(Math.random() * coughs.length) + 1)-1]);
  console.log(audio)
}
