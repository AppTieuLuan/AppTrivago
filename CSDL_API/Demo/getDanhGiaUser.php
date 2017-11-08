<?php
	require "dbConnect.php";
	$iduser = $_GET["user"];
	settype($iduser, "int");

	$idks= $_GET["idks"];
	settype($idks, "int");

	$sql = "select * from danhgia where iduser = '$iduser' and idks = '$idks'";
	$result = mysql_query($sql);

	$count=mysql_num_rows($result);
	

	$kq = "{";
	if($count==1){
		$row = mysql_fetch_array($result);
		//echo $row['danhgia'];

		$kq = $kq.'"danhgia":'.$row['danhgia'].',';
		
	}
	else{
		$kq = $kq.'"danhgia":'.'1,';
	}



	$sql = "select count(*) sl from danhgia where idks = '$idks'";
	$result = mysql_query($sql);
	$row = mysql_fetch_array($result);
	$kq = $kq.'"sodanhgia":'.$row['sl'].'}';

	echo $kq;
?>