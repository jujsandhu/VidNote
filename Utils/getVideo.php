<?php

include_once("connectToDatabase.php");

$result = mysql_query("select `Date/Time`, `Title`, `URL` from Videos Where `UserID` = '1' ");


$rows = array();
while($r = mysql_fetch_assoc($result)) {
    $rows[] = $r;
}


echo json_encode($rows);

mysqli_close();
?>
