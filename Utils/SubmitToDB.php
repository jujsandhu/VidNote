<?php

if (isset($_POST['action']) && !empty($_POST['action'])) {

    include_once("connectToDatabase.php");
    $action = $_POST['action'];
    switch ($action) {
        case 'addVideo' : addVideo();
            break;
        case 'addAnnotation' : addAnnotation();
            break;
        case 'deleteAnnotation' : deleteAnnotation();
            break;
        case 'addImportantMark' : addImportantMark();
            break;
        case 'deleteImportantMark' : deleteImportantMark();
            break;
        case 'addNewUser' : addNewUser();
            break;
    }
    mysqli_close();
}

function addVideo() {
//must not be empty
    if (isset($_POST["title"]) && isset($_POST["url"]) && strlen($_POST["title"]) > 0 && strlen($_POST["url"]) > 0) {

        $now = date("Y-m-d H:i:s");
        $title = $_POST["title"];
        $url = $_POST["url"];
        $category = $_POST["category"];
        $userid = getUserIDByName();


        mysql_query("INSERT INTO Videos(`UserID`, `Category`, `Date/Time`, `Title`, `URL`) 
      VALUES ('" . $userid . "', '" . $category . "', '" . $now . "', '" . $title . "', '" . $url . "');");

        $result = mysql_query("select `VideoID` from Videos Where (`URL` = '" . $url . "')");
        
        $r = mysql_fetch_assoc($result);
        echo $r['VideoID'];
    }
}

function getUserIDByName(){
    session_start();
    $username = $_SESSION['username'];
    
    $result = mysql_query("select `UserID` from Accounts Where `Username` = '".$username."' ");
    return mysql_result($result, 0);
}

function addAnnotation() {
     if (isset($_POST["Annotation"]) && strlen($_POST["Annotation"]) > 0) {

        $time = $_POST["Time"];
        $userid = getUserIDByName();
        $videoid = $_POST["VideoID"];
        $annotation = $_POST["Annotation"];


        mysql_query("INSERT INTO Annotations(`VideoID`, `UserID`, `Time`, `Annotation`) 
      VALUES ('" . $videoid . "', '" . $userid . "', '" . $time . "', '" . $annotation . "');");
    }   
}

function deleteAnnotation(){
    $noteID = $_POST["NoteID"];
    
    mysql_query("delete from Annotations where `AnnotationID` = '".$noteID."'");
}

function addImportantMark(){
        $time = $_POST["Time"];
        $userid = getUserIDByName();
        $videoid = $_POST["VideoID"];
        $type = $_POST["Type"];


        mysql_query("INSERT INTO ImportantMark(`VideoID`, `UserID`, `Time`, `Type`) 
      VALUES ('" . $videoid . "', '" . $userid . "', '" . $time . "', '" . $type . "');");
        
}

function deleteImportantMark(){
    
}

function addNewUser(){
        $firstName = $_POST["FirstName"];
        $secondName = $_POST["SecondName"];
        $type = $_POST["Type"];
        $username = $_POST["Username"];
        $password = md5($_POST["Password"]);
        $email_address = $_POST["Email"];

        mysql_query("INSERT INTO Accounts(`FirstName`, `SecondName`, `Type`, `Username`, `Password`, `Email_address`) 
        VALUES ('" . $firstName . "', '" . $secondName . "', '" . $type . "', '" . $username . "', '" .$password ."', '" .$email_address ."' );");

        session_start();
        $_SESSION['username'] = $username;
        $_SESSION['time'] = time();
}

?>
