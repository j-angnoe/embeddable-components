// semi global.

var anticipatedSelectors = {};
var hasBeenStarted = false;

var EmbeddableComponents = {
    /**
     * Hold the registered tagName/creator functions
     * 
     * This makes sure that we can inspect the anticipated selectors
     * via DevTools. Later on we expose EmbeddableComponents to window.
     * 
     */
    anticipatedSelectors: anticipatedSelectors,

    /**
     * Start
     * 
     * Should be called as soon as possible.
     * 
     */
    start() {
        // EmbeddableComponent Framework
        anticipatedSelectors = {};
        hasBeenStarted = true;
    },

    /**
     * Register a creator for a given tagName.
     * The creator function is passed a the DOM element
     * whenever we its created. The creator function is responsible
     * for mounting a given component to the passed dom element.
     * 
     * Please make sure you're that you add an `onRemove` attribute function
     * to the node that your creator function creates. See the Vue implementation 
     * for details.
     * 
     * @param String tagName 
     * @param Function creatorFunction 
     */
    registerTagName(tagName, creatorFunction) {
        if (!hasBeenStarted) {
            this.start();
        }
        window.customElements.define(tagName, class extends HTMLElement {
            connectedCallback() {
                creatorFunction(this);
            }
            disconnectedCallback() {
                // we expect that a creator adds an `onRemove` function to
                // this element.
                this.onRemove && this.onRemove();
            }
        })
    },
    /**
     * Return all element attributes as a simple javascript object:
     * A Helper/utility function. Each framework creator must process
     * component attributes and hand them over to the mounted component.
     * 
     * Lets say domElement = <div attr1="value1" attr2="value2" />
     * This function will return {"attr1" : "value1", "attr2" : "value2" }
     * 
     * @param DOMElement domElement 
     * @return Object<String attributeName: String attributeValue>
     */
    getElementAttributes(domElement) {
        var attr = {};
        var i, a;
        var searchParams = new URLSearchParams(location.search);

        for (i = 0; i < domElement.attributes.length; i++) {
            a = domElement.attributes[i];

            var val = a.nodeValue;
            var tmp;
            if (tmp = a.nodeValue.match(/\${location.search.(.+)}/)) {
                val = searchParams.get(tmp[1]);
            }
            attr[a.nodeName] = val;
        }
        return attr;
    }
}

var registeredAssets = {};

EmbeddableComponents.registerLibrary = function register(assets) {
    Object.assign(registeredAssets, assets);
};

// Framework support:

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

        var Vue = registeredAssets.Vue || window.Vue || null;


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

    // Act upon current elements: 
    //[].map.call(document.querySelectorAll(tagName), vueCreator);
};

// Support for React Framework:
/**
 * registerReactComponent
 * 
 * Tell the framework that whenever a tag identified by tagName
 * is added to the DOM that this tag should be mounted with vue.
 * 
 * @param String tagName 
 * @param ReactComponent reactComponent 
 */
EmbeddableComponents.registerReactComponent = function registerReactComponent (tagName, reactComponent) {
    var reactCreator = function (domElement) {     
        var React = registeredAssets.React || window.React || null;
        var ReactDOM = registeredAssets.ReactDOM || window.ReactDOM || null;

        if (!React || !ReactDOM) {
            throw new Error('React/ReactDOM is not available to EmbeddableComponents, please register them via EmbeddableComponents.registerLibrary({React: React, ReactDOM: ReactDOM})');
        }

        var attr = EmbeddableComponents.getElementAttributes(domElement);

        var reactDomTree = React.createElement(reactComponent, attr, domElement.innerHTML);

        ReactDOM.render(reactDomTree, domElement);
        
        domElement.onRemove = function () {
            ReactDOM.unmountComponentAtNode(domElement);
        }
    };

    // Anticipate for future node creation:
    EmbeddableComponents.registerTagName(tagName, reactCreator);

    // Act upon current elements: 
    //[].map.call(document.querySelectorAll(tagName), reactCreator);
}


/**
 * Make sure EmbeddableComponents is inspectable via DevTools.
 */
module.exports.EmbeddableComponents = EmbeddableComponents;
window.EmbeddableComponents = window.EmbeddableComponents || module.exports.EmbeddableComponents;


