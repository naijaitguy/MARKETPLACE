-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 25, 2020 at 12:08 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `markethub`
--

-- --------------------------------------------------------

--
-- Table structure for table `market`
--

CREATE TABLE `market` (
  `MarketId` int(10) NOT NULL,
  `UserId` int(10) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Discription` varchar(100) NOT NULL,
  `Location` varchar(100) NOT NULL,
  `Category` varchar(100) NOT NULL,
  `Image1` varchar(100) NOT NULL,
  `Image2` varchar(100) NOT NULL,
  `Image3` varchar(100) NOT NULL,
  `CreatedDate` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `market`
--

INSERT INTO `market` (`MarketId`, `UserId`, `Name`, `Discription`, `Location`, `Category`, `Image1`, `Image2`, `Image3`, `CreatedDate`) VALUES
(8, 7, 'Rosemary Store', 'All seafoods', 'Lagos', 'Vegetables', 'http://localhost:4000/image/image-1590347842644.png', 'http://localhost:4000/image/image-1590347858961.png', 'http://localhost:4000/image/image-1590347875498.png', '2020-05-24 20:17:55.573'),
(9, 7, 'Miracle stor', 'all food itmes', 'Lagos', 'Breads', 'http://localhost:4000/image/image-1590354904095.png', 'http://localhost:4000/image/image-1590354910963.png', 'http://localhost:4000/image/image-1590354918472.png', '2020-05-24 22:15:18.525'),
(10, 7, 'agromall', 'all farm products', 'Lagos', 'Farm Product', 'http://localhost:4000/image/image-1590355783759.jpg', 'http://localhost:4000/image/image-1590355787223.png', 'http://localhost:4000/image/image-1590355795860.png', '2020-05-24 22:29:55.944'),
(11, 7, 'babatunde complex', 'all kinds of vegtables', 'Porth Harcourt', 'Vegetables', 'http://localhost:4000/image/image-1590357608692.jpg', 'http://localhost:4000/image/image-1590357614231.jpg', 'http://localhost:4000/image/image-1590357617986.jpg', '2020-05-24 23:00:18.034');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserId` int(10) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `UserName` varchar(100) NOT NULL,
  `Phone` varchar(100) NOT NULL,
  `Address` varchar(100) NOT NULL,
  `Password` varchar(200) NOT NULL,
  `Role` varchar(10) NOT NULL,
  `FullName` varchar(100) NOT NULL,
  `Date` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserId`, `Email`, `UserName`, `Phone`, `Address`, `Password`, `Role`, `FullName`, `Date`) VALUES
(1, 'sjsjjsjjsjs', '', 'kjkdjmnkdjkmd', 'nknkmnkmkm', 'njnjknk', '', 'kjkjjklkl', ''),
(2, 'babs@yahoo.com', 'babs', '07068550755', 'Desirelove01@#', '$2b$10$lf2uuJLykTqpN0jPN53Md.WABJ6VuQxiYVgKVybyl7scsKm6POifa', 'User', 'bababbabab', '2020-05-24 14:13:51.229'),
(3, 'jkkkm@jjjj.jo', 'oijkoijk', '09980808000', 'lkolkol', '$2b$10$jFlRw03RaU.KJbi4yPCWF./TC1Y.HEJ5G4LA9gJDjv6uae8lqBHYm', 'User', 'okkko', '2020-05-24 17:59:13.076'),
(4, 'kkkm@jjjj.jo', 'oijkoi', '09980808000', 'lkolkol', '$2b$10$8EstY1e3JVPnGHrosXC/8ui/CP4GKrH1.7Ay5M63pohooM8payeQi', 'User', 'okkko', '2020-05-24 18:00:15.376'),
(5, 'babatundeolusegun@rocketmail.com', 'babszy', '08090410537', '33 shagamu road ikorodu lagos', '$2b$10$eHFLairJ/iMOp3ywupph2uYrM.vE30m3XzTHxbsMZVYiHyTcGex4y', 'User', 'babatunde olusegun', '2020-05-24 18:04:11.940'),
(6, 'test@theagromall.com.com', 'babs', '07068550755', 'Desirelove01@#', '$2b$10$o6qFmIemz5yfv26diiNibuL5jOv3hyJhluQAqAOXu5xTJvMq1XakK', 'Admin', 'huiduijieec', '2020-05-24 18:20:13.311'),
(7, 'test@theagromall.com', 'babs', '07068550755', 'Desirelove01@#', '$2b$10$.CO3CtkOVJkSy0kmQRL3L.8pFCnFNAm02qpfJKOybFP1ZKrUjQisG', 'Admin', 'huiduijieec', '2020-05-24 18:26:10.683');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `market`
--
ALTER TABLE `market`
  ADD PRIMARY KEY (`MarketId`),
  ADD KEY `market-users` (`UserId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `market`
--
ALTER TABLE `market`
  MODIFY `MarketId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `market`
--
ALTER TABLE `market`
  ADD CONSTRAINT `market-users` FOREIGN KEY (`UserId`) REFERENCES `users` (`UserId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
