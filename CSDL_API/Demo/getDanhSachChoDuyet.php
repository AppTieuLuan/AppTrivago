<?php
	require "dbConnect.php";

	$trang = $_GET["trang"];
	settype($trang, "int");

	$from = ($trang - 1) * 10;

	$qr = "select id,ten,hinhanh,gia,diachi,user
			from khachsan
			where tinhtrang = 0 and daduyet = 0
			order by ngaycapnhat desc
			limit $from,10";



	$ds = mysql_query($qr);
	$mang = array();
	while ($row = mysql_fetch_array($ds)) {
			array_push($mang, new KhachSanDuyet(
				$row["id"],
				$row["ten"],
				$row["hinhanh"],
				$row["gia"],
				$row["diachi"],
				$row["user"]
				
			));
	}
	echo json_encode($mang);
?>