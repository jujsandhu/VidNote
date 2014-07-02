<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$link = mysql_connect('vidnote.co.uk', 'vidnote1_juj', 'startup2014'); 
if (!$link) { 
    die('Could not connect: ' . mysql_error()); 
} 
mysql_select_db(vidnote1_2014);
?>
