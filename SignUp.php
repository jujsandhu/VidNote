<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>SignUp</title>
        <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
       <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <link rel="stylesheet" type="text/css" href="Resources/css/AnnotationPage.css">
        <link rel="stylesheet" type="text/css" href="Resources/css/SignUp.css">
         
    </head>
    <body>
       
        <div class="navbar navbar-inverse navbar-static-top">
            <div class="container">
                <a href ="index.php" class="navbar-brand">VidNote</a>
            </div>    
        </div> 
        <div class="headline"><p id="heading">Get Started with VidNote</p><p id="subheading">Creating an account lets you annotate YouTube videos 
                and participate in the VidNote community</p></div>
        <div  class="form">
            <form id="contactform" method="POST">
                <p class="contact"><label for="name">Name</label></p>
                <input id="name" name="name" placeholder="First and last name" required="" tabindex="1" type="text">
                <p class="contact"><label for="email">Email</label></p>
                <input id="email" name="email" placeholder="example@domain.com" required="" type="email">

                <p class="contact"><label for="username">Create a username</label></p>
                <input id="username" name="username" placeholder="username" required="" tabindex="2" type="text">
                <p class="contact"><label for="password">Create a password</label></p>
                <input type="password" id="password" name="password" required="" type="text">
                <p class="contact"><label for="repassword">Confirm your password</label></p>
                <input type="password" id="password2" name="password" required="" type="text">
                <input class="button" name="submit" id="submit" tabindex="5" value="Sign me up!" type="submit">   
            </form>
        </div>
         <script type="text/javascript" src="Resources/js/SignUp.js"></script>
    </body>
</html>


