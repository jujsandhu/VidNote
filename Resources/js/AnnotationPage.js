var player;
var noteCounter = -1;

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


function onYouTubeIframeAPIReady() {
    var query = window.location.search.substring(1);
    var vars = query.split("=");
    var youtubeID = vars[1];
    
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId:youtubeID,
        events: {
            'onReady': onPlayerReady,
        }
    }
    );
}

function onPlayerReady(event) {
    //event.target.playVideo();
}

//Handles annotation button
var annotateBtn = document.getElementById('annotate');
annotateBtn.addEventListener('click', function(event) {
  submit();
});
var keyCount = 0;
function submit() {
    noteCounter++;
    var row = createNoteRow();
    var rowTime = createRowTime(row);
    var rowNote = createRowNote(row);
    
    var submission = document.forms['noteForm']['noteArea'].value; 
    document.getElementById(rowTime).innerHTML += convertToTime();
    document.getElementById(rowNote).innerHTML += submission;
    document.getElementById('noteArea').value = "";
    keyCount = 0;
    player.playVideo();
};


$("#noteArea").keyup(function(e){
    keyCount += 1;
    if(keyCount == 1)
      player.pauseVideo();
});

$("#noteArea").keyup(function(e){
    var code = (e.keyCode ? e.keyCode : e.which);
 if(code == 13) { //Enter keycode
         submit();
 }
});
//*****

function convertToTime(){
    var totalSec = player.getCurrentTime();
    
    //delay of -3
    
    if(totalSec > 5) totalSec -= 3;
    var hours = parseInt( totalSec / 3600 ) % 24;
    var minutes = parseInt( totalSec / 60 ) % 60;
    var seconds =  Math.round(totalSec % 60);
    
    if(seconds < 10){
        seconds = "0"+seconds;
    }
    
    if(hours===0){
          return minutes+":"+seconds;
    }      
    else{
        return (hours*60)+minutes + ":" + (seconds); 
    }
    
    
}

//Handles seeking button
function convertToSeconds(time){
  var array = new Array();
  array = time.split(":");
  if(array[0]==0){
      time =parseInt(array[1]);
  }
  else{
      time = (parseInt(array[0])*60)+parseInt(array[1]);
  }
  return time;
}

function createNoteRow(){
    var id = 'row'+noteCounter;
    var row = document.createElement('div');
    row.id = id;
    row.className='rw';
    document.getElementById('canvas').appendChild(row);
    var element = document.getElementById(id);
    element.style.height="100%";
    element.style.marginTop="4px";
    element.style.padding = "4px";
    element.style.cssFloat="left";
    element.style.width="500px";
    element.style.borderBottom="thin solid #d0c8c8";
    return id;
};

function createRowTime(rowID){
    var id = 'time'+noteCounter;
    var time = document.createElement('div');
    
    time.id = id;
    document.getElementById(rowID).appendChild(time);
    var element = document.getElementById(id);
    element.style.cssFloat="left";
    element.style.color="black";
    element.style.fontWeight = "900";
    element.style.height="30px";
    element.style.width="65px";
    element.addEventListener('click', function(event) {
    player.seekTo(convertToSeconds(element.innerHTML));
});
    return id;
}

function createRowNote(rowID){
    var id = 'note'+noteCounter;
    var note = document.createElement('div');
    note.id = id;
    note.className='rowNote';
    document.getElementById(rowID).appendChild(note);
    
    var editid = 'edit'+noteCounter;
    var edit = document.createElement('div');
    edit.id = editid;
   document.getElementById(rowID).appendChild(edit);
     var editelement = document.getElementById(editid);
 
    editelement.innerHTML="Edit";
    editelement.style.fontSize="12px";
    editelement.style.cssFloat="left";
    editelement.style.color="#d0c8c8";
    
    $('#'+editid).click(function(){
        console.log('suo');
    var id = '#' + note.id;
    console.log(note.id);
    $(id).html("<textarea class='rowTextArea'>" + document.getElementById(note.id).innerText + "</textarea>");
});

    var deleteid = 'delete'+noteCounter;
    var del = document.createElement('div');
    del.id = deleteid;
    document.getElementById(rowID).appendChild(del);
    var editelement = document.getElementById(deleteid);
    editelement.innerHTML="Delete";
    editelement.style.fontSize="12px";
    editelement.style.cssFloat="left";
    editelement.style.marginLeft="10px";
    editelement.style.color="#d0c8c8";
    return id;
};


$(document).on('keyup', "textarea.rowTextArea",function (e) {
    var input = $(".rowTextArea").val();
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) { //Enter keycode
        $('.rowTextArea').replaceWith("<div class='rowNote'>"+input+"</div>");
    }
});




