# xdsxt

## 环境配置

ubuntu 16.04

sudo apt install npm

sudo npm install express -gd

sudo npm install express-generator

创建项目

mkdir xds
cd xds

npm init 

sudo npm install -g express-generator

sudo  npm install -g express

express --version

npm install express --save

express -e test

安装 mysql

sudo apt install mysql-server

**数据库用户名密码需要在app.js和common/dbConnect.js中修改**

## 项目运行

框架： express+ejs+bootstrap+mysql

```bash
git clone https://github.com/hlmmd/xds
cd xds
npm install
mysql -uusername -ppassword < initmysql.sql
npm start
```

浏览器127.0.0.1:3000访问

## 

什么时候才能入门数据库呢

## centos

学校的虚拟机默认使用centos 7.5系统。留份文档，以便后人维护。

## 修改ssh端口，开启防火墙

为了安全性，学校不开放22号端口，所以先修改默认端口为6000

```bash
vi /etc/ssh/sshd_config
#添加一行
Port 6000
#防火墙设置
firewall-cmd --zone=public --add-port=6000/tcp --permanent
#访问网站，80端口也要开启
firewall-cmd --zone=public --add-port=80/tcp --permanent
#nodejs网站默认3000端口，也开启
firewall-cmd --zone=public --add-port=3000/tcp --permanent
firewall-cmd --reload
#向SELinux中添加修改的SSH端口
yum provides semanage
yum -y install policycoreutils-python
semanage port -a -t ssh_port_t -p tcp 6000
#重启sshd服务
systemctl restart sshd.service
```

关闭SELinux

```bash
vi /etc/selinux/config
#将SELINUX=enforcing改为
SELINUX=disabled
#重启生效
```

## 安装nodejs环境

首先更新yum源

```bash
yum update
yum upgrade
```

安装Nodejs 14

```bash
curl -sL https://rpm.nodesource.com/setup_14.x | bash -
sudo yum install -y nodejs
sudo yum install gcc-c++ make
#查看node 版本
node -v
#查看npm版本
npm -v
```

设置nodejs运行环境为生产环境

```bash
vi ~/.bashrc
#添加
export NODE_ENV=production
```

修改npm源

```bash
npm config set registry https://registry.npm.taobao.org
```

安装forever

```bash
npm install -g forever
```

## 配置mysql

安装Mysql

```bash
yum install wget
wget https://dev.mysql.com/get/mysql57-community-release-el7-9.noarch.rpm
rpm -ivh mysql57-community-release-el7-9.noarch.rpm
yum install mysql-server
rm -rf /var/lib/mysql
systemctl start mysqld
#获取临时密码
grep 'temporary password' /var/log/mysqld.log
```

修改密码

```bash
#登录mysql
mysql -uroot -pTEMP_PASSWORD
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new password';
```

## 下载及运行代码

```bash
#安装git
yum install git
git clone https://github.com/hlmmd/xds
cd xds
#安装依赖包
npm install
```

### 编写app.js

将默认的app.template.js拷贝一份，修改数据库用户名、密码等信息

```bash
cp app.template.js app.js
vi app.js
```

### 初始化数据库

```bash
mysql -uroot -pDATABASE_PASSWD < initmysql.sql
```

### 运行网站

```bash
npm start
```

通过IP:3000可以访问网站。

## 运行网站

### 开启

```bash
cd xds/
forever start /root/xds/bin/www
```

### 关闭

```bash
forever stop /root/xds/bin/www
```

### 设置重启后自动运行

```bash
vi /etc/rc.d/rc.local
#添加
cd /root/xds && forever start ./bin/www
#添加执行权限
chmod +x /etc/rc.d/rc.local
```

## 安装nginx，配置域名

安装nginx

```bash
sudo rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
sudo yum install -y nginx
sudo systemctl start nginx.service
sudo systemctl enable nginx.service
```

配置nginx

```bash
#删除default.conf
rm -rf /etc/nginx/conf.d/default.conf
#添加新的conf
vi /etc/nginx/conf.d/xds.conf
```

添加配置代码

```bash
upstream nodejs{
    server 202.120.171.45:3000;
    keepalive 64;
}

server {
        listen 80;
        server_name tjjy.tongji.edu.cn;
        location / {
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host  $http_host;
            proxy_set_header X-Nginx-Proxy true;
            proxy_set_header Connection "";
            proxy_pass      http://nodejs;
        }
}
```