<?php
use \Firebase\JWT\JWT;
require __DIR__ . '/vendor/autoload.php';
include('function.php');
include('connect/connect.php');

$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$userid = $obj['userid'];
$idks = $obj['idks'];
$sql = "DELETE FROM yeuthich WHERE  iduser= '$userid' and idks='$idks'";
$result = $mysqli->query($sql);
if($result){
	echo "THANH_CONG";
}else{
	echo "THAT_BAI";
}

?>