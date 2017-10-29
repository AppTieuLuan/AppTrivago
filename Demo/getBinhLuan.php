<?php
	require "dbConnect.php";
	$id = $_GET["id"];
	settype($id, "int");

	$trang = $_GET["trang"];
	settype($trang, "int");

	$from = ($trang - 1) * 4;


	// $qr = "select id,hoten, t1.NoiDung
	// 		from tbluser,(select idNguoi,NoiDung
	// 		                from tblbinhluan
	// 		                where idks = $id
	// 		                order by Ngay desc
	// 		                limit $from,4) t1
	// 		where t1.idNguoi = tbluser.id";

	$qr = "select sodanhgia,id,hoten,NoiDung
			from (select COUNT(iduser) sodanhgia,idks
				from danhgia
				where idks = $id) t4,
			    (select id,hoten, t1.NoiDung,idks
			    from user,(select iduser,NoiDung,idks
			                  from binhluan
			                  where idks = $id
			                  order by Ngay desc
			                  limit $from,4) t1
			    where t1.iduser = user.id) t5
			where t4.idks = t5.idks";



	$ds = mysql_query($qr);
	$mang = array();
	while ($row = mysql_fetch_array($ds)) {
			array_push($mang, new BinhLuan(
				$row["id"],
				$row["hoten"],
				$row["NoiDung"],
				$row["sodanhgia"]
			));
	}
	echo json_encode($mang);
?>