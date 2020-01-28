# 开发文档

数据库结构：

xds_users: 用户

创建student时，先创建一个用户，id = student_id

xds_student 学生，删除用户后自动删除

xds_career 学生的职业经历 删除学生后自动删除

xds_comment 学生提交修改请求，管理员处理，删除用户后自动删除

xds_event 选调生工作事件

xds_eventfile 工作事件的附件， 删除事件后自动删除