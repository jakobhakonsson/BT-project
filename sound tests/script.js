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

Math.floor(Math.random() * 6) + 1

var coughs = ["assets\coughs\1.mp3", "assets\coughs\2.mp3", "assets\coughs\3.mp3"];
//var audio = new Audio('cough1.ogg');

function infect() {
  amountOfInfectedNearby++;
  console.log("INFECTED")
}

// Annat försök för ljud
function playSound() {
  var sounds = [
    "http://www.mysite.com/1.wav",
    "http://www.mysite.com/2.wav",
    "http://www.mysite.com/3.wav"
  ];
}

function playCough() {
  console.log(amountOfInfectedNearby)
  console.log(timerInterval)
  audio.play();
  //  $.("#element").html("<embed src=\"" + Math.floor(Math.random() * (coughs.length + 1)) + "\" autostart=\"true\" />");
}
