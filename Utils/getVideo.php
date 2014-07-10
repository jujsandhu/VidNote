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
    }
    mysqli_close();
}


function getVideo() 
{
    $result = mysql_query("select `VideoID`, `Date/Time`, `Title`, `URL` from Videos Where `UserID` = '1' ");
    $rows = array();
    while ($r = mysql_fetch_assoc($result)) {
        $rows[] = $r;
    }
    echo json_encode($rows);
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
    $userID = $_POST['UserID'];
    
    $result = mysql_query("select * from Annotations 
                          Where `VideoID` = '".$videoID."' AND `UserID` = '1'  order by `Time` asc");
    
    $rows = array();
    while ($r = mysql_fetch_assoc($result)) {
        $rows[] = $r;
    }

    echo json_encode($rows);
}

function getCategories(){
    
    $result = mysql_query("select distinct(Category) from Videos order by Category asc");
    
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


?>
