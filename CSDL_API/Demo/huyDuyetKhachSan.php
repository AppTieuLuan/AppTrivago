<?php
	require "dbConnect.php";

	$json = file_get_contents('php://input');
	$obj = json_decode($json, true);
	$id = $obj['id'];
	settype($id, "int");

	$user = $obj['user'];
	settype($user, "int");

	$noidung = $obj['noidung'];
	$tieude = $obj['tieude'];


	$sql = "update khachsan set daduyet = 1 where id = $id";
	$result = mysql_query($sql);
	if($result){
		///echo '1';
		$sql2 = "insert into tinnhan value(null,$user,'$tieude','$noidung',0)";
		$result2 = mysql_query($sql2);
		if($result2){
			echo '1';
		}
		else {
			echo '0';
		}
	}
	else{
		echo '0';
	}
	
?>