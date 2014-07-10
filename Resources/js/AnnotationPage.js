var player, videoID;
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//load saved annotations
getIDFromURL();
getAnnotationList(1);

//once loaded get youtubeID from videoID
var youtubeID = new Array();

function getIDFromURL(){
    var query = window.location.search.substring(1);
    var vars = query.split("=");
    videoID = vars[1];
}

function getURLById() {
    $.ajax({
        async: false,
        type: "POST", // HTTP method POST or GET
        data: 'action=getVideoUrl&videoID=' + videoID + '&userID=1',
        url: "Utils/getVideo.php", //Where to make Ajax calls
        dataType: "text",
        success: function(response) {
            youtubeID = JSON.parse(response);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log("error");
            alert(thrownError);
        }
    });
}


function onYouTubeIframeAPIReady() {
    getURLById();

    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: youtubeID[0].URL,
        playerVars: {
            'autoplay': 1
        },
        events: {
            'onReady': onPlayerReady,
        }
    }
    );
}

function onPlayerReady(event) {
    //  event.target.playVideo();
}

//Handles annotation button
var annotateBtn = document.getElementById('annotate');
annotateBtn.addEventListener('click', function(event) {
    submit();
});

var keyCount = 0;
function submit() {
    var annotation = document.forms['noteForm']['noteArea'].value;
    document.getElementById('noteArea').value = "";
    var totalSec = player.getCurrentTime();
    addAnnotationToDB(annotation,totalSec);
    
    setTimeout(function() {
        getAnnotationList(1, createAnnotationContainer);
    }, 200);
    

    keyCount = 0;
    player.playVideo();
}
;

function createAnnotationContainer(response){
    $('#canvas').html('');
    var result = new Array();
    result = JSON.parse(response);
    
    for(var i = 0; i<result.length; i++){
        $noteID = result[i].AnnotationID;
        var row = createNoteRow($noteID);
        var rowTime = createRowTime(row,$noteID);
        var rowNote = createRowNote(row,$noteID);
        
        document.getElementById(rowTime).innerHTML += convertToTime(result[i].Time);
        document.getElementById(rowNote).innerHTML += result[i].Annotation;
    }
}


function getAnnotationList(userID,callback){
     $.ajax({
        type: "POST", // HTTP method POST or GET
        data: 'action=getAnnotationList&VideoID='+videoID+'&UserID='+userID,
        url: "Utils/getVideo.php", //Where to make Ajax calls
        dataType: "text",
        success: function(response){
            createAnnotationContainer(response);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log("error");
            alert(thrownError);
        }
    });
}

function addAnnotationToDB(annotation,time){
    var myData = 'action=addAnnotation&VideoID=' + videoID + '&UserID=1' +'&Time='+time+'&Annotation='+annotation; //build a post data structure
    $.ajax({
        type: "POST", // HTTP method POST or GET
        url: "Utils/SubmitToDB.php", //Where to make Ajax calls
        dataType: "text", // Data type, HTML, json etc.
        data: myData, //Form variables
        success: function(response) {
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log("error");
            alert(thrownError);
        }
    });
}

$("#noteArea").keyup(function(e) {
    keyCount += 1;
    if (keyCount == 1)
        player.pauseVideo();
});

$("#noteArea").keyup(function(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) { //Enter keycode
        submit();
    }
});
//*****

function convertToTime(totalSec) {

    //delay of -3
    if (totalSec > 5)
        totalSec -= 4;
    var hours = parseInt(totalSec / 3600) % 24;
    var minutes = parseInt(totalSec / 60) % 60;
    var seconds = Math.round(totalSec % 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (hours === 0) {
        return minutes + ":" + seconds;
    }
    else {
        return (hours * 60) + minutes + ":" + (seconds);
    }


}

//Handles seeking button
function convertToSeconds(time) {
    var array = new Array();
    array = time.split(":");
    if (array[0] == 0) {
        time = parseInt(array[1]);
    }
    else {
        time = (parseInt(array[0]) * 60) + parseInt(array[1]);
    }
    return time;
}

function createNoteRow(id) {
    var id = 'row_' + id;
    var row = document.createElement('div');
    row.id = id;
    row.className = 'rw';
    document.getElementById('canvas').appendChild(row);
    return id;
}
;

function createRowTime(rowID, noteID) {
    var id = 'time_' + noteID;
    var time = document.createElement('div');

    time.id = id;
    document.getElementById(rowID).appendChild(time);
    var element = document.getElementById(id);
 
    element.addEventListener('click', function(event) {
        player.seekTo(convertToSeconds(element.innerHTML));
    });
    return id;
}

function createRowNote(rowID, noteID) {
    var id = 'note_' + noteID;
    var note = document.createElement('div');
    note.id = id;
    note.className = 'rowNote';
    document.getElementById(rowID).appendChild(note);

    var editid = 'edit_' + noteID;
    var edit = document.createElement('div');
    edit.id = editid;
    document.getElementById(rowID).appendChild(edit);
    document.getElementById(editid).innerHTML = "Edit";;

    $('#' + editid).click(function() {
        var id = '#' + note.id;
        $(id).html("<textarea class='rowTextArea'>" + document.getElementById(note.id).innerText + "</textarea>");
    });

    var deleteid = 'delete_' + noteID;
    var del = document.createElement('div');
    del.id = deleteid;
    document.getElementById(rowID).appendChild(del);
    document.getElementById(deleteid).innerHTML = "Delete";
    return id;
}
;


$(document).on('keyup', "textarea.rowTextArea", function(e) {
    var input = $(".rowTextArea").val();
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) { //Enter keycode
        $('.rowTextArea').replaceWith("<div class='rowNote'>" + input + "</div>");
    }
});

// on click listners

 $(document.body).on('click', 'div[id^="note_"]' ,function(event){
    $noteID = splitHtmlId(event.target.id);
    player.seekTo(convertToSeconds(document.getElementById('time_'+$noteID).innerHTML));
  });
  
   $(document.body).on('click', 'div[id^="delete_"]' ,function(event){
    $noteID = splitHtmlId(event.target.id);
      $.ajax({
        type: "POST", // HTTP method POST or GET
        data: 'action=deleteAnnotation&NoteID='+$noteID,
        url: "Utils/SubmitToDB.php", //Where to make Ajax calls
        dataType: "text",
        success: function(response){
            getAnnotationList(1);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log("error");
            alert(thrownError);
        }
    });
    
  });
  
  function splitHtmlId(htmlId){
    $id = htmlId.split("_");
    return $id[1];
  }


