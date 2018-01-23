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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var state = {
    currentChemical: null,
    previousChemical: null
};

function setState(newState) {
    state.previousChemical = state.currentChemical;
    Object.assign(state, newState);
}

/* harmony default export */ __webpack_exports__["a"] = ({ state, setState });


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dropzone_js__ = __webpack_require__(0);


var state = {
    disabled: true,
    contentVisible: false,
    timesUsed: 0,
    hintMessage: ""
}

function setState(newState) {
    Object.assign(state, newState);
    document.getElementById("hint_titlebtn").disabled = state.disabled;
    document.getElementById("hint_content").style.visibility = state.contentVisible ? "visible" : "hidden";
    document.getElementById("hint_contentp").innerHTML = state.hintMessage;
}

function toggleHint() {
    setState({contentVisible: !state.contentVisible});
    if(state.contentVisible && !__WEBPACK_IMPORTED_MODULE_0__dropzone_js__["a" /* default */].state.currentChemical.hintUsed) {
        console.log("hint used: " + __WEBPACK_IMPORTED_MODULE_0__dropzone_js__["a" /* default */].state.currentChemical.hintUsed);
        setState({timesUsed: state.timesUsed+1});
        __WEBPACK_IMPORTED_MODULE_0__dropzone_js__["a" /* default */].state.currentChemical.setState({hintUsed: true});
    }
}

/* harmony default export */ __webpack_exports__["a"] = ({ state, setState, toggleHint });


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var state = {
    names: ['lithium', 'li'],
    flameColour: "Crimson",
    hintType: 0,
    hintUsed: false,
    hasGuessed: false,
}

function setState(newState) {
    Object.assign(state, newState);
    if(state.hasGuessed)
        document.getElementById('lithium').getElementsByTagName('img')[0].src = "./images/chemicals/lithium/lithiumcomplete.png";
}

/* harmony default export */ __webpack_exports__["a"] = ({ state, setState });


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chemicals_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__questions_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hint_js__ = __webpack_require__(1);




var state = {
    step: 1,
    complete: false,
    marks: 10
};

function setState(newState) {
    Object.assign(state, newState);
    
    //Add the green complete mask and green tick to the previous step, and highlight the current one.
    if (state.step <= 2) {
        document
        .getElementById('step' + (state.step - 1))
        .getElementsByTagName('div')[3]
        .classList.add('stepComplete');
        document
        .getElementById('step' + (state.step - 1))
        .getElementsByTagName('div')[2]
        .getElementsByTagName('img')[0].src =
        './images/other/greentick.gif';
        document
        .getElementById('step' + state.step)
        .getElementsByTagName('div')[3]
        .classList.remove('nohighlight');
    }
    //Add the green complete mask and green tick to the current step.
    //This is as a separate if statement, as only using the one above will not correctly add masks etc. for the last step.
    if (state.complete) {
        document
        .getElementById('step' + state.step)
        .getElementsByTagName('div')[3]
        .classList.add('stepComplete');
        document
        .getElementById('step' + state.step)
        .getElementsByTagName('div')[2]
        .getElementsByTagName('img')[0].src =
        './images/other/greentick.gif';
    }
    
    //Set the questions to be visible.
    if(state.step == 2) {
        __WEBPACK_IMPORTED_MODULE_1__questions_js__["a" /* default */].setState({visible: true});
    }
}

function update() {
    if(state.step == 1) {
        var completeAmount = 0;
        //Loop through all the chemicals, and if each one has been guessed (state.hasGuessed), we go to the next step.
        for(var i = 0; i < __WEBPACK_IMPORTED_MODULE_0__chemicals_js__["a" /* default */].chemicals.length; i++) {
            var chemical = __WEBPACK_IMPORTED_MODULE_0__chemicals_js__["a" /* default */].chemicals[i];
            if(chemical.state.hasGuessed) completeAmount++;
            else    return;
        }
        if(completeAmount == 5) setState({step: 2});
    } else if(state.step == 2 && __WEBPACK_IMPORTED_MODULE_1__questions_js__["a" /* default */].state.questionsComplete == 3) {
        //Complete the experiment, and deduct marks for hint use (-1 mark for each hint).
        //Hint use is worked out by each time the hint is opened.
        setState({complete: true, marks: (state.marks - __WEBPACK_IMPORTED_MODULE_2__hint_js__["a" /* default */].state.timesUsed)});
    }
}

/* harmony default export */ __webpack_exports__["a"] = ({ state, setState, update });


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__barium_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__calcium_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lithium_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__potassium_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sodium_js__ = __webpack_require__(12);






//List of chemicals in the experimen
var chemicals = [__WEBPACK_IMPORTED_MODULE_0__barium_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__calcium_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__lithium_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__potassium_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__sodium_js__["a" /* default */]];

//A function used to find the current chemical based on it's id by looping through the chemicals array.
//This will compare the id given to the chemical's names[0], which is it's full name. E.g. lithium.
//Each chemical's id in HTML is it's name.
function findChemical(id) {
    for(var i = 0; i < chemicals.length; i++) {
        var chemical = chemicals[i];
        if(chemical.state.names[0] == id)
            return chemical;
    }
    return null;
}

/* harmony default export */ __webpack_exports__["a"] = ({chemicals, findChemical});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__experiment_js__ = __webpack_require__(3);


var state = {
    visible: false,
    questionsComplete: 0
}

function setState(newState) {
    Object.assign(state, newState);
    if(state.visible)
        document.getElementById("questions_container").classList.remove("noshow");
    else
        document.getElementById("questions_container").classList.add("noshow");
}

//Function used to check the question answers.
//Messy code, however get's the job done.
function checkQuestionAnswer(question) {
    var answer;
    if (question == 1) {
        answer = document.getElementById("questionone_text").value.toLowerCase();
        if (answer == "k" || answer == "potassium") {
            document.getElementById("questionone_result").src =
            "./images/other/greentick.gif";
            setState({questionsComplete: state.questionsComplete+1});
        } else
            document.getElementById("questionone_result").src =
            "./images/other/redcross.png";
    } else if (question == 2) {
        answer = document.getElementById("questiontwo_text").value.toLowerCase();
        if (answer == "ca" || answer == "calcium") {
            document.getElementById("questiontwo_result").src =
            "./images/other/greentick.gif";
            setState({questionsComplete: state.questionsComplete+1});
        } else
            document.getElementById("questiontwo_result").src =
            "./images/other/redcross.png";
    } else if (question == 3) {
        answer = document.getElementById("questionthree_text").value.toLowerCase();
        if (answer == "salt") {
            document.getElementById("questionthree_result").src =
            "./images/other/greentick.gif";
            setState({questionsComplete: state.questionsComplete+1});
        } else
            document.getElementById("questionthree_result").src =
            "./images/other/redcross.png";
    }
    __WEBPACK_IMPORTED_MODULE_0__experiment_js__["a" /* default */].update();
}

/* harmony default export */ __webpack_exports__["a"] = ({ state, setState, checkQuestionAnswer });


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_interactjs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_interactjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_interactjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hint_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__answerbox_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dropzone_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__chemicals_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__flamecolour_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__questions_js__ = __webpack_require__(5);








__WEBPACK_IMPORTED_MODULE_0_interactjs___default()(".dropzone").dropzone({
    // only accept elements matching this CSS selector
    accept: ".drag-drop",
    // Require a 6% element overlap for a drop to be possible
    overlap: 0.06,
    ondragenter: function(event) {
        //Set the currentChemical to the result of the 'findChemical' function in chemicals.
        __WEBPACK_IMPORTED_MODULE_3__dropzone_js__["a" /* default */].setState({currentChemical: __WEBPACK_IMPORTED_MODULE_4__chemicals_js__["a" /* default */].findChemical(event.relatedTarget.getAttribute('id'))});
        //Set the hint message depending on what hintType the current chemical is.
        __WEBPACK_IMPORTED_MODULE_1__hint_js__["a" /* default */].setState({hintMessage: (__WEBPACK_IMPORTED_MODULE_3__dropzone_js__["a" /* default */].state.currentChemical.state.hintType == 0 ? "This metal ion is part of <b>Group 1</b> of the periodic table. These are called the <b>Alkali Metals</b>." : "This metal ion is part of <b>Group 2</b> of the periodic table. These are called the <b>Alkaline Earth Metals</b>.")});
        var chemical = event.relatedTarget.dataset.chemical;
        var elements = document.getElementsByClassName("flame");
        //Loop through all the elements that make up the moving flame, and give them the "hasChemical" class, as well as the currentChemical's name class
        //This is used so that the flame can change different colours depending on the currentChemical
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.add("hasChemical");
            elements[i].classList.add(__WEBPACK_IMPORTED_MODULE_3__dropzone_js__["a" /* default */].state.currentChemical.state.names[1]);
        }
        //Allow the flame colour message besides the flame to be visible.
        __WEBPACK_IMPORTED_MODULE_5__flamecolour_js__["a" /* default */].setState({visible: true});
        if (!__WEBPACK_IMPORTED_MODULE_3__dropzone_js__["a" /* default */].state.currentChemical.state.hasGuessed) {
            //Allow the hint to be used and answer box to be seen if the currentChemical hasn't been guessed yet.
            __WEBPACK_IMPORTED_MODULE_2__answerbox_js__["a" /* default */].setState({visible: true});
            __WEBPACK_IMPORTED_MODULE_1__hint_js__["a" /* default */].setState({disabled: false});
        }
    },
    ondragleave: function(event) {
        //Loop through all the elements that make up the moving flame, and remove the "hasChemical" class, as well as the currentChemical's name class from them
        //This is used so that the flame can change back to it's default colour
        var elements = document.getElementsByClassName("flame");
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove("hasChemical");
            elements[i].classList.remove(__WEBPACK_IMPORTED_MODULE_3__dropzone_js__["a" /* default */].state.currentChemical.state.names[1]);
        }
        //Set the currentChemical to null, as there is no chemical in the flame.
        //This is done after the for loop above, as that uses the currentChemical, thus if we did it before it would be null and fail.
        __WEBPACK_IMPORTED_MODULE_3__dropzone_js__["a" /* default */].setState({currentChemical: null});
        //Set the hint to be disabled, and hide the hint content. This is so that when a chemical is put back into the flame, the hint is closed and not open.
        __WEBPACK_IMPORTED_MODULE_1__hint_js__["a" /* default */].setState({disabled: true, contentVisible: false});
        //Set the flame colour message to not be visible anymore as the flame is the default colour.
        __WEBPACK_IMPORTED_MODULE_5__flamecolour_js__["a" /* default */].setState({visible: false});
        //Hide the answer box and clear the previous answer in the text box.
        __WEBPACK_IMPORTED_MODULE_2__answerbox_js__["a" /* default */].setState({visible: false, showResult: false});
    }
});

__WEBPACK_IMPORTED_MODULE_0_interactjs___default()(".draggable").draggable({
    // enable inertial throwing
    inertia: false,
    // keep the element within the area of it's parent
    restrict: {
        restriction: "parent",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,
    
    // call this function on every dragmove event
    onmove: dragMoveListener,
});

function dragMoveListener(event) {
    var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx,
    y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform = target.style.transform =
    "translate(" + x + "px, " + y + "px)";

    // update the posiion attributes
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
}

//Link the functions called by buttons in html to the right ones.
window.toggleHint = __WEBPACK_IMPORTED_MODULE_1__hint_js__["a" /* default */].toggleHint;
window.checkAnswer = __WEBPACK_IMPORTED_MODULE_2__answerbox_js__["a" /* default */].checkAnswer;
window.checkQuestionAnswer = __WEBPACK_IMPORTED_MODULE_6__questions_js__["a" /* default */].checkQuestionAnswer;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * interact.js v1.2.9
 *
 * Copyright (c) 2012-2015 Taye Adeyemi <dev@taye.me>
 * Open source under the MIT License.
 * https://raw.github.com/taye/interact.js/master/LICENSE
 */
(function (realWindow) {
    'use strict';

    // return early if there's no window to work with (eg. Node.js)
    if (!realWindow) { return; }

    var // get wrapped window if using Shadow DOM polyfill
        window = (function () {
            // create a TextNode
            var el = realWindow.document.createTextNode('');

            // check if it's wrapped by a polyfill
            if (el.ownerDocument !== realWindow.document
                && typeof realWindow.wrap === 'function'
                && realWindow.wrap(el) === el) {
                // return wrapped window
                return realWindow.wrap(realWindow);
            }

            // no Shadow DOM polyfil or native implementation
            return realWindow;
        }()),

        document           = window.document,
        DocumentFragment   = window.DocumentFragment   || blank,
        SVGElement         = window.SVGElement         || blank,
        SVGSVGElement      = window.SVGSVGElement      || blank,
        SVGElementInstance = window.SVGElementInstance || blank,
        HTMLElement        = window.HTMLElement        || window.Element,

        PointerEvent = (window.PointerEvent || window.MSPointerEvent),
        pEventTypes,

        hypot = Math.hypot || function (x, y) { return Math.sqrt(x * x + y * y); },

        tmpXY = {},     // reduce object creation in getXY()

        documents       = [],   // all documents being listened to

        interactables   = [],   // all set interactables
        interactions    = [],   // all interactions

        dynamicDrop     = false,

        // {
        //      type: {
        //          selectors: ['selector', ...],
        //          contexts : [document, ...],
        //          listeners: [[listener, useCapture], ...]
        //      }
        //  }
        delegatedEvents = {},

        defaultOptions = {
            base: {
                accept        : null,
                actionChecker : null,
                styleCursor   : true,
                preventDefault: 'auto',
                origin        : { x: 0, y: 0 },
                deltaSource   : 'page',
                allowFrom     : null,
                ignoreFrom    : null,
                _context      : document,
                dropChecker   : null
            },

            drag: {
                enabled: false,
                manualStart: true,
                max: Infinity,
                maxPerElement: 1,

                snap: null,
                restrict: null,
                inertia: null,
                autoScroll: null,

                axis: 'xy'
            },

            drop: {
                enabled: false,
                accept: null,
                overlap: 'pointer'
            },

            resize: {
                enabled: false,
                manualStart: false,
                max: Infinity,
                maxPerElement: 1,

                snap: null,
                restrict: null,
                inertia: null,
                autoScroll: null,

                square: false,
                preserveAspectRatio: false,
                axis: 'xy',

                // use default margin
                margin: NaN,

                // object with props left, right, top, bottom which are
                // true/false values to resize when the pointer is over that edge,
                // CSS selectors to match the handles for each direction
                // or the Elements for each handle
                edges: null,

                // a value of 'none' will limit the resize rect to a minimum of 0x0
                // 'negate' will alow the rect to have negative width/height
                // 'reposition' will keep the width/height positive by swapping
                // the top and bottom edges and/or swapping the left and right edges
                invert: 'none'
            },

            gesture: {
                manualStart: false,
                enabled: false,
                max: Infinity,
                maxPerElement: 1,

                restrict: null
            },

            perAction: {
                manualStart: false,
                max: Infinity,
                maxPerElement: 1,

                snap: {
                    enabled     : false,
                    endOnly     : false,
                    range       : Infinity,
                    targets     : null,
                    offsets     : null,

                    relativePoints: null
                },

                restrict: {
                    enabled: false,
                    endOnly: false
                },

                autoScroll: {
                    enabled     : false,
                    container   : null,     // the item that is scrolled (Window or HTMLElement)
                    margin      : 60,
                    speed       : 300       // the scroll speed in pixels per second
                },

                inertia: {
                    enabled          : false,
                    resistance       : 10,    // the lambda in exponential decay
                    minSpeed         : 100,   // target speed must be above this for inertia to start
                    endSpeed         : 10,    // the speed at which inertia is slow enough to stop
                    allowResume      : true,  // allow resuming an action in inertia phase
                    zeroResumeDelta  : true,  // if an action is resumed after launch, set dx/dy to 0
                    smoothEndDuration: 300    // animate to snap/restrict endOnly if there's no inertia
                }
            },

            _holdDuration: 600
        },

        // Things related to autoScroll
        autoScroll = {
            interaction: null,
            i: null,    // the handle returned by window.setInterval
            x: 0, y: 0, // Direction each pulse is to scroll in

            // scroll the window by the values in scroll.x/y
            scroll: function () {
                var options = autoScroll.interaction.target.options[autoScroll.interaction.prepared.name].autoScroll,
                    container = options.container || getWindow(autoScroll.interaction.element),
                    now = new Date().getTime(),
                    // change in time in seconds
                    dtx = (now - autoScroll.prevTimeX) / 1000,
                    dty = (now - autoScroll.prevTimeY) / 1000,
                    vx, vy, sx, sy;

                // displacement
                if (options.velocity) {
                  vx = options.velocity.x;
                  vy = options.velocity.y;
                }
                else {
                  vx = vy = options.speed
                }
 
                sx = vx * dtx;
                sy = vy * dty;

                if (sx >= 1 || sy >= 1) {
                    if (isWindow(container)) {
                        container.scrollBy(autoScroll.x * sx, autoScroll.y * sy);
                    }
                    else if (container) {
                        container.scrollLeft += autoScroll.x * sx;
                        container.scrollTop  += autoScroll.y * sy;
                    }

                    if (sx >=1) autoScroll.prevTimeX = now;
                    if (sy >= 1) autoScroll.prevTimeY = now;
                }

                if (autoScroll.isScrolling) {
                    cancelFrame(autoScroll.i);
                    autoScroll.i = reqFrame(autoScroll.scroll);
                }
            },

            isScrolling: false,
            prevTimeX: 0,
            prevTimeY: 0,

            start: function (interaction) {
                autoScroll.isScrolling = true;
                cancelFrame(autoScroll.i);

                autoScroll.interaction = interaction;
                autoScroll.prevTimeX = new Date().getTime();
                autoScroll.prevTimeY = new Date().getTime();
                autoScroll.i = reqFrame(autoScroll.scroll);
            },

            stop: function () {
                autoScroll.isScrolling = false;
                cancelFrame(autoScroll.i);
            }
        },

        // Does the browser support touch input?
        supportsTouch = (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch),

        // Does the browser support PointerEvents
        // Avoid PointerEvent bugs introduced in Chrome 55
        supportsPointerEvent = PointerEvent && !/Chrome/.test(navigator.userAgent),

        // Less Precision with touch input
        margin = supportsTouch || supportsPointerEvent? 20: 10,

        pointerMoveTolerance = 1,

        // for ignoring browser's simulated mouse events
        prevTouchTime = 0,

        // Allow this many interactions to happen simultaneously
        maxInteractions = Infinity,

        // Check if is IE9 or older
        actionCursors = (document.all && !window.atob) ? {
            drag    : 'move',
            resizex : 'e-resize',
            resizey : 's-resize',
            resizexy: 'se-resize',

            resizetop        : 'n-resize',
            resizeleft       : 'w-resize',
            resizebottom     : 's-resize',
            resizeright      : 'e-resize',
            resizetopleft    : 'se-resize',
            resizebottomright: 'se-resize',
            resizetopright   : 'ne-resize',
            resizebottomleft : 'ne-resize',

            gesture : ''
        } : {
            drag    : 'move',
            resizex : 'ew-resize',
            resizey : 'ns-resize',
            resizexy: 'nwse-resize',

            resizetop        : 'ns-resize',
            resizeleft       : 'ew-resize',
            resizebottom     : 'ns-resize',
            resizeright      : 'ew-resize',
            resizetopleft    : 'nwse-resize',
            resizebottomright: 'nwse-resize',
            resizetopright   : 'nesw-resize',
            resizebottomleft : 'nesw-resize',

            gesture : ''
        },

        actionIsEnabled = {
            drag   : true,
            resize : true,
            gesture: true
        },

        // because Webkit and Opera still use 'mousewheel' event type
        wheelEvent = 'onmousewheel' in document? 'mousewheel': 'wheel',

        eventTypes = [
            'dragstart',
            'dragmove',
            'draginertiastart',
            'dragend',
            'dragenter',
            'dragleave',
            'dropactivate',
            'dropdeactivate',
            'dropmove',
            'drop',
            'resizestart',
            'resizemove',
            'resizeinertiastart',
            'resizeend',
            'gesturestart',
            'gesturemove',
            'gestureinertiastart',
            'gestureend',

            'down',
            'move',
            'up',
            'cancel',
            'tap',
            'doubletap',
            'hold'
        ],

        globalEvents = {},

        // Opera Mobile must be handled differently
        isOperaMobile = navigator.appName == 'Opera' &&
            supportsTouch &&
            navigator.userAgent.match('Presto'),

        // scrolling doesn't change the result of getClientRects on iOS 7
        isIOS7 = (/iP(hone|od|ad)/.test(navigator.platform)
                         && /OS 7[^\d]/.test(navigator.appVersion)),

        // prefix matchesSelector
        prefixedMatchesSelector = 'matches' in Element.prototype?
                'matches': 'webkitMatchesSelector' in Element.prototype?
                    'webkitMatchesSelector': 'mozMatchesSelector' in Element.prototype?
                        'mozMatchesSelector': 'oMatchesSelector' in Element.prototype?
                            'oMatchesSelector': 'msMatchesSelector',

        // will be polyfill function if browser is IE8
        ie8MatchesSelector,

        // native requestAnimationFrame or polyfill
        reqFrame = realWindow.requestAnimationFrame,
        cancelFrame = realWindow.cancelAnimationFrame,

        // Events wrapper
        events = (function () {
            var useAttachEvent = ('attachEvent' in window) && !('addEventListener' in window),
                addEvent       = useAttachEvent?  'attachEvent': 'addEventListener',
                removeEvent    = useAttachEvent?  'detachEvent': 'removeEventListener',
                on             = useAttachEvent? 'on': '',

                elements          = [],
                targets           = [],
                attachedListeners = [];

            function add (element, type, listener, useCapture) {
                var elementIndex = indexOf(elements, element),
                    target = targets[elementIndex];

                if (!target) {
                    target = {
                        events: {},
                        typeCount: 0
                    };

                    elementIndex = elements.push(element) - 1;
                    targets.push(target);

                    attachedListeners.push((useAttachEvent ? {
                            supplied: [],
                            wrapped : [],
                            useCount: []
                        } : null));
                }

                if (!target.events[type]) {
                    target.events[type] = [];
                    target.typeCount++;
                }

                if (!contains(target.events[type], listener)) {
                    var ret;

                    if (useAttachEvent) {
                        var listeners = attachedListeners[elementIndex],
                            listenerIndex = indexOf(listeners.supplied, listener);

                        var wrapped = listeners.wrapped[listenerIndex] || function (event) {
                            if (!event.immediatePropagationStopped) {
                                event.target = event.srcElement;
                                event.currentTarget = element;

                                event.preventDefault = event.preventDefault || preventDef;
                                event.stopPropagation = event.stopPropagation || stopProp;
                                event.stopImmediatePropagation = event.stopImmediatePropagation || stopImmProp;

                                if (/mouse|click/.test(event.type)) {
                                    event.pageX = event.clientX + getWindow(element).document.documentElement.scrollLeft;
                                    event.pageY = event.clientY + getWindow(element).document.documentElement.scrollTop;
                                }

                                listener(event);
                            }
                        };

                        ret = element[addEvent](on + type, wrapped, Boolean(useCapture));

                        if (listenerIndex === -1) {
                            listeners.supplied.push(listener);
                            listeners.wrapped.push(wrapped);
                            listeners.useCount.push(1);
                        }
                        else {
                            listeners.useCount[listenerIndex]++;
                        }
                    }
                    else {
                        ret = element[addEvent](type, listener, useCapture || false);
                    }
                    target.events[type].push(listener);

                    return ret;
                }
            }

            function remove (element, type, listener, useCapture) {
                var i,
                    elementIndex = indexOf(elements, element),
                    target = targets[elementIndex],
                    listeners,
                    listenerIndex,
                    wrapped = listener;

                if (!target || !target.events) {
                    return;
                }

                if (useAttachEvent) {
                    listeners = attachedListeners[elementIndex];
                    listenerIndex = indexOf(listeners.supplied, listener);
                    wrapped = listeners.wrapped[listenerIndex];
                }

                if (type === 'all') {
                    for (type in target.events) {
                        if (target.events.hasOwnProperty(type)) {
                            remove(element, type, 'all');
                        }
                    }
                    return;
                }

                if (target.events[type]) {
                    var len = target.events[type].length;

                    if (listener === 'all') {
                        for (i = 0; i < len; i++) {
                            remove(element, type, target.events[type][i], Boolean(useCapture));
                        }
                        return;
                    } else {
                        for (i = 0; i < len; i++) {
                            if (target.events[type][i] === listener) {
                                element[removeEvent](on + type, wrapped, useCapture || false);
                                target.events[type].splice(i, 1);

                                if (useAttachEvent && listeners) {
                                    listeners.useCount[listenerIndex]--;
                                    if (listeners.useCount[listenerIndex] === 0) {
                                        listeners.supplied.splice(listenerIndex, 1);
                                        listeners.wrapped.splice(listenerIndex, 1);
                                        listeners.useCount.splice(listenerIndex, 1);
                                    }
                                }

                                break;
                            }
                        }
                    }

                    if (target.events[type] && target.events[type].length === 0) {
                        target.events[type] = null;
                        target.typeCount--;
                    }
                }

                if (!target.typeCount) {
                    targets.splice(elementIndex, 1);
                    elements.splice(elementIndex, 1);
                    attachedListeners.splice(elementIndex, 1);
                }
            }

            function preventDef () {
                this.returnValue = false;
            }

            function stopProp () {
                this.cancelBubble = true;
            }

            function stopImmProp () {
                this.cancelBubble = true;
                this.immediatePropagationStopped = true;
            }

            return {
                add: add,
                remove: remove,
                useAttachEvent: useAttachEvent,

                _elements: elements,
                _targets: targets,
                _attachedListeners: attachedListeners
            };
        }());

    function blank () {}

    function isElement (o) {
        if (!o || (typeof o !== 'object')) { return false; }

        var _window = getWindow(o) || window;

        return (/object|function/.test(typeof _window.Element)
            ? o instanceof _window.Element //DOM2
            : o.nodeType === 1 && typeof o.nodeName === "string");
    }
    function isWindow (thing) { return thing === window || !!(thing && thing.Window) && (thing instanceof thing.Window); }
    function isDocFrag (thing) { return !!thing && thing instanceof DocumentFragment; }
    function isArray (thing) {
        return isObject(thing)
                && (typeof thing.length !== undefined)
                && isFunction(thing.splice);
    }
    function isObject   (thing) { return !!thing && (typeof thing === 'object'); }
    function isFunction (thing) { return typeof thing === 'function'; }
    function isNumber   (thing) { return typeof thing === 'number'  ; }
    function isBool     (thing) { return typeof thing === 'boolean' ; }
    function isString   (thing) { return typeof thing === 'string'  ; }

    function trySelector (value) {
        if (!isString(value)) { return false; }

        // an exception will be raised if it is invalid
        document.querySelector(value);
        return true;
    }

    function extend (dest, source) {
        for (var prop in source) {
            dest[prop] = source[prop];
        }
        return dest;
    }

    var prefixedPropREs = {
      webkit: /(Movement[XY]|Radius[XY]|RotationAngle|Force)$/
    };

    function pointerExtend (dest, source) {
        for (var prop in source) {
          var deprecated = false;

          // skip deprecated prefixed properties
          for (var vendor in prefixedPropREs) {
            if (prop.indexOf(vendor) === 0 && prefixedPropREs[vendor].test(prop)) {
              deprecated = true;
              break;
            }
          }

          if (!deprecated) {
            dest[prop] = source[prop];
          }
        }
        return dest;
    }

    function copyCoords (dest, src) {
        dest.page = dest.page || {};
        dest.page.x = src.page.x;
        dest.page.y = src.page.y;

        dest.client = dest.client || {};
        dest.client.x = src.client.x;
        dest.client.y = src.client.y;

        dest.timeStamp = src.timeStamp;
    }

    function setEventXY (targetObj, pointers, interaction) {
        var pointer = (pointers.length > 1
                       ? pointerAverage(pointers)
                       : pointers[0]);

        getPageXY(pointer, tmpXY, interaction);
        targetObj.page.x = tmpXY.x;
        targetObj.page.y = tmpXY.y;

        getClientXY(pointer, tmpXY, interaction);
        targetObj.client.x = tmpXY.x;
        targetObj.client.y = tmpXY.y;

        targetObj.timeStamp = new Date().getTime();
    }

    function setEventDeltas (targetObj, prev, cur) {
        targetObj.page.x     = cur.page.x      - prev.page.x;
        targetObj.page.y     = cur.page.y      - prev.page.y;
        targetObj.client.x   = cur.client.x    - prev.client.x;
        targetObj.client.y   = cur.client.y    - prev.client.y;
        targetObj.timeStamp = new Date().getTime() - prev.timeStamp;

        // set pointer velocity
        var dt = Math.max(targetObj.timeStamp / 1000, 0.001);
        targetObj.page.speed   = hypot(targetObj.page.x, targetObj.page.y) / dt;
        targetObj.page.vx      = targetObj.page.x / dt;
        targetObj.page.vy      = targetObj.page.y / dt;

        targetObj.client.speed = hypot(targetObj.client.x, targetObj.page.y) / dt;
        targetObj.client.vx    = targetObj.client.x / dt;
        targetObj.client.vy    = targetObj.client.y / dt;
    }

    function isNativePointer (pointer) {
        return (pointer instanceof window.Event
            || (supportsTouch && window.Touch && pointer instanceof window.Touch));
    }

    // Get specified X/Y coords for mouse or event.touches[0]
    function getXY (type, pointer, xy) {
        xy = xy || {};
        type = type || 'page';

        xy.x = pointer[type + 'X'];
        xy.y = pointer[type + 'Y'];

        return xy;
    }

    function getPageXY (pointer, page) {
        page = page || {};

        // Opera Mobile handles the viewport and scrolling oddly
        if (isOperaMobile && isNativePointer(pointer)) {
            getXY('screen', pointer, page);

            page.x += window.scrollX;
            page.y += window.scrollY;
        }
        else {
            getXY('page', pointer, page);
        }

        return page;
    }

    function getClientXY (pointer, client) {
        client = client || {};

        if (isOperaMobile && isNativePointer(pointer)) {
            // Opera Mobile handles the viewport and scrolling oddly
            getXY('screen', pointer, client);
        }
        else {
          getXY('client', pointer, client);
        }

        return client;
    }

    function getScrollXY (win) {
        win = win || window;
        return {
            x: win.scrollX || win.document.documentElement.scrollLeft,
            y: win.scrollY || win.document.documentElement.scrollTop
        };
    }

    function getPointerId (pointer) {
        return isNumber(pointer.pointerId)? pointer.pointerId : pointer.identifier;
    }

    function getActualElement (element) {
        return (element instanceof SVGElementInstance
            ? element.correspondingUseElement
            : element);
    }

    function getWindow (node) {
        if (isWindow(node)) {
            return node;
        }

        var rootNode = (node.ownerDocument || node);

        return rootNode.defaultView || rootNode.parentWindow || window;
    }

    function getElementClientRect (element) {
        var clientRect = (element instanceof SVGElement
                            ? element.getBoundingClientRect()
                            : element.getClientRects()[0]);

        return clientRect && {
            left  : clientRect.left,
            right : clientRect.right,
            top   : clientRect.top,
            bottom: clientRect.bottom,
            width : clientRect.width || clientRect.right - clientRect.left,
            height: clientRect.height || clientRect.bottom - clientRect.top
        };
    }

    function getElementRect (element) {
        var clientRect = getElementClientRect(element);

        if (!isIOS7 && clientRect) {
            var scroll = getScrollXY(getWindow(element));

            clientRect.left   += scroll.x;
            clientRect.right  += scroll.x;
            clientRect.top    += scroll.y;
            clientRect.bottom += scroll.y;
        }

        return clientRect;
    }

    function getTouchPair (event) {
        var touches = [];

        // array of touches is supplied
        if (isArray(event)) {
            touches[0] = event[0];
            touches[1] = event[1];
        }
        // an event
        else {
            if (event.type === 'touchend') {
                if (event.touches.length === 1) {
                    touches[0] = event.touches[0];
                    touches[1] = event.changedTouches[0];
                }
                else if (event.touches.length === 0) {
                    touches[0] = event.changedTouches[0];
                    touches[1] = event.changedTouches[1];
                }
            }
            else {
                touches[0] = event.touches[0];
                touches[1] = event.touches[1];
            }
        }

        return touches;
    }

    function pointerAverage (pointers) {
        var average = {
            pageX  : 0,
            pageY  : 0,
            clientX: 0,
            clientY: 0,
            screenX: 0,
            screenY: 0
        };
        var prop;

        for (var i = 0; i < pointers.length; i++) {
            for (prop in average) {
                average[prop] += pointers[i][prop];
            }
        }
        for (prop in average) {
            average[prop] /= pointers.length;
        }

        return average;
    }

    function touchBBox (event) {
        if (!event.length && !(event.touches && event.touches.length > 1)) {
            return;
        }

        var touches = getTouchPair(event),
            minX = Math.min(touches[0].pageX, touches[1].pageX),
            minY = Math.min(touches[0].pageY, touches[1].pageY),
            maxX = Math.max(touches[0].pageX, touches[1].pageX),
            maxY = Math.max(touches[0].pageY, touches[1].pageY);

        return {
            x: minX,
            y: minY,
            left: minX,
            top: minY,
            width: maxX - minX,
            height: maxY - minY
        };
    }

    function touchDistance (event, deltaSource) {
        deltaSource = deltaSource || defaultOptions.deltaSource;

        var sourceX = deltaSource + 'X',
            sourceY = deltaSource + 'Y',
            touches = getTouchPair(event);


        var dx = touches[0][sourceX] - touches[1][sourceX],
            dy = touches[0][sourceY] - touches[1][sourceY];

        return hypot(dx, dy);
    }

    function touchAngle (event, prevAngle, deltaSource) {
        deltaSource = deltaSource || defaultOptions.deltaSource;

        var sourceX = deltaSource + 'X',
            sourceY = deltaSource + 'Y',
            touches = getTouchPair(event),
            dx = touches[0][sourceX] - touches[1][sourceX],
            dy = touches[0][sourceY] - touches[1][sourceY],
            angle = 180 * Math.atan(dy / dx) / Math.PI;

        if (isNumber(prevAngle)) {
            var dr = angle - prevAngle,
                drClamped = dr % 360;

            if (drClamped > 315) {
                angle -= 360 + (angle / 360)|0 * 360;
            }
            else if (drClamped > 135) {
                angle -= 180 + (angle / 360)|0 * 360;
            }
            else if (drClamped < -315) {
                angle += 360 + (angle / 360)|0 * 360;
            }
            else if (drClamped < -135) {
                angle += 180 + (angle / 360)|0 * 360;
            }
        }

        return  angle;
    }

    function getOriginXY (interactable, element) {
        var origin = interactable
                ? interactable.options.origin
                : defaultOptions.origin;

        if (origin === 'parent') {
            origin = parentElement(element);
        }
        else if (origin === 'self') {
            origin = interactable.getRect(element);
        }
        else if (trySelector(origin)) {
            origin = closest(element, origin) || { x: 0, y: 0 };
        }

        if (isFunction(origin)) {
            origin = origin(interactable && element);
        }

        if (isElement(origin))  {
            origin = getElementRect(origin);
        }

        origin.x = ('x' in origin)? origin.x : origin.left;
        origin.y = ('y' in origin)? origin.y : origin.top;

        return origin;
    }

    // http://stackoverflow.com/a/5634528/2280888
    function _getQBezierValue(t, p1, p2, p3) {
        var iT = 1 - t;
        return iT * iT * p1 + 2 * iT * t * p2 + t * t * p3;
    }

    function getQuadraticCurvePoint(startX, startY, cpX, cpY, endX, endY, position) {
        return {
            x:  _getQBezierValue(position, startX, cpX, endX),
            y:  _getQBezierValue(position, startY, cpY, endY)
        };
    }

    // http://gizma.com/easing/
    function easeOutQuad (t, b, c, d) {
        t /= d;
        return -c * t*(t-2) + b;
    }

    function nodeContains (parent, child) {
        while (child) {
            if (child === parent) {
                return true;
            }

            child = child.parentNode;
        }

        return false;
    }

    function closest (child, selector) {
        var parent = parentElement(child);

        while (isElement(parent)) {
            if (matchesSelector(parent, selector)) { return parent; }

            parent = parentElement(parent);
        }

        return null;
    }

    function parentElement (node) {
        var parent = node.parentNode;

        if (isDocFrag(parent)) {
            // skip past #shado-root fragments
            while ((parent = parent.host) && isDocFrag(parent)) {}

            return parent;
        }

        return parent;
    }

    function inContext (interactable, element) {
        return interactable._context === element.ownerDocument
                || nodeContains(interactable._context, element);
    }

    function testIgnore (interactable, interactableElement, element) {
        var ignoreFrom = interactable.options.ignoreFrom;

        if (!ignoreFrom || !isElement(element)) { return false; }

        if (isString(ignoreFrom)) {
            return matchesUpTo(element, ignoreFrom, interactableElement);
        }
        else if (isElement(ignoreFrom)) {
            return nodeContains(ignoreFrom, element);
        }

        return false;
    }

    function testAllow (interactable, interactableElement, element) {
        var allowFrom = interactable.options.allowFrom;

        if (!allowFrom) { return true; }

        if (!isElement(element)) { return false; }

        if (isString(allowFrom)) {
            return matchesUpTo(element, allowFrom, interactableElement);
        }
        else if (isElement(allowFrom)) {
            return nodeContains(allowFrom, element);
        }

        return false;
    }

    function checkAxis (axis, interactable) {
        if (!interactable) { return false; }

        var thisAxis = interactable.options.drag.axis;

        return (axis === 'xy' || thisAxis === 'xy' || thisAxis === axis);
    }

    function checkSnap (interactable, action) {
        var options = interactable.options;

        if (/^resize/.test(action)) {
            action = 'resize';
        }

        return options[action].snap && options[action].snap.enabled;
    }

    function checkRestrict (interactable, action) {
        var options = interactable.options;

        if (/^resize/.test(action)) {
            action = 'resize';
        }

        return  options[action].restrict && options[action].restrict.enabled;
    }

    function checkAutoScroll (interactable, action) {
        var options = interactable.options;

        if (/^resize/.test(action)) {
            action = 'resize';
        }

        return  options[action].autoScroll && options[action].autoScroll.enabled;
    }

    function withinInteractionLimit (interactable, element, action) {
        var options = interactable.options,
            maxActions = options[action.name].max,
            maxPerElement = options[action.name].maxPerElement,
            activeInteractions = 0,
            targetCount = 0,
            targetElementCount = 0;

        for (var i = 0, len = interactions.length; i < len; i++) {
            var interaction = interactions[i],
                otherAction = interaction.prepared.name,
                active = interaction.interacting();

            if (!active) { continue; }

            activeInteractions++;

            if (activeInteractions >= maxInteractions) {
                return false;
            }

            if (interaction.target !== interactable) { continue; }

            targetCount += (otherAction === action.name)|0;

            if (targetCount >= maxActions) {
                return false;
            }

            if (interaction.element === element) {
                targetElementCount++;

                if (otherAction !== action.name || targetElementCount >= maxPerElement) {
                    return false;
                }
            }
        }

        return maxInteractions > 0;
    }

    // Test for the element that's "above" all other qualifiers
    function indexOfDeepestElement (elements) {
        var dropzone,
            deepestZone = elements[0],
            index = deepestZone? 0: -1,
            parent,
            deepestZoneParents = [],
            dropzoneParents = [],
            child,
            i,
            n;

        for (i = 1; i < elements.length; i++) {
            dropzone = elements[i];

            // an element might belong to multiple selector dropzones
            if (!dropzone || dropzone === deepestZone) {
                continue;
            }

            if (!deepestZone) {
                deepestZone = dropzone;
                index = i;
                continue;
            }

            // check if the deepest or current are document.documentElement or document.rootElement
            // - if the current dropzone is, do nothing and continue
            if (dropzone.parentNode === dropzone.ownerDocument) {
                continue;
            }
            // - if deepest is, update with the current dropzone and continue to next
            else if (deepestZone.parentNode === dropzone.ownerDocument) {
                deepestZone = dropzone;
                index = i;
                continue;
            }

            if (!deepestZoneParents.length) {
                parent = deepestZone;
                while (parent.parentNode && parent.parentNode !== parent.ownerDocument) {
                    deepestZoneParents.unshift(parent);
                    parent = parent.parentNode;
                }
            }

            // if this element is an svg element and the current deepest is
            // an HTMLElement
            if (deepestZone instanceof HTMLElement
                && dropzone instanceof SVGElement
                && !(dropzone instanceof SVGSVGElement)) {

                if (dropzone === deepestZone.parentNode) {
                    continue;
                }

                parent = dropzone.ownerSVGElement;
            }
            else {
                parent = dropzone;
            }

            dropzoneParents = [];

            while (parent.parentNode !== parent.ownerDocument) {
                dropzoneParents.unshift(parent);
                parent = parent.parentNode;
            }

            n = 0;

            // get (position of last common ancestor) + 1
            while (dropzoneParents[n] && dropzoneParents[n] === deepestZoneParents[n]) {
                n++;
            }

            var parents = [
                dropzoneParents[n - 1],
                dropzoneParents[n],
                deepestZoneParents[n]
            ];

            child = parents[0].lastChild;

            while (child) {
                if (child === parents[1]) {
                    deepestZone = dropzone;
                    index = i;
                    deepestZoneParents = [];

                    break;
                }
                else if (child === parents[2]) {
                    break;
                }

                child = child.previousSibling;
            }
        }

        return index;
    }

    function Interaction () {
        this.target          = null; // current interactable being interacted with
        this.element         = null; // the target element of the interactable
        this.dropTarget      = null; // the dropzone a drag target might be dropped into
        this.dropElement     = null; // the element at the time of checking
        this.prevDropTarget  = null; // the dropzone that was recently dragged away from
        this.prevDropElement = null; // the element at the time of checking

        this.prepared        = {     // action that's ready to be fired on next move event
            name : null,
            axis : null,
            edges: null
        };

        this.matches         = [];   // all selectors that are matched by target element
        this.matchElements   = [];   // corresponding elements

        this.inertiaStatus = {
            active       : false,
            smoothEnd    : false,
            ending       : false,

            startEvent: null,
            upCoords: {},

            xe: 0, ye: 0,
            sx: 0, sy: 0,

            t0: 0,
            vx0: 0, vys: 0,
            duration: 0,

            resumeDx: 0,
            resumeDy: 0,

            lambda_v0: 0,
            one_ve_v0: 0,
            i  : null
        };

        if (isFunction(Function.prototype.bind)) {
            this.boundInertiaFrame = this.inertiaFrame.bind(this);
            this.boundSmoothEndFrame = this.smoothEndFrame.bind(this);
        }
        else {
            var that = this;

            this.boundInertiaFrame = function () { return that.inertiaFrame(); };
            this.boundSmoothEndFrame = function () { return that.smoothEndFrame(); };
        }

        this.activeDrops = {
            dropzones: [],      // the dropzones that are mentioned below
            elements : [],      // elements of dropzones that accept the target draggable
            rects    : []       // the rects of the elements mentioned above
        };

        // keep track of added pointers
        this.pointers    = [];
        this.pointerIds  = [];
        this.downTargets = [];
        this.downTimes   = [];
        this.holdTimers  = [];

        // Previous native pointer move event coordinates
        this.prevCoords = {
            page     : { x: 0, y: 0 },
            client   : { x: 0, y: 0 },
            timeStamp: 0
        };
        // current native pointer move event coordinates
        this.curCoords = {
            page     : { x: 0, y: 0 },
            client   : { x: 0, y: 0 },
            timeStamp: 0
        };

        // Starting InteractEvent pointer coordinates
        this.startCoords = {
            page     : { x: 0, y: 0 },
            client   : { x: 0, y: 0 },
            timeStamp: 0
        };

        // Change in coordinates and time of the pointer
        this.pointerDelta = {
            page     : { x: 0, y: 0, vx: 0, vy: 0, speed: 0 },
            client   : { x: 0, y: 0, vx: 0, vy: 0, speed: 0 },
            timeStamp: 0
        };

        this.downEvent   = null;    // pointerdown/mousedown/touchstart event
        this.downPointer = {};

        this._eventTarget    = null;
        this._curEventTarget = null;

        this.prevEvent = null;      // previous action event
        this.tapTime   = 0;         // time of the most recent tap event
        this.prevTap   = null;

        this.startOffset    = { left: 0, right: 0, top: 0, bottom: 0 };
        this.restrictOffset = { left: 0, right: 0, top: 0, bottom: 0 };
        this.snapOffsets    = [];

        this.gesture = {
            start: { x: 0, y: 0 },

            startDistance: 0,   // distance between two touches of touchStart
            prevDistance : 0,
            distance     : 0,

            scale: 1,           // gesture.distance / gesture.startDistance

            startAngle: 0,      // angle of line joining two touches
            prevAngle : 0       // angle of the previous gesture event
        };

        this.snapStatus = {
            x       : 0, y       : 0,
            dx      : 0, dy      : 0,
            realX   : 0, realY   : 0,
            snappedX: 0, snappedY: 0,
            targets : [],
            locked  : false,
            changed : false
        };

        this.restrictStatus = {
            dx         : 0, dy         : 0,
            restrictedX: 0, restrictedY: 0,
            snap       : null,
            restricted : false,
            changed    : false
        };

        this.restrictStatus.snap = this.snapStatus;

        this.pointerIsDown   = false;
        this.pointerWasMoved = false;
        this.gesturing       = false;
        this.dragging        = false;
        this.resizing        = false;
        this.resizeAxes      = 'xy';

        this.mouse = false;

        interactions.push(this);
    }

    Interaction.prototype = {
        getPageXY  : function (pointer, xy) { return   getPageXY(pointer, xy, this); },
        getClientXY: function (pointer, xy) { return getClientXY(pointer, xy, this); },
        setEventXY : function (target, ptr) { return  setEventXY(target, ptr, this); },

        pointerOver: function (pointer, event, eventTarget) {
            if (this.prepared.name || !this.mouse) { return; }

            var curMatches = [],
                curMatchElements = [],
                prevTargetElement = this.element;

            this.addPointer(pointer);

            if (this.target
                && (testIgnore(this.target, this.element, eventTarget)
                    || !testAllow(this.target, this.element, eventTarget))) {
                // if the eventTarget should be ignored or shouldn't be allowed
                // clear the previous target
                this.target = null;
                this.element = null;
                this.matches = [];
                this.matchElements = [];
            }

            var elementInteractable = interactables.get(eventTarget),
                elementAction = (elementInteractable
                                 && !testIgnore(elementInteractable, eventTarget, eventTarget)
                                 && testAllow(elementInteractable, eventTarget, eventTarget)
                                 && validateAction(
                                     elementInteractable.getAction(pointer, event, this, eventTarget),
                                     elementInteractable));

            if (elementAction && !withinInteractionLimit(elementInteractable, eventTarget, elementAction)) {
                 elementAction = null;
            }

            function pushCurMatches (interactable, selector) {
                if (interactable
                    && isElement(eventTarget)
                    && inContext(interactable, eventTarget)
                    && !testIgnore(interactable, eventTarget, eventTarget)
                    && testAllow(interactable, eventTarget, eventTarget)
                    && matchesSelector(eventTarget, selector)) {

                    curMatches.push(interactable);
                    curMatchElements.push(eventTarget);
                }
            }

            if (elementAction) {
                this.target = elementInteractable;
                this.element = eventTarget;
                this.matches = [];
                this.matchElements = [];
            }
            else {
                interactables.forEachSelector(pushCurMatches);

                if (this.validateSelector(pointer, event, curMatches, curMatchElements)) {
                    this.matches = curMatches;
                    this.matchElements = curMatchElements;

                    this.pointerHover(pointer, event, this.matches, this.matchElements);
                    events.add(eventTarget,
                                        supportsPointerEvent? pEventTypes.move : 'mousemove',
                                        listeners.pointerHover);
                }
                else if (this.target) {
                    if (nodeContains(prevTargetElement, eventTarget)) {
                        this.pointerHover(pointer, event, this.matches, this.matchElements);
                        events.add(this.element,
                                            supportsPointerEvent? pEventTypes.move : 'mousemove',
                                            listeners.pointerHover);
                    }
                    else {
                        this.target = null;
                        this.element = null;
                        this.matches = [];
                        this.matchElements = [];
                    }
                }
            }
        },

        // Check what action would be performed on pointerMove target if a mouse
        // button were pressed and change the cursor accordingly
        pointerHover: function (pointer, event, eventTarget, curEventTarget, matches, matchElements) {
            var target = this.target;

            if (!this.prepared.name && this.mouse) {

                var action;

                // update pointer coords for defaultActionChecker to use
                this.setEventXY(this.curCoords, [pointer]);

                if (matches) {
                    action = this.validateSelector(pointer, event, matches, matchElements);
                }
                else if (target) {
                    action = validateAction(target.getAction(this.pointers[0], event, this, this.element), this.target);
                }

                if (target && target.options.styleCursor) {
                    if (action) {
                        target._doc.documentElement.style.cursor = getActionCursor(action);
                    }
                    else {
                        target._doc.documentElement.style.cursor = '';
                    }
                }
            }
            else if (this.prepared.name) {
                this.checkAndPreventDefault(event, target, this.element);
            }
        },

        pointerOut: function (pointer, event, eventTarget) {
            if (this.prepared.name) { return; }

            // Remove temporary event listeners for selector Interactables
            if (!interactables.get(eventTarget)) {
                events.remove(eventTarget,
                                       supportsPointerEvent? pEventTypes.move : 'mousemove',
                                       listeners.pointerHover);
            }

            if (this.target && this.target.options.styleCursor && !this.interacting()) {
                this.target._doc.documentElement.style.cursor = '';
            }
        },

        selectorDown: function (pointer, event, eventTarget, curEventTarget) {
            var that = this,
                // copy event to be used in timeout for IE8
                eventCopy = events.useAttachEvent? extend({}, event) : event,
                element = eventTarget,
                pointerIndex = this.addPointer(pointer),
                action;

            this.holdTimers[pointerIndex] = setTimeout(function () {
                that.pointerHold(events.useAttachEvent? eventCopy : pointer, eventCopy, eventTarget, curEventTarget);
            }, defaultOptions._holdDuration);

            this.pointerIsDown = true;

            // Check if the down event hits the current inertia target
            if (this.inertiaStatus.active && this.target.selector) {
                // climb up the DOM tree from the event target
                while (isElement(element)) {

                    // if this element is the current inertia target element
                    if (element === this.element
                        // and the prospective action is the same as the ongoing one
                        && validateAction(this.target.getAction(pointer, event, this, this.element), this.target).name === this.prepared.name) {

                        // stop inertia so that the next move will be a normal one
                        cancelFrame(this.inertiaStatus.i);
                        this.inertiaStatus.active = false;

                        this.collectEventTargets(pointer, event, eventTarget, 'down');
                        return;
                    }
                    element = parentElement(element);
                }
            }

            // do nothing if interacting
            if (this.interacting()) {
                this.collectEventTargets(pointer, event, eventTarget, 'down');
                return;
            }

            function pushMatches (interactable, selector, context) {
                var elements = ie8MatchesSelector
                    ? context.querySelectorAll(selector)
                    : undefined;

                if (inContext(interactable, element)
                    && !testIgnore(interactable, element, eventTarget)
                    && testAllow(interactable, element, eventTarget)
                    && matchesSelector(element, selector, elements)) {

                    that.matches.push(interactable);
                    that.matchElements.push(element);
                }
            }

            // update pointer coords for defaultActionChecker to use
            this.setEventXY(this.curCoords, [pointer]);
            this.downEvent = event;

            while (isElement(element) && !action) {
                this.matches = [];
                this.matchElements = [];

                interactables.forEachSelector(pushMatches);

                action = this.validateSelector(pointer, event, this.matches, this.matchElements);
                element = parentElement(element);
            }

            if (action) {
                this.prepared.name  = action.name;
                this.prepared.axis  = action.axis;
                this.prepared.edges = action.edges;

                this.collectEventTargets(pointer, event, eventTarget, 'down');

                return this.pointerDown(pointer, event, eventTarget, curEventTarget, action);
            }
            else {
                // do these now since pointerDown isn't being called from here
                this.downTimes[pointerIndex] = new Date().getTime();
                this.downTargets[pointerIndex] = eventTarget;
                pointerExtend(this.downPointer, pointer);

                copyCoords(this.prevCoords, this.curCoords);
                this.pointerWasMoved = false;
            }

            this.collectEventTargets(pointer, event, eventTarget, 'down');
        },

        // Determine action to be performed on next pointerMove and add appropriate
        // style and event Listeners
        pointerDown: function (pointer, event, eventTarget, curEventTarget, forceAction) {
            if (!forceAction && !this.inertiaStatus.active && this.pointerWasMoved && this.prepared.name) {
                this.checkAndPreventDefault(event, this.target, this.element);

                return;
            }

            this.pointerIsDown = true;
            this.downEvent = event;

            var pointerIndex = this.addPointer(pointer),
                action;

            // If it is the second touch of a multi-touch gesture, keep the
            // target the same and get a new action if a target was set by the
            // first touch
            if (this.pointerIds.length > 1 && this.target._element === this.element) {
                var newAction = validateAction(forceAction || this.target.getAction(pointer, event, this, this.element), this.target);

                if (withinInteractionLimit(this.target, this.element, newAction)) {
                    action = newAction;
                }

                this.prepared.name = null;
            }
            // Otherwise, set the target if there is no action prepared
            else if (!this.prepared.name) {
                var interactable = interactables.get(curEventTarget);

                if (interactable
                    && !testIgnore(interactable, curEventTarget, eventTarget)
                    && testAllow(interactable, curEventTarget, eventTarget)
                    && (action = validateAction(forceAction || interactable.getAction(pointer, event, this, curEventTarget), interactable, eventTarget))
                    && withinInteractionLimit(interactable, curEventTarget, action)) {
                    this.target = interactable;
                    this.element = curEventTarget;
                }
            }

            var target = this.target,
                options = target && target.options;

            if (target && (forceAction || !this.prepared.name)) {
                action = action || validateAction(forceAction || target.getAction(pointer, event, this, curEventTarget), target, this.element);

                this.setEventXY(this.startCoords, this.pointers);

                if (!action) { return; }

                if (options.styleCursor) {
                    target._doc.documentElement.style.cursor = getActionCursor(action);
                }

                this.resizeAxes = action.name === 'resize'? action.axis : null;

                if (action === 'gesture' && this.pointerIds.length < 2) {
                    action = null;
                }

                this.prepared.name  = action.name;
                this.prepared.axis  = action.axis;
                this.prepared.edges = action.edges;

                this.snapStatus.snappedX = this.snapStatus.snappedY =
                    this.restrictStatus.restrictedX = this.restrictStatus.restrictedY = NaN;

                this.downTimes[pointerIndex] = new Date().getTime();
                this.downTargets[pointerIndex] = eventTarget;
                pointerExtend(this.downPointer, pointer);

                copyCoords(this.prevCoords, this.startCoords);
                this.pointerWasMoved = false;

                this.checkAndPreventDefault(event, target, this.element);
            }
            // if inertia is active try to resume action
            else if (this.inertiaStatus.active
                && curEventTarget === this.element
                && validateAction(target.getAction(pointer, event, this, this.element), target).name === this.prepared.name) {

                cancelFrame(this.inertiaStatus.i);
                this.inertiaStatus.active = false;

                this.checkAndPreventDefault(event, target, this.element);
            }
        },

        setModifications: function (coords, preEnd) {
            var target         = this.target,
                shouldMove     = true,
                shouldSnap     = checkSnap(target, this.prepared.name)     && (!target.options[this.prepared.name].snap.endOnly     || preEnd),
                shouldRestrict = checkRestrict(target, this.prepared.name) && (!target.options[this.prepared.name].restrict.endOnly || preEnd);

            if (shouldSnap    ) { this.setSnapping   (coords); } else { this.snapStatus    .locked     = false; }
            if (shouldRestrict) { this.setRestriction(coords); } else { this.restrictStatus.restricted = false; }

            if (shouldSnap && this.snapStatus.locked && !this.snapStatus.changed) {
                shouldMove = shouldRestrict && this.restrictStatus.restricted && this.restrictStatus.changed;
            }
            else if (shouldRestrict && this.restrictStatus.restricted && !this.restrictStatus.changed) {
                shouldMove = false;
            }

            return shouldMove;
        },

        setStartOffsets: function (action, interactable, element) {
            var rect = interactable.getRect(element),
                origin = getOriginXY(interactable, element),
                snap = interactable.options[this.prepared.name].snap,
                restrict = interactable.options[this.prepared.name].restrict,
                width, height;

            if (rect) {
                this.startOffset.left = this.startCoords.page.x - rect.left;
                this.startOffset.top  = this.startCoords.page.y - rect.top;

                this.startOffset.right  = rect.right  - this.startCoords.page.x;
                this.startOffset.bottom = rect.bottom - this.startCoords.page.y;

                if ('width' in rect) { width = rect.width; }
                else { width = rect.right - rect.left; }
                if ('height' in rect) { height = rect.height; }
                else { height = rect.bottom - rect.top; }
            }
            else {
                this.startOffset.left = this.startOffset.top = this.startOffset.right = this.startOffset.bottom = 0;
            }

            this.snapOffsets.splice(0);

            var snapOffset = snap && snap.offset === 'startCoords'
                                ? {
                                    x: this.startCoords.page.x - origin.x,
                                    y: this.startCoords.page.y - origin.y
                                }
                                : snap && snap.offset || { x: 0, y: 0 };

            if (rect && snap && snap.relativePoints && snap.relativePoints.length) {
                for (var i = 0; i < snap.relativePoints.length; i++) {
                    this.snapOffsets.push({
                        x: this.startOffset.left - (width  * snap.relativePoints[i].x) + snapOffset.x,
                        y: this.startOffset.top  - (height * snap.relativePoints[i].y) + snapOffset.y
                    });
                }
            }
            else {
                this.snapOffsets.push(snapOffset);
            }

            if (rect && restrict.elementRect) {
                this.restrictOffset.left = this.startOffset.left - (width  * restrict.elementRect.left);
                this.restrictOffset.top  = this.startOffset.top  - (height * restrict.elementRect.top);

                this.restrictOffset.right  = this.startOffset.right  - (width  * (1 - restrict.elementRect.right));
                this.restrictOffset.bottom = this.startOffset.bottom - (height * (1 - restrict.elementRect.bottom));
            }
            else {
                this.restrictOffset.left = this.restrictOffset.top = this.restrictOffset.right = this.restrictOffset.bottom = 0;
            }
        },

        /*\
         * Interaction.start
         [ method ]
         *
         * Start an action with the given Interactable and Element as tartgets. The
         * action must be enabled for the target Interactable and an appropriate number
         * of pointers must be held down – 1 for drag/resize, 2 for gesture.
         *
         * Use it with `interactable.<action>able({ manualStart: false })` to always
         * [start actions manually](https://github.com/taye/interact.js/issues/114)
         *
         - action       (object)  The action to be performed - drag, resize, etc.
         - interactable (Interactable) The Interactable to target
         - element      (Element) The DOM Element to target
         = (object) interact
         **
         | interact(target)
         |   .draggable({
         |     // disable the default drag start by down->move
         |     manualStart: true
         |   })
         |   // start dragging after the user holds the pointer down
         |   .on('hold', function (event) {
         |     var interaction = event.interaction;
         |
         |     if (!interaction.interacting()) {
         |       interaction.start({ name: 'drag' },
         |                         event.interactable,
         |                         event.currentTarget);
         |     }
         | });
        \*/
        start: function (action, interactable, element) {
            if (this.interacting()
                || !this.pointerIsDown
                || this.pointerIds.length < (action.name === 'gesture'? 2 : 1)) {
                return;
            }

            // if this interaction had been removed after stopping
            // add it back
            if (indexOf(interactions, this) === -1) {
                interactions.push(this);
            }

            // set the startCoords if there was no prepared action
            if (!this.prepared.name) {
                this.setEventXY(this.startCoords, this.pointers);
            }

            this.prepared.name  = action.name;
            this.prepared.axis  = action.axis;
            this.prepared.edges = action.edges;
            this.target         = interactable;
            this.element        = element;

            this.setStartOffsets(action.name, interactable, element);
            this.setModifications(this.startCoords.page);

            this.prevEvent = this[this.prepared.name + 'Start'](this.downEvent);
        },

        pointerMove: function (pointer, event, eventTarget, curEventTarget, preEnd) {
            if (this.inertiaStatus.active) {
                var pageUp   = this.inertiaStatus.upCoords.page;
                var clientUp = this.inertiaStatus.upCoords.client;

                var inertiaPosition = {
                    pageX  : pageUp.x   + this.inertiaStatus.sx,
                    pageY  : pageUp.y   + this.inertiaStatus.sy,
                    clientX: clientUp.x + this.inertiaStatus.sx,
                    clientY: clientUp.y + this.inertiaStatus.sy
                };

                this.setEventXY(this.curCoords, [inertiaPosition]);
            }
            else {
                this.recordPointer(pointer);
                this.setEventXY(this.curCoords, this.pointers);
            }

            var duplicateMove = (this.curCoords.page.x === this.prevCoords.page.x
                                 && this.curCoords.page.y === this.prevCoords.page.y
                                 && this.curCoords.client.x === this.prevCoords.client.x
                                 && this.curCoords.client.y === this.prevCoords.client.y);

            var dx, dy,
                pointerIndex = this.mouse? 0 : indexOf(this.pointerIds, getPointerId(pointer));

            // register movement greater than pointerMoveTolerance
            if (this.pointerIsDown && !this.pointerWasMoved) {
                dx = this.curCoords.client.x - this.startCoords.client.x;
                dy = this.curCoords.client.y - this.startCoords.client.y;

                this.pointerWasMoved = hypot(dx, dy) > pointerMoveTolerance;
            }

            if (!duplicateMove && (!this.pointerIsDown || this.pointerWasMoved)) {
                if (this.pointerIsDown) {
                    clearTimeout(this.holdTimers[pointerIndex]);
                }

                this.collectEventTargets(pointer, event, eventTarget, 'move');
            }

            if (!this.pointerIsDown) { return; }

            if (duplicateMove && this.pointerWasMoved && !preEnd) {
                this.checkAndPreventDefault(event, this.target, this.element);
                return;
            }

            // set pointer coordinate, time changes and speeds
            setEventDeltas(this.pointerDelta, this.prevCoords, this.curCoords);

            if (!this.prepared.name) { return; }

            if (this.pointerWasMoved
                // ignore movement while inertia is active
                && (!this.inertiaStatus.active || (pointer instanceof InteractEvent && /inertiastart/.test(pointer.type)))) {

                // if just starting an action, calculate the pointer speed now
                if (!this.interacting()) {
                    setEventDeltas(this.pointerDelta, this.prevCoords, this.curCoords);

                    // check if a drag is in the correct axis
                    if (this.prepared.name === 'drag') {
                        var absX = Math.abs(dx),
                            absY = Math.abs(dy),
                            targetAxis = this.target.options.drag.axis,
                            axis = (absX > absY ? 'x' : absX < absY ? 'y' : 'xy');

                        // if the movement isn't in the axis of the interactable
                        if (axis !== 'xy' && targetAxis !== 'xy' && targetAxis !== axis) {
                            // cancel the prepared action
                            this.prepared.name = null;

                            // then try to get a drag from another ineractable

                            var element = eventTarget;

                            // check element interactables
                            while (isElement(element)) {
                                var elementInteractable = interactables.get(element);

                                if (elementInteractable
                                    && elementInteractable !== this.target
                                    && !elementInteractable.options.drag.manualStart
                                    && elementInteractable.getAction(this.downPointer, this.downEvent, this, element).name === 'drag'
                                    && checkAxis(axis, elementInteractable)) {

                                    this.prepared.name = 'drag';
                                    this.target = elementInteractable;
                                    this.element = element;
                                    break;
                                }

                                element = parentElement(element);
                            }

                            // if there's no drag from element interactables,
                            // check the selector interactables
                            if (!this.prepared.name) {
                                var thisInteraction = this;

                                var getDraggable = function (interactable, selector, context) {
                                    var elements = ie8MatchesSelector
                                        ? context.querySelectorAll(selector)
                                        : undefined;

                                    if (interactable === thisInteraction.target) { return; }

                                    if (inContext(interactable, eventTarget)
                                        && !interactable.options.drag.manualStart
                                        && !testIgnore(interactable, element, eventTarget)
                                        && testAllow(interactable, element, eventTarget)
                                        && matchesSelector(element, selector, elements)
                                        && interactable.getAction(thisInteraction.downPointer, thisInteraction.downEvent, thisInteraction, element).name === 'drag'
                                        && checkAxis(axis, interactable)
                                        && withinInteractionLimit(interactable, element, 'drag')) {

                                        return interactable;
                                    }
                                };

                                element = eventTarget;

                                while (isElement(element)) {
                                    var selectorInteractable = interactables.forEachSelector(getDraggable);

                                    if (selectorInteractable) {
                                        this.prepared.name = 'drag';
                                        this.target = selectorInteractable;
                                        this.element = element;
                                        break;
                                    }

                                    element = parentElement(element);
                                }
                            }
                        }
                    }
                }

                var starting = !!this.prepared.name && !this.interacting();

                if (starting
                    && (this.target.options[this.prepared.name].manualStart
                        || !withinInteractionLimit(this.target, this.element, this.prepared))) {
                    this.stop(event);
                    return;
                }

                if (this.prepared.name && this.target) {
                    if (starting) {
                        this.start(this.prepared, this.target, this.element);
                    }

                    var shouldMove = this.setModifications(this.curCoords.page, preEnd);

                    // move if snapping or restriction doesn't prevent it
                    if (shouldMove || starting) {
                        this.prevEvent = this[this.prepared.name + 'Move'](event);
                    }

                    this.checkAndPreventDefault(event, this.target, this.element);
                }
            }

            copyCoords(this.prevCoords, this.curCoords);

            if (this.dragging || this.resizing) {
                this.autoScrollMove(pointer);
            }
        },

        dragStart: function (event) {
            var dragEvent = new InteractEvent(this, event, 'drag', 'start', this.element);

            this.dragging = true;
            this.target.fire(dragEvent);

            // reset active dropzones
            this.activeDrops.dropzones = [];
            this.activeDrops.elements  = [];
            this.activeDrops.rects     = [];

            if (!this.dynamicDrop) {
                this.setActiveDrops(this.element);
            }

            var dropEvents = this.getDropEvents(event, dragEvent);

            if (dropEvents.activate) {
                this.fireActiveDrops(dropEvents.activate);
            }

            return dragEvent;
        },

        dragMove: function (event) {
            var target = this.target,
                dragEvent  = new InteractEvent(this, event, 'drag', 'move', this.element),
                draggableElement = this.element,
                drop = this.getDrop(dragEvent, event, draggableElement);

            this.dropTarget = drop.dropzone;
            this.dropElement = drop.element;

            var dropEvents = this.getDropEvents(event, dragEvent);

            target.fire(dragEvent);

            if (dropEvents.leave) { this.prevDropTarget.fire(dropEvents.leave); }
            if (dropEvents.enter) {     this.dropTarget.fire(dropEvents.enter); }
            if (dropEvents.move ) {     this.dropTarget.fire(dropEvents.move ); }

            this.prevDropTarget  = this.dropTarget;
            this.prevDropElement = this.dropElement;

            return dragEvent;
        },

        resizeStart: function (event) {
            var resizeEvent = new InteractEvent(this, event, 'resize', 'start', this.element);

            if (this.prepared.edges) {
                var startRect = this.target.getRect(this.element);

                /*
                 * When using the `resizable.square` or `resizable.preserveAspectRatio` options, resizing from one edge
                 * will affect another. E.g. with `resizable.square`, resizing to make the right edge larger will make
                 * the bottom edge larger by the same amount. We call these 'linked' edges. Any linked edges will depend
                 * on the active edges and the edge being interacted with.
                 */
                if (this.target.options.resize.square || this.target.options.resize.preserveAspectRatio) {
                    var linkedEdges = extend({}, this.prepared.edges);

                    linkedEdges.top    = linkedEdges.top    || (linkedEdges.left   && !linkedEdges.bottom);
                    linkedEdges.left   = linkedEdges.left   || (linkedEdges.top    && !linkedEdges.right );
                    linkedEdges.bottom = linkedEdges.bottom || (linkedEdges.right  && !linkedEdges.top   );
                    linkedEdges.right  = linkedEdges.right  || (linkedEdges.bottom && !linkedEdges.left  );

                    this.prepared._linkedEdges = linkedEdges;
                }
                else {
                    this.prepared._linkedEdges = null;
                }

                // if using `resizable.preserveAspectRatio` option, record aspect ratio at the start of the resize
                if (this.target.options.resize.preserveAspectRatio) {
                    this.resizeStartAspectRatio = startRect.width / startRect.height;
                }

                this.resizeRects = {
                    start     : startRect,
                    current   : extend({}, startRect),
                    restricted: extend({}, startRect),
                    previous  : extend({}, startRect),
                    delta     : {
                        left: 0, right : 0, width : 0,
                        top : 0, bottom: 0, height: 0
                    }
                };

                resizeEvent.rect = this.resizeRects.restricted;
                resizeEvent.deltaRect = this.resizeRects.delta;
            }

            this.target.fire(resizeEvent);

            this.resizing = true;

            return resizeEvent;
        },

        resizeMove: function (event) {
            var resizeEvent = new InteractEvent(this, event, 'resize', 'move', this.element);

            var edges = this.prepared.edges,
                invert = this.target.options.resize.invert,
                invertible = invert === 'reposition' || invert === 'negate';

            if (edges) {
                var dx = resizeEvent.dx,
                    dy = resizeEvent.dy,

                    start      = this.resizeRects.start,
                    current    = this.resizeRects.current,
                    restricted = this.resizeRects.restricted,
                    delta      = this.resizeRects.delta,
                    previous   = extend(this.resizeRects.previous, restricted),

                    originalEdges = edges;

                // `resize.preserveAspectRatio` takes precedence over `resize.square`
                if (this.target.options.resize.preserveAspectRatio) {
                    var resizeStartAspectRatio = this.resizeStartAspectRatio;

                    edges = this.prepared._linkedEdges;

                    if ((originalEdges.left && originalEdges.bottom)
                        || (originalEdges.right && originalEdges.top)) {
                        dy = -dx / resizeStartAspectRatio;
                    }
                    else if (originalEdges.left || originalEdges.right) { dy = dx / resizeStartAspectRatio; }
                    else if (originalEdges.top || originalEdges.bottom) { dx = dy * resizeStartAspectRatio; }
                }
                else if (this.target.options.resize.square) {
                    edges = this.prepared._linkedEdges;

                    if ((originalEdges.left && originalEdges.bottom)
                        || (originalEdges.right && originalEdges.top)) {
                        dy = -dx;
                    }
                    else if (originalEdges.left || originalEdges.right) { dy = dx; }
                    else if (originalEdges.top || originalEdges.bottom) { dx = dy; }
                }

                // update the 'current' rect without modifications
                if (edges.top   ) { current.top    += dy; }
                if (edges.bottom) { current.bottom += dy; }
                if (edges.left  ) { current.left   += dx; }
                if (edges.right ) { current.right  += dx; }

                if (invertible) {
                    // if invertible, copy the current rect
                    extend(restricted, current);

                    if (invert === 'reposition') {
                        // swap edge values if necessary to keep width/height positive
                        var swap;

                        if (restricted.top > restricted.bottom) {
                            swap = restricted.top;

                            restricted.top = restricted.bottom;
                            restricted.bottom = swap;
                        }
                        if (restricted.left > restricted.right) {
                            swap = restricted.left;

                            restricted.left = restricted.right;
                            restricted.right = swap;
                        }
                    }
                }
                else {
                    // if not invertible, restrict to minimum of 0x0 rect
                    restricted.top    = Math.min(current.top, start.bottom);
                    restricted.bottom = Math.max(current.bottom, start.top);
                    restricted.left   = Math.min(current.left, start.right);
                    restricted.right  = Math.max(current.right, start.left);
                }

                restricted.width  = restricted.right  - restricted.left;
                restricted.height = restricted.bottom - restricted.top ;

                for (var edge in restricted) {
                    delta[edge] = restricted[edge] - previous[edge];
                }

                resizeEvent.edges = this.prepared.edges;
                resizeEvent.rect = restricted;
                resizeEvent.deltaRect = delta;
            }

            this.target.fire(resizeEvent);

            return resizeEvent;
        },

        gestureStart: function (event) {
            var gestureEvent = new InteractEvent(this, event, 'gesture', 'start', this.element);

            gestureEvent.ds = 0;

            this.gesture.startDistance = this.gesture.prevDistance = gestureEvent.distance;
            this.gesture.startAngle = this.gesture.prevAngle = gestureEvent.angle;
            this.gesture.scale = 1;

            this.gesturing = true;

            this.target.fire(gestureEvent);

            return gestureEvent;
        },

        gestureMove: function (event) {
            if (!this.pointerIds.length) {
                return this.prevEvent;
            }

            var gestureEvent;

            gestureEvent = new InteractEvent(this, event, 'gesture', 'move', this.element);
            gestureEvent.ds = gestureEvent.scale - this.gesture.scale;

            this.target.fire(gestureEvent);

            this.gesture.prevAngle = gestureEvent.angle;
            this.gesture.prevDistance = gestureEvent.distance;

            if (gestureEvent.scale !== Infinity &&
                gestureEvent.scale !== null &&
                gestureEvent.scale !== undefined  &&
                !isNaN(gestureEvent.scale)) {

                this.gesture.scale = gestureEvent.scale;
            }

            return gestureEvent;
        },

        pointerHold: function (pointer, event, eventTarget) {
            this.collectEventTargets(pointer, event, eventTarget, 'hold');
        },

        pointerUp: function (pointer, event, eventTarget, curEventTarget) {
            var pointerIndex = this.mouse? 0 : indexOf(this.pointerIds, getPointerId(pointer));

            clearTimeout(this.holdTimers[pointerIndex]);

            this.collectEventTargets(pointer, event, eventTarget, 'up' );
            this.collectEventTargets(pointer, event, eventTarget, 'tap');

            this.pointerEnd(pointer, event, eventTarget, curEventTarget);

            this.removePointer(pointer);
        },

        pointerCancel: function (pointer, event, eventTarget, curEventTarget) {
            var pointerIndex = this.mouse? 0 : indexOf(this.pointerIds, getPointerId(pointer));

            clearTimeout(this.holdTimers[pointerIndex]);

            this.collectEventTargets(pointer, event, eventTarget, 'cancel');
            this.pointerEnd(pointer, event, eventTarget, curEventTarget);

            this.removePointer(pointer);
        },

        // http://www.quirksmode.org/dom/events/click.html
        // >Events leading to dblclick
        //
        // IE8 doesn't fire down event before dblclick.
        // This workaround tries to fire a tap and doubletap after dblclick
        ie8Dblclick: function (pointer, event, eventTarget) {
            if (this.prevTap
                && event.clientX === this.prevTap.clientX
                && event.clientY === this.prevTap.clientY
                && eventTarget   === this.prevTap.target) {

                this.downTargets[0] = eventTarget;
                this.downTimes[0] = new Date().getTime();
                this.collectEventTargets(pointer, event, eventTarget, 'tap');
            }
        },

        // End interact move events and stop auto-scroll unless inertia is enabled
        pointerEnd: function (pointer, event, eventTarget, curEventTarget) {
            var endEvent,
                target = this.target,
                options = target && target.options,
                inertiaOptions = options && this.prepared.name && options[this.prepared.name].inertia,
                inertiaStatus = this.inertiaStatus;

            if (this.interacting()) {

                if (inertiaStatus.active && !inertiaStatus.ending) { return; }

                var pointerSpeed,
                    now = new Date().getTime(),
                    inertiaPossible = false,
                    inertia = false,
                    smoothEnd = false,
                    endSnap = checkSnap(target, this.prepared.name) && options[this.prepared.name].snap.endOnly,
                    endRestrict = checkRestrict(target, this.prepared.name) && options[this.prepared.name].restrict.endOnly,
                    dx = 0,
                    dy = 0,
                    startEvent;

                if (this.dragging) {
                    if      (options.drag.axis === 'x' ) { pointerSpeed = Math.abs(this.pointerDelta.client.vx); }
                    else if (options.drag.axis === 'y' ) { pointerSpeed = Math.abs(this.pointerDelta.client.vy); }
                    else   /*options.drag.axis === 'xy'*/{ pointerSpeed = this.pointerDelta.client.speed; }
                }
                else {
                    pointerSpeed = this.pointerDelta.client.speed;
                }

                // check if inertia should be started
                inertiaPossible = (inertiaOptions && inertiaOptions.enabled
                                   && this.prepared.name !== 'gesture'
                                   && event !== inertiaStatus.startEvent);

                inertia = (inertiaPossible
                           && (now - this.curCoords.timeStamp) < 50
                           && pointerSpeed > inertiaOptions.minSpeed
                           && pointerSpeed > inertiaOptions.endSpeed);

                if (inertiaPossible && !inertia && (endSnap || endRestrict)) {

                    var snapRestrict = {};

                    snapRestrict.snap = snapRestrict.restrict = snapRestrict;

                    if (endSnap) {
                        this.setSnapping(this.curCoords.page, snapRestrict);
                        if (snapRestrict.locked) {
                            dx += snapRestrict.dx;
                            dy += snapRestrict.dy;
                        }
                    }

                    if (endRestrict) {
                        this.setRestriction(this.curCoords.page, snapRestrict);
                        if (snapRestrict.restricted) {
                            dx += snapRestrict.dx;
                            dy += snapRestrict.dy;
                        }
                    }

                    if (dx || dy) {
                        smoothEnd = true;
                    }
                }

                if (inertia || smoothEnd) {
                    copyCoords(inertiaStatus.upCoords, this.curCoords);

                    this.pointers[0] = inertiaStatus.startEvent = startEvent =
                        new InteractEvent(this, event, this.prepared.name, 'inertiastart', this.element);

                    inertiaStatus.t0 = now;

                    target.fire(inertiaStatus.startEvent);

                    if (inertia) {
                        inertiaStatus.vx0 = this.pointerDelta.client.vx;
                        inertiaStatus.vy0 = this.pointerDelta.client.vy;
                        inertiaStatus.v0 = pointerSpeed;

                        this.calcInertia(inertiaStatus);

                        var page = extend({}, this.curCoords.page),
                            origin = getOriginXY(target, this.element),
                            statusObject;

                        page.x = page.x + inertiaStatus.xe - origin.x;
                        page.y = page.y + inertiaStatus.ye - origin.y;

                        statusObject = {
                            useStatusXY: true,
                            x: page.x,
                            y: page.y,
                            dx: 0,
                            dy: 0,
                            snap: null
                        };

                        statusObject.snap = statusObject;

                        dx = dy = 0;

                        if (endSnap) {
                            var snap = this.setSnapping(this.curCoords.page, statusObject);

                            if (snap.locked) {
                                dx += snap.dx;
                                dy += snap.dy;
                            }
                        }

                        if (endRestrict) {
                            var restrict = this.setRestriction(this.curCoords.page, statusObject);

                            if (restrict.restricted) {
                                dx += restrict.dx;
                                dy += restrict.dy;
                            }
                        }

                        inertiaStatus.modifiedXe += dx;
                        inertiaStatus.modifiedYe += dy;

                        inertiaStatus.i = reqFrame(this.boundInertiaFrame);
                    }
                    else {
                        inertiaStatus.smoothEnd = true;
                        inertiaStatus.xe = dx;
                        inertiaStatus.ye = dy;

                        inertiaStatus.sx = inertiaStatus.sy = 0;

                        inertiaStatus.i = reqFrame(this.boundSmoothEndFrame);
                    }

                    inertiaStatus.active = true;
                    return;
                }

                if (endSnap || endRestrict) {
                    // fire a move event at the snapped coordinates
                    this.pointerMove(pointer, event, eventTarget, curEventTarget, true);
                }
            }

            if (this.dragging) {
                endEvent = new InteractEvent(this, event, 'drag', 'end', this.element);

                var draggableElement = this.element,
                    drop = this.getDrop(endEvent, event, draggableElement);

                this.dropTarget = drop.dropzone;
                this.dropElement = drop.element;

                var dropEvents = this.getDropEvents(event, endEvent);

                if (dropEvents.leave) { this.prevDropTarget.fire(dropEvents.leave); }
                if (dropEvents.enter) {     this.dropTarget.fire(dropEvents.enter); }
                if (dropEvents.drop ) {     this.dropTarget.fire(dropEvents.drop ); }
                if (dropEvents.deactivate) {
                    this.fireActiveDrops(dropEvents.deactivate);
                }

                target.fire(endEvent);
            }
            else if (this.resizing) {
                endEvent = new InteractEvent(this, event, 'resize', 'end', this.element);
                target.fire(endEvent);
            }
            else if (this.gesturing) {
                endEvent = new InteractEvent(this, event, 'gesture', 'end', this.element);
                target.fire(endEvent);
            }

            this.stop(event);
        },

        collectDrops: function (element) {
            var drops = [],
                elements = [],
                i;

            element = element || this.element;

            // collect all dropzones and their elements which qualify for a drop
            for (i = 0; i < interactables.length; i++) {
                if (!interactables[i].options.drop.enabled) { continue; }

                var current = interactables[i],
                    accept = current.options.drop.accept;

                // test the draggable element against the dropzone's accept setting
                if ((isElement(accept) && accept !== element)
                    || (isString(accept)
                        && !matchesSelector(element, accept))) {

                    continue;
                }

                // query for new elements if necessary
                var dropElements = current.selector? current._context.querySelectorAll(current.selector) : [current._element];

                for (var j = 0, len = dropElements.length; j < len; j++) {
                    var currentElement = dropElements[j];

                    if (currentElement === element) {
                        continue;
                    }

                    drops.push(current);
                    elements.push(currentElement);
                }
            }

            return {
                dropzones: drops,
                elements: elements
            };
        },

        fireActiveDrops: function (event) {
            var i,
                current,
                currentElement,
                prevElement;

            // loop through all active dropzones and trigger event
            for (i = 0; i < this.activeDrops.dropzones.length; i++) {
                current = this.activeDrops.dropzones[i];
                currentElement = this.activeDrops.elements [i];

                // prevent trigger of duplicate events on same element
                if (currentElement !== prevElement) {
                    // set current element as event target
                    event.target = currentElement;
                    current.fire(event);
                }
                prevElement = currentElement;
            }
        },

        // Collect a new set of possible drops and save them in activeDrops.
        // setActiveDrops should always be called when a drag has just started or a
        // drag event happens while dynamicDrop is true
        setActiveDrops: function (dragElement) {
            // get dropzones and their elements that could receive the draggable
            var possibleDrops = this.collectDrops(dragElement, true);

            this.activeDrops.dropzones = possibleDrops.dropzones;
            this.activeDrops.elements  = possibleDrops.elements;
            this.activeDrops.rects     = [];

            for (var i = 0; i < this.activeDrops.dropzones.length; i++) {
                this.activeDrops.rects[i] = this.activeDrops.dropzones[i].getRect(this.activeDrops.elements[i]);
            }
        },

        getDrop: function (dragEvent, event, dragElement) {
            var validDrops = [];

            if (dynamicDrop) {
                this.setActiveDrops(dragElement);
            }

            // collect all dropzones and their elements which qualify for a drop
            for (var j = 0; j < this.activeDrops.dropzones.length; j++) {
                var current        = this.activeDrops.dropzones[j],
                    currentElement = this.activeDrops.elements [j],
                    rect           = this.activeDrops.rects    [j];

                validDrops.push(current.dropCheck(dragEvent, event, this.target, dragElement, currentElement, rect)
                                ? currentElement
                                : null);
            }

            // get the most appropriate dropzone based on DOM depth and order
            var dropIndex = indexOfDeepestElement(validDrops),
                dropzone  = this.activeDrops.dropzones[dropIndex] || null,
                element   = this.activeDrops.elements [dropIndex] || null;

            return {
                dropzone: dropzone,
                element: element
            };
        },

        getDropEvents: function (pointerEvent, dragEvent) {
            var dropEvents = {
                enter     : null,
                leave     : null,
                activate  : null,
                deactivate: null,
                move      : null,
                drop      : null
            };

            if (this.dropElement !== this.prevDropElement) {
                // if there was a prevDropTarget, create a dragleave event
                if (this.prevDropTarget) {
                    dropEvents.leave = {
                        target       : this.prevDropElement,
                        dropzone     : this.prevDropTarget,
                        relatedTarget: dragEvent.target,
                        draggable    : dragEvent.interactable,
                        dragEvent    : dragEvent,
                        interaction  : this,
                        timeStamp    : dragEvent.timeStamp,
                        type         : 'dragleave'
                    };

                    dragEvent.dragLeave = this.prevDropElement;
                    dragEvent.prevDropzone = this.prevDropTarget;
                }
                // if the dropTarget is not null, create a dragenter event
                if (this.dropTarget) {
                    dropEvents.enter = {
                        target       : this.dropElement,
                        dropzone     : this.dropTarget,
                        relatedTarget: dragEvent.target,
                        draggable    : dragEvent.interactable,
                        dragEvent    : dragEvent,
                        interaction  : this,
                        timeStamp    : dragEvent.timeStamp,
                        type         : 'dragenter'
                    };

                    dragEvent.dragEnter = this.dropElement;
                    dragEvent.dropzone = this.dropTarget;
                }
            }

            if (dragEvent.type === 'dragend' && this.dropTarget) {
                dropEvents.drop = {
                    target       : this.dropElement,
                    dropzone     : this.dropTarget,
                    relatedTarget: dragEvent.target,
                    draggable    : dragEvent.interactable,
                    dragEvent    : dragEvent,
                    interaction  : this,
                    timeStamp    : dragEvent.timeStamp,
                    type         : 'drop'
                };

                dragEvent.dropzone = this.dropTarget;
            }
            if (dragEvent.type === 'dragstart') {
                dropEvents.activate = {
                    target       : null,
                    dropzone     : null,
                    relatedTarget: dragEvent.target,
                    draggable    : dragEvent.interactable,
                    dragEvent    : dragEvent,
                    interaction  : this,
                    timeStamp    : dragEvent.timeStamp,
                    type         : 'dropactivate'
                };
            }
            if (dragEvent.type === 'dragend') {
                dropEvents.deactivate = {
                    target       : null,
                    dropzone     : null,
                    relatedTarget: dragEvent.target,
                    draggable    : dragEvent.interactable,
                    dragEvent    : dragEvent,
                    interaction  : this,
                    timeStamp    : dragEvent.timeStamp,
                    type         : 'dropdeactivate'
                };
            }
            if (dragEvent.type === 'dragmove' && this.dropTarget) {
                dropEvents.move = {
                    target       : this.dropElement,
                    dropzone     : this.dropTarget,
                    relatedTarget: dragEvent.target,
                    draggable    : dragEvent.interactable,
                    dragEvent    : dragEvent,
                    interaction  : this,
                    dragmove     : dragEvent,
                    timeStamp    : dragEvent.timeStamp,
                    type         : 'dropmove'
                };
                dragEvent.dropzone = this.dropTarget;
            }

            return dropEvents;
        },

        currentAction: function () {
            return (this.dragging && 'drag') || (this.resizing && 'resize') || (this.gesturing && 'gesture') || null;
        },

        interacting: function () {
            return this.dragging || this.resizing || this.gesturing;
        },

        clearTargets: function () {
            this.target = this.element = null;

            this.dropTarget = this.dropElement = this.prevDropTarget = this.prevDropElement = null;
        },

        stop: function (event) {
            if (this.interacting()) {
                autoScroll.stop();
                this.matches = [];
                this.matchElements = [];

                var target = this.target;

                if (target.options.styleCursor) {
                    target._doc.documentElement.style.cursor = '';
                }

                // prevent Default only if were previously interacting
                if (event && isFunction(event.preventDefault)) {
                    this.checkAndPreventDefault(event, target, this.element);
                }

                if (this.dragging) {
                    this.activeDrops.dropzones = this.activeDrops.elements = this.activeDrops.rects = null;
                }
            }

            this.clearTargets();

            this.pointerIsDown = this.snapStatus.locked = this.dragging = this.resizing = this.gesturing = false;
            this.prepared.name = this.prevEvent = null;
            this.inertiaStatus.resumeDx = this.inertiaStatus.resumeDy = 0;

            // remove pointers if their ID isn't in this.pointerIds
            for (var i = 0; i < this.pointers.length; i++) {
                if (indexOf(this.pointerIds, getPointerId(this.pointers[i])) === -1) {
                    this.pointers.splice(i, 1);
                }
            }
        },

        inertiaFrame: function () {
            var inertiaStatus = this.inertiaStatus,
                options = this.target.options[this.prepared.name].inertia,
                lambda = options.resistance,
                t = new Date().getTime() / 1000 - inertiaStatus.t0;

            if (t < inertiaStatus.te) {

                var progress =  1 - (Math.exp(-lambda * t) - inertiaStatus.lambda_v0) / inertiaStatus.one_ve_v0;

                if (inertiaStatus.modifiedXe === inertiaStatus.xe && inertiaStatus.modifiedYe === inertiaStatus.ye) {
                    inertiaStatus.sx = inertiaStatus.xe * progress;
                    inertiaStatus.sy = inertiaStatus.ye * progress;
                }
                else {
                    var quadPoint = getQuadraticCurvePoint(
                            0, 0,
                            inertiaStatus.xe, inertiaStatus.ye,
                            inertiaStatus.modifiedXe, inertiaStatus.modifiedYe,
                            progress);

                    inertiaStatus.sx = quadPoint.x;
                    inertiaStatus.sy = quadPoint.y;
                }

                this.pointerMove(inertiaStatus.startEvent, inertiaStatus.startEvent);

                inertiaStatus.i = reqFrame(this.boundInertiaFrame);
            }
            else {
                inertiaStatus.ending = true;

                inertiaStatus.sx = inertiaStatus.modifiedXe;
                inertiaStatus.sy = inertiaStatus.modifiedYe;

                this.pointerMove(inertiaStatus.startEvent, inertiaStatus.startEvent);
                this.pointerEnd(inertiaStatus.startEvent, inertiaStatus.startEvent);

                inertiaStatus.active = inertiaStatus.ending = false;
            }
        },

        smoothEndFrame: function () {
            var inertiaStatus = this.inertiaStatus,
                t = new Date().getTime() - inertiaStatus.t0,
                duration = this.target.options[this.prepared.name].inertia.smoothEndDuration;

            if (t < duration) {
                inertiaStatus.sx = easeOutQuad(t, 0, inertiaStatus.xe, duration);
                inertiaStatus.sy = easeOutQuad(t, 0, inertiaStatus.ye, duration);

                this.pointerMove(inertiaStatus.startEvent, inertiaStatus.startEvent);

                inertiaStatus.i = reqFrame(this.boundSmoothEndFrame);
            }
            else {
                inertiaStatus.ending = true;

                inertiaStatus.sx = inertiaStatus.xe;
                inertiaStatus.sy = inertiaStatus.ye;

                this.pointerMove(inertiaStatus.startEvent, inertiaStatus.startEvent);
                this.pointerEnd(inertiaStatus.startEvent, inertiaStatus.startEvent);

                inertiaStatus.smoothEnd =
                  inertiaStatus.active = inertiaStatus.ending = false;
            }
        },

        addPointer: function (pointer) {
            var id = getPointerId(pointer),
                index = this.mouse? 0 : indexOf(this.pointerIds, id);

            if (index === -1) {
                index = this.pointerIds.length;
            }

            this.pointerIds[index] = id;
            this.pointers[index] = pointer;

            return index;
        },

        removePointer: function (pointer) {
            var id = getPointerId(pointer),
                index = this.mouse? 0 : indexOf(this.pointerIds, id);

            if (index === -1) { return; }

            this.pointers   .splice(index, 1);
            this.pointerIds .splice(index, 1);
            this.downTargets.splice(index, 1);
            this.downTimes  .splice(index, 1);
            this.holdTimers .splice(index, 1);
        },

        recordPointer: function (pointer) {
            var index = this.mouse? 0: indexOf(this.pointerIds, getPointerId(pointer));

            if (index === -1) { return; }

            this.pointers[index] = pointer;
        },

        collectEventTargets: function (pointer, event, eventTarget, eventType) {
            var pointerIndex = this.mouse? 0 : indexOf(this.pointerIds, getPointerId(pointer));

            // do not fire a tap event if the pointer was moved before being lifted
            if (eventType === 'tap' && (this.pointerWasMoved
                // or if the pointerup target is different to the pointerdown target
                || !(this.downTargets[pointerIndex] && this.downTargets[pointerIndex] === eventTarget))) {
                return;
            }

            var targets = [],
                elements = [],
                element = eventTarget;

            function collectSelectors (interactable, selector, context) {
                var els = ie8MatchesSelector
                        ? context.querySelectorAll(selector)
                        : undefined;

                if (interactable._iEvents[eventType]
                    && isElement(element)
                    && inContext(interactable, element)
                    && !testIgnore(interactable, element, eventTarget)
                    && testAllow(interactable, element, eventTarget)
                    && matchesSelector(element, selector, els)) {

                    targets.push(interactable);
                    elements.push(element);
                }
            }

            while (element) {
                if (interact.isSet(element) && interact(element)._iEvents[eventType]) {
                    targets.push(interact(element));
                    elements.push(element);
                }

                interactables.forEachSelector(collectSelectors);

                element = parentElement(element);
            }

            // create the tap event even if there are no listeners so that
            // doubletap can still be created and fired
            if (targets.length || eventType === 'tap') {
                this.firePointers(pointer, event, eventTarget, targets, elements, eventType);
            }
        },

        firePointers: function (pointer, event, eventTarget, targets, elements, eventType) {
            var pointerIndex = this.mouse? 0 : indexOf(this.pointerIds, getPointerId(pointer)),
                pointerEvent = {},
                i,
                // for tap events
                interval, createNewDoubleTap;

            // if it's a doubletap then the event properties would have been
            // copied from the tap event and provided as the pointer argument
            if (eventType === 'doubletap') {
                pointerEvent = pointer;
            }
            else {
                pointerExtend(pointerEvent, event);
                if (event !== pointer) {
                    pointerExtend(pointerEvent, pointer);
                }

                pointerEvent.preventDefault           = preventOriginalDefault;
                pointerEvent.stopPropagation          = InteractEvent.prototype.stopPropagation;
                pointerEvent.stopImmediatePropagation = InteractEvent.prototype.stopImmediatePropagation;
                pointerEvent.interaction              = this;

                pointerEvent.timeStamp       = new Date().getTime();
                pointerEvent.originalEvent   = event;
                pointerEvent.originalPointer = pointer;
                pointerEvent.type            = eventType;
                pointerEvent.pointerId       = getPointerId(pointer);
                pointerEvent.pointerType     = this.mouse? 'mouse' : !supportsPointerEvent? 'touch'
                                                    : isString(pointer.pointerType)
                                                        ? pointer.pointerType
                                                        : [,,'touch', 'pen', 'mouse'][pointer.pointerType];
            }

            if (eventType === 'tap') {
                pointerEvent.dt = pointerEvent.timeStamp - this.downTimes[pointerIndex];

                interval = pointerEvent.timeStamp - this.tapTime;
                createNewDoubleTap = !!(this.prevTap && this.prevTap.type !== 'doubletap'
                       && this.prevTap.target === pointerEvent.target
                       && interval < 500);

                pointerEvent.double = createNewDoubleTap;

                this.tapTime = pointerEvent.timeStamp;
            }

            for (i = 0; i < targets.length; i++) {
                pointerEvent.currentTarget = elements[i];
                pointerEvent.interactable = targets[i];
                targets[i].fire(pointerEvent);

                if (pointerEvent.immediatePropagationStopped
                    ||(pointerEvent.propagationStopped && elements[i + 1] !== pointerEvent.currentTarget)) {
                    break;
                }
            }

            if (createNewDoubleTap) {
                var doubleTap = {};

                extend(doubleTap, pointerEvent);

                doubleTap.dt   = interval;
                doubleTap.type = 'doubletap';

                this.collectEventTargets(doubleTap, event, eventTarget, 'doubletap');

                this.prevTap = doubleTap;
            }
            else if (eventType === 'tap') {
                this.prevTap = pointerEvent;
            }
        },

        validateSelector: function (pointer, event, matches, matchElements) {
            for (var i = 0, len = matches.length; i < len; i++) {
                var match = matches[i],
                    matchElement = matchElements[i],
                    action = validateAction(match.getAction(pointer, event, this, matchElement), match);

                if (action && withinInteractionLimit(match, matchElement, action)) {
                    this.target = match;
                    this.element = matchElement;

                    return action;
                }
            }
        },

        setSnapping: function (pageCoords, status) {
            var snap = this.target.options[this.prepared.name].snap,
                targets = [],
                target,
                page,
                i;

            status = status || this.snapStatus;

            if (status.useStatusXY) {
                page = { x: status.x, y: status.y };
            }
            else {
                var origin = getOriginXY(this.target, this.element);

                page = extend({}, pageCoords);

                page.x -= origin.x;
                page.y -= origin.y;
            }

            status.realX = page.x;
            status.realY = page.y;

            page.x = page.x - this.inertiaStatus.resumeDx;
            page.y = page.y - this.inertiaStatus.resumeDy;

            var len = snap.targets? snap.targets.length : 0;

            for (var relIndex = 0; relIndex < this.snapOffsets.length; relIndex++) {
                var relative = {
                    x: page.x - this.snapOffsets[relIndex].x,
                    y: page.y - this.snapOffsets[relIndex].y
                };

                for (i = 0; i < len; i++) {
                    if (isFunction(snap.targets[i])) {
                        target = snap.targets[i](relative.x, relative.y, this);
                    }
                    else {
                        target = snap.targets[i];
                    }

                    if (!target) { continue; }

                    targets.push({
                        x: isNumber(target.x) ? (target.x + this.snapOffsets[relIndex].x) : relative.x,
                        y: isNumber(target.y) ? (target.y + this.snapOffsets[relIndex].y) : relative.y,

                        range: isNumber(target.range)? target.range: snap.range
                    });
                }
            }

            var closest = {
                    target: null,
                    inRange: false,
                    distance: 0,
                    range: 0,
                    dx: 0,
                    dy: 0
                };

            for (i = 0, len = targets.length; i < len; i++) {
                target = targets[i];

                var range = target.range,
                    dx = target.x - page.x,
                    dy = target.y - page.y,
                    distance = hypot(dx, dy),
                    inRange = distance <= range;

                // Infinite targets count as being out of range
                // compared to non infinite ones that are in range
                if (range === Infinity && closest.inRange && closest.range !== Infinity) {
                    inRange = false;
                }

                if (!closest.target || (inRange
                    // is the closest target in range?
                    ? (closest.inRange && range !== Infinity
                        // the pointer is relatively deeper in this target
                        ? distance / range < closest.distance / closest.range
                        // this target has Infinite range and the closest doesn't
                        : (range === Infinity && closest.range !== Infinity)
                            // OR this target is closer that the previous closest
                            || distance < closest.distance)
                    // The other is not in range and the pointer is closer to this target
                    : (!closest.inRange && distance < closest.distance))) {

                    if (range === Infinity) {
                        inRange = true;
                    }

                    closest.target = target;
                    closest.distance = distance;
                    closest.range = range;
                    closest.inRange = inRange;
                    closest.dx = dx;
                    closest.dy = dy;

                    status.range = range;
                }
            }

            var snapChanged;

            if (closest.target) {
                snapChanged = (status.snappedX !== closest.target.x || status.snappedY !== closest.target.y);

                status.snappedX = closest.target.x;
                status.snappedY = closest.target.y;
            }
            else {
                snapChanged = true;

                status.snappedX = NaN;
                status.snappedY = NaN;
            }

            status.dx = closest.dx;
            status.dy = closest.dy;

            status.changed = (snapChanged || (closest.inRange && !status.locked));
            status.locked = closest.inRange;

            return status;
        },

        setRestriction: function (pageCoords, status) {
            var target = this.target,
                restrict = target && target.options[this.prepared.name].restrict,
                restriction = restrict && restrict.restriction,
                page;

            if (!restriction) {
                return status;
            }

            status = status || this.restrictStatus;

            page = status.useStatusXY
                    ? page = { x: status.x, y: status.y }
                    : page = extend({}, pageCoords);

            if (status.snap && status.snap.locked) {
                page.x += status.snap.dx || 0;
                page.y += status.snap.dy || 0;
            }

            page.x -= this.inertiaStatus.resumeDx;
            page.y -= this.inertiaStatus.resumeDy;

            status.dx = 0;
            status.dy = 0;
            status.restricted = false;

            var rect, restrictedX, restrictedY;

            if (isString(restriction)) {
                if (restriction === 'parent') {
                    restriction = parentElement(this.element);
                }
                else if (restriction === 'self') {
                    restriction = target.getRect(this.element);
                }
                else {
                    restriction = closest(this.element, restriction);
                }

                if (!restriction) { return status; }
            }

            if (isFunction(restriction)) {
                restriction = restriction(page.x, page.y, this.element);
            }

            if (isElement(restriction)) {
                restriction = getElementRect(restriction);
            }

            rect = restriction;

            if (!restriction) {
                restrictedX = page.x;
                restrictedY = page.y;
            }
            // object is assumed to have
            // x, y, width, height or
            // left, top, right, bottom
            else if ('x' in restriction && 'y' in restriction) {
                restrictedX = Math.max(Math.min(rect.x + rect.width  - this.restrictOffset.right , page.x), rect.x + this.restrictOffset.left);
                restrictedY = Math.max(Math.min(rect.y + rect.height - this.restrictOffset.bottom, page.y), rect.y + this.restrictOffset.top );
            }
            else {
                restrictedX = Math.max(Math.min(rect.right  - this.restrictOffset.right , page.x), rect.left + this.restrictOffset.left);
                restrictedY = Math.max(Math.min(rect.bottom - this.restrictOffset.bottom, page.y), rect.top  + this.restrictOffset.top );
            }

            status.dx = restrictedX - page.x;
            status.dy = restrictedY - page.y;

            status.changed = status.restrictedX !== restrictedX || status.restrictedY !== restrictedY;
            status.restricted = !!(status.dx || status.dy);

            status.restrictedX = restrictedX;
            status.restrictedY = restrictedY;

            return status;
        },

        checkAndPreventDefault: function (event, interactable, element) {
            if (!(interactable = interactable || this.target)) { return; }

            var options = interactable.options,
                prevent = options.preventDefault;

            if (prevent === 'auto' && element && !/^(input|select|textarea)$/i.test(event.target.nodeName)) {
                // do not preventDefault on pointerdown if the prepared action is a drag
                // and dragging can only start from a certain direction - this allows
                // a touch to pan the viewport if a drag isn't in the right direction
                if (/down|start/i.test(event.type)
                    && this.prepared.name === 'drag' && options.drag.axis !== 'xy') {

                    return;
                }

                // with manualStart, only preventDefault while interacting
                if (options[this.prepared.name] && options[this.prepared.name].manualStart
                    && !this.interacting()) {
                    return;
                }

                event.preventDefault();
                return;
            }

            if (prevent === 'always') {
                event.preventDefault();
                return;
            }
        },

        calcInertia: function (status) {
            var inertiaOptions = this.target.options[this.prepared.name].inertia,
                lambda = inertiaOptions.resistance,
                inertiaDur = -Math.log(inertiaOptions.endSpeed / status.v0) / lambda;

            status.x0 = this.prevEvent.pageX;
            status.y0 = this.prevEvent.pageY;
            status.t0 = status.startEvent.timeStamp / 1000;
            status.sx = status.sy = 0;

            status.modifiedXe = status.xe = (status.vx0 - inertiaDur) / lambda;
            status.modifiedYe = status.ye = (status.vy0 - inertiaDur) / lambda;
            status.te = inertiaDur;

            status.lambda_v0 = lambda / status.v0;
            status.one_ve_v0 = 1 - inertiaOptions.endSpeed / status.v0;
        },

        autoScrollMove: function (pointer) {
            if (!(this.interacting()
                && checkAutoScroll(this.target, this.prepared.name))) {
                return;
            }

            if (this.inertiaStatus.active) {
                autoScroll.x = autoScroll.y = 0;
                return;
            }

            var top,
                right,
                bottom,
                left,
                options = this.target.options[this.prepared.name].autoScroll,
                container = options.container || getWindow(this.element);

            if (isWindow(container)) {
                left   = pointer.clientX < autoScroll.margin;
                top    = pointer.clientY < autoScroll.margin;
                right  = pointer.clientX > container.innerWidth  - autoScroll.margin;
                bottom = pointer.clientY > container.innerHeight - autoScroll.margin;
            }
            else {
                var rect = getElementClientRect(container);

                left   = pointer.clientX < rect.left   + autoScroll.margin;
                top    = pointer.clientY < rect.top    + autoScroll.margin;
                right  = pointer.clientX > rect.right  - autoScroll.margin;
                bottom = pointer.clientY > rect.bottom - autoScroll.margin;
            }

            autoScroll.x = (right ? 1: left? -1: 0);
            autoScroll.y = (bottom? 1:  top? -1: 0);

            if (!autoScroll.isScrolling) {
                // set the autoScroll properties to those of the target
                autoScroll.margin = options.margin;
                autoScroll.speed  = options.speed;

                autoScroll.start(this);
            }
        },

        _updateEventTargets: function (target, currentTarget) {
            this._eventTarget    = target;
            this._curEventTarget = currentTarget;
        }

    };

    function getInteractionFromPointer (pointer, eventType, eventTarget) {
        var i = 0, len = interactions.length,
            mouseEvent = (/mouse/i.test(pointer.pointerType || eventType)
                          // MSPointerEvent.MSPOINTER_TYPE_MOUSE
                          || pointer.pointerType === 4),
            interaction;

        var id = getPointerId(pointer);

        // try to resume inertia with a new pointer
        if (/down|start/i.test(eventType)) {
            for (i = 0; i < len; i++) {
                interaction = interactions[i];

                var element = eventTarget;

                if (interaction.inertiaStatus.active && interaction.target.options[interaction.prepared.name].inertia.allowResume
                    && (interaction.mouse === mouseEvent)) {
                    while (element) {
                        // if the element is the interaction element
                        if (element === interaction.element) {
                            return interaction;
                        }
                        element = parentElement(element);
                    }
                }
            }
        }

        // if it's a mouse interaction
        if (mouseEvent || !(supportsTouch || supportsPointerEvent)) {

            // find a mouse interaction that's not in inertia phase
            for (i = 0; i < len; i++) {
                if (interactions[i].mouse && !interactions[i].inertiaStatus.active) {
                    return interactions[i];
                }
            }

            // find any interaction specifically for mouse.
            // if the eventType is a mousedown, and inertia is active
            // ignore the interaction
            for (i = 0; i < len; i++) {
                if (interactions[i].mouse && !(/down/.test(eventType) && interactions[i].inertiaStatus.active)) {
                    return interaction;
                }
            }

            // create a new interaction for mouse
            interaction = new Interaction();
            interaction.mouse = true;

            return interaction;
        }

        // get interaction that has this pointer
        for (i = 0; i < len; i++) {
            if (contains(interactions[i].pointerIds, id)) {
                return interactions[i];
            }
        }

        // at this stage, a pointerUp should not return an interaction
        if (/up|end|out/i.test(eventType)) {
            return null;
        }

        // get first idle interaction
        for (i = 0; i < len; i++) {
            interaction = interactions[i];

            if ((!interaction.prepared.name || (interaction.target.options.gesture.enabled))
                && !interaction.interacting()
                && !(!mouseEvent && interaction.mouse)) {

                return interaction;
            }
        }

        return new Interaction();
    }

    function doOnInteractions (method) {
        return (function (event) {
            var interaction,
                eventTarget = getActualElement(event.path
                                               ? event.path[0]
                                               : event.target),
                curEventTarget = getActualElement(event.currentTarget),
                i;

            if (supportsTouch && /touch/.test(event.type)) {
                prevTouchTime = new Date().getTime();

                for (i = 0; i < event.changedTouches.length; i++) {
                    var pointer = event.changedTouches[i];

                    interaction = getInteractionFromPointer(pointer, event.type, eventTarget);

                    if (!interaction) { continue; }

                    interaction._updateEventTargets(eventTarget, curEventTarget);

                    interaction[method](pointer, event, eventTarget, curEventTarget);
                }
            }
            else {
                if (!supportsPointerEvent && /mouse/.test(event.type)) {
                    // ignore mouse events while touch interactions are active
                    for (i = 0; i < interactions.length; i++) {
                        if (!interactions[i].mouse && interactions[i].pointerIsDown) {
                            return;
                        }
                    }

                    // try to ignore mouse events that are simulated by the browser
                    // after a touch event
                    if (new Date().getTime() - prevTouchTime < 500) {
                        return;
                    }
                }

                interaction = getInteractionFromPointer(event, event.type, eventTarget);

                if (!interaction) { return; }

                interaction._updateEventTargets(eventTarget, curEventTarget);

                interaction[method](event, event, eventTarget, curEventTarget);
            }
        });
    }

    function InteractEvent (interaction, event, action, phase, element, related) {
        var client,
            page,
            target      = interaction.target,
            snapStatus  = interaction.snapStatus,
            restrictStatus  = interaction.restrictStatus,
            pointers    = interaction.pointers,
            deltaSource = (target && target.options || defaultOptions).deltaSource,
            sourceX     = deltaSource + 'X',
            sourceY     = deltaSource + 'Y',
            options     = target? target.options: defaultOptions,
            origin      = getOriginXY(target, element),
            starting    = phase === 'start',
            ending      = phase === 'end',
            coords      = starting? interaction.startCoords : interaction.curCoords;

        element = element || interaction.element;

        page   = extend({}, coords.page);
        client = extend({}, coords.client);

        page.x -= origin.x;
        page.y -= origin.y;

        client.x -= origin.x;
        client.y -= origin.y;

        var relativePoints = options[action].snap && options[action].snap.relativePoints ;

        if (checkSnap(target, action) && !(starting && relativePoints && relativePoints.length)) {
            this.snap = {
                range  : snapStatus.range,
                locked : snapStatus.locked,
                x      : snapStatus.snappedX,
                y      : snapStatus.snappedY,
                realX  : snapStatus.realX,
                realY  : snapStatus.realY,
                dx     : snapStatus.dx,
                dy     : snapStatus.dy
            };

            if (snapStatus.locked) {
                page.x += snapStatus.dx;
                page.y += snapStatus.dy;
                client.x += snapStatus.dx;
                client.y += snapStatus.dy;
            }
        }

        if (checkRestrict(target, action) && !(starting && options[action].restrict.elementRect) && restrictStatus.restricted) {
            page.x += restrictStatus.dx;
            page.y += restrictStatus.dy;
            client.x += restrictStatus.dx;
            client.y += restrictStatus.dy;

            this.restrict = {
                dx: restrictStatus.dx,
                dy: restrictStatus.dy
            };
        }

        this.pageX     = page.x;
        this.pageY     = page.y;
        this.clientX   = client.x;
        this.clientY   = client.y;

        this.x0        = interaction.startCoords.page.x - origin.x;
        this.y0        = interaction.startCoords.page.y - origin.y;
        this.clientX0  = interaction.startCoords.client.x - origin.x;
        this.clientY0  = interaction.startCoords.client.y - origin.y;
        this.ctrlKey   = event.ctrlKey;
        this.altKey    = event.altKey;
        this.shiftKey  = event.shiftKey;
        this.metaKey   = event.metaKey;
        this.button    = event.button;
        this.buttons   = event.buttons;
        this.target    = element;
        this.t0        = interaction.downTimes[0];
        this.type      = action + (phase || '');

        this.interaction = interaction;
        this.interactable = target;

        var inertiaStatus = interaction.inertiaStatus;

        if (inertiaStatus.active) {
            this.detail = 'inertia';
        }

        if (related) {
            this.relatedTarget = related;
        }

        // end event dx, dy is difference between start and end points
        if (ending) {
            if (deltaSource === 'client') {
                this.dx = client.x - interaction.startCoords.client.x;
                this.dy = client.y - interaction.startCoords.client.y;
            }
            else {
                this.dx = page.x - interaction.startCoords.page.x;
                this.dy = page.y - interaction.startCoords.page.y;
            }
        }
        else if (starting) {
            this.dx = 0;
            this.dy = 0;
        }
        // copy properties from previousmove if starting inertia
        else if (phase === 'inertiastart') {
            this.dx = interaction.prevEvent.dx;
            this.dy = interaction.prevEvent.dy;
        }
        else {
            if (deltaSource === 'client') {
                this.dx = client.x - interaction.prevEvent.clientX;
                this.dy = client.y - interaction.prevEvent.clientY;
            }
            else {
                this.dx = page.x - interaction.prevEvent.pageX;
                this.dy = page.y - interaction.prevEvent.pageY;
            }
        }
        if (interaction.prevEvent && interaction.prevEvent.detail === 'inertia'
            && !inertiaStatus.active
            && options[action].inertia && options[action].inertia.zeroResumeDelta) {

            inertiaStatus.resumeDx += this.dx;
            inertiaStatus.resumeDy += this.dy;

            this.dx = this.dy = 0;
        }

        if (action === 'resize' && interaction.resizeAxes) {
            if (options.resize.square) {
                if (interaction.resizeAxes === 'y') {
                    this.dx = this.dy;
                }
                else {
                    this.dy = this.dx;
                }
                this.axes = 'xy';
            }
            else {
                this.axes = interaction.resizeAxes;

                if (interaction.resizeAxes === 'x') {
                    this.dy = 0;
                }
                else if (interaction.resizeAxes === 'y') {
                    this.dx = 0;
                }
            }
        }
        else if (action === 'gesture') {
            this.touches = [pointers[0], pointers[1]];

            if (starting) {
                this.distance = touchDistance(pointers, deltaSource);
                this.box      = touchBBox(pointers);
                this.scale    = 1;
                this.ds       = 0;
                this.angle    = touchAngle(pointers, undefined, deltaSource);
                this.da       = 0;
            }
            else if (ending || event instanceof InteractEvent) {
                this.distance = interaction.prevEvent.distance;
                this.box      = interaction.prevEvent.box;
                this.scale    = interaction.prevEvent.scale;
                this.ds       = this.scale - 1;
                this.angle    = interaction.prevEvent.angle;
                this.da       = this.angle - interaction.gesture.startAngle;
            }
            else {
                this.distance = touchDistance(pointers, deltaSource);
                this.box      = touchBBox(pointers);
                this.scale    = this.distance / interaction.gesture.startDistance;
                this.angle    = touchAngle(pointers, interaction.gesture.prevAngle, deltaSource);

                this.ds = this.scale - interaction.gesture.prevScale;
                this.da = this.angle - interaction.gesture.prevAngle;
            }
        }

        if (starting) {
            this.timeStamp = interaction.downTimes[0];
            this.dt        = 0;
            this.duration  = 0;
            this.speed     = 0;
            this.velocityX = 0;
            this.velocityY = 0;
        }
        else if (phase === 'inertiastart') {
            this.timeStamp = interaction.prevEvent.timeStamp;
            this.dt        = interaction.prevEvent.dt;
            this.duration  = interaction.prevEvent.duration;
            this.speed     = interaction.prevEvent.speed;
            this.velocityX = interaction.prevEvent.velocityX;
            this.velocityY = interaction.prevEvent.velocityY;
        }
        else {
            this.timeStamp = new Date().getTime();
            this.dt        = this.timeStamp - interaction.prevEvent.timeStamp;
            this.duration  = this.timeStamp - interaction.downTimes[0];

            if (event instanceof InteractEvent) {
                var dx = this[sourceX] - interaction.prevEvent[sourceX],
                    dy = this[sourceY] - interaction.prevEvent[sourceY],
                    dt = this.dt / 1000;

                this.speed = hypot(dx, dy) / dt;
                this.velocityX = dx / dt;
                this.velocityY = dy / dt;
            }
            // if normal move or end event, use previous user event coords
            else {
                // speed and velocity in pixels per second
                this.speed = interaction.pointerDelta[deltaSource].speed;
                this.velocityX = interaction.pointerDelta[deltaSource].vx;
                this.velocityY = interaction.pointerDelta[deltaSource].vy;
            }
        }

        if ((ending || phase === 'inertiastart')
            && interaction.prevEvent.speed > 600 && this.timeStamp - interaction.prevEvent.timeStamp < 150) {

            var angle = 180 * Math.atan2(interaction.prevEvent.velocityY, interaction.prevEvent.velocityX) / Math.PI,
                overlap = 22.5;

            if (angle < 0) {
                angle += 360;
            }

            var left = 135 - overlap <= angle && angle < 225 + overlap,
                up   = 225 - overlap <= angle && angle < 315 + overlap,

                right = !left && (315 - overlap <= angle || angle <  45 + overlap),
                down  = !up   &&   45 - overlap <= angle && angle < 135 + overlap;

            this.swipe = {
                up   : up,
                down : down,
                left : left,
                right: right,
                angle: angle,
                speed: interaction.prevEvent.speed,
                velocity: {
                    x: interaction.prevEvent.velocityX,
                    y: interaction.prevEvent.velocityY
                }
            };
        }
    }

    InteractEvent.prototype = {
        preventDefault: blank,
        stopImmediatePropagation: function () {
            this.immediatePropagationStopped = this.propagationStopped = true;
        },
        stopPropagation: function () {
            this.propagationStopped = true;
        }
    };

    function preventOriginalDefault () {
        this.originalEvent.preventDefault();
    }

    function getActionCursor (action) {
        var cursor = '';

        if (action.name === 'drag') {
            cursor =  actionCursors.drag;
        }
        if (action.name === 'resize') {
            if (action.axis) {
                cursor =  actionCursors[action.name + action.axis];
            }
            else if (action.edges) {
                var cursorKey = 'resize',
                    edgeNames = ['top', 'bottom', 'left', 'right'];

                for (var i = 0; i < 4; i++) {
                    if (action.edges[edgeNames[i]]) {
                        cursorKey += edgeNames[i];
                    }
                }

                cursor = actionCursors[cursorKey];
            }
        }

        return cursor;
    }

    function checkResizeEdge (name, value, page, element, interactableElement, rect, margin) {
        // false, '', undefined, null
        if (!value) { return false; }

        // true value, use pointer coords and element rect
        if (value === true) {
            // if dimensions are negative, "switch" edges
            var width = isNumber(rect.width)? rect.width : rect.right - rect.left,
                height = isNumber(rect.height)? rect.height : rect.bottom - rect.top;

            if (width < 0) {
                if      (name === 'left' ) { name = 'right'; }
                else if (name === 'right') { name = 'left' ; }
            }
            if (height < 0) {
                if      (name === 'top'   ) { name = 'bottom'; }
                else if (name === 'bottom') { name = 'top'   ; }
            }

            if (name === 'left'  ) { return page.x < ((width  >= 0? rect.left: rect.right ) + margin); }
            if (name === 'top'   ) { return page.y < ((height >= 0? rect.top : rect.bottom) + margin); }

            if (name === 'right' ) { return page.x > ((width  >= 0? rect.right : rect.left) - margin); }
            if (name === 'bottom') { return page.y > ((height >= 0? rect.bottom: rect.top ) - margin); }
        }

        // the remaining checks require an element
        if (!isElement(element)) { return false; }

        return isElement(value)
                    // the value is an element to use as a resize handle
                    ? value === element
                    // otherwise check if element matches value as selector
                    : matchesUpTo(element, value, interactableElement);
    }

    function defaultActionChecker (pointer, interaction, element) {
        var rect = this.getRect(element),
            shouldResize = false,
            action = null,
            resizeAxes = null,
            resizeEdges,
            page = extend({}, interaction.curCoords.page),
            options = this.options;

        if (!rect) { return null; }

        if (actionIsEnabled.resize && options.resize.enabled) {
            var resizeOptions = options.resize;

            resizeEdges = {
                left: false, right: false, top: false, bottom: false
            };

            // if using resize.edges
            if (isObject(resizeOptions.edges)) {
                for (var edge in resizeEdges) {
                    resizeEdges[edge] = checkResizeEdge(edge,
                                                        resizeOptions.edges[edge],
                                                        page,
                                                        interaction._eventTarget,
                                                        element,
                                                        rect,
                                                        resizeOptions.margin || margin);
                }

                resizeEdges.left = resizeEdges.left && !resizeEdges.right;
                resizeEdges.top  = resizeEdges.top  && !resizeEdges.bottom;

                shouldResize = resizeEdges.left || resizeEdges.right || resizeEdges.top || resizeEdges.bottom;
            }
            else {
                var right  = options.resize.axis !== 'y' && page.x > (rect.right  - margin),
                    bottom = options.resize.axis !== 'x' && page.y > (rect.bottom - margin);

                shouldResize = right || bottom;
                resizeAxes = (right? 'x' : '') + (bottom? 'y' : '');
            }
        }

        action = shouldResize
            ? 'resize'
            : actionIsEnabled.drag && options.drag.enabled
                ? 'drag'
                : null;

        if (actionIsEnabled.gesture
            && interaction.pointerIds.length >=2
            && !(interaction.dragging || interaction.resizing)) {
            action = 'gesture';
        }

        if (action) {
            return {
                name: action,
                axis: resizeAxes,
                edges: resizeEdges
            };
        }

        return null;
    }

    // Check if action is enabled globally and the current target supports it
    // If so, return the validated action. Otherwise, return null
    function validateAction (action, interactable) {
        if (!isObject(action)) { return null; }

        var actionName = action.name,
            options = interactable.options;

        if ((  (actionName  === 'resize'   && options.resize.enabled )
            || (actionName      === 'drag'     && options.drag.enabled  )
            || (actionName      === 'gesture'  && options.gesture.enabled))
            && actionIsEnabled[actionName]) {

            if (actionName === 'resize' || actionName === 'resizeyx') {
                actionName = 'resizexy';
            }

            return action;
        }
        return null;
    }

    var listeners = {},
        interactionListeners = [
            'dragStart', 'dragMove', 'resizeStart', 'resizeMove', 'gestureStart', 'gestureMove',
            'pointerOver', 'pointerOut', 'pointerHover', 'selectorDown',
            'pointerDown', 'pointerMove', 'pointerUp', 'pointerCancel', 'pointerEnd',
            'addPointer', 'removePointer', 'recordPointer', 'autoScrollMove'
        ];

    for (var i = 0, len = interactionListeners.length; i < len; i++) {
        var name = interactionListeners[i];

        listeners[name] = doOnInteractions(name);
    }

    // bound to the interactable context when a DOM event
    // listener is added to a selector interactable
    function delegateListener (event, useCapture) {
        var fakeEvent = {},
            delegated = delegatedEvents[event.type],
            eventTarget = getActualElement(event.path
                                           ? event.path[0]
                                           : event.target),
            element = eventTarget;

        useCapture = useCapture? true: false;

        // duplicate the event so that currentTarget can be changed
        for (var prop in event) {
            fakeEvent[prop] = event[prop];
        }

        fakeEvent.originalEvent = event;
        fakeEvent.preventDefault = preventOriginalDefault;

        // climb up document tree looking for selector matches
        while (isElement(element)) {
            for (var i = 0; i < delegated.selectors.length; i++) {
                var selector = delegated.selectors[i],
                    context = delegated.contexts[i];

                if (matchesSelector(element, selector)
                    && nodeContains(context, eventTarget)
                    && nodeContains(context, element)) {

                    var listeners = delegated.listeners[i];

                    fakeEvent.currentTarget = element;

                    for (var j = 0; j < listeners.length; j++) {
                        if (listeners[j][1] === useCapture) {
                            listeners[j][0](fakeEvent);
                        }
                    }
                }
            }

            element = parentElement(element);
        }
    }

    function delegateUseCapture (event) {
        return delegateListener.call(this, event, true);
    }

    interactables.indexOfElement = function indexOfElement (element, context) {
        context = context || document;

        for (var i = 0; i < this.length; i++) {
            var interactable = this[i];

            if ((interactable.selector === element
                && (interactable._context === context))
                || (!interactable.selector && interactable._element === element)) {

                return i;
            }
        }
        return -1;
    };

    interactables.get = function interactableGet (element, options) {
        return this[this.indexOfElement(element, options && options.context)];
    };

    interactables.forEachSelector = function (callback) {
        for (var i = 0; i < this.length; i++) {
            var interactable = this[i];

            if (!interactable.selector) {
                continue;
            }

            var ret = callback(interactable, interactable.selector, interactable._context, i, this);

            if (ret !== undefined) {
                return ret;
            }
        }
    };

    /*\
     * interact
     [ method ]
     *
     * The methods of this variable can be used to set elements as
     * interactables and also to change various default settings.
     *
     * Calling it as a function and passing an element or a valid CSS selector
     * string returns an Interactable object which has various methods to
     * configure it.
     *
     - element (Element | string) The HTML or SVG Element to interact with or CSS selector
     = (object) An @Interactable
     *
     > Usage
     | interact(document.getElementById('draggable')).draggable(true);
     |
     | var rectables = interact('rect');
     | rectables
     |     .gesturable(true)
     |     .on('gesturemove', function (event) {
     |         // something cool...
     |     })
     |     .autoScroll(true);
    \*/
    function interact (element, options) {
        return interactables.get(element, options) || new Interactable(element, options);
    }

    /*\
     * Interactable
     [ property ]
     **
     * Object type returned by @interact
    \*/
    function Interactable (element, options) {
        this._element = element;
        this._iEvents = this._iEvents || {};

        var _window;

        if (trySelector(element)) {
            this.selector = element;

            var context = options && options.context;

            _window = context? getWindow(context) : window;

            if (context && (_window.Node
                    ? context instanceof _window.Node
                    : (isElement(context) || context === _window.document))) {

                this._context = context;
            }
        }
        else {
            _window = getWindow(element);

            if (isElement(element, _window)) {

                if (supportsPointerEvent) {
                    events.add(this._element, pEventTypes.down, listeners.pointerDown );
                    events.add(this._element, pEventTypes.move, listeners.pointerHover);
                }
                else {
                    events.add(this._element, 'mousedown' , listeners.pointerDown );
                    events.add(this._element, 'mousemove' , listeners.pointerHover);
                    events.add(this._element, 'touchstart', listeners.pointerDown );
                    events.add(this._element, 'touchmove' , listeners.pointerHover);
                }
            }
        }

        this._doc = _window.document;

        if (!contains(documents, this._doc)) {
            listenToDocument(this._doc);
        }

        interactables.push(this);

        this.set(options);
    }

    Interactable.prototype = {
        setOnEvents: function (action, phases) {
            if (action === 'drop') {
                if (isFunction(phases.ondrop)          ) { this.ondrop           = phases.ondrop          ; }
                if (isFunction(phases.ondropactivate)  ) { this.ondropactivate   = phases.ondropactivate  ; }
                if (isFunction(phases.ondropdeactivate)) { this.ondropdeactivate = phases.ondropdeactivate; }
                if (isFunction(phases.ondragenter)     ) { this.ondragenter      = phases.ondragenter     ; }
                if (isFunction(phases.ondragleave)     ) { this.ondragleave      = phases.ondragleave     ; }
                if (isFunction(phases.ondropmove)      ) { this.ondropmove       = phases.ondropmove      ; }
            }
            else {
                action = 'on' + action;

                if (isFunction(phases.onstart)       ) { this[action + 'start'         ] = phases.onstart         ; }
                if (isFunction(phases.onmove)        ) { this[action + 'move'          ] = phases.onmove          ; }
                if (isFunction(phases.onend)         ) { this[action + 'end'           ] = phases.onend           ; }
                if (isFunction(phases.oninertiastart)) { this[action + 'inertiastart'  ] = phases.oninertiastart  ; }
            }

            return this;
        },

        /*\
         * Interactable.draggable
         [ method ]
         *
         * Gets or sets whether drag actions can be performed on the
         * Interactable
         *
         = (boolean) Indicates if this can be the target of drag events
         | var isDraggable = interact('ul li').draggable();
         * or
         - options (boolean | object) #optional true/false or An object with event listeners to be fired on drag events (object makes the Interactable draggable)
         = (object) This Interactable
         | interact(element).draggable({
         |     onstart: function (event) {},
         |     onmove : function (event) {},
         |     onend  : function (event) {},
         |
         |     // the axis in which the first movement must be
         |     // for the drag sequence to start
         |     // 'xy' by default - any direction
         |     axis: 'x' || 'y' || 'xy',
         |
         |     // max number of drags that can happen concurrently
         |     // with elements of this Interactable. Infinity by default
         |     max: Infinity,
         |
         |     // max number of drags that can target the same element+Interactable
         |     // 1 by default
         |     maxPerElement: 2
         | });
        \*/
        draggable: function (options) {
            if (isObject(options)) {
                this.options.drag.enabled = options.enabled === false? false: true;
                this.setPerAction('drag', options);
                this.setOnEvents('drag', options);

                if (/^x$|^y$|^xy$/.test(options.axis)) {
                    this.options.drag.axis = options.axis;
                }
                else if (options.axis === null) {
                    delete this.options.drag.axis;
                }

                return this;
            }

            if (isBool(options)) {
                this.options.drag.enabled = options;

                return this;
            }

            return this.options.drag;
        },

        setPerAction: function (action, options) {
            // for all the default per-action options
            for (var option in options) {
                // if this option exists for this action
                if (option in defaultOptions[action]) {
                    // if the option in the options arg is an object value
                    if (isObject(options[option])) {
                        // duplicate the object
                        this.options[action][option] = extend(this.options[action][option] || {}, options[option]);

                        if (isObject(defaultOptions.perAction[option]) && 'enabled' in defaultOptions.perAction[option]) {
                            this.options[action][option].enabled = options[option].enabled === false? false : true;
                        }
                    }
                    else if (isBool(options[option]) && isObject(defaultOptions.perAction[option])) {
                        this.options[action][option].enabled = options[option];
                    }
                    else if (options[option] !== undefined) {
                        // or if it's not undefined, do a plain assignment
                        this.options[action][option] = options[option];
                    }
                }
            }
        },

        /*\
         * Interactable.dropzone
         [ method ]
         *
         * Returns or sets whether elements can be dropped onto this
         * Interactable to trigger drop events
         *
         * Dropzones can receive the following events:
         *  - `dropactivate` and `dropdeactivate` when an acceptable drag starts and ends
         *  - `dragenter` and `dragleave` when a draggable enters and leaves the dropzone
         *  - `dragmove` when a draggable that has entered the dropzone is moved
         *  - `drop` when a draggable is dropped into this dropzone
         *
         *  Use the `accept` option to allow only elements that match the given CSS selector or element.
         *
         *  Use the `overlap` option to set how drops are checked for. The allowed values are:
         *   - `'pointer'`, the pointer must be over the dropzone (default)
         *   - `'center'`, the draggable element's center must be over the dropzone
         *   - a number from 0-1 which is the `(intersection area) / (draggable area)`.
         *       e.g. `0.5` for drop to happen when half of the area of the
         *       draggable is over the dropzone
         *
         - options (boolean | object | null) #optional The new value to be set.
         | interact('.drop').dropzone({
         |   accept: '.can-drop' || document.getElementById('single-drop'),
         |   overlap: 'pointer' || 'center' || zeroToOne
         | }
         = (boolean | object) The current setting or this Interactable
        \*/
        dropzone: function (options) {
            if (isObject(options)) {
                this.options.drop.enabled = options.enabled === false? false: true;
                this.setOnEvents('drop', options);

                if (/^(pointer|center)$/.test(options.overlap)) {
                    this.options.drop.overlap = options.overlap;
                }
                else if (isNumber(options.overlap)) {
                    this.options.drop.overlap = Math.max(Math.min(1, options.overlap), 0);
                }
                if ('accept' in options) {
                  this.options.drop.accept = options.accept;
                }
                if ('checker' in options) {
                  this.options.drop.checker = options.checker;
                }

                return this;
            }

            if (isBool(options)) {
                this.options.drop.enabled = options;

                return this;
            }

            return this.options.drop;
        },

        dropCheck: function (dragEvent, event, draggable, draggableElement, dropElement, rect) {
            var dropped = false;

            // if the dropzone has no rect (eg. display: none)
            // call the custom dropChecker or just return false
            if (!(rect = rect || this.getRect(dropElement))) {
                return (this.options.drop.checker
                    ? this.options.drop.checker(dragEvent, event, dropped, this, dropElement, draggable, draggableElement)
                    : false);
            }

            var dropOverlap = this.options.drop.overlap;

            if (dropOverlap === 'pointer') {
                var page = getPageXY(dragEvent),
                    origin = getOriginXY(draggable, draggableElement),
                    horizontal,
                    vertical;

                page.x += origin.x;
                page.y += origin.y;

                horizontal = (page.x > rect.left) && (page.x < rect.right);
                vertical   = (page.y > rect.top ) && (page.y < rect.bottom);

                dropped = horizontal && vertical;
            }

            var dragRect = draggable.getRect(draggableElement);

            if (dropOverlap === 'center') {
                var cx = dragRect.left + dragRect.width  / 2,
                    cy = dragRect.top  + dragRect.height / 2;

                dropped = cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom;
            }

            if (isNumber(dropOverlap)) {
                var overlapArea  = (Math.max(0, Math.min(rect.right , dragRect.right ) - Math.max(rect.left, dragRect.left))
                                  * Math.max(0, Math.min(rect.bottom, dragRect.bottom) - Math.max(rect.top , dragRect.top ))),
                    overlapRatio = overlapArea / (dragRect.width * dragRect.height);

                dropped = overlapRatio >= dropOverlap;
            }

            if (this.options.drop.checker) {
                dropped = this.options.drop.checker(dragEvent, event, dropped, this, dropElement, draggable, draggableElement);
            }

            return dropped;
        },

        /*\
         * Interactable.dropChecker
         [ method ]
         *
         * DEPRECATED. Use interactable.dropzone({ checker: function... }) instead.
         *
         * Gets or sets the function used to check if a dragged element is
         * over this Interactable.
         *
         - checker (function) #optional The function that will be called when checking for a drop
         = (Function | Interactable) The checker function or this Interactable
         *
         * The checker function takes the following arguments:
         *
         - dragEvent (InteractEvent) The related dragmove or dragend event
         - event (TouchEvent | PointerEvent | MouseEvent) The user move/up/end Event related to the dragEvent
         - dropped (boolean) The value from the default drop checker
         - dropzone (Interactable) The dropzone interactable
         - dropElement (Element) The dropzone element
         - draggable (Interactable) The Interactable being dragged
         - draggableElement (Element) The actual element that's being dragged
         *
         > Usage:
         | interact(target)
         | .dropChecker(function(dragEvent,         // related dragmove or dragend event
         |                       event,             // TouchEvent/PointerEvent/MouseEvent
         |                       dropped,           // bool result of the default checker
         |                       dropzone,          // dropzone Interactable
         |                       dropElement,       // dropzone elemnt
         |                       draggable,         // draggable Interactable
         |                       draggableElement) {// draggable element
         |
         |   return dropped && event.target.hasAttribute('allow-drop');
         | }
        \*/
        dropChecker: function (checker) {
            if (isFunction(checker)) {
                this.options.drop.checker = checker;

                return this;
            }
            if (checker === null) {
                delete this.options.getRect;

                return this;
            }

            return this.options.drop.checker;
        },

        /*\
         * Interactable.accept
         [ method ]
         *
         * Deprecated. add an `accept` property to the options object passed to
         * @Interactable.dropzone instead.
         *
         * Gets or sets the Element or CSS selector match that this
         * Interactable accepts if it is a dropzone.
         *
         - newValue (Element | string | null) #optional
         * If it is an Element, then only that element can be dropped into this dropzone.
         * If it is a string, the element being dragged must match it as a selector.
         * If it is null, the accept options is cleared - it accepts any element.
         *
         = (string | Element | null | Interactable) The current accept option if given `undefined` or this Interactable
        \*/
        accept: function (newValue) {
            if (isElement(newValue)) {
                this.options.drop.accept = newValue;

                return this;
            }

            // test if it is a valid CSS selector
            if (trySelector(newValue)) {
                this.options.drop.accept = newValue;

                return this;
            }

            if (newValue === null) {
                delete this.options.drop.accept;

                return this;
            }

            return this.options.drop.accept;
        },

        /*\
         * Interactable.resizable
         [ method ]
         *
         * Gets or sets whether resize actions can be performed on the
         * Interactable
         *
         = (boolean) Indicates if this can be the target of resize elements
         | var isResizeable = interact('input[type=text]').resizable();
         * or
         - options (boolean | object) #optional true/false or An object with event listeners to be fired on resize events (object makes the Interactable resizable)
         = (object) This Interactable
         | interact(element).resizable({
         |     onstart: function (event) {},
         |     onmove : function (event) {},
         |     onend  : function (event) {},
         |
         |     edges: {
         |       top   : true,       // Use pointer coords to check for resize.
         |       left  : false,      // Disable resizing from left edge.
         |       bottom: '.resize-s',// Resize if pointer target matches selector
         |       right : handleEl    // Resize if pointer target is the given Element
         |     },
         |
         |     // Width and height can be adjusted independently. When `true`, width and
         |     // height are adjusted at a 1:1 ratio.
         |     square: false,
         |
         |     // Width and height can be adjusted independently. When `true`, width and
         |     // height maintain the aspect ratio they had when resizing started.
         |     preserveAspectRatio: false,
         |
         |     // a value of 'none' will limit the resize rect to a minimum of 0x0
         |     // 'negate' will allow the rect to have negative width/height
         |     // 'reposition' will keep the width/height positive by swapping
         |     // the top and bottom edges and/or swapping the left and right edges
         |     invert: 'none' || 'negate' || 'reposition'
         |
         |     // limit multiple resizes.
         |     // See the explanation in the @Interactable.draggable example
         |     max: Infinity,
         |     maxPerElement: 1,
         | });
        \*/
        resizable: function (options) {
            if (isObject(options)) {
                this.options.resize.enabled = options.enabled === false? false: true;
                this.setPerAction('resize', options);
                this.setOnEvents('resize', options);

                if (/^x$|^y$|^xy$/.test(options.axis)) {
                    this.options.resize.axis = options.axis;
                }
                else if (options.axis === null) {
                    this.options.resize.axis = defaultOptions.resize.axis;
                }

                if (isBool(options.preserveAspectRatio)) {
                    this.options.resize.preserveAspectRatio = options.preserveAspectRatio;
                }
                else if (isBool(options.square)) {
                    this.options.resize.square = options.square;
                }

                return this;
            }
            if (isBool(options)) {
                this.options.resize.enabled = options;

                return this;
            }
            return this.options.resize;
        },

        /*\
         * Interactable.squareResize
         [ method ]
         *
         * Deprecated. Add a `square: true || false` property to @Interactable.resizable instead
         *
         * Gets or sets whether resizing is forced 1:1 aspect
         *
         = (boolean) Current setting
         *
         * or
         *
         - newValue (boolean) #optional
         = (object) this Interactable
        \*/
        squareResize: function (newValue) {
            if (isBool(newValue)) {
                this.options.resize.square = newValue;

                return this;
            }

            if (newValue === null) {
                delete this.options.resize.square;

                return this;
            }

            return this.options.resize.square;
        },

        /*\
         * Interactable.gesturable
         [ method ]
         *
         * Gets or sets whether multitouch gestures can be performed on the
         * Interactable's element
         *
         = (boolean) Indicates if this can be the target of gesture events
         | var isGestureable = interact(element).gesturable();
         * or
         - options (boolean | object) #optional true/false or An object with event listeners to be fired on gesture events (makes the Interactable gesturable)
         = (object) this Interactable
         | interact(element).gesturable({
         |     onstart: function (event) {},
         |     onmove : function (event) {},
         |     onend  : function (event) {},
         |
         |     // limit multiple gestures.
         |     // See the explanation in @Interactable.draggable example
         |     max: Infinity,
         |     maxPerElement: 1,
         | });
        \*/
        gesturable: function (options) {
            if (isObject(options)) {
                this.options.gesture.enabled = options.enabled === false? false: true;
                this.setPerAction('gesture', options);
                this.setOnEvents('gesture', options);

                return this;
            }

            if (isBool(options)) {
                this.options.gesture.enabled = options;

                return this;
            }

            return this.options.gesture;
        },

        /*\
         * Interactable.autoScroll
         [ method ]
         **
         * Deprecated. Add an `autoscroll` property to the options object
         * passed to @Interactable.draggable or @Interactable.resizable instead.
         *
         * Returns or sets whether dragging and resizing near the edges of the
         * window/container trigger autoScroll for this Interactable
         *
         = (object) Object with autoScroll properties
         *
         * or
         *
         - options (object | boolean) #optional
         * options can be:
         * - an object with margin, distance and interval properties,
         * - true or false to enable or disable autoScroll or
         = (Interactable) this Interactable
        \*/
        autoScroll: function (options) {
            if (isObject(options)) {
                options = extend({ actions: ['drag', 'resize']}, options);
            }
            else if (isBool(options)) {
                options = { actions: ['drag', 'resize'], enabled: options };
            }

            return this.setOptions('autoScroll', options);
        },

        /*\
         * Interactable.snap
         [ method ]
         **
         * Deprecated. Add a `snap` property to the options object passed
         * to @Interactable.draggable or @Interactable.resizable instead.
         *
         * Returns or sets if and how action coordinates are snapped. By
         * default, snapping is relative to the pointer coordinates. You can
         * change this by setting the
         * [`elementOrigin`](https://github.com/taye/interact.js/pull/72).
         **
         = (boolean | object) `false` if snap is disabled; object with snap properties if snap is enabled
         **
         * or
         **
         - options (object | boolean | null) #optional
         = (Interactable) this Interactable
         > Usage
         | interact(document.querySelector('#thing')).snap({
         |     targets: [
         |         // snap to this specific point
         |         {
         |             x: 100,
         |             y: 100,
         |             range: 25
         |         },
         |         // give this function the x and y page coords and snap to the object returned
         |         function (x, y) {
         |             return {
         |                 x: x,
         |                 y: (75 + 50 * Math.sin(x * 0.04)),
         |                 range: 40
         |             };
         |         },
         |         // create a function that snaps to a grid
         |         interact.createSnapGrid({
         |             x: 50,
         |             y: 50,
         |             range: 10,              // optional
         |             offset: { x: 5, y: 10 } // optional
         |         })
         |     ],
         |     // do not snap during normal movement.
         |     // Instead, trigger only one snapped move event
         |     // immediately before the end event.
         |     endOnly: true,
         |
         |     relativePoints: [
         |         { x: 0, y: 0 },  // snap relative to the top left of the element
         |         { x: 1, y: 1 },  // and also to the bottom right
         |     ],  
         |
         |     // offset the snap target coordinates
         |     // can be an object with x/y or 'startCoords'
         |     offset: { x: 50, y: 50 }
         |   }
         | });
        \*/
        snap: function (options) {
            var ret = this.setOptions('snap', options);

            if (ret === this) { return this; }

            return ret.drag;
        },

        setOptions: function (option, options) {
            var actions = options && isArray(options.actions)
                    ? options.actions
                    : ['drag'];

            var i;

            if (isObject(options) || isBool(options)) {
                for (i = 0; i < actions.length; i++) {
                    var action = /resize/.test(actions[i])? 'resize' : actions[i];

                    if (!isObject(this.options[action])) { continue; }

                    var thisOption = this.options[action][option];

                    if (isObject(options)) {
                        extend(thisOption, options);
                        thisOption.enabled = options.enabled === false? false: true;

                        if (option === 'snap') {
                            if (thisOption.mode === 'grid') {
                                thisOption.targets = [
                                    interact.createSnapGrid(extend({
                                        offset: thisOption.gridOffset || { x: 0, y: 0 }
                                    }, thisOption.grid || {}))
                                ];
                            }
                            else if (thisOption.mode === 'anchor') {
                                thisOption.targets = thisOption.anchors;
                            }
                            else if (thisOption.mode === 'path') {
                                thisOption.targets = thisOption.paths;
                            }

                            if ('elementOrigin' in options) {
                                thisOption.relativePoints = [options.elementOrigin];
                            }
                        }
                    }
                    else if (isBool(options)) {
                        thisOption.enabled = options;
                    }
                }

                return this;
            }

            var ret = {},
                allActions = ['drag', 'resize', 'gesture'];

            for (i = 0; i < allActions.length; i++) {
                if (option in defaultOptions[allActions[i]]) {
                    ret[allActions[i]] = this.options[allActions[i]][option];
                }
            }

            return ret;
        },


        /*\
         * Interactable.inertia
         [ method ]
         **
         * Deprecated. Add an `inertia` property to the options object passed
         * to @Interactable.draggable or @Interactable.resizable instead.
         *
         * Returns or sets if and how events continue to run after the pointer is released
         **
         = (boolean | object) `false` if inertia is disabled; `object` with inertia properties if inertia is enabled
         **
         * or
         **
         - options (object | boolean | null) #optional
         = (Interactable) this Interactable
         > Usage
         | // enable and use default settings
         | interact(element).inertia(true);
         |
         | // enable and use custom settings
         | interact(element).inertia({
         |     // value greater than 0
         |     // high values slow the object down more quickly
         |     resistance     : 16,
         |
         |     // the minimum launch speed (pixels per second) that results in inertia start
         |     minSpeed       : 200,
         |
         |     // inertia will stop when the object slows down to this speed
         |     endSpeed       : 20,
         |
         |     // boolean; should actions be resumed when the pointer goes down during inertia
         |     allowResume    : true,
         |
         |     // boolean; should the jump when resuming from inertia be ignored in event.dx/dy
         |     zeroResumeDelta: false,
         |
         |     // if snap/restrict are set to be endOnly and inertia is enabled, releasing
         |     // the pointer without triggering inertia will animate from the release
         |     // point to the snaped/restricted point in the given amount of time (ms)
         |     smoothEndDuration: 300,
         |
         |     // an array of action types that can have inertia (no gesture)
         |     actions        : ['drag', 'resize']
         | });
         |
         | // reset custom settings and use all defaults
         | interact(element).inertia(null);
        \*/
        inertia: function (options) {
            var ret = this.setOptions('inertia', options);

            if (ret === this) { return this; }

            return ret.drag;
        },

        getAction: function (pointer, event, interaction, element) {
            var action = this.defaultActionChecker(pointer, interaction, element);

            if (this.options.actionChecker) {
                return this.options.actionChecker(pointer, event, action, this, element, interaction);
            }

            return action;
        },

        defaultActionChecker: defaultActionChecker,

        /*\
         * Interactable.actionChecker
         [ method ]
         *
         * Gets or sets the function used to check action to be performed on
         * pointerDown
         *
         - checker (function | null) #optional A function which takes a pointer event, defaultAction string, interactable, element and interaction as parameters and returns an object with name property 'drag' 'resize' or 'gesture' and optionally an `edges` object with boolean 'top', 'left', 'bottom' and right props.
         = (Function | Interactable) The checker function or this Interactable
         *
         | interact('.resize-drag')
         |   .resizable(true)
         |   .draggable(true)
         |   .actionChecker(function (pointer, event, action, interactable, element, interaction) {
         |
         |   if (interact.matchesSelector(event.target, '.drag-handle') {
         |     // force drag with handle target
         |     action.name = drag;
         |   }
         |   else {
         |     // resize from the top and right edges
         |     action.name  = 'resize';
         |     action.edges = { top: true, right: true };
         |   }
         |
         |   return action;
         | });
        \*/
        actionChecker: function (checker) {
            if (isFunction(checker)) {
                this.options.actionChecker = checker;

                return this;
            }

            if (checker === null) {
                delete this.options.actionChecker;

                return this;
            }

            return this.options.actionChecker;
        },

        /*\
         * Interactable.getRect
         [ method ]
         *
         * The default function to get an Interactables bounding rect. Can be
         * overridden using @Interactable.rectChecker.
         *
         - element (Element) #optional The element to measure.
         = (object) The object's bounding rectangle.
         o {
         o     top   : 0,
         o     left  : 0,
         o     bottom: 0,
         o     right : 0,
         o     width : 0,
         o     height: 0
         o }
        \*/
        getRect: function rectCheck (element) {
            element = element || this._element;

            if (this.selector && !(isElement(element))) {
                element = this._context.querySelector(this.selector);
            }

            return getElementRect(element);
        },

        /*\
         * Interactable.rectChecker
         [ method ]
         *
         * Returns or sets the function used to calculate the interactable's
         * element's rectangle
         *
         - checker (function) #optional A function which returns this Interactable's bounding rectangle. See @Interactable.getRect
         = (function | object) The checker function or this Interactable
        \*/
        rectChecker: function (checker) {
            if (isFunction(checker)) {
                this.getRect = checker;

                return this;
            }

            if (checker === null) {
                delete this.options.getRect;

                return this;
            }

            return this.getRect;
        },

        /*\
         * Interactable.styleCursor
         [ method ]
         *
         * Returns or sets whether the action that would be performed when the
         * mouse on the element are checked on `mousemove` so that the cursor
         * may be styled appropriately
         *
         - newValue (boolean) #optional
         = (boolean | Interactable) The current setting or this Interactable
        \*/
        styleCursor: function (newValue) {
            if (isBool(newValue)) {
                this.options.styleCursor = newValue;

                return this;
            }

            if (newValue === null) {
                delete this.options.styleCursor;

                return this;
            }

            return this.options.styleCursor;
        },

        /*\
         * Interactable.preventDefault
         [ method ]
         *
         * Returns or sets whether to prevent the browser's default behaviour
         * in response to pointer events. Can be set to:
         *  - `'always'` to always prevent
         *  - `'never'` to never prevent
         *  - `'auto'` to let interact.js try to determine what would be best
         *
         - newValue (string) #optional `true`, `false` or `'auto'`
         = (string | Interactable) The current setting or this Interactable
        \*/
        preventDefault: function (newValue) {
            if (/^(always|never|auto)$/.test(newValue)) {
                this.options.preventDefault = newValue;
                return this;
            }

            if (isBool(newValue)) {
                this.options.preventDefault = newValue? 'always' : 'never';
                return this;
            }

            return this.options.preventDefault;
        },

        /*\
         * Interactable.origin
         [ method ]
         *
         * Gets or sets the origin of the Interactable's element.  The x and y
         * of the origin will be subtracted from action event coordinates.
         *
         - origin (object | string) #optional An object eg. { x: 0, y: 0 } or string 'parent', 'self' or any CSS selector
         * OR
         - origin (Element) #optional An HTML or SVG Element whose rect will be used
         **
         = (object) The current origin or this Interactable
        \*/
        origin: function (newValue) {
            if (trySelector(newValue)) {
                this.options.origin = newValue;
                return this;
            }
            else if (isObject(newValue)) {
                this.options.origin = newValue;
                return this;
            }

            return this.options.origin;
        },

        /*\
         * Interactable.deltaSource
         [ method ]
         *
         * Returns or sets the mouse coordinate types used to calculate the
         * movement of the pointer.
         *
         - newValue (string) #optional Use 'client' if you will be scrolling while interacting; Use 'page' if you want autoScroll to work
         = (string | object) The current deltaSource or this Interactable
        \*/
        deltaSource: function (newValue) {
            if (newValue === 'page' || newValue === 'client') {
                this.options.deltaSource = newValue;

                return this;
            }

            return this.options.deltaSource;
        },

        /*\
         * Interactable.restrict
         [ method ]
         **
         * Deprecated. Add a `restrict` property to the options object passed to
         * @Interactable.draggable, @Interactable.resizable or @Interactable.gesturable instead.
         *
         * Returns or sets the rectangles within which actions on this
         * interactable (after snap calculations) are restricted. By default,
         * restricting is relative to the pointer coordinates. You can change
         * this by setting the
         * [`elementRect`](https://github.com/taye/interact.js/pull/72).
         **
         - options (object) #optional an object with keys drag, resize, and/or gesture whose values are rects, Elements, CSS selectors, or 'parent' or 'self'
         = (object) The current restrictions object or this Interactable
         **
         | interact(element).restrict({
         |     // the rect will be `interact.getElementRect(element.parentNode)`
         |     drag: element.parentNode,
         |
         |     // x and y are relative to the the interactable's origin
         |     resize: { x: 100, y: 100, width: 200, height: 200 }
         | })
         |
         | interact('.draggable').restrict({
         |     // the rect will be the selected element's parent
         |     drag: 'parent',
         |
         |     // do not restrict during normal movement.
         |     // Instead, trigger only one restricted move event
         |     // immediately before the end event.
         |     endOnly: true,
         |
         |     // https://github.com/taye/interact.js/pull/72#issue-41813493
         |     elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
         | });
        \*/
        restrict: function (options) {
            if (!isObject(options)) {
                return this.setOptions('restrict', options);
            }

            var actions = ['drag', 'resize', 'gesture'],
                ret;

            for (var i = 0; i < actions.length; i++) {
                var action = actions[i];

                if (action in options) {
                    var perAction = extend({
                            actions: [action],
                            restriction: options[action]
                        }, options);

                    ret = this.setOptions('restrict', perAction);
                }
            }

            return ret;
        },

        /*\
         * Interactable.context
         [ method ]
         *
         * Gets the selector context Node of the Interactable. The default is `window.document`.
         *
         = (Node) The context Node of this Interactable
         **
        \*/
        context: function () {
            return this._context;
        },

        _context: document,

        /*\
         * Interactable.ignoreFrom
         [ method ]
         *
         * If the target of the `mousedown`, `pointerdown` or `touchstart`
         * event or any of it's parents match the given CSS selector or
         * Element, no drag/resize/gesture is started.
         *
         - newValue (string | Element | null) #optional a CSS selector string, an Element or `null` to not ignore any elements
         = (string | Element | object) The current ignoreFrom value or this Interactable
         **
         | interact(element, { ignoreFrom: document.getElementById('no-action') });
         | // or
         | interact(element).ignoreFrom('input, textarea, a');
        \*/
        ignoreFrom: function (newValue) {
            if (trySelector(newValue)) {            // CSS selector to match event.target
                this.options.ignoreFrom = newValue;
                return this;
            }

            if (isElement(newValue)) {              // specific element
                this.options.ignoreFrom = newValue;
                return this;
            }

            return this.options.ignoreFrom;
        },

        /*\
         * Interactable.allowFrom
         [ method ]
         *
         * A drag/resize/gesture is started only If the target of the
         * `mousedown`, `pointerdown` or `touchstart` event or any of it's
         * parents match the given CSS selector or Element.
         *
         - newValue (string | Element | null) #optional a CSS selector string, an Element or `null` to allow from any element
         = (string | Element | object) The current allowFrom value or this Interactable
         **
         | interact(element, { allowFrom: document.getElementById('drag-handle') });
         | // or
         | interact(element).allowFrom('.handle');
        \*/
        allowFrom: function (newValue) {
            if (trySelector(newValue)) {            // CSS selector to match event.target
                this.options.allowFrom = newValue;
                return this;
            }

            if (isElement(newValue)) {              // specific element
                this.options.allowFrom = newValue;
                return this;
            }

            return this.options.allowFrom;
        },

        /*\
         * Interactable.element
         [ method ]
         *
         * If this is not a selector Interactable, it returns the element this
         * interactable represents
         *
         = (Element) HTML / SVG Element
        \*/
        element: function () {
            return this._element;
        },

        /*\
         * Interactable.fire
         [ method ]
         *
         * Calls listeners for the given InteractEvent type bound globally
         * and directly to this Interactable
         *
         - iEvent (InteractEvent) The InteractEvent object to be fired on this Interactable
         = (Interactable) this Interactable
        \*/
        fire: function (iEvent) {
            if (!(iEvent && iEvent.type) || !contains(eventTypes, iEvent.type)) {
                return this;
            }

            var listeners,
                i,
                len,
                onEvent = 'on' + iEvent.type,
                funcName = '';

            // Interactable#on() listeners
            if (iEvent.type in this._iEvents) {
                listeners = this._iEvents[iEvent.type];

                for (i = 0, len = listeners.length; i < len && !iEvent.immediatePropagationStopped; i++) {
                    funcName = listeners[i].name;
                    listeners[i](iEvent);
                }
            }

            // interactable.onevent listener
            if (isFunction(this[onEvent])) {
                funcName = this[onEvent].name;
                this[onEvent](iEvent);
            }

            // interact.on() listeners
            if (iEvent.type in globalEvents && (listeners = globalEvents[iEvent.type]))  {

                for (i = 0, len = listeners.length; i < len && !iEvent.immediatePropagationStopped; i++) {
                    funcName = listeners[i].name;
                    listeners[i](iEvent);
                }
            }

            return this;
        },

        /*\
         * Interactable.on
         [ method ]
         *
         * Binds a listener for an InteractEvent or DOM event.
         *
         - eventType  (string | array | object) The types of events to listen for
         - listener   (function) The function to be called on the given event(s)
         - useCapture (boolean) #optional useCapture flag for addEventListener
         = (object) This Interactable
        \*/
        on: function (eventType, listener, useCapture) {
            var i;

            if (isString(eventType) && eventType.search(' ') !== -1) {
                eventType = eventType.trim().split(/ +/);
            }

            if (isArray(eventType)) {
                for (i = 0; i < eventType.length; i++) {
                    this.on(eventType[i], listener, useCapture);
                }

                return this;
            }

            if (isObject(eventType)) {
                for (var prop in eventType) {
                    this.on(prop, eventType[prop], listener);
                }

                return this;
            }

            if (eventType === 'wheel') {
                eventType = wheelEvent;
            }

            // convert to boolean
            useCapture = useCapture? true: false;

            if (contains(eventTypes, eventType)) {
                // if this type of event was never bound to this Interactable
                if (!(eventType in this._iEvents)) {
                    this._iEvents[eventType] = [listener];
                }
                else {
                    this._iEvents[eventType].push(listener);
                }
            }
            // delegated event for selector
            else if (this.selector) {
                if (!delegatedEvents[eventType]) {
                    delegatedEvents[eventType] = {
                        selectors: [],
                        contexts : [],
                        listeners: []
                    };

                    // add delegate listener functions
                    for (i = 0; i < documents.length; i++) {
                        events.add(documents[i], eventType, delegateListener);
                        events.add(documents[i], eventType, delegateUseCapture, true);
                    }
                }

                var delegated = delegatedEvents[eventType],
                    index;

                for (index = delegated.selectors.length - 1; index >= 0; index--) {
                    if (delegated.selectors[index] === this.selector
                        && delegated.contexts[index] === this._context) {
                        break;
                    }
                }

                if (index === -1) {
                    index = delegated.selectors.length;

                    delegated.selectors.push(this.selector);
                    delegated.contexts .push(this._context);
                    delegated.listeners.push([]);
                }

                // keep listener and useCapture flag
                delegated.listeners[index].push([listener, useCapture]);
            }
            else {
                events.add(this._element, eventType, listener, useCapture);
            }

            return this;
        },

        /*\
         * Interactable.off
         [ method ]
         *
         * Removes an InteractEvent or DOM event listener
         *
         - eventType  (string | array | object) The types of events that were listened for
         - listener   (function) The listener function to be removed
         - useCapture (boolean) #optional useCapture flag for removeEventListener
         = (object) This Interactable
        \*/
        off: function (eventType, listener, useCapture) {
            var i;

            if (isString(eventType) && eventType.search(' ') !== -1) {
                eventType = eventType.trim().split(/ +/);
            }

            if (isArray(eventType)) {
                for (i = 0; i < eventType.length; i++) {
                    this.off(eventType[i], listener, useCapture);
                }

                return this;
            }

            if (isObject(eventType)) {
                for (var prop in eventType) {
                    this.off(prop, eventType[prop], listener);
                }

                return this;
            }

            var eventList,
                index = -1;

            // convert to boolean
            useCapture = useCapture? true: false;

            if (eventType === 'wheel') {
                eventType = wheelEvent;
            }

            // if it is an action event type
            if (contains(eventTypes, eventType)) {
                eventList = this._iEvents[eventType];

                if (eventList && (index = indexOf(eventList, listener)) !== -1) {
                    this._iEvents[eventType].splice(index, 1);
                }
            }
            // delegated event
            else if (this.selector) {
                var delegated = delegatedEvents[eventType],
                    matchFound = false;

                if (!delegated) { return this; }

                // count from last index of delegated to 0
                for (index = delegated.selectors.length - 1; index >= 0; index--) {
                    // look for matching selector and context Node
                    if (delegated.selectors[index] === this.selector
                        && delegated.contexts[index] === this._context) {

                        var listeners = delegated.listeners[index];

                        // each item of the listeners array is an array: [function, useCaptureFlag]
                        for (i = listeners.length - 1; i >= 0; i--) {
                            var fn = listeners[i][0],
                                useCap = listeners[i][1];

                            // check if the listener functions and useCapture flags match
                            if (fn === listener && useCap === useCapture) {
                                // remove the listener from the array of listeners
                                listeners.splice(i, 1);

                                // if all listeners for this interactable have been removed
                                // remove the interactable from the delegated arrays
                                if (!listeners.length) {
                                    delegated.selectors.splice(index, 1);
                                    delegated.contexts .splice(index, 1);
                                    delegated.listeners.splice(index, 1);

                                    // remove delegate function from context
                                    events.remove(this._context, eventType, delegateListener);
                                    events.remove(this._context, eventType, delegateUseCapture, true);

                                    // remove the arrays if they are empty
                                    if (!delegated.selectors.length) {
                                        delegatedEvents[eventType] = null;
                                    }
                                }

                                // only remove one listener
                                matchFound = true;
                                break;
                            }
                        }

                        if (matchFound) { break; }
                    }
                }
            }
            // remove listener from this Interatable's element
            else {
                events.remove(this._element, eventType, listener, useCapture);
            }

            return this;
        },

        /*\
         * Interactable.set
         [ method ]
         *
         * Reset the options of this Interactable
         - options (object) The new settings to apply
         = (object) This Interactable
        \*/
        set: function (options) {
            if (!isObject(options)) {
                options = {};
            }

            this.options = extend({}, defaultOptions.base);

            var i,
                actions = ['drag', 'drop', 'resize', 'gesture'],
                methods = ['draggable', 'dropzone', 'resizable', 'gesturable'],
                perActions = extend(extend({}, defaultOptions.perAction), options[action] || {});

            for (i = 0; i < actions.length; i++) {
                var action = actions[i];

                this.options[action] = extend({}, defaultOptions[action]);

                this.setPerAction(action, perActions);

                this[methods[i]](options[action]);
            }

            var settings = [
                    'accept', 'actionChecker', 'allowFrom', 'deltaSource',
                    'dropChecker', 'ignoreFrom', 'origin', 'preventDefault',
                    'rectChecker', 'styleCursor'
                ];

            for (i = 0, len = settings.length; i < len; i++) {
                var setting = settings[i];

                this.options[setting] = defaultOptions.base[setting];

                if (setting in options) {
                    this[setting](options[setting]);
                }
            }

            return this;
        },

        /*\
         * Interactable.unset
         [ method ]
         *
         * Remove this interactable from the list of interactables and remove
         * it's drag, drop, resize and gesture capabilities
         *
         = (object) @interact
        \*/
        unset: function () {
            events.remove(this._element, 'all');

            if (!isString(this.selector)) {
                events.remove(this, 'all');
                if (this.options.styleCursor) {
                    this._element.style.cursor = '';
                }
            }
            else {
                // remove delegated events
                for (var type in delegatedEvents) {
                    var delegated = delegatedEvents[type];

                    for (var i = 0; i < delegated.selectors.length; i++) {
                        if (delegated.selectors[i] === this.selector
                            && delegated.contexts[i] === this._context) {

                            delegated.selectors.splice(i, 1);
                            delegated.contexts .splice(i, 1);
                            delegated.listeners.splice(i, 1);

                            // remove the arrays if they are empty
                            if (!delegated.selectors.length) {
                                delegatedEvents[type] = null;
                            }
                        }

                        events.remove(this._context, type, delegateListener);
                        events.remove(this._context, type, delegateUseCapture, true);

                        break;
                    }
                }
            }

            this.dropzone(false);

            interactables.splice(indexOf(interactables, this), 1);

            return interact;
        }
    };

    function warnOnce (method, message) {
        var warned = false;

        return function () {
            if (!warned) {
                window.console.warn(message);
                warned = true;
            }

            return method.apply(this, arguments);
        };
    }

    Interactable.prototype.snap = warnOnce(Interactable.prototype.snap,
         'Interactable#snap is deprecated. See the new documentation for snapping at http://interactjs.io/docs/snapping');
    Interactable.prototype.restrict = warnOnce(Interactable.prototype.restrict,
         'Interactable#restrict is deprecated. See the new documentation for resticting at http://interactjs.io/docs/restriction');
    Interactable.prototype.inertia = warnOnce(Interactable.prototype.inertia,
         'Interactable#inertia is deprecated. See the new documentation for inertia at http://interactjs.io/docs/inertia');
    Interactable.prototype.autoScroll = warnOnce(Interactable.prototype.autoScroll,
         'Interactable#autoScroll is deprecated. See the new documentation for autoScroll at http://interactjs.io/docs/#autoscroll');
    Interactable.prototype.squareResize = warnOnce(Interactable.prototype.squareResize,
         'Interactable#squareResize is deprecated. See http://interactjs.io/docs/#resize-square');

    Interactable.prototype.accept = warnOnce(Interactable.prototype.accept,
         'Interactable#accept is deprecated. use Interactable#dropzone({ accept: target }) instead');
    Interactable.prototype.dropChecker = warnOnce(Interactable.prototype.dropChecker,
         'Interactable#dropChecker is deprecated. use Interactable#dropzone({ dropChecker: checkerFunction }) instead');
    Interactable.prototype.context = warnOnce(Interactable.prototype.context,
         'Interactable#context as a method is deprecated. It will soon be a DOM Node instead');

    /*\
     * interact.isSet
     [ method ]
     *
     * Check if an element has been set
     - element (Element) The Element being searched for
     = (boolean) Indicates if the element or CSS selector was previously passed to interact
    \*/
    interact.isSet = function(element, options) {
        return interactables.indexOfElement(element, options && options.context) !== -1;
    };

    /*\
     * interact.on
     [ method ]
     *
     * Adds a global listener for an InteractEvent or adds a DOM event to
     * `document`
     *
     - type       (string | array | object) The types of events to listen for
     - listener   (function) The function to be called on the given event(s)
     - useCapture (boolean) #optional useCapture flag for addEventListener
     = (object) interact
    \*/
    interact.on = function (type, listener, useCapture) {
        if (isString(type) && type.search(' ') !== -1) {
            type = type.trim().split(/ +/);
        }

        if (isArray(type)) {
            for (var i = 0; i < type.length; i++) {
                interact.on(type[i], listener, useCapture);
            }

            return interact;
        }

        if (isObject(type)) {
            for (var prop in type) {
                interact.on(prop, type[prop], listener);
            }

            return interact;
        }

        // if it is an InteractEvent type, add listener to globalEvents
        if (contains(eventTypes, type)) {
            // if this type of event was never bound
            if (!globalEvents[type]) {
                globalEvents[type] = [listener];
            }
            else {
                globalEvents[type].push(listener);
            }
        }
        // If non InteractEvent type, addEventListener to document
        else {
            events.add(document, type, listener, useCapture);
        }

        return interact;
    };

    /*\
     * interact.off
     [ method ]
     *
     * Removes a global InteractEvent listener or DOM event from `document`
     *
     - type       (string | array | object) The types of events that were listened for
     - listener   (function) The listener function to be removed
     - useCapture (boolean) #optional useCapture flag for removeEventListener
     = (object) interact
     \*/
    interact.off = function (type, listener, useCapture) {
        if (isString(type) && type.search(' ') !== -1) {
            type = type.trim().split(/ +/);
        }

        if (isArray(type)) {
            for (var i = 0; i < type.length; i++) {
                interact.off(type[i], listener, useCapture);
            }

            return interact;
        }

        if (isObject(type)) {
            for (var prop in type) {
                interact.off(prop, type[prop], listener);
            }

            return interact;
        }

        if (!contains(eventTypes, type)) {
            events.remove(document, type, listener, useCapture);
        }
        else {
            var index;

            if (type in globalEvents
                && (index = indexOf(globalEvents[type], listener)) !== -1) {
                globalEvents[type].splice(index, 1);
            }
        }

        return interact;
    };

    /*\
     * interact.enableDragging
     [ method ]
     *
     * Deprecated.
     *
     * Returns or sets whether dragging is enabled for any Interactables
     *
     - newValue (boolean) #optional `true` to allow the action; `false` to disable action for all Interactables
     = (boolean | object) The current setting or interact
    \*/
    interact.enableDragging = warnOnce(function (newValue) {
        if (newValue !== null && newValue !== undefined) {
            actionIsEnabled.drag = newValue;

            return interact;
        }
        return actionIsEnabled.drag;
    }, 'interact.enableDragging is deprecated and will soon be removed.');

    /*\
     * interact.enableResizing
     [ method ]
     *
     * Deprecated.
     *
     * Returns or sets whether resizing is enabled for any Interactables
     *
     - newValue (boolean) #optional `true` to allow the action; `false` to disable action for all Interactables
     = (boolean | object) The current setting or interact
    \*/
    interact.enableResizing = warnOnce(function (newValue) {
        if (newValue !== null && newValue !== undefined) {
            actionIsEnabled.resize = newValue;

            return interact;
        }
        return actionIsEnabled.resize;
    }, 'interact.enableResizing is deprecated and will soon be removed.');

    /*\
     * interact.enableGesturing
     [ method ]
     *
     * Deprecated.
     *
     * Returns or sets whether gesturing is enabled for any Interactables
     *
     - newValue (boolean) #optional `true` to allow the action; `false` to disable action for all Interactables
     = (boolean | object) The current setting or interact
    \*/
    interact.enableGesturing = warnOnce(function (newValue) {
        if (newValue !== null && newValue !== undefined) {
            actionIsEnabled.gesture = newValue;

            return interact;
        }
        return actionIsEnabled.gesture;
    }, 'interact.enableGesturing is deprecated and will soon be removed.');

    interact.eventTypes = eventTypes;

    /*\
     * interact.debug
     [ method ]
     *
     * Returns debugging data
     = (object) An object with properties that outline the current state and expose internal functions and variables
    \*/
    interact.debug = function () {
        var interaction = interactions[0] || new Interaction();

        return {
            interactions          : interactions,
            target                : interaction.target,
            dragging              : interaction.dragging,
            resizing              : interaction.resizing,
            gesturing             : interaction.gesturing,
            prepared              : interaction.prepared,
            matches               : interaction.matches,
            matchElements         : interaction.matchElements,

            prevCoords            : interaction.prevCoords,
            startCoords           : interaction.startCoords,

            pointerIds            : interaction.pointerIds,
            pointers              : interaction.pointers,
            addPointer            : listeners.addPointer,
            removePointer         : listeners.removePointer,
            recordPointer        : listeners.recordPointer,

            snap                  : interaction.snapStatus,
            restrict              : interaction.restrictStatus,
            inertia               : interaction.inertiaStatus,

            downTime              : interaction.downTimes[0],
            downEvent             : interaction.downEvent,
            downPointer           : interaction.downPointer,
            prevEvent             : interaction.prevEvent,

            Interactable          : Interactable,
            interactables         : interactables,
            pointerIsDown         : interaction.pointerIsDown,
            defaultOptions        : defaultOptions,
            defaultActionChecker  : defaultActionChecker,

            actionCursors         : actionCursors,
            dragMove              : listeners.dragMove,
            resizeMove            : listeners.resizeMove,
            gestureMove           : listeners.gestureMove,
            pointerUp             : listeners.pointerUp,
            pointerDown           : listeners.pointerDown,
            pointerMove           : listeners.pointerMove,
            pointerHover          : listeners.pointerHover,

            eventTypes            : eventTypes,

            events                : events,
            globalEvents          : globalEvents,
            delegatedEvents       : delegatedEvents,

            prefixedPropREs       : prefixedPropREs
        };
    };

    // expose the functions used to calculate multi-touch properties
    interact.getPointerAverage = pointerAverage;
    interact.getTouchBBox     = touchBBox;
    interact.getTouchDistance = touchDistance;
    interact.getTouchAngle    = touchAngle;

    interact.getElementRect         = getElementRect;
    interact.getElementClientRect   = getElementClientRect;
    interact.matchesSelector        = matchesSelector;
    interact.closest                = closest;

    /*\
     * interact.margin
     [ method ]
     *
     * Deprecated. Use `interact(target).resizable({ margin: number });` instead.
     * Returns or sets the margin for autocheck resizing used in
     * @Interactable.getAction. That is the distance from the bottom and right
     * edges of an element clicking in which will start resizing
     *
     - newValue (number) #optional
     = (number | interact) The current margin value or interact
    \*/
    interact.margin = warnOnce(function (newvalue) {
        if (isNumber(newvalue)) {
            margin = newvalue;

            return interact;
        }
        return margin;
    },
    'interact.margin is deprecated. Use interact(target).resizable({ margin: number }); instead.') ;

    /*\
     * interact.supportsTouch
     [ method ]
     *
     = (boolean) Whether or not the browser supports touch input
    \*/
    interact.supportsTouch = function () {
        return supportsTouch;
    };

    /*\
     * interact.supportsPointerEvent
     [ method ]
     *
     = (boolean) Whether or not the browser supports PointerEvents
    \*/
    interact.supportsPointerEvent = function () {
        return supportsPointerEvent;
    };

    /*\
     * interact.stop
     [ method ]
     *
     * Cancels all interactions (end events are not fired)
     *
     - event (Event) An event on which to call preventDefault()
     = (object) interact
    \*/
    interact.stop = function (event) {
        for (var i = interactions.length - 1; i >= 0; i--) {
            interactions[i].stop(event);
        }

        return interact;
    };

    /*\
     * interact.dynamicDrop
     [ method ]
     *
     * Returns or sets whether the dimensions of dropzone elements are
     * calculated on every dragmove or only on dragstart for the default
     * dropChecker
     *
     - newValue (boolean) #optional True to check on each move. False to check only before start
     = (boolean | interact) The current setting or interact
    \*/
    interact.dynamicDrop = function (newValue) {
        if (isBool(newValue)) {
            //if (dragging && dynamicDrop !== newValue && !newValue) {
                //calcRects(dropzones);
            //}

            dynamicDrop = newValue;

            return interact;
        }
        return dynamicDrop;
    };

    /*\
     * interact.pointerMoveTolerance
     [ method ]
     * Returns or sets the distance the pointer must be moved before an action
     * sequence occurs. This also affects tolerance for tap events.
     *
     - newValue (number) #optional The movement from the start position must be greater than this value
     = (number | Interactable) The current setting or interact
    \*/
    interact.pointerMoveTolerance = function (newValue) {
        if (isNumber(newValue)) {
            pointerMoveTolerance = newValue;

            return this;
        }

        return pointerMoveTolerance;
    };

    /*\
     * interact.maxInteractions
     [ method ]
     **
     * Returns or sets the maximum number of concurrent interactions allowed.
     * By default only 1 interaction is allowed at a time (for backwards
     * compatibility). To allow multiple interactions on the same Interactables
     * and elements, you need to enable it in the draggable, resizable and
     * gesturable `'max'` and `'maxPerElement'` options.
     **
     - newValue (number) #optional Any number. newValue <= 0 means no interactions.
    \*/
    interact.maxInteractions = function (newValue) {
        if (isNumber(newValue)) {
            maxInteractions = newValue;

            return this;
        }

        return maxInteractions;
    };

    interact.createSnapGrid = function (grid) {
        return function (x, y) {
            var offsetX = 0,
                offsetY = 0;

            if (isObject(grid.offset)) {
                offsetX = grid.offset.x;
                offsetY = grid.offset.y;
            }

            var gridx = Math.round((x - offsetX) / grid.x),
                gridy = Math.round((y - offsetY) / grid.y),

                newX = gridx * grid.x + offsetX,
                newY = gridy * grid.y + offsetY;

            return {
                x: newX,
                y: newY,
                range: grid.range
            };
        };
    };

    function endAllInteractions (event) {
        for (var i = 0; i < interactions.length; i++) {
            interactions[i].pointerEnd(event, event);
        }
    }

    function listenToDocument (doc) {
        if (contains(documents, doc)) { return; }

        var win = doc.defaultView || doc.parentWindow;

        // add delegate event listener
        for (var eventType in delegatedEvents) {
            events.add(doc, eventType, delegateListener);
            events.add(doc, eventType, delegateUseCapture, true);
        }

        if (supportsPointerEvent) {
            if (PointerEvent === win.MSPointerEvent) {
                pEventTypes = {
                    up: 'MSPointerUp', down: 'MSPointerDown', over: 'mouseover',
                    out: 'mouseout', move: 'MSPointerMove', cancel: 'MSPointerCancel' };
            }
            else {
                pEventTypes = {
                    up: 'pointerup', down: 'pointerdown', over: 'pointerover',
                    out: 'pointerout', move: 'pointermove', cancel: 'pointercancel' };
            }

            events.add(doc, pEventTypes.down  , listeners.selectorDown );
            events.add(doc, pEventTypes.move  , listeners.pointerMove  );
            events.add(doc, pEventTypes.over  , listeners.pointerOver  );
            events.add(doc, pEventTypes.out   , listeners.pointerOut   );
            events.add(doc, pEventTypes.up    , listeners.pointerUp    );
            events.add(doc, pEventTypes.cancel, listeners.pointerCancel);

            // autoscroll
            events.add(doc, pEventTypes.move, listeners.autoScrollMove);
        }
        else {
            events.add(doc, 'mousedown', listeners.selectorDown);
            events.add(doc, 'mousemove', listeners.pointerMove );
            events.add(doc, 'mouseup'  , listeners.pointerUp   );
            events.add(doc, 'mouseover', listeners.pointerOver );
            events.add(doc, 'mouseout' , listeners.pointerOut  );

            events.add(doc, 'touchstart' , listeners.selectorDown );
            events.add(doc, 'touchmove'  , listeners.pointerMove  );
            events.add(doc, 'touchend'   , listeners.pointerUp    );
            events.add(doc, 'touchcancel', listeners.pointerCancel);

            // autoscroll
            events.add(doc, 'mousemove', listeners.autoScrollMove);
            events.add(doc, 'touchmove', listeners.autoScrollMove);
        }

        events.add(win, 'blur', endAllInteractions);

        try {
            if (win.frameElement) {
                var parentDoc = win.frameElement.ownerDocument,
                    parentWindow = parentDoc.defaultView;

                events.add(parentDoc   , 'mouseup'      , listeners.pointerEnd);
                events.add(parentDoc   , 'touchend'     , listeners.pointerEnd);
                events.add(parentDoc   , 'touchcancel'  , listeners.pointerEnd);
                events.add(parentDoc   , 'pointerup'    , listeners.pointerEnd);
                events.add(parentDoc   , 'MSPointerUp'  , listeners.pointerEnd);
                events.add(parentWindow, 'blur'         , endAllInteractions );
            }
        }
        catch (error) {
            interact.windowParentError = error;
        }

        // prevent native HTML5 drag on interact.js target elements
        events.add(doc, 'dragstart', function (event) {
            for (var i = 0; i < interactions.length; i++) {
                var interaction = interactions[i];

                if (interaction.element
                    && (interaction.element === event.target
                        || nodeContains(interaction.element, event.target))) {

                    interaction.checkAndPreventDefault(event, interaction.target, interaction.element);
                    return;
                }
            }
        });

        if (events.useAttachEvent) {
            // For IE's lack of Event#preventDefault
            events.add(doc, 'selectstart', function (event) {
                var interaction = interactions[0];

                if (interaction.currentAction()) {
                    interaction.checkAndPreventDefault(event);
                }
            });

            // For IE's bad dblclick event sequence
            events.add(doc, 'dblclick', doOnInteractions('ie8Dblclick'));
        }

        documents.push(doc);
    }

    listenToDocument(document);

    function indexOf (array, target) {
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i] === target) {
                return i;
            }
        }

        return -1;
    }

    function contains (array, target) {
        return indexOf(array, target) !== -1;
    }

    function matchesSelector (element, selector, nodeList) {
        if (ie8MatchesSelector) {
            return ie8MatchesSelector(element, selector, nodeList);
        }

        // remove /deep/ from selectors if shadowDOM polyfill is used
        if (window !== realWindow) {
            selector = selector.replace(/\/deep\//g, ' ');
        }

        return element[prefixedMatchesSelector](selector);
    }

    function matchesUpTo (element, selector, limit) {
        while (isElement(element)) {
            if (matchesSelector(element, selector)) {
                return true;
            }

            element = parentElement(element);

            if (element === limit) {
                return matchesSelector(element, selector);
            }
        }

        return false;
    }

    // For IE8's lack of an Element#matchesSelector
    // taken from http://tanalin.com/en/blog/2012/12/matches-selector-ie8/ and modified
    if (!(prefixedMatchesSelector in Element.prototype) || !isFunction(Element.prototype[prefixedMatchesSelector])) {
        ie8MatchesSelector = function (element, selector, elems) {
            elems = elems || element.parentNode.querySelectorAll(selector);

            for (var i = 0, len = elems.length; i < len; i++) {
                if (elems[i] === element) {
                    return true;
                }
            }

            return false;
        };
    }

    // requestAnimationFrame polyfill
    (function() {
        var lastTime = 0,
            vendors = ['ms', 'moz', 'webkit', 'o'];

        for(var x = 0; x < vendors.length && !realWindow.requestAnimationFrame; ++x) {
            reqFrame = realWindow[vendors[x]+'RequestAnimationFrame'];
            cancelFrame = realWindow[vendors[x]+'CancelAnimationFrame'] || realWindow[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!reqFrame) {
            reqFrame = function(callback) {
                var currTime = new Date().getTime(),
                    timeToCall = Math.max(0, 16 - (currTime - lastTime)),
                    id = setTimeout(function() { callback(currTime + timeToCall); },
                  timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }

        if (!cancelFrame) {
            cancelFrame = function(id) {
                clearTimeout(id);
            };
        }
    }());

    /* global exports: true, module, define */

    // http://documentcloud.github.io/underscore/docs/underscore.html#section-11
    if (true) {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = interact;
        }
        exports.interact = interact;
    }
    // AMD
    else if (typeof define === 'function' && define.amd) {
        define('interact', function() {
            return interact;
        });
    }
    else {
        realWindow.interact = interact;
    }

} (typeof window === 'undefined'? undefined : window));


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dropzone_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lithium_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__experiment_js__ = __webpack_require__(3);




var state = {
    visible: false,
    showResult: false
}

function setState(newState) {
    Object.assign(state, newState);
    if(state.visible)
        document.getElementById("answer_container").classList.remove('noshow');
    else {
        document.getElementById("answer_container").classList.add('noshow');
        document.getElementById("answer_text").value = "";
    }
    if(state.showResult)
        document.getElementById("answer_container").classList.add("result");
    else
        document.getElementById("answer_container").classList.remove("result");
}


function checkAnswer() {
    var answer = document.getElementById("answer_text").value;
    if (answer === "") return;
    setState({showResult: true});
    var answerResult = document.getElementById("answer_result");
    var names = __WEBPACK_IMPORTED_MODULE_0__dropzone_js__["a" /* default */].state.currentChemical.state.names;
    for(var i = 0; i < names.length; i++) {
        if(answer.toLowerCase() == names[i].toLowerCase()) {
            answerResult.src = "./images/other/greentick.gif";
            __WEBPACK_IMPORTED_MODULE_0__dropzone_js__["a" /* default */].state.currentChemical.setState({hasGuessed: true});
            __WEBPACK_IMPORTED_MODULE_2__experiment_js__["a" /* default */].update();
            return;
        }
    }
    answerResult.src = "./images/other/redcross.png";
}

/* harmony default export */ __webpack_exports__["a"] = ({ state, setState, checkAnswer });


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var state = {
    names: ['barium', 'ba'],
    flameColour: "Green",
    hintType: 1,
    hintUsed: false,
    hasGuessed: false,
}

function setState(newState) {
    Object.assign(state, newState);
    if(state.hasGuessed)
        document.getElementById('barium').getElementsByTagName('img')[0].src = "./images/chemicals/barium/bariumcomplete.png";
}

/* harmony default export */ __webpack_exports__["a"] = ({ state, setState });


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var state = {
    names: ['calcium', 'ca'],
    flameColour: "Red",
    hintType: 1,
    hintUsed: false,
    hasGuessed: false,
}

function setState(newState) {
    Object.assign(state, newState);
    if(state.hasGuessed)
        document.getElementById('calcium').getElementsByTagName('img')[0].src = "./images/chemicals/calcium/calciumcomplete.png";
}

/* harmony default export */ __webpack_exports__["a"] = ({ state, setState });


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var state = {
    names: ['potassium', 'k'],
    flameColour: "Lilac",
    hintType: 0,
    hintUsed: false,
    hasGuessed: false,
}

function setState(newState) {
    Object.assign(state, newState);
    if(state.hasGuessed)
        document.getElementById('potassium').getElementsByTagName('img')[0].src = "./images/chemicals/potassium/potassiumcomplete.png";
}

/* harmony default export */ __webpack_exports__["a"] = ({ state, setState });


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var state = {
    names: ['sodium', 'na'],
    flameColour: "Yellow",
    hintType: 0,
    hintUsed: false,
    hasGuessed: false,
}

function setState(newState) {
    Object.assign(state, newState);
    if(state.hasGuessed)
        document.getElementById('sodium').getElementsByTagName('img')[0].src = "./images/chemicals/sodium/sodiumcomplete.png";
}

/* harmony default export */ __webpack_exports__["a"] = ({ state, setState });


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dropzone_js__ = __webpack_require__(0);


var state = {
    visible: false
};

function setState(newState) {
    Object.assign(state, newState);
    if(state.visible) {
        document.getElementById("flameColour_container").classList.remove("noshow");
        document.getElementById("flameColour").innerHTML = __WEBPACK_IMPORTED_MODULE_0__dropzone_js__["a" /* default */].state.currentChemical.state.flameColour + " Flame";  
    } else
        document.getElementById("flameColour_container").classList.add("noshow");
}

/* harmony default export */ __webpack_exports__["a"] = ({ state, setState });


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTE0Y2EwYjIyNDhjMTQ5OTAwZWQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Ryb3B6b25lLmpzIiwid2VicGFjazovLy8uL3NyYy9oaW50LmpzIiwid2VicGFjazovLy8uL3NyYy9saXRoaXVtLmpzIiwid2VicGFjazovLy8uL3NyYy9leHBlcmltZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9jaGVtaWNhbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ludGVyYWN0anMvaW50ZXJhY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fuc3dlcmJveC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFyaXVtLmpzIiwid2VicGFjazovLy8uL3NyYy9jYWxjaXVtLmpzIiwid2VicGFjazovLy8uL3NyYy9wb3Rhc3NpdW0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NvZGl1bS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmxhbWVjb2xvdXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwREFBZ0I7Ozs7Ozs7OztBQ1ZoQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYyxzQ0FBc0M7QUFDcEQ7QUFDQTtBQUNBLGtCQUFrQiw2QkFBNkI7QUFDL0Msc0dBQWlELGVBQWU7QUFDaEU7QUFDQTs7QUFFQSwwREFBZ0I7Ozs7Ozs7O0FDekJoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBEQUFnQjs7Ozs7Ozs7Ozs7QUNkaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpRkFBNEIsY0FBYztBQUMxQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHFGQUFnQztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxRQUFRO0FBQ2xELEtBQUs7QUFDTDtBQUNBO0FBQ0Esa0JBQWtCLGlIQUE0RDtBQUM5RTtBQUNBOztBQUVBLDBEQUFnQjs7Ozs7Ozs7Ozs7OztBQ2xFaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHNCQUFzQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMERBQWdCLDBCOzs7Ozs7OztBQ3JCaEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDZDQUE2QztBQUNuRSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiw2Q0FBNkM7QUFDbkUsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsNkNBQTZDO0FBQ25FLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBEQUFnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRGhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0ZBQTJCLHFJQUFnRjtBQUMzRztBQUNBLDRFQUF1Qiw2VkFBd1M7QUFDL1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIscUJBQXFCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUZBQThCLGNBQWM7QUFDNUM7QUFDQTtBQUNBLHFGQUFnQyxjQUFjO0FBQzlDLGdGQUEyQixnQkFBZ0I7QUFDM0M7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIscUJBQXFCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRkFBMkIsc0JBQXNCO0FBQ2pEO0FBQ0EsNEVBQXVCLHNDQUFzQztBQUM3RDtBQUNBLG1GQUE4QixlQUFlO0FBQzdDO0FBQ0EsaUZBQTRCLGtDQUFrQztBQUM5RDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEIsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0g7Ozs7OztBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsUUFBUTs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsK0NBQStDLGlDQUFpQyxFQUFFOztBQUVsRixrQkFBa0I7O0FBRWxCOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7O0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxhQUFhO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUJBQXlCOztBQUV6QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1DQUFtQyxTQUFTO0FBQzVDO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixtQ0FBbUMsU0FBUztBQUM1QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBLDRDQUE0QyxjQUFjOztBQUUxRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQix5RkFBeUY7QUFDeEgsZ0NBQWdDLHFEQUFxRDtBQUNyRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLCtDQUErQztBQUNoRixpQ0FBaUMsb0NBQW9DO0FBQ3JFLGlDQUFpQyxvQ0FBb0M7QUFDckUsaUNBQWlDLG9DQUFvQztBQUNyRSxpQ0FBaUMsb0NBQW9DOztBQUVyRTtBQUNBLCtCQUErQixjQUFjOztBQUU3QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLHFCQUFxQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esb0RBQW9ELGVBQWU7O0FBRW5FO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpREFBaUQsY0FBYzs7QUFFL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx5QkFBeUIsYUFBYTs7QUFFdEMsa0NBQWtDLGNBQWM7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCLGNBQWM7O0FBRTFDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0RBQWtELFNBQVM7QUFDM0Q7QUFDQTtBQUNBOztBQUVBLDBCQUEwQixVQUFVOztBQUVwQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0RBQXNELFVBQVU7O0FBRWhFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixxQkFBcUI7QUFDeEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0M7QUFDcEMsb0NBQW9DO0FBQ3BDLG9DQUFvQztBQUNwQyxvQ0FBb0M7QUFDcEMsb0NBQW9DO0FBQ3BDLG9DQUFvQzs7QUFFcEMsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtDQUFrQztBQUNsQyxrQ0FBa0M7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCOztBQUV4QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrREFBa0QsNEJBQTRCO0FBQzlFLG9EQUFvRCw4QkFBOEI7QUFDbEY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QixhQUFhO0FBQ3JDLHdCQUF3QixhQUFhO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGFBQWE7QUFDckMsd0JBQXdCLGFBQWE7QUFDckM7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLGFBQWE7QUFDckMsd0JBQXdCLGFBQWE7QUFDckM7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLHFDQUFxQztBQUM3RCx3QkFBd0IscUNBQXFDO0FBQzdEO0FBQ0E7O0FBRUEsZ0NBQWdDO0FBQ2hDOztBQUVBO0FBQ0E7O0FBRUEsOEJBQThCO0FBQzlCLDJCQUEyQjtBQUMzQjs7QUFFQSwrQkFBK0I7QUFDL0IsK0JBQStCO0FBQy9COztBQUVBO0FBQ0Esb0JBQW9CLGFBQWE7O0FBRWpDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDLHVDQUF1QyxFQUFFO0FBQ3RGLDZDQUE2Qyx1Q0FBdUMsRUFBRTtBQUN0Riw2Q0FBNkMsdUNBQXVDLEVBQUU7O0FBRXRGO0FBQ0Esb0RBQW9ELFFBQVE7O0FBRTVEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBLHFDQUFxQyxRQUFROztBQUU3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSw0REFBNEQ7QUFDNUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLDhCQUE4QixRQUFROztBQUV0QztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLDZCQUE2QixFQUFFLE9BQU8sd0NBQXdDO0FBQy9HLGlDQUFpQyw2QkFBNkIsRUFBRSxPQUFPLHdDQUF3Qzs7QUFFL0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsc0NBQXNDLG9CQUFvQjtBQUMxRCxzQkFBc0IsZ0NBQWdDO0FBQ3RELHVDQUF1QyxzQkFBc0I7QUFDN0Qsc0JBQXNCLGlDQUFpQztBQUN2RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBEOztBQUUxRDtBQUNBLCtCQUErQixnQ0FBZ0M7QUFDL0Q7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxxQkFBcUI7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLGVBQWU7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHNDQUFzQyxRQUFROztBQUU5QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHNDQUFzQyxRQUFROztBQUU5QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0ZBQWtGLFFBQVE7O0FBRTFGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxtQ0FBbUMsNENBQTRDO0FBQy9FLG1DQUFtQyw0Q0FBNEM7QUFDL0UsbUNBQW1DLDRDQUE0Qzs7QUFFL0U7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDOztBQUUvQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekMseUNBQXlDO0FBQ3pDLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUVBQXlFLGtDQUFrQztBQUMzRyx5RUFBeUUsa0NBQWtDO0FBQzNHO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlFQUF5RSxTQUFTO0FBQ2xGLHlFQUF5RSxTQUFTO0FBQ2xGOztBQUVBO0FBQ0EsbUNBQW1DLHNCQUFzQjtBQUN6RCxtQ0FBbUMsc0JBQXNCO0FBQ3pELG1DQUFtQyxzQkFBc0I7QUFDekQsbUNBQW1DLHNCQUFzQjs7QUFFekQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsb0VBQW9FLFFBQVE7O0FBRTVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMERBQTBELHNEQUFzRDtBQUNoSCwwREFBMEQsc0RBQXNEO0FBQ2hILDBEQUEwRCwrQ0FBK0M7QUFDekc7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLDRDQUE0QztBQUM1QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsdUNBQXVDLDRDQUE0QztBQUNuRix1Q0FBdUMsNENBQTRDO0FBQ25GLHVDQUF1Qyw0Q0FBNEM7QUFDbkY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHVCQUF1QiwwQkFBMEI7QUFDakQsNkRBQTZELFVBQVU7O0FBRXZFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDBEQUEwRCxTQUFTO0FBQ25FOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1Qix1Q0FBdUM7QUFDOUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDJCQUEyQix1Q0FBdUM7QUFDbEU7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkIsdUNBQXVDO0FBQ2xFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkIsMEJBQTBCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBLCtCQUErQixRQUFROztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBLCtCQUErQixRQUFROztBQUV2QztBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0EsaURBQWlELFNBQVM7QUFDMUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7O0FBRUEsZ0NBQWdDOztBQUVoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLGtDQUFrQyxvQ0FBb0M7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCLFNBQVM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtDQUFrQyxVQUFVOztBQUU1QztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZDQUE2QyxTQUFTO0FBQ3REOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLDhCQUE4QjtBQUM5QixzQ0FBc0M7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1DQUFtQyxlQUFlO0FBQ2xEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBLGdFQUFnRSxRQUFROztBQUV4RTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsU0FBUztBQUM1Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDJCQUEyQixpQ0FBaUM7QUFDNUQ7O0FBRUE7O0FBRUEsdUNBQXVDLFVBQVU7O0FBRWpEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQix5QkFBeUI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG1DQUFtQyxRQUFROztBQUUzQzs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSwwQkFBMEI7QUFDMUIsMEJBQTBCOztBQUUxQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtCQUErQixPQUFPO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsY0FBYzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRDQUE0QyxnQkFBZ0I7QUFDNUQsNENBQTRDLGdCQUFnQjtBQUM1RDtBQUNBO0FBQ0EsNkNBQTZDLGlCQUFpQjtBQUM5RCw2Q0FBNkMsaUJBQWlCO0FBQzlEOztBQUVBLG9DQUFvQyxrRUFBa0U7QUFDdEcsb0NBQW9DLGtFQUFrRTs7QUFFdEcsb0NBQW9DLGtFQUFrRTtBQUN0RyxvQ0FBb0Msa0VBQWtFO0FBQ3RHOztBQUVBO0FBQ0Esa0NBQWtDLGNBQWM7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7O0FBRUEsb0JBQW9CLGFBQWE7O0FBRWpDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxhQUFhOztBQUU3QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNEQUFzRCxTQUFTO0FBQy9EOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkJBQTJCLGdDQUFnQztBQUMzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxtQ0FBbUMsc0JBQXNCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUJBQXVCLGlCQUFpQjtBQUN4Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsaUJBQWlCO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCxpREFBaUQ7QUFDM0csMERBQTBELGlEQUFpRDtBQUMzRywwREFBMEQsaURBQWlEO0FBQzNHLDBEQUEwRCxpREFBaUQ7QUFDM0csMERBQTBELGlEQUFpRDtBQUMzRywwREFBMEQsaURBQWlEO0FBQzNHO0FBQ0E7QUFDQTs7QUFFQSx3REFBd0QsMkRBQTJEO0FBQ25ILHdEQUF3RCwyREFBMkQ7QUFDbkgsd0RBQXdELDJEQUEyRDtBQUNuSCx3REFBd0QsMkRBQTJEO0FBQ25IOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQywyQ0FBMkM7QUFDM0MsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnR0FBZ0c7O0FBRWhHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELHVCQUF1QjtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQywyQ0FBMkM7QUFDM0MsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0MsMkNBQTJDO0FBQzNDLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsNkJBQTZCO0FBQy9EO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGNBQWM7QUFDOUMsb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGFBQWE7QUFDakMsb0JBQW9CLGFBQWE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBLCtCQUErQixhQUFhOztBQUU1QztBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSwyQkFBMkIsb0JBQW9CO0FBQy9DOztBQUVBLDBEQUEwRCxVQUFVOztBQUVwRTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwRUFBMEU7QUFDMUUscUNBQXFDLHVCQUF1QjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHdCQUF3QjtBQUN4Qjs7QUFFQSx1QkFBdUIsdUJBQXVCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7O0FBR1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZEO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCLGFBQWE7O0FBRTVDO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsYUFBYTtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtGQUErRjtBQUMvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDJCQUEyQixvQkFBb0I7QUFDL0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7O0FBRXpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixtREFBbUQ7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBOztBQUVBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsb0RBQW9EO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTs7QUFFQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1EQUFtRCxnREFBZ0Q7QUFDbkc7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG1EQUFtRCxnREFBZ0Q7QUFDbkc7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQixzQkFBc0I7QUFDakQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtCQUErQixzQkFBc0I7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw0REFBNEQsWUFBWTtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkIsc0JBQXNCO0FBQ2pEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLGFBQWE7O0FBRTlDO0FBQ0EsNERBQTRELFlBQVk7QUFDeEU7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Esc0RBQXNELFFBQVE7QUFDOUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5Q0FBeUMsT0FBTztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9DQUFvQzs7QUFFcEM7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLGtEQUFrRDs7QUFFL0YsdUJBQXVCLG9CQUFvQjtBQUMzQzs7QUFFQSxnREFBZ0Q7O0FBRWhEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4Q0FBOEMsU0FBUztBQUN2RDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQ0FBbUMsZ0NBQWdDO0FBQ25FO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdFQUF3RSxpQkFBaUI7QUFDekY7QUFDQSw2RUFBNkUsK0JBQStCO0FBQzVHO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQixpQkFBaUI7QUFDNUM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQixpQkFBaUI7QUFDNUM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsaUJBQWlCLEVBQUU7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLG9FQUFvRSxpQkFBaUIsRUFBRTs7QUFFdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxRQUFRO0FBQ3JEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLHlCQUF5QjtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUMsUUFBUTs7QUFFL0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkJBQTJCLHlCQUF5QjtBQUNwRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSwyQ0FBMkMsU0FBUztBQUNwRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtDQUErQyxTQUFTO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0IseURBQXlEO0FBQy9FO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxpQ0FBaUMsRUFBRTtBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7QUN6MUxEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxpQkFBaUI7QUFDL0I7QUFDQTtBQUNBLGtCQUFrQixrQkFBa0I7QUFDcEM7QUFDQTtBQUNBLDBHQUFxRCxpQkFBaUI7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBEQUFnQjs7Ozs7Ozs7QUN6Q2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMERBQWdCOzs7Ozs7OztBQ2RoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBEQUFnQjs7Ozs7Ozs7QUNkaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwREFBZ0I7Ozs7Ozs7O0FDZGhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMERBQWdCOzs7Ozs7Ozs7QUNkaEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEs7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSwwREFBZ0IiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA5MTRjYTBiMjI0OGMxNDk5MDBlZCIsInZhciBzdGF0ZSA9IHtcclxuICAgIGN1cnJlbnRDaGVtaWNhbDogbnVsbCxcclxuICAgIHByZXZpb3VzQ2hlbWljYWw6IG51bGxcclxufTtcclxuXHJcbmZ1bmN0aW9uIHNldFN0YXRlKG5ld1N0YXRlKSB7XHJcbiAgICBzdGF0ZS5wcmV2aW91c0NoZW1pY2FsID0gc3RhdGUuY3VycmVudENoZW1pY2FsO1xyXG4gICAgT2JqZWN0LmFzc2lnbihzdGF0ZSwgbmV3U3RhdGUpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IHN0YXRlLCBzZXRTdGF0ZSB9O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9kcm9wem9uZS5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgZHJvcHpvbmUgZnJvbSAnLi9kcm9wem9uZS5qcyc7XHJcblxyXG52YXIgc3RhdGUgPSB7XHJcbiAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgIGNvbnRlbnRWaXNpYmxlOiBmYWxzZSxcclxuICAgIHRpbWVzVXNlZDogMCxcclxuICAgIGhpbnRNZXNzYWdlOiBcIlwiXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFN0YXRlKG5ld1N0YXRlKSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHN0YXRlLCBuZXdTdGF0ZSk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpbnRfdGl0bGVidG5cIikuZGlzYWJsZWQgPSBzdGF0ZS5kaXNhYmxlZDtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGludF9jb250ZW50XCIpLnN0eWxlLnZpc2liaWxpdHkgPSBzdGF0ZS5jb250ZW50VmlzaWJsZSA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIjtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGludF9jb250ZW50cFwiKS5pbm5lckhUTUwgPSBzdGF0ZS5oaW50TWVzc2FnZTtcclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlSGludCgpIHtcclxuICAgIHNldFN0YXRlKHtjb250ZW50VmlzaWJsZTogIXN0YXRlLmNvbnRlbnRWaXNpYmxlfSk7XHJcbiAgICBpZihzdGF0ZS5jb250ZW50VmlzaWJsZSAmJiAhZHJvcHpvbmUuc3RhdGUuY3VycmVudENoZW1pY2FsLmhpbnRVc2VkKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJoaW50IHVzZWQ6IFwiICsgZHJvcHpvbmUuc3RhdGUuY3VycmVudENoZW1pY2FsLmhpbnRVc2VkKTtcclxuICAgICAgICBzZXRTdGF0ZSh7dGltZXNVc2VkOiBzdGF0ZS50aW1lc1VzZWQrMX0pO1xyXG4gICAgICAgIGRyb3B6b25lLnN0YXRlLmN1cnJlbnRDaGVtaWNhbC5zZXRTdGF0ZSh7aGludFVzZWQ6IHRydWV9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBzdGF0ZSwgc2V0U3RhdGUsIHRvZ2dsZUhpbnQgfTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaGludC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgc3RhdGUgPSB7XHJcbiAgICBuYW1lczogWydsaXRoaXVtJywgJ2xpJ10sXHJcbiAgICBmbGFtZUNvbG91cjogXCJDcmltc29uXCIsXHJcbiAgICBoaW50VHlwZTogMCxcclxuICAgIGhpbnRVc2VkOiBmYWxzZSxcclxuICAgIGhhc0d1ZXNzZWQ6IGZhbHNlLFxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRTdGF0ZShuZXdTdGF0ZSkge1xyXG4gICAgT2JqZWN0LmFzc2lnbihzdGF0ZSwgbmV3U3RhdGUpO1xyXG4gICAgaWYoc3RhdGUuaGFzR3Vlc3NlZClcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGl0aGl1bScpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKVswXS5zcmMgPSBcIi4vaW1hZ2VzL2NoZW1pY2Fscy9saXRoaXVtL2xpdGhpdW1jb21wbGV0ZS5wbmdcIjtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBzdGF0ZSwgc2V0U3RhdGUgfTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbGl0aGl1bS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgY2hlbWljYWxzIGZyb20gJy4vY2hlbWljYWxzLmpzJztcclxuaW1wb3J0IHF1ZXN0aW9ucyBmcm9tICcuL3F1ZXN0aW9ucy5qcyc7XHJcbmltcG9ydCBoaW50IGZyb20gJy4vaGludC5qcyc7XHJcblxyXG52YXIgc3RhdGUgPSB7XHJcbiAgICBzdGVwOiAxLFxyXG4gICAgY29tcGxldGU6IGZhbHNlLFxyXG4gICAgbWFya3M6IDEwXHJcbn07XHJcblxyXG5mdW5jdGlvbiBzZXRTdGF0ZShuZXdTdGF0ZSkge1xyXG4gICAgT2JqZWN0LmFzc2lnbihzdGF0ZSwgbmV3U3RhdGUpO1xyXG4gICAgXHJcbiAgICAvL0FkZCB0aGUgZ3JlZW4gY29tcGxldGUgbWFzayBhbmQgZ3JlZW4gdGljayB0byB0aGUgcHJldmlvdXMgc3RlcCwgYW5kIGhpZ2hsaWdodCB0aGUgY3VycmVudCBvbmUuXHJcbiAgICBpZiAoc3RhdGUuc3RlcCA8PSAyKSB7XHJcbiAgICAgICAgZG9jdW1lbnRcclxuICAgICAgICAuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAnICsgKHN0YXRlLnN0ZXAgLSAxKSlcclxuICAgICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzNdXHJcbiAgICAgICAgLmNsYXNzTGlzdC5hZGQoJ3N0ZXBDb21wbGV0ZScpO1xyXG4gICAgICAgIGRvY3VtZW50XHJcbiAgICAgICAgLmdldEVsZW1lbnRCeUlkKCdzdGVwJyArIChzdGF0ZS5zdGVwIC0gMSkpXHJcbiAgICAgICAgLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVsyXVxyXG4gICAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF0uc3JjID1cclxuICAgICAgICAnLi9pbWFnZXMvb3RoZXIvZ3JlZW50aWNrLmdpZic7XHJcbiAgICAgICAgZG9jdW1lbnRcclxuICAgICAgICAuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAnICsgc3RhdGUuc3RlcClcclxuICAgICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzNdXHJcbiAgICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoJ25vaGlnaGxpZ2h0Jyk7XHJcbiAgICB9XHJcbiAgICAvL0FkZCB0aGUgZ3JlZW4gY29tcGxldGUgbWFzayBhbmQgZ3JlZW4gdGljayB0byB0aGUgY3VycmVudCBzdGVwLlxyXG4gICAgLy9UaGlzIGlzIGFzIGEgc2VwYXJhdGUgaWYgc3RhdGVtZW50LCBhcyBvbmx5IHVzaW5nIHRoZSBvbmUgYWJvdmUgd2lsbCBub3QgY29ycmVjdGx5IGFkZCBtYXNrcyBldGMuIGZvciB0aGUgbGFzdCBzdGVwLlxyXG4gICAgaWYgKHN0YXRlLmNvbXBsZXRlKSB7XHJcbiAgICAgICAgZG9jdW1lbnRcclxuICAgICAgICAuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAnICsgc3RhdGUuc3RlcClcclxuICAgICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzNdXHJcbiAgICAgICAgLmNsYXNzTGlzdC5hZGQoJ3N0ZXBDb21wbGV0ZScpO1xyXG4gICAgICAgIGRvY3VtZW50XHJcbiAgICAgICAgLmdldEVsZW1lbnRCeUlkKCdzdGVwJyArIHN0YXRlLnN0ZXApXHJcbiAgICAgICAgLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVsyXVxyXG4gICAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF0uc3JjID1cclxuICAgICAgICAnLi9pbWFnZXMvb3RoZXIvZ3JlZW50aWNrLmdpZic7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vU2V0IHRoZSBxdWVzdGlvbnMgdG8gYmUgdmlzaWJsZS5cclxuICAgIGlmKHN0YXRlLnN0ZXAgPT0gMikge1xyXG4gICAgICAgIHF1ZXN0aW9ucy5zZXRTdGF0ZSh7dmlzaWJsZTogdHJ1ZX0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGUoKSB7XHJcbiAgICBpZihzdGF0ZS5zdGVwID09IDEpIHtcclxuICAgICAgICB2YXIgY29tcGxldGVBbW91bnQgPSAwO1xyXG4gICAgICAgIC8vTG9vcCB0aHJvdWdoIGFsbCB0aGUgY2hlbWljYWxzLCBhbmQgaWYgZWFjaCBvbmUgaGFzIGJlZW4gZ3Vlc3NlZCAoc3RhdGUuaGFzR3Vlc3NlZCksIHdlIGdvIHRvIHRoZSBuZXh0IHN0ZXAuXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGNoZW1pY2Fscy5jaGVtaWNhbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNoZW1pY2FsID0gY2hlbWljYWxzLmNoZW1pY2Fsc1tpXTtcclxuICAgICAgICAgICAgaWYoY2hlbWljYWwuc3RhdGUuaGFzR3Vlc3NlZCkgY29tcGxldGVBbW91bnQrKztcclxuICAgICAgICAgICAgZWxzZSAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGNvbXBsZXRlQW1vdW50ID09IDUpIHNldFN0YXRlKHtzdGVwOiAyfSk7XHJcbiAgICB9IGVsc2UgaWYoc3RhdGUuc3RlcCA9PSAyICYmIHF1ZXN0aW9ucy5zdGF0ZS5xdWVzdGlvbnNDb21wbGV0ZSA9PSAzKSB7XHJcbiAgICAgICAgLy9Db21wbGV0ZSB0aGUgZXhwZXJpbWVudCwgYW5kIGRlZHVjdCBtYXJrcyBmb3IgaGludCB1c2UgKC0xIG1hcmsgZm9yIGVhY2ggaGludCkuXHJcbiAgICAgICAgLy9IaW50IHVzZSBpcyB3b3JrZWQgb3V0IGJ5IGVhY2ggdGltZSB0aGUgaGludCBpcyBvcGVuZWQuXHJcbiAgICAgICAgc2V0U3RhdGUoe2NvbXBsZXRlOiB0cnVlLCBtYXJrczogKHN0YXRlLm1hcmtzIC0gaGludC5zdGF0ZS50aW1lc1VzZWQpfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgc3RhdGUsIHNldFN0YXRlLCB1cGRhdGUgfTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZXhwZXJpbWVudC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgYmFyaXVtIGZyb20gJy4vYmFyaXVtLmpzJztcclxuaW1wb3J0IGNhbGNpdW0gZnJvbSAnLi9jYWxjaXVtLmpzJztcclxuaW1wb3J0IGxpdGhpdW0gZnJvbSAnLi9saXRoaXVtLmpzJztcclxuaW1wb3J0IHBvdGFzc2l1bSBmcm9tICcuL3BvdGFzc2l1bS5qcyc7XHJcbmltcG9ydCBzb2RpdW0gZnJvbSAnLi9zb2RpdW0uanMnO1xyXG5cclxuLy9MaXN0IG9mIGNoZW1pY2FscyBpbiB0aGUgZXhwZXJpbWVuXHJcbnZhciBjaGVtaWNhbHMgPSBbYmFyaXVtLCBjYWxjaXVtLCBsaXRoaXVtLCBwb3Rhc3NpdW0sIHNvZGl1bV07XHJcblxyXG4vL0EgZnVuY3Rpb24gdXNlZCB0byBmaW5kIHRoZSBjdXJyZW50IGNoZW1pY2FsIGJhc2VkIG9uIGl0J3MgaWQgYnkgbG9vcGluZyB0aHJvdWdoIHRoZSBjaGVtaWNhbHMgYXJyYXkuXHJcbi8vVGhpcyB3aWxsIGNvbXBhcmUgdGhlIGlkIGdpdmVuIHRvIHRoZSBjaGVtaWNhbCdzIG5hbWVzWzBdLCB3aGljaCBpcyBpdCdzIGZ1bGwgbmFtZS4gRS5nLiBsaXRoaXVtLlxyXG4vL0VhY2ggY2hlbWljYWwncyBpZCBpbiBIVE1MIGlzIGl0J3MgbmFtZS5cclxuZnVuY3Rpb24gZmluZENoZW1pY2FsKGlkKSB7XHJcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgY2hlbWljYWxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGNoZW1pY2FsID0gY2hlbWljYWxzW2ldO1xyXG4gICAgICAgIGlmKGNoZW1pY2FsLnN0YXRlLm5hbWVzWzBdID09IGlkKVxyXG4gICAgICAgICAgICByZXR1cm4gY2hlbWljYWw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge2NoZW1pY2FscywgZmluZENoZW1pY2FsfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jaGVtaWNhbHMuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGV4cGVyaW1lbnQgZnJvbSAnLi9leHBlcmltZW50LmpzJztcclxuXHJcbnZhciBzdGF0ZSA9IHtcclxuICAgIHZpc2libGU6IGZhbHNlLFxyXG4gICAgcXVlc3Rpb25zQ29tcGxldGU6IDBcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0U3RhdGUobmV3U3RhdGUpIHtcclxuICAgIE9iamVjdC5hc3NpZ24oc3RhdGUsIG5ld1N0YXRlKTtcclxuICAgIGlmKHN0YXRlLnZpc2libGUpXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJxdWVzdGlvbnNfY29udGFpbmVyXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJub3Nob3dcIik7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJxdWVzdGlvbnNfY29udGFpbmVyXCIpLmNsYXNzTGlzdC5hZGQoXCJub3Nob3dcIik7XHJcbn1cclxuXHJcbi8vRnVuY3Rpb24gdXNlZCB0byBjaGVjayB0aGUgcXVlc3Rpb24gYW5zd2Vycy5cclxuLy9NZXNzeSBjb2RlLCBob3dldmVyIGdldCdzIHRoZSBqb2IgZG9uZS5cclxuZnVuY3Rpb24gY2hlY2tRdWVzdGlvbkFuc3dlcihxdWVzdGlvbikge1xyXG4gICAgdmFyIGFuc3dlcjtcclxuICAgIGlmIChxdWVzdGlvbiA9PSAxKSB7XHJcbiAgICAgICAgYW5zd2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJxdWVzdGlvbm9uZV90ZXh0XCIpLnZhbHVlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgaWYgKGFuc3dlciA9PSBcImtcIiB8fCBhbnN3ZXIgPT0gXCJwb3Rhc3NpdW1cIikge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInF1ZXN0aW9ub25lX3Jlc3VsdFwiKS5zcmMgPVxyXG4gICAgICAgICAgICBcIi4vaW1hZ2VzL290aGVyL2dyZWVudGljay5naWZcIjtcclxuICAgICAgICAgICAgc2V0U3RhdGUoe3F1ZXN0aW9uc0NvbXBsZXRlOiBzdGF0ZS5xdWVzdGlvbnNDb21wbGV0ZSsxfSk7XHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicXVlc3Rpb25vbmVfcmVzdWx0XCIpLnNyYyA9XHJcbiAgICAgICAgICAgIFwiLi9pbWFnZXMvb3RoZXIvcmVkY3Jvc3MucG5nXCI7XHJcbiAgICB9IGVsc2UgaWYgKHF1ZXN0aW9uID09IDIpIHtcclxuICAgICAgICBhbnN3ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInF1ZXN0aW9udHdvX3RleHRcIikudmFsdWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBpZiAoYW5zd2VyID09IFwiY2FcIiB8fCBhbnN3ZXIgPT0gXCJjYWxjaXVtXCIpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJxdWVzdGlvbnR3b19yZXN1bHRcIikuc3JjID1cclxuICAgICAgICAgICAgXCIuL2ltYWdlcy9vdGhlci9ncmVlbnRpY2suZ2lmXCI7XHJcbiAgICAgICAgICAgIHNldFN0YXRlKHtxdWVzdGlvbnNDb21wbGV0ZTogc3RhdGUucXVlc3Rpb25zQ29tcGxldGUrMX0pO1xyXG4gICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInF1ZXN0aW9udHdvX3Jlc3VsdFwiKS5zcmMgPVxyXG4gICAgICAgICAgICBcIi4vaW1hZ2VzL290aGVyL3JlZGNyb3NzLnBuZ1wiO1xyXG4gICAgfSBlbHNlIGlmIChxdWVzdGlvbiA9PSAzKSB7XHJcbiAgICAgICAgYW5zd2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJxdWVzdGlvbnRocmVlX3RleHRcIikudmFsdWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBpZiAoYW5zd2VyID09IFwic2FsdFwiKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicXVlc3Rpb250aHJlZV9yZXN1bHRcIikuc3JjID1cclxuICAgICAgICAgICAgXCIuL2ltYWdlcy9vdGhlci9ncmVlbnRpY2suZ2lmXCI7XHJcbiAgICAgICAgICAgIHNldFN0YXRlKHtxdWVzdGlvbnNDb21wbGV0ZTogc3RhdGUucXVlc3Rpb25zQ29tcGxldGUrMX0pO1xyXG4gICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInF1ZXN0aW9udGhyZWVfcmVzdWx0XCIpLnNyYyA9XHJcbiAgICAgICAgICAgIFwiLi9pbWFnZXMvb3RoZXIvcmVkY3Jvc3MucG5nXCI7XHJcbiAgICB9XHJcbiAgICBleHBlcmltZW50LnVwZGF0ZSgpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IHN0YXRlLCBzZXRTdGF0ZSwgY2hlY2tRdWVzdGlvbkFuc3dlciB9O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9xdWVzdGlvbnMuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGludGVyYWN0IGZyb20gJ2ludGVyYWN0anMnO1xuaW1wb3J0IGhpbnQgZnJvbSAnLi9oaW50LmpzJztcbmltcG9ydCBhbnN3ZXJib3ggZnJvbSAnLi9hbnN3ZXJib3guanMnO1xuaW1wb3J0IGRyb3B6b25lIGZyb20gJy4vZHJvcHpvbmUuanMnO1xuaW1wb3J0IGNoZW1pY2FscyBmcm9tICcuL2NoZW1pY2Fscy5qcyc7XG5pbXBvcnQgZmxhbWVjb2xvdXIgZnJvbSAnLi9mbGFtZWNvbG91ci5qcyc7XG5pbXBvcnQgcXVlc3Rpb25zIGZyb20gJy4vcXVlc3Rpb25zLmpzJztcblxuaW50ZXJhY3QoXCIuZHJvcHpvbmVcIikuZHJvcHpvbmUoe1xuICAgIC8vIG9ubHkgYWNjZXB0IGVsZW1lbnRzIG1hdGNoaW5nIHRoaXMgQ1NTIHNlbGVjdG9yXG4gICAgYWNjZXB0OiBcIi5kcmFnLWRyb3BcIixcbiAgICAvLyBSZXF1aXJlIGEgNiUgZWxlbWVudCBvdmVybGFwIGZvciBhIGRyb3AgdG8gYmUgcG9zc2libGVcbiAgICBvdmVybGFwOiAwLjA2LFxuICAgIG9uZHJhZ2VudGVyOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvL1NldCB0aGUgY3VycmVudENoZW1pY2FsIHRvIHRoZSByZXN1bHQgb2YgdGhlICdmaW5kQ2hlbWljYWwnIGZ1bmN0aW9uIGluIGNoZW1pY2Fscy5cbiAgICAgICAgZHJvcHpvbmUuc2V0U3RhdGUoe2N1cnJlbnRDaGVtaWNhbDogY2hlbWljYWxzLmZpbmRDaGVtaWNhbChldmVudC5yZWxhdGVkVGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKSl9KTtcbiAgICAgICAgLy9TZXQgdGhlIGhpbnQgbWVzc2FnZSBkZXBlbmRpbmcgb24gd2hhdCBoaW50VHlwZSB0aGUgY3VycmVudCBjaGVtaWNhbCBpcy5cbiAgICAgICAgaGludC5zZXRTdGF0ZSh7aGludE1lc3NhZ2U6IChkcm9wem9uZS5zdGF0ZS5jdXJyZW50Q2hlbWljYWwuc3RhdGUuaGludFR5cGUgPT0gMCA/IFwiVGhpcyBtZXRhbCBpb24gaXMgcGFydCBvZiA8Yj5Hcm91cCAxPC9iPiBvZiB0aGUgcGVyaW9kaWMgdGFibGUuIFRoZXNlIGFyZSBjYWxsZWQgdGhlIDxiPkFsa2FsaSBNZXRhbHM8L2I+LlwiIDogXCJUaGlzIG1ldGFsIGlvbiBpcyBwYXJ0IG9mIDxiPkdyb3VwIDI8L2I+IG9mIHRoZSBwZXJpb2RpYyB0YWJsZS4gVGhlc2UgYXJlIGNhbGxlZCB0aGUgPGI+QWxrYWxpbmUgRWFydGggTWV0YWxzPC9iPi5cIil9KTtcbiAgICAgICAgdmFyIGNoZW1pY2FsID0gZXZlbnQucmVsYXRlZFRhcmdldC5kYXRhc2V0LmNoZW1pY2FsO1xuICAgICAgICB2YXIgZWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZmxhbWVcIik7XG4gICAgICAgIC8vTG9vcCB0aHJvdWdoIGFsbCB0aGUgZWxlbWVudHMgdGhhdCBtYWtlIHVwIHRoZSBtb3ZpbmcgZmxhbWUsIGFuZCBnaXZlIHRoZW0gdGhlIFwiaGFzQ2hlbWljYWxcIiBjbGFzcywgYXMgd2VsbCBhcyB0aGUgY3VycmVudENoZW1pY2FsJ3MgbmFtZSBjbGFzc1xuICAgICAgICAvL1RoaXMgaXMgdXNlZCBzbyB0aGF0IHRoZSBmbGFtZSBjYW4gY2hhbmdlIGRpZmZlcmVudCBjb2xvdXJzIGRlcGVuZGluZyBvbiB0aGUgY3VycmVudENoZW1pY2FsXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGVsZW1lbnRzW2ldLmNsYXNzTGlzdC5hZGQoXCJoYXNDaGVtaWNhbFwiKTtcbiAgICAgICAgICAgIGVsZW1lbnRzW2ldLmNsYXNzTGlzdC5hZGQoZHJvcHpvbmUuc3RhdGUuY3VycmVudENoZW1pY2FsLnN0YXRlLm5hbWVzWzFdKTtcbiAgICAgICAgfVxuICAgICAgICAvL0FsbG93IHRoZSBmbGFtZSBjb2xvdXIgbWVzc2FnZSBiZXNpZGVzIHRoZSBmbGFtZSB0byBiZSB2aXNpYmxlLlxuICAgICAgICBmbGFtZWNvbG91ci5zZXRTdGF0ZSh7dmlzaWJsZTogdHJ1ZX0pO1xuICAgICAgICBpZiAoIWRyb3B6b25lLnN0YXRlLmN1cnJlbnRDaGVtaWNhbC5zdGF0ZS5oYXNHdWVzc2VkKSB7XG4gICAgICAgICAgICAvL0FsbG93IHRoZSBoaW50IHRvIGJlIHVzZWQgYW5kIGFuc3dlciBib3ggdG8gYmUgc2VlbiBpZiB0aGUgY3VycmVudENoZW1pY2FsIGhhc24ndCBiZWVuIGd1ZXNzZWQgeWV0LlxuICAgICAgICAgICAgYW5zd2VyYm94LnNldFN0YXRlKHt2aXNpYmxlOiB0cnVlfSk7XG4gICAgICAgICAgICBoaW50LnNldFN0YXRlKHtkaXNhYmxlZDogZmFsc2V9KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgb25kcmFnbGVhdmU6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIC8vTG9vcCB0aHJvdWdoIGFsbCB0aGUgZWxlbWVudHMgdGhhdCBtYWtlIHVwIHRoZSBtb3ZpbmcgZmxhbWUsIGFuZCByZW1vdmUgdGhlIFwiaGFzQ2hlbWljYWxcIiBjbGFzcywgYXMgd2VsbCBhcyB0aGUgY3VycmVudENoZW1pY2FsJ3MgbmFtZSBjbGFzcyBmcm9tIHRoZW1cbiAgICAgICAgLy9UaGlzIGlzIHVzZWQgc28gdGhhdCB0aGUgZmxhbWUgY2FuIGNoYW5nZSBiYWNrIHRvIGl0J3MgZGVmYXVsdCBjb2xvdXJcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImZsYW1lXCIpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBlbGVtZW50c1tpXS5jbGFzc0xpc3QucmVtb3ZlKFwiaGFzQ2hlbWljYWxcIik7XG4gICAgICAgICAgICBlbGVtZW50c1tpXS5jbGFzc0xpc3QucmVtb3ZlKGRyb3B6b25lLnN0YXRlLmN1cnJlbnRDaGVtaWNhbC5zdGF0ZS5uYW1lc1sxXSk7XG4gICAgICAgIH1cbiAgICAgICAgLy9TZXQgdGhlIGN1cnJlbnRDaGVtaWNhbCB0byBudWxsLCBhcyB0aGVyZSBpcyBubyBjaGVtaWNhbCBpbiB0aGUgZmxhbWUuXG4gICAgICAgIC8vVGhpcyBpcyBkb25lIGFmdGVyIHRoZSBmb3IgbG9vcCBhYm92ZSwgYXMgdGhhdCB1c2VzIHRoZSBjdXJyZW50Q2hlbWljYWwsIHRodXMgaWYgd2UgZGlkIGl0IGJlZm9yZSBpdCB3b3VsZCBiZSBudWxsIGFuZCBmYWlsLlxuICAgICAgICBkcm9wem9uZS5zZXRTdGF0ZSh7Y3VycmVudENoZW1pY2FsOiBudWxsfSk7XG4gICAgICAgIC8vU2V0IHRoZSBoaW50IHRvIGJlIGRpc2FibGVkLCBhbmQgaGlkZSB0aGUgaGludCBjb250ZW50LiBUaGlzIGlzIHNvIHRoYXQgd2hlbiBhIGNoZW1pY2FsIGlzIHB1dCBiYWNrIGludG8gdGhlIGZsYW1lLCB0aGUgaGludCBpcyBjbG9zZWQgYW5kIG5vdCBvcGVuLlxuICAgICAgICBoaW50LnNldFN0YXRlKHtkaXNhYmxlZDogdHJ1ZSwgY29udGVudFZpc2libGU6IGZhbHNlfSk7XG4gICAgICAgIC8vU2V0IHRoZSBmbGFtZSBjb2xvdXIgbWVzc2FnZSB0byBub3QgYmUgdmlzaWJsZSBhbnltb3JlIGFzIHRoZSBmbGFtZSBpcyB0aGUgZGVmYXVsdCBjb2xvdXIuXG4gICAgICAgIGZsYW1lY29sb3VyLnNldFN0YXRlKHt2aXNpYmxlOiBmYWxzZX0pO1xuICAgICAgICAvL0hpZGUgdGhlIGFuc3dlciBib3ggYW5kIGNsZWFyIHRoZSBwcmV2aW91cyBhbnN3ZXIgaW4gdGhlIHRleHQgYm94LlxuICAgICAgICBhbnN3ZXJib3guc2V0U3RhdGUoe3Zpc2libGU6IGZhbHNlLCBzaG93UmVzdWx0OiBmYWxzZX0pO1xuICAgIH1cbn0pO1xuXG5pbnRlcmFjdChcIi5kcmFnZ2FibGVcIikuZHJhZ2dhYmxlKHtcbiAgICAvLyBlbmFibGUgaW5lcnRpYWwgdGhyb3dpbmdcbiAgICBpbmVydGlhOiBmYWxzZSxcbiAgICAvLyBrZWVwIHRoZSBlbGVtZW50IHdpdGhpbiB0aGUgYXJlYSBvZiBpdCdzIHBhcmVudFxuICAgIHJlc3RyaWN0OiB7XG4gICAgICAgIHJlc3RyaWN0aW9uOiBcInBhcmVudFwiLFxuICAgICAgICBlbmRPbmx5OiB0cnVlLFxuICAgICAgICBlbGVtZW50UmVjdDogeyB0b3A6IDAsIGxlZnQ6IDAsIGJvdHRvbTogMSwgcmlnaHQ6IDEgfVxuICAgIH0sXG4gICAgLy8gZW5hYmxlIGF1dG9TY3JvbGxcbiAgICBhdXRvU2Nyb2xsOiB0cnVlLFxuICAgIFxuICAgIC8vIGNhbGwgdGhpcyBmdW5jdGlvbiBvbiBldmVyeSBkcmFnbW92ZSBldmVudFxuICAgIG9ubW92ZTogZHJhZ01vdmVMaXN0ZW5lcixcbn0pO1xuXG5mdW5jdGlvbiBkcmFnTW92ZUxpc3RlbmVyKGV2ZW50KSB7XG4gICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldCxcbiAgICAvLyBrZWVwIHRoZSBkcmFnZ2VkIHBvc2l0aW9uIGluIHRoZSBkYXRhLXgvZGF0YS15IGF0dHJpYnV0ZXNcbiAgICB4ID0gKHBhcnNlRmxvYXQodGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEteFwiKSkgfHwgMCkgKyBldmVudC5keCxcbiAgICB5ID0gKHBhcnNlRmxvYXQodGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEteVwiKSkgfHwgMCkgKyBldmVudC5keTtcblxuICAgIC8vIHRyYW5zbGF0ZSB0aGUgZWxlbWVudFxuICAgIHRhcmdldC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0YXJnZXQuc3R5bGUudHJhbnNmb3JtID1cbiAgICBcInRyYW5zbGF0ZShcIiArIHggKyBcInB4LCBcIiArIHkgKyBcInB4KVwiO1xuXG4gICAgLy8gdXBkYXRlIHRoZSBwb3NpaW9uIGF0dHJpYnV0ZXNcbiAgICB0YXJnZXQuc2V0QXR0cmlidXRlKFwiZGF0YS14XCIsIHgpO1xuICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXlcIiwgeSk7XG59XG5cbi8vTGluayB0aGUgZnVuY3Rpb25zIGNhbGxlZCBieSBidXR0b25zIGluIGh0bWwgdG8gdGhlIHJpZ2h0IG9uZXMuXG53aW5kb3cudG9nZ2xlSGludCA9IGhpbnQudG9nZ2xlSGludDtcbndpbmRvdy5jaGVja0Fuc3dlciA9IGFuc3dlcmJveC5jaGVja0Fuc3dlcjtcbndpbmRvdy5jaGVja1F1ZXN0aW9uQW5zd2VyID0gcXVlc3Rpb25zLmNoZWNrUXVlc3Rpb25BbnN3ZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBpbnRlcmFjdC5qcyB2MS4yLjlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTItMjAxNSBUYXllIEFkZXllbWkgPGRldkB0YXllLm1lPlxuICogT3BlbiBzb3VyY2UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9yYXcuZ2l0aHViLmNvbS90YXllL2ludGVyYWN0LmpzL21hc3Rlci9MSUNFTlNFXG4gKi9cbihmdW5jdGlvbiAocmVhbFdpbmRvdykge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIC8vIHJldHVybiBlYXJseSBpZiB0aGVyZSdzIG5vIHdpbmRvdyB0byB3b3JrIHdpdGggKGVnLiBOb2RlLmpzKVxuICAgIGlmICghcmVhbFdpbmRvdykgeyByZXR1cm47IH1cblxuICAgIHZhciAvLyBnZXQgd3JhcHBlZCB3aW5kb3cgaWYgdXNpbmcgU2hhZG93IERPTSBwb2x5ZmlsbFxuICAgICAgICB3aW5kb3cgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIGEgVGV4dE5vZGVcbiAgICAgICAgICAgIHZhciBlbCA9IHJlYWxXaW5kb3cuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuXG4gICAgICAgICAgICAvLyBjaGVjayBpZiBpdCdzIHdyYXBwZWQgYnkgYSBwb2x5ZmlsbFxuICAgICAgICAgICAgaWYgKGVsLm93bmVyRG9jdW1lbnQgIT09IHJlYWxXaW5kb3cuZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAmJiB0eXBlb2YgcmVhbFdpbmRvdy53cmFwID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICAgJiYgcmVhbFdpbmRvdy53cmFwKGVsKSA9PT0gZWwpIHtcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gd3JhcHBlZCB3aW5kb3dcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhbFdpbmRvdy53cmFwKHJlYWxXaW5kb3cpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBubyBTaGFkb3cgRE9NIHBvbHlmaWwgb3IgbmF0aXZlIGltcGxlbWVudGF0aW9uXG4gICAgICAgICAgICByZXR1cm4gcmVhbFdpbmRvdztcbiAgICAgICAgfSgpKSxcblxuICAgICAgICBkb2N1bWVudCAgICAgICAgICAgPSB3aW5kb3cuZG9jdW1lbnQsXG4gICAgICAgIERvY3VtZW50RnJhZ21lbnQgICA9IHdpbmRvdy5Eb2N1bWVudEZyYWdtZW50ICAgfHwgYmxhbmssXG4gICAgICAgIFNWR0VsZW1lbnQgICAgICAgICA9IHdpbmRvdy5TVkdFbGVtZW50ICAgICAgICAgfHwgYmxhbmssXG4gICAgICAgIFNWR1NWR0VsZW1lbnQgICAgICA9IHdpbmRvdy5TVkdTVkdFbGVtZW50ICAgICAgfHwgYmxhbmssXG4gICAgICAgIFNWR0VsZW1lbnRJbnN0YW5jZSA9IHdpbmRvdy5TVkdFbGVtZW50SW5zdGFuY2UgfHwgYmxhbmssXG4gICAgICAgIEhUTUxFbGVtZW50ICAgICAgICA9IHdpbmRvdy5IVE1MRWxlbWVudCAgICAgICAgfHwgd2luZG93LkVsZW1lbnQsXG5cbiAgICAgICAgUG9pbnRlckV2ZW50ID0gKHdpbmRvdy5Qb2ludGVyRXZlbnQgfHwgd2luZG93Lk1TUG9pbnRlckV2ZW50KSxcbiAgICAgICAgcEV2ZW50VHlwZXMsXG5cbiAgICAgICAgaHlwb3QgPSBNYXRoLmh5cG90IHx8IGZ1bmN0aW9uICh4LCB5KSB7IHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSk7IH0sXG5cbiAgICAgICAgdG1wWFkgPSB7fSwgICAgIC8vIHJlZHVjZSBvYmplY3QgY3JlYXRpb24gaW4gZ2V0WFkoKVxuXG4gICAgICAgIGRvY3VtZW50cyAgICAgICA9IFtdLCAgIC8vIGFsbCBkb2N1bWVudHMgYmVpbmcgbGlzdGVuZWQgdG9cblxuICAgICAgICBpbnRlcmFjdGFibGVzICAgPSBbXSwgICAvLyBhbGwgc2V0IGludGVyYWN0YWJsZXNcbiAgICAgICAgaW50ZXJhY3Rpb25zICAgID0gW10sICAgLy8gYWxsIGludGVyYWN0aW9uc1xuXG4gICAgICAgIGR5bmFtaWNEcm9wICAgICA9IGZhbHNlLFxuXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgICB0eXBlOiB7XG4gICAgICAgIC8vICAgICAgICAgIHNlbGVjdG9yczogWydzZWxlY3RvcicsIC4uLl0sXG4gICAgICAgIC8vICAgICAgICAgIGNvbnRleHRzIDogW2RvY3VtZW50LCAuLi5dLFxuICAgICAgICAvLyAgICAgICAgICBsaXN0ZW5lcnM6IFtbbGlzdGVuZXIsIHVzZUNhcHR1cmVdLCAuLi5dXG4gICAgICAgIC8vICAgICAgfVxuICAgICAgICAvLyAgfVxuICAgICAgICBkZWxlZ2F0ZWRFdmVudHMgPSB7fSxcblxuICAgICAgICBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGJhc2U6IHtcbiAgICAgICAgICAgICAgICBhY2NlcHQgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICBhY3Rpb25DaGVja2VyIDogbnVsbCxcbiAgICAgICAgICAgICAgICBzdHlsZUN1cnNvciAgIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIG9yaWdpbiAgICAgICAgOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgICAgICAgICBkZWx0YVNvdXJjZSAgIDogJ3BhZ2UnLFxuICAgICAgICAgICAgICAgIGFsbG93RnJvbSAgICAgOiBudWxsLFxuICAgICAgICAgICAgICAgIGlnbm9yZUZyb20gICAgOiBudWxsLFxuICAgICAgICAgICAgICAgIF9jb250ZXh0ICAgICAgOiBkb2N1bWVudCxcbiAgICAgICAgICAgICAgICBkcm9wQ2hlY2tlciAgIDogbnVsbFxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZHJhZzoge1xuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG1hbnVhbFN0YXJ0OiB0cnVlLFxuICAgICAgICAgICAgICAgIG1heDogSW5maW5pdHksXG4gICAgICAgICAgICAgICAgbWF4UGVyRWxlbWVudDogMSxcblxuICAgICAgICAgICAgICAgIHNuYXA6IG51bGwsXG4gICAgICAgICAgICAgICAgcmVzdHJpY3Q6IG51bGwsXG4gICAgICAgICAgICAgICAgaW5lcnRpYTogbnVsbCxcbiAgICAgICAgICAgICAgICBhdXRvU2Nyb2xsOiBudWxsLFxuXG4gICAgICAgICAgICAgICAgYXhpczogJ3h5J1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZHJvcDoge1xuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFjY2VwdDogbnVsbCxcbiAgICAgICAgICAgICAgICBvdmVybGFwOiAncG9pbnRlcidcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlc2l6ZToge1xuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG1hbnVhbFN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtYXg6IEluZmluaXR5LFxuICAgICAgICAgICAgICAgIG1heFBlckVsZW1lbnQ6IDEsXG5cbiAgICAgICAgICAgICAgICBzbmFwOiBudWxsLFxuICAgICAgICAgICAgICAgIHJlc3RyaWN0OiBudWxsLFxuICAgICAgICAgICAgICAgIGluZXJ0aWE6IG51bGwsXG4gICAgICAgICAgICAgICAgYXV0b1Njcm9sbDogbnVsbCxcblxuICAgICAgICAgICAgICAgIHNxdWFyZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgcHJlc2VydmVBc3BlY3RSYXRpbzogZmFsc2UsXG4gICAgICAgICAgICAgICAgYXhpczogJ3h5JyxcblxuICAgICAgICAgICAgICAgIC8vIHVzZSBkZWZhdWx0IG1hcmdpblxuICAgICAgICAgICAgICAgIG1hcmdpbjogTmFOLFxuXG4gICAgICAgICAgICAgICAgLy8gb2JqZWN0IHdpdGggcHJvcHMgbGVmdCwgcmlnaHQsIHRvcCwgYm90dG9tIHdoaWNoIGFyZVxuICAgICAgICAgICAgICAgIC8vIHRydWUvZmFsc2UgdmFsdWVzIHRvIHJlc2l6ZSB3aGVuIHRoZSBwb2ludGVyIGlzIG92ZXIgdGhhdCBlZGdlLFxuICAgICAgICAgICAgICAgIC8vIENTUyBzZWxlY3RvcnMgdG8gbWF0Y2ggdGhlIGhhbmRsZXMgZm9yIGVhY2ggZGlyZWN0aW9uXG4gICAgICAgICAgICAgICAgLy8gb3IgdGhlIEVsZW1lbnRzIGZvciBlYWNoIGhhbmRsZVxuICAgICAgICAgICAgICAgIGVkZ2VzOiBudWxsLFxuXG4gICAgICAgICAgICAgICAgLy8gYSB2YWx1ZSBvZiAnbm9uZScgd2lsbCBsaW1pdCB0aGUgcmVzaXplIHJlY3QgdG8gYSBtaW5pbXVtIG9mIDB4MFxuICAgICAgICAgICAgICAgIC8vICduZWdhdGUnIHdpbGwgYWxvdyB0aGUgcmVjdCB0byBoYXZlIG5lZ2F0aXZlIHdpZHRoL2hlaWdodFxuICAgICAgICAgICAgICAgIC8vICdyZXBvc2l0aW9uJyB3aWxsIGtlZXAgdGhlIHdpZHRoL2hlaWdodCBwb3NpdGl2ZSBieSBzd2FwcGluZ1xuICAgICAgICAgICAgICAgIC8vIHRoZSB0b3AgYW5kIGJvdHRvbSBlZGdlcyBhbmQvb3Igc3dhcHBpbmcgdGhlIGxlZnQgYW5kIHJpZ2h0IGVkZ2VzXG4gICAgICAgICAgICAgICAgaW52ZXJ0OiAnbm9uZSdcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGdlc3R1cmU6IHtcbiAgICAgICAgICAgICAgICBtYW51YWxTdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbWF4OiBJbmZpbml0eSxcbiAgICAgICAgICAgICAgICBtYXhQZXJFbGVtZW50OiAxLFxuXG4gICAgICAgICAgICAgICAgcmVzdHJpY3Q6IG51bGxcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHBlckFjdGlvbjoge1xuICAgICAgICAgICAgICAgIG1hbnVhbFN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtYXg6IEluZmluaXR5LFxuICAgICAgICAgICAgICAgIG1heFBlckVsZW1lbnQ6IDEsXG5cbiAgICAgICAgICAgICAgICBzbmFwOiB7XG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQgICAgIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGVuZE9ubHkgICAgIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlICAgICAgIDogSW5maW5pdHksXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHMgICAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0cyAgICAgOiBudWxsLFxuXG4gICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlUG9pbnRzOiBudWxsXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHJlc3RyaWN0OiB7XG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBlbmRPbmx5OiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBhdXRvU2Nyb2xsOiB7XG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQgICAgIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lciAgIDogbnVsbCwgICAgIC8vIHRoZSBpdGVtIHRoYXQgaXMgc2Nyb2xsZWQgKFdpbmRvdyBvciBIVE1MRWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luICAgICAgOiA2MCxcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQgICAgICAgOiAzMDAgICAgICAgLy8gdGhlIHNjcm9sbCBzcGVlZCBpbiBwaXhlbHMgcGVyIHNlY29uZFxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBpbmVydGlhOiB7XG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQgICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgcmVzaXN0YW5jZSAgICAgICA6IDEwLCAgICAvLyB0aGUgbGFtYmRhIGluIGV4cG9uZW50aWFsIGRlY2F5XG4gICAgICAgICAgICAgICAgICAgIG1pblNwZWVkICAgICAgICAgOiAxMDAsICAgLy8gdGFyZ2V0IHNwZWVkIG11c3QgYmUgYWJvdmUgdGhpcyBmb3IgaW5lcnRpYSB0byBzdGFydFxuICAgICAgICAgICAgICAgICAgICBlbmRTcGVlZCAgICAgICAgIDogMTAsICAgIC8vIHRoZSBzcGVlZCBhdCB3aGljaCBpbmVydGlhIGlzIHNsb3cgZW5vdWdoIHRvIHN0b3BcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dSZXN1bWUgICAgICA6IHRydWUsICAvLyBhbGxvdyByZXN1bWluZyBhbiBhY3Rpb24gaW4gaW5lcnRpYSBwaGFzZVxuICAgICAgICAgICAgICAgICAgICB6ZXJvUmVzdW1lRGVsdGEgIDogdHJ1ZSwgIC8vIGlmIGFuIGFjdGlvbiBpcyByZXN1bWVkIGFmdGVyIGxhdW5jaCwgc2V0IGR4L2R5IHRvIDBcbiAgICAgICAgICAgICAgICAgICAgc21vb3RoRW5kRHVyYXRpb246IDMwMCAgICAvLyBhbmltYXRlIHRvIHNuYXAvcmVzdHJpY3QgZW5kT25seSBpZiB0aGVyZSdzIG5vIGluZXJ0aWFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBfaG9sZER1cmF0aW9uOiA2MDBcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBUaGluZ3MgcmVsYXRlZCB0byBhdXRvU2Nyb2xsXG4gICAgICAgIGF1dG9TY3JvbGwgPSB7XG4gICAgICAgICAgICBpbnRlcmFjdGlvbjogbnVsbCxcbiAgICAgICAgICAgIGk6IG51bGwsICAgIC8vIHRoZSBoYW5kbGUgcmV0dXJuZWQgYnkgd2luZG93LnNldEludGVydmFsXG4gICAgICAgICAgICB4OiAwLCB5OiAwLCAvLyBEaXJlY3Rpb24gZWFjaCBwdWxzZSBpcyB0byBzY3JvbGwgaW5cblxuICAgICAgICAgICAgLy8gc2Nyb2xsIHRoZSB3aW5kb3cgYnkgdGhlIHZhbHVlcyBpbiBzY3JvbGwueC95XG4gICAgICAgICAgICBzY3JvbGw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IGF1dG9TY3JvbGwuaW50ZXJhY3Rpb24udGFyZ2V0Lm9wdGlvbnNbYXV0b1Njcm9sbC5pbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lXS5hdXRvU2Nyb2xsLFxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lciB8fCBnZXRXaW5kb3coYXV0b1Njcm9sbC5pbnRlcmFjdGlvbi5lbGVtZW50KSxcbiAgICAgICAgICAgICAgICAgICAgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoYW5nZSBpbiB0aW1lIGluIHNlY29uZHNcbiAgICAgICAgICAgICAgICAgICAgZHR4ID0gKG5vdyAtIGF1dG9TY3JvbGwucHJldlRpbWVYKSAvIDEwMDAsXG4gICAgICAgICAgICAgICAgICAgIGR0eSA9IChub3cgLSBhdXRvU2Nyb2xsLnByZXZUaW1lWSkgLyAxMDAwLFxuICAgICAgICAgICAgICAgICAgICB2eCwgdnksIHN4LCBzeTtcblxuICAgICAgICAgICAgICAgIC8vIGRpc3BsYWNlbWVudFxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnZlbG9jaXR5KSB7XG4gICAgICAgICAgICAgICAgICB2eCA9IG9wdGlvbnMudmVsb2NpdHkueDtcbiAgICAgICAgICAgICAgICAgIHZ5ID0gb3B0aW9ucy52ZWxvY2l0eS55O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHZ4ID0gdnkgPSBvcHRpb25zLnNwZWVkXG4gICAgICAgICAgICAgICAgfVxuIFxuICAgICAgICAgICAgICAgIHN4ID0gdnggKiBkdHg7XG4gICAgICAgICAgICAgICAgc3kgPSB2eSAqIGR0eTtcblxuICAgICAgICAgICAgICAgIGlmIChzeCA+PSAxIHx8IHN5ID49IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzV2luZG93KGNvbnRhaW5lcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zY3JvbGxCeShhdXRvU2Nyb2xsLnggKiBzeCwgYXV0b1Njcm9sbC55ICogc3kpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnNjcm9sbExlZnQgKz0gYXV0b1Njcm9sbC54ICogc3g7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuc2Nyb2xsVG9wICArPSBhdXRvU2Nyb2xsLnkgKiBzeTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzeCA+PTEpIGF1dG9TY3JvbGwucHJldlRpbWVYID0gbm93O1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3kgPj0gMSkgYXV0b1Njcm9sbC5wcmV2VGltZVkgPSBub3c7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGF1dG9TY3JvbGwuaXNTY3JvbGxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsRnJhbWUoYXV0b1Njcm9sbC5pKTtcbiAgICAgICAgICAgICAgICAgICAgYXV0b1Njcm9sbC5pID0gcmVxRnJhbWUoYXV0b1Njcm9sbC5zY3JvbGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGlzU2Nyb2xsaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIHByZXZUaW1lWDogMCxcbiAgICAgICAgICAgIHByZXZUaW1lWTogMCxcblxuICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uIChpbnRlcmFjdGlvbikge1xuICAgICAgICAgICAgICAgIGF1dG9TY3JvbGwuaXNTY3JvbGxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNhbmNlbEZyYW1lKGF1dG9TY3JvbGwuaSk7XG5cbiAgICAgICAgICAgICAgICBhdXRvU2Nyb2xsLmludGVyYWN0aW9uID0gaW50ZXJhY3Rpb247XG4gICAgICAgICAgICAgICAgYXV0b1Njcm9sbC5wcmV2VGltZVggPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICBhdXRvU2Nyb2xsLnByZXZUaW1lWSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgIGF1dG9TY3JvbGwuaSA9IHJlcUZyYW1lKGF1dG9TY3JvbGwuc2Nyb2xsKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHN0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBhdXRvU2Nyb2xsLmlzU2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY2FuY2VsRnJhbWUoYXV0b1Njcm9sbC5pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBEb2VzIHRoZSBicm93c2VyIHN1cHBvcnQgdG91Y2ggaW5wdXQ/XG4gICAgICAgIHN1cHBvcnRzVG91Y2ggPSAoKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgfHwgd2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiB3aW5kb3cuRG9jdW1lbnRUb3VjaCksXG5cbiAgICAgICAgLy8gRG9lcyB0aGUgYnJvd3NlciBzdXBwb3J0IFBvaW50ZXJFdmVudHNcbiAgICAgICAgLy8gQXZvaWQgUG9pbnRlckV2ZW50IGJ1Z3MgaW50cm9kdWNlZCBpbiBDaHJvbWUgNTVcbiAgICAgICAgc3VwcG9ydHNQb2ludGVyRXZlbnQgPSBQb2ludGVyRXZlbnQgJiYgIS9DaHJvbWUvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCksXG5cbiAgICAgICAgLy8gTGVzcyBQcmVjaXNpb24gd2l0aCB0b3VjaCBpbnB1dFxuICAgICAgICBtYXJnaW4gPSBzdXBwb3J0c1RvdWNoIHx8IHN1cHBvcnRzUG9pbnRlckV2ZW50PyAyMDogMTAsXG5cbiAgICAgICAgcG9pbnRlck1vdmVUb2xlcmFuY2UgPSAxLFxuXG4gICAgICAgIC8vIGZvciBpZ25vcmluZyBicm93c2VyJ3Mgc2ltdWxhdGVkIG1vdXNlIGV2ZW50c1xuICAgICAgICBwcmV2VG91Y2hUaW1lID0gMCxcblxuICAgICAgICAvLyBBbGxvdyB0aGlzIG1hbnkgaW50ZXJhY3Rpb25zIHRvIGhhcHBlbiBzaW11bHRhbmVvdXNseVxuICAgICAgICBtYXhJbnRlcmFjdGlvbnMgPSBJbmZpbml0eSxcblxuICAgICAgICAvLyBDaGVjayBpZiBpcyBJRTkgb3Igb2xkZXJcbiAgICAgICAgYWN0aW9uQ3Vyc29ycyA9IChkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iKSA/IHtcbiAgICAgICAgICAgIGRyYWcgICAgOiAnbW92ZScsXG4gICAgICAgICAgICByZXNpemV4IDogJ2UtcmVzaXplJyxcbiAgICAgICAgICAgIHJlc2l6ZXkgOiAncy1yZXNpemUnLFxuICAgICAgICAgICAgcmVzaXpleHk6ICdzZS1yZXNpemUnLFxuXG4gICAgICAgICAgICByZXNpemV0b3AgICAgICAgIDogJ24tcmVzaXplJyxcbiAgICAgICAgICAgIHJlc2l6ZWxlZnQgICAgICAgOiAndy1yZXNpemUnLFxuICAgICAgICAgICAgcmVzaXplYm90dG9tICAgICA6ICdzLXJlc2l6ZScsXG4gICAgICAgICAgICByZXNpemVyaWdodCAgICAgIDogJ2UtcmVzaXplJyxcbiAgICAgICAgICAgIHJlc2l6ZXRvcGxlZnQgICAgOiAnc2UtcmVzaXplJyxcbiAgICAgICAgICAgIHJlc2l6ZWJvdHRvbXJpZ2h0OiAnc2UtcmVzaXplJyxcbiAgICAgICAgICAgIHJlc2l6ZXRvcHJpZ2h0ICAgOiAnbmUtcmVzaXplJyxcbiAgICAgICAgICAgIHJlc2l6ZWJvdHRvbWxlZnQgOiAnbmUtcmVzaXplJyxcblxuICAgICAgICAgICAgZ2VzdHVyZSA6ICcnXG4gICAgICAgIH0gOiB7XG4gICAgICAgICAgICBkcmFnICAgIDogJ21vdmUnLFxuICAgICAgICAgICAgcmVzaXpleCA6ICdldy1yZXNpemUnLFxuICAgICAgICAgICAgcmVzaXpleSA6ICducy1yZXNpemUnLFxuICAgICAgICAgICAgcmVzaXpleHk6ICdud3NlLXJlc2l6ZScsXG5cbiAgICAgICAgICAgIHJlc2l6ZXRvcCAgICAgICAgOiAnbnMtcmVzaXplJyxcbiAgICAgICAgICAgIHJlc2l6ZWxlZnQgICAgICAgOiAnZXctcmVzaXplJyxcbiAgICAgICAgICAgIHJlc2l6ZWJvdHRvbSAgICAgOiAnbnMtcmVzaXplJyxcbiAgICAgICAgICAgIHJlc2l6ZXJpZ2h0ICAgICAgOiAnZXctcmVzaXplJyxcbiAgICAgICAgICAgIHJlc2l6ZXRvcGxlZnQgICAgOiAnbndzZS1yZXNpemUnLFxuICAgICAgICAgICAgcmVzaXplYm90dG9tcmlnaHQ6ICdud3NlLXJlc2l6ZScsXG4gICAgICAgICAgICByZXNpemV0b3ByaWdodCAgIDogJ25lc3ctcmVzaXplJyxcbiAgICAgICAgICAgIHJlc2l6ZWJvdHRvbWxlZnQgOiAnbmVzdy1yZXNpemUnLFxuXG4gICAgICAgICAgICBnZXN0dXJlIDogJydcbiAgICAgICAgfSxcblxuICAgICAgICBhY3Rpb25Jc0VuYWJsZWQgPSB7XG4gICAgICAgICAgICBkcmFnICAgOiB0cnVlLFxuICAgICAgICAgICAgcmVzaXplIDogdHJ1ZSxcbiAgICAgICAgICAgIGdlc3R1cmU6IHRydWVcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBiZWNhdXNlIFdlYmtpdCBhbmQgT3BlcmEgc3RpbGwgdXNlICdtb3VzZXdoZWVsJyBldmVudCB0eXBlXG4gICAgICAgIHdoZWVsRXZlbnQgPSAnb25tb3VzZXdoZWVsJyBpbiBkb2N1bWVudD8gJ21vdXNld2hlZWwnOiAnd2hlZWwnLFxuXG4gICAgICAgIGV2ZW50VHlwZXMgPSBbXG4gICAgICAgICAgICAnZHJhZ3N0YXJ0JyxcbiAgICAgICAgICAgICdkcmFnbW92ZScsXG4gICAgICAgICAgICAnZHJhZ2luZXJ0aWFzdGFydCcsXG4gICAgICAgICAgICAnZHJhZ2VuZCcsXG4gICAgICAgICAgICAnZHJhZ2VudGVyJyxcbiAgICAgICAgICAgICdkcmFnbGVhdmUnLFxuICAgICAgICAgICAgJ2Ryb3BhY3RpdmF0ZScsXG4gICAgICAgICAgICAnZHJvcGRlYWN0aXZhdGUnLFxuICAgICAgICAgICAgJ2Ryb3Btb3ZlJyxcbiAgICAgICAgICAgICdkcm9wJyxcbiAgICAgICAgICAgICdyZXNpemVzdGFydCcsXG4gICAgICAgICAgICAncmVzaXplbW92ZScsXG4gICAgICAgICAgICAncmVzaXplaW5lcnRpYXN0YXJ0JyxcbiAgICAgICAgICAgICdyZXNpemVlbmQnLFxuICAgICAgICAgICAgJ2dlc3R1cmVzdGFydCcsXG4gICAgICAgICAgICAnZ2VzdHVyZW1vdmUnLFxuICAgICAgICAgICAgJ2dlc3R1cmVpbmVydGlhc3RhcnQnLFxuICAgICAgICAgICAgJ2dlc3R1cmVlbmQnLFxuXG4gICAgICAgICAgICAnZG93bicsXG4gICAgICAgICAgICAnbW92ZScsXG4gICAgICAgICAgICAndXAnLFxuICAgICAgICAgICAgJ2NhbmNlbCcsXG4gICAgICAgICAgICAndGFwJyxcbiAgICAgICAgICAgICdkb3VibGV0YXAnLFxuICAgICAgICAgICAgJ2hvbGQnXG4gICAgICAgIF0sXG5cbiAgICAgICAgZ2xvYmFsRXZlbnRzID0ge30sXG5cbiAgICAgICAgLy8gT3BlcmEgTW9iaWxlIG11c3QgYmUgaGFuZGxlZCBkaWZmZXJlbnRseVxuICAgICAgICBpc09wZXJhTW9iaWxlID0gbmF2aWdhdG9yLmFwcE5hbWUgPT0gJ09wZXJhJyAmJlxuICAgICAgICAgICAgc3VwcG9ydHNUb3VjaCAmJlxuICAgICAgICAgICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgnUHJlc3RvJyksXG5cbiAgICAgICAgLy8gc2Nyb2xsaW5nIGRvZXNuJ3QgY2hhbmdlIHRoZSByZXN1bHQgb2YgZ2V0Q2xpZW50UmVjdHMgb24gaU9TIDdcbiAgICAgICAgaXNJT1M3ID0gKC9pUChob25lfG9kfGFkKS8udGVzdChuYXZpZ2F0b3IucGxhdGZvcm0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgJiYgL09TIDdbXlxcZF0vLnRlc3QobmF2aWdhdG9yLmFwcFZlcnNpb24pKSxcblxuICAgICAgICAvLyBwcmVmaXggbWF0Y2hlc1NlbGVjdG9yXG4gICAgICAgIHByZWZpeGVkTWF0Y2hlc1NlbGVjdG9yID0gJ21hdGNoZXMnIGluIEVsZW1lbnQucHJvdG90eXBlP1xuICAgICAgICAgICAgICAgICdtYXRjaGVzJzogJ3dlYmtpdE1hdGNoZXNTZWxlY3RvcicgaW4gRWxlbWVudC5wcm90b3R5cGU/XG4gICAgICAgICAgICAgICAgICAgICd3ZWJraXRNYXRjaGVzU2VsZWN0b3InOiAnbW96TWF0Y2hlc1NlbGVjdG9yJyBpbiBFbGVtZW50LnByb3RvdHlwZT9cbiAgICAgICAgICAgICAgICAgICAgICAgICdtb3pNYXRjaGVzU2VsZWN0b3InOiAnb01hdGNoZXNTZWxlY3RvcicgaW4gRWxlbWVudC5wcm90b3R5cGU/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ29NYXRjaGVzU2VsZWN0b3InOiAnbXNNYXRjaGVzU2VsZWN0b3InLFxuXG4gICAgICAgIC8vIHdpbGwgYmUgcG9seWZpbGwgZnVuY3Rpb24gaWYgYnJvd3NlciBpcyBJRThcbiAgICAgICAgaWU4TWF0Y2hlc1NlbGVjdG9yLFxuXG4gICAgICAgIC8vIG5hdGl2ZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgb3IgcG9seWZpbGxcbiAgICAgICAgcmVxRnJhbWUgPSByZWFsV2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSxcbiAgICAgICAgY2FuY2VsRnJhbWUgPSByZWFsV2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lLFxuXG4gICAgICAgIC8vIEV2ZW50cyB3cmFwcGVyXG4gICAgICAgIGV2ZW50cyA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdXNlQXR0YWNoRXZlbnQgPSAoJ2F0dGFjaEV2ZW50JyBpbiB3aW5kb3cpICYmICEoJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbmRvdyksXG4gICAgICAgICAgICAgICAgYWRkRXZlbnQgICAgICAgPSB1c2VBdHRhY2hFdmVudD8gICdhdHRhY2hFdmVudCc6ICdhZGRFdmVudExpc3RlbmVyJyxcbiAgICAgICAgICAgICAgICByZW1vdmVFdmVudCAgICA9IHVzZUF0dGFjaEV2ZW50PyAgJ2RldGFjaEV2ZW50JzogJ3JlbW92ZUV2ZW50TGlzdGVuZXInLFxuICAgICAgICAgICAgICAgIG9uICAgICAgICAgICAgID0gdXNlQXR0YWNoRXZlbnQ/ICdvbic6ICcnLFxuXG4gICAgICAgICAgICAgICAgZWxlbWVudHMgICAgICAgICAgPSBbXSxcbiAgICAgICAgICAgICAgICB0YXJnZXRzICAgICAgICAgICA9IFtdLFxuICAgICAgICAgICAgICAgIGF0dGFjaGVkTGlzdGVuZXJzID0gW107XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGFkZCAoZWxlbWVudCwgdHlwZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudEluZGV4ID0gaW5kZXhPZihlbGVtZW50cywgZWxlbWVudCksXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldHNbZWxlbWVudEluZGV4XTtcblxuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50czoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlQ291bnQ6IDBcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50SW5kZXggPSBlbGVtZW50cy5wdXNoKGVsZW1lbnQpIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5wdXNoKHRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICAgICAgYXR0YWNoZWRMaXN0ZW5lcnMucHVzaCgodXNlQXR0YWNoRXZlbnQgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VwcGxpZWQ6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZWQgOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VDb3VudDogW11cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gOiBudWxsKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCF0YXJnZXQuZXZlbnRzW3R5cGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5ldmVudHNbdHlwZV0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnR5cGVDb3VudCsrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghY29udGFpbnModGFyZ2V0LmV2ZW50c1t0eXBlXSwgbGlzdGVuZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZUF0dGFjaEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gYXR0YWNoZWRMaXN0ZW5lcnNbZWxlbWVudEluZGV4XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lckluZGV4ID0gaW5kZXhPZihsaXN0ZW5lcnMuc3VwcGxpZWQsIGxpc3RlbmVyKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdyYXBwZWQgPSBsaXN0ZW5lcnMud3JhcHBlZFtsaXN0ZW5lckluZGV4XSB8fCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWV2ZW50LmltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXQgPSBldmVudC5zcmNFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0ID0gZWxlbWVudDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCA9IGV2ZW50LnByZXZlbnREZWZhdWx0IHx8IHByZXZlbnREZWY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbiA9IGV2ZW50LnN0b3BQcm9wYWdhdGlvbiB8fCBzdG9wUHJvcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uID0gZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIHx8IHN0b3BJbW1Qcm9wO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvbW91c2V8Y2xpY2svLnRlc3QoZXZlbnQudHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnBhZ2VYID0gZXZlbnQuY2xpZW50WCArIGdldFdpbmRvdyhlbGVtZW50KS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnBhZ2VZID0gZXZlbnQuY2xpZW50WSArIGdldFdpbmRvdyhlbGVtZW50KS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldCA9IGVsZW1lbnRbYWRkRXZlbnRdKG9uICsgdHlwZSwgd3JhcHBlZCwgQm9vbGVhbih1c2VDYXB0dXJlKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lckluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zdXBwbGllZC5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMud3JhcHBlZC5wdXNoKHdyYXBwZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy51c2VDb3VudC5wdXNoKDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnVzZUNvdW50W2xpc3RlbmVySW5kZXhdKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgPSBlbGVtZW50W2FkZEV2ZW50XSh0eXBlLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSB8fCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmV2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gcmVtb3ZlIChlbGVtZW50LCB0eXBlLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSkge1xuICAgICAgICAgICAgICAgIHZhciBpLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50SW5kZXggPSBpbmRleE9mKGVsZW1lbnRzLCBlbGVtZW50KSxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0c1tlbGVtZW50SW5kZXhdLFxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMsXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVySW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZWQgPSBsaXN0ZW5lcjtcblxuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0IHx8ICF0YXJnZXQuZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodXNlQXR0YWNoRXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzID0gYXR0YWNoZWRMaXN0ZW5lcnNbZWxlbWVudEluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJJbmRleCA9IGluZGV4T2YobGlzdGVuZXJzLnN1cHBsaWVkLCBsaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZWQgPSBsaXN0ZW5lcnMud3JhcHBlZFtsaXN0ZW5lckluZGV4XTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2FsbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh0eXBlIGluIHRhcmdldC5ldmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQuZXZlbnRzLmhhc093blByb3BlcnR5KHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlKGVsZW1lbnQsIHR5cGUsICdhbGwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldC5ldmVudHNbdHlwZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxlbiA9IHRhcmdldC5ldmVudHNbdHlwZV0ubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lciA9PT0gJ2FsbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZShlbGVtZW50LCB0eXBlLCB0YXJnZXQuZXZlbnRzW3R5cGVdW2ldLCBCb29sZWFuKHVzZUNhcHR1cmUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQuZXZlbnRzW3R5cGVdW2ldID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50W3JlbW92ZUV2ZW50XShvbiArIHR5cGUsIHdyYXBwZWQsIHVzZUNhcHR1cmUgfHwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQuZXZlbnRzW3R5cGVdLnNwbGljZShpLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXNlQXR0YWNoRXZlbnQgJiYgbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMudXNlQ291bnRbbGlzdGVuZXJJbmRleF0tLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lcnMudXNlQ291bnRbbGlzdGVuZXJJbmRleF0gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuc3VwcGxpZWQuc3BsaWNlKGxpc3RlbmVySW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy53cmFwcGVkLnNwbGljZShsaXN0ZW5lckluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMudXNlQ291bnQuc3BsaWNlKGxpc3RlbmVySW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldC5ldmVudHNbdHlwZV0gJiYgdGFyZ2V0LmV2ZW50c1t0eXBlXS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5ldmVudHNbdHlwZV0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnR5cGVDb3VudC0tO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCF0YXJnZXQudHlwZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHMuc3BsaWNlKGVsZW1lbnRJbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzLnNwbGljZShlbGVtZW50SW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2hlZExpc3RlbmVycy5zcGxpY2UoZWxlbWVudEluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHByZXZlbnREZWYgKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gc3RvcFByb3AgKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gc3RvcEltbVByb3AgKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYWRkOiBhZGQsXG4gICAgICAgICAgICAgICAgcmVtb3ZlOiByZW1vdmUsXG4gICAgICAgICAgICAgICAgdXNlQXR0YWNoRXZlbnQ6IHVzZUF0dGFjaEV2ZW50LFxuXG4gICAgICAgICAgICAgICAgX2VsZW1lbnRzOiBlbGVtZW50cyxcbiAgICAgICAgICAgICAgICBfdGFyZ2V0czogdGFyZ2V0cyxcbiAgICAgICAgICAgICAgICBfYXR0YWNoZWRMaXN0ZW5lcnM6IGF0dGFjaGVkTGlzdGVuZXJzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KCkpO1xuXG4gICAgZnVuY3Rpb24gYmxhbmsgKCkge31cblxuICAgIGZ1bmN0aW9uIGlzRWxlbWVudCAobykge1xuICAgICAgICBpZiAoIW8gfHwgKHR5cGVvZiBvICE9PSAnb2JqZWN0JykpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgdmFyIF93aW5kb3cgPSBnZXRXaW5kb3cobykgfHwgd2luZG93O1xuXG4gICAgICAgIHJldHVybiAoL29iamVjdHxmdW5jdGlvbi8udGVzdCh0eXBlb2YgX3dpbmRvdy5FbGVtZW50KVxuICAgICAgICAgICAgPyBvIGluc3RhbmNlb2YgX3dpbmRvdy5FbGVtZW50IC8vRE9NMlxuICAgICAgICAgICAgOiBvLm5vZGVUeXBlID09PSAxICYmIHR5cGVvZiBvLm5vZGVOYW1lID09PSBcInN0cmluZ1wiKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNXaW5kb3cgKHRoaW5nKSB7IHJldHVybiB0aGluZyA9PT0gd2luZG93IHx8ICEhKHRoaW5nICYmIHRoaW5nLldpbmRvdykgJiYgKHRoaW5nIGluc3RhbmNlb2YgdGhpbmcuV2luZG93KTsgfVxuICAgIGZ1bmN0aW9uIGlzRG9jRnJhZyAodGhpbmcpIHsgcmV0dXJuICEhdGhpbmcgJiYgdGhpbmcgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50OyB9XG4gICAgZnVuY3Rpb24gaXNBcnJheSAodGhpbmcpIHtcbiAgICAgICAgcmV0dXJuIGlzT2JqZWN0KHRoaW5nKVxuICAgICAgICAgICAgICAgICYmICh0eXBlb2YgdGhpbmcubGVuZ3RoICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgJiYgaXNGdW5jdGlvbih0aGluZy5zcGxpY2UpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc09iamVjdCAgICh0aGluZykgeyByZXR1cm4gISF0aGluZyAmJiAodHlwZW9mIHRoaW5nID09PSAnb2JqZWN0Jyk7IH1cbiAgICBmdW5jdGlvbiBpc0Z1bmN0aW9uICh0aGluZykgeyByZXR1cm4gdHlwZW9mIHRoaW5nID09PSAnZnVuY3Rpb24nOyB9XG4gICAgZnVuY3Rpb24gaXNOdW1iZXIgICAodGhpbmcpIHsgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gJ251bWJlcicgIDsgfVxuICAgIGZ1bmN0aW9uIGlzQm9vbCAgICAgKHRoaW5nKSB7IHJldHVybiB0eXBlb2YgdGhpbmcgPT09ICdib29sZWFuJyA7IH1cbiAgICBmdW5jdGlvbiBpc1N0cmluZyAgICh0aGluZykgeyByZXR1cm4gdHlwZW9mIHRoaW5nID09PSAnc3RyaW5nJyAgOyB9XG5cbiAgICBmdW5jdGlvbiB0cnlTZWxlY3RvciAodmFsdWUpIHtcbiAgICAgICAgaWYgKCFpc1N0cmluZyh2YWx1ZSkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgLy8gYW4gZXhjZXB0aW9uIHdpbGwgYmUgcmFpc2VkIGlmIGl0IGlzIGludmFsaWRcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2YWx1ZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dGVuZCAoZGVzdCwgc291cmNlKSB7XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gc291cmNlKSB7XG4gICAgICAgICAgICBkZXN0W3Byb3BdID0gc291cmNlW3Byb3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZXN0O1xuICAgIH1cblxuICAgIHZhciBwcmVmaXhlZFByb3BSRXMgPSB7XG4gICAgICB3ZWJraXQ6IC8oTW92ZW1lbnRbWFldfFJhZGl1c1tYWV18Um90YXRpb25BbmdsZXxGb3JjZSkkL1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBwb2ludGVyRXh0ZW5kIChkZXN0LCBzb3VyY2UpIHtcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBzb3VyY2UpIHtcbiAgICAgICAgICB2YXIgZGVwcmVjYXRlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgLy8gc2tpcCBkZXByZWNhdGVkIHByZWZpeGVkIHByb3BlcnRpZXNcbiAgICAgICAgICBmb3IgKHZhciB2ZW5kb3IgaW4gcHJlZml4ZWRQcm9wUkVzKSB7XG4gICAgICAgICAgICBpZiAocHJvcC5pbmRleE9mKHZlbmRvcikgPT09IDAgJiYgcHJlZml4ZWRQcm9wUkVzW3ZlbmRvcl0udGVzdChwcm9wKSkge1xuICAgICAgICAgICAgICBkZXByZWNhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFkZXByZWNhdGVkKSB7XG4gICAgICAgICAgICBkZXN0W3Byb3BdID0gc291cmNlW3Byb3BdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVzdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb3B5Q29vcmRzIChkZXN0LCBzcmMpIHtcbiAgICAgICAgZGVzdC5wYWdlID0gZGVzdC5wYWdlIHx8IHt9O1xuICAgICAgICBkZXN0LnBhZ2UueCA9IHNyYy5wYWdlLng7XG4gICAgICAgIGRlc3QucGFnZS55ID0gc3JjLnBhZ2UueTtcblxuICAgICAgICBkZXN0LmNsaWVudCA9IGRlc3QuY2xpZW50IHx8IHt9O1xuICAgICAgICBkZXN0LmNsaWVudC54ID0gc3JjLmNsaWVudC54O1xuICAgICAgICBkZXN0LmNsaWVudC55ID0gc3JjLmNsaWVudC55O1xuXG4gICAgICAgIGRlc3QudGltZVN0YW1wID0gc3JjLnRpbWVTdGFtcDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRFdmVudFhZICh0YXJnZXRPYmosIHBvaW50ZXJzLCBpbnRlcmFjdGlvbikge1xuICAgICAgICB2YXIgcG9pbnRlciA9IChwb2ludGVycy5sZW5ndGggPiAxXG4gICAgICAgICAgICAgICAgICAgICAgID8gcG9pbnRlckF2ZXJhZ2UocG9pbnRlcnMpXG4gICAgICAgICAgICAgICAgICAgICAgIDogcG9pbnRlcnNbMF0pO1xuXG4gICAgICAgIGdldFBhZ2VYWShwb2ludGVyLCB0bXBYWSwgaW50ZXJhY3Rpb24pO1xuICAgICAgICB0YXJnZXRPYmoucGFnZS54ID0gdG1wWFkueDtcbiAgICAgICAgdGFyZ2V0T2JqLnBhZ2UueSA9IHRtcFhZLnk7XG5cbiAgICAgICAgZ2V0Q2xpZW50WFkocG9pbnRlciwgdG1wWFksIGludGVyYWN0aW9uKTtcbiAgICAgICAgdGFyZ2V0T2JqLmNsaWVudC54ID0gdG1wWFkueDtcbiAgICAgICAgdGFyZ2V0T2JqLmNsaWVudC55ID0gdG1wWFkueTtcblxuICAgICAgICB0YXJnZXRPYmoudGltZVN0YW1wID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0RXZlbnREZWx0YXMgKHRhcmdldE9iaiwgcHJldiwgY3VyKSB7XG4gICAgICAgIHRhcmdldE9iai5wYWdlLnggICAgID0gY3VyLnBhZ2UueCAgICAgIC0gcHJldi5wYWdlLng7XG4gICAgICAgIHRhcmdldE9iai5wYWdlLnkgICAgID0gY3VyLnBhZ2UueSAgICAgIC0gcHJldi5wYWdlLnk7XG4gICAgICAgIHRhcmdldE9iai5jbGllbnQueCAgID0gY3VyLmNsaWVudC54ICAgIC0gcHJldi5jbGllbnQueDtcbiAgICAgICAgdGFyZ2V0T2JqLmNsaWVudC55ICAgPSBjdXIuY2xpZW50LnkgICAgLSBwcmV2LmNsaWVudC55O1xuICAgICAgICB0YXJnZXRPYmoudGltZVN0YW1wID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBwcmV2LnRpbWVTdGFtcDtcblxuICAgICAgICAvLyBzZXQgcG9pbnRlciB2ZWxvY2l0eVxuICAgICAgICB2YXIgZHQgPSBNYXRoLm1heCh0YXJnZXRPYmoudGltZVN0YW1wIC8gMTAwMCwgMC4wMDEpO1xuICAgICAgICB0YXJnZXRPYmoucGFnZS5zcGVlZCAgID0gaHlwb3QodGFyZ2V0T2JqLnBhZ2UueCwgdGFyZ2V0T2JqLnBhZ2UueSkgLyBkdDtcbiAgICAgICAgdGFyZ2V0T2JqLnBhZ2UudnggICAgICA9IHRhcmdldE9iai5wYWdlLnggLyBkdDtcbiAgICAgICAgdGFyZ2V0T2JqLnBhZ2UudnkgICAgICA9IHRhcmdldE9iai5wYWdlLnkgLyBkdDtcblxuICAgICAgICB0YXJnZXRPYmouY2xpZW50LnNwZWVkID0gaHlwb3QodGFyZ2V0T2JqLmNsaWVudC54LCB0YXJnZXRPYmoucGFnZS55KSAvIGR0O1xuICAgICAgICB0YXJnZXRPYmouY2xpZW50LnZ4ICAgID0gdGFyZ2V0T2JqLmNsaWVudC54IC8gZHQ7XG4gICAgICAgIHRhcmdldE9iai5jbGllbnQudnkgICAgPSB0YXJnZXRPYmouY2xpZW50LnkgLyBkdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc05hdGl2ZVBvaW50ZXIgKHBvaW50ZXIpIHtcbiAgICAgICAgcmV0dXJuIChwb2ludGVyIGluc3RhbmNlb2Ygd2luZG93LkV2ZW50XG4gICAgICAgICAgICB8fCAoc3VwcG9ydHNUb3VjaCAmJiB3aW5kb3cuVG91Y2ggJiYgcG9pbnRlciBpbnN0YW5jZW9mIHdpbmRvdy5Ub3VjaCkpO1xuICAgIH1cblxuICAgIC8vIEdldCBzcGVjaWZpZWQgWC9ZIGNvb3JkcyBmb3IgbW91c2Ugb3IgZXZlbnQudG91Y2hlc1swXVxuICAgIGZ1bmN0aW9uIGdldFhZICh0eXBlLCBwb2ludGVyLCB4eSkge1xuICAgICAgICB4eSA9IHh5IHx8IHt9O1xuICAgICAgICB0eXBlID0gdHlwZSB8fCAncGFnZSc7XG5cbiAgICAgICAgeHkueCA9IHBvaW50ZXJbdHlwZSArICdYJ107XG4gICAgICAgIHh5LnkgPSBwb2ludGVyW3R5cGUgKyAnWSddO1xuXG4gICAgICAgIHJldHVybiB4eTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQYWdlWFkgKHBvaW50ZXIsIHBhZ2UpIHtcbiAgICAgICAgcGFnZSA9IHBhZ2UgfHwge307XG5cbiAgICAgICAgLy8gT3BlcmEgTW9iaWxlIGhhbmRsZXMgdGhlIHZpZXdwb3J0IGFuZCBzY3JvbGxpbmcgb2RkbHlcbiAgICAgICAgaWYgKGlzT3BlcmFNb2JpbGUgJiYgaXNOYXRpdmVQb2ludGVyKHBvaW50ZXIpKSB7XG4gICAgICAgICAgICBnZXRYWSgnc2NyZWVuJywgcG9pbnRlciwgcGFnZSk7XG5cbiAgICAgICAgICAgIHBhZ2UueCArPSB3aW5kb3cuc2Nyb2xsWDtcbiAgICAgICAgICAgIHBhZ2UueSArPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGdldFhZKCdwYWdlJywgcG9pbnRlciwgcGFnZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFnZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDbGllbnRYWSAocG9pbnRlciwgY2xpZW50KSB7XG4gICAgICAgIGNsaWVudCA9IGNsaWVudCB8fCB7fTtcblxuICAgICAgICBpZiAoaXNPcGVyYU1vYmlsZSAmJiBpc05hdGl2ZVBvaW50ZXIocG9pbnRlcikpIHtcbiAgICAgICAgICAgIC8vIE9wZXJhIE1vYmlsZSBoYW5kbGVzIHRoZSB2aWV3cG9ydCBhbmQgc2Nyb2xsaW5nIG9kZGx5XG4gICAgICAgICAgICBnZXRYWSgnc2NyZWVuJywgcG9pbnRlciwgY2xpZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBnZXRYWSgnY2xpZW50JywgcG9pbnRlciwgY2xpZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjbGllbnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2Nyb2xsWFkgKHdpbikge1xuICAgICAgICB3aW4gPSB3aW4gfHwgd2luZG93O1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogd2luLnNjcm9sbFggfHwgd2luLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0LFxuICAgICAgICAgICAgeTogd2luLnNjcm9sbFkgfHwgd2luLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3BcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQb2ludGVySWQgKHBvaW50ZXIpIHtcbiAgICAgICAgcmV0dXJuIGlzTnVtYmVyKHBvaW50ZXIucG9pbnRlcklkKT8gcG9pbnRlci5wb2ludGVySWQgOiBwb2ludGVyLmlkZW50aWZpZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QWN0dWFsRWxlbWVudCAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gKGVsZW1lbnQgaW5zdGFuY2VvZiBTVkdFbGVtZW50SW5zdGFuY2VcbiAgICAgICAgICAgID8gZWxlbWVudC5jb3JyZXNwb25kaW5nVXNlRWxlbWVudFxuICAgICAgICAgICAgOiBlbGVtZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRXaW5kb3cgKG5vZGUpIHtcbiAgICAgICAgaWYgKGlzV2luZG93KG5vZGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByb290Tm9kZSA9IChub2RlLm93bmVyRG9jdW1lbnQgfHwgbm9kZSk7XG5cbiAgICAgICAgcmV0dXJuIHJvb3ROb2RlLmRlZmF1bHRWaWV3IHx8IHJvb3ROb2RlLnBhcmVudFdpbmRvdyB8fCB3aW5kb3c7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RWxlbWVudENsaWVudFJlY3QgKGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGNsaWVudFJlY3QgPSAoZWxlbWVudCBpbnN0YW5jZW9mIFNWR0VsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGVsZW1lbnQuZ2V0Q2xpZW50UmVjdHMoKVswXSk7XG5cbiAgICAgICAgcmV0dXJuIGNsaWVudFJlY3QgJiYge1xuICAgICAgICAgICAgbGVmdCAgOiBjbGllbnRSZWN0LmxlZnQsXG4gICAgICAgICAgICByaWdodCA6IGNsaWVudFJlY3QucmlnaHQsXG4gICAgICAgICAgICB0b3AgICA6IGNsaWVudFJlY3QudG9wLFxuICAgICAgICAgICAgYm90dG9tOiBjbGllbnRSZWN0LmJvdHRvbSxcbiAgICAgICAgICAgIHdpZHRoIDogY2xpZW50UmVjdC53aWR0aCB8fCBjbGllbnRSZWN0LnJpZ2h0IC0gY2xpZW50UmVjdC5sZWZ0LFxuICAgICAgICAgICAgaGVpZ2h0OiBjbGllbnRSZWN0LmhlaWdodCB8fCBjbGllbnRSZWN0LmJvdHRvbSAtIGNsaWVudFJlY3QudG9wXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RWxlbWVudFJlY3QgKGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGNsaWVudFJlY3QgPSBnZXRFbGVtZW50Q2xpZW50UmVjdChlbGVtZW50KTtcblxuICAgICAgICBpZiAoIWlzSU9TNyAmJiBjbGllbnRSZWN0KSB7XG4gICAgICAgICAgICB2YXIgc2Nyb2xsID0gZ2V0U2Nyb2xsWFkoZ2V0V2luZG93KGVsZW1lbnQpKTtcblxuICAgICAgICAgICAgY2xpZW50UmVjdC5sZWZ0ICAgKz0gc2Nyb2xsLng7XG4gICAgICAgICAgICBjbGllbnRSZWN0LnJpZ2h0ICArPSBzY3JvbGwueDtcbiAgICAgICAgICAgIGNsaWVudFJlY3QudG9wICAgICs9IHNjcm9sbC55O1xuICAgICAgICAgICAgY2xpZW50UmVjdC5ib3R0b20gKz0gc2Nyb2xsLnk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2xpZW50UmVjdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUb3VjaFBhaXIgKGV2ZW50KSB7XG4gICAgICAgIHZhciB0b3VjaGVzID0gW107XG5cbiAgICAgICAgLy8gYXJyYXkgb2YgdG91Y2hlcyBpcyBzdXBwbGllZFxuICAgICAgICBpZiAoaXNBcnJheShldmVudCkpIHtcbiAgICAgICAgICAgIHRvdWNoZXNbMF0gPSBldmVudFswXTtcbiAgICAgICAgICAgIHRvdWNoZXNbMV0gPSBldmVudFsxXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhbiBldmVudFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSAndG91Y2hlbmQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvdWNoZXNbMF0gPSBldmVudC50b3VjaGVzWzBdO1xuICAgICAgICAgICAgICAgICAgICB0b3VjaGVzWzFdID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvdWNoZXNbMF0gPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hlc1sxXSA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvdWNoZXNbMF0gPSBldmVudC50b3VjaGVzWzBdO1xuICAgICAgICAgICAgICAgIHRvdWNoZXNbMV0gPSBldmVudC50b3VjaGVzWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvdWNoZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcG9pbnRlckF2ZXJhZ2UgKHBvaW50ZXJzKSB7XG4gICAgICAgIHZhciBhdmVyYWdlID0ge1xuICAgICAgICAgICAgcGFnZVggIDogMCxcbiAgICAgICAgICAgIHBhZ2VZICA6IDAsXG4gICAgICAgICAgICBjbGllbnRYOiAwLFxuICAgICAgICAgICAgY2xpZW50WTogMCxcbiAgICAgICAgICAgIHNjcmVlblg6IDAsXG4gICAgICAgICAgICBzY3JlZW5ZOiAwXG4gICAgICAgIH07XG4gICAgICAgIHZhciBwcm9wO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9pbnRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAocHJvcCBpbiBhdmVyYWdlKSB7XG4gICAgICAgICAgICAgICAgYXZlcmFnZVtwcm9wXSArPSBwb2ludGVyc1tpXVtwcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKHByb3AgaW4gYXZlcmFnZSkge1xuICAgICAgICAgICAgYXZlcmFnZVtwcm9wXSAvPSBwb2ludGVycy5sZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXZlcmFnZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b3VjaEJCb3ggKGV2ZW50KSB7XG4gICAgICAgIGlmICghZXZlbnQubGVuZ3RoICYmICEoZXZlbnQudG91Y2hlcyAmJiBldmVudC50b3VjaGVzLmxlbmd0aCA+IDEpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdG91Y2hlcyA9IGdldFRvdWNoUGFpcihldmVudCksXG4gICAgICAgICAgICBtaW5YID0gTWF0aC5taW4odG91Y2hlc1swXS5wYWdlWCwgdG91Y2hlc1sxXS5wYWdlWCksXG4gICAgICAgICAgICBtaW5ZID0gTWF0aC5taW4odG91Y2hlc1swXS5wYWdlWSwgdG91Y2hlc1sxXS5wYWdlWSksXG4gICAgICAgICAgICBtYXhYID0gTWF0aC5tYXgodG91Y2hlc1swXS5wYWdlWCwgdG91Y2hlc1sxXS5wYWdlWCksXG4gICAgICAgICAgICBtYXhZID0gTWF0aC5tYXgodG91Y2hlc1swXS5wYWdlWSwgdG91Y2hlc1sxXS5wYWdlWSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IG1pblgsXG4gICAgICAgICAgICB5OiBtaW5ZLFxuICAgICAgICAgICAgbGVmdDogbWluWCxcbiAgICAgICAgICAgIHRvcDogbWluWSxcbiAgICAgICAgICAgIHdpZHRoOiBtYXhYIC0gbWluWCxcbiAgICAgICAgICAgIGhlaWdodDogbWF4WSAtIG1pbllcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b3VjaERpc3RhbmNlIChldmVudCwgZGVsdGFTb3VyY2UpIHtcbiAgICAgICAgZGVsdGFTb3VyY2UgPSBkZWx0YVNvdXJjZSB8fCBkZWZhdWx0T3B0aW9ucy5kZWx0YVNvdXJjZTtcblxuICAgICAgICB2YXIgc291cmNlWCA9IGRlbHRhU291cmNlICsgJ1gnLFxuICAgICAgICAgICAgc291cmNlWSA9IGRlbHRhU291cmNlICsgJ1knLFxuICAgICAgICAgICAgdG91Y2hlcyA9IGdldFRvdWNoUGFpcihldmVudCk7XG5cblxuICAgICAgICB2YXIgZHggPSB0b3VjaGVzWzBdW3NvdXJjZVhdIC0gdG91Y2hlc1sxXVtzb3VyY2VYXSxcbiAgICAgICAgICAgIGR5ID0gdG91Y2hlc1swXVtzb3VyY2VZXSAtIHRvdWNoZXNbMV1bc291cmNlWV07XG5cbiAgICAgICAgcmV0dXJuIGh5cG90KGR4LCBkeSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG91Y2hBbmdsZSAoZXZlbnQsIHByZXZBbmdsZSwgZGVsdGFTb3VyY2UpIHtcbiAgICAgICAgZGVsdGFTb3VyY2UgPSBkZWx0YVNvdXJjZSB8fCBkZWZhdWx0T3B0aW9ucy5kZWx0YVNvdXJjZTtcblxuICAgICAgICB2YXIgc291cmNlWCA9IGRlbHRhU291cmNlICsgJ1gnLFxuICAgICAgICAgICAgc291cmNlWSA9IGRlbHRhU291cmNlICsgJ1knLFxuICAgICAgICAgICAgdG91Y2hlcyA9IGdldFRvdWNoUGFpcihldmVudCksXG4gICAgICAgICAgICBkeCA9IHRvdWNoZXNbMF1bc291cmNlWF0gLSB0b3VjaGVzWzFdW3NvdXJjZVhdLFxuICAgICAgICAgICAgZHkgPSB0b3VjaGVzWzBdW3NvdXJjZVldIC0gdG91Y2hlc1sxXVtzb3VyY2VZXSxcbiAgICAgICAgICAgIGFuZ2xlID0gMTgwICogTWF0aC5hdGFuKGR5IC8gZHgpIC8gTWF0aC5QSTtcblxuICAgICAgICBpZiAoaXNOdW1iZXIocHJldkFuZ2xlKSkge1xuICAgICAgICAgICAgdmFyIGRyID0gYW5nbGUgLSBwcmV2QW5nbGUsXG4gICAgICAgICAgICAgICAgZHJDbGFtcGVkID0gZHIgJSAzNjA7XG5cbiAgICAgICAgICAgIGlmIChkckNsYW1wZWQgPiAzMTUpIHtcbiAgICAgICAgICAgICAgICBhbmdsZSAtPSAzNjAgKyAoYW5nbGUgLyAzNjApfDAgKiAzNjA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkckNsYW1wZWQgPiAxMzUpIHtcbiAgICAgICAgICAgICAgICBhbmdsZSAtPSAxODAgKyAoYW5nbGUgLyAzNjApfDAgKiAzNjA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkckNsYW1wZWQgPCAtMzE1KSB7XG4gICAgICAgICAgICAgICAgYW5nbGUgKz0gMzYwICsgKGFuZ2xlIC8gMzYwKXwwICogMzYwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZHJDbGFtcGVkIDwgLTEzNSkge1xuICAgICAgICAgICAgICAgIGFuZ2xlICs9IDE4MCArIChhbmdsZSAvIDM2MCl8MCAqIDM2MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAgYW5nbGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0T3JpZ2luWFkgKGludGVyYWN0YWJsZSwgZWxlbWVudCkge1xuICAgICAgICB2YXIgb3JpZ2luID0gaW50ZXJhY3RhYmxlXG4gICAgICAgICAgICAgICAgPyBpbnRlcmFjdGFibGUub3B0aW9ucy5vcmlnaW5cbiAgICAgICAgICAgICAgICA6IGRlZmF1bHRPcHRpb25zLm9yaWdpbjtcblxuICAgICAgICBpZiAob3JpZ2luID09PSAncGFyZW50Jykge1xuICAgICAgICAgICAgb3JpZ2luID0gcGFyZW50RWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvcmlnaW4gPT09ICdzZWxmJykge1xuICAgICAgICAgICAgb3JpZ2luID0gaW50ZXJhY3RhYmxlLmdldFJlY3QoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHJ5U2VsZWN0b3Iob3JpZ2luKSkge1xuICAgICAgICAgICAgb3JpZ2luID0gY2xvc2VzdChlbGVtZW50LCBvcmlnaW4pIHx8IHsgeDogMCwgeTogMCB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ob3JpZ2luKSkge1xuICAgICAgICAgICAgb3JpZ2luID0gb3JpZ2luKGludGVyYWN0YWJsZSAmJiBlbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0VsZW1lbnQob3JpZ2luKSkgIHtcbiAgICAgICAgICAgIG9yaWdpbiA9IGdldEVsZW1lbnRSZWN0KG9yaWdpbik7XG4gICAgICAgIH1cblxuICAgICAgICBvcmlnaW4ueCA9ICgneCcgaW4gb3JpZ2luKT8gb3JpZ2luLnggOiBvcmlnaW4ubGVmdDtcbiAgICAgICAgb3JpZ2luLnkgPSAoJ3knIGluIG9yaWdpbik/IG9yaWdpbi55IDogb3JpZ2luLnRvcDtcblxuICAgICAgICByZXR1cm4gb3JpZ2luO1xuICAgIH1cblxuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzU2MzQ1MjgvMjI4MDg4OFxuICAgIGZ1bmN0aW9uIF9nZXRRQmV6aWVyVmFsdWUodCwgcDEsIHAyLCBwMykge1xuICAgICAgICB2YXIgaVQgPSAxIC0gdDtcbiAgICAgICAgcmV0dXJuIGlUICogaVQgKiBwMSArIDIgKiBpVCAqIHQgKiBwMiArIHQgKiB0ICogcDM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UXVhZHJhdGljQ3VydmVQb2ludChzdGFydFgsIHN0YXJ0WSwgY3BYLCBjcFksIGVuZFgsIGVuZFksIHBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiAgX2dldFFCZXppZXJWYWx1ZShwb3NpdGlvbiwgc3RhcnRYLCBjcFgsIGVuZFgpLFxuICAgICAgICAgICAgeTogIF9nZXRRQmV6aWVyVmFsdWUocG9zaXRpb24sIHN0YXJ0WSwgY3BZLCBlbmRZKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIGh0dHA6Ly9naXptYS5jb20vZWFzaW5nL1xuICAgIGZ1bmN0aW9uIGVhc2VPdXRRdWFkICh0LCBiLCBjLCBkKSB7XG4gICAgICAgIHQgLz0gZDtcbiAgICAgICAgcmV0dXJuIC1jICogdCoodC0yKSArIGI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbm9kZUNvbnRhaW5zIChwYXJlbnQsIGNoaWxkKSB7XG4gICAgICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgICAgICAgaWYgKGNoaWxkID09PSBwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2hpbGQgPSBjaGlsZC5wYXJlbnROb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3Nlc3QgKGNoaWxkLCBzZWxlY3Rvcikge1xuICAgICAgICB2YXIgcGFyZW50ID0gcGFyZW50RWxlbWVudChjaGlsZCk7XG5cbiAgICAgICAgd2hpbGUgKGlzRWxlbWVudChwYXJlbnQpKSB7XG4gICAgICAgICAgICBpZiAobWF0Y2hlc1NlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IpKSB7IHJldHVybiBwYXJlbnQ7IH1cblxuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50RWxlbWVudChwYXJlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyZW50RWxlbWVudCAobm9kZSkge1xuICAgICAgICB2YXIgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xuXG4gICAgICAgIGlmIChpc0RvY0ZyYWcocGFyZW50KSkge1xuICAgICAgICAgICAgLy8gc2tpcCBwYXN0ICNzaGFkby1yb290IGZyYWdtZW50c1xuICAgICAgICAgICAgd2hpbGUgKChwYXJlbnQgPSBwYXJlbnQuaG9zdCkgJiYgaXNEb2NGcmFnKHBhcmVudCkpIHt9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluQ29udGV4dCAoaW50ZXJhY3RhYmxlLCBlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBpbnRlcmFjdGFibGUuX2NvbnRleHQgPT09IGVsZW1lbnQub3duZXJEb2N1bWVudFxuICAgICAgICAgICAgICAgIHx8IG5vZGVDb250YWlucyhpbnRlcmFjdGFibGUuX2NvbnRleHQsIGVsZW1lbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRlc3RJZ25vcmUgKGludGVyYWN0YWJsZSwgaW50ZXJhY3RhYmxlRWxlbWVudCwgZWxlbWVudCkge1xuICAgICAgICB2YXIgaWdub3JlRnJvbSA9IGludGVyYWN0YWJsZS5vcHRpb25zLmlnbm9yZUZyb207XG5cbiAgICAgICAgaWYgKCFpZ25vcmVGcm9tIHx8ICFpc0VsZW1lbnQoZWxlbWVudCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgaWYgKGlzU3RyaW5nKGlnbm9yZUZyb20pKSB7XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hlc1VwVG8oZWxlbWVudCwgaWdub3JlRnJvbSwgaW50ZXJhY3RhYmxlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNFbGVtZW50KGlnbm9yZUZyb20pKSB7XG4gICAgICAgICAgICByZXR1cm4gbm9kZUNvbnRhaW5zKGlnbm9yZUZyb20sIGVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRlc3RBbGxvdyAoaW50ZXJhY3RhYmxlLCBpbnRlcmFjdGFibGVFbGVtZW50LCBlbGVtZW50KSB7XG4gICAgICAgIHZhciBhbGxvd0Zyb20gPSBpbnRlcmFjdGFibGUub3B0aW9ucy5hbGxvd0Zyb207XG5cbiAgICAgICAgaWYgKCFhbGxvd0Zyb20pIHsgcmV0dXJuIHRydWU7IH1cblxuICAgICAgICBpZiAoIWlzRWxlbWVudChlbGVtZW50KSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICBpZiAoaXNTdHJpbmcoYWxsb3dGcm9tKSkge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXNVcFRvKGVsZW1lbnQsIGFsbG93RnJvbSwgaW50ZXJhY3RhYmxlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNFbGVtZW50KGFsbG93RnJvbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBub2RlQ29udGFpbnMoYWxsb3dGcm9tLCBlbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja0F4aXMgKGF4aXMsIGludGVyYWN0YWJsZSkge1xuICAgICAgICBpZiAoIWludGVyYWN0YWJsZSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICB2YXIgdGhpc0F4aXMgPSBpbnRlcmFjdGFibGUub3B0aW9ucy5kcmFnLmF4aXM7XG5cbiAgICAgICAgcmV0dXJuIChheGlzID09PSAneHknIHx8IHRoaXNBeGlzID09PSAneHknIHx8IHRoaXNBeGlzID09PSBheGlzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1NuYXAgKGludGVyYWN0YWJsZSwgYWN0aW9uKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gaW50ZXJhY3RhYmxlLm9wdGlvbnM7XG5cbiAgICAgICAgaWYgKC9ecmVzaXplLy50ZXN0KGFjdGlvbikpIHtcbiAgICAgICAgICAgIGFjdGlvbiA9ICdyZXNpemUnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wdGlvbnNbYWN0aW9uXS5zbmFwICYmIG9wdGlvbnNbYWN0aW9uXS5zbmFwLmVuYWJsZWQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tSZXN0cmljdCAoaW50ZXJhY3RhYmxlLCBhY3Rpb24pIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBpbnRlcmFjdGFibGUub3B0aW9ucztcblxuICAgICAgICBpZiAoL15yZXNpemUvLnRlc3QoYWN0aW9uKSkge1xuICAgICAgICAgICAgYWN0aW9uID0gJ3Jlc2l6ZSc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gIG9wdGlvbnNbYWN0aW9uXS5yZXN0cmljdCAmJiBvcHRpb25zW2FjdGlvbl0ucmVzdHJpY3QuZW5hYmxlZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja0F1dG9TY3JvbGwgKGludGVyYWN0YWJsZSwgYWN0aW9uKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gaW50ZXJhY3RhYmxlLm9wdGlvbnM7XG5cbiAgICAgICAgaWYgKC9ecmVzaXplLy50ZXN0KGFjdGlvbikpIHtcbiAgICAgICAgICAgIGFjdGlvbiA9ICdyZXNpemUnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICBvcHRpb25zW2FjdGlvbl0uYXV0b1Njcm9sbCAmJiBvcHRpb25zW2FjdGlvbl0uYXV0b1Njcm9sbC5lbmFibGVkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdpdGhpbkludGVyYWN0aW9uTGltaXQgKGludGVyYWN0YWJsZSwgZWxlbWVudCwgYWN0aW9uKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gaW50ZXJhY3RhYmxlLm9wdGlvbnMsXG4gICAgICAgICAgICBtYXhBY3Rpb25zID0gb3B0aW9uc1thY3Rpb24ubmFtZV0ubWF4LFxuICAgICAgICAgICAgbWF4UGVyRWxlbWVudCA9IG9wdGlvbnNbYWN0aW9uLm5hbWVdLm1heFBlckVsZW1lbnQsXG4gICAgICAgICAgICBhY3RpdmVJbnRlcmFjdGlvbnMgPSAwLFxuICAgICAgICAgICAgdGFyZ2V0Q291bnQgPSAwLFxuICAgICAgICAgICAgdGFyZ2V0RWxlbWVudENvdW50ID0gMDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gaW50ZXJhY3Rpb25zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgaW50ZXJhY3Rpb24gPSBpbnRlcmFjdGlvbnNbaV0sXG4gICAgICAgICAgICAgICAgb3RoZXJBY3Rpb24gPSBpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lLFxuICAgICAgICAgICAgICAgIGFjdGl2ZSA9IGludGVyYWN0aW9uLmludGVyYWN0aW5nKCk7XG5cbiAgICAgICAgICAgIGlmICghYWN0aXZlKSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgICAgICAgIGFjdGl2ZUludGVyYWN0aW9ucysrO1xuXG4gICAgICAgICAgICBpZiAoYWN0aXZlSW50ZXJhY3Rpb25zID49IG1heEludGVyYWN0aW9ucykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGludGVyYWN0aW9uLnRhcmdldCAhPT0gaW50ZXJhY3RhYmxlKSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgICAgICAgIHRhcmdldENvdW50ICs9IChvdGhlckFjdGlvbiA9PT0gYWN0aW9uLm5hbWUpfDA7XG5cbiAgICAgICAgICAgIGlmICh0YXJnZXRDb3VudCA+PSBtYXhBY3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaW50ZXJhY3Rpb24uZWxlbWVudCA9PT0gZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRhcmdldEVsZW1lbnRDb3VudCsrO1xuXG4gICAgICAgICAgICAgICAgaWYgKG90aGVyQWN0aW9uICE9PSBhY3Rpb24ubmFtZSB8fCB0YXJnZXRFbGVtZW50Q291bnQgPj0gbWF4UGVyRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1heEludGVyYWN0aW9ucyA+IDA7XG4gICAgfVxuXG4gICAgLy8gVGVzdCBmb3IgdGhlIGVsZW1lbnQgdGhhdCdzIFwiYWJvdmVcIiBhbGwgb3RoZXIgcXVhbGlmaWVyc1xuICAgIGZ1bmN0aW9uIGluZGV4T2ZEZWVwZXN0RWxlbWVudCAoZWxlbWVudHMpIHtcbiAgICAgICAgdmFyIGRyb3B6b25lLFxuICAgICAgICAgICAgZGVlcGVzdFpvbmUgPSBlbGVtZW50c1swXSxcbiAgICAgICAgICAgIGluZGV4ID0gZGVlcGVzdFpvbmU/IDA6IC0xLFxuICAgICAgICAgICAgcGFyZW50LFxuICAgICAgICAgICAgZGVlcGVzdFpvbmVQYXJlbnRzID0gW10sXG4gICAgICAgICAgICBkcm9wem9uZVBhcmVudHMgPSBbXSxcbiAgICAgICAgICAgIGNoaWxkLFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIG47XG5cbiAgICAgICAgZm9yIChpID0gMTsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkcm9wem9uZSA9IGVsZW1lbnRzW2ldO1xuXG4gICAgICAgICAgICAvLyBhbiBlbGVtZW50IG1pZ2h0IGJlbG9uZyB0byBtdWx0aXBsZSBzZWxlY3RvciBkcm9wem9uZXNcbiAgICAgICAgICAgIGlmICghZHJvcHpvbmUgfHwgZHJvcHpvbmUgPT09IGRlZXBlc3Rab25lKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZGVlcGVzdFpvbmUpIHtcbiAgICAgICAgICAgICAgICBkZWVwZXN0Wm9uZSA9IGRyb3B6b25lO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGRlZXBlc3Qgb3IgY3VycmVudCBhcmUgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IG9yIGRvY3VtZW50LnJvb3RFbGVtZW50XG4gICAgICAgICAgICAvLyAtIGlmIHRoZSBjdXJyZW50IGRyb3B6b25lIGlzLCBkbyBub3RoaW5nIGFuZCBjb250aW51ZVxuICAgICAgICAgICAgaWYgKGRyb3B6b25lLnBhcmVudE5vZGUgPT09IGRyb3B6b25lLm93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIC0gaWYgZGVlcGVzdCBpcywgdXBkYXRlIHdpdGggdGhlIGN1cnJlbnQgZHJvcHpvbmUgYW5kIGNvbnRpbnVlIHRvIG5leHRcbiAgICAgICAgICAgIGVsc2UgaWYgKGRlZXBlc3Rab25lLnBhcmVudE5vZGUgPT09IGRyb3B6b25lLm93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgICBkZWVwZXN0Wm9uZSA9IGRyb3B6b25lO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFkZWVwZXN0Wm9uZVBhcmVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50ID0gZGVlcGVzdFpvbmU7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHBhcmVudC5wYXJlbnROb2RlICYmIHBhcmVudC5wYXJlbnROb2RlICE9PSBwYXJlbnQub3duZXJEb2N1bWVudCkge1xuICAgICAgICAgICAgICAgICAgICBkZWVwZXN0Wm9uZVBhcmVudHMudW5zaGlmdChwYXJlbnQpO1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHRoaXMgZWxlbWVudCBpcyBhbiBzdmcgZWxlbWVudCBhbmQgdGhlIGN1cnJlbnQgZGVlcGVzdCBpc1xuICAgICAgICAgICAgLy8gYW4gSFRNTEVsZW1lbnRcbiAgICAgICAgICAgIGlmIChkZWVwZXN0Wm9uZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICAgICAgICAgJiYgZHJvcHpvbmUgaW5zdGFuY2VvZiBTVkdFbGVtZW50XG4gICAgICAgICAgICAgICAgJiYgIShkcm9wem9uZSBpbnN0YW5jZW9mIFNWR1NWR0VsZW1lbnQpKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZHJvcHpvbmUgPT09IGRlZXBlc3Rab25lLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcGFyZW50ID0gZHJvcHpvbmUub3duZXJTVkdFbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFyZW50ID0gZHJvcHpvbmU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRyb3B6b25lUGFyZW50cyA9IFtdO1xuXG4gICAgICAgICAgICB3aGlsZSAocGFyZW50LnBhcmVudE5vZGUgIT09IHBhcmVudC5vd25lckRvY3VtZW50KSB7XG4gICAgICAgICAgICAgICAgZHJvcHpvbmVQYXJlbnRzLnVuc2hpZnQocGFyZW50KTtcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbiA9IDA7XG5cbiAgICAgICAgICAgIC8vIGdldCAocG9zaXRpb24gb2YgbGFzdCBjb21tb24gYW5jZXN0b3IpICsgMVxuICAgICAgICAgICAgd2hpbGUgKGRyb3B6b25lUGFyZW50c1tuXSAmJiBkcm9wem9uZVBhcmVudHNbbl0gPT09IGRlZXBlc3Rab25lUGFyZW50c1tuXSkge1xuICAgICAgICAgICAgICAgIG4rKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHBhcmVudHMgPSBbXG4gICAgICAgICAgICAgICAgZHJvcHpvbmVQYXJlbnRzW24gLSAxXSxcbiAgICAgICAgICAgICAgICBkcm9wem9uZVBhcmVudHNbbl0sXG4gICAgICAgICAgICAgICAgZGVlcGVzdFpvbmVQYXJlbnRzW25dXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICBjaGlsZCA9IHBhcmVudHNbMF0ubGFzdENoaWxkO1xuXG4gICAgICAgICAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQgPT09IHBhcmVudHNbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgZGVlcGVzdFpvbmUgPSBkcm9wem9uZTtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICBkZWVwZXN0Wm9uZVBhcmVudHMgPSBbXTtcblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGQgPT09IHBhcmVudHNbMl0pIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY2hpbGQgPSBjaGlsZC5wcmV2aW91c1NpYmxpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gSW50ZXJhY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnRhcmdldCAgICAgICAgICA9IG51bGw7IC8vIGN1cnJlbnQgaW50ZXJhY3RhYmxlIGJlaW5nIGludGVyYWN0ZWQgd2l0aFxuICAgICAgICB0aGlzLmVsZW1lbnQgICAgICAgICA9IG51bGw7IC8vIHRoZSB0YXJnZXQgZWxlbWVudCBvZiB0aGUgaW50ZXJhY3RhYmxlXG4gICAgICAgIHRoaXMuZHJvcFRhcmdldCAgICAgID0gbnVsbDsgLy8gdGhlIGRyb3B6b25lIGEgZHJhZyB0YXJnZXQgbWlnaHQgYmUgZHJvcHBlZCBpbnRvXG4gICAgICAgIHRoaXMuZHJvcEVsZW1lbnQgICAgID0gbnVsbDsgLy8gdGhlIGVsZW1lbnQgYXQgdGhlIHRpbWUgb2YgY2hlY2tpbmdcbiAgICAgICAgdGhpcy5wcmV2RHJvcFRhcmdldCAgPSBudWxsOyAvLyB0aGUgZHJvcHpvbmUgdGhhdCB3YXMgcmVjZW50bHkgZHJhZ2dlZCBhd2F5IGZyb21cbiAgICAgICAgdGhpcy5wcmV2RHJvcEVsZW1lbnQgPSBudWxsOyAvLyB0aGUgZWxlbWVudCBhdCB0aGUgdGltZSBvZiBjaGVja2luZ1xuXG4gICAgICAgIHRoaXMucHJlcGFyZWQgICAgICAgID0geyAgICAgLy8gYWN0aW9uIHRoYXQncyByZWFkeSB0byBiZSBmaXJlZCBvbiBuZXh0IG1vdmUgZXZlbnRcbiAgICAgICAgICAgIG5hbWUgOiBudWxsLFxuICAgICAgICAgICAgYXhpcyA6IG51bGwsXG4gICAgICAgICAgICBlZGdlczogbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubWF0Y2hlcyAgICAgICAgID0gW107ICAgLy8gYWxsIHNlbGVjdG9ycyB0aGF0IGFyZSBtYXRjaGVkIGJ5IHRhcmdldCBlbGVtZW50XG4gICAgICAgIHRoaXMubWF0Y2hFbGVtZW50cyAgID0gW107ICAgLy8gY29ycmVzcG9uZGluZyBlbGVtZW50c1xuXG4gICAgICAgIHRoaXMuaW5lcnRpYVN0YXR1cyA9IHtcbiAgICAgICAgICAgIGFjdGl2ZSAgICAgICA6IGZhbHNlLFxuICAgICAgICAgICAgc21vb3RoRW5kICAgIDogZmFsc2UsXG4gICAgICAgICAgICBlbmRpbmcgICAgICAgOiBmYWxzZSxcblxuICAgICAgICAgICAgc3RhcnRFdmVudDogbnVsbCxcbiAgICAgICAgICAgIHVwQ29vcmRzOiB7fSxcblxuICAgICAgICAgICAgeGU6IDAsIHllOiAwLFxuICAgICAgICAgICAgc3g6IDAsIHN5OiAwLFxuXG4gICAgICAgICAgICB0MDogMCxcbiAgICAgICAgICAgIHZ4MDogMCwgdnlzOiAwLFxuICAgICAgICAgICAgZHVyYXRpb246IDAsXG5cbiAgICAgICAgICAgIHJlc3VtZUR4OiAwLFxuICAgICAgICAgICAgcmVzdW1lRHk6IDAsXG5cbiAgICAgICAgICAgIGxhbWJkYV92MDogMCxcbiAgICAgICAgICAgIG9uZV92ZV92MDogMCxcbiAgICAgICAgICAgIGkgIDogbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKSkge1xuICAgICAgICAgICAgdGhpcy5ib3VuZEluZXJ0aWFGcmFtZSA9IHRoaXMuaW5lcnRpYUZyYW1lLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmJvdW5kU21vb3RoRW5kRnJhbWUgPSB0aGlzLnNtb290aEVuZEZyYW1lLmJpbmQodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgICAgICAgIHRoaXMuYm91bmRJbmVydGlhRnJhbWUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGF0LmluZXJ0aWFGcmFtZSgpOyB9O1xuICAgICAgICAgICAgdGhpcy5ib3VuZFNtb290aEVuZEZyYW1lID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhhdC5zbW9vdGhFbmRGcmFtZSgpOyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hY3RpdmVEcm9wcyA9IHtcbiAgICAgICAgICAgIGRyb3B6b25lczogW10sICAgICAgLy8gdGhlIGRyb3B6b25lcyB0aGF0IGFyZSBtZW50aW9uZWQgYmVsb3dcbiAgICAgICAgICAgIGVsZW1lbnRzIDogW10sICAgICAgLy8gZWxlbWVudHMgb2YgZHJvcHpvbmVzIHRoYXQgYWNjZXB0IHRoZSB0YXJnZXQgZHJhZ2dhYmxlXG4gICAgICAgICAgICByZWN0cyAgICA6IFtdICAgICAgIC8vIHRoZSByZWN0cyBvZiB0aGUgZWxlbWVudHMgbWVudGlvbmVkIGFib3ZlXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8ga2VlcCB0cmFjayBvZiBhZGRlZCBwb2ludGVyc1xuICAgICAgICB0aGlzLnBvaW50ZXJzICAgID0gW107XG4gICAgICAgIHRoaXMucG9pbnRlcklkcyAgPSBbXTtcbiAgICAgICAgdGhpcy5kb3duVGFyZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLmRvd25UaW1lcyAgID0gW107XG4gICAgICAgIHRoaXMuaG9sZFRpbWVycyAgPSBbXTtcblxuICAgICAgICAvLyBQcmV2aW91cyBuYXRpdmUgcG9pbnRlciBtb3ZlIGV2ZW50IGNvb3JkaW5hdGVzXG4gICAgICAgIHRoaXMucHJldkNvb3JkcyA9IHtcbiAgICAgICAgICAgIHBhZ2UgICAgIDogeyB4OiAwLCB5OiAwIH0sXG4gICAgICAgICAgICBjbGllbnQgICA6IHsgeDogMCwgeTogMCB9LFxuICAgICAgICAgICAgdGltZVN0YW1wOiAwXG4gICAgICAgIH07XG4gICAgICAgIC8vIGN1cnJlbnQgbmF0aXZlIHBvaW50ZXIgbW92ZSBldmVudCBjb29yZGluYXRlc1xuICAgICAgICB0aGlzLmN1ckNvb3JkcyA9IHtcbiAgICAgICAgICAgIHBhZ2UgICAgIDogeyB4OiAwLCB5OiAwIH0sXG4gICAgICAgICAgICBjbGllbnQgICA6IHsgeDogMCwgeTogMCB9LFxuICAgICAgICAgICAgdGltZVN0YW1wOiAwXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU3RhcnRpbmcgSW50ZXJhY3RFdmVudCBwb2ludGVyIGNvb3JkaW5hdGVzXG4gICAgICAgIHRoaXMuc3RhcnRDb29yZHMgPSB7XG4gICAgICAgICAgICBwYWdlICAgICA6IHsgeDogMCwgeTogMCB9LFxuICAgICAgICAgICAgY2xpZW50ICAgOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgICAgIHRpbWVTdGFtcDogMFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIENoYW5nZSBpbiBjb29yZGluYXRlcyBhbmQgdGltZSBvZiB0aGUgcG9pbnRlclxuICAgICAgICB0aGlzLnBvaW50ZXJEZWx0YSA9IHtcbiAgICAgICAgICAgIHBhZ2UgICAgIDogeyB4OiAwLCB5OiAwLCB2eDogMCwgdnk6IDAsIHNwZWVkOiAwIH0sXG4gICAgICAgICAgICBjbGllbnQgICA6IHsgeDogMCwgeTogMCwgdng6IDAsIHZ5OiAwLCBzcGVlZDogMCB9LFxuICAgICAgICAgICAgdGltZVN0YW1wOiAwXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5kb3duRXZlbnQgICA9IG51bGw7ICAgIC8vIHBvaW50ZXJkb3duL21vdXNlZG93bi90b3VjaHN0YXJ0IGV2ZW50XG4gICAgICAgIHRoaXMuZG93blBvaW50ZXIgPSB7fTtcblxuICAgICAgICB0aGlzLl9ldmVudFRhcmdldCAgICA9IG51bGw7XG4gICAgICAgIHRoaXMuX2N1ckV2ZW50VGFyZ2V0ID0gbnVsbDtcblxuICAgICAgICB0aGlzLnByZXZFdmVudCA9IG51bGw7ICAgICAgLy8gcHJldmlvdXMgYWN0aW9uIGV2ZW50XG4gICAgICAgIHRoaXMudGFwVGltZSAgID0gMDsgICAgICAgICAvLyB0aW1lIG9mIHRoZSBtb3N0IHJlY2VudCB0YXAgZXZlbnRcbiAgICAgICAgdGhpcy5wcmV2VGFwICAgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuc3RhcnRPZmZzZXQgICAgPSB7IGxlZnQ6IDAsIHJpZ2h0OiAwLCB0b3A6IDAsIGJvdHRvbTogMCB9O1xuICAgICAgICB0aGlzLnJlc3RyaWN0T2Zmc2V0ID0geyBsZWZ0OiAwLCByaWdodDogMCwgdG9wOiAwLCBib3R0b206IDAgfTtcbiAgICAgICAgdGhpcy5zbmFwT2Zmc2V0cyAgICA9IFtdO1xuXG4gICAgICAgIHRoaXMuZ2VzdHVyZSA9IHtcbiAgICAgICAgICAgIHN0YXJ0OiB7IHg6IDAsIHk6IDAgfSxcblxuICAgICAgICAgICAgc3RhcnREaXN0YW5jZTogMCwgICAvLyBkaXN0YW5jZSBiZXR3ZWVuIHR3byB0b3VjaGVzIG9mIHRvdWNoU3RhcnRcbiAgICAgICAgICAgIHByZXZEaXN0YW5jZSA6IDAsXG4gICAgICAgICAgICBkaXN0YW5jZSAgICAgOiAwLFxuXG4gICAgICAgICAgICBzY2FsZTogMSwgICAgICAgICAgIC8vIGdlc3R1cmUuZGlzdGFuY2UgLyBnZXN0dXJlLnN0YXJ0RGlzdGFuY2VcblxuICAgICAgICAgICAgc3RhcnRBbmdsZTogMCwgICAgICAvLyBhbmdsZSBvZiBsaW5lIGpvaW5pbmcgdHdvIHRvdWNoZXNcbiAgICAgICAgICAgIHByZXZBbmdsZSA6IDAgICAgICAgLy8gYW5nbGUgb2YgdGhlIHByZXZpb3VzIGdlc3R1cmUgZXZlbnRcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnNuYXBTdGF0dXMgPSB7XG4gICAgICAgICAgICB4ICAgICAgIDogMCwgeSAgICAgICA6IDAsXG4gICAgICAgICAgICBkeCAgICAgIDogMCwgZHkgICAgICA6IDAsXG4gICAgICAgICAgICByZWFsWCAgIDogMCwgcmVhbFkgICA6IDAsXG4gICAgICAgICAgICBzbmFwcGVkWDogMCwgc25hcHBlZFk6IDAsXG4gICAgICAgICAgICB0YXJnZXRzIDogW10sXG4gICAgICAgICAgICBsb2NrZWQgIDogZmFsc2UsXG4gICAgICAgICAgICBjaGFuZ2VkIDogZmFsc2VcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnJlc3RyaWN0U3RhdHVzID0ge1xuICAgICAgICAgICAgZHggICAgICAgICA6IDAsIGR5ICAgICAgICAgOiAwLFxuICAgICAgICAgICAgcmVzdHJpY3RlZFg6IDAsIHJlc3RyaWN0ZWRZOiAwLFxuICAgICAgICAgICAgc25hcCAgICAgICA6IG51bGwsXG4gICAgICAgICAgICByZXN0cmljdGVkIDogZmFsc2UsXG4gICAgICAgICAgICBjaGFuZ2VkICAgIDogZmFsc2VcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnJlc3RyaWN0U3RhdHVzLnNuYXAgPSB0aGlzLnNuYXBTdGF0dXM7XG5cbiAgICAgICAgdGhpcy5wb2ludGVySXNEb3duICAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wb2ludGVyV2FzTW92ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5nZXN0dXJpbmcgICAgICAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kcmFnZ2luZyAgICAgICAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXNpemluZyAgICAgICAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXNpemVBeGVzICAgICAgPSAneHknO1xuXG4gICAgICAgIHRoaXMubW91c2UgPSBmYWxzZTtcblxuICAgICAgICBpbnRlcmFjdGlvbnMucHVzaCh0aGlzKTtcbiAgICB9XG5cbiAgICBJbnRlcmFjdGlvbi5wcm90b3R5cGUgPSB7XG4gICAgICAgIGdldFBhZ2VYWSAgOiBmdW5jdGlvbiAocG9pbnRlciwgeHkpIHsgcmV0dXJuICAgZ2V0UGFnZVhZKHBvaW50ZXIsIHh5LCB0aGlzKTsgfSxcbiAgICAgICAgZ2V0Q2xpZW50WFk6IGZ1bmN0aW9uIChwb2ludGVyLCB4eSkgeyByZXR1cm4gZ2V0Q2xpZW50WFkocG9pbnRlciwgeHksIHRoaXMpOyB9LFxuICAgICAgICBzZXRFdmVudFhZIDogZnVuY3Rpb24gKHRhcmdldCwgcHRyKSB7IHJldHVybiAgc2V0RXZlbnRYWSh0YXJnZXQsIHB0ciwgdGhpcyk7IH0sXG5cbiAgICAgICAgcG9pbnRlck92ZXI6IGZ1bmN0aW9uIChwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXBhcmVkLm5hbWUgfHwgIXRoaXMubW91c2UpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgICAgIHZhciBjdXJNYXRjaGVzID0gW10sXG4gICAgICAgICAgICAgICAgY3VyTWF0Y2hFbGVtZW50cyA9IFtdLFxuICAgICAgICAgICAgICAgIHByZXZUYXJnZXRFbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuXG4gICAgICAgICAgICB0aGlzLmFkZFBvaW50ZXIocG9pbnRlcik7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldFxuICAgICAgICAgICAgICAgICYmICh0ZXN0SWdub3JlKHRoaXMudGFyZ2V0LCB0aGlzLmVsZW1lbnQsIGV2ZW50VGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICB8fCAhdGVzdEFsbG93KHRoaXMudGFyZ2V0LCB0aGlzLmVsZW1lbnQsIGV2ZW50VGFyZ2V0KSkpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgZXZlbnRUYXJnZXQgc2hvdWxkIGJlIGlnbm9yZWQgb3Igc2hvdWxkbid0IGJlIGFsbG93ZWRcbiAgICAgICAgICAgICAgICAvLyBjbGVhciB0aGUgcHJldmlvdXMgdGFyZ2V0XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXRjaGVzID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5tYXRjaEVsZW1lbnRzID0gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBlbGVtZW50SW50ZXJhY3RhYmxlID0gaW50ZXJhY3RhYmxlcy5nZXQoZXZlbnRUYXJnZXQpLFxuICAgICAgICAgICAgICAgIGVsZW1lbnRBY3Rpb24gPSAoZWxlbWVudEludGVyYWN0YWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgIXRlc3RJZ25vcmUoZWxlbWVudEludGVyYWN0YWJsZSwgZXZlbnRUYXJnZXQsIGV2ZW50VGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGVzdEFsbG93KGVsZW1lbnRJbnRlcmFjdGFibGUsIGV2ZW50VGFyZ2V0LCBldmVudFRhcmdldClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHZhbGlkYXRlQWN0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRJbnRlcmFjdGFibGUuZ2V0QWN0aW9uKHBvaW50ZXIsIGV2ZW50LCB0aGlzLCBldmVudFRhcmdldCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudEludGVyYWN0YWJsZSkpO1xuXG4gICAgICAgICAgICBpZiAoZWxlbWVudEFjdGlvbiAmJiAhd2l0aGluSW50ZXJhY3Rpb25MaW1pdChlbGVtZW50SW50ZXJhY3RhYmxlLCBldmVudFRhcmdldCwgZWxlbWVudEFjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgZWxlbWVudEFjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHB1c2hDdXJNYXRjaGVzIChpbnRlcmFjdGFibGUsIHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGludGVyYWN0YWJsZVxuICAgICAgICAgICAgICAgICAgICAmJiBpc0VsZW1lbnQoZXZlbnRUYXJnZXQpXG4gICAgICAgICAgICAgICAgICAgICYmIGluQ29udGV4dChpbnRlcmFjdGFibGUsIGV2ZW50VGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICAmJiAhdGVzdElnbm9yZShpbnRlcmFjdGFibGUsIGV2ZW50VGFyZ2V0LCBldmVudFRhcmdldClcbiAgICAgICAgICAgICAgICAgICAgJiYgdGVzdEFsbG93KGludGVyYWN0YWJsZSwgZXZlbnRUYXJnZXQsIGV2ZW50VGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICAmJiBtYXRjaGVzU2VsZWN0b3IoZXZlbnRUYXJnZXQsIHNlbGVjdG9yKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGN1ck1hdGNoZXMucHVzaChpbnRlcmFjdGFibGUpO1xuICAgICAgICAgICAgICAgICAgICBjdXJNYXRjaEVsZW1lbnRzLnB1c2goZXZlbnRUYXJnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVsZW1lbnRBY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IGVsZW1lbnRJbnRlcmFjdGFibGU7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZXZlbnRUYXJnZXQ7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXRjaGVzID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5tYXRjaEVsZW1lbnRzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbnRlcmFjdGFibGVzLmZvckVhY2hTZWxlY3RvcihwdXNoQ3VyTWF0Y2hlcyk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy52YWxpZGF0ZVNlbGVjdG9yKHBvaW50ZXIsIGV2ZW50LCBjdXJNYXRjaGVzLCBjdXJNYXRjaEVsZW1lbnRzKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoZXMgPSBjdXJNYXRjaGVzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoRWxlbWVudHMgPSBjdXJNYXRjaEVsZW1lbnRzO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9pbnRlckhvdmVyKHBvaW50ZXIsIGV2ZW50LCB0aGlzLm1hdGNoZXMsIHRoaXMubWF0Y2hFbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50cy5hZGQoZXZlbnRUYXJnZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydHNQb2ludGVyRXZlbnQ/IHBFdmVudFR5cGVzLm1vdmUgOiAnbW91c2Vtb3ZlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMucG9pbnRlckhvdmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGVDb250YWlucyhwcmV2VGFyZ2V0RWxlbWVudCwgZXZlbnRUYXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvaW50ZXJIb3Zlcihwb2ludGVyLCBldmVudCwgdGhpcy5tYXRjaGVzLCB0aGlzLm1hdGNoRWxlbWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzLmFkZCh0aGlzLmVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnRzUG9pbnRlckV2ZW50PyBwRXZlbnRUeXBlcy5tb3ZlIDogJ21vdXNlbW92ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5wb2ludGVySG92ZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaEVsZW1lbnRzID0gW107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gQ2hlY2sgd2hhdCBhY3Rpb24gd291bGQgYmUgcGVyZm9ybWVkIG9uIHBvaW50ZXJNb3ZlIHRhcmdldCBpZiBhIG1vdXNlXG4gICAgICAgIC8vIGJ1dHRvbiB3ZXJlIHByZXNzZWQgYW5kIGNoYW5nZSB0aGUgY3Vyc29yIGFjY29yZGluZ2x5XG4gICAgICAgIHBvaW50ZXJIb3ZlcjogZnVuY3Rpb24gKHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCwgY3VyRXZlbnRUYXJnZXQsIG1hdGNoZXMsIG1hdGNoRWxlbWVudHMpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSB0aGlzLnRhcmdldDtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnByZXBhcmVkLm5hbWUgJiYgdGhpcy5tb3VzZSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbjtcblxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBwb2ludGVyIGNvb3JkcyBmb3IgZGVmYXVsdEFjdGlvbkNoZWNrZXIgdG8gdXNlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRFdmVudFhZKHRoaXMuY3VyQ29vcmRzLCBbcG9pbnRlcl0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uID0gdGhpcy52YWxpZGF0ZVNlbGVjdG9yKHBvaW50ZXIsIGV2ZW50LCBtYXRjaGVzLCBtYXRjaEVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbiA9IHZhbGlkYXRlQWN0aW9uKHRhcmdldC5nZXRBY3Rpb24odGhpcy5wb2ludGVyc1swXSwgZXZlbnQsIHRoaXMsIHRoaXMuZWxlbWVudCksIHRoaXMudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5vcHRpb25zLnN0eWxlQ3Vyc29yKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5fZG9jLmRvY3VtZW50RWxlbWVudC5zdHlsZS5jdXJzb3IgPSBnZXRBY3Rpb25DdXJzb3IoYWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5fZG9jLmRvY3VtZW50RWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMucHJlcGFyZWQubmFtZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tBbmRQcmV2ZW50RGVmYXVsdChldmVudCwgdGFyZ2V0LCB0aGlzLmVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHBvaW50ZXJPdXQ6IGZ1bmN0aW9uIChwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXBhcmVkLm5hbWUpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgICAgIC8vIFJlbW92ZSB0ZW1wb3JhcnkgZXZlbnQgbGlzdGVuZXJzIGZvciBzZWxlY3RvciBJbnRlcmFjdGFibGVzXG4gICAgICAgICAgICBpZiAoIWludGVyYWN0YWJsZXMuZ2V0KGV2ZW50VGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIGV2ZW50cy5yZW1vdmUoZXZlbnRUYXJnZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0c1BvaW50ZXJFdmVudD8gcEV2ZW50VHlwZXMubW92ZSA6ICdtb3VzZW1vdmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnBvaW50ZXJIb3Zlcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldCAmJiB0aGlzLnRhcmdldC5vcHRpb25zLnN0eWxlQ3Vyc29yICYmICF0aGlzLmludGVyYWN0aW5nKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldC5fZG9jLmRvY3VtZW50RWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBzZWxlY3RvckRvd246IGZ1bmN0aW9uIChwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsIGN1ckV2ZW50VGFyZ2V0KSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgLy8gY29weSBldmVudCB0byBiZSB1c2VkIGluIHRpbWVvdXQgZm9yIElFOFxuICAgICAgICAgICAgICAgIGV2ZW50Q29weSA9IGV2ZW50cy51c2VBdHRhY2hFdmVudD8gZXh0ZW5kKHt9LCBldmVudCkgOiBldmVudCxcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gZXZlbnRUYXJnZXQsXG4gICAgICAgICAgICAgICAgcG9pbnRlckluZGV4ID0gdGhpcy5hZGRQb2ludGVyKHBvaW50ZXIpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjtcblxuICAgICAgICAgICAgdGhpcy5ob2xkVGltZXJzW3BvaW50ZXJJbmRleF0gPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGF0LnBvaW50ZXJIb2xkKGV2ZW50cy51c2VBdHRhY2hFdmVudD8gZXZlbnRDb3B5IDogcG9pbnRlciwgZXZlbnRDb3B5LCBldmVudFRhcmdldCwgY3VyRXZlbnRUYXJnZXQpO1xuICAgICAgICAgICAgfSwgZGVmYXVsdE9wdGlvbnMuX2hvbGREdXJhdGlvbik7XG5cbiAgICAgICAgICAgIHRoaXMucG9pbnRlcklzRG93biA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBkb3duIGV2ZW50IGhpdHMgdGhlIGN1cnJlbnQgaW5lcnRpYSB0YXJnZXRcbiAgICAgICAgICAgIGlmICh0aGlzLmluZXJ0aWFTdGF0dXMuYWN0aXZlICYmIHRoaXMudGFyZ2V0LnNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgLy8gY2xpbWIgdXAgdGhlIERPTSB0cmVlIGZyb20gdGhlIGV2ZW50IHRhcmdldFxuICAgICAgICAgICAgICAgIHdoaWxlIChpc0VsZW1lbnQoZWxlbWVudCkpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGlzIGVsZW1lbnQgaXMgdGhlIGN1cnJlbnQgaW5lcnRpYSB0YXJnZXQgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCA9PT0gdGhpcy5lbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhbmQgdGhlIHByb3NwZWN0aXZlIGFjdGlvbiBpcyB0aGUgc2FtZSBhcyB0aGUgb25nb2luZyBvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHZhbGlkYXRlQWN0aW9uKHRoaXMudGFyZ2V0LmdldEFjdGlvbihwb2ludGVyLCBldmVudCwgdGhpcywgdGhpcy5lbGVtZW50KSwgdGhpcy50YXJnZXQpLm5hbWUgPT09IHRoaXMucHJlcGFyZWQubmFtZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzdG9wIGluZXJ0aWEgc28gdGhhdCB0aGUgbmV4dCBtb3ZlIHdpbGwgYmUgYSBub3JtYWwgb25lXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxGcmFtZSh0aGlzLmluZXJ0aWFTdGF0dXMuaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluZXJ0aWFTdGF0dXMuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29sbGVjdEV2ZW50VGFyZ2V0cyhwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsICdkb3duJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IHBhcmVudEVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkbyBub3RoaW5nIGlmIGludGVyYWN0aW5nXG4gICAgICAgICAgICBpZiAodGhpcy5pbnRlcmFjdGluZygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsZWN0RXZlbnRUYXJnZXRzKHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCwgJ2Rvd24nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHB1c2hNYXRjaGVzIChpbnRlcmFjdGFibGUsIHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRzID0gaWU4TWF0Y2hlc1NlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgID8gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgIGlmIChpbkNvbnRleHQoaW50ZXJhY3RhYmxlLCBlbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICAmJiAhdGVzdElnbm9yZShpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGV2ZW50VGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICAmJiB0ZXN0QWxsb3coaW50ZXJhY3RhYmxlLCBlbGVtZW50LCBldmVudFRhcmdldClcbiAgICAgICAgICAgICAgICAgICAgJiYgbWF0Y2hlc1NlbGVjdG9yKGVsZW1lbnQsIHNlbGVjdG9yLCBlbGVtZW50cykpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm1hdGNoZXMucHVzaChpbnRlcmFjdGFibGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGF0Lm1hdGNoRWxlbWVudHMucHVzaChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBwb2ludGVyIGNvb3JkcyBmb3IgZGVmYXVsdEFjdGlvbkNoZWNrZXIgdG8gdXNlXG4gICAgICAgICAgICB0aGlzLnNldEV2ZW50WFkodGhpcy5jdXJDb29yZHMsIFtwb2ludGVyXSk7XG4gICAgICAgICAgICB0aGlzLmRvd25FdmVudCA9IGV2ZW50O1xuXG4gICAgICAgICAgICB3aGlsZSAoaXNFbGVtZW50KGVsZW1lbnQpICYmICFhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoRWxlbWVudHMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGludGVyYWN0YWJsZXMuZm9yRWFjaFNlbGVjdG9yKHB1c2hNYXRjaGVzKTtcblxuICAgICAgICAgICAgICAgIGFjdGlvbiA9IHRoaXMudmFsaWRhdGVTZWxlY3Rvcihwb2ludGVyLCBldmVudCwgdGhpcy5tYXRjaGVzLCB0aGlzLm1hdGNoRWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBwYXJlbnRFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlZC5uYW1lICA9IGFjdGlvbi5uYW1lO1xuICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZWQuYXhpcyAgPSBhY3Rpb24uYXhpcztcbiAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVkLmVkZ2VzID0gYWN0aW9uLmVkZ2VzO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsZWN0RXZlbnRUYXJnZXRzKHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCwgJ2Rvd24nKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBvaW50ZXJEb3duKHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCwgY3VyRXZlbnRUYXJnZXQsIGFjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBkbyB0aGVzZSBub3cgc2luY2UgcG9pbnRlckRvd24gaXNuJ3QgYmVpbmcgY2FsbGVkIGZyb20gaGVyZVxuICAgICAgICAgICAgICAgIHRoaXMuZG93blRpbWVzW3BvaW50ZXJJbmRleF0gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvd25UYXJnZXRzW3BvaW50ZXJJbmRleF0gPSBldmVudFRhcmdldDtcbiAgICAgICAgICAgICAgICBwb2ludGVyRXh0ZW5kKHRoaXMuZG93blBvaW50ZXIsIHBvaW50ZXIpO1xuXG4gICAgICAgICAgICAgICAgY29weUNvb3Jkcyh0aGlzLnByZXZDb29yZHMsIHRoaXMuY3VyQ29vcmRzKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50ZXJXYXNNb3ZlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3RFdmVudFRhcmdldHMocG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCAnZG93bicpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIERldGVybWluZSBhY3Rpb24gdG8gYmUgcGVyZm9ybWVkIG9uIG5leHQgcG9pbnRlck1vdmUgYW5kIGFkZCBhcHByb3ByaWF0ZVxuICAgICAgICAvLyBzdHlsZSBhbmQgZXZlbnQgTGlzdGVuZXJzXG4gICAgICAgIHBvaW50ZXJEb3duOiBmdW5jdGlvbiAocG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCBjdXJFdmVudFRhcmdldCwgZm9yY2VBY3Rpb24pIHtcbiAgICAgICAgICAgIGlmICghZm9yY2VBY3Rpb24gJiYgIXRoaXMuaW5lcnRpYVN0YXR1cy5hY3RpdmUgJiYgdGhpcy5wb2ludGVyV2FzTW92ZWQgJiYgdGhpcy5wcmVwYXJlZC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0FuZFByZXZlbnREZWZhdWx0KGV2ZW50LCB0aGlzLnRhcmdldCwgdGhpcy5lbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wb2ludGVySXNEb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZG93bkV2ZW50ID0gZXZlbnQ7XG5cbiAgICAgICAgICAgIHZhciBwb2ludGVySW5kZXggPSB0aGlzLmFkZFBvaW50ZXIocG9pbnRlciksXG4gICAgICAgICAgICAgICAgYWN0aW9uO1xuXG4gICAgICAgICAgICAvLyBJZiBpdCBpcyB0aGUgc2Vjb25kIHRvdWNoIG9mIGEgbXVsdGktdG91Y2ggZ2VzdHVyZSwga2VlcCB0aGVcbiAgICAgICAgICAgIC8vIHRhcmdldCB0aGUgc2FtZSBhbmQgZ2V0IGEgbmV3IGFjdGlvbiBpZiBhIHRhcmdldCB3YXMgc2V0IGJ5IHRoZVxuICAgICAgICAgICAgLy8gZmlyc3QgdG91Y2hcbiAgICAgICAgICAgIGlmICh0aGlzLnBvaW50ZXJJZHMubGVuZ3RoID4gMSAmJiB0aGlzLnRhcmdldC5fZWxlbWVudCA9PT0gdGhpcy5lbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0FjdGlvbiA9IHZhbGlkYXRlQWN0aW9uKGZvcmNlQWN0aW9uIHx8IHRoaXMudGFyZ2V0LmdldEFjdGlvbihwb2ludGVyLCBldmVudCwgdGhpcywgdGhpcy5lbGVtZW50KSwgdGhpcy50YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHdpdGhpbkludGVyYWN0aW9uTGltaXQodGhpcy50YXJnZXQsIHRoaXMuZWxlbWVudCwgbmV3QWN0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb24gPSBuZXdBY3Rpb247XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlZC5uYW1lID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgc2V0IHRoZSB0YXJnZXQgaWYgdGhlcmUgaXMgbm8gYWN0aW9uIHByZXBhcmVkXG4gICAgICAgICAgICBlbHNlIGlmICghdGhpcy5wcmVwYXJlZC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgdmFyIGludGVyYWN0YWJsZSA9IGludGVyYWN0YWJsZXMuZ2V0KGN1ckV2ZW50VGFyZ2V0KTtcblxuICAgICAgICAgICAgICAgIGlmIChpbnRlcmFjdGFibGVcbiAgICAgICAgICAgICAgICAgICAgJiYgIXRlc3RJZ25vcmUoaW50ZXJhY3RhYmxlLCBjdXJFdmVudFRhcmdldCwgZXZlbnRUYXJnZXQpXG4gICAgICAgICAgICAgICAgICAgICYmIHRlc3RBbGxvdyhpbnRlcmFjdGFibGUsIGN1ckV2ZW50VGFyZ2V0LCBldmVudFRhcmdldClcbiAgICAgICAgICAgICAgICAgICAgJiYgKGFjdGlvbiA9IHZhbGlkYXRlQWN0aW9uKGZvcmNlQWN0aW9uIHx8IGludGVyYWN0YWJsZS5nZXRBY3Rpb24ocG9pbnRlciwgZXZlbnQsIHRoaXMsIGN1ckV2ZW50VGFyZ2V0KSwgaW50ZXJhY3RhYmxlLCBldmVudFRhcmdldCkpXG4gICAgICAgICAgICAgICAgICAgICYmIHdpdGhpbkludGVyYWN0aW9uTGltaXQoaW50ZXJhY3RhYmxlLCBjdXJFdmVudFRhcmdldCwgYWN0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IGludGVyYWN0YWJsZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gY3VyRXZlbnRUYXJnZXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcy50YXJnZXQsXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHRhcmdldCAmJiB0YXJnZXQub3B0aW9ucztcblxuICAgICAgICAgICAgaWYgKHRhcmdldCAmJiAoZm9yY2VBY3Rpb24gfHwgIXRoaXMucHJlcGFyZWQubmFtZSkpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb24gPSBhY3Rpb24gfHwgdmFsaWRhdGVBY3Rpb24oZm9yY2VBY3Rpb24gfHwgdGFyZ2V0LmdldEFjdGlvbihwb2ludGVyLCBldmVudCwgdGhpcywgY3VyRXZlbnRUYXJnZXQpLCB0YXJnZXQsIHRoaXMuZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNldEV2ZW50WFkodGhpcy5zdGFydENvb3JkcywgdGhpcy5wb2ludGVycyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWFjdGlvbikgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnN0eWxlQ3Vyc29yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5fZG9jLmRvY3VtZW50RWxlbWVudC5zdHlsZS5jdXJzb3IgPSBnZXRBY3Rpb25DdXJzb3IoYWN0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZUF4ZXMgPSBhY3Rpb24ubmFtZSA9PT0gJ3Jlc2l6ZSc/IGFjdGlvbi5heGlzIDogbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT09ICdnZXN0dXJlJyAmJiB0aGlzLnBvaW50ZXJJZHMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZWQubmFtZSAgPSBhY3Rpb24ubmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVkLmF4aXMgID0gYWN0aW9uLmF4aXM7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlZC5lZGdlcyA9IGFjdGlvbi5lZGdlcztcblxuICAgICAgICAgICAgICAgIHRoaXMuc25hcFN0YXR1cy5zbmFwcGVkWCA9IHRoaXMuc25hcFN0YXR1cy5zbmFwcGVkWSA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdHJpY3RTdGF0dXMucmVzdHJpY3RlZFggPSB0aGlzLnJlc3RyaWN0U3RhdHVzLnJlc3RyaWN0ZWRZID0gTmFOO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5kb3duVGltZXNbcG9pbnRlckluZGV4XSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZG93blRhcmdldHNbcG9pbnRlckluZGV4XSA9IGV2ZW50VGFyZ2V0O1xuICAgICAgICAgICAgICAgIHBvaW50ZXJFeHRlbmQodGhpcy5kb3duUG9pbnRlciwgcG9pbnRlcik7XG5cbiAgICAgICAgICAgICAgICBjb3B5Q29vcmRzKHRoaXMucHJldkNvb3JkcywgdGhpcy5zdGFydENvb3Jkcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5wb2ludGVyV2FzTW92ZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tBbmRQcmV2ZW50RGVmYXVsdChldmVudCwgdGFyZ2V0LCB0aGlzLmVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgaW5lcnRpYSBpcyBhY3RpdmUgdHJ5IHRvIHJlc3VtZSBhY3Rpb25cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaW5lcnRpYVN0YXR1cy5hY3RpdmVcbiAgICAgICAgICAgICAgICAmJiBjdXJFdmVudFRhcmdldCA9PT0gdGhpcy5lbGVtZW50XG4gICAgICAgICAgICAgICAgJiYgdmFsaWRhdGVBY3Rpb24odGFyZ2V0LmdldEFjdGlvbihwb2ludGVyLCBldmVudCwgdGhpcywgdGhpcy5lbGVtZW50KSwgdGFyZ2V0KS5uYW1lID09PSB0aGlzLnByZXBhcmVkLm5hbWUpIHtcblxuICAgICAgICAgICAgICAgIGNhbmNlbEZyYW1lKHRoaXMuaW5lcnRpYVN0YXR1cy5pKTtcbiAgICAgICAgICAgICAgICB0aGlzLmluZXJ0aWFTdGF0dXMuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQW5kUHJldmVudERlZmF1bHQoZXZlbnQsIHRhcmdldCwgdGhpcy5lbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBzZXRNb2RpZmljYXRpb25zOiBmdW5jdGlvbiAoY29vcmRzLCBwcmVFbmQpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgICAgICAgICA9IHRoaXMudGFyZ2V0LFxuICAgICAgICAgICAgICAgIHNob3VsZE1vdmUgICAgID0gdHJ1ZSxcbiAgICAgICAgICAgICAgICBzaG91bGRTbmFwICAgICA9IGNoZWNrU25hcCh0YXJnZXQsIHRoaXMucHJlcGFyZWQubmFtZSkgICAgICYmICghdGFyZ2V0Lm9wdGlvbnNbdGhpcy5wcmVwYXJlZC5uYW1lXS5zbmFwLmVuZE9ubHkgICAgIHx8IHByZUVuZCksXG4gICAgICAgICAgICAgICAgc2hvdWxkUmVzdHJpY3QgPSBjaGVja1Jlc3RyaWN0KHRhcmdldCwgdGhpcy5wcmVwYXJlZC5uYW1lKSAmJiAoIXRhcmdldC5vcHRpb25zW3RoaXMucHJlcGFyZWQubmFtZV0ucmVzdHJpY3QuZW5kT25seSB8fCBwcmVFbmQpO1xuXG4gICAgICAgICAgICBpZiAoc2hvdWxkU25hcCAgICApIHsgdGhpcy5zZXRTbmFwcGluZyAgIChjb29yZHMpOyB9IGVsc2UgeyB0aGlzLnNuYXBTdGF0dXMgICAgLmxvY2tlZCAgICAgPSBmYWxzZTsgfVxuICAgICAgICAgICAgaWYgKHNob3VsZFJlc3RyaWN0KSB7IHRoaXMuc2V0UmVzdHJpY3Rpb24oY29vcmRzKTsgfSBlbHNlIHsgdGhpcy5yZXN0cmljdFN0YXR1cy5yZXN0cmljdGVkID0gZmFsc2U7IH1cblxuICAgICAgICAgICAgaWYgKHNob3VsZFNuYXAgJiYgdGhpcy5zbmFwU3RhdHVzLmxvY2tlZCAmJiAhdGhpcy5zbmFwU3RhdHVzLmNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICBzaG91bGRNb3ZlID0gc2hvdWxkUmVzdHJpY3QgJiYgdGhpcy5yZXN0cmljdFN0YXR1cy5yZXN0cmljdGVkICYmIHRoaXMucmVzdHJpY3RTdGF0dXMuY2hhbmdlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNob3VsZFJlc3RyaWN0ICYmIHRoaXMucmVzdHJpY3RTdGF0dXMucmVzdHJpY3RlZCAmJiAhdGhpcy5yZXN0cmljdFN0YXR1cy5jaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgc2hvdWxkTW92ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc2hvdWxkTW92ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRTdGFydE9mZnNldHM6IGZ1bmN0aW9uIChhY3Rpb24sIGludGVyYWN0YWJsZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIHJlY3QgPSBpbnRlcmFjdGFibGUuZ2V0UmVjdChlbGVtZW50KSxcbiAgICAgICAgICAgICAgICBvcmlnaW4gPSBnZXRPcmlnaW5YWShpbnRlcmFjdGFibGUsIGVsZW1lbnQpLFxuICAgICAgICAgICAgICAgIHNuYXAgPSBpbnRlcmFjdGFibGUub3B0aW9uc1t0aGlzLnByZXBhcmVkLm5hbWVdLnNuYXAsXG4gICAgICAgICAgICAgICAgcmVzdHJpY3QgPSBpbnRlcmFjdGFibGUub3B0aW9uc1t0aGlzLnByZXBhcmVkLm5hbWVdLnJlc3RyaWN0LFxuICAgICAgICAgICAgICAgIHdpZHRoLCBoZWlnaHQ7XG5cbiAgICAgICAgICAgIGlmIChyZWN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydE9mZnNldC5sZWZ0ID0gdGhpcy5zdGFydENvb3Jkcy5wYWdlLnggLSByZWN0LmxlZnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydE9mZnNldC50b3AgID0gdGhpcy5zdGFydENvb3Jkcy5wYWdlLnkgLSByZWN0LnRvcDtcblxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRPZmZzZXQucmlnaHQgID0gcmVjdC5yaWdodCAgLSB0aGlzLnN0YXJ0Q29vcmRzLnBhZ2UueDtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0T2Zmc2V0LmJvdHRvbSA9IHJlY3QuYm90dG9tIC0gdGhpcy5zdGFydENvb3Jkcy5wYWdlLnk7XG5cbiAgICAgICAgICAgICAgICBpZiAoJ3dpZHRoJyBpbiByZWN0KSB7IHdpZHRoID0gcmVjdC53aWR0aDsgfVxuICAgICAgICAgICAgICAgIGVsc2UgeyB3aWR0aCA9IHJlY3QucmlnaHQgLSByZWN0LmxlZnQ7IH1cbiAgICAgICAgICAgICAgICBpZiAoJ2hlaWdodCcgaW4gcmVjdCkgeyBoZWlnaHQgPSByZWN0LmhlaWdodDsgfVxuICAgICAgICAgICAgICAgIGVsc2UgeyBoZWlnaHQgPSByZWN0LmJvdHRvbSAtIHJlY3QudG9wOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0T2Zmc2V0LmxlZnQgPSB0aGlzLnN0YXJ0T2Zmc2V0LnRvcCA9IHRoaXMuc3RhcnRPZmZzZXQucmlnaHQgPSB0aGlzLnN0YXJ0T2Zmc2V0LmJvdHRvbSA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc25hcE9mZnNldHMuc3BsaWNlKDApO1xuXG4gICAgICAgICAgICB2YXIgc25hcE9mZnNldCA9IHNuYXAgJiYgc25hcC5vZmZzZXQgPT09ICdzdGFydENvb3JkcydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiB0aGlzLnN0YXJ0Q29vcmRzLnBhZ2UueCAtIG9yaWdpbi54LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogdGhpcy5zdGFydENvb3Jkcy5wYWdlLnkgLSBvcmlnaW4ueVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogc25hcCAmJiBzbmFwLm9mZnNldCB8fCB7IHg6IDAsIHk6IDAgfTtcblxuICAgICAgICAgICAgaWYgKHJlY3QgJiYgc25hcCAmJiBzbmFwLnJlbGF0aXZlUG9pbnRzICYmIHNuYXAucmVsYXRpdmVQb2ludHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbmFwLnJlbGF0aXZlUG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc25hcE9mZnNldHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiB0aGlzLnN0YXJ0T2Zmc2V0LmxlZnQgLSAod2lkdGggICogc25hcC5yZWxhdGl2ZVBvaW50c1tpXS54KSArIHNuYXBPZmZzZXQueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuc3RhcnRPZmZzZXQudG9wICAtIChoZWlnaHQgKiBzbmFwLnJlbGF0aXZlUG9pbnRzW2ldLnkpICsgc25hcE9mZnNldC55XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc25hcE9mZnNldHMucHVzaChzbmFwT2Zmc2V0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJlY3QgJiYgcmVzdHJpY3QuZWxlbWVudFJlY3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RyaWN0T2Zmc2V0LmxlZnQgPSB0aGlzLnN0YXJ0T2Zmc2V0LmxlZnQgLSAod2lkdGggICogcmVzdHJpY3QuZWxlbWVudFJlY3QubGVmdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0cmljdE9mZnNldC50b3AgID0gdGhpcy5zdGFydE9mZnNldC50b3AgIC0gKGhlaWdodCAqIHJlc3RyaWN0LmVsZW1lbnRSZWN0LnRvcCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RyaWN0T2Zmc2V0LnJpZ2h0ICA9IHRoaXMuc3RhcnRPZmZzZXQucmlnaHQgIC0gKHdpZHRoICAqICgxIC0gcmVzdHJpY3QuZWxlbWVudFJlY3QucmlnaHQpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RyaWN0T2Zmc2V0LmJvdHRvbSA9IHRoaXMuc3RhcnRPZmZzZXQuYm90dG9tIC0gKGhlaWdodCAqICgxIC0gcmVzdHJpY3QuZWxlbWVudFJlY3QuYm90dG9tKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RyaWN0T2Zmc2V0LmxlZnQgPSB0aGlzLnJlc3RyaWN0T2Zmc2V0LnRvcCA9IHRoaXMucmVzdHJpY3RPZmZzZXQucmlnaHQgPSB0aGlzLnJlc3RyaWN0T2Zmc2V0LmJvdHRvbSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLypcXFxuICAgICAgICAgKiBJbnRlcmFjdGlvbi5zdGFydFxuICAgICAgICAgWyBtZXRob2QgXVxuICAgICAgICAgKlxuICAgICAgICAgKiBTdGFydCBhbiBhY3Rpb24gd2l0aCB0aGUgZ2l2ZW4gSW50ZXJhY3RhYmxlIGFuZCBFbGVtZW50IGFzIHRhcnRnZXRzLiBUaGVcbiAgICAgICAgICogYWN0aW9uIG11c3QgYmUgZW5hYmxlZCBmb3IgdGhlIHRhcmdldCBJbnRlcmFjdGFibGUgYW5kIGFuIGFwcHJvcHJpYXRlIG51bWJlclxuICAgICAgICAgKiBvZiBwb2ludGVycyBtdXN0IGJlIGhlbGQgZG93biDigJMgMSBmb3IgZHJhZy9yZXNpemUsIDIgZm9yIGdlc3R1cmUuXG4gICAgICAgICAqXG4gICAgICAgICAqIFVzZSBpdCB3aXRoIGBpbnRlcmFjdGFibGUuPGFjdGlvbj5hYmxlKHsgbWFudWFsU3RhcnQ6IGZhbHNlIH0pYCB0byBhbHdheXNcbiAgICAgICAgICogW3N0YXJ0IGFjdGlvbnMgbWFudWFsbHldKGh0dHBzOi8vZ2l0aHViLmNvbS90YXllL2ludGVyYWN0LmpzL2lzc3Vlcy8xMTQpXG4gICAgICAgICAqXG4gICAgICAgICAtIGFjdGlvbiAgICAgICAob2JqZWN0KSAgVGhlIGFjdGlvbiB0byBiZSBwZXJmb3JtZWQgLSBkcmFnLCByZXNpemUsIGV0Yy5cbiAgICAgICAgIC0gaW50ZXJhY3RhYmxlIChJbnRlcmFjdGFibGUpIFRoZSBJbnRlcmFjdGFibGUgdG8gdGFyZ2V0XG4gICAgICAgICAtIGVsZW1lbnQgICAgICAoRWxlbWVudCkgVGhlIERPTSBFbGVtZW50IHRvIHRhcmdldFxuICAgICAgICAgPSAob2JqZWN0KSBpbnRlcmFjdFxuICAgICAgICAgKipcbiAgICAgICAgIHwgaW50ZXJhY3QodGFyZ2V0KVxuICAgICAgICAgfCAgIC5kcmFnZ2FibGUoe1xuICAgICAgICAgfCAgICAgLy8gZGlzYWJsZSB0aGUgZGVmYXVsdCBkcmFnIHN0YXJ0IGJ5IGRvd24tPm1vdmVcbiAgICAgICAgIHwgICAgIG1hbnVhbFN0YXJ0OiB0cnVlXG4gICAgICAgICB8ICAgfSlcbiAgICAgICAgIHwgICAvLyBzdGFydCBkcmFnZ2luZyBhZnRlciB0aGUgdXNlciBob2xkcyB0aGUgcG9pbnRlciBkb3duXG4gICAgICAgICB8ICAgLm9uKCdob2xkJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICB8ICAgICB2YXIgaW50ZXJhY3Rpb24gPSBldmVudC5pbnRlcmFjdGlvbjtcbiAgICAgICAgIHxcbiAgICAgICAgIHwgICAgIGlmICghaW50ZXJhY3Rpb24uaW50ZXJhY3RpbmcoKSkge1xuICAgICAgICAgfCAgICAgICBpbnRlcmFjdGlvbi5zdGFydCh7IG5hbWU6ICdkcmFnJyB9LFxuICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5pbnRlcmFjdGFibGUsXG4gICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgfCAgICAgfVxuICAgICAgICAgfCB9KTtcbiAgICAgICAgXFwqL1xuICAgICAgICBzdGFydDogZnVuY3Rpb24gKGFjdGlvbiwgaW50ZXJhY3RhYmxlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pbnRlcmFjdGluZygpXG4gICAgICAgICAgICAgICAgfHwgIXRoaXMucG9pbnRlcklzRG93blxuICAgICAgICAgICAgICAgIHx8IHRoaXMucG9pbnRlcklkcy5sZW5ndGggPCAoYWN0aW9uLm5hbWUgPT09ICdnZXN0dXJlJz8gMiA6IDEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiB0aGlzIGludGVyYWN0aW9uIGhhZCBiZWVuIHJlbW92ZWQgYWZ0ZXIgc3RvcHBpbmdcbiAgICAgICAgICAgIC8vIGFkZCBpdCBiYWNrXG4gICAgICAgICAgICBpZiAoaW5kZXhPZihpbnRlcmFjdGlvbnMsIHRoaXMpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGludGVyYWN0aW9ucy5wdXNoKHRoaXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzZXQgdGhlIHN0YXJ0Q29vcmRzIGlmIHRoZXJlIHdhcyBubyBwcmVwYXJlZCBhY3Rpb25cbiAgICAgICAgICAgIGlmICghdGhpcy5wcmVwYXJlZC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRFdmVudFhZKHRoaXMuc3RhcnRDb29yZHMsIHRoaXMucG9pbnRlcnMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnByZXBhcmVkLm5hbWUgID0gYWN0aW9uLm5hbWU7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmVkLmF4aXMgID0gYWN0aW9uLmF4aXM7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmVkLmVkZ2VzID0gYWN0aW9uLmVkZ2VzO1xuICAgICAgICAgICAgdGhpcy50YXJnZXQgICAgICAgICA9IGludGVyYWN0YWJsZTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCAgICAgICAgPSBlbGVtZW50O1xuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXJ0T2Zmc2V0cyhhY3Rpb24ubmFtZSwgaW50ZXJhY3RhYmxlLCBlbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuc2V0TW9kaWZpY2F0aW9ucyh0aGlzLnN0YXJ0Q29vcmRzLnBhZ2UpO1xuXG4gICAgICAgICAgICB0aGlzLnByZXZFdmVudCA9IHRoaXNbdGhpcy5wcmVwYXJlZC5uYW1lICsgJ1N0YXJ0J10odGhpcy5kb3duRXZlbnQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHBvaW50ZXJNb3ZlOiBmdW5jdGlvbiAocG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCBjdXJFdmVudFRhcmdldCwgcHJlRW5kKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pbmVydGlhU3RhdHVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHZhciBwYWdlVXAgICA9IHRoaXMuaW5lcnRpYVN0YXR1cy51cENvb3Jkcy5wYWdlO1xuICAgICAgICAgICAgICAgIHZhciBjbGllbnRVcCA9IHRoaXMuaW5lcnRpYVN0YXR1cy51cENvb3Jkcy5jbGllbnQ7XG5cbiAgICAgICAgICAgICAgICB2YXIgaW5lcnRpYVBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBwYWdlWCAgOiBwYWdlVXAueCAgICsgdGhpcy5pbmVydGlhU3RhdHVzLnN4LFxuICAgICAgICAgICAgICAgICAgICBwYWdlWSAgOiBwYWdlVXAueSAgICsgdGhpcy5pbmVydGlhU3RhdHVzLnN5LFxuICAgICAgICAgICAgICAgICAgICBjbGllbnRYOiBjbGllbnRVcC54ICsgdGhpcy5pbmVydGlhU3RhdHVzLnN4LFxuICAgICAgICAgICAgICAgICAgICBjbGllbnRZOiBjbGllbnRVcC55ICsgdGhpcy5pbmVydGlhU3RhdHVzLnN5XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RXZlbnRYWSh0aGlzLmN1ckNvb3JkcywgW2luZXJ0aWFQb3NpdGlvbl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWNvcmRQb2ludGVyKHBvaW50ZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RXZlbnRYWSh0aGlzLmN1ckNvb3JkcywgdGhpcy5wb2ludGVycyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkdXBsaWNhdGVNb3ZlID0gKHRoaXMuY3VyQ29vcmRzLnBhZ2UueCA9PT0gdGhpcy5wcmV2Q29vcmRzLnBhZ2UueFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5jdXJDb29yZHMucGFnZS55ID09PSB0aGlzLnByZXZDb29yZHMucGFnZS55XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmN1ckNvb3Jkcy5jbGllbnQueCA9PT0gdGhpcy5wcmV2Q29vcmRzLmNsaWVudC54XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmN1ckNvb3Jkcy5jbGllbnQueSA9PT0gdGhpcy5wcmV2Q29vcmRzLmNsaWVudC55KTtcblxuICAgICAgICAgICAgdmFyIGR4LCBkeSxcbiAgICAgICAgICAgICAgICBwb2ludGVySW5kZXggPSB0aGlzLm1vdXNlPyAwIDogaW5kZXhPZih0aGlzLnBvaW50ZXJJZHMsIGdldFBvaW50ZXJJZChwb2ludGVyKSk7XG5cbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyIG1vdmVtZW50IGdyZWF0ZXIgdGhhbiBwb2ludGVyTW92ZVRvbGVyYW5jZVxuICAgICAgICAgICAgaWYgKHRoaXMucG9pbnRlcklzRG93biAmJiAhdGhpcy5wb2ludGVyV2FzTW92ZWQpIHtcbiAgICAgICAgICAgICAgICBkeCA9IHRoaXMuY3VyQ29vcmRzLmNsaWVudC54IC0gdGhpcy5zdGFydENvb3Jkcy5jbGllbnQueDtcbiAgICAgICAgICAgICAgICBkeSA9IHRoaXMuY3VyQ29vcmRzLmNsaWVudC55IC0gdGhpcy5zdGFydENvb3Jkcy5jbGllbnQueTtcblxuICAgICAgICAgICAgICAgIHRoaXMucG9pbnRlcldhc01vdmVkID0gaHlwb3QoZHgsIGR5KSA+IHBvaW50ZXJNb3ZlVG9sZXJhbmNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWR1cGxpY2F0ZU1vdmUgJiYgKCF0aGlzLnBvaW50ZXJJc0Rvd24gfHwgdGhpcy5wb2ludGVyV2FzTW92ZWQpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucG9pbnRlcklzRG93bikge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5ob2xkVGltZXJzW3BvaW50ZXJJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuY29sbGVjdEV2ZW50VGFyZ2V0cyhwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsICdtb3ZlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5wb2ludGVySXNEb3duKSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICBpZiAoZHVwbGljYXRlTW92ZSAmJiB0aGlzLnBvaW50ZXJXYXNNb3ZlZCAmJiAhcHJlRW5kKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0FuZFByZXZlbnREZWZhdWx0KGV2ZW50LCB0aGlzLnRhcmdldCwgdGhpcy5lbGVtZW50KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNldCBwb2ludGVyIGNvb3JkaW5hdGUsIHRpbWUgY2hhbmdlcyBhbmQgc3BlZWRzXG4gICAgICAgICAgICBzZXRFdmVudERlbHRhcyh0aGlzLnBvaW50ZXJEZWx0YSwgdGhpcy5wcmV2Q29vcmRzLCB0aGlzLmN1ckNvb3Jkcyk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5wcmVwYXJlZC5uYW1lKSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5wb2ludGVyV2FzTW92ZWRcbiAgICAgICAgICAgICAgICAvLyBpZ25vcmUgbW92ZW1lbnQgd2hpbGUgaW5lcnRpYSBpcyBhY3RpdmVcbiAgICAgICAgICAgICAgICAmJiAoIXRoaXMuaW5lcnRpYVN0YXR1cy5hY3RpdmUgfHwgKHBvaW50ZXIgaW5zdGFuY2VvZiBJbnRlcmFjdEV2ZW50ICYmIC9pbmVydGlhc3RhcnQvLnRlc3QocG9pbnRlci50eXBlKSkpKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiBqdXN0IHN0YXJ0aW5nIGFuIGFjdGlvbiwgY2FsY3VsYXRlIHRoZSBwb2ludGVyIHNwZWVkIG5vd1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pbnRlcmFjdGluZygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEV2ZW50RGVsdGFzKHRoaXMucG9pbnRlckRlbHRhLCB0aGlzLnByZXZDb29yZHMsIHRoaXMuY3VyQ29vcmRzKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBhIGRyYWcgaXMgaW4gdGhlIGNvcnJlY3QgYXhpc1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wcmVwYXJlZC5uYW1lID09PSAnZHJhZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhYnNYID0gTWF0aC5hYnMoZHgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFic1kgPSBNYXRoLmFicyhkeSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QXhpcyA9IHRoaXMudGFyZ2V0Lm9wdGlvbnMuZHJhZy5heGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF4aXMgPSAoYWJzWCA+IGFic1kgPyAneCcgOiBhYnNYIDwgYWJzWSA/ICd5JyA6ICd4eScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgbW92ZW1lbnQgaXNuJ3QgaW4gdGhlIGF4aXMgb2YgdGhlIGludGVyYWN0YWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF4aXMgIT09ICd4eScgJiYgdGFyZ2V0QXhpcyAhPT0gJ3h5JyAmJiB0YXJnZXRBeGlzICE9PSBheGlzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FuY2VsIHRoZSBwcmVwYXJlZCBhY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVkLm5hbWUgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlbiB0cnkgdG8gZ2V0IGEgZHJhZyBmcm9tIGFub3RoZXIgaW5lcmFjdGFibGVcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gZXZlbnRUYXJnZXQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBlbGVtZW50IGludGVyYWN0YWJsZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaXNFbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50SW50ZXJhY3RhYmxlID0gaW50ZXJhY3RhYmxlcy5nZXQoZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnRJbnRlcmFjdGFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIGVsZW1lbnRJbnRlcmFjdGFibGUgIT09IHRoaXMudGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiAhZWxlbWVudEludGVyYWN0YWJsZS5vcHRpb25zLmRyYWcubWFudWFsU3RhcnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIGVsZW1lbnRJbnRlcmFjdGFibGUuZ2V0QWN0aW9uKHRoaXMuZG93blBvaW50ZXIsIHRoaXMuZG93bkV2ZW50LCB0aGlzLCBlbGVtZW50KS5uYW1lID09PSAnZHJhZydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIGNoZWNrQXhpcyhheGlzLCBlbGVtZW50SW50ZXJhY3RhYmxlKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVkLm5hbWUgPSAnZHJhZyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IGVsZW1lbnRJbnRlcmFjdGFibGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gcGFyZW50RWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSdzIG5vIGRyYWcgZnJvbSBlbGVtZW50IGludGVyYWN0YWJsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgdGhlIHNlbGVjdG9yIGludGVyYWN0YWJsZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMucHJlcGFyZWQubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGhpc0ludGVyYWN0aW9uID0gdGhpcztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ2V0RHJhZ2dhYmxlID0gZnVuY3Rpb24gKGludGVyYWN0YWJsZSwgc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50cyA9IGllOE1hdGNoZXNTZWxlY3RvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW50ZXJhY3RhYmxlID09PSB0aGlzSW50ZXJhY3Rpb24udGFyZ2V0KSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5Db250ZXh0KGludGVyYWN0YWJsZSwgZXZlbnRUYXJnZXQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgIWludGVyYWN0YWJsZS5vcHRpb25zLmRyYWcubWFudWFsU3RhcnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiAhdGVzdElnbm9yZShpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGV2ZW50VGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRlc3RBbGxvdyhpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGV2ZW50VGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIG1hdGNoZXNTZWxlY3RvcihlbGVtZW50LCBzZWxlY3RvciwgZWxlbWVudHMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgaW50ZXJhY3RhYmxlLmdldEFjdGlvbih0aGlzSW50ZXJhY3Rpb24uZG93blBvaW50ZXIsIHRoaXNJbnRlcmFjdGlvbi5kb3duRXZlbnQsIHRoaXNJbnRlcmFjdGlvbiwgZWxlbWVudCkubmFtZSA9PT0gJ2RyYWcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgY2hlY2tBeGlzKGF4aXMsIGludGVyYWN0YWJsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB3aXRoaW5JbnRlcmFjdGlvbkxpbWl0KGludGVyYWN0YWJsZSwgZWxlbWVudCwgJ2RyYWcnKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0YWJsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gZXZlbnRUYXJnZXQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGlzRWxlbWVudChlbGVtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdG9ySW50ZXJhY3RhYmxlID0gaW50ZXJhY3RhYmxlcy5mb3JFYWNoU2VsZWN0b3IoZ2V0RHJhZ2dhYmxlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdG9ySW50ZXJhY3RhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlZC5uYW1lID0gJ2RyYWcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gc2VsZWN0b3JJbnRlcmFjdGFibGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IHBhcmVudEVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgc3RhcnRpbmcgPSAhIXRoaXMucHJlcGFyZWQubmFtZSAmJiAhdGhpcy5pbnRlcmFjdGluZygpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHN0YXJ0aW5nXG4gICAgICAgICAgICAgICAgICAgICYmICh0aGlzLnRhcmdldC5vcHRpb25zW3RoaXMucHJlcGFyZWQubmFtZV0ubWFudWFsU3RhcnRcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8ICF3aXRoaW5JbnRlcmFjdGlvbkxpbWl0KHRoaXMudGFyZ2V0LCB0aGlzLmVsZW1lbnQsIHRoaXMucHJlcGFyZWQpKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3AoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJlcGFyZWQubmFtZSAmJiB0aGlzLnRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnQodGhpcy5wcmVwYXJlZCwgdGhpcy50YXJnZXQsIHRoaXMuZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgc2hvdWxkTW92ZSA9IHRoaXMuc2V0TW9kaWZpY2F0aW9ucyh0aGlzLmN1ckNvb3Jkcy5wYWdlLCBwcmVFbmQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIG1vdmUgaWYgc25hcHBpbmcgb3IgcmVzdHJpY3Rpb24gZG9lc24ndCBwcmV2ZW50IGl0XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaG91bGRNb3ZlIHx8IHN0YXJ0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZFdmVudCA9IHRoaXNbdGhpcy5wcmVwYXJlZC5uYW1lICsgJ01vdmUnXShldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQW5kUHJldmVudERlZmF1bHQoZXZlbnQsIHRoaXMudGFyZ2V0LCB0aGlzLmVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29weUNvb3Jkcyh0aGlzLnByZXZDb29yZHMsIHRoaXMuY3VyQ29vcmRzKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcgfHwgdGhpcy5yZXNpemluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0b1Njcm9sbE1vdmUocG9pbnRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZHJhZ1N0YXJ0OiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBkcmFnRXZlbnQgPSBuZXcgSW50ZXJhY3RFdmVudCh0aGlzLCBldmVudCwgJ2RyYWcnLCAnc3RhcnQnLCB0aGlzLmVsZW1lbnQpO1xuXG4gICAgICAgICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LmZpcmUoZHJhZ0V2ZW50KTtcblxuICAgICAgICAgICAgLy8gcmVzZXQgYWN0aXZlIGRyb3B6b25lc1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVEcm9wcy5kcm9wem9uZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlRHJvcHMuZWxlbWVudHMgID0gW107XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZURyb3BzLnJlY3RzICAgICA9IFtdO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuZHluYW1pY0Ryb3ApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZURyb3BzKHRoaXMuZWxlbWVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkcm9wRXZlbnRzID0gdGhpcy5nZXREcm9wRXZlbnRzKGV2ZW50LCBkcmFnRXZlbnQpO1xuXG4gICAgICAgICAgICBpZiAoZHJvcEV2ZW50cy5hY3RpdmF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZUFjdGl2ZURyb3BzKGRyb3BFdmVudHMuYWN0aXZhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZHJhZ0V2ZW50O1xuICAgICAgICB9LFxuXG4gICAgICAgIGRyYWdNb3ZlOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSB0aGlzLnRhcmdldCxcbiAgICAgICAgICAgICAgICBkcmFnRXZlbnQgID0gbmV3IEludGVyYWN0RXZlbnQodGhpcywgZXZlbnQsICdkcmFnJywgJ21vdmUnLCB0aGlzLmVsZW1lbnQpLFxuICAgICAgICAgICAgICAgIGRyYWdnYWJsZUVsZW1lbnQgPSB0aGlzLmVsZW1lbnQsXG4gICAgICAgICAgICAgICAgZHJvcCA9IHRoaXMuZ2V0RHJvcChkcmFnRXZlbnQsIGV2ZW50LCBkcmFnZ2FibGVFbGVtZW50KTtcblxuICAgICAgICAgICAgdGhpcy5kcm9wVGFyZ2V0ID0gZHJvcC5kcm9wem9uZTtcbiAgICAgICAgICAgIHRoaXMuZHJvcEVsZW1lbnQgPSBkcm9wLmVsZW1lbnQ7XG5cbiAgICAgICAgICAgIHZhciBkcm9wRXZlbnRzID0gdGhpcy5nZXREcm9wRXZlbnRzKGV2ZW50LCBkcmFnRXZlbnQpO1xuXG4gICAgICAgICAgICB0YXJnZXQuZmlyZShkcmFnRXZlbnQpO1xuXG4gICAgICAgICAgICBpZiAoZHJvcEV2ZW50cy5sZWF2ZSkgeyB0aGlzLnByZXZEcm9wVGFyZ2V0LmZpcmUoZHJvcEV2ZW50cy5sZWF2ZSk7IH1cbiAgICAgICAgICAgIGlmIChkcm9wRXZlbnRzLmVudGVyKSB7ICAgICB0aGlzLmRyb3BUYXJnZXQuZmlyZShkcm9wRXZlbnRzLmVudGVyKTsgfVxuICAgICAgICAgICAgaWYgKGRyb3BFdmVudHMubW92ZSApIHsgICAgIHRoaXMuZHJvcFRhcmdldC5maXJlKGRyb3BFdmVudHMubW92ZSApOyB9XG5cbiAgICAgICAgICAgIHRoaXMucHJldkRyb3BUYXJnZXQgID0gdGhpcy5kcm9wVGFyZ2V0O1xuICAgICAgICAgICAgdGhpcy5wcmV2RHJvcEVsZW1lbnQgPSB0aGlzLmRyb3BFbGVtZW50O1xuXG4gICAgICAgICAgICByZXR1cm4gZHJhZ0V2ZW50O1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlc2l6ZVN0YXJ0OiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciByZXNpemVFdmVudCA9IG5ldyBJbnRlcmFjdEV2ZW50KHRoaXMsIGV2ZW50LCAncmVzaXplJywgJ3N0YXJ0JywgdGhpcy5lbGVtZW50KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucHJlcGFyZWQuZWRnZXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnRSZWN0ID0gdGhpcy50YXJnZXQuZ2V0UmVjdCh0aGlzLmVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgKiBXaGVuIHVzaW5nIHRoZSBgcmVzaXphYmxlLnNxdWFyZWAgb3IgYHJlc2l6YWJsZS5wcmVzZXJ2ZUFzcGVjdFJhdGlvYCBvcHRpb25zLCByZXNpemluZyBmcm9tIG9uZSBlZGdlXG4gICAgICAgICAgICAgICAgICogd2lsbCBhZmZlY3QgYW5vdGhlci4gRS5nLiB3aXRoIGByZXNpemFibGUuc3F1YXJlYCwgcmVzaXppbmcgdG8gbWFrZSB0aGUgcmlnaHQgZWRnZSBsYXJnZXIgd2lsbCBtYWtlXG4gICAgICAgICAgICAgICAgICogdGhlIGJvdHRvbSBlZGdlIGxhcmdlciBieSB0aGUgc2FtZSBhbW91bnQuIFdlIGNhbGwgdGhlc2UgJ2xpbmtlZCcgZWRnZXMuIEFueSBsaW5rZWQgZWRnZXMgd2lsbCBkZXBlbmRcbiAgICAgICAgICAgICAgICAgKiBvbiB0aGUgYWN0aXZlIGVkZ2VzIGFuZCB0aGUgZWRnZSBiZWluZyBpbnRlcmFjdGVkIHdpdGguXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0Lm9wdGlvbnMucmVzaXplLnNxdWFyZSB8fCB0aGlzLnRhcmdldC5vcHRpb25zLnJlc2l6ZS5wcmVzZXJ2ZUFzcGVjdFJhdGlvKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsaW5rZWRFZGdlcyA9IGV4dGVuZCh7fSwgdGhpcy5wcmVwYXJlZC5lZGdlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua2VkRWRnZXMudG9wICAgID0gbGlua2VkRWRnZXMudG9wICAgIHx8IChsaW5rZWRFZGdlcy5sZWZ0ICAgJiYgIWxpbmtlZEVkZ2VzLmJvdHRvbSk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmtlZEVkZ2VzLmxlZnQgICA9IGxpbmtlZEVkZ2VzLmxlZnQgICB8fCAobGlua2VkRWRnZXMudG9wICAgICYmICFsaW5rZWRFZGdlcy5yaWdodCApO1xuICAgICAgICAgICAgICAgICAgICBsaW5rZWRFZGdlcy5ib3R0b20gPSBsaW5rZWRFZGdlcy5ib3R0b20gfHwgKGxpbmtlZEVkZ2VzLnJpZ2h0ICAmJiAhbGlua2VkRWRnZXMudG9wICAgKTtcbiAgICAgICAgICAgICAgICAgICAgbGlua2VkRWRnZXMucmlnaHQgID0gbGlua2VkRWRnZXMucmlnaHQgIHx8IChsaW5rZWRFZGdlcy5ib3R0b20gJiYgIWxpbmtlZEVkZ2VzLmxlZnQgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlZC5fbGlua2VkRWRnZXMgPSBsaW5rZWRFZGdlcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZWQuX2xpbmtlZEVkZ2VzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB1c2luZyBgcmVzaXphYmxlLnByZXNlcnZlQXNwZWN0UmF0aW9gIG9wdGlvbiwgcmVjb3JkIGFzcGVjdCByYXRpbyBhdCB0aGUgc3RhcnQgb2YgdGhlIHJlc2l6ZVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldC5vcHRpb25zLnJlc2l6ZS5wcmVzZXJ2ZUFzcGVjdFJhdGlvKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzaXplU3RhcnRBc3BlY3RSYXRpbyA9IHN0YXJ0UmVjdC53aWR0aCAvIHN0YXJ0UmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemVSZWN0cyA9IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQgICAgIDogc3RhcnRSZWN0LFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ICAgOiBleHRlbmQoe30sIHN0YXJ0UmVjdCksXG4gICAgICAgICAgICAgICAgICAgIHJlc3RyaWN0ZWQ6IGV4dGVuZCh7fSwgc3RhcnRSZWN0KSxcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMgIDogZXh0ZW5kKHt9LCBzdGFydFJlY3QpLFxuICAgICAgICAgICAgICAgICAgICBkZWx0YSAgICAgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAwLCByaWdodCA6IDAsIHdpZHRoIDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcCA6IDAsIGJvdHRvbTogMCwgaGVpZ2h0OiAwXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcmVzaXplRXZlbnQucmVjdCA9IHRoaXMucmVzaXplUmVjdHMucmVzdHJpY3RlZDtcbiAgICAgICAgICAgICAgICByZXNpemVFdmVudC5kZWx0YVJlY3QgPSB0aGlzLnJlc2l6ZVJlY3RzLmRlbHRhO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnRhcmdldC5maXJlKHJlc2l6ZUV2ZW50KTtcblxuICAgICAgICAgICAgdGhpcy5yZXNpemluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHJldHVybiByZXNpemVFdmVudDtcbiAgICAgICAgfSxcblxuICAgICAgICByZXNpemVNb3ZlOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciByZXNpemVFdmVudCA9IG5ldyBJbnRlcmFjdEV2ZW50KHRoaXMsIGV2ZW50LCAncmVzaXplJywgJ21vdmUnLCB0aGlzLmVsZW1lbnQpO1xuXG4gICAgICAgICAgICB2YXIgZWRnZXMgPSB0aGlzLnByZXBhcmVkLmVkZ2VzLFxuICAgICAgICAgICAgICAgIGludmVydCA9IHRoaXMudGFyZ2V0Lm9wdGlvbnMucmVzaXplLmludmVydCxcbiAgICAgICAgICAgICAgICBpbnZlcnRpYmxlID0gaW52ZXJ0ID09PSAncmVwb3NpdGlvbicgfHwgaW52ZXJ0ID09PSAnbmVnYXRlJztcblxuICAgICAgICAgICAgaWYgKGVkZ2VzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGR4ID0gcmVzaXplRXZlbnQuZHgsXG4gICAgICAgICAgICAgICAgICAgIGR5ID0gcmVzaXplRXZlbnQuZHksXG5cbiAgICAgICAgICAgICAgICAgICAgc3RhcnQgICAgICA9IHRoaXMucmVzaXplUmVjdHMuc3RhcnQsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgICAgPSB0aGlzLnJlc2l6ZVJlY3RzLmN1cnJlbnQsXG4gICAgICAgICAgICAgICAgICAgIHJlc3RyaWN0ZWQgPSB0aGlzLnJlc2l6ZVJlY3RzLnJlc3RyaWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhICAgICAgPSB0aGlzLnJlc2l6ZVJlY3RzLmRlbHRhLFxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyAgID0gZXh0ZW5kKHRoaXMucmVzaXplUmVjdHMucHJldmlvdXMsIHJlc3RyaWN0ZWQpLFxuXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRWRnZXMgPSBlZGdlcztcblxuICAgICAgICAgICAgICAgIC8vIGByZXNpemUucHJlc2VydmVBc3BlY3RSYXRpb2AgdGFrZXMgcHJlY2VkZW5jZSBvdmVyIGByZXNpemUuc3F1YXJlYFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldC5vcHRpb25zLnJlc2l6ZS5wcmVzZXJ2ZUFzcGVjdFJhdGlvKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXNpemVTdGFydEFzcGVjdFJhdGlvID0gdGhpcy5yZXNpemVTdGFydEFzcGVjdFJhdGlvO1xuXG4gICAgICAgICAgICAgICAgICAgIGVkZ2VzID0gdGhpcy5wcmVwYXJlZC5fbGlua2VkRWRnZXM7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKChvcmlnaW5hbEVkZ2VzLmxlZnQgJiYgb3JpZ2luYWxFZGdlcy5ib3R0b20pXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCAob3JpZ2luYWxFZGdlcy5yaWdodCAmJiBvcmlnaW5hbEVkZ2VzLnRvcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGR5ID0gLWR4IC8gcmVzaXplU3RhcnRBc3BlY3RSYXRpbztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChvcmlnaW5hbEVkZ2VzLmxlZnQgfHwgb3JpZ2luYWxFZGdlcy5yaWdodCkgeyBkeSA9IGR4IC8gcmVzaXplU3RhcnRBc3BlY3RSYXRpbzsgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChvcmlnaW5hbEVkZ2VzLnRvcCB8fCBvcmlnaW5hbEVkZ2VzLmJvdHRvbSkgeyBkeCA9IGR5ICogcmVzaXplU3RhcnRBc3BlY3RSYXRpbzsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnRhcmdldC5vcHRpb25zLnJlc2l6ZS5zcXVhcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgZWRnZXMgPSB0aGlzLnByZXBhcmVkLl9saW5rZWRFZGdlcztcblxuICAgICAgICAgICAgICAgICAgICBpZiAoKG9yaWdpbmFsRWRnZXMubGVmdCAmJiBvcmlnaW5hbEVkZ2VzLmJvdHRvbSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IChvcmlnaW5hbEVkZ2VzLnJpZ2h0ICYmIG9yaWdpbmFsRWRnZXMudG9wKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZHkgPSAtZHg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob3JpZ2luYWxFZGdlcy5sZWZ0IHx8IG9yaWdpbmFsRWRnZXMucmlnaHQpIHsgZHkgPSBkeDsgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChvcmlnaW5hbEVkZ2VzLnRvcCB8fCBvcmlnaW5hbEVkZ2VzLmJvdHRvbSkgeyBkeCA9IGR5OyB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSAnY3VycmVudCcgcmVjdCB3aXRob3V0IG1vZGlmaWNhdGlvbnNcbiAgICAgICAgICAgICAgICBpZiAoZWRnZXMudG9wICAgKSB7IGN1cnJlbnQudG9wICAgICs9IGR5OyB9XG4gICAgICAgICAgICAgICAgaWYgKGVkZ2VzLmJvdHRvbSkgeyBjdXJyZW50LmJvdHRvbSArPSBkeTsgfVxuICAgICAgICAgICAgICAgIGlmIChlZGdlcy5sZWZ0ICApIHsgY3VycmVudC5sZWZ0ICAgKz0gZHg7IH1cbiAgICAgICAgICAgICAgICBpZiAoZWRnZXMucmlnaHQgKSB7IGN1cnJlbnQucmlnaHQgICs9IGR4OyB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaW52ZXJ0aWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiBpbnZlcnRpYmxlLCBjb3B5IHRoZSBjdXJyZW50IHJlY3RcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5kKHJlc3RyaWN0ZWQsIGN1cnJlbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnZlcnQgPT09ICdyZXBvc2l0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3dhcCBlZGdlIHZhbHVlcyBpZiBuZWNlc3NhcnkgdG8ga2VlcCB3aWR0aC9oZWlnaHQgcG9zaXRpdmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzd2FwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdHJpY3RlZC50b3AgPiByZXN0cmljdGVkLmJvdHRvbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3YXAgPSByZXN0cmljdGVkLnRvcDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3RyaWN0ZWQudG9wID0gcmVzdHJpY3RlZC5ib3R0b207XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdHJpY3RlZC5ib3R0b20gPSBzd2FwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3RyaWN0ZWQubGVmdCA+IHJlc3RyaWN0ZWQucmlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2FwID0gcmVzdHJpY3RlZC5sZWZ0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdHJpY3RlZC5sZWZ0ID0gcmVzdHJpY3RlZC5yaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN0cmljdGVkLnJpZ2h0ID0gc3dhcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgbm90IGludmVydGlibGUsIHJlc3RyaWN0IHRvIG1pbmltdW0gb2YgMHgwIHJlY3RcbiAgICAgICAgICAgICAgICAgICAgcmVzdHJpY3RlZC50b3AgICAgPSBNYXRoLm1pbihjdXJyZW50LnRvcCwgc3RhcnQuYm90dG9tKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdHJpY3RlZC5ib3R0b20gPSBNYXRoLm1heChjdXJyZW50LmJvdHRvbSwgc3RhcnQudG9wKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdHJpY3RlZC5sZWZ0ICAgPSBNYXRoLm1pbihjdXJyZW50LmxlZnQsIHN0YXJ0LnJpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdHJpY3RlZC5yaWdodCAgPSBNYXRoLm1heChjdXJyZW50LnJpZ2h0LCBzdGFydC5sZWZ0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXN0cmljdGVkLndpZHRoICA9IHJlc3RyaWN0ZWQucmlnaHQgIC0gcmVzdHJpY3RlZC5sZWZ0O1xuICAgICAgICAgICAgICAgIHJlc3RyaWN0ZWQuaGVpZ2h0ID0gcmVzdHJpY3RlZC5ib3R0b20gLSByZXN0cmljdGVkLnRvcCA7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBlZGdlIGluIHJlc3RyaWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFbZWRnZV0gPSByZXN0cmljdGVkW2VkZ2VdIC0gcHJldmlvdXNbZWRnZV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzaXplRXZlbnQuZWRnZXMgPSB0aGlzLnByZXBhcmVkLmVkZ2VzO1xuICAgICAgICAgICAgICAgIHJlc2l6ZUV2ZW50LnJlY3QgPSByZXN0cmljdGVkO1xuICAgICAgICAgICAgICAgIHJlc2l6ZUV2ZW50LmRlbHRhUmVjdCA9IGRlbHRhO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnRhcmdldC5maXJlKHJlc2l6ZUV2ZW50KTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc2l6ZUV2ZW50O1xuICAgICAgICB9LFxuXG4gICAgICAgIGdlc3R1cmVTdGFydDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgZ2VzdHVyZUV2ZW50ID0gbmV3IEludGVyYWN0RXZlbnQodGhpcywgZXZlbnQsICdnZXN0dXJlJywgJ3N0YXJ0JywgdGhpcy5lbGVtZW50KTtcblxuICAgICAgICAgICAgZ2VzdHVyZUV2ZW50LmRzID0gMDtcblxuICAgICAgICAgICAgdGhpcy5nZXN0dXJlLnN0YXJ0RGlzdGFuY2UgPSB0aGlzLmdlc3R1cmUucHJldkRpc3RhbmNlID0gZ2VzdHVyZUV2ZW50LmRpc3RhbmNlO1xuICAgICAgICAgICAgdGhpcy5nZXN0dXJlLnN0YXJ0QW5nbGUgPSB0aGlzLmdlc3R1cmUucHJldkFuZ2xlID0gZ2VzdHVyZUV2ZW50LmFuZ2xlO1xuICAgICAgICAgICAgdGhpcy5nZXN0dXJlLnNjYWxlID0gMTtcblxuICAgICAgICAgICAgdGhpcy5nZXN0dXJpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLnRhcmdldC5maXJlKGdlc3R1cmVFdmVudCk7XG5cbiAgICAgICAgICAgIHJldHVybiBnZXN0dXJlRXZlbnQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2VzdHVyZU1vdmU6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnBvaW50ZXJJZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJldkV2ZW50O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZ2VzdHVyZUV2ZW50O1xuXG4gICAgICAgICAgICBnZXN0dXJlRXZlbnQgPSBuZXcgSW50ZXJhY3RFdmVudCh0aGlzLCBldmVudCwgJ2dlc3R1cmUnLCAnbW92ZScsIHRoaXMuZWxlbWVudCk7XG4gICAgICAgICAgICBnZXN0dXJlRXZlbnQuZHMgPSBnZXN0dXJlRXZlbnQuc2NhbGUgLSB0aGlzLmdlc3R1cmUuc2NhbGU7XG5cbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LmZpcmUoZ2VzdHVyZUV2ZW50KTtcblxuICAgICAgICAgICAgdGhpcy5nZXN0dXJlLnByZXZBbmdsZSA9IGdlc3R1cmVFdmVudC5hbmdsZTtcbiAgICAgICAgICAgIHRoaXMuZ2VzdHVyZS5wcmV2RGlzdGFuY2UgPSBnZXN0dXJlRXZlbnQuZGlzdGFuY2U7XG5cbiAgICAgICAgICAgIGlmIChnZXN0dXJlRXZlbnQuc2NhbGUgIT09IEluZmluaXR5ICYmXG4gICAgICAgICAgICAgICAgZ2VzdHVyZUV2ZW50LnNjYWxlICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgZ2VzdHVyZUV2ZW50LnNjYWxlICE9PSB1bmRlZmluZWQgICYmXG4gICAgICAgICAgICAgICAgIWlzTmFOKGdlc3R1cmVFdmVudC5zY2FsZSkpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuZ2VzdHVyZS5zY2FsZSA9IGdlc3R1cmVFdmVudC5zY2FsZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGdlc3R1cmVFdmVudDtcbiAgICAgICAgfSxcblxuICAgICAgICBwb2ludGVySG9sZDogZnVuY3Rpb24gKHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCkge1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0RXZlbnRUYXJnZXRzKHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCwgJ2hvbGQnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBwb2ludGVyVXA6IGZ1bmN0aW9uIChwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsIGN1ckV2ZW50VGFyZ2V0KSB7XG4gICAgICAgICAgICB2YXIgcG9pbnRlckluZGV4ID0gdGhpcy5tb3VzZT8gMCA6IGluZGV4T2YodGhpcy5wb2ludGVySWRzLCBnZXRQb2ludGVySWQocG9pbnRlcikpO1xuXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5ob2xkVGltZXJzW3BvaW50ZXJJbmRleF0pO1xuXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3RFdmVudFRhcmdldHMocG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCAndXAnICk7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3RFdmVudFRhcmdldHMocG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCAndGFwJyk7XG5cbiAgICAgICAgICAgIHRoaXMucG9pbnRlckVuZChwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsIGN1ckV2ZW50VGFyZ2V0KTtcblxuICAgICAgICAgICAgdGhpcy5yZW1vdmVQb2ludGVyKHBvaW50ZXIpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHBvaW50ZXJDYW5jZWw6IGZ1bmN0aW9uIChwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsIGN1ckV2ZW50VGFyZ2V0KSB7XG4gICAgICAgICAgICB2YXIgcG9pbnRlckluZGV4ID0gdGhpcy5tb3VzZT8gMCA6IGluZGV4T2YodGhpcy5wb2ludGVySWRzLCBnZXRQb2ludGVySWQocG9pbnRlcikpO1xuXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5ob2xkVGltZXJzW3BvaW50ZXJJbmRleF0pO1xuXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3RFdmVudFRhcmdldHMocG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCAnY2FuY2VsJyk7XG4gICAgICAgICAgICB0aGlzLnBvaW50ZXJFbmQocG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCBjdXJFdmVudFRhcmdldCk7XG5cbiAgICAgICAgICAgIHRoaXMucmVtb3ZlUG9pbnRlcihwb2ludGVyKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBodHRwOi8vd3d3LnF1aXJrc21vZGUub3JnL2RvbS9ldmVudHMvY2xpY2suaHRtbFxuICAgICAgICAvLyA+RXZlbnRzIGxlYWRpbmcgdG8gZGJsY2xpY2tcbiAgICAgICAgLy9cbiAgICAgICAgLy8gSUU4IGRvZXNuJ3QgZmlyZSBkb3duIGV2ZW50IGJlZm9yZSBkYmxjbGljay5cbiAgICAgICAgLy8gVGhpcyB3b3JrYXJvdW5kIHRyaWVzIHRvIGZpcmUgYSB0YXAgYW5kIGRvdWJsZXRhcCBhZnRlciBkYmxjbGlja1xuICAgICAgICBpZThEYmxjbGljazogZnVuY3Rpb24gKHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldlRhcFxuICAgICAgICAgICAgICAgICYmIGV2ZW50LmNsaWVudFggPT09IHRoaXMucHJldlRhcC5jbGllbnRYXG4gICAgICAgICAgICAgICAgJiYgZXZlbnQuY2xpZW50WSA9PT0gdGhpcy5wcmV2VGFwLmNsaWVudFlcbiAgICAgICAgICAgICAgICAmJiBldmVudFRhcmdldCAgID09PSB0aGlzLnByZXZUYXAudGFyZ2V0KSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRvd25UYXJnZXRzWzBdID0gZXZlbnRUYXJnZXQ7XG4gICAgICAgICAgICAgICAgdGhpcy5kb3duVGltZXNbMF0gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxlY3RFdmVudFRhcmdldHMocG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCAndGFwJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gRW5kIGludGVyYWN0IG1vdmUgZXZlbnRzIGFuZCBzdG9wIGF1dG8tc2Nyb2xsIHVubGVzcyBpbmVydGlhIGlzIGVuYWJsZWRcbiAgICAgICAgcG9pbnRlckVuZDogZnVuY3Rpb24gKHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCwgY3VyRXZlbnRUYXJnZXQpIHtcbiAgICAgICAgICAgIHZhciBlbmRFdmVudCxcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSB0aGlzLnRhcmdldCxcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gdGFyZ2V0ICYmIHRhcmdldC5vcHRpb25zLFxuICAgICAgICAgICAgICAgIGluZXJ0aWFPcHRpb25zID0gb3B0aW9ucyAmJiB0aGlzLnByZXBhcmVkLm5hbWUgJiYgb3B0aW9uc1t0aGlzLnByZXBhcmVkLm5hbWVdLmluZXJ0aWEsXG4gICAgICAgICAgICAgICAgaW5lcnRpYVN0YXR1cyA9IHRoaXMuaW5lcnRpYVN0YXR1cztcblxuICAgICAgICAgICAgaWYgKHRoaXMuaW50ZXJhY3RpbmcoKSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGluZXJ0aWFTdGF0dXMuYWN0aXZlICYmICFpbmVydGlhU3RhdHVzLmVuZGluZykgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgICAgIHZhciBwb2ludGVyU3BlZWQsXG4gICAgICAgICAgICAgICAgICAgIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgICAgICAgICAgICAgICBpbmVydGlhUG9zc2libGUgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgaW5lcnRpYSA9IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBzbW9vdGhFbmQgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZW5kU25hcCA9IGNoZWNrU25hcCh0YXJnZXQsIHRoaXMucHJlcGFyZWQubmFtZSkgJiYgb3B0aW9uc1t0aGlzLnByZXBhcmVkLm5hbWVdLnNuYXAuZW5kT25seSxcbiAgICAgICAgICAgICAgICAgICAgZW5kUmVzdHJpY3QgPSBjaGVja1Jlc3RyaWN0KHRhcmdldCwgdGhpcy5wcmVwYXJlZC5uYW1lKSAmJiBvcHRpb25zW3RoaXMucHJlcGFyZWQubmFtZV0ucmVzdHJpY3QuZW5kT25seSxcbiAgICAgICAgICAgICAgICAgICAgZHggPSAwLFxuICAgICAgICAgICAgICAgICAgICBkeSA9IDAsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0RXZlbnQ7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAgICAgIChvcHRpb25zLmRyYWcuYXhpcyA9PT0gJ3gnICkgeyBwb2ludGVyU3BlZWQgPSBNYXRoLmFicyh0aGlzLnBvaW50ZXJEZWx0YS5jbGllbnQudngpOyB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9wdGlvbnMuZHJhZy5heGlzID09PSAneScgKSB7IHBvaW50ZXJTcGVlZCA9IE1hdGguYWJzKHRoaXMucG9pbnRlckRlbHRhLmNsaWVudC52eSk7IH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSAgIC8qb3B0aW9ucy5kcmFnLmF4aXMgPT09ICd4eScqL3sgcG9pbnRlclNwZWVkID0gdGhpcy5wb2ludGVyRGVsdGEuY2xpZW50LnNwZWVkOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwb2ludGVyU3BlZWQgPSB0aGlzLnBvaW50ZXJEZWx0YS5jbGllbnQuc3BlZWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgaW5lcnRpYSBzaG91bGQgYmUgc3RhcnRlZFxuICAgICAgICAgICAgICAgIGluZXJ0aWFQb3NzaWJsZSA9IChpbmVydGlhT3B0aW9ucyAmJiBpbmVydGlhT3B0aW9ucy5lbmFibGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMucHJlcGFyZWQubmFtZSAhPT0gJ2dlc3R1cmUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIGV2ZW50ICE9PSBpbmVydGlhU3RhdHVzLnN0YXJ0RXZlbnQpO1xuXG4gICAgICAgICAgICAgICAgaW5lcnRpYSA9IChpbmVydGlhUG9zc2libGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIChub3cgLSB0aGlzLmN1ckNvb3Jkcy50aW1lU3RhbXApIDwgNTBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHBvaW50ZXJTcGVlZCA+IGluZXJ0aWFPcHRpb25zLm1pblNwZWVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAmJiBwb2ludGVyU3BlZWQgPiBpbmVydGlhT3B0aW9ucy5lbmRTcGVlZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5lcnRpYVBvc3NpYmxlICYmICFpbmVydGlhICYmIChlbmRTbmFwIHx8IGVuZFJlc3RyaWN0KSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzbmFwUmVzdHJpY3QgPSB7fTtcblxuICAgICAgICAgICAgICAgICAgICBzbmFwUmVzdHJpY3Quc25hcCA9IHNuYXBSZXN0cmljdC5yZXN0cmljdCA9IHNuYXBSZXN0cmljdDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZW5kU25hcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTbmFwcGluZyh0aGlzLmN1ckNvb3Jkcy5wYWdlLCBzbmFwUmVzdHJpY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNuYXBSZXN0cmljdC5sb2NrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCArPSBzbmFwUmVzdHJpY3QuZHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHkgKz0gc25hcFJlc3RyaWN0LmR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVuZFJlc3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFJlc3RyaWN0aW9uKHRoaXMuY3VyQ29vcmRzLnBhZ2UsIHNuYXBSZXN0cmljdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc25hcFJlc3RyaWN0LnJlc3RyaWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCArPSBzbmFwUmVzdHJpY3QuZHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHkgKz0gc25hcFJlc3RyaWN0LmR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGR4IHx8IGR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbW9vdGhFbmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGluZXJ0aWEgfHwgc21vb3RoRW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvcHlDb29yZHMoaW5lcnRpYVN0YXR1cy51cENvb3JkcywgdGhpcy5jdXJDb29yZHMpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9pbnRlcnNbMF0gPSBpbmVydGlhU3RhdHVzLnN0YXJ0RXZlbnQgPSBzdGFydEV2ZW50ID1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBJbnRlcmFjdEV2ZW50KHRoaXMsIGV2ZW50LCB0aGlzLnByZXBhcmVkLm5hbWUsICdpbmVydGlhc3RhcnQnLCB0aGlzLmVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGluZXJ0aWFTdGF0dXMudDAgPSBub3c7XG5cbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmZpcmUoaW5lcnRpYVN0YXR1cy5zdGFydEV2ZW50KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5lcnRpYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5lcnRpYVN0YXR1cy52eDAgPSB0aGlzLnBvaW50ZXJEZWx0YS5jbGllbnQudng7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmVydGlhU3RhdHVzLnZ5MCA9IHRoaXMucG9pbnRlckRlbHRhLmNsaWVudC52eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZXJ0aWFTdGF0dXMudjAgPSBwb2ludGVyU3BlZWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsY0luZXJ0aWEoaW5lcnRpYVN0YXR1cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYWdlID0gZXh0ZW5kKHt9LCB0aGlzLmN1ckNvb3Jkcy5wYWdlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW4gPSBnZXRPcmlnaW5YWSh0YXJnZXQsIHRoaXMuZWxlbWVudCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzT2JqZWN0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlLnggPSBwYWdlLnggKyBpbmVydGlhU3RhdHVzLnhlIC0gb3JpZ2luLng7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlLnkgPSBwYWdlLnkgKyBpbmVydGlhU3RhdHVzLnllIC0gb3JpZ2luLnk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c09iamVjdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VTdGF0dXNYWTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBwYWdlLngsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogcGFnZS55LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR5OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNuYXA6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c09iamVjdC5zbmFwID0gc3RhdHVzT2JqZWN0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkeCA9IGR5ID0gMDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVuZFNuYXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc25hcCA9IHRoaXMuc2V0U25hcHBpbmcodGhpcy5jdXJDb29yZHMucGFnZSwgc3RhdHVzT2JqZWN0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzbmFwLmxvY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCArPSBzbmFwLmR4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeSArPSBzbmFwLmR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVuZFJlc3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3RyaWN0ID0gdGhpcy5zZXRSZXN0cmljdGlvbih0aGlzLmN1ckNvb3Jkcy5wYWdlLCBzdGF0dXNPYmplY3QpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3RyaWN0LnJlc3RyaWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHggKz0gcmVzdHJpY3QuZHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR5ICs9IHJlc3RyaWN0LmR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaW5lcnRpYVN0YXR1cy5tb2RpZmllZFhlICs9IGR4O1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5lcnRpYVN0YXR1cy5tb2RpZmllZFllICs9IGR5O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmVydGlhU3RhdHVzLmkgPSByZXFGcmFtZSh0aGlzLmJvdW5kSW5lcnRpYUZyYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZXJ0aWFTdGF0dXMuc21vb3RoRW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZXJ0aWFTdGF0dXMueGUgPSBkeDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZXJ0aWFTdGF0dXMueWUgPSBkeTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaW5lcnRpYVN0YXR1cy5zeCA9IGluZXJ0aWFTdGF0dXMuc3kgPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmVydGlhU3RhdHVzLmkgPSByZXFGcmFtZSh0aGlzLmJvdW5kU21vb3RoRW5kRnJhbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaW5lcnRpYVN0YXR1cy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGVuZFNuYXAgfHwgZW5kUmVzdHJpY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZmlyZSBhIG1vdmUgZXZlbnQgYXQgdGhlIHNuYXBwZWQgY29vcmRpbmF0ZXNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2ludGVyTW92ZShwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsIGN1ckV2ZW50VGFyZ2V0LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgZW5kRXZlbnQgPSBuZXcgSW50ZXJhY3RFdmVudCh0aGlzLCBldmVudCwgJ2RyYWcnLCAnZW5kJywgdGhpcy5lbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIHZhciBkcmFnZ2FibGVFbGVtZW50ID0gdGhpcy5lbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICBkcm9wID0gdGhpcy5nZXREcm9wKGVuZEV2ZW50LCBldmVudCwgZHJhZ2dhYmxlRWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRyb3BUYXJnZXQgPSBkcm9wLmRyb3B6b25lO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJvcEVsZW1lbnQgPSBkcm9wLmVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICB2YXIgZHJvcEV2ZW50cyA9IHRoaXMuZ2V0RHJvcEV2ZW50cyhldmVudCwgZW5kRXZlbnQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRyb3BFdmVudHMubGVhdmUpIHsgdGhpcy5wcmV2RHJvcFRhcmdldC5maXJlKGRyb3BFdmVudHMubGVhdmUpOyB9XG4gICAgICAgICAgICAgICAgaWYgKGRyb3BFdmVudHMuZW50ZXIpIHsgICAgIHRoaXMuZHJvcFRhcmdldC5maXJlKGRyb3BFdmVudHMuZW50ZXIpOyB9XG4gICAgICAgICAgICAgICAgaWYgKGRyb3BFdmVudHMuZHJvcCApIHsgICAgIHRoaXMuZHJvcFRhcmdldC5maXJlKGRyb3BFdmVudHMuZHJvcCApOyB9XG4gICAgICAgICAgICAgICAgaWYgKGRyb3BFdmVudHMuZGVhY3RpdmF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcmVBY3RpdmVEcm9wcyhkcm9wRXZlbnRzLmRlYWN0aXZhdGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRhcmdldC5maXJlKGVuZEV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMucmVzaXppbmcpIHtcbiAgICAgICAgICAgICAgICBlbmRFdmVudCA9IG5ldyBJbnRlcmFjdEV2ZW50KHRoaXMsIGV2ZW50LCAncmVzaXplJywgJ2VuZCcsIHRoaXMuZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmZpcmUoZW5kRXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5nZXN0dXJpbmcpIHtcbiAgICAgICAgICAgICAgICBlbmRFdmVudCA9IG5ldyBJbnRlcmFjdEV2ZW50KHRoaXMsIGV2ZW50LCAnZ2VzdHVyZScsICdlbmQnLCB0aGlzLmVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHRhcmdldC5maXJlKGVuZEV2ZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zdG9wKGV2ZW50KTtcbiAgICAgICAgfSxcblxuICAgICAgICBjb2xsZWN0RHJvcHM6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgZHJvcHMgPSBbXSxcbiAgICAgICAgICAgICAgICBlbGVtZW50cyA9IFtdLFxuICAgICAgICAgICAgICAgIGk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50IHx8IHRoaXMuZWxlbWVudDtcblxuICAgICAgICAgICAgLy8gY29sbGVjdCBhbGwgZHJvcHpvbmVzIGFuZCB0aGVpciBlbGVtZW50cyB3aGljaCBxdWFsaWZ5IGZvciBhIGRyb3BcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBpbnRlcmFjdGFibGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpbnRlcmFjdGFibGVzW2ldLm9wdGlvbnMuZHJvcC5lbmFibGVkKSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudCA9IGludGVyYWN0YWJsZXNbaV0sXG4gICAgICAgICAgICAgICAgICAgIGFjY2VwdCA9IGN1cnJlbnQub3B0aW9ucy5kcm9wLmFjY2VwdDtcblxuICAgICAgICAgICAgICAgIC8vIHRlc3QgdGhlIGRyYWdnYWJsZSBlbGVtZW50IGFnYWluc3QgdGhlIGRyb3B6b25lJ3MgYWNjZXB0IHNldHRpbmdcbiAgICAgICAgICAgICAgICBpZiAoKGlzRWxlbWVudChhY2NlcHQpICYmIGFjY2VwdCAhPT0gZWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgfHwgKGlzU3RyaW5nKGFjY2VwdClcbiAgICAgICAgICAgICAgICAgICAgICAgICYmICFtYXRjaGVzU2VsZWN0b3IoZWxlbWVudCwgYWNjZXB0KSkpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBxdWVyeSBmb3IgbmV3IGVsZW1lbnRzIGlmIG5lY2Vzc2FyeVxuICAgICAgICAgICAgICAgIHZhciBkcm9wRWxlbWVudHMgPSBjdXJyZW50LnNlbGVjdG9yPyBjdXJyZW50Ll9jb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoY3VycmVudC5zZWxlY3RvcikgOiBbY3VycmVudC5fZWxlbWVudF07XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMCwgbGVuID0gZHJvcEVsZW1lbnRzLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50RWxlbWVudCA9IGRyb3BFbGVtZW50c1tqXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudEVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZHJvcHMucHVzaChjdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMucHVzaChjdXJyZW50RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGRyb3B6b25lczogZHJvcHMsXG4gICAgICAgICAgICAgICAgZWxlbWVudHM6IGVsZW1lbnRzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIGZpcmVBY3RpdmVEcm9wczogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgICAgICBjdXJyZW50LFxuICAgICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50LFxuICAgICAgICAgICAgICAgIHByZXZFbGVtZW50O1xuXG4gICAgICAgICAgICAvLyBsb29wIHRocm91Z2ggYWxsIGFjdGl2ZSBkcm9wem9uZXMgYW5kIHRyaWdnZXIgZXZlbnRcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmFjdGl2ZURyb3BzLmRyb3B6b25lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSB0aGlzLmFjdGl2ZURyb3BzLmRyb3B6b25lc1tpXTtcbiAgICAgICAgICAgICAgICBjdXJyZW50RWxlbWVudCA9IHRoaXMuYWN0aXZlRHJvcHMuZWxlbWVudHMgW2ldO1xuXG4gICAgICAgICAgICAgICAgLy8gcHJldmVudCB0cmlnZ2VyIG9mIGR1cGxpY2F0ZSBldmVudHMgb24gc2FtZSBlbGVtZW50XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRFbGVtZW50ICE9PSBwcmV2RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgY3VycmVudCBlbGVtZW50IGFzIGV2ZW50IHRhcmdldFxuICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXQgPSBjdXJyZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudC5maXJlKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJldkVsZW1lbnQgPSBjdXJyZW50RWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBDb2xsZWN0IGEgbmV3IHNldCBvZiBwb3NzaWJsZSBkcm9wcyBhbmQgc2F2ZSB0aGVtIGluIGFjdGl2ZURyb3BzLlxuICAgICAgICAvLyBzZXRBY3RpdmVEcm9wcyBzaG91bGQgYWx3YXlzIGJlIGNhbGxlZCB3aGVuIGEgZHJhZyBoYXMganVzdCBzdGFydGVkIG9yIGFcbiAgICAgICAgLy8gZHJhZyBldmVudCBoYXBwZW5zIHdoaWxlIGR5bmFtaWNEcm9wIGlzIHRydWVcbiAgICAgICAgc2V0QWN0aXZlRHJvcHM6IGZ1bmN0aW9uIChkcmFnRWxlbWVudCkge1xuICAgICAgICAgICAgLy8gZ2V0IGRyb3B6b25lcyBhbmQgdGhlaXIgZWxlbWVudHMgdGhhdCBjb3VsZCByZWNlaXZlIHRoZSBkcmFnZ2FibGVcbiAgICAgICAgICAgIHZhciBwb3NzaWJsZURyb3BzID0gdGhpcy5jb2xsZWN0RHJvcHMoZHJhZ0VsZW1lbnQsIHRydWUpO1xuXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZURyb3BzLmRyb3B6b25lcyA9IHBvc3NpYmxlRHJvcHMuZHJvcHpvbmVzO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVEcm9wcy5lbGVtZW50cyAgPSBwb3NzaWJsZURyb3BzLmVsZW1lbnRzO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVEcm9wcy5yZWN0cyAgICAgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmFjdGl2ZURyb3BzLmRyb3B6b25lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRHJvcHMucmVjdHNbaV0gPSB0aGlzLmFjdGl2ZURyb3BzLmRyb3B6b25lc1tpXS5nZXRSZWN0KHRoaXMuYWN0aXZlRHJvcHMuZWxlbWVudHNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGdldERyb3A6IGZ1bmN0aW9uIChkcmFnRXZlbnQsIGV2ZW50LCBkcmFnRWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIHZhbGlkRHJvcHMgPSBbXTtcblxuICAgICAgICAgICAgaWYgKGR5bmFtaWNEcm9wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVEcm9wcyhkcmFnRWxlbWVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNvbGxlY3QgYWxsIGRyb3B6b25lcyBhbmQgdGhlaXIgZWxlbWVudHMgd2hpY2ggcXVhbGlmeSBmb3IgYSBkcm9wXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuYWN0aXZlRHJvcHMuZHJvcHpvbmVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnQgICAgICAgID0gdGhpcy5hY3RpdmVEcm9wcy5kcm9wem9uZXNbal0sXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50ID0gdGhpcy5hY3RpdmVEcm9wcy5lbGVtZW50cyBbal0sXG4gICAgICAgICAgICAgICAgICAgIHJlY3QgICAgICAgICAgID0gdGhpcy5hY3RpdmVEcm9wcy5yZWN0cyAgICBbal07XG5cbiAgICAgICAgICAgICAgICB2YWxpZERyb3BzLnB1c2goY3VycmVudC5kcm9wQ2hlY2soZHJhZ0V2ZW50LCBldmVudCwgdGhpcy50YXJnZXQsIGRyYWdFbGVtZW50LCBjdXJyZW50RWxlbWVudCwgcmVjdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBjdXJyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG51bGwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBnZXQgdGhlIG1vc3QgYXBwcm9wcmlhdGUgZHJvcHpvbmUgYmFzZWQgb24gRE9NIGRlcHRoIGFuZCBvcmRlclxuICAgICAgICAgICAgdmFyIGRyb3BJbmRleCA9IGluZGV4T2ZEZWVwZXN0RWxlbWVudCh2YWxpZERyb3BzKSxcbiAgICAgICAgICAgICAgICBkcm9wem9uZSAgPSB0aGlzLmFjdGl2ZURyb3BzLmRyb3B6b25lc1tkcm9wSW5kZXhdIHx8IG51bGwsXG4gICAgICAgICAgICAgICAgZWxlbWVudCAgID0gdGhpcy5hY3RpdmVEcm9wcy5lbGVtZW50cyBbZHJvcEluZGV4XSB8fCBudWxsO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGRyb3B6b25lOiBkcm9wem9uZSxcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50XG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldERyb3BFdmVudHM6IGZ1bmN0aW9uIChwb2ludGVyRXZlbnQsIGRyYWdFdmVudCkge1xuICAgICAgICAgICAgdmFyIGRyb3BFdmVudHMgPSB7XG4gICAgICAgICAgICAgICAgZW50ZXIgICAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICBsZWF2ZSAgICAgOiBudWxsLFxuICAgICAgICAgICAgICAgIGFjdGl2YXRlICA6IG51bGwsXG4gICAgICAgICAgICAgICAgZGVhY3RpdmF0ZTogbnVsbCxcbiAgICAgICAgICAgICAgICBtb3ZlICAgICAgOiBudWxsLFxuICAgICAgICAgICAgICAgIGRyb3AgICAgICA6IG51bGxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRyb3BFbGVtZW50ICE9PSB0aGlzLnByZXZEcm9wRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIHdhcyBhIHByZXZEcm9wVGFyZ2V0LCBjcmVhdGUgYSBkcmFnbGVhdmUgZXZlbnRcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcmV2RHJvcFRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICBkcm9wRXZlbnRzLmxlYXZlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ICAgICAgIDogdGhpcy5wcmV2RHJvcEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wem9uZSAgICAgOiB0aGlzLnByZXZEcm9wVGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRlZFRhcmdldDogZHJhZ0V2ZW50LnRhcmdldCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZSAgICA6IGRyYWdFdmVudC5pbnRlcmFjdGFibGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkcmFnRXZlbnQgICAgOiBkcmFnRXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnRlcmFjdGlvbiAgOiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZVN0YW1wICAgIDogZHJhZ0V2ZW50LnRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgICAgICAgICA6ICdkcmFnbGVhdmUnXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgZHJhZ0V2ZW50LmRyYWdMZWF2ZSA9IHRoaXMucHJldkRyb3BFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBkcmFnRXZlbnQucHJldkRyb3B6b25lID0gdGhpcy5wcmV2RHJvcFRhcmdldDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIGRyb3BUYXJnZXQgaXMgbm90IG51bGwsIGNyZWF0ZSBhIGRyYWdlbnRlciBldmVudFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyb3BUYXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZHJvcEV2ZW50cy5lbnRlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCAgICAgICA6IHRoaXMuZHJvcEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wem9uZSAgICAgOiB0aGlzLmRyb3BUYXJnZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxhdGVkVGFyZ2V0OiBkcmFnRXZlbnQudGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlICAgIDogZHJhZ0V2ZW50LmludGVyYWN0YWJsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdFdmVudCAgICA6IGRyYWdFdmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVyYWN0aW9uICA6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lU3RhbXAgICAgOiBkcmFnRXZlbnQudGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSAgICAgICAgIDogJ2RyYWdlbnRlcidcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBkcmFnRXZlbnQuZHJhZ0VudGVyID0gdGhpcy5kcm9wRWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgZHJhZ0V2ZW50LmRyb3B6b25lID0gdGhpcy5kcm9wVGFyZ2V0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRyYWdFdmVudC50eXBlID09PSAnZHJhZ2VuZCcgJiYgdGhpcy5kcm9wVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZHJvcEV2ZW50cy5kcm9wID0ge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgICAgICAgOiB0aGlzLmRyb3BFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICBkcm9wem9uZSAgICAgOiB0aGlzLmRyb3BUYXJnZXQsXG4gICAgICAgICAgICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IGRyYWdFdmVudC50YXJnZXQsXG4gICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZSAgICA6IGRyYWdFdmVudC5pbnRlcmFjdGFibGUsXG4gICAgICAgICAgICAgICAgICAgIGRyYWdFdmVudCAgICA6IGRyYWdFdmVudCxcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJhY3Rpb24gIDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgdGltZVN0YW1wICAgIDogZHJhZ0V2ZW50LnRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZSAgICAgICAgIDogJ2Ryb3AnXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGRyYWdFdmVudC5kcm9wem9uZSA9IHRoaXMuZHJvcFRhcmdldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkcmFnRXZlbnQudHlwZSA9PT0gJ2RyYWdzdGFydCcpIHtcbiAgICAgICAgICAgICAgICBkcm9wRXZlbnRzLmFjdGl2YXRlID0ge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBkcm9wem9uZSAgICAgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICByZWxhdGVkVGFyZ2V0OiBkcmFnRXZlbnQudGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgICBkcmFnZ2FibGUgICAgOiBkcmFnRXZlbnQuaW50ZXJhY3RhYmxlLFxuICAgICAgICAgICAgICAgICAgICBkcmFnRXZlbnQgICAgOiBkcmFnRXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIGludGVyYWN0aW9uICA6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIHRpbWVTdGFtcCAgICA6IGRyYWdFdmVudC50aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgICAgICAgICA6ICdkcm9wYWN0aXZhdGUnXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkcmFnRXZlbnQudHlwZSA9PT0gJ2RyYWdlbmQnKSB7XG4gICAgICAgICAgICAgICAgZHJvcEV2ZW50cy5kZWFjdGl2YXRlID0ge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBkcm9wem9uZSAgICAgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICByZWxhdGVkVGFyZ2V0OiBkcmFnRXZlbnQudGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgICBkcmFnZ2FibGUgICAgOiBkcmFnRXZlbnQuaW50ZXJhY3RhYmxlLFxuICAgICAgICAgICAgICAgICAgICBkcmFnRXZlbnQgICAgOiBkcmFnRXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIGludGVyYWN0aW9uICA6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIHRpbWVTdGFtcCAgICA6IGRyYWdFdmVudC50aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgICAgICAgICA6ICdkcm9wZGVhY3RpdmF0ZSdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRyYWdFdmVudC50eXBlID09PSAnZHJhZ21vdmUnICYmIHRoaXMuZHJvcFRhcmdldCkge1xuICAgICAgICAgICAgICAgIGRyb3BFdmVudHMubW92ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ICAgICAgIDogdGhpcy5kcm9wRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgZHJvcHpvbmUgICAgIDogdGhpcy5kcm9wVGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgICByZWxhdGVkVGFyZ2V0OiBkcmFnRXZlbnQudGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgICBkcmFnZ2FibGUgICAgOiBkcmFnRXZlbnQuaW50ZXJhY3RhYmxlLFxuICAgICAgICAgICAgICAgICAgICBkcmFnRXZlbnQgICAgOiBkcmFnRXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIGludGVyYWN0aW9uICA6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIGRyYWdtb3ZlICAgICA6IGRyYWdFdmVudCxcbiAgICAgICAgICAgICAgICAgICAgdGltZVN0YW1wICAgIDogZHJhZ0V2ZW50LnRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZSAgICAgICAgIDogJ2Ryb3Btb3ZlJ1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgZHJhZ0V2ZW50LmRyb3B6b25lID0gdGhpcy5kcm9wVGFyZ2V0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZHJvcEV2ZW50cztcbiAgICAgICAgfSxcblxuICAgICAgICBjdXJyZW50QWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuZHJhZ2dpbmcgJiYgJ2RyYWcnKSB8fCAodGhpcy5yZXNpemluZyAmJiAncmVzaXplJykgfHwgKHRoaXMuZ2VzdHVyaW5nICYmICdnZXN0dXJlJykgfHwgbnVsbDtcbiAgICAgICAgfSxcblxuICAgICAgICBpbnRlcmFjdGluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZHJhZ2dpbmcgfHwgdGhpcy5yZXNpemluZyB8fCB0aGlzLmdlc3R1cmluZztcbiAgICAgICAgfSxcblxuICAgICAgICBjbGVhclRhcmdldHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5lbGVtZW50ID0gbnVsbDtcblxuICAgICAgICAgICAgdGhpcy5kcm9wVGFyZ2V0ID0gdGhpcy5kcm9wRWxlbWVudCA9IHRoaXMucHJldkRyb3BUYXJnZXQgPSB0aGlzLnByZXZEcm9wRWxlbWVudCA9IG51bGw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3RvcDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pbnRlcmFjdGluZygpKSB7XG4gICAgICAgICAgICAgICAgYXV0b1Njcm9sbC5zdG9wKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXRjaGVzID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5tYXRjaEVsZW1lbnRzID0gW107XG5cbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG5cbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0Lm9wdGlvbnMuc3R5bGVDdXJzb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Ll9kb2MuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmN1cnNvciA9ICcnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHByZXZlbnQgRGVmYXVsdCBvbmx5IGlmIHdlcmUgcHJldmlvdXNseSBpbnRlcmFjdGluZ1xuICAgICAgICAgICAgICAgIGlmIChldmVudCAmJiBpc0Z1bmN0aW9uKGV2ZW50LnByZXZlbnREZWZhdWx0KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQW5kUHJldmVudERlZmF1bHQoZXZlbnQsIHRhcmdldCwgdGhpcy5lbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZURyb3BzLmRyb3B6b25lcyA9IHRoaXMuYWN0aXZlRHJvcHMuZWxlbWVudHMgPSB0aGlzLmFjdGl2ZURyb3BzLnJlY3RzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY2xlYXJUYXJnZXRzKCk7XG5cbiAgICAgICAgICAgIHRoaXMucG9pbnRlcklzRG93biA9IHRoaXMuc25hcFN0YXR1cy5sb2NrZWQgPSB0aGlzLmRyYWdnaW5nID0gdGhpcy5yZXNpemluZyA9IHRoaXMuZ2VzdHVyaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmVkLm5hbWUgPSB0aGlzLnByZXZFdmVudCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmluZXJ0aWFTdGF0dXMucmVzdW1lRHggPSB0aGlzLmluZXJ0aWFTdGF0dXMucmVzdW1lRHkgPSAwO1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgcG9pbnRlcnMgaWYgdGhlaXIgSUQgaXNuJ3QgaW4gdGhpcy5wb2ludGVySWRzXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucG9pbnRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXhPZih0aGlzLnBvaW50ZXJJZHMsIGdldFBvaW50ZXJJZCh0aGlzLnBvaW50ZXJzW2ldKSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9pbnRlcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBpbmVydGlhRnJhbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpbmVydGlhU3RhdHVzID0gdGhpcy5pbmVydGlhU3RhdHVzLFxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB0aGlzLnRhcmdldC5vcHRpb25zW3RoaXMucHJlcGFyZWQubmFtZV0uaW5lcnRpYSxcbiAgICAgICAgICAgICAgICBsYW1iZGEgPSBvcHRpb25zLnJlc2lzdGFuY2UsXG4gICAgICAgICAgICAgICAgdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCAtIGluZXJ0aWFTdGF0dXMudDA7XG5cbiAgICAgICAgICAgIGlmICh0IDwgaW5lcnRpYVN0YXR1cy50ZSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHByb2dyZXNzID0gIDEgLSAoTWF0aC5leHAoLWxhbWJkYSAqIHQpIC0gaW5lcnRpYVN0YXR1cy5sYW1iZGFfdjApIC8gaW5lcnRpYVN0YXR1cy5vbmVfdmVfdjA7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5lcnRpYVN0YXR1cy5tb2RpZmllZFhlID09PSBpbmVydGlhU3RhdHVzLnhlICYmIGluZXJ0aWFTdGF0dXMubW9kaWZpZWRZZSA9PT0gaW5lcnRpYVN0YXR1cy55ZSkge1xuICAgICAgICAgICAgICAgICAgICBpbmVydGlhU3RhdHVzLnN4ID0gaW5lcnRpYVN0YXR1cy54ZSAqIHByb2dyZXNzO1xuICAgICAgICAgICAgICAgICAgICBpbmVydGlhU3RhdHVzLnN5ID0gaW5lcnRpYVN0YXR1cy55ZSAqIHByb2dyZXNzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHF1YWRQb2ludCA9IGdldFF1YWRyYXRpY0N1cnZlUG9pbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMCwgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmVydGlhU3RhdHVzLnhlLCBpbmVydGlhU3RhdHVzLnllLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZXJ0aWFTdGF0dXMubW9kaWZpZWRYZSwgaW5lcnRpYVN0YXR1cy5tb2RpZmllZFllLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzKTtcblxuICAgICAgICAgICAgICAgICAgICBpbmVydGlhU3RhdHVzLnN4ID0gcXVhZFBvaW50Lng7XG4gICAgICAgICAgICAgICAgICAgIGluZXJ0aWFTdGF0dXMuc3kgPSBxdWFkUG9pbnQueTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50ZXJNb3ZlKGluZXJ0aWFTdGF0dXMuc3RhcnRFdmVudCwgaW5lcnRpYVN0YXR1cy5zdGFydEV2ZW50KTtcblxuICAgICAgICAgICAgICAgIGluZXJ0aWFTdGF0dXMuaSA9IHJlcUZyYW1lKHRoaXMuYm91bmRJbmVydGlhRnJhbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5lcnRpYVN0YXR1cy5lbmRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgaW5lcnRpYVN0YXR1cy5zeCA9IGluZXJ0aWFTdGF0dXMubW9kaWZpZWRYZTtcbiAgICAgICAgICAgICAgICBpbmVydGlhU3RhdHVzLnN5ID0gaW5lcnRpYVN0YXR1cy5tb2RpZmllZFllO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wb2ludGVyTW92ZShpbmVydGlhU3RhdHVzLnN0YXJ0RXZlbnQsIGluZXJ0aWFTdGF0dXMuc3RhcnRFdmVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wb2ludGVyRW5kKGluZXJ0aWFTdGF0dXMuc3RhcnRFdmVudCwgaW5lcnRpYVN0YXR1cy5zdGFydEV2ZW50KTtcblxuICAgICAgICAgICAgICAgIGluZXJ0aWFTdGF0dXMuYWN0aXZlID0gaW5lcnRpYVN0YXR1cy5lbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBzbW9vdGhFbmRGcmFtZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGluZXJ0aWFTdGF0dXMgPSB0aGlzLmluZXJ0aWFTdGF0dXMsXG4gICAgICAgICAgICAgICAgdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gaW5lcnRpYVN0YXR1cy50MCxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbiA9IHRoaXMudGFyZ2V0Lm9wdGlvbnNbdGhpcy5wcmVwYXJlZC5uYW1lXS5pbmVydGlhLnNtb290aEVuZER1cmF0aW9uO1xuXG4gICAgICAgICAgICBpZiAodCA8IGR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgaW5lcnRpYVN0YXR1cy5zeCA9IGVhc2VPdXRRdWFkKHQsIDAsIGluZXJ0aWFTdGF0dXMueGUsIGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICBpbmVydGlhU3RhdHVzLnN5ID0gZWFzZU91dFF1YWQodCwgMCwgaW5lcnRpYVN0YXR1cy55ZSwgZHVyYXRpb24pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wb2ludGVyTW92ZShpbmVydGlhU3RhdHVzLnN0YXJ0RXZlbnQsIGluZXJ0aWFTdGF0dXMuc3RhcnRFdmVudCk7XG5cbiAgICAgICAgICAgICAgICBpbmVydGlhU3RhdHVzLmkgPSByZXFGcmFtZSh0aGlzLmJvdW5kU21vb3RoRW5kRnJhbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5lcnRpYVN0YXR1cy5lbmRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgaW5lcnRpYVN0YXR1cy5zeCA9IGluZXJ0aWFTdGF0dXMueGU7XG4gICAgICAgICAgICAgICAgaW5lcnRpYVN0YXR1cy5zeSA9IGluZXJ0aWFTdGF0dXMueWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50ZXJNb3ZlKGluZXJ0aWFTdGF0dXMuc3RhcnRFdmVudCwgaW5lcnRpYVN0YXR1cy5zdGFydEV2ZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50ZXJFbmQoaW5lcnRpYVN0YXR1cy5zdGFydEV2ZW50LCBpbmVydGlhU3RhdHVzLnN0YXJ0RXZlbnQpO1xuXG4gICAgICAgICAgICAgICAgaW5lcnRpYVN0YXR1cy5zbW9vdGhFbmQgPVxuICAgICAgICAgICAgICAgICAgaW5lcnRpYVN0YXR1cy5hY3RpdmUgPSBpbmVydGlhU3RhdHVzLmVuZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGFkZFBvaW50ZXI6IGZ1bmN0aW9uIChwb2ludGVyKSB7XG4gICAgICAgICAgICB2YXIgaWQgPSBnZXRQb2ludGVySWQocG9pbnRlciksXG4gICAgICAgICAgICAgICAgaW5kZXggPSB0aGlzLm1vdXNlPyAwIDogaW5kZXhPZih0aGlzLnBvaW50ZXJJZHMsIGlkKTtcblxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gdGhpcy5wb2ludGVySWRzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wb2ludGVySWRzW2luZGV4XSA9IGlkO1xuICAgICAgICAgICAgdGhpcy5wb2ludGVyc1tpbmRleF0gPSBwb2ludGVyO1xuXG4gICAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlUG9pbnRlcjogZnVuY3Rpb24gKHBvaW50ZXIpIHtcbiAgICAgICAgICAgIHZhciBpZCA9IGdldFBvaW50ZXJJZChwb2ludGVyKSxcbiAgICAgICAgICAgICAgICBpbmRleCA9IHRoaXMubW91c2U/IDAgOiBpbmRleE9mKHRoaXMucG9pbnRlcklkcywgaWQpO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICB0aGlzLnBvaW50ZXJzICAgLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLnBvaW50ZXJJZHMgLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLmRvd25UYXJnZXRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLmRvd25UaW1lcyAgLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLmhvbGRUaW1lcnMgLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVjb3JkUG9pbnRlcjogZnVuY3Rpb24gKHBvaW50ZXIpIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMubW91c2U/IDA6IGluZGV4T2YodGhpcy5wb2ludGVySWRzLCBnZXRQb2ludGVySWQocG9pbnRlcikpO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICB0aGlzLnBvaW50ZXJzW2luZGV4XSA9IHBvaW50ZXI7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY29sbGVjdEV2ZW50VGFyZ2V0czogZnVuY3Rpb24gKHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCwgZXZlbnRUeXBlKSB7XG4gICAgICAgICAgICB2YXIgcG9pbnRlckluZGV4ID0gdGhpcy5tb3VzZT8gMCA6IGluZGV4T2YodGhpcy5wb2ludGVySWRzLCBnZXRQb2ludGVySWQocG9pbnRlcikpO1xuXG4gICAgICAgICAgICAvLyBkbyBub3QgZmlyZSBhIHRhcCBldmVudCBpZiB0aGUgcG9pbnRlciB3YXMgbW92ZWQgYmVmb3JlIGJlaW5nIGxpZnRlZFxuICAgICAgICAgICAgaWYgKGV2ZW50VHlwZSA9PT0gJ3RhcCcgJiYgKHRoaXMucG9pbnRlcldhc01vdmVkXG4gICAgICAgICAgICAgICAgLy8gb3IgaWYgdGhlIHBvaW50ZXJ1cCB0YXJnZXQgaXMgZGlmZmVyZW50IHRvIHRoZSBwb2ludGVyZG93biB0YXJnZXRcbiAgICAgICAgICAgICAgICB8fCAhKHRoaXMuZG93blRhcmdldHNbcG9pbnRlckluZGV4XSAmJiB0aGlzLmRvd25UYXJnZXRzW3BvaW50ZXJJbmRleF0gPT09IGV2ZW50VGFyZ2V0KSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB0YXJnZXRzID0gW10sXG4gICAgICAgICAgICAgICAgZWxlbWVudHMgPSBbXSxcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gZXZlbnRUYXJnZXQ7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNvbGxlY3RTZWxlY3RvcnMgKGludGVyYWN0YWJsZSwgc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxzID0gaWU4TWF0Y2hlc1NlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcilcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgaWYgKGludGVyYWN0YWJsZS5faUV2ZW50c1tldmVudFR5cGVdXG4gICAgICAgICAgICAgICAgICAgICYmIGlzRWxlbWVudChlbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICAmJiBpbkNvbnRleHQoaW50ZXJhY3RhYmxlLCBlbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICAmJiAhdGVzdElnbm9yZShpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGV2ZW50VGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICAmJiB0ZXN0QWxsb3coaW50ZXJhY3RhYmxlLCBlbGVtZW50LCBldmVudFRhcmdldClcbiAgICAgICAgICAgICAgICAgICAgJiYgbWF0Y2hlc1NlbGVjdG9yKGVsZW1lbnQsIHNlbGVjdG9yLCBlbHMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5wdXNoKGludGVyYWN0YWJsZSk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3aGlsZSAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGlmIChpbnRlcmFjdC5pc1NldChlbGVtZW50KSAmJiBpbnRlcmFjdChlbGVtZW50KS5faUV2ZW50c1tldmVudFR5cGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHMucHVzaChpbnRlcmFjdChlbGVtZW50KSk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaW50ZXJhY3RhYmxlcy5mb3JFYWNoU2VsZWN0b3IoY29sbGVjdFNlbGVjdG9ycyk7XG5cbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gcGFyZW50RWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSB0YXAgZXZlbnQgZXZlbiBpZiB0aGVyZSBhcmUgbm8gbGlzdGVuZXJzIHNvIHRoYXRcbiAgICAgICAgICAgIC8vIGRvdWJsZXRhcCBjYW4gc3RpbGwgYmUgY3JlYXRlZCBhbmQgZmlyZWRcbiAgICAgICAgICAgIGlmICh0YXJnZXRzLmxlbmd0aCB8fCBldmVudFR5cGUgPT09ICd0YXAnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlUG9pbnRlcnMocG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCB0YXJnZXRzLCBlbGVtZW50cywgZXZlbnRUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBmaXJlUG9pbnRlcnM6IGZ1bmN0aW9uIChwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsIHRhcmdldHMsIGVsZW1lbnRzLCBldmVudFR5cGUpIHtcbiAgICAgICAgICAgIHZhciBwb2ludGVySW5kZXggPSB0aGlzLm1vdXNlPyAwIDogaW5kZXhPZih0aGlzLnBvaW50ZXJJZHMsIGdldFBvaW50ZXJJZChwb2ludGVyKSksXG4gICAgICAgICAgICAgICAgcG9pbnRlckV2ZW50ID0ge30sXG4gICAgICAgICAgICAgICAgaSxcbiAgICAgICAgICAgICAgICAvLyBmb3IgdGFwIGV2ZW50c1xuICAgICAgICAgICAgICAgIGludGVydmFsLCBjcmVhdGVOZXdEb3VibGVUYXA7XG5cbiAgICAgICAgICAgIC8vIGlmIGl0J3MgYSBkb3VibGV0YXAgdGhlbiB0aGUgZXZlbnQgcHJvcGVydGllcyB3b3VsZCBoYXZlIGJlZW5cbiAgICAgICAgICAgIC8vIGNvcGllZCBmcm9tIHRoZSB0YXAgZXZlbnQgYW5kIHByb3ZpZGVkIGFzIHRoZSBwb2ludGVyIGFyZ3VtZW50XG4gICAgICAgICAgICBpZiAoZXZlbnRUeXBlID09PSAnZG91YmxldGFwJykge1xuICAgICAgICAgICAgICAgIHBvaW50ZXJFdmVudCA9IHBvaW50ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwb2ludGVyRXh0ZW5kKHBvaW50ZXJFdmVudCwgZXZlbnQpO1xuICAgICAgICAgICAgICAgIGlmIChldmVudCAhPT0gcG9pbnRlcikge1xuICAgICAgICAgICAgICAgICAgICBwb2ludGVyRXh0ZW5kKHBvaW50ZXJFdmVudCwgcG9pbnRlcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcG9pbnRlckV2ZW50LnByZXZlbnREZWZhdWx0ICAgICAgICAgICA9IHByZXZlbnRPcmlnaW5hbERlZmF1bHQ7XG4gICAgICAgICAgICAgICAgcG9pbnRlckV2ZW50LnN0b3BQcm9wYWdhdGlvbiAgICAgICAgICA9IEludGVyYWN0RXZlbnQucHJvdG90eXBlLnN0b3BQcm9wYWdhdGlvbjtcbiAgICAgICAgICAgICAgICBwb2ludGVyRXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uID0gSW50ZXJhY3RFdmVudC5wcm90b3R5cGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uO1xuICAgICAgICAgICAgICAgIHBvaW50ZXJFdmVudC5pbnRlcmFjdGlvbiAgICAgICAgICAgICAgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgcG9pbnRlckV2ZW50LnRpbWVTdGFtcCAgICAgICA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgIHBvaW50ZXJFdmVudC5vcmlnaW5hbEV2ZW50ICAgPSBldmVudDtcbiAgICAgICAgICAgICAgICBwb2ludGVyRXZlbnQub3JpZ2luYWxQb2ludGVyID0gcG9pbnRlcjtcbiAgICAgICAgICAgICAgICBwb2ludGVyRXZlbnQudHlwZSAgICAgICAgICAgID0gZXZlbnRUeXBlO1xuICAgICAgICAgICAgICAgIHBvaW50ZXJFdmVudC5wb2ludGVySWQgICAgICAgPSBnZXRQb2ludGVySWQocG9pbnRlcik7XG4gICAgICAgICAgICAgICAgcG9pbnRlckV2ZW50LnBvaW50ZXJUeXBlICAgICA9IHRoaXMubW91c2U/ICdtb3VzZScgOiAhc3VwcG9ydHNQb2ludGVyRXZlbnQ/ICd0b3VjaCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGlzU3RyaW5nKHBvaW50ZXIucG9pbnRlclR5cGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gcG9pbnRlci5wb2ludGVyVHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFssLCd0b3VjaCcsICdwZW4nLCAnbW91c2UnXVtwb2ludGVyLnBvaW50ZXJUeXBlXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGV2ZW50VHlwZSA9PT0gJ3RhcCcpIHtcbiAgICAgICAgICAgICAgICBwb2ludGVyRXZlbnQuZHQgPSBwb2ludGVyRXZlbnQudGltZVN0YW1wIC0gdGhpcy5kb3duVGltZXNbcG9pbnRlckluZGV4XTtcblxuICAgICAgICAgICAgICAgIGludGVydmFsID0gcG9pbnRlckV2ZW50LnRpbWVTdGFtcCAtIHRoaXMudGFwVGltZTtcbiAgICAgICAgICAgICAgICBjcmVhdGVOZXdEb3VibGVUYXAgPSAhISh0aGlzLnByZXZUYXAgJiYgdGhpcy5wcmV2VGFwLnR5cGUgIT09ICdkb3VibGV0YXAnXG4gICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMucHJldlRhcC50YXJnZXQgPT09IHBvaW50ZXJFdmVudC50YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgICAgJiYgaW50ZXJ2YWwgPCA1MDApO1xuXG4gICAgICAgICAgICAgICAgcG9pbnRlckV2ZW50LmRvdWJsZSA9IGNyZWF0ZU5ld0RvdWJsZVRhcDtcblxuICAgICAgICAgICAgICAgIHRoaXMudGFwVGltZSA9IHBvaW50ZXJFdmVudC50aW1lU3RhbXA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcG9pbnRlckV2ZW50LmN1cnJlbnRUYXJnZXQgPSBlbGVtZW50c1tpXTtcbiAgICAgICAgICAgICAgICBwb2ludGVyRXZlbnQuaW50ZXJhY3RhYmxlID0gdGFyZ2V0c1tpXTtcbiAgICAgICAgICAgICAgICB0YXJnZXRzW2ldLmZpcmUocG9pbnRlckV2ZW50KTtcblxuICAgICAgICAgICAgICAgIGlmIChwb2ludGVyRXZlbnQuaW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkXG4gICAgICAgICAgICAgICAgICAgIHx8KHBvaW50ZXJFdmVudC5wcm9wYWdhdGlvblN0b3BwZWQgJiYgZWxlbWVudHNbaSArIDFdICE9PSBwb2ludGVyRXZlbnQuY3VycmVudFRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY3JlYXRlTmV3RG91YmxlVGFwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRvdWJsZVRhcCA9IHt9O1xuXG4gICAgICAgICAgICAgICAgZXh0ZW5kKGRvdWJsZVRhcCwgcG9pbnRlckV2ZW50KTtcblxuICAgICAgICAgICAgICAgIGRvdWJsZVRhcC5kdCAgID0gaW50ZXJ2YWw7XG4gICAgICAgICAgICAgICAgZG91YmxlVGFwLnR5cGUgPSAnZG91YmxldGFwJztcblxuICAgICAgICAgICAgICAgIHRoaXMuY29sbGVjdEV2ZW50VGFyZ2V0cyhkb3VibGVUYXAsIGV2ZW50LCBldmVudFRhcmdldCwgJ2RvdWJsZXRhcCcpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2VGFwID0gZG91YmxlVGFwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZXZlbnRUeXBlID09PSAndGFwJykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJldlRhcCA9IHBvaW50ZXJFdmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICB2YWxpZGF0ZVNlbGVjdG9yOiBmdW5jdGlvbiAocG9pbnRlciwgZXZlbnQsIG1hdGNoZXMsIG1hdGNoRWxlbWVudHMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBtYXRjaGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gbWF0Y2hlc1tpXSxcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hFbGVtZW50ID0gbWF0Y2hFbGVtZW50c1tpXSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uID0gdmFsaWRhdGVBY3Rpb24obWF0Y2guZ2V0QWN0aW9uKHBvaW50ZXIsIGV2ZW50LCB0aGlzLCBtYXRjaEVsZW1lbnQpLCBtYXRjaCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uICYmIHdpdGhpbkludGVyYWN0aW9uTGltaXQobWF0Y2gsIG1hdGNoRWxlbWVudCwgYWN0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IG1hdGNoO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBtYXRjaEVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0U25hcHBpbmc6IGZ1bmN0aW9uIChwYWdlQ29vcmRzLCBzdGF0dXMpIHtcbiAgICAgICAgICAgIHZhciBzbmFwID0gdGhpcy50YXJnZXQub3B0aW9uc1t0aGlzLnByZXBhcmVkLm5hbWVdLnNuYXAsXG4gICAgICAgICAgICAgICAgdGFyZ2V0cyA9IFtdLFxuICAgICAgICAgICAgICAgIHRhcmdldCxcbiAgICAgICAgICAgICAgICBwYWdlLFxuICAgICAgICAgICAgICAgIGk7XG5cbiAgICAgICAgICAgIHN0YXR1cyA9IHN0YXR1cyB8fCB0aGlzLnNuYXBTdGF0dXM7XG5cbiAgICAgICAgICAgIGlmIChzdGF0dXMudXNlU3RhdHVzWFkpIHtcbiAgICAgICAgICAgICAgICBwYWdlID0geyB4OiBzdGF0dXMueCwgeTogc3RhdHVzLnkgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBvcmlnaW4gPSBnZXRPcmlnaW5YWSh0aGlzLnRhcmdldCwgdGhpcy5lbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIHBhZ2UgPSBleHRlbmQoe30sIHBhZ2VDb29yZHMpO1xuXG4gICAgICAgICAgICAgICAgcGFnZS54IC09IG9yaWdpbi54O1xuICAgICAgICAgICAgICAgIHBhZ2UueSAtPSBvcmlnaW4ueTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3RhdHVzLnJlYWxYID0gcGFnZS54O1xuICAgICAgICAgICAgc3RhdHVzLnJlYWxZID0gcGFnZS55O1xuXG4gICAgICAgICAgICBwYWdlLnggPSBwYWdlLnggLSB0aGlzLmluZXJ0aWFTdGF0dXMucmVzdW1lRHg7XG4gICAgICAgICAgICBwYWdlLnkgPSBwYWdlLnkgLSB0aGlzLmluZXJ0aWFTdGF0dXMucmVzdW1lRHk7XG5cbiAgICAgICAgICAgIHZhciBsZW4gPSBzbmFwLnRhcmdldHM/IHNuYXAudGFyZ2V0cy5sZW5ndGggOiAwO1xuXG4gICAgICAgICAgICBmb3IgKHZhciByZWxJbmRleCA9IDA7IHJlbEluZGV4IDwgdGhpcy5zbmFwT2Zmc2V0cy5sZW5ndGg7IHJlbEluZGV4KyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVsYXRpdmUgPSB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHBhZ2UueCAtIHRoaXMuc25hcE9mZnNldHNbcmVsSW5kZXhdLngsXG4gICAgICAgICAgICAgICAgICAgIHk6IHBhZ2UueSAtIHRoaXMuc25hcE9mZnNldHNbcmVsSW5kZXhdLnlcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHNuYXAudGFyZ2V0c1tpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IHNuYXAudGFyZ2V0c1tpXShyZWxhdGl2ZS54LCByZWxhdGl2ZS55LCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IHNuYXAudGFyZ2V0c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IGlzTnVtYmVyKHRhcmdldC54KSA/ICh0YXJnZXQueCArIHRoaXMuc25hcE9mZnNldHNbcmVsSW5kZXhdLngpIDogcmVsYXRpdmUueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGlzTnVtYmVyKHRhcmdldC55KSA/ICh0YXJnZXQueSArIHRoaXMuc25hcE9mZnNldHNbcmVsSW5kZXhdLnkpIDogcmVsYXRpdmUueSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2U6IGlzTnVtYmVyKHRhcmdldC5yYW5nZSk/IHRhcmdldC5yYW5nZTogc25hcC5yYW5nZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjbG9zZXN0ID0ge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGluUmFuZ2U6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZTogMCxcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2U6IDAsXG4gICAgICAgICAgICAgICAgICAgIGR4OiAwLFxuICAgICAgICAgICAgICAgICAgICBkeTogMFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHRhcmdldHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXRzW2ldO1xuXG4gICAgICAgICAgICAgICAgdmFyIHJhbmdlID0gdGFyZ2V0LnJhbmdlLFxuICAgICAgICAgICAgICAgICAgICBkeCA9IHRhcmdldC54IC0gcGFnZS54LFxuICAgICAgICAgICAgICAgICAgICBkeSA9IHRhcmdldC55IC0gcGFnZS55LFxuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IGh5cG90KGR4LCBkeSksXG4gICAgICAgICAgICAgICAgICAgIGluUmFuZ2UgPSBkaXN0YW5jZSA8PSByYW5nZTtcblxuICAgICAgICAgICAgICAgIC8vIEluZmluaXRlIHRhcmdldHMgY291bnQgYXMgYmVpbmcgb3V0IG9mIHJhbmdlXG4gICAgICAgICAgICAgICAgLy8gY29tcGFyZWQgdG8gbm9uIGluZmluaXRlIG9uZXMgdGhhdCBhcmUgaW4gcmFuZ2VcbiAgICAgICAgICAgICAgICBpZiAocmFuZ2UgPT09IEluZmluaXR5ICYmIGNsb3Nlc3QuaW5SYW5nZSAmJiBjbG9zZXN0LnJhbmdlICE9PSBJbmZpbml0eSkge1xuICAgICAgICAgICAgICAgICAgICBpblJhbmdlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFjbG9zZXN0LnRhcmdldCB8fCAoaW5SYW5nZVxuICAgICAgICAgICAgICAgICAgICAvLyBpcyB0aGUgY2xvc2VzdCB0YXJnZXQgaW4gcmFuZ2U/XG4gICAgICAgICAgICAgICAgICAgID8gKGNsb3Nlc3QuaW5SYW5nZSAmJiByYW5nZSAhPT0gSW5maW5pdHlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBwb2ludGVyIGlzIHJlbGF0aXZlbHkgZGVlcGVyIGluIHRoaXMgdGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgICAgICA/IGRpc3RhbmNlIC8gcmFuZ2UgPCBjbG9zZXN0LmRpc3RhbmNlIC8gY2xvc2VzdC5yYW5nZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyB0YXJnZXQgaGFzIEluZmluaXRlIHJhbmdlIGFuZCB0aGUgY2xvc2VzdCBkb2Vzbid0XG4gICAgICAgICAgICAgICAgICAgICAgICA6IChyYW5nZSA9PT0gSW5maW5pdHkgJiYgY2xvc2VzdC5yYW5nZSAhPT0gSW5maW5pdHkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT1IgdGhpcyB0YXJnZXQgaXMgY2xvc2VyIHRoYXQgdGhlIHByZXZpb3VzIGNsb3Nlc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCBkaXN0YW5jZSA8IGNsb3Nlc3QuZGlzdGFuY2UpXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBvdGhlciBpcyBub3QgaW4gcmFuZ2UgYW5kIHRoZSBwb2ludGVyIGlzIGNsb3NlciB0byB0aGlzIHRhcmdldFxuICAgICAgICAgICAgICAgICAgICA6ICghY2xvc2VzdC5pblJhbmdlICYmIGRpc3RhbmNlIDwgY2xvc2VzdC5kaXN0YW5jZSkpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJhbmdlID09PSBJbmZpbml0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5SYW5nZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjbG9zZXN0LnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VzdC5kaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBjbG9zZXN0LnJhbmdlID0gcmFuZ2U7XG4gICAgICAgICAgICAgICAgICAgIGNsb3Nlc3QuaW5SYW5nZSA9IGluUmFuZ2U7XG4gICAgICAgICAgICAgICAgICAgIGNsb3Nlc3QuZHggPSBkeDtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VzdC5keSA9IGR5O1xuXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5yYW5nZSA9IHJhbmdlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHNuYXBDaGFuZ2VkO1xuXG4gICAgICAgICAgICBpZiAoY2xvc2VzdC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBzbmFwQ2hhbmdlZCA9IChzdGF0dXMuc25hcHBlZFggIT09IGNsb3Nlc3QudGFyZ2V0LnggfHwgc3RhdHVzLnNuYXBwZWRZICE9PSBjbG9zZXN0LnRhcmdldC55KTtcblxuICAgICAgICAgICAgICAgIHN0YXR1cy5zbmFwcGVkWCA9IGNsb3Nlc3QudGFyZ2V0Lng7XG4gICAgICAgICAgICAgICAgc3RhdHVzLnNuYXBwZWRZID0gY2xvc2VzdC50YXJnZXQueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNuYXBDaGFuZ2VkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHN0YXR1cy5zbmFwcGVkWCA9IE5hTjtcbiAgICAgICAgICAgICAgICBzdGF0dXMuc25hcHBlZFkgPSBOYU47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN0YXR1cy5keCA9IGNsb3Nlc3QuZHg7XG4gICAgICAgICAgICBzdGF0dXMuZHkgPSBjbG9zZXN0LmR5O1xuXG4gICAgICAgICAgICBzdGF0dXMuY2hhbmdlZCA9IChzbmFwQ2hhbmdlZCB8fCAoY2xvc2VzdC5pblJhbmdlICYmICFzdGF0dXMubG9ja2VkKSk7XG4gICAgICAgICAgICBzdGF0dXMubG9ja2VkID0gY2xvc2VzdC5pblJhbmdlO1xuXG4gICAgICAgICAgICByZXR1cm4gc3RhdHVzO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldFJlc3RyaWN0aW9uOiBmdW5jdGlvbiAocGFnZUNvb3Jkcywgc3RhdHVzKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcy50YXJnZXQsXG4gICAgICAgICAgICAgICAgcmVzdHJpY3QgPSB0YXJnZXQgJiYgdGFyZ2V0Lm9wdGlvbnNbdGhpcy5wcmVwYXJlZC5uYW1lXS5yZXN0cmljdCxcbiAgICAgICAgICAgICAgICByZXN0cmljdGlvbiA9IHJlc3RyaWN0ICYmIHJlc3RyaWN0LnJlc3RyaWN0aW9uLFxuICAgICAgICAgICAgICAgIHBhZ2U7XG5cbiAgICAgICAgICAgIGlmICghcmVzdHJpY3Rpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdHVzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzdGF0dXMgPSBzdGF0dXMgfHwgdGhpcy5yZXN0cmljdFN0YXR1cztcblxuICAgICAgICAgICAgcGFnZSA9IHN0YXR1cy51c2VTdGF0dXNYWVxuICAgICAgICAgICAgICAgICAgICA/IHBhZ2UgPSB7IHg6IHN0YXR1cy54LCB5OiBzdGF0dXMueSB9XG4gICAgICAgICAgICAgICAgICAgIDogcGFnZSA9IGV4dGVuZCh7fSwgcGFnZUNvb3Jkcyk7XG5cbiAgICAgICAgICAgIGlmIChzdGF0dXMuc25hcCAmJiBzdGF0dXMuc25hcC5sb2NrZWQpIHtcbiAgICAgICAgICAgICAgICBwYWdlLnggKz0gc3RhdHVzLnNuYXAuZHggfHwgMDtcbiAgICAgICAgICAgICAgICBwYWdlLnkgKz0gc3RhdHVzLnNuYXAuZHkgfHwgMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGFnZS54IC09IHRoaXMuaW5lcnRpYVN0YXR1cy5yZXN1bWVEeDtcbiAgICAgICAgICAgIHBhZ2UueSAtPSB0aGlzLmluZXJ0aWFTdGF0dXMucmVzdW1lRHk7XG5cbiAgICAgICAgICAgIHN0YXR1cy5keCA9IDA7XG4gICAgICAgICAgICBzdGF0dXMuZHkgPSAwO1xuICAgICAgICAgICAgc3RhdHVzLnJlc3RyaWN0ZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgdmFyIHJlY3QsIHJlc3RyaWN0ZWRYLCByZXN0cmljdGVkWTtcblxuICAgICAgICAgICAgaWYgKGlzU3RyaW5nKHJlc3RyaWN0aW9uKSkge1xuICAgICAgICAgICAgICAgIGlmIChyZXN0cmljdGlvbiA9PT0gJ3BhcmVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdHJpY3Rpb24gPSBwYXJlbnRFbGVtZW50KHRoaXMuZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlc3RyaWN0aW9uID09PSAnc2VsZicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdHJpY3Rpb24gPSB0YXJnZXQuZ2V0UmVjdCh0aGlzLmVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdHJpY3Rpb24gPSBjbG9zZXN0KHRoaXMuZWxlbWVudCwgcmVzdHJpY3Rpb24pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghcmVzdHJpY3Rpb24pIHsgcmV0dXJuIHN0YXR1czsgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihyZXN0cmljdGlvbikpIHtcbiAgICAgICAgICAgICAgICByZXN0cmljdGlvbiA9IHJlc3RyaWN0aW9uKHBhZ2UueCwgcGFnZS55LCB0aGlzLmVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNFbGVtZW50KHJlc3RyaWN0aW9uKSkge1xuICAgICAgICAgICAgICAgIHJlc3RyaWN0aW9uID0gZ2V0RWxlbWVudFJlY3QocmVzdHJpY3Rpb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZWN0ID0gcmVzdHJpY3Rpb247XG5cbiAgICAgICAgICAgIGlmICghcmVzdHJpY3Rpb24pIHtcbiAgICAgICAgICAgICAgICByZXN0cmljdGVkWCA9IHBhZ2UueDtcbiAgICAgICAgICAgICAgICByZXN0cmljdGVkWSA9IHBhZ2UueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIG9iamVjdCBpcyBhc3N1bWVkIHRvIGhhdmVcbiAgICAgICAgICAgIC8vIHgsIHksIHdpZHRoLCBoZWlnaHQgb3JcbiAgICAgICAgICAgIC8vIGxlZnQsIHRvcCwgcmlnaHQsIGJvdHRvbVxuICAgICAgICAgICAgZWxzZSBpZiAoJ3gnIGluIHJlc3RyaWN0aW9uICYmICd5JyBpbiByZXN0cmljdGlvbikge1xuICAgICAgICAgICAgICAgIHJlc3RyaWN0ZWRYID0gTWF0aC5tYXgoTWF0aC5taW4ocmVjdC54ICsgcmVjdC53aWR0aCAgLSB0aGlzLnJlc3RyaWN0T2Zmc2V0LnJpZ2h0ICwgcGFnZS54KSwgcmVjdC54ICsgdGhpcy5yZXN0cmljdE9mZnNldC5sZWZ0KTtcbiAgICAgICAgICAgICAgICByZXN0cmljdGVkWSA9IE1hdGgubWF4KE1hdGgubWluKHJlY3QueSArIHJlY3QuaGVpZ2h0IC0gdGhpcy5yZXN0cmljdE9mZnNldC5ib3R0b20sIHBhZ2UueSksIHJlY3QueSArIHRoaXMucmVzdHJpY3RPZmZzZXQudG9wICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN0cmljdGVkWCA9IE1hdGgubWF4KE1hdGgubWluKHJlY3QucmlnaHQgIC0gdGhpcy5yZXN0cmljdE9mZnNldC5yaWdodCAsIHBhZ2UueCksIHJlY3QubGVmdCArIHRoaXMucmVzdHJpY3RPZmZzZXQubGVmdCk7XG4gICAgICAgICAgICAgICAgcmVzdHJpY3RlZFkgPSBNYXRoLm1heChNYXRoLm1pbihyZWN0LmJvdHRvbSAtIHRoaXMucmVzdHJpY3RPZmZzZXQuYm90dG9tLCBwYWdlLnkpLCByZWN0LnRvcCAgKyB0aGlzLnJlc3RyaWN0T2Zmc2V0LnRvcCApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzdGF0dXMuZHggPSByZXN0cmljdGVkWCAtIHBhZ2UueDtcbiAgICAgICAgICAgIHN0YXR1cy5keSA9IHJlc3RyaWN0ZWRZIC0gcGFnZS55O1xuXG4gICAgICAgICAgICBzdGF0dXMuY2hhbmdlZCA9IHN0YXR1cy5yZXN0cmljdGVkWCAhPT0gcmVzdHJpY3RlZFggfHwgc3RhdHVzLnJlc3RyaWN0ZWRZICE9PSByZXN0cmljdGVkWTtcbiAgICAgICAgICAgIHN0YXR1cy5yZXN0cmljdGVkID0gISEoc3RhdHVzLmR4IHx8IHN0YXR1cy5keSk7XG5cbiAgICAgICAgICAgIHN0YXR1cy5yZXN0cmljdGVkWCA9IHJlc3RyaWN0ZWRYO1xuICAgICAgICAgICAgc3RhdHVzLnJlc3RyaWN0ZWRZID0gcmVzdHJpY3RlZFk7XG5cbiAgICAgICAgICAgIHJldHVybiBzdGF0dXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2hlY2tBbmRQcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24gKGV2ZW50LCBpbnRlcmFjdGFibGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmICghKGludGVyYWN0YWJsZSA9IGludGVyYWN0YWJsZSB8fCB0aGlzLnRhcmdldCkpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gaW50ZXJhY3RhYmxlLm9wdGlvbnMsXG4gICAgICAgICAgICAgICAgcHJldmVudCA9IG9wdGlvbnMucHJldmVudERlZmF1bHQ7XG5cbiAgICAgICAgICAgIGlmIChwcmV2ZW50ID09PSAnYXV0bycgJiYgZWxlbWVudCAmJiAhL14oaW5wdXR8c2VsZWN0fHRleHRhcmVhKSQvaS50ZXN0KGV2ZW50LnRhcmdldC5ub2RlTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAvLyBkbyBub3QgcHJldmVudERlZmF1bHQgb24gcG9pbnRlcmRvd24gaWYgdGhlIHByZXBhcmVkIGFjdGlvbiBpcyBhIGRyYWdcbiAgICAgICAgICAgICAgICAvLyBhbmQgZHJhZ2dpbmcgY2FuIG9ubHkgc3RhcnQgZnJvbSBhIGNlcnRhaW4gZGlyZWN0aW9uIC0gdGhpcyBhbGxvd3NcbiAgICAgICAgICAgICAgICAvLyBhIHRvdWNoIHRvIHBhbiB0aGUgdmlld3BvcnQgaWYgYSBkcmFnIGlzbid0IGluIHRoZSByaWdodCBkaXJlY3Rpb25cbiAgICAgICAgICAgICAgICBpZiAoL2Rvd258c3RhcnQvaS50ZXN0KGV2ZW50LnR5cGUpXG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMucHJlcGFyZWQubmFtZSA9PT0gJ2RyYWcnICYmIG9wdGlvbnMuZHJhZy5heGlzICE9PSAneHknKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHdpdGggbWFudWFsU3RhcnQsIG9ubHkgcHJldmVudERlZmF1bHQgd2hpbGUgaW50ZXJhY3RpbmdcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9uc1t0aGlzLnByZXBhcmVkLm5hbWVdICYmIG9wdGlvbnNbdGhpcy5wcmVwYXJlZC5uYW1lXS5tYW51YWxTdGFydFxuICAgICAgICAgICAgICAgICAgICAmJiAhdGhpcy5pbnRlcmFjdGluZygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHByZXZlbnQgPT09ICdhbHdheXMnKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2FsY0luZXJ0aWE6IGZ1bmN0aW9uIChzdGF0dXMpIHtcbiAgICAgICAgICAgIHZhciBpbmVydGlhT3B0aW9ucyA9IHRoaXMudGFyZ2V0Lm9wdGlvbnNbdGhpcy5wcmVwYXJlZC5uYW1lXS5pbmVydGlhLFxuICAgICAgICAgICAgICAgIGxhbWJkYSA9IGluZXJ0aWFPcHRpb25zLnJlc2lzdGFuY2UsXG4gICAgICAgICAgICAgICAgaW5lcnRpYUR1ciA9IC1NYXRoLmxvZyhpbmVydGlhT3B0aW9ucy5lbmRTcGVlZCAvIHN0YXR1cy52MCkgLyBsYW1iZGE7XG5cbiAgICAgICAgICAgIHN0YXR1cy54MCA9IHRoaXMucHJldkV2ZW50LnBhZ2VYO1xuICAgICAgICAgICAgc3RhdHVzLnkwID0gdGhpcy5wcmV2RXZlbnQucGFnZVk7XG4gICAgICAgICAgICBzdGF0dXMudDAgPSBzdGF0dXMuc3RhcnRFdmVudC50aW1lU3RhbXAgLyAxMDAwO1xuICAgICAgICAgICAgc3RhdHVzLnN4ID0gc3RhdHVzLnN5ID0gMDtcblxuICAgICAgICAgICAgc3RhdHVzLm1vZGlmaWVkWGUgPSBzdGF0dXMueGUgPSAoc3RhdHVzLnZ4MCAtIGluZXJ0aWFEdXIpIC8gbGFtYmRhO1xuICAgICAgICAgICAgc3RhdHVzLm1vZGlmaWVkWWUgPSBzdGF0dXMueWUgPSAoc3RhdHVzLnZ5MCAtIGluZXJ0aWFEdXIpIC8gbGFtYmRhO1xuICAgICAgICAgICAgc3RhdHVzLnRlID0gaW5lcnRpYUR1cjtcblxuICAgICAgICAgICAgc3RhdHVzLmxhbWJkYV92MCA9IGxhbWJkYSAvIHN0YXR1cy52MDtcbiAgICAgICAgICAgIHN0YXR1cy5vbmVfdmVfdjAgPSAxIC0gaW5lcnRpYU9wdGlvbnMuZW5kU3BlZWQgLyBzdGF0dXMudjA7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYXV0b1Njcm9sbE1vdmU6IGZ1bmN0aW9uIChwb2ludGVyKSB7XG4gICAgICAgICAgICBpZiAoISh0aGlzLmludGVyYWN0aW5nKClcbiAgICAgICAgICAgICAgICAmJiBjaGVja0F1dG9TY3JvbGwodGhpcy50YXJnZXQsIHRoaXMucHJlcGFyZWQubmFtZSkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5pbmVydGlhU3RhdHVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIGF1dG9TY3JvbGwueCA9IGF1dG9TY3JvbGwueSA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdG9wLFxuICAgICAgICAgICAgICAgIHJpZ2h0LFxuICAgICAgICAgICAgICAgIGJvdHRvbSxcbiAgICAgICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB0aGlzLnRhcmdldC5vcHRpb25zW3RoaXMucHJlcGFyZWQubmFtZV0uYXV0b1Njcm9sbCxcbiAgICAgICAgICAgICAgICBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lciB8fCBnZXRXaW5kb3codGhpcy5lbGVtZW50KTtcblxuICAgICAgICAgICAgaWYgKGlzV2luZG93KGNvbnRhaW5lcikpIHtcbiAgICAgICAgICAgICAgICBsZWZ0ICAgPSBwb2ludGVyLmNsaWVudFggPCBhdXRvU2Nyb2xsLm1hcmdpbjtcbiAgICAgICAgICAgICAgICB0b3AgICAgPSBwb2ludGVyLmNsaWVudFkgPCBhdXRvU2Nyb2xsLm1hcmdpbjtcbiAgICAgICAgICAgICAgICByaWdodCAgPSBwb2ludGVyLmNsaWVudFggPiBjb250YWluZXIuaW5uZXJXaWR0aCAgLSBhdXRvU2Nyb2xsLm1hcmdpbjtcbiAgICAgICAgICAgICAgICBib3R0b20gPSBwb2ludGVyLmNsaWVudFkgPiBjb250YWluZXIuaW5uZXJIZWlnaHQgLSBhdXRvU2Nyb2xsLm1hcmdpbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciByZWN0ID0gZ2V0RWxlbWVudENsaWVudFJlY3QoY29udGFpbmVyKTtcblxuICAgICAgICAgICAgICAgIGxlZnQgICA9IHBvaW50ZXIuY2xpZW50WCA8IHJlY3QubGVmdCAgICsgYXV0b1Njcm9sbC5tYXJnaW47XG4gICAgICAgICAgICAgICAgdG9wICAgID0gcG9pbnRlci5jbGllbnRZIDwgcmVjdC50b3AgICAgKyBhdXRvU2Nyb2xsLm1hcmdpbjtcbiAgICAgICAgICAgICAgICByaWdodCAgPSBwb2ludGVyLmNsaWVudFggPiByZWN0LnJpZ2h0ICAtIGF1dG9TY3JvbGwubWFyZ2luO1xuICAgICAgICAgICAgICAgIGJvdHRvbSA9IHBvaW50ZXIuY2xpZW50WSA+IHJlY3QuYm90dG9tIC0gYXV0b1Njcm9sbC5tYXJnaW47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGF1dG9TY3JvbGwueCA9IChyaWdodCA/IDE6IGxlZnQ/IC0xOiAwKTtcbiAgICAgICAgICAgIGF1dG9TY3JvbGwueSA9IChib3R0b20/IDE6ICB0b3A/IC0xOiAwKTtcblxuICAgICAgICAgICAgaWYgKCFhdXRvU2Nyb2xsLmlzU2Nyb2xsaW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gc2V0IHRoZSBhdXRvU2Nyb2xsIHByb3BlcnRpZXMgdG8gdGhvc2Ugb2YgdGhlIHRhcmdldFxuICAgICAgICAgICAgICAgIGF1dG9TY3JvbGwubWFyZ2luID0gb3B0aW9ucy5tYXJnaW47XG4gICAgICAgICAgICAgICAgYXV0b1Njcm9sbC5zcGVlZCAgPSBvcHRpb25zLnNwZWVkO1xuXG4gICAgICAgICAgICAgICAgYXV0b1Njcm9sbC5zdGFydCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfdXBkYXRlRXZlbnRUYXJnZXRzOiBmdW5jdGlvbiAodGFyZ2V0LCBjdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLl9ldmVudFRhcmdldCAgICA9IHRhcmdldDtcbiAgICAgICAgICAgIHRoaXMuX2N1ckV2ZW50VGFyZ2V0ID0gY3VycmVudFRhcmdldDtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldEludGVyYWN0aW9uRnJvbVBvaW50ZXIgKHBvaW50ZXIsIGV2ZW50VHlwZSwgZXZlbnRUYXJnZXQpIHtcbiAgICAgICAgdmFyIGkgPSAwLCBsZW4gPSBpbnRlcmFjdGlvbnMubGVuZ3RoLFxuICAgICAgICAgICAgbW91c2VFdmVudCA9ICgvbW91c2UvaS50ZXN0KHBvaW50ZXIucG9pbnRlclR5cGUgfHwgZXZlbnRUeXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBNU1BvaW50ZXJFdmVudC5NU1BPSU5URVJfVFlQRV9NT1VTRVxuICAgICAgICAgICAgICAgICAgICAgICAgICB8fCBwb2ludGVyLnBvaW50ZXJUeXBlID09PSA0KSxcbiAgICAgICAgICAgIGludGVyYWN0aW9uO1xuXG4gICAgICAgIHZhciBpZCA9IGdldFBvaW50ZXJJZChwb2ludGVyKTtcblxuICAgICAgICAvLyB0cnkgdG8gcmVzdW1lIGluZXJ0aWEgd2l0aCBhIG5ldyBwb2ludGVyXG4gICAgICAgIGlmICgvZG93bnxzdGFydC9pLnRlc3QoZXZlbnRUeXBlKSkge1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaW50ZXJhY3Rpb24gPSBpbnRlcmFjdGlvbnNbaV07XG5cbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGV2ZW50VGFyZ2V0O1xuXG4gICAgICAgICAgICAgICAgaWYgKGludGVyYWN0aW9uLmluZXJ0aWFTdGF0dXMuYWN0aXZlICYmIGludGVyYWN0aW9uLnRhcmdldC5vcHRpb25zW2ludGVyYWN0aW9uLnByZXBhcmVkLm5hbWVdLmluZXJ0aWEuYWxsb3dSZXN1bWVcbiAgICAgICAgICAgICAgICAgICAgJiYgKGludGVyYWN0aW9uLm1vdXNlID09PSBtb3VzZUV2ZW50KSkge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIGVsZW1lbnQgaXMgdGhlIGludGVyYWN0aW9uIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50ID09PSBpbnRlcmFjdGlvbi5lbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IHBhcmVudEVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBpdCdzIGEgbW91c2UgaW50ZXJhY3Rpb25cbiAgICAgICAgaWYgKG1vdXNlRXZlbnQgfHwgIShzdXBwb3J0c1RvdWNoIHx8IHN1cHBvcnRzUG9pbnRlckV2ZW50KSkge1xuXG4gICAgICAgICAgICAvLyBmaW5kIGEgbW91c2UgaW50ZXJhY3Rpb24gdGhhdCdzIG5vdCBpbiBpbmVydGlhIHBoYXNlXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaW50ZXJhY3Rpb25zW2ldLm1vdXNlICYmICFpbnRlcmFjdGlvbnNbaV0uaW5lcnRpYVN0YXR1cy5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uc1tpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGZpbmQgYW55IGludGVyYWN0aW9uIHNwZWNpZmljYWxseSBmb3IgbW91c2UuXG4gICAgICAgICAgICAvLyBpZiB0aGUgZXZlbnRUeXBlIGlzIGEgbW91c2Vkb3duLCBhbmQgaW5lcnRpYSBpcyBhY3RpdmVcbiAgICAgICAgICAgIC8vIGlnbm9yZSB0aGUgaW50ZXJhY3Rpb25cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpbnRlcmFjdGlvbnNbaV0ubW91c2UgJiYgISgvZG93bi8udGVzdChldmVudFR5cGUpICYmIGludGVyYWN0aW9uc1tpXS5pbmVydGlhU3RhdHVzLmFjdGl2ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgbmV3IGludGVyYWN0aW9uIGZvciBtb3VzZVxuICAgICAgICAgICAgaW50ZXJhY3Rpb24gPSBuZXcgSW50ZXJhY3Rpb24oKTtcbiAgICAgICAgICAgIGludGVyYWN0aW9uLm1vdXNlID0gdHJ1ZTtcblxuICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IGludGVyYWN0aW9uIHRoYXQgaGFzIHRoaXMgcG9pbnRlclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjb250YWlucyhpbnRlcmFjdGlvbnNbaV0ucG9pbnRlcklkcywgaWQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGF0IHRoaXMgc3RhZ2UsIGEgcG9pbnRlclVwIHNob3VsZCBub3QgcmV0dXJuIGFuIGludGVyYWN0aW9uXG4gICAgICAgIGlmICgvdXB8ZW5kfG91dC9pLnRlc3QoZXZlbnRUeXBlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgZmlyc3QgaWRsZSBpbnRlcmFjdGlvblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGludGVyYWN0aW9uID0gaW50ZXJhY3Rpb25zW2ldO1xuXG4gICAgICAgICAgICBpZiAoKCFpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lIHx8IChpbnRlcmFjdGlvbi50YXJnZXQub3B0aW9ucy5nZXN0dXJlLmVuYWJsZWQpKVxuICAgICAgICAgICAgICAgICYmICFpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpXG4gICAgICAgICAgICAgICAgJiYgISghbW91c2VFdmVudCAmJiBpbnRlcmFjdGlvbi5tb3VzZSkpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiBpbnRlcmFjdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgSW50ZXJhY3Rpb24oKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkb09uSW50ZXJhY3Rpb25zIChtZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBpbnRlcmFjdGlvbixcbiAgICAgICAgICAgICAgICBldmVudFRhcmdldCA9IGdldEFjdHVhbEVsZW1lbnQoZXZlbnQucGF0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGV2ZW50LnBhdGhbMF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBldmVudC50YXJnZXQpLFxuICAgICAgICAgICAgICAgIGN1ckV2ZW50VGFyZ2V0ID0gZ2V0QWN0dWFsRWxlbWVudChldmVudC5jdXJyZW50VGFyZ2V0KSxcbiAgICAgICAgICAgICAgICBpO1xuXG4gICAgICAgICAgICBpZiAoc3VwcG9ydHNUb3VjaCAmJiAvdG91Y2gvLnRlc3QoZXZlbnQudHlwZSkpIHtcbiAgICAgICAgICAgICAgICBwcmV2VG91Y2hUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvaW50ZXIgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1tpXTtcblxuICAgICAgICAgICAgICAgICAgICBpbnRlcmFjdGlvbiA9IGdldEludGVyYWN0aW9uRnJvbVBvaW50ZXIocG9pbnRlciwgZXZlbnQudHlwZSwgZXZlbnRUYXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghaW50ZXJhY3Rpb24pIHsgY29udGludWU7IH1cblxuICAgICAgICAgICAgICAgICAgICBpbnRlcmFjdGlvbi5fdXBkYXRlRXZlbnRUYXJnZXRzKGV2ZW50VGFyZ2V0LCBjdXJFdmVudFRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaW50ZXJhY3Rpb25bbWV0aG9kXShwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsIGN1ckV2ZW50VGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIXN1cHBvcnRzUG9pbnRlckV2ZW50ICYmIC9tb3VzZS8udGVzdChldmVudC50eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZ25vcmUgbW91c2UgZXZlbnRzIHdoaWxlIHRvdWNoIGludGVyYWN0aW9ucyBhcmUgYWN0aXZlXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBpbnRlcmFjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaW50ZXJhY3Rpb25zW2ldLm1vdXNlICYmIGludGVyYWN0aW9uc1tpXS5wb2ludGVySXNEb3duKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gdHJ5IHRvIGlnbm9yZSBtb3VzZSBldmVudHMgdGhhdCBhcmUgc2ltdWxhdGVkIGJ5IHRoZSBicm93c2VyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFmdGVyIGEgdG91Y2ggZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gcHJldlRvdWNoVGltZSA8IDUwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaW50ZXJhY3Rpb24gPSBnZXRJbnRlcmFjdGlvbkZyb21Qb2ludGVyKGV2ZW50LCBldmVudC50eXBlLCBldmVudFRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWludGVyYWN0aW9uKSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICAgICAgaW50ZXJhY3Rpb24uX3VwZGF0ZUV2ZW50VGFyZ2V0cyhldmVudFRhcmdldCwgY3VyRXZlbnRUYXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgaW50ZXJhY3Rpb25bbWV0aG9kXShldmVudCwgZXZlbnQsIGV2ZW50VGFyZ2V0LCBjdXJFdmVudFRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIEludGVyYWN0RXZlbnQgKGludGVyYWN0aW9uLCBldmVudCwgYWN0aW9uLCBwaGFzZSwgZWxlbWVudCwgcmVsYXRlZCkge1xuICAgICAgICB2YXIgY2xpZW50LFxuICAgICAgICAgICAgcGFnZSxcbiAgICAgICAgICAgIHRhcmdldCAgICAgID0gaW50ZXJhY3Rpb24udGFyZ2V0LFxuICAgICAgICAgICAgc25hcFN0YXR1cyAgPSBpbnRlcmFjdGlvbi5zbmFwU3RhdHVzLFxuICAgICAgICAgICAgcmVzdHJpY3RTdGF0dXMgID0gaW50ZXJhY3Rpb24ucmVzdHJpY3RTdGF0dXMsXG4gICAgICAgICAgICBwb2ludGVycyAgICA9IGludGVyYWN0aW9uLnBvaW50ZXJzLFxuICAgICAgICAgICAgZGVsdGFTb3VyY2UgPSAodGFyZ2V0ICYmIHRhcmdldC5vcHRpb25zIHx8IGRlZmF1bHRPcHRpb25zKS5kZWx0YVNvdXJjZSxcbiAgICAgICAgICAgIHNvdXJjZVggICAgID0gZGVsdGFTb3VyY2UgKyAnWCcsXG4gICAgICAgICAgICBzb3VyY2VZICAgICA9IGRlbHRhU291cmNlICsgJ1knLFxuICAgICAgICAgICAgb3B0aW9ucyAgICAgPSB0YXJnZXQ/IHRhcmdldC5vcHRpb25zOiBkZWZhdWx0T3B0aW9ucyxcbiAgICAgICAgICAgIG9yaWdpbiAgICAgID0gZ2V0T3JpZ2luWFkodGFyZ2V0LCBlbGVtZW50KSxcbiAgICAgICAgICAgIHN0YXJ0aW5nICAgID0gcGhhc2UgPT09ICdzdGFydCcsXG4gICAgICAgICAgICBlbmRpbmcgICAgICA9IHBoYXNlID09PSAnZW5kJyxcbiAgICAgICAgICAgIGNvb3JkcyAgICAgID0gc3RhcnRpbmc/IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzIDogaW50ZXJhY3Rpb24uY3VyQ29vcmRzO1xuXG4gICAgICAgIGVsZW1lbnQgPSBlbGVtZW50IHx8IGludGVyYWN0aW9uLmVsZW1lbnQ7XG5cbiAgICAgICAgcGFnZSAgID0gZXh0ZW5kKHt9LCBjb29yZHMucGFnZSk7XG4gICAgICAgIGNsaWVudCA9IGV4dGVuZCh7fSwgY29vcmRzLmNsaWVudCk7XG5cbiAgICAgICAgcGFnZS54IC09IG9yaWdpbi54O1xuICAgICAgICBwYWdlLnkgLT0gb3JpZ2luLnk7XG5cbiAgICAgICAgY2xpZW50LnggLT0gb3JpZ2luLng7XG4gICAgICAgIGNsaWVudC55IC09IG9yaWdpbi55O1xuXG4gICAgICAgIHZhciByZWxhdGl2ZVBvaW50cyA9IG9wdGlvbnNbYWN0aW9uXS5zbmFwICYmIG9wdGlvbnNbYWN0aW9uXS5zbmFwLnJlbGF0aXZlUG9pbnRzIDtcblxuICAgICAgICBpZiAoY2hlY2tTbmFwKHRhcmdldCwgYWN0aW9uKSAmJiAhKHN0YXJ0aW5nICYmIHJlbGF0aXZlUG9pbnRzICYmIHJlbGF0aXZlUG9pbnRzLmxlbmd0aCkpIHtcbiAgICAgICAgICAgIHRoaXMuc25hcCA9IHtcbiAgICAgICAgICAgICAgICByYW5nZSAgOiBzbmFwU3RhdHVzLnJhbmdlLFxuICAgICAgICAgICAgICAgIGxvY2tlZCA6IHNuYXBTdGF0dXMubG9ja2VkLFxuICAgICAgICAgICAgICAgIHggICAgICA6IHNuYXBTdGF0dXMuc25hcHBlZFgsXG4gICAgICAgICAgICAgICAgeSAgICAgIDogc25hcFN0YXR1cy5zbmFwcGVkWSxcbiAgICAgICAgICAgICAgICByZWFsWCAgOiBzbmFwU3RhdHVzLnJlYWxYLFxuICAgICAgICAgICAgICAgIHJlYWxZICA6IHNuYXBTdGF0dXMucmVhbFksXG4gICAgICAgICAgICAgICAgZHggICAgIDogc25hcFN0YXR1cy5keCxcbiAgICAgICAgICAgICAgICBkeSAgICAgOiBzbmFwU3RhdHVzLmR5XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoc25hcFN0YXR1cy5sb2NrZWQpIHtcbiAgICAgICAgICAgICAgICBwYWdlLnggKz0gc25hcFN0YXR1cy5keDtcbiAgICAgICAgICAgICAgICBwYWdlLnkgKz0gc25hcFN0YXR1cy5keTtcbiAgICAgICAgICAgICAgICBjbGllbnQueCArPSBzbmFwU3RhdHVzLmR4O1xuICAgICAgICAgICAgICAgIGNsaWVudC55ICs9IHNuYXBTdGF0dXMuZHk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hlY2tSZXN0cmljdCh0YXJnZXQsIGFjdGlvbikgJiYgIShzdGFydGluZyAmJiBvcHRpb25zW2FjdGlvbl0ucmVzdHJpY3QuZWxlbWVudFJlY3QpICYmIHJlc3RyaWN0U3RhdHVzLnJlc3RyaWN0ZWQpIHtcbiAgICAgICAgICAgIHBhZ2UueCArPSByZXN0cmljdFN0YXR1cy5keDtcbiAgICAgICAgICAgIHBhZ2UueSArPSByZXN0cmljdFN0YXR1cy5keTtcbiAgICAgICAgICAgIGNsaWVudC54ICs9IHJlc3RyaWN0U3RhdHVzLmR4O1xuICAgICAgICAgICAgY2xpZW50LnkgKz0gcmVzdHJpY3RTdGF0dXMuZHk7XG5cbiAgICAgICAgICAgIHRoaXMucmVzdHJpY3QgPSB7XG4gICAgICAgICAgICAgICAgZHg6IHJlc3RyaWN0U3RhdHVzLmR4LFxuICAgICAgICAgICAgICAgIGR5OiByZXN0cmljdFN0YXR1cy5keVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGFnZVggICAgID0gcGFnZS54O1xuICAgICAgICB0aGlzLnBhZ2VZICAgICA9IHBhZ2UueTtcbiAgICAgICAgdGhpcy5jbGllbnRYICAgPSBjbGllbnQueDtcbiAgICAgICAgdGhpcy5jbGllbnRZICAgPSBjbGllbnQueTtcblxuICAgICAgICB0aGlzLngwICAgICAgICA9IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLnBhZ2UueCAtIG9yaWdpbi54O1xuICAgICAgICB0aGlzLnkwICAgICAgICA9IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLnBhZ2UueSAtIG9yaWdpbi55O1xuICAgICAgICB0aGlzLmNsaWVudFgwICA9IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLmNsaWVudC54IC0gb3JpZ2luLng7XG4gICAgICAgIHRoaXMuY2xpZW50WTAgID0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMuY2xpZW50LnkgLSBvcmlnaW4ueTtcbiAgICAgICAgdGhpcy5jdHJsS2V5ICAgPSBldmVudC5jdHJsS2V5O1xuICAgICAgICB0aGlzLmFsdEtleSAgICA9IGV2ZW50LmFsdEtleTtcbiAgICAgICAgdGhpcy5zaGlmdEtleSAgPSBldmVudC5zaGlmdEtleTtcbiAgICAgICAgdGhpcy5tZXRhS2V5ICAgPSBldmVudC5tZXRhS2V5O1xuICAgICAgICB0aGlzLmJ1dHRvbiAgICA9IGV2ZW50LmJ1dHRvbjtcbiAgICAgICAgdGhpcy5idXR0b25zICAgPSBldmVudC5idXR0b25zO1xuICAgICAgICB0aGlzLnRhcmdldCAgICA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMudDAgICAgICAgID0gaW50ZXJhY3Rpb24uZG93blRpbWVzWzBdO1xuICAgICAgICB0aGlzLnR5cGUgICAgICA9IGFjdGlvbiArIChwaGFzZSB8fCAnJyk7XG5cbiAgICAgICAgdGhpcy5pbnRlcmFjdGlvbiA9IGludGVyYWN0aW9uO1xuICAgICAgICB0aGlzLmludGVyYWN0YWJsZSA9IHRhcmdldDtcblxuICAgICAgICB2YXIgaW5lcnRpYVN0YXR1cyA9IGludGVyYWN0aW9uLmluZXJ0aWFTdGF0dXM7XG5cbiAgICAgICAgaWYgKGluZXJ0aWFTdGF0dXMuYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmRldGFpbCA9ICdpbmVydGlhJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZWxhdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnJlbGF0ZWRUYXJnZXQgPSByZWxhdGVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZW5kIGV2ZW50IGR4LCBkeSBpcyBkaWZmZXJlbmNlIGJldHdlZW4gc3RhcnQgYW5kIGVuZCBwb2ludHNcbiAgICAgICAgaWYgKGVuZGluZykge1xuICAgICAgICAgICAgaWYgKGRlbHRhU291cmNlID09PSAnY2xpZW50Jykge1xuICAgICAgICAgICAgICAgIHRoaXMuZHggPSBjbGllbnQueCAtIGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLmNsaWVudC54O1xuICAgICAgICAgICAgICAgIHRoaXMuZHkgPSBjbGllbnQueSAtIGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLmNsaWVudC55O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5keCA9IHBhZ2UueCAtIGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLnBhZ2UueDtcbiAgICAgICAgICAgICAgICB0aGlzLmR5ID0gcGFnZS55IC0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMucGFnZS55O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN0YXJ0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLmR4ID0gMDtcbiAgICAgICAgICAgIHRoaXMuZHkgPSAwO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvcHkgcHJvcGVydGllcyBmcm9tIHByZXZpb3VzbW92ZSBpZiBzdGFydGluZyBpbmVydGlhXG4gICAgICAgIGVsc2UgaWYgKHBoYXNlID09PSAnaW5lcnRpYXN0YXJ0Jykge1xuICAgICAgICAgICAgdGhpcy5keCA9IGludGVyYWN0aW9uLnByZXZFdmVudC5keDtcbiAgICAgICAgICAgIHRoaXMuZHkgPSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQuZHk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZGVsdGFTb3VyY2UgPT09ICdjbGllbnQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5keCA9IGNsaWVudC54IC0gaW50ZXJhY3Rpb24ucHJldkV2ZW50LmNsaWVudFg7XG4gICAgICAgICAgICAgICAgdGhpcy5keSA9IGNsaWVudC55IC0gaW50ZXJhY3Rpb24ucHJldkV2ZW50LmNsaWVudFk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmR4ID0gcGFnZS54IC0gaW50ZXJhY3Rpb24ucHJldkV2ZW50LnBhZ2VYO1xuICAgICAgICAgICAgICAgIHRoaXMuZHkgPSBwYWdlLnkgLSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQucGFnZVk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGludGVyYWN0aW9uLnByZXZFdmVudCAmJiBpbnRlcmFjdGlvbi5wcmV2RXZlbnQuZGV0YWlsID09PSAnaW5lcnRpYSdcbiAgICAgICAgICAgICYmICFpbmVydGlhU3RhdHVzLmFjdGl2ZVxuICAgICAgICAgICAgJiYgb3B0aW9uc1thY3Rpb25dLmluZXJ0aWEgJiYgb3B0aW9uc1thY3Rpb25dLmluZXJ0aWEuemVyb1Jlc3VtZURlbHRhKSB7XG5cbiAgICAgICAgICAgIGluZXJ0aWFTdGF0dXMucmVzdW1lRHggKz0gdGhpcy5keDtcbiAgICAgICAgICAgIGluZXJ0aWFTdGF0dXMucmVzdW1lRHkgKz0gdGhpcy5keTtcblxuICAgICAgICAgICAgdGhpcy5keCA9IHRoaXMuZHkgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ3Jlc2l6ZScgJiYgaW50ZXJhY3Rpb24ucmVzaXplQXhlcykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMucmVzaXplLnNxdWFyZSkge1xuICAgICAgICAgICAgICAgIGlmIChpbnRlcmFjdGlvbi5yZXNpemVBeGVzID09PSAneScpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5keCA9IHRoaXMuZHk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmR5ID0gdGhpcy5keDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5heGVzID0gJ3h5JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYXhlcyA9IGludGVyYWN0aW9uLnJlc2l6ZUF4ZXM7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW50ZXJhY3Rpb24ucmVzaXplQXhlcyA9PT0gJ3gnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHkgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpbnRlcmFjdGlvbi5yZXNpemVBeGVzID09PSAneScpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5keCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFjdGlvbiA9PT0gJ2dlc3R1cmUnKSB7XG4gICAgICAgICAgICB0aGlzLnRvdWNoZXMgPSBbcG9pbnRlcnNbMF0sIHBvaW50ZXJzWzFdXTtcblxuICAgICAgICAgICAgaWYgKHN0YXJ0aW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXN0YW5jZSA9IHRvdWNoRGlzdGFuY2UocG9pbnRlcnMsIGRlbHRhU291cmNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJveCAgICAgID0gdG91Y2hCQm94KHBvaW50ZXJzKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYWxlICAgID0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLmRzICAgICAgID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlICAgID0gdG91Y2hBbmdsZShwb2ludGVycywgdW5kZWZpbmVkLCBkZWx0YVNvdXJjZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5kYSAgICAgICA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChlbmRpbmcgfHwgZXZlbnQgaW5zdGFuY2VvZiBJbnRlcmFjdEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXN0YW5jZSA9IGludGVyYWN0aW9uLnByZXZFdmVudC5kaXN0YW5jZTtcbiAgICAgICAgICAgICAgICB0aGlzLmJveCAgICAgID0gaW50ZXJhY3Rpb24ucHJldkV2ZW50LmJveDtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYWxlICAgID0gaW50ZXJhY3Rpb24ucHJldkV2ZW50LnNjYWxlO1xuICAgICAgICAgICAgICAgIHRoaXMuZHMgICAgICAgPSB0aGlzLnNjYWxlIC0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlICAgID0gaW50ZXJhY3Rpb24ucHJldkV2ZW50LmFuZ2xlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGEgICAgICAgPSB0aGlzLmFuZ2xlIC0gaW50ZXJhY3Rpb24uZ2VzdHVyZS5zdGFydEFuZ2xlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXN0YW5jZSA9IHRvdWNoRGlzdGFuY2UocG9pbnRlcnMsIGRlbHRhU291cmNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJveCAgICAgID0gdG91Y2hCQm94KHBvaW50ZXJzKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYWxlICAgID0gdGhpcy5kaXN0YW5jZSAvIGludGVyYWN0aW9uLmdlc3R1cmUuc3RhcnREaXN0YW5jZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlICAgID0gdG91Y2hBbmdsZShwb2ludGVycywgaW50ZXJhY3Rpb24uZ2VzdHVyZS5wcmV2QW5nbGUsIGRlbHRhU291cmNlKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZHMgPSB0aGlzLnNjYWxlIC0gaW50ZXJhY3Rpb24uZ2VzdHVyZS5wcmV2U2NhbGU7XG4gICAgICAgICAgICAgICAgdGhpcy5kYSA9IHRoaXMuYW5nbGUgLSBpbnRlcmFjdGlvbi5nZXN0dXJlLnByZXZBbmdsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGFydGluZykge1xuICAgICAgICAgICAgdGhpcy50aW1lU3RhbXAgPSBpbnRlcmFjdGlvbi5kb3duVGltZXNbMF07XG4gICAgICAgICAgICB0aGlzLmR0ICAgICAgICA9IDA7XG4gICAgICAgICAgICB0aGlzLmR1cmF0aW9uICA9IDA7XG4gICAgICAgICAgICB0aGlzLnNwZWVkICAgICA9IDA7XG4gICAgICAgICAgICB0aGlzLnZlbG9jaXR5WCA9IDA7XG4gICAgICAgICAgICB0aGlzLnZlbG9jaXR5WSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocGhhc2UgPT09ICdpbmVydGlhc3RhcnQnKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWVTdGFtcCA9IGludGVyYWN0aW9uLnByZXZFdmVudC50aW1lU3RhbXA7XG4gICAgICAgICAgICB0aGlzLmR0ICAgICAgICA9IGludGVyYWN0aW9uLnByZXZFdmVudC5kdDtcbiAgICAgICAgICAgIHRoaXMuZHVyYXRpb24gID0gaW50ZXJhY3Rpb24ucHJldkV2ZW50LmR1cmF0aW9uO1xuICAgICAgICAgICAgdGhpcy5zcGVlZCAgICAgPSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQuc3BlZWQ7XG4gICAgICAgICAgICB0aGlzLnZlbG9jaXR5WCA9IGludGVyYWN0aW9uLnByZXZFdmVudC52ZWxvY2l0eVg7XG4gICAgICAgICAgICB0aGlzLnZlbG9jaXR5WSA9IGludGVyYWN0aW9uLnByZXZFdmVudC52ZWxvY2l0eVk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRpbWVTdGFtcCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgdGhpcy5kdCAgICAgICAgPSB0aGlzLnRpbWVTdGFtcCAtIGludGVyYWN0aW9uLnByZXZFdmVudC50aW1lU3RhbXA7XG4gICAgICAgICAgICB0aGlzLmR1cmF0aW9uICA9IHRoaXMudGltZVN0YW1wIC0gaW50ZXJhY3Rpb24uZG93blRpbWVzWzBdO1xuXG4gICAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBJbnRlcmFjdEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGR4ID0gdGhpc1tzb3VyY2VYXSAtIGludGVyYWN0aW9uLnByZXZFdmVudFtzb3VyY2VYXSxcbiAgICAgICAgICAgICAgICAgICAgZHkgPSB0aGlzW3NvdXJjZVldIC0gaW50ZXJhY3Rpb24ucHJldkV2ZW50W3NvdXJjZVldLFxuICAgICAgICAgICAgICAgICAgICBkdCA9IHRoaXMuZHQgLyAxMDAwO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZCA9IGh5cG90KGR4LCBkeSkgLyBkdDtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbG9jaXR5WCA9IGR4IC8gZHQ7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxvY2l0eVkgPSBkeSAvIGR0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgbm9ybWFsIG1vdmUgb3IgZW5kIGV2ZW50LCB1c2UgcHJldmlvdXMgdXNlciBldmVudCBjb29yZHNcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHNwZWVkIGFuZCB2ZWxvY2l0eSBpbiBwaXhlbHMgcGVyIHNlY29uZFxuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGFbZGVsdGFTb3VyY2VdLnNwZWVkO1xuICAgICAgICAgICAgICAgIHRoaXMudmVsb2NpdHlYID0gaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhW2RlbHRhU291cmNlXS52eDtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbG9jaXR5WSA9IGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YVtkZWx0YVNvdXJjZV0udnk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKGVuZGluZyB8fCBwaGFzZSA9PT0gJ2luZXJ0aWFzdGFydCcpXG4gICAgICAgICAgICAmJiBpbnRlcmFjdGlvbi5wcmV2RXZlbnQuc3BlZWQgPiA2MDAgJiYgdGhpcy50aW1lU3RhbXAgLSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQudGltZVN0YW1wIDwgMTUwKSB7XG5cbiAgICAgICAgICAgIHZhciBhbmdsZSA9IDE4MCAqIE1hdGguYXRhbjIoaW50ZXJhY3Rpb24ucHJldkV2ZW50LnZlbG9jaXR5WSwgaW50ZXJhY3Rpb24ucHJldkV2ZW50LnZlbG9jaXR5WCkgLyBNYXRoLlBJLFxuICAgICAgICAgICAgICAgIG92ZXJsYXAgPSAyMi41O1xuXG4gICAgICAgICAgICBpZiAoYW5nbGUgPCAwKSB7XG4gICAgICAgICAgICAgICAgYW5nbGUgKz0gMzYwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbGVmdCA9IDEzNSAtIG92ZXJsYXAgPD0gYW5nbGUgJiYgYW5nbGUgPCAyMjUgKyBvdmVybGFwLFxuICAgICAgICAgICAgICAgIHVwICAgPSAyMjUgLSBvdmVybGFwIDw9IGFuZ2xlICYmIGFuZ2xlIDwgMzE1ICsgb3ZlcmxhcCxcblxuICAgICAgICAgICAgICAgIHJpZ2h0ID0gIWxlZnQgJiYgKDMxNSAtIG92ZXJsYXAgPD0gYW5nbGUgfHwgYW5nbGUgPCAgNDUgKyBvdmVybGFwKSxcbiAgICAgICAgICAgICAgICBkb3duICA9ICF1cCAgICYmICAgNDUgLSBvdmVybGFwIDw9IGFuZ2xlICYmIGFuZ2xlIDwgMTM1ICsgb3ZlcmxhcDtcblxuICAgICAgICAgICAgdGhpcy5zd2lwZSA9IHtcbiAgICAgICAgICAgICAgICB1cCAgIDogdXAsXG4gICAgICAgICAgICAgICAgZG93biA6IGRvd24sXG4gICAgICAgICAgICAgICAgbGVmdCA6IGxlZnQsXG4gICAgICAgICAgICAgICAgcmlnaHQ6IHJpZ2h0LFxuICAgICAgICAgICAgICAgIGFuZ2xlOiBhbmdsZSxcbiAgICAgICAgICAgICAgICBzcGVlZDogaW50ZXJhY3Rpb24ucHJldkV2ZW50LnNwZWVkLFxuICAgICAgICAgICAgICAgIHZlbG9jaXR5OiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGludGVyYWN0aW9uLnByZXZFdmVudC52ZWxvY2l0eVgsXG4gICAgICAgICAgICAgICAgICAgIHk6IGludGVyYWN0aW9uLnByZXZFdmVudC52ZWxvY2l0eVlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgSW50ZXJhY3RFdmVudC5wcm90b3R5cGUgPSB7XG4gICAgICAgIHByZXZlbnREZWZhdWx0OiBibGFuayxcbiAgICAgICAgc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9IHRoaXMucHJvcGFnYXRpb25TdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgc3RvcFByb3BhZ2F0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BhZ2F0aW9uU3RvcHBlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcHJldmVudE9yaWdpbmFsRGVmYXVsdCAoKSB7XG4gICAgICAgIHRoaXMub3JpZ2luYWxFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEFjdGlvbkN1cnNvciAoYWN0aW9uKSB7XG4gICAgICAgIHZhciBjdXJzb3IgPSAnJztcblxuICAgICAgICBpZiAoYWN0aW9uLm5hbWUgPT09ICdkcmFnJykge1xuICAgICAgICAgICAgY3Vyc29yID0gIGFjdGlvbkN1cnNvcnMuZHJhZztcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWN0aW9uLm5hbWUgPT09ICdyZXNpemUnKSB7XG4gICAgICAgICAgICBpZiAoYWN0aW9uLmF4aXMpIHtcbiAgICAgICAgICAgICAgICBjdXJzb3IgPSAgYWN0aW9uQ3Vyc29yc1thY3Rpb24ubmFtZSArIGFjdGlvbi5heGlzXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFjdGlvbi5lZGdlcykge1xuICAgICAgICAgICAgICAgIHZhciBjdXJzb3JLZXkgPSAncmVzaXplJyxcbiAgICAgICAgICAgICAgICAgICAgZWRnZU5hbWVzID0gWyd0b3AnLCAnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnXTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24uZWRnZXNbZWRnZU5hbWVzW2ldXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yS2V5ICs9IGVkZ2VOYW1lc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGN1cnNvciA9IGFjdGlvbkN1cnNvcnNbY3Vyc29yS2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjdXJzb3I7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tSZXNpemVFZGdlIChuYW1lLCB2YWx1ZSwgcGFnZSwgZWxlbWVudCwgaW50ZXJhY3RhYmxlRWxlbWVudCwgcmVjdCwgbWFyZ2luKSB7XG4gICAgICAgIC8vIGZhbHNlLCAnJywgdW5kZWZpbmVkLCBudWxsXG4gICAgICAgIGlmICghdmFsdWUpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgLy8gdHJ1ZSB2YWx1ZSwgdXNlIHBvaW50ZXIgY29vcmRzIGFuZCBlbGVtZW50IHJlY3RcbiAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyBpZiBkaW1lbnNpb25zIGFyZSBuZWdhdGl2ZSwgXCJzd2l0Y2hcIiBlZGdlc1xuICAgICAgICAgICAgdmFyIHdpZHRoID0gaXNOdW1iZXIocmVjdC53aWR0aCk/IHJlY3Qud2lkdGggOiByZWN0LnJpZ2h0IC0gcmVjdC5sZWZ0LFxuICAgICAgICAgICAgICAgIGhlaWdodCA9IGlzTnVtYmVyKHJlY3QuaGVpZ2h0KT8gcmVjdC5oZWlnaHQgOiByZWN0LmJvdHRvbSAtIHJlY3QudG9wO1xuXG4gICAgICAgICAgICBpZiAod2lkdGggPCAwKSB7XG4gICAgICAgICAgICAgICAgaWYgICAgICAobmFtZSA9PT0gJ2xlZnQnICkgeyBuYW1lID0gJ3JpZ2h0JzsgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5hbWUgPT09ICdyaWdodCcpIHsgbmFtZSA9ICdsZWZ0JyA7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChoZWlnaHQgPCAwKSB7XG4gICAgICAgICAgICAgICAgaWYgICAgICAobmFtZSA9PT0gJ3RvcCcgICApIHsgbmFtZSA9ICdib3R0b20nOyB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobmFtZSA9PT0gJ2JvdHRvbScpIHsgbmFtZSA9ICd0b3AnICAgOyB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChuYW1lID09PSAnbGVmdCcgICkgeyByZXR1cm4gcGFnZS54IDwgKCh3aWR0aCAgPj0gMD8gcmVjdC5sZWZ0OiByZWN0LnJpZ2h0ICkgKyBtYXJnaW4pOyB9XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gJ3RvcCcgICApIHsgcmV0dXJuIHBhZ2UueSA8ICgoaGVpZ2h0ID49IDA/IHJlY3QudG9wIDogcmVjdC5ib3R0b20pICsgbWFyZ2luKTsgfVxuXG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gJ3JpZ2h0JyApIHsgcmV0dXJuIHBhZ2UueCA+ICgod2lkdGggID49IDA/IHJlY3QucmlnaHQgOiByZWN0LmxlZnQpIC0gbWFyZ2luKTsgfVxuICAgICAgICAgICAgaWYgKG5hbWUgPT09ICdib3R0b20nKSB7IHJldHVybiBwYWdlLnkgPiAoKGhlaWdodCA+PSAwPyByZWN0LmJvdHRvbTogcmVjdC50b3AgKSAtIG1hcmdpbik7IH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoZSByZW1haW5pbmcgY2hlY2tzIHJlcXVpcmUgYW4gZWxlbWVudFxuICAgICAgICBpZiAoIWlzRWxlbWVudChlbGVtZW50KSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICByZXR1cm4gaXNFbGVtZW50KHZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgdmFsdWUgaXMgYW4gZWxlbWVudCB0byB1c2UgYXMgYSByZXNpemUgaGFuZGxlXG4gICAgICAgICAgICAgICAgICAgID8gdmFsdWUgPT09IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIGNoZWNrIGlmIGVsZW1lbnQgbWF0Y2hlcyB2YWx1ZSBhcyBzZWxlY3RvclxuICAgICAgICAgICAgICAgICAgICA6IG1hdGNoZXNVcFRvKGVsZW1lbnQsIHZhbHVlLCBpbnRlcmFjdGFibGVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWZhdWx0QWN0aW9uQ2hlY2tlciAocG9pbnRlciwgaW50ZXJhY3Rpb24sIGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHJlY3QgPSB0aGlzLmdldFJlY3QoZWxlbWVudCksXG4gICAgICAgICAgICBzaG91bGRSZXNpemUgPSBmYWxzZSxcbiAgICAgICAgICAgIGFjdGlvbiA9IG51bGwsXG4gICAgICAgICAgICByZXNpemVBeGVzID0gbnVsbCxcbiAgICAgICAgICAgIHJlc2l6ZUVkZ2VzLFxuICAgICAgICAgICAgcGFnZSA9IGV4dGVuZCh7fSwgaW50ZXJhY3Rpb24uY3VyQ29vcmRzLnBhZ2UpLFxuICAgICAgICAgICAgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblxuICAgICAgICBpZiAoIXJlY3QpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICBpZiAoYWN0aW9uSXNFbmFibGVkLnJlc2l6ZSAmJiBvcHRpb25zLnJlc2l6ZS5lbmFibGVkKSB7XG4gICAgICAgICAgICB2YXIgcmVzaXplT3B0aW9ucyA9IG9wdGlvbnMucmVzaXplO1xuXG4gICAgICAgICAgICByZXNpemVFZGdlcyA9IHtcbiAgICAgICAgICAgICAgICBsZWZ0OiBmYWxzZSwgcmlnaHQ6IGZhbHNlLCB0b3A6IGZhbHNlLCBib3R0b206IGZhbHNlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBpZiB1c2luZyByZXNpemUuZWRnZXNcbiAgICAgICAgICAgIGlmIChpc09iamVjdChyZXNpemVPcHRpb25zLmVkZ2VzKSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGVkZ2UgaW4gcmVzaXplRWRnZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplRWRnZXNbZWRnZV0gPSBjaGVja1Jlc2l6ZUVkZ2UoZWRnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXplT3B0aW9ucy5lZGdlc1tlZGdlXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJhY3Rpb24uX2V2ZW50VGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNpemVPcHRpb25zLm1hcmdpbiB8fCBtYXJnaW4pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc2l6ZUVkZ2VzLmxlZnQgPSByZXNpemVFZGdlcy5sZWZ0ICYmICFyZXNpemVFZGdlcy5yaWdodDtcbiAgICAgICAgICAgICAgICByZXNpemVFZGdlcy50b3AgID0gcmVzaXplRWRnZXMudG9wICAmJiAhcmVzaXplRWRnZXMuYm90dG9tO1xuXG4gICAgICAgICAgICAgICAgc2hvdWxkUmVzaXplID0gcmVzaXplRWRnZXMubGVmdCB8fCByZXNpemVFZGdlcy5yaWdodCB8fCByZXNpemVFZGdlcy50b3AgfHwgcmVzaXplRWRnZXMuYm90dG9tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHJpZ2h0ICA9IG9wdGlvbnMucmVzaXplLmF4aXMgIT09ICd5JyAmJiBwYWdlLnggPiAocmVjdC5yaWdodCAgLSBtYXJnaW4pLFxuICAgICAgICAgICAgICAgICAgICBib3R0b20gPSBvcHRpb25zLnJlc2l6ZS5heGlzICE9PSAneCcgJiYgcGFnZS55ID4gKHJlY3QuYm90dG9tIC0gbWFyZ2luKTtcblxuICAgICAgICAgICAgICAgIHNob3VsZFJlc2l6ZSA9IHJpZ2h0IHx8IGJvdHRvbTtcbiAgICAgICAgICAgICAgICByZXNpemVBeGVzID0gKHJpZ2h0PyAneCcgOiAnJykgKyAoYm90dG9tPyAneScgOiAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBhY3Rpb24gPSBzaG91bGRSZXNpemVcbiAgICAgICAgICAgID8gJ3Jlc2l6ZSdcbiAgICAgICAgICAgIDogYWN0aW9uSXNFbmFibGVkLmRyYWcgJiYgb3B0aW9ucy5kcmFnLmVuYWJsZWRcbiAgICAgICAgICAgICAgICA/ICdkcmFnJ1xuICAgICAgICAgICAgICAgIDogbnVsbDtcblxuICAgICAgICBpZiAoYWN0aW9uSXNFbmFibGVkLmdlc3R1cmVcbiAgICAgICAgICAgICYmIGludGVyYWN0aW9uLnBvaW50ZXJJZHMubGVuZ3RoID49MlxuICAgICAgICAgICAgJiYgIShpbnRlcmFjdGlvbi5kcmFnZ2luZyB8fCBpbnRlcmFjdGlvbi5yZXNpemluZykpIHtcbiAgICAgICAgICAgIGFjdGlvbiA9ICdnZXN0dXJlJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbmFtZTogYWN0aW9uLFxuICAgICAgICAgICAgICAgIGF4aXM6IHJlc2l6ZUF4ZXMsXG4gICAgICAgICAgICAgICAgZWRnZXM6IHJlc2l6ZUVkZ2VzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgYWN0aW9uIGlzIGVuYWJsZWQgZ2xvYmFsbHkgYW5kIHRoZSBjdXJyZW50IHRhcmdldCBzdXBwb3J0cyBpdFxuICAgIC8vIElmIHNvLCByZXR1cm4gdGhlIHZhbGlkYXRlZCBhY3Rpb24uIE90aGVyd2lzZSwgcmV0dXJuIG51bGxcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZUFjdGlvbiAoYWN0aW9uLCBpbnRlcmFjdGFibGUpIHtcbiAgICAgICAgaWYgKCFpc09iamVjdChhY3Rpb24pKSB7IHJldHVybiBudWxsOyB9XG5cbiAgICAgICAgdmFyIGFjdGlvbk5hbWUgPSBhY3Rpb24ubmFtZSxcbiAgICAgICAgICAgIG9wdGlvbnMgPSBpbnRlcmFjdGFibGUub3B0aW9ucztcblxuICAgICAgICBpZiAoKCAgKGFjdGlvbk5hbWUgID09PSAncmVzaXplJyAgICYmIG9wdGlvbnMucmVzaXplLmVuYWJsZWQgKVxuICAgICAgICAgICAgfHwgKGFjdGlvbk5hbWUgICAgICA9PT0gJ2RyYWcnICAgICAmJiBvcHRpb25zLmRyYWcuZW5hYmxlZCAgKVxuICAgICAgICAgICAgfHwgKGFjdGlvbk5hbWUgICAgICA9PT0gJ2dlc3R1cmUnICAmJiBvcHRpb25zLmdlc3R1cmUuZW5hYmxlZCkpXG4gICAgICAgICAgICAmJiBhY3Rpb25Jc0VuYWJsZWRbYWN0aW9uTmFtZV0pIHtcblxuICAgICAgICAgICAgaWYgKGFjdGlvbk5hbWUgPT09ICdyZXNpemUnIHx8IGFjdGlvbk5hbWUgPT09ICdyZXNpemV5eCcpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25OYW1lID0gJ3Jlc2l6ZXh5JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgbGlzdGVuZXJzID0ge30sXG4gICAgICAgIGludGVyYWN0aW9uTGlzdGVuZXJzID0gW1xuICAgICAgICAgICAgJ2RyYWdTdGFydCcsICdkcmFnTW92ZScsICdyZXNpemVTdGFydCcsICdyZXNpemVNb3ZlJywgJ2dlc3R1cmVTdGFydCcsICdnZXN0dXJlTW92ZScsXG4gICAgICAgICAgICAncG9pbnRlck92ZXInLCAncG9pbnRlck91dCcsICdwb2ludGVySG92ZXInLCAnc2VsZWN0b3JEb3duJyxcbiAgICAgICAgICAgICdwb2ludGVyRG93bicsICdwb2ludGVyTW92ZScsICdwb2ludGVyVXAnLCAncG9pbnRlckNhbmNlbCcsICdwb2ludGVyRW5kJyxcbiAgICAgICAgICAgICdhZGRQb2ludGVyJywgJ3JlbW92ZVBvaW50ZXInLCAncmVjb3JkUG9pbnRlcicsICdhdXRvU2Nyb2xsTW92ZSdcbiAgICAgICAgXTtcblxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBpbnRlcmFjdGlvbkxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgbmFtZSA9IGludGVyYWN0aW9uTGlzdGVuZXJzW2ldO1xuXG4gICAgICAgIGxpc3RlbmVyc1tuYW1lXSA9IGRvT25JbnRlcmFjdGlvbnMobmFtZSk7XG4gICAgfVxuXG4gICAgLy8gYm91bmQgdG8gdGhlIGludGVyYWN0YWJsZSBjb250ZXh0IHdoZW4gYSBET00gZXZlbnRcbiAgICAvLyBsaXN0ZW5lciBpcyBhZGRlZCB0byBhIHNlbGVjdG9yIGludGVyYWN0YWJsZVxuICAgIGZ1bmN0aW9uIGRlbGVnYXRlTGlzdGVuZXIgKGV2ZW50LCB1c2VDYXB0dXJlKSB7XG4gICAgICAgIHZhciBmYWtlRXZlbnQgPSB7fSxcbiAgICAgICAgICAgIGRlbGVnYXRlZCA9IGRlbGVnYXRlZEV2ZW50c1tldmVudC50eXBlXSxcbiAgICAgICAgICAgIGV2ZW50VGFyZ2V0ID0gZ2V0QWN0dWFsRWxlbWVudChldmVudC5wYXRoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBldmVudC5wYXRoWzBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBldmVudC50YXJnZXQpLFxuICAgICAgICAgICAgZWxlbWVudCA9IGV2ZW50VGFyZ2V0O1xuXG4gICAgICAgIHVzZUNhcHR1cmUgPSB1c2VDYXB0dXJlPyB0cnVlOiBmYWxzZTtcblxuICAgICAgICAvLyBkdXBsaWNhdGUgdGhlIGV2ZW50IHNvIHRoYXQgY3VycmVudFRhcmdldCBjYW4gYmUgY2hhbmdlZFxuICAgICAgICBmb3IgKHZhciBwcm9wIGluIGV2ZW50KSB7XG4gICAgICAgICAgICBmYWtlRXZlbnRbcHJvcF0gPSBldmVudFtwcm9wXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZha2VFdmVudC5vcmlnaW5hbEV2ZW50ID0gZXZlbnQ7XG4gICAgICAgIGZha2VFdmVudC5wcmV2ZW50RGVmYXVsdCA9IHByZXZlbnRPcmlnaW5hbERlZmF1bHQ7XG5cbiAgICAgICAgLy8gY2xpbWIgdXAgZG9jdW1lbnQgdHJlZSBsb29raW5nIGZvciBzZWxlY3RvciBtYXRjaGVzXG4gICAgICAgIHdoaWxlIChpc0VsZW1lbnQoZWxlbWVudCkpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVsZWdhdGVkLnNlbGVjdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBzZWxlY3RvciA9IGRlbGVnYXRlZC5zZWxlY3RvcnNbaV0sXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQgPSBkZWxlZ2F0ZWQuY29udGV4dHNbaV07XG5cbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlc1NlbGVjdG9yKGVsZW1lbnQsIHNlbGVjdG9yKVxuICAgICAgICAgICAgICAgICAgICAmJiBub2RlQ29udGFpbnMoY29udGV4dCwgZXZlbnRUYXJnZXQpXG4gICAgICAgICAgICAgICAgICAgICYmIG5vZGVDb250YWlucyhjb250ZXh0LCBlbGVtZW50KSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSBkZWxlZ2F0ZWQubGlzdGVuZXJzW2ldO1xuXG4gICAgICAgICAgICAgICAgICAgIGZha2VFdmVudC5jdXJyZW50VGFyZ2V0ID0gZWxlbWVudDtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGxpc3RlbmVycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyc1tqXVsxXSA9PT0gdXNlQ2FwdHVyZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyc1tqXVswXShmYWtlRXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbGVtZW50ID0gcGFyZW50RWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlbGVnYXRlVXNlQ2FwdHVyZSAoZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIGRlbGVnYXRlTGlzdGVuZXIuY2FsbCh0aGlzLCBldmVudCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaW50ZXJhY3RhYmxlcy5pbmRleE9mRWxlbWVudCA9IGZ1bmN0aW9uIGluZGV4T2ZFbGVtZW50IChlbGVtZW50LCBjb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGludGVyYWN0YWJsZSA9IHRoaXNbaV07XG5cbiAgICAgICAgICAgIGlmICgoaW50ZXJhY3RhYmxlLnNlbGVjdG9yID09PSBlbGVtZW50XG4gICAgICAgICAgICAgICAgJiYgKGludGVyYWN0YWJsZS5fY29udGV4dCA9PT0gY29udGV4dCkpXG4gICAgICAgICAgICAgICAgfHwgKCFpbnRlcmFjdGFibGUuc2VsZWN0b3IgJiYgaW50ZXJhY3RhYmxlLl9lbGVtZW50ID09PSBlbGVtZW50KSkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH07XG5cbiAgICBpbnRlcmFjdGFibGVzLmdldCA9IGZ1bmN0aW9uIGludGVyYWN0YWJsZUdldCAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpc1t0aGlzLmluZGV4T2ZFbGVtZW50KGVsZW1lbnQsIG9wdGlvbnMgJiYgb3B0aW9ucy5jb250ZXh0KV07XG4gICAgfTtcblxuICAgIGludGVyYWN0YWJsZXMuZm9yRWFjaFNlbGVjdG9yID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGludGVyYWN0YWJsZSA9IHRoaXNbaV07XG5cbiAgICAgICAgICAgIGlmICghaW50ZXJhY3RhYmxlLnNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciByZXQgPSBjYWxsYmFjayhpbnRlcmFjdGFibGUsIGludGVyYWN0YWJsZS5zZWxlY3RvciwgaW50ZXJhY3RhYmxlLl9jb250ZXh0LCBpLCB0aGlzKTtcblxuICAgICAgICAgICAgaWYgKHJldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKlxcXG4gICAgICogaW50ZXJhY3RcbiAgICAgWyBtZXRob2QgXVxuICAgICAqXG4gICAgICogVGhlIG1ldGhvZHMgb2YgdGhpcyB2YXJpYWJsZSBjYW4gYmUgdXNlZCB0byBzZXQgZWxlbWVudHMgYXNcbiAgICAgKiBpbnRlcmFjdGFibGVzIGFuZCBhbHNvIHRvIGNoYW5nZSB2YXJpb3VzIGRlZmF1bHQgc2V0dGluZ3MuXG4gICAgICpcbiAgICAgKiBDYWxsaW5nIGl0IGFzIGEgZnVuY3Rpb24gYW5kIHBhc3NpbmcgYW4gZWxlbWVudCBvciBhIHZhbGlkIENTUyBzZWxlY3RvclxuICAgICAqIHN0cmluZyByZXR1cm5zIGFuIEludGVyYWN0YWJsZSBvYmplY3Qgd2hpY2ggaGFzIHZhcmlvdXMgbWV0aG9kcyB0b1xuICAgICAqIGNvbmZpZ3VyZSBpdC5cbiAgICAgKlxuICAgICAtIGVsZW1lbnQgKEVsZW1lbnQgfCBzdHJpbmcpIFRoZSBIVE1MIG9yIFNWRyBFbGVtZW50IHRvIGludGVyYWN0IHdpdGggb3IgQ1NTIHNlbGVjdG9yXG4gICAgID0gKG9iamVjdCkgQW4gQEludGVyYWN0YWJsZVxuICAgICAqXG4gICAgID4gVXNhZ2VcbiAgICAgfCBpbnRlcmFjdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHJhZ2dhYmxlJykpLmRyYWdnYWJsZSh0cnVlKTtcbiAgICAgfFxuICAgICB8IHZhciByZWN0YWJsZXMgPSBpbnRlcmFjdCgncmVjdCcpO1xuICAgICB8IHJlY3RhYmxlc1xuICAgICB8ICAgICAuZ2VzdHVyYWJsZSh0cnVlKVxuICAgICB8ICAgICAub24oJ2dlc3R1cmVtb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgIHwgICAgICAgICAvLyBzb21ldGhpbmcgY29vbC4uLlxuICAgICB8ICAgICB9KVxuICAgICB8ICAgICAuYXV0b1Njcm9sbCh0cnVlKTtcbiAgICBcXCovXG4gICAgZnVuY3Rpb24gaW50ZXJhY3QgKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGludGVyYWN0YWJsZXMuZ2V0KGVsZW1lbnQsIG9wdGlvbnMpIHx8IG5ldyBJbnRlcmFjdGFibGUoZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLypcXFxuICAgICAqIEludGVyYWN0YWJsZVxuICAgICBbIHByb3BlcnR5IF1cbiAgICAgKipcbiAgICAgKiBPYmplY3QgdHlwZSByZXR1cm5lZCBieSBAaW50ZXJhY3RcbiAgICBcXCovXG4gICAgZnVuY3Rpb24gSW50ZXJhY3RhYmxlIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9pRXZlbnRzID0gdGhpcy5faUV2ZW50cyB8fCB7fTtcblxuICAgICAgICB2YXIgX3dpbmRvdztcblxuICAgICAgICBpZiAodHJ5U2VsZWN0b3IoZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0b3IgPSBlbGVtZW50O1xuXG4gICAgICAgICAgICB2YXIgY29udGV4dCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5jb250ZXh0O1xuXG4gICAgICAgICAgICBfd2luZG93ID0gY29udGV4dD8gZ2V0V2luZG93KGNvbnRleHQpIDogd2luZG93O1xuXG4gICAgICAgICAgICBpZiAoY29udGV4dCAmJiAoX3dpbmRvdy5Ob2RlXG4gICAgICAgICAgICAgICAgICAgID8gY29udGV4dCBpbnN0YW5jZW9mIF93aW5kb3cuTm9kZVxuICAgICAgICAgICAgICAgICAgICA6IChpc0VsZW1lbnQoY29udGV4dCkgfHwgY29udGV4dCA9PT0gX3dpbmRvdy5kb2N1bWVudCkpKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIF93aW5kb3cgPSBnZXRXaW5kb3coZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGlmIChpc0VsZW1lbnQoZWxlbWVudCwgX3dpbmRvdykpIHtcblxuICAgICAgICAgICAgICAgIGlmIChzdXBwb3J0c1BvaW50ZXJFdmVudCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudHMuYWRkKHRoaXMuX2VsZW1lbnQsIHBFdmVudFR5cGVzLmRvd24sIGxpc3RlbmVycy5wb2ludGVyRG93biApO1xuICAgICAgICAgICAgICAgICAgICBldmVudHMuYWRkKHRoaXMuX2VsZW1lbnQsIHBFdmVudFR5cGVzLm1vdmUsIGxpc3RlbmVycy5wb2ludGVySG92ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzLmFkZCh0aGlzLl9lbGVtZW50LCAnbW91c2Vkb3duJyAsIGxpc3RlbmVycy5wb2ludGVyRG93biApO1xuICAgICAgICAgICAgICAgICAgICBldmVudHMuYWRkKHRoaXMuX2VsZW1lbnQsICdtb3VzZW1vdmUnICwgbGlzdGVuZXJzLnBvaW50ZXJIb3Zlcik7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50cy5hZGQodGhpcy5fZWxlbWVudCwgJ3RvdWNoc3RhcnQnLCBsaXN0ZW5lcnMucG9pbnRlckRvd24gKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzLmFkZCh0aGlzLl9lbGVtZW50LCAndG91Y2htb3ZlJyAsIGxpc3RlbmVycy5wb2ludGVySG92ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2RvYyA9IF93aW5kb3cuZG9jdW1lbnQ7XG5cbiAgICAgICAgaWYgKCFjb250YWlucyhkb2N1bWVudHMsIHRoaXMuX2RvYykpIHtcbiAgICAgICAgICAgIGxpc3RlblRvRG9jdW1lbnQodGhpcy5fZG9jKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGludGVyYWN0YWJsZXMucHVzaCh0aGlzKTtcblxuICAgICAgICB0aGlzLnNldChvcHRpb25zKTtcbiAgICB9XG5cbiAgICBJbnRlcmFjdGFibGUucHJvdG90eXBlID0ge1xuICAgICAgICBzZXRPbkV2ZW50czogZnVuY3Rpb24gKGFjdGlvbiwgcGhhc2VzKSB7XG4gICAgICAgICAgICBpZiAoYWN0aW9uID09PSAnZHJvcCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihwaGFzZXMub25kcm9wKSAgICAgICAgICApIHsgdGhpcy5vbmRyb3AgICAgICAgICAgID0gcGhhc2VzLm9uZHJvcCAgICAgICAgICA7IH1cbiAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihwaGFzZXMub25kcm9wYWN0aXZhdGUpICApIHsgdGhpcy5vbmRyb3BhY3RpdmF0ZSAgID0gcGhhc2VzLm9uZHJvcGFjdGl2YXRlICA7IH1cbiAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihwaGFzZXMub25kcm9wZGVhY3RpdmF0ZSkpIHsgdGhpcy5vbmRyb3BkZWFjdGl2YXRlID0gcGhhc2VzLm9uZHJvcGRlYWN0aXZhdGU7IH1cbiAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihwaGFzZXMub25kcmFnZW50ZXIpICAgICApIHsgdGhpcy5vbmRyYWdlbnRlciAgICAgID0gcGhhc2VzLm9uZHJhZ2VudGVyICAgICA7IH1cbiAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihwaGFzZXMub25kcmFnbGVhdmUpICAgICApIHsgdGhpcy5vbmRyYWdsZWF2ZSAgICAgID0gcGhhc2VzLm9uZHJhZ2xlYXZlICAgICA7IH1cbiAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihwaGFzZXMub25kcm9wbW92ZSkgICAgICApIHsgdGhpcy5vbmRyb3Btb3ZlICAgICAgID0gcGhhc2VzLm9uZHJvcG1vdmUgICAgICA7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFjdGlvbiA9ICdvbicgKyBhY3Rpb247XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihwaGFzZXMub25zdGFydCkgICAgICAgKSB7IHRoaXNbYWN0aW9uICsgJ3N0YXJ0JyAgICAgICAgIF0gPSBwaGFzZXMub25zdGFydCAgICAgICAgIDsgfVxuICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHBoYXNlcy5vbm1vdmUpICAgICAgICApIHsgdGhpc1thY3Rpb24gKyAnbW92ZScgICAgICAgICAgXSA9IHBoYXNlcy5vbm1vdmUgICAgICAgICAgOyB9XG4gICAgICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24ocGhhc2VzLm9uZW5kKSAgICAgICAgICkgeyB0aGlzW2FjdGlvbiArICdlbmQnICAgICAgICAgICBdID0gcGhhc2VzLm9uZW5kICAgICAgICAgICA7IH1cbiAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihwaGFzZXMub25pbmVydGlhc3RhcnQpKSB7IHRoaXNbYWN0aW9uICsgJ2luZXJ0aWFzdGFydCcgIF0gPSBwaGFzZXMub25pbmVydGlhc3RhcnQgIDsgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKlxcXG4gICAgICAgICAqIEludGVyYWN0YWJsZS5kcmFnZ2FibGVcbiAgICAgICAgIFsgbWV0aG9kIF1cbiAgICAgICAgICpcbiAgICAgICAgICogR2V0cyBvciBzZXRzIHdoZXRoZXIgZHJhZyBhY3Rpb25zIGNhbiBiZSBwZXJmb3JtZWQgb24gdGhlXG4gICAgICAgICAqIEludGVyYWN0YWJsZVxuICAgICAgICAgKlxuICAgICAgICAgPSAoYm9vbGVhbikgSW5kaWNhdGVzIGlmIHRoaXMgY2FuIGJlIHRoZSB0YXJnZXQgb2YgZHJhZyBldmVudHNcbiAgICAgICAgIHwgdmFyIGlzRHJhZ2dhYmxlID0gaW50ZXJhY3QoJ3VsIGxpJykuZHJhZ2dhYmxlKCk7XG4gICAgICAgICAqIG9yXG4gICAgICAgICAtIG9wdGlvbnMgKGJvb2xlYW4gfCBvYmplY3QpICNvcHRpb25hbCB0cnVlL2ZhbHNlIG9yIEFuIG9iamVjdCB3aXRoIGV2ZW50IGxpc3RlbmVycyB0byBiZSBmaXJlZCBvbiBkcmFnIGV2ZW50cyAob2JqZWN0IG1ha2VzIHRoZSBJbnRlcmFjdGFibGUgZHJhZ2dhYmxlKVxuICAgICAgICAgPSAob2JqZWN0KSBUaGlzIEludGVyYWN0YWJsZVxuICAgICAgICAgfCBpbnRlcmFjdChlbGVtZW50KS5kcmFnZ2FibGUoe1xuICAgICAgICAgfCAgICAgb25zdGFydDogZnVuY3Rpb24gKGV2ZW50KSB7fSxcbiAgICAgICAgIHwgICAgIG9ubW92ZSA6IGZ1bmN0aW9uIChldmVudCkge30sXG4gICAgICAgICB8ICAgICBvbmVuZCAgOiBmdW5jdGlvbiAoZXZlbnQpIHt9LFxuICAgICAgICAgfFxuICAgICAgICAgfCAgICAgLy8gdGhlIGF4aXMgaW4gd2hpY2ggdGhlIGZpcnN0IG1vdmVtZW50IG11c3QgYmVcbiAgICAgICAgIHwgICAgIC8vIGZvciB0aGUgZHJhZyBzZXF1ZW5jZSB0byBzdGFydFxuICAgICAgICAgfCAgICAgLy8gJ3h5JyBieSBkZWZhdWx0IC0gYW55IGRpcmVjdGlvblxuICAgICAgICAgfCAgICAgYXhpczogJ3gnIHx8ICd5JyB8fCAneHknLFxuICAgICAgICAgfFxuICAgICAgICAgfCAgICAgLy8gbWF4IG51bWJlciBvZiBkcmFncyB0aGF0IGNhbiBoYXBwZW4gY29uY3VycmVudGx5XG4gICAgICAgICB8ICAgICAvLyB3aXRoIGVsZW1lbnRzIG9mIHRoaXMgSW50ZXJhY3RhYmxlLiBJbmZpbml0eSBieSBkZWZhdWx0XG4gICAgICAgICB8ICAgICBtYXg6IEluZmluaXR5LFxuICAgICAgICAgfFxuICAgICAgICAgfCAgICAgLy8gbWF4IG51bWJlciBvZiBkcmFncyB0aGF0IGNhbiB0YXJnZXQgdGhlIHNhbWUgZWxlbWVudCtJbnRlcmFjdGFibGVcbiAgICAgICAgIHwgICAgIC8vIDEgYnkgZGVmYXVsdFxuICAgICAgICAgfCAgICAgbWF4UGVyRWxlbWVudDogMlxuICAgICAgICAgfCB9KTtcbiAgICAgICAgXFwqL1xuICAgICAgICBkcmFnZ2FibGU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuZHJhZy5lbmFibGVkID0gb3B0aW9ucy5lbmFibGVkID09PSBmYWxzZT8gZmFsc2U6IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQZXJBY3Rpb24oJ2RyYWcnLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldE9uRXZlbnRzKCdkcmFnJywgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoL154JHxeeSR8Xnh5JC8udGVzdChvcHRpb25zLmF4aXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5kcmFnLmF4aXMgPSBvcHRpb25zLmF4aXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9wdGlvbnMuYXhpcyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5vcHRpb25zLmRyYWcuYXhpcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzQm9vbChvcHRpb25zKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5kcmFnLmVuYWJsZWQgPSBvcHRpb25zO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZHJhZztcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRQZXJBY3Rpb246IGZ1bmN0aW9uIChhY3Rpb24sIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIC8vIGZvciBhbGwgdGhlIGRlZmF1bHQgcGVyLWFjdGlvbiBvcHRpb25zXG4gICAgICAgICAgICBmb3IgKHZhciBvcHRpb24gaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoaXMgb3B0aW9uIGV4aXN0cyBmb3IgdGhpcyBhY3Rpb25cbiAgICAgICAgICAgICAgICBpZiAob3B0aW9uIGluIGRlZmF1bHRPcHRpb25zW2FjdGlvbl0pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIG9wdGlvbiBpbiB0aGUgb3B0aW9ucyBhcmcgaXMgYW4gb2JqZWN0IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc09iamVjdChvcHRpb25zW29wdGlvbl0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkdXBsaWNhdGUgdGhlIG9iamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zW2FjdGlvbl1bb3B0aW9uXSA9IGV4dGVuZCh0aGlzLm9wdGlvbnNbYWN0aW9uXVtvcHRpb25dIHx8IHt9LCBvcHRpb25zW29wdGlvbl0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNPYmplY3QoZGVmYXVsdE9wdGlvbnMucGVyQWN0aW9uW29wdGlvbl0pICYmICdlbmFibGVkJyBpbiBkZWZhdWx0T3B0aW9ucy5wZXJBY3Rpb25bb3B0aW9uXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1thY3Rpb25dW29wdGlvbl0uZW5hYmxlZCA9IG9wdGlvbnNbb3B0aW9uXS5lbmFibGVkID09PSBmYWxzZT8gZmFsc2UgOiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzQm9vbChvcHRpb25zW29wdGlvbl0pICYmIGlzT2JqZWN0KGRlZmF1bHRPcHRpb25zLnBlckFjdGlvbltvcHRpb25dKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zW2FjdGlvbl1bb3B0aW9uXS5lbmFibGVkID0gb3B0aW9uc1tvcHRpb25dO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9wdGlvbnNbb3B0aW9uXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvciBpZiBpdCdzIG5vdCB1bmRlZmluZWQsIGRvIGEgcGxhaW4gYXNzaWdubWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zW2FjdGlvbl1bb3B0aW9uXSA9IG9wdGlvbnNbb3B0aW9uXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKlxcXG4gICAgICAgICAqIEludGVyYWN0YWJsZS5kcm9wem9uZVxuICAgICAgICAgWyBtZXRob2QgXVxuICAgICAgICAgKlxuICAgICAgICAgKiBSZXR1cm5zIG9yIHNldHMgd2hldGhlciBlbGVtZW50cyBjYW4gYmUgZHJvcHBlZCBvbnRvIHRoaXNcbiAgICAgICAgICogSW50ZXJhY3RhYmxlIHRvIHRyaWdnZXIgZHJvcCBldmVudHNcbiAgICAgICAgICpcbiAgICAgICAgICogRHJvcHpvbmVzIGNhbiByZWNlaXZlIHRoZSBmb2xsb3dpbmcgZXZlbnRzOlxuICAgICAgICAgKiAgLSBgZHJvcGFjdGl2YXRlYCBhbmQgYGRyb3BkZWFjdGl2YXRlYCB3aGVuIGFuIGFjY2VwdGFibGUgZHJhZyBzdGFydHMgYW5kIGVuZHNcbiAgICAgICAgICogIC0gYGRyYWdlbnRlcmAgYW5kIGBkcmFnbGVhdmVgIHdoZW4gYSBkcmFnZ2FibGUgZW50ZXJzIGFuZCBsZWF2ZXMgdGhlIGRyb3B6b25lXG4gICAgICAgICAqICAtIGBkcmFnbW92ZWAgd2hlbiBhIGRyYWdnYWJsZSB0aGF0IGhhcyBlbnRlcmVkIHRoZSBkcm9wem9uZSBpcyBtb3ZlZFxuICAgICAgICAgKiAgLSBgZHJvcGAgd2hlbiBhIGRyYWdnYWJsZSBpcyBkcm9wcGVkIGludG8gdGhpcyBkcm9wem9uZVxuICAgICAgICAgKlxuICAgICAgICAgKiAgVXNlIHRoZSBgYWNjZXB0YCBvcHRpb24gdG8gYWxsb3cgb25seSBlbGVtZW50cyB0aGF0IG1hdGNoIHRoZSBnaXZlbiBDU1Mgc2VsZWN0b3Igb3IgZWxlbWVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogIFVzZSB0aGUgYG92ZXJsYXBgIG9wdGlvbiB0byBzZXQgaG93IGRyb3BzIGFyZSBjaGVja2VkIGZvci4gVGhlIGFsbG93ZWQgdmFsdWVzIGFyZTpcbiAgICAgICAgICogICAtIGAncG9pbnRlcidgLCB0aGUgcG9pbnRlciBtdXN0IGJlIG92ZXIgdGhlIGRyb3B6b25lIChkZWZhdWx0KVxuICAgICAgICAgKiAgIC0gYCdjZW50ZXInYCwgdGhlIGRyYWdnYWJsZSBlbGVtZW50J3MgY2VudGVyIG11c3QgYmUgb3ZlciB0aGUgZHJvcHpvbmVcbiAgICAgICAgICogICAtIGEgbnVtYmVyIGZyb20gMC0xIHdoaWNoIGlzIHRoZSBgKGludGVyc2VjdGlvbiBhcmVhKSAvIChkcmFnZ2FibGUgYXJlYSlgLlxuICAgICAgICAgKiAgICAgICBlLmcuIGAwLjVgIGZvciBkcm9wIHRvIGhhcHBlbiB3aGVuIGhhbGYgb2YgdGhlIGFyZWEgb2YgdGhlXG4gICAgICAgICAqICAgICAgIGRyYWdnYWJsZSBpcyBvdmVyIHRoZSBkcm9wem9uZVxuICAgICAgICAgKlxuICAgICAgICAgLSBvcHRpb25zIChib29sZWFuIHwgb2JqZWN0IHwgbnVsbCkgI29wdGlvbmFsIFRoZSBuZXcgdmFsdWUgdG8gYmUgc2V0LlxuICAgICAgICAgfCBpbnRlcmFjdCgnLmRyb3AnKS5kcm9wem9uZSh7XG4gICAgICAgICB8ICAgYWNjZXB0OiAnLmNhbi1kcm9wJyB8fCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2luZ2xlLWRyb3AnKSxcbiAgICAgICAgIHwgICBvdmVybGFwOiAncG9pbnRlcicgfHwgJ2NlbnRlcicgfHwgemVyb1RvT25lXG4gICAgICAgICB8IH1cbiAgICAgICAgID0gKGJvb2xlYW4gfCBvYmplY3QpIFRoZSBjdXJyZW50IHNldHRpbmcgb3IgdGhpcyBJbnRlcmFjdGFibGVcbiAgICAgICAgXFwqL1xuICAgICAgICBkcm9wem9uZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5kcm9wLmVuYWJsZWQgPSBvcHRpb25zLmVuYWJsZWQgPT09IGZhbHNlPyBmYWxzZTogdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldE9uRXZlbnRzKCdkcm9wJywgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoL14ocG9pbnRlcnxjZW50ZXIpJC8udGVzdChvcHRpb25zLm92ZXJsYXApKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5kcm9wLm92ZXJsYXAgPSBvcHRpb25zLm92ZXJsYXA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzTnVtYmVyKG9wdGlvbnMub3ZlcmxhcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmRyb3Aub3ZlcmxhcCA9IE1hdGgubWF4KE1hdGgubWluKDEsIG9wdGlvbnMub3ZlcmxhcCksIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoJ2FjY2VwdCcgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmRyb3AuYWNjZXB0ID0gb3B0aW9ucy5hY2NlcHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgnY2hlY2tlcicgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmRyb3AuY2hlY2tlciA9IG9wdGlvbnMuY2hlY2tlcjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzQm9vbChvcHRpb25zKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5kcm9wLmVuYWJsZWQgPSBvcHRpb25zO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZHJvcDtcbiAgICAgICAgfSxcblxuICAgICAgICBkcm9wQ2hlY2s6IGZ1bmN0aW9uIChkcmFnRXZlbnQsIGV2ZW50LCBkcmFnZ2FibGUsIGRyYWdnYWJsZUVsZW1lbnQsIGRyb3BFbGVtZW50LCByZWN0KSB7XG4gICAgICAgICAgICB2YXIgZHJvcHBlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBpZiB0aGUgZHJvcHpvbmUgaGFzIG5vIHJlY3QgKGVnLiBkaXNwbGF5OiBub25lKVxuICAgICAgICAgICAgLy8gY2FsbCB0aGUgY3VzdG9tIGRyb3BDaGVja2VyIG9yIGp1c3QgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICBpZiAoIShyZWN0ID0gcmVjdCB8fCB0aGlzLmdldFJlY3QoZHJvcEVsZW1lbnQpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5vcHRpb25zLmRyb3AuY2hlY2tlclxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMub3B0aW9ucy5kcm9wLmNoZWNrZXIoZHJhZ0V2ZW50LCBldmVudCwgZHJvcHBlZCwgdGhpcywgZHJvcEVsZW1lbnQsIGRyYWdnYWJsZSwgZHJhZ2dhYmxlRWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgOiBmYWxzZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkcm9wT3ZlcmxhcCA9IHRoaXMub3B0aW9ucy5kcm9wLm92ZXJsYXA7XG5cbiAgICAgICAgICAgIGlmIChkcm9wT3ZlcmxhcCA9PT0gJ3BvaW50ZXInKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhZ2UgPSBnZXRQYWdlWFkoZHJhZ0V2ZW50KSxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luID0gZ2V0T3JpZ2luWFkoZHJhZ2dhYmxlLCBkcmFnZ2FibGVFbGVtZW50KSxcbiAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbCxcbiAgICAgICAgICAgICAgICAgICAgdmVydGljYWw7XG5cbiAgICAgICAgICAgICAgICBwYWdlLnggKz0gb3JpZ2luLng7XG4gICAgICAgICAgICAgICAgcGFnZS55ICs9IG9yaWdpbi55O1xuXG4gICAgICAgICAgICAgICAgaG9yaXpvbnRhbCA9IChwYWdlLnggPiByZWN0LmxlZnQpICYmIChwYWdlLnggPCByZWN0LnJpZ2h0KTtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbCAgID0gKHBhZ2UueSA+IHJlY3QudG9wICkgJiYgKHBhZ2UueSA8IHJlY3QuYm90dG9tKTtcblxuICAgICAgICAgICAgICAgIGRyb3BwZWQgPSBob3Jpem9udGFsICYmIHZlcnRpY2FsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZHJhZ1JlY3QgPSBkcmFnZ2FibGUuZ2V0UmVjdChkcmFnZ2FibGVFbGVtZW50KTtcblxuICAgICAgICAgICAgaWYgKGRyb3BPdmVybGFwID09PSAnY2VudGVyJykge1xuICAgICAgICAgICAgICAgIHZhciBjeCA9IGRyYWdSZWN0LmxlZnQgKyBkcmFnUmVjdC53aWR0aCAgLyAyLFxuICAgICAgICAgICAgICAgICAgICBjeSA9IGRyYWdSZWN0LnRvcCAgKyBkcmFnUmVjdC5oZWlnaHQgLyAyO1xuXG4gICAgICAgICAgICAgICAgZHJvcHBlZCA9IGN4ID49IHJlY3QubGVmdCAmJiBjeCA8PSByZWN0LnJpZ2h0ICYmIGN5ID49IHJlY3QudG9wICYmIGN5IDw9IHJlY3QuYm90dG9tO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNOdW1iZXIoZHJvcE92ZXJsYXApKSB7XG4gICAgICAgICAgICAgICAgdmFyIG92ZXJsYXBBcmVhICA9IChNYXRoLm1heCgwLCBNYXRoLm1pbihyZWN0LnJpZ2h0ICwgZHJhZ1JlY3QucmlnaHQgKSAtIE1hdGgubWF4KHJlY3QubGVmdCwgZHJhZ1JlY3QubGVmdCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBNYXRoLm1heCgwLCBNYXRoLm1pbihyZWN0LmJvdHRvbSwgZHJhZ1JlY3QuYm90dG9tKSAtIE1hdGgubWF4KHJlY3QudG9wICwgZHJhZ1JlY3QudG9wICkpKSxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxhcFJhdGlvID0gb3ZlcmxhcEFyZWEgLyAoZHJhZ1JlY3Qud2lkdGggKiBkcmFnUmVjdC5oZWlnaHQpO1xuXG4gICAgICAgICAgICAgICAgZHJvcHBlZCA9IG92ZXJsYXBSYXRpbyA+PSBkcm9wT3ZlcmxhcDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kcm9wLmNoZWNrZXIpIHtcbiAgICAgICAgICAgICAgICBkcm9wcGVkID0gdGhpcy5vcHRpb25zLmRyb3AuY2hlY2tlcihkcmFnRXZlbnQsIGV2ZW50LCBkcm9wcGVkLCB0aGlzLCBkcm9wRWxlbWVudCwgZHJhZ2dhYmxlLCBkcmFnZ2FibGVFbGVtZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGRyb3BwZWQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLypcXFxuICAgICAgICAgKiBJbnRlcmFjdGFibGUuZHJvcENoZWNrZXJcbiAgICAgICAgIFsgbWV0aG9kIF1cbiAgICAgICAgICpcbiAgICAgICAgICogREVQUkVDQVRFRC4gVXNlIGludGVyYWN0YWJsZS5kcm9wem9uZSh7IGNoZWNrZXI6IGZ1bmN0aW9uLi4uIH0pIGluc3RlYWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEdldHMgb3Igc2V0cyB0aGUgZnVuY3Rpb24gdXNlZCB0byBjaGVjayBpZiBhIGRyYWdnZWQgZWxlbWVudCBpc1xuICAgICAgICAgKiBvdmVyIHRoaXMgSW50ZXJhY3RhYmxlLlxuICAgICAgICAgKlxuICAgICAgICAgLSBjaGVja2VyIChmdW5jdGlvbikgI29wdGlvbmFsIFRoZSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gY2hlY2tpbmcgZm9yIGEgZHJvcFxuICAgICAgICAgPSAoRnVuY3Rpb24gfCBJbnRlcmFjdGFibGUpIFRoZSBjaGVja2VyIGZ1bmN0aW9uIG9yIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoZSBjaGVja2VyIGZ1bmN0aW9uIHRha2VzIHRoZSBmb2xsb3dpbmcgYXJndW1lbnRzOlxuICAgICAgICAgKlxuICAgICAgICAgLSBkcmFnRXZlbnQgKEludGVyYWN0RXZlbnQpIFRoZSByZWxhdGVkIGRyYWdtb3ZlIG9yIGRyYWdlbmQgZXZlbnRcbiAgICAgICAgIC0gZXZlbnQgKFRvdWNoRXZlbnQgfCBQb2ludGVyRXZlbnQgfCBNb3VzZUV2ZW50KSBUaGUgdXNlciBtb3ZlL3VwL2VuZCBFdmVudCByZWxhdGVkIHRvIHRoZSBkcmFnRXZlbnRcbiAgICAgICAgIC0gZHJvcHBlZCAoYm9vbGVhbikgVGhlIHZhbHVlIGZyb20gdGhlIGRlZmF1bHQgZHJvcCBjaGVja2VyXG4gICAgICAgICAtIGRyb3B6b25lIChJbnRlcmFjdGFibGUpIFRoZSBkcm9wem9uZSBpbnRlcmFjdGFibGVcbiAgICAgICAgIC0gZHJvcEVsZW1lbnQgKEVsZW1lbnQpIFRoZSBkcm9wem9uZSBlbGVtZW50XG4gICAgICAgICAtIGRyYWdnYWJsZSAoSW50ZXJhY3RhYmxlKSBUaGUgSW50ZXJhY3RhYmxlIGJlaW5nIGRyYWdnZWRcbiAgICAgICAgIC0gZHJhZ2dhYmxlRWxlbWVudCAoRWxlbWVudCkgVGhlIGFjdHVhbCBlbGVtZW50IHRoYXQncyBiZWluZyBkcmFnZ2VkXG4gICAgICAgICAqXG4gICAgICAgICA+IFVzYWdlOlxuICAgICAgICAgfCBpbnRlcmFjdCh0YXJnZXQpXG4gICAgICAgICB8IC5kcm9wQ2hlY2tlcihmdW5jdGlvbihkcmFnRXZlbnQsICAgICAgICAgLy8gcmVsYXRlZCBkcmFnbW92ZSBvciBkcmFnZW5kIGV2ZW50XG4gICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICBldmVudCwgICAgICAgICAgICAgLy8gVG91Y2hFdmVudC9Qb2ludGVyRXZlbnQvTW91c2VFdmVudFxuICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgZHJvcHBlZCwgICAgICAgICAgIC8vIGJvb2wgcmVzdWx0IG9mIHRoZSBkZWZhdWx0IGNoZWNrZXJcbiAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgIGRyb3B6b25lLCAgICAgICAgICAvLyBkcm9wem9uZSBJbnRlcmFjdGFibGVcbiAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgIGRyb3BFbGVtZW50LCAgICAgICAvLyBkcm9wem9uZSBlbGVtbnRcbiAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZSwgICAgICAgICAvLyBkcmFnZ2FibGUgSW50ZXJhY3RhYmxlXG4gICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICBkcmFnZ2FibGVFbGVtZW50KSB7Ly8gZHJhZ2dhYmxlIGVsZW1lbnRcbiAgICAgICAgIHxcbiAgICAgICAgIHwgICByZXR1cm4gZHJvcHBlZCAmJiBldmVudC50YXJnZXQuaGFzQXR0cmlidXRlKCdhbGxvdy1kcm9wJyk7XG4gICAgICAgICB8IH1cbiAgICAgICAgXFwqL1xuICAgICAgICBkcm9wQ2hlY2tlcjogZnVuY3Rpb24gKGNoZWNrZXIpIHtcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKGNoZWNrZXIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmRyb3AuY2hlY2tlciA9IGNoZWNrZXI7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaGVja2VyID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMub3B0aW9ucy5nZXRSZWN0O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZHJvcC5jaGVja2VyO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qXFxcbiAgICAgICAgICogSW50ZXJhY3RhYmxlLmFjY2VwdFxuICAgICAgICAgWyBtZXRob2QgXVxuICAgICAgICAgKlxuICAgICAgICAgKiBEZXByZWNhdGVkLiBhZGQgYW4gYGFjY2VwdGAgcHJvcGVydHkgdG8gdGhlIG9wdGlvbnMgb2JqZWN0IHBhc3NlZCB0b1xuICAgICAgICAgKiBASW50ZXJhY3RhYmxlLmRyb3B6b25lIGluc3RlYWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEdldHMgb3Igc2V0cyB0aGUgRWxlbWVudCBvciBDU1Mgc2VsZWN0b3IgbWF0Y2ggdGhhdCB0aGlzXG4gICAgICAgICAqIEludGVyYWN0YWJsZSBhY2NlcHRzIGlmIGl0IGlzIGEgZHJvcHpvbmUuXG4gICAgICAgICAqXG4gICAgICAgICAtIG5ld1ZhbHVlIChFbGVtZW50IHwgc3RyaW5nIHwgbnVsbCkgI29wdGlvbmFsXG4gICAgICAgICAqIElmIGl0IGlzIGFuIEVsZW1lbnQsIHRoZW4gb25seSB0aGF0IGVsZW1lbnQgY2FuIGJlIGRyb3BwZWQgaW50byB0aGlzIGRyb3B6b25lLlxuICAgICAgICAgKiBJZiBpdCBpcyBhIHN0cmluZywgdGhlIGVsZW1lbnQgYmVpbmcgZHJhZ2dlZCBtdXN0IG1hdGNoIGl0IGFzIGEgc2VsZWN0b3IuXG4gICAgICAgICAqIElmIGl0IGlzIG51bGwsIHRoZSBhY2NlcHQgb3B0aW9ucyBpcyBjbGVhcmVkIC0gaXQgYWNjZXB0cyBhbnkgZWxlbWVudC5cbiAgICAgICAgICpcbiAgICAgICAgID0gKHN0cmluZyB8IEVsZW1lbnQgfCBudWxsIHwgSW50ZXJhY3RhYmxlKSBUaGUgY3VycmVudCBhY2NlcHQgb3B0aW9uIGlmIGdpdmVuIGB1bmRlZmluZWRgIG9yIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAgICAgIFxcKi9cbiAgICAgICAgYWNjZXB0OiBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChpc0VsZW1lbnQobmV3VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmRyb3AuYWNjZXB0ID0gbmV3VmFsdWU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gdGVzdCBpZiBpdCBpcyBhIHZhbGlkIENTUyBzZWxlY3RvclxuICAgICAgICAgICAgaWYgKHRyeVNlbGVjdG9yKG5ld1ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5kcm9wLmFjY2VwdCA9IG5ld1ZhbHVlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm9wdGlvbnMuZHJvcC5hY2NlcHQ7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5kcm9wLmFjY2VwdDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKlxcXG4gICAgICAgICAqIEludGVyYWN0YWJsZS5yZXNpemFibGVcbiAgICAgICAgIFsgbWV0aG9kIF1cbiAgICAgICAgICpcbiAgICAgICAgICogR2V0cyBvciBzZXRzIHdoZXRoZXIgcmVzaXplIGFjdGlvbnMgY2FuIGJlIHBlcmZvcm1lZCBvbiB0aGVcbiAgICAgICAgICogSW50ZXJhY3RhYmxlXG4gICAgICAgICAqXG4gICAgICAgICA9IChib29sZWFuKSBJbmRpY2F0ZXMgaWYgdGhpcyBjYW4gYmUgdGhlIHRhcmdldCBvZiByZXNpemUgZWxlbWVudHNcbiAgICAgICAgIHwgdmFyIGlzUmVzaXplYWJsZSA9IGludGVyYWN0KCdpbnB1dFt0eXBlPXRleHRdJykucmVzaXphYmxlKCk7XG4gICAgICAgICAqIG9yXG4gICAgICAgICAtIG9wdGlvbnMgKGJvb2xlYW4gfCBvYmplY3QpICNvcHRpb25hbCB0cnVlL2ZhbHNlIG9yIEFuIG9iamVjdCB3aXRoIGV2ZW50IGxpc3RlbmVycyB0byBiZSBmaXJlZCBvbiByZXNpemUgZXZlbnRzIChvYmplY3QgbWFrZXMgdGhlIEludGVyYWN0YWJsZSByZXNpemFibGUpXG4gICAgICAgICA9IChvYmplY3QpIFRoaXMgSW50ZXJhY3RhYmxlXG4gICAgICAgICB8IGludGVyYWN0KGVsZW1lbnQpLnJlc2l6YWJsZSh7XG4gICAgICAgICB8ICAgICBvbnN0YXJ0OiBmdW5jdGlvbiAoZXZlbnQpIHt9LFxuICAgICAgICAgfCAgICAgb25tb3ZlIDogZnVuY3Rpb24gKGV2ZW50KSB7fSxcbiAgICAgICAgIHwgICAgIG9uZW5kICA6IGZ1bmN0aW9uIChldmVudCkge30sXG4gICAgICAgICB8XG4gICAgICAgICB8ICAgICBlZGdlczoge1xuICAgICAgICAgfCAgICAgICB0b3AgICA6IHRydWUsICAgICAgIC8vIFVzZSBwb2ludGVyIGNvb3JkcyB0byBjaGVjayBmb3IgcmVzaXplLlxuICAgICAgICAgfCAgICAgICBsZWZ0ICA6IGZhbHNlLCAgICAgIC8vIERpc2FibGUgcmVzaXppbmcgZnJvbSBsZWZ0IGVkZ2UuXG4gICAgICAgICB8ICAgICAgIGJvdHRvbTogJy5yZXNpemUtcycsLy8gUmVzaXplIGlmIHBvaW50ZXIgdGFyZ2V0IG1hdGNoZXMgc2VsZWN0b3JcbiAgICAgICAgIHwgICAgICAgcmlnaHQgOiBoYW5kbGVFbCAgICAvLyBSZXNpemUgaWYgcG9pbnRlciB0YXJnZXQgaXMgdGhlIGdpdmVuIEVsZW1lbnRcbiAgICAgICAgIHwgICAgIH0sXG4gICAgICAgICB8XG4gICAgICAgICB8ICAgICAvLyBXaWR0aCBhbmQgaGVpZ2h0IGNhbiBiZSBhZGp1c3RlZCBpbmRlcGVuZGVudGx5LiBXaGVuIGB0cnVlYCwgd2lkdGggYW5kXG4gICAgICAgICB8ICAgICAvLyBoZWlnaHQgYXJlIGFkanVzdGVkIGF0IGEgMToxIHJhdGlvLlxuICAgICAgICAgfCAgICAgc3F1YXJlOiBmYWxzZSxcbiAgICAgICAgIHxcbiAgICAgICAgIHwgICAgIC8vIFdpZHRoIGFuZCBoZWlnaHQgY2FuIGJlIGFkanVzdGVkIGluZGVwZW5kZW50bHkuIFdoZW4gYHRydWVgLCB3aWR0aCBhbmRcbiAgICAgICAgIHwgICAgIC8vIGhlaWdodCBtYWludGFpbiB0aGUgYXNwZWN0IHJhdGlvIHRoZXkgaGFkIHdoZW4gcmVzaXppbmcgc3RhcnRlZC5cbiAgICAgICAgIHwgICAgIHByZXNlcnZlQXNwZWN0UmF0aW86IGZhbHNlLFxuICAgICAgICAgfFxuICAgICAgICAgfCAgICAgLy8gYSB2YWx1ZSBvZiAnbm9uZScgd2lsbCBsaW1pdCB0aGUgcmVzaXplIHJlY3QgdG8gYSBtaW5pbXVtIG9mIDB4MFxuICAgICAgICAgfCAgICAgLy8gJ25lZ2F0ZScgd2lsbCBhbGxvdyB0aGUgcmVjdCB0byBoYXZlIG5lZ2F0aXZlIHdpZHRoL2hlaWdodFxuICAgICAgICAgfCAgICAgLy8gJ3JlcG9zaXRpb24nIHdpbGwga2VlcCB0aGUgd2lkdGgvaGVpZ2h0IHBvc2l0aXZlIGJ5IHN3YXBwaW5nXG4gICAgICAgICB8ICAgICAvLyB0aGUgdG9wIGFuZCBib3R0b20gZWRnZXMgYW5kL29yIHN3YXBwaW5nIHRoZSBsZWZ0IGFuZCByaWdodCBlZGdlc1xuICAgICAgICAgfCAgICAgaW52ZXJ0OiAnbm9uZScgfHwgJ25lZ2F0ZScgfHwgJ3JlcG9zaXRpb24nXG4gICAgICAgICB8XG4gICAgICAgICB8ICAgICAvLyBsaW1pdCBtdWx0aXBsZSByZXNpemVzLlxuICAgICAgICAgfCAgICAgLy8gU2VlIHRoZSBleHBsYW5hdGlvbiBpbiB0aGUgQEludGVyYWN0YWJsZS5kcmFnZ2FibGUgZXhhbXBsZVxuICAgICAgICAgfCAgICAgbWF4OiBJbmZpbml0eSxcbiAgICAgICAgIHwgICAgIG1heFBlckVsZW1lbnQ6IDEsXG4gICAgICAgICB8IH0pO1xuICAgICAgICBcXCovXG4gICAgICAgIHJlc2l6YWJsZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5yZXNpemUuZW5hYmxlZCA9IG9wdGlvbnMuZW5hYmxlZCA9PT0gZmFsc2U/IGZhbHNlOiB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVyQWN0aW9uKCdyZXNpemUnLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldE9uRXZlbnRzKCdyZXNpemUnLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgICAgIGlmICgvXngkfF55JHxeeHkkLy50ZXN0KG9wdGlvbnMuYXhpcykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnJlc2l6ZS5heGlzID0gb3B0aW9ucy5heGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChvcHRpb25zLmF4aXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnJlc2l6ZS5heGlzID0gZGVmYXVsdE9wdGlvbnMucmVzaXplLmF4aXM7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGlzQm9vbChvcHRpb25zLnByZXNlcnZlQXNwZWN0UmF0aW8pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5yZXNpemUucHJlc2VydmVBc3BlY3RSYXRpbyA9IG9wdGlvbnMucHJlc2VydmVBc3BlY3RSYXRpbztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNCb29sKG9wdGlvbnMuc3F1YXJlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMucmVzaXplLnNxdWFyZSA9IG9wdGlvbnMuc3F1YXJlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzQm9vbChvcHRpb25zKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5yZXNpemUuZW5hYmxlZCA9IG9wdGlvbnM7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMucmVzaXplO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qXFxcbiAgICAgICAgICogSW50ZXJhY3RhYmxlLnNxdWFyZVJlc2l6ZVxuICAgICAgICAgWyBtZXRob2QgXVxuICAgICAgICAgKlxuICAgICAgICAgKiBEZXByZWNhdGVkLiBBZGQgYSBgc3F1YXJlOiB0cnVlIHx8IGZhbHNlYCBwcm9wZXJ0eSB0byBASW50ZXJhY3RhYmxlLnJlc2l6YWJsZSBpbnN0ZWFkXG4gICAgICAgICAqXG4gICAgICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHJlc2l6aW5nIGlzIGZvcmNlZCAxOjEgYXNwZWN0XG4gICAgICAgICAqXG4gICAgICAgICA9IChib29sZWFuKSBDdXJyZW50IHNldHRpbmdcbiAgICAgICAgICpcbiAgICAgICAgICogb3JcbiAgICAgICAgICpcbiAgICAgICAgIC0gbmV3VmFsdWUgKGJvb2xlYW4pICNvcHRpb25hbFxuICAgICAgICAgPSAob2JqZWN0KSB0aGlzIEludGVyYWN0YWJsZVxuICAgICAgICBcXCovXG4gICAgICAgIHNxdWFyZVJlc2l6ZTogZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoaXNCb29sKG5ld1ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5yZXNpemUuc3F1YXJlID0gbmV3VmFsdWU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMub3B0aW9ucy5yZXNpemUuc3F1YXJlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMucmVzaXplLnNxdWFyZTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKlxcXG4gICAgICAgICAqIEludGVyYWN0YWJsZS5nZXN0dXJhYmxlXG4gICAgICAgICBbIG1ldGhvZCBdXG4gICAgICAgICAqXG4gICAgICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIG11bHRpdG91Y2ggZ2VzdHVyZXMgY2FuIGJlIHBlcmZvcm1lZCBvbiB0aGVcbiAgICAgICAgICogSW50ZXJhY3RhYmxlJ3MgZWxlbWVudFxuICAgICAgICAgKlxuICAgICAgICAgPSAoYm9vbGVhbikgSW5kaWNhdGVzIGlmIHRoaXMgY2FuIGJlIHRoZSB0YXJnZXQgb2YgZ2VzdHVyZSBldmVudHNcbiAgICAgICAgIHwgdmFyIGlzR2VzdHVyZWFibGUgPSBpbnRlcmFjdChlbGVtZW50KS5nZXN0dXJhYmxlKCk7XG4gICAgICAgICAqIG9yXG4gICAgICAgICAtIG9wdGlvbnMgKGJvb2xlYW4gfCBvYmplY3QpICNvcHRpb25hbCB0cnVlL2ZhbHNlIG9yIEFuIG9iamVjdCB3aXRoIGV2ZW50IGxpc3RlbmVycyB0byBiZSBmaXJlZCBvbiBnZXN0dXJlIGV2ZW50cyAobWFrZXMgdGhlIEludGVyYWN0YWJsZSBnZXN0dXJhYmxlKVxuICAgICAgICAgPSAob2JqZWN0KSB0aGlzIEludGVyYWN0YWJsZVxuICAgICAgICAgfCBpbnRlcmFjdChlbGVtZW50KS5nZXN0dXJhYmxlKHtcbiAgICAgICAgIHwgICAgIG9uc3RhcnQ6IGZ1bmN0aW9uIChldmVudCkge30sXG4gICAgICAgICB8ICAgICBvbm1vdmUgOiBmdW5jdGlvbiAoZXZlbnQpIHt9LFxuICAgICAgICAgfCAgICAgb25lbmQgIDogZnVuY3Rpb24gKGV2ZW50KSB7fSxcbiAgICAgICAgIHxcbiAgICAgICAgIHwgICAgIC8vIGxpbWl0IG11bHRpcGxlIGdlc3R1cmVzLlxuICAgICAgICAgfCAgICAgLy8gU2VlIHRoZSBleHBsYW5hdGlvbiBpbiBASW50ZXJhY3RhYmxlLmRyYWdnYWJsZSBleGFtcGxlXG4gICAgICAgICB8ICAgICBtYXg6IEluZmluaXR5LFxuICAgICAgICAgfCAgICAgbWF4UGVyRWxlbWVudDogMSxcbiAgICAgICAgIHwgfSk7XG4gICAgICAgIFxcKi9cbiAgICAgICAgZ2VzdHVyYWJsZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5nZXN0dXJlLmVuYWJsZWQgPSBvcHRpb25zLmVuYWJsZWQgPT09IGZhbHNlPyBmYWxzZTogdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBlckFjdGlvbignZ2VzdHVyZScsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0T25FdmVudHMoJ2dlc3R1cmUnLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNCb29sKG9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmdlc3R1cmUuZW5hYmxlZCA9IG9wdGlvbnM7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5nZXN0dXJlO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qXFxcbiAgICAgICAgICogSW50ZXJhY3RhYmxlLmF1dG9TY3JvbGxcbiAgICAgICAgIFsgbWV0aG9kIF1cbiAgICAgICAgICoqXG4gICAgICAgICAqIERlcHJlY2F0ZWQuIEFkZCBhbiBgYXV0b3Njcm9sbGAgcHJvcGVydHkgdG8gdGhlIG9wdGlvbnMgb2JqZWN0XG4gICAgICAgICAqIHBhc3NlZCB0byBASW50ZXJhY3RhYmxlLmRyYWdnYWJsZSBvciBASW50ZXJhY3RhYmxlLnJlc2l6YWJsZSBpbnN0ZWFkLlxuICAgICAgICAgKlxuICAgICAgICAgKiBSZXR1cm5zIG9yIHNldHMgd2hldGhlciBkcmFnZ2luZyBhbmQgcmVzaXppbmcgbmVhciB0aGUgZWRnZXMgb2YgdGhlXG4gICAgICAgICAqIHdpbmRvdy9jb250YWluZXIgdHJpZ2dlciBhdXRvU2Nyb2xsIGZvciB0aGlzIEludGVyYWN0YWJsZVxuICAgICAgICAgKlxuICAgICAgICAgPSAob2JqZWN0KSBPYmplY3Qgd2l0aCBhdXRvU2Nyb2xsIHByb3BlcnRpZXNcbiAgICAgICAgICpcbiAgICAgICAgICogb3JcbiAgICAgICAgICpcbiAgICAgICAgIC0gb3B0aW9ucyAob2JqZWN0IHwgYm9vbGVhbikgI29wdGlvbmFsXG4gICAgICAgICAqIG9wdGlvbnMgY2FuIGJlOlxuICAgICAgICAgKiAtIGFuIG9iamVjdCB3aXRoIG1hcmdpbiwgZGlzdGFuY2UgYW5kIGludGVydmFsIHByb3BlcnRpZXMsXG4gICAgICAgICAqIC0gdHJ1ZSBvciBmYWxzZSB0byBlbmFibGUgb3IgZGlzYWJsZSBhdXRvU2Nyb2xsIG9yXG4gICAgICAgICA9IChJbnRlcmFjdGFibGUpIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAgICAgIFxcKi9cbiAgICAgICAgYXV0b1Njcm9sbDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBleHRlbmQoeyBhY3Rpb25zOiBbJ2RyYWcnLCAncmVzaXplJ119LCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzQm9vbChvcHRpb25zKSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7IGFjdGlvbnM6IFsnZHJhZycsICdyZXNpemUnXSwgZW5hYmxlZDogb3B0aW9ucyB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRPcHRpb25zKCdhdXRvU2Nyb2xsJywgb3B0aW9ucyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLypcXFxuICAgICAgICAgKiBJbnRlcmFjdGFibGUuc25hcFxuICAgICAgICAgWyBtZXRob2QgXVxuICAgICAgICAgKipcbiAgICAgICAgICogRGVwcmVjYXRlZC4gQWRkIGEgYHNuYXBgIHByb3BlcnR5IHRvIHRoZSBvcHRpb25zIG9iamVjdCBwYXNzZWRcbiAgICAgICAgICogdG8gQEludGVyYWN0YWJsZS5kcmFnZ2FibGUgb3IgQEludGVyYWN0YWJsZS5yZXNpemFibGUgaW5zdGVhZC5cbiAgICAgICAgICpcbiAgICAgICAgICogUmV0dXJucyBvciBzZXRzIGlmIGFuZCBob3cgYWN0aW9uIGNvb3JkaW5hdGVzIGFyZSBzbmFwcGVkLiBCeVxuICAgICAgICAgKiBkZWZhdWx0LCBzbmFwcGluZyBpcyByZWxhdGl2ZSB0byB0aGUgcG9pbnRlciBjb29yZGluYXRlcy4gWW91IGNhblxuICAgICAgICAgKiBjaGFuZ2UgdGhpcyBieSBzZXR0aW5nIHRoZVxuICAgICAgICAgKiBbYGVsZW1lbnRPcmlnaW5gXShodHRwczovL2dpdGh1Yi5jb20vdGF5ZS9pbnRlcmFjdC5qcy9wdWxsLzcyKS5cbiAgICAgICAgICoqXG4gICAgICAgICA9IChib29sZWFuIHwgb2JqZWN0KSBgZmFsc2VgIGlmIHNuYXAgaXMgZGlzYWJsZWQ7IG9iamVjdCB3aXRoIHNuYXAgcHJvcGVydGllcyBpZiBzbmFwIGlzIGVuYWJsZWRcbiAgICAgICAgICoqXG4gICAgICAgICAqIG9yXG4gICAgICAgICAqKlxuICAgICAgICAgLSBvcHRpb25zIChvYmplY3QgfCBib29sZWFuIHwgbnVsbCkgI29wdGlvbmFsXG4gICAgICAgICA9IChJbnRlcmFjdGFibGUpIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAgICAgICA+IFVzYWdlXG4gICAgICAgICB8IGludGVyYWN0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aGluZycpKS5zbmFwKHtcbiAgICAgICAgIHwgICAgIHRhcmdldHM6IFtcbiAgICAgICAgIHwgICAgICAgICAvLyBzbmFwIHRvIHRoaXMgc3BlY2lmaWMgcG9pbnRcbiAgICAgICAgIHwgICAgICAgICB7XG4gICAgICAgICB8ICAgICAgICAgICAgIHg6IDEwMCxcbiAgICAgICAgIHwgICAgICAgICAgICAgeTogMTAwLFxuICAgICAgICAgfCAgICAgICAgICAgICByYW5nZTogMjVcbiAgICAgICAgIHwgICAgICAgICB9LFxuICAgICAgICAgfCAgICAgICAgIC8vIGdpdmUgdGhpcyBmdW5jdGlvbiB0aGUgeCBhbmQgeSBwYWdlIGNvb3JkcyBhbmQgc25hcCB0byB0aGUgb2JqZWN0IHJldHVybmVkXG4gICAgICAgICB8ICAgICAgICAgZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgIHwgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgIHwgICAgICAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICB8ICAgICAgICAgICAgICAgICB5OiAoNzUgKyA1MCAqIE1hdGguc2luKHggKiAwLjA0KSksXG4gICAgICAgICB8ICAgICAgICAgICAgICAgICByYW5nZTogNDBcbiAgICAgICAgIHwgICAgICAgICAgICAgfTtcbiAgICAgICAgIHwgICAgICAgICB9LFxuICAgICAgICAgfCAgICAgICAgIC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgc25hcHMgdG8gYSBncmlkXG4gICAgICAgICB8ICAgICAgICAgaW50ZXJhY3QuY3JlYXRlU25hcEdyaWQoe1xuICAgICAgICAgfCAgICAgICAgICAgICB4OiA1MCxcbiAgICAgICAgIHwgICAgICAgICAgICAgeTogNTAsXG4gICAgICAgICB8ICAgICAgICAgICAgIHJhbmdlOiAxMCwgICAgICAgICAgICAgIC8vIG9wdGlvbmFsXG4gICAgICAgICB8ICAgICAgICAgICAgIG9mZnNldDogeyB4OiA1LCB5OiAxMCB9IC8vIG9wdGlvbmFsXG4gICAgICAgICB8ICAgICAgICAgfSlcbiAgICAgICAgIHwgICAgIF0sXG4gICAgICAgICB8ICAgICAvLyBkbyBub3Qgc25hcCBkdXJpbmcgbm9ybWFsIG1vdmVtZW50LlxuICAgICAgICAgfCAgICAgLy8gSW5zdGVhZCwgdHJpZ2dlciBvbmx5IG9uZSBzbmFwcGVkIG1vdmUgZXZlbnRcbiAgICAgICAgIHwgICAgIC8vIGltbWVkaWF0ZWx5IGJlZm9yZSB0aGUgZW5kIGV2ZW50LlxuICAgICAgICAgfCAgICAgZW5kT25seTogdHJ1ZSxcbiAgICAgICAgIHxcbiAgICAgICAgIHwgICAgIHJlbGF0aXZlUG9pbnRzOiBbXG4gICAgICAgICB8ICAgICAgICAgeyB4OiAwLCB5OiAwIH0sICAvLyBzbmFwIHJlbGF0aXZlIHRvIHRoZSB0b3AgbGVmdCBvZiB0aGUgZWxlbWVudFxuICAgICAgICAgfCAgICAgICAgIHsgeDogMSwgeTogMSB9LCAgLy8gYW5kIGFsc28gdG8gdGhlIGJvdHRvbSByaWdodFxuICAgICAgICAgfCAgICAgXSwgIFxuICAgICAgICAgfFxuICAgICAgICAgfCAgICAgLy8gb2Zmc2V0IHRoZSBzbmFwIHRhcmdldCBjb29yZGluYXRlc1xuICAgICAgICAgfCAgICAgLy8gY2FuIGJlIGFuIG9iamVjdCB3aXRoIHgveSBvciAnc3RhcnRDb29yZHMnXG4gICAgICAgICB8ICAgICBvZmZzZXQ6IHsgeDogNTAsIHk6IDUwIH1cbiAgICAgICAgIHwgICB9XG4gICAgICAgICB8IH0pO1xuICAgICAgICBcXCovXG4gICAgICAgIHNuYXA6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgcmV0ID0gdGhpcy5zZXRPcHRpb25zKCdzbmFwJywgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIGlmIChyZXQgPT09IHRoaXMpIHsgcmV0dXJuIHRoaXM7IH1cblxuICAgICAgICAgICAgcmV0dXJuIHJldC5kcmFnO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldE9wdGlvbnM6IGZ1bmN0aW9uIChvcHRpb24sIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBhY3Rpb25zID0gb3B0aW9ucyAmJiBpc0FycmF5KG9wdGlvbnMuYWN0aW9ucylcbiAgICAgICAgICAgICAgICAgICAgPyBvcHRpb25zLmFjdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgOiBbJ2RyYWcnXTtcblxuICAgICAgICAgICAgdmFyIGk7XG5cbiAgICAgICAgICAgIGlmIChpc09iamVjdChvcHRpb25zKSB8fCBpc0Jvb2wob3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0gL3Jlc2l6ZS8udGVzdChhY3Rpb25zW2ldKT8gJ3Jlc2l6ZScgOiBhY3Rpb25zW2ldO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNPYmplY3QodGhpcy5vcHRpb25zW2FjdGlvbl0pKSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoaXNPcHRpb24gPSB0aGlzLm9wdGlvbnNbYWN0aW9uXVtvcHRpb25dO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZW5kKHRoaXNPcHRpb24sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc09wdGlvbi5lbmFibGVkID0gb3B0aW9ucy5lbmFibGVkID09PSBmYWxzZT8gZmFsc2U6IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb24gPT09ICdzbmFwJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzT3B0aW9uLm1vZGUgPT09ICdncmlkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzT3B0aW9uLnRhcmdldHMgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlcmFjdC5jcmVhdGVTbmFwR3JpZChleHRlbmQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldDogdGhpc09wdGlvbi5ncmlkT2Zmc2V0IHx8IHsgeDogMCwgeTogMCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB0aGlzT3B0aW9uLmdyaWQgfHwge30pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzT3B0aW9uLm1vZGUgPT09ICdhbmNob3InKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNPcHRpb24udGFyZ2V0cyA9IHRoaXNPcHRpb24uYW5jaG9ycztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpc09wdGlvbi5tb2RlID09PSAncGF0aCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc09wdGlvbi50YXJnZXRzID0gdGhpc09wdGlvbi5wYXRocztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJ2VsZW1lbnRPcmlnaW4nIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc09wdGlvbi5yZWxhdGl2ZVBvaW50cyA9IFtvcHRpb25zLmVsZW1lbnRPcmlnaW5dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpc0Jvb2wob3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNPcHRpb24uZW5hYmxlZCA9IG9wdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHJldCA9IHt9LFxuICAgICAgICAgICAgICAgIGFsbEFjdGlvbnMgPSBbJ2RyYWcnLCAncmVzaXplJywgJ2dlc3R1cmUnXTtcblxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGFsbEFjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9uIGluIGRlZmF1bHRPcHRpb25zW2FsbEFjdGlvbnNbaV1dKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldFthbGxBY3Rpb25zW2ldXSA9IHRoaXMub3B0aW9uc1thbGxBY3Rpb25zW2ldXVtvcHRpb25dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSxcblxuXG4gICAgICAgIC8qXFxcbiAgICAgICAgICogSW50ZXJhY3RhYmxlLmluZXJ0aWFcbiAgICAgICAgIFsgbWV0aG9kIF1cbiAgICAgICAgICoqXG4gICAgICAgICAqIERlcHJlY2F0ZWQuIEFkZCBhbiBgaW5lcnRpYWAgcHJvcGVydHkgdG8gdGhlIG9wdGlvbnMgb2JqZWN0IHBhc3NlZFxuICAgICAgICAgKiB0byBASW50ZXJhY3RhYmxlLmRyYWdnYWJsZSBvciBASW50ZXJhY3RhYmxlLnJlc2l6YWJsZSBpbnN0ZWFkLlxuICAgICAgICAgKlxuICAgICAgICAgKiBSZXR1cm5zIG9yIHNldHMgaWYgYW5kIGhvdyBldmVudHMgY29udGludWUgdG8gcnVuIGFmdGVyIHRoZSBwb2ludGVyIGlzIHJlbGVhc2VkXG4gICAgICAgICAqKlxuICAgICAgICAgPSAoYm9vbGVhbiB8IG9iamVjdCkgYGZhbHNlYCBpZiBpbmVydGlhIGlzIGRpc2FibGVkOyBgb2JqZWN0YCB3aXRoIGluZXJ0aWEgcHJvcGVydGllcyBpZiBpbmVydGlhIGlzIGVuYWJsZWRcbiAgICAgICAgICoqXG4gICAgICAgICAqIG9yXG4gICAgICAgICAqKlxuICAgICAgICAgLSBvcHRpb25zIChvYmplY3QgfCBib29sZWFuIHwgbnVsbCkgI29wdGlvbmFsXG4gICAgICAgICA9IChJbnRlcmFjdGFibGUpIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAgICAgICA+IFVzYWdlXG4gICAgICAgICB8IC8vIGVuYWJsZSBhbmQgdXNlIGRlZmF1bHQgc2V0dGluZ3NcbiAgICAgICAgIHwgaW50ZXJhY3QoZWxlbWVudCkuaW5lcnRpYSh0cnVlKTtcbiAgICAgICAgIHxcbiAgICAgICAgIHwgLy8gZW5hYmxlIGFuZCB1c2UgY3VzdG9tIHNldHRpbmdzXG4gICAgICAgICB8IGludGVyYWN0KGVsZW1lbnQpLmluZXJ0aWEoe1xuICAgICAgICAgfCAgICAgLy8gdmFsdWUgZ3JlYXRlciB0aGFuIDBcbiAgICAgICAgIHwgICAgIC8vIGhpZ2ggdmFsdWVzIHNsb3cgdGhlIG9iamVjdCBkb3duIG1vcmUgcXVpY2tseVxuICAgICAgICAgfCAgICAgcmVzaXN0YW5jZSAgICAgOiAxNixcbiAgICAgICAgIHxcbiAgICAgICAgIHwgICAgIC8vIHRoZSBtaW5pbXVtIGxhdW5jaCBzcGVlZCAocGl4ZWxzIHBlciBzZWNvbmQpIHRoYXQgcmVzdWx0cyBpbiBpbmVydGlhIHN0YXJ0XG4gICAgICAgICB8ICAgICBtaW5TcGVlZCAgICAgICA6IDIwMCxcbiAgICAgICAgIHxcbiAgICAgICAgIHwgICAgIC8vIGluZXJ0aWEgd2lsbCBzdG9wIHdoZW4gdGhlIG9iamVjdCBzbG93cyBkb3duIHRvIHRoaXMgc3BlZWRcbiAgICAgICAgIHwgICAgIGVuZFNwZWVkICAgICAgIDogMjAsXG4gICAgICAgICB8XG4gICAgICAgICB8ICAgICAvLyBib29sZWFuOyBzaG91bGQgYWN0aW9ucyBiZSByZXN1bWVkIHdoZW4gdGhlIHBvaW50ZXIgZ29lcyBkb3duIGR1cmluZyBpbmVydGlhXG4gICAgICAgICB8ICAgICBhbGxvd1Jlc3VtZSAgICA6IHRydWUsXG4gICAgICAgICB8XG4gICAgICAgICB8ICAgICAvLyBib29sZWFuOyBzaG91bGQgdGhlIGp1bXAgd2hlbiByZXN1bWluZyBmcm9tIGluZXJ0aWEgYmUgaWdub3JlZCBpbiBldmVudC5keC9keVxuICAgICAgICAgfCAgICAgemVyb1Jlc3VtZURlbHRhOiBmYWxzZSxcbiAgICAgICAgIHxcbiAgICAgICAgIHwgICAgIC8vIGlmIHNuYXAvcmVzdHJpY3QgYXJlIHNldCB0byBiZSBlbmRPbmx5IGFuZCBpbmVydGlhIGlzIGVuYWJsZWQsIHJlbGVhc2luZ1xuICAgICAgICAgfCAgICAgLy8gdGhlIHBvaW50ZXIgd2l0aG91dCB0cmlnZ2VyaW5nIGluZXJ0aWEgd2lsbCBhbmltYXRlIGZyb20gdGhlIHJlbGVhc2VcbiAgICAgICAgIHwgICAgIC8vIHBvaW50IHRvIHRoZSBzbmFwZWQvcmVzdHJpY3RlZCBwb2ludCBpbiB0aGUgZ2l2ZW4gYW1vdW50IG9mIHRpbWUgKG1zKVxuICAgICAgICAgfCAgICAgc21vb3RoRW5kRHVyYXRpb246IDMwMCxcbiAgICAgICAgIHxcbiAgICAgICAgIHwgICAgIC8vIGFuIGFycmF5IG9mIGFjdGlvbiB0eXBlcyB0aGF0IGNhbiBoYXZlIGluZXJ0aWEgKG5vIGdlc3R1cmUpXG4gICAgICAgICB8ICAgICBhY3Rpb25zICAgICAgICA6IFsnZHJhZycsICdyZXNpemUnXVxuICAgICAgICAgfCB9KTtcbiAgICAgICAgIHxcbiAgICAgICAgIHwgLy8gcmVzZXQgY3VzdG9tIHNldHRpbmdzIGFuZCB1c2UgYWxsIGRlZmF1bHRzXG4gICAgICAgICB8IGludGVyYWN0KGVsZW1lbnQpLmluZXJ0aWEobnVsbCk7XG4gICAgICAgIFxcKi9cbiAgICAgICAgaW5lcnRpYTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciByZXQgPSB0aGlzLnNldE9wdGlvbnMoJ2luZXJ0aWEnLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgaWYgKHJldCA9PT0gdGhpcykgeyByZXR1cm4gdGhpczsgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmV0LmRyYWc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0QWN0aW9uOiBmdW5jdGlvbiAocG9pbnRlciwgZXZlbnQsIGludGVyYWN0aW9uLCBlbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgYWN0aW9uID0gdGhpcy5kZWZhdWx0QWN0aW9uQ2hlY2tlcihwb2ludGVyLCBpbnRlcmFjdGlvbiwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYWN0aW9uQ2hlY2tlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYWN0aW9uQ2hlY2tlcihwb2ludGVyLCBldmVudCwgYWN0aW9uLCB0aGlzLCBlbGVtZW50LCBpbnRlcmFjdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdEFjdGlvbkNoZWNrZXI6IGRlZmF1bHRBY3Rpb25DaGVja2VyLFxuXG4gICAgICAgIC8qXFxcbiAgICAgICAgICogSW50ZXJhY3RhYmxlLmFjdGlvbkNoZWNrZXJcbiAgICAgICAgIFsgbWV0aG9kIF1cbiAgICAgICAgICpcbiAgICAgICAgICogR2V0cyBvciBzZXRzIHRoZSBmdW5jdGlvbiB1c2VkIHRvIGNoZWNrIGFjdGlvbiB0byBiZSBwZXJmb3JtZWQgb25cbiAgICAgICAgICogcG9pbnRlckRvd25cbiAgICAgICAgICpcbiAgICAgICAgIC0gY2hlY2tlciAoZnVuY3Rpb24gfCBudWxsKSAjb3B0aW9uYWwgQSBmdW5jdGlvbiB3aGljaCB0YWtlcyBhIHBvaW50ZXIgZXZlbnQsIGRlZmF1bHRBY3Rpb24gc3RyaW5nLCBpbnRlcmFjdGFibGUsIGVsZW1lbnQgYW5kIGludGVyYWN0aW9uIGFzIHBhcmFtZXRlcnMgYW5kIHJldHVybnMgYW4gb2JqZWN0IHdpdGggbmFtZSBwcm9wZXJ0eSAnZHJhZycgJ3Jlc2l6ZScgb3IgJ2dlc3R1cmUnIGFuZCBvcHRpb25hbGx5IGFuIGBlZGdlc2Agb2JqZWN0IHdpdGggYm9vbGVhbiAndG9wJywgJ2xlZnQnLCAnYm90dG9tJyBhbmQgcmlnaHQgcHJvcHMuXG4gICAgICAgICA9IChGdW5jdGlvbiB8IEludGVyYWN0YWJsZSkgVGhlIGNoZWNrZXIgZnVuY3Rpb24gb3IgdGhpcyBJbnRlcmFjdGFibGVcbiAgICAgICAgICpcbiAgICAgICAgIHwgaW50ZXJhY3QoJy5yZXNpemUtZHJhZycpXG4gICAgICAgICB8ICAgLnJlc2l6YWJsZSh0cnVlKVxuICAgICAgICAgfCAgIC5kcmFnZ2FibGUodHJ1ZSlcbiAgICAgICAgIHwgICAuYWN0aW9uQ2hlY2tlcihmdW5jdGlvbiAocG9pbnRlciwgZXZlbnQsIGFjdGlvbiwgaW50ZXJhY3RhYmxlLCBlbGVtZW50LCBpbnRlcmFjdGlvbikge1xuICAgICAgICAgfFxuICAgICAgICAgfCAgIGlmIChpbnRlcmFjdC5tYXRjaGVzU2VsZWN0b3IoZXZlbnQudGFyZ2V0LCAnLmRyYWctaGFuZGxlJykge1xuICAgICAgICAgfCAgICAgLy8gZm9yY2UgZHJhZyB3aXRoIGhhbmRsZSB0YXJnZXRcbiAgICAgICAgIHwgICAgIGFjdGlvbi5uYW1lID0gZHJhZztcbiAgICAgICAgIHwgICB9XG4gICAgICAgICB8ICAgZWxzZSB7XG4gICAgICAgICB8ICAgICAvLyByZXNpemUgZnJvbSB0aGUgdG9wIGFuZCByaWdodCBlZGdlc1xuICAgICAgICAgfCAgICAgYWN0aW9uLm5hbWUgID0gJ3Jlc2l6ZSc7XG4gICAgICAgICB8ICAgICBhY3Rpb24uZWRnZXMgPSB7IHRvcDogdHJ1ZSwgcmlnaHQ6IHRydWUgfTtcbiAgICAgICAgIHwgICB9XG4gICAgICAgICB8XG4gICAgICAgICB8ICAgcmV0dXJuIGFjdGlvbjtcbiAgICAgICAgIHwgfSk7XG4gICAgICAgIFxcKi9cbiAgICAgICAgYWN0aW9uQ2hlY2tlcjogZnVuY3Rpb24gKGNoZWNrZXIpIHtcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKGNoZWNrZXIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFjdGlvbkNoZWNrZXIgPSBjaGVja2VyO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjaGVja2VyID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMub3B0aW9ucy5hY3Rpb25DaGVja2VyO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYWN0aW9uQ2hlY2tlcjtcbiAgICAgICAgfSxcblxuICAgICAgICAvKlxcXG4gICAgICAgICAqIEludGVyYWN0YWJsZS5nZXRSZWN0XG4gICAgICAgICBbIG1ldGhvZCBdXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoZSBkZWZhdWx0IGZ1bmN0aW9uIHRvIGdldCBhbiBJbnRlcmFjdGFibGVzIGJvdW5kaW5nIHJlY3QuIENhbiBiZVxuICAgICAgICAgKiBvdmVycmlkZGVuIHVzaW5nIEBJbnRlcmFjdGFibGUucmVjdENoZWNrZXIuXG4gICAgICAgICAqXG4gICAgICAgICAtIGVsZW1lbnQgKEVsZW1lbnQpICNvcHRpb25hbCBUaGUgZWxlbWVudCB0byBtZWFzdXJlLlxuICAgICAgICAgPSAob2JqZWN0KSBUaGUgb2JqZWN0J3MgYm91bmRpbmcgcmVjdGFuZ2xlLlxuICAgICAgICAgbyB7XG4gICAgICAgICBvICAgICB0b3AgICA6IDAsXG4gICAgICAgICBvICAgICBsZWZ0ICA6IDAsXG4gICAgICAgICBvICAgICBib3R0b206IDAsXG4gICAgICAgICBvICAgICByaWdodCA6IDAsXG4gICAgICAgICBvICAgICB3aWR0aCA6IDAsXG4gICAgICAgICBvICAgICBoZWlnaHQ6IDBcbiAgICAgICAgIG8gfVxuICAgICAgICBcXCovXG4gICAgICAgIGdldFJlY3Q6IGZ1bmN0aW9uIHJlY3RDaGVjayAoZWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQgfHwgdGhpcy5fZWxlbWVudDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0b3IgJiYgIShpc0VsZW1lbnQoZWxlbWVudCkpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuX2NvbnRleHQucXVlcnlTZWxlY3Rvcih0aGlzLnNlbGVjdG9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGdldEVsZW1lbnRSZWN0KGVsZW1lbnQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qXFxcbiAgICAgICAgICogSW50ZXJhY3RhYmxlLnJlY3RDaGVja2VyXG4gICAgICAgICBbIG1ldGhvZCBdXG4gICAgICAgICAqXG4gICAgICAgICAqIFJldHVybnMgb3Igc2V0cyB0aGUgZnVuY3Rpb24gdXNlZCB0byBjYWxjdWxhdGUgdGhlIGludGVyYWN0YWJsZSdzXG4gICAgICAgICAqIGVsZW1lbnQncyByZWN0YW5nbGVcbiAgICAgICAgICpcbiAgICAgICAgIC0gY2hlY2tlciAoZnVuY3Rpb24pICNvcHRpb25hbCBBIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgdGhpcyBJbnRlcmFjdGFibGUncyBib3VuZGluZyByZWN0YW5nbGUuIFNlZSBASW50ZXJhY3RhYmxlLmdldFJlY3RcbiAgICAgICAgID0gKGZ1bmN0aW9uIHwgb2JqZWN0KSBUaGUgY2hlY2tlciBmdW5jdGlvbiBvciB0aGlzIEludGVyYWN0YWJsZVxuICAgICAgICBcXCovXG4gICAgICAgIHJlY3RDaGVja2VyOiBmdW5jdGlvbiAoY2hlY2tlcikge1xuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24oY2hlY2tlcikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlY3QgPSBjaGVja2VyO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjaGVja2VyID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMub3B0aW9ucy5nZXRSZWN0O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFJlY3Q7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLypcXFxuICAgICAgICAgKiBJbnRlcmFjdGFibGUuc3R5bGVDdXJzb3JcbiAgICAgICAgIFsgbWV0aG9kIF1cbiAgICAgICAgICpcbiAgICAgICAgICogUmV0dXJucyBvciBzZXRzIHdoZXRoZXIgdGhlIGFjdGlvbiB0aGF0IHdvdWxkIGJlIHBlcmZvcm1lZCB3aGVuIHRoZVxuICAgICAgICAgKiBtb3VzZSBvbiB0aGUgZWxlbWVudCBhcmUgY2hlY2tlZCBvbiBgbW91c2Vtb3ZlYCBzbyB0aGF0IHRoZSBjdXJzb3JcbiAgICAgICAgICogbWF5IGJlIHN0eWxlZCBhcHByb3ByaWF0ZWx5XG4gICAgICAgICAqXG4gICAgICAgICAtIG5ld1ZhbHVlIChib29sZWFuKSAjb3B0aW9uYWxcbiAgICAgICAgID0gKGJvb2xlYW4gfCBJbnRlcmFjdGFibGUpIFRoZSBjdXJyZW50IHNldHRpbmcgb3IgdGhpcyBJbnRlcmFjdGFibGVcbiAgICAgICAgXFwqL1xuICAgICAgICBzdHlsZUN1cnNvcjogZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoaXNCb29sKG5ld1ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zdHlsZUN1cnNvciA9IG5ld1ZhbHVlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm9wdGlvbnMuc3R5bGVDdXJzb3I7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zdHlsZUN1cnNvcjtcbiAgICAgICAgfSxcblxuICAgICAgICAvKlxcXG4gICAgICAgICAqIEludGVyYWN0YWJsZS5wcmV2ZW50RGVmYXVsdFxuICAgICAgICAgWyBtZXRob2QgXVxuICAgICAgICAgKlxuICAgICAgICAgKiBSZXR1cm5zIG9yIHNldHMgd2hldGhlciB0byBwcmV2ZW50IHRoZSBicm93c2VyJ3MgZGVmYXVsdCBiZWhhdmlvdXJcbiAgICAgICAgICogaW4gcmVzcG9uc2UgdG8gcG9pbnRlciBldmVudHMuIENhbiBiZSBzZXQgdG86XG4gICAgICAgICAqICAtIGAnYWx3YXlzJ2AgdG8gYWx3YXlzIHByZXZlbnRcbiAgICAgICAgICogIC0gYCduZXZlcidgIHRvIG5ldmVyIHByZXZlbnRcbiAgICAgICAgICogIC0gYCdhdXRvJ2AgdG8gbGV0IGludGVyYWN0LmpzIHRyeSB0byBkZXRlcm1pbmUgd2hhdCB3b3VsZCBiZSBiZXN0XG4gICAgICAgICAqXG4gICAgICAgICAtIG5ld1ZhbHVlIChzdHJpbmcpICNvcHRpb25hbCBgdHJ1ZWAsIGBmYWxzZWAgb3IgYCdhdXRvJ2BcbiAgICAgICAgID0gKHN0cmluZyB8IEludGVyYWN0YWJsZSkgVGhlIGN1cnJlbnQgc2V0dGluZyBvciB0aGlzIEludGVyYWN0YWJsZVxuICAgICAgICBcXCovXG4gICAgICAgIHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGlmICgvXihhbHdheXN8bmV2ZXJ8YXV0bykkLy50ZXN0KG5ld1ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wcmV2ZW50RGVmYXVsdCA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNCb29sKG5ld1ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wcmV2ZW50RGVmYXVsdCA9IG5ld1ZhbHVlPyAnYWx3YXlzJyA6ICduZXZlcic7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMucHJldmVudERlZmF1bHQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLypcXFxuICAgICAgICAgKiBJbnRlcmFjdGFibGUub3JpZ2luXG4gICAgICAgICBbIG1ldGhvZCBdXG4gICAgICAgICAqXG4gICAgICAgICAqIEdldHMgb3Igc2V0cyB0aGUgb3JpZ2luIG9mIHRoZSBJbnRlcmFjdGFibGUncyBlbGVtZW50LiAgVGhlIHggYW5kIHlcbiAgICAgICAgICogb2YgdGhlIG9yaWdpbiB3aWxsIGJlIHN1YnRyYWN0ZWQgZnJvbSBhY3Rpb24gZXZlbnQgY29vcmRpbmF0ZXMuXG4gICAgICAgICAqXG4gICAgICAgICAtIG9yaWdpbiAob2JqZWN0IHwgc3RyaW5nKSAjb3B0aW9uYWwgQW4gb2JqZWN0IGVnLiB7IHg6IDAsIHk6IDAgfSBvciBzdHJpbmcgJ3BhcmVudCcsICdzZWxmJyBvciBhbnkgQ1NTIHNlbGVjdG9yXG4gICAgICAgICAqIE9SXG4gICAgICAgICAtIG9yaWdpbiAoRWxlbWVudCkgI29wdGlvbmFsIEFuIEhUTUwgb3IgU1ZHIEVsZW1lbnQgd2hvc2UgcmVjdCB3aWxsIGJlIHVzZWRcbiAgICAgICAgICoqXG4gICAgICAgICA9IChvYmplY3QpIFRoZSBjdXJyZW50IG9yaWdpbiBvciB0aGlzIEludGVyYWN0YWJsZVxuICAgICAgICBcXCovXG4gICAgICAgIG9yaWdpbjogZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodHJ5U2VsZWN0b3IobmV3VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLm9yaWdpbiA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNPYmplY3QobmV3VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLm9yaWdpbiA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLm9yaWdpbjtcbiAgICAgICAgfSxcblxuICAgICAgICAvKlxcXG4gICAgICAgICAqIEludGVyYWN0YWJsZS5kZWx0YVNvdXJjZVxuICAgICAgICAgWyBtZXRob2QgXVxuICAgICAgICAgKlxuICAgICAgICAgKiBSZXR1cm5zIG9yIHNldHMgdGhlIG1vdXNlIGNvb3JkaW5hdGUgdHlwZXMgdXNlZCB0byBjYWxjdWxhdGUgdGhlXG4gICAgICAgICAqIG1vdmVtZW50IG9mIHRoZSBwb2ludGVyLlxuICAgICAgICAgKlxuICAgICAgICAgLSBuZXdWYWx1ZSAoc3RyaW5nKSAjb3B0aW9uYWwgVXNlICdjbGllbnQnIGlmIHlvdSB3aWxsIGJlIHNjcm9sbGluZyB3aGlsZSBpbnRlcmFjdGluZzsgVXNlICdwYWdlJyBpZiB5b3Ugd2FudCBhdXRvU2Nyb2xsIHRvIHdvcmtcbiAgICAgICAgID0gKHN0cmluZyB8IG9iamVjdCkgVGhlIGN1cnJlbnQgZGVsdGFTb3VyY2Ugb3IgdGhpcyBJbnRlcmFjdGFibGVcbiAgICAgICAgXFwqL1xuICAgICAgICBkZWx0YVNvdXJjZTogZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgPT09ICdwYWdlJyB8fCBuZXdWYWx1ZSA9PT0gJ2NsaWVudCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuZGVsdGFTb3VyY2UgPSBuZXdWYWx1ZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmRlbHRhU291cmNlO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qXFxcbiAgICAgICAgICogSW50ZXJhY3RhYmxlLnJlc3RyaWN0XG4gICAgICAgICBbIG1ldGhvZCBdXG4gICAgICAgICAqKlxuICAgICAgICAgKiBEZXByZWNhdGVkLiBBZGQgYSBgcmVzdHJpY3RgIHByb3BlcnR5IHRvIHRoZSBvcHRpb25zIG9iamVjdCBwYXNzZWQgdG9cbiAgICAgICAgICogQEludGVyYWN0YWJsZS5kcmFnZ2FibGUsIEBJbnRlcmFjdGFibGUucmVzaXphYmxlIG9yIEBJbnRlcmFjdGFibGUuZ2VzdHVyYWJsZSBpbnN0ZWFkLlxuICAgICAgICAgKlxuICAgICAgICAgKiBSZXR1cm5zIG9yIHNldHMgdGhlIHJlY3RhbmdsZXMgd2l0aGluIHdoaWNoIGFjdGlvbnMgb24gdGhpc1xuICAgICAgICAgKiBpbnRlcmFjdGFibGUgKGFmdGVyIHNuYXAgY2FsY3VsYXRpb25zKSBhcmUgcmVzdHJpY3RlZC4gQnkgZGVmYXVsdCxcbiAgICAgICAgICogcmVzdHJpY3RpbmcgaXMgcmVsYXRpdmUgdG8gdGhlIHBvaW50ZXIgY29vcmRpbmF0ZXMuIFlvdSBjYW4gY2hhbmdlXG4gICAgICAgICAqIHRoaXMgYnkgc2V0dGluZyB0aGVcbiAgICAgICAgICogW2BlbGVtZW50UmVjdGBdKGh0dHBzOi8vZ2l0aHViLmNvbS90YXllL2ludGVyYWN0LmpzL3B1bGwvNzIpLlxuICAgICAgICAgKipcbiAgICAgICAgIC0gb3B0aW9ucyAob2JqZWN0KSAjb3B0aW9uYWwgYW4gb2JqZWN0IHdpdGgga2V5cyBkcmFnLCByZXNpemUsIGFuZC9vciBnZXN0dXJlIHdob3NlIHZhbHVlcyBhcmUgcmVjdHMsIEVsZW1lbnRzLCBDU1Mgc2VsZWN0b3JzLCBvciAncGFyZW50JyBvciAnc2VsZidcbiAgICAgICAgID0gKG9iamVjdCkgVGhlIGN1cnJlbnQgcmVzdHJpY3Rpb25zIG9iamVjdCBvciB0aGlzIEludGVyYWN0YWJsZVxuICAgICAgICAgKipcbiAgICAgICAgIHwgaW50ZXJhY3QoZWxlbWVudCkucmVzdHJpY3Qoe1xuICAgICAgICAgfCAgICAgLy8gdGhlIHJlY3Qgd2lsbCBiZSBgaW50ZXJhY3QuZ2V0RWxlbWVudFJlY3QoZWxlbWVudC5wYXJlbnROb2RlKWBcbiAgICAgICAgIHwgICAgIGRyYWc6IGVsZW1lbnQucGFyZW50Tm9kZSxcbiAgICAgICAgIHxcbiAgICAgICAgIHwgICAgIC8vIHggYW5kIHkgYXJlIHJlbGF0aXZlIHRvIHRoZSB0aGUgaW50ZXJhY3RhYmxlJ3Mgb3JpZ2luXG4gICAgICAgICB8ICAgICByZXNpemU6IHsgeDogMTAwLCB5OiAxMDAsIHdpZHRoOiAyMDAsIGhlaWdodDogMjAwIH1cbiAgICAgICAgIHwgfSlcbiAgICAgICAgIHxcbiAgICAgICAgIHwgaW50ZXJhY3QoJy5kcmFnZ2FibGUnKS5yZXN0cmljdCh7XG4gICAgICAgICB8ICAgICAvLyB0aGUgcmVjdCB3aWxsIGJlIHRoZSBzZWxlY3RlZCBlbGVtZW50J3MgcGFyZW50XG4gICAgICAgICB8ICAgICBkcmFnOiAncGFyZW50JyxcbiAgICAgICAgIHxcbiAgICAgICAgIHwgICAgIC8vIGRvIG5vdCByZXN0cmljdCBkdXJpbmcgbm9ybWFsIG1vdmVtZW50LlxuICAgICAgICAgfCAgICAgLy8gSW5zdGVhZCwgdHJpZ2dlciBvbmx5IG9uZSByZXN0cmljdGVkIG1vdmUgZXZlbnRcbiAgICAgICAgIHwgICAgIC8vIGltbWVkaWF0ZWx5IGJlZm9yZSB0aGUgZW5kIGV2ZW50LlxuICAgICAgICAgfCAgICAgZW5kT25seTogdHJ1ZSxcbiAgICAgICAgIHxcbiAgICAgICAgIHwgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YXllL2ludGVyYWN0LmpzL3B1bGwvNzIjaXNzdWUtNDE4MTM0OTNcbiAgICAgICAgIHwgICAgIGVsZW1lbnRSZWN0OiB7IHRvcDogMCwgbGVmdDogMCwgYm90dG9tOiAxLCByaWdodDogMSB9XG4gICAgICAgICB8IH0pO1xuICAgICAgICBcXCovXG4gICAgICAgIHJlc3RyaWN0OiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKCFpc09iamVjdChvcHRpb25zKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldE9wdGlvbnMoJ3Jlc3RyaWN0Jywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBhY3Rpb25zID0gWydkcmFnJywgJ3Jlc2l6ZScsICdnZXN0dXJlJ10sXG4gICAgICAgICAgICAgICAgcmV0O1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0gYWN0aW9uc1tpXTtcblxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGVyQWN0aW9uID0gZXh0ZW5kKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zOiBbYWN0aW9uXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN0cmljdGlvbjogb3B0aW9uc1thY3Rpb25dXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBvcHRpb25zKTtcblxuICAgICAgICAgICAgICAgICAgICByZXQgPSB0aGlzLnNldE9wdGlvbnMoJ3Jlc3RyaWN0JywgcGVyQWN0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLypcXFxuICAgICAgICAgKiBJbnRlcmFjdGFibGUuY29udGV4dFxuICAgICAgICAgWyBtZXRob2QgXVxuICAgICAgICAgKlxuICAgICAgICAgKiBHZXRzIHRoZSBzZWxlY3RvciBjb250ZXh0IE5vZGUgb2YgdGhlIEludGVyYWN0YWJsZS4gVGhlIGRlZmF1bHQgaXMgYHdpbmRvdy5kb2N1bWVudGAuXG4gICAgICAgICAqXG4gICAgICAgICA9IChOb2RlKSBUaGUgY29udGV4dCBOb2RlIG9mIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAgICAgICAqKlxuICAgICAgICBcXCovXG4gICAgICAgIGNvbnRleHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xuICAgICAgICB9LFxuXG4gICAgICAgIF9jb250ZXh0OiBkb2N1bWVudCxcblxuICAgICAgICAvKlxcXG4gICAgICAgICAqIEludGVyYWN0YWJsZS5pZ25vcmVGcm9tXG4gICAgICAgICBbIG1ldGhvZCBdXG4gICAgICAgICAqXG4gICAgICAgICAqIElmIHRoZSB0YXJnZXQgb2YgdGhlIGBtb3VzZWRvd25gLCBgcG9pbnRlcmRvd25gIG9yIGB0b3VjaHN0YXJ0YFxuICAgICAgICAgKiBldmVudCBvciBhbnkgb2YgaXQncyBwYXJlbnRzIG1hdGNoIHRoZSBnaXZlbiBDU1Mgc2VsZWN0b3Igb3JcbiAgICAgICAgICogRWxlbWVudCwgbm8gZHJhZy9yZXNpemUvZ2VzdHVyZSBpcyBzdGFydGVkLlxuICAgICAgICAgKlxuICAgICAgICAgLSBuZXdWYWx1ZSAoc3RyaW5nIHwgRWxlbWVudCB8IG51bGwpICNvcHRpb25hbCBhIENTUyBzZWxlY3RvciBzdHJpbmcsIGFuIEVsZW1lbnQgb3IgYG51bGxgIHRvIG5vdCBpZ25vcmUgYW55IGVsZW1lbnRzXG4gICAgICAgICA9IChzdHJpbmcgfCBFbGVtZW50IHwgb2JqZWN0KSBUaGUgY3VycmVudCBpZ25vcmVGcm9tIHZhbHVlIG9yIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAgICAgICAqKlxuICAgICAgICAgfCBpbnRlcmFjdChlbGVtZW50LCB7IGlnbm9yZUZyb206IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduby1hY3Rpb24nKSB9KTtcbiAgICAgICAgIHwgLy8gb3JcbiAgICAgICAgIHwgaW50ZXJhY3QoZWxlbWVudCkuaWdub3JlRnJvbSgnaW5wdXQsIHRleHRhcmVhLCBhJyk7XG4gICAgICAgIFxcKi9cbiAgICAgICAgaWdub3JlRnJvbTogZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodHJ5U2VsZWN0b3IobmV3VmFsdWUpKSB7ICAgICAgICAgICAgLy8gQ1NTIHNlbGVjdG9yIHRvIG1hdGNoIGV2ZW50LnRhcmdldFxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pZ25vcmVGcm9tID0gbmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc0VsZW1lbnQobmV3VmFsdWUpKSB7ICAgICAgICAgICAgICAvLyBzcGVjaWZpYyBlbGVtZW50XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmlnbm9yZUZyb20gPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5pZ25vcmVGcm9tO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qXFxcbiAgICAgICAgICogSW50ZXJhY3RhYmxlLmFsbG93RnJvbVxuICAgICAgICAgWyBtZXRob2QgXVxuICAgICAgICAgKlxuICAgICAgICAgKiBBIGRyYWcvcmVzaXplL2dlc3R1cmUgaXMgc3RhcnRlZCBvbmx5IElmIHRoZSB0YXJnZXQgb2YgdGhlXG4gICAgICAgICAqIGBtb3VzZWRvd25gLCBgcG9pbnRlcmRvd25gIG9yIGB0b3VjaHN0YXJ0YCBldmVudCBvciBhbnkgb2YgaXQnc1xuICAgICAgICAgKiBwYXJlbnRzIG1hdGNoIHRoZSBnaXZlbiBDU1Mgc2VsZWN0b3Igb3IgRWxlbWVudC5cbiAgICAgICAgICpcbiAgICAgICAgIC0gbmV3VmFsdWUgKHN0cmluZyB8IEVsZW1lbnQgfCBudWxsKSAjb3B0aW9uYWwgYSBDU1Mgc2VsZWN0b3Igc3RyaW5nLCBhbiBFbGVtZW50IG9yIGBudWxsYCB0byBhbGxvdyBmcm9tIGFueSBlbGVtZW50XG4gICAgICAgICA9IChzdHJpbmcgfCBFbGVtZW50IHwgb2JqZWN0KSBUaGUgY3VycmVudCBhbGxvd0Zyb20gdmFsdWUgb3IgdGhpcyBJbnRlcmFjdGFibGVcbiAgICAgICAgICoqXG4gICAgICAgICB8IGludGVyYWN0KGVsZW1lbnQsIHsgYWxsb3dGcm9tOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHJhZy1oYW5kbGUnKSB9KTtcbiAgICAgICAgIHwgLy8gb3JcbiAgICAgICAgIHwgaW50ZXJhY3QoZWxlbWVudCkuYWxsb3dGcm9tKCcuaGFuZGxlJyk7XG4gICAgICAgIFxcKi9cbiAgICAgICAgYWxsb3dGcm9tOiBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0cnlTZWxlY3RvcihuZXdWYWx1ZSkpIHsgICAgICAgICAgICAvLyBDU1Mgc2VsZWN0b3IgdG8gbWF0Y2ggZXZlbnQudGFyZ2V0XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFsbG93RnJvbSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNFbGVtZW50KG5ld1ZhbHVlKSkgeyAgICAgICAgICAgICAgLy8gc3BlY2lmaWMgZWxlbWVudFxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hbGxvd0Zyb20gPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hbGxvd0Zyb207XG4gICAgICAgIH0sXG5cbiAgICAgICAgLypcXFxuICAgICAgICAgKiBJbnRlcmFjdGFibGUuZWxlbWVudFxuICAgICAgICAgWyBtZXRob2QgXVxuICAgICAgICAgKlxuICAgICAgICAgKiBJZiB0aGlzIGlzIG5vdCBhIHNlbGVjdG9yIEludGVyYWN0YWJsZSwgaXQgcmV0dXJucyB0aGUgZWxlbWVudCB0aGlzXG4gICAgICAgICAqIGludGVyYWN0YWJsZSByZXByZXNlbnRzXG4gICAgICAgICAqXG4gICAgICAgICA9IChFbGVtZW50KSBIVE1MIC8gU1ZHIEVsZW1lbnRcbiAgICAgICAgXFwqL1xuICAgICAgICBlbGVtZW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKlxcXG4gICAgICAgICAqIEludGVyYWN0YWJsZS5maXJlXG4gICAgICAgICBbIG1ldGhvZCBdXG4gICAgICAgICAqXG4gICAgICAgICAqIENhbGxzIGxpc3RlbmVycyBmb3IgdGhlIGdpdmVuIEludGVyYWN0RXZlbnQgdHlwZSBib3VuZCBnbG9iYWxseVxuICAgICAgICAgKiBhbmQgZGlyZWN0bHkgdG8gdGhpcyBJbnRlcmFjdGFibGVcbiAgICAgICAgICpcbiAgICAgICAgIC0gaUV2ZW50IChJbnRlcmFjdEV2ZW50KSBUaGUgSW50ZXJhY3RFdmVudCBvYmplY3QgdG8gYmUgZmlyZWQgb24gdGhpcyBJbnRlcmFjdGFibGVcbiAgICAgICAgID0gKEludGVyYWN0YWJsZSkgdGhpcyBJbnRlcmFjdGFibGVcbiAgICAgICAgXFwqL1xuICAgICAgICBmaXJlOiBmdW5jdGlvbiAoaUV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoIShpRXZlbnQgJiYgaUV2ZW50LnR5cGUpIHx8ICFjb250YWlucyhldmVudFR5cGVzLCBpRXZlbnQudHlwZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGxpc3RlbmVycyxcbiAgICAgICAgICAgICAgICBpLFxuICAgICAgICAgICAgICAgIGxlbixcbiAgICAgICAgICAgICAgICBvbkV2ZW50ID0gJ29uJyArIGlFdmVudC50eXBlLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lID0gJyc7XG5cbiAgICAgICAgICAgIC8vIEludGVyYWN0YWJsZSNvbigpIGxpc3RlbmVyc1xuICAgICAgICAgICAgaWYgKGlFdmVudC50eXBlIGluIHRoaXMuX2lFdmVudHMpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMgPSB0aGlzLl9pRXZlbnRzW2lFdmVudC50eXBlXTtcblxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW4gJiYgIWlFdmVudC5pbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQ7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBmdW5jTmFtZSA9IGxpc3RlbmVyc1tpXS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnNbaV0oaUV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGludGVyYWN0YWJsZS5vbmV2ZW50IGxpc3RlbmVyXG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzW29uRXZlbnRdKSkge1xuICAgICAgICAgICAgICAgIGZ1bmNOYW1lID0gdGhpc1tvbkV2ZW50XS5uYW1lO1xuICAgICAgICAgICAgICAgIHRoaXNbb25FdmVudF0oaUV2ZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaW50ZXJhY3Qub24oKSBsaXN0ZW5lcnNcbiAgICAgICAgICAgIGlmIChpRXZlbnQudHlwZSBpbiBnbG9iYWxFdmVudHMgJiYgKGxpc3RlbmVycyA9IGdsb2JhbEV2ZW50c1tpRXZlbnQudHlwZV0pKSAge1xuXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbiAmJiAhaUV2ZW50LmltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lID0gbGlzdGVuZXJzW2ldLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyc1tpXShpRXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLypcXFxuICAgICAgICAgKiBJbnRlcmFjdGFibGUub25cbiAgICAgICAgIFsgbWV0aG9kIF1cbiAgICAgICAgICpcbiAgICAgICAgICogQmluZHMgYSBsaXN0ZW5lciBmb3IgYW4gSW50ZXJhY3RFdmVudCBvciBET00gZXZlbnQuXG4gICAgICAgICAqXG4gICAgICAgICAtIGV2ZW50VHlwZSAgKHN0cmluZyB8IGFycmF5IHwgb2JqZWN0KSBUaGUgdHlwZXMgb2YgZXZlbnRzIHRvIGxpc3RlbiBmb3JcbiAgICAgICAgIC0gbGlzdGVuZXIgICAoZnVuY3Rpb24pIFRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgb24gdGhlIGdpdmVuIGV2ZW50KHMpXG4gICAgICAgICAtIHVzZUNhcHR1cmUgKGJvb2xlYW4pICNvcHRpb25hbCB1c2VDYXB0dXJlIGZsYWcgZm9yIGFkZEV2ZW50TGlzdGVuZXJcbiAgICAgICAgID0gKG9iamVjdCkgVGhpcyBJbnRlcmFjdGFibGVcbiAgICAgICAgXFwqL1xuICAgICAgICBvbjogZnVuY3Rpb24gKGV2ZW50VHlwZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpIHtcbiAgICAgICAgICAgIHZhciBpO1xuXG4gICAgICAgICAgICBpZiAoaXNTdHJpbmcoZXZlbnRUeXBlKSAmJiBldmVudFR5cGUuc2VhcmNoKCcgJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRUeXBlID0gZXZlbnRUeXBlLnRyaW0oKS5zcGxpdCgvICsvKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzQXJyYXkoZXZlbnRUeXBlKSkge1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBldmVudFR5cGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbihldmVudFR5cGVbaV0sIGxpc3RlbmVyLCB1c2VDYXB0dXJlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGV2ZW50VHlwZSkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIGV2ZW50VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uKHByb3AsIGV2ZW50VHlwZVtwcm9wXSwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZXZlbnRUeXBlID09PSAnd2hlZWwnKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRUeXBlID0gd2hlZWxFdmVudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY29udmVydCB0byBib29sZWFuXG4gICAgICAgICAgICB1c2VDYXB0dXJlID0gdXNlQ2FwdHVyZT8gdHJ1ZTogZmFsc2U7XG5cbiAgICAgICAgICAgIGlmIChjb250YWlucyhldmVudFR5cGVzLCBldmVudFR5cGUpKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhpcyB0eXBlIG9mIGV2ZW50IHdhcyBuZXZlciBib3VuZCB0byB0aGlzIEludGVyYWN0YWJsZVxuICAgICAgICAgICAgICAgIGlmICghKGV2ZW50VHlwZSBpbiB0aGlzLl9pRXZlbnRzKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pRXZlbnRzW2V2ZW50VHlwZV0gPSBbbGlzdGVuZXJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faUV2ZW50c1tldmVudFR5cGVdLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGRlbGVnYXRlZCBldmVudCBmb3Igc2VsZWN0b3JcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWRlbGVnYXRlZEV2ZW50c1tldmVudFR5cGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGVnYXRlZEV2ZW50c1tldmVudFR5cGVdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3JzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRzIDogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnM6IFtdXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIGRlbGVnYXRlIGxpc3RlbmVyIGZ1bmN0aW9uc1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZG9jdW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudHMuYWRkKGRvY3VtZW50c1tpXSwgZXZlbnRUeXBlLCBkZWxlZ2F0ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5hZGQoZG9jdW1lbnRzW2ldLCBldmVudFR5cGUsIGRlbGVnYXRlVXNlQ2FwdHVyZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgZGVsZWdhdGVkID0gZGVsZWdhdGVkRXZlbnRzW2V2ZW50VHlwZV0sXG4gICAgICAgICAgICAgICAgICAgIGluZGV4O1xuXG4gICAgICAgICAgICAgICAgZm9yIChpbmRleCA9IGRlbGVnYXRlZC5zZWxlY3RvcnMubGVuZ3RoIC0gMTsgaW5kZXggPj0gMDsgaW5kZXgtLSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVsZWdhdGVkLnNlbGVjdG9yc1tpbmRleF0gPT09IHRoaXMuc2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIGRlbGVnYXRlZC5jb250ZXh0c1tpbmRleF0gPT09IHRoaXMuX2NvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGRlbGVnYXRlZC5zZWxlY3RvcnMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIGRlbGVnYXRlZC5zZWxlY3RvcnMucHVzaCh0aGlzLnNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZWdhdGVkLmNvbnRleHRzIC5wdXNoKHRoaXMuX2NvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICBkZWxlZ2F0ZWQubGlzdGVuZXJzLnB1c2goW10pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGtlZXAgbGlzdGVuZXIgYW5kIHVzZUNhcHR1cmUgZmxhZ1xuICAgICAgICAgICAgICAgIGRlbGVnYXRlZC5saXN0ZW5lcnNbaW5kZXhdLnB1c2goW2xpc3RlbmVyLCB1c2VDYXB0dXJlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBldmVudHMuYWRkKHRoaXMuX2VsZW1lbnQsIGV2ZW50VHlwZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKlxcXG4gICAgICAgICAqIEludGVyYWN0YWJsZS5vZmZcbiAgICAgICAgIFsgbWV0aG9kIF1cbiAgICAgICAgICpcbiAgICAgICAgICogUmVtb3ZlcyBhbiBJbnRlcmFjdEV2ZW50IG9yIERPTSBldmVudCBsaXN0ZW5lclxuICAgICAgICAgKlxuICAgICAgICAgLSBldmVudFR5cGUgIChzdHJpbmcgfCBhcnJheSB8IG9iamVjdCkgVGhlIHR5cGVzIG9mIGV2ZW50cyB0aGF0IHdlcmUgbGlzdGVuZWQgZm9yXG4gICAgICAgICAtIGxpc3RlbmVyICAgKGZ1bmN0aW9uKSBUaGUgbGlzdGVuZXIgZnVuY3Rpb24gdG8gYmUgcmVtb3ZlZFxuICAgICAgICAgLSB1c2VDYXB0dXJlIChib29sZWFuKSAjb3B0aW9uYWwgdXNlQ2FwdHVyZSBmbGFnIGZvciByZW1vdmVFdmVudExpc3RlbmVyXG4gICAgICAgICA9IChvYmplY3QpIFRoaXMgSW50ZXJhY3RhYmxlXG4gICAgICAgIFxcKi9cbiAgICAgICAgb2ZmOiBmdW5jdGlvbiAoZXZlbnRUeXBlLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSkge1xuICAgICAgICAgICAgdmFyIGk7XG5cbiAgICAgICAgICAgIGlmIChpc1N0cmluZyhldmVudFR5cGUpICYmIGV2ZW50VHlwZS5zZWFyY2goJyAnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBldmVudFR5cGUgPSBldmVudFR5cGUudHJpbSgpLnNwbGl0KC8gKy8pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNBcnJheShldmVudFR5cGUpKSB7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGV2ZW50VHlwZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9mZihldmVudFR5cGVbaV0sIGxpc3RlbmVyLCB1c2VDYXB0dXJlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGV2ZW50VHlwZSkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIGV2ZW50VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9mZihwcm9wLCBldmVudFR5cGVbcHJvcF0sIGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGV2ZW50TGlzdCxcbiAgICAgICAgICAgICAgICBpbmRleCA9IC0xO1xuXG4gICAgICAgICAgICAvLyBjb252ZXJ0IHRvIGJvb2xlYW5cbiAgICAgICAgICAgIHVzZUNhcHR1cmUgPSB1c2VDYXB0dXJlPyB0cnVlOiBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKGV2ZW50VHlwZSA9PT0gJ3doZWVsJykge1xuICAgICAgICAgICAgICAgIGV2ZW50VHlwZSA9IHdoZWVsRXZlbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIGl0IGlzIGFuIGFjdGlvbiBldmVudCB0eXBlXG4gICAgICAgICAgICBpZiAoY29udGFpbnMoZXZlbnRUeXBlcywgZXZlbnRUeXBlKSkge1xuICAgICAgICAgICAgICAgIGV2ZW50TGlzdCA9IHRoaXMuX2lFdmVudHNbZXZlbnRUeXBlXTtcblxuICAgICAgICAgICAgICAgIGlmIChldmVudExpc3QgJiYgKGluZGV4ID0gaW5kZXhPZihldmVudExpc3QsIGxpc3RlbmVyKSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lFdmVudHNbZXZlbnRUeXBlXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGRlbGVnYXRlZCBldmVudFxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHZhciBkZWxlZ2F0ZWQgPSBkZWxlZ2F0ZWRFdmVudHNbZXZlbnRUeXBlXSxcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hGb3VuZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFkZWxlZ2F0ZWQpIHsgcmV0dXJuIHRoaXM7IH1cblxuICAgICAgICAgICAgICAgIC8vIGNvdW50IGZyb20gbGFzdCBpbmRleCBvZiBkZWxlZ2F0ZWQgdG8gMFxuICAgICAgICAgICAgICAgIGZvciAoaW5kZXggPSBkZWxlZ2F0ZWQuc2VsZWN0b3JzLmxlbmd0aCAtIDE7IGluZGV4ID49IDA7IGluZGV4LS0pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbG9vayBmb3IgbWF0Y2hpbmcgc2VsZWN0b3IgYW5kIGNvbnRleHQgTm9kZVxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVsZWdhdGVkLnNlbGVjdG9yc1tpbmRleF0gPT09IHRoaXMuc2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIGRlbGVnYXRlZC5jb250ZXh0c1tpbmRleF0gPT09IHRoaXMuX2NvbnRleHQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IGRlbGVnYXRlZC5saXN0ZW5lcnNbaW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlYWNoIGl0ZW0gb2YgdGhlIGxpc3RlbmVycyBhcnJheSBpcyBhbiBhcnJheTogW2Z1bmN0aW9uLCB1c2VDYXB0dXJlRmxhZ11cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmbiA9IGxpc3RlbmVyc1tpXVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlQ2FwID0gbGlzdGVuZXJzW2ldWzFdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGxpc3RlbmVyIGZ1bmN0aW9ucyBhbmQgdXNlQ2FwdHVyZSBmbGFncyBtYXRjaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmbiA9PT0gbGlzdGVuZXIgJiYgdXNlQ2FwID09PSB1c2VDYXB0dXJlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgbGlzdGVuZXIgZnJvbSB0aGUgYXJyYXkgb2YgbGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgYWxsIGxpc3RlbmVycyBmb3IgdGhpcyBpbnRlcmFjdGFibGUgaGF2ZSBiZWVuIHJlbW92ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBpbnRlcmFjdGFibGUgZnJvbSB0aGUgZGVsZWdhdGVkIGFycmF5c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGVnYXRlZC5zZWxlY3RvcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGVnYXRlZC5jb250ZXh0cyAuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGVnYXRlZC5saXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGRlbGVnYXRlIGZ1bmN0aW9uIGZyb20gY29udGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzLnJlbW92ZSh0aGlzLl9jb250ZXh0LCBldmVudFR5cGUsIGRlbGVnYXRlTGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzLnJlbW92ZSh0aGlzLl9jb250ZXh0LCBldmVudFR5cGUsIGRlbGVnYXRlVXNlQ2FwdHVyZSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgYXJyYXlzIGlmIHRoZXkgYXJlIGVtcHR5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRlbGVnYXRlZC5zZWxlY3RvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZWdhdGVkRXZlbnRzW2V2ZW50VHlwZV0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb25seSByZW1vdmUgb25lIGxpc3RlbmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoRm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaEZvdW5kKSB7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyByZW1vdmUgbGlzdGVuZXIgZnJvbSB0aGlzIEludGVyYXRhYmxlJ3MgZWxlbWVudFxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZXZlbnRzLnJlbW92ZSh0aGlzLl9lbGVtZW50LCBldmVudFR5cGUsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLypcXFxuICAgICAgICAgKiBJbnRlcmFjdGFibGUuc2V0XG4gICAgICAgICBbIG1ldGhvZCBdXG4gICAgICAgICAqXG4gICAgICAgICAqIFJlc2V0IHRoZSBvcHRpb25zIG9mIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAgICAgICAtIG9wdGlvbnMgKG9iamVjdCkgVGhlIG5ldyBzZXR0aW5ncyB0byBhcHBseVxuICAgICAgICAgPSAob2JqZWN0KSBUaGlzIEludGVyYWN0YWJsZVxuICAgICAgICBcXCovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmICghaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IGV4dGVuZCh7fSwgZGVmYXVsdE9wdGlvbnMuYmFzZSk7XG5cbiAgICAgICAgICAgIHZhciBpLFxuICAgICAgICAgICAgICAgIGFjdGlvbnMgPSBbJ2RyYWcnLCAnZHJvcCcsICdyZXNpemUnLCAnZ2VzdHVyZSddLFxuICAgICAgICAgICAgICAgIG1ldGhvZHMgPSBbJ2RyYWdnYWJsZScsICdkcm9wem9uZScsICdyZXNpemFibGUnLCAnZ2VzdHVyYWJsZSddLFxuICAgICAgICAgICAgICAgIHBlckFjdGlvbnMgPSBleHRlbmQoZXh0ZW5kKHt9LCBkZWZhdWx0T3B0aW9ucy5wZXJBY3Rpb24pLCBvcHRpb25zW2FjdGlvbl0gfHwge30pO1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSBhY3Rpb25zW2ldO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zW2FjdGlvbl0gPSBleHRlbmQoe30sIGRlZmF1bHRPcHRpb25zW2FjdGlvbl0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQZXJBY3Rpb24oYWN0aW9uLCBwZXJBY3Rpb25zKTtcblxuICAgICAgICAgICAgICAgIHRoaXNbbWV0aG9kc1tpXV0ob3B0aW9uc1thY3Rpb25dKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHNldHRpbmdzID0gW1xuICAgICAgICAgICAgICAgICAgICAnYWNjZXB0JywgJ2FjdGlvbkNoZWNrZXInLCAnYWxsb3dGcm9tJywgJ2RlbHRhU291cmNlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2Ryb3BDaGVja2VyJywgJ2lnbm9yZUZyb20nLCAnb3JpZ2luJywgJ3ByZXZlbnREZWZhdWx0JyxcbiAgICAgICAgICAgICAgICAgICAgJ3JlY3RDaGVja2VyJywgJ3N0eWxlQ3Vyc29yJ1xuICAgICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHNldHRpbmdzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNldHRpbmcgPSBzZXR0aW5nc1tpXTtcblxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1tzZXR0aW5nXSA9IGRlZmF1bHRPcHRpb25zLmJhc2Vbc2V0dGluZ107XG5cbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZyBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbc2V0dGluZ10ob3B0aW9uc1tzZXR0aW5nXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKlxcXG4gICAgICAgICAqIEludGVyYWN0YWJsZS51bnNldFxuICAgICAgICAgWyBtZXRob2QgXVxuICAgICAgICAgKlxuICAgICAgICAgKiBSZW1vdmUgdGhpcyBpbnRlcmFjdGFibGUgZnJvbSB0aGUgbGlzdCBvZiBpbnRlcmFjdGFibGVzIGFuZCByZW1vdmVcbiAgICAgICAgICogaXQncyBkcmFnLCBkcm9wLCByZXNpemUgYW5kIGdlc3R1cmUgY2FwYWJpbGl0aWVzXG4gICAgICAgICAqXG4gICAgICAgICA9IChvYmplY3QpIEBpbnRlcmFjdFxuICAgICAgICBcXCovXG4gICAgICAgIHVuc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBldmVudHMucmVtb3ZlKHRoaXMuX2VsZW1lbnQsICdhbGwnKTtcblxuICAgICAgICAgICAgaWYgKCFpc1N0cmluZyh0aGlzLnNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgIGV2ZW50cy5yZW1vdmUodGhpcywgJ2FsbCcpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc3R5bGVDdXJzb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgZGVsZWdhdGVkIGV2ZW50c1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHR5cGUgaW4gZGVsZWdhdGVkRXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWxlZ2F0ZWQgPSBkZWxlZ2F0ZWRFdmVudHNbdHlwZV07XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZWxlZ2F0ZWQuc2VsZWN0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVsZWdhdGVkLnNlbGVjdG9yc1tpXSA9PT0gdGhpcy5zZWxlY3RvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIGRlbGVnYXRlZC5jb250ZXh0c1tpXSA9PT0gdGhpcy5fY29udGV4dCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZWdhdGVkLnNlbGVjdG9ycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZWdhdGVkLmNvbnRleHRzIC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZWdhdGVkLmxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGhlIGFycmF5cyBpZiB0aGV5IGFyZSBlbXB0eVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGVsZWdhdGVkLnNlbGVjdG9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZWdhdGVkRXZlbnRzW3R5cGVdID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5yZW1vdmUodGhpcy5fY29udGV4dCwgdHlwZSwgZGVsZWdhdGVMaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudHMucmVtb3ZlKHRoaXMuX2NvbnRleHQsIHR5cGUsIGRlbGVnYXRlVXNlQ2FwdHVyZSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmRyb3B6b25lKGZhbHNlKTtcblxuICAgICAgICAgICAgaW50ZXJhY3RhYmxlcy5zcGxpY2UoaW5kZXhPZihpbnRlcmFjdGFibGVzLCB0aGlzKSwgMSk7XG5cbiAgICAgICAgICAgIHJldHVybiBpbnRlcmFjdDtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiB3YXJuT25jZSAobWV0aG9kLCBtZXNzYWdlKSB7XG4gICAgICAgIHZhciB3YXJuZWQgPSBmYWxzZTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF3YXJuZWQpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHdhcm5lZCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBtZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBJbnRlcmFjdGFibGUucHJvdG90eXBlLnNuYXAgPSB3YXJuT25jZShJbnRlcmFjdGFibGUucHJvdG90eXBlLnNuYXAsXG4gICAgICAgICAnSW50ZXJhY3RhYmxlI3NuYXAgaXMgZGVwcmVjYXRlZC4gU2VlIHRoZSBuZXcgZG9jdW1lbnRhdGlvbiBmb3Igc25hcHBpbmcgYXQgaHR0cDovL2ludGVyYWN0anMuaW8vZG9jcy9zbmFwcGluZycpO1xuICAgIEludGVyYWN0YWJsZS5wcm90b3R5cGUucmVzdHJpY3QgPSB3YXJuT25jZShJbnRlcmFjdGFibGUucHJvdG90eXBlLnJlc3RyaWN0LFxuICAgICAgICAgJ0ludGVyYWN0YWJsZSNyZXN0cmljdCBpcyBkZXByZWNhdGVkLiBTZWUgdGhlIG5ldyBkb2N1bWVudGF0aW9uIGZvciByZXN0aWN0aW5nIGF0IGh0dHA6Ly9pbnRlcmFjdGpzLmlvL2RvY3MvcmVzdHJpY3Rpb24nKTtcbiAgICBJbnRlcmFjdGFibGUucHJvdG90eXBlLmluZXJ0aWEgPSB3YXJuT25jZShJbnRlcmFjdGFibGUucHJvdG90eXBlLmluZXJ0aWEsXG4gICAgICAgICAnSW50ZXJhY3RhYmxlI2luZXJ0aWEgaXMgZGVwcmVjYXRlZC4gU2VlIHRoZSBuZXcgZG9jdW1lbnRhdGlvbiBmb3IgaW5lcnRpYSBhdCBodHRwOi8vaW50ZXJhY3Rqcy5pby9kb2NzL2luZXJ0aWEnKTtcbiAgICBJbnRlcmFjdGFibGUucHJvdG90eXBlLmF1dG9TY3JvbGwgPSB3YXJuT25jZShJbnRlcmFjdGFibGUucHJvdG90eXBlLmF1dG9TY3JvbGwsXG4gICAgICAgICAnSW50ZXJhY3RhYmxlI2F1dG9TY3JvbGwgaXMgZGVwcmVjYXRlZC4gU2VlIHRoZSBuZXcgZG9jdW1lbnRhdGlvbiBmb3IgYXV0b1Njcm9sbCBhdCBodHRwOi8vaW50ZXJhY3Rqcy5pby9kb2NzLyNhdXRvc2Nyb2xsJyk7XG4gICAgSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5zcXVhcmVSZXNpemUgPSB3YXJuT25jZShJbnRlcmFjdGFibGUucHJvdG90eXBlLnNxdWFyZVJlc2l6ZSxcbiAgICAgICAgICdJbnRlcmFjdGFibGUjc3F1YXJlUmVzaXplIGlzIGRlcHJlY2F0ZWQuIFNlZSBodHRwOi8vaW50ZXJhY3Rqcy5pby9kb2NzLyNyZXNpemUtc3F1YXJlJyk7XG5cbiAgICBJbnRlcmFjdGFibGUucHJvdG90eXBlLmFjY2VwdCA9IHdhcm5PbmNlKEludGVyYWN0YWJsZS5wcm90b3R5cGUuYWNjZXB0LFxuICAgICAgICAgJ0ludGVyYWN0YWJsZSNhY2NlcHQgaXMgZGVwcmVjYXRlZC4gdXNlIEludGVyYWN0YWJsZSNkcm9wem9uZSh7IGFjY2VwdDogdGFyZ2V0IH0pIGluc3RlYWQnKTtcbiAgICBJbnRlcmFjdGFibGUucHJvdG90eXBlLmRyb3BDaGVja2VyID0gd2Fybk9uY2UoSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5kcm9wQ2hlY2tlcixcbiAgICAgICAgICdJbnRlcmFjdGFibGUjZHJvcENoZWNrZXIgaXMgZGVwcmVjYXRlZC4gdXNlIEludGVyYWN0YWJsZSNkcm9wem9uZSh7IGRyb3BDaGVja2VyOiBjaGVja2VyRnVuY3Rpb24gfSkgaW5zdGVhZCcpO1xuICAgIEludGVyYWN0YWJsZS5wcm90b3R5cGUuY29udGV4dCA9IHdhcm5PbmNlKEludGVyYWN0YWJsZS5wcm90b3R5cGUuY29udGV4dCxcbiAgICAgICAgICdJbnRlcmFjdGFibGUjY29udGV4dCBhcyBhIG1ldGhvZCBpcyBkZXByZWNhdGVkLiBJdCB3aWxsIHNvb24gYmUgYSBET00gTm9kZSBpbnN0ZWFkJyk7XG5cbiAgICAvKlxcXG4gICAgICogaW50ZXJhY3QuaXNTZXRcbiAgICAgWyBtZXRob2QgXVxuICAgICAqXG4gICAgICogQ2hlY2sgaWYgYW4gZWxlbWVudCBoYXMgYmVlbiBzZXRcbiAgICAgLSBlbGVtZW50IChFbGVtZW50KSBUaGUgRWxlbWVudCBiZWluZyBzZWFyY2hlZCBmb3JcbiAgICAgPSAoYm9vbGVhbikgSW5kaWNhdGVzIGlmIHRoZSBlbGVtZW50IG9yIENTUyBzZWxlY3RvciB3YXMgcHJldmlvdXNseSBwYXNzZWQgdG8gaW50ZXJhY3RcbiAgICBcXCovXG4gICAgaW50ZXJhY3QuaXNTZXQgPSBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBpbnRlcmFjdGFibGVzLmluZGV4T2ZFbGVtZW50KGVsZW1lbnQsIG9wdGlvbnMgJiYgb3B0aW9ucy5jb250ZXh0KSAhPT0gLTE7XG4gICAgfTtcblxuICAgIC8qXFxcbiAgICAgKiBpbnRlcmFjdC5vblxuICAgICBbIG1ldGhvZCBdXG4gICAgICpcbiAgICAgKiBBZGRzIGEgZ2xvYmFsIGxpc3RlbmVyIGZvciBhbiBJbnRlcmFjdEV2ZW50IG9yIGFkZHMgYSBET00gZXZlbnQgdG9cbiAgICAgKiBgZG9jdW1lbnRgXG4gICAgICpcbiAgICAgLSB0eXBlICAgICAgIChzdHJpbmcgfCBhcnJheSB8IG9iamVjdCkgVGhlIHR5cGVzIG9mIGV2ZW50cyB0byBsaXN0ZW4gZm9yXG4gICAgIC0gbGlzdGVuZXIgICAoZnVuY3Rpb24pIFRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgb24gdGhlIGdpdmVuIGV2ZW50KHMpXG4gICAgIC0gdXNlQ2FwdHVyZSAoYm9vbGVhbikgI29wdGlvbmFsIHVzZUNhcHR1cmUgZmxhZyBmb3IgYWRkRXZlbnRMaXN0ZW5lclxuICAgICA9IChvYmplY3QpIGludGVyYWN0XG4gICAgXFwqL1xuICAgIGludGVyYWN0Lm9uID0gZnVuY3Rpb24gKHR5cGUsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKSB7XG4gICAgICAgIGlmIChpc1N0cmluZyh0eXBlKSAmJiB0eXBlLnNlYXJjaCgnICcpICE9PSAtMSkge1xuICAgICAgICAgICAgdHlwZSA9IHR5cGUudHJpbSgpLnNwbGl0KC8gKy8pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQXJyYXkodHlwZSkpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGludGVyYWN0Lm9uKHR5cGVbaV0sIGxpc3RlbmVyLCB1c2VDYXB0dXJlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzT2JqZWN0KHR5cGUpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIHR5cGUpIHtcbiAgICAgICAgICAgICAgICBpbnRlcmFjdC5vbihwcm9wLCB0eXBlW3Byb3BdLCBsaXN0ZW5lcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBpbnRlcmFjdDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIGl0IGlzIGFuIEludGVyYWN0RXZlbnQgdHlwZSwgYWRkIGxpc3RlbmVyIHRvIGdsb2JhbEV2ZW50c1xuICAgICAgICBpZiAoY29udGFpbnMoZXZlbnRUeXBlcywgdHlwZSkpIHtcbiAgICAgICAgICAgIC8vIGlmIHRoaXMgdHlwZSBvZiBldmVudCB3YXMgbmV2ZXIgYm91bmRcbiAgICAgICAgICAgIGlmICghZ2xvYmFsRXZlbnRzW3R5cGVdKSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFsRXZlbnRzW3R5cGVdID0gW2xpc3RlbmVyXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdsb2JhbEV2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBub24gSW50ZXJhY3RFdmVudCB0eXBlLCBhZGRFdmVudExpc3RlbmVyIHRvIGRvY3VtZW50XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXZlbnRzLmFkZChkb2N1bWVudCwgdHlwZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGludGVyYWN0O1xuICAgIH07XG5cbiAgICAvKlxcXG4gICAgICogaW50ZXJhY3Qub2ZmXG4gICAgIFsgbWV0aG9kIF1cbiAgICAgKlxuICAgICAqIFJlbW92ZXMgYSBnbG9iYWwgSW50ZXJhY3RFdmVudCBsaXN0ZW5lciBvciBET00gZXZlbnQgZnJvbSBgZG9jdW1lbnRgXG4gICAgICpcbiAgICAgLSB0eXBlICAgICAgIChzdHJpbmcgfCBhcnJheSB8IG9iamVjdCkgVGhlIHR5cGVzIG9mIGV2ZW50cyB0aGF0IHdlcmUgbGlzdGVuZWQgZm9yXG4gICAgIC0gbGlzdGVuZXIgICAoZnVuY3Rpb24pIFRoZSBsaXN0ZW5lciBmdW5jdGlvbiB0byBiZSByZW1vdmVkXG4gICAgIC0gdXNlQ2FwdHVyZSAoYm9vbGVhbikgI29wdGlvbmFsIHVzZUNhcHR1cmUgZmxhZyBmb3IgcmVtb3ZlRXZlbnRMaXN0ZW5lclxuICAgICA9IChvYmplY3QpIGludGVyYWN0XG4gICAgIFxcKi9cbiAgICBpbnRlcmFjdC5vZmYgPSBmdW5jdGlvbiAodHlwZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpIHtcbiAgICAgICAgaWYgKGlzU3RyaW5nKHR5cGUpICYmIHR5cGUuc2VhcmNoKCcgJykgIT09IC0xKSB7XG4gICAgICAgICAgICB0eXBlID0gdHlwZS50cmltKCkuc3BsaXQoLyArLyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNBcnJheSh0eXBlKSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaW50ZXJhY3Qub2ZmKHR5cGVbaV0sIGxpc3RlbmVyLCB1c2VDYXB0dXJlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzT2JqZWN0KHR5cGUpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIHR5cGUpIHtcbiAgICAgICAgICAgICAgICBpbnRlcmFjdC5vZmYocHJvcCwgdHlwZVtwcm9wXSwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Q7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWNvbnRhaW5zKGV2ZW50VHlwZXMsIHR5cGUpKSB7XG4gICAgICAgICAgICBldmVudHMucmVtb3ZlKGRvY3VtZW50LCB0eXBlLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgaW5kZXg7XG5cbiAgICAgICAgICAgIGlmICh0eXBlIGluIGdsb2JhbEV2ZW50c1xuICAgICAgICAgICAgICAgICYmIChpbmRleCA9IGluZGV4T2YoZ2xvYmFsRXZlbnRzW3R5cGVdLCBsaXN0ZW5lcikpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGdsb2JhbEV2ZW50c1t0eXBlXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGludGVyYWN0O1xuICAgIH07XG5cbiAgICAvKlxcXG4gICAgICogaW50ZXJhY3QuZW5hYmxlRHJhZ2dpbmdcbiAgICAgWyBtZXRob2QgXVxuICAgICAqXG4gICAgICogRGVwcmVjYXRlZC5cbiAgICAgKlxuICAgICAqIFJldHVybnMgb3Igc2V0cyB3aGV0aGVyIGRyYWdnaW5nIGlzIGVuYWJsZWQgZm9yIGFueSBJbnRlcmFjdGFibGVzXG4gICAgICpcbiAgICAgLSBuZXdWYWx1ZSAoYm9vbGVhbikgI29wdGlvbmFsIGB0cnVlYCB0byBhbGxvdyB0aGUgYWN0aW9uOyBgZmFsc2VgIHRvIGRpc2FibGUgYWN0aW9uIGZvciBhbGwgSW50ZXJhY3RhYmxlc1xuICAgICA9IChib29sZWFuIHwgb2JqZWN0KSBUaGUgY3VycmVudCBzZXR0aW5nIG9yIGludGVyYWN0XG4gICAgXFwqL1xuICAgIGludGVyYWN0LmVuYWJsZURyYWdnaW5nID0gd2Fybk9uY2UoZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gbnVsbCAmJiBuZXdWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhY3Rpb25Jc0VuYWJsZWQuZHJhZyA9IG5ld1ZhbHVlO1xuXG4gICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Q7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjdGlvbklzRW5hYmxlZC5kcmFnO1xuICAgIH0sICdpbnRlcmFjdC5lbmFibGVEcmFnZ2luZyBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIHNvb24gYmUgcmVtb3ZlZC4nKTtcblxuICAgIC8qXFxcbiAgICAgKiBpbnRlcmFjdC5lbmFibGVSZXNpemluZ1xuICAgICBbIG1ldGhvZCBdXG4gICAgICpcbiAgICAgKiBEZXByZWNhdGVkLlxuICAgICAqXG4gICAgICogUmV0dXJucyBvciBzZXRzIHdoZXRoZXIgcmVzaXppbmcgaXMgZW5hYmxlZCBmb3IgYW55IEludGVyYWN0YWJsZXNcbiAgICAgKlxuICAgICAtIG5ld1ZhbHVlIChib29sZWFuKSAjb3B0aW9uYWwgYHRydWVgIHRvIGFsbG93IHRoZSBhY3Rpb247IGBmYWxzZWAgdG8gZGlzYWJsZSBhY3Rpb24gZm9yIGFsbCBJbnRlcmFjdGFibGVzXG4gICAgID0gKGJvb2xlYW4gfCBvYmplY3QpIFRoZSBjdXJyZW50IHNldHRpbmcgb3IgaW50ZXJhY3RcbiAgICBcXCovXG4gICAgaW50ZXJhY3QuZW5hYmxlUmVzaXppbmcgPSB3YXJuT25jZShmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBudWxsICYmIG5ld1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGFjdGlvbklzRW5hYmxlZC5yZXNpemUgPSBuZXdWYWx1ZTtcblxuICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY3Rpb25Jc0VuYWJsZWQucmVzaXplO1xuICAgIH0sICdpbnRlcmFjdC5lbmFibGVSZXNpemluZyBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIHNvb24gYmUgcmVtb3ZlZC4nKTtcblxuICAgIC8qXFxcbiAgICAgKiBpbnRlcmFjdC5lbmFibGVHZXN0dXJpbmdcbiAgICAgWyBtZXRob2QgXVxuICAgICAqXG4gICAgICogRGVwcmVjYXRlZC5cbiAgICAgKlxuICAgICAqIFJldHVybnMgb3Igc2V0cyB3aGV0aGVyIGdlc3R1cmluZyBpcyBlbmFibGVkIGZvciBhbnkgSW50ZXJhY3RhYmxlc1xuICAgICAqXG4gICAgIC0gbmV3VmFsdWUgKGJvb2xlYW4pICNvcHRpb25hbCBgdHJ1ZWAgdG8gYWxsb3cgdGhlIGFjdGlvbjsgYGZhbHNlYCB0byBkaXNhYmxlIGFjdGlvbiBmb3IgYWxsIEludGVyYWN0YWJsZXNcbiAgICAgPSAoYm9vbGVhbiB8IG9iamVjdCkgVGhlIGN1cnJlbnQgc2V0dGluZyBvciBpbnRlcmFjdFxuICAgIFxcKi9cbiAgICBpbnRlcmFjdC5lbmFibGVHZXN0dXJpbmcgPSB3YXJuT25jZShmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBudWxsICYmIG5ld1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGFjdGlvbklzRW5hYmxlZC5nZXN0dXJlID0gbmV3VmFsdWU7XG5cbiAgICAgICAgICAgIHJldHVybiBpbnRlcmFjdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWN0aW9uSXNFbmFibGVkLmdlc3R1cmU7XG4gICAgfSwgJ2ludGVyYWN0LmVuYWJsZUdlc3R1cmluZyBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIHNvb24gYmUgcmVtb3ZlZC4nKTtcblxuICAgIGludGVyYWN0LmV2ZW50VHlwZXMgPSBldmVudFR5cGVzO1xuXG4gICAgLypcXFxuICAgICAqIGludGVyYWN0LmRlYnVnXG4gICAgIFsgbWV0aG9kIF1cbiAgICAgKlxuICAgICAqIFJldHVybnMgZGVidWdnaW5nIGRhdGFcbiAgICAgPSAob2JqZWN0KSBBbiBvYmplY3Qgd2l0aCBwcm9wZXJ0aWVzIHRoYXQgb3V0bGluZSB0aGUgY3VycmVudCBzdGF0ZSBhbmQgZXhwb3NlIGludGVybmFsIGZ1bmN0aW9ucyBhbmQgdmFyaWFibGVzXG4gICAgXFwqL1xuICAgIGludGVyYWN0LmRlYnVnID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaW50ZXJhY3Rpb24gPSBpbnRlcmFjdGlvbnNbMF0gfHwgbmV3IEludGVyYWN0aW9uKCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGludGVyYWN0aW9ucyAgICAgICAgICA6IGludGVyYWN0aW9ucyxcbiAgICAgICAgICAgIHRhcmdldCAgICAgICAgICAgICAgICA6IGludGVyYWN0aW9uLnRhcmdldCxcbiAgICAgICAgICAgIGRyYWdnaW5nICAgICAgICAgICAgICA6IGludGVyYWN0aW9uLmRyYWdnaW5nLFxuICAgICAgICAgICAgcmVzaXppbmcgICAgICAgICAgICAgIDogaW50ZXJhY3Rpb24ucmVzaXppbmcsXG4gICAgICAgICAgICBnZXN0dXJpbmcgICAgICAgICAgICAgOiBpbnRlcmFjdGlvbi5nZXN0dXJpbmcsXG4gICAgICAgICAgICBwcmVwYXJlZCAgICAgICAgICAgICAgOiBpbnRlcmFjdGlvbi5wcmVwYXJlZCxcbiAgICAgICAgICAgIG1hdGNoZXMgICAgICAgICAgICAgICA6IGludGVyYWN0aW9uLm1hdGNoZXMsXG4gICAgICAgICAgICBtYXRjaEVsZW1lbnRzICAgICAgICAgOiBpbnRlcmFjdGlvbi5tYXRjaEVsZW1lbnRzLFxuXG4gICAgICAgICAgICBwcmV2Q29vcmRzICAgICAgICAgICAgOiBpbnRlcmFjdGlvbi5wcmV2Q29vcmRzLFxuICAgICAgICAgICAgc3RhcnRDb29yZHMgICAgICAgICAgIDogaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMsXG5cbiAgICAgICAgICAgIHBvaW50ZXJJZHMgICAgICAgICAgICA6IGludGVyYWN0aW9uLnBvaW50ZXJJZHMsXG4gICAgICAgICAgICBwb2ludGVycyAgICAgICAgICAgICAgOiBpbnRlcmFjdGlvbi5wb2ludGVycyxcbiAgICAgICAgICAgIGFkZFBvaW50ZXIgICAgICAgICAgICA6IGxpc3RlbmVycy5hZGRQb2ludGVyLFxuICAgICAgICAgICAgcmVtb3ZlUG9pbnRlciAgICAgICAgIDogbGlzdGVuZXJzLnJlbW92ZVBvaW50ZXIsXG4gICAgICAgICAgICByZWNvcmRQb2ludGVyICAgICAgICA6IGxpc3RlbmVycy5yZWNvcmRQb2ludGVyLFxuXG4gICAgICAgICAgICBzbmFwICAgICAgICAgICAgICAgICAgOiBpbnRlcmFjdGlvbi5zbmFwU3RhdHVzLFxuICAgICAgICAgICAgcmVzdHJpY3QgICAgICAgICAgICAgIDogaW50ZXJhY3Rpb24ucmVzdHJpY3RTdGF0dXMsXG4gICAgICAgICAgICBpbmVydGlhICAgICAgICAgICAgICAgOiBpbnRlcmFjdGlvbi5pbmVydGlhU3RhdHVzLFxuXG4gICAgICAgICAgICBkb3duVGltZSAgICAgICAgICAgICAgOiBpbnRlcmFjdGlvbi5kb3duVGltZXNbMF0sXG4gICAgICAgICAgICBkb3duRXZlbnQgICAgICAgICAgICAgOiBpbnRlcmFjdGlvbi5kb3duRXZlbnQsXG4gICAgICAgICAgICBkb3duUG9pbnRlciAgICAgICAgICAgOiBpbnRlcmFjdGlvbi5kb3duUG9pbnRlcixcbiAgICAgICAgICAgIHByZXZFdmVudCAgICAgICAgICAgICA6IGludGVyYWN0aW9uLnByZXZFdmVudCxcblxuICAgICAgICAgICAgSW50ZXJhY3RhYmxlICAgICAgICAgIDogSW50ZXJhY3RhYmxlLFxuICAgICAgICAgICAgaW50ZXJhY3RhYmxlcyAgICAgICAgIDogaW50ZXJhY3RhYmxlcyxcbiAgICAgICAgICAgIHBvaW50ZXJJc0Rvd24gICAgICAgICA6IGludGVyYWN0aW9uLnBvaW50ZXJJc0Rvd24sXG4gICAgICAgICAgICBkZWZhdWx0T3B0aW9ucyAgICAgICAgOiBkZWZhdWx0T3B0aW9ucyxcbiAgICAgICAgICAgIGRlZmF1bHRBY3Rpb25DaGVja2VyICA6IGRlZmF1bHRBY3Rpb25DaGVja2VyLFxuXG4gICAgICAgICAgICBhY3Rpb25DdXJzb3JzICAgICAgICAgOiBhY3Rpb25DdXJzb3JzLFxuICAgICAgICAgICAgZHJhZ01vdmUgICAgICAgICAgICAgIDogbGlzdGVuZXJzLmRyYWdNb3ZlLFxuICAgICAgICAgICAgcmVzaXplTW92ZSAgICAgICAgICAgIDogbGlzdGVuZXJzLnJlc2l6ZU1vdmUsXG4gICAgICAgICAgICBnZXN0dXJlTW92ZSAgICAgICAgICAgOiBsaXN0ZW5lcnMuZ2VzdHVyZU1vdmUsXG4gICAgICAgICAgICBwb2ludGVyVXAgICAgICAgICAgICAgOiBsaXN0ZW5lcnMucG9pbnRlclVwLFxuICAgICAgICAgICAgcG9pbnRlckRvd24gICAgICAgICAgIDogbGlzdGVuZXJzLnBvaW50ZXJEb3duLFxuICAgICAgICAgICAgcG9pbnRlck1vdmUgICAgICAgICAgIDogbGlzdGVuZXJzLnBvaW50ZXJNb3ZlLFxuICAgICAgICAgICAgcG9pbnRlckhvdmVyICAgICAgICAgIDogbGlzdGVuZXJzLnBvaW50ZXJIb3ZlcixcblxuICAgICAgICAgICAgZXZlbnRUeXBlcyAgICAgICAgICAgIDogZXZlbnRUeXBlcyxcblxuICAgICAgICAgICAgZXZlbnRzICAgICAgICAgICAgICAgIDogZXZlbnRzLFxuICAgICAgICAgICAgZ2xvYmFsRXZlbnRzICAgICAgICAgIDogZ2xvYmFsRXZlbnRzLFxuICAgICAgICAgICAgZGVsZWdhdGVkRXZlbnRzICAgICAgIDogZGVsZWdhdGVkRXZlbnRzLFxuXG4gICAgICAgICAgICBwcmVmaXhlZFByb3BSRXMgICAgICAgOiBwcmVmaXhlZFByb3BSRXNcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgLy8gZXhwb3NlIHRoZSBmdW5jdGlvbnMgdXNlZCB0byBjYWxjdWxhdGUgbXVsdGktdG91Y2ggcHJvcGVydGllc1xuICAgIGludGVyYWN0LmdldFBvaW50ZXJBdmVyYWdlID0gcG9pbnRlckF2ZXJhZ2U7XG4gICAgaW50ZXJhY3QuZ2V0VG91Y2hCQm94ICAgICA9IHRvdWNoQkJveDtcbiAgICBpbnRlcmFjdC5nZXRUb3VjaERpc3RhbmNlID0gdG91Y2hEaXN0YW5jZTtcbiAgICBpbnRlcmFjdC5nZXRUb3VjaEFuZ2xlICAgID0gdG91Y2hBbmdsZTtcblxuICAgIGludGVyYWN0LmdldEVsZW1lbnRSZWN0ICAgICAgICAgPSBnZXRFbGVtZW50UmVjdDtcbiAgICBpbnRlcmFjdC5nZXRFbGVtZW50Q2xpZW50UmVjdCAgID0gZ2V0RWxlbWVudENsaWVudFJlY3Q7XG4gICAgaW50ZXJhY3QubWF0Y2hlc1NlbGVjdG9yICAgICAgICA9IG1hdGNoZXNTZWxlY3RvcjtcbiAgICBpbnRlcmFjdC5jbG9zZXN0ICAgICAgICAgICAgICAgID0gY2xvc2VzdDtcblxuICAgIC8qXFxcbiAgICAgKiBpbnRlcmFjdC5tYXJnaW5cbiAgICAgWyBtZXRob2QgXVxuICAgICAqXG4gICAgICogRGVwcmVjYXRlZC4gVXNlIGBpbnRlcmFjdCh0YXJnZXQpLnJlc2l6YWJsZSh7IG1hcmdpbjogbnVtYmVyIH0pO2AgaW5zdGVhZC5cbiAgICAgKiBSZXR1cm5zIG9yIHNldHMgdGhlIG1hcmdpbiBmb3IgYXV0b2NoZWNrIHJlc2l6aW5nIHVzZWQgaW5cbiAgICAgKiBASW50ZXJhY3RhYmxlLmdldEFjdGlvbi4gVGhhdCBpcyB0aGUgZGlzdGFuY2UgZnJvbSB0aGUgYm90dG9tIGFuZCByaWdodFxuICAgICAqIGVkZ2VzIG9mIGFuIGVsZW1lbnQgY2xpY2tpbmcgaW4gd2hpY2ggd2lsbCBzdGFydCByZXNpemluZ1xuICAgICAqXG4gICAgIC0gbmV3VmFsdWUgKG51bWJlcikgI29wdGlvbmFsXG4gICAgID0gKG51bWJlciB8IGludGVyYWN0KSBUaGUgY3VycmVudCBtYXJnaW4gdmFsdWUgb3IgaW50ZXJhY3RcbiAgICBcXCovXG4gICAgaW50ZXJhY3QubWFyZ2luID0gd2Fybk9uY2UoZnVuY3Rpb24gKG5ld3ZhbHVlKSB7XG4gICAgICAgIGlmIChpc051bWJlcihuZXd2YWx1ZSkpIHtcbiAgICAgICAgICAgIG1hcmdpbiA9IG5ld3ZhbHVlO1xuXG4gICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Q7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hcmdpbjtcbiAgICB9LFxuICAgICdpbnRlcmFjdC5tYXJnaW4gaXMgZGVwcmVjYXRlZC4gVXNlIGludGVyYWN0KHRhcmdldCkucmVzaXphYmxlKHsgbWFyZ2luOiBudW1iZXIgfSk7IGluc3RlYWQuJykgO1xuXG4gICAgLypcXFxuICAgICAqIGludGVyYWN0LnN1cHBvcnRzVG91Y2hcbiAgICAgWyBtZXRob2QgXVxuICAgICAqXG4gICAgID0gKGJvb2xlYW4pIFdoZXRoZXIgb3Igbm90IHRoZSBicm93c2VyIHN1cHBvcnRzIHRvdWNoIGlucHV0XG4gICAgXFwqL1xuICAgIGludGVyYWN0LnN1cHBvcnRzVG91Y2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBzdXBwb3J0c1RvdWNoO1xuICAgIH07XG5cbiAgICAvKlxcXG4gICAgICogaW50ZXJhY3Quc3VwcG9ydHNQb2ludGVyRXZlbnRcbiAgICAgWyBtZXRob2QgXVxuICAgICAqXG4gICAgID0gKGJvb2xlYW4pIFdoZXRoZXIgb3Igbm90IHRoZSBicm93c2VyIHN1cHBvcnRzIFBvaW50ZXJFdmVudHNcbiAgICBcXCovXG4gICAgaW50ZXJhY3Quc3VwcG9ydHNQb2ludGVyRXZlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBzdXBwb3J0c1BvaW50ZXJFdmVudDtcbiAgICB9O1xuXG4gICAgLypcXFxuICAgICAqIGludGVyYWN0LnN0b3BcbiAgICAgWyBtZXRob2QgXVxuICAgICAqXG4gICAgICogQ2FuY2VscyBhbGwgaW50ZXJhY3Rpb25zIChlbmQgZXZlbnRzIGFyZSBub3QgZmlyZWQpXG4gICAgICpcbiAgICAgLSBldmVudCAoRXZlbnQpIEFuIGV2ZW50IG9uIHdoaWNoIHRvIGNhbGwgcHJldmVudERlZmF1bHQoKVxuICAgICA9IChvYmplY3QpIGludGVyYWN0XG4gICAgXFwqL1xuICAgIGludGVyYWN0LnN0b3AgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IGludGVyYWN0aW9ucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgaW50ZXJhY3Rpb25zW2ldLnN0b3AoZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGludGVyYWN0O1xuICAgIH07XG5cbiAgICAvKlxcXG4gICAgICogaW50ZXJhY3QuZHluYW1pY0Ryb3BcbiAgICAgWyBtZXRob2QgXVxuICAgICAqXG4gICAgICogUmV0dXJucyBvciBzZXRzIHdoZXRoZXIgdGhlIGRpbWVuc2lvbnMgb2YgZHJvcHpvbmUgZWxlbWVudHMgYXJlXG4gICAgICogY2FsY3VsYXRlZCBvbiBldmVyeSBkcmFnbW92ZSBvciBvbmx5IG9uIGRyYWdzdGFydCBmb3IgdGhlIGRlZmF1bHRcbiAgICAgKiBkcm9wQ2hlY2tlclxuICAgICAqXG4gICAgIC0gbmV3VmFsdWUgKGJvb2xlYW4pICNvcHRpb25hbCBUcnVlIHRvIGNoZWNrIG9uIGVhY2ggbW92ZS4gRmFsc2UgdG8gY2hlY2sgb25seSBiZWZvcmUgc3RhcnRcbiAgICAgPSAoYm9vbGVhbiB8IGludGVyYWN0KSBUaGUgY3VycmVudCBzZXR0aW5nIG9yIGludGVyYWN0XG4gICAgXFwqL1xuICAgIGludGVyYWN0LmR5bmFtaWNEcm9wID0gZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmIChpc0Jvb2wobmV3VmFsdWUpKSB7XG4gICAgICAgICAgICAvL2lmIChkcmFnZ2luZyAmJiBkeW5hbWljRHJvcCAhPT0gbmV3VmFsdWUgJiYgIW5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgLy9jYWxjUmVjdHMoZHJvcHpvbmVzKTtcbiAgICAgICAgICAgIC8vfVxuXG4gICAgICAgICAgICBkeW5hbWljRHJvcCA9IG5ld1ZhbHVlO1xuXG4gICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Q7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGR5bmFtaWNEcm9wO1xuICAgIH07XG5cbiAgICAvKlxcXG4gICAgICogaW50ZXJhY3QucG9pbnRlck1vdmVUb2xlcmFuY2VcbiAgICAgWyBtZXRob2QgXVxuICAgICAqIFJldHVybnMgb3Igc2V0cyB0aGUgZGlzdGFuY2UgdGhlIHBvaW50ZXIgbXVzdCBiZSBtb3ZlZCBiZWZvcmUgYW4gYWN0aW9uXG4gICAgICogc2VxdWVuY2Ugb2NjdXJzLiBUaGlzIGFsc28gYWZmZWN0cyB0b2xlcmFuY2UgZm9yIHRhcCBldmVudHMuXG4gICAgICpcbiAgICAgLSBuZXdWYWx1ZSAobnVtYmVyKSAjb3B0aW9uYWwgVGhlIG1vdmVtZW50IGZyb20gdGhlIHN0YXJ0IHBvc2l0aW9uIG11c3QgYmUgZ3JlYXRlciB0aGFuIHRoaXMgdmFsdWVcbiAgICAgPSAobnVtYmVyIHwgSW50ZXJhY3RhYmxlKSBUaGUgY3VycmVudCBzZXR0aW5nIG9yIGludGVyYWN0XG4gICAgXFwqL1xuICAgIGludGVyYWN0LnBvaW50ZXJNb3ZlVG9sZXJhbmNlID0gZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmIChpc051bWJlcihuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgIHBvaW50ZXJNb3ZlVG9sZXJhbmNlID0gbmV3VmFsdWU7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBvaW50ZXJNb3ZlVG9sZXJhbmNlO1xuICAgIH07XG5cbiAgICAvKlxcXG4gICAgICogaW50ZXJhY3QubWF4SW50ZXJhY3Rpb25zXG4gICAgIFsgbWV0aG9kIF1cbiAgICAgKipcbiAgICAgKiBSZXR1cm5zIG9yIHNldHMgdGhlIG1heGltdW0gbnVtYmVyIG9mIGNvbmN1cnJlbnQgaW50ZXJhY3Rpb25zIGFsbG93ZWQuXG4gICAgICogQnkgZGVmYXVsdCBvbmx5IDEgaW50ZXJhY3Rpb24gaXMgYWxsb3dlZCBhdCBhIHRpbWUgKGZvciBiYWNrd2FyZHNcbiAgICAgKiBjb21wYXRpYmlsaXR5KS4gVG8gYWxsb3cgbXVsdGlwbGUgaW50ZXJhY3Rpb25zIG9uIHRoZSBzYW1lIEludGVyYWN0YWJsZXNcbiAgICAgKiBhbmQgZWxlbWVudHMsIHlvdSBuZWVkIHRvIGVuYWJsZSBpdCBpbiB0aGUgZHJhZ2dhYmxlLCByZXNpemFibGUgYW5kXG4gICAgICogZ2VzdHVyYWJsZSBgJ21heCdgIGFuZCBgJ21heFBlckVsZW1lbnQnYCBvcHRpb25zLlxuICAgICAqKlxuICAgICAtIG5ld1ZhbHVlIChudW1iZXIpICNvcHRpb25hbCBBbnkgbnVtYmVyLiBuZXdWYWx1ZSA8PSAwIG1lYW5zIG5vIGludGVyYWN0aW9ucy5cbiAgICBcXCovXG4gICAgaW50ZXJhY3QubWF4SW50ZXJhY3Rpb25zID0gZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmIChpc051bWJlcihuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgIG1heEludGVyYWN0aW9ucyA9IG5ld1ZhbHVlO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtYXhJbnRlcmFjdGlvbnM7XG4gICAgfTtcblxuICAgIGludGVyYWN0LmNyZWF0ZVNuYXBHcmlkID0gZnVuY3Rpb24gKGdyaWQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0WCA9IDAsXG4gICAgICAgICAgICAgICAgb2Zmc2V0WSA9IDA7XG5cbiAgICAgICAgICAgIGlmIChpc09iamVjdChncmlkLm9mZnNldCkpIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRYID0gZ3JpZC5vZmZzZXQueDtcbiAgICAgICAgICAgICAgICBvZmZzZXRZID0gZ3JpZC5vZmZzZXQueTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGdyaWR4ID0gTWF0aC5yb3VuZCgoeCAtIG9mZnNldFgpIC8gZ3JpZC54KSxcbiAgICAgICAgICAgICAgICBncmlkeSA9IE1hdGgucm91bmQoKHkgLSBvZmZzZXRZKSAvIGdyaWQueSksXG5cbiAgICAgICAgICAgICAgICBuZXdYID0gZ3JpZHggKiBncmlkLnggKyBvZmZzZXRYLFxuICAgICAgICAgICAgICAgIG5ld1kgPSBncmlkeSAqIGdyaWQueSArIG9mZnNldFk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgeDogbmV3WCxcbiAgICAgICAgICAgICAgICB5OiBuZXdZLFxuICAgICAgICAgICAgICAgIHJhbmdlOiBncmlkLnJhbmdlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBlbmRBbGxJbnRlcmFjdGlvbnMgKGV2ZW50KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW50ZXJhY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpbnRlcmFjdGlvbnNbaV0ucG9pbnRlckVuZChldmVudCwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdGVuVG9Eb2N1bWVudCAoZG9jKSB7XG4gICAgICAgIGlmIChjb250YWlucyhkb2N1bWVudHMsIGRvYykpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdmFyIHdpbiA9IGRvYy5kZWZhdWx0VmlldyB8fCBkb2MucGFyZW50V2luZG93O1xuXG4gICAgICAgIC8vIGFkZCBkZWxlZ2F0ZSBldmVudCBsaXN0ZW5lclxuICAgICAgICBmb3IgKHZhciBldmVudFR5cGUgaW4gZGVsZWdhdGVkRXZlbnRzKSB7XG4gICAgICAgICAgICBldmVudHMuYWRkKGRvYywgZXZlbnRUeXBlLCBkZWxlZ2F0ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoZG9jLCBldmVudFR5cGUsIGRlbGVnYXRlVXNlQ2FwdHVyZSwgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3VwcG9ydHNQb2ludGVyRXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChQb2ludGVyRXZlbnQgPT09IHdpbi5NU1BvaW50ZXJFdmVudCkge1xuICAgICAgICAgICAgICAgIHBFdmVudFR5cGVzID0ge1xuICAgICAgICAgICAgICAgICAgICB1cDogJ01TUG9pbnRlclVwJywgZG93bjogJ01TUG9pbnRlckRvd24nLCBvdmVyOiAnbW91c2VvdmVyJyxcbiAgICAgICAgICAgICAgICAgICAgb3V0OiAnbW91c2VvdXQnLCBtb3ZlOiAnTVNQb2ludGVyTW92ZScsIGNhbmNlbDogJ01TUG9pbnRlckNhbmNlbCcgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHBFdmVudFR5cGVzID0ge1xuICAgICAgICAgICAgICAgICAgICB1cDogJ3BvaW50ZXJ1cCcsIGRvd246ICdwb2ludGVyZG93bicsIG92ZXI6ICdwb2ludGVyb3ZlcicsXG4gICAgICAgICAgICAgICAgICAgIG91dDogJ3BvaW50ZXJvdXQnLCBtb3ZlOiAncG9pbnRlcm1vdmUnLCBjYW5jZWw6ICdwb2ludGVyY2FuY2VsJyB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudHMuYWRkKGRvYywgcEV2ZW50VHlwZXMuZG93biAgLCBsaXN0ZW5lcnMuc2VsZWN0b3JEb3duICk7XG4gICAgICAgICAgICBldmVudHMuYWRkKGRvYywgcEV2ZW50VHlwZXMubW92ZSAgLCBsaXN0ZW5lcnMucG9pbnRlck1vdmUgICk7XG4gICAgICAgICAgICBldmVudHMuYWRkKGRvYywgcEV2ZW50VHlwZXMub3ZlciAgLCBsaXN0ZW5lcnMucG9pbnRlck92ZXIgICk7XG4gICAgICAgICAgICBldmVudHMuYWRkKGRvYywgcEV2ZW50VHlwZXMub3V0ICAgLCBsaXN0ZW5lcnMucG9pbnRlck91dCAgICk7XG4gICAgICAgICAgICBldmVudHMuYWRkKGRvYywgcEV2ZW50VHlwZXMudXAgICAgLCBsaXN0ZW5lcnMucG9pbnRlclVwICAgICk7XG4gICAgICAgICAgICBldmVudHMuYWRkKGRvYywgcEV2ZW50VHlwZXMuY2FuY2VsLCBsaXN0ZW5lcnMucG9pbnRlckNhbmNlbCk7XG5cbiAgICAgICAgICAgIC8vIGF1dG9zY3JvbGxcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoZG9jLCBwRXZlbnRUeXBlcy5tb3ZlLCBsaXN0ZW5lcnMuYXV0b1Njcm9sbE1vdmUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXZlbnRzLmFkZChkb2MsICdtb3VzZWRvd24nLCBsaXN0ZW5lcnMuc2VsZWN0b3JEb3duKTtcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoZG9jLCAnbW91c2Vtb3ZlJywgbGlzdGVuZXJzLnBvaW50ZXJNb3ZlICk7XG4gICAgICAgICAgICBldmVudHMuYWRkKGRvYywgJ21vdXNldXAnICAsIGxpc3RlbmVycy5wb2ludGVyVXAgICApO1xuICAgICAgICAgICAgZXZlbnRzLmFkZChkb2MsICdtb3VzZW92ZXInLCBsaXN0ZW5lcnMucG9pbnRlck92ZXIgKTtcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoZG9jLCAnbW91c2VvdXQnICwgbGlzdGVuZXJzLnBvaW50ZXJPdXQgICk7XG5cbiAgICAgICAgICAgIGV2ZW50cy5hZGQoZG9jLCAndG91Y2hzdGFydCcgLCBsaXN0ZW5lcnMuc2VsZWN0b3JEb3duICk7XG4gICAgICAgICAgICBldmVudHMuYWRkKGRvYywgJ3RvdWNobW92ZScgICwgbGlzdGVuZXJzLnBvaW50ZXJNb3ZlICApO1xuICAgICAgICAgICAgZXZlbnRzLmFkZChkb2MsICd0b3VjaGVuZCcgICAsIGxpc3RlbmVycy5wb2ludGVyVXAgICAgKTtcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoZG9jLCAndG91Y2hjYW5jZWwnLCBsaXN0ZW5lcnMucG9pbnRlckNhbmNlbCk7XG5cbiAgICAgICAgICAgIC8vIGF1dG9zY3JvbGxcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoZG9jLCAnbW91c2Vtb3ZlJywgbGlzdGVuZXJzLmF1dG9TY3JvbGxNb3ZlKTtcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoZG9jLCAndG91Y2htb3ZlJywgbGlzdGVuZXJzLmF1dG9TY3JvbGxNb3ZlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50cy5hZGQod2luLCAnYmx1cicsIGVuZEFsbEludGVyYWN0aW9ucyk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICh3aW4uZnJhbWVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudERvYyA9IHdpbi5mcmFtZUVsZW1lbnQub3duZXJEb2N1bWVudCxcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50V2luZG93ID0gcGFyZW50RG9jLmRlZmF1bHRWaWV3O1xuXG4gICAgICAgICAgICAgICAgZXZlbnRzLmFkZChwYXJlbnREb2MgICAsICdtb3VzZXVwJyAgICAgICwgbGlzdGVuZXJzLnBvaW50ZXJFbmQpO1xuICAgICAgICAgICAgICAgIGV2ZW50cy5hZGQocGFyZW50RG9jICAgLCAndG91Y2hlbmQnICAgICAsIGxpc3RlbmVycy5wb2ludGVyRW5kKTtcbiAgICAgICAgICAgICAgICBldmVudHMuYWRkKHBhcmVudERvYyAgICwgJ3RvdWNoY2FuY2VsJyAgLCBsaXN0ZW5lcnMucG9pbnRlckVuZCk7XG4gICAgICAgICAgICAgICAgZXZlbnRzLmFkZChwYXJlbnREb2MgICAsICdwb2ludGVydXAnICAgICwgbGlzdGVuZXJzLnBvaW50ZXJFbmQpO1xuICAgICAgICAgICAgICAgIGV2ZW50cy5hZGQocGFyZW50RG9jICAgLCAnTVNQb2ludGVyVXAnICAsIGxpc3RlbmVycy5wb2ludGVyRW5kKTtcbiAgICAgICAgICAgICAgICBldmVudHMuYWRkKHBhcmVudFdpbmRvdywgJ2JsdXInICAgICAgICAgLCBlbmRBbGxJbnRlcmFjdGlvbnMgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGludGVyYWN0LndpbmRvd1BhcmVudEVycm9yID0gZXJyb3I7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwcmV2ZW50IG5hdGl2ZSBIVE1MNSBkcmFnIG9uIGludGVyYWN0LmpzIHRhcmdldCBlbGVtZW50c1xuICAgICAgICBldmVudHMuYWRkKGRvYywgJ2RyYWdzdGFydCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnRlcmFjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgaW50ZXJhY3Rpb24gPSBpbnRlcmFjdGlvbnNbaV07XG5cbiAgICAgICAgICAgICAgICBpZiAoaW50ZXJhY3Rpb24uZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAmJiAoaW50ZXJhY3Rpb24uZWxlbWVudCA9PT0gZXZlbnQudGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBub2RlQ29udGFpbnMoaW50ZXJhY3Rpb24uZWxlbWVudCwgZXZlbnQudGFyZ2V0KSkpIHtcblxuICAgICAgICAgICAgICAgICAgICBpbnRlcmFjdGlvbi5jaGVja0FuZFByZXZlbnREZWZhdWx0KGV2ZW50LCBpbnRlcmFjdGlvbi50YXJnZXQsIGludGVyYWN0aW9uLmVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZXZlbnRzLnVzZUF0dGFjaEV2ZW50KSB7XG4gICAgICAgICAgICAvLyBGb3IgSUUncyBsYWNrIG9mIEV2ZW50I3ByZXZlbnREZWZhdWx0XG4gICAgICAgICAgICBldmVudHMuYWRkKGRvYywgJ3NlbGVjdHN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGludGVyYWN0aW9uID0gaW50ZXJhY3Rpb25zWzBdO1xuXG4gICAgICAgICAgICAgICAgaWYgKGludGVyYWN0aW9uLmN1cnJlbnRBY3Rpb24oKSkge1xuICAgICAgICAgICAgICAgICAgICBpbnRlcmFjdGlvbi5jaGVja0FuZFByZXZlbnREZWZhdWx0KGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gRm9yIElFJ3MgYmFkIGRibGNsaWNrIGV2ZW50IHNlcXVlbmNlXG4gICAgICAgICAgICBldmVudHMuYWRkKGRvYywgJ2RibGNsaWNrJywgZG9PbkludGVyYWN0aW9ucygnaWU4RGJsY2xpY2snKSk7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudHMucHVzaChkb2MpO1xuICAgIH1cblxuICAgIGxpc3RlblRvRG9jdW1lbnQoZG9jdW1lbnQpO1xuXG4gICAgZnVuY3Rpb24gaW5kZXhPZiAoYXJyYXksIHRhcmdldCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChhcnJheVtpXSA9PT0gdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29udGFpbnMgKGFycmF5LCB0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIGluZGV4T2YoYXJyYXksIHRhcmdldCkgIT09IC0xO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hdGNoZXNTZWxlY3RvciAoZWxlbWVudCwgc2VsZWN0b3IsIG5vZGVMaXN0KSB7XG4gICAgICAgIGlmIChpZThNYXRjaGVzU2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiBpZThNYXRjaGVzU2VsZWN0b3IoZWxlbWVudCwgc2VsZWN0b3IsIG5vZGVMaXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlbW92ZSAvZGVlcC8gZnJvbSBzZWxlY3RvcnMgaWYgc2hhZG93RE9NIHBvbHlmaWxsIGlzIHVzZWRcbiAgICAgICAgaWYgKHdpbmRvdyAhPT0gcmVhbFdpbmRvdykge1xuICAgICAgICAgICAgc2VsZWN0b3IgPSBzZWxlY3Rvci5yZXBsYWNlKC9cXC9kZWVwXFwvL2csICcgJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudFtwcmVmaXhlZE1hdGNoZXNTZWxlY3Rvcl0oc2VsZWN0b3IpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hdGNoZXNVcFRvIChlbGVtZW50LCBzZWxlY3RvciwgbGltaXQpIHtcbiAgICAgICAgd2hpbGUgKGlzRWxlbWVudChlbGVtZW50KSkge1xuICAgICAgICAgICAgaWYgKG1hdGNoZXNTZWxlY3RvcihlbGVtZW50LCBzZWxlY3RvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxlbWVudCA9IHBhcmVudEVsZW1lbnQoZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09PSBsaW1pdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaGVzU2VsZWN0b3IoZWxlbWVudCwgc2VsZWN0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEZvciBJRTgncyBsYWNrIG9mIGFuIEVsZW1lbnQjbWF0Y2hlc1NlbGVjdG9yXG4gICAgLy8gdGFrZW4gZnJvbSBodHRwOi8vdGFuYWxpbi5jb20vZW4vYmxvZy8yMDEyLzEyL21hdGNoZXMtc2VsZWN0b3ItaWU4LyBhbmQgbW9kaWZpZWRcbiAgICBpZiAoIShwcmVmaXhlZE1hdGNoZXNTZWxlY3RvciBpbiBFbGVtZW50LnByb3RvdHlwZSkgfHwgIWlzRnVuY3Rpb24oRWxlbWVudC5wcm90b3R5cGVbcHJlZml4ZWRNYXRjaGVzU2VsZWN0b3JdKSkge1xuICAgICAgICBpZThNYXRjaGVzU2VsZWN0b3IgPSBmdW5jdGlvbiAoZWxlbWVudCwgc2VsZWN0b3IsIGVsZW1zKSB7XG4gICAgICAgICAgICBlbGVtcyA9IGVsZW1zIHx8IGVsZW1lbnQucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGVsZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1zW2ldID09PSBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIHJlcXVlc3RBbmltYXRpb25GcmFtZSBwb2x5ZmlsbFxuICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGxhc3RUaW1lID0gMCxcbiAgICAgICAgICAgIHZlbmRvcnMgPSBbJ21zJywgJ21veicsICd3ZWJraXQnLCAnbyddO1xuXG4gICAgICAgIGZvcih2YXIgeCA9IDA7IHggPCB2ZW5kb3JzLmxlbmd0aCAmJiAhcmVhbFdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7ICsreCkge1xuICAgICAgICAgICAgcmVxRnJhbWUgPSByZWFsV2luZG93W3ZlbmRvcnNbeF0rJ1JlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuICAgICAgICAgICAgY2FuY2VsRnJhbWUgPSByZWFsV2luZG93W3ZlbmRvcnNbeF0rJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJ10gfHwgcmVhbFdpbmRvd1t2ZW5kb3JzW3hdKydDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcmVxRnJhbWUpIHtcbiAgICAgICAgICAgIHJlcUZyYW1lID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB2YXIgY3VyclRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgICAgICAgICAgICAgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKGN1cnJUaW1lIC0gbGFzdFRpbWUpKSxcbiAgICAgICAgICAgICAgICAgICAgaWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBjYWxsYmFjayhjdXJyVGltZSArIHRpbWVUb0NhbGwpOyB9LFxuICAgICAgICAgICAgICAgICAgdGltZVRvQ2FsbCk7XG4gICAgICAgICAgICAgICAgbGFzdFRpbWUgPSBjdXJyVGltZSArIHRpbWVUb0NhbGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY2FuY2VsRnJhbWUpIHtcbiAgICAgICAgICAgIGNhbmNlbEZyYW1lID0gZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoaWQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0oKSk7XG5cbiAgICAvKiBnbG9iYWwgZXhwb3J0czogdHJ1ZSwgbW9kdWxlLCBkZWZpbmUgKi9cblxuICAgIC8vIGh0dHA6Ly9kb2N1bWVudGNsb3VkLmdpdGh1Yi5pby91bmRlcnNjb3JlL2RvY3MvdW5kZXJzY29yZS5odG1sI3NlY3Rpb24tMTFcbiAgICBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICAgICAgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gaW50ZXJhY3Q7XG4gICAgICAgIH1cbiAgICAgICAgZXhwb3J0cy5pbnRlcmFjdCA9IGludGVyYWN0O1xuICAgIH1cbiAgICAvLyBBTURcbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKCdpbnRlcmFjdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlYWxXaW5kb3cuaW50ZXJhY3QgPSBpbnRlcmFjdDtcbiAgICB9XG5cbn0gKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnPyB1bmRlZmluZWQgOiB3aW5kb3cpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2ludGVyYWN0anMvaW50ZXJhY3QuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGRyb3B6b25lIGZyb20gJy4vZHJvcHpvbmUuanMnO1xyXG5pbXBvcnQgbGl0aGl1bSBmcm9tICcuL2xpdGhpdW0uanMnO1xyXG5pbXBvcnQgZXhwZXJpbWVudCBmcm9tICcuL2V4cGVyaW1lbnQuanMnO1xyXG5cclxudmFyIHN0YXRlID0ge1xyXG4gICAgdmlzaWJsZTogZmFsc2UsXHJcbiAgICBzaG93UmVzdWx0OiBmYWxzZVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRTdGF0ZShuZXdTdGF0ZSkge1xyXG4gICAgT2JqZWN0LmFzc2lnbihzdGF0ZSwgbmV3U3RhdGUpO1xyXG4gICAgaWYoc3RhdGUudmlzaWJsZSlcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFuc3dlcl9jb250YWluZXJcIikuY2xhc3NMaXN0LnJlbW92ZSgnbm9zaG93Jyk7XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFuc3dlcl9jb250YWluZXJcIikuY2xhc3NMaXN0LmFkZCgnbm9zaG93Jyk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbnN3ZXJfdGV4dFwiKS52YWx1ZSA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBpZihzdGF0ZS5zaG93UmVzdWx0KVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYW5zd2VyX2NvbnRhaW5lclwiKS5jbGFzc0xpc3QuYWRkKFwicmVzdWx0XCIpO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYW5zd2VyX2NvbnRhaW5lclwiKS5jbGFzc0xpc3QucmVtb3ZlKFwicmVzdWx0XCIpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gY2hlY2tBbnN3ZXIoKSB7XHJcbiAgICB2YXIgYW5zd2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbnN3ZXJfdGV4dFwiKS52YWx1ZTtcclxuICAgIGlmIChhbnN3ZXIgPT09IFwiXCIpIHJldHVybjtcclxuICAgIHNldFN0YXRlKHtzaG93UmVzdWx0OiB0cnVlfSk7XHJcbiAgICB2YXIgYW5zd2VyUmVzdWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbnN3ZXJfcmVzdWx0XCIpO1xyXG4gICAgdmFyIG5hbWVzID0gZHJvcHpvbmUuc3RhdGUuY3VycmVudENoZW1pY2FsLnN0YXRlLm5hbWVzO1xyXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYoYW5zd2VyLnRvTG93ZXJDYXNlKCkgPT0gbmFtZXNbaV0udG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICAgICAgICBhbnN3ZXJSZXN1bHQuc3JjID0gXCIuL2ltYWdlcy9vdGhlci9ncmVlbnRpY2suZ2lmXCI7XHJcbiAgICAgICAgICAgIGRyb3B6b25lLnN0YXRlLmN1cnJlbnRDaGVtaWNhbC5zZXRTdGF0ZSh7aGFzR3Vlc3NlZDogdHJ1ZX0pO1xyXG4gICAgICAgICAgICBleHBlcmltZW50LnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYW5zd2VyUmVzdWx0LnNyYyA9IFwiLi9pbWFnZXMvb3RoZXIvcmVkY3Jvc3MucG5nXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgc3RhdGUsIHNldFN0YXRlLCBjaGVja0Fuc3dlciB9O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9hbnN3ZXJib3guanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHN0YXRlID0ge1xyXG4gICAgbmFtZXM6IFsnYmFyaXVtJywgJ2JhJ10sXHJcbiAgICBmbGFtZUNvbG91cjogXCJHcmVlblwiLFxyXG4gICAgaGludFR5cGU6IDEsXHJcbiAgICBoaW50VXNlZDogZmFsc2UsXHJcbiAgICBoYXNHdWVzc2VkOiBmYWxzZSxcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0U3RhdGUobmV3U3RhdGUpIHtcclxuICAgIE9iamVjdC5hc3NpZ24oc3RhdGUsIG5ld1N0YXRlKTtcclxuICAgIGlmKHN0YXRlLmhhc0d1ZXNzZWQpXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jhcml1bScpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKVswXS5zcmMgPSBcIi4vaW1hZ2VzL2NoZW1pY2Fscy9iYXJpdW0vYmFyaXVtY29tcGxldGUucG5nXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgc3RhdGUsIHNldFN0YXRlIH07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2Jhcml1bS5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgc3RhdGUgPSB7XHJcbiAgICBuYW1lczogWydjYWxjaXVtJywgJ2NhJ10sXHJcbiAgICBmbGFtZUNvbG91cjogXCJSZWRcIixcclxuICAgIGhpbnRUeXBlOiAxLFxyXG4gICAgaGludFVzZWQ6IGZhbHNlLFxyXG4gICAgaGFzR3Vlc3NlZDogZmFsc2UsXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFN0YXRlKG5ld1N0YXRlKSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHN0YXRlLCBuZXdTdGF0ZSk7XHJcbiAgICBpZihzdGF0ZS5oYXNHdWVzc2VkKVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxjaXVtJykuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdLnNyYyA9IFwiLi9pbWFnZXMvY2hlbWljYWxzL2NhbGNpdW0vY2FsY2l1bWNvbXBsZXRlLnBuZ1wiO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IHN0YXRlLCBzZXRTdGF0ZSB9O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jYWxjaXVtLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgc3RhdGUgPSB7XHJcbiAgICBuYW1lczogWydwb3Rhc3NpdW0nLCAnayddLFxyXG4gICAgZmxhbWVDb2xvdXI6IFwiTGlsYWNcIixcclxuICAgIGhpbnRUeXBlOiAwLFxyXG4gICAgaGludFVzZWQ6IGZhbHNlLFxyXG4gICAgaGFzR3Vlc3NlZDogZmFsc2UsXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFN0YXRlKG5ld1N0YXRlKSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHN0YXRlLCBuZXdTdGF0ZSk7XHJcbiAgICBpZihzdGF0ZS5oYXNHdWVzc2VkKVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3Rhc3NpdW0nKS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF0uc3JjID0gXCIuL2ltYWdlcy9jaGVtaWNhbHMvcG90YXNzaXVtL3BvdGFzc2l1bWNvbXBsZXRlLnBuZ1wiO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IHN0YXRlLCBzZXRTdGF0ZSB9O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9wb3Rhc3NpdW0uanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBzdGF0ZSA9IHtcclxuICAgIG5hbWVzOiBbJ3NvZGl1bScsICduYSddLFxyXG4gICAgZmxhbWVDb2xvdXI6IFwiWWVsbG93XCIsXHJcbiAgICBoaW50VHlwZTogMCxcclxuICAgIGhpbnRVc2VkOiBmYWxzZSxcclxuICAgIGhhc0d1ZXNzZWQ6IGZhbHNlLFxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRTdGF0ZShuZXdTdGF0ZSkge1xyXG4gICAgT2JqZWN0LmFzc2lnbihzdGF0ZSwgbmV3U3RhdGUpO1xyXG4gICAgaWYoc3RhdGUuaGFzR3Vlc3NlZClcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc29kaXVtJykuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdLnNyYyA9IFwiLi9pbWFnZXMvY2hlbWljYWxzL3NvZGl1bS9zb2RpdW1jb21wbGV0ZS5wbmdcIjtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBzdGF0ZSwgc2V0U3RhdGUgfTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc29kaXVtLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgZHJvcHpvbmUgZnJvbSAnLi9kcm9wem9uZS5qcyc7XHJcblxyXG52YXIgc3RhdGUgPSB7XHJcbiAgICB2aXNpYmxlOiBmYWxzZVxyXG59O1xyXG5cclxuZnVuY3Rpb24gc2V0U3RhdGUobmV3U3RhdGUpIHtcclxuICAgIE9iamVjdC5hc3NpZ24oc3RhdGUsIG5ld1N0YXRlKTtcclxuICAgIGlmKHN0YXRlLnZpc2libGUpIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZsYW1lQ29sb3VyX2NvbnRhaW5lclwiKS5jbGFzc0xpc3QucmVtb3ZlKFwibm9zaG93XCIpO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmxhbWVDb2xvdXJcIikuaW5uZXJIVE1MID0gZHJvcHpvbmUuc3RhdGUuY3VycmVudENoZW1pY2FsLnN0YXRlLmZsYW1lQ29sb3VyICsgXCIgRmxhbWVcIjsgIFxyXG4gICAgfSBlbHNlXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmbGFtZUNvbG91cl9jb250YWluZXJcIikuY2xhc3NMaXN0LmFkZChcIm5vc2hvd1wiKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBzdGF0ZSwgc2V0U3RhdGUgfTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZmxhbWVjb2xvdXIuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=