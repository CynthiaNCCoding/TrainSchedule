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




