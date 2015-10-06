define(
    [ 'readium_js_plugins', 'jquery', './EpubReaderDoppelganger' ],
    function ( Plugins, $, EpubReaderDoppelganger ) {

        Plugins.register(
            'dltsRjsPluginOaBooks',
            function ( api ) {

                doCustomizations();

                api.reader.on(
                    ReadiumSDK.Events.CONTENT_DOCUMENT_LOADED,
                    function ( $iframe, spineItem ) {
                        hideNavbarUnlessHoverOver( $iframe, EpubReaderDoppelganger );
                    }
                );
            }
        );

        function doCustomizations() {
            hideReadiumAboutButton();
            restyleNavbar();
        }

        function hideReadiumAboutButton() {
            var $readiumAboutButton = $( '#aboutButt1' );

            // Remove Readium logo
            // There are many buttons default .navbar-left that have visibility: hidden
            // Following the same pattern.
            // TODO: figure out if can eliminate the flicker.  Not sure if we can
            // because we can't force this to be called any earlier.
            $readiumAboutButton.css( { visibility : 'hidden' } );
        }

        function restyleNavbar() {
            var $navbar       = $( '.navbar' ),
                $navbarRight  = $( '.navbar-right' ),
                $navbarButton = $( '.navbar .btn' );

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
                {
                    'overflow'         : 'visible',
                    'height'           : '0.4em',
                    'min-height'       : '50px',
                    'background-color' : '#2c2c2c'
                }
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

        function hideNavbarUnlessHoverOver( $iframe, EpubReaderDoppelganger ) {
            var $window        = $( window ),
                $iframeContentWindow = $( $iframe[ 0 ].contentWindow );

            // First, we remove existing mousemove event handlers that were added
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

    }
);



