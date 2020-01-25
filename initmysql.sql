-- mysql -uroot -ptj91database < initmysql.sql


drop database if exists tj91;
create  database tj91;
use tj91;

drop table if exists xds_users;

CREATE TABLE xds_users
(
  id        int NOT NULL auto_increment,
  type     smallint DEFAULT '2' NOT NULL,  
  username      varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci unique, 
  password  varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- 0 admin ,1 assist ,2 student
INSERT INTO xds_users (type, username, password ) VALUES ( '0', 'tj91', 'e0de3c61693cfeeb39da703c657be46c');

CREATE TABLE xds_student
(
  id        int NOT NULL auto_increment,
  name  varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  student_id int NOT NULL unique,
  year	int NOT NULL,
  province_id 	int NOT NULL,

  photo_suffix   varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- province: /docs/province.txt

CREATE TABLE xds_career
(
  id        int NOT NULL auto_increment,
  student_id  int DEFAULT '0' NOT NULL,
  start_time     DATE DEFAULT '2000-01-01' NOT NULL,
  end_time       DATE DEFAULT '2000-01-01' NOT NULL,
  unit varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci,
  position varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci,
  level varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
-- level int DEFAULT '0' NOT NULL,
  PRIMARY KEY (id),
-- 外键级联删除/更新，学生被删除后，自动删除其对应的工作经历  
  foreign key (student_id) references xds_student(student_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字0','0','2017','19');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字1','1','2018','4');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字2','2','2015','10');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字3','3','2019','0');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字4','4','2018','7');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字5','5','2015','29');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字6','6','2017','30');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字7','7','2017','7');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字8','8','2017','11');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字9','9','2015','18');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字10','10','2018','5');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字11','11','2019','15');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字12','12','2015','1');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字13','13','2019','4');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字14','14','2016','3');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字15','15','2017','22');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字16','16','2017','21');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字17','17','2015','3');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字18','18','2019','11');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字19','19','2019','15');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字20','20','2017','14');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字21','21','2018','22');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字22','22','2015','23');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字23','23','2018','33');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字24','24','2019','21');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字25','25','2016','19');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字26','26','2018','32');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字27','27','2018','18');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字28','28','2019','14');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字29','29','2015','23');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字30','30','2017','24');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字31','31','2019','4');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字32','32','2016','19');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字33','33','2017','4');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字34','34','2018','9');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字35','35','2018','7');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字36','36','2015','25');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字37','37','2015','18');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字38','38','2018','24');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字39','39','2015','31');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字40','40','2015','2');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字41','41','2019','21');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字42','42','2017','15');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字43','43','2015','2');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字44','44','2016','24');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字45','45','2018','3');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字46','46','2015','32');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字47','47','2017','12');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字48','48','2016','9');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字49','49','2018','6');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字50','50','2016','23');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字51','51','2016','24');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字52','52','2017','24');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字53','53','2017','19');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字54','54','2019','8');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字55','55','2019','15');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字56','56','2015','27');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字57','57','2015','30');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字58','58','2017','27');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字59','59','2018','10');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字60','60','2015','31');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字61','61','2019','12');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字62','62','2015','24');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字63','63','2018','14');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字64','64','2016','26');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字65','65','2017','23');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字66','66','2017','18');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字67','67','2017','1');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字68','68','2015','30');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字69','69','2016','5');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字70','70','2015','33');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字71','71','2018','29');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字72','72','2016','4');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字73','73','2015','29');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字74','74','2015','2');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字75','75','2017','30');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字76','76','2015','5');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字77','77','2019','25');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字78','78','2019','12');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字79','79','2015','12');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字80','80','2018','10');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字81','81','2018','2');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字82','82','2018','24');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字83','83','2015','24');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字84','84','2016','2');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字85','85','2016','2');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字86','86','2018','26');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字87','87','2019','2');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字88','88','2015','5');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字89','89','2018','19');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字90','90','2015','11');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字91','91','2017','5');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字92','92','2017','9');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字93','93','2016','3');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字94','94','2018','12');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字95','95','2019','20');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字96','96','2015','27');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字97','97','2015','10');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字98','98','2017','19');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( '名字99','99','2019','22');


-- drop table if exists mrbs_room;

-- CREATE TABLE mrbs_room
-- (
--   id               int NOT NULL auto_increment,   
--   disabled         tinyint(1) DEFAULT 0 NOT NULL, 
--   type		       varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '' NOT NULL,  
--   room_name        varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '' NOT NULL,  
--   equipment		      varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci,	 
--   description      varchar(200) CHARACTER  SET utf8 COLLATE utf8_general_ci,
--   capacity         int DEFAULT '0' NOT NULL,
--   usedtime		   int DEFAULT '0' NOT NULL,
--   PRIMARY KEY (id)  
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- INSERT INTO mrbs_room (room_name,type,  capacity ,equipment,description) VALUES ( '������ 1', '������', 20,'aaa',"���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1���1");
-- INSERT INTO mrbs_room (room_name,type, capacity ,equipment,description) VALUES ( '������ 2', '������', 10,'aaa',"���2");
-- INSERT INTO mrbs_room (room_name,type, capacity,equipment ,description) VALUES ( '������ 3', '�๦����', 30,'aaa',"���3");
-- INSERT INTO mrbs_room (room_name,type,disabled,  capacity,equipment ,description) VALUES ( '������ 4', '������',1, 40,'aaa',"���4");
-- INSERT INTO mrbs_room (room_name,type,  capacity,equipment ,description) VALUES ( '������ 5', '�๦����', 40,'aaa',"���5");
-- drop table if exists mrbs_entry;

-- CREATE TABLE mrbs_entry
-- (
--   id             int NOT NULL auto_increment,
--   name		   varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '' NOT NULL,
--   student_id	  int DEFAULT '0' NOT NULL,
--   room_id       int DEFAULT '1' NOT NULL,  
--   tel        varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '' NOT NULL,
--   email	    varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '' NOT NULL,
--    unit	    varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '' NOT NULL,
--   count	     int DEFAULT '1' NOT NULL,  
--   theme	  	varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '' NOT NULL,
--   detail	 text CHARACTER SET utf8 COLLATE utf8_general_ci  NOT NULL,  
  
--   start_time     int DEFAULT '0' NOT NULL,
--   end_time       int DEFAULT '0' NOT NULL,
--   entry_type     int DEFAULT '0' NOT NULL,  
--   timestamp      int DEFAULT '0' NOT NULL,
  
--   status         tinyint unsigned NOT NULL DEFAULT 0,
--   PRIMARY KEY (id),
--   KEY idxStartTime (start_time),
--   KEY idxEndTime   (end_time)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
