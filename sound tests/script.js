// Call 'onDocumentReady' when page is loaded
console.log('Script running');
if (document.readyState != 'loading') {
  onDocumentReady();
} else {
  //document.addEventListener('DOMContentLoaded', onDocumentReady);
}

var coughs = ["assets\coughs\1.mp3", "assets\coughs\2.mp3", "assets\coughs\3.mp3"];
//var audio = new Audio('cough1.ogg');

var timer = setInterval(playCough, 3000);


// Annat försök för ljud
function playSound() {
  var sounds = [
    "http://www.mysite.com/1.wav",
    "http://www.mysite.com/2.wav",
    "http://www.mysite.com/3.wav"
  ];
}

function playCough() {
  console.log("Borde spela")
  audio.play();
  //  $.("#element").html("<embed src=\"" + Math.floor(Math.random() * (coughs.length + 1)) + "\" autostart=\"true\" />");
}
