<?php
	use \Firebase\JWT\JWT;
	require __DIR__ . '/vendor/autoload.php';
	include('function.php');
	include('connect/connect.php');
	if(file_get_contents("php://input") != NULL){
		$json = file_get_contents("php://input");
		$obj = json_decode($json, true);
		//get dữ liệu
		$dataimg = $obj["dataimg"];
		$id = $obj["id"];
		//decode data
		$data = base64_decode($dataimg);
		//set nơi lưu vào và tên file.png
		$uri = '';
		//$myhost = 'http://192.168.201.2/apptrivago/';
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
				//Không trả về thông báo gì nếu thành công
			}
			else{
				echo 'KHONG_THANH_CONG';
			}

		}else echo 'KHONG_THANH_CONG';
	}
?>﻿