"use strict";
(self["webpackChunktop_battleship"] = self["webpackChunktop_battleship"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.css */ "./src/styles/index.css");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ "./src/view.js");


_view__WEBPACK_IMPORTED_MODULE_1__.view.loadCoverMainUI();

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "view": () => (/* binding */ view)
/* harmony export */ });
/* harmony import */ var _assets_graphics_carrier_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/graphics/carrier.svg */ "./src/assets/graphics/carrier.svg?19be");
/* harmony import */ var _assets_graphics_submarine_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/graphics/submarine.svg */ "./src/assets/graphics/submarine.svg");
/* harmony import */ var _assets_graphics_battleship_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/graphics/battleship.svg */ "./src/assets/graphics/battleship.svg");
/* harmony import */ var _assets_graphics_destroyer_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/graphics/destroyer.svg */ "./src/assets/graphics/destroyer.svg");
/* harmony import */ var _assets_graphics_patrol_boat_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/graphics/patrol-boat.svg */ "./src/assets/graphics/patrol-boat.svg");
// IMPORTS






// A module (only one instance) for a View that control DOM manipulation
// eslint-disable-next-line import/prefer-default-export, import/no-mutable-exports, prefer-const, func-names
let view = function () {
  // Create an element with an optional CSS class and optional CSS id
  function createElement(tag, className, id) {
    const element = document.createElement(tag);
    if (className) {
      element.classList.add(className);
    }
    if (id) {
      element.setAttribute("id", id);
    }
    return element;
  }

  // Retrieve an element from the DOM
  function getElement(id) {
    const element = document.getElementById(id);
    return element;
  }

  // Delete the content inside "main" <div>
  function deleteMainUI() {
    const main = getElement("main");
    main.innerHTML = "";
  }

  // Loads game UI
  function loadGameUI() {
    // SIDES

    const userSide = createElement("div", "playerSide", null);
    const computerSide = createElement("div", "playerSide", null);
    const main = getElement("main");
    main.appendChild(userSide);
    main.appendChild(computerSide);

    // Headers

    const userHeader = createElement("div", "gameHeader", "userGameHeader");
    const computerHeader = createElement("div", "gameHeader", "computerGameHeader");
    const userTitle = createElement("h2", "playerTitle", null);
    const computerTitle = createElement("h2", "playerTitle", null);
    userTitle.textContent = "YOUR FLEET";
    computerTitle.textContent = "ENEMY FLEET";
    userHeader.appendChild(userTitle);
    computerHeader.appendChild(computerTitle);
    userSide.appendChild(userHeader);
    computerSide.appendChild(computerHeader);

    // Gameboards

    const userGameboardContainer = createElement("div", "gameboardContainer", "userGameboardContainer");
    const computerGameboardContainer = createElement("div", "gameboardContainer", "computerGameboardContainer");
    const userXHeader = createElement("div", "xHeader", null);
    const computerXHeader = createElement("div", "xHeader", null);

    // Generate the xHeader squares
    for (let i = 0; i < 10; i += 1) {
      const userXHeaderSquare = createElement("div", "xHeaderSquare", null);
      const computerXHeaderSquare = createElement("div", "xHeaderSquare", null);
      userXHeaderSquare.textContent = String.fromCharCode(65 + i);
      computerXHeaderSquare.textContent = String.fromCharCode(65 + i);
      userXHeader.appendChild(userXHeaderSquare);
      computerXHeader.appendChild(computerXHeaderSquare);
    }
    const userBottomBoard = createElement("div", "bottomBoard", null);
    const computerBottomBoard = createElement("div", "bottomBoard", null);
    const userYHeader = createElement("div", "yHeader", null);
    const computerYHeader = createElement("div", "yHeader", null);

    // Generate the yHeader squares
    for (let i = 0; i < 10; i += 1) {
      const userYHeaderSquare = createElement("div", "yHeaderSquare", null);
      const computerYHeaderSquare = createElement("div", "yHeaderSquare", null);
      userYHeaderSquare.textContent = i + 1;
      computerYHeaderSquare.textContent = i + 1;
      userYHeader.appendChild(userYHeaderSquare);
      computerYHeader.appendChild(computerYHeaderSquare);
    }
    const userGameboard = createElement("div", "gameboardGrid", "userGameboardGrid");
    const computerGameboard = createElement("div", "gameboardGrid", "computerGameboardGrid");

    // Generate the gameboard squares
    for (let i = 0; i < 100; i += 1) {
      const userGameboardSquare = createElement("div", "gameboardSquare", null);
      const computerGameboardSquare = createElement("div", "gameboardSquare", null);
      userGameboard.appendChild(userGameboardSquare);
      computerGameboard.appendChild(computerGameboardSquare);
    }
    userGameboardContainer.appendChild(userXHeader);
    userGameboardContainer.appendChild(userBottomBoard);
    userBottomBoard.appendChild(userYHeader);
    userBottomBoard.appendChild(userGameboard);
    computerGameboardContainer.appendChild(computerXHeader);
    computerGameboardContainer.appendChild(computerBottomBoard);
    computerBottomBoard.appendChild(computerYHeader);
    computerBottomBoard.appendChild(computerGameboard);
    userSide.appendChild(userGameboardContainer);
    computerSide.appendChild(computerGameboardContainer);

    // Fleet Status Panels
    const userStatusPanelContainer = createElement("div", "statusPanelContainer", "userStatusPanelContainer");
    const computerStatusPanelContainer = createElement("div", "statusPanelContainer", "computerStatusPanelContainer");
    const userStatusHeader = createElement("div", "statusHeader", null);
    const computerStatusHeader = createElement("div", "statusHeader", null);
    const userStatusTitle = createElement("h2", "panelTitle", null);
    const computerStatusTitle = createElement("h2", "panelTitle", null);
    userStatusTitle.textContent = "Shipyard";
    computerStatusTitle.textContent = "Shipyard";
    userStatusHeader.appendChild(userStatusTitle);
    computerStatusHeader.appendChild(computerStatusTitle);
    userStatusPanelContainer.appendChild(userStatusHeader);
    computerStatusPanelContainer.appendChild(computerStatusHeader);
    const userStatusPanel = createElement("div", "statusPanel", "userStatusPanel");
    const computerStatusPanel = createElement("div", "statusPanel", "computerStatusPanel");
    userStatusPanelContainer.appendChild(userStatusPanel);
    computerStatusPanelContainer.appendChild(computerStatusPanel);
    userSide.appendChild(userStatusPanelContainer);
    computerSide.appendChild(computerStatusPanelContainer);

    // Create the user shipyard
    const userCarrier = createElement("div", "carrier", "userCarrier");
    const userBattleship = createElement("div", "battleship", "userBattleship");
    const userDestroyer = createElement("div", "destroyer", "userDestroyer");
    const userSubmarine = createElement("div", "submarine", "userSubmarine");
    const userBoat = createElement("div", "boat", "userBoat");
    userStatusPanel.appendChild(userCarrier);
    userStatusPanel.appendChild(userBattleship);
    userStatusPanel.appendChild(userDestroyer);
    userStatusPanel.appendChild(userSubmarine);
    userStatusPanel.appendChild(userBoat);

    // Create the enemy shipyard
    const computerCarrier = createElement("div", "carrier", "computerCarrier");
    const computerBattleship = createElement("div", "battleship", "computerBattleship");
    const computerDestroyer = createElement("div", "destroyer", "computerDestroyer");
    const computerSubmarine = createElement("div", "submarine", "computerSubmarine");
    const computerBoat = createElement("div", "boat", "computerBoat");
    computerStatusPanel.appendChild(computerCarrier);
    computerStatusPanel.appendChild(computerBattleship);
    computerStatusPanel.appendChild(computerDestroyer);
    computerStatusPanel.appendChild(computerSubmarine);
    computerStatusPanel.appendChild(computerBoat);
  }

  // Loads initial UI screen
  function loadCoverMainUI() {
    // Create a screen <div></div> that covers all the space available on browser nav
    const screen = createElement("div", null, "screen");

    // Append it to body element
    document.body.appendChild(screen);

    // Create header, main and footer divs inside screen div
    const header = createElement("div", null, "header");
    const main = createElement("div", null, "main");
    const footer = createElement("div", null, "footer");
    screen.appendChild(header);
    screen.appendChild(main);
    screen.appendChild(footer);

    // Create a title for the game and append it to the header
    const title = createElement("h1", "title", null);
    title.textContent = "BATTLESHIP";
    header.appendChild(title);

    // Create the credits and append them to the footer
    const credits = createElement("p", "credits", null);
    // eslint-disable-next-line quotes
    credits.innerHTML = 'Created by VEREGORN. Follow my work on GitHub: <br><br><a class="github-link" href="https://github.com/veregorn" target="_blank" rel="noopener noreferrer"><svg class="github-icon" width="32" height="32" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg></a>';
    footer.appendChild(credits);

    // Main content
    const glowingButton = createElement("button", "glowing-button", null);
    glowingButton.textContent = "START";
    glowingButton.addEventListener("click", () => {
      deleteMainUI();
      loadGameUI();
    });
    main.appendChild(glowingButton);

    // SVG Ship shapes
    const carrierShape = createElement("object", null, "carrier-shape");
    carrierShape.data = _assets_graphics_carrier_svg__WEBPACK_IMPORTED_MODULE_0__["default"];
    main.appendChild(carrierShape);
    const submarineShape = createElement("object", null, "submarine-shape");
    submarineShape.data = _assets_graphics_submarine_svg__WEBPACK_IMPORTED_MODULE_1__["default"];
    main.appendChild(submarineShape);
    const battleshipShape = createElement("object", null, "battleship-shape");
    battleshipShape.data = _assets_graphics_battleship_svg__WEBPACK_IMPORTED_MODULE_2__["default"];
    main.appendChild(battleshipShape);
    const destroyerShape = createElement("object", null, "destroyer-shape");
    destroyerShape.data = _assets_graphics_destroyer_svg__WEBPACK_IMPORTED_MODULE_3__["default"];
    main.appendChild(destroyerShape);
    const patrolShape = createElement("object", null, "patrol-shape");
    patrolShape.data = _assets_graphics_patrol_boat_svg__WEBPACK_IMPORTED_MODULE_4__["default"];
    main.appendChild(patrolShape);
  }
  return {
    createElement,
    getElement,
    loadCoverMainUI
  };
}();

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/index.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/index.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/graphics/carrier.svg */ "./src/assets/graphics/carrier.svg?c44b"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Bruno+Ace&display=swap);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap);"]);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\n/* MY OWN STYLES FROM HERE */\n\n/* Fonts */\n\na:visited {\n    color: #fff;\n}\n\n#screen {\n    position: fixed; /* or \"absolute\" */\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: #fff;\n    display: flex;\n    flex-direction: column;\n    z-index: 0;\n}\n\n/* HEADER */\n\n#header {\n    height: 10%;\n    background-color: #474747;\n    display: flex;\n    border-bottom: solid 1px #000;\n    align-items: center;\n    justify-content: center;\n    z-index: 3;\n}\n\n.title {\n    font-size: 2em;\n    font-family: 'Bruno Ace';\n    color: #e8f901;\n}\n\n#main {\n    position: relative;\n    height: 80%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: rgb(255, 255, 255);\n}\n\n/* COVER */\n\n.glowing-button {\n    background-color: #4CAF50;\n    border: none;\n    border-radius: 20px;\n    color: white;\n    font-size: 3em;\n    padding: 20px 30px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    cursor: pointer;\n    transition: transform 0.5s;\n    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);\n}\n  \n.glowing-button:hover {\n    transform: scale(1.1);\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(76, 175, 80, 0.6);\n}\n\n@keyframes glowing {\n    0% {\n        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(76, 175, 80, 0.2);\n    }\n    50% {\n        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(76, 175, 80, 0.5);\n    }\n    100% {\n        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(76, 175, 80, 0.2);\n    }\n}\n\n.glowing-button {\n    animation: glowing 2s infinite;\n}\n\n/* COVER SHIPS */\n\n#carrier-shape {\n    position: absolute;\n    width: 180px;\n    height: 60px;\n    top: 20%;\n    animation: move-right-left 10s linear infinite; /* adjust the time as needed */\n    z-index: 1;\n}\n\n@keyframes move-right-left {\n    0% { right: -100%; } /* Start from off the right of the screen */\n    100% { right: 100%; } /* End off the left of the screen */\n}\n\n#submarine-shape {\n    position: absolute;\n    width: 120px;\n    height: 60px;\n    left: 20%;\n    transform: rotate(90deg);\n    animation: move-top-down 10s linear infinite;\n    z-index: 1;\n}\n\n@keyframes move-top-down {\n    0% { top: -200px }\n    100% { top: 1500px}\n}\n\n#battleship-shape {\n    position: absolute;\n    width: 150px;\n    height: 60px;\n    top: 65%;\n    animation: move-left-right 10s linear infinite; /* adjust the time as needed */\n    z-index: 1;\n}\n\n@keyframes move-left-right {\n    0% { left: -100%; } /* Start from off the left of the screen */\n    100% { left: 100%; } /* End off the right of the screen */\n}\n\n#destroyer-shape {\n    position: absolute;\n    width: 120px;\n    height: 60px;\n    transform: rotate(270deg);\n    left: 80%;\n    animation: move-down-top 10s linear infinite;\n    z-index: 1;\n}\n\n@keyframes move-down-top {\n    0% { top: 1500px; }\n    100% { top: -200px; }\n}\n\n#patrol-shape {\n    position: absolute;\n    width: 90px;\n    height: 60px;\n    transform: rotate(180deg);\n    top: 90%;\n    animation: move-right-left 10s linear infinite;\n    z-index: 1;\n}\n\n/* MAIN - GAME */\n\n.playerSide {\n    width: 50%;\n    height: 90%;\n    display: flex;\n    flex-direction: column;\n    padding: 5%;\n    align-items: center;\n    justify-content: center;\n}\n\n.gameHeader {\n    width: 440px;\n    font-size: 1.5em;\n    font-family: 'Bruno Ace';\n    color: #fff;\n    padding: 10px;\n    text-align: center;\n}\n\n#userGameHeader {\n    background-color: #FC1159;\n}\n\n#computerGameHeader{\n    background-color: #727D95;\n}\n\n.gameboardContainer {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n}\n\n.xHeader {\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    padding-left: 2.5em;\n}\n\n.xHeaderSquare {\n    width: 40px;\n    height: 40px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n}\n\n.bottomBoard {\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n}\n\n.yHeader {\n    display: flex;\n    flex-direction: column;\n}\n\n.yHeaderSquare {\n    width: 40px;\n    height: 40px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n}\n\n.gameboardGrid {\n    width: 400px;\n    height: 400px;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n}\n\n.gameboardSquare {\n    width: 38px;\n    height: 38px;\n    border: solid 1px #fff;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n    cursor: pointer;\n    background-color: #a1dcff;\n}\n\n.gameboardSquare:hover {\n    background-color: #1b88e7;\n}\n\n/* SHIPYARD */\n\n.statusPanelContainer {\n    width: 90%;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start;\n}\n\n.panelTitle {\n    writing-mode: vertical-rl;\n    text-orientation: mixed;\n    rotate: 180deg;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n}\n\n.statusPanel {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start;\n}\n\n.carrier {\n    width: 150px;\n    height: 40px;\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n    background-size: contain;\n    background-repeat: no-repeat;\n}\n\n/* FOOTER */\n\n#footer {\n    height: 10%;\n    background-color: #474747;\n    display: flex;\n    border-top: solid 1px #000;\n    align-items: center;\n    justify-content: center;\n    z-index: 3;\n}\n\n.credits {\n    color: #fff;\n    font-family: 'IBM Plex Mono', monospace;\n    font-size: 0.8em;\n    text-align: center;\n}\n\n/* Style the link to remove default styling */\n.github-link {\n    display: inline-block;\n    text-decoration: none;\n    color: inherit;\n}\n\n/* Add the hover effect */\n.github-icon {\n    transition: transform 0.5s ease-in-out; /* Add a transition for the transform property */\n}\n\n.github-link:hover .github-icon {\n    transform: rotate(180deg); /* Rotate the icon 180 degrees when hovered */\n}", "",{"version":3,"sources":["webpack://./src/styles/index.css"],"names":[],"mappings":"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","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\n/* MY OWN STYLES FROM HERE */\n\n/* Fonts */\n\n@import url('https://fonts.googleapis.com/css2?family=Bruno+Ace&display=swap');\n@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap');\n\na:visited {\n    color: #fff;\n}\n\n#screen {\n    position: fixed; /* or \"absolute\" */\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: #fff;\n    display: flex;\n    flex-direction: column;\n    z-index: 0;\n}\n\n/* HEADER */\n\n#header {\n    height: 10%;\n    background-color: #474747;\n    display: flex;\n    border-bottom: solid 1px #000;\n    align-items: center;\n    justify-content: center;\n    z-index: 3;\n}\n\n.title {\n    font-size: 2em;\n    font-family: 'Bruno Ace';\n    color: #e8f901;\n}\n\n#main {\n    position: relative;\n    height: 80%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: rgb(255, 255, 255);\n}\n\n/* COVER */\n\n.glowing-button {\n    background-color: #4CAF50;\n    border: none;\n    border-radius: 20px;\n    color: white;\n    font-size: 3em;\n    padding: 20px 30px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    cursor: pointer;\n    transition: transform 0.5s;\n    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);\n}\n  \n.glowing-button:hover {\n    transform: scale(1.1);\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(76, 175, 80, 0.6);\n}\n\n@keyframes glowing {\n    0% {\n        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(76, 175, 80, 0.2);\n    }\n    50% {\n        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(76, 175, 80, 0.5);\n    }\n    100% {\n        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(76, 175, 80, 0.2);\n    }\n}\n\n.glowing-button {\n    animation: glowing 2s infinite;\n}\n\n/* COVER SHIPS */\n\n#carrier-shape {\n    position: absolute;\n    width: 180px;\n    height: 60px;\n    top: 20%;\n    animation: move-right-left 10s linear infinite; /* adjust the time as needed */\n    z-index: 1;\n}\n\n@keyframes move-right-left {\n    0% { right: -100%; } /* Start from off the right of the screen */\n    100% { right: 100%; } /* End off the left of the screen */\n}\n\n#submarine-shape {\n    position: absolute;\n    width: 120px;\n    height: 60px;\n    left: 20%;\n    transform: rotate(90deg);\n    animation: move-top-down 10s linear infinite;\n    z-index: 1;\n}\n\n@keyframes move-top-down {\n    0% { top: -200px }\n    100% { top: 1500px}\n}\n\n#battleship-shape {\n    position: absolute;\n    width: 150px;\n    height: 60px;\n    top: 65%;\n    animation: move-left-right 10s linear infinite; /* adjust the time as needed */\n    z-index: 1;\n}\n\n@keyframes move-left-right {\n    0% { left: -100%; } /* Start from off the left of the screen */\n    100% { left: 100%; } /* End off the right of the screen */\n}\n\n#destroyer-shape {\n    position: absolute;\n    width: 120px;\n    height: 60px;\n    transform: rotate(270deg);\n    left: 80%;\n    animation: move-down-top 10s linear infinite;\n    z-index: 1;\n}\n\n@keyframes move-down-top {\n    0% { top: 1500px; }\n    100% { top: -200px; }\n}\n\n#patrol-shape {\n    position: absolute;\n    width: 90px;\n    height: 60px;\n    transform: rotate(180deg);\n    top: 90%;\n    animation: move-right-left 10s linear infinite;\n    z-index: 1;\n}\n\n/* MAIN - GAME */\n\n.playerSide {\n    width: 50%;\n    height: 90%;\n    display: flex;\n    flex-direction: column;\n    padding: 5%;\n    align-items: center;\n    justify-content: center;\n}\n\n.gameHeader {\n    width: 440px;\n    font-size: 1.5em;\n    font-family: 'Bruno Ace';\n    color: #fff;\n    padding: 10px;\n    text-align: center;\n}\n\n#userGameHeader {\n    background-color: #FC1159;\n}\n\n#computerGameHeader{\n    background-color: #727D95;\n}\n\n.gameboardContainer {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n}\n\n.xHeader {\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    padding-left: 2.5em;\n}\n\n.xHeaderSquare {\n    width: 40px;\n    height: 40px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n}\n\n.bottomBoard {\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n}\n\n.yHeader {\n    display: flex;\n    flex-direction: column;\n}\n\n.yHeaderSquare {\n    width: 40px;\n    height: 40px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n}\n\n.gameboardGrid {\n    width: 400px;\n    height: 400px;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n}\n\n.gameboardSquare {\n    width: 38px;\n    height: 38px;\n    border: solid 1px #fff;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n    cursor: pointer;\n    background-color: #a1dcff;\n}\n\n.gameboardSquare:hover {\n    background-color: #1b88e7;\n}\n\n/* SHIPYARD */\n\n.statusPanelContainer {\n    width: 90%;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start;\n}\n\n.panelTitle {\n    writing-mode: vertical-rl;\n    text-orientation: mixed;\n    rotate: 180deg;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n}\n\n.statusPanel {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start;\n}\n\n.carrier {\n    width: 150px;\n    height: 40px;\n    background-image: url(\"../assets/graphics/carrier.svg\");\n    background-size: contain;\n    background-repeat: no-repeat;\n}\n\n/* FOOTER */\n\n#footer {\n    height: 10%;\n    background-color: #474747;\n    display: flex;\n    border-top: solid 1px #000;\n    align-items: center;\n    justify-content: center;\n    z-index: 3;\n}\n\n.credits {\n    color: #fff;\n    font-family: 'IBM Plex Mono', monospace;\n    font-size: 0.8em;\n    text-align: center;\n}\n\n/* Style the link to remove default styling */\n.github-link {\n    display: inline-block;\n    text-decoration: none;\n    color: inherit;\n}\n\n/* Add the hover effect */\n.github-icon {\n    transition: transform 0.5s ease-in-out; /* Add a transition for the transform property */\n}\n\n.github-link:hover .github-icon {\n    transform: rotate(180deg); /* Rotate the icon 180 degrees when hovered */\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/assets/graphics/battleship.svg":
/*!********************************************!*\
  !*** ./src/assets/graphics/battleship.svg ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "0994527ee29583b0271fe79790c90ee0.svg");

/***/ }),

/***/ "./src/assets/graphics/carrier.svg?19be":
/*!*****************************************!*\
  !*** ./src/assets/graphics/carrier.svg ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "edcb27955635edfdfd196bbdb7f7df9f.svg");

/***/ }),

/***/ "./src/assets/graphics/destroyer.svg":
/*!*******************************************!*\
  !*** ./src/assets/graphics/destroyer.svg ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "fac9748767def3e1f38d933b101020f0.svg");

/***/ }),

/***/ "./src/assets/graphics/patrol-boat.svg":
/*!*********************************************!*\
  !*** ./src/assets/graphics/patrol-boat.svg ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "95fe9cad9ee48cb611bfeef6a47d3592.svg");

/***/ }),

/***/ "./src/assets/graphics/submarine.svg":
/*!*******************************************!*\
  !*** ./src/assets/graphics/submarine.svg ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "98beb36dd364b2a2ca9b0d05d17d1254.svg");

/***/ }),

/***/ "./src/styles/index.css":
/*!******************************!*\
  !*** ./src/styles/index.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/index.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/graphics/carrier.svg?c44b":
/*!*****************************************!*\
  !*** ./src/assets/graphics/carrier.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "bf379163f3e6942fa9c1.svg";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNqQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy92aWV3LmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2Fzc2V0cy9ncmFwaGljcy9iYXR0bGVzaGlwLnN2ZyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9hc3NldHMvZ3JhcGhpY3MvY2Fycmllci5zdmciLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvYXNzZXRzL2dyYXBoaWNzL2Rlc3Ryb3llci5zdmciLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvYXNzZXRzL2dyYXBoaWNzL3BhdHJvbC1ib2F0LnN2ZyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9hc3NldHMvZ3JhcGhpY3Mvc3VibWFyaW5lLnN2ZyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvaW5kZXguY3NzPzYzNDkiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCIuL3N0eWxlcy9pbmRleC5jc3NcIlxuaW1wb3J0IHsgdmlldyB9IGZyb20gXCIuL3ZpZXdcIlxuXG52aWV3LmxvYWRDb3Zlck1haW5VSSgpIiwiLy8gSU1QT1JUU1xuaW1wb3J0IGNhcnJpZXJTdmcgZnJvbSBcIi4vYXNzZXRzL2dyYXBoaWNzL2NhcnJpZXIuc3ZnXCI7XG5pbXBvcnQgc3VibWFyaW5lU3ZnIGZyb20gXCIuL2Fzc2V0cy9ncmFwaGljcy9zdWJtYXJpbmUuc3ZnXCI7XG5pbXBvcnQgYmF0dGxlc2hpcFN2ZyBmcm9tIFwiLi9hc3NldHMvZ3JhcGhpY3MvYmF0dGxlc2hpcC5zdmdcIjtcbmltcG9ydCBkZXN0cm95ZXJTdmcgZnJvbSBcIi4vYXNzZXRzL2dyYXBoaWNzL2Rlc3Ryb3llci5zdmdcIjtcbmltcG9ydCBwYXRyb2xTdmcgZnJvbSBcIi4vYXNzZXRzL2dyYXBoaWNzL3BhdHJvbC1ib2F0LnN2Z1wiO1xuXG4vLyBBIG1vZHVsZSAob25seSBvbmUgaW5zdGFuY2UpIGZvciBhIFZpZXcgdGhhdCBjb250cm9sIERPTSBtYW5pcHVsYXRpb25cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0LCBpbXBvcnQvbm8tbXV0YWJsZS1leHBvcnRzLCBwcmVmZXItY29uc3QsIGZ1bmMtbmFtZXNcbmV4cG9ydCBsZXQgdmlldyA9IChmdW5jdGlvbigpIHtcblxuICAgIC8vIENyZWF0ZSBhbiBlbGVtZW50IHdpdGggYW4gb3B0aW9uYWwgQ1NTIGNsYXNzIGFuZCBvcHRpb25hbCBDU1MgaWRcbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZywgY2xhc3NOYW1lLCBpZCkge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKVxuXG4gICAgICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiaWRcIixpZClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbGVtZW50XG5cbiAgICB9XG5cbiAgICAvLyBSZXRyaWV2ZSBhbiBlbGVtZW50IGZyb20gdGhlIERPTVxuICAgIGZ1bmN0aW9uIGdldEVsZW1lbnQoaWQpIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZClcblxuICAgICAgICByZXR1cm4gZWxlbWVudFxuXG4gICAgfVxuXG4gICAgLy8gRGVsZXRlIHRoZSBjb250ZW50IGluc2lkZSBcIm1haW5cIiA8ZGl2PlxuICAgIGZ1bmN0aW9uIGRlbGV0ZU1haW5VSSgpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IGdldEVsZW1lbnQoXCJtYWluXCIpXG4gICAgICAgIG1haW4uaW5uZXJIVE1MID0gXCJcIlxuICAgIH1cblxuICAgIC8vIExvYWRzIGdhbWUgVUlcbiAgICBmdW5jdGlvbiBsb2FkR2FtZVVJKCkge1xuICAgICAgICBcbiAgICAgICAgLy8gU0lERVNcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHVzZXJTaWRlID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwicGxheWVyU2lkZVwiLG51bGwpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyU2lkZSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInBsYXllclNpZGVcIixudWxsKVxuXG4gICAgICAgIGNvbnN0IG1haW4gPSBnZXRFbGVtZW50KFwibWFpblwiKVxuICAgICAgICBtYWluLmFwcGVuZENoaWxkKHVzZXJTaWRlKVxuICAgICAgICBtYWluLmFwcGVuZENoaWxkKGNvbXB1dGVyU2lkZSlcblxuICAgICAgICAvLyBIZWFkZXJzXG5cbiAgICAgICAgY29uc3QgdXNlckhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImdhbWVIZWFkZXJcIixcInVzZXJHYW1lSGVhZGVyXCIpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVySGVhZGVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiZ2FtZUhlYWRlclwiLFwiY29tcHV0ZXJHYW1lSGVhZGVyXCIpXG5cbiAgICAgICAgY29uc3QgdXNlclRpdGxlID0gY3JlYXRlRWxlbWVudChcImgyXCIsXCJwbGF5ZXJUaXRsZVwiLG51bGwpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyVGl0bGUgPSBjcmVhdGVFbGVtZW50KFwiaDJcIixcInBsYXllclRpdGxlXCIsbnVsbClcblxuICAgICAgICB1c2VyVGl0bGUudGV4dENvbnRlbnQgPSBcIllPVVIgRkxFRVRcIlxuICAgICAgICBjb21wdXRlclRpdGxlLnRleHRDb250ZW50ID0gXCJFTkVNWSBGTEVFVFwiXG5cbiAgICAgICAgdXNlckhlYWRlci5hcHBlbmRDaGlsZCh1c2VyVGl0bGUpXG4gICAgICAgIGNvbXB1dGVySGVhZGVyLmFwcGVuZENoaWxkKGNvbXB1dGVyVGl0bGUpXG5cbiAgICAgICAgdXNlclNpZGUuYXBwZW5kQ2hpbGQodXNlckhlYWRlcilcbiAgICAgICAgY29tcHV0ZXJTaWRlLmFwcGVuZENoaWxkKGNvbXB1dGVySGVhZGVyKVxuXG4gICAgICAgIC8vIEdhbWVib2FyZHNcblxuXG5cbiAgICAgICAgY29uc3QgdXNlckdhbWVib2FyZENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImdhbWVib2FyZENvbnRhaW5lclwiLFwidXNlckdhbWVib2FyZENvbnRhaW5lclwiKVxuICAgICAgICBjb25zdCBjb21wdXRlckdhbWVib2FyZENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImdhbWVib2FyZENvbnRhaW5lclwiLFwiY29tcHV0ZXJHYW1lYm9hcmRDb250YWluZXJcIilcblxuICAgICAgICBjb25zdCB1c2VyWEhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInhIZWFkZXJcIixudWxsKVxuICAgICAgICBjb25zdCBjb21wdXRlclhIZWFkZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJ4SGVhZGVyXCIsbnVsbClcblxuICAgICAgICAvLyBHZW5lcmF0ZSB0aGUgeEhlYWRlciBzcXVhcmVzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgdXNlclhIZWFkZXJTcXVhcmUgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJ4SGVhZGVyU3F1YXJlXCIsbnVsbClcbiAgICAgICAgICAgIGNvbnN0IGNvbXB1dGVyWEhlYWRlclNxdWFyZSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInhIZWFkZXJTcXVhcmVcIixudWxsKVxuICAgICAgICAgICAgdXNlclhIZWFkZXJTcXVhcmUudGV4dENvbnRlbnQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDY1ICsgaSlcbiAgICAgICAgICAgIGNvbXB1dGVyWEhlYWRlclNxdWFyZS50ZXh0Q29udGVudCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoNjUgKyBpKVxuICAgICAgICAgICAgdXNlclhIZWFkZXIuYXBwZW5kQ2hpbGQodXNlclhIZWFkZXJTcXVhcmUpXG4gICAgICAgICAgICBjb21wdXRlclhIZWFkZXIuYXBwZW5kQ2hpbGQoY29tcHV0ZXJYSGVhZGVyU3F1YXJlKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdXNlckJvdHRvbUJvYXJkID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiYm90dG9tQm9hcmRcIixudWxsKVxuICAgICAgICBjb25zdCBjb21wdXRlckJvdHRvbUJvYXJkID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiYm90dG9tQm9hcmRcIixudWxsKVxuXG4gICAgICAgIGNvbnN0IHVzZXJZSGVhZGVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwieUhlYWRlclwiLG51bGwpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyWUhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInlIZWFkZXJcIixudWxsKVxuXG4gICAgICAgIC8vIEdlbmVyYXRlIHRoZSB5SGVhZGVyIHNxdWFyZXNcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCB1c2VyWUhlYWRlclNxdWFyZSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInlIZWFkZXJTcXVhcmVcIixudWxsKVxuICAgICAgICAgICAgY29uc3QgY29tcHV0ZXJZSGVhZGVyU3F1YXJlID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwieUhlYWRlclNxdWFyZVwiLG51bGwpXG4gICAgICAgICAgICB1c2VyWUhlYWRlclNxdWFyZS50ZXh0Q29udGVudCA9IGkgKyAxXG4gICAgICAgICAgICBjb21wdXRlcllIZWFkZXJTcXVhcmUudGV4dENvbnRlbnQgPSBpICsgMVxuICAgICAgICAgICAgdXNlcllIZWFkZXIuYXBwZW5kQ2hpbGQodXNlcllIZWFkZXJTcXVhcmUpXG4gICAgICAgICAgICBjb21wdXRlcllIZWFkZXIuYXBwZW5kQ2hpbGQoY29tcHV0ZXJZSGVhZGVyU3F1YXJlKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdXNlckdhbWVib2FyZCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImdhbWVib2FyZEdyaWRcIixcInVzZXJHYW1lYm9hcmRHcmlkXCIpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyR2FtZWJvYXJkID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiZ2FtZWJvYXJkR3JpZFwiLFwiY29tcHV0ZXJHYW1lYm9hcmRHcmlkXCIpXG5cbiAgICAgICAgLy8gR2VuZXJhdGUgdGhlIGdhbWVib2FyZCBzcXVhcmVzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJHYW1lYm9hcmRTcXVhcmUgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJnYW1lYm9hcmRTcXVhcmVcIixudWxsKVxuICAgICAgICAgICAgY29uc3QgY29tcHV0ZXJHYW1lYm9hcmRTcXVhcmUgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJnYW1lYm9hcmRTcXVhcmVcIixudWxsKVxuICAgICAgICAgICAgdXNlckdhbWVib2FyZC5hcHBlbmRDaGlsZCh1c2VyR2FtZWJvYXJkU3F1YXJlKVxuICAgICAgICAgICAgY29tcHV0ZXJHYW1lYm9hcmQuYXBwZW5kQ2hpbGQoY29tcHV0ZXJHYW1lYm9hcmRTcXVhcmUpXG4gICAgICAgIH1cblxuICAgICAgICB1c2VyR2FtZWJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHVzZXJYSGVhZGVyKVxuICAgICAgICB1c2VyR2FtZWJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHVzZXJCb3R0b21Cb2FyZClcbiAgICAgICAgdXNlckJvdHRvbUJvYXJkLmFwcGVuZENoaWxkKHVzZXJZSGVhZGVyKVxuICAgICAgICB1c2VyQm90dG9tQm9hcmQuYXBwZW5kQ2hpbGQodXNlckdhbWVib2FyZClcblxuICAgICAgICBjb21wdXRlckdhbWVib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChjb21wdXRlclhIZWFkZXIpXG4gICAgICAgIGNvbXB1dGVyR2FtZWJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbXB1dGVyQm90dG9tQm9hcmQpXG4gICAgICAgIGNvbXB1dGVyQm90dG9tQm9hcmQuYXBwZW5kQ2hpbGQoY29tcHV0ZXJZSGVhZGVyKVxuICAgICAgICBjb21wdXRlckJvdHRvbUJvYXJkLmFwcGVuZENoaWxkKGNvbXB1dGVyR2FtZWJvYXJkKVxuXG4gICAgICAgIHVzZXJTaWRlLmFwcGVuZENoaWxkKHVzZXJHYW1lYm9hcmRDb250YWluZXIpXG4gICAgICAgIGNvbXB1dGVyU2lkZS5hcHBlbmRDaGlsZChjb21wdXRlckdhbWVib2FyZENvbnRhaW5lcilcblxuICAgICAgICAvLyBGbGVldCBTdGF0dXMgUGFuZWxzXG4gICAgICAgIGNvbnN0IHVzZXJTdGF0dXNQYW5lbENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInN0YXR1c1BhbmVsQ29udGFpbmVyXCIsXCJ1c2VyU3RhdHVzUGFuZWxDb250YWluZXJcIilcbiAgICAgICAgY29uc3QgY29tcHV0ZXJTdGF0dXNQYW5lbENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInN0YXR1c1BhbmVsQ29udGFpbmVyXCIsXCJjb21wdXRlclN0YXR1c1BhbmVsQ29udGFpbmVyXCIpXG5cbiAgICAgICAgY29uc3QgdXNlclN0YXR1c0hlYWRlciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInN0YXR1c0hlYWRlclwiLG51bGwpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyU3RhdHVzSGVhZGVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwic3RhdHVzSGVhZGVyXCIsbnVsbClcblxuICAgICAgICBjb25zdCB1c2VyU3RhdHVzVGl0bGUgPSBjcmVhdGVFbGVtZW50KFwiaDJcIixcInBhbmVsVGl0bGVcIixudWxsKVxuICAgICAgICBjb25zdCBjb21wdXRlclN0YXR1c1RpdGxlID0gY3JlYXRlRWxlbWVudChcImgyXCIsXCJwYW5lbFRpdGxlXCIsbnVsbClcblxuICAgICAgICB1c2VyU3RhdHVzVGl0bGUudGV4dENvbnRlbnQgPSBcIlNoaXB5YXJkXCJcbiAgICAgICAgY29tcHV0ZXJTdGF0dXNUaXRsZS50ZXh0Q29udGVudCA9IFwiU2hpcHlhcmRcIlxuXG4gICAgICAgIHVzZXJTdGF0dXNIZWFkZXIuYXBwZW5kQ2hpbGQodXNlclN0YXR1c1RpdGxlKVxuICAgICAgICBjb21wdXRlclN0YXR1c0hlYWRlci5hcHBlbmRDaGlsZChjb21wdXRlclN0YXR1c1RpdGxlKVxuXG4gICAgICAgIHVzZXJTdGF0dXNQYW5lbENvbnRhaW5lci5hcHBlbmRDaGlsZCh1c2VyU3RhdHVzSGVhZGVyKVxuICAgICAgICBjb21wdXRlclN0YXR1c1BhbmVsQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbXB1dGVyU3RhdHVzSGVhZGVyKVxuXG4gICAgICAgIGNvbnN0IHVzZXJTdGF0dXNQYW5lbCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInN0YXR1c1BhbmVsXCIsXCJ1c2VyU3RhdHVzUGFuZWxcIilcbiAgICAgICAgY29uc3QgY29tcHV0ZXJTdGF0dXNQYW5lbCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInN0YXR1c1BhbmVsXCIsXCJjb21wdXRlclN0YXR1c1BhbmVsXCIpXG5cbiAgICAgICAgdXNlclN0YXR1c1BhbmVsQ29udGFpbmVyLmFwcGVuZENoaWxkKHVzZXJTdGF0dXNQYW5lbClcbiAgICAgICAgY29tcHV0ZXJTdGF0dXNQYW5lbENvbnRhaW5lci5hcHBlbmRDaGlsZChjb21wdXRlclN0YXR1c1BhbmVsKVxuXG4gICAgICAgIHVzZXJTaWRlLmFwcGVuZENoaWxkKHVzZXJTdGF0dXNQYW5lbENvbnRhaW5lcilcbiAgICAgICAgY29tcHV0ZXJTaWRlLmFwcGVuZENoaWxkKGNvbXB1dGVyU3RhdHVzUGFuZWxDb250YWluZXIpXG5cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSB1c2VyIHNoaXB5YXJkXG4gICAgICAgIGNvbnN0IHVzZXJDYXJyaWVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiY2FycmllclwiLFwidXNlckNhcnJpZXJcIilcbiAgICAgICAgY29uc3QgdXNlckJhdHRsZXNoaXAgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJiYXR0bGVzaGlwXCIsXCJ1c2VyQmF0dGxlc2hpcFwiKVxuICAgICAgICBjb25zdCB1c2VyRGVzdHJveWVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiZGVzdHJveWVyXCIsXCJ1c2VyRGVzdHJveWVyXCIpXG4gICAgICAgIGNvbnN0IHVzZXJTdWJtYXJpbmUgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJzdWJtYXJpbmVcIixcInVzZXJTdWJtYXJpbmVcIilcbiAgICAgICAgY29uc3QgdXNlckJvYXQgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJib2F0XCIsXCJ1c2VyQm9hdFwiKVxuXG4gICAgICAgIHVzZXJTdGF0dXNQYW5lbC5hcHBlbmRDaGlsZCh1c2VyQ2FycmllcilcbiAgICAgICAgdXNlclN0YXR1c1BhbmVsLmFwcGVuZENoaWxkKHVzZXJCYXR0bGVzaGlwKVxuICAgICAgICB1c2VyU3RhdHVzUGFuZWwuYXBwZW5kQ2hpbGQodXNlckRlc3Ryb3llcilcbiAgICAgICAgdXNlclN0YXR1c1BhbmVsLmFwcGVuZENoaWxkKHVzZXJTdWJtYXJpbmUpXG4gICAgICAgIHVzZXJTdGF0dXNQYW5lbC5hcHBlbmRDaGlsZCh1c2VyQm9hdClcblxuICAgICAgICAvLyBDcmVhdGUgdGhlIGVuZW15IHNoaXB5YXJkXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQ2FycmllciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImNhcnJpZXJcIixcImNvbXB1dGVyQ2FycmllclwiKVxuICAgICAgICBjb25zdCBjb21wdXRlckJhdHRsZXNoaXAgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJiYXR0bGVzaGlwXCIsXCJjb21wdXRlckJhdHRsZXNoaXBcIilcbiAgICAgICAgY29uc3QgY29tcHV0ZXJEZXN0cm95ZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJkZXN0cm95ZXJcIixcImNvbXB1dGVyRGVzdHJveWVyXCIpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyU3VibWFyaW5lID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwic3VibWFyaW5lXCIsXCJjb21wdXRlclN1Ym1hcmluZVwiKVxuICAgICAgICBjb25zdCBjb21wdXRlckJvYXQgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJib2F0XCIsXCJjb21wdXRlckJvYXRcIilcblxuICAgICAgICBjb21wdXRlclN0YXR1c1BhbmVsLmFwcGVuZENoaWxkKGNvbXB1dGVyQ2FycmllcilcbiAgICAgICAgY29tcHV0ZXJTdGF0dXNQYW5lbC5hcHBlbmRDaGlsZChjb21wdXRlckJhdHRsZXNoaXApXG4gICAgICAgIGNvbXB1dGVyU3RhdHVzUGFuZWwuYXBwZW5kQ2hpbGQoY29tcHV0ZXJEZXN0cm95ZXIpXG4gICAgICAgIGNvbXB1dGVyU3RhdHVzUGFuZWwuYXBwZW5kQ2hpbGQoY29tcHV0ZXJTdWJtYXJpbmUpXG4gICAgICAgIGNvbXB1dGVyU3RhdHVzUGFuZWwuYXBwZW5kQ2hpbGQoY29tcHV0ZXJCb2F0KVxuXG5cblxuICAgIH1cblxuICAgIC8vIExvYWRzIGluaXRpYWwgVUkgc2NyZWVuXG4gICAgZnVuY3Rpb24gbG9hZENvdmVyTWFpblVJKCkge1xuICAgIFxuICAgICAgICAvLyBDcmVhdGUgYSBzY3JlZW4gPGRpdj48L2Rpdj4gdGhhdCBjb3ZlcnMgYWxsIHRoZSBzcGFjZSBhdmFpbGFibGUgb24gYnJvd3NlciBuYXZcbiAgICAgICAgY29uc3Qgc2NyZWVuID0gY3JlYXRlRWxlbWVudChcImRpdlwiLG51bGwsXCJzY3JlZW5cIilcblxuICAgICAgICAvLyBBcHBlbmQgaXQgdG8gYm9keSBlbGVtZW50XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyZWVuKVxuXG4gICAgICAgIC8vIENyZWF0ZSBoZWFkZXIsIG1haW4gYW5kIGZvb3RlciBkaXZzIGluc2lkZSBzY3JlZW4gZGl2XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixudWxsLFwiaGVhZGVyXCIpXG4gICAgICAgIGNvbnN0IG1haW4gPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsbnVsbCxcIm1haW5cIilcbiAgICAgICAgY29uc3QgZm9vdGVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLG51bGwsXCJmb290ZXJcIilcbiAgICAgICAgXG4gICAgICAgIHNjcmVlbi5hcHBlbmRDaGlsZChoZWFkZXIpXG4gICAgICAgIHNjcmVlbi5hcHBlbmRDaGlsZChtYWluKVxuICAgICAgICBzY3JlZW4uYXBwZW5kQ2hpbGQoZm9vdGVyKVxuXG4gICAgICAgIC8vIENyZWF0ZSBhIHRpdGxlIGZvciB0aGUgZ2FtZSBhbmQgYXBwZW5kIGl0IHRvIHRoZSBoZWFkZXJcbiAgICAgICAgY29uc3QgdGl0bGUgPSBjcmVhdGVFbGVtZW50KFwiaDFcIixcInRpdGxlXCIsbnVsbClcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIkJBVFRMRVNISVBcIlxuICAgICAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpXG5cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBjcmVkaXRzIGFuZCBhcHBlbmQgdGhlbSB0byB0aGUgZm9vdGVyXG4gICAgICAgIGNvbnN0IGNyZWRpdHMgPSBjcmVhdGVFbGVtZW50KFwicFwiLFwiY3JlZGl0c1wiLG51bGwpXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBxdW90ZXNcbiAgICAgICAgY3JlZGl0cy5pbm5lckhUTUwgPSAnQ3JlYXRlZCBieSBWRVJFR09STi4gRm9sbG93IG15IHdvcmsgb24gR2l0SHViOiA8YnI+PGJyPjxhIGNsYXNzPVwiZ2l0aHViLWxpbmtcIiBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3ZlcmVnb3JuXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPjxzdmcgY2xhc3M9XCJnaXRodWItaWNvblwiIHdpZHRoPVwiMzJcIiBoZWlnaHQ9XCIzMlwiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTggMEMzLjU4IDAgMCAzLjU4IDAgOGMwIDMuNTQgMi4yOSA2LjUzIDUuNDcgNy41OS40LjA3LjU1LS4xNy41NS0uMzggMC0uMTktLjAxLS44Mi0uMDEtMS40OS0yLjAxLjM3LTIuNTMtLjQ5LTIuNjktLjk0LS4wOS0uMjMtLjQ4LS45NC0uODItMS4xMy0uMjgtLjE1LS42OC0uNTItLjAxLS41My42My0uMDEgMS4wOC41OCAxLjIzLjgyLjcyIDEuMjEgMS44Ny44NyAyLjMzLjY2LjA3LS41Mi4yOC0uODcuNTEtMS4wNy0xLjc4LS4yLTMuNjQtLjg5LTMuNjQtMy45NSAwLS44Ny4zMS0xLjU5LjgyLTIuMTUtLjA4LS4yLS4zNi0xLjAyLjA4LTIuMTIgMCAwIC42Ny0uMjEgMi4yLjgyLjY0LS4xOCAxLjMyLS4yNyAyLS4yNy42OCAwIDEuMzYuMDkgMiAuMjcgMS41My0xLjA0IDIuMi0uODIgMi4yLS44Mi40NCAxLjEuMTYgMS45Mi4wOCAyLjEyLjUxLjU2LjgyIDEuMjcuODIgMi4xNSAwIDMuMDctMS44NyAzLjc1LTMuNjUgMy45NS4yOS4yNS41NC43My41NCAxLjQ4IDAgMS4wNy0uMDEgMS45My0uMDEgMi4yIDAgLjIxLjE1LjQ2LjU1LjM4QTguMDEzIDguMDEzIDAgMCAwIDE2IDhjMC00LjQyLTMuNTgtOC04LTh6XCIvPjwvc3ZnPjwvYT4nXG4gICAgICAgIGZvb3Rlci5hcHBlbmRDaGlsZChjcmVkaXRzKVxuXG4gICAgICAgIC8vIE1haW4gY29udGVudFxuICAgICAgICBjb25zdCBnbG93aW5nQnV0dG9uID0gY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLFwiZ2xvd2luZy1idXR0b25cIixudWxsKVxuICAgICAgICBnbG93aW5nQnV0dG9uLnRleHRDb250ZW50ID0gXCJTVEFSVFwiXG4gICAgICAgIGdsb3dpbmdCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGRlbGV0ZU1haW5VSSgpXG4gICAgICAgICAgICBsb2FkR2FtZVVJKClcbiAgICAgICAgfSlcbiAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChnbG93aW5nQnV0dG9uKVxuXG4gICAgICAgIC8vIFNWRyBTaGlwIHNoYXBlc1xuICAgICAgICBjb25zdCBjYXJyaWVyU2hhcGUgPSBjcmVhdGVFbGVtZW50KFwib2JqZWN0XCIsbnVsbCxcImNhcnJpZXItc2hhcGVcIilcbiAgICAgICAgY2FycmllclNoYXBlLmRhdGEgPSBjYXJyaWVyU3ZnXG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQoY2FycmllclNoYXBlKVxuXG4gICAgICAgIGNvbnN0IHN1Ym1hcmluZVNoYXBlID0gY3JlYXRlRWxlbWVudChcIm9iamVjdFwiLG51bGwsXCJzdWJtYXJpbmUtc2hhcGVcIilcbiAgICAgICAgc3VibWFyaW5lU2hhcGUuZGF0YSA9IHN1Ym1hcmluZVN2Z1xuICAgICAgICBtYWluLmFwcGVuZENoaWxkKHN1Ym1hcmluZVNoYXBlKVxuXG4gICAgICAgIGNvbnN0IGJhdHRsZXNoaXBTaGFwZSA9IGNyZWF0ZUVsZW1lbnQoXCJvYmplY3RcIixudWxsLFwiYmF0dGxlc2hpcC1zaGFwZVwiKVxuICAgICAgICBiYXR0bGVzaGlwU2hhcGUuZGF0YSA9IGJhdHRsZXNoaXBTdmdcbiAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChiYXR0bGVzaGlwU2hhcGUpXG5cbiAgICAgICAgY29uc3QgZGVzdHJveWVyU2hhcGUgPSBjcmVhdGVFbGVtZW50KFwib2JqZWN0XCIsbnVsbCxcImRlc3Ryb3llci1zaGFwZVwiKVxuICAgICAgICBkZXN0cm95ZXJTaGFwZS5kYXRhID0gZGVzdHJveWVyU3ZnXG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQoZGVzdHJveWVyU2hhcGUpXG5cbiAgICAgICAgY29uc3QgcGF0cm9sU2hhcGUgPSBjcmVhdGVFbGVtZW50KFwib2JqZWN0XCIsbnVsbCxcInBhdHJvbC1zaGFwZVwiKVxuICAgICAgICBwYXRyb2xTaGFwZS5kYXRhID0gcGF0cm9sU3ZnXG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQocGF0cm9sU2hhcGUpXG5cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVFbGVtZW50LFxuICAgICAgICBnZXRFbGVtZW50LFxuICAgICAgICBsb2FkQ292ZXJNYWluVUlcbiAgICB9XG5cbn0pKCkiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2dyYXBoaWNzL2NhcnJpZXIuc3ZnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1CcnVubytBY2UmZGlzcGxheT1zd2FwKTtcIl0pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9SUJNK1BsZXgrTW9ubyZkaXNwbGF5PXN3YXApO1wiXSk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcblxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0Ym9yZGVyOiAwO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHRmb250OiBpbmhlcml0O1xcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxufVxcbmJvZHkge1xcblxcdGxpbmUtaGVpZ2h0OiAxO1xcbn1cXG5vbCwgdWwge1xcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGUsIHEge1xcblxcdHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICcnO1xcblxcdGNvbnRlbnQ6IG5vbmU7XFxufVxcbnRhYmxlIHtcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cXG5cXG4vKiBNWSBPV04gU1RZTEVTIEZST00gSEVSRSAqL1xcblxcbi8qIEZvbnRzICovXFxuXFxuYTp2aXNpdGVkIHtcXG4gICAgY29sb3I6ICNmZmY7XFxufVxcblxcbiNzY3JlZW4ge1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7IC8qIG9yIFxcXCJhYnNvbHV0ZVxcXCIgKi9cXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICB6LWluZGV4OiAwO1xcbn1cXG5cXG4vKiBIRUFERVIgKi9cXG5cXG4jaGVhZGVyIHtcXG4gICAgaGVpZ2h0OiAxMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0NzQ3NDc7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCAjMDAwO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgei1pbmRleDogMztcXG59XFxuXFxuLnRpdGxlIHtcXG4gICAgZm9udC1zaXplOiAyZW07XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgY29sb3I6ICNlOGY5MDE7XFxufVxcblxcbiNtYWluIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBoZWlnaHQ6IDgwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcXG59XFxuXFxuLyogQ09WRVIgKi9cXG5cXG4uZ2xvd2luZy1idXR0b24ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNENBRjUwO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgZm9udC1zaXplOiAzZW07XFxuICAgIHBhZGRpbmc6IDIwcHggMzBweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC41cztcXG4gICAgYm94LXNoYWRvdzogMCAwIDVweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxufVxcbiAgXFxuLmdsb3dpbmctYnV0dG9uOmhvdmVyIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xcbiAgICBib3gtc2hhZG93OiAwIDAgMTBweCByZ2JhKDAsIDAsIDAsIDAuMiksIDAgMCAyMHB4IHJnYmEoNzYsIDE3NSwgODAsIDAuNik7XFxufVxcblxcbkBrZXlmcmFtZXMgZ2xvd2luZyB7XFxuICAgIDAlIHtcXG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDAgMTBweCByZ2JhKDc2LCAxNzUsIDgwLCAwLjIpO1xcbiAgICB9XFxuICAgIDUwJSB7XFxuICAgICAgICBib3gtc2hhZG93OiAwIDAgMTBweCByZ2JhKDAsIDAsIDAsIDAuMiksIDAgMCAyMHB4IHJnYmEoNzYsIDE3NSwgODAsIDAuNSk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICBib3gtc2hhZG93OiAwIDAgNXB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAwIDEwcHggcmdiYSg3NiwgMTc1LCA4MCwgMC4yKTtcXG4gICAgfVxcbn1cXG5cXG4uZ2xvd2luZy1idXR0b24ge1xcbiAgICBhbmltYXRpb246IGdsb3dpbmcgMnMgaW5maW5pdGU7XFxufVxcblxcbi8qIENPVkVSIFNISVBTICovXFxuXFxuI2NhcnJpZXItc2hhcGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxODBweDtcXG4gICAgaGVpZ2h0OiA2MHB4O1xcbiAgICB0b3A6IDIwJTtcXG4gICAgYW5pbWF0aW9uOiBtb3ZlLXJpZ2h0LWxlZnQgMTBzIGxpbmVhciBpbmZpbml0ZTsgLyogYWRqdXN0IHRoZSB0aW1lIGFzIG5lZWRlZCAqL1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIG1vdmUtcmlnaHQtbGVmdCB7XFxuICAgIDAlIHsgcmlnaHQ6IC0xMDAlOyB9IC8qIFN0YXJ0IGZyb20gb2ZmIHRoZSByaWdodCBvZiB0aGUgc2NyZWVuICovXFxuICAgIDEwMCUgeyByaWdodDogMTAwJTsgfSAvKiBFbmQgb2ZmIHRoZSBsZWZ0IG9mIHRoZSBzY3JlZW4gKi9cXG59XFxuXFxuI3N1Ym1hcmluZS1zaGFwZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDEyMHB4O1xcbiAgICBoZWlnaHQ6IDYwcHg7XFxuICAgIGxlZnQ6IDIwJTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcbiAgICBhbmltYXRpb246IG1vdmUtdG9wLWRvd24gMTBzIGxpbmVhciBpbmZpbml0ZTtcXG4gICAgei1pbmRleDogMTtcXG59XFxuXFxuQGtleWZyYW1lcyBtb3ZlLXRvcC1kb3duIHtcXG4gICAgMCUgeyB0b3A6IC0yMDBweCB9XFxuICAgIDEwMCUgeyB0b3A6IDE1MDBweH1cXG59XFxuXFxuI2JhdHRsZXNoaXAtc2hhcGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxNTBweDtcXG4gICAgaGVpZ2h0OiA2MHB4O1xcbiAgICB0b3A6IDY1JTtcXG4gICAgYW5pbWF0aW9uOiBtb3ZlLWxlZnQtcmlnaHQgMTBzIGxpbmVhciBpbmZpbml0ZTsgLyogYWRqdXN0IHRoZSB0aW1lIGFzIG5lZWRlZCAqL1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIG1vdmUtbGVmdC1yaWdodCB7XFxuICAgIDAlIHsgbGVmdDogLTEwMCU7IH0gLyogU3RhcnQgZnJvbSBvZmYgdGhlIGxlZnQgb2YgdGhlIHNjcmVlbiAqL1xcbiAgICAxMDAlIHsgbGVmdDogMTAwJTsgfSAvKiBFbmQgb2ZmIHRoZSByaWdodCBvZiB0aGUgc2NyZWVuICovXFxufVxcblxcbiNkZXN0cm95ZXItc2hhcGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxMjBweDtcXG4gICAgaGVpZ2h0OiA2MHB4O1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpO1xcbiAgICBsZWZ0OiA4MCU7XFxuICAgIGFuaW1hdGlvbjogbW92ZS1kb3duLXRvcCAxMHMgbGluZWFyIGluZmluaXRlO1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIG1vdmUtZG93bi10b3Age1xcbiAgICAwJSB7IHRvcDogMTUwMHB4OyB9XFxuICAgIDEwMCUgeyB0b3A6IC0yMDBweDsgfVxcbn1cXG5cXG4jcGF0cm9sLXNoYXBlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogOTBweDtcXG4gICAgaGVpZ2h0OiA2MHB4O1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xcbiAgICB0b3A6IDkwJTtcXG4gICAgYW5pbWF0aW9uOiBtb3ZlLXJpZ2h0LWxlZnQgMTBzIGxpbmVhciBpbmZpbml0ZTtcXG4gICAgei1pbmRleDogMTtcXG59XFxuXFxuLyogTUFJTiAtIEdBTUUgKi9cXG5cXG4ucGxheWVyU2lkZSB7XFxuICAgIHdpZHRoOiA1MCU7XFxuICAgIGhlaWdodDogOTAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBwYWRkaW5nOiA1JTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5nYW1lSGVhZGVyIHtcXG4gICAgd2lkdGg6IDQ0MHB4O1xcbiAgICBmb250LXNpemU6IDEuNWVtO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbiN1c2VyR2FtZUhlYWRlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGQzExNTk7XFxufVxcblxcbiNjb21wdXRlckdhbWVIZWFkZXJ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM3MjdEOTU7XFxufVxcblxcbi5nYW1lYm9hcmRDb250YWluZXIge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLnhIZWFkZXIge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIHBhZGRpbmctbGVmdDogMi41ZW07XFxufVxcblxcbi54SGVhZGVyU3F1YXJlIHtcXG4gICAgd2lkdGg6IDQwcHg7XFxuICAgIGhlaWdodDogNDBweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgZm9udC1zaXplOiAxZW07XFxufVxcblxcbi5ib3R0b21Cb2FyZCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLnlIZWFkZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4ueUhlYWRlclNxdWFyZSB7XFxuICAgIHdpZHRoOiA0MHB4O1xcbiAgICBoZWlnaHQ6IDQwcHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcbn1cXG5cXG4uZ2FtZWJvYXJkR3JpZCB7XFxuICAgIHdpZHRoOiA0MDBweDtcXG4gICAgaGVpZ2h0OiA0MDBweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbn1cXG5cXG4uZ2FtZWJvYXJkU3F1YXJlIHtcXG4gICAgd2lkdGg6IDM4cHg7XFxuICAgIGhlaWdodDogMzhweDtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggI2ZmZjtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgZm9udC1zaXplOiAxZW07XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ExZGNmZjtcXG59XFxuXFxuLmdhbWVib2FyZFNxdWFyZTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMxYjg4ZTc7XFxufVxcblxcbi8qIFNISVBZQVJEICovXFxuXFxuLnN0YXR1c1BhbmVsQ29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDkwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG4ucGFuZWxUaXRsZSB7XFxuICAgIHdyaXRpbmctbW9kZTogdmVydGljYWwtcmw7XFxuICAgIHRleHQtb3JpZW50YXRpb246IG1peGVkO1xcbiAgICByb3RhdGU6IDE4MGRlZztcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBmb250LXNpemU6IDFlbTtcXG59XFxuXFxuLnN0YXR1c1BhbmVsIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG4uY2FycmllciB7XFxuICAgIHdpZHRoOiAxNTBweDtcXG4gICAgaGVpZ2h0OiA0MHB4O1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxufVxcblxcbi8qIEZPT1RFUiAqL1xcblxcbiNmb290ZXIge1xcbiAgICBoZWlnaHQ6IDEwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzQ3NDc0NztcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYm9yZGVyLXRvcDogc29saWQgMXB4ICMwMDA7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICB6LWluZGV4OiAzO1xcbn1cXG5cXG4uY3JlZGl0cyB7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBmb250LWZhbWlseTogJ0lCTSBQbGV4IE1vbm8nLCBtb25vc3BhY2U7XFxuICAgIGZvbnQtc2l6ZTogMC44ZW07XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLyogU3R5bGUgdGhlIGxpbmsgdG8gcmVtb3ZlIGRlZmF1bHQgc3R5bGluZyAqL1xcbi5naXRodWItbGluayB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICBjb2xvcjogaW5oZXJpdDtcXG59XFxuXFxuLyogQWRkIHRoZSBob3ZlciBlZmZlY3QgKi9cXG4uZ2l0aHViLWljb24ge1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC41cyBlYXNlLWluLW91dDsgLyogQWRkIGEgdHJhbnNpdGlvbiBmb3IgdGhlIHRyYW5zZm9ybSBwcm9wZXJ0eSAqL1xcbn1cXG5cXG4uZ2l0aHViLWxpbms6aG92ZXIgLmdpdGh1Yi1pY29uIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTsgLyogUm90YXRlIHRoZSBpY29uIDE4MCBkZWdyZWVzIHdoZW4gaG92ZXJlZCAqL1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL2luZGV4LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7O0NBR0M7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Q0FhQyxTQUFTO0NBQ1QsVUFBVTtDQUNWLFNBQVM7Q0FDVCxlQUFlO0NBQ2YsYUFBYTtDQUNiLHdCQUF3QjtBQUN6QjtBQUNBLGdEQUFnRDtBQUNoRDs7Q0FFQyxjQUFjO0FBQ2Y7QUFDQTtDQUNDLGNBQWM7QUFDZjtBQUNBO0NBQ0MsZ0JBQWdCO0FBQ2pCO0FBQ0E7Q0FDQyxZQUFZO0FBQ2I7QUFDQTs7Q0FFQyxXQUFXO0NBQ1gsYUFBYTtBQUNkO0FBQ0E7Q0FDQyx5QkFBeUI7Q0FDekIsaUJBQWlCO0FBQ2xCOztBQUVBLDRCQUE0Qjs7QUFFNUIsVUFBVTs7QUFLVjtJQUNJLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGVBQWUsRUFBRSxrQkFBa0I7SUFDbkMsTUFBTTtJQUNOLE9BQU87SUFDUCxXQUFXO0lBQ1gsWUFBWTtJQUNaLHNCQUFzQjtJQUN0QixhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLFVBQVU7QUFDZDs7QUFFQSxXQUFXOztBQUVYO0lBQ0ksV0FBVztJQUNYLHlCQUF5QjtJQUN6QixhQUFhO0lBQ2IsNkJBQTZCO0lBQzdCLG1CQUFtQjtJQUNuQix1QkFBdUI7SUFDdkIsVUFBVTtBQUNkOztBQUVBO0lBQ0ksY0FBYztJQUNkLHdCQUF3QjtJQUN4QixjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFdBQVc7SUFDWCxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLHVCQUF1QjtJQUN2QixvQ0FBb0M7QUFDeEM7O0FBRUEsVUFBVTs7QUFFVjtJQUNJLHlCQUF5QjtJQUN6QixZQUFZO0lBQ1osbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixjQUFjO0lBQ2Qsa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixxQkFBcUI7SUFDckIscUJBQXFCO0lB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SUFDYixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLDJCQUEyQjtBQUMvQjs7QUFFQTtJQUNJLHlCQUF5QjtJQUN6Qix1QkFBdUI7SUFDdkIsY0FBYztJQUNkLHdCQUF3QjtJQUN4QixjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksV0FBVztJQUNYLFlBQVk7SUFDWixhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQiwyQkFBMkI7QUFDL0I7O0FBRUE7SUFDSSxZQUFZO0lBQ1osWUFBWTtJQUNaLHlEQUF1RDtJQUN2RCx3QkFBd0I7SUFDeEIsNEJBQTRCO0FBQ2hDOztBQUVBLFdBQVc7O0FBRVg7SUFDSSxXQUFXO0lBQ1gseUJBQXlCO0lBQ3pCLGFBQWE7SUFDYiwwQkFBMEI7SUFDMUIsbUJBQW1CO0lBQ25CLHVCQUF1QjtJQUN2QixVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsdUNBQXVDO0lBQ3ZDLGdCQUFnQjtJQUNoQixrQkFBa0I7QUFDdEI7O0FBRUEsNkNBQTZDO0FBQzdDO0lBQ0kscUJBQXFCO0lBQ3JCLHFCQUFxQjtJQUNyQixjQUFjO0FBQ2xCOztBQUVBLHlCQUF5QjtBQUN6QjtJQUNJLHNDQUFzQyxFQUFFLGdEQUFnRDtBQUM1Rjs7QUFFQTtJQUNJLHlCQUF5QixFQUFFLDZDQUE2QztBQUM1RVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXHRib3JkZXI6IDA7XFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcblxcdGZvbnQ6IGluaGVyaXQ7XFxuXFx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG59XFxuYm9keSB7XFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxufVxcbm9sLCB1bCB7XFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXG59XFxuYmxvY2txdW90ZSwgcSB7XFxuXFx0cXVvdGVzOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuXFx0Y29udGVudDogJyc7XFxuXFx0Y29udGVudDogbm9uZTtcXG59XFxudGFibGUge1xcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxufVxcblxcbi8qIE1ZIE9XTiBTVFlMRVMgRlJPTSBIRVJFICovXFxuXFxuLyogRm9udHMgKi9cXG5cXG5AaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1CcnVubytBY2UmZGlzcGxheT1zd2FwJyk7XFxuQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9SUJNK1BsZXgrTW9ubyZkaXNwbGF5PXN3YXAnKTtcXG5cXG5hOnZpc2l0ZWQge1xcbiAgICBjb2xvcjogI2ZmZjtcXG59XFxuXFxuI3NjcmVlbiB7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDsgLyogb3IgXFxcImFic29sdXRlXFxcIiAqL1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIHotaW5kZXg6IDA7XFxufVxcblxcbi8qIEhFQURFUiAqL1xcblxcbiNoZWFkZXIge1xcbiAgICBoZWlnaHQ6IDEwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzQ3NDc0NztcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYm9yZGVyLWJvdHRvbTogc29saWQgMXB4ICMwMDA7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICB6LWluZGV4OiAzO1xcbn1cXG5cXG4udGl0bGUge1xcbiAgICBmb250LXNpemU6IDJlbTtcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBjb2xvcjogI2U4ZjkwMTtcXG59XFxuXFxuI21haW4ge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGhlaWdodDogODAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpO1xcbn1cXG5cXG4vKiBDT1ZFUiAqL1xcblxcbi5nbG93aW5nLWJ1dHRvbiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0Q0FGNTA7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBmb250LXNpemU6IDNlbTtcXG4gICAgcGFkZGluZzogMjBweCAzMHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjVzO1xcbiAgICBib3gtc2hhZG93OiAwIDAgNXB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcXG59XFxuICBcXG4uZ2xvd2luZy1idXR0b246aG92ZXIge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAwIDIwcHggcmdiYSg3NiwgMTc1LCA4MCwgMC42KTtcXG59XFxuXFxuQGtleWZyYW1lcyBnbG93aW5nIHtcXG4gICAgMCUge1xcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDVweCByZ2JhKDAsIDAsIDAsIDAuMiksIDAgMCAxMHB4IHJnYmEoNzYsIDE3NSwgODAsIDAuMik7XFxuICAgIH1cXG4gICAgNTAlIHtcXG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAwIDIwcHggcmdiYSg3NiwgMTc1LCA4MCwgMC41KTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDAgMTBweCByZ2JhKDc2LCAxNzUsIDgwLCAwLjIpO1xcbiAgICB9XFxufVxcblxcbi5nbG93aW5nLWJ1dHRvbiB7XFxuICAgIGFuaW1hdGlvbjogZ2xvd2luZyAycyBpbmZpbml0ZTtcXG59XFxuXFxuLyogQ09WRVIgU0hJUFMgKi9cXG5cXG4jY2Fycmllci1zaGFwZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDE4MHB4O1xcbiAgICBoZWlnaHQ6IDYwcHg7XFxuICAgIHRvcDogMjAlO1xcbiAgICBhbmltYXRpb246IG1vdmUtcmlnaHQtbGVmdCAxMHMgbGluZWFyIGluZmluaXRlOyAvKiBhZGp1c3QgdGhlIHRpbWUgYXMgbmVlZGVkICovXFxuICAgIHotaW5kZXg6IDE7XFxufVxcblxcbkBrZXlmcmFtZXMgbW92ZS1yaWdodC1sZWZ0IHtcXG4gICAgMCUgeyByaWdodDogLTEwMCU7IH0gLyogU3RhcnQgZnJvbSBvZmYgdGhlIHJpZ2h0IG9mIHRoZSBzY3JlZW4gKi9cXG4gICAgMTAwJSB7IHJpZ2h0OiAxMDAlOyB9IC8qIEVuZCBvZmYgdGhlIGxlZnQgb2YgdGhlIHNjcmVlbiAqL1xcbn1cXG5cXG4jc3VibWFyaW5lLXNoYXBlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMTIwcHg7XFxuICAgIGhlaWdodDogNjBweDtcXG4gICAgbGVmdDogMjAlO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxuICAgIGFuaW1hdGlvbjogbW92ZS10b3AtZG93biAxMHMgbGluZWFyIGluZmluaXRlO1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIG1vdmUtdG9wLWRvd24ge1xcbiAgICAwJSB7IHRvcDogLTIwMHB4IH1cXG4gICAgMTAwJSB7IHRvcDogMTUwMHB4fVxcbn1cXG5cXG4jYmF0dGxlc2hpcC1zaGFwZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDE1MHB4O1xcbiAgICBoZWlnaHQ6IDYwcHg7XFxuICAgIHRvcDogNjUlO1xcbiAgICBhbmltYXRpb246IG1vdmUtbGVmdC1yaWdodCAxMHMgbGluZWFyIGluZmluaXRlOyAvKiBhZGp1c3QgdGhlIHRpbWUgYXMgbmVlZGVkICovXFxuICAgIHotaW5kZXg6IDE7XFxufVxcblxcbkBrZXlmcmFtZXMgbW92ZS1sZWZ0LXJpZ2h0IHtcXG4gICAgMCUgeyBsZWZ0OiAtMTAwJTsgfSAvKiBTdGFydCBmcm9tIG9mZiB0aGUgbGVmdCBvZiB0aGUgc2NyZWVuICovXFxuICAgIDEwMCUgeyBsZWZ0OiAxMDAlOyB9IC8qIEVuZCBvZmYgdGhlIHJpZ2h0IG9mIHRoZSBzY3JlZW4gKi9cXG59XFxuXFxuI2Rlc3Ryb3llci1zaGFwZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDEyMHB4O1xcbiAgICBoZWlnaHQ6IDYwcHg7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7XFxuICAgIGxlZnQ6IDgwJTtcXG4gICAgYW5pbWF0aW9uOiBtb3ZlLWRvd24tdG9wIDEwcyBsaW5lYXIgaW5maW5pdGU7XFxuICAgIHotaW5kZXg6IDE7XFxufVxcblxcbkBrZXlmcmFtZXMgbW92ZS1kb3duLXRvcCB7XFxuICAgIDAlIHsgdG9wOiAxNTAwcHg7IH1cXG4gICAgMTAwJSB7IHRvcDogLTIwMHB4OyB9XFxufVxcblxcbiNwYXRyb2wtc2hhcGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiA5MHB4O1xcbiAgICBoZWlnaHQ6IDYwcHg7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XFxuICAgIHRvcDogOTAlO1xcbiAgICBhbmltYXRpb246IG1vdmUtcmlnaHQtbGVmdCAxMHMgbGluZWFyIGluZmluaXRlO1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG4vKiBNQUlOIC0gR0FNRSAqL1xcblxcbi5wbGF5ZXJTaWRlIHtcXG4gICAgd2lkdGg6IDUwJTtcXG4gICAgaGVpZ2h0OiA5MCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIHBhZGRpbmc6IDUlO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLmdhbWVIZWFkZXIge1xcbiAgICB3aWR0aDogNDQwcHg7XFxuICAgIGZvbnQtc2l6ZTogMS41ZW07XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuI3VzZXJHYW1lSGVhZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0ZDMTE1OTtcXG59XFxuXFxuI2NvbXB1dGVyR2FtZUhlYWRlcntcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzcyN0Q5NTtcXG59XFxuXFxuLmdhbWVib2FyZENvbnRhaW5lciB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4ueEhlYWRlciB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgcGFkZGluZy1sZWZ0OiAyLjVlbTtcXG59XFxuXFxuLnhIZWFkZXJTcXVhcmUge1xcbiAgICB3aWR0aDogNDBweDtcXG4gICAgaGVpZ2h0OiA0MHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBmb250LXNpemU6IDFlbTtcXG59XFxuXFxuLmJvdHRvbUJvYXJkIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4ueUhlYWRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbi55SGVhZGVyU3F1YXJlIHtcXG4gICAgd2lkdGg6IDQwcHg7XFxuICAgIGhlaWdodDogNDBweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgZm9udC1zaXplOiAxZW07XFxufVxcblxcbi5nYW1lYm9hcmRHcmlkIHtcXG4gICAgd2lkdGg6IDQwMHB4O1xcbiAgICBoZWlnaHQ6IDQwMHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxufVxcblxcbi5nYW1lYm9hcmRTcXVhcmUge1xcbiAgICB3aWR0aDogMzhweDtcXG4gICAgaGVpZ2h0OiAzOHB4O1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjZmZmO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBmb250LXNpemU6IDFlbTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTFkY2ZmO1xcbn1cXG5cXG4uZ2FtZWJvYXJkU3F1YXJlOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzFiODhlNztcXG59XFxuXFxuLyogU0hJUFlBUkQgKi9cXG5cXG4uc3RhdHVzUGFuZWxDb250YWluZXIge1xcbiAgICB3aWR0aDogOTAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxufVxcblxcbi5wYW5lbFRpdGxlIHtcXG4gICAgd3JpdGluZy1tb2RlOiB2ZXJ0aWNhbC1ybDtcXG4gICAgdGV4dC1vcmllbnRhdGlvbjogbWl4ZWQ7XFxuICAgIHJvdGF0ZTogMTgwZGVnO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcbn1cXG5cXG4uc3RhdHVzUGFuZWwge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxufVxcblxcbi5jYXJyaWVyIHtcXG4gICAgd2lkdGg6IDE1MHB4O1xcbiAgICBoZWlnaHQ6IDQwcHg7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiLi4vYXNzZXRzL2dyYXBoaWNzL2NhcnJpZXIuc3ZnXFxcIik7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG59XFxuXFxuLyogRk9PVEVSICovXFxuXFxuI2Zvb3RlciB7XFxuICAgIGhlaWdodDogMTAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDc0NzQ3O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBib3JkZXItdG9wOiBzb2xpZCAxcHggIzAwMDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIHotaW5kZXg6IDM7XFxufVxcblxcbi5jcmVkaXRzIHtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGZvbnQtZmFtaWx5OiAnSUJNIFBsZXggTW9ubycsIG1vbm9zcGFjZTtcXG4gICAgZm9udC1zaXplOiAwLjhlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4vKiBTdHlsZSB0aGUgbGluayB0byByZW1vdmUgZGVmYXVsdCBzdHlsaW5nICovXFxuLmdpdGh1Yi1saW5rIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGNvbG9yOiBpbmhlcml0O1xcbn1cXG5cXG4vKiBBZGQgdGhlIGhvdmVyIGVmZmVjdCAqL1xcbi5naXRodWItaWNvbiB7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjVzIGVhc2UtaW4tb3V0OyAvKiBBZGQgYSB0cmFuc2l0aW9uIGZvciB0aGUgdHJhbnNmb3JtIHByb3BlcnR5ICovXFxufVxcblxcbi5naXRodWItbGluazpob3ZlciAuZ2l0aHViLWljb24ge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyAvKiBSb3RhdGUgdGhlIGljb24gMTgwIGRlZ3JlZXMgd2hlbiBob3ZlcmVkICovXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIwOTk0NTI3ZWUyOTU4M2IwMjcxZmU3OTc5MGM5MGVlMC5zdmdcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZWRjYjI3OTU1NjM1ZWRmZGZkMTk2YmJkYjdmN2RmOWYuc3ZnXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZhYzk3NDg3NjdkZWYzZTFmMzhkOTMzYjEwMTAyMGYwLnN2Z1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCI5NWZlOWNhZDllZTQ4Y2I2MTFiZmVlZjZhNDdkMzU5Mi5zdmdcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiOThiZWIzNmRkMzY0YjJhMmNhOWIwZDA1ZDE3ZDEyNTQuc3ZnXCI7IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiXSwibmFtZXMiOlsidmlldyIsImxvYWRDb3Zlck1haW5VSSIsImNhcnJpZXJTdmciLCJzdWJtYXJpbmVTdmciLCJiYXR0bGVzaGlwU3ZnIiwiZGVzdHJveWVyU3ZnIiwicGF0cm9sU3ZnIiwiY3JlYXRlRWxlbWVudCIsInRhZyIsImNsYXNzTmFtZSIsImlkIiwiZWxlbWVudCIsImRvY3VtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0QXR0cmlidXRlIiwiZ2V0RWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwiZGVsZXRlTWFpblVJIiwibWFpbiIsImlubmVySFRNTCIsImxvYWRHYW1lVUkiLCJ1c2VyU2lkZSIsImNvbXB1dGVyU2lkZSIsImFwcGVuZENoaWxkIiwidXNlckhlYWRlciIsImNvbXB1dGVySGVhZGVyIiwidXNlclRpdGxlIiwiY29tcHV0ZXJUaXRsZSIsInRleHRDb250ZW50IiwidXNlckdhbWVib2FyZENvbnRhaW5lciIsImNvbXB1dGVyR2FtZWJvYXJkQ29udGFpbmVyIiwidXNlclhIZWFkZXIiLCJjb21wdXRlclhIZWFkZXIiLCJpIiwidXNlclhIZWFkZXJTcXVhcmUiLCJjb21wdXRlclhIZWFkZXJTcXVhcmUiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJ1c2VyQm90dG9tQm9hcmQiLCJjb21wdXRlckJvdHRvbUJvYXJkIiwidXNlcllIZWFkZXIiLCJjb21wdXRlcllIZWFkZXIiLCJ1c2VyWUhlYWRlclNxdWFyZSIsImNvbXB1dGVyWUhlYWRlclNxdWFyZSIsInVzZXJHYW1lYm9hcmQiLCJjb21wdXRlckdhbWVib2FyZCIsInVzZXJHYW1lYm9hcmRTcXVhcmUiLCJjb21wdXRlckdhbWVib2FyZFNxdWFyZSIsInVzZXJTdGF0dXNQYW5lbENvbnRhaW5lciIsImNvbXB1dGVyU3RhdHVzUGFuZWxDb250YWluZXIiLCJ1c2VyU3RhdHVzSGVhZGVyIiwiY29tcHV0ZXJTdGF0dXNIZWFkZXIiLCJ1c2VyU3RhdHVzVGl0bGUiLCJjb21wdXRlclN0YXR1c1RpdGxlIiwidXNlclN0YXR1c1BhbmVsIiwiY29tcHV0ZXJTdGF0dXNQYW5lbCIsInVzZXJDYXJyaWVyIiwidXNlckJhdHRsZXNoaXAiLCJ1c2VyRGVzdHJveWVyIiwidXNlclN1Ym1hcmluZSIsInVzZXJCb2F0IiwiY29tcHV0ZXJDYXJyaWVyIiwiY29tcHV0ZXJCYXR0bGVzaGlwIiwiY29tcHV0ZXJEZXN0cm95ZXIiLCJjb21wdXRlclN1Ym1hcmluZSIsImNvbXB1dGVyQm9hdCIsInNjcmVlbiIsImJvZHkiLCJoZWFkZXIiLCJmb290ZXIiLCJ0aXRsZSIsImNyZWRpdHMiLCJnbG93aW5nQnV0dG9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNhcnJpZXJTaGFwZSIsImRhdGEiLCJzdWJtYXJpbmVTaGFwZSIsImJhdHRsZXNoaXBTaGFwZSIsImRlc3Ryb3llclNoYXBlIiwicGF0cm9sU2hhcGUiXSwic291cmNlUm9vdCI6IiJ9