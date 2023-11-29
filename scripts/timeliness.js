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