<?php
	require "dbConnect.php";
	$id = $_GET["id"];
	settype($id, "int");

	$trang = $_GET["trang"];
	settype($trang, "int");

	$from = ($trang - 1) * 10;
	// $qr = "select sodanhgia,id,hoten,NoiDung
	// 		from (select COUNT(iduser) sodanhgia,idks
	// 			from danhgia
	// 			where idks = $id) t4,
	// 		    (select t1.id,hoten, t1.NoiDung,idks
	// 		    from user,(select iduser,NoiDung,idks,id
	// 		                  from binhluan
	// 		                  where idks = $id
	// 		                  order by Ngay desc
	// 		                  limit $from,4) t1
	// 		    where t1.iduser = user.id) t5
	// 		where t4.idks = t5.idks";

	$qr = " select t1.id,hoten, t1.noidung,ngay
			    from user,(select iduser,noidung,ngay,id
			                  from replybinhluan
			                  where idbl = $id
			                  order by ngay
			                  limit $from,10) t1
			    where t1.iduser = user.id";
			
	$ds = mysql_query($qr);
	$mang = array();
	while ($row = mysql_fetch_array($ds)) {
			$time=strtotime($row["ngay"]);
			array_push($mang, new BinhLuan(
				$row["id"],
				$row["hoten"],
				$row["noidung"],
				date('d', $time),
				date('m', $time),
				date('Y', $time)
			));
	}
	echo json_encode($mang);


	// $ds = mysql_query($qr);
	// $mang = array();
	// while ($row = mysql_fetch_array($ds)) {
	// 		array_push($mang, new BinhLuan(
	// 			$row["id"],
	// 			$row["hoten"],
	// 			$row["NoiDung"],
	// 			$row["sodanhgia"]
	// 		));
	// }
	// echo json_encode($mang);
?>