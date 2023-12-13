---
title: oh-my-zsh自用配置记录
date: 2023-11-21 22:06:56
tags:
categories:
---

Zsh（Z Shell）是一个在Unix/Linux操作系统中的命令行解释器，相比于Bash（Bourne Again Shell），Zsh具有更强大的自动补全、丰富的插件和主题生态系统、高级历史记录、更多的参数替换选项、灵活的数组处理和强大的调试功能。

<!--more-->

## 安装zsh

以我用过的OS举例  

Ubuntu:

```text
sudo apt-get install zsh
```



Arch Linux:

```text
sudo pacman -S zsh
```



安装好后运行``chsh -s /bin/zsh``设置zsh为默认shell，如果遇到极为特殊的情况zsh不在此路径下（~~真的有吗？~~  2023.12.12记，还真给我遇见了，今天配一个新arch机器的时候不知道为什么第一个命令不生效），可以使用``which zsh``来确定zsh的路径，然后在命令中进行替换，或者直接使用``chsh -s $(which zsh)``命令进行设置。



## 下载oh-my-zsh

1、使用curl安装

```text
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```



2、使用wget安装

```text
sh -c "$(wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
```



如果是国内机有墙的话可以使用使用Static CDN提供的反代服务。将 ``raw.githubusercontent.com`` 换成``raw.staticdn.net``即可加速（截止2023.11.22仍可加速）



### 插件推荐

oh-my-zsh同样有很多自带插件在``~/.oh-my-zsh/plugins``里，默认只启用了git，这里推荐部分我比较喜欢用的插件，非自带插件会指明下载地址，未说明则均为自带插件无需下载。

#### 1、Z

Z 插件是一个用于快速跳转到最常用目录的插件。它通过记忆和分析用户在命令行中的行为来确定用户最常访问的目录，并允许用户使用简短的别名快速切换到这些目录。Z 插件会记住用户经常访问的目录，并根据用户的行为进行排序。这样，当用户想要切换到某个目录时，只需键入与该目录相关的部分名称，Z 插件就会智能地补全并跳转到匹配的目录。

![示例](https://hiroshi-typota.oss-cn-chengdu.aliyuncs.com/img/oh-my-zsh%E8%87%AA%E7%94%A8%E9%85%8D%E7%BD%AE%E8%AE%B0%E5%BD%952.png)

**用法：z 目录名称**

同时如果文件目录前缀没有重复的话，可以使用**正则表达式**匹配或者直接简写，上图示例则可以写为 **z the** 也能跳转到themes文件夹下。如果是第一次跳转对结果不明确，也可以在命令输入完成后按下tab键，此时会z插件会自动显示完整路径以便确认。

启用方式：

在 ``.zshrc`` 文件里找到plugins=(xxxx)数组 ,在括号里面加上插件名即可。例如：**plugins=(git z 插件A 插件B xxxx)** ，添加后记得执行 ``source ~/.zshrc``。



#### 2、extract

extract 插件定义了一个名为 `extract` 的函数，用于解压缩你传递给它的文件，并支持多种存储文件类型。

**用法：extract 文件名称**

这样一来，你就不需要知道具体的解压缩命令，只需执行 `extract <filename>` 就可以解压大部分常见文件，支持文件扩展名点[这里](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/extract)查看

> PS: 直接输入``x 文件名``也能解压，不需要输入完整函数名，非常方便！



#### 3、zsh-syntax-highlighting

这个插件为 zsh 提供语法高亮功能。它可以在用户在交互式终端的 zsh 提示符中输入命令时进行高亮显示。这有助于在运行命令之前审查命令，特别是在捕捉语法错误方面。

即使在命令输入过程中，这个插件也能对命令进行高亮显示，使用户能够更清晰地看到命令的结构和语法。这对于编写复杂的命令或避免常见的语法错误非常有帮助。

![命令错误则会显示红色](https://hiroshi-typota.oss-cn-chengdu.aliyuncs.com/img/oh-my-zsh%E8%87%AA%E7%94%A8%E9%85%8D%E7%BD%AE%E8%AE%B0%E5%BD%953.png)



#### 4、colored-man-pages

这个插件为手册添加了颜色，在查阅手册时更加的清晰明了。



![启用前](https://hiroshi-typota.oss-cn-chengdu.aliyuncs.com/img/oh-my-zsh%E8%87%AA%E7%94%A8%E9%85%8D%E7%BD%AE%E8%AE%B0%E5%BD%954.png)



![启用后](https://hiroshi-typota.oss-cn-chengdu.aliyuncs.com/img/oh-my-zsh%E8%87%AA%E7%94%A8%E9%85%8D%E7%BD%AE%E8%AE%B0%E5%BD%955.png)

您也可以尝试在其他页面上涂色，方法是在相应的命令前面加上``colored``

```text
colored git help clone
```

