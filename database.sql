-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: ceyalacdb
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `brand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (1,'Motha'),(2,'Edinghboro'),(3,'Pelawatte'),(4,'Delmege'),(5,'Star'),(6,'Orient'),(7,'Lanka'),(8,'Laughs Sun Up'),(9,'Harischandra'),(10,'Other Brand');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `civilstatus`
--

DROP TABLE IF EXISTS `civilstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `civilstatus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `civilstatus`
--

LOCK TABLES `civilstatus` WRITE;
/*!40000 ALTER TABLE `civilstatus` DISABLE KEYS */;
INSERT INTO `civilstatus` VALUES (1,'Single'),(2,'Married'),(3,'Other');
/*!40000 ALTER TABLE `civilstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` char(8) NOT NULL,
  `nametitle_id` int(11) NOT NULL,
  `callingname` varchar(255) NOT NULL,
  `civilstatus_id` int(11) DEFAULT NULL,
  `fullname` varchar(255) NOT NULL,
  `photo` char(36) DEFAULT NULL,
  `dobirth` date NOT NULL,
  `gender_id` int(11) NOT NULL,
  `nic` varchar(12) NOT NULL,
  `mobile` char(10) NOT NULL,
  `land` char(10) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` text NOT NULL,
  `dorecruit` date DEFAULT NULL,
  `employeestatus_id` int(11) NOT NULL,
  `description` text,
  `tocreation` datetime DEFAULT NULL,
  `creator_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_employee_code` (`code`),
  UNIQUE KEY `unique_employee_nic` (`nic`),
  UNIQUE KEY `unique_employee_mobile` (`mobile`),
  UNIQUE KEY `unique_employee_email` (`email`),
  KEY `f_employee_nametitle_id_fr_nametitle_id` (`nametitle_id`),
  KEY `f_employee_civilstatus_id_fr_civilstatus_id` (`civilstatus_id`),
  KEY `f_employee_gender_id_fr_gender_id` (`gender_id`),
  KEY `f_employee_employeestatus_id_fr_employeestatus_id` (`employeestatus_id`),
  KEY `f_employee_creator_id_fr_user_id` (`creator_id`),
  CONSTRAINT `f_employee_civilstatus_id_fr_civilstatus_id` FOREIGN KEY (`civilstatus_id`) REFERENCES `civilstatus` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `f_employee_creator_id_fr_user_id` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `f_employee_employeestatus_id_fr_employeestatus_id` FOREIGN KEY (`employeestatus_id`) REFERENCES `employeestatus` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `f_employee_gender_id_fr_gender_id` FOREIGN KEY (`gender_id`) REFERENCES `gender` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `f_employee_nametitle_id_fr_nametitle_id` FOREIGN KEY (`nametitle_id`) REFERENCES `nametitle` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employeestatus`
--

DROP TABLE IF EXISTS `employeestatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `employeestatus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeestatus`
--

LOCK TABLES `employeestatus` WRITE;
/*!40000 ALTER TABLE `employeestatus` DISABLE KEYS */;
INSERT INTO `employeestatus` VALUES (1,'Working'),(2,'Resigned'),(3,'Suspended');
/*!40000 ALTER TABLE `employeestatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `file` (
  `id` char(36) NOT NULL,
  `file` mediumblob,
  `thumbnail` mediumblob,
  `filemimetype` varchar(255) DEFAULT NULL,
  `thumbnailmimetype` varchar(255) DEFAULT NULL,
  `filesize` int(11) DEFAULT NULL,
  `originalname` varchar(255) DEFAULT NULL,
  `tocreation` datetime DEFAULT NULL,
  `isused` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gender`
--

DROP TABLE IF EXISTS `gender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `gender` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gender`
--

LOCK TABLES `gender` WRITE;
/*!40000 ALTER TABLE `gender` DISABLE KEYS */;
INSERT INTO `gender` VALUES (1,'Male'),(2,'Female');
/*!40000 ALTER TABLE `gender` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itempayment`
--

DROP TABLE IF EXISTS `itempayment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `itempayment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` char(10) NOT NULL,
  `tocreation` datetime DEFAULT NULL,
  `date` date DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `chequeno` varchar(60) DEFAULT NULL,
  `chequebank` varchar(255) DEFAULT NULL,
  `chequebranch` varchar(255) DEFAULT NULL,
  `chequedate` date DEFAULT NULL,
  `creator_id` int(11) NOT NULL,
  `paymenttype_copy1_id` int(11) NOT NULL,
  `paymentstatus_copy1_id` int(11) NOT NULL,
  `purchase_item_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_supplierpayment_user1_idx` (`creator_id`),
  KEY `fk_supplierpayment_copy1_paymenttype_copy11_idx` (`paymenttype_copy1_id`),
  KEY `fk_supplierpayment_copy1_paymentstatus_copy11_idx` (`paymentstatus_copy1_id`),
  CONSTRAINT `fk_supplierpayment_copy1_paymentstatus_copy11` FOREIGN KEY (`paymentstatus_copy1_id`) REFERENCES `paymentstatus_copy1` (`id`),
  CONSTRAINT `fk_supplierpayment_copy1_paymenttype_copy11` FOREIGN KEY (`paymenttype_copy1_id`) REFERENCES `paymenttype_copy1` (`id`),
  CONSTRAINT `fk_supplierpayment_user10` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itempayment`
--

LOCK TABLES `itempayment` WRITE;
/*!40000 ALTER TABLE `itempayment` DISABLE KEYS */;
/*!40000 ALTER TABLE `itempayment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `material` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` char(10) NOT NULL,
  `tocreation` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `photo` mediumblob,
  `lastpurchaseprice` decimal(10,2) DEFAULT NULL,
  `qty` decimal(13,3) DEFAULT NULL,
  `rop` decimal(13,3) DEFAULT NULL,
  `materialstatus_id` int(11) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `unit_id` int(11) NOT NULL,
  `materialtype_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_material_materialstatus1_idx` (`materialstatus_id`),
  KEY `fk_material_brand1_idx` (`brand_id`),
  KEY `fk_material_unit1_idx` (`unit_id`),
  KEY `fk_material_materialtype1_idx` (`materialtype_id`),
  KEY `fk_material_user1_idx` (`creator_id`),
  CONSTRAINT `fk_material_brand1` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`),
  CONSTRAINT `fk_material_materialstatus1` FOREIGN KEY (`materialstatus_id`) REFERENCES `materialstatus` (`id`),
  CONSTRAINT `fk_material_materialtype1` FOREIGN KEY (`materialtype_id`) REFERENCES `materialtype` (`id`),
  CONSTRAINT `fk_material_unit1` FOREIGN KEY (`unit_id`) REFERENCES `unit` (`id`),
  CONSTRAINT `fk_material_user1` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES (1,'MA240001','2024-02-24 08:35:15','rgvrtg',NULL,3.00,30.000,3.000,1,3,2,2,1),(2,'MA240002','2024-02-24 12:32:45','gege',NULL,100.00,100.000,10.000,1,5,1,4,1);
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materialdisposal`
--

DROP TABLE IF EXISTS `materialdisposal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `materialdisposal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` char(10) NOT NULL,
  `tocreation` datetime DEFAULT NULL,
  `reason` text,
  `date` date DEFAULT NULL,
  `creator_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_materialdisposal_user1_idx` (`creator_id`),
  CONSTRAINT `fk_materialdisposal_user1` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materialdisposal`
--

LOCK TABLES `materialdisposal` WRITE;
/*!40000 ALTER TABLE `materialdisposal` DISABLE KEYS */;
/*!40000 ALTER TABLE `materialdisposal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materialdisposalmaterial`
--

DROP TABLE IF EXISTS `materialdisposalmaterial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `materialdisposalmaterial` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `qty` decimal(13,3) DEFAULT NULL,
  `materialdisposal_id` int(11) NOT NULL,
  `material_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_materialdisposalmaterial_materialdisposal1_idx` (`materialdisposal_id`),
  KEY `fk_materialdisposalmaterial_material1_idx` (`material_id`),
  CONSTRAINT `fk_materialdisposalmaterial_material1` FOREIGN KEY (`material_id`) REFERENCES `material` (`id`),
  CONSTRAINT `fk_materialdisposalmaterial_materialdisposal1` FOREIGN KEY (`materialdisposal_id`) REFERENCES `materialdisposal` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materialdisposalmaterial`
--

LOCK TABLES `materialdisposalmaterial` WRITE;
/*!40000 ALTER TABLE `materialdisposalmaterial` DISABLE KEYS */;
/*!40000 ALTER TABLE `materialdisposalmaterial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materialstatus`
--

DROP TABLE IF EXISTS `materialstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `materialstatus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materialstatus`
--

LOCK TABLES `materialstatus` WRITE;
/*!40000 ALTER TABLE `materialstatus` DISABLE KEYS */;
INSERT INTO `materialstatus` VALUES (1,'Active'),(2,'Deactivated');
/*!40000 ALTER TABLE `materialstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materialtype`
--

DROP TABLE IF EXISTS `materialtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `materialtype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materialtype`
--

LOCK TABLES `materialtype` WRITE;
/*!40000 ALTER TABLE `materialtype` DISABLE KEYS */;
INSERT INTO `materialtype` VALUES (1,'Flour'),(2,'Essance'),(3,'Sugar'),(4,'Gelatin'),(5,'Other');
/*!40000 ALTER TABLE `materialtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nametitle`
--

DROP TABLE IF EXISTS `nametitle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `nametitle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nametitle`
--

LOCK TABLES `nametitle` WRITE;
/*!40000 ALTER TABLE `nametitle` DISABLE KEYS */;
INSERT INTO `nametitle` VALUES (1,'Mr.'),(2,'Miss'),(3,'Mrs.'),(4,'Rev.'),(5,'Dr.');
/*!40000 ALTER TABLE `nametitle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `notification` (
  `id` char(36) NOT NULL,
  `dosend` datetime NOT NULL,
  `dodelivered` datetime DEFAULT NULL,
  `doread` datetime DEFAULT NULL,
  `message` text NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `f_notification_user_id_fr_user_id` (`user_id`),
  CONSTRAINT `f_notification_user_id_fr_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES ('9e198da6-3eed-47ca-9ca7-61b681776083','2024-01-15 10:54:17','2024-01-15 10:54:18',NULL,'Successfully setup administrator\'s password',1);
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentstatus`
--

DROP TABLE IF EXISTS `paymentstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `paymentstatus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentstatus`
--

LOCK TABLES `paymentstatus` WRITE;
/*!40000 ALTER TABLE `paymentstatus` DISABLE KEYS */;
INSERT INTO `paymentstatus` VALUES (1,'Done'),(2,'Cancled'),(3,'Cheque Pending'),(4,'Cheque Rejected'),(5,'Cheque Approved');
/*!40000 ALTER TABLE `paymentstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentstatus_copy1`
--

DROP TABLE IF EXISTS `paymentstatus_copy1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `paymentstatus_copy1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentstatus_copy1`
--

LOCK TABLES `paymentstatus_copy1` WRITE;
/*!40000 ALTER TABLE `paymentstatus_copy1` DISABLE KEYS */;
/*!40000 ALTER TABLE `paymentstatus_copy1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymenttype`
--

DROP TABLE IF EXISTS `paymenttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `paymenttype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymenttype`
--

LOCK TABLES `paymenttype` WRITE;
/*!40000 ALTER TABLE `paymenttype` DISABLE KEYS */;
INSERT INTO `paymenttype` VALUES (1,'Cash'),(2,'Cheque');
/*!40000 ALTER TABLE `paymenttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymenttype_copy1`
--

DROP TABLE IF EXISTS `paymenttype_copy1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `paymenttype_copy1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymenttype_copy1`
--

LOCK TABLES `paymenttype_copy1` WRITE;
/*!40000 ALTER TABLE `paymenttype_copy1` DISABLE KEYS */;
/*!40000 ALTER TABLE `paymenttype_copy1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `porder`
--

DROP TABLE IF EXISTS `porder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `porder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` char(10) NOT NULL,
  `tocreation` datetime DEFAULT NULL,
  `doordered` date DEFAULT NULL,
  `doreceived` date DEFAULT NULL,
  `description` text,
  `dorequired` date DEFAULT NULL,
  `porderstatus_id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_porder_porderstatus1_idx` (`porderstatus_id`),
  KEY `fk_porder_supplier1_idx` (`supplier_id`),
  KEY `fk_porder_user1_idx` (`creator_id`),
  CONSTRAINT `fk_porder_porderstatus1` FOREIGN KEY (`porderstatus_id`) REFERENCES `porderstatus` (`id`),
  CONSTRAINT `fk_porder_supplier1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`),
  CONSTRAINT `fk_porder_user1` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `porder`
--

LOCK TABLES `porder` WRITE;
/*!40000 ALTER TABLE `porder` DISABLE KEYS */;
INSERT INTO `porder` VALUES (1,'PO24000001','2024-03-24 09:34:34','2024-03-15',NULL,NULL,'2024-03-28',1,2,1);
/*!40000 ALTER TABLE `porder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pordermaterial`
--

DROP TABLE IF EXISTS `pordermaterial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `pordermaterial` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `qty` decimal(13,3) DEFAULT NULL,
  `porder_id` int(11) NOT NULL,
  `material_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pordermaterial_porder1_idx` (`porder_id`),
  KEY `fk_pordermaterial_material1_idx` (`material_id`),
  CONSTRAINT `fk_pordermaterial_material1` FOREIGN KEY (`material_id`) REFERENCES `material` (`id`),
  CONSTRAINT `fk_pordermaterial_porder1` FOREIGN KEY (`porder_id`) REFERENCES `porder` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pordermaterial`
--

LOCK TABLES `pordermaterial` WRITE;
/*!40000 ALTER TABLE `pordermaterial` DISABLE KEYS */;
INSERT INTO `pordermaterial` VALUES (1,100.000,1,2);
/*!40000 ALTER TABLE `pordermaterial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `porderstatus`
--

DROP TABLE IF EXISTS `porderstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `porderstatus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `porderstatus`
--

LOCK TABLES `porderstatus` WRITE;
/*!40000 ALTER TABLE `porderstatus` DISABLE KEYS */;
INSERT INTO `porderstatus` VALUES (1,'Pending'),(2,'Recived'),(3,'Cancled');
/*!40000 ALTER TABLE `porderstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `code` char(10) NOT NULL,
  `tocreation` datetime DEFAULT NULL,
  `description` text,
  `supplier_id` int(11) DEFAULT NULL,
  `creator_id` int(11) NOT NULL,
  `productstatus_id` int(11) DEFAULT NULL,
  `producttype_id` int(11) DEFAULT NULL,
  `productcategory_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_porder_supplier1_idx` (`supplier_id`),
  KEY `fk_porder_user1_idx` (`creator_id`),
  KEY `fk_porder_copy1_producttype1_idx` (`producttype_id`),
  KEY `fk_porder_copy1_productcategory1_idx` (`productcategory_id`),
  KEY `fk_porder_copy1_productstatus1_idx` (`productstatus_id`),
  CONSTRAINT `fk_porder_copy1_productcategory1` FOREIGN KEY (`productcategory_id`) REFERENCES `productcategory` (`id`),
  CONSTRAINT `fk_porder_copy1_productstatus1` FOREIGN KEY (`productstatus_id`) REFERENCES `productstatus` (`id`),
  CONSTRAINT `fk_porder_copy1_producttype1` FOREIGN KEY (`producttype_id`) REFERENCES `producttype` (`id`),
  CONSTRAINT `fk_porder_supplier10` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`),
  CONSTRAINT `fk_porder_user10` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,NULL,'PO24000001','2024-03-31 12:19:21',NULL,NULL,1,1,NULL,NULL),(2,NULL,'PO24000002','2024-03-31 12:27:47',NULL,NULL,1,1,NULL,NULL),(3,NULL,'PO24000003','2024-05-11 09:33:29',NULL,NULL,1,1,NULL,NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productcategory`
--

DROP TABLE IF EXISTS `productcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `productcategory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productcategory`
--

LOCK TABLES `productcategory` WRITE;
/*!40000 ALTER TABLE `productcategory` DISABLE KEYS */;
INSERT INTO `productcategory` VALUES (1,'cleaning'),(2,'hygiene'),(3,'chemical repellents');
/*!40000 ALTER TABLE `productcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productmaterial`
--

DROP TABLE IF EXISTS `productmaterial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `productmaterial` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `qty` decimal(13,3) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  `material_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_has_material_material1_idx` (`material_id`),
  KEY `fk_product_has_material_product1_idx` (`product_id`),
  CONSTRAINT `fk_product_has_material_material1` FOREIGN KEY (`material_id`) REFERENCES `material` (`id`),
  CONSTRAINT `fk_product_has_material_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productmaterial`
--

LOCK TABLES `productmaterial` WRITE;
/*!40000 ALTER TABLE `productmaterial` DISABLE KEYS */;
INSERT INTO `productmaterial` VALUES (1,90.000,1,1),(2,45.000,2,1),(3,990.000,3,1);
/*!40000 ALTER TABLE `productmaterial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productstatus`
--

DROP TABLE IF EXISTS `productstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `productstatus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productstatus`
--

LOCK TABLES `productstatus` WRITE;
/*!40000 ALTER TABLE `productstatus` DISABLE KEYS */;
INSERT INTO `productstatus` VALUES (1,'Producing'),(2,'Discontinued');
/*!40000 ALTER TABLE `productstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producttype`
--

DROP TABLE IF EXISTS `producttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `producttype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producttype`
--

LOCK TABLES `producttype` WRITE;
/*!40000 ALTER TABLE `producttype` DISABLE KEYS */;
INSERT INTO `producttype` VALUES (1,'Soap dispenser'),(2,'Sanitizer'),(3,'Detergent'),(4,'Disinfectant'),(5,'Cleaning cart'),(6,'Cleaning brushes'),(7,'Insect repelent'),(8,'Soap');
/*!40000 ALTER TABLE `producttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `purchase` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(45) NOT NULL,
  `tocreation` datetime DEFAULT NULL,
  `description` text,
  `date` date DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `porder_id` int(11) DEFAULT NULL,
  `creator_id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_purchase_porder1_idx` (`porder_id`),
  KEY `fk_purchase_user1_idx` (`creator_id`),
  KEY `fk_purchase_supplier1_idx` (`supplier_id`),
  CONSTRAINT `fk_purchase_porder1` FOREIGN KEY (`porder_id`) REFERENCES `porder` (`id`),
  CONSTRAINT `fk_purchase_supplier1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`),
  CONSTRAINT `fk_purchase_user1` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase`
--

LOCK TABLES `purchase` WRITE;
/*!40000 ALTER TABLE `purchase` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchasematerial`
--

DROP TABLE IF EXISTS `purchasematerial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `purchasematerial` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `qty` decimal(13,3) DEFAULT NULL,
  `unitprice` decimal(10,2) DEFAULT NULL,
  `purchase_id` int(11) NOT NULL,
  `material_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_purchase_purchase1_idx` (`purchase_id`),
  KEY `fk_purchase_material1_idx` (`material_id`),
  CONSTRAINT `fk_purchase_material1` FOREIGN KEY (`material_id`) REFERENCES `material` (`id`),
  CONSTRAINT `fk_purchase_purchase1` FOREIGN KEY (`purchase_id`) REFERENCES `purchase` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchasematerial`
--

LOCK TABLES `purchasematerial` WRITE;
/*!40000 ALTER TABLE `purchasematerial` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchasematerial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `tocreation` datetime DEFAULT NULL,
  `creator_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_role_name` (`name`),
  KEY `f_role_creator_id_fr_user_id` (`creator_id`),
  CONSTRAINT `f_role_creator_id_fr_user_id` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roleusecase`
--

DROP TABLE IF EXISTS `roleusecase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `roleusecase` (
  `role_id` int(11) NOT NULL,
  `usecase_id` int(11) NOT NULL,
  PRIMARY KEY (`role_id`,`usecase_id`),
  KEY `f_roleusecase_usecase_id_fr_usecase_id` (`usecase_id`),
  CONSTRAINT `f_roleusecase_role_id_fr_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `f_roleusecase_usecase_id_fr_usecase_id` FOREIGN KEY (`usecase_id`) REFERENCES `usecase` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roleusecase`
--

LOCK TABLES `roleusecase` WRITE;
/*!40000 ALTER TABLE `roleusecase` DISABLE KEYS */;
/*!40000 ALTER TABLE `roleusecase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicelog`
--

DROP TABLE IF EXISTS `servicelog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `servicelog` (
  `id` char(36) NOT NULL,
  `method` varchar(10) DEFAULT NULL,
  `responsecode` int(11) DEFAULT NULL,
  `ip` varchar(100) DEFAULT NULL,
  `torequest` datetime DEFAULT NULL,
  `url` text,
  `handler` varchar(255) DEFAULT NULL,
  `token_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `f_servicelog_token_id_fr_token_id` (`token_id`),
  CONSTRAINT `f_servicelog_token_id_fr_token_id` FOREIGN KEY (`token_id`) REFERENCES `token` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicelog`
--

LOCK TABLES `servicelog` WRITE;
/*!40000 ALTER TABLE `servicelog` DISABLE KEYS */;
/*!40000 ALTER TABLE `servicelog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `supplier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` char(10) NOT NULL,
  `tocreation` datetime DEFAULT NULL,
  `description` text,
  `name` varchar(255) DEFAULT NULL,
  `contact1` varchar(20) DEFAULT NULL,
  `contact2` varchar(20) DEFAULT NULL,
  `address` text,
  `email` varchar(255) DEFAULT NULL,
  `fax` varchar(20) DEFAULT NULL,
  `suppliertype_id` int(11) NOT NULL,
  `supplierstatus_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `fk_supplier_suppliertype1_idx` (`suppliertype_id`),
  KEY `fk_supplier_supplierstatus1_idx` (`supplierstatus_id`),
  KEY `fk_supplier_user1_idx` (`creator_id`),
  CONSTRAINT `fk_supplier_supplierstatus1` FOREIGN KEY (`supplierstatus_id`) REFERENCES `supplierstatus` (`id`),
  CONSTRAINT `fk_supplier_suppliertype1` FOREIGN KEY (`suppliertype_id`) REFERENCES `suppliertype` (`id`),
  CONSTRAINT `fk_supplier_user1` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES (1,'SU240001','2024-02-24 12:28:54',NULL,'HEHE','0987654321',NULL,'rgrtgrttrhtrgh','user@gmail.com',NULL,2,1,1),(2,'SU240002','2024-02-24 12:33:18',NULL,'yryry','0123456789',NULL,'67j67j7j','user2@gmail.com',NULL,2,1,1);
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliermaterial`
--

DROP TABLE IF EXISTS `suppliermaterial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `suppliermaterial` (
  `supplier_id` int(11) NOT NULL,
  `material_id` int(11) NOT NULL,
  PRIMARY KEY (`supplier_id`,`material_id`),
  KEY `fk_supplier_has_material_material1_idx` (`material_id`),
  KEY `fk_supplier_has_material_supplier1_idx` (`supplier_id`),
  CONSTRAINT `fk_supplier_has_material_material1` FOREIGN KEY (`material_id`) REFERENCES `material` (`id`),
  CONSTRAINT `fk_supplier_has_material_supplier1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliermaterial`
--

LOCK TABLES `suppliermaterial` WRITE;
/*!40000 ALTER TABLE `suppliermaterial` DISABLE KEYS */;
INSERT INTO `suppliermaterial` VALUES (1,1),(2,2);
/*!40000 ALTER TABLE `suppliermaterial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplierpayment`
--

DROP TABLE IF EXISTS `supplierpayment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `supplierpayment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` char(10) NOT NULL,
  `tocreation` datetime DEFAULT NULL,
  `date` date DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `chequeno` varchar(60) DEFAULT NULL,
  `chequebank` varchar(255) DEFAULT NULL,
  `chequebranch` varchar(255) DEFAULT NULL,
  `chequedate` date DEFAULT NULL,
  `paymenttype_id` int(11) NOT NULL,
  `paymentstatus_id` int(11) NOT NULL,
  `purchase_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_supplierpayment_paymenttype1_idx` (`paymenttype_id`),
  KEY `fk_supplierpayment_paymentstatus1_idx` (`paymentstatus_id`),
  KEY `fk_supplierpayment_purchase1_idx` (`purchase_id`),
  KEY `fk_supplierpayment_user1_idx` (`creator_id`),
  CONSTRAINT `fk_supplierpayment_paymentstatus1` FOREIGN KEY (`paymentstatus_id`) REFERENCES `paymentstatus` (`id`),
  CONSTRAINT `fk_supplierpayment_paymenttype1` FOREIGN KEY (`paymenttype_id`) REFERENCES `paymenttype` (`id`),
  CONSTRAINT `fk_supplierpayment_purchase1` FOREIGN KEY (`purchase_id`) REFERENCES `purchase` (`id`),
  CONSTRAINT `fk_supplierpayment_user1` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplierpayment`
--

LOCK TABLES `supplierpayment` WRITE;
/*!40000 ALTER TABLE `supplierpayment` DISABLE KEYS */;
/*!40000 ALTER TABLE `supplierpayment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplierstatus`
--

DROP TABLE IF EXISTS `supplierstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `supplierstatus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplierstatus`
--

LOCK TABLES `supplierstatus` WRITE;
/*!40000 ALTER TABLE `supplierstatus` DISABLE KEYS */;
INSERT INTO `supplierstatus` VALUES (1,'Active'),(2,'Deactive'),(3,'Blacklisted');
/*!40000 ALTER TABLE `supplierstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliertype`
--

DROP TABLE IF EXISTS `suppliertype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `suppliertype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliertype`
--

LOCK TABLES `suppliertype` WRITE;
/*!40000 ALTER TABLE `suppliertype` DISABLE KEYS */;
INSERT INTO `suppliertype` VALUES (1,'Company'),(2,'Individual');
/*!40000 ALTER TABLE `suppliertype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `systemmodule`
--

DROP TABLE IF EXISTS `systemmodule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `systemmodule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `systemmodule`
--

LOCK TABLES `systemmodule` WRITE;
/*!40000 ALTER TABLE `systemmodule` DISABLE KEYS */;
INSERT INTO `systemmodule` VALUES (1,'User'),(2,'Role'),(3,'Employee'),(4,'Client'),(5,'Route'),(6,'Vehicle'),(7,'Supplier'),(8,'Materialdisposal'),(9,'Porder'),(10,'Purchase'),(11,'Supplierpayment'),(12,'Material'),(13,'Product');
/*!40000 ALTER TABLE `systemmodule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timestamps`
--

DROP TABLE IF EXISTS `timestamps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `timestamps` (
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timestamps`
--

LOCK TABLES `timestamps` WRITE;
/*!40000 ALTER TABLE `timestamps` DISABLE KEYS */;
/*!40000 ALTER TABLE `timestamps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `token` (
  `id` char(36) NOT NULL,
  `tocreation` datetime DEFAULT NULL,
  `toexpiration` datetime DEFAULT NULL,
  `ip` varchar(100) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `f_token_user_id_fr_user_id` (`user_id`),
  CONSTRAINT `f_token_user_id_fr_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES ('9869deeb-6e3c-4337-bb2d-a9e806653f9a','2024-01-15 14:02:35',NULL,NULL,'Active',1),('b774067a-8554-4740-bb44-836ce703aca3','2024-01-15 10:54:18','2024-01-15 16:54:18',NULL,'Active',1),('d9ff215a-930a-4bf4-8c1a-76687bee3324','2024-01-15 12:12:02',NULL,NULL,'Active',1);
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unit`
--

DROP TABLE IF EXISTS `unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `unit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unit`
--

LOCK TABLES `unit` WRITE;
/*!40000 ALTER TABLE `unit` DISABLE KEYS */;
INSERT INTO `unit` VALUES (1,'Packets'),(2,'Bottles'),(3,'Kg');
/*!40000 ALTER TABLE `unit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usecase`
--

DROP TABLE IF EXISTS `usecase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `usecase` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task` varchar(255) NOT NULL,
  `systemmodule_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `f_usecase_systemmodule_id_fr_systemmodule_id` (`systemmodule_id`),
  CONSTRAINT `f_usecase_systemmodule_id_fr_systemmodule_id` FOREIGN KEY (`systemmodule_id`) REFERENCES `systemmodule` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usecase`
--

LOCK TABLES `usecase` WRITE;
/*!40000 ALTER TABLE `usecase` DISABLE KEYS */;
INSERT INTO `usecase` VALUES (1,'Show all users',1),(2,'Show user details',1),(3,'Add user',1),(4,'Update user',1),(5,'Delete user',1),(6,'Reset user passwords',1),(7,'Show all roles',2),(8,'Show role details',2),(9,'Add role',2),(10,'Update role',2),(11,'Delete role',2),(12,'Show all employees',3),(13,'Show employee details',3),(14,'Add employee',3),(15,'Update employee',3),(16,'Delete employee',3),(17,'Show all clients',4),(18,'Show client details',4),(19,'Add client',4),(20,'Update client',4),(21,'Delete client',4),(22,'Show all routes',5),(23,'Show route details',5),(24,'Add route',5),(25,'Update route',5),(26,'Delete route',5),(27,'Show all vehicles',6),(28,'Show vehicle details',6),(29,'Add vehicle',6),(30,'Update vehicle',6),(31,'Delete vehicle',6),(32,'Show all suppliers',7),(33,'Show supplier details',7),(34,'Add supplier',7),(35,'Update supplier',7),(36,'Delete supplier',7),(37,'Show all materialdisposals',8),(38,'Show materialdisposal details',8),(39,'Add materialdisposal',8),(40,'Update materialdisposal',8),(41,'Delete materialdisposal',8),(42,'Show all porders',9),(43,'Show porder details',9),(44,'Add porder',9),(45,'Update porder',9),(46,'Delete porder',9),(47,'Show all purchases',10),(48,'Show purchase details',10),(49,'Add purchase',10),(50,'Update purchase',10),(51,'Delete purchase',10),(52,'Show all supplierpayments',11),(53,'Show supplierpayment details',11),(54,'Add supplierpayment',11),(55,'Update supplierpayment',11),(56,'Delete supplierpayment',11),(57,'Show all materials',12),(58,'Show material details',12),(59,'Add material',12),(60,'Update material',12),(61,'Delete material',12),(62,'Show all products',13),(63,'Show product details',13),(64,'Add product',13),(65,'Update product',13),(66,'Delete product',13);
/*!40000 ALTER TABLE `usecase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(20) NOT NULL,
  `tocreation` datetime DEFAULT NULL,
  `tolocked` datetime DEFAULT NULL,
  `failedattempts` int(11) DEFAULT '0',
  `creator_id` int(11) DEFAULT NULL,
  `photo` char(36) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_username` (`username`),
  UNIQUE KEY `unique_user_employee_id` (`employee_id`),
  KEY `f_user_creator_id_fr_user_id` (`creator_id`),
  CONSTRAINT `f_user_creator_id_fr_user_id` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `f_user_employee_id_fr_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Administrator','$2a$10$Dt2V/jrC3TiqiCzypZBiOOUwUOheFVa5bXIlqU5BntYU/wIy/Jjia','Active','2024-01-15 10:54:16',NULL,0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userrole`
--

DROP TABLE IF EXISTS `userrole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `userrole` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `f_userrole_role_id_fr_role_id` (`role_id`),
  CONSTRAINT `f_userrole_role_id_fr_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `f_userrole_user_id_fr_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userrole`
--

LOCK TABLES `userrole` WRITE;
/*!40000 ALTER TABLE `userrole` DISABLE KEYS */;
/*!40000 ALTER TABLE `userrole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'ceyalacdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-18  1:06:54
