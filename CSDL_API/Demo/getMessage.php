<?php
use \Firebase\JWT\JWT;
require __DIR__ . '/vendor/autoload.php';
include('function.php');
include('connect/connect.php');

$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$iduser = $obj['iduser'];

$result = $mysqli->query("SELECT count(id) AS total FROM tinnhan WHERE iduser = '$iduser'");
$row = mysqli_fetch_assoc($result);
$total_records = $row['total'];// số lượng tin nhắn

$current_page = isset($_GET['page']) ? $_GET['page'] : 1;
settype($current_page, "int");

$limit = 10;// số tin nhắn hiển thị trong 1 trang

$total_page = ceil($total_records / $limit);//tính tổng số trang

// Tìm Start
$start = ($current_page - 1) * $limit;

$sql = "SELECT * FROM tinnhan WHERE iduser = '$iduser' ORDER BY id DESC LIMIT $start, $limit";
$result1 = $mysqli->query($sql);

$mang = array();
while ($row = mysqli_fetch_array($result1)) {
	$id = $row['id'];
	$sql1 = "SELECT * FROM tinnhan WHERE id = '$id'";
	$result2 = $mysqli->query($sql1);
	$message = mysqli_fetch_assoc($result2);
	array_push($mang, $message);
}
echo json_encode($mang);
?>