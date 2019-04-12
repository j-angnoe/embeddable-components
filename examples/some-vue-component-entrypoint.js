

import SomeVueComponent from './components/some-vue-component.vue';
import { EmbeddableComponents } from '../WebComponent';
import Vue from 'vue';


EmbeddableComponents.registerLibrary({Vue: Vue});
EmbeddableComponents.registerVueComponent('some-vue-component', SomeVueComponent);

