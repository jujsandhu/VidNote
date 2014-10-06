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
        <title>Account</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="Resources/css/AnnotationPage.css">
        <link rel="stylesheet" type="text/css" href="Resources/css/account.css">
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        
        <!-- popup-->
        <link rel="stylesheet" href="//code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">
        <script src="//code.jquery.com/jquery-1.10.2.js"></script>
        <script src="//code.jquery.com/ui/1.11.0/jquery-ui.js"></script>
        
        
        <!-- popup-->
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
               
                    <form class="searchBar" method="get" action=""> 
                    <table cellpadding="0px" cellspacing="0px"> 
                        <tr> 
                            <td>
                                <input id='searchValue' type="text" name="query" placeholder=" Search for annotations" style="width:500px; border:1px solid #D5D5D5; height:25px; padding:5px; position:relative;"> 
                            </td>
                            <td > 
                                <input type="submit" value="" style="border:1px solid #D5D5D5; background:url('images/searchbutton3.jpeg') no-repeat; background-position-x: 15px; background-position-y: 4px; background-size: 22px 15px; width: 54px; height: 25px;">
                            </td>
                        </tr>
                    </table>
                </form>
                    <ul class="nav navbar-nav navbar-right">
                        <li class="sessionUser"><a href="account.php"><?php echo $_SESSION['username'] ?></a></li>
                        <li><img src="images/account.jpeg" height="40"></li>
                    </ul> 
                </div>
            </div>    
        </div> 

        <div id="wrapper">
            <div class="leftCont">
                <div class="menu">
                <div id="newVidButton">New Annotation</div>    
                <ul id="list">
                    <li id="li_home" class="selected"><a href='account.php' id="a_home">My Annotations</a></li> 
                    <li id="li_starred"><a id="a_starred" >Starred</a></li> 
                    <li id="li_recent" ><a id="a_recent" >Recent</a></li> 
                    <li id="li_shared" ><a id="a_shared" >Shared with me</a></li>
                </ul>
                </div>
                <div class="Categories">
                    <p id="catTitle">Categories</p>
                    <ul id="catList">
                    
                    </ul>
                    
                </div>
            </div>
            
            <div class="middleCont" id='middleCon'>
                
            </div>   
            <div class="rightCont">
            </div>   
        </div>
        
        <div id="dialog-form" title="New Annotation">
            <form>
                <fieldset>
                    <label for="title">Title</label>
                    <input type="text" default="" name="title" id="title" class="text ui-widget-content">
                    <label for="title">Category</label>
                    <input type="text" default="" name="category" id="category" class="text ui-widget-content">
                    <label for="url">YouTube URL</label>
                    <input type="text" default="" name="url" id="url" class="text ui-widget-content">

                    <!-- Allow form submission with keyboard without duplicating the dialog button -->
                    
                </fieldset>
            </form>
            
        </div>
        
        <script type="text/javascript" src="Resources/js/AddnewUserPopUp.js"></script>
    </body>
</html>