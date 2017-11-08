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
$password = md5($obj['password']);
$sql = "SELECT * FROM user where id = '$userid' and password = '$password'";
$result = $mysqli->query($sql);

$user = mysqli_fetch_assoc($result);

if($user){
	echo 'THANH_CONG';
}
else{
	echo $userid.' '.$password;
}

?>