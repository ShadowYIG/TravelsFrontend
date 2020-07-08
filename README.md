
# WEB旅游推荐网站说明


| CreateTime： | 2020-7-23 |
| ------------ | --------- |
| author:      | ShadowY   |

## 网站架构

* 前端：Vue.js+Vue Router+Vuex
* 前端打包：webpack
* 后端：laravel
* 前后端交互：GraphQL+Vue Apollo

## 所需环境

* 前端
    node: >= 6.0.0
    npm: >= 3.0.0
* 后端
    php7
    mysql>= 5.7.*

## 配置方式

### 方式一：无需修改源码

默认前端请求后端的链接为127.0.0.8:9910，建议将后端php环境的host设置为此地址无需修改代码文件

### 方式二：需要修改源代码

前端文件中TravelsFrontend/src/vue-apollo.js 第16行修改为   
你的地址/graphql

前端文件中TravelsFrontend/api/global_variable.js 第2行修改为
你的地址（注意后面保留斜杠）

## 构建方式

### 开发者模式：

前端目录下运行终端命令
npm run dev

### 生产模式：

前端目录下运行终端命令
npm run build

### 如何运行

#### 前端：

先构建后运行

#### 后端：

后端将网站根目录设置到TravelsServer/public下
修改TravelsServer/.env文件9-14行的数据库配置

## 项目结构

TravelsFrontend为前端文件夹
		 build文件夹为我编译构建后的前端文件，内部index可直接运行
		 api文件夹下global_variable.js为全局变量
		 components文件夹为组件文件，里面是每个页面的每一小块
		 views为页面
TravelsServer为后端文件夹
		 graphql为查询和操作的设置文件
		 app/GraphQL为graphql执行与处理文件
		 app根目录下的php为数据库设置文件
		 database文件夹下所有文件为数据库设置文件
数据库
		 downloadfile表：下载临时链接的存储
		 introduction表：攻略数据
		 scenic表：景点数据
		 travels表：游记数据
		 users表：用户数据
		 travel_imgs:游记图片
		 public_img_lists:全局图片
		 scenic_img_lists:景点突破
		 migrations表：php数据库迁移记录文件
		 oauth前缀均用于登陆注册管理等的token存储
# 该部分为网站后端，后端链接：https://github.com/ShadowYIG/TravelsServer
