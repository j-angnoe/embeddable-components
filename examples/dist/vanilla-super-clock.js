/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./vanilla-super-clock.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../lib/EmbeddableComponents.js":
/*!**************************************!*\
  !*** ../lib/EmbeddableComponents.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _domAnticipateCreation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domAnticipateCreation */ \"../lib/domAnticipateCreation.js\");\n // semi global.\n\nvar hasBeenStarted = false;\nvar EmbeddableComponents = {\n  /**\n   * Start\n   *\n   * Should be called as soon as possible.\n   *\n   */\n  start: function start() {\n    // EmbeddableComponent Framework\n    hasBeenStarted = true;\n    Object(_domAnticipateCreation__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(document);\n  },\n\n  /**\n   * Register a creator for a given tagName.\n   * The creator function is passed a the DOM element\n   * whenever we its created. The creator function is responsible\n   * for mounting a given component to the passed dom element.\n   *\n   * Please make sure you're that you add an `onRemove` attribute function\n   * to the node that your creator function creates. See the Vue implementation\n   * for details.\n   *\n   * @param String tagName\n   * @param Function creatorFunction\n   */\n  registerTagName: function registerTagName(tagName, creatorFunction) {\n    if (!hasBeenStarted) {\n      this.start();\n    } // Act upon current elements:\n\n\n    [].map.call(document.querySelectorAll(tagName), creatorFunction);\n    _domAnticipateCreation__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagName(tagName, creatorFunction);\n  },\n\n  /**\n   * Return all element attributes as a simple javascript object:\n   * A Helper/utility function. Each framework creator must process\n   * component attributes and hand them over to the mounted component.\n   *\n   * Lets say domElement = <div attr1=\"value1\" attr2=\"value2\" />\n   * This function will return {\"attr1\" : \"value1\", \"attr2\" : \"value2\" }\n   *\n   * @param DOMElement domElement\n   * @return Object<String attributeName: String attributeValue>\n   */\n  getElementAttributes: function getElementAttributes(domElement) {\n    var attr = {};\n    var i, a;\n    var searchParams = new URLSearchParams(location.search);\n\n    for (i = 0; i < domElement.attributes.length; i++) {\n      a = domElement.attributes[i];\n      var val = a.nodeValue;\n      var tmp = void 0;\n\n      if (tmp = a.nodeValue.match(/\\${location.search.(.+)}/)) {\n        val = searchParams.get(tmp[1]);\n      }\n\n      attr[a.nodeName] = val;\n    }\n\n    return attr;\n  },\n\n  /**\n   * getScriptOrigin\n   *\n   * Utility function:\n   * Returns the origin of the server that hosts the current script.\n   * The origin contains the scheme, host and portnumber (if necessary)\n   *\n   * Example:\n   * getScriptOrigin() -> http://localhost:8181\n   */\n  getScriptOrigin: function getScriptOrigin() {\n    try {\n      var urlParser = document.createElement('a');\n      urlParser.href = document.currentScript.src;\n      return urlParser.origin;\n    } catch (error) {\n      console.error('getScriptOrigin error:', error);\n    }\n\n    return '';\n  }\n};\nEmbeddableComponents.registeredAssets = {};\n\nEmbeddableComponents.registerLibrary = function register(assets) {\n  Object.assign(EmbeddableComponents.registeredAssets, assets);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (EmbeddableComponents);\n\n//# sourceURL=webpack:///../lib/EmbeddableComponents.js?");

/***/ }),

/***/ "../lib/domAnticipateCreation.js":
/*!***************************************!*\
  !*** ../lib/domAnticipateCreation.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nvar anticipatedSelectors = {};\n/**\n * Anticipe the creation of certain dom nodes.\n * @access private\n * @param DOMElement target - usually `document` will suffice.\n * @return void\n */\n\nfunction domAnticipateCreation(target) {\n  var mo = new MutationObserver(function (records) {\n    var _iteratorNormalCompletion = true;\n    var _didIteratorError = false;\n    var _iteratorError = undefined;\n\n    try {\n      for (var _iterator = records[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n        var rec = _step.value;\n        var _iteratorNormalCompletion2 = true;\n        var _didIteratorError2 = false;\n        var _iteratorError2 = undefined;\n\n        try {\n          for (var _iterator2 = rec.addedNodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n            var node = _step2.value;\n\n            var _loop = function _loop(selector) {\n              sel = [];\n\n              if (node && node.querySelectorAll) {\n                var _sel;\n\n                sel = (_sel = sel).concat.apply(_sel, _toConsumableArray(node.querySelectorAll(selector)));\n              }\n\n              if (node && node.matches && node.matches(selector)) {\n                sel = sel.concat(node);\n              } // Prevent double reporting by MutationObserver.\n\n\n              var markerAttribute = '__embedded_components_handled';\n              [].forEach.call(sel, function (sub) {\n                if (sub.hasAttribute(markerAttribute)) {\n                  return;\n                }\n\n                sub.setAttribute(markerAttribute, true);\n                anticipatedSelectors[selector].call(null, sub);\n              });\n            };\n\n            for (var selector in anticipatedSelectors) {\n              var sel;\n\n              _loop(selector);\n            }\n          }\n        } catch (err) {\n          _didIteratorError2 = true;\n          _iteratorError2 = err;\n        } finally {\n          try {\n            if (!_iteratorNormalCompletion2 && _iterator2[\"return\"] != null) {\n              _iterator2[\"return\"]();\n            }\n          } finally {\n            if (_didIteratorError2) {\n              throw _iteratorError2;\n            }\n          }\n        }\n\n        var _iteratorNormalCompletion3 = true;\n        var _didIteratorError3 = false;\n        var _iteratorError3 = undefined;\n\n        try {\n          for (var _iterator3 = rec.removedNodes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {\n            var _node = _step3.value;\n\n            (function findOnRemove(node) {\n              if (node.onRemove) {\n                node.onRemove();\n              }\n\n              [].forEach.call(node.childNodes, findOnRemove);\n            })(_node);\n          }\n        } catch (err) {\n          _didIteratorError3 = true;\n          _iteratorError3 = err;\n        } finally {\n          try {\n            if (!_iteratorNormalCompletion3 && _iterator3[\"return\"] != null) {\n              _iterator3[\"return\"]();\n            }\n          } finally {\n            if (_didIteratorError3) {\n              throw _iteratorError3;\n            }\n          }\n        }\n      }\n    } catch (err) {\n      _didIteratorError = true;\n      _iteratorError = err;\n    } finally {\n      try {\n        if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n          _iterator[\"return\"]();\n        }\n      } finally {\n        if (_didIteratorError) {\n          throw _iteratorError;\n        }\n      }\n    }\n  });\n  mo.observe(target, {\n    attributes: false,\n    childList: true,\n    subtree: true\n  });\n}\n\ndomAnticipateCreation.registerTagName = function (tagName, creatorFunction) {\n  anticipatedSelectors[tagName] = creatorFunction;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (domAnticipateCreation);\n\n//# sourceURL=webpack:///../lib/domAnticipateCreation.js?");

/***/ }),

/***/ "./vanilla-super-clock.js":
/*!********************************!*\
  !*** ./vanilla-super-clock.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var embeddable_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! embeddable-components */ \"../lib/EmbeddableComponents.js\");\n\nembeddable_components__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagName('super-clock', function (domElement) {\n  var prefix = domElement.getAttribute('prefix') || '';\n\n  function pad0(number) {\n    return number < 0 ? numer : number < 10 ? \"0\".concat(number) : \"\".concat(number);\n  }\n\n  domElement.innerHTML = \"\";\n\n  function updateTime() {\n    var dt = new Date();\n    var hours = dt.getHours();\n    var mins = dt.getMinutes();\n    var secs = dt.getSeconds();\n    domElement.innerHTML = \"\".concat(pad0(hours), \":\").concat(pad0(mins), \":\").concat(pad0(secs));\n  }\n\n  updateTime();\n  var interval = setInterval(updateTime, 500);\n\n  domElement.onRemove = function () {\n    clearInterval(interval);\n  };\n});\n\n//# sourceURL=webpack:///./vanilla-super-clock.js?");

/***/ })

/******/ });