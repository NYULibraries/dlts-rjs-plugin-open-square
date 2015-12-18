/**
 * @file Utility functions
 */

define(
    ['jquery'], function ( $ ) {

        var Util = {};

        Util.isTouchDevice = function() {
            // From Modernizr
            // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js

            // Note that besides the detection below Modernizer does another test
            // that involves attempting to inject an element with certain style
            // rules and checking to see if it succeeds.  We are not using that
            // part and at the moment are avoiding dragging Modernizr in as a
            // dependency for this because there might already be a timing issue
            // with flickering elements.

            // Note that our minimal test probably won't work for IE,
            // but at the moment we don't consider IE a priority.
            return (
                       'ontouchstart' in window ||
                       ( window.DocumentTouch && document instanceof DocumentTouch )
            );
        };

        Object.freeze( Util );

        return Util;
    }
);
