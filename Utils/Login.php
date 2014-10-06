<?php

if (isset($_POST['action']) && !empty($_POST['action'])) {

    include_once("connectToDatabase.php");
    $action = $_POST['action'];
    switch ($action) {
        case 'Login' : Login();
            break;
    }
    mysqli_close();
}



function Login() {
    if (!empty($_POST['username']) && !empty($_POST['password'])) {
        
        $username = trim($_POST['username']);
        $password = trim($_POST['password']);

        if(CheckLoginInDB($username, $password)){
          session_start();
          $_SESSION['username'] = $username;
          $_SESSION['time']     = time();
            echo 'true';
        }
        else echo 'false'; 
    }
}

function CheckLoginInDB($username, $password) {

    $pwdmd5 = md5($password);
    
    $qry = "select * from Accounts where Username = '".$username."' and Password= '".$pwdmd5."'";

    $result = mysql_query($qry);

    if (!$result || mysql_num_rows($result) <= 0) {
        echo (" Error logging in. " .
                "The username or password does not match");
        return false;
    }
    return true;
}

?>
