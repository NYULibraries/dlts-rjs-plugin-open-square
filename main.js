define( [ 'readium_js_plugins', 'jquery', './DltsEpubReader' ], function ( Plugins, $, DltsEpubReader ) {

    Plugins.register(
        'dltsRjsPluginOaBooks',
        function ( api ) {

            doCustomizations();

            api.reader.on(
                ReadiumSDK.Events.CONTENT_DOCUMENT_LOADED,
                function ( $iframe, spineItem ) {
                    hideNavbarUnlessHoverOver( $iframe, DltsEpubReader );
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
        var $navbar = $( '.navbar' );

        $navbar.css(
            {
                'background'    : '#2c2c2c',
                'box-shadow'    : '0px 1px 5px #333',
                'border-radius' : '0px',
                'min-height'    : '50px',
                'margin-bottom' : '0px'
            }
        )

    }

    function hideNavbarUnlessHoverOver( $iframe, DltsEpubReader ) {
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
        $window.on( 'mousemove', function() {
            DltsEpubReader.hideLoop( null, true );
        });

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

} );



