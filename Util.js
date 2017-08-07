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

        // Copied from Readium Helpers module in readium-shared-js/js/helpers.js,
        // with some code style changes.
        // Haven't seen documentation stating that Helpers is meant for plugin
        // writers to use, and in any case don't know how stable its API is.
        // Safer to just copy it here.
        Util.getURLQueryParams = function() {
            var params = {},
                query = window.location.search,
                x,
                keyParams, keyVal;

            if ( query && query.length ) {
                query = query.substring( 1 );
                keyParams = query.split( '&' );
                for ( x = 0; x < keyParams.length; x++ ) {
                    keyVal = keyParams[ x ].split( '=' );
                    if ( keyVal.length > 1 ) {
                        params[ keyVal[ 0 ] ] = decodeURIComponent( keyVal[ 1 ] );
                    }
                }
            }

            return params;
        };

        Object.freeze( Util );

        return Util;
    }
);
