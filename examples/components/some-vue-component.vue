<template>
    <div style="border:3px solid green;padding:10px;">
        <h1 style="margin:0;">Zomaar een Vue component</h1>
        <div v-if="param1">Param1: {{param1}}</div>
        <div v-if="param2">Param2: {{param2}}</div>
        <button @click="sayHello()">Klik hier</button>
        <button @click="incrementCounter()">Teller: {{counter}}</button>
    </div>
</template>

<script>
export default {
    props: ['param1', 'param2'],
    data() {
        return {
            counter: 0
        }
    },
    methods: {
        sayHello() {
            alert("hallo");
        },
        incrementCounter() {
            this.counter++;

            var myEvent = new CustomEvent('increment-counter', {bubbles: true});
            this.$el.dispatchEvent(myEvent);
        }
    }
}
</script>

<style>

</style>
