/**
 * @file NYU Press branding
 */

define(
    ['jquery', './Util'], function ( $, Util ) {

        var Theme = {};
        var siteArg = Util.getURLQueryParams()[ 'dlts-site' ];

        var mainSiteName;
        var mainSiteUrl;
        if ( siteArg === 'oa-books' ) {
            mainSiteName = 'Open Access Books';
            mainSiteUrl  = 'http://openaccessbooks-dev.nyupress.org/';
        } else if ( siteArg === 'connected-youth' ) {
            mainSiteName = 'Connected Youth';
            mainSiteUrl  = 'http://openaccessbooks-dev.nyupress.org/';
        } else {
            mainSiteName = '[ ERROR: invalid "site" param value: ' + siteArg;
            mainSiteUrl  = '';
        }

        Theme.insertHeader = function() {
            var headerStyles =
                ".banner #logo-replace a {\n" +
                "    width: 105px;\n" +
                "    height: 50px;\n" +
                "    display: block;\n" +
                "    text-indent: 300%;\n" +
                "    background-image: url(\"../images/NYUPLogo.png\");\n" +
                "    background-repeat: no-repeat;\n" +
                "    background-size: auto 100%;\n" +
                "    white-space: nowrap;\n" +
                "}\n" +
                "\n" +
                ".banner #logo-replace {\n" +
                "    height: 50px;\n" +
                "    width: 105px;\n" +
                "    overflow: hidden;\n" +
                "    margin: 0;\n" +
                "}\n" +
                "\n" +
                ".banner #site-title {\n" +
                "    /* Gotham Extra Light = 'Gotham 2r', 'Gotham A', 'Gotham B' */\n" +
                "    font: normal 200 22px / 1 'Gotham 2r', 'Gotham A', 'Gotham B', 'Helvetica Neue', Helvetica, sans-serif;\n" +
                "    varter-spacing: .5px;\n" +
                "    text-transform: uppercase;\n" +
                "    color: white;\n" +
                "    text-decoration: none;\n" +
                "}\n" +
                "\n" +
                ".banner #site-title a {\n" +
                "    display: block;\n" +
                "    text-decoration: none;\n" +
                "    color: white;\n" +
                "}\n" +
                "\n" +
                ".banner #site-title a:hover {\n" +
                "    text-decoration: underline;\n" +
                "    color: white;\n" +
                "}\n" +
                "\n" +
                ".home .banner .n-utils li {\n" +
                "    margin-right: 20px;\n" +
                "    float: right;\n" +
                "}\n" +
                "\n" +
                ".banner a:link,\n" +
                ".banner a:visited {\n" +
                "    color: white;\n" +
                "}\n" +
                "\n" +
                ".banner a:focus,\n" +
                ".banner a:hover {\n" +
                "    text-decoration: underline;\n" +
                "}\n" +
                "\n" +
                ".banner header {\n" +
                "    display: table-row;\n" +
                "}\n" +
                "\n" +
                ".banner header > * {\n" +
                "    padding: 5px 0 5px 10px;\n" +
                "    display: table-cell;\n" +
                "    vertical-align: middle;\n" +
                "}\n" +
                "\n" +
                ".banner .n-utils {\n" +
                "    display: table-cell;\n" +
                "    padding: 10px 10px 10px 0;\n" +
                "    /* overriding bootstrap */\n" +
                "    /*float: none !important;*/\n" +
                "    text-align: right;\n" +
                "}\n" +
                "\n" +
                ".banner .n-utils a {\n" +
                "    white-space: nowrap;\n" +
                "    /*text-transform: uppercase;*/\n" +
                "    /* Gotham Extra Light = 'Gotham 2r', 'Gotham A', 'Gotham B' */\n" +
                "    font: normal 200 13px/1 'Gotham 2r', 'Gotham A', 'Gotham B', 'Helvetica Neue', Helvetica, sans-serif;\n" +
                "    color: #bbb;\n" +
                "}\n" +
                "\n" +
                ".banner .btn-default {\n" +
                "    border: none;\n" +
                "    background-color: transparent;\n" +
                "}\n" +
                "\n" +
                ".banner .icon {\n" +
                "    width: 40px;\n" +
                "    height: 40px;\n" +
                "    /* box-shadow: 1px 1px 5px rgb(0, 0, 0);*/\n" +
                "}\n" +
                "\n" +
                "#dlts-header {\n" +
                "    background-color: #333333;\n" +
                "}\n" +
                "\n";

            // Make banner appear and disappear like Readium UI.
            headerStyles +=
                ".hide-ui .banner{\n" +
                "    -webkit-transition: all .2s ease-out;\n" +
                "    opacity:0;\n" +
                "}\n";

            var html =
                "<div id=\"dlts-header\" class=\"header banner\">\n" +
                "  <nav class=\"banner\" role=\"navigation\" id=\"banner-fixed-top\">\n" +
                "    <div class=\"banner-inner\">\n" +
                "      <div class=\"container\">\n" +
                "        <header role=\"banner\">\n" +
                "          <h2 id=\"logo-replace\"><a href=\"" + mainSiteUrl + "/\" class=\"brand\">NYU Press</a></h2>\n" +
                "          <h1 id=\"site-title\"><a href=\"" + mainSiteUrl + "/\">" + mainSiteName + "</a></h1>\n" +
                "          <div class=\"n-utils\">\n" +
                "            <button id=\"search-toggle\" style=\"display:none\">X</button>\n" +
                "            <form role=\"search\" class=\"pure-form searchform\" value=\"\" method=\"get\" action=\"" + mainSiteUrl + "/search\" name=\"searchform\" >\n" +
                "              <input class=\"searchbox pure-input\" name=\"searchbox\" id=\"searchbox\" type=\"text\" placeholder=\"Search for books...\" value=\"\" size=\"30\" maxlength=\"300\">\n" +
                "            </form>\n" +
                "          </div>\n" +
                "        </header>\n" +
                "      </div>\n" +
                "    </div>\n" +
                "  </nav>\n" +
                "</div>\n";

            $( '<style>' + headerStyles + '</style>' ).appendTo( document.head );
            $( 'body' ).prepend( html );
        };

        Theme.insertFooter = function() {
            var footerStyles =
                ".footer-inner {\n" +
                "  padding: 5px 0 7px 0;\n" +
                "  color: white;\n" +
                "  text-align: center;\n" +
                "  margin-top: 10px;\n" +
                "  background-color: #2c2c2c;\n" +
                "  background-image: -moz-linear-gradient(top, #333333, #222222);\n" +
                "  background-image: -ms-linear-gradient(top, #333333, #222222);\n" +
                "  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#333333), to(#222222));\n" +
                "  background-image: -webkit-linear-gradient(top, #333333, #222222);\n" +
                "  background-image: -o-linear-gradient(top, #333333, #222222);\n" +
                "  background-image: linear, top, #333333, #222222;\n" +
                "  background-repeat: repeat-x;\n" +
                "  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25), inset 0 -1px 0 rgba(0, 0, 0, 0.1);\n" +
                "  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25), inset 0 -1px 0 rgba(0, 0, 0, 0.1);\n" +
                "  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25), inset 0 -1px 0 rgba(0, 0, 0, 0.1);\n" +
                "}\n" +
                "\n" +
                "footer#pagefooter {\n" +
                "  width: 100%;\n" +
                "}\n" +
                "\n" +
                "footer#pagefooter {\n" +
                "  position: fixed;\n" +
                "  bottom: 0;\n" +
                "  left: 0;\n" +
                "  z-index: 2000;\n" +
                "  width: 100%;\n" +
                "}\n" +
                "\n" +
                "footer#pagefooter ul {\n" +
                "  margin: 0;\n" +
                "  padding: 0;\n" +
                "}\n" +
                "\n" +
                "footer#pagefooter li {\n" +
                "  display: inline-block;\n" +
                "  padding: 0 5px 0 0;\n" +
                "  color: white;\n" +
                "}\n" +
                "\n" +
                "footer#pagefooter li + li:before {\n" +
                "  content: \"|\";\n" +
                "  color: #999;\n" +
                "}\n" +
                "\n" +
                "footer#pagefooter li > span {\n" +
                "  padding: 0 0 0 10px;\n" +
                "  display: inline-block;\n" +
                "}\n" +
                "\n" +
                "footer#pagefooter li.social > span > span {\n" +
                "  padding: auto;\n" +
                "  width: 16px;\n" +
                "}\n" +
                "\n" +
                "footer#pagefooter li,\n" +
                "footer#pagefooter li a:link,\n" +
                "footer#pagefooter li a:visited {\n" +
                "  color: #efefef;\n" +
                "  font-size: 13px;\n" +
                "  /* Gotham  Light = 'Gotham 3r', 'Gotham A', 'Gotham B' */\n" +
                "  font-family: 'Gotham 3r', 'Gotham A', 'Gotham B', 'Helvetica Neue', Helvetica, sans-serif;\n" +
                "  font-weight: normal;\n" +
                "  font-weight: 300;\n" +
                "}\n" +
                "\n" +
                "footer#pagefooter li a:hover {\n" +
                "  color: white;\n" +
                "}\n" +
                "\n" +
                ".footer-inner {\n" +
                "  padding: 5px 0 7px 0;\n" +
                "  color: white;\n" +
                "  text-align: center;\n" +
                "  margin-top: 10px;\n" +
                "  background-color: #2c2c2c;\n" +
                "  background-image: -moz-linear-gradient(top, #333333, #222222);\n" +
                "  background-image: -ms-linear-gradient(top, #333333, #222222);\n" +
                "  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#333333), to(#222222));\n" +
                "  background-image: -webkit-linear-gradient(top, #333333, #222222);\n" +
                "  background-image: -o-linear-gradient(top, #333333, #222222);\n" +
                "  background-image: linear, top, #333333, #222222;\n" +
                "  background-repeat: repeat-x;\n" +
                "  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25), inset 0 -1px 0 rgba(0, 0, 0, 0.1);\n" +
                "  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25), inset 0 -1px 0 rgba(0, 0, 0, 0.1);\n" +
                "  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25), inset 0 -1px 0 rgba(0, 0, 0, 0.1);\n" +
                "}\n";

            var html =
                "<footer id=\"pagefooter\">\n" +
                "  <div class=\"footer-inner\">\n" +
                "    <ul>\n" +
                "      <li><span><a href=\"" + mainSiteUrl + "/about\">About</a></span></li>\n" +
                "      <li><span><a href=\"" + mainSiteUrl + "/rights\">Rights Information</a></span></li>\n" +
                "      <li id=\"nyup-link\"><span><a href=\"http://nyupress.org/\" target=\"_blank\">NYU Press</a></span></li>\n" +
                "      <li id=\"dlts-link\"><span>Powered by <a href=\"http://dlib.nyu.edu/dlts/\" target=\"_blank\">NYU DLTS</a></span></li>\n" +
                "    </ul>\n" +
                "  </div>\n" +
                "</footer>\n";

            $( 'body' ).append( html );
        };

        return Theme;
    }
);
