
import domAnticipateCreation from './domAnticipateCreation';

// semi global.
let hasBeenStarted = false;

const EmbeddableComponents = {
	/**
	 * Start
	 *
	 * Should be called as soon as possible.
	 *
	 */
	start() {
		// EmbeddableComponent Framework
		hasBeenStarted = true;
		domAnticipateCreation(document);
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

		// Act upon current elements:
		[].map.call(document.querySelectorAll(tagName), creatorFunction);

		domAnticipateCreation.registerTagName(tagName, creatorFunction);
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
		const attr = {};
		let i, a;
		const searchParams = new URLSearchParams(location.search);

		for (i = 0; i < domElement.attributes.length; i++) {
			a = domElement.attributes[i];

			const val = a.nodeValue;
			let tmp;
			if (tmp = a.nodeValue.match(/\${location.search.(.+)}/)) {
				val = searchParams.get(tmp[1]);
			}
			attr[a.nodeName] = val;
		}
		return attr;
	},

	/**
	 * getScriptOrigin
	 *
	 * Utility function:
	 * Returns the origin of the server that hosts the current script.
	 * The origin contains the scheme, host and portnumber (if necessary)
	 *
	 * Example:
	 * getScriptOrigin() -> http://localhost:8181
	 */
	getScriptOrigin() {
		try {
			const urlParser = document.createElement('a');
			urlParser.href = document.currentScript.src;
			return urlParser.origin;
		} catch (error) {
			console.error('getScriptOrigin error:', error);
		}
		return '';
	}
}

EmbeddableComponents.registeredAssets = {};

EmbeddableComponents.registerLibrary = function register(assets) {
	Object.assign(EmbeddableComponents.registeredAssets, assets);
};

export default EmbeddableComponents;
