<?php
//search
	include('connect/connect.php');

	if(isset($_GET['key']) && strlen($_GET['key'])>2){
		$keyword = $_GET['key'];
		$product = array();
		$products = $mysqli->query("SELECT p.*, GROUP_CONCAT(i.link) AS images FROM product p INNER JOIN images i ON p.id = i.id_product where name like '%$keyword%' group by p.id");
		while ($row = $products->fetch_object()){
			$assignees = explode(',', $row->images);
			$row->images = $assignees;
		    $product[] = $row;
		}
		echo (json_encode($product));

	}
	else{
		echo 'NHAP_TU_KHOA';
	}
?>
	