var resume = {
  init: function() {
    this.portfolio1 = document.getElementById('portfolio1')
    this.portfolio2 = document.getElementById('portfolio2')
    this.portfolio3 = document.getElementById('portfolio3')
    this.portfolioBar = document.getElementById('portfolioBar')
    this.topNavBar = document.querySelector('.topNavBar')
    this.liTags = document.querySelectorAll('.topNavBar>nav>ul>li')
    this.subMenuLiTags = document.querySelectorAll('.topNavBar .subMenu li')

    this.bind()
  },
  bind: function() {
    var _this = this

    this.liTags.forEach(function(element) {
      element.onmouseenter = function() {
        this.classList.add('active')
      }
      element.onmouseleave = function() {
        this.classList.remove('active')
      }
    })

  }

}

// document.addEventListener("DOMContentLoaded", function(event) {
//     document.getElementById('site-welcome').className = "site-welcome"
//     resume.init()
// })
document.getElementById('site-welcome').className = "site-welcome"
resume.init()