var resume = {
    init: function() {
        this.portfolio1 = document.getElementById('portfolio1')
        this.portfolio2 = document.getElementById('portfolio2')
        this.portfolio3 = document.getElementById('portfolio3')
        this.portfolioBar = document.getElementById('portfolioBar')
        this.topNavBar = document.querySelector('.topNavBar')
        this.liTags = document.querySelectorAll('.topNavBar>nav>ul>li')
        this.aTags = document.querySelectorAll('.topNavBar>nav>ul>li>a')
        this.subMenuLiTags = document.querySelectorAll('.topNavBar .subMenu li')
        this.specialTags = document.querySelectorAll('[data-x]') //滚动到对应位置需要高亮的标记
        //添加offset类
        this.specialTags.forEach(function(specialTag) {
            specialTag.classList.add('offset')
        })
        setTimeout(function() {
            this.findClosestToTopAndSetAnimation()
        }.bind(this), 0)

        this.bind()
    },
    bind: function() {
        var _this = this
        this.portfolio1.onclick = function() {
            _this.portfolioBar.className = "bar state-1"
        }
        this.portfolio2.onclick = function() {
            _this.portfolioBar.className = "bar state-2"
        }
        this.portfolio3.onclick = function() {
            _this.portfolioBar.className = "bar state-3"
        }

        window.onscroll = function() {
            if (window.scrollY > 0) {
                _this.topNavBar.className = "topNavBar sticky"
            } else {
                _this.topNavBar.className = "topNavBar"
            }
            _this.findClosestToTopAndSetAnimation()

        }
        this.liTags.forEach(function(element) {
            element.onmouseenter = function() {
                this.classList.add('active')
            }
            element.onmouseleave = function() {
                this.classList.remove('active')
            }
        })
        this.aTags.forEach(function(element) {
            // 方法一：时间固定，不好，滚动不同长度的时间一致会导致，长的滚起来特别快，短的滚起来特别慢
            // element.onclick = function(event) {
            //         event.preventDefault();
            //         var href = this.getAttribute('href') //得到#siteAbout,直接this.href会得到浏览器自动加上的http
            //         var targetElement = document.querySelector(href)
            //         var elementOffsetTop = targetElement.offsetTop

            //         var n = 25 //一个动多少次
            //         var duration = 500 / n //多长时间动一次
            //         var currentTop = window.scrollY //当前已滚动高度
            //         var targetTop = elementOffsetTop - 80 //需要滚动的高度
            //         var distance = (targetTop - currentTop) / n //每次滚动的距离
            //         var i = 1 //记录滚动次数
            //         var clock = setInterval(function() {
            //             console.log('n:', n)
            //             console.log('duration:', duration)
            //             console.log('currentTop:', currentTop)
            //             console.log('targetTop:', targetTop)
            //             console.log('distance:', distance)
            //             console.log('i:', i)
            //             window.scrollTo(0, currentTop + distance * i)
            //             console.log('realCurrentTop', currentTop + distance * i)
            //             i++;
            //             if (i === n + 1) {
            //                 clearInterval(clock)
            //                 return
            //             }
            //         }, duration)
            //     }

            // 方法二：使用tweenjs，速度固定
            element.onclick = function(event) {
                event.preventDefault();
                var href = this.getAttribute('href') //得到#siteAbout,直接this.href会得到浏览器自动加上的http
                var targetElement = document.querySelector(href)
                var elementOffsetTop = targetElement.offsetTop

                _this.setupAnimationLoop()
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
        })
    },
    //找到距离顶部最近的快，并设置块上划效果，以及滑到对应块右上角对应处高亮效果
    findClosestToTopAndSetAnimation() {
        //这是为了一开始指定元素向下位移100px的没有动画，然后向上位移有动画
        this.specialTags.forEach(function(specialTag) {
            specialTag.style.cssText += ';transition: all 0.5s;';
        })

        var minIndex = 0 //到顶部最近的元素的索引
        for (var i = 1; i < this.specialTags.length; i++) {
            if (Math.abs(this.specialTags[i].offsetTop - window.scrollY) < Math.abs(this.specialTags[minIndex].offsetTop - window.scrollY)) {
                minIndex = i
            }
        }
        //滑动到对应块去除offset类，从而展现上移动画
        this.specialTags[minIndex].classList.remove('offset')

        //滚动到对应位置a元素下面加上高亮
        this.aTags.forEach(function(a) {
            a.classList.remove('highLight')
        })
        var id = this.specialTags[minIndex].id
        var a = document.querySelector('a[href="#' + id + '"]')
        a.classList.add('highLight')
    },
    setupAnimationLoop: function() {
        // Setup the animation loop.
        function animate(time) {
            requestAnimationFrame(animate);
            TWEEN.update(time);
        }
        requestAnimationFrame(animate);
    }
}
window.onload = function() {
    document.getElementById('site-welcome').className = "site-welcome"
    resume.init()
}