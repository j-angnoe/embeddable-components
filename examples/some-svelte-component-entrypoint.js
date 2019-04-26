
import EmbeddableComponent from 'embeddable-components';
import App from './components/some-svelte-component.svelte';


EmbeddableComponent.registerTagName('some-svelte-component', domElement => {

	const app = new App({
		target: domElement,
		props: EmbeddableComponent.getElementAttributes(domElement)
	});

	domElement.onRemove = () => {
		app.$destroy();
	};

});
