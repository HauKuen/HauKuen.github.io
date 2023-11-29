---
title: HTML笔记
date: 2022-10-24 19:58:31
tags: 学习
categories: 学习
---

记录一下上课学的html

<!--more-->

**p**元素

```html
<!--定义了html文档的段落-->
<p>这是第一个段落。</p>
```



**body**元素

```html
<!--<body> 元素定义了 HTML 文档的主体-->
<body>
<p>这是第一个段落。</p>
</body>
```



**html**元素

```html
<html>

<body>
    <p>这是第一个段落。</p>
</body>

</html>
```



**html标题**

```html
<!--定义了html文档的标题-->
<h1>这是一个标题。</h1>
<h2>这是一个标题。</h2>
<h3>这是一个标题。</h3>
```

tips:不要仅仅是为了生成**粗体**或**大号**的文本而使用标题。



**html水平线**

```html
<p>这是一个段落。</p>
<hr>
<p>这是一个段落。</p>
<hr>
<p>这是一个段落。</p>
```



**html注释**

```html
<!-- 这是一个注释 -->
```



**html超链接**

```html
<a href="url">显示文本</a>
<!--target属性-->
<!--_blank表示会在新窗口打开链接-->
<a href="https://www.bilibili.com/" target="_blank">bilibili</a>
<!--_self表示会在本窗口打开链接-->
<a href="https://www.bilibili.com/" target="_self">bilibili</a>
```



**head**元素

```
<head> 元素包含了所有的头部标签元素。在 <head>元素中你可以插入脚本（scripts）, 样式文件（CSS），及各种meta信息。

可以添加在头部区域的元素标签为: <title>, <style>, <meta>, <link>, <script>, <noscript> 和 <base>。
```

实例

```html
<!DOCTYPE html>
<html>
<head> 
<meta charset="utf-8"> 
<title>文档标题</title>
</head>
 
<body>
文档内容......
</body>
 
</html>
```



**base**元素

```html
<!--<base> 标签描述了基本的链接地址/链接目标，该标签作为HTML文档中所有的链接标签的默认链接-->
<head>
	<base href="http://www.exusiai.top/" target="_blank">
</head>
```







