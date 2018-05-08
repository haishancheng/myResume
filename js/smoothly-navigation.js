! function() {
  var view = document.querySelector('.topNavBar>nav')

  var controller = {
    view: null,
    aTags: null,
    init: function(view) {
      this.view = view
      this.aTags = this.view.querySelectorAll('ul > li > a')
      this.setupAnimationLoop()
      this.bindEvents()
    },
    bindEvents: function() {
      var _this = this
      this.aTags.forEach(function(element) {
        // 方法一：setInterval,时间固定，不好，滚动不同长度的时间一致会导致，长的滚起来特别快，短的滚起来特别慢
        // 方法二：使用tweenjs，速度固定
        element.onclick = function(event) {
          event.preventDefault();
          var href = event.currentTarget.getAttribute('href') //得到#siteAbout,直接event.currentTarget.href会得到浏览器自动加上的http
          var targetElement = document.querySelector(href)
          _this.scrollToElement(targetElement)
        }
      })
    },
    setupAnimationLoop: function() {
      // Setup the animation loop.
      function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
      }
      requestAnimationFrame(animate);
    },
    scrollToElement: function(element) {
      var elementOffsetTop = element.offsetTop
      var currentTop = window.scrollY //起始位置
      var targetTop = elementOffsetTop - 80 //结束位置
      var rate = (targetTop - currentTop) / 100 //距离为100px的几倍设定
      var t = Math.abs(rate * 300) //100px滚动0.3秒，几个100px就滚动几个0.3秒，从而实现匀速，并且向上滚动的时候rate为负数，t不能为负数
      if (t > 500) { t = 500 } //在最长不超过0.5s的时间内滚动到目的地，否则太长滚动的时间太长
      var coords = { y: currentTop }; // Start at (y:currentTop)
      var tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
        .to({ y: targetTop }, t) // Move to (y:targetTop)
        .easing(TWEEN.Easing.Quadratic.InOut) // Use an easing function to make the animation smooth.
        .onUpdate(function() { // Called after tween.js updates 'coords'.
          // 缓动触发scrollTo
          window.scrollTo(0, coords.y)
        })
        .start();
    }
  }

  controller.init(view)

}()