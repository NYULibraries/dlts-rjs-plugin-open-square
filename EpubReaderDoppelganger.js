/**
 * @file Doppelganger of readium-js-viewer/src/js/EpubReader.js, for customization.
 */

// This is a modified copy of Readium's EpubReader module, whose methods we need
// to override or modify.  EpubReader is not available to our plugin code so
// we need our own "doppelganger" to stand in and provide similar intentions but
// modified behavior.

// For now, when copying over a method from the original file, we keep the code
// as close to the original as possible, including comment typos, coding style
// and formatting inconsistent with ours, etc.  In theory this might make it
// easier to do future modifications when Readium code updates and breaks our
// plugin.  The code similarity might not be worth it in the end, though.  We'll
// see.

define( [ 'jquery' ], function ( $ ) {

    DltsEpubReader = {
        embedded      : true,
        hideTimeoutId : undefined
    };

    // Copied from readium-js-viewer/src/js/EpubReader.js hideUI(), with
    // slight modifications.
    DltsEpubReader.hideUI = function(){
        this.hideTimeoutId = null;
        // don't hide it toolbar while toc open in non-embedded mode
        if (!this.embedded && $('#app-container').hasClass('toc-visible')){
            return;
        }

        var navBar = document.getElementById("app-navbar");
        if (document.activeElement) {
            var within = jQuery.contains(navBar, document.activeElement);
            if (within) return;
        }

        var $navBar = $(navBar);
        // BROEKN! $navBar.is(':hover')
        var isMouseOver = $navBar.find(':hover').length > 0;
        if (isMouseOver) return;

        if ($('#audioplayer').hasClass('expanded-audio')) return;

        $(document.body).addClass('hide-ui');
    }

    // Copied from readium-js-viewer/src/js/EpubReader.js hideLoop(), with
    // slight modifications.
    DltsEpubReader.hideLoop = function(e, immediate){

        // if (!embedded){
        //     return;
        // }
        if (this.hideTimeoutId){
            window.clearTimeout(this.hideTimeoutId);
            this.hideTimeoutId = null;
        }
        if (!$('#app-container').hasClass('toc-visible') && $(document.body).hasClass('hide-ui')){
            $(document.body).removeClass('hide-ui');
        }
        if (immediate){
            this.hideUI();
        }
        else{
            this.hideTimeoutId = window.setTimeout(hideUI, 4000);
        }
    }

    return DltsEpubReader;
});
