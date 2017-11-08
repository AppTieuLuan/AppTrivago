<?php
	require "dbConnect.php";

	$trang = $_GET["trang"];
	settype($trang, "int");

	$from = ($trang - 1) * 4;


	require "khoangCachGiua2Diem.php";

	$lat = $_GET["lat"];
	$long = $_GET["long"];
	settype($lat, "double");
	settype($long, "double");

	$bankinh = $_GET["bankinh"];
	settype($bankinh, "double");

	// $qr = "select id,hoten, t1.NoiDung
	// 		from tbluser,(select idNguoi,NoiDung
	// 		                from tblbinhluan
	// 		                where idKS = $id
	// 		                order by Ngay desc
	// 		                limit $from,4) t1
	// 		where t1.idNguoi = tbluser.id";

	$qr = "select id,ten,hinhanh,gia,diachi,khachsan.lat latitude,khachsan.long longitude
			from khachsan
			where tinhtrang = 1 and tinhKhoangCach($lat,$long,lat,khachsan.long) < $bankinh
			order by ngaycapnhat desc
			limit $from,4";

	// $ds = mysql_query($qr);
	// $mang = array();
	// while ($row = mysql_fetch_array($ds)) {
	// 		array_push($mang, new KhachSan(
	// 			$row["id"],
	// 			$row["ten"],
	// 			$row["hinhanh"],
	// 			$row["gia"],
	// 			$row["diachi"]
	// 		));
	// }

	$ds = mysql_query($qr);
	$mang = array();
	while ($row = mysql_fetch_array($ds)) {
			array_push($mang, new KhachSann(
				$row["id"],
				$row["ten"],
				$row["hinhanh"],
				$row["gia"],
				$row["diachi"],
				$row["latitude"],
				$row["longitude"]
			));
	}
	echo json_encode($mang);
?>