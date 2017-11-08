<?php
	require "dbConnect.php";
	$idks = $_GET["id"];
	settype($idks, "int");

	$qr = "select lat,khachsan.long
		from khachsan
		where id = $idks";
	$ds = mysql_query($qr);
	//echo $ds;


	$mang = array();
	while ($row = mysql_fetch_array($ds)) {
			array_push($mang, new LatLong(
				$row["lat"],
				$row["long"]
			));
	}
	echo json_encode($mang);
?>