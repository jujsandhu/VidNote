<?php

if(isset($_POST['action']) && !empty($_POST['action'])) 
{
      
    include_once("connectToDatabase.php");
    $action = $_POST['action'];
    switch($action) {
        case 'getVideos' : getVideo();break;
        case 'getVideoUrl' : getVideoUrl();break;
        case 'getAnnotationList' : getAnnotationList();break;
        case 'getCategories' : getCategories(); break;
        case 'getCategoryVideos' : getCategoryVideos(); break;
        case 'getSearchVideos' : getSearchVideos(); break;
        case 'getImportantMarkList' : getImportantMarkList(); break;
    }
    mysqli_close();
}


function getVideo() 
{
    $userID = getUserIDByName();
    $result = mysql_query("select `VideoID`, `Date/Time`, `Title`, `URL` from Videos Where `UserID` = '".$userID."' ");
    $rows = array();
    while ($r = mysql_fetch_assoc($result)) {
        $rows[] = $r;
    }
    echo json_encode($rows);
}

function getUserIDByName(){
    session_start();
    $username = $_SESSION['username'];
    
    $result = mysql_query("select `UserID` from Accounts Where `Username` = '".$username."' ");
    return mysql_result($result, 0);
}

function getVideoUrl(){
   if(isset($_POST['videoID']) && !empty($_POST['videoID'])) 
   {
     $videoID = $_POST['videoID'];
     $user = $_POST['userID'];
     
    
     $result = mysql_query("select `URL` from Videos Where (`UserID` = '".$user."' AND `VideoID` = '".$videoID."' )");
     $rows = array();
     while ($r = mysql_fetch_assoc($result)) {
        $rows[] = $r;
     }
    
    }   
    echo json_encode($rows);
}

function getAnnotationList() 
{
    $videoID = $_POST['VideoID'];
    
    $result = mysql_query("select * from Annotations 
                          Where `VideoID` = '".$videoID."' order by `Time` asc");
    
    $rows = array();
    while ($r = mysql_fetch_assoc($result)) {
        $rows[] = $r;
    }

    echo json_encode($rows);
}

function getCategories(){
    
    $userID = getUserIDByName();
    $result = mysql_query("select distinct(Category) from Videos where UserID = '".$userID."' order by Category asc");
    
    $rows = array();
    while ($r = mysql_fetch_assoc($result)) {
        $rows[] = $r;
    }

    echo json_encode($rows);
}

function getCategoryVideos(){
    
    $category = $_POST['Category'];
    
    $result = mysql_query("select * from Videos where Category = '".$category."'");
    
    $rows = array();
    while ($r = mysql_fetch_assoc($result)) {
        $rows[] = $r;
    }

    echo json_encode($rows);
}

function getSearchVideos(){
    $title = $_POST['Title'];
    
    $result = mysql_query("select * from Videos where Title like '%".$title."%'");
    
    $rows = array();
    while ($r = mysql_fetch_assoc($result)) {
        $rows[] = $r;
    }

    echo json_encode($rows);
}

function getImportantMarkList(){
    $videoID = $_POST['VideoID'];
    $userID = $_POST['UserID'];
    
    $result = mysql_query("select * from ImportantMark 
                          Where `VideoID` = '".$videoID."' AND `UserID` = '".$userID."'  order by `Time` asc");
    
    $rows = array();
    while ($r = mysql_fetch_assoc($result)) {
        $rows[] = $r;
    }

    echo json_encode($rows);
    
}


?>
