(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cytoscapeNodeTextEdit"] = factory();
	else
		root["cytoscapeNodeTextEdit"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LOG_OPTIONS = {
  enabled: true
};

function log(msg) {
  if (LOG_OPTIONS.enabled) {
    for (var _len = arguments.length, parameters = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      parameters[_key - 1] = arguments[_key];
    }

    console.log("[cytoscape-node-text-edit] " + msg, parameters);
  }
}

module.exports = { log: log, LOG_OPTIONS: LOG_OPTIONS };

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Simple, internal Object.assign() polyfill for options objects etc.

module.exports = Object.assign != null ? Object.assign.bind(Object) : function (tgt) {
  for (var _len = arguments.length, srcs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    srcs[_key - 1] = arguments[_key];
  }

  srcs.filter(function (src) {
    return src != null;
  }).forEach(function (src) {
    Object.keys(src).forEach(function (k) {
      return tgt[k] = src[k];
    });
  });

  return tgt;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    log = _require.log;

function showEditBox(node, options, cy) {

  log("Showing edit box", cy);

  var cyContainer = cy.container();
  var cyPos = getPosition(cyContainer);
  log("Cy pos: ", cyPos);

  var pos = node.renderedBoundingBox();
  var style = node.renderedStyle();

  // Create the content-editable div that will allow text edit
  var cont = document.createElement("div");
  cont.id = "edit_" + new Date().getTime();

  // Set position  
  cont.style.position = 'fixed';
  cont.style.top = cyPos.y + pos.y1 + 'px';
  cont.style.minHeight = pos.h + 'px';
  cont.style.zIndex = options.zIndex;

  if (style.textMaxWidth) {
    var iw = parseFloat(style.textMaxWidth.substr(0, style.textMaxWidth.length - 2));
    log("Parsed width:", iw);
    if (iw > options.maxTextWidth) {
      iw = options.maxTextWidth;
      log("Capped width:", iw);
    }
    cont.style.width = iw + "px";
    cont.style.left = cyPos.x + pos.x1 + (pos.w - iw) / 2 + 'px';
  } else {
    cont.style.width = 400;
    cont.style.left = cyPos.x + (pos.x1 - 200) + 'px';
  }

  cont.innerText = node.data(options.nodeLabel);
  cont.contentEditable = true;

  // Set style to match node
  cont.style.resize = 'both';
  cont.style.backgroundColor = options.backgroundColor;
  cont.style.opacity = options.backgroundOpacity;
  cont.style.fontFamily = style.fontFamily;
  cont.style.fontSize = style.fontSize;
  cont.style.fontWeight = style.fontWeight;
  cont.style.textAlign = style['text-halign'] || 'center';
  cont.style.lineHeight = (style['line-height'] || 1) + 'rem';

  if (cont.style.textJustify == 'left') {
    cont.style.left = pos.x + 'px';
  }

  if (options.pasteAsPlainText) {
    cont.addEventListener('paste', function (e) {
      log("Intercepted paste - transforming to plain text");
      e.preventDefault();
      var text = (e.originalEvent || e).clipboardData.getData('text/plain');
      window.document.execCommand('insertText', false, text);
    });
  }

  document.body.appendChild(cont);

  // After overlay added, focus and set selection
  cont.focus();
  window.cyEditBox = cont.id;

  setCursorToEnd(cont, options.selectAllText);

  return cont;
}

// Helper function to get an element's exact position
// Source: https://www.kirupa.com/html5/get_element_position_using_javascript.htm
function getPosition(el) {
  var xPos = 0;
  var yPos = 0;

  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;

      xPos += el.offsetLeft - xScroll + el.clientLeft;
      yPos += el.offsetTop - yScroll + el.clientTop;
    } else {
      // for all other non-BODY elements
      xPos += el.offsetLeft - el.scrollLeft + el.clientLeft;
      yPos += el.offsetTop - el.scrollTop + el.clientTop;
    }

    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}

function setCursorToEnd(el, selectAllText) {
  var range = document.createRange();
  var sel = window.getSelection();
  range.selectNodeContents(el);
  if (!selectAllText) {
    range.collapse(false);
  }
  sel.removeAllRanges();
  sel.addRange(range);
  el.focus();
}

module.exports = {
  showEditBox: showEditBox
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var NodeTextEdit = __webpack_require__(6);
var assign = __webpack_require__(1);

module.exports = function (options) {
  var cy = this;

  return new NodeTextEdit(assign({ cy: cy }, options));
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var impl = __webpack_require__(3);

// registers the extension on a cytoscape lib ref
var register = function register(cytoscape) {
  if (!cytoscape) {
    return;
  } // can't register if cytoscape unspecified

  cytoscape('core', 'nodetextedit', impl); // register with cytoscape.js
};

if (typeof cytoscape !== 'undefined') {
  // expose to global cytoscape (i.e. window.cytoscape)
  register(cytoscape); // eslint-disable-line no-undef
}

module.exports = register;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(2),
    showEditBox = _require.showEditBox;

var _require2 = __webpack_require__(0),
    log = _require2.log;

function addCytoscapeListeners() {
  var cy = this.cy,
      options = this.options;

  // Show editor on node tap

  this.addListener(cy, 'tap', 'node', function (e) {

    // Close existing box if any open
    closeEditBox(options);

    var node = e.target;

    log("Node tap event:", e);
    log("Node tapped: ", node);
    log("Node position: ", node.renderedPosition());
    log("Rendered bounding box:", node.renderedBoundingBox());
    log("Rendered style: ", node.renderedStyle());

    if (node.classes().includes("eh-handle")) {
      // Don't add edit box for cytoscape-edgehandles handles
      return;
    }

    log("Zoom: ", cy.zoom());
    window.cyNodeEditing = node;

    var editor = showEditBox(node, options, cy);
    editor.addEventListener("keyup", function (ev) {
      if (ev.key == "Escape") {
        log("KeyUp - Escape: ", ev);
        closeEditBox(options);
      }
    });
  });

  this.addListener(cy, 'tap', function (e) {
    if (e.target === cy) {
      log("Core tap", window.cyEditBox, window.cyNodeEditing);
      if (window.cyEditBox) {
        closeEditBox(options);
      }
    }
  });
  this.addListener(cy, 'viewport', function (e) {
    if (e.target === cy) {

      if (window.cyEditBox) {
        log("CY- viewport change - closing overlay");
        closeEditBox(options);
      }
    }
  });

  this.addListener(cy, 'destroy', function (e) {
    if (e.target === cy) {

      if (window.cyEditBox) {
        log("CY- destroy - closing overlay");
        closeEditBox(options);
      }
    }
  });

  return this;
}

/**
 * Close editing overlay and save text to node
 */
function closeEditBox(options) {
  var div = document.getElementById(window.cyEditBox);
  log("closeEditBox - div:", div);
  if (!div) {
    window.cyEditBox = undefined;
    window.cyNodeEditing = undefined;
    return;
  }

  log("closeEditBox", div.innerText);
  if (window.cyNodeEditing) {

    var itxt = div.innerText;
    log("Text inner:" + itxt);

    window.cyNodeEditing.data(options.nodeLabel, itxt);
  }
  document.body.removeChild(div);
  window.cyEditBox = undefined;
  window.cyNodeEditing = undefined;
}

function changeEditBoxText(newText) {
  var div = document.getElementById(window.cyEditBox);
  log("changeEditBoxText - div:", div);
  div.innerText = newText;
}
module.exports = { addCytoscapeListeners: addCytoscapeListeners, closeEditBox: closeEditBox, changeEditBoxText: changeEditBoxText };

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(1);

var cyListeners = __webpack_require__(5);

var drawing = __webpack_require__(2);
var listeners = __webpack_require__(7);

var _require = __webpack_require__(0),
    LOG_OPTIONS = _require.LOG_OPTIONS;

var defaults = {
  selectAllText: false, // If true, selects all text when starting edit. Otherwise, selects last character.
  backgroundColor: 'white', // Colour of background overlay
  backgroundOpacity: 0.9, // Opacity of background overlay
  nodeLabel: 'name', // Which node.data() property holds the label
  showLogs: false, // Show debugging info in console
  zIndex: 1000, // zIndex of editing overlay
  pasteAsPlainText: true,
  maxTextWidth: 1000 // Maximum text width in pixels - if 'text-max-width'not specified
};

function NodeTextEdit(options) {
  var _this = this;

  var cy = options.cy;

  this.cy = cy;
  this.listeners = [];

  this.options = assign({}, defaults, options);
  LOG_OPTIONS.enabled = this.options.showLogs;

  this.addListeners();

  this.preventDefault = function (e) {
    return e.preventDefault();
  };

  this.closeEditing = function () {
    return cyListeners.closeEditBox(_this.options);
  };

  this.changeEditBoxText = function (newText) {
    return cyListeners.changeEditBoxText(newText);
  };
}

var proto = NodeTextEdit.prototype = {};
var extend = function extend(obj) {
  return assign(proto, obj);
};

proto.destroy = function () {
  this.removeListeners();
};

proto.setOptions = function (options) {
  assign(this.options, options);
};

proto.mp = function () {
  return { x: this.mx, y: this.my };
};

proto.hp = function () {
  return { x: this.hx, y: this.hy };
};

[cyListeners, drawing, listeners].forEach(extend);

module.exports = NodeTextEdit;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function addListeners() {
  var _this = this;

  this.addCytoscapeListeners();

  this.addListener(this.cy, 'destroy', function () {
    return _this.destroy();
  });

  return this;
}

function removeListeners() {
  for (var i = this.listeners.length - 1; i >= 0; i--) {
    var l = this.listeners[i];

    this.removeListener(l.target, l.event, l.selector, l.callback, l.options);
  }

  return this;
}

function getListener(target, event, selector, callback, options) {
  if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) !== _typeof('')) {
    callback = selector;
    options = callback;
    selector = null;
  }

  if (options == null) {
    options = false;
  }

  return { target: target, event: event, selector: selector, callback: callback, options: options };
}

function isDom(target) {
  return target instanceof Element;
}

function addListener(target, event, selector, callback, options) {
  var l = getListener(target, event, selector, callback, options);

  this.listeners.push(l);

  if (isDom(l.target)) {
    l.target.addEventListener(l.event, l.callback, l.options);
  } else {
    if (l.selector) {
      l.target.addListener(l.event, l.selector, l.callback, l.options);
    } else {
      l.target.addListener(l.event, l.callback, l.options);
    }
  }

  return this;
}

function removeListener(target, event, selector, callback, options) {
  var l = getListener(target, event, selector, callback, options);

  for (var i = this.listeners.length - 1; i >= 0; i--) {
    var l2 = this.listeners[i];

    if (l.target === l2.target && l.event === l2.event && (l.selector == null || l.selector === l2.selector) && (l.callback == null || l.callback === l2.callback)) {
      this.listeners.splice(i, 1);

      if (isDom(l.target)) {
        l.target.removeEventListener(l.event, l.callback, l.options);
      } else {
        if (l.selector) {
          l.target.removeListener(l.event, l.selector, l.callback, l.options);
        } else {
          l.target.removeListener(l.event, l.callback, l.options);
        }
      }

      break;
    }
  }

  return this;
}

function emit(type, position) {
  var options = this.options,
      cy = this.cy;

  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  cy.emit({ type: 'eh' + type, position: position }, args);

  var handler = options[type];

  if (handler != null) {
    handler.apply(undefined, args);
  }

  return this;
}

function closeEditing(options) {
  this.closeEditBox(options);
}
module.exports = { addListener: addListener, addListeners: addListeners, removeListener: removeListener, removeListeners: removeListeners, emit: emit, closeEditing: closeEditing };

/***/ })
/******/ ]);
});