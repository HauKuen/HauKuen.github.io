---
title: 通过 Hexo 5 注入器为页面添加新功能
date: 2023-11-27 15:14:29
tags: [教程,Hexo]
categories: 教程
---

## Hexo 注入器

注入器被用于将静态代码片段注入生成的 HTML 的 `<head>` 和 `<body>` 中。Hexo 将在 `after_render:html` 过滤器 **之前** 完成注入。

编写注入代码，需要在博客的根目录下创建 `scripts` 文件夹，然后在里面任意命名创建一个 js 文件即可。

<!--more-->

## 概要

```
hexo.extend.injector.register(entry, value, to)
```

### entry `<string>`

代码片段注入的位置，接受以下值：

- `head_begin`: 注入在 `<head>` 之后（默认）
- `head_end`: 注入在 `</head>` 之前
- `body_begin`: 注入在 `<body>` 之后
- `body_end`: 注入在 `</body>` 之前

### value `<string> | <Function>`

> 除了字符串，也支持返回值为字符串的函数

需要注入的代码片段。

### to `<string>`

需要注入代码片段的页面类型，接受以下值：

- `default`: 注入到每个页面（默认值）
- `home`: 只注入到主页（`is_home()` 为 `true` 的页面）
- `post`: 只注入到文章页面（`is_post()` 为 `true` 的页面）
- `page`: 只注入到独立页面（`is_page()` 为 `true` 的页面）
- `archive`: 只注入到归档页面（`is_archive()` 为 `true` 的页面）
- `category`: 只注入到分类页面（`is_category()` 为 `true` 的页面）
- `tag`: 只注入到标签页面（`is_tag()` 为 `true` 的页面）
- 或是其他自定义 layout 名称，例如在 Fluid 主题中 `about` 对应关于页、`links` 对应友联页，自定义 layout 参见 [写作 - 布局（Layout）](https://hexo.io/zh-cn/docs/writing#布局（Layout）)



## 示例

### 文章时效性提示

Fluid 社区提供了根据文章发布时间来为文章开头插入一条提示的注入代码，这条代码全主题通用。

```javascript
hexo.extend.injector.register('body_end', `
<script type="text/javascript">
(function() {
  var times = document.getElementsByTagName('time');
  if (times.length === 0) { return; }
  var posts = document.getElementsByClassName('post-content');
  if (posts.length === 0) { return; }

  var pubTime = new Date(times[0].dateTime);  /* 文章发布时间戳 */
  var now = Date.now()  /* 当前时间戳 */
  var interval = parseInt(now - pubTime)
  /* 发布时间超过指定时间（毫秒） */
  if (interval > 3600*24*30*1000){
    var days = parseInt(interval / 86400000)
    posts[0].innerHTML = '<div class="note note-warning" style="font-size:0.9rem"><p>' +
      '<div class="h6">文章时效性提示</div><p>这是一篇发布于 ' + days + ' 天前的文章，部分信息可能已发生改变，请注意甄别。' +
      '</p></p></div>' + posts[0].innerHTML;
  }
})();
</script>
`);
```



但是某些技术性文章作者或许会持续更新，这种情况下判断更新时间就会更好，所以我编写了根据文章更新时间判断时效性的代码。

注意：更新时间的获取代码或许仅支持 ``Fluid`` 主题。

```javascript
hexo.extend.injector.register('body_end', `
<script type="text/javascript">
(function() {
  var metaElement = document.querySelector('meta[property="article:modified_time"]');
  if (metaElement) {
    var modifiedTime = metaElement.getAttribute('content');
    var articleDate = new Date(modifiedTime);
    var currentDate = new Date();

    var posts = document.getElementsByClassName('post-content');
    if (posts.length === 0) {
      return;
    }

    // 计算时间差，单位为毫秒
    var timeDifference = currentDate - articleDate;

    // 一年的毫秒数
    var oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;

    if (timeDifference > oneYearInMilliseconds) {
      var daysSinceUpdate = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
      posts[0].innerHTML = '<div class="note note-warning" style="font-size:0.9rem"><p>' +
        '<div class="h6">文章时效性提示</div><p>这是一篇更新于 ' + daysSinceUpdate + ' 天前的文章，部分信息可能已经有所发展或是发生改变。' +
        '</p></p></div>' + posts[0].innerHTML;
    }
  }
})();
</script>
`);
```







## 致谢

感谢 Hexo 细致的 [文档教程](https://hexo.io/zh-cn/api/injector.html)

感谢 Fluid 社区的示例代码和[文章教程](https://hexo.fluid-dev.com/posts/hexo-injector/)，这给了我很大的启发。
