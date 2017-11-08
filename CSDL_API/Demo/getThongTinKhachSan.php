<?php
	require "dbConnect.php";
	$idks = $_GET["id"];
	settype($idks, "int");

	$qr = "select gia,diachi,loai,website,sdt,tiennghihangdau from khachsan where id=$idks";
	$ds = mysql_query($qr);

	$mang = array();
	while ($row = mysql_fetch_array($ds)) {
			array_push($mang, new ThongTinKS(
				$row["gia"],
				$row["diachi"],
				$row["loai"],
				$row["website"],
				$row["sdt"],
				$row["tiennghihangdau"]
			));
	}
	echo json_encode($mang);
?>