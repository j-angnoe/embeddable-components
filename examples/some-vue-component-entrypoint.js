

import SomeVueComponent from './components/some-vue-component.vue';
import EmbeddableComponents from 'embeddable-components';
import VueSupport from 'embeddable-components/lib/frameworks/vue';

import Vue from 'vue';


EmbeddableComponents.registerLibrary({Vue: Vue});
EmbeddableComponents.registerVueComponent('some-vue-component', SomeVueComponent);

