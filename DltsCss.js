/**
 * @file CSS selectors used by DLTS plugin code
 */

define(
    ['jquery'], function ( $ ) {

        var DltsCss = {};

        DltsCss.Selectors = {
            'NAVBAR_HOVER_DETECTION_WRAPPER' : '#app-navbar_hover-detection-wrapper'
        };

        Object.freeze( DltsCss.Selectors )
        Object.freeze( DltsCss );

        return DltsCss;
    }
);
