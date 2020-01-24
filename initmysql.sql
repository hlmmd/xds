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
  name  varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  student_id int NOT NULL unique,
  year	int NOT NULL,
  province_id 	int NOT NULL,
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

INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx0','0','2017','19');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx1','1','2018','4');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx2','2','2015','10');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx3','3','2019','0');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx4','4','2018','7');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx5','5','2015','29');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx6','6','2017','30');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx7','7','2017','7');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx8','8','2017','11');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx9','9','2015','18');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx10','10','2018','5');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx11','11','2019','15');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx12','12','2015','1');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx13','13','2019','4');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx14','14','2016','3');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx15','15','2017','22');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx16','16','2017','21');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx17','17','2015','3');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx18','18','2019','11');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx19','19','2019','15');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx20','20','2017','14');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx21','21','2018','22');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx22','22','2015','23');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx23','23','2018','33');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx24','24','2019','21');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx25','25','2016','19');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx26','26','2018','32');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx27','27','2018','18');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx28','28','2019','14');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx29','29','2015','23');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx30','30','2017','24');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx31','31','2019','4');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx32','32','2016','19');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx33','33','2017','4');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx34','34','2018','9');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx35','35','2018','7');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx36','36','2015','25');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx37','37','2015','18');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx38','38','2018','24');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx39','39','2015','31');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx40','40','2015','2');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx41','41','2019','21');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx42','42','2017','15');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx43','43','2015','2');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx44','44','2016','24');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx45','45','2018','3');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx46','46','2015','32');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx47','47','2017','12');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx48','48','2016','9');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx49','49','2018','6');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx50','50','2016','23');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx51','51','2016','24');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx52','52','2017','24');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx53','53','2017','19');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx54','54','2019','8');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx55','55','2019','15');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx56','56','2015','27');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx57','57','2015','30');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx58','58','2017','27');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx59','59','2018','10');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx60','60','2015','31');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx61','61','2019','12');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx62','62','2015','24');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx63','63','2018','14');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx64','64','2016','26');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx65','65','2017','23');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx66','66','2017','18');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx67','67','2017','1');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx68','68','2015','30');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx69','69','2016','5');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx70','70','2015','33');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx71','71','2018','29');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx72','72','2016','4');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx73','73','2015','29');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx74','74','2015','2');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx75','75','2017','30');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx76','76','2015','5');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx77','77','2019','25');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx78','78','2019','12');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx79','79','2015','12');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx80','80','2018','10');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx81','81','2018','2');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx82','82','2018','24');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx83','83','2015','24');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx84','84','2016','2');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx85','85','2016','2');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx86','86','2018','26');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx87','87','2019','2');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx88','88','2015','5');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx89','89','2018','19');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx90','90','2015','11');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx91','91','2017','5');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx92','92','2017','9');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx93','93','2016','3');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx94','94','2018','12');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx95','95','2019','20');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx96','96','2015','27');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx97','97','2015','10');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx98','98','2017','19');
INSERT INTO xds_student (name,student_id,year, province_id) VALUES( 'xx99','99','2019','22');


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
