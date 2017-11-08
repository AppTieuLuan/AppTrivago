<?php
	require "dbConnect.php";
	require "khoangCachGiua2Diem.php";

	$lat = $_GET["lat"];
	$long = $_GET["long"];
	settype($lat, "double");
	settype($long, "double");

	$bankinh = $_GET["bankinh"];
	settype($bankinh, "double");
	$qr = "select id,ten,hinhanh,gia,diachi 
			from khachsan
			where tinhKhoangCach($lat,$long,lat,khachsan.long) < $bankinh and tinhtrang = 1";

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
	//echo getDistanceBetweenPointsNew(10.7861501,106.7049594,10.1485647,106.5692098);
?>