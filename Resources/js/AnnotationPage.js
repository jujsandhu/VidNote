var player, videoID;
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//load saved annotations
getIDFromURL();
getAnnotationList();


//once loaded get youtubeID from videoID
var youtubeID = new Array();

function getIDFromURL() {
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
        height: '310',
        width: '592',
        videoId: youtubeID[0].URL,
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'showinfo': 0,
            'frameborder': 0
        },
        events: {
            'onReady': onPlayerReady,
        }
    }
    );
}

function onPlayerReady(event) {
    $("#beginTime").html("0:00");
    $("#endTime").html(convertToTime(player.getDuration()));
    getImportantMarkListFromDB(1);
    function updateTime() {
      moveCursor(player.getCurrentTime());
  }
  timeupdater = setInterval(updateTime, 1000);
}


var keyCount = 0;
function submit() {
    var annotation = document.forms['noteForm']['noteArea'].value;
    document.getElementById('noteArea').value = "";
    var totalSec = player.getCurrentTime();
    addAnnotationToDB(annotation, totalSec);

    setTimeout(function() {
        getAnnotationList();
    }, 200);


    keyCount = 0;
    player.playVideo();
}
;


function createAnnotationContainer(response) {
    $('#canvas').html('');
    var result = new Array();
    result = JSON.parse(response);

    for (var i = 0; i < result.length; i++) {
        $noteID = result[i].AnnotationID;
        var row = createNoteRow($noteID);
        var rowTime = createRowTime(row, $noteID);
        var rowNote = createRowNote(row, $noteID);

        document.getElementById(rowTime).innerHTML += convertToTime(result[i].Time);
        document.getElementById(rowNote).innerHTML += result[i].Annotation;
    }
}

//gets list of annotation from database
function getAnnotationList() {
    $.ajax({
        type: "POST", // HTTP method POST or GET
        data: 'action=getAnnotationList&VideoID=' + videoID,
        url: "Utils/getVideo.php", //Where to make Ajax calls
        dataType: "text",
        success: function(response) {
            createAnnotationContainer(response);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log("error");
            alert(thrownError);
        }
    });
}

function addAnnotationToDB(annotation, time) {
    var myData = 'action=addAnnotation&VideoID=' + videoID + '&Time=' + time + '&Annotation=' + annotation; //build a post data structure
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

//converts total second to hh:mm:ss format for display
function convertToTime(totalSec) {

    //delay of -5
    if (totalSec > 5)
        totalSec -= 5;
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

//converts hh:mm:ss format back to seconds
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
    document.getElementById(editid).innerHTML = "Edit";
    ;

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

// on click listeners for note and delete button

$(document.body).on('click', 'div[id^="note_"]', function(event) {
    $noteID = splitHtmlId(event.target.id);
    $seconds = convertToSeconds(document.getElementById('time_' + $noteID).innerHTML);
    moveCursor($seconds);
    player.seekTo($seconds);
});

$(document.body).on('click', 'div[id^="delete_"]', function(event) {
    $noteID = splitHtmlId(event.target.id);
    $.ajax({
        type: "POST", // HTTP method POST or GET
        data: 'action=deleteAnnotation&NoteID=' + $noteID,
        url: "Utils/SubmitToDB.php", //Where to make Ajax calls
        dataType: "text",
        success: function(response) {
            getAnnotationList();
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log("error");
            alert(thrownError);
        }
    });

});

function splitHtmlId(htmlId) {
    $id = htmlId.split("_");
    return $id[1];
}


/********************Edit Feature (grey timeline at the bottom)***************************/

function createInitialEditFeature(response){
    var result = new Array();
    result = JSON.parse(response);

    for (var i = 0; i < result.length; i++) {
        createImportantMark(result[i].Type,result[i].Time);
    }
}

//adds the important mark to the db
function addImportantToDB(type, time) {
    var myData = 'action=addImportantMark&VideoID=' + videoID + '&Time=' + time + '&Type=' + type; //build a post data structure
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

//returns list of all important marks on video
function getImportantMarkListFromDB(userID){
       $.ajax({   
        type: "POST", // HTTP method POST or GET
        data: 'action=getImportantMarkList&VideoID=' + videoID + '&UserID=' + userID,
        url: "Utils/getVideo.php", //Where to make Ajax calls
        dataType: "text",
        success: function(response) {
            createInitialEditFeature(response);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log("error");
            alert(thrownError);
        }
    });
}

$("#verticalCursor").draggable({containment: "#editFeature", scroll: true, scrollSpeed: 100});

function coordinates(element) {
    $endPixel = 601;

    element = $(element);
    var left = element.position().left;

    $percentageMove = 1 - (($endPixel - left) / $endPixel);
    $seconds = $percentageMove * player.getDuration();
    return $seconds;

};

$('#verticalCursor').draggable({
    start: function() {
        coordinates('#verticalCursor');
    },
    stop: function() {
        player.seekTo(coordinates('#verticalCursor'));
    }
});

$divLength = $('#editFeature').width();
$divStartPixel = 12;

$('#editFeature').click(function(e) {
    var offset = $(this).offset();
    var relativeX = (e.pageX - offset.left);

    $percentageMove = 1 - (($divLength - relativeX) / $divLength);
    $seconds = $percentageMove * player.getDuration();
    console.log(relativeX + $divStartPixel);
    $('#verticalCursor').css('left', relativeX + $divStartPixel);
    player.seekTo($seconds);

});

function moveCursor(seconds) {
    $('#verticalCursor').css('left', getNewXCord(seconds));
}

function getNewXCord(seconds){
    $divStartPixel = 12;
    $divLength = $('#editFeature').width();
    $percentage = seconds / player.getDuration();
    $newXCord = ($percentage * $divLength)+$divStartPixel;
    return $newXCord;
    
}

$('#highImpImg').click(function(e) {
    $time = player.getCurrentTime();
    addImportantToDB('high',$time);
    createImportantMark('high',$time);
});

$('#lowImpImg').click(function(e) {
    $time = player.getCurrentTime();
    addImportantToDB('low',$time);
    createImportantMark('low',$time);
});

function createImportantMark(type,time){
    var mark = document.createElement('div');
    mark.id= 'typeImp_'+time;
    mark.className = type+'ImpMark';
    document.getElementById('important').appendChild(mark);
    document.getElementById(mark.id).style.left= getNewXCord(time)+'px';
}
