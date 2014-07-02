<!--
To change this template, choose Tools | Templates
and open the template in the editor.
-->
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
                <a href ="index.html" class="navbar-brand">VidNote</a>
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
                                <input type="text" name="zoom_query" style="width:500px; border:1px solid #D5D5D5; height:25px; padding:5px px; position:relative;"> 
                            </td>
                            <td > 
                                <input type="submit" value="" style="border:1px solid #D5D5D5; background:url('images/searchbutton3.jpeg') no-repeat; background-position-x: 15px; background-position-y: 4px; background-size: 22px 15px; width: 54px; height: 25px;">
                            </td>
                        </tr>
                    </table>
                </form>
                    <ul class="nav navbar-nav navbar-right">
                        <li class="active"><a href="account.php">J Sandhu</a></li>
                        <li><img src="images/account.jpeg" height="40"></li>
                    </ul> 
                </div>
            </div>    
        </div> 

        <div id="wrapper">
            <div class="leftCont">
                <div class="menu">
                <div id="newVidButton">New Video</div>    
                <ul id="list">
                    <li><a id='MyAnnolink' href="">My Annotations</a></li> 
                    <li><a href="">Starred</a></li> 
                    <li><a href="">Recent</a></li> 
                    <li><a href="">Categories</a></li> 
                    <li><a href="">Shared with me</a></li>
                </ul>
                </div>
            </div>
            
            <div class="middleCont" id='middleCon'>
                
            </div>   
            <div class="rightCont">
            </div>   
        </div>
        
        <div id="dialog-form" title="New Video Annotation">
            <form>
                <fieldset>
                    <label for="title">Title</label>
                    <input type="text" default="" name="title" id="title" class="text ui-widget-content ui-corner-all">
                    <label for="url">YouTube URL</label>
                    <input type="text" default="" name="url" id="url" class="text ui-widget-content ui-corner-all">

                    <!-- Allow form submission with keyboard without duplicating the dialog button -->
                    
                </fieldset>
            </form>
            
        </div>
        
        <script type="text/javascript" src="Resources/js/AddnewUserPopUp.js"></script>
    </body>
</html>