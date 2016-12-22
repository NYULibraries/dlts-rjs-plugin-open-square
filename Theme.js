/**
 * @file NYU Press branding
 */

define(
    ['jquery', './Util'], function ( $, Util ) {

        let SiteBranding = {};
        let siteArg = Util.getURLQueryParams()[ 'dlts-site' ];

        let mainSiteName;
        let mainSiteUrl;
        if ( siteArg === 'oabooks' ) {
            mainSiteName = 'Open Access Books';
            mainSiteUrl  = 'http://openaccessbooks-local';
        } else if ( siteArg === 'connected-youth' ) {
            mainSiteName = 'Connected Youth';
            mainSiteUrl  = 'http://connectedyouth-local';
        } else {
            mainSiteName = `[ ERROR: invalid "site" param value: ${siteArg}`;
            mainSiteUrl  = '';
        }

        SiteBranding.insertHeader = () => {
            let headerStyles =
`.banner #logo-replace a {
    width: 105px;
    height: 50px;
    display: block;
    text-indent: 300%;
    background-image: url("../images/NYUPLogo.png");
    background-repeat: no-repeat;
    background-size: auto 100%;
    white-space: nowrap;
}

.banner #logo-replace {
    height: 50px;
    width: 105px;
    overflow: hidden;
    margin: 0;
}

.banner #site-title {
    /* Gotham Extra Light = 'Gotham 2r', 'Gotham A', 'Gotham B' */
    font: normal 200 22px / 1 'Gotham 2r', 'Gotham A', 'Gotham B', 'Helvetica Neue', Helvetica, sans-serif;
    letter-spacing: .5px;
    text-transform: uppercase;
    color: white;
    text-decoration: none;
}

.banner #site-title a {
    display: block;
    text-decoration: none;
    color: white;
}

.banner #site-title a:hover {
    text-decoration: underline;
    color: white;
}

.home .banner .n-utils li {
    margin-right: 20px;
    float: right;
}

.banner a:link,
.banner a:visited {
    color: white;
}

.banner a:focus,
.banner a:hover {
    text-decoration: underline;
}

.banner header {
    display: table-row;
}

.banner header > * {
    padding: 5px 0 5px 10px;
    display: table-cell;
    vertical-align: middle;
}

.banner .n-utils {
    display: table-cell;
    padding: 10px 10px 10px 0;
    /* overriding bootstrap */
    /*float: none !important;*/
    text-align: right;
}

.banner .n-utils a {
    white-space: nowrap;
    /*text-transform: uppercase;*/
    /* Gotham Extra Light = 'Gotham 2r', 'Gotham A', 'Gotham B' */
    font: normal 200 13px/1 'Gotham 2r', 'Gotham A', 'Gotham B', 'Helvetica Neue', Helvetica, sans-serif;
    color: #bbb;
}

.banner .btn-default {
    border: none;
    background-color: transparent;
}

.banner .icon {
    width: 40px;
    height: 40px;
    /* box-shadow: 1px 1px 5px rgb(0, 0, 0);*/
}

#dlts-header {
    background-color: #333333;
}`;

            // Make banner appear and disappear like Readium UI.
            headerStyles +=
`.hide-ui .banner{
    -webkit-transition: all .2s ease-out;
    opacity:0;
}`;

            let html =
`<div id="dlts-header" class="header banner">
  <nav class="banner" role="navigation" id="banner-fixed-top">
    <div class="banner-inner">
      <div class="container">
        <header role="banner">
          <h2 id="logo-replace"><a href="${mainSiteUrl}/" class="brand">NYU Press</a></h2>
          <h1 id="site-title"><a href="${mainSiteUrl}/">${mainSiteName}</a></h1>
          <div class="n-utils">
            <button id="search-toggle" style="display:none">X</button>
            <form role="search" class="pure-form searchform" value="" method="get" action="${mainSiteUrl}/search" name="searchform" >
              <input class="searchbox pure-input" name="searchbox" id="searchbox" type="text" placeholder="Search for books..." value="" size="30" maxlength="300">
            </form>
          </div>
        </header>
      </div>
    </div>
  </nav>
</div>`;
            $( '<style>' + headerStyles + '</style>' ).appendTo( document.head );
            $( 'body' ).prepend( html );
        };

        SiteBranding.insertFooter = () => {
            let footerStyles =
`.footer-inner {
  padding: 5px 0 7px 0;
  color: white;
  text-align: center;
  margin-top: 10px;
  background-color: #2c2c2c;
  background-image: -moz-linear-gradient(top, #333333, #222222);
  background-image: -ms-linear-gradient(top, #333333, #222222);
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#333333), to(#222222));
  background-image: -webkit-linear-gradient(top, #333333, #222222);
  background-image: -o-linear-gradient(top, #333333, #222222);
  background-image: linear, top, #333333, #222222;
  background-repeat: repeat-x;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25), inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25), inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25), inset 0 -1px 0 rgba(0, 0, 0, 0.1);
}

footer#pagefooter {
  width: 100%;
}

footer#pagefooter {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2000;
  width: 100%;
}

footer#pagefooter ul {
  margin: 0;
  padding: 0;
}

footer#pagefooter li {
  display: inline-block;
  padding: 0 5px 0 0;
  color: white;
}

footer#pagefooter li + li:before {
  content: "|";
  color: #999;
}

footer#pagefooter li > span {
  padding: 0 0 0 10px;
  display: inline-block;
}

footer#pagefooter li.social > span > span {
  padding: auto;
  width: 16px;
}

footer#pagefooter li,
footer#pagefooter li a:link,
footer#pagefooter li a:visited {
  color: #efefef;
  font-size: 13px;
  /* Gotham  Light = 'Gotham 3r', 'Gotham A', 'Gotham B' */
  font-family: 'Gotham 3r', 'Gotham A', 'Gotham B', 'Helvetica Neue', Helvetica, sans-serif;
  font-weight: normal;
  font-weight: 300;
}

footer#pagefooter li a:hover {
  color: white;
}

.footer-inner {
  padding: 5px 0 7px 0;
  color: white;
  text-align: center;
  margin-top: 10px;
  background-color: #2c2c2c;
  background-image: -moz-linear-gradient(top, #333333, #222222);
  background-image: -ms-linear-gradient(top, #333333, #222222);
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#333333), to(#222222));
  background-image: -webkit-linear-gradient(top, #333333, #222222);
  background-image: -o-linear-gradient(top, #333333, #222222);
  background-image: linear, top, #333333, #222222;
  background-repeat: repeat-x;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25), inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25), inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25), inset 0 -1px 0 rgba(0, 0, 0, 0.1);
}
`;

            let html =
 `<footer id="pagefooter">
  <div class="footer-inner">
    <ul>
      <li><span><a href="${mainSiteUrl}}/about">About</a></span></li>
      <li><span><a href="${mainSiteUrl}}/rights">Rights Information</a></span></li>
      <li id="nyup-link"><span><a href="http://nyupress.org/" target="_blank">NYU Press</a></span></li>
      <li id="dlts-link"><span>Powered by <a href="http://dlib.nyu.edu/dlts/" target="_blank">NYU DLTS</a></span></li>
    </ul>
  </div>
</footer>
`;

            $( 'body' ).append( html );
        };

        return SiteBranding;
    }
);
