<?php

include_once("connectToDatabase.php");

//must not be empty
if(isset($_POST["title"]) && isset($_POST["url"]) && strlen($_POST["title"]) > 0
        && strlen($_POST["url"]) > 0){
  
  $now = date("Y-m-d H:i:s");
  $title = $_POST["title"];
  $url = $_POST["url"];
  $userid = 1;
  $category = 'Other';
  
  
  $result = mysql_query("INSERT INTO Videos(`UserID`, `Category`, `Date/Time`, `Title`, `URL`) 
      VALUES ('".$userid."', '".$category."', '".$now."', '".$title."', '".$url."');");
}

mysqli_close();
?>
