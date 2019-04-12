<template>
    <div style="border:3px solid green;padding:10px;">
        <h1 style="margin:0;">Example Vue component</h1>
        <div v-if="param1">Value of param1: {{param1}}</div>
        <div v-if="param2">Value of param2: {{param2}}</div>
        <button @click="incrementCounter()">Increment counter</button>

		<div v-if="scriptUrl" class="embed-me">
			<p>Embed me:</p>
			<pre>
				&lt;some-vue-component param1="p1.." param2="p2..."&gt;&lt;/some-vue-component&gt;
				&lt;script src="{{scriptUrl}}"&gt;&lt;/script&gt;
			</pre>
		</div>
    </div>
</template>

<script>
export default {
    props: ['param1', 'param2'],
    data() {
        return {
			counter: 0,
			scriptUrl: false
        }
	},
	mounted() {
		try {
			this.scriptUrl = document.currentScript.src;
		} catch (err) {

		}
	},
    methods: {
        incrementCounter() {
            this.counter++;

            var myEvent = new CustomEvent('increment-counter', {bubbles: true});
            this.$el.dispatchEvent(myEvent);
        }
    }
}
</script>

<style>
.embed-me pre {
	padding: 10px;
	background: #ddd;
	white-space: pre-line;
}
</style>
