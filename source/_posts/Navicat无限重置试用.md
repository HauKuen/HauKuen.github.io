---
title: Navicat无限重置试用
date: 2023-01-05 18:24:45
tags: 教程
categories: 教程
---

使用清除注册表方法来达到无限试用Navicat Premium 16的效果，bat文件如下。可以设置定时任务来自动进行注册表清除。
<!--more-->
```
@echo off
​
echo Delete HKEY_CURRENT_USER\Software\PremiumSoft\NavicatPremium\Registration[version and language]
for /f %%i in ('"REG QUERY "HKEY_CURRENT_USER\Software\PremiumSoft\NavicatPremium" /s | findstr /L Registration"') do (
    reg delete %%i /va /f
)
echo.
​
echo Delete Info folder under HKEY_CURRENT_USER\Software\Classes\CLSID
for /f %%i in ('"REG QUERY "HKEY_CURRENT_USER\Software\Classes\CLSID" /s | findstr /E Info"') do (
    reg delete %%i /va /f
)
echo.
​
echo Finish
​
pause
```
