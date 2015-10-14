define(
    [ 'readium_js_plugins', 'jquery', './EpubReaderDoppelganger', './ReadiumCss' ],
    function ( Plugins, $, EpubReaderDoppelganger, ReadiumCss ) {

        // WARNING: window.matchMedia() not supported on IE8 or lower
        var viewportIsNarrow = window.matchMedia( '(max-width:768px)' );

        Plugins.register(
            'dltsRjsPluginOaBooks',
            function ( api ) {

                doCustomizations();

                api.reader.on(
                    ReadiumSDK.Events.CONTENT_DOCUMENT_LOADED,
                    function ( $iframe, spineItem ) {
                        hideNavbarUnlessHoverOver( $iframe, EpubReaderDoppelganger );
                        setBookCoverSvgPositionToAbsolute( $iframe );
                    }
                );
            }
        );

        function doCustomizations() {
            hideReadiumAboutButton();
            restyleNavbar();
            moveReadingAreaClearOfNavbar();

            if ( viewportIsNarrow ) {
                keepFullScreenButtonVisibleInNarrowViewport();
            }
        }

        function hideReadiumAboutButton() {
            var $readiumAboutButton = $( ReadiumCss.Selectors.ABOUT_BUTTON );

            // Remove Readium logo
            // There are many buttons default .navbar-left that have visibility: hidden
            // Following the same pattern.
            // TODO: figure out if can eliminate the flicker.  Not sure if we can
            // because we can't force this to be called any earlier.
            $readiumAboutButton.css( { visibility : 'hidden' } );
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

        function hideNavbarUnlessHoverOver( $iframe, EpubReaderDoppelganger ) {
            var $window              = $( window ),
                $iframeContentWindow = $( $iframe[ 0 ].contentWindow ),
                $navBar              = $( '#app-navbar' );

            // First, we add a wrapper <div> element around #app-navbar so that
            // we can detect :hover for entire surface of it as opposed to just
            // elements contained with it, using jQuery.find( ':hover' )
            $navBar.wrap( '<div id="app-navbar_hover-detection-wrapper"></div>' );

            // Next, we remove existing mousemove event handlers that were added
            // by EpubReader
            $window.off( 'mousemove' );
            // No API call on EpubReader to remove this listener, though there is
            // an API for adding one (addIFrameEventListener).
            $iframeContentWindow.off( 'mousemove' );

            // This call is similar to what EpubReader.installReaderEventHandlers
            // uses to add mousemove event handler to window.  The crucial difference
            // is that we pass in true for the `immediate` param, so that hideLoop
            // knows not to show the UI for 4 seconds before hiding goes into effect.
            // But: we do want the initial wait period on initial load so the user
            // knows there's a navbar there at all.  We use 5 seconds instead of 4.
            setTimeout(
                function() {
                    $window.on( 'mousemove', function() {
                        EpubReaderDoppelganger.hideLoop( null, true );
                    } );
                },
                5000
            );

            // The commented-out code below mirrors EpubReader.initReadium's adding
            // of event handling to the iframe.  For some reason the handler never
            // runs, it's always the above $window event capture that fires.  Tested
            // the core code and it is the case that even if their addIFrameEventListener
            // call is disabled, their `$window.on( 'mousemove'...` still takes care of
            // everything.  Ideally we'd try to mirror this call for good measure,
            // but I don't think it's worth it at the moment.  There are probably
            // event bubbling and capturing rules involved and those vary by browser.
            // We already capture everything, so leave this go for now.
            // Keep this in comments though so that we remember that this has already
            // been worked through.
            //
            //reader.addIFrameEventListener('mousemove', function() {
            //    DltsEpubReader.hideLoop( null, true );
            //});
        }

        function keepFullScreenButtonVisibleInNarrowViewport() {
            var $fullScreenButton = $( ReadiumCss.Selectors.FULLSCREEN_BUTTON );

            // ReadiumJS viewer adds a `display: none` for max-width:768px
            // Undo this.  Currently on a normal screen, display is "block"
            $fullScreenButton.css( 'display', 'block' );
        }

        // This prevents book covers from being split into two columns:
        // https://www.pivotaltracker.com/n/projects/1355218/stories/105150522
        function setBookCoverSvgPositionToAbsolute( $iframe ) {
            var iframeDocument = $iframe.contents()[ 0],
                svgElement     = iframeDocument.getElementsByTagName( 'svg' )[ 0 ],
                $svg           = $( svgElement );

            $svg.css(
                {
                    'position' : 'absolute'
                }
            )
        }
    }
);



