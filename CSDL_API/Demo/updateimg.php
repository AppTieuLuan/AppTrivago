<?php
	use \Firebase\JWT\JWT;
	require __DIR__ . '/vendor/autoload.php';
	include('function.php');
	include('connect/connect.php');
	$json = file_get_contents("php://input");
	$obj = json_decode($json, true);
	//get dữ liệu
	$arridelete = $obj["arridelete"];
	$arr = $obj["arr"];
	$id = $obj["id"];
	//duyệt mảng chứa các id ảnh đã bị xóa để xóa
	if(count($arridelete) !== 0){
		foreach($arridelete as $key=>$value){
			$sqldelete = "DELETE FROM hinhanh WHERE id='$value'";
			$resdelete = $mysqli->query($sqldelete);
			if(!$resdelete){
				echo 'KHONG_THANH_CONG';
				return;// dừng lại 
			}
		}
	}
	//duyệt mảng arr để thêm các ảnh mới vào
	if(count($arr) !== 0){
		foreach($arr as $key=>$value){
			//decode data
			$data = base64_decode($value);
			//set nơi lưu vào và tên file.png
			$uri = '';
			if($data){
				$file = 'images/'. uniqid() . '.png';
				$success = file_put_contents($file, $data);
				$uri = $myhost.$file;
			}

			//Lưu vào csdl
			if($uri !== '' && $id !== ''){
				$sql = "INSERT INTO hinhanh(idks, link) VALUES('$id','$uri')";
				$result = $mysqli->query($sql);

				if($result){
					// không làm gì
				}
				else{
					echo 'KHONG_THANH_CONG';
					return;
				}

			}else {
				echo 'KHONG_THANH_CONG';
				return;
			}
		}
	}
	echo 'THANH_CONG';// cập nhật thành công
?>﻿