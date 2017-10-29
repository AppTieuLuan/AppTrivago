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
		function BinhLuan($id,$ten,$binhluan,$sodanhgia){
			$this->id = $id;
			$this->ten = $ten;
			$this->binhluan = $binhluan;
			$this->sodanhgia = $sodanhgia;
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
?>