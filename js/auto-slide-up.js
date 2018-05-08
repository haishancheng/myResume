! function() {
  var specialTags = document.querySelectorAll('[data-x]') //滚动到对应位置需要上滑的块

  // 添加offset类,初始先向下偏移
  specialTags.forEach(function(specialTag) {
    specialTag.classList.add('offset')
  })
  setTimeout(function() {
    findClosestToTopAndSetAnimation()
  }, 0)

  window.addEventListener('scroll', function() {
    findClosestToTopAndSetAnimation()
  })

  //找到距离顶部最近的快，并设置块上划效果，以及滑到对应块右上角对应处高亮效果
  function findClosestToTopAndSetAnimation() {
    //这是为了一开始指定元素向下位移100px的没有动画，然后向上位移有动画
    specialTags.forEach(function(specialTag) {
      specialTag.style.cssText += ';transition: all 0.5s;';
    })

    var minIndex = 0 //到顶部最近的元素的索引
    for (var i = 1; i < specialTags.length; i++) {
      if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
        minIndex = i
      }
    }
    //滑动到对应块去除offset类，从而展现上移动画
    specialTags[minIndex].classList.remove('offset')
    let aTags = document.querySelectorAll('.topNavBar>nav>ul>li>a')
      //滚动到对应位置a元素下面加上高亮
    aTags.forEach(function(a) {
      a.classList.remove('highLight')
    })
    var id = specialTags[minIndex].id
    var a = document.querySelector('a[href="#' + id + '"]')
    a.classList.add('highLight')
  }
}()