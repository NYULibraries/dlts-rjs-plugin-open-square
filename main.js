define( [ 'readium_js_plugins', 'jquery' ], function ( Plugins, $ ) {

    Plugins.register( 'dltsRjsPluginOaBooks', function ( api ) {

        doCustomizations();

    } );

    function doCustomizations() {
        hideReadiumAboutButton();
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

} );

