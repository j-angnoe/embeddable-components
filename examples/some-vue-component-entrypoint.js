

import SomeVueComponent from './components/some-vue-component.vue';
import { EmbeddableComponents } from '../EmbeddableComponents';
import Vue from 'vue';


EmbeddableComponents.registerLibrary({Vue: Vue});
EmbeddableComponents.registerVueComponent('some-vue-component', SomeVueComponent);

