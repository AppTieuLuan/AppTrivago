<?php
	require "dbConnect.php";

	$json = file_get_contents('php://input');
	$obj = json_decode($json, true);
	$id = $obj['id'];
	settype($id, "int");


	$sql = "update khachsan set tinhtrang=1 where id = $id";
	$result = mysql_query($sql);
	if($result){
		echo '1';
	}
	else{
		echo '0';
	}
	
?>