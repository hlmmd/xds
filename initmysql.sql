-- mysql -uroot -ptj91database < initmysql.sql

drop database if exists tj91;
create  database tj91;
use tj91;

drop table if exists xds_users;

CREATE TABLE xds_users
(
  id        bigint NOT NULL unique,
  type     smallint DEFAULT '2' NOT NULL,  
  username      varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci unique not NULL, 
  password  varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci not NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- 0 admin ,1 assist ,2 student
INSERT INTO xds_users (id, type, username, password ) VALUES (0, 0, 'tj91', '$2b$10$d3jYmq3jYuH2uYhiWOEF4OZy3fEZqtk7t.JjRqn9zPQ.t5TuCQVqW');



drop table if exists xds_student;
CREATE TABLE xds_student
(
  student_id bigint NOT NULL unique,
  name  varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  year	int NOT NULL DEFAULT '2000',
  province_id 	int NOT NULL DEFAULT '34',
  photofile   varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,


xingbie varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
minzu varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
zzmm varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
csrq varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
sfzjh varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
xueyuan varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
xisuo varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
xslx varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
xueli varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
xuewei varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
zhuanye varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
xjzt varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
xuezhi varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
rxny varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
rxfs varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
pyfs varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
-- 就业年份 用year替代
-- jynf varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
syd varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
shoujihao varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
lxdh varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
jtdz varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
jtdh varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
dzxx varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
qqhao varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
weixinhao varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
lxdz varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
yzbh varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
xysbh varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
qxlx varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
dwmc varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
zzjgdm varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
tyshxydm varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
sqlx varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
xxdjh varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
dwxz varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
dwhy varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
zwlb varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
dwszdq varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
dwtxdz varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
lxrdh varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
bdzdwmc varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
bdzbh varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
bdzdwdq varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
dajsdw varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
dajsyb varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
dajsdz varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,
dajslxdh varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' ,


  PRIMARY KEY (student_id),

 -- student_id 是外键，想要删除学生时直接删除学生在xds_users表中的项即可。 

  foreign key (student_id) references xds_users(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- province: /docs/province.txt

drop table if exists xds_career;
CREATE TABLE xds_career
(
  career_id        bigint NOT NULL auto_increment,
  student_id  bigint DEFAULT '0' NOT NULL,
  start_time     DATE DEFAULT '2000-01-01' NOT NULL,
  end_time       DATE DEFAULT '2000-01-01' NOT NULL,
  unit varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci,
  position varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci,
  level varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (career_id),
-- 外键级联删除/更新，学生被删除后，自动删除其对应的工作经历  
-- 考虑到通过重新导入学生信息修改 基本信息，去除删除操作
--  foreign key (student_id) references xds_student(student_id) ON DELETE CASCADE ON UPDATE CASCADE
  foreign key (student_id) references xds_student(student_id) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

drop table if exists xds_comment;
CREATE TABLE xds_comment
(
  user_id bigint NOT NULL,
  comment_id        bigint NOT NULL auto_increment,
  content      varchar(10000) CHARACTER SET utf8 COLLATE utf8_general_ci , 
-- 0: 待处理 1:已处理 2:删除
  state int  DEFAULT '0' not NULL, 
  timestamp timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (comment_id),
  foreign key (user_id) references xds_users(id) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

drop table if exists xds_event;
CREATE TABLE xds_event
(
  event_id bigint NOT NULL auto_increment,
  year int DEFAULT '2010' not NULL,
  start_date  DATE DEFAULT '2000-01-01' NOT NULL,
  province_id int DEFAULT '0' not NULL,
  title varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci,
  content varchar(10000) CHARACTER SET utf8 COLLATE utf8_general_ci,
  photofile  varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci,
  timestamp timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (event_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

drop table if exists xds_eventfile;
CREATE TABLE xds_eventfile
(
  event_id bigint NOT NULL ,
  file_id bigint NOT NULL auto_increment,
  filename varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci,
  filepath  varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci,
  timestamp timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (file_id),
  foreign key (event_id) references xds_event(event_id) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


