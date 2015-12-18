ReadiumJS plugin for NYU Open Access Books (OA Books)
=====================================================

# Required ReadiumJS Viewer version

This plugin was built against this ReadiumJS Viewer master branch commit:

[c94d4c16f35839812ceb50f9ae7d485b105057ce](https://github.com/readium/readium-js-viewer/commit/c94d4c16f35839812ceb50f9ae7d485b105057ce)

# INSTALLATION

1) Clone repo into existing instance.  In `readium-js-viewer/readium-js/readium-shared-js/plugins/`:

```Shell
git clone git@github.com:NYULibraries/dlta-rjs-plugin-oa-books.git dltsRjsPluginOaBooks
```

Note that "dlts-rjs-plugin-oa-books" breaks the build, so plugin registration at
the moment uses camel-case convention.
(TODO: Find out what the plugin naming rules are)

2) Create/modify `readium-js-viewer/readium-js/readium-shared-js/plugins/plugins-override.cson`.  Basic example where this plugin is the only one enabled:

```
plugins:
  include: [
    'dltsRjsPluginOaBooks'
  ]
  exclude: [
  ]
```

This file is permanently ignored by ReadiumJS project.  For more details, see:
* [readium-shared-js/PLUGINS.md](https://github.com/readium/readium-shared-js)
* [readium/readium-js-viewer/README.md: Plugins integration](https://github.com/readium)

3) In `readium-js-viewer/`, run `npm run build`.

