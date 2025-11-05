-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tiendacazador_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Yu-Gi-Oh'),(2,'One Piece'),(3,'Hunter × Hunter'),(4,'Marvel'),(5,'Kimetsu no Yaiba');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `fecha_creacion` varchar(255) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `precio` bigint(20) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `categoria_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_producto_categoria_idx` (`categoria_id`),
  CONSTRAINT `fk_producto_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Sin caja, 2025, 19 cm aprox.',1,'2025-10-30','DragonOjosAzules.png','Blue-Eyes Ultimate Dragon - Equal Arts - Konami Prize Collection (Konami Amusement)',28000,10,1),(2,'Sin caja, 2025, 20 cm aprox.',1,'2025-10-30','MagoNegro.png','Black Magician - Equal Arts - Konami Prize Collection (Konami Amusement)',28000,10,1),(3,'Sin caja, 2025, 19 cm aprox.',1,'2025-10-30','ObelisknoKyoshinhei.png','Obelisk no Kyoshinhei - Konami Prize Collection - Monsters LEGION (Konami Amusement)',30000,15,1),(4,'Nueva, 2023, 14.5 cm aprox.',1,'2025-10-30','5Hiriluk_Chopper.png','Dr. Hiriluk - Tony Tony Chopper - Ichiban Kuji One Piece Emotional Stories 2 (B Prize) - Revible Moment (Bandai Spirits)',48000,6,2),(5,'Caja Abierta, 2024, 24 cm aprox.',1,'2025-10-30','9Sabo.png','Sabo - Ichiban Kuji - Ichiban Kuji One Piece Kakumei no Honoo (B Prize) - Masterlise (Bandai Spirits)',55000,8,2),(6,'Nueva, 2024, 13 cm aprox.',1,'2025-10-30','Luffy.png','D. Luffy - King of Artist - Special Ver. Boundman (Bandai Spirits)',35000,9,2),(7,'Nueva, 2025, 10 cm aprox.',1,'2025-10-30','1MachiKomacine.png','Machi Komacine - Noodle Stopper Figure (FuRyu)',35000,10,3),(8,'Nueva, 2025, 15 cm aprox.',1,'2025-10-30','2Shalnark.png','Shalnark - Noodle Stopper Figure (FuRyu)',35000,11,3),(9,'Nueva, 2024, 22 cm aprox.',1,'2025-10-30','illumi.png','Illumi Zoldyck - Vibration Stars (Bandai Spirits)',30000,12,3),(10,'Nueva, 2024, 28 cm aprox.',1,'2025-10-30','CapitanAmerica.png','Captain America - Luminasta (SEGA)',34000,12,4),(11,'Nueva, 2024, 20 cm aprox.',1,'2025-10-30','Hulk.png','Hulk - Luminasta (SEGA)',34000,12,4),(12,'Nueva, 2025, 16 cm aprox.',1,'2025-10-30','Magneto.png','Magneto - ACT/CUT Premium Figure (SEGA)',34000,12,4),(13,'Nueva, 2025, 24 cm aprox.',1,'2025-10-30','Zenitsu.png','Agatsuma Zenitsu - Grandista - Another Ver., Metallic Color ver. (Bandai Namco Amusement, Bandai Spirits)',35000,15,5),(14,'Nueva, 2025, 15 cm aprox.',1,'2025-10-30','Giyuu.png','Tomioka Giyuu - Grandista (Bandai Spirits)',33000,15,5),(15,'Sin caja, 2025, 24 cm aprox.',1,'2025-10-30','Rengoku.png','Rengoku Kyoujurou - Grandista (Bandai Spirits)',35000,17,5);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `apellido` varchar(255) DEFAULT NULL,
  `comuna` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `fecha_creacion` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `rol` varchar(255) DEFAULT NULL,
  `rut` varchar(255) DEFAULT NULL,
  `apellidos` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_usuario_email` (`email`),
  UNIQUE KEY `UK5171l57faosmj8myawaucatdw` (`email`),
  UNIQUE KEY `UKjx61a01wwidax9iafoa3xj22i` (`rut`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (7,NULL,'Maipú','Lanco 3707','jo.zenteno@duocuc.cl',1,'2025-11-03','Joaquin','$2a$10$Bvol/TO67W8EC6esBdJmy.aaV.i7ki1Jd4N9iZNuvsjqxRMOCYnb2','Región Metropolitana de Santiago','ADMIN','200529456','Zenteno Donoso');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-03 23:29:05
