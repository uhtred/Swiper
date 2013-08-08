Swiper.prototype.plugins.magazine = function(swiper, params){

    var defaults = {
        centerCover: true
    },
    hooks = {};

    params = $.extend({}, defaults, params || {});

    function centerCover(){
        swiper.slides[0].style.width = swiper.width + 'px';
    }

    function correctCoverSwipe( params ) {
        if( swiper.params.slidesPerView === 1 && swiper.params.slidesPerGroup === 1 ) {
            return false;
        }

        if( params.index === 1 ) {
            swiper.indexSwipeTo = params.index+1;
        }
    }

    //Plugin Hooks
    hooks = {
        onInit : function(){
            if( params.centerCover ) {
                $(swiper.slides[0]).addClass('swiper-slide-cover');
                centerCover();
            }
        },
        onSlideChangeStart: function(){

            if( swiper.indexSwipeTo === 1 ) {
                swiper.activeIndex = swiper.indexSwipeTo;
            }
        },
        onSwipeTo: function( params ) {
            correctCoverSwipe( params );
        }
    };

    return hooks;
};