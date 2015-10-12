/**
 * @file Doppelganger of readium-js-viewer/src/js/EpubReader.js, for customization.
 */

// This is a modified copy of Readium's EpubReader module, whose methods we need
// to override or modify.  EpubReader is not available to our plugin code so
// we need our own "doppelganger" to stand in and provide similar intentions but
// modified behavior.

// For now, when copying over a method from the original file, we keep the code
// as close to the original as possible in terms of intent and behavior. In theory
// this might make it easier to do future modifications when Readium code updates and breaks
// our plugin.
// Possible exceptions:
// * Fix blatant typos in comments
// * Fix anything that doesn't pass our lint standards
// * Use our code style for the project

// The code similarity provided by this doppelganger approach might not be worth
// it in the end, though.  We'll see.

define(
    [ 'jquery', './ReadiumCss', './DltsCss' ],
    function ( $, ReadiumCss, DltsCss ) {

        var EpubReaderDoppelganger = {
            embedded      : true,
            hideTimeoutId : undefined
        };

        // Copied from readium-js-viewer/src/js/EpubReader.js hideUI(), with
        // style changes and slight modifications.
        EpubReaderDoppelganger.hideUI = function () {
            var $navBarWrapper = $( DltsCss.Selectors.NAVBAR_HOVER_DETECTION_WRAPPER ),
                navBarWrapper  = $navBarWrapper[ 0 ],
                $pageButtons   = $( ReadiumCss.Selectors.PAGE_TURNER_BUTTONS ),
                within, isMouseOver;

            this.hideTimeoutId = null;

            // TODO: What is the Readium rationale for this condition below?
            // Readium dev team's code comment:
            // "don't hide it toolbar while toc open in non-embedded mode"
            if ( ! this.embedded &&
                 $( ReadiumCss.Selectors.APP_CONTAINER ).hasClass( 'toc-visible' ) ) {
                return;
            }

            if ( document.activeElement ) {
                within = jQuery.contains( navBarWrapper, document.activeElement );
                if ( within ) {
                    return;
                }
            }

            // Readium dev team code comment states that $navBar.is(':hover') is
            // broken.
            isMouseOver = (
                $navBarWrapper.find( ':hover' ).length > 0 ||
                $pageButtons.find( ':hover' ).length > 0
            );

            // If user is hovering over a UI element, don't hide
            if ( isMouseOver ) {
                return;
            }

            if ( $( ReadiumCss.Selectors.AUDIO_PLAYER ).hasClass(
                    ReadiumCss.Classes.EXPANDED_AUDIO
                ) ) {
                return;
            }

            $( document.body ).addClass( ReadiumCss.Classes.HIDE_UI );
        };

        // Copied from readium-js-viewer/src/js/EpubReader.js hideLoop(), with
        // style changes and slight modifications.
        EpubReaderDoppelganger.hideLoop = function ( e, immediate ) {

            if ( this.hideTimeoutId ) {
                window.clearTimeout( this.hideTimeoutId );
                this.hideTimeoutId = null;
            }

            if ( ! $( ReadiumCss.Selectors.APP_CONTAINER ).hasClass( 'toc-visible' ) &&
                   $( document.body ).hasClass( ReadiumCss.Classes.HIDE_UI ) ) {
                $( document.body ).removeClass( ReadiumCss.Classes.HIDE_UI );
            }

            if ( immediate ) {
                this.hideUI();
            } else {
                this.hideTimeoutId = window.setTimeout( hideUI, 4000 );
            }
        };

        return EpubReaderDoppelganger;
    }
);
