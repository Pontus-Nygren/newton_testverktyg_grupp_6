-- MySQL dump 10.13  Distrib 5.7.12, for osx10.9 (x86_64)
--
-- Host: 127.0.0.1    Database: testverktyg
-- ------------------------------------------------------
-- Server version	5.7.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `freetext`
--

DROP TABLE IF EXISTS `freetext`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `freetext` (
  `freetext_id` int(11) NOT NULL AUTO_INCREMENT,
  `answer` longtext COMMENT 'Open question response',
  `users_user_id` int(11) NOT NULL,
  `questions_question_id` int(11) NOT NULL,
  PRIMARY KEY (`freetext_id`),
  KEY `fk_freetext_users1_idx` (`users_user_id`),
  KEY `fk_freetext_questions1_idx` (`questions_question_id`),
  CONSTRAINT `fk_freetext_questions1` FOREIGN KEY (`questions_question_id`) REFERENCES `questions` (`question_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_freetext_users1` FOREIGN KEY (`users_user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `freetext`
--

LOCK TABLES `freetext` WRITE;
/*!40000 ALTER TABLE `freetext` DISABLE KEYS */;
/*!40000 ALTER TABLE `freetext` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `freetext_grading`
--

DROP TABLE IF EXISTS `freetext_grading`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `freetext_grading` (
  `freetext_grading_id` int(11) NOT NULL AUTO_INCREMENT,
  `points` decimal(3,0) DEFAULT NULL,
  `users_user_id` int(11) NOT NULL,
  `freetext_freetext_id` int(11) NOT NULL,
  PRIMARY KEY (`freetext_grading_id`),
  KEY `fk_freetext_grading_users1_idx` (`users_user_id`),
  KEY `fk_freetext_grading_freetext1_idx` (`freetext_freetext_id`),
  CONSTRAINT `fk_freetext_grading_freetext1` FOREIGN KEY (`freetext_freetext_id`) REFERENCES `freetext` (`freetext_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_freetext_grading_users1` FOREIGN KEY (`users_user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `freetext_grading`
--

LOCK TABLES `freetext_grading` WRITE;
/*!40000 ALTER TABLE `freetext_grading` DISABLE KEYS */;
/*!40000 ALTER TABLE `freetext_grading` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `options`
--

DROP TABLE IF EXISTS `options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `options` (
  `option_id` int(11) NOT NULL AUTO_INCREMENT,
  `text` longtext NOT NULL,
  `questions_question_id` int(11) NOT NULL,
  `points` int(11) NOT NULL,
  PRIMARY KEY (`option_id`),
  KEY `fk_options_questions1_idx` (`questions_question_id`),
  CONSTRAINT `fk_options_questions1` FOREIGN KEY (`questions_question_id`) REFERENCES `questions` (`question_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `options`
--

LOCK TABLES `options` WRITE;
/*!40000 ALTER TABLE `options` DISABLE KEYS */;
INSERT INTO `options` VALUES (1,'Blue',1,0),(2,'Red',1,0),(3,'Yellow',1,1);
/*!40000 ALTER TABLE `options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questions` (
  `question_id` int(11) NOT NULL AUTO_INCREMENT,
  `tests_test_id` int(11) NOT NULL,
  `text` longtext NOT NULL,
  `open` tinyint(1) NOT NULL,
  PRIMARY KEY (`question_id`),
  KEY `fk_questions_tests_idx` (`tests_test_id`),
  CONSTRAINT `fk_questions_tests` FOREIGN KEY (`tests_test_id`) REFERENCES `tests` (`test_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,1,'What color is the sun?',0);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `responses`
--

DROP TABLE IF EXISTS `responses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `responses` (
  `users_user_id` int(11) NOT NULL,
  `options_option_id` int(11) NOT NULL,
  PRIMARY KEY (`users_user_id`,`options_option_id`),
  KEY `fk_responses_users1_idx` (`users_user_id`),
  KEY `fk_responses_options1_idx` (`options_option_id`),
  CONSTRAINT `fk_responses_options1` FOREIGN KEY (`options_option_id`) REFERENCES `options` (`option_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_responses_users1` FOREIGN KEY (`users_user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responses`
--

LOCK TABLES `responses` WRITE;
/*!40000 ALTER TABLE `responses` DISABLE KEYS */;
INSERT INTO `responses` VALUES (1,3);
/*!40000 ALTER TABLE `responses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tests`
--

DROP TABLE IF EXISTS `tests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tests` (
  `test_id` int(11) NOT NULL AUTO_INCREMENT,
  `startingTime` datetime NOT NULL,
  `endingTime` datetime NOT NULL,
  `allowedTime` int(11) NOT NULL,
  PRIMARY KEY (`test_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tests`
--

LOCK TABLES `tests` WRITE;
/*!40000 ALTER TABLE `tests` DISABLE KEYS */;
INSERT INTO `tests` VALUES (1,'2017-02-17 13:00:00','2017-02-17 17:00:00',3);
/*!40000 ALTER TABLE `tests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `class` varchar(45) NOT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'joelonilsson','hejhej','Joel','Nilsson','joel.o.nilsson@gmail.com','SYSJM2','student'),(2,'pelle','tjatja','Pelle','Pellesson','pelle@mail.com','SYSJM2','student');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_takes_tests`
--

DROP TABLE IF EXISTS `users_takes_tests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_takes_tests` (
  `users_user_id` int(11) NOT NULL,
  `tests_test_id` int(11) NOT NULL,
  PRIMARY KEY (`users_user_id`,`tests_test_id`),
  KEY `fk_users_has_tests_tests1_idx` (`tests_test_id`),
  KEY `fk_users_has_tests_users1_idx` (`users_user_id`),
  CONSTRAINT `fk_users_has_tests_tests1` FOREIGN KEY (`tests_test_id`) REFERENCES `tests` (`test_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_tests_users1` FOREIGN KEY (`users_user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_takes_tests`
--

LOCK TABLES `users_takes_tests` WRITE;
/*!40000 ALTER TABLE `users_takes_tests` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_takes_tests` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-17 11:42:31
