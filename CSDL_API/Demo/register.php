<?php
//đăng kí
include('connect/connect.php');
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
 $name = $obj['name'];
 $email = $obj['email'];
 $password = md5($obj['password']);


if($name !=='' && $email !== '' && $password!==''){
	
	$sql = "INSERT INTO user(email,password,hoten,quyen) VALUES('$email','$password','$name', '0')";
	$result = $mysqli->query($sql);
	if($result){
		echo 'THANH_CONG';
	}
	else{
		echo 'KHONG_THANH_CONG';
	}
}
else{
	echo 'KHONG_THANH_CONG';
}

?>