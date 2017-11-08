<?php
	require "dbConnect.php";
	$iduser = $_GET["user"];
	settype($iduser, "int");

	$idbl= $_GET["idbl"];
	settype($idbl, "int");

	$thich = $_GET["thich"];
	settype($yeuthich, "int");

	if($thich==1) {

		$sql = "insert into likebinhluan values(null,$iduser,$idbl)";
		$result = mysql_query($sql);
		if($result){
			echo "1";
		}
		else 
			echo "0";
	} else {
		$sql = "delete from likebinhluan where iduser = $iduser and idbl = $idbl";
		$result = mysql_query($sql);
		if($result){
			echo "1";
		}
		else 
			echo "0";
	}
	
?>