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
$sql = "SELECT * FROM khachsan WHERE user = '$userid'";
$result = $mysqli->query($sql);

if(mysqli_num_rows($result) === 0){
	$array = array('list'=>'KHONG_CO');
	print_r(json_encode($array));
}else{
	$array = [];
	while($row = mysqli_fetch_array($result)){
		$id = $row['id'];
		$sql1 = "SELECT * FROM khachsan WHERE  id = '$id'";
		$result1 = $mysqli->query($sql1);
		$hotel = mysqli_fetch_assoc($result1);
		array_push($array, $hotel);
	}
	$array1 = array('list'=>$array);
	print_r(json_encode($array1));
}
?>