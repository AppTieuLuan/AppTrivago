<?php
	mysql_connect("localhost","root","");
	mysql_select_db("datatrivago");
	mysql_query("SET NAMES 'utf8'");

	/**
	*
	*/
	class KhachSan
	{
		public $key;
		public $ten;
		public $hinh;
		public $diachi;
		public $gia;
		function KhachSan($id,$ten,$hinh,$gia,$diachi)
		{
			$this->key = $id;
			$this->ten =$ten;
			$this->hinh = $hinh;
			$this->gia = $gia;
			$this->diachi = $diachi;
		}
	}

	class KhachSanDuyet
	{
		public $key;
		public $ten;
		public $hinh;
		public $diachi;
		public $gia;
		public $user;
		function KhachSanDuyet($id,$ten,$hinh,$gia,$diachi,$user)
		{
			$this->key = $id;
			$this->ten =$ten;
			$this->hinh = $hinh;
			$this->gia = $gia;
			$this->diachi = $diachi;
			$this->user = $user;
		}
	}

	class KhachSann
	{
		public $key;
		public $ten;
		public $hinh;
		public $diachi;
		public $gia;
		public $latitude;
		public $long;
		function KhachSann($id,$ten,$hinh,$gia,$diachi,$lat,$long)
		{
			$this->key = $id;
			$this->ten =$ten;
			$this->hinh = $hinh;
			$this->gia = $gia;
			$this->diachi = $diachi;
			$this->latitude = floatval($lat);
			$this->longitude = floatval($long);
		}
	}

	class KhachSan2
	{
		public $key;
		public $ten;
		public $hinh;
		public $diachi;
		public $gia;
		public $tinhtrang;
		function KhachSan2($id,$ten,$hinh,$gia,$diachi,$tinhtrang)
		{
			$this->key = $id;
			$this->ten =$ten;
			$this->hinh = $hinh;
			$this->gia = $gia;
			$this->diachi = $diachi;
			$this->tinhtrang = $tinhtrang;
		}
	}


	class HinhAnh{
		public $id;
		public $link;
		function HinhAnh($id,$link){
			$this->id = $id;
			$this->link=$link;
		}
	}

	

	class BinhLuan{
		public $id;
		public $ten;
		public $binhluan;
		public $sodanhgia;
		public $ngay;
		public $thang;
		public $nam;
		// function BinhLuan($id,$ten,$binhluan,$sodanhgia){
		// 	$this->id = $id;
		// 	$this->ten = $ten;
		// 	$this->binhluan = $binhluan;
		// 	$this->sodanhgia = $sodanhgia;
		// }
		function BinhLuan($id,$ten,$binhluan,$ngay, $thang, $nam){
			$this->id = $id;
			$this->ten = $ten;
			$this->binhluan = $binhluan;
			$this->ngay = $ngay;
			$this->ngay = $ngay;
			$this->thang = $thang;
			$this->nam = $nam;
		}
	}

	class BinhLuan2{
		public $id;
		public $ten;
		public $binhluan;
		public $sodanhgia;
		public $ngay;
		public $thang;
		public $nam;
		public $solike;
		public $sobl;
		public $islike;
		function BinhLuan2($id,$ten,$binhluan,$ngay,$thang,$nam,$solike,$sobl,$islike){
			$this->id = $id;
			$this->ten = $ten;
			$this->binhluan = $binhluan;
			$this->ngay = $ngay;
			$this->thang = $thang;
			$this->nam = $nam;
			$this->solike = $solike;
			$this->sobl = $sobl;
			$this->islike = $islike;
		}
	}

	class ThongTinKS {
		public $gia;
		public $diachi;
		public $loai;
		public $website;
		public $sdt;
		public $tiennghihangdau;

		function ThongTinKS($gia,$diachi,$loai,$website,$sdt,$tiennghihangdau) {
			$this->gia = $gia;
			$this->diachi = $diachi;
			$this->loai = $loai;
			$this->website = $website;
			$this->sdt = $sdt;
			$this->tiennghihangdau = $tiennghihangdau;
		}
	}

	/**
	* 
	*/
	class User
	{
		public $id;
		public $username;
		public $hoten;
		public $diachi;
		public $quyen;
		function User($id,$username,$hoten,$diachi,$quyen)
		{
			$this->id=$id;
			$this->username =$username;
			$this->hoten=$hoten;
			$this->diachi=$diachi;
			$this->quyen=$quyen;
		}
	}

	class LatLong
	{
		public $latitude;
		public $longitude;
		function LatLong($lat, $long) {
			$this->latitude = floatval($lat);
			$this->longitude = floatval($long);
		}
	}
?>