-- mysql -uroot -ptj91database < initmysql.sql

drop database if exists tj91;
create  database tj91;
use tj91;

drop table if exists xds_users;

CREATE TABLE xds_users
(
  id        int NOT NULL unique,
  type     smallint DEFAULT '2' NOT NULL,  
  username      varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci unique not NULL, 
  password  varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci not NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- 0 admin ,1 assist ,2 student
INSERT INTO xds_users (id, type, username, password ) VALUES (0, 0, 'tj91', 'e0de3c61693cfeeb39da703c657be46c');

drop table if exists xds_student;
CREATE TABLE xds_student
(
  student_id int NOT NULL unique,
  name  varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  year	int NOT NULL,
  province_id 	int NOT NULL,
  photo_suffix   varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
  PRIMARY KEY (student_id),

 -- student_id 是外键，想要删除学生时直接删除学生在xds_users表中的项即可。 

  foreign key (student_id) references xds_users(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- province: /docs/province.txt

drop table if exists xds_career;
CREATE TABLE xds_career
(
  id        int NOT NULL auto_increment,
  student_id  int DEFAULT '0' NOT NULL,
  start_time     DATE DEFAULT '2000-01-01' NOT NULL,
  end_time       DATE DEFAULT '2000-01-01' NOT NULL,
  unit varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci,
  position varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci,
  level varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (id),
-- 外键级联删除/更新，学生被删除后，自动删除其对应的工作经历  
  foreign key (student_id) references xds_student(student_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

drop table if exists xds_comment;
CREATE TABLE xds_comment
(
  user_id int NOT NULL,
  comment_id        int NOT NULL auto_increment,
  content      varchar(10000) CHARACTER SET utf8 COLLATE utf8_general_ci , 
-- 0: 待处理 1:已处理 2:删除
  state int  DEFAULT '0' not NULL, 
  timestamp timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (comment_id),
  foreign key (user_id) references xds_users(id) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO xds_users (id,username, password ) VALUES (1, '1',md5('1'));
INSERT INTO xds_users (id,username, password ) VALUES (2, '2',md5('2'));
INSERT INTO xds_users (id,username, password ) VALUES (3, '3',md5('3'));
INSERT INTO xds_users (id,username, password ) VALUES (4, '4',md5('4'));
INSERT INTO xds_users (id,username, password ) VALUES (5, '5',md5('5'));
INSERT INTO xds_users (id,username, password ) VALUES (6, '6',md5('6'));
INSERT INTO xds_users (id,username, password ) VALUES (7, '7',md5('7'));
INSERT INTO xds_users (id,username, password ) VALUES (8, '8',md5('8'));
INSERT INTO xds_users (id,username, password ) VALUES (9, '9',md5('9'));
INSERT INTO xds_users (id,username, password ) VALUES (10, '10',md5('10'));
INSERT INTO xds_users (id,username, password ) VALUES (11, '11',md5('11'));
INSERT INTO xds_users (id,username, password ) VALUES (12, '12',md5('12'));
INSERT INTO xds_users (id,username, password ) VALUES (13, '13',md5('13'));
INSERT INTO xds_users (id,username, password ) VALUES (14, '14',md5('14'));
INSERT INTO xds_users (id,username, password ) VALUES (15, '15',md5('15'));
INSERT INTO xds_users (id,username, password ) VALUES (16, '16',md5('16'));
INSERT INTO xds_users (id,username, password ) VALUES (17, '17',md5('17'));
INSERT INTO xds_users (id,username, password ) VALUES (18, '18',md5('18'));
INSERT INTO xds_users (id,username, password ) VALUES (19, '19',md5('19'));
INSERT INTO xds_users (id,username, password ) VALUES (20, '20',md5('20'));
INSERT INTO xds_users (id,username, password ) VALUES (21, '21',md5('21'));
INSERT INTO xds_users (id,username, password ) VALUES (22, '22',md5('22'));
INSERT INTO xds_users (id,username, password ) VALUES (23, '23',md5('23'));
INSERT INTO xds_users (id,username, password ) VALUES (24, '24',md5('24'));
INSERT INTO xds_users (id,username, password ) VALUES (25, '25',md5('25'));
INSERT INTO xds_users (id,username, password ) VALUES (26, '26',md5('26'));
INSERT INTO xds_users (id,username, password ) VALUES (27, '27',md5('27'));
INSERT INTO xds_users (id,username, password ) VALUES (28, '28',md5('28'));
INSERT INTO xds_users (id,username, password ) VALUES (29, '29',md5('29'));
INSERT INTO xds_users (id,username, password ) VALUES (30, '30',md5('30'));
INSERT INTO xds_users (id,username, password ) VALUES (31, '31',md5('31'));
INSERT INTO xds_users (id,username, password ) VALUES (32, '32',md5('32'));
INSERT INTO xds_users (id,username, password ) VALUES (33, '33',md5('33'));
INSERT INTO xds_users (id,username, password ) VALUES (34, '34',md5('34'));
INSERT INTO xds_users (id,username, password ) VALUES (35, '35',md5('35'));
INSERT INTO xds_users (id,username, password ) VALUES (36, '36',md5('36'));
INSERT INTO xds_users (id,username, password ) VALUES (37, '37',md5('37'));
INSERT INTO xds_users (id,username, password ) VALUES (38, '38',md5('38'));
INSERT INTO xds_users (id,username, password ) VALUES (39, '39',md5('39'));
INSERT INTO xds_users (id,username, password ) VALUES (40, '40',md5('40'));
INSERT INTO xds_users (id,username, password ) VALUES (41, '41',md5('41'));
INSERT INTO xds_users (id,username, password ) VALUES (42, '42',md5('42'));
INSERT INTO xds_users (id,username, password ) VALUES (43, '43',md5('43'));
INSERT INTO xds_users (id,username, password ) VALUES (44, '44',md5('44'));
INSERT INTO xds_users (id,username, password ) VALUES (45, '45',md5('45'));
INSERT INTO xds_users (id,username, password ) VALUES (46, '46',md5('46'));
INSERT INTO xds_users (id,username, password ) VALUES (47, '47',md5('47'));
INSERT INTO xds_users (id,username, password ) VALUES (48, '48',md5('48'));
INSERT INTO xds_users (id,username, password ) VALUES (49, '49',md5('49'));
INSERT INTO xds_users (id,username, password ) VALUES (50, '50',md5('50'));
INSERT INTO xds_users (id,username, password ) VALUES (51, '51',md5('51'));
INSERT INTO xds_users (id,username, password ) VALUES (52, '52',md5('52'));
INSERT INTO xds_users (id,username, password ) VALUES (53, '53',md5('53'));
INSERT INTO xds_users (id,username, password ) VALUES (54, '54',md5('54'));
INSERT INTO xds_users (id,username, password ) VALUES (55, '55',md5('55'));
INSERT INTO xds_users (id,username, password ) VALUES (56, '56',md5('56'));
INSERT INTO xds_users (id,username, password ) VALUES (57, '57',md5('57'));
INSERT INTO xds_users (id,username, password ) VALUES (58, '58',md5('58'));
INSERT INTO xds_users (id,username, password ) VALUES (59, '59',md5('59'));
INSERT INTO xds_users (id,username, password ) VALUES (60, '60',md5('60'));
INSERT INTO xds_users (id,username, password ) VALUES (61, '61',md5('61'));
INSERT INTO xds_users (id,username, password ) VALUES (62, '62',md5('62'));
INSERT INTO xds_users (id,username, password ) VALUES (63, '63',md5('63'));
INSERT INTO xds_users (id,username, password ) VALUES (64, '64',md5('64'));
INSERT INTO xds_users (id,username, password ) VALUES (65, '65',md5('65'));
INSERT INTO xds_users (id,username, password ) VALUES (66, '66',md5('66'));
INSERT INTO xds_users (id,username, password ) VALUES (67, '67',md5('67'));
INSERT INTO xds_users (id,username, password ) VALUES (68, '68',md5('68'));
INSERT INTO xds_users (id,username, password ) VALUES (69, '69',md5('69'));
INSERT INTO xds_users (id,username, password ) VALUES (70, '70',md5('70'));
INSERT INTO xds_users (id,username, password ) VALUES (71, '71',md5('71'));
INSERT INTO xds_users (id,username, password ) VALUES (72, '72',md5('72'));
INSERT INTO xds_users (id,username, password ) VALUES (73, '73',md5('73'));
INSERT INTO xds_users (id,username, password ) VALUES (74, '74',md5('74'));
INSERT INTO xds_users (id,username, password ) VALUES (75, '75',md5('75'));
INSERT INTO xds_users (id,username, password ) VALUES (76, '76',md5('76'));
INSERT INTO xds_users (id,username, password ) VALUES (77, '77',md5('77'));
INSERT INTO xds_users (id,username, password ) VALUES (78, '78',md5('78'));
INSERT INTO xds_users (id,username, password ) VALUES (79, '79',md5('79'));
INSERT INTO xds_users (id,username, password ) VALUES (80, '80',md5('80'));
INSERT INTO xds_users (id,username, password ) VALUES (81, '81',md5('81'));
INSERT INTO xds_users (id,username, password ) VALUES (82, '82',md5('82'));
INSERT INTO xds_users (id,username, password ) VALUES (83, '83',md5('83'));
INSERT INTO xds_users (id,username, password ) VALUES (84, '84',md5('84'));
INSERT INTO xds_users (id,username, password ) VALUES (85, '85',md5('85'));
INSERT INTO xds_users (id,username, password ) VALUES (86, '86',md5('86'));
INSERT INTO xds_users (id,username, password ) VALUES (87, '87',md5('87'));
INSERT INTO xds_users (id,username, password ) VALUES (88, '88',md5('88'));
INSERT INTO xds_users (id,username, password ) VALUES (89, '89',md5('89'));
INSERT INTO xds_users (id,username, password ) VALUES (90, '90',md5('90'));
INSERT INTO xds_users (id,username, password ) VALUES (91, '91',md5('91'));
INSERT INTO xds_users (id,username, password ) VALUES (92, '92',md5('92'));
INSERT INTO xds_users (id,username, password ) VALUES (93, '93',md5('93'));
INSERT INTO xds_users (id,username, password ) VALUES (94, '94',md5('94'));
INSERT INTO xds_users (id,username, password ) VALUES (95, '95',md5('95'));
INSERT INTO xds_users (id,username, password ) VALUES (96, '96',md5('96'));
INSERT INTO xds_users (id,username, password ) VALUES (97, '97',md5('97'));
INSERT INTO xds_users (id,username, password ) VALUES (98, '98',md5('98'));
INSERT INTO xds_users (id,username, password ) VALUES (99, '99',md5('99'));
INSERT INTO xds_users (id,username, password ) VALUES (100, '100',md5('100'));
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字1','1','2017','19');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字2','2','2018','4');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字3','3','2015','10');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字4','4','2019','0');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字5','5','2018','7');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字6','6','2015','29');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字7','7','2017','30');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字8','8','2017','7');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字9','9','2017','11');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字10','10','2015','18');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字11','11','2018','5');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字12','12','2019','15');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字13','13','2015','1');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字14','14','2019','4');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字15','15','2016','3');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字16','16','2017','22');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字17','17','2017','21');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字18','18','2015','3');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字19','19','2019','11');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字20','20','2019','15');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字21','21','2017','14');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字22','22','2018','22');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字23','23','2015','23');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字24','24','2018','33');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字25','25','2019','21');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字26','26','2016','19');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字27','27','2018','32');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字28','28','2018','18');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字29','29','2019','14');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字30','30','2015','23');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字31','31','2017','24');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字32','32','2019','4');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字33','33','2016','19');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字34','34','2017','4');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字35','35','2018','9');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字36','36','2018','7');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字37','37','2015','25');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字38','38','2015','18');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字39','39','2018','24');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字40','40','2015','31');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字41','41','2015','2');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字42','42','2019','21');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字43','43','2017','15');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字44','44','2015','2');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字45','45','2016','24');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字46','46','2018','3');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字47','47','2015','32');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字48','48','2017','12');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字49','49','2016','9');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字50','50','2018','6');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字51','51','2016','23');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字52','52','2016','24');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字53','53','2017','24');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字54','54','2017','19');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字55','55','2019','8');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字56','56','2019','15');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字57','57','2015','27');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字58','58','2015','30');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字59','59','2017','27');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字60','60','2018','10');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字61','61','2015','31');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字62','62','2019','12');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字63','63','2015','24');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字64','64','2018','14');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字65','65','2016','26');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字66','66','2017','23');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字67','67','2017','18');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字68','68','2017','1');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字69','69','2015','30');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字70','70','2016','5');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字71','71','2015','33');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字72','72','2018','29');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字73','73','2016','4');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字74','74','2015','29');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字75','75','2015','2');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字76','76','2017','30');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字77','77','2015','5');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字78','78','2019','25');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字79','79','2019','12');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字80','80','2015','12');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字81','81','2018','10');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字82','82','2018','2');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字83','83','2018','24');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字84','84','2015','24');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字85','85','2016','2');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字86','86','2016','2');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字87','87','2018','26');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字88','88','2019','2');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字89','89','2015','5');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字90','90','2018','19');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字91','91','2015','11');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字92','92','2017','5');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字93','93','2017','9');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字94','94','2016','3');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字95','95','2018','12');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字96','96','2019','20');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字97','97','2015','27');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字98','98','2015','10');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字99','99','2017','19');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字100','100','2019','22');

