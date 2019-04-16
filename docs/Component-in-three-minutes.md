# Emeddable component in three minutes:

## Prerequisites

```sh
# Make sure we have parcel at our disposal
npm install -g parcel-bundler;

# Create a directory for us to work in:
mkdir three-minute-component;
cd three-minute-component;

```

## Lets get going

Make sure you create these two files:
- three-minute-component.html
- three-minute-component.js

Lets add some content, you may get creative here.

three-minute-component.html

```html
<h1>My first three minute component</h1>

<three-minute-component your-param="your-value"></three-minute-component>

<script src="three-minute-component.js"></script>
```

three-minute-component.js
```js
alert("It's working");
```

Let's have our first look:

```sh
# Let parcel serve our stuff:
parcel three-minute-component.html
```

Parcel will start a small development server at http://localhost:1234, open this in your browser.

You should see an alert which says `It's working`.

### Adding some vanilla js functionality

Let's replace the content of three-minute-component.js

```js
import EmbeddableComponents from 'embeddable-components';

EmbeddableComponents.registerTagName('three-minute-component', function (domElement) {
    domElement.innerHTML = 'Hello world!';
});
```

### The end.

We've succesfully laid down the essentials for a vanilla js embeddable component.


## PS. A Vue.js embeddable component

- Create a file thee-minute-component.vue and fill it:

thee-minute-component.vue:
```vue
<template>
	<div>
		Hello {{name}} from vue
	</div>
</template>
<script>
export default {
	data(){
		return {
			name: 'world'
		}
	}
}
</script>
<style scoped>
div {
	color: blue;
}
</style>
```

three-minute-component.js:
```js
import EmbeddableComponents from 'embeddable-components';
import VueSupport from 'embeddable-components/lib/frameworks/vue';

import Vue from 'vue/dist/vue.common';
import ThreeMinuteComponent from './three-minute-component.vue'

EmbeddableComponents.registerLibrary({Vue: Vue});

EmbeddableComponents.registerVueComponent('three-minute-component', ThreeMinuteComponent)

```

That should work.

## PPS. A React component

- Lets create three-minute-component.jsx

three-minute-component.jsx:
```jsx

import React from 'react';

export default class extends React.Component {
    constructor() {
        super();

        this.name = 'world';
    }

	render() {
		return (
			<div>
				Hello {this.name} from React
			</div>
		)
	}
}
```

The bootstrap for react should look like this:

three-minute-component.js:
```js
import EmbeddableComponents from 'embeddable-components';
import ReactSupport from 'embeddable-components/lib/frameworks/react';

import React from 'react';
import ReactDOM from 'react-dom';


import ThreeMinuteComponent from './three-minute-component.jsx'

EmbeddableComponents.registerLibrary({React, ReactDOM});

EmbeddableComponents.registerReactComponent('three-minute-component', ThreeMinuteComponent)

```



