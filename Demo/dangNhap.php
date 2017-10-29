<?php
	//dang nhap

	require "dbConnect.php";
	$username = $_GET["username"];
	
	$password = $_GET["password"];
	
	$sql = "select id,username,diachi,hoten,quyen
			from tbluser
			where username = '$username' and password = '$password'";

	
	$us = mysql_query($sql);
	$mang = array();
	while ($row = mysql_fetch_array($us)) {
			array_push($mang, new User(
				$row["id"],
				$row["username"],
				$row["hoten"],
				$row["diachi"],
				$row["quyen"]
			));
	}
	echo json_encode($mang);

?>