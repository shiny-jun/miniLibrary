-- isbn是豆瓣isbn号，openid是这本书到底是谁扫的，alt是图书豆瓣的链接，rate 是评分，tags是标签
create table books(
    id int not null auto_increment primary key,
    isbn varchar(20) not null,
    openid varchar(50) not null,
    title varchar(100) not null,
    image varchar(100),
    alt varchar(100) not null,
    publisher varchar(100) not null,
    summary varchar(1000) not null,
    price varchar(100),
    rate float,
    tags varchar(100),
    author varchar(100)
);

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) NOT NULL,
  `bookid` varchar(100) NOT NULL,
  `comment` varchar(200) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `location` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;