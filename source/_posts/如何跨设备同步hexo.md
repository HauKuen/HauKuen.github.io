---
title: 如何跨设备同步hexo
date: 2024-01-22 17:15:18
tags: [hexo,Git]
categories: 教程
---
## 前言

``hexo-deployer-git`` 插件虽然能把静态资源托管在github，但是插件只能备份生成出来的网站文件，不能备份本地的源码文件，因此我选择手动将源码文件同步到github以此来跨设备使用。
<!--more-->
虽然已经有人为此写了一款插件 ``hexo-git-backup`` 但是经过我的实测这个插件对主题的备份有bug，翻看 issue 发现这个问题2016年就提出来了，维护者已经放弃了维护，而且根据项目介绍使用此插件会删除主题文件夹的 ``.git`` 文件夹，后续无法更新主题，权衡之下还是选择手动同步，日后有空或许会自己开发一个备份插件。

## 备份

**注意：因为懒得新开个仓库所以我就直接在io仓库开了个分支进行备份，如果配置文件涉及到隐私请自行新建 private 仓库**

把博客根目录初始化成 git 仓库，然后配好 ignore 文件,我的配置如下
```
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
```
只要别上传 ``node_modules`` 和 ``.deploy_git`` 这俩文件夹就行。
重点是 ``themes`` 文件夹的处理，因为主题是从别人的仓库拉取的，所以不能直接上传到我们的仓库，这里要把主题配置成子模块。
```
git submodule add 子项目url 子项目在本地的路径
```

用 ``git submodule`` 查看是否正确
```
$ git submodule
 85add1e141d3bb6663a0bc296a6c9646xxxxxxxx themes/hexo-theme-fluid
```

## 拉取

虽然拉取可以用 ``git clone <URL> --recursive `` 一次性递归克隆整个项目，但是以前经常遇见克隆一些大型项目子模块失败，后面就慢慢养成分步克隆的习惯了。

1. 拉取主项目
2. 初始化子模块
```
git submodule init
```
3. 更新子模块
```
git submodule update
```
这样所有文件就拉取下来了。