var resume = {
    init: function() {
        this.portfolio1 = document.getElementById('portfolio1')
        this.portfolio2 = document.getElementById('portfolio2')
        this.portfolio3 = document.getElementById('portfolio3')
        this.portfolioBar = document.getElementById('portfolioBar')
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
    }

}
window.onload = function() {
    document.getElementById('site-welcome').className = "site-welcome"
    resume.init()
}