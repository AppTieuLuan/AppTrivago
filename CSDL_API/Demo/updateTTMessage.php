<?php
use \Firebase\JWT\JWT;
require __DIR__ . '/vendor/autoload.php';
include('function.php');
include('connect/connect.php');

$id = $_GET['id'];

$sql = "UPDATE tinnhan SET tinhtrang = '1' WHERE id = '$id'";
$result = $mysqli->query($sql);

if($result){
	echo 'THANH_CONG';
}
else{
	echo 'KHONG_THANH_CONG';
}
?>