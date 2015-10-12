/**
 * @file CSS selectors used in ReadiumJS project(s) core code
 */

define(
    ['jquery'], function ( $ ) {

        var ReadiumCss = {};

        ReadiumCss.Selectors = {
            'ABOUT_BUTTON'        : '#aboutButt1',
            'APP_CONTAINER'       : '#app-container',
            'AUDIO_PLAYER'        : '#audioplayer',
            'FULLSCREEN_BUTTON'   : '.navbar .btn-group > .btn.icon-full-screen',
            'NAVBAR'              : '.navbar',
            'NAVBAR_RIGHT'        : '.navbar-right',
            'NAVBAR_BUTTONS'      : '.navbar .btn',
            'PAGE_TURNER_BUTTONS' : '#readium-page-btns',
            'READING_AREA'        : '#reading-area'
        };

        Object.freeze( ReadiumCss.Selectors );
        Object.freeze( ReadiumCss );

        return ReadiumCss;
    }
);
