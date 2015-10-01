define( [ 'readium_js_plugins', 'jquery', './DltsEpubReader' ], function ( Plugins, $, DltsEpubReader ) {

    Plugins.register(
        'dltsRjsPluginOaBooks',
        function ( api ) {

            doCustomizations();

            api.reader.on(
                ReadiumSDK.Events.CONTENT_DOCUMENT_LOADED,
                function ( $iframe, spineItem ) {
                    hideNavbarUnlessHoverOver( api, $iframe, DltsEpubReader );
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

    function hideNavbarUnlessHoverOver( api, $iframe, DltsEpubReader ) {
        var reader         = api.reader,
            $window        = $( window ),
            $contentWindow = $( $iframe[ 0 ].contentWindow );

        $window.off( 'mousemove' );
        // No API call on EpubReader to remove this listener, though there is
        // an API for adding on, which we use later.
        $contentWindow.off( 'mousemove' );

        $window.on( 'mousemove', function() {
            DltsEpubReader.hideLoop( null, true );
        });
        reader.addIFrameEventListener('mousemove', function() {
            DltsEpubReader.hideLoop( null, true );
        });
    }

} );



