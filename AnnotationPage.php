<?php
session_start();
if (!isset($_SESSION['username'])) {
  echo 'Unauthorised';
  exit();
}
else if ($_SESSION['time'] + 900 > time()) {
  $_SESSION['time'] = time();
} else {
  header('Location:http://'. $_SERVER[HTTP_HOST] . '/index.php?status=timeout');
}
?>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>VidNote</title>
        <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <link rel="stylesheet" href="//code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">
        <script src="//code.jquery.com/jquery-1.10.2.js"></script>
        <script src="//code.jquery.com/ui/1.11.0/jquery-ui.js"></script>
    
        
        <link rel="stylesheet" type="text/css" href="Resources/css/AnnotationPage.css">
    </head>
    <body>
         <div class="navbar navbar-inverse navbar-static-top">
            <div class="container">
                <a href ="account.php" class="navbar-brand">VidNote</a>
                <button class="navbar-toggle" data-toggle="collapse" data-target=".navHeaderCollpase">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <div class ="collapse navbar-collapse navHeaderCollapse">
                    
                      <ul class="nav navbar-nav navbar-right">
                        <li class="sessionUser"><a href="account.php"><?php echo $_SESSION['username'] ?></a></li>
                        <li><img src="images/account.jpeg" height="40"></li>
                      </ul> 
                   
                </div>
            </div>    
        </div>     
        
        <div id="wrapper">
        <div class="left_container">    
            
            <div id="player"></div>

            <div id="features">
                <form name="noteForm" method="post">
                   <p>              
                    <textarea name='note' cols='79' rows='2' id='noteArea' placeholder="Your Annotation"></textarea><br> 
                   </p>
                </form>
                <div id="addImportant">
                    <div id="highImp"><img id='highImpImg'src="images/high.png" width="30" height="30"><p style="color:red;">High</p></div>
                    <div id="lowImp"><img id='lowImpImg' src="images/low.png" width="30" height="30"><p style="color:green;">Low</p></div>
                </div>
            </div>
            
            <div id="editFeature"  >
                <div id="verticalCursor" class="draggable ui-widget-content">
                    <div id="triangle"></div>
                    <div id="line"></div>
                </div>    
                
                <div id="timebar">
                 <p id='beginTime'></p>
                 <p id='endTime'></p>
                </div>
                <div id="content">
                    <div id="important"></div>
                    <div id="notes"></div>
                </div>    
            </div>

        </div>  
        
        <div class="right_container">
            <p id ="canvas">
           
            </p>
            
        </div>
        </div>    
        <script type="text/javascript" src="Resources/js/AnnotationPage.js"></script>
    </body>
</html>


