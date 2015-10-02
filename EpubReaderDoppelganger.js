define( [ 'jquery' ], function ( $ ) {

    DltsEpubReader = {
        embedded      : true,
        hideTimeoutId : undefined
    };

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
