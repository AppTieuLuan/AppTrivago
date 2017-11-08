<?php
	require "dbConnect.php";
	$trang = $_GET["trang"];
	settype($trang, "int");
	$from = ($trang - 1) * 4;

	$tiennghi = $_GET["tiennghi"];
	settype($tiennghi, "string");

	$giamin = $_GET["giamin"];
	$giamax = $_GET["giamax"];
	settype($giamin, "int");
	settype($giamax, "int");

	$sosao = $_GET["sosao"];
	$temparr = str_split($sosao);

	$tempstr = '(';
	foreach($temparr as $item) {
    	$tempstr = $tempstr . $item . ',';
	}
	$tempstr = substr($tempstr, 0, -1);
	$tempstr = $tempstr . ')';

	$lat = $_GET["lat"];
	$long = $_GET["long"];
	settype($lat, "double");
	settype($long, "double");

	$bankinh = $_GET["bankinh"];
	settype($bankinh, "double");

	$qr = "select id,ten,hinhanh,gia,diachi,khachsan.lat,khachsan.long
			from khachsan
			where tiennghihangdau = $tiennghi and sosao in $tempstr and gia<= $giamax && gia >= $giamin and tinhtrang = 1 and tinhKhoangCach($lat,$long,lat,khachsan.long) < $bankinh
			order by ngaycapnhat DESC
			limit $from,4";



	$ds = mysql_query($qr);
	$mang = array();
	while ($row = mysql_fetch_array($ds)) {
			array_push($mang, new KhachSann(
				$row["id"],
				$row["ten"],
				$row["hinhanh"],
				$row["gia"],
				$row["diachi"],
				$row["lat"],
				$row["long"]
			));
	}
	echo json_encode($mang);
?>