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
        $userid = 1;


        mysql_query("INSERT INTO Videos(`UserID`, `Category`, `Date/Time`, `Title`, `URL`) 
      VALUES ('" . $userid . "', '" . $category . "', '" . $now . "', '" . $title . "', '" . $url . "');");

        $result = mysql_query("select `VideoID` from Videos Where (`URL` = '" . $url . "')");
        
        $r = mysql_fetch_assoc($result);
        echo $r['VideoID'];
    }
}


function addAnnotation() {
     if (isset($_POST["Annotation"]) && strlen($_POST["Annotation"]) > 0) {

        $time = $_POST["Time"];
        $userid = $_POST["UserID"];
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

?>
