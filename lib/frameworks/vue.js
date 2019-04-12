import EmbeddableComponents from 'embeddable-components';

/**
 * registerVueComponent
 *
 * Tell the framework that whenever a tag identified by tagName
 * is added to the DOM that this tag should be mounted with vue.
 *
 * @usage
 * ```
 * my-vue-component.js:
 *
 * var myVueComponent = {
 *  props: {
 *      someParameter: { type: String }
 *  },
 *  template: `<div>Hello from Vue.js, your parameter was {{someParameter}}</div>`
 * }
 *
 * EmbeddableComponents.registerVueComponent('my-vue-component', myVueComponent);
 *
 * # Somewhere in a html page:
 *
 * <my-vue-component some-parameter="some-value" />
 *
 * <script src="path/to/vue.js"></script>
 * <script src="path/to/embeddable-components.js"></script>
 * <script src="path/to/my-vue-component.js"></script>
 * ```
 *
 * @param String tagName
 * @param VueComponentDefinition VueComponent
 */

EmbeddableComponents.registerVueComponent = function registerVueComponent(tagName, VueComponent) {
	var vueCreator = function (domElement) {
		var attr = EmbeddableComponents.getElementAttributes(domElement)

		var Vue = EmbeddableComponents.registeredAssets.Vue || window.Vue || null;

		var vueInstance = new Vue({
			el: domElement,
			render(vueNode) {
				return vueNode(VueComponent, {attrs: attr}, domElement.innerHTML);
			},
			mounted() {
				this.$el.onRemove =  () => {
					this.$destroy();
				}
			}
		});
	};

	// Anticipate for future node creation:
	EmbeddableComponents.registerTagName(tagName, vueCreator);
};
