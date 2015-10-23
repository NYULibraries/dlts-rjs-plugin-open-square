/**
 * @file CSS selectors used in ReadiumJS project(s) core code
 */

define(
    ['jquery'], function ( $ ) {

        var ReadiumCss = {};

        ReadiumCss.Classes = {
            'EXPANDED_AUDIO' : 'expanded-audio',
            'HIDE_UI'        : 'hide-ui',
            'TOC_VISIBLE'    : 'toc-visible'
        };

        ReadiumCss.Selectors = {
            'ABOUT_BUTTON'          : '#aboutButt1',
            'APP_CONTAINER'         : '#app-container',
            'AUDIO_BUTTON'          : '#backgroundAudioTrack-div',
            'AUDIO_PLAYER'          : '#audioplayer',
            'BUTTONS_WITH_TOOLTIPS' : 'nav *[title]',
            'FULLSCREEN_BUTTON'     : '.navbar .btn-group > .btn.icon-full-screen',
            'LIBRARY_BUTTON'        : '.icon-library',
            'NAVBAR'                : '.navbar',
            'NAVBAR_RIGHT'          : '.navbar-right',
            'NAVBAR_BUTTONS'        : '.navbar .btn',
            'PAGE_TURNER_BUTTONS'   : '#readium-page-btns',
            'READING_AREA'          : '#reading-area'
        };

        Object.freeze( ReadiumCss.Classes );
        Object.freeze( ReadiumCss.Selectors );
        Object.freeze( ReadiumCss );

        return ReadiumCss;
    }
);
