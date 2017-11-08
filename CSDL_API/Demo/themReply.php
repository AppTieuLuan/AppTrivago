<?php
	require "dbConnect.php";

	$json = file_get_contents('php://input');
	$obj = json_decode($json, true);
	$id = $obj['iduser'];
	settype($id, "int");

	$idbl = $obj['idbl'];
	settype($idks, "int");

	$nd = $obj['nd'];
	//settype($nd, "String");
	//$noidung = $obj['noidung'];
	

	$sql = "INSERT INTO replybinhluan VALUES (null,$idbl,$id,'$nd',CURRENT_TIMESTAMP)";
	//echo $sql;
	$result = mysql_query($sql);
	if($result){
		echo '1';
	}
	else{
		echo '0';
	}
	
?>