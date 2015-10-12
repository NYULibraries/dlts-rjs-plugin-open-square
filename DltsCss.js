/**
 * @file CSS selectors used by DLTS plugin code
 */

define(
    ['jquery'], function ( $ ) {

        var DltsCss = {};

        DltsCss.selectors = {
            'NAVBAR_HOVER_DETECTION_WRAPPER' : '#app-navbar_hover-detection-wrapper'
        };

        Object.freeze( DltsCss.selectors )
        Object.freeze( DltsCss );

        return DltsCss;
    }
);
