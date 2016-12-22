define(
    [ 'readium_js_plugins',
      'jquery',
      './ReadiumCss',
      './SiteBranding',
      './Util' ],
    function ( Plugins, $, ReadiumCss, SiteBranding, Util ) {

        // WARNING: window.matchMedia() not supported on IE8 or lower
        var isTouchDevice    = Util.isTouchDevice(),
            viewportIsNarrow = window.matchMedia( '(max-width:768px)' );

        Plugins.register(
            'dltsRjsPluginOaBooks',
            function ( api ) {

                doReaderSiteBranding();
                doCustomizations();

                if ( isTouchDevice ) {
                    doMobileCustomizations();
                }

                api.reader.on(
                    ReadiumSDK.Events.CONTENT_DOCUMENT_LOADED,
                    function ( $iframe, spineItem ) {
                        fixSplitImages( $iframe );
                    }
                );
            }
        );

        function doReaderSiteBranding() {
            SiteBranding.insertHeader();
            SiteBranding.insertFooter();
        }

        function doCustomizations() {
            // Note for element hiding customizations:
            // There are many buttons in .navbar-left that by default
            // have visibility: hidden rather than display : none
            // We are following that pattern.
            // TODO: figure out if can eliminate the flicker.  Not sure if we can
            // because we can't force these hide functions to be called any
            // earlier.
            hideReadiumAboutButton();
            hideAudioButtonSooner();
            hideLibraryButton();

            restyleNavbar();
            moveReadingAreaClearOfNavbar();
        }

        function doMobileCustomizations() {
            // Remove tooltips.  On touchscreens tooltips just force users to
            // have to click twice: once for the tooltip, again to fire the event
            // tied to the click.
            $( ReadiumCss.Selectors.BUTTONS_WITH_TOOLTIPS ).removeAttr( 'title' );
        }

        function hideReadiumAboutButton() {
            var $readiumAboutButton = $( ReadiumCss.Selectors.ABOUT_BUTTON );

            $readiumAboutButton.css( { visibility : 'hidden' } );
        }

        function hideAudioButtonSooner() {
            var $audioButton = $( ReadiumCss.Selectors.AUDIO_BUTTON );

            // Hide Audio button from the navbar sooner than it is already being
            // hidden by Readium.  It's just too clearly visible for too long
            $audioButton.css( { visibility : 'hidden' } );
        }

        function hideLibraryButton() {
            var $libraryButton = $( ReadiumCss.Selectors.LIBRARY_BUTTON );

            $libraryButton.css( { visibility : 'hidden' } );
        }

        function restyleNavbar() {
            var $navbar       = $( ReadiumCss.Selectors.NAVBAR ),
                $navbarRight  = $( ReadiumCss.Selectors.NAVBAR_RIGHT ),
                $navbarButton = $( ReadiumCss.Selectors.NAVBAR_BUTTONS );

            $navbar.css(
                {
                    'background'    : '#2c2c2c',
                    'box-shadow'    : '0px 1px 5px #333',
                    'border-radius' : '0px',
                    'min-height'    : '50px',
                    'margin-bottom' : '0px'
                }
            );

            $navbarRight.css(
                getNavbarRightCss()
            );

            // ReadiumJS CSS currently has "margin-right: 0 !important;"
            // jQuery.css() can't do "!important"
            // Solution: http://stackoverflow.com/questions/11962962/overriding-important-with-css-or-jquery
            $navbarRight[ 0 ].style.setProperty( 'margin', '10px 15px 0 0', 'important' );

            $navbarButton.css(
                {
                    'color'            : '#666',
                    'font-size'        : '22px',
                    'width'            : '43px',
                    'height'           : '36px',
                    'background'       : 'no-repeat center center',
                    'background-color' : '#2c2c2c'
                }
            );

        }

        function getNavbarRightCss() {
            var navbarRightCss =
                {
                    'overflow'         : 'visible',
                    'height'           : '0.4em',
                    'min-height'       : '50px',
                    'background-color' : '#2c2c2c'
                };

            if ( viewportIsNarrow ) {
                navbarRightCss.float = 'right';
            }

            return navbarRightCss;
        }

        function moveReadingAreaClearOfNavbar() {
            var $readingArea = $( ReadiumCss.Selectors.READING_AREA );

            $readingArea.css(
                {
                    'top' : '78px'
                }
            )
        }

        function fixSplitImages( $iframe ) {
            fixSplitSvg( $iframe );
            fixSplitImg( $iframe );
        }

        // This prevents book covers that are <svg> from being split into two columns:
        // https://www.pivotaltracker.com/n/projects/1355218/stories/105150522
        function fixSplitSvg( $iframe ) {
            setBookCoverSvgPositionToAbsolute( $iframe );
        }

        // Note that this only seems to fix split cover bug in OA Books collection,
        // not for books in Connected Youth: https://jira.nyu.edu/browse/NYUP-132.
        // Connected Youth books do not use SVG elements.
        function setBookCoverSvgPositionToAbsolute( $iframe ) {
            var iframeDocument = $iframe.contents()[ 0 ],
                svgElement     = iframeDocument.querySelector( 'svg' ),
                $svg           = $( svgElement );

            $svg.css(
                {
                    'position' : 'absolute'
                }
            )
        }

        // This prevents images from being split into two columns:
        // https://jira.nyu.edu/browse/NYUP-157
        function fixSplitImg( $iframe ) {
            var $head = $iframe.contents().find( 'head' );

            $head.append(
                '<style type="text/css">'          +

                // Fix all <img> elements
                '  img[style]'                     +
                '  {'                              +
                '    max-width: 98% !important;'   +
                '    max-height: 95vh !important;' +
                '    width: auto !important;'      +
                '    height: auto !important;'     +
                '  }'                              +

                // Covers need special treatment.
                // Note that this only seems to fix split cover bug in Connected Youth collection,
                // not for books in OA Books: https://jira.nyu.edu/browse/NYUP-132.
                // OA Books book covers do not use <img> elements.
                '  .cover img, .cover img[style]'  +
                '  {'                              +
                '    max-width: 98% !important;'   +
                '    max-height: 93vh !important;' +
                '    width: auto !important;'      +
                '    height: 93vh !important;'     +
                '  }'                              +

                '</style>'
            );
        }
    }
);



