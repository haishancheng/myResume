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
        console.log(this.aTags)
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
            element.onclick = function(event) {
                event.preventDefault();
                var href = this.getAttribute('href') //得到#siteAbout,直接this.href会得到浏览器自动加上的http
                var element = document.querySelector(href)
                var elementOffsetTop = element.offsetTop
                window.scrollTo(0, elementOffsetTop - 80)
            }
        })
    }
}
window.onload = function() {
    document.getElementById('site-welcome').className = "site-welcome"
    resume.init()
}