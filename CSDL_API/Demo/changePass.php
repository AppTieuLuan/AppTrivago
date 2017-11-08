<?php
//dang nhap
use \Firebase\JWT\JWT;
require __DIR__ . '/vendor/autoload.php';
include('function.php');
include('connect/connect.php');

$key = "example_key";
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$userid = $obj['userid'];
$newpassword = md5($obj['newpassword']);
$sql = "UPDATE user set password = '$newpassword' WHERE id = '$userid'";
$result = $mysqli->query($sql);

if($result){
	echo 'THANH_CONG';
}
else{
	echo 'LOI';
}
?>