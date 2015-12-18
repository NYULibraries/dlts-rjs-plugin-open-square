/**
 * @file CSS selectors used by DLTS plugin code
 */

define(
    ['jquery'], function ( $ ) {

        var DltsCss = {};

        DltsCss.Ids = {
            'NAVBAR_HOVER_DETECTION_WRAPPER' : 'dlts_app-navbar_hover-detection-wrapper'
        };

        DltsCss.Selectors = {
            'NAVBAR_HOVER_DETECTION_WRAPPER' : '#' + DltsCss.Ids.NAVBAR_HOVER_DETECTION_WRAPPER
        };

        Object.freeze( DltsCss.Selectors );
        Object.freeze( DltsCss );

        return DltsCss;
    }
);
