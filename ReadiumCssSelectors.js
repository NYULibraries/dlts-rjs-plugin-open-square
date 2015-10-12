/**
 * @file CSS selector used by ReadiumJS viewer
 */

define(
    ['jquery'], function ( $ ) {

        var ReadiumCssSelectors = {
            'ABOUT_BUTTON'        : '#aboutButt1',
            'AUDIO_PLAYER'        : '#audioplayer',
            'FULLSCREEN_BUTTON'   : '.navbar .btn-group > .btn.icon-full-screen',
            'NAVBAR'              : '.navbar',
            'NAVBAR_RIGHT'        : '.navbar-right',
            'NAVBAR_BUTTONS'      : '.navbar .btn',
            'PAGE_TURNER_BUTTONS' : '#readium-page-btns',
            'READING_AREA'        : '#reading-area'
        };

        Object.freeze( ReadiumCssSelectors );

        return ReadiumCssSelectors;
    }
);
