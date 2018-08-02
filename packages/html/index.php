<?php

/* Redirect to correct domain */
if ( strpos( $_SERVER['HTTP_HOST'], 'futurebanana' ) !== false || $_SERVER['HTTP_HOST'] == 'karstenjakobsen.dk' ) {
	header("HTTP/1.1 301 Moved Permanently");
	header('Location: https://www.karstenjakobsen.dk/');
	exit;
}

// Set site array
$sites = array(
	'card'
	//'the-last-experience',
	//'gravity-points',
	//'ribbons2',
	//'circles',
	//'codevember-7-pillow'
);

// Require site data

$folder = $sites[rand(0, ( count($sites) - 1 ) ) ];

require_once "{$folder}/index.html";

echo "<!--- {$folder} --->";

?>
