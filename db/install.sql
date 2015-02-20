SET NAMES utf8;
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `entry`;
CREATE TABLE `entry` (
      `id` mediumint(9) unsigned NOT NULL AUTO_INCREMENT,
      `name` varchar(40) NOT NULL,
      `order` varchar(40) NOT NULL,
      `display` enum('0','1') NOT NULL,
      `deleted` enum('0','1') NOT NULL,
      PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
      `id` mediumint(9) unsigned NOT NULL AUTO_INCREMENT,
      `account` varchar(30) NOT NULL,
      `name` varchar(30) NOT NULL,
      `mail` varchar(40) NOT NULL,
      `password` char(32) NOT NULL,
      `deleted` enum('0','1') NOT NULL DEFAULT '0',
      PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
      `id` mediumint(9) unsigned NOT NULL AUTO_INCREMENT,
      `name` varchar(40) NOT NULL,
      `code` varchar(30) NOT NULL,
      `desc` text NOT NULL,
      `createdBy` mediumint(9) NOT NULL,
      `createdTime` datetime NOT NULL,
      `deleted` enum('0','1') NOT NULL,
      PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `project` (`id`, `name`, `code`, `desc`, `createdBy`, `createdTime`, `deleted`) VALUES
(1,     'a',    '',     '',     0,      '2015-02-20 16:33:38',  '0'),
(2,     'a',    '',     '',     1,      '2015-02-20 16:34:08',  '0'),
(3,     'a',    '',     'a',    1,      '2015-02-20 16:35:53',  '0'),
(4,     'a',    '',     'a',    1,      '2015-02-20 16:36:21',  '0'),
(5,     'b',    '',     'b',    1,      '2015-02-20 16:36:29',  '0'),
(6,     'c',    '',     'c',    1,      '2015-02-20 16:37:40',  '0');

DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
      `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
      `name` varchar(40) NOT NULL,
      `content` text NOT NULL,
      `project` mediumint(8) unsigned NOT NULL,
      `entry` mediumint(8) unsigned NOT NULL,
      `assignedTo` mediumint(8) unsigned NOT NULL,
      `deadline` date NOT NULL,
      `deleted` enum('0','1') NOT NULL,
      PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `token`;
CREATE TABLE `token` (
      `token` char(32) NOT NULL,
      `idMember` mediumint(9) NOT NULL,
      `dateCreated` datetime NOT NULL,
      `dateExpires` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
