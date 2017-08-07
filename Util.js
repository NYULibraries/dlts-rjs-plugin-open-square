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

        // Util.CustomEvent below is based on webmodules / custom-event v1.0.1:
        https://raw.githubusercontent.com/webmodules/custom-event/725c41146f970df345d57cd97b2bf5acd6c8e9f7/index.js

        var NativeCustomEvent = window.CustomEvent;

        function useNative() {
            try {
                var p = new NativeCustomEvent( 'cat', { detail : { foo : 'bar' } } );
                return 'cat' === p.type && 'bar' === p.detail.foo;
            } catch ( e ) {
            }
            return false;
        }

        Util.CustomEvent = useNative() ? NativeCustomEvent :

           (
            // IE >= 9?
            'undefined' !== typeof document && 'function' === typeof document.createEvent ?

                function ( type, params ) {
                    var e = document.createEvent( 'CustomEvent' );
                    if ( params ) {
                        e.initCustomEvent( type, params.bubbles, params.cancelable, params.detail );
                    } else {
                        e.initCustomEvent( type, false, false, void 0 );
                    }
                    return e;
                }

            // IE <= 8?
            :

                function ( type, params ) {
                    var e = document.createEventObject();
                    e.type = type;
                    if ( params ) {
                        e.bubbles    = Boolean( params.bubbles );
                        e.cancelable = Boolean( params.cancelable );
                        e.detail     = params.detail;
                    } else {
                        e.bubbles    = false;
                        e.cancelable = false;
                        e.detail     = void 0;
                    }
                    return e;
                }
           );

        Object.freeze( Util );

        return Util;
    }
);
