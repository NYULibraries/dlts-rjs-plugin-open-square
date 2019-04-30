ReadiumJS plugin for [NYU Press Open Square](http://opensquare.nyupress.org/)
=============================================================================

DLTS ReadiumJS viewer plugin for customizing the
[Open Square reader](http://opensquare.nyupress.org/open-square-reader/cloud-reader/?)

The main repo for the reader is [dlts-readium-js-viewer](https://github.com/NYULibraries/dlts-readium-js-viewer).
It includes build scripts which automatically compile the plugin into the reader.
To make an custom, ad-hoc build which uses this plugin, follow the instructions for
[manual installation](#manual-installation) below.

## MANUAL INSTALLATION

1) Clone this repo into the `plugins/` directory of the ReadiumJS viewer instance:

```Shell
# In root of ReadiumJS viewer instance
cd readium-js/readium-shared-js/plugins/
git clone git@github.com:NYULibraries/dlts-rjs-plugin-open-square.git dltsRjsPluginOpenSquare
```

Note that "dlts-rjs-plugin-open-square" breaks the build, so plugin registration at
the moment uses camel-case convention.  There is an open issue for this:
[
   plugins: name with dash / stroke char breaks build? · Issue #241 · readium/readium-shared-js
](https://github.com/readium/readium-shared-js/issues/241)


2) Create the `plugins-override.cson` file in the `plugins/` directory (or modify it if it already exists).  The path inside ReadiumJS viewer: `readium-js/readium-shared-js/plugins/plugins-override.cson`.
A basic example where this plugin is the only one enabled:

```
plugins:
  include: [
    'dltsRjsPluginOpenSquare'
  ]
  exclude: [
  ]
```

This file is permanently ignored by ReadiumJS project.  For more details, see:
* [readium-shared-js/PLUGINS.md](https://github.com/readium/readium-shared-js/blob/master/PLUGINS.md)
* [readium/readium-js-viewer/README.md: Plugins integration](https://github.com/readium/readium-js-viewer/blob/master/README.md)

3) In the root of ReadiumJS viewer insteance, run `npm run build`.

