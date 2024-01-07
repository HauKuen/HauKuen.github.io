---
title: Hexo-GitHub搭建教程
date: 2022-10-16 15:56:22
tags: [教程,GitHub,Hexo]
categories: 教程
---

#### 注意事项

默认已有git基础且本机已连接GitHub



#### 1.创建GitHub Pages 仓库

- 在GitHub主页右上角点击+号，再点击New repository创建仓库。
- 接着在Repository name内输入[你的用户名].github.io
- 点击Create repository就创建成功

创建成功后博客地址为：`https://[你的用户名].github.io`

#### 2.本地安装Hexo程序

- 安装 [Node.js](https://nodejs.org/en) ,一路next即可


- 使用指令`npm install -g hexo-cli`安装 ,mac用户需要在指令前加上`sudo`,这一步请耐心等待

- 在本地新建一个用于存放博客文件的文件夹，例如blog文件夹，在此文件夹进入Git Bash
- 初始化博客文件并安装组件

```text
hexo init      	# 初始化
npm install    	# 安装组件
```



- 完成后便可以在本地进行预览了，启动预览后修改文章内容不需要重新生成页面，保持预览即可，hexo会持续监听文件变化。

```tex
hexo g       # 生成页面  
hexo s       # 启动预览
```

- 在浏览器中输入`localhost:4000`进行预览，出现Hexo的默认页面则本地博客安装成功！
- 如果无法预览则可能是端口被占用，可以找出占用端口的程序并关闭，或者也可以修改Hexo启动的端口,这里改为5000端口

```text
hexo s -p 5000
```





#### 3.部署 Hexo 到 GitHub Pages

- 安装 hexo-deployer-git

```text
npm install hexo-deployer-git --save
```

- 修改<b>_config.yml</b>文件末尾的 Deployment 部分，修改成如下

```text
deploy:
  type: git
  repository: git@github.com:用户名/用户名.github.io.git
  branch: master
```

- 运行`hexo d`部署网站，成功后便可以在`https://用户名.github.io`看到自己的博客了



***



### 报错记录

####  Permission denied. You can't use port 4000.

原因尚未查明，虽然提示的是权限不足，但是切换管理员依旧无法在4000端口跑服务，查看端口占用也没有别的服务在使用4000，修改hexo端口就能正常跑起来，触发时就先暂时先手动指定端口使用。

> hexo s -p 5000



突然发现NAT服务可能对端口有影响，所以启停一下NAT就恢复正常了，所以是为什么呢？



更新中······