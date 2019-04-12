# Integrating your framework

EmbeddableComponents need to be told what to do when
it encounters a DOM element.

This is done via:
EmbeddableComponents.registerTag(
	String tagName,
	Function creatorFunction (domElement)
)

Usually your bootstrapping code looks something like this:

```js
# from https://svelte.technology/guide
import App from './App.html';

const app = new App({
	target: document.querySelector('main'),
	data: { name: 'world' }
});

// change the data associated with the template
app.set({ name: 'everybody' });

// detach the component and clean everything up
app.destroy();
```

Your app will mount on #main.

## Step 1: Reactive bootstrapping

To change this to work with embeddable components:


```js

import EmbeddableComponents from 'embeddable-components';
import App from './App.html';

EmbeddableComponents.registerTagName('your-widget', function(domElement) {
	// This function is called every time we need to get
	// into action (on dom node added)

	const app = new App({
		target: domElement
		data: { name: 'world' }
	});

	// this is a basic example, we will add some
	// more code here in a bit...

	// EmbeddableComponents allows you to define
	// a cleanup action by adding an onRemove function to the
	// domElement.
	domElement.onRemove = function () {
		// detach the component and clean everything up
		app.destroy();
	};
}
```


## Step 2: Passing parameters/props...
Collecting properties to pass is something which will
be quite common for embeddableComponent integrations,
that's why we've added:

EmbeddableComponents.getElementAttributes(DOMElement target) returns an object with all the attributes
({ "param1" : "value1", "param2" : "...", ... })

We're going to expand our bootstrapper:

```js

	// we've added a utility that gathers all attributes
	// of the target node

	const app = new App({
		target: domElement
		data: { name: 'world' }
	});

	// collect attributes
	var attr = EmbeddableComponents.getElementAttributes(domElement);

	// pass them to our app.
	Object.keys(attr).forEach(key => {
		app.set(key, attr[key]);
	});

	// please note that this is one-way.

	domElement.onRemove = function () {
		// detach the component and clean everything up
		app.destroy();
	};

```



