<?php

use \Firebase\JWT\JWT;
require __DIR__ . '/vendor/autoload.php';
include('function.php');
include('connect/connect.php');

// $json = file_get_contents('php://input');
// $obj = json_decode($json, true);
//$id = $obj['id'];
$id = $_GET["id"];
settype($idks, "int");
$sql = "SELECT * FROM hinhanh WHERE idks = '$id'";
$result = $mysqli->query($sql);

$mang = array();
while ($row = mysqli_fetch_array($result)) {
	$rowid = $row['id'];
	$sql1 = "SELECT * FROM hinhanh WHERE id = '$rowid'";
	$result1 = $mysqli->query($sql1);
	$img = mysqli_fetch_assoc($result1);
	array_push($mang, $img);
}
echo json_encode($mang);
?>