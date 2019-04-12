# Embeddable Components
This is a convention on how to build (web) components that can be embedded
in third party (web) systems.

## Demo:
[Check out a demo here](https://raw.githack.com/j-angnoe/embeddable-components/master/examples/)

## The goal:
Sharing and reusing end-user facing pieces of software, without using
iframes. (Examples: media embeds, reservation widgets, calculators).

## How should this work:
There are 3 parties involved here: The supplier of the widget,
the consumer that want to integrate the widget in his/her product, and finally the end-user that will use the functionality.

The consumer will receive instruction on how to integrate the product.
It's possible that the widget can be configured in a way. This solution
should allow for this type of communication.

The instructions for the consumer are:

Add this script at the end of the body:
```
<script src="//domain/path/to/javascript.js"></script>
```

And insert this piece where you want the widget to appear:
```
<fancy-widget param1="..." param2=".."></fancy-widget>
```

### Requirements
- The widget may appear more than one time on a page.
- Each occurence may have its own parameters
- It's possible that widgets will be added to the page or removed
  from the page.
- It's possible for a widget to communicate with the host page via events.
- The consumer must not be forced to use a certain web-framework
- The widget must not interfere with the host document. No overwritting of globals (for instance jquery/$)
- The supplier needs to take care of the correct CORS configuration, if
  backend communication is used.
- The supplier is free to use any technology (the right tool for the job),
  without interfering with the host, and vice-versa.

## Use of webframeworks
Basically each framework dictates that you have a root-node for the
application to mount. Usually one will add a <div id="app"> to the
page and point the framework there (https://vuejs.org/v2/guide/, https://reactjs.org/docs/add-react-to-a-website.html).

This wont fit our requirements. The bootstrapping process of embeddable
components that use frameworks needs to be more flexible. Instead of relying
on the existence of a certain DOM element, one should wait until that
certain DOM element is added to the DOM. Besides reactive bootstrapping, one
should also take care of proper cleanup when your application is removed
from the document. When you finally bootstrapped the application host parameters need to be hoisted to your application....

## The embeddable component library
This library takes care of reacting to relevant DOM changes, so a supplier
only needs to worry about his widget. Specifically: The library handles
the following:
- Reacting to additions of a target node
- Reacting to removal of target node
- Transferring parameters (by consumer) to the widget application
- Providing some framework specific bootstrappers (vue, react)
- Providing some relevant utility functions for building stuff that
  runs on someone else's server.

## Basic usage example:
For a supplier to be able to write an component that can be
embedded in the previously described way (<script ...> + <fancy-widget>)
he needs to edit the bootstrapping part of his application.

Let's say his index.js looks as following, we'll assume its a Vue application.

```js
// Example before-embeddable-components index.js

const Vue = require('vue');
const FancyWidget = require('./components/FancyWidget.vue');

new Vue({
	el: '#fancy-widget',
	render(h) {
		return h(FancyWidget)
	}
});

```

This will be loaded, look for an element with id=fancy-widget
and mount a Vue application on it.

```js
// example embeddable component index.js

const Vue = require('vue');
const FancyWidget = require('./components/FancyWidget.vue');

const EmbeddableComponents = require('embeddable-components');

EmbeddableComponents.registerLibrary({Vue: Vue});
EmbeddableComponents.registerVueComponent('fancy-widget', FancyWidget);

```





















