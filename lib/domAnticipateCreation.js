var anticipatedSelectors = {};

/**
 * Anticipe the creation of certain dom nodes.
 * @access private
 * @param DOMElement target - usually `document` will suffice.
 * @return void
 */
function domAnticipateCreation(target) {
	var mo = new MutationObserver((records) => {
		for (let rec of records) {
			for (let node of rec.addedNodes) {
				for (let selector in anticipatedSelectors) {
					var sel = [];
					if (node && node.querySelectorAll) {
							sel = sel.concat(...node.querySelectorAll(selector));
					}
					if (node && node.matches && node.matches(selector)) {
							sel = sel.concat(node);
					}

					// Prevent double reporting by MutationObserver.
					const markerAttribute = '__embedded_components_handled';

					[].forEach.call(sel, sub => {
							if (sub.hasAttribute(markerAttribute)) {
									return;
							}
							sub.setAttribute(markerAttribute, true);
							anticipatedSelectors[selector].call(null, sub);
					})
				}
			}

			for (let node of rec.removedNodes) {
				(function findOnRemove(node) {
					if (node.onRemove) {
							node.onRemove();
					}
					[].forEach.call(node.childNodes, findOnRemove)
				})(node);
			}
		}
	});
	mo.observe(target, {attributes: false, childList: true, subtree: true});
}

domAnticipateCreation.registerTagName = function (tagName, creatorFunction) {
	anticipatedSelectors[tagName] = creatorFunction;
}

export default domAnticipateCreation;
