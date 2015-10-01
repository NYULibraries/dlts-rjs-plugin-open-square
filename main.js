define( [ 'readium_js_plugins', 'jquery', './DltsEpubReader' ], function ( Plugins, $, DltsEpubReader ) {

    Plugins.register(
        'dltsRjsPluginOaBooks',
        function ( api ) {

            doCustomizations();

    } );

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
} );


