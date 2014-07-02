
var dialog, form;
getVideos();

function addVideo(){ 
    var id = $('#url').val().split("=",2);
    var myData = 'title=' + $('#title').val() + '&url=' + id[1]; //build a post data structure
    $.ajax({
        type: "POST", // HTTP method POST or GET
        url: "Utils/AddVideoToDB.php", //Where to make Ajax calls
        dataType: "text", // Data type, HTML, json etc.
        data: myData, //Form variables
        success: function(response) {
            document.location.href = "AnnotationPage.html?url="+id[1];
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log("error");
            alert(thrownError);
        }
    });
   
}

dialog = $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,
      buttons: {
        "Create Video": addVideo,
      Cancel: function() {
          dialog.dialog( "close" );
        }
      },
      close: function() {
           $('input[name="title"]').val("");
            $('input[name="url"]').val("");
      }
    });
    
    form = dialog.find( "form" ).on( "submit", function( event ) {
      event.preventDefault();
      
    });
 
    $("#newVidButton").click(function(){
      dialog.dialog( "open" );
      
    });
    
    
  var data = new Array();
    
  $('#MyAnnolink').click(function(){ getVideos(); return false; });
    
  function getVideos(){

      $.ajax({
        type: "POST", // HTTP method POST or GET
        url: "Utils/getVideo.php", //Where to make Ajax calls
        dataType: "text",
        success: function(response) {
            data = JSON.parse(response);
//           title[0] = response[0].Title;
//           youtubeID[0] = response[0].URL;
//           console.log(youtubeID[0]);
           createMiddleCont();
        },
           
        error: function(xhr, ajaxOptions, thrownError) {
            console.log("error");
            alert(thrownError);
        }
    });
  }  
  
  function createMiddleCont(){
      var videoBlock = document.createElement('div');
      videoBlock.className='videoBlock';
      videoBlock.id = 'vidBlock';
      document.getElementById('middleCon').appendChild(videoBlock);
      
      var imgBlock = document.createElement('img');
      imgBlock.id = 'thumbnail'
      document.getElementById('vidBlock').appendChild(imgBlock);
       
      imgBlock.src='http://img.youtube.com/vi/'+data[0].URL +'/0.jpg';
//     document.getElementById('thumbnail').style.marginTop="20px";
//     document.getElementById('thumbnail').style.height="150px";
//     document.getElementById('thumbnail').style.width="250px";
//     document.getElementById('thumbnail').style.marginLeft="20px";
      
      
  }