---
title: 吐槽一次配node犯的抽象错误
date: 2024-01-22 01:29:45
tags: node
categories: 碎碎念
---

今晚翻了一下 hexo 的依赖发现已经有几个出了新版本，那自然是顺手 ``npm update`` 敲下去运行，结果报错满屏乱飞，翻到最上面发现报错是

```
npm ERR! code ERR_INVALID_URL
npm ERR! Invalid URL
```

<br>看到 ``Invalid URL`` 我第一反应就是配的淘宝源又出问题了，因为22年淘宝就切过一次域名了，但是访问了一下域名是没有变的，这下就开始了坐牢之旅。

首先是根据 npm 的提示去查看 log，打开文件一看 120 行整，自然是想也不想的丢给了 GPT，GPT 回复说 log 报错的只有一行

```
108 verbose stack TypeError [ERR_INVALID_URL]: Invalid URL
```

<br>我寻思着这个 log 和 terminal 讲的不是在脱裤子放屁，于是就直接去 Google 了，搜出来的方法有清除缓存、升级降级npm等等。我挨个尝试但报错都是这个样子一点不变，最后甚至连 nvm 都重装了一遍还是这样，经过多番尝试时间都过去快一小时了。最后我突然灵机一动觉得GPT不会在骗我吧，毕竟前几天才看了个AI在真消息里掺部分假来制作假新闻的视频。

遂立马打开 log 文件逐行阅读，果然发现 GPT 给的有问题，有问题的报错其实是

```
108 verbose stack TypeError [ERR_INVALID_URL]: Invalid URL
108 verbose stack     at new NodeError (node:internal/errors:387:5)
108 verbose stack     at URL.onParseError (node:internal/url:565:9)
108 verbose stack     at new URL (node:internal/url:641:5)
108 verbose stack     at getProxyUri 
```

<br>

这下很明显就能看出是因为 proxy 配置问题导致 parser 解析失败，然而 GPT 只给我展示了第一行没有多大价值的 log。

使用``npm config ls -l``来列出 npm 的所有配置在最后几行发现代理配置

```
proxy = "127.0.0.1:7890"
```

<br>

剩下自然不必多说，问题就出在没有写协议类型。

看一眼时间已是凌晨两点，就是这么个很蠢的问题折腾了我一个小时，着实令人哭笑不得（orz。

事后反思一下犯这次错误主要有两个方面：

1. 太过于依赖 GPT，对于这种行数不算多的 log 还是犯了懒没去看导致浪费了更多的时间，这点必须谨记于心。
2. 上次在本地配置和使用 npm 已经过去挺长的一段时间，确实对此事一点印象都没有，看到 Invalid URL 后一点往代理上靠的想法都没有，熬夜写篇文当做小小的惩罚。
