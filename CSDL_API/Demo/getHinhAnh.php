<?php
	require "dbConnect.php";
	$idks = $_GET["id"];
	settype($idks, "int");

	$qr = "Select id,link from hinhanh where idks =$idks";
	$ds = mysql_query($qr);

	$mang = array();
	while ($row = mysql_fetch_array($ds)) {
			array_push($mang, new HinhAnh(
				$row["id"],
				$row["link"]
			));
	}
	echo json_encode($mang);
?>