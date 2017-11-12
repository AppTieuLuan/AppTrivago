<?php
	require "dbConnect.php";
	$idks = $_GET["id"];
	settype($idks, "int");

	$qr = "select gia,diachi,loai,website,sdt,tiennghihangdau,thietbikhachsan from khachsan where id=$idks";
	$ds = mysql_query($qr);

	$mang = array();
	while ($row = mysql_fetch_array($ds)) {
			array_push($mang, new DemoThongTinKS(
				$row["gia"],
				$row["diachi"],
				$row["loai"],
				$row["website"],
				$row["sdt"],
				$row["tiennghihangdau"],
				$row["thietbikhachsan"]
			));
	}
	echo json_encode($mang);
?>