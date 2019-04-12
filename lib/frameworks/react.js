import EmbeddableComponents from 'embeddable-components';

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
		var React = EmbeddableComponents.registeredAssets.React || window.React || null;
		var ReactDOM = EmbeddableComponents.registeredAssets.ReactDOM || window.ReactDOM || null;

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
}
