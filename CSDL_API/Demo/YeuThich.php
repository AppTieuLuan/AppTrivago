<?php
	require "dbConnect.php";
	$iduser = $_GET["user"];
	settype($iduser, "int");

	$idks= $_GET["idks"];
	settype($idks, "int");

	$yeuthich = $_GET["yeuthich"];
	settype($yeuthich, "int");

	if($yeuthich==1) {
		$sql = "insert into yeuthich values($iduser,$idks)";
		$result = mysql_query($sql);
		if($result){
			echo "1";
		}
		else 
			echo "0";
	} else {
		$sql = "delete from yeuthich where iduser = $iduser and idks = $idks";
		$result = mysql_query($sql);
		if($result){
			echo "1";
		}
		else 
			echo "0";
	}
	
?>