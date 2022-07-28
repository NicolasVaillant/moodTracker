<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin:*");
date_default_timezone_set('Europe/Paris');
$file_name = "../files/2022.json";

if (!file_exists($file_name)) {
    echo "0";
}

$json = file_get_contents($file_name);
echo $json;