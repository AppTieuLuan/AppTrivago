<?php
//refresh token
use \Firebase\JWT\JWT;
require __DIR__ . '/vendor/autoload.php';
include('function.php');
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$token = $obj['token'];
$key = "example_key";

try{
	$decoded = JWT::decode($token, $key, array('HS256'));
	if($decoded->expire < time()){
		echo 'HET_HAN';
	}
	else{
		$jwt = getToken($decoded->email);
		print_r($jwt);
	}
}
catch(Exception $e){
	echo 'TOKEN_KHONG_HOP_LE';
}



?>