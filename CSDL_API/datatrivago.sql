-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 29, 2017 at 08:34 AM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `datatrivago`
--

DELIMITER $$
--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `fixString` (`input` VARCHAR(15)) RETURNS VARCHAR(15) CHARSET utf8 BEGIN
  declare output varchar(15);
  SET output = REPLACE(input,'ö','oe');
  RETURN output;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `tinhKhoangCach` (`lat1` DOUBLE, `long1` DOUBLE, `lat2` DOUBLE, `long2` DOUBLE) RETURNS DOUBLE BEGIN
 DECLARE theta DOUBLE ; 
 DECLARE miles DOUBLE ; 
 DECLARE kilometers DOUBLE ; 
 set theta = long1 - long2 ;
 set miles =(SIN(RADIANS(lat1)) * SIN(RADIANS(lat2))) +(COS(RADIANS(lat1)) * COS(RADIANS(lat2)) * COS(RADIANS(theta))) ; 
 set miles = ACOS(miles) ; 
 set miles = DEGREES(miles) ; 
 set miles = miles * 60 * 1.1515 ; 
 set kilometers =TRUNCATE(miles * 1.609344, 2) ; 
 RETURN kilometers ;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `binhluan`
--

CREATE TABLE `binhluan` (
  `idks` int(11) NOT NULL,
  `iduser` int(11) NOT NULL,
  `NoiDung` text NOT NULL,
  `Ngay` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int(11) NOT NULL primary key
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `binhluan`
--

INSERT INTO `binhluan` (`idks`, `iduser`, `NoiDung`, `Ngay`, `id`) VALUES
(1, 1, 'Chất lượng tốt, View Đẹp', '2017-09-21 09:54:10', 1),
(1, 1, 'Lần 2 đến đây chất lượng tăng lên', '2017-09-21 10:01:34', 3),
(2, 1, 'View đẹp, tiện nghi đầy đủ', '2017-09-21 10:05:57', 5),
(5, 3, 'Đồ ăn khá ngon, giá tốt', '2017-09-21 10:05:57', 6),
(5, 4, 'Tiện nghi khá đầy đủ', '2017-09-21 10:05:57', 7),
(5, 5, 'Phòng có mùi hôi', '2017-09-21 10:05:57', 8),
(6, 6, 'Bể bơi rất thích', '2017-09-21 10:05:57', 9),
(7, 8, 'Phục vụ có thái độ lịch sự', '2017-09-21 10:05:57', 10),
(7, 9, 'Rất tuyệt', '2017-09-21 10:05:57', 11),
(1, 10, 'Like', '2017-09-21 10:05:57', 12),
(2, 10, 'Đẹp', '2017-09-21 10:05:57', 13),
(1, 5, 'Đẹp tuyệt vớif', '2017-09-27 17:47:15', 14),
(1, 6, 'Nem chua rán ngon, chiên vừa miệng luôn, sốt chấm cũng vậy \r\nMón chân gà là đỉnh nhất, ăn hoài không ngán mà 1 phần cũng vừa', '2017-09-27 17:50:04', 15),
(1, 8, 'View đẹp ', '2017-09-27 17:50:04', 16),
(1, 9, 'Bữa mình thèm chân gà muối chiên nên quyết định order trên deliverynow 1 phần chân gà muối chiên vag 1 phần mực chiên nước mắm.', '2017-09-27 17:50:04', 17),
(1, 4, 'Quán lúc nào cũng đông, nhưng nhân viên rất nhanh nhẹn', '2017-09-27 17:50:04', 18),
(1, 2, 'Đồ ăn món thích món không. Chắc ko hợp khẩu vị.', '2017-09-27 17:50:04', 19),
(1, 1, 'Quán nổi tiếng nên lúc nào cũng thấy kín bàn', '2017-09-27 17:50:04', 20),
(1, 1, 'BLLLL', '2017-10-09 16:13:17', 21),
(1, 1, 'Test', '2017-10-09 16:19:03', 22),
(1, 1, 'Test 2', '2017-10-09 16:19:07', 23),
(1, 1, 'da test 3', '2017-10-09 16:19:10', 24),
(1, 1, 'Tét 4', '2017-10-09 16:19:30', 25),
(1, 1, 'Ngon', '2017-10-09 16:19:30', 26),
(1, 1, 'Ổn', '2017-10-09 16:19:31', 27),
(1, 1, 'qwieuqowec ', '2017-10-09 16:20:21', 28),
(1, 1, 'xcdsfgjfasdkljas;d', '2017-10-09 16:21:46', 29),
(1, 1, 'c,mnv,xcnpaod', '2017-10-09 16:21:51', 30),
(1, 1, '234234zopxiczpcq\'qư', '2017-10-09 16:22:58', 31),
(1, 1, 'cmn,mcxzcq;d', '2017-10-09 16:23:02', 32),
(19, 1, 'zxcm,nqoweqw;el', '2017-10-09 16:24:11', 33),
(19, 1, 'tigpovicpxzc ádqwe', '2017-10-09 16:25:07', 34),
(19, 1, '777', '2017-10-09 16:58:18', 35),
(19, 1, 'TEST', '2017-10-09 17:01:55', 36),
(20, 1, 'Test cái nao', '2017-10-09 17:10:23', 37),
(20, 1, 'Ngon rôi', '2017-10-09 17:10:35', 38),
(20, 1, '5555', '2017-10-09 17:10:50', 39),
(20, 1, 'Ngon r', '2017-10-09 17:11:03', 40),
(1, 1, 'Test them phat nao', '2017-10-10 17:29:26', 41),
(7, 1, 'Kh´n ngon', '2017-10-10 17:49:28', 42),
(1, 1, '011d011dd', '2017-10-24 06:56:42', 43),
(1, 1, 'binh luan', '2017-10-28 14:09:57', 44);

-- --------------------------------------------------------

--
-- Table structure for table `danhgia`
--

CREATE TABLE `danhgia` (
  `id` int(11) NOT NULL primary key,
  `idks` int(11) NOT NULL,
  `iduser` int(11) NOT NULL,
  `danhgia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `danhgia`
--

INSERT INTO `danhgia` (`id`, `idks`, `iduser`, `danhgia`) VALUES
(1, 1, 1, 5),
(2, 1, 2, 5),
(3, 1, 3, 4),
(4, 1, 4, 2);

-- --------------------------------------------------------

--
-- Table structure for table `hinhanh`
--

CREATE TABLE `hinhanh` (
  `id` int(11) NOT NULL primary key, 
  `idks` int(11) NOT NULL,
  `link` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `hinhanh`
--

INSERT INTO `hinhanh` (`id`, `idks`, `link`) VALUES
(1, 1, 'https://imgec.trivago.com/partnerimages/13/67/136724066_x.jpeg'),
(3, 1, 'https://imgec.trivago.com/partnerimages/13/67/136724158_x.jpeg'),
(4, 1, 'https://imgec.trivago.com/partnerimages/13/67/136724128_x.jpeg'),
(5, 1, 'https://imgec.trivago.com/partnerimages/13/67/136724200_x.jpeg'),
(6, 1, 'https://imgec.trivago.com/partnerimages/13/67/136724116_x.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `khachsan`
--

CREATE TABLE `khachsan` (
  `id` int(11) NOT NULL primary key,
  `ten` text NOT NULL,
  `gia` float DEFAULT NULL,
  `hinhanh` text NOT NULL,
  `diachi` text NOT NULL,
  `loai` text,
  `website` text,
  `sosao` int(11) DEFAULT NULL,
  `sdt` text,
  `tiennghihangdau` text NOT NULL,
  `ngaycapnhat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` int(11) DEFAULT NULL,
  `tinhtrang` int(11) DEFAULT NULL,
  `daduyet` int(11) NOT NULL,
  `lat` double DEFAULT NULL,
  `long` double DEFAULT NULL,
  `idvung` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `khachsan`
--

INSERT INTO `khachsan` (`id`, `ten`, `gia`, `hinhanh`, `diachi`, `loai`, `website`, `sosao`, `sdt`, `tiennghihangdau`, `ngaycapnhat`, `user`, `tinhtrang`, `daduyet`, `lat`, `long`, `idvung`) VALUES
(1, 'Lakeview Villas And Viet Nam', 2455600, 'https://imgec.trivago.com/partnerimages/18/02/180235620_x.jpeg', '15 Tran Phu Street, 670000, Đà Lạt, Việt Nam', 'Khách sạn', 'lakeviewvillas.com', 1, '0969340321', '1100101100', '2017-10-05 16:39:44', 11, 1, 0, 10.773388313390146, 106.65980268269777, 0),
(5, 'Ngoc Phat', 1336300, 'https://imgec.trivago.com/partnerimages/22/00/220066432_x.jpeg', '10 Hồ Tùng Mậu, 670000, Đà Lạt, Việt Nam', '', '', 2, '', '1100101100', '2017-09-29 15:38:48', 11, 1, 0, 10.757015054347724, 106.65971651673318, 0),
(6, 'The Sailing Bay Beach Resort', 1603400, 'https://imgec.trivago.com/partnerimages/19/00/190043264_x.jpeg', '170 Ho Xuan Huong, 800000, Mũi Né, Việt Nam', '', '', 4, '', '1100101111', '2017-09-29 14:37:44', 1, 1, 0, 10.1485747, 106.9692098, 0),
(7, 'Sea Links Beach', 2375900, 'https://imgec.trivago.com/partnerimages/11/09/110997336_x.jpeg', 'Km 9 Nguyen Thong, 800000, Mũi Né, Việt Nam', '', '', 3, '', '1100101110', '2017-09-29 14:37:44', 0, 1, 0, 10.7685747, 106.5692098, 0),
(8, 'Binh An Village Dalat', 3614000, 'https://imgec.trivago.com/partnerimages/14/44/144493300_x.jpeg', 'Plot Number 6, Area 162,Tuyen Lam Lake, 670000, Đà Lạt, Việt Nam', 'Khách sạn', 'binhanvillage.com.vn', 4, '08999999999', '1110010110', '2017-09-29 15:09:07', 0, 0, 1, 10.7895747, 106.9692098, 0),
(9, 'Six Senses Ninh Van Bay', 8139500, 'https://imgec.trivago.com/gtximages/partnerimages/11/04/110484146_y@2x.jpeg', 'Ninh Van bay, Ninh Hoa, Khanh Hoa, 650000, Nha Trang, Việt Nam', 'Resort', 'SixSensesNinhVanBay.com', 5, '+109845933920', '1100101110', '2017-09-30 17:19:12', 0, 0, 0, 10.1434647, 106.6092098, 0),
(10, 'Lavender Nha Trangy', 577000, 'https://imgec.trivago.com/partnerimages/14/50/145036042_x.jpeg', '98C/4 Tran Phu St. Loc Tho Ward, 62000, Nha Trang, Việt Nam', 'Khách sạn', 'LavenderNhaTrang.com', 5, '+109845933920', '1110101110', '2017-09-30 17:27:23', 0, 0, 1, 10.1488947, 106.8399098, 0),
(11, 'Mia Resort Nha Trang', 5377000, 'https://imgec.trivago.com/partnerimages/14/42/144280106_x.jpeg', 'Bai Dong, Cam Hai Dong, 650000, Nha Trang, Việt Nam', 'Resort', 'MiaResortNhaTrang.com', 1, '+109845933920', '1111101110', '2017-09-30 17:27:23', 0, 0, 1, 10.1483457, 106.5657298, 0),
(12, 'Riverside', 979000, 'https://imgec.trivago.com/partnerimages/13/87/138768540_x.jpeg', '18-19-20 Ton Duc Thang Street, District 1, 700000, TP. Hồ Chí Minh, Việt Nam', 'Khách sạn', 'Riverside.com', 1, '+109845933920', '1100101110', '2017-09-30 17:27:23', 0, 1, 0, 10.1489247, 106.5971098, 0),
(13, 'Queen Ann', 740000, 'https://imgec.trivago.com/partnerimages/20/03/200337120_x.jpeg', '86-88 Bui Thi Xuan Street, 700000, TP. Hồ Chí Minh, Việt Nam', 'Khách sạn', 'queenan.com', 4, '909657567', '1111001110', '2017-10-01 13:38:56', 0, 0, 1, 10.1434457, 106.5687158, 0),
(14, 'Grand Saigon', 2387000, 'https://imgec.trivago.com/partnerimages/17/77/177750770_x.jpeg', '8 Dong Khoi Street, 700000, TP. Hồ Chí Minh, Việt Nam', 'Khách sạn', 'queenan.com', 4, '909657567', '1111001110', '2017-10-01 13:52:35', 0, 1, 0, 10.9998577, 106.9804098, 0),
(15, 'Renaissance Riverside', 3222220, 'https://imgec.trivago.com/partnerimages/17/77/177750770_x.jpeg', '8 Dong Khoi Street, 700000, TP. Hồ Chí Minh, Việt Nam', 'Khách sạn', 'queenan.com', 4, '8679879342', '1111001110', '2017-10-01 13:52:35', 0, 1, 0, 10.9085747, 106.1134098, 0),
(16, 'Continental Saigon', 1234570, 'https://imgec.trivago.com/partnerimages/16/16/161675290_x.jpeg', '132-134 Dong Khoi Street, District 1, 700000, TP. Hồ Chí Minh, Việt Nam', 'Khách sạn', 'queenan.com', 4, '909657567', '1100001110', '2017-10-01 13:52:35', 0, 0, 1, 10.9855747, 106.1789098, 0),
(17, 'Green Ruby', 4487000, 'https://imgec.trivago.com/itemimages/38/70/3870610_v1_isq.jpeg', '25/15 CUU LONG ST., WARD 02, TAN BINH DIST., TP. Hồ Chí Minh, Việt Nam', 'Khách sạn', 'queenan.com', 2, '909657567', '1001001110', '2017-10-01 13:52:36', 0, 1, 0, 10.7895747, 106.2345098, 0),
(18, 'Alagon', 1387000, 'https://imgec.trivago.com/partnerimages/20/01/200172056_x.jpeg', '289-291 Ly Tu Trong, District 1, 700000, TP. Hồ Chí Minh, Việt Nam', 'Khách sạn', 'qu22eenan.com', 4, '909657567', '0011001110', '2017-10-01 13:53:10', 0, 1, 0, 10.9910747, 106.1238098, 0),
(19, 'A & Em 8A Thai Van Lung', 987000, 'https://imgec.trivago.com/partnerimages/21/31/213125936_x.jpeg', '8A Thai Van Lung Street, Ben Thanh Ward, District 1, 700000, TP. Hồ Chí Minh, Việt Nam', 'Khách sạn', 'queenan.com', 4, '909657567', '1111001000', '2017-10-01 13:54:07', 0, 1, 0, 10.776226781446132, 106.65353033691645, 0),
(20, 'Thien Ha And Apartment', 4387000, 'https://imgec.trivago.com/partnerimages/14/52/145242676_x.jpeg', '516-518 Huynh Tan Phat, 7Th District, 70000, TP. Hồ Chí Minh, Việt Nam', 'Resort', 'queenan.com', 4, '909657567', '1111001110', '2017-10-01 13:54:07', 0, 1, 0, 10.775938588242429, 106.6568981856107, 0),
(21, 'Tan Son Nhatn', 3184000, 'https://imgec.trivago.com/partnerimages/19/83/198399134_x.jpeg', '198-200 Hoang Van Thu Street, -, TP. Hồ Chí Minh, Việt Nam', 'Resort', 'q651nan.com', 4, '9909657567', '1111111111', '2017-10-01 13:54:07', 0, 0, 1, 10.8973747, 106.5692348, 0),
(22, 'Les Hameaux de l Orient', 1587000, 'https://imgec.trivago.com/partnerimages/17/77/177750770_x.jpeg', 'Rang Hamlet, 70000, TP. Hồ Chí Minh, Việt Nam', 'Khách sạn', 'queenan.com', 4, '909657567', '1111001110', '2017-10-01 13:54:51', 0, 0, 1, 10.9925747, 106.4322098, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tinnhan`
--

CREATE TABLE `tinnhan` (
  `id` int(11) NOT NULL primary key,
  `iduser` int(11) NOT NULL,
  `tieude` text NOT NULL,
  `noidung` text,
  `tinhtrang` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL primary key,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `hoten` text NOT NULL,
  `quyen` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `hoten`, `quyen`) VALUES
(1, 'user1@gmail.com', '202cb962ac59075b964b07152d234b70', 'Trần Văn A', 1),
(2, 'user22@gmail.com', 'user22', 'Trần Văn D', 1),
(3, 'user33@gmail.com', 'user33', 'Trần Văn ZD', 0),
(4, 'user2', 'user2', 'Nguyễn Trần Thị A', 0),
(5, 'user3', 'user3', 'Lương Văn C', 0),
(6, 'user4', 'user4', 'Lương Văn D', 0),
(7, 'user5', 'user5', 'Lương Văn ED', 0),
(8, 'user6', 'user6', 'Lương Văn EAZ', 0),
(9, 'user7', 'user7', 'Lương Bổng', 0),
(10, 'user8', 'user8', 'Thế Chột', 0),
(11, 'cong@gmail.com', '202cb962ac59075b964b07152d234b70', 'cong', 0),
(14, 'cong11@gmail.com', '202cb962ac59075b964b07152d234b70', 'cong11', 0);

-- --------------------------------------------------------

--
-- Table structure for table `vung`
--
-- --------------------------------------------------------

--
-- Table structure for table `yeuthich`
--

CREATE TABLE `yeuthich` (
  `iduser` int(11) NOT NULL ,
  `idks` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
-- --

-- --
-- -- Indexes for table `binhluan`
-- --
-- ALTER TABLE `binhluan`
  -- ADD PRIMARY KEY (`id`),
  -- -- ADD KEY `idks` (`idks`),
  -- -- ADD KEY `iduser` (`iduser`);

-- --
-- -- Indexes for table `danhgia`
-- --
-- ALTER TABLE `danhgia`
  -- ADD PRIMARY KEY (`id`),
  -- -- ADD KEY `iduser` (`iduser`),
  -- -- ADD KEY `idks` (`idks`);

-- --
-- -- Indexes for table `hinhanh`
-- --
-- ALTER TABLE `hinhanh`
  -- ADD PRIMARY KEY (`id`),
  -- -- ADD KEY `idks` (`idks`);

-- --
-- -- Indexes for table `khachsan`
-- --
-- ALTER TABLE `khachsan`
  -- ADD PRIMARY KEY (`id`),
  -- -- ADD KEY `idvung` (`idvung`);

-- --
-- -- Indexes for table `tinnhan`
-- --
-- ALTER TABLE `tinnhan`
  -- ADD PRIMARY KEY (`id`);

-- --
-- -- Indexes for table `user`
-- --
-- ALTER TABLE `user`
  -- ADD PRIMARY KEY (`id`);

-- --
-- -- Indexes for table `vung`
-- --
-- ALTER TABLE `vung`
  -- ADD PRIMARY KEY (`id`);

--
-- Indexes for table `yeuthich`
--
-- ALTER TABLE `yeuthich`
  -- ADD PRIMARY KEY (`iduser`,`idks`),
  -- ADD KEY `idks` (`idks`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `binhluan`
--
ALTER TABLE `binhluan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT for table `danhgia`
--
ALTER TABLE `danhgia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `hinhanh`
--
ALTER TABLE `hinhanh`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `khachsan`
--
ALTER TABLE `khachsan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `tinnhan`
--
ALTER TABLE `tinnhan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
