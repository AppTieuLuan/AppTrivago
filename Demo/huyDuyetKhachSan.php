<?php
	require "dbConnect.php";

	$json = file_get_contents('php://input');
	$obj = json_decode($json, true);
	$id = $obj['id'];
	settype($id, "int");

	$noidung = $obj['noidung'];
	

	$sql = "update khachsan set daduyet = 1 where id = $id";
	$result = mysql_query($sql);
	if($result){
		echo '1';
	}
	else{
		echo '0';
	}
	
?>