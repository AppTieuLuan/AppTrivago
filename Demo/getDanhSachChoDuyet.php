<?php
	require "dbConnect.php";

	$trang = $_GET["trang"];
	settype($trang, "int");

	$from = ($trang - 1) * 4;

	$qr = "select id,ten,hinhanh,gia,diachi
			from khachsan
			where tinhtrang = 0 and daduyet = 0
			order by ngaycapnhat desc
			limit $from,4";



	$ds = mysql_query($qr);
	$mang = array();
	while ($row = mysql_fetch_array($ds)) {
			array_push($mang, new KhachSan(
				$row["id"],
				$row["ten"],
				$row["hinhanh"],
				$row["gia"],
				$row["diachi"]
			));
	}
	echo json_encode($mang);
?>