// This function tells you how many devices a selected device has seen within a set timeframe
var deviceMacAddress = "E0:DB:10:13:C5:16";

var coughs = ['coughs/1.mp3', 'coughs/2.wav', 'coughs/3.wav', 'coughs/4.wav', 'coughs/5.wav', 'coughs/6.wav', 'coughs/7.wav',
              'coughs/8.mp3', 'coughs/9.wav', 'coughs/10.mp3', 'coughs/11.wav', 'coughs/12.wav', 'coughs/13.wav', 'coughs/14.wav',
              'coughs/15.wav', 'coughs/16.wav', 'coughs/17.wav', 'coughs/18.wav', 'coughs/19.wav', 'coughs/20.flac', 'coughs/21.aiff',
              'coughs/22.wav', 'coughs/23.wav', 'coughs/24.wav', 'coughs/25.mp3', 'coughs/26.wav', 'coughs/27.wav', 'coughs/28.mp3',
              'coughs/29.wav', 'coughs/30.wav', 'coughs/31.wav', 'coughs/32.wav', 'coughs/33.wav', 'coughs/34.wav', 'coughs/35.wav',
              'coughs/36.wav', 'coughs/37.wav', 'coughs/38.mp3'];

var timerInterval = 0;
var amountOfInfectedNearby = 0;
var pause = true;

function playPause() {
  pause = !pause;
  deviceMacAddress = document.getElementById("macInput").value;
  console.log(deviceMacAddress)
  if (pause) console.log("PAUSED")
  else console.log("STARTED")
}

seenRecently(deviceMacAddress);

function seenRecently(MACAddress){
  var searchPath = "/" + MACAddress + "/BTFound"; // Creates the string of the BTfound for the specified MACaddress
  var ref = firebase.database().ref(searchPath);
  //var maxSeen = 10;

  // Update everytime a change in the search path appears
  firebase.database().ref(searchPath).on('value',function(snapshot) {
  	var key = snapshot.key;

      // Variables needed to find out number of devices currently seeing you
      var withinTimeFrame = 0;
      var outsideTimeFrame = 0;
      var lastSeen = 0;
      var currentTime = 0;
      var tolerance = 30;

    // Get variables from each child within BTFound
    snapshot.forEach(function(childSnapshot) {
      currentTime = Math.round(Date.now()/1000); // Find out the current time

      var friendlyName = childSnapshot.child("friendlyName").val();
      var MACAddress = childSnapshot.child("MACAddress").val();
      lastSeen = Math.round(childSnapshot.child("lastSeen").val()/1000);

      // If a device was last seen within the set timeframe, add it to the counter and print the device details
      if (lastSeen >= currentTime - tolerance) {
      	withinTimeFrame++;
      	console.log("Device found!\t Device " + friendlyName + " (" + MACAddress + ") was seen " + (currentTime - lastSeen) + " seconds ago!");
        console.log(withinTimeFrame)
      }

      // If a device was not seen within the timeframe, add it to another counter.
      if (lastSeen < currentTime - tolerance) {
      	outsideTimeFrame++;
      }

      amountOfInfectedNearby = withinTimeFrame;
  });
    if (withinTimeFrame == 0){
    	console.log("No devices nearby");
    }
});
}

function timerAdjustment() {
  if (amountOfInfectedNearby == 0 || pause) {
    clearTimeout(timer);
    var updateTimer = setTimeout(timerAdjustment, 1000);
  } else {
    timerInterval = Math.max(10000/(amountOfInfectedNearby/2), 2000);
    var timer = setTimeout(timerAdjustment, timerInterval);
    clearTimeout(updateTimer);
    playCough();
  }
}

timerAdjustment();

function playCough() {
  randomiseCough();
  console.log(amountOfInfectedNearby)
  console.log(timerInterval)
  audio.play();
}

function randomiseCough() {
  audio = new Audio(coughs[(Math.floor(Math.random() * coughs.length) + 1)-1]);
  console.log(audio)
}
