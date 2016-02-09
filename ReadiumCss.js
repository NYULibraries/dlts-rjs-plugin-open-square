/**
 * @file CSS selectors used in ReadiumJS project(s) core code
 */

define(
    ['jquery'], function ( $ ) {

        var ReadiumCss = {};

        ReadiumCss.Classes = {
            // Individual CSS class names.
            // Used to have stuff related to UI visibility toggling.
            // Keep this around to remind us that this set could be useful
            // later.
        };

        ReadiumCss.Selectors = {
            'ABOUT_BUTTON'          : '#aboutButt1',
            'AUDIO_BUTTON'          : '#backgroundAudioTrack-div',
            // From ReadiumViewer.js, which has in variable tooltipSelector
            'BUTTONS_WITH_TOOLTIPS' : 'nav *[title]',
            'FULLSCREEN_BUTTON'     : '.navbar .btn-group > .btn.icon-full-screen',
            'LIBRARY_BUTTON'        : '.icon-library',
            'NAVBAR'                : '.navbar',
            'NAVBAR_RIGHT'          : '.navbar-right',
            'NAVBAR_BUTTONS'        : '.navbar .btn',
            'READING_AREA'          : '#reading-area'
        };

        Object.freeze( ReadiumCss.Classes );
        Object.freeze( ReadiumCss.Selectors );
        Object.freeze( ReadiumCss );

        return ReadiumCss;
    }
);
