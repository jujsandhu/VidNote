
var dialog, form;
getCategoryList();
getVideos();

function addVideo(){ 
    var id = $('#url').val().split("=",2);
    var myData = 'action=addVideo&title=' + $('#title').val() + '&url=' + id[1]+'&category='+$('#category').val(); //build a post data structure
    $.ajax({
        type: "POST", // HTTP method POST or GET
        url: "Utils/SubmitToDB.php", //Where to make Ajax calls
        dataType: "text", // Data type, HTML, json etc.
        data: myData, //Form variables
        success: function(response) {
            document.location.href = "AnnotationPage.php?id="+response;
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log("error");
            alert(thrownError);
        }
    });
   
}

dialog = $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 310,
      width: 330,
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
      },
      create:function () {
        $(this).closest(".ui-dialog")
            .find(".ui-button:first") // the first button
            .addClass("addVideoBtn");
    }
    });
    
    form = dialog.find( "form" ).on( "submit", function( event ) {
      event.preventDefault();
      
    });
 
    $("#newVidButton").click(function(event){
      dialog.dialog( "open" );
      
    });
    
    
 
  
  $('#MyAnnolink').click(function(){ 
      getVideos(); 
      return false; 
  });
    
  function getVideos(){
      $.ajax({
        type: "POST", // HTTP method POST or GET
        data: {action: 'getVideos'},
        url: "Utils/getVideo.php", //Where to make Ajax calls
        dataType: "text",
        success: function(response) {
           var data = new Array();
           data = JSON.parse(response);
           createMiddleCont(data);
        },
           
        error: function(xhr, ajaxOptions, thrownError) {
            console.log("error");
            alert(thrownError);
        }
    });
  }  
  
  function createMiddleCont(data){
      $('#middleCon').html("");
      
      $numOfVidsPerRow = 5;
      
      var middleCanvas = document.createElement('div');
      middleCanvas.className='middleCanvas';
      middleCanvas.id = 'mCanvas';
      document.getElementById('middleCon').appendChild(middleCanvas);
      
      for (i = 0; i < data.length; i++) { 
          $rownum = Math.floor(i/$numOfVidsPerRow);
           if(i%$numOfVidsPerRow == 0){
               var vidRow = document.createElement('div');
               vidRow.className='vidRow';
               vidRow.id = 'vidRow_'+$rownum;
               document.getElementById('mCanvas').appendChild(vidRow);
           }
           addHTML(i, $rownum,data);
      } 
  }
  
  
  function addHTML(jsonRow,htmlRow,data){
      
      var videoID = data[jsonRow].VideoID;
      var videoBlock = document.createElement('div');
      videoBlock.className='videoBlock';
      videoBlock.id = 'vidBlock_'+videoID;
      document.getElementById('vidRow_'+htmlRow).appendChild(videoBlock);
      
      var imgBlock = document.createElement('img');
      imgBlock.id = 'img_'+videoID;
      imgBlock.className='image';
      document.getElementById('vidBlock_'+videoID).appendChild(imgBlock);
      imgBlock.src='http://img.youtube.com/vi/'+data[jsonRow].URL +'/0.jpg';
      
      var title = document.createElement('p');
      title.id = 'title_'+videoID;
      document.getElementById('vidBlock_'+videoID).appendChild(title);
      document.getElementById(title.id).innerHTML=data[jsonRow].Title;
      
      
      var subheading = document.createElement('p');
      subheading.id = 'subheading_'+videoID;
      document.getElementById('vidBlock_'+videoID).appendChild(subheading);
      document.getElementById(subheading.id).innerHTML="Created on: "+formatDate(data[jsonRow]["Date/Time"]);
  };
  
  
  function formatDate(time) {
     var r = time.match(/^\s*([0-9]+)\s*-\s*([0-9]+)\s*-\s*([0-9]+)(.*)$/);
     return r[2]+"-"+r[3]+"-"+r[1];
  }
 
  function createCategoryList(list){
      for(var i = 0; i < list.length; i++){
        var categoryLi = document.createElement('li');
        categoryLi.id = 'catli_'+list[i].Category;
        document.getElementById('catList').appendChild(categoryLi);
        
          var category = document.createElement('a');
        category.id = 'cata_'+list[i].Category;
        document.getElementById('catli_'+list[i].Category).appendChild(category);
        document.getElementById('cata_'+list[i].Category).innerHTML= list[i].Category;
        
      } 
  } 
 
  
  function getCategoryList(){
      
       $.ajax({   
        type: "POST", // HTTP method POST or GET
        data: {action: 'getCategories'},
        url: "Utils/getVideo.php", //Where to make Ajax calls
        dataType: "text",
        success: function(response) {
           var list = new Array();
           list = JSON.parse(response);
           createCategoryList(list);
        },
           
        error: function(xhr, ajaxOptions, thrownError) {
            console.log("error");
            alert(thrownError);
        }
    });
  }
  
  function getCategoryVideos(cat){
      $.ajax({   
        type: "POST", // HTTP method POST or GET
        data: 'action=getCategoryVideos'+'&Category='+cat,
        url: "Utils/getVideo.php", //Where to make Ajax calls
        dataType: "text",
        success: function(response) {
           var list = new Array();
           list = JSON.parse(response);
           createMiddleCont(list);
        },
           
        error: function(xhr, ajaxOptions, thrownError) {
            console.log("error");
            alert(thrownError);
        }
    });
  }
  
  function getVideosFromSearch(title){
      $.ajax({   
        type: "POST", // HTTP method POST or GET
        data: 'action=getSearchVideos'+'&Title='+title,
        url: "Utils/getVideo.php", //Where to make Ajax calls
        dataType: "text",
        success: function(response) {
           var list = new Array();
           list = JSON.parse(response);
            createMiddleCont(list);
        },
           
        error: function(xhr, ajaxOptions, thrownError) {
         alert(thrownError);
        }
    });
  }
 
 //on click listeners

$(document.body).on('click', 'p[id^="title_"]' ,function(event){
    splitHtmlId(event.target.id);
});

$(document.body).on('click', 'img[id^="img_"]' ,function(event){
    splitHtmlId(event.target.id);
});

$('.searchBar').submit(function(e) {
    e.preventDefault();
     var searchQuery = $('#searchValue').val();
     getVideosFromSearch(searchQuery);  
});

/***** color of current page link *****/
$(document.body).on('click', 'li[id^="catli_"]' ,function(event){
    $category = event.target.id.split("_");
     $('#catList li').each(function(index) {
        if(this.id == event.target.id || this.id == 'catli_'+$category[1]){
           resetLinks();
           $(this).addClass("selected");
        }   
    })
    
    getCategoryVideos($category[1]);
});

function resetLinks(){
    $('#catList li').each(function(index) {
        $(this).removeClass("selected"); ;
    })
    $('#list li').each(function(index) {
        $(this).removeClass("selected"); ;
    })
}

$(document.body).on('click', 'li[id^="li_"]' ,function(event){
    $category = event.target.id.split("_");
    
     $('#list li').each(function(index) {
      
        if(this.id == event.target.id || this.id == 'li_'+$category[1]){
           resetLinks();
           $(this).addClass("selected");
         
        }   
    })
    
});
/***** color of current page link *****/


function splitHtmlId(htmlId){
    $id = htmlId.split("_");
    document.location.href = "AnnotationPage.php?id="+$id[1];
}


