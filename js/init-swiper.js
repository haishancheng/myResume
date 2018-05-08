! function() {
    var view = document.querySelector('.mySlides')

    var controller = {
        view: null,
        swiper: null,
        swiperOptions: {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            },
            autoplay: {
                delay: 2000,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        },
        init: function(view) {
            this.view = view
            this.bindEvents()
            this.initSwiper()
        },
        bindEvents: function() {
            var _this = this
            this.view.onmouseenter = function() {
                _this.swiper.autoplay.stop();
            }
            this.view.onmouseleave = function() {
                _this.swiper.autoplay.start();
            }
        },
        initSwiper: function() {
            this.swiper = new Swiper(
                this.view.querySelector('.swiper-container'),
                this.swiperOptions)
        }
    }
    controller.init(view)
}()