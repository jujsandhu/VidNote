var player;


var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId:'4Lki_IeM6bQ',
        events: {
            'onReady': onPlayerReady,
        }
    }
    );
}

function onPlayerReady(event) {
    //event.target.playVideo();
}

//url button
document.getElementById('urlclick').onclick = function() {
    var y = document.forms['urlForm']['url'].value.split("=",2);    
    player.loadVideoById(y[1]);
};

//Handles annotation button
var annotateBtn = document.getElementById('annotate');
annotateBtn.addEventListener('click', function(event) {
  submit();
});
var keyCount = 0;
function submit() {
    var y = document.forms['noteForm']['noteArea'].value; 
    document.getElementById('notes').innerHTML += y+"<br />";
    document.getElementById('times').innerHTML += convertToTime()+"<br />";
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
    var hours = parseInt( totalSec / 3600 ) % 24;
    var minutes = parseInt( totalSec / 60 ) % 60;
    var seconds =  Math.round(totalSec % 60);

    var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + 
        (seconds  < 10 ? "0" + seconds : seconds);

    return result;
}






