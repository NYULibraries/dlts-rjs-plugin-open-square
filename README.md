ReadiumJS plugin for [NYU Press Open Square](http://opensquare.nyupress.org/)
=============================================================================

## Required ReadiumJS Viewer version

This plugin was built against this ReadiumJS Viewer master branch commit:

[0375c9ad36ebc07b6ea074e78fbbe4bbf714b803](https://github.com/readium/readium-js-viewer/commit/0375c9ad36ebc07b6ea074e78fbbe4bbf714b803)

...with a patch consisting of cherry-picked [317b926959a664759994831b6e20358a48109792](https://github.com/readium/readium-js/commit/317b926959a664759994831b6e20358a48109792)
applied against sub-module `readium-js/`, in order to get bugfix for embedding external videos:

```bash
$ git log -2
commit 3946d54c594b2a3a44564caa0478b64b375a9aaa
Author: danielweck <daniel.weck@gmail.com>
Date:   Wed Dec 23 13:48:48 2015 +0000

    fixes https://github.com/readium/readium-js-viewer/issues/447 support for iframes with
    external HTTP(S) content, such as YouTube videos, etc. (this bug fix
    actualy also "protects" Readium against crashes due to external iframe@src
    references)

commit 9c341d64a9c14f81952c6caf015453bbef65d303
Author: danielweck <daniel.weck@gmail.com>
Date:   Wed Jan 27 21:44:56 2016 +0000

    version bump
```

Note that the commit ID changes during the cherry-pick, and seems to be different when applied in different repo clones, perhaps because date/time of cherry-pick is taken into account.

## INSTALLATION

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

