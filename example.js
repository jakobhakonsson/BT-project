"use strict"
var infectedNearby = 0;
//var Inventory : infectedPerson[] = new infectedPerson[10];
var infectedPeopleNearby = new Array(15);

if (document.readyState != 'loading'){
  onDocumentReady();
} else {
  document.addEventListener('DOMContentLoaded', onDocumentReady);
}

function onDocumentReady() {
  console.log("Ready!");
  //Read from firebase database
  //https://firebase.google.com/docs/database/web/retrieve-data
  //Look at the file example.json to see the format.
  //Look at the database
  //https://console.firebase.google.com/
  /*****************Getting to know the tech*********************/
  //Read one value
  //readLastActiveFromLarsPhoneOnce();
  //readLastActiveFromLarsPhoneAndListenForUpdates();
  //readAllBluetoothDevicesLarsPhoneHasSeen();
  //readBluetoothDevicesLarsPhoneHasSeenMoreThanTenTimesAndSortThemByTimesDiscovered();
  //listenForChangesFromLarsBluetoothDevices();
  //And perhaps something more usefull...
  closeToBTDevice("84:8E:DF:AB:18:4D",60);
};

///Reading a single data value pair
//A function that read the lastActive from my phone once
function readLastActiveFromLarsPhoneOnce(){
  //Get a reference to the correct place in the database
  var ref = firebase.database().ref('/84:8E:DF:AB:18:4D/lastActive');
  //Retreive info from that reference point read it once
  ref.once('value').then(function(snapshot) {
    var key = snapshot.key; //Gets the key (variablename") "lastActive" in the name value pair {"lastActive" : 1470750295176}
    console.log(key);
    var time = snapshot.val(); //Gets the value for the variable "lastActive" in the name value pair {"lastActive" : 1470750295176}
    console.log(time);
    console.log(timeConverter(time));  //Convert to human readable time....
  });
}

//A function that hooks up a callback (Listaner) and is called everytime the variable changes
function readLastActiveFromLarsPhoneAndListenForUpdates(){
  var ref = firebase.database().ref('/84:8E:DF:AB:18:4D/lastActive');
  firebase.database().ref('/84:8E:DF:AB:18:4D/lastActive').on('value',function(snapshot) {
    var key = snapshot.key;
    console.log(key);
    var time = snapshot.val();
    console.log(timeConverter(time));
  });
}

  //In this function we are interested in knowing when Lars phone meets new and old BT-devices
function listenForChangesFromLarsBluetoothDevices(){
  var ref = firebase.database().ref('/84:8E:DF:AB:18:4D/BTFound');
  ref.on('child_changed', function(snapshot) {
    //So when the time is updated this i called
    var  friendlyName = snapshot.child("friendlyName").val();
    var  MACAddress = snapshot.child("MACAddress").val();
    var lastSeen = timeConverter(snapshot.child("lastSeen").val());
    console.log("The friendlyName: "+friendlyName + " with MACAddress "+ MACAddress +" was active close to 84:8E:DF:AB:18:4D " + lastSeen+" seconds ago.");
  });
}


//usefull perhaps
//This method checks which devices that are close to a BT-device and updates result
function closeToBTDevice(btId,timeSinceLastActivity){
  var ref = firebase.database().ref();
  //Her we will have all changes!!!
  ref.on('child_changed', function(snapshot) {
    //Check if it is the BTDevice we are looking for that is changed (Look at the structure)
    var  changed = snapshot.child("BTFound").child(btId).child("MACAddress").val();
    if(changed==btId){
      //Ok check how long time it is since it changed
      //Time now
      infectedNearby++;
      var nowInSec = Math.round(Date.now()/1000);
      //Time since the device was seen
      var  lastSeenInSec= (snapshot.child("BTFound").child(btId).child("lastSeen").val())/1000;
      var  friendlyName = (snapshot.child("BTFound").child(btId).child("friendlyName").val());
      var  friendlyNameDiscoveredDevice = (snapshot.child("friendlyName").val());
      var  MACAddressDiscoveredDevice = (snapshot.child("MACAddress").val());
      var timeDiff = Math.round(nowInSec - lastSeenInSec);
      infection(MACAddressDiscoveredDevice, timeDiff);
      //console.log("diff: " + timeDiff);
      //if(friendlyName == "Galaxy S6 edge") {
      //  console.log("Marten is best")
      //}
      console.log("There are "+infectedPeopleNearby.length+" infected people nearby.")
      if(MACAddressDiscoveredDevice=="E0:DB:10:13:C5:16") {
        console.log("Marten is here!!!")
      }
      if (timeDiff<timeSinceLastActivity){
        console.log("The device "+friendlyNameDiscoveredDevice+" with MACAddress "+MACAddressDiscoveredDevice+" was seen close to "+btId+" with friendlyname "+friendlyName+" "+timeDiff+" seconds ago");
      }
    }
  });


}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}
/*
class infectedPerson {
  var macAddress : String;
  var timeOfEncounter : String;
  constructor(var macAddress, var timeOfEncounter) {
    this.macAddress=macAddress;
    this.timeOfEncounter=timeOfEncounter;
  }
  function resetTimerIfEncounteredAgain(var timeOfEncounter) {
    this.timeOfEncounter=timeOfEncounter;
  }
  String returnMacAddress() {
    return macAddress;
  }
}
*/

function infection(){
  checkIfEncountered("E0:DB:10:13:C5:16", "12:00")
}

function infectedPerson(macAddress) {
  this.macAddress = macAddress;
  this.timeOfEncounter = timeOfEncounter;
  this.returnMacAddress = function() {
    return this.macAddress;
  }
  window.setTimeout(clearInfectedPerson(), 30000)
}

function checkIfEncountered(macAddress, time) {
  for (var i = 0; i < infectedPeopleNearby.length; i++) {
    if(infectedPeopleNearby[i]==macAddress){
      infectedPerson.timeOfEncounter = time;
    } else if(i==infectedPeopleNearby.length) {
      var addInfected = infectedPeopleNearby.push(infectedPerson(MACAddressDiscoveredDevice));
    }
  //  if(infectedPerson.timeOfEncounter > )
  }
}
