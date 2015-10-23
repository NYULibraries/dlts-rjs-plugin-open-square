/**
 * @file Utility functions
 */

define(
    ['jquery'], function ( $ ) {

        var Util = {};

        // We might not be taking into account IE:
        // http://ctrlq.org/code/19616-detect-touch-screen-javascript
        // But at the moment we don't consider IE a priority.
        Util.isTouchDevice = function() {
            // From Modernizr
            // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
            return (
                       'ontouchstart' in window ||
                       ( window.DocumentTouch && document instanceof DocumentTouch )
            );
        };

        Object.freeze( Util );

        return Util;
    }
);
