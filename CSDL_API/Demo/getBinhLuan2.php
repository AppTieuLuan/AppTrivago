<?php
	
	require "dbConnect.php";
	$id = $_GET["id"];
	settype($id, "int");

	$iduser = $_GET["iduser"];
	//settype($iduser, "int");

	$trang = $_GET["trang"];
	settype($trang, "int");

	$from = ($trang - 1) * 10;

	if($iduser==""){
		$qr = "select t1.id,hoten, t1.NoiDung,Ngay, (select COUNT(*) from likebinhluan where idbl = t1.id) solike, (select COUNT(*) from replybinhluan where idbl = t1.id) sobl, 0 islike
			    from user,(select iduser,NoiDung,idks,id,Ngay
			                  from binhluan
			                  where idks = $id
			                  order by Ngay desc
			                  limit $from,10) t1
			    where t1.iduser = user.id";
	} else {
		settype($iduser, "int");
		$qr = "select t1.id,hoten, t1.NoiDung,Ngay, (select COUNT(*) from likebinhluan where idbl = t1.id) solike, (select COUNT(*) from replybinhluan where idbl = t1.id) sobl, (select COUNT(*) from likebinhluan where idbl = t1.id and iduser = $iduser) islike
			    from user,(select iduser,NoiDung,idks,id,Ngay
			                  from binhluan
			                  where idks = $id
			                  order by Ngay desc
			                  limit $from,10) t1
			    where t1.iduser = user.id";
	}
		
	$ds = mysql_query($qr);
	$mang = array();
	while ($row = mysql_fetch_array($ds)) {
		$time=strtotime($row["Ngay"]);
		array_push($mang, new BinhLuan2(
				$row["id"],
				$row["hoten"],
				$row["NoiDung"],
				date('d', $time),
				date('m', $time),
				date('Y', $time),
				$row["solike"],
				$row["sobl"],
				$row["islike"]
			));


		//$time=date_parse($row["Ngay"]);
		//$time=strtotime($row["Ngay"]);
		//echo "ngày ".date('d', $time)."tháng ".date('m', $time)." năm ".date('Y', $time)."<br/>";
		//print_r($time);
		
	}
	echo json_encode($mang);
?>