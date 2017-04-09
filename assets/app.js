$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAbvxVxL9q3n8-YKUpZpkdfIioHu3Rewak",
    authDomain: "trainschedule-63800.firebaseapp.com",
    databaseURL: "https://trainschedule-63800.firebaseio.com",
    projectId: "trainschedule-63800",
    storageBucket: "trainschedule-63800.appspot.com",
    messagingSenderId: "291341228106"
  };

  firebase.initializeApp(config);


    //declaring variables

    var db = firebase.database();
    var schedule = db.ref("schedule");

    // initialize UI
    schedule.on('child_added', function(data) {
        //console.log(data);
        console.log(data.key);
        console.log(data.val());
        var newRow = '<tr id="' + data.key + '">' +
            '<td>' + data.val().trainName + '</td>' +
            '<td>' + data.val().trainDest + '</td>' +
            '<td>' + data.val().trainTime + '</td>' +
            '<td>' + data.val().trainFreq + '</td>' +
            '</tr>';
        $('#schedule-table tbody').append(newRow);

        var now = moment();
        var firstRun = moment();
        var hrsMins = data.val().trainTime.split(":");
        firstRun.hour(hrsMins[0]);
        firstRun.minute(hrsMins[1]);
        firstRun.second(0);

        while (!now.isBefore(firstRun)) {
            firstRun.add(data.val().trainFreq, 'minutes');
        }

        if (!now.isBefore(firstRun)) {
            var diff = now.diff(firstRun);
            var hoursDiff = diff.asHours();
            var minsDiff = diff.mins();
            var secsDiff = diff.secs();
            var niceDisplayDiff = diff.humanize();

        } else {

        }
    });

    //get user Inputs
    $("#train-form").on("submit", function() {
        var trainName;
        var trainDest;
        var trainTime;
        var trainFreq;
        trainName = $("#train-name").val().trim();
        trainDest = $("#train-dest").val().trim();
        trainTime = $("#train-time").val();
        trainFreq = $("#train-freq").val();

        console.log(trainName);
        console.log(trainDest);
        console.log(trainTime);
        console.log(trainFreq);

        var ref = schedule.push();
        ref.set({
            'trainName': trainName,
            'trainDest': trainDest,
            'trainTime': trainTime,
            'trainFreq': trainFreq
        });

         return false;

    });
});

//uploads data to Firebase



/***  EVENTS  ***/


//firebase.js function of child added, run function with returned parameter
        

//variables for name, destination, frequency, and start time


//subtract one year to ensure to time conflicts over calculated microseconds.

//call moments library

//format currentMinute, post to html

//append and display train schedule






// -------------------------------------------
// $(document).ready(function() {
// 	console.log('sanity check passed!');


// // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyBLMaw2xPOrFDlWf0uclvX08X5rA1vFGJY",
//     authDomain: "ride-the-train.firebaseapp.com",
//     databaseURL: "https://ride-the-train.firebaseio.com",
//     storageBucket: "ride-the-train.appspot.com",
//     messagingSenderId: "478455616514"
//   };
//   firebase.initializeApp(config);


// //declaring variables
// var database = firebase.database();
// //var  = "";

// //get user Inputs
// getInputs = function(){
// 	var a = $('#trainNameInput').val().trim();
// 	var b = $('#destinationInput').val().trim();
// 	var c = $('#firstTrainTimeInput').val().trim();
// 	var d = $('frequencyInput').val().trim();

// 	var nextTrain = {
// 		trainName: a,
// 		destination: b,
// 		firstTrainTime: c,
// 		frequency: d

// 	}

// //uploads data to Firebase
//         database.ref('trains').push(nextTrain);
//         console.log(userInputs.a);
//         console.log(userInputs.b);
//         console.log(userInputs.c);
//         console.log(userInputs.d);
//         alert('train successfully added')
//         clearForms();
//     };


//     clearForms= function() {
//         $('#trainNameInput').val('');
//         $('#destinationInput').val('');
//         $('#firstTrainTimeInput').val('');
//         $('#frequencyInput').val('');
//         getInputs;
//     };



//     /***  EVENTS  ***/
//     $('#submitButton').on('click', function() {
//         getInputs();
//         return true; 
//     });

//     //firebase.js function of child added, run function with returned parameter
//     database.ref('trains').on('child_added', function(snapshot) {
        

//         //variables for name, destination, frequency, and start time
//         var dbName = snapshot.val().name;
//         var dbDestination = snapshot.val().destination;
//         var dbFirstTrain = snapshot.val().start;
//         var dbFrequency = snapshot.val().frequency;

//         console.log(dbName, dbDestination, dbFirstTrain, dbFrequency);
        

//         var trainFrequency = dbFrequency;
//         var firstTrain = dbFirstTrain;

//         //subtract one year to ensure to time conflicts over calculated microseconds.
//         var fixTime = moment.unix(firstTrain).format('hh:mm');
//         //call moments library
//         var currentMinute = moment();
//         //format currentMinute, post to html
//         $('#currentTimeSpan').html(' Current Time : ' + currentMinute.format('hh:mm'));

//         var timeDifference = moment().diff(moment(fixTime), 'minutes');

//         var timeRemaining = timeDifference % trainFrequency;

//         var minutesTillTrain = trainFrequency - timeRemaining;

//         var nextTrain = moment().add(minutesTillTrain, 'minutes');
//         var arrivalTime = moment(nextTrain).format('hh:mm');

//         //append and display train schedule
//         $("#trainSchedule").append("<tr><td>" + dbName + "</td><td>" + dbDestination + "</td><td>" + dbFirstTrain + "</td><td>" + dbFrequency + "</td><td>" + arrivalTime + "</td><td>" + minutesTillTrain + " Minutes" + "</td></tr>");

//     });

// });
// Contact GitHub API Training Shop Blog About
// © 2017 GitHub, Inc. Terms Privacy Security Status Help



