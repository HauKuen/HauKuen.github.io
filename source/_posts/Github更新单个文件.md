---
title: Github更新单个文件
date: 2023-02-21 22:17:15
tags:
categories:
---

使用`git fetch`命令从远程仓库获取最新的变更，但不会自动合并到本地分支。

```
git fetch origin
```

使用`git checkout`命令切换到你想更新的本地分支。

```
git checkout <branch-name>
```

使用`git checkout`命令将远程仓库中的指定文件覆盖到你的本地工作区。

```
git checkout origin/<branch-name> -- <path/to/file>
```

在上面的命令中，将`<branch-name>`替换为远程仓库中包含要更新文件的分支名称，将`<path/to/file>`替换为文件的路径和名称。
例如，如果要更新`main`分支上的`src/example.js`文件，命令将如下所示：
```
git checkout origin/main -- src/example.js
# 这将覆盖本地的 src/example.js 文件，使其与远程仓库中的最新版本一致。
```
