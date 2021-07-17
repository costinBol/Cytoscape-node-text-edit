cytoscape-node-text-edit
================================================================================
 

## Description


This extension allows node labels to be edited in place. 
[![Demo]({https://user-images.githubusercontent.com/5864423/126027058-a07fdcc3-cf96-4b44-a793-ec5193b6c1e2.png})]({https://user-images.githubusercontent.com/5864423/126026984-692520ae-748a-4c84-906c-e224f6e76b58.mp4} "Demo")

## Dependencies

 * Cytoscape.js ^3.2.0


## Usage instructions

Download the library:
 * via direct download in the repository (probably from a tag).

Import the library as appropriate for your project:

ES import:

```js
import cytoscape from 'cytoscape';
import nodetextedit from 'cytoscape-node-text-edit';

cytoscape.use( nodetextedit );
```

CommonJS require:

```js
let cytoscape = require('cytoscape');
let nodetextedit = require('cytoscape-node-text-edit');

cytoscape.use( nodetextedit ); // register extension
```

AMD:

```js
require(['cytoscape', 'cytoscape-node-text-edit'], function( cytoscape, nodetextedit ){
  nodetextedit( cytoscape ); // register extension
});
```

Plain HTML/JS has the extension registered for you automatically, because no `require()` is needed.
```js
  <script src="cytoscape-node-text-edit.js"></script>
```

## Initialisation

You initialise the extension on the Cytoscape instance:

```js

let cy = cytoscape({
  container: document.getElementById('#cy'),
	/* ... */
});

// the default values of each option are outlined below:
let defaults = {
  selectAllText : false, // If true, selects all text when starting edit. Otherwise, selects last character.
  backgroundColor: 'white', // Colour of background overlay
  backgroundOpacity: 0.9, // Opacity of background overlay
  nodeLabel: 'name', // Which node.data() property holds the label
  showLogs: false, // Show debugging info in console
  zIndex: 1000 // zIndex of editing overlay
};


let eh = cy.nodetextedit( defaults );

```

 

## Build targets

* `npm run test` : Run Mocha tests in `./test`
* `npm run build` : Build `./src/**` into `cytoscape-node-text-edit.js`
* `npm run watch` : Automatically build on changes with live reloading (N.b. you must already have an HTTP server running)
* `npm run dev` : Automatically build on changes with live reloading with webpack dev server
* `npm run lint` : Run eslint on the source

N.b. all builds use babel, so modern ES features can be used in the `src`.


## Publishing instructions

This project is set up to automatically be published to npm and bower.  To publish:

1. Build the extension : `npm run build:release`
1. Commit the build : `git commit -am "Build for release"`
1. Bump the version number and tag: `npm version major|minor|patch`
1. Push to origin: `git push && git push --tags`
1. Publish to npm: `npm publish .`
 


## Credits

This extension was created starting from ([cytoscape-edgehandles.js](https://github.com/cytoscape/cytoscape.js-edgehandles))