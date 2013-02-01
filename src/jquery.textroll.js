/**
 * jQuery textroll v0.1
 * jquery plugin for rolling text in sentence.
 *
 * Copyright 2012 Alexandre Kirillov
 * alexandre.kirillov@gmail.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Data: 2012/06/21
 */

(function($, window, document, undefined) {

    $.fn.textroll = function(options)
    {
        var opt = $.extend( {}, $.fn.textroll.options, options );

        // --- main
        return this.each(function(){
            var $this     = $(this),
                $children = $this.children(),
                baseH     = $($children[0]).height(),
                dir       = opt.isMotionUp ? 1 : -1,
                maxWidth  = [],
                maxIndex,
                currentIndex = 0;

            // --- PREPARE CONTENT ---
            $children.hide();
            $($children[0]).show();

            //add clone of item to the bottom of the list.
            $this.append( $($children[0]).clone() );

            $children = $this.children();
            maxIndex  = $children.size() - 1;

            // --- css settings ---
            // set wrap css.
            $this.css({
                display   : 'inline-block',
                overflow  : 'hidden',
                position  : 'relative',
                height    : $($children[0]).outerHeight() +'px',
                lineHeight: $($children[0]).outerHeight() +'px'
            });

            // layout items.
            if ( opt.isMotionUp ) {
                $children.each(function(i){
                    $(this).css({
                        top: dir * baseH * i +'px',
                        position: 'absolute'
                    });
                    maxWidth.push( $(this).outerWidth() );
                });
            }
            else {
                $children.each(function(i){
                    $(this).css({
                        top: baseH * (maxIndex - i) +'px',
                        position: 'absolute'
                    });
                    maxWidth.push( $(this).outerWidth() );
                });
                $this.scrollTop( baseH * maxIndex );
            }

            $this.width( Math.max.apply(null, maxWidth) );

            // --- MOTION METHODS ---

            $children.show();

            // core motion.
            var motion = function() {

                if ( ++currentIndex % (maxIndex+1) === 0 ) {
                    if ( opt.isMotionUp ) {
                        $this.scrollTop( 0 );
                    }
                    else {
                        $this.scrollTop(baseH * maxIndex);
                    }
                    motion();
                    return;
                }

                $this
                    //.css({width: $($children[currentIndex]).width() + 4 +'px'})
                    .stop(true,false)
                    .animate({ scrollTop: '+='+ dir * baseH +'px' }, opt.speed, opt.easing);

                setTimeout( motion, opt.delay + opt.speed );
            };
            setTimeout(motion, opt.delay + opt.speed);

        });
    };

    // options
    $.fn.textroll.options = {
        speed: 600,
        delay: 1000,
        isMotionUp: true,
        easing: 'linear'
    };

})( jQuery, window, document );