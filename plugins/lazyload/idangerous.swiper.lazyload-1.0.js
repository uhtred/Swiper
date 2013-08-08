Swiper.prototype.plugins.lazyload = function( swiper, params ) {

    var defaults = {
            /*
                adjacent = quantity prev + quantity next
                next = prev = quantity
            */
            direction: 'adjacent', // 'adjacent', 'next' or 'prev'
            quantity: 2,
            onLoad: fadeInImage
        },
        hooks = {},
        rangeStart = 0,
        rangeEnd = 0;

    params = $.extend({}, defaults, params || {});

    function fadeInImage( $item ){
        $item.fadeIn('slow');
    }

    function loadImage( $item ) {
        var img = new Image();

        img.addEventListener('load', function() {

            $item
                .prop('src', this.src )
                .addClass('loaded')
                .removeAttr('data-src')
                .data('src', null);

            params.onLoad( $item );

        }, false);

        img.src = $item.data('src');
    }

    function loadImages( rangeStart, rangeEnd ) {
        var $toLoad = $(swiper.slides.slice(rangeStart, rangeEnd + 1)).find('img[data-src]');

        if( $toLoad.length ) {
            $toLoad.each(function(){
                loadImage( $(this) );
            });
        }

    }

    function lazyLoad() {
        var img = [],
            $item = [];

        if( params.direction === 'adjacent' ) {
            rangeStart = swiper.activeIndex - params.quantity;
            rangeEnd = swiper.activeIndex + params.quantity;
        }

        loadImages( Math.max( 0, rangeStart ), rangeEnd );

    }

    //Plugin Hooks
    hooks = {
        onFirstInit: function(){
            lazyLoad();
        },
        onSlideChangeEnd: function(){
            lazyLoad();
        }
    };

    return hooks;
};