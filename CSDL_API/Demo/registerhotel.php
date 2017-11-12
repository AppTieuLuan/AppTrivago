<?php
//đăng kí
include('connect/connect.php');
$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$userid = $obj['userid'];
$namehotel = $obj['namehotel'];
$price = $obj['price'];
$dataimg = $obj['dataimg'];
$hoteltype = $obj['hoteltype'];
$phone = $obj['phone'];
$date = $obj['date'];
$address = $obj['address'];
$lat = $obj['lat'];
$lng = $obj['lng'];
$tiennghi = $obj['tiennghi'];
$website = $obj['website'];
$thietbikhachsan = $obj['tiennghikhachsan'];
//decode dataimg và up ảnh lên host
$data = base64_decode($dataimg);
//set nơi lưu vào và tên file.png
$uri = '';
//$myhost = 'http://192.168.201.2/apptrivago/';
if($data){
	$file = 'images/'. uniqid() . '.png';
	$success = file_put_contents($file, $data);
	$uri = $myhost.$file;
}
// echo $userid.' '.$namehotel.' '.$price.' '.$hoteltype.' '.$phone.' '.$date.' '.$address.' '.$lat.' '.$lng.' '.$website.' '.$uri;
if($namehotel !=='' && $price !== '' && $dataimg!=='' && $hoteltype !=='' && $phone !== '' && $date!=='' && $address !=='' && $lat !== '' && $lng!=='' && $tiennghi !== '' && $uri !== ''){
	
 	$sql = "INSERT INTO khachsan(ten, gia, hinhanh, diachi, loai, website, sdt, tiennghihangdau, ngaycapnhat, user, tinhtrang, daduyet, lat, `long`,thietbikhachsan) VALUES('$namehotel','$price','$uri', '$address', '$hoteltype', '$website', '$phone', '$tiennghi', '$date', '$userid', '0', '0', '$lat', '$lng','$thietbikhachsan')";
	$result = $mysqli->query($sql);
	if($result){
		$sql1 = "SELECT MAX(id) as id from khachsan";
		$result1 = $mysqli->query($sql1);
		$id = mysqli_fetch_assoc($result1);

		$array = array('rp'=>'THANH_CONG', 'id'=>$id);
		print_r(json_encode($array));
	}
	else{
		$array = array('rp'=>'KHONG_THANH_CONG');
		print_r(json_encode($array));
	}
}
else{
	$array = array('rp'=>'KHONG_THANH_CONG');
	print_r(json_encode($array));
}

?>