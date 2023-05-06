-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2023 at 07:15 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cd`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `uname` varchar(30) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `uname`, `password`, `email`) VALUES
(1, 'chandu', 'chandu', 'chandu', 'c@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `classteacher`
--

CREATE TABLE `classteacher` (
  `Year` varchar(10) NOT NULL,
  `Section` varchar(10) NOT NULL,
  `Faculty` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `classteacher`
--

INSERT INTO `classteacher` (`Year`, `Section`, `Faculty`) VALUES
('3', 'C', 'Bosu Babu'),
('3', 'B', 'Krishnanjeyulu'),
('3', 'A', 'Amaravathi');

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `id` int(60) NOT NULL,
  `name` varchar(90) NOT NULL,
  `email` varchar(90) NOT NULL,
  `password` varchar(90) NOT NULL DEFAULT 'root'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`id`, `name`, `email`, `password`) VALUES
(2, 'Bosu Babu', 'bosubabu@gmail.com', 'root');

-- --------------------------------------------------------

--
-- Table structure for table `faculty1`
--

CREATE TABLE `faculty1` (
  `Year` varchar(30) NOT NULL,
  `Section` varchar(30) NOT NULL,
  `Subject` varchar(30) NOT NULL,
  `Faculty` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faculty1`
--

INSERT INTO `faculty1` (`Year`, `Section`, `Subject`, `Faculty`) VALUES
('3', 'A', 'WT', 'Pranitha'),
('3', 'A', 'OOSE', 'Bhavani'),
('3', 'A', 'ML', 'Yasasswi'),
('3', 'A', 'NNDL', 'Krishna Prasad'),
('3', 'A', 'ITRE', 'Bhaskar'),
('3', 'A', 'CNS', 'Amaravathi'),
('3', 'A', 'SPORTS', '-'),
('3', 'A', 'COUNCELLING', '-'),
('3', 'A', 'LIBRARY', '-'),
('3', 'A', 'OOSE/WT LAB', 'Pranitha'),
('3', 'A', 'OOSE/WT LAB', 'Bhavani'),
('3', 'B', 'WT', 'Bosu Babu'),
('3', 'B', 'OOSE', 'Krishnanjeyulu'),
('3', 'B', 'ML', 'Sangeetha'),
('3', 'B', 'NNDL', 'Anusha'),
('3', 'B', 'ITRE', 'Vijay'),
('3', 'B', 'CNS', 'Gayathri'),
('3', 'B', 'SPORTS', '-'),
('3', 'B', 'COUNCELLING', '-'),
('3', 'B', 'LIBRARY', '-'),
('3', 'B', 'OOSE/WT LAB', 'Bosu Babu'),
('3', 'B', 'OOSE/WT LAB', 'Krishnanjeyulu'),
('3', 'C', 'WT', 'Bosu Babu'),
('3', 'C', 'ML', 'Rohini'),
('3', 'C', 'NNDL', 'Anusha'),
('3', 'C', 'ITRE', 'Prakash'),
('3', 'C', 'CNS', 'Usha Bala'),
('3', 'C', 'SPORTS', '-'),
('3', 'C', 'COUNCELLING', '-'),
('3', 'C', 'LIBRARY', '-'),
('3', 'C', 'OOSE/WT LAB', 'Bosu Babu'),
('3', 'C', 'OOSE/WT LAB', 'Preethi'),
('3', 'C', 'OOSE', 'Preethi'),
('3', 'C', 'QA', 'Kamesh'),
('3', 'C', 'VA', 'Yashoda'),
('3', 'C', 'QA', 'Kamesh');

-- --------------------------------------------------------

--
-- Table structure for table `timetable`
--

CREATE TABLE `timetable` (
  `Year` varchar(100) DEFAULT NULL,
  `Section` varchar(100) DEFAULT NULL,
  `Day` varchar(100) DEFAULT NULL,
  `Period1` varchar(100) DEFAULT NULL,
  `Period2` varchar(100) DEFAULT NULL,
  `Period3` varchar(100) DEFAULT NULL,
  `Period4` varchar(100) DEFAULT NULL,
  `Period5` varchar(100) DEFAULT NULL,
  `Period6` varchar(100) DEFAULT NULL,
  `Period7` varchar(100) DEFAULT NULL,
  `Period8` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `timetable`
--

INSERT INTO `timetable` (`Year`, `Section`, `Day`, `Period1`, `Period2`, `Period3`, `Period4`, `Period5`, `Period6`, `Period7`, `Period8`) VALUES
('3', 'C', 'Monday', 'OOSE/WT LAB', 'OOSE/WT LAB', 'OOSE/WT LAB', 'OOSE/WT LAB', 'NNDL', 'WT', 'WT', 'ML'),
('3', 'C', 'Tuesday', 'ML', 'WT', 'CNS', 'NNDL', 'OOSE/WT LAB', 'OOSE/WT LAB', 'OOSE/WT LAB', 'OOSE/WT LAB'),
('3', 'C', 'Wednesday', 'CNS', 'OOSE', 'ITRE', 'LIBRARY', 'VA', 'VA', 'WT', 'SPORTS'),
('3', 'C', 'Thrusday', 'ITRE', 'QA', 'QA', 'WT', 'OOSE', 'OOSE', 'NNDL', 'NNDL'),
('3', 'C', 'Friday', 'NNDL', 'ITRE', 'ITRE', 'OOSE', 'ML', 'ML', 'CNS', 'COUNCELLING'),
('3', 'C', 'Saturday', 'OOSE', 'CNS', 'CNS', 'ML', '--', '--', '--', '--'),
('0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'),
('3', 'B', 'Monday', 'NNDL', 'CNS', 'QA', 'QA', 'OOSE/WT LAB', 'OOSE/WT LAB', 'OOSE/WT LAB', 'OOSE/WT LAB'),
('3', 'B', 'Tuesday', 'LIBRARY', 'QA', 'CNS', 'ML', 'CNS', 'VA', 'ML', 'WT');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `id` int(60) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
