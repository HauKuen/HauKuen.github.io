---
title: windows下配置Oh My Posh
date: 2022-11-07 17:04:40
tags: 教程
categories: 教程
---

Oh My Posh允许用户使用颜色定义和呈现提示，从而允许使用终端的全彩色调色板。它提供了对现有主题的轻松定制或个性化主题的创建，范围从标准细分到自定义实现。配置可以从一个shell或机器无缝地转移到另一个shell或机器，从而确保无论用户在哪里工作都有一致的提示。

<!--more-->

### 安装oh-my-posh

使用winget安装
```powershell
winget install JanDeDobbeleer.OhMyPosh -s winget
```

使用scoop安装
```powershell
scoop install https://github.com/JanDeDobbeleer/oh-my-posh/releases/latest/download/oh-my-posh.json
```

普通安装
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://ohmyposh.dev/install.ps1'))
```
<br>
推荐使用scoop安装，如果没有scoop，也可以去Microsoft Store安装oh-my-posh。

### 下载一个字体
在管理员权限的命令行中输入以下指令，选择一个字体进行下载，如果频繁下载失败可以自行去网络搜索字体下载安装。
```powershell
oh-my-posh font install
```
安装字体后，需要配置 Windows 终端才能使用它。这可以通过修改Windows终端设置（默认快捷方式：CTRL + SHIFT + ，）打开settings.json 文件，在配置文件中的默认属性下添加 font.face 属性。
```json
{
    "profiles":
    {
        "defaults":
        {
            "font":
            {
                "face": "MesloLGM NF"
            }
        }
    }
}
```

### 更改命令行主题
一般来说windows下推荐使用powershell，所以在**powershell**中输入以下指令，提示没有文件则点击新建文件。
```powershell
notepad $PROFILE
```
在文件中输入
```text
oh-my-posh init pwsh | Invoke-Expression
```

添加之后，重新加载配置文件以使更改生效。
```powershell
. $PROFILE
```
做完以上步骤之后，就可以在powershell中使用oh-my-posh了。

### 更改主题

在powershell中输入以下指令，可以查看主题。
```powershell
Get-PoshThemes
```
在最底部有主题文件的位置，记录下你想修改的主题路径。

![我的主题路径](https://hiroshi-typota.oss-cn-chengdu.aliyuncs.com/img/image-20230222173103716.png)

以我的主题1_shell为例，输入指令修改文件
```powershell
notepad $profile
```
将之前的文件内容替换为以下内容便可以使用自己的主题了。
```text
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\1_shell.omp.json"。
```