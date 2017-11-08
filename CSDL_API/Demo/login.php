<?php
//dang nhap
use \Firebase\JWT\JWT;
require __DIR__ . '/vendor/autoload.php';
include('function.php');
include('connect/connect.php');

$key = "example_key";
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$email = $obj['email'];
$password = md5($obj['password']);
// $email = 'a@gmail.com';
// $password = md5('123');
$sql = "SELECT * FROM user u where email = '$email' and password = '$password'";
$result = $mysqli->query($sql);

$user = mysqli_fetch_assoc($result);

if($user){
	$jwt = getToken($email);
	$array = array('token'=>$jwt, 'user'=>$user);
	print_r(json_encode($array));
}
else{
	$array = array('err'=>'Loi');
	print_r(json_encode($array));
}

?>