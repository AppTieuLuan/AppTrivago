<?php
	require "dbConnect.php";
	$iduser = $_GET["user"];
	settype($iduser, "int");

	$idks= $_GET["idks"];
	settype($idks, "int");


	$sql = "select * from yeuthich where iduser = '$iduser' and idks = '$idks'";
	$result = mysql_query($sql);

	$count=mysql_num_rows($result);
	
	if($count==1){
		echo "1";
	}
	else{
		echo "0";
	}
?>