
<?php
//đăng kí

include('connect/connect.php');
$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$id = $obj['id'];
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

$tiennghikhachsan = $obj['tiennghikhachsan'];
//decode dataimg và up ảnh lên host
$data = base64_decode($dataimg);
//Nếu không cập nhật ảnh
if($dataimg === true){
	if($namehotel !=='' && $price !== '' && $hoteltype !=='' && $phone !== '' && $date!=='' && $address !=='' && $lat !== '' && $lng!=='' && $tiennghi !== ''){
		
	 	$sql = "UPDATE khachsan SET ten = '$namehotel', gia = $price, diachi = '$address', loai = '$hoteltype',ngaycapnhat = '$date', website = '$website', sdt = '$phone', tiennghihangdau = '$tiennghi', lat = $lat, `long` = $lng, thietbikhachsan='$tiennghikhachsan' WHERE id = $id";

	 	//echo $sql;
	 	
		$result = $mysqli->query($sql);
		//$result = mysql_query($sql);
		//$result = mysql_query($sql);
		if($result) {
			echo 'THANH_CONG';
		}
		else{
			echo 'KHONG_THANH_CONG';
		} 
	}
	else{
			echo 'KHONG_THANH_CONG';
	}
}
else{ //Có cập nhật ảnh đại diện
	//set nơi lưu vào và tên file.png
	$uri = '';
	if($data){
		$file = 'images/'. uniqid() . '.png';
		$success = file_put_contents($file, $data);
		$uri = $myhost.$file;
	}
	// echo $id.' '.$namehotel.' '.$price.' '.$hoteltype.' '.$phone.' '.$date.' '.$address.' '.$lat.' '.$lng.' '.$website.' '.$uri;

	if($namehotel !=='' && $price !== '' && $dataimg!=='' && $hoteltype !=='' && $phone !== '' && $date!=='' && $address !=='' && $lat !== '' && $lng!=='' && $tiennghi !== '' && $uri !== ''){
		
	 	$sql = "UPDATE khachsan SET ten = '$namehotel', gia = '$price', hinhanh = '$uri', diachi = '$address', loai = '$hoteltype', website = '$website', sdt = '$phone', tiennghihangdau = '$tiennghi', ngaycapnhat = '$date', lat = '$lat', `long` = '$lng', thietbikhachsan='$tiennghikhachsan' WHERE id = '$id'";
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
}

?> 
