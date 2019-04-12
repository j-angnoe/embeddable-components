
EmbeddedComponents:
	registerTagName(tagName, creatorFunction)

Framework specific checklist:
	- Allow multiple instances of a component to live independently
	- Dynamically adding nodes will work.
	- Accept component properties from Host.
	- Properly stop/cleanup/teardown the component when host removes the node.
	- Make you can add id's and classes to your component tag.
		eg.: <my-component id="my-component-1" />
	- A component may dispatch events that bubble up, so you can do this:

	```html
	<my-component id="my-component-1" />
	<script>
	var myComponent = document.getElementById('my-component-1');
	myComponent.addEventListener('some-event', event => {
		// do stuff whenever my-component emits a `some-event` event.
	});
	</script>

	<!-- inside my-component somewhere: -->
	<script>
	function onButtonClick() {
		var eventData = { ... whatever ... }
		var event = new CustomEvent('some-event', {bubbles: true, detail: eventData });

		componentRootElement.dispatchEvent(event);
	}
	</script>
	```


