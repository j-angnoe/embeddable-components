<script>
let counter = 0;
export let param1;
export let param2;

let scriptUrl;
try {
	scriptUrl = document.currentScript.src;
} catch (ignore) {}

let container

function incrementCounter(event) {
	counter++;

	var myEvent = new CustomEvent('increment-counter', {bubbles: true});
	container.parentNode.dispatchEvent(myEvent);
}

</script>

<style>
.container {
	border: 3px solid orange;
	padding: 1rem;
}

h1 {
	padding: 0;
	margin: 0;
}
</style>

<div class="container" bind:this={container}>
	<h1>Svelte component</h1>

	{#if param1}
		<div>Value of param1: {param1}</div>
	{/if}

	{#if param2}
		<div>Value of param2: {param2}</div>
	{/if}

	<button on:click={ incrementCounter }>Increment counter</button>

	<p>
		Counter value: {counter}
	</p>

	{#if scriptUrl}
	<pre style="background: #ddd; padding: 10px;white-space:pre-line;">
		&lt;some-svelte-component param1="p1..." param2="p2..."&gt;&lt;/some-svelte-component&gt;<br/>
		&lt;script src="{scriptUrl}"&gt;&lt;/script&gt;
	</pre>
	{/if}
</div>
