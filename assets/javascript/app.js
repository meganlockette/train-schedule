var config = {
  apiKey: "AIzaSyA1fQ-V-M3zJtNGoK0sAsDNcE5Qqy8bV44",
  authDomain: "train-schedule-ec948.firebaseapp.com",
  databaseURL: "https://train-schedule-ec948.firebaseio.com",
  projectId: "train-schedule-ec948",
  storageBucket: "train-schedule-ec948.appspot.com",
  messagingSenderId: "107998113575",
  appId: "1:107998113575:web:7bc41db69c504aed458302",
  measurementId: "G-BHH373DNDH"
};
// Initialize Firebase
firebase.initializeApp(config);



var trainData = firebase.database();

$("#btn-add").on("click", function(){

var trainName = $("#train-name").val().trim();
var trainDestination = $("#train-destination").val().trim();
var trainTime = moment($("#train-time").val().trim(), "HH:mm").format('LT');
var trainFrequency = $("#time-freq").val().trim();

var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency
}
console.log(newTrain);
trainData.ref().push(newTrain);

alert("New Train Added!");

$("#train-name").val("");
$("#train-destination").val("");
$("#train-time").val("");
$("#time-freq").val("");

return false;

})

trainData.ref().on("child_added",function(snapshot){
var name = snapshot.val().name;
var destination = snapshot.val().destination;
var trainTime = snapshot.val().time;
var frequency = snapshot.val().frequency;

var remainder = moment().diff(moment.unix(trainTime),"minutes")%frequency; 
var minutes = frequency - remainder;
var arrival = moment().add(minutes, "m").format("hh:mm A");

console.log(remainder);
console.log(minutes);
console.log(arrival);

// $(window).load(function(){
//   // Initiate moment here and console.log it
//   console.log( moment() );
// });

$("#trainTable > tbody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");

});


