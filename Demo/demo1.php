<?php
	require "dbConnect.php";
	$qr = "Select * from tblkhachsan";
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