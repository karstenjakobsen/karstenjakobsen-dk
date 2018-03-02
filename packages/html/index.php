<?php

/* Redirect to correct domain */
if ( strpos( $_SERVER['HTTP_HOST'], 'futurebanana' ) !== false || $_SERVER['HTTP_HOST'] == 'karstenjakobsen.dk' ) {
	header("HTTP/1.1 301 Moved Permanently");
	header('Location: https://www.karstenjakobsen.dk/');
	exit;
}

// Set site array
$sites = array('card','the-last-experience');

// Require site data
require_once $sites[rand(0,1)]."/index.html";

?>