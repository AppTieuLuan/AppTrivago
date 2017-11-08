<?php
	require "dbConnect.php";
	$iduser = $_GET["user"];
	settype($iduser, "int");

	$idks= $_GET["idks"];
	settype($idks, "int");

	$danhgia = $_GET["danhgia"];
	settype($danhgia, "int");

	$sql = "select * from danhgia where iduser = '$iduser' and idks = '$idks'";
	$result = mysql_query($sql);

	$count=mysql_num_rows($result);
	
	if($count==1){
		//$row = mysql_fetch_array($result);
		//echo $row['id'];
		$rs = mysql_query("update danhgia set danhgia = $danhgia where 	idks=$idks and iduser=$iduser");
		if($rs) {
			echo "1";
		} else {
			echo "0";
		}
	}
	else{
		$rs = mysql_query("insert into danhgia VALUES (null,$idks,$iduser,$danhgia)");

		if($rs) {
			echo "1";
		} else {
			echo "0";
		}

	}
	
?>