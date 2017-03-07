# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Värd: 127.0.0.1 (MySQL 5.7.16)
# Databas: testverktyg
# Genereringstid: 2017-03-07 13:14:53 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Tabelldump options
# ------------------------------------------------------------

DROP TABLE IF EXISTS `options`;

CREATE TABLE `options` (
  `option_id` int(11) NOT NULL AUTO_INCREMENT,
  `option_text` longtext,
  `questions_question_id` int(11) DEFAULT NULL,
  `points` int(11) DEFAULT NULL,
  PRIMARY KEY (`option_id`),
  KEY `fk_options_questions1_idx` (`questions_question_id`),
  CONSTRAINT `fk_options_questions1` FOREIGN KEY (`questions_question_id`) REFERENCES `questions` (`question_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `options` WRITE;
/*!40000 ALTER TABLE `options` DISABLE KEYS */;

INSERT INTO `options` (`option_id`, `option_text`, `questions_question_id`, `points`)
VALUES
	(34,'Jiiison',10,0),
	(35,'Djejsån',10,1),
	(36,'Ja',11,0),
	(37,'Nej',11,1),
	(38,'Om man kisar väldigt mycket med ögonen',11,0),
	(45,'Faktorer som är nödvändiga för framgång',14,1),
	(46,'Faktorer som främjar motstånd för utveckling',14,0),
	(51,'Integer',18,0),
	(52,'Inger',18,1),
	(53,'Double',18,0),
	(54,'Float',18,0),
	(55,'Integrated development enviroment',19,1),
	(56,'Intelligent development enviroment',19,0),
	(57,'Interactive development enviroment',19,0),
	(58,'Integrated durable engine',19,0),
	(59,'8',20,0),
	(60,'32',20,1),
	(61,'256',20,0),
	(62,'1024',20,0),
	(63,'false',21,1),
	(64,'null',21,0),
	(65,'0',21,0),
	(66,'true',21,0),
	(67,'235 323',22,0),
	(68,'32 767',22,1),
	(69,'24 321',22,0),
	(70,'92 928',22,0),
	(71,'Realtime State Transfer',23,0),
	(72,'Representional Storage Transfer',23,0),
	(73,'Representional State Transfer',23,1),
	(74,'Representional Storage Tool',23,0),
	(75,'Lägga till videofiler',24,0),
	(76,'Lägga till bildfiler',24,0),
	(77,'Anpassning till olika plattformer',24,1),
	(78,'Importera en videospelare',24,0),
	(79,'Digital Object Management',25,0),
	(80,'Document Object Model',25,1),
	(81,'Digital Object Model',25,0),
	(82,'Data Object Management',25,0),
	(83,'String',26,0),
	(84,'Integer',26,0),
	(85,'Double',26,1),
	(86,'Var',26,0),
	(87,'Backend-utvecklare',27,0),
	(88,'Frontend-utvecklare',27,1),
	(89,'Systemarkitekt',27,0),
	(90,'Databasdesigner',27,0),
	(91,'Semi Query Language',28,0),
	(92,'Structured Query Language',28,1),
	(93,'Some Query Language',28,0),
	(94,'Some Question Thing',28,0),
	(95,'En varchar',29,0),
	(96,'Unik',29,0),
	(97,'Null',29,1),
	(98,'Väljer users tabellen',30,0),
	(99,'Visar all data i users tabellen',30,1),
	(100,'Kollar efter en * i users',30,0),
	(101,'Väljer en specifik rad från users tabellen',30,0),
	(102,'Två',31,0),
	(103,'Fem',31,0),
	(104,'Sju',31,1),
	(105,'Tre',31,0),
	(106,'MySQL',32,0),
	(107,'Microsoft Access',32,0),
	(108,'MongoDB',32,1),
	(109,'Apple Management',32,0),
	(112,'hfhj',34,1),
	(113,'jfsdjhf',34,0);

/*!40000 ALTER TABLE `options` ENABLE KEYS */;
UNLOCK TABLES;


# Tabelldump questions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `questions`;

CREATE TABLE `questions` (
  `question_id` int(11) NOT NULL AUTO_INCREMENT,
  `imageURL` varchar(255) DEFAULT NULL,
  `tests_test_id` int(11) DEFAULT NULL,
  `question_text` longtext,
  `isOpen` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`question_id`),
  KEY `fk_questions_tests_idx` (`tests_test_id`),
  CONSTRAINT `fk_questions_tests` FOREIGN KEY (`tests_test_id`) REFERENCES `tests` (`test_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;

INSERT INTO `questions` (`question_id`, `imageURL`, `tests_test_id`, `question_text`, `isOpen`)
VALUES
	(4,'https://wyncode.co/wp-content/uploads/2014/08/171.jpg',2,'What are you going to eat today?',0),
	(5,'https://wyncode.co/wp-content/uploads/2014/08/31.jpg',2,'Are you cool?',0),
	(6,'https://s-media-cache-ak0.pinimg.com/736x/d4/f2/00/d4f20041254a0727ddce7cb81be9e68c.jpg',2,'Do you love programming?',0),
	(10,'',3,'Hur uttalar man JSON?',0),
	(11,'',3,'Är javascript samma sak som java?',0),
	(14,'',4,'Vad innebär framgångsfaktor?',0),
	(18,'http://sweetwise.com/media/catalog/product/cache/1/image/61e51e8ee82ea7cb5f073bc2075af991/3/5/3599_1.jpg',1,'Vilket av följande är INTE en Variabel?',0),
	(19,'https://devcentral.f5.com/Portals/0/images/metapost/News-Articles/Joe/2010/Sep/WLW-GettingStartedWithiControlAndJavaSetting_8C5F-eclipse_2.png',1,'Vad står IDE för?',0),
	(20,'https://img.clipartfox.com/476af516da26aa691fc15b02a7e25837_-screwdriver-bits-screwdriver-bits_4854-1782.jpeg',1,'Hur många bits är en integer?',0),
	(21,'',1,'Vad är standardvärdet av en boolean?',0),
	(22,'',1,'Vad är maxvärdet av en short variabel?',0),
	(23,'https://www.ucl.ac.uk/news/news-articles/0416/Sleep_woman-resized-400x300.jpg',2,'Vad står REST för?',0),
	(24,'http://nyfinestspeakers.com/wp-content/uploads/2015/06/social-questions.png',2,'Vad används MediaQuerys till?',0),
	(25,'http://static-cdn.sr.se/sida/images/83/1823069_1200_675.jpg?preset=article',2,'Vad står DOM för?',0),
	(26,'',2,'I vilken variabel/nyckel sparar man ett värde i javascript?',0),
	(27,'',2,'Om man huvudsakligen utvecklar i HTML/CSS så är man troligtvis en...',0),
	(28,'https://lh6.ggpht.com/wPtGt0MEksYcFxP2U3C-ftugJY6ovHDkYqmvQwV6_KbLxt49XsZlN_PWjYWKB6HEeWc=w300',5,'Vad står SQL för?',0),
	(29,'',5,'Vad får en primary key inte vara?',0),
	(30,'',5,'Vad gör följande query \"SELECT * FROM users\"?',0),
	(31,'',5,'Hur många normalformer finns det gällande relationsdatabaser?',0),
	(32,'',5,'Vilket av följande är inte en databashanterare?',0),
	(34,'',5,'hjkweh?',0);

/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;


# Tabelldump questionswithoptions
# ------------------------------------------------------------

DROP VIEW IF EXISTS `questionswithoptions`;

CREATE TABLE `questionswithoptions` (
   `question_id` INT(11) NOT NULL DEFAULT '0',
   `imageURL` VARCHAR(255) NULL DEFAULT NULL,
   `question_text` LONGTEXT NULL DEFAULT NULL,
   `isOpen` TINYINT(1) NULL DEFAULT NULL,
   `option_id` INT(11) NULL DEFAULT '0',
   `option_text` LONGTEXT NULL DEFAULT NULL,
   `points` INT(11) NULL DEFAULT NULL
) ENGINE=MyISAM;



# Tabelldump responseoptionquestion
# ------------------------------------------------------------

DROP VIEW IF EXISTS `responseoptionquestion`;

CREATE TABLE `responseoptionquestion` (
   `option_id` INT(11) NOT NULL,
   `user_id` INT(11) NOT NULL,
   `points` INT(11) NULL DEFAULT NULL,
   `test_id` INT(11) NULL DEFAULT NULL
) ENGINE=MyISAM;



# Tabelldump responses
# ------------------------------------------------------------

DROP TABLE IF EXISTS `responses`;

CREATE TABLE `responses` (
  `users_user_id` int(11) NOT NULL,
  `options_option_id` int(11) NOT NULL,
  PRIMARY KEY (`users_user_id`,`options_option_id`),
  KEY `fk_responses_users1_idx` (`users_user_id`),
  KEY `fk_responses_options1_idx` (`options_option_id`),
  CONSTRAINT `option_id` FOREIGN KEY (`options_option_id`) REFERENCES `options` (`option_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_id` FOREIGN KEY (`users_user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `responses` WRITE;
/*!40000 ALTER TABLE `responses` DISABLE KEYS */;

INSERT INTO `responses` (`users_user_id`, `options_option_id`)
VALUES
	(1111,45),
	(1111,52),
	(1111,55),
	(1111,60),
	(1111,63),
	(1111,68),
	(2222,46),
	(2222,51),
	(2222,57),
	(2222,61),
	(2222,64),
	(2222,70),
	(4444,45),
	(4444,93),
	(4444,95),
	(4444,100),
	(4444,105),
	(4444,109),
	(5555,71),
	(5555,77),
	(5555,80),
	(5555,86),
	(5555,88);

/*!40000 ALTER TABLE `responses` ENABLE KEYS */;
UNLOCK TABLES;


# Tabelldump results
# ------------------------------------------------------------

DROP TABLE IF EXISTS `results`;

CREATE TABLE `results` (
  `result_id` int(11) NOT NULL AUTO_INCREMENT,
  `users_user_id` int(11) DEFAULT NULL,
  `tests_test_id` int(11) DEFAULT NULL,
  `finalResult` double DEFAULT NULL,
  PRIMARY KEY (`result_id`),
  KEY `fk_users_user_idx` (`users_user_id`),
  KEY `fk_tests_test_idx` (`tests_test_id`),
  CONSTRAINT `fk_tests_test_id` FOREIGN KEY (`tests_test_id`) REFERENCES `tests` (`test_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_user_id` FOREIGN KEY (`users_user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `results` WRITE;
/*!40000 ALTER TABLE `results` DISABLE KEYS */;

INSERT INTO `results` (`result_id`, `users_user_id`, `tests_test_id`, `finalResult`)
VALUES
	(33,1111,4,NULL),
	(34,1111,5,NULL),
	(35,4444,5,NULL),
	(37,4444,4,1),
	(38,2222,4,0),
	(39,2222,1,0),
	(41,1111,1,5),
	(42,5555,2,NULL),
	(43,5555,3,NULL),
	(44,5555,4,NULL),
	(45,2222,2,NULL),
	(46,4444,5,NULL),
	(47,5555,2,3);

/*!40000 ALTER TABLE `results` ENABLE KEYS */;
UNLOCK TABLES;


# Tabelldump tests
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tests`;

CREATE TABLE `tests` (
  `test_id` int(11) NOT NULL AUTO_INCREMENT,
  `test_name` varchar(255) DEFAULT NULL,
  `startingTime` datetime DEFAULT NULL,
  `endingTime` datetime DEFAULT NULL,
  `allowedTime` int(11) DEFAULT '0',
  `maximumPoints` int(11) DEFAULT NULL,
  PRIMARY KEY (`test_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `tests` WRITE;
/*!40000 ALTER TABLE `tests` DISABLE KEYS */;

INSERT INTO `tests` (`test_id`, `test_name`, `startingTime`, `endingTime`, `allowedTime`, `maximumPoints`)
VALUES
	(1,'OOP','2017-03-06 12:00:00','2017-12-13 15:00:00',0,5),
	(2,'WEB','2017-03-06 10:00:00','2017-03-11 15:00:00',0,5),
	(3,'Javascript','2017-03-06 12:00:00','2017-03-06 16:00:00',0,2),
	(4,'EFF','2017-03-06 13:00:00','2017-03-07 13:00:00',0,1),
	(5,'Databas-test','2017-03-07 09:00:00','2017-03-07 10:42:00',0,5);

/*!40000 ALTER TABLE `tests` ENABLE KEYS */;
UNLOCK TABLES;


# Tabelldump testswithquestions
# ------------------------------------------------------------

DROP VIEW IF EXISTS `testswithquestions`;

CREATE TABLE `testswithquestions` (
   `test_id` INT(11) NOT NULL DEFAULT '0',
   `test_name` VARCHAR(255) NULL DEFAULT NULL,
   `startingTime` DATETIME NULL DEFAULT NULL,
   `endingTime` DATETIME NULL DEFAULT NULL,
   `allowedTime` INT(11) NULL DEFAULT '0',
   `question_id` INT(11) NULL DEFAULT '0',
   `imageURL` VARCHAR(255) NULL DEFAULT NULL,
   `question_text` LONGTEXT NULL DEFAULT NULL,
   `isOpen` TINYINT(1) NULL DEFAULT NULL
) ENGINE=MyISAM;



# Tabelldump testswithquestionsandoptions
# ------------------------------------------------------------

DROP VIEW IF EXISTS `testswithquestionsandoptions`;

CREATE TABLE `testswithquestionsandoptions` (
   `test_id` INT(11) NOT NULL DEFAULT '0',
   `test_name` VARCHAR(255) NULL DEFAULT NULL,
   `startingTime` DATETIME NULL DEFAULT NULL,
   `endingTime` DATETIME NULL DEFAULT NULL,
   `allowedTime` INT(11) NULL DEFAULT '0',
   `question_id` INT(11) NOT NULL DEFAULT '0',
   `imageURL` VARCHAR(255) NULL DEFAULT NULL,
   `question_text` LONGTEXT NULL DEFAULT NULL,
   `isOpen` TINYINT(1) NULL DEFAULT NULL,
   `option_id` INT(11) NOT NULL DEFAULT '0',
   `option_text` LONGTEXT NULL DEFAULT NULL,
   `points` INT(11) NULL DEFAULT NULL
) ENGINE=MyISAM;



# Tabelldump users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` longtext,
  `lastName` longtext,
  `password` varchar(255) DEFAULT NULL,
  `email` longtext,
  `course` longtext,
  `role` longtext,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`user_id`, `firstName`, `lastName`, `password`, `email`, `course`, `role`)
VALUES
	(1111,'Sven','Ottosson','123','sven@mail.com','SYSJM2','student'),
	(2222,'Olof','Andersson','123','olof@mail.com','SYSJM2','student'),
	(3333,'Pelle','Svensson','123','pelle@mail.com',NULL,'teacher'),
	(4444,'Per','Persson','123','per@mail.com','KRAM1','student'),
	(5555,'Gert-Inge','Lopéz','123','gert-stjert@mail.com','.NET','student');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


# Tabelldump usersresultview
# ------------------------------------------------------------

DROP VIEW IF EXISTS `usersresultview`;

CREATE TABLE `usersresultview` (
   `test_id` INT(11) NOT NULL DEFAULT '0',
   `user_id` INT(11) NOT NULL DEFAULT '0',
   `firstName` LONGTEXT NULL DEFAULT NULL,
   `lastName` LONGTEXT NULL DEFAULT NULL,
   `course` LONGTEXT NULL DEFAULT NULL,
   `finalResult` DOUBLE NULL DEFAULT NULL,
   `maximumPoints` INT(11) NULL DEFAULT NULL
) ENGINE=MyISAM;





# Replace placeholder table for testswithquestions with correct view syntax
# ------------------------------------------------------------

DROP TABLE `testswithquestions`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `testswithquestions`
AS SELECT
   `tests`.`test_id` AS `test_id`,
   `tests`.`test_name` AS `test_name`,
   `tests`.`startingTime` AS `startingTime`,
   `tests`.`endingTime` AS `endingTime`,
   `tests`.`allowedTime` AS `allowedTime`,
   `questions`.`question_id` AS `question_id`,
   `questions`.`imageURL` AS `imageURL`,
   `questions`.`question_text` AS `question_text`,
   `questions`.`isOpen` AS `isOpen`
FROM (`tests` left join `questions` on((`tests`.`test_id` = `questions`.`tests_test_id`)));


# Replace placeholder table for testswithquestionsandoptions with correct view syntax
# ------------------------------------------------------------

DROP TABLE `testswithquestionsandoptions`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `testswithquestionsandoptions`
AS SELECT
   `tests`.`test_id` AS `test_id`,
   `tests`.`test_name` AS `test_name`,
   `tests`.`startingTime` AS `startingTime`,
   `tests`.`endingTime` AS `endingTime`,
   `tests`.`allowedTime` AS `allowedTime`,
   `questions`.`question_id` AS `question_id`,
   `questions`.`imageURL` AS `imageURL`,
   `questions`.`question_text` AS `question_text`,
   `questions`.`isOpen` AS `isOpen`,
   `options`.`option_id` AS `option_id`,
   `options`.`option_text` AS `option_text`,
   `options`.`points` AS `points`
FROM ((`options` join `questions` on((`options`.`questions_question_id` = `questions`.`question_id`))) join `tests` on((`questions`.`tests_test_id` = `tests`.`test_id`)));


# Replace placeholder table for responseoptionquestion with correct view syntax
# ------------------------------------------------------------

DROP TABLE `responseoptionquestion`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `responseoptionquestion`
AS SELECT
   `responses`.`options_option_id` AS `option_id`,
   `responses`.`users_user_id` AS `user_id`,
   `options`.`points` AS `points`,
   `questions`.`tests_test_id` AS `test_id`
FROM ((`responses` join `options` on((`responses`.`options_option_id` = `options`.`option_id`))) join `questions` on((`options`.`questions_question_id` = `questions`.`question_id`)));


# Replace placeholder table for usersresultview with correct view syntax
# ------------------------------------------------------------

DROP TABLE `usersresultview`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `usersresultview`
AS SELECT
   `tests`.`test_id` AS `test_id`,
   `users`.`user_id` AS `user_id`,
   `users`.`firstName` AS `firstName`,
   `users`.`lastName` AS `lastName`,
   `users`.`course` AS `course`,
   `results`.`finalResult` AS `finalResult`,
   `tests`.`maximumPoints` AS `maximumPoints`
FROM ((`users` join `results` on((`users`.`user_id` = `results`.`users_user_id`))) join `tests` on((`tests`.`test_id` = `results`.`tests_test_id`)));


# Replace placeholder table for questionswithoptions with correct view syntax
# ------------------------------------------------------------

DROP TABLE `questionswithoptions`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `questionswithoptions`
AS SELECT
   `questions`.`question_id` AS `question_id`,
   `questions`.`imageURL` AS `imageURL`,
   `questions`.`question_text` AS `question_text`,
   `questions`.`isOpen` AS `isOpen`,
   `options`.`option_id` AS `option_id`,
   `options`.`option_text` AS `option_text`,
   `options`.`points` AS `points`
FROM (`questions` left join `options` on((`questions`.`question_id` = `options`.`questions_question_id`)));

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
