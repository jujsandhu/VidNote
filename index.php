
<!DOCTYPE html>
<html>
    <head>
        <title>Homepage</title>
         <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link href="Resources/css/Homepage.css" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        

    </head>
    <body>

        <div class="navbar navbar-inverse navbar-static-top">
            <div class="container">
                <a href ="index.php" class="navbar-brand">VidNote</a>
                <button class="navbar-toggle" data-toggle="collapse" data-target=".navHeaderCollpase">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <div class ="collapse navbar-collapse navHeaderCollapse">
                    <ul class="nav navbar-nav navbar-left">
                        <li class="active"><a href="@">Home</a></li>
                        <li><a href="index.php">Features</a></li>
                        <li><a href="index.php">About</a></li>
                        <li><a href="index.php">Contact</a></li>
                    </ul> 
                    
 <nav>
  <ul>
    <li id="login">
      <a id="login-trigger" href="#">
        Log in <span>▼</span>
      </a>
      <div id="login-content">
        <form method="POST">
          <fieldset id="inputs">
            <input id="username" type="text" name="username" placeholder="Username" required>   
            <input id="password" type="password" name="password" placeholder="Password" required>
          </fieldset>
          <fieldset id="actions">
            <input type="submit" id="submit" value="Log in">
            <label><input type="checkbox" checked="checked"> Keep me signed in</label>
          </fieldset>
        </form>
      </div>                     
    </li>
    <li id="signup">
      <a href="SignUp.php">Sign up Free</a>
    </li>
  </ul>
</nav>
                     
                   
                </div>
            </div>    
        </div>     
        
            <div class="img-responsive">
                    <div class="logo-wrapper">
                        <p class='text'>Welcome To<span class='highlight'> VidNote</span></p> 
                        <p class="subheading">Your Personal Video Annotation Service</p>
                 
                    </div>
                
             </div>   
         
        <script type="text/javascript" src="Resources/js/Homepage.js"></script>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src ="bootstrap/js/bootstrap.js"></script>
    </body>
</html>
