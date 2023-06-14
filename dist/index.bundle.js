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
/* harmony import */ var _assets_graphics_carrier_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/graphics/carrier.svg */ "./src/assets/graphics/carrier.svg");
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
    // Some useful variables
    let selectedShipLength = 0;
    let orientation = "horizontal";
    let selectedShipName = "";

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
    const userYHeaderShipyard = createElement("div", "yHeaderShipyard", null);
    const computerYHeaderShipyard = createElement("div", "yHeaderShipyard", null);
    userYHeaderShipyard.textContent = "Shipyard";
    computerYHeaderShipyard.textContent = "Shipyard";
    userYHeader.appendChild(userYHeaderShipyard);
    computerYHeader.appendChild(computerYHeaderShipyard);
    const userGridPanelContainer = createElement("div", "gridPanelContainer", "userGridPanelContainer");
    const computerGridPanelContainer = createElement("div", "gridPanelContainer", "computerGridPanelContainer");
    const userGameboard = createElement("div", "gameboardGrid", "userGameboardGrid");
    const computerGameboard = createElement("div", "gameboardGrid", "computerGameboardGrid");

    // Generate the gameboard squares
    for (let i = 0; i < 100; i += 1) {
      const userGameboardSquare = createElement("div", "gameboardSquare", null);
      const computerGameboardSquare = createElement("div", "gameboardSquare", null);
      userGameboard.appendChild(userGameboardSquare);
      computerGameboard.appendChild(computerGameboardSquare);
    }
    userGridPanelContainer.appendChild(userGameboard);
    computerGridPanelContainer.appendChild(computerGameboard);
    userGameboardContainer.appendChild(userXHeader);
    userGameboardContainer.appendChild(userBottomBoard);
    userBottomBoard.appendChild(userYHeader);
    userBottomBoard.appendChild(userGridPanelContainer);
    computerGameboardContainer.appendChild(computerXHeader);
    computerGameboardContainer.appendChild(computerBottomBoard);
    computerBottomBoard.appendChild(computerYHeader);
    computerBottomBoard.appendChild(computerGridPanelContainer);
    userSide.appendChild(userGameboardContainer);
    computerSide.appendChild(computerGameboardContainer);

    // Fleet Status Panels

    const userStatusPanel = createElement("div", "statusPanel", "userStatusPanel");
    const computerStatusPanel = createElement("div", "statusPanel", "computerStatusPanel");
    userGridPanelContainer.appendChild(userStatusPanel);
    computerGridPanelContainer.appendChild(computerStatusPanel);

    // Create the user shipyard
    const userCarrier = createElement("div", "carrier", "userCarrier");
    userCarrier.classList.add("userShip");
    userCarrier.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 188 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                <g transform="matrix(1.13728,0,0,0.751167,-14.2455,-0.759376)">
                    <path d="M175.177,15.017C175.177,9.503 170.7,5.026 165.186,5.026L25.14,5.026C19.626,5.026 15.149,9.503 15.149,15.017L15.149,34.998C15.149,40.512 19.626,44.989 25.14,44.989L165.186,44.989C170.7,44.989 175.177,40.512 175.177,34.998L175.177,15.017Z" style="fill:rgb(153,153,153);"/>
                </g>
                <g transform="matrix(1,0,0,1,-11.1927,2.983)">
                    <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                </g>
                <g transform="matrix(1,0,0,1,-49.1726,2.983)">
                    <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                </g>
                <g transform="matrix(1,0,0,1,-87.1498,2.983)">
                    <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                </g>
                <g transform="matrix(1,0,0,1,26.8145,2.983)">
                    <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                </g>
                <g transform="matrix(1,0,0,1,64.7949,2.983)">
                    <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                </g>
            </svg>`;
    const userBattleship = createElement("div", "battleship", "userBattleship");
    userBattleship.classList.add("userShip");
    userBattleship.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 150 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                <g transform="matrix(1,0,0,1,-20.1628,-7.00741)">
                    <g transform="matrix(1.28863,0,0,0.7503,9.3355,2.48393)">
                        <path d="M96.95,43.042C91.743,45.635 85.257,47.968 78.066,49.982L22.671,49.982C15.888,44.911 10.744,37.739 10.73,30.026C10.717,22.308 15.841,15.115 22.612,10.019L78.034,10.019C84.843,11.946 91.021,14.159 96.085,16.577L95.936,16.556C90.763,16.556 86.563,22.522 86.563,29.872C86.563,37.221 90.763,43.188 95.936,43.188L96.95,43.042Z" style="fill:rgb(153,153,153);"/>
                    </g>
                    <g transform="matrix(7.33502,0,0,1.46121,-639.244,-19.2598)">
                        <path d="M104.188,23.611C103.676,22.236 102.998,21.032 102.193,20.025C104.262,21.338 105.969,22.708 107.248,24.15C106.803,25.254 106.499,27.56 106.499,30.219C106.499,32.705 106.765,34.883 107.164,36.058C105.749,37.629 103.828,39.119 101.488,40.545C102.501,39.503 103.356,38.176 103.996,36.612C104.151,36.907 104.321,37.057 104.498,37.057C105.298,37.057 105.948,34.008 105.948,30.252C105.948,26.497 105.298,23.448 104.498,23.448C104.392,23.448 104.288,23.501 104.188,23.611Z" style="fill:rgb(153,153,153);"/>
                    </g>
                    <g transform="matrix(7.33502,0,0,1.46121,-639.244,-19.2598)">
                        <path d="M109.01,26.579C109.624,27.718 109.946,28.889 109.944,30.072C109.942,31.212 109.639,32.341 109.064,33.448C109.17,32.493 109.229,31.39 109.229,30.219C109.229,28.872 109.151,27.615 109.01,26.579Z" style="fill:rgb(153,153,153);"/>
                    </g>
                </g>
                <g transform="matrix(1,0,0,1,-60.1736,2.9832)">
                    <g transform="matrix(1,0,0,1,11.1098,-0.110922)">
                        <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                    </g>
                    <g transform="matrix(1,0,0,1,60.1736,-2.9832)">
                        <path d="M104.818,8.234C110.081,10.923 113.036,14.056 113.036,17.382C113.036,21 109.54,24.388 103.403,27.23C99.34,25.858 96.45,22.211 96.45,17.937C96.45,13.179 100.035,9.196 104.818,8.234Z" style="fill:rgb(153,153,153);"/>
                    </g>
                    <g transform="matrix(1,0,0,1,60.1736,-2.9832)">
                        <path d="M104.818,8.234C105.548,8.073 106.308,7.995 107.088,7.995C112.96,7.995 117.727,12.45 117.727,17.937C117.727,23.425 112.96,27.88 107.088,27.88C105.789,27.88 104.543,27.662 103.403,27.23C109.54,24.388 113.036,21 113.036,17.382C113.036,14.056 110.081,10.923 104.818,8.234Z" style="fill:rgb(153,153,153);"/>
                    </g>
                    <g transform="matrix(1,0,0,1,86.7788,-0.110922)">
                        <path d="M100.657,6.149C106.011,7.304 110.349,8.487 113.58,9.698C114.613,11.212 115.185,13.048 115.185,15.017C115.185,16.728 114.753,18.34 113.972,19.735C110.581,21.042 105.901,22.331 100.037,23.549C97.11,21.832 95.163,18.65 95.163,15.017C95.163,11.132 97.389,7.762 100.657,6.149Z" style="fill:rgb(102,102,102);"/>
                    </g>
                    <g transform="matrix(1,0,0,1,48.7987,-0.0002)">
                        <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                    </g>
                </g>
                <g transform="matrix(1,0,0,1,-87.1182,2.87228)">
                    <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                </g>
            </svg>`;
    const userDestroyer = createElement("div", "destroyer", "userDestroyer");
    userDestroyer.classList.add("userShip");
    userDestroyer.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 112 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                <g transform="matrix(1,0,0,1,-39.1628,-7.00741)">
                    <g transform="matrix(1.06806,0,0,0.7503,30.7195,2.48393)">
                        <path d="M96.95,43.042C91.743,45.635 85.257,47.968 78.066,49.982L22.671,49.982C15.888,44.911 10.744,37.739 10.73,30.026C10.717,22.308 15.841,15.115 22.612,10.019L78.034,10.019C84.843,11.946 91.021,14.159 96.085,16.577L95.936,16.556C90.763,16.556 86.563,22.522 86.563,29.872C86.563,37.221 90.763,43.188 95.936,43.188L96.95,43.042Z" style="fill:rgb(153,153,153);"/>
                    </g>
                    <g transform="matrix(1.06806,0,0,0.7503,30.7195,2.48393)">
                        <path d="M102.193,20.025C107.079,23.126 109.95,26.546 109.944,30.072C109.937,33.758 106.785,37.318 101.488,40.545C103.812,38.153 105.309,34.259 105.309,29.872C105.309,25.953 104.115,22.428 102.193,20.025Z" style="fill:rgb(153,153,153);"/>
                    </g>
                </g>
                <g transform="matrix(1,0,0,1,-11.1517,2.87228)">
                    <path d="M105.334,5.042C107.773,5.859 109.97,6.707 111.857,7.629C113.91,9.432 115.185,12.077 115.185,15.017C115.185,18.308 113.587,21.23 111.104,23.025L110.391,23.365L106.257,24.899L105.174,25.008C99.649,25.008 95.163,20.531 95.163,15.017C95.163,9.503 99.649,5.026 105.174,5.026L105.334,5.042Z" style="fill:rgb(102,102,102);"/>
                </g>
                <g transform="matrix(1,0,0,1,-49.174,2.87228)">
                    <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                </g>
                <g transform="matrix(1,0,0,1,-87.1881,2.87228)">
                    <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                </g>
            </svg>`;
    const userSubmarine = createElement("div", "submarine", "userSubmarine");
    userSubmarine.classList.add("userShip");
    userSubmarine.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 112 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                <g transform="matrix(1.06836,0,0,0.752001,-40.4103,-4.54153)">
                    <path d="M128.116,10.019C134.814,15.108 139.865,22.253 139.851,29.915C139.837,37.685 134.619,44.904 127.762,49.982L52.691,49.982C45.834,44.904 40.616,37.685 40.602,29.915C40.588,22.253 45.639,15.108 52.337,10.019L128.116,10.019Z" style="fill:rgb(153,153,153);"/>
                </g>
                <g transform="matrix(1,0,0,1,-11.19,3.00157)">
                    <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                </g>
                <g transform="matrix(1,0,0,1,-49.1896,3.00157)">
                    <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                </g>
                <g transform="matrix(1,0,0,1,-87.1672,3.00157)">
                    <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                </g>
            </svg>`;
    const userBoat = createElement("div", "boat", "userBoat");
    userBoat.classList.add("userShip");
    userBoat.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 74 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                <g transform="matrix(0.976973,0,0,0.752048,-7.06641,-4.56753)">
                    <path d="M48.034,10.019C66.253,15.178 79.957,22.374 79.944,30.072C79.93,37.754 66.253,44.889 48.066,49.982L23.908,49.982C16.201,44.911 10.356,37.736 10.342,30.018C10.328,22.305 16.139,15.115 23.817,10.019L48.034,10.019Z" style="fill:rgb(153,153,153);"/>
                </g>
                <g transform="matrix(1,0,0,1,-49.1752,2.983)">
                    <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                </g>
                <g transform="matrix(1,0,0,1,-87.1661,2.983)">
                    <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                </g>
            </svg>`;
    userStatusPanel.appendChild(userCarrier);
    userStatusPanel.appendChild(userBattleship);
    userStatusPanel.appendChild(userDestroyer);
    userStatusPanel.appendChild(userSubmarine);
    userStatusPanel.appendChild(userBoat);

    // Create the enemy shipyard
    const computerCarrier = createElement("div", "carrier", "computerCarrier");
    computerCarrier.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 188 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                <g transform="matrix(1.13728,0,0,0.751167,-14.2455,-0.759376)">
                    <path d="M175.177,15.017C175.177,9.503 170.7,5.026 165.186,5.026L25.14,5.026C19.626,5.026 15.149,9.503 15.149,15.017L15.149,34.998C15.149,40.512 19.626,44.989 25.14,44.989L165.186,44.989C170.7,44.989 175.177,40.512 175.177,34.998L175.177,15.017Z" style="fill:rgb(153,153,153);"/>
                </g>
                <g transform="matrix(1,0,0,1,-11.1927,2.983)">
                    <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                </g>
                <g transform="matrix(1,0,0,1,-49.1726,2.983)">
                    <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                </g>
                <g transform="matrix(1,0,0,1,-87.1498,2.983)">
                    <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                </g>
                <g transform="matrix(1,0,0,1,26.8145,2.983)">
                    <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                </g>
                <g transform="matrix(1,0,0,1,64.7949,2.983)">
                    <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                </g>
            </svg>`;
    const computerBattleship = createElement("div", "battleship", "computerBattleship");
    computerBattleship.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 150 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                <g transform="matrix(1,0,0,1,-20.1628,-7.00741)">
                    <g transform="matrix(1.28863,0,0,0.7503,9.3355,2.48393)">
                        <path d="M96.95,43.042C91.743,45.635 85.257,47.968 78.066,49.982L22.671,49.982C15.888,44.911 10.744,37.739 10.73,30.026C10.717,22.308 15.841,15.115 22.612,10.019L78.034,10.019C84.843,11.946 91.021,14.159 96.085,16.577L95.936,16.556C90.763,16.556 86.563,22.522 86.563,29.872C86.563,37.221 90.763,43.188 95.936,43.188L96.95,43.042Z" style="fill:rgb(153,153,153);"/>
                    </g>
                    <g transform="matrix(7.33502,0,0,1.46121,-639.244,-19.2598)">
                        <path d="M104.188,23.611C103.676,22.236 102.998,21.032 102.193,20.025C104.262,21.338 105.969,22.708 107.248,24.15C106.803,25.254 106.499,27.56 106.499,30.219C106.499,32.705 106.765,34.883 107.164,36.058C105.749,37.629 103.828,39.119 101.488,40.545C102.501,39.503 103.356,38.176 103.996,36.612C104.151,36.907 104.321,37.057 104.498,37.057C105.298,37.057 105.948,34.008 105.948,30.252C105.948,26.497 105.298,23.448 104.498,23.448C104.392,23.448 104.288,23.501 104.188,23.611Z" style="fill:rgb(153,153,153);"/>
                    </g>
                    <g transform="matrix(7.33502,0,0,1.46121,-639.244,-19.2598)">
                        <path d="M109.01,26.579C109.624,27.718 109.946,28.889 109.944,30.072C109.942,31.212 109.639,32.341 109.064,33.448C109.17,32.493 109.229,31.39 109.229,30.219C109.229,28.872 109.151,27.615 109.01,26.579Z" style="fill:rgb(153,153,153);"/>
                    </g>
                </g>
                <g transform="matrix(1,0,0,1,-60.1736,2.9832)">
                    <g transform="matrix(1,0,0,1,11.1098,-0.110922)">
                        <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                    </g>
                    <g transform="matrix(1,0,0,1,60.1736,-2.9832)">
                        <path d="M104.818,8.234C110.081,10.923 113.036,14.056 113.036,17.382C113.036,21 109.54,24.388 103.403,27.23C99.34,25.858 96.45,22.211 96.45,17.937C96.45,13.179 100.035,9.196 104.818,8.234Z" style="fill:rgb(153,153,153);"/>
                    </g>
                    <g transform="matrix(1,0,0,1,60.1736,-2.9832)">
                        <path d="M104.818,8.234C105.548,8.073 106.308,7.995 107.088,7.995C112.96,7.995 117.727,12.45 117.727,17.937C117.727,23.425 112.96,27.88 107.088,27.88C105.789,27.88 104.543,27.662 103.403,27.23C109.54,24.388 113.036,21 113.036,17.382C113.036,14.056 110.081,10.923 104.818,8.234Z" style="fill:rgb(153,153,153);"/>
                    </g>
                    <g transform="matrix(1,0,0,1,86.7788,-0.110922)">
                        <path d="M100.657,6.149C106.011,7.304 110.349,8.487 113.58,9.698C114.613,11.212 115.185,13.048 115.185,15.017C115.185,16.728 114.753,18.34 113.972,19.735C110.581,21.042 105.901,22.331 100.037,23.549C97.11,21.832 95.163,18.65 95.163,15.017C95.163,11.132 97.389,7.762 100.657,6.149Z" style="fill:rgb(102,102,102);"/>
                    </g>
                    <g transform="matrix(1,0,0,1,48.7987,-0.0002)">
                        <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                    </g>
                </g>
                <g transform="matrix(1,0,0,1,-87.1182,2.87228)">
                    <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                </g>
            </svg>`;
    const computerDestroyer = createElement("div", "destroyer", "computerDestroyer");
    computerDestroyer.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 112 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                <g transform="matrix(1,0,0,1,-39.1628,-7.00741)">
                    <g transform="matrix(1.06806,0,0,0.7503,30.7195,2.48393)">
                        <path d="M96.95,43.042C91.743,45.635 85.257,47.968 78.066,49.982L22.671,49.982C15.888,44.911 10.744,37.739 10.73,30.026C10.717,22.308 15.841,15.115 22.612,10.019L78.034,10.019C84.843,11.946 91.021,14.159 96.085,16.577L95.936,16.556C90.763,16.556 86.563,22.522 86.563,29.872C86.563,37.221 90.763,43.188 95.936,43.188L96.95,43.042Z" style="fill:rgb(153,153,153);"/>
                    </g>
                    <g transform="matrix(1.06806,0,0,0.7503,30.7195,2.48393)">
                        <path d="M102.193,20.025C107.079,23.126 109.95,26.546 109.944,30.072C109.937,33.758 106.785,37.318 101.488,40.545C103.812,38.153 105.309,34.259 105.309,29.872C105.309,25.953 104.115,22.428 102.193,20.025Z" style="fill:rgb(153,153,153);"/>
                    </g>
                </g>
                <g transform="matrix(1,0,0,1,-11.1517,2.87228)">
                    <path d="M105.334,5.042C107.773,5.859 109.97,6.707 111.857,7.629C113.91,9.432 115.185,12.077 115.185,15.017C115.185,18.308 113.587,21.23 111.104,23.025L110.391,23.365L106.257,24.899L105.174,25.008C99.649,25.008 95.163,20.531 95.163,15.017C95.163,9.503 99.649,5.026 105.174,5.026L105.334,5.042Z" style="fill:rgb(102,102,102);"/>
                </g>
                <g transform="matrix(1,0,0,1,-49.174,2.87228)">
                    <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                </g>
                <g transform="matrix(1,0,0,1,-87.1881,2.87228)">
                    <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                </g>
            </svg>`;
    const computerSubmarine = createElement("div", "submarine", "computerSubmarine");
    computerSubmarine.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 112 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                <g transform="matrix(1.06836,0,0,0.752001,-40.4103,-4.54153)">
                    <path d="M128.116,10.019C134.814,15.108 139.865,22.253 139.851,29.915C139.837,37.685 134.619,44.904 127.762,49.982L52.691,49.982C45.834,44.904 40.616,37.685 40.602,29.915C40.588,22.253 45.639,15.108 52.337,10.019L128.116,10.019Z" style="fill:rgb(153,153,153);"/>
                </g>
                <g transform="matrix(1,0,0,1,-11.19,3.00157)">
                    <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                </g>
                <g transform="matrix(1,0,0,1,-49.1896,3.00157)">
                    <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                </g>
                <g transform="matrix(1,0,0,1,-87.1672,3.00157)">
                    <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                </g>
            </svg>`;
    const computerBoat = createElement("div", "boat", "computerBoat");
    computerBoat.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 74 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                <g transform="matrix(0.976973,0,0,0.752048,-7.06641,-4.56753)">
                    <path d="M48.034,10.019C66.253,15.178 79.957,22.374 79.944,30.072C79.93,37.754 66.253,44.889 48.066,49.982L23.908,49.982C16.201,44.911 10.356,37.736 10.342,30.018C10.328,22.305 16.139,15.115 23.817,10.019L48.034,10.019Z" style="fill:rgb(153,153,153);"/>
                </g>
                <g transform="matrix(1,0,0,1,-49.1752,2.983)">
                    <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                </g>
                <g transform="matrix(1,0,0,1,-87.1661,2.983)">
                    <ellipse cx="105.174" cy="15.017" rx="10.011" ry="9.991" style="fill:rgb(102,102,102);"/>
                </g>
            </svg>`;
    computerStatusPanel.appendChild(computerCarrier);
    computerStatusPanel.appendChild(computerBattleship);
    computerStatusPanel.appendChild(computerDestroyer);
    computerStatusPanel.appendChild(computerSubmarine);
    computerStatusPanel.appendChild(computerBoat);

    // Create a div to show instructions to the user
    const instructions = createElement("div", "instructions", null);
    instructions.textContent = "Click on a ship to place it on the board";
    userSide.appendChild(instructions);

    // Adding event listeners to user ships
    const userShips = document.querySelectorAll(".userShip");
    userShips.forEach(ship => {
      ship.addEventListener("click", () => {
        // If ship is already placed on board, return
        if (ship.classList.contains("placed")) return;

        // If there is other selected ship, remove the selected class from it
        const selectedShip = document.querySelector(".selected");
        if (selectedShip) selectedShip.classList.remove("selected");

        // Add selected class to the clicked ship
        ship.classList.add("selected");

        // Update selected ship and selectedShipLength variables
        // eslint-disable-next-line prefer-destructuring
        selectedShipName = ship.classList[0];
        switch (selectedShipName) {
          case "carrier":
            selectedShipLength = 5;
            break;
          case "battleship":
            selectedShipLength = 4;
            break;
          case "destroyer":
            selectedShipLength = 3;
            break;
          case "submarine":
            selectedShipLength = 3;
            break;
          case "boat":
            selectedShipLength = 2;
            break;
          default:
            selectedShipLength = 0;
            break;
        }

        // Change instructions text
        instructions.textContent = "Select a position on the board to place the ship. Use T key to rotate the ship";
      });
    });

    // Adding event listeners to user board cells
    const userBoardSquares = Array.from(document.querySelectorAll("#userGameboardGrid .gameboardSquare"));
    userBoardSquares.forEach((square, index) => {
      square.addEventListener("mouseover", () => {
        let siblingsToColor = [];
        const start = index;
        const rowStart = start - start % 10;
        const rowEnd = rowStart + 10;
        if (orientation === "horizontal") {
          const expectedEnd = start + selectedShipLength;
          if (expectedEnd > rowEnd) {
            // if ship is too long to fit in the row

            siblingsToColor = userBoardSquares.slice(start, rowEnd);
            siblingsToColor.forEach(sibling => sibling.classList.add("hoverLimitsExceeded"));
          } else {
            // if ship fits in the row

            siblingsToColor = userBoardSquares.slice(start, expectedEnd);
            siblingsToColor.forEach(sibling => sibling.classList.add("hover"));
          }
        } else {
          // vertical

          for (let i = start; i < start + selectedShipLength * 10; i += 10) {
            if (i < userBoardSquares.length) siblingsToColor.push(userBoardSquares[i]);
          }
          if (siblingsToColor.length < selectedShipLength) {
            // if ship is too long to fit in the column

            siblingsToColor.forEach(sibling => sibling.classList.add("hoverLimitsExceeded"));
          } else {
            // if ship fits in the column

            siblingsToColor.forEach(sibling => sibling.classList.add("hover"));
          }
        }
      });
      square.addEventListener("mouseout", () => {
        userBoardSquares.forEach(sibling => sibling.classList.remove("hover"));
        userBoardSquares.forEach(sibling => sibling.classList.remove("hoverLimitsExceeded"));
      });
      square.addEventListener("click", () => {});
    });

    // Adding event listener to T key to rotate the selected ship
    document.addEventListener("keydown", e => {
      if (e.key === "t") orientation = orientation === "horizontal" ? "vertical" : "horizontal";
    });
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
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Bruno+Ace&display=swap);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\n/* MY OWN STYLES FROM HERE */\n\n/* Fonts */\n\na:visited {\n    color: #fff;\n}\n\n#screen {\n    position: fixed; /* or \"absolute\" */\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: #fff;\n    display: flex;\n    flex-direction: column;\n    z-index: 0;\n}\n\n/* HEADER */\n\n#header {\n    height: 10%;\n    background-color: #474747;\n    display: flex;\n    border-bottom: solid 1px #000;\n    align-items: center;\n    justify-content: center;\n    z-index: 3;\n}\n\n.title {\n    font-size: 2em;\n    font-family: 'Bruno Ace';\n    color: #e8f901;\n}\n\n#main {\n    position: relative;\n    height: 80%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: rgb(255, 255, 255);\n}\n\n/* COVER */\n\n.glowing-button {\n    background-color: #4CAF50;\n    border: none;\n    border-radius: 20px;\n    color: white;\n    font-size: 3em;\n    padding: 20px 30px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    cursor: pointer;\n    transition: transform 0.5s;\n    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);\n}\n  \n.glowing-button:hover {\n    transform: scale(1.1);\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(76, 175, 80, 0.6);\n}\n\n@keyframes glowing {\n    0% {\n        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(76, 175, 80, 0.2);\n    }\n    50% {\n        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(76, 175, 80, 0.5);\n    }\n    100% {\n        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(76, 175, 80, 0.2);\n    }\n}\n\n.glowing-button {\n    animation: glowing 2s infinite;\n}\n\n/* COVER SHIPS */\n\n#carrier-shape {\n    position: absolute;\n    width: 180px;\n    height: 60px;\n    top: 20%;\n    animation: move-right-left 10s linear infinite; /* adjust the time as needed */\n    z-index: 1;\n}\n\n@keyframes move-right-left {\n    0% { right: -100%; } /* Start from off the right of the screen */\n    100% { right: 100%; } /* End off the left of the screen */\n}\n\n#submarine-shape {\n    position: absolute;\n    width: 120px;\n    height: 60px;\n    left: 20%;\n    transform: rotate(90deg);\n    animation: move-top-down 10s linear infinite;\n    z-index: 1;\n}\n\n@keyframes move-top-down {\n    0% { top: -200px }\n    100% { top: 1500px}\n}\n\n#battleship-shape {\n    position: absolute;\n    width: 150px;\n    height: 60px;\n    top: 65%;\n    animation: move-left-right 10s linear infinite; /* adjust the time as needed */\n    z-index: 1;\n}\n\n@keyframes move-left-right {\n    0% { left: -100%; } /* Start from off the left of the screen */\n    100% { left: 100%; } /* End off the right of the screen */\n}\n\n#destroyer-shape {\n    position: absolute;\n    width: 120px;\n    height: 60px;\n    transform: rotate(270deg);\n    left: 80%;\n    animation: move-down-top 10s linear infinite;\n    z-index: 1;\n}\n\n@keyframes move-down-top {\n    0% { top: 1500px; }\n    100% { top: -200px; }\n}\n\n#patrol-shape {\n    position: absolute;\n    width: 90px;\n    height: 60px;\n    transform: rotate(180deg);\n    top: 90%;\n    animation: move-right-left 10s linear infinite;\n    z-index: 1;\n}\n\n/* MAIN - GAME */\n\n.playerSide {\n    width: 50%;\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    padding: 5%;\n    align-items: center;\n    justify-content: flex-start;\n    gap: 2em;\n    margin-top: 5em;\n}\n\n.gameHeader {\n    width: 440px;\n    font-size: 1.5em;\n    font-family: 'Bruno Ace';\n    color: #fff;\n    padding: 10px;\n    text-align: center;\n}\n\n#userGameHeader {\n    background-color: #FC1159;\n}\n\n#computerGameHeader{\n    background-color: #727D95;\n}\n\n.gameboardContainer {\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n}\n\n.xHeader {\n    display: flex;\n    flex-direction: row;\n    justify-content: left;\n    padding-left: 2.5em;\n}\n\n.xHeaderSquare {\n    width: 38px;\n    height: 38px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n}\n\n.bottomBoard {\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n}\n\n.yHeader {\n    display: flex;\n    flex-direction: column;\n}\n\n.yHeaderSquare {\n    width: 38px;\n    height: 38px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n}\n\n.yHeaderShipyard {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n    writing-mode: vertical-rl;\n    text-orientation: mixed;\n    rotate: 180deg;\n    margin-top: 1.8em;\n}\n\n.gridPanelContainer {\n    width: 380px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n\n.gameboardGrid {\n    width: 380px;\n    height: 380px;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n}\n\n#userGameboardGrid {\n    position: relative;\n}\n\n.gameboardSquare {\n    width: 36px;\n    height: 36px;\n    border: solid 1px #fff;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n    cursor: pointer;\n    background-color: #a1dcff;\n}\n\n#userGameboardGrid .hover {\n    background-color: #999999;\n}\n\n#userGameboardGrid .hoverLimitsExceeded {\n    background-color: #c23434;\n}\n\n#computerGameboardGrid .gameboardSquare:hover {\n    background-color: #1b88e7;\n}\n\n/* SHIPYARD */\n\n.statusPanel {\n    width: 382px;\n    height: 78px;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    flex-wrap: wrap;\n    margin-top: 36px;\n    background-image: linear-gradient(rgba(0, 0, 0, 0.5) 2px, transparent 2px), linear-gradient(90deg, rgba(0, 0, 0, 0.5) 2px, transparent 2px);\n    background-size: 38px 38px;\n    gap: 2px;\n}\n\n.carrier {\n    width: 188px;\n    height: 36px;\n}\n\n.battleship {\n    width: 150px;\n    height: 36px;\n}\n\n.submarine {\n    width: 112px;\n    height: 36px;\n}\n\n.destroyer {\n    width: 112px;\n    height: 36px;\n}\n\n.boat {\n    width: 74px;\n    height: 36px;\n}\n\n.userShip {\n    cursor: pointer;\n    opacity: 0.7;\n}\n\n.userShip:hover {\n    opacity: 1;\n}\n\n.userShip.selected {\n    opacity: 1;\n}\n\n.instructions {\n    width: 100%;\n    font-family: 'Bruno Ace';\n    font-size: 0.8em;\n    line-height: 1.5em;\n    text-align: center;\n}\n\n/* FOOTER */\n\n#footer {\n    height: 10%;\n    background-color: #474747;\n    display: flex;\n    border-top: solid 1px #000;\n    align-items: center;\n    justify-content: center;\n    z-index: 3;\n}\n\n.credits {\n    color: #fff;\n    font-family: 'IBM Plex Mono', monospace;\n    font-size: 0.8em;\n    text-align: center;\n}\n\n/* Style the link to remove default styling */\n.github-link {\n    display: inline-block;\n    text-decoration: none;\n    color: inherit;\n}\n\n/* Add the hover effect */\n.github-icon {\n    transition: transform 0.5s ease-in-out; /* Add a transition for the transform property */\n}\n\n.github-link:hover .github-icon {\n    transform: rotate(180deg); /* Rotate the icon 180 degrees when hovered */\n}", "",{"version":3,"sources":["webpack://./src/styles/index.css"],"names":[],"mappings":"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","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\n/* MY OWN STYLES FROM HERE */\n\n/* Fonts */\n\n@import url('https://fonts.googleapis.com/css2?family=Bruno+Ace&display=swap');\n@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap');\n\na:visited {\n    color: #fff;\n}\n\n#screen {\n    position: fixed; /* or \"absolute\" */\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: #fff;\n    display: flex;\n    flex-direction: column;\n    z-index: 0;\n}\n\n/* HEADER */\n\n#header {\n    height: 10%;\n    background-color: #474747;\n    display: flex;\n    border-bottom: solid 1px #000;\n    align-items: center;\n    justify-content: center;\n    z-index: 3;\n}\n\n.title {\n    font-size: 2em;\n    font-family: 'Bruno Ace';\n    color: #e8f901;\n}\n\n#main {\n    position: relative;\n    height: 80%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: rgb(255, 255, 255);\n}\n\n/* COVER */\n\n.glowing-button {\n    background-color: #4CAF50;\n    border: none;\n    border-radius: 20px;\n    color: white;\n    font-size: 3em;\n    padding: 20px 30px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    cursor: pointer;\n    transition: transform 0.5s;\n    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);\n}\n  \n.glowing-button:hover {\n    transform: scale(1.1);\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(76, 175, 80, 0.6);\n}\n\n@keyframes glowing {\n    0% {\n        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(76, 175, 80, 0.2);\n    }\n    50% {\n        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(76, 175, 80, 0.5);\n    }\n    100% {\n        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(76, 175, 80, 0.2);\n    }\n}\n\n.glowing-button {\n    animation: glowing 2s infinite;\n}\n\n/* COVER SHIPS */\n\n#carrier-shape {\n    position: absolute;\n    width: 180px;\n    height: 60px;\n    top: 20%;\n    animation: move-right-left 10s linear infinite; /* adjust the time as needed */\n    z-index: 1;\n}\n\n@keyframes move-right-left {\n    0% { right: -100%; } /* Start from off the right of the screen */\n    100% { right: 100%; } /* End off the left of the screen */\n}\n\n#submarine-shape {\n    position: absolute;\n    width: 120px;\n    height: 60px;\n    left: 20%;\n    transform: rotate(90deg);\n    animation: move-top-down 10s linear infinite;\n    z-index: 1;\n}\n\n@keyframes move-top-down {\n    0% { top: -200px }\n    100% { top: 1500px}\n}\n\n#battleship-shape {\n    position: absolute;\n    width: 150px;\n    height: 60px;\n    top: 65%;\n    animation: move-left-right 10s linear infinite; /* adjust the time as needed */\n    z-index: 1;\n}\n\n@keyframes move-left-right {\n    0% { left: -100%; } /* Start from off the left of the screen */\n    100% { left: 100%; } /* End off the right of the screen */\n}\n\n#destroyer-shape {\n    position: absolute;\n    width: 120px;\n    height: 60px;\n    transform: rotate(270deg);\n    left: 80%;\n    animation: move-down-top 10s linear infinite;\n    z-index: 1;\n}\n\n@keyframes move-down-top {\n    0% { top: 1500px; }\n    100% { top: -200px; }\n}\n\n#patrol-shape {\n    position: absolute;\n    width: 90px;\n    height: 60px;\n    transform: rotate(180deg);\n    top: 90%;\n    animation: move-right-left 10s linear infinite;\n    z-index: 1;\n}\n\n/* MAIN - GAME */\n\n.playerSide {\n    width: 50%;\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    padding: 5%;\n    align-items: center;\n    justify-content: flex-start;\n    gap: 2em;\n    margin-top: 5em;\n}\n\n.gameHeader {\n    width: 440px;\n    font-size: 1.5em;\n    font-family: 'Bruno Ace';\n    color: #fff;\n    padding: 10px;\n    text-align: center;\n}\n\n#userGameHeader {\n    background-color: #FC1159;\n}\n\n#computerGameHeader{\n    background-color: #727D95;\n}\n\n.gameboardContainer {\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n}\n\n.xHeader {\n    display: flex;\n    flex-direction: row;\n    justify-content: left;\n    padding-left: 2.5em;\n}\n\n.xHeaderSquare {\n    width: 38px;\n    height: 38px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n}\n\n.bottomBoard {\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n}\n\n.yHeader {\n    display: flex;\n    flex-direction: column;\n}\n\n.yHeaderSquare {\n    width: 38px;\n    height: 38px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n}\n\n.yHeaderShipyard {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n    writing-mode: vertical-rl;\n    text-orientation: mixed;\n    rotate: 180deg;\n    margin-top: 1.8em;\n}\n\n.gridPanelContainer {\n    width: 380px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n\n.gameboardGrid {\n    width: 380px;\n    height: 380px;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n}\n\n#userGameboardGrid {\n    position: relative;\n}\n\n.gameboardSquare {\n    width: 36px;\n    height: 36px;\n    border: solid 1px #fff;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n    cursor: pointer;\n    background-color: #a1dcff;\n}\n\n#userGameboardGrid .hover {\n    background-color: #999999;\n}\n\n#userGameboardGrid .hoverLimitsExceeded {\n    background-color: #c23434;\n}\n\n#computerGameboardGrid .gameboardSquare:hover {\n    background-color: #1b88e7;\n}\n\n/* SHIPYARD */\n\n.statusPanel {\n    width: 382px;\n    height: 78px;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    flex-wrap: wrap;\n    margin-top: 36px;\n    background-image: linear-gradient(rgba(0, 0, 0, 0.5) 2px, transparent 2px), linear-gradient(90deg, rgba(0, 0, 0, 0.5) 2px, transparent 2px);\n    background-size: 38px 38px;\n    gap: 2px;\n}\n\n.carrier {\n    width: 188px;\n    height: 36px;\n}\n\n.battleship {\n    width: 150px;\n    height: 36px;\n}\n\n.submarine {\n    width: 112px;\n    height: 36px;\n}\n\n.destroyer {\n    width: 112px;\n    height: 36px;\n}\n\n.boat {\n    width: 74px;\n    height: 36px;\n}\n\n.userShip {\n    cursor: pointer;\n    opacity: 0.7;\n}\n\n.userShip:hover {\n    opacity: 1;\n}\n\n.userShip.selected {\n    opacity: 1;\n}\n\n.instructions {\n    width: 100%;\n    font-family: 'Bruno Ace';\n    font-size: 0.8em;\n    line-height: 1.5em;\n    text-align: center;\n}\n\n/* FOOTER */\n\n#footer {\n    height: 10%;\n    background-color: #474747;\n    display: flex;\n    border-top: solid 1px #000;\n    align-items: center;\n    justify-content: center;\n    z-index: 3;\n}\n\n.credits {\n    color: #fff;\n    font-family: 'IBM Plex Mono', monospace;\n    font-size: 0.8em;\n    text-align: center;\n}\n\n/* Style the link to remove default styling */\n.github-link {\n    display: inline-block;\n    text-decoration: none;\n    color: inherit;\n}\n\n/* Add the hover effect */\n.github-icon {\n    transition: transform 0.5s ease-in-out; /* Add a transition for the transform property */\n}\n\n.github-link:hover .github-icon {\n    transform: rotate(180deg); /* Rotate the icon 180 degrees when hovered */\n}"],"sourceRoot":""}]);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "5a692d9fd2fb8c342bece4c2641a51cd.svg");

/***/ }),

/***/ "./src/assets/graphics/carrier.svg":
/*!*****************************************!*\
  !*** ./src/assets/graphics/carrier.svg ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "f04df71d7c1d786daaf0b74b4c06acfe.svg");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "23de8581c9a65846aaa10ba01eaff6b0.svg");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "6ef957c8fc9f241794a4cc8af63deb31.svg");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "0e2b0782689fe73bf1d0287850c87088.svg");

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

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvdmlldy5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvaW5kZXguY3NzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2Fzc2V0cy9ncmFwaGljcy9iYXR0bGVzaGlwLnN2ZyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9hc3NldHMvZ3JhcGhpY3MvY2Fycmllci5zdmciLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvYXNzZXRzL2dyYXBoaWNzL2Rlc3Ryb3llci5zdmciLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvYXNzZXRzL2dyYXBoaWNzL3BhdHJvbC1ib2F0LnN2ZyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9hc3NldHMvZ3JhcGhpY3Mvc3VibWFyaW5lLnN2ZyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvaW5kZXguY3NzPzYzNDkiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCIuL3N0eWxlcy9pbmRleC5jc3NcIlxuaW1wb3J0IHsgdmlldyB9IGZyb20gXCIuL3ZpZXdcIlxuXG52aWV3LmxvYWRDb3Zlck1haW5VSSgpIiwiLy8gSU1QT1JUU1xuaW1wb3J0IGNhcnJpZXJTdmcgZnJvbSBcIi4vYXNzZXRzL2dyYXBoaWNzL2NhcnJpZXIuc3ZnXCI7XG5pbXBvcnQgc3VibWFyaW5lU3ZnIGZyb20gXCIuL2Fzc2V0cy9ncmFwaGljcy9zdWJtYXJpbmUuc3ZnXCI7XG5pbXBvcnQgYmF0dGxlc2hpcFN2ZyBmcm9tIFwiLi9hc3NldHMvZ3JhcGhpY3MvYmF0dGxlc2hpcC5zdmdcIjtcbmltcG9ydCBkZXN0cm95ZXJTdmcgZnJvbSBcIi4vYXNzZXRzL2dyYXBoaWNzL2Rlc3Ryb3llci5zdmdcIjtcbmltcG9ydCBwYXRyb2xTdmcgZnJvbSBcIi4vYXNzZXRzL2dyYXBoaWNzL3BhdHJvbC1ib2F0LnN2Z1wiO1xuXG4vLyBBIG1vZHVsZSAob25seSBvbmUgaW5zdGFuY2UpIGZvciBhIFZpZXcgdGhhdCBjb250cm9sIERPTSBtYW5pcHVsYXRpb25cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0LCBpbXBvcnQvbm8tbXV0YWJsZS1leHBvcnRzLCBwcmVmZXItY29uc3QsIGZ1bmMtbmFtZXNcbmV4cG9ydCBsZXQgdmlldyA9IChmdW5jdGlvbigpIHtcblxuICAgIC8vIENyZWF0ZSBhbiBlbGVtZW50IHdpdGggYW4gb3B0aW9uYWwgQ1NTIGNsYXNzIGFuZCBvcHRpb25hbCBDU1MgaWRcbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZywgY2xhc3NOYW1lLCBpZCkge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKVxuXG4gICAgICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiaWRcIixpZClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbGVtZW50XG5cbiAgICB9XG5cbiAgICAvLyBSZXRyaWV2ZSBhbiBlbGVtZW50IGZyb20gdGhlIERPTVxuICAgIGZ1bmN0aW9uIGdldEVsZW1lbnQoaWQpIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZClcblxuICAgICAgICByZXR1cm4gZWxlbWVudFxuXG4gICAgfVxuXG4gICAgLy8gRGVsZXRlIHRoZSBjb250ZW50IGluc2lkZSBcIm1haW5cIiA8ZGl2PlxuICAgIGZ1bmN0aW9uIGRlbGV0ZU1haW5VSSgpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IGdldEVsZW1lbnQoXCJtYWluXCIpXG4gICAgICAgIG1haW4uaW5uZXJIVE1MID0gXCJcIlxuICAgIH1cblxuICAgIC8vIExvYWRzIGdhbWUgVUlcbiAgICBmdW5jdGlvbiBsb2FkR2FtZVVJKCkge1xuXG4gICAgICAgIC8vIFNvbWUgdXNlZnVsIHZhcmlhYmxlc1xuICAgICAgICBsZXQgc2VsZWN0ZWRTaGlwTGVuZ3RoID0gMFxuICAgICAgICBsZXQgb3JpZW50YXRpb24gPSBcImhvcml6b250YWxcIlxuICAgICAgICBsZXQgc2VsZWN0ZWRTaGlwTmFtZSA9IFwiXCJcbiAgICAgICAgXG4gICAgICAgIC8vIFNJREVTXG4gICAgICAgIFxuICAgICAgICBjb25zdCB1c2VyU2lkZSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInBsYXllclNpZGVcIixudWxsKVxuICAgICAgICBjb25zdCBjb21wdXRlclNpZGUgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJwbGF5ZXJTaWRlXCIsbnVsbClcblxuICAgICAgICBjb25zdCBtYWluID0gZ2V0RWxlbWVudChcIm1haW5cIilcbiAgICAgICAgbWFpbi5hcHBlbmRDaGlsZCh1c2VyU2lkZSlcbiAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChjb21wdXRlclNpZGUpXG5cbiAgICAgICAgLy8gSGVhZGVyc1xuXG4gICAgICAgIGNvbnN0IHVzZXJIZWFkZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJnYW1lSGVhZGVyXCIsXCJ1c2VyR2FtZUhlYWRlclwiKVxuICAgICAgICBjb25zdCBjb21wdXRlckhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImdhbWVIZWFkZXJcIixcImNvbXB1dGVyR2FtZUhlYWRlclwiKVxuXG4gICAgICAgIGNvbnN0IHVzZXJUaXRsZSA9IGNyZWF0ZUVsZW1lbnQoXCJoMlwiLFwicGxheWVyVGl0bGVcIixudWxsKVxuICAgICAgICBjb25zdCBjb21wdXRlclRpdGxlID0gY3JlYXRlRWxlbWVudChcImgyXCIsXCJwbGF5ZXJUaXRsZVwiLG51bGwpXG5cbiAgICAgICAgdXNlclRpdGxlLnRleHRDb250ZW50ID0gXCJZT1VSIEZMRUVUXCJcbiAgICAgICAgY29tcHV0ZXJUaXRsZS50ZXh0Q29udGVudCA9IFwiRU5FTVkgRkxFRVRcIlxuXG4gICAgICAgIHVzZXJIZWFkZXIuYXBwZW5kQ2hpbGQodXNlclRpdGxlKVxuICAgICAgICBjb21wdXRlckhlYWRlci5hcHBlbmRDaGlsZChjb21wdXRlclRpdGxlKVxuXG4gICAgICAgIHVzZXJTaWRlLmFwcGVuZENoaWxkKHVzZXJIZWFkZXIpXG4gICAgICAgIGNvbXB1dGVyU2lkZS5hcHBlbmRDaGlsZChjb21wdXRlckhlYWRlcilcblxuICAgICAgICAvLyBHYW1lYm9hcmRzXG5cbiAgICAgICAgY29uc3QgdXNlckdhbWVib2FyZENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImdhbWVib2FyZENvbnRhaW5lclwiLFwidXNlckdhbWVib2FyZENvbnRhaW5lclwiKVxuICAgICAgICBjb25zdCBjb21wdXRlckdhbWVib2FyZENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImdhbWVib2FyZENvbnRhaW5lclwiLFwiY29tcHV0ZXJHYW1lYm9hcmRDb250YWluZXJcIilcblxuICAgICAgICBjb25zdCB1c2VyWEhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInhIZWFkZXJcIixudWxsKVxuICAgICAgICBjb25zdCBjb21wdXRlclhIZWFkZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJ4SGVhZGVyXCIsbnVsbClcblxuICAgICAgICAvLyBHZW5lcmF0ZSB0aGUgeEhlYWRlciBzcXVhcmVzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgdXNlclhIZWFkZXJTcXVhcmUgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJ4SGVhZGVyU3F1YXJlXCIsbnVsbClcbiAgICAgICAgICAgIGNvbnN0IGNvbXB1dGVyWEhlYWRlclNxdWFyZSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInhIZWFkZXJTcXVhcmVcIixudWxsKVxuICAgICAgICAgICAgdXNlclhIZWFkZXJTcXVhcmUudGV4dENvbnRlbnQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDY1ICsgaSlcbiAgICAgICAgICAgIGNvbXB1dGVyWEhlYWRlclNxdWFyZS50ZXh0Q29udGVudCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoNjUgKyBpKVxuICAgICAgICAgICAgdXNlclhIZWFkZXIuYXBwZW5kQ2hpbGQodXNlclhIZWFkZXJTcXVhcmUpXG4gICAgICAgICAgICBjb21wdXRlclhIZWFkZXIuYXBwZW5kQ2hpbGQoY29tcHV0ZXJYSGVhZGVyU3F1YXJlKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdXNlckJvdHRvbUJvYXJkID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiYm90dG9tQm9hcmRcIixudWxsKVxuICAgICAgICBjb25zdCBjb21wdXRlckJvdHRvbUJvYXJkID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiYm90dG9tQm9hcmRcIixudWxsKVxuXG4gICAgICAgIGNvbnN0IHVzZXJZSGVhZGVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwieUhlYWRlclwiLG51bGwpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyWUhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInlIZWFkZXJcIixudWxsKVxuXG4gICAgICAgIC8vIEdlbmVyYXRlIHRoZSB5SGVhZGVyIHNxdWFyZXNcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCB1c2VyWUhlYWRlclNxdWFyZSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInlIZWFkZXJTcXVhcmVcIixudWxsKVxuICAgICAgICAgICAgY29uc3QgY29tcHV0ZXJZSGVhZGVyU3F1YXJlID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwieUhlYWRlclNxdWFyZVwiLG51bGwpXG4gICAgICAgICAgICB1c2VyWUhlYWRlclNxdWFyZS50ZXh0Q29udGVudCA9IGkgKyAxXG4gICAgICAgICAgICBjb21wdXRlcllIZWFkZXJTcXVhcmUudGV4dENvbnRlbnQgPSBpICsgMVxuICAgICAgICAgICAgdXNlcllIZWFkZXIuYXBwZW5kQ2hpbGQodXNlcllIZWFkZXJTcXVhcmUpXG4gICAgICAgICAgICBjb21wdXRlcllIZWFkZXIuYXBwZW5kQ2hpbGQoY29tcHV0ZXJZSGVhZGVyU3F1YXJlKVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVzZXJZSGVhZGVyU2hpcHlhcmQgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJ5SGVhZGVyU2hpcHlhcmRcIixudWxsKVxuICAgICAgICBjb25zdCBjb21wdXRlcllIZWFkZXJTaGlweWFyZCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInlIZWFkZXJTaGlweWFyZFwiLG51bGwpXG4gICAgICAgIHVzZXJZSGVhZGVyU2hpcHlhcmQudGV4dENvbnRlbnQgPSBcIlNoaXB5YXJkXCJcbiAgICAgICAgY29tcHV0ZXJZSGVhZGVyU2hpcHlhcmQudGV4dENvbnRlbnQgPSBcIlNoaXB5YXJkXCJcbiAgICAgICAgdXNlcllIZWFkZXIuYXBwZW5kQ2hpbGQodXNlcllIZWFkZXJTaGlweWFyZClcbiAgICAgICAgY29tcHV0ZXJZSGVhZGVyLmFwcGVuZENoaWxkKGNvbXB1dGVyWUhlYWRlclNoaXB5YXJkKVxuXG4gICAgICAgIGNvbnN0IHVzZXJHcmlkUGFuZWxDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJncmlkUGFuZWxDb250YWluZXJcIixcInVzZXJHcmlkUGFuZWxDb250YWluZXJcIilcbiAgICAgICAgY29uc3QgY29tcHV0ZXJHcmlkUGFuZWxDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJncmlkUGFuZWxDb250YWluZXJcIixcImNvbXB1dGVyR3JpZFBhbmVsQ29udGFpbmVyXCIpXG5cbiAgICAgICAgY29uc3QgdXNlckdhbWVib2FyZCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImdhbWVib2FyZEdyaWRcIixcInVzZXJHYW1lYm9hcmRHcmlkXCIpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyR2FtZWJvYXJkID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiZ2FtZWJvYXJkR3JpZFwiLFwiY29tcHV0ZXJHYW1lYm9hcmRHcmlkXCIpXG5cbiAgICAgICAgLy8gR2VuZXJhdGUgdGhlIGdhbWVib2FyZCBzcXVhcmVzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJHYW1lYm9hcmRTcXVhcmUgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJnYW1lYm9hcmRTcXVhcmVcIixudWxsKVxuICAgICAgICAgICAgY29uc3QgY29tcHV0ZXJHYW1lYm9hcmRTcXVhcmUgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJnYW1lYm9hcmRTcXVhcmVcIixudWxsKVxuICAgICAgICAgICAgdXNlckdhbWVib2FyZC5hcHBlbmRDaGlsZCh1c2VyR2FtZWJvYXJkU3F1YXJlKVxuICAgICAgICAgICAgY29tcHV0ZXJHYW1lYm9hcmQuYXBwZW5kQ2hpbGQoY29tcHV0ZXJHYW1lYm9hcmRTcXVhcmUpXG4gICAgICAgIH1cblxuICAgICAgICB1c2VyR3JpZFBhbmVsQ29udGFpbmVyLmFwcGVuZENoaWxkKHVzZXJHYW1lYm9hcmQpXG4gICAgICAgIGNvbXB1dGVyR3JpZFBhbmVsQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbXB1dGVyR2FtZWJvYXJkKVxuXG4gICAgICAgIHVzZXJHYW1lYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQodXNlclhIZWFkZXIpXG4gICAgICAgIHVzZXJHYW1lYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQodXNlckJvdHRvbUJvYXJkKVxuICAgICAgICB1c2VyQm90dG9tQm9hcmQuYXBwZW5kQ2hpbGQodXNlcllIZWFkZXIpXG4gICAgICAgIHVzZXJCb3R0b21Cb2FyZC5hcHBlbmRDaGlsZCh1c2VyR3JpZFBhbmVsQ29udGFpbmVyKVxuXG4gICAgICAgIGNvbXB1dGVyR2FtZWJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbXB1dGVyWEhlYWRlcilcbiAgICAgICAgY29tcHV0ZXJHYW1lYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoY29tcHV0ZXJCb3R0b21Cb2FyZClcbiAgICAgICAgY29tcHV0ZXJCb3R0b21Cb2FyZC5hcHBlbmRDaGlsZChjb21wdXRlcllIZWFkZXIpXG4gICAgICAgIGNvbXB1dGVyQm90dG9tQm9hcmQuYXBwZW5kQ2hpbGQoY29tcHV0ZXJHcmlkUGFuZWxDb250YWluZXIpXG5cbiAgICAgICAgdXNlclNpZGUuYXBwZW5kQ2hpbGQodXNlckdhbWVib2FyZENvbnRhaW5lcilcbiAgICAgICAgY29tcHV0ZXJTaWRlLmFwcGVuZENoaWxkKGNvbXB1dGVyR2FtZWJvYXJkQ29udGFpbmVyKVxuXG4gICAgICAgIC8vIEZsZWV0IFN0YXR1cyBQYW5lbHNcblxuICAgICAgICBjb25zdCB1c2VyU3RhdHVzUGFuZWwgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJzdGF0dXNQYW5lbFwiLFwidXNlclN0YXR1c1BhbmVsXCIpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyU3RhdHVzUGFuZWwgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJzdGF0dXNQYW5lbFwiLFwiY29tcHV0ZXJTdGF0dXNQYW5lbFwiKVxuXG4gICAgICAgIHVzZXJHcmlkUGFuZWxDb250YWluZXIuYXBwZW5kQ2hpbGQodXNlclN0YXR1c1BhbmVsKVxuICAgICAgICBjb21wdXRlckdyaWRQYW5lbENvbnRhaW5lci5hcHBlbmRDaGlsZChjb21wdXRlclN0YXR1c1BhbmVsKVxuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgdXNlciBzaGlweWFyZFxuICAgICAgICBjb25zdCB1c2VyQ2FycmllciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImNhcnJpZXJcIixcInVzZXJDYXJyaWVyXCIpXG4gICAgICAgIHVzZXJDYXJyaWVyLmNsYXNzTGlzdC5hZGQoXCJ1c2VyU2hpcFwiKVxuICAgICAgICB1c2VyQ2Fycmllci5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDE4OCAzNlwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIiB4bWxuczpzZXJpZj1cImh0dHA6Ly93d3cuc2VyaWYuY29tL1wiIHN0eWxlPVwiZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjI7XCI+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEuMTM3MjgsMCwwLDAuNzUxMTY3LC0xNC4yNDU1LC0wLjc1OTM3NilcIj5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xNzUuMTc3LDE1LjAxN0MxNzUuMTc3LDkuNTAzIDE3MC43LDUuMDI2IDE2NS4xODYsNS4wMjZMMjUuMTQsNS4wMjZDMTkuNjI2LDUuMDI2IDE1LjE0OSw5LjUwMyAxNS4xNDksMTUuMDE3TDE1LjE0OSwzNC45OThDMTUuMTQ5LDQwLjUxMiAxOS42MjYsNDQuOTg5IDI1LjE0LDQ0Ljk4OUwxNjUuMTg2LDQ0Ljk4OUMxNzAuNyw0NC45ODkgMTc1LjE3Nyw0MC41MTIgMTc1LjE3NywzNC45OThMMTc1LjE3NywxNS4wMTdaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtMTEuMTkyNywyLjk4MylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC00OS4xNzI2LDIuOTgzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTg3LjE0OTgsMi45ODMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwyNi44MTQ1LDIuOTgzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsNjQuNzk0OSwyLjk4MylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPC9zdmc+YFxuICAgICAgICBjb25zdCB1c2VyQmF0dGxlc2hpcCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImJhdHRsZXNoaXBcIixcInVzZXJCYXR0bGVzaGlwXCIpXG4gICAgICAgIHVzZXJCYXR0bGVzaGlwLmNsYXNzTGlzdC5hZGQoXCJ1c2VyU2hpcFwiKVxuICAgICAgICB1c2VyQmF0dGxlc2hpcC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDE1MCAzNlwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIiB4bWxuczpzZXJpZj1cImh0dHA6Ly93d3cuc2VyaWYuY29tL1wiIHN0eWxlPVwiZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjI7XCI+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTIwLjE2MjgsLTcuMDA3NDEpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLjI4ODYzLDAsMCwwLjc1MDMsOS4zMzU1LDIuNDgzOTMpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTk2Ljk1LDQzLjA0MkM5MS43NDMsNDUuNjM1IDg1LjI1Nyw0Ny45NjggNzguMDY2LDQ5Ljk4MkwyMi42NzEsNDkuOTgyQzE1Ljg4OCw0NC45MTEgMTAuNzQ0LDM3LjczOSAxMC43MywzMC4wMjZDMTAuNzE3LDIyLjMwOCAxNS44NDEsMTUuMTE1IDIyLjYxMiwxMC4wMTlMNzguMDM0LDEwLjAxOUM4NC44NDMsMTEuOTQ2IDkxLjAyMSwxNC4xNTkgOTYuMDg1LDE2LjU3N0w5NS45MzYsMTYuNTU2QzkwLjc2MywxNi41NTYgODYuNTYzLDIyLjUyMiA4Ni41NjMsMjkuODcyQzg2LjU2MywzNy4yMjEgOTAuNzYzLDQzLjE4OCA5NS45MzYsNDMuMTg4TDk2Ljk1LDQzLjA0MlpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDcuMzM1MDIsMCwwLDEuNDYxMjEsLTYzOS4yNDQsLTE5LjI1OTgpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEwNC4xODgsMjMuNjExQzEwMy42NzYsMjIuMjM2IDEwMi45OTgsMjEuMDMyIDEwMi4xOTMsMjAuMDI1QzEwNC4yNjIsMjEuMzM4IDEwNS45NjksMjIuNzA4IDEwNy4yNDgsMjQuMTVDMTA2LjgwMywyNS4yNTQgMTA2LjQ5OSwyNy41NiAxMDYuNDk5LDMwLjIxOUMxMDYuNDk5LDMyLjcwNSAxMDYuNzY1LDM0Ljg4MyAxMDcuMTY0LDM2LjA1OEMxMDUuNzQ5LDM3LjYyOSAxMDMuODI4LDM5LjExOSAxMDEuNDg4LDQwLjU0NUMxMDIuNTAxLDM5LjUwMyAxMDMuMzU2LDM4LjE3NiAxMDMuOTk2LDM2LjYxMkMxMDQuMTUxLDM2LjkwNyAxMDQuMzIxLDM3LjA1NyAxMDQuNDk4LDM3LjA1N0MxMDUuMjk4LDM3LjA1NyAxMDUuOTQ4LDM0LjAwOCAxMDUuOTQ4LDMwLjI1MkMxMDUuOTQ4LDI2LjQ5NyAxMDUuMjk4LDIzLjQ0OCAxMDQuNDk4LDIzLjQ0OEMxMDQuMzkyLDIzLjQ0OCAxMDQuMjg4LDIzLjUwMSAxMDQuMTg4LDIzLjYxMVpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDcuMzM1MDIsMCwwLDEuNDYxMjEsLTYzOS4yNDQsLTE5LjI1OTgpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEwOS4wMSwyNi41NzlDMTA5LjYyNCwyNy43MTggMTA5Ljk0NiwyOC44ODkgMTA5Ljk0NCwzMC4wNzJDMTA5Ljk0MiwzMS4yMTIgMTA5LjYzOSwzMi4zNDEgMTA5LjA2NCwzMy40NDhDMTA5LjE3LDMyLjQ5MyAxMDkuMjI5LDMxLjM5IDEwOS4yMjksMzAuMjE5QzEwOS4yMjksMjguODcyIDEwOS4xNTEsMjcuNjE1IDEwOS4wMSwyNi41NzlaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC02MC4xNzM2LDIuOTgzMilcIj5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsMTEuMTA5OCwtMC4xMTA5MjIpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSw2MC4xNzM2LC0yLjk4MzIpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEwNC44MTgsOC4yMzRDMTEwLjA4MSwxMC45MjMgMTEzLjAzNiwxNC4wNTYgMTEzLjAzNiwxNy4zODJDMTEzLjAzNiwyMSAxMDkuNTQsMjQuMzg4IDEwMy40MDMsMjcuMjNDOTkuMzQsMjUuODU4IDk2LjQ1LDIyLjIxMSA5Ni40NSwxNy45MzdDOTYuNDUsMTMuMTc5IDEwMC4wMzUsOS4xOTYgMTA0LjgxOCw4LjIzNFpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsNjAuMTczNiwtMi45ODMyKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMDQuODE4LDguMjM0QzEwNS41NDgsOC4wNzMgMTA2LjMwOCw3Ljk5NSAxMDcuMDg4LDcuOTk1QzExMi45Niw3Ljk5NSAxMTcuNzI3LDEyLjQ1IDExNy43MjcsMTcuOTM3QzExNy43MjcsMjMuNDI1IDExMi45NiwyNy44OCAxMDcuMDg4LDI3Ljg4QzEwNS43ODksMjcuODggMTA0LjU0MywyNy42NjIgMTAzLjQwMywyNy4yM0MxMDkuNTQsMjQuMzg4IDExMy4wMzYsMjEgMTEzLjAzNiwxNy4zODJDMTEzLjAzNiwxNC4wNTYgMTEwLjA4MSwxMC45MjMgMTA0LjgxOCw4LjIzNFpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsODYuNzc4OCwtMC4xMTA5MjIpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEwMC42NTcsNi4xNDlDMTA2LjAxMSw3LjMwNCAxMTAuMzQ5LDguNDg3IDExMy41OCw5LjY5OEMxMTQuNjEzLDExLjIxMiAxMTUuMTg1LDEzLjA0OCAxMTUuMTg1LDE1LjAxN0MxMTUuMTg1LDE2LjcyOCAxMTQuNzUzLDE4LjM0IDExMy45NzIsMTkuNzM1QzExMC41ODEsMjEuMDQyIDEwNS45MDEsMjIuMzMxIDEwMC4wMzcsMjMuNTQ5Qzk3LjExLDIxLjgzMiA5NS4xNjMsMTguNjUgOTUuMTYzLDE1LjAxN0M5NS4xNjMsMTEuMTMyIDk3LjM4OSw3Ljc2MiAxMDAuNjU3LDYuMTQ5WlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSw0OC43OTg3LC0wLjAwMDIpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtODcuMTE4MiwyLjg3MjI4KVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L3N2Zz5gXG4gICAgICAgIGNvbnN0IHVzZXJEZXN0cm95ZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJkZXN0cm95ZXJcIixcInVzZXJEZXN0cm95ZXJcIilcbiAgICAgICAgdXNlckRlc3Ryb3llci5jbGFzc0xpc3QuYWRkKFwidXNlclNoaXBcIilcbiAgICAgICAgdXNlckRlc3Ryb3llci5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDExMiAzNlwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIiB4bWxuczpzZXJpZj1cImh0dHA6Ly93d3cuc2VyaWYuY29tL1wiIHN0eWxlPVwiZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjI7XCI+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTM5LjE2MjgsLTcuMDA3NDEpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLjA2ODA2LDAsMCwwLjc1MDMsMzAuNzE5NSwyLjQ4MzkzKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk05Ni45NSw0My4wNDJDOTEuNzQzLDQ1LjYzNSA4NS4yNTcsNDcuOTY4IDc4LjA2Niw0OS45ODJMMjIuNjcxLDQ5Ljk4MkMxNS44ODgsNDQuOTExIDEwLjc0NCwzNy43MzkgMTAuNzMsMzAuMDI2QzEwLjcxNywyMi4zMDggMTUuODQxLDE1LjExNSAyMi42MTIsMTAuMDE5TDc4LjAzNCwxMC4wMTlDODQuODQzLDExLjk0NiA5MS4wMjEsMTQuMTU5IDk2LjA4NSwxNi41NzdMOTUuOTM2LDE2LjU1NkM5MC43NjMsMTYuNTU2IDg2LjU2MywyMi41MjIgODYuNTYzLDI5Ljg3MkM4Ni41NjMsMzcuMjIxIDkwLjc2Myw0My4xODggOTUuOTM2LDQzLjE4OEw5Ni45NSw0My4wNDJaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLjA2ODA2LDAsMCwwLjc1MDMsMzAuNzE5NSwyLjQ4MzkzKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMDIuMTkzLDIwLjAyNUMxMDcuMDc5LDIzLjEyNiAxMDkuOTUsMjYuNTQ2IDEwOS45NDQsMzAuMDcyQzEwOS45MzcsMzMuNzU4IDEwNi43ODUsMzcuMzE4IDEwMS40ODgsNDAuNTQ1QzEwMy44MTIsMzguMTUzIDEwNS4zMDksMzQuMjU5IDEwNS4zMDksMjkuODcyQzEwNS4zMDksMjUuOTUzIDEwNC4xMTUsMjIuNDI4IDEwMi4xOTMsMjAuMDI1WlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtMTEuMTUxNywyLjg3MjI4KVwiPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEwNS4zMzQsNS4wNDJDMTA3Ljc3Myw1Ljg1OSAxMDkuOTcsNi43MDcgMTExLjg1Nyw3LjYyOUMxMTMuOTEsOS40MzIgMTE1LjE4NSwxMi4wNzcgMTE1LjE4NSwxNS4wMTdDMTE1LjE4NSwxOC4zMDggMTEzLjU4NywyMS4yMyAxMTEuMTA0LDIzLjAyNUwxMTAuMzkxLDIzLjM2NUwxMDYuMjU3LDI0Ljg5OUwxMDUuMTc0LDI1LjAwOEM5OS42NDksMjUuMDA4IDk1LjE2MywyMC41MzEgOTUuMTYzLDE1LjAxN0M5NS4xNjMsOS41MDMgOTkuNjQ5LDUuMDI2IDEwNS4xNzQsNS4wMjZMMTA1LjMzNCw1LjA0MlpcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC00OS4xNzQsMi44NzIyOClcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC04Ny4xODgxLDIuODcyMjgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvc3ZnPmBcbiAgICAgICAgY29uc3QgdXNlclN1Ym1hcmluZSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInN1Ym1hcmluZVwiLFwidXNlclN1Ym1hcmluZVwiKVxuICAgICAgICB1c2VyU3VibWFyaW5lLmNsYXNzTGlzdC5hZGQoXCJ1c2VyU2hpcFwiKVxuICAgICAgICB1c2VyU3VibWFyaW5lLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMTEyIDM2XCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiIHhtbG5zOnNlcmlmPVwiaHR0cDovL3d3dy5zZXJpZi5jb20vXCIgc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjtcIj5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMS4wNjgzNiwwLDAsMC43NTIwMDEsLTQwLjQxMDMsLTQuNTQxNTMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTI4LjExNiwxMC4wMTlDMTM0LjgxNCwxNS4xMDggMTM5Ljg2NSwyMi4yNTMgMTM5Ljg1MSwyOS45MTVDMTM5LjgzNywzNy42ODUgMTM0LjYxOSw0NC45MDQgMTI3Ljc2Miw0OS45ODJMNTIuNjkxLDQ5Ljk4MkM0NS44MzQsNDQuOTA0IDQwLjYxNiwzNy42ODUgNDAuNjAyLDI5LjkxNUM0MC41ODgsMjIuMjUzIDQ1LjYzOSwxNS4xMDggNTIuMzM3LDEwLjAxOUwxMjguMTE2LDEwLjAxOVpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC0xMS4xOSwzLjAwMTU3KVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTQ5LjE4OTYsMy4wMDE1NylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC04Ny4xNjcyLDMuMDAxNTcpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvc3ZnPmBcbiAgICAgICAgY29uc3QgdXNlckJvYXQgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJib2F0XCIsXCJ1c2VyQm9hdFwiKVxuICAgICAgICB1c2VyQm9hdC5jbGFzc0xpc3QuYWRkKFwidXNlclNoaXBcIilcbiAgICAgICAgdXNlckJvYXQuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCA3NCAzNlwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIiB4bWxuczpzZXJpZj1cImh0dHA6Ly93d3cuc2VyaWYuY29tL1wiIHN0eWxlPVwiZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjI7XCI+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDAuOTc2OTczLDAsMCwwLjc1MjA0OCwtNy4wNjY0MSwtNC41Njc1MylcIj5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk00OC4wMzQsMTAuMDE5QzY2LjI1MywxNS4xNzggNzkuOTU3LDIyLjM3NCA3OS45NDQsMzAuMDcyQzc5LjkzLDM3Ljc1NCA2Ni4yNTMsNDQuODg5IDQ4LjA2Niw0OS45ODJMMjMuOTA4LDQ5Ljk4MkMxNi4yMDEsNDQuOTExIDEwLjM1NiwzNy43MzYgMTAuMzQyLDMwLjAxOEMxMC4zMjgsMjIuMzA1IDE2LjEzOSwxNS4xMTUgMjMuODE3LDEwLjAxOUw0OC4wMzQsMTAuMDE5WlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTQ5LjE3NTIsMi45ODMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtODcuMTY2MSwyLjk4MylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPC9zdmc+YFxuICAgICAgICB1c2VyU3RhdHVzUGFuZWwuYXBwZW5kQ2hpbGQodXNlckNhcnJpZXIpXG4gICAgICAgIHVzZXJTdGF0dXNQYW5lbC5hcHBlbmRDaGlsZCh1c2VyQmF0dGxlc2hpcClcbiAgICAgICAgdXNlclN0YXR1c1BhbmVsLmFwcGVuZENoaWxkKHVzZXJEZXN0cm95ZXIpXG4gICAgICAgIHVzZXJTdGF0dXNQYW5lbC5hcHBlbmRDaGlsZCh1c2VyU3VibWFyaW5lKVxuICAgICAgICB1c2VyU3RhdHVzUGFuZWwuYXBwZW5kQ2hpbGQodXNlckJvYXQpXG5cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBlbmVteSBzaGlweWFyZFxuICAgICAgICBjb25zdCBjb21wdXRlckNhcnJpZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJjYXJyaWVyXCIsXCJjb21wdXRlckNhcnJpZXJcIilcbiAgICAgICAgY29tcHV0ZXJDYXJyaWVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMTg4IDM2XCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiIHhtbG5zOnNlcmlmPVwiaHR0cDovL3d3dy5zZXJpZi5jb20vXCIgc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjtcIj5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMS4xMzcyOCwwLDAsMC43NTExNjcsLTE0LjI0NTUsLTAuNzU5Mzc2KVwiPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTE3NS4xNzcsMTUuMDE3QzE3NS4xNzcsOS41MDMgMTcwLjcsNS4wMjYgMTY1LjE4Niw1LjAyNkwyNS4xNCw1LjAyNkMxOS42MjYsNS4wMjYgMTUuMTQ5LDkuNTAzIDE1LjE0OSwxNS4wMTdMMTUuMTQ5LDM0Ljk5OEMxNS4xNDksNDAuNTEyIDE5LjYyNiw0NC45ODkgMjUuMTQsNDQuOTg5TDE2NS4xODYsNDQuOTg5QzE3MC43LDQ0Ljk4OSAxNzUuMTc3LDQwLjUxMiAxNzUuMTc3LDM0Ljk5OEwxNzUuMTc3LDE1LjAxN1pcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC0xMS4xOTI3LDIuOTgzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTQ5LjE3MjYsMi45ODMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtODcuMTQ5OCwyLjk4MylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLDI2LjgxNDUsMi45ODMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSw2NC43OTQ5LDIuOTgzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L3N2Zz5gXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQmF0dGxlc2hpcCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImJhdHRsZXNoaXBcIixcImNvbXB1dGVyQmF0dGxlc2hpcFwiKVxuICAgICAgICBjb21wdXRlckJhdHRsZXNoaXAuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAxNTAgMzZcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCIgeG1sbnM6c2VyaWY9XCJodHRwOi8vd3d3LnNlcmlmLmNvbS9cIiBzdHlsZT1cImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyO1wiPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC0yMC4xNjI4LC03LjAwNzQxKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMS4yODg2MywwLDAsMC43NTAzLDkuMzM1NSwyLjQ4MzkzKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk05Ni45NSw0My4wNDJDOTEuNzQzLDQ1LjYzNSA4NS4yNTcsNDcuOTY4IDc4LjA2Niw0OS45ODJMMjIuNjcxLDQ5Ljk4MkMxNS44ODgsNDQuOTExIDEwLjc0NCwzNy43MzkgMTAuNzMsMzAuMDI2QzEwLjcxNywyMi4zMDggMTUuODQxLDE1LjExNSAyMi42MTIsMTAuMDE5TDc4LjAzNCwxMC4wMTlDODQuODQzLDExLjk0NiA5MS4wMjEsMTQuMTU5IDk2LjA4NSwxNi41NzdMOTUuOTM2LDE2LjU1NkM5MC43NjMsMTYuNTU2IDg2LjU2MywyMi41MjIgODYuNTYzLDI5Ljg3MkM4Ni41NjMsMzcuMjIxIDkwLjc2Myw0My4xODggOTUuOTM2LDQzLjE4OEw5Ni45NSw0My4wNDJaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCg3LjMzNTAyLDAsMCwxLjQ2MTIxLC02MzkuMjQ0LC0xOS4yNTk4KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMDQuMTg4LDIzLjYxMUMxMDMuNjc2LDIyLjIzNiAxMDIuOTk4LDIxLjAzMiAxMDIuMTkzLDIwLjAyNUMxMDQuMjYyLDIxLjMzOCAxMDUuOTY5LDIyLjcwOCAxMDcuMjQ4LDI0LjE1QzEwNi44MDMsMjUuMjU0IDEwNi40OTksMjcuNTYgMTA2LjQ5OSwzMC4yMTlDMTA2LjQ5OSwzMi43MDUgMTA2Ljc2NSwzNC44ODMgMTA3LjE2NCwzNi4wNThDMTA1Ljc0OSwzNy42MjkgMTAzLjgyOCwzOS4xMTkgMTAxLjQ4OCw0MC41NDVDMTAyLjUwMSwzOS41MDMgMTAzLjM1NiwzOC4xNzYgMTAzLjk5NiwzNi42MTJDMTA0LjE1MSwzNi45MDcgMTA0LjMyMSwzNy4wNTcgMTA0LjQ5OCwzNy4wNTdDMTA1LjI5OCwzNy4wNTcgMTA1Ljk0OCwzNC4wMDggMTA1Ljk0OCwzMC4yNTJDMTA1Ljk0OCwyNi40OTcgMTA1LjI5OCwyMy40NDggMTA0LjQ5OCwyMy40NDhDMTA0LjM5MiwyMy40NDggMTA0LjI4OCwyMy41MDEgMTA0LjE4OCwyMy42MTFaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCg3LjMzNTAyLDAsMCwxLjQ2MTIxLC02MzkuMjQ0LC0xOS4yNTk4KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMDkuMDEsMjYuNTc5QzEwOS42MjQsMjcuNzE4IDEwOS45NDYsMjguODg5IDEwOS45NDQsMzAuMDcyQzEwOS45NDIsMzEuMjEyIDEwOS42MzksMzIuMzQxIDEwOS4wNjQsMzMuNDQ4QzEwOS4xNywzMi40OTMgMTA5LjIyOSwzMS4zOSAxMDkuMjI5LDMwLjIxOUMxMDkuMjI5LDI4Ljg3MiAxMDkuMTUxLDI3LjYxNSAxMDkuMDEsMjYuNTc5WlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtNjAuMTczNiwyLjk4MzIpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLDExLjEwOTgsLTAuMTEwOTIyKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsNjAuMTczNiwtMi45ODMyKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMDQuODE4LDguMjM0QzExMC4wODEsMTAuOTIzIDExMy4wMzYsMTQuMDU2IDExMy4wMzYsMTcuMzgyQzExMy4wMzYsMjEgMTA5LjU0LDI0LjM4OCAxMDMuNDAzLDI3LjIzQzk5LjM0LDI1Ljg1OCA5Ni40NSwyMi4yMTEgOTYuNDUsMTcuOTM3Qzk2LjQ1LDEzLjE3OSAxMDAuMDM1LDkuMTk2IDEwNC44MTgsOC4yMzRaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLDYwLjE3MzYsLTIuOTgzMilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTA0LjgxOCw4LjIzNEMxMDUuNTQ4LDguMDczIDEwNi4zMDgsNy45OTUgMTA3LjA4OCw3Ljk5NUMxMTIuOTYsNy45OTUgMTE3LjcyNywxMi40NSAxMTcuNzI3LDE3LjkzN0MxMTcuNzI3LDIzLjQyNSAxMTIuOTYsMjcuODggMTA3LjA4OCwyNy44OEMxMDUuNzg5LDI3Ljg4IDEwNC41NDMsMjcuNjYyIDEwMy40MDMsMjcuMjNDMTA5LjU0LDI0LjM4OCAxMTMuMDM2LDIxIDExMy4wMzYsMTcuMzgyQzExMy4wMzYsMTQuMDU2IDExMC4wODEsMTAuOTIzIDEwNC44MTgsOC4yMzRaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLDg2Ljc3ODgsLTAuMTEwOTIyKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMDAuNjU3LDYuMTQ5QzEwNi4wMTEsNy4zMDQgMTEwLjM0OSw4LjQ4NyAxMTMuNTgsOS42OThDMTE0LjYxMywxMS4yMTIgMTE1LjE4NSwxMy4wNDggMTE1LjE4NSwxNS4wMTdDMTE1LjE4NSwxNi43MjggMTE0Ljc1MywxOC4zNCAxMTMuOTcyLDE5LjczNUMxMTAuNTgxLDIxLjA0MiAxMDUuOTAxLDIyLjMzMSAxMDAuMDM3LDIzLjU0OUM5Ny4xMSwyMS44MzIgOTUuMTYzLDE4LjY1IDk1LjE2MywxNS4wMTdDOTUuMTYzLDExLjEzMiA5Ny4zODksNy43NjIgMTAwLjY1Nyw2LjE0OVpcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsNDguNzk4NywtMC4wMDAyKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTg3LjExODIsMi44NzIyOClcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPC9zdmc+YFxuICAgICAgICBjb25zdCBjb21wdXRlckRlc3Ryb3llciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImRlc3Ryb3llclwiLFwiY29tcHV0ZXJEZXN0cm95ZXJcIilcbiAgICAgICAgY29tcHV0ZXJEZXN0cm95ZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAxMTIgMzZcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCIgeG1sbnM6c2VyaWY9XCJodHRwOi8vd3d3LnNlcmlmLmNvbS9cIiBzdHlsZT1cImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyO1wiPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC0zOS4xNjI4LC03LjAwNzQxKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMS4wNjgwNiwwLDAsMC43NTAzLDMwLjcxOTUsMi40ODM5MylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNOTYuOTUsNDMuMDQyQzkxLjc0Myw0NS42MzUgODUuMjU3LDQ3Ljk2OCA3OC4wNjYsNDkuOTgyTDIyLjY3MSw0OS45ODJDMTUuODg4LDQ0LjkxMSAxMC43NDQsMzcuNzM5IDEwLjczLDMwLjAyNkMxMC43MTcsMjIuMzA4IDE1Ljg0MSwxNS4xMTUgMjIuNjEyLDEwLjAxOUw3OC4wMzQsMTAuMDE5Qzg0Ljg0MywxMS45NDYgOTEuMDIxLDE0LjE1OSA5Ni4wODUsMTYuNTc3TDk1LjkzNiwxNi41NTZDOTAuNzYzLDE2LjU1NiA4Ni41NjMsMjIuNTIyIDg2LjU2MywyOS44NzJDODYuNTYzLDM3LjIyMSA5MC43NjMsNDMuMTg4IDk1LjkzNiw0My4xODhMOTYuOTUsNDMuMDQyWlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMS4wNjgwNiwwLDAsMC43NTAzLDMwLjcxOTUsMi40ODM5MylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTAyLjE5MywyMC4wMjVDMTA3LjA3OSwyMy4xMjYgMTA5Ljk1LDI2LjU0NiAxMDkuOTQ0LDMwLjA3MkMxMDkuOTM3LDMzLjc1OCAxMDYuNzg1LDM3LjMxOCAxMDEuNDg4LDQwLjU0NUMxMDMuODEyLDM4LjE1MyAxMDUuMzA5LDM0LjI1OSAxMDUuMzA5LDI5Ljg3MkMxMDUuMzA5LDI1Ljk1MyAxMDQuMTE1LDIyLjQyOCAxMDIuMTkzLDIwLjAyNVpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTExLjE1MTcsMi44NzIyOClcIj5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMDUuMzM0LDUuMDQyQzEwNy43NzMsNS44NTkgMTA5Ljk3LDYuNzA3IDExMS44NTcsNy42MjlDMTEzLjkxLDkuNDMyIDExNS4xODUsMTIuMDc3IDExNS4xODUsMTUuMDE3QzExNS4xODUsMTguMzA4IDExMy41ODcsMjEuMjMgMTExLjEwNCwyMy4wMjVMMTEwLjM5MSwyMy4zNjVMMTA2LjI1NywyNC44OTlMMTA1LjE3NCwyNS4wMDhDOTkuNjQ5LDI1LjAwOCA5NS4xNjMsMjAuNTMxIDk1LjE2MywxNS4wMTdDOTUuMTYzLDkuNTAzIDk5LjY0OSw1LjAyNiAxMDUuMTc0LDUuMDI2TDEwNS4zMzQsNS4wNDJaXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtNDkuMTc0LDIuODcyMjgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtODcuMTg4MSwyLjg3MjI4KVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L3N2Zz5gXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyU3VibWFyaW5lID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwic3VibWFyaW5lXCIsXCJjb21wdXRlclN1Ym1hcmluZVwiKVxuICAgICAgICBjb21wdXRlclN1Ym1hcmluZS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDExMiAzNlwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIiB4bWxuczpzZXJpZj1cImh0dHA6Ly93d3cuc2VyaWYuY29tL1wiIHN0eWxlPVwiZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjI7XCI+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEuMDY4MzYsMCwwLDAuNzUyMDAxLC00MC40MTAzLC00LjU0MTUzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEyOC4xMTYsMTAuMDE5QzEzNC44MTQsMTUuMTA4IDEzOS44NjUsMjIuMjUzIDEzOS44NTEsMjkuOTE1QzEzOS44MzcsMzcuNjg1IDEzNC42MTksNDQuOTA0IDEyNy43NjIsNDkuOTgyTDUyLjY5MSw0OS45ODJDNDUuODM0LDQ0LjkwNCA0MC42MTYsMzcuNjg1IDQwLjYwMiwyOS45MTVDNDAuNTg4LDIyLjI1MyA0NS42MzksMTUuMTA4IDUyLjMzNywxMC4wMTlMMTI4LjExNiwxMC4wMTlaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtMTEuMTksMy4wMDE1NylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC00OS4xODk2LDMuMDAxNTcpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtODcuMTY3MiwzLjAwMTU3KVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L3N2Zz5gXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQm9hdCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImJvYXRcIixcImNvbXB1dGVyQm9hdFwiKVxuICAgICAgICBjb21wdXRlckJvYXQuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCA3NCAzNlwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIiB4bWxuczpzZXJpZj1cImh0dHA6Ly93d3cuc2VyaWYuY29tL1wiIHN0eWxlPVwiZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjI7XCI+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDAuOTc2OTczLDAsMCwwLjc1MjA0OCwtNy4wNjY0MSwtNC41Njc1MylcIj5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk00OC4wMzQsMTAuMDE5QzY2LjI1MywxNS4xNzggNzkuOTU3LDIyLjM3NCA3OS45NDQsMzAuMDcyQzc5LjkzLDM3Ljc1NCA2Ni4yNTMsNDQuODg5IDQ4LjA2Niw0OS45ODJMMjMuOTA4LDQ5Ljk4MkMxNi4yMDEsNDQuOTExIDEwLjM1NiwzNy43MzYgMTAuMzQyLDMwLjAxOEMxMC4zMjgsMjIuMzA1IDE2LjEzOSwxNS4xMTUgMjMuODE3LDEwLjAxOUw0OC4wMzQsMTAuMDE5WlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTQ5LjE3NTIsMi45ODMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtODcuMTY2MSwyLjk4MylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPC9zdmc+YFxuXG4gICAgICAgIGNvbXB1dGVyU3RhdHVzUGFuZWwuYXBwZW5kQ2hpbGQoY29tcHV0ZXJDYXJyaWVyKVxuICAgICAgICBjb21wdXRlclN0YXR1c1BhbmVsLmFwcGVuZENoaWxkKGNvbXB1dGVyQmF0dGxlc2hpcClcbiAgICAgICAgY29tcHV0ZXJTdGF0dXNQYW5lbC5hcHBlbmRDaGlsZChjb21wdXRlckRlc3Ryb3llcilcbiAgICAgICAgY29tcHV0ZXJTdGF0dXNQYW5lbC5hcHBlbmRDaGlsZChjb21wdXRlclN1Ym1hcmluZSlcbiAgICAgICAgY29tcHV0ZXJTdGF0dXNQYW5lbC5hcHBlbmRDaGlsZChjb21wdXRlckJvYXQpXG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgZGl2IHRvIHNob3cgaW5zdHJ1Y3Rpb25zIHRvIHRoZSB1c2VyXG4gICAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImluc3RydWN0aW9uc1wiLG51bGwpXG4gICAgICAgIGluc3RydWN0aW9ucy50ZXh0Q29udGVudCA9IFwiQ2xpY2sgb24gYSBzaGlwIHRvIHBsYWNlIGl0IG9uIHRoZSBib2FyZFwiXG4gICAgICAgIHVzZXJTaWRlLmFwcGVuZENoaWxkKGluc3RydWN0aW9ucylcblxuICAgICAgICAvLyBBZGRpbmcgZXZlbnQgbGlzdGVuZXJzIHRvIHVzZXIgc2hpcHNcbiAgICAgICAgY29uc3QgdXNlclNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi51c2VyU2hpcFwiKVxuICAgICAgICB1c2VyU2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIElmIHNoaXAgaXMgYWxyZWFkeSBwbGFjZWQgb24gYm9hcmQsIHJldHVyblxuICAgICAgICAgICAgICAgIGlmIChzaGlwLmNsYXNzTGlzdC5jb250YWlucyhcInBsYWNlZFwiKSkgcmV0dXJuXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgb3RoZXIgc2VsZWN0ZWQgc2hpcCwgcmVtb3ZlIHRoZSBzZWxlY3RlZCBjbGFzcyBmcm9tIGl0XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRTaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RlZFwiKVxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZFNoaXApIHNlbGVjdGVkU2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIilcblxuICAgICAgICAgICAgICAgIC8vIEFkZCBzZWxlY3RlZCBjbGFzcyB0byB0aGUgY2xpY2tlZCBzaGlwXG4gICAgICAgICAgICAgICAgc2hpcC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIilcblxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBzZWxlY3RlZCBzaGlwIGFuZCBzZWxlY3RlZFNoaXBMZW5ndGggdmFyaWFibGVzXG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRTaGlwTmFtZSA9IHNoaXAuY2xhc3NMaXN0WzBdXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc3dpdGNoIChzZWxlY3RlZFNoaXBOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjYXJyaWVyXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFNoaXBMZW5ndGggPSA1XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYmF0dGxlc2hpcFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRTaGlwTGVuZ3RoID0gNFxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRlc3Ryb3llclwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRTaGlwTGVuZ3RoID0gM1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInN1Ym1hcmluZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRTaGlwTGVuZ3RoID0gM1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImJvYXRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkU2hpcExlbmd0aCA9IDJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFNoaXBMZW5ndGggPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIENoYW5nZSBpbnN0cnVjdGlvbnMgdGV4dFxuICAgICAgICAgICAgICAgIGluc3RydWN0aW9ucy50ZXh0Q29udGVudCA9IFwiU2VsZWN0IGEgcG9zaXRpb24gb24gdGhlIGJvYXJkIHRvIHBsYWNlIHRoZSBzaGlwLiBVc2UgVCBrZXkgdG8gcm90YXRlIHRoZSBzaGlwXCJcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICAvLyBBZGRpbmcgZXZlbnQgbGlzdGVuZXJzIHRvIHVzZXIgYm9hcmQgY2VsbHNcbiAgICAgICAgY29uc3QgdXNlckJvYXJkU3F1YXJlcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiN1c2VyR2FtZWJvYXJkR3JpZCAuZ2FtZWJvYXJkU3F1YXJlXCIpKVxuICAgICAgICB1c2VyQm9hcmRTcXVhcmVzLmZvckVhY2goKHNxdWFyZSxpbmRleCkgPT4ge1xuXG4gICAgICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBsZXQgc2libGluZ3NUb0NvbG9yID0gW11cbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IGluZGV4XG4gICAgICAgICAgICAgICAgY29uc3Qgcm93U3RhcnQgPSBzdGFydCAtIChzdGFydCAlIDEwKVxuICAgICAgICAgICAgICAgIGNvbnN0IHJvd0VuZCA9IHJvd1N0YXJ0ICsgMTBcblxuICAgICAgICAgICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBleHBlY3RlZEVuZCA9IHN0YXJ0ICsgc2VsZWN0ZWRTaGlwTGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIGlmIChleHBlY3RlZEVuZCA+IHJvd0VuZCkgeyAvLyBpZiBzaGlwIGlzIHRvbyBsb25nIHRvIGZpdCBpbiB0aGUgcm93XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgc2libGluZ3NUb0NvbG9yID0gdXNlckJvYXJkU3F1YXJlcy5zbGljZShzdGFydCwgcm93RW5kKVxuICAgICAgICAgICAgICAgICAgICAgICAgc2libGluZ3NUb0NvbG9yLmZvckVhY2goc2libGluZyA9PiBzaWJsaW5nLmNsYXNzTGlzdC5hZGQoXCJob3ZlckxpbWl0c0V4Y2VlZGVkXCIpKVxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIGlmIHNoaXAgZml0cyBpbiB0aGUgcm93XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNpYmxpbmdzVG9Db2xvciA9IHVzZXJCb2FyZFNxdWFyZXMuc2xpY2Uoc3RhcnQsIGV4cGVjdGVkRW5kKVxuICAgICAgICAgICAgICAgICAgICAgICAgc2libGluZ3NUb0NvbG9yLmZvckVhY2goc2libGluZyA9PiBzaWJsaW5nLmNsYXNzTGlzdC5hZGQoXCJob3ZlclwiKSlcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyB2ZXJ0aWNhbFxuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IHN0YXJ0ICsgc2VsZWN0ZWRTaGlwTGVuZ3RoICogMTA7IGkgKz0gMTApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPCB1c2VyQm9hcmRTcXVhcmVzLmxlbmd0aCkgc2libGluZ3NUb0NvbG9yLnB1c2godXNlckJvYXJkU3F1YXJlc1tpXSlcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpYmxpbmdzVG9Db2xvci5sZW5ndGggPCBzZWxlY3RlZFNoaXBMZW5ndGgpIHsgLy8gaWYgc2hpcCBpcyB0b28gbG9uZyB0byBmaXQgaW4gdGhlIGNvbHVtblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWJsaW5nc1RvQ29sb3IuZm9yRWFjaChzaWJsaW5nID0+IHNpYmxpbmcuY2xhc3NMaXN0LmFkZChcImhvdmVyTGltaXRzRXhjZWVkZWRcIikpXG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gaWYgc2hpcCBmaXRzIGluIHRoZSBjb2x1bW5cblxuICAgICAgICAgICAgICAgICAgICAgICAgc2libGluZ3NUb0NvbG9yLmZvckVhY2goc2libGluZyA9PiBzaWJsaW5nLmNsYXNzTGlzdC5hZGQoXCJob3ZlclwiKSlcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdXNlckJvYXJkU3F1YXJlcy5mb3JFYWNoKHNpYmxpbmcgPT4gc2libGluZy5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJcIikpXG4gICAgICAgICAgICAgICAgdXNlckJvYXJkU3F1YXJlcy5mb3JFYWNoKHNpYmxpbmcgPT4gc2libGluZy5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJMaW1pdHNFeGNlZWRlZFwiKSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gQWRkaW5nIGV2ZW50IGxpc3RlbmVyIHRvIFQga2V5IHRvIHJvdGF0ZSB0aGUgc2VsZWN0ZWQgc2hpcFxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09IFwidFwiKSBvcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIiA/IFwidmVydGljYWxcIiA6IFwiaG9yaXpvbnRhbFwiXG5cbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIC8vIExvYWRzIGluaXRpYWwgVUkgc2NyZWVuXG4gICAgZnVuY3Rpb24gbG9hZENvdmVyTWFpblVJKCkge1xuICAgIFxuICAgICAgICAvLyBDcmVhdGUgYSBzY3JlZW4gPGRpdj48L2Rpdj4gdGhhdCBjb3ZlcnMgYWxsIHRoZSBzcGFjZSBhdmFpbGFibGUgb24gYnJvd3NlciBuYXZcbiAgICAgICAgY29uc3Qgc2NyZWVuID0gY3JlYXRlRWxlbWVudChcImRpdlwiLG51bGwsXCJzY3JlZW5cIilcblxuICAgICAgICAvLyBBcHBlbmQgaXQgdG8gYm9keSBlbGVtZW50XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyZWVuKVxuXG4gICAgICAgIC8vIENyZWF0ZSBoZWFkZXIsIG1haW4gYW5kIGZvb3RlciBkaXZzIGluc2lkZSBzY3JlZW4gZGl2XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixudWxsLFwiaGVhZGVyXCIpXG4gICAgICAgIGNvbnN0IG1haW4gPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsbnVsbCxcIm1haW5cIilcbiAgICAgICAgY29uc3QgZm9vdGVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLG51bGwsXCJmb290ZXJcIilcbiAgICAgICAgXG4gICAgICAgIHNjcmVlbi5hcHBlbmRDaGlsZChoZWFkZXIpXG4gICAgICAgIHNjcmVlbi5hcHBlbmRDaGlsZChtYWluKVxuICAgICAgICBzY3JlZW4uYXBwZW5kQ2hpbGQoZm9vdGVyKVxuXG4gICAgICAgIC8vIENyZWF0ZSBhIHRpdGxlIGZvciB0aGUgZ2FtZSBhbmQgYXBwZW5kIGl0IHRvIHRoZSBoZWFkZXJcbiAgICAgICAgY29uc3QgdGl0bGUgPSBjcmVhdGVFbGVtZW50KFwiaDFcIixcInRpdGxlXCIsbnVsbClcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIkJBVFRMRVNISVBcIlxuICAgICAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpXG5cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBjcmVkaXRzIGFuZCBhcHBlbmQgdGhlbSB0byB0aGUgZm9vdGVyXG4gICAgICAgIGNvbnN0IGNyZWRpdHMgPSBjcmVhdGVFbGVtZW50KFwicFwiLFwiY3JlZGl0c1wiLG51bGwpXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBxdW90ZXNcbiAgICAgICAgY3JlZGl0cy5pbm5lckhUTUwgPSAnQ3JlYXRlZCBieSBWRVJFR09STi4gRm9sbG93IG15IHdvcmsgb24gR2l0SHViOiA8YnI+PGJyPjxhIGNsYXNzPVwiZ2l0aHViLWxpbmtcIiBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3ZlcmVnb3JuXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPjxzdmcgY2xhc3M9XCJnaXRodWItaWNvblwiIHdpZHRoPVwiMzJcIiBoZWlnaHQ9XCIzMlwiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTggMEMzLjU4IDAgMCAzLjU4IDAgOGMwIDMuNTQgMi4yOSA2LjUzIDUuNDcgNy41OS40LjA3LjU1LS4xNy41NS0uMzggMC0uMTktLjAxLS44Mi0uMDEtMS40OS0yLjAxLjM3LTIuNTMtLjQ5LTIuNjktLjk0LS4wOS0uMjMtLjQ4LS45NC0uODItMS4xMy0uMjgtLjE1LS42OC0uNTItLjAxLS41My42My0uMDEgMS4wOC41OCAxLjIzLjgyLjcyIDEuMjEgMS44Ny44NyAyLjMzLjY2LjA3LS41Mi4yOC0uODcuNTEtMS4wNy0xLjc4LS4yLTMuNjQtLjg5LTMuNjQtMy45NSAwLS44Ny4zMS0xLjU5LjgyLTIuMTUtLjA4LS4yLS4zNi0xLjAyLjA4LTIuMTIgMCAwIC42Ny0uMjEgMi4yLjgyLjY0LS4xOCAxLjMyLS4yNyAyLS4yNy42OCAwIDEuMzYuMDkgMiAuMjcgMS41My0xLjA0IDIuMi0uODIgMi4yLS44Mi40NCAxLjEuMTYgMS45Mi4wOCAyLjEyLjUxLjU2LjgyIDEuMjcuODIgMi4xNSAwIDMuMDctMS44NyAzLjc1LTMuNjUgMy45NS4yOS4yNS41NC43My41NCAxLjQ4IDAgMS4wNy0uMDEgMS45My0uMDEgMi4yIDAgLjIxLjE1LjQ2LjU1LjM4QTguMDEzIDguMDEzIDAgMCAwIDE2IDhjMC00LjQyLTMuNTgtOC04LTh6XCIvPjwvc3ZnPjwvYT4nXG4gICAgICAgIGZvb3Rlci5hcHBlbmRDaGlsZChjcmVkaXRzKVxuXG4gICAgICAgIC8vIE1haW4gY29udGVudFxuICAgICAgICBjb25zdCBnbG93aW5nQnV0dG9uID0gY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLFwiZ2xvd2luZy1idXR0b25cIixudWxsKVxuICAgICAgICBnbG93aW5nQnV0dG9uLnRleHRDb250ZW50ID0gXCJTVEFSVFwiXG4gICAgICAgIGdsb3dpbmdCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGRlbGV0ZU1haW5VSSgpXG4gICAgICAgICAgICBsb2FkR2FtZVVJKClcbiAgICAgICAgfSlcbiAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChnbG93aW5nQnV0dG9uKVxuXG4gICAgICAgIC8vIFNWRyBTaGlwIHNoYXBlc1xuICAgICAgICBjb25zdCBjYXJyaWVyU2hhcGUgPSBjcmVhdGVFbGVtZW50KFwib2JqZWN0XCIsbnVsbCxcImNhcnJpZXItc2hhcGVcIilcbiAgICAgICAgY2FycmllclNoYXBlLmRhdGEgPSBjYXJyaWVyU3ZnXG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQoY2FycmllclNoYXBlKVxuXG4gICAgICAgIGNvbnN0IHN1Ym1hcmluZVNoYXBlID0gY3JlYXRlRWxlbWVudChcIm9iamVjdFwiLG51bGwsXCJzdWJtYXJpbmUtc2hhcGVcIilcbiAgICAgICAgc3VibWFyaW5lU2hhcGUuZGF0YSA9IHN1Ym1hcmluZVN2Z1xuICAgICAgICBtYWluLmFwcGVuZENoaWxkKHN1Ym1hcmluZVNoYXBlKVxuXG4gICAgICAgIGNvbnN0IGJhdHRsZXNoaXBTaGFwZSA9IGNyZWF0ZUVsZW1lbnQoXCJvYmplY3RcIixudWxsLFwiYmF0dGxlc2hpcC1zaGFwZVwiKVxuICAgICAgICBiYXR0bGVzaGlwU2hhcGUuZGF0YSA9IGJhdHRsZXNoaXBTdmdcbiAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChiYXR0bGVzaGlwU2hhcGUpXG5cbiAgICAgICAgY29uc3QgZGVzdHJveWVyU2hhcGUgPSBjcmVhdGVFbGVtZW50KFwib2JqZWN0XCIsbnVsbCxcImRlc3Ryb3llci1zaGFwZVwiKVxuICAgICAgICBkZXN0cm95ZXJTaGFwZS5kYXRhID0gZGVzdHJveWVyU3ZnXG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQoZGVzdHJveWVyU2hhcGUpXG5cbiAgICAgICAgY29uc3QgcGF0cm9sU2hhcGUgPSBjcmVhdGVFbGVtZW50KFwib2JqZWN0XCIsbnVsbCxcInBhdHJvbC1zaGFwZVwiKVxuICAgICAgICBwYXRyb2xTaGFwZS5kYXRhID0gcGF0cm9sU3ZnXG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQocGF0cm9sU2hhcGUpXG5cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVFbGVtZW50LFxuICAgICAgICBnZXRFbGVtZW50LFxuICAgICAgICBsb2FkQ292ZXJNYWluVUlcbiAgICB9XG5cbn0pKCkiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUJydW5vK0FjZSZkaXNwbGF5PXN3YXApO1wiXSk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1JQk0rUGxleCtNb25vJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcdGJvcmRlcjogMDtcXG5cXHRmb250LXNpemU6IDEwMCU7XFxuXFx0Zm9udDogaW5oZXJpdDtcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5ib2R5IHtcXG5cXHRsaW5lLWhlaWdodDogMTtcXG59XFxub2wsIHVsIHtcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlLCBxIHtcXG5cXHRxdW90ZXM6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG5cXHRjb250ZW50OiAnJztcXG5cXHRjb250ZW50OiBub25lO1xcbn1cXG50YWJsZSB7XFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXG59XFxuXFxuLyogTVkgT1dOIFNUWUxFUyBGUk9NIEhFUkUgKi9cXG5cXG4vKiBGb250cyAqL1xcblxcbmE6dmlzaXRlZCB7XFxuICAgIGNvbG9yOiAjZmZmO1xcbn1cXG5cXG4jc2NyZWVuIHtcXG4gICAgcG9zaXRpb246IGZpeGVkOyAvKiBvciBcXFwiYWJzb2x1dGVcXFwiICovXFxuICAgIHRvcDogMDtcXG4gICAgbGVmdDogMDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgei1pbmRleDogMDtcXG59XFxuXFxuLyogSEVBREVSICovXFxuXFxuI2hlYWRlciB7XFxuICAgIGhlaWdodDogMTAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDc0NzQ3O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBib3JkZXItYm90dG9tOiBzb2xpZCAxcHggIzAwMDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIHotaW5kZXg6IDM7XFxufVxcblxcbi50aXRsZSB7XFxuICAgIGZvbnQtc2l6ZTogMmVtO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGNvbG9yOiAjZThmOTAxO1xcbn1cXG5cXG4jbWFpbiB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgaGVpZ2h0OiA4MCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XFxufVxcblxcbi8qIENPVkVSICovXFxuXFxuLmdsb3dpbmctYnV0dG9uIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRDQUY1MDtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIGZvbnQtc2l6ZTogM2VtO1xcbiAgICBwYWRkaW5nOiAyMHB4IDMwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNXM7XFxuICAgIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiYSgwLCAwLCAwLCAwLjIpO1xcbn1cXG4gIFxcbi5nbG93aW5nLWJ1dHRvbjpob3ZlciB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcXG4gICAgYm94LXNoYWRvdzogMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDAgMjBweCByZ2JhKDc2LCAxNzUsIDgwLCAwLjYpO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGdsb3dpbmcge1xcbiAgICAwJSB7XFxuICAgICAgICBib3gtc2hhZG93OiAwIDAgNXB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAwIDEwcHggcmdiYSg3NiwgMTc1LCA4MCwgMC4yKTtcXG4gICAgfVxcbiAgICA1MCUge1xcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDAgMjBweCByZ2JhKDc2LCAxNzUsIDgwLCAwLjUpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDVweCByZ2JhKDAsIDAsIDAsIDAuMiksIDAgMCAxMHB4IHJnYmEoNzYsIDE3NSwgODAsIDAuMik7XFxuICAgIH1cXG59XFxuXFxuLmdsb3dpbmctYnV0dG9uIHtcXG4gICAgYW5pbWF0aW9uOiBnbG93aW5nIDJzIGluZmluaXRlO1xcbn1cXG5cXG4vKiBDT1ZFUiBTSElQUyAqL1xcblxcbiNjYXJyaWVyLXNoYXBlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMTgwcHg7XFxuICAgIGhlaWdodDogNjBweDtcXG4gICAgdG9wOiAyMCU7XFxuICAgIGFuaW1hdGlvbjogbW92ZS1yaWdodC1sZWZ0IDEwcyBsaW5lYXIgaW5maW5pdGU7IC8qIGFkanVzdCB0aGUgdGltZSBhcyBuZWVkZWQgKi9cXG4gICAgei1pbmRleDogMTtcXG59XFxuXFxuQGtleWZyYW1lcyBtb3ZlLXJpZ2h0LWxlZnQge1xcbiAgICAwJSB7IHJpZ2h0OiAtMTAwJTsgfSAvKiBTdGFydCBmcm9tIG9mZiB0aGUgcmlnaHQgb2YgdGhlIHNjcmVlbiAqL1xcbiAgICAxMDAlIHsgcmlnaHQ6IDEwMCU7IH0gLyogRW5kIG9mZiB0aGUgbGVmdCBvZiB0aGUgc2NyZWVuICovXFxufVxcblxcbiNzdWJtYXJpbmUtc2hhcGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxMjBweDtcXG4gICAgaGVpZ2h0OiA2MHB4O1xcbiAgICBsZWZ0OiAyMCU7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXG4gICAgYW5pbWF0aW9uOiBtb3ZlLXRvcC1kb3duIDEwcyBsaW5lYXIgaW5maW5pdGU7XFxuICAgIHotaW5kZXg6IDE7XFxufVxcblxcbkBrZXlmcmFtZXMgbW92ZS10b3AtZG93biB7XFxuICAgIDAlIHsgdG9wOiAtMjAwcHggfVxcbiAgICAxMDAlIHsgdG9wOiAxNTAwcHh9XFxufVxcblxcbiNiYXR0bGVzaGlwLXNoYXBlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMTUwcHg7XFxuICAgIGhlaWdodDogNjBweDtcXG4gICAgdG9wOiA2NSU7XFxuICAgIGFuaW1hdGlvbjogbW92ZS1sZWZ0LXJpZ2h0IDEwcyBsaW5lYXIgaW5maW5pdGU7IC8qIGFkanVzdCB0aGUgdGltZSBhcyBuZWVkZWQgKi9cXG4gICAgei1pbmRleDogMTtcXG59XFxuXFxuQGtleWZyYW1lcyBtb3ZlLWxlZnQtcmlnaHQge1xcbiAgICAwJSB7IGxlZnQ6IC0xMDAlOyB9IC8qIFN0YXJ0IGZyb20gb2ZmIHRoZSBsZWZ0IG9mIHRoZSBzY3JlZW4gKi9cXG4gICAgMTAwJSB7IGxlZnQ6IDEwMCU7IH0gLyogRW5kIG9mZiB0aGUgcmlnaHQgb2YgdGhlIHNjcmVlbiAqL1xcbn1cXG5cXG4jZGVzdHJveWVyLXNoYXBlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMTIwcHg7XFxuICAgIGhlaWdodDogNjBweDtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTtcXG4gICAgbGVmdDogODAlO1xcbiAgICBhbmltYXRpb246IG1vdmUtZG93bi10b3AgMTBzIGxpbmVhciBpbmZpbml0ZTtcXG4gICAgei1pbmRleDogMTtcXG59XFxuXFxuQGtleWZyYW1lcyBtb3ZlLWRvd24tdG9wIHtcXG4gICAgMCUgeyB0b3A6IDE1MDBweDsgfVxcbiAgICAxMDAlIHsgdG9wOiAtMjAwcHg7IH1cXG59XFxuXFxuI3BhdHJvbC1zaGFwZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDkwcHg7XFxuICAgIGhlaWdodDogNjBweDtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcXG4gICAgdG9wOiA5MCU7XFxuICAgIGFuaW1hdGlvbjogbW92ZS1yaWdodC1sZWZ0IDEwcyBsaW5lYXIgaW5maW5pdGU7XFxuICAgIHotaW5kZXg6IDE7XFxufVxcblxcbi8qIE1BSU4gLSBHQU1FICovXFxuXFxuLnBsYXllclNpZGUge1xcbiAgICB3aWR0aDogNTAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIHBhZGRpbmc6IDUlO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICAgIGdhcDogMmVtO1xcbiAgICBtYXJnaW4tdG9wOiA1ZW07XFxufVxcblxcbi5nYW1lSGVhZGVyIHtcXG4gICAgd2lkdGg6IDQ0MHB4O1xcbiAgICBmb250LXNpemU6IDEuNWVtO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbiN1c2VyR2FtZUhlYWRlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGQzExNTk7XFxufVxcblxcbiNjb21wdXRlckdhbWVIZWFkZXJ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM3MjdEOTU7XFxufVxcblxcbi5nYW1lYm9hcmRDb250YWluZXIge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi54SGVhZGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAganVzdGlmeS1jb250ZW50OiBsZWZ0O1xcbiAgICBwYWRkaW5nLWxlZnQ6IDIuNWVtO1xcbn1cXG5cXG4ueEhlYWRlclNxdWFyZSB7XFxuICAgIHdpZHRoOiAzOHB4O1xcbiAgICBoZWlnaHQ6IDM4cHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcbn1cXG5cXG4uYm90dG9tQm9hcmQge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi55SGVhZGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuLnlIZWFkZXJTcXVhcmUge1xcbiAgICB3aWR0aDogMzhweDtcXG4gICAgaGVpZ2h0OiAzOHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBmb250LXNpemU6IDFlbTtcXG59XFxuXFxuLnlIZWFkZXJTaGlweWFyZCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcbiAgICB3cml0aW5nLW1vZGU6IHZlcnRpY2FsLXJsO1xcbiAgICB0ZXh0LW9yaWVudGF0aW9uOiBtaXhlZDtcXG4gICAgcm90YXRlOiAxODBkZWc7XFxuICAgIG1hcmdpbi10b3A6IDEuOGVtO1xcbn1cXG5cXG4uZ3JpZFBhbmVsQ29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDM4MHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uZ2FtZWJvYXJkR3JpZCB7XFxuICAgIHdpZHRoOiAzODBweDtcXG4gICAgaGVpZ2h0OiAzODBweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbn1cXG5cXG4jdXNlckdhbWVib2FyZEdyaWQge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5nYW1lYm9hcmRTcXVhcmUge1xcbiAgICB3aWR0aDogMzZweDtcXG4gICAgaGVpZ2h0OiAzNnB4O1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjZmZmO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBmb250LXNpemU6IDFlbTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTFkY2ZmO1xcbn1cXG5cXG4jdXNlckdhbWVib2FyZEdyaWQgLmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzk5OTk5OTtcXG59XFxuXFxuI3VzZXJHYW1lYm9hcmRHcmlkIC5ob3ZlckxpbWl0c0V4Y2VlZGVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2MyMzQzNDtcXG59XFxuXFxuI2NvbXB1dGVyR2FtZWJvYXJkR3JpZCAuZ2FtZWJvYXJkU3F1YXJlOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzFiODhlNztcXG59XFxuXFxuLyogU0hJUFlBUkQgKi9cXG5cXG4uc3RhdHVzUGFuZWwge1xcbiAgICB3aWR0aDogMzgycHg7XFxuICAgIGhlaWdodDogNzhweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbiAgICBtYXJnaW4tdG9wOiAzNnB4O1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQocmdiYSgwLCAwLCAwLCAwLjUpIDJweCwgdHJhbnNwYXJlbnQgMnB4KSwgbGluZWFyLWdyYWRpZW50KDkwZGVnLCByZ2JhKDAsIDAsIDAsIDAuNSkgMnB4LCB0cmFuc3BhcmVudCAycHgpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDM4cHggMzhweDtcXG4gICAgZ2FwOiAycHg7XFxufVxcblxcbi5jYXJyaWVyIHtcXG4gICAgd2lkdGg6IDE4OHB4O1xcbiAgICBoZWlnaHQ6IDM2cHg7XFxufVxcblxcbi5iYXR0bGVzaGlwIHtcXG4gICAgd2lkdGg6IDE1MHB4O1xcbiAgICBoZWlnaHQ6IDM2cHg7XFxufVxcblxcbi5zdWJtYXJpbmUge1xcbiAgICB3aWR0aDogMTEycHg7XFxuICAgIGhlaWdodDogMzZweDtcXG59XFxuXFxuLmRlc3Ryb3llciB7XFxuICAgIHdpZHRoOiAxMTJweDtcXG4gICAgaGVpZ2h0OiAzNnB4O1xcbn1cXG5cXG4uYm9hdCB7XFxuICAgIHdpZHRoOiA3NHB4O1xcbiAgICBoZWlnaHQ6IDM2cHg7XFxufVxcblxcbi51c2VyU2hpcCB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgb3BhY2l0eTogMC43O1xcbn1cXG5cXG4udXNlclNoaXA6aG92ZXIge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4udXNlclNoaXAuc2VsZWN0ZWQge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4uaW5zdHJ1Y3Rpb25zIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgZm9udC1zaXplOiAwLjhlbTtcXG4gICAgbGluZS1oZWlnaHQ6IDEuNWVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi8qIEZPT1RFUiAqL1xcblxcbiNmb290ZXIge1xcbiAgICBoZWlnaHQ6IDEwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzQ3NDc0NztcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYm9yZGVyLXRvcDogc29saWQgMXB4ICMwMDA7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICB6LWluZGV4OiAzO1xcbn1cXG5cXG4uY3JlZGl0cyB7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBmb250LWZhbWlseTogJ0lCTSBQbGV4IE1vbm8nLCBtb25vc3BhY2U7XFxuICAgIGZvbnQtc2l6ZTogMC44ZW07XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLyogU3R5bGUgdGhlIGxpbmsgdG8gcmVtb3ZlIGRlZmF1bHQgc3R5bGluZyAqL1xcbi5naXRodWItbGluayB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICBjb2xvcjogaW5oZXJpdDtcXG59XFxuXFxuLyogQWRkIHRoZSBob3ZlciBlZmZlY3QgKi9cXG4uZ2l0aHViLWljb24ge1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC41cyBlYXNlLWluLW91dDsgLyogQWRkIGEgdHJhbnNpdGlvbiBmb3IgdGhlIHRyYW5zZm9ybSBwcm9wZXJ0eSAqL1xcbn1cXG5cXG4uZ2l0aHViLWxpbms6aG92ZXIgLmdpdGh1Yi1pY29uIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTsgLyogUm90YXRlIHRoZSBpY29uIDE4MCBkZWdyZWVzIHdoZW4gaG92ZXJlZCAqL1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJw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Q0FBNkM7QUFDNUVcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcblxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0Ym9yZGVyOiAwO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHRmb250OiBpbmhlcml0O1xcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxufVxcbmJvZHkge1xcblxcdGxpbmUtaGVpZ2h0OiAxO1xcbn1cXG5vbCwgdWwge1xcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGUsIHEge1xcblxcdHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICcnO1xcblxcdGNvbnRlbnQ6IG5vbmU7XFxufVxcbnRhYmxlIHtcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cXG5cXG4vKiBNWSBPV04gU1RZTEVTIEZST00gSEVSRSAqL1xcblxcbi8qIEZvbnRzICovXFxuXFxuQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9QnJ1bm8rQWNlJmRpc3BsYXk9c3dhcCcpO1xcbkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUlCTStQbGV4K01vbm8mZGlzcGxheT1zd2FwJyk7XFxuXFxuYTp2aXNpdGVkIHtcXG4gICAgY29sb3I6ICNmZmY7XFxufVxcblxcbiNzY3JlZW4ge1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7IC8qIG9yIFxcXCJhYnNvbHV0ZVxcXCIgKi9cXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICB6LWluZGV4OiAwO1xcbn1cXG5cXG4vKiBIRUFERVIgKi9cXG5cXG4jaGVhZGVyIHtcXG4gICAgaGVpZ2h0OiAxMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0NzQ3NDc7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCAjMDAwO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgei1pbmRleDogMztcXG59XFxuXFxuLnRpdGxlIHtcXG4gICAgZm9udC1zaXplOiAyZW07XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgY29sb3I6ICNlOGY5MDE7XFxufVxcblxcbiNtYWluIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBoZWlnaHQ6IDgwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcXG59XFxuXFxuLyogQ09WRVIgKi9cXG5cXG4uZ2xvd2luZy1idXR0b24ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNENBRjUwO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgZm9udC1zaXplOiAzZW07XFxuICAgIHBhZGRpbmc6IDIwcHggMzBweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC41cztcXG4gICAgYm94LXNoYWRvdzogMCAwIDVweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxufVxcbiAgXFxuLmdsb3dpbmctYnV0dG9uOmhvdmVyIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xcbiAgICBib3gtc2hhZG93OiAwIDAgMTBweCByZ2JhKDAsIDAsIDAsIDAuMiksIDAgMCAyMHB4IHJnYmEoNzYsIDE3NSwgODAsIDAuNik7XFxufVxcblxcbkBrZXlmcmFtZXMgZ2xvd2luZyB7XFxuICAgIDAlIHtcXG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDAgMTBweCByZ2JhKDc2LCAxNzUsIDgwLCAwLjIpO1xcbiAgICB9XFxuICAgIDUwJSB7XFxuICAgICAgICBib3gtc2hhZG93OiAwIDAgMTBweCByZ2JhKDAsIDAsIDAsIDAuMiksIDAgMCAyMHB4IHJnYmEoNzYsIDE3NSwgODAsIDAuNSk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICBib3gtc2hhZG93OiAwIDAgNXB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAwIDEwcHggcmdiYSg3NiwgMTc1LCA4MCwgMC4yKTtcXG4gICAgfVxcbn1cXG5cXG4uZ2xvd2luZy1idXR0b24ge1xcbiAgICBhbmltYXRpb246IGdsb3dpbmcgMnMgaW5maW5pdGU7XFxufVxcblxcbi8qIENPVkVSIFNISVBTICovXFxuXFxuI2NhcnJpZXItc2hhcGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxODBweDtcXG4gICAgaGVpZ2h0OiA2MHB4O1xcbiAgICB0b3A6IDIwJTtcXG4gICAgYW5pbWF0aW9uOiBtb3ZlLXJpZ2h0LWxlZnQgMTBzIGxpbmVhciBpbmZpbml0ZTsgLyogYWRqdXN0IHRoZSB0aW1lIGFzIG5lZWRlZCAqL1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIG1vdmUtcmlnaHQtbGVmdCB7XFxuICAgIDAlIHsgcmlnaHQ6IC0xMDAlOyB9IC8qIFN0YXJ0IGZyb20gb2ZmIHRoZSByaWdodCBvZiB0aGUgc2NyZWVuICovXFxuICAgIDEwMCUgeyByaWdodDogMTAwJTsgfSAvKiBFbmQgb2ZmIHRoZSBsZWZ0IG9mIHRoZSBzY3JlZW4gKi9cXG59XFxuXFxuI3N1Ym1hcmluZS1zaGFwZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDEyMHB4O1xcbiAgICBoZWlnaHQ6IDYwcHg7XFxuICAgIGxlZnQ6IDIwJTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcbiAgICBhbmltYXRpb246IG1vdmUtdG9wLWRvd24gMTBzIGxpbmVhciBpbmZpbml0ZTtcXG4gICAgei1pbmRleDogMTtcXG59XFxuXFxuQGtleWZyYW1lcyBtb3ZlLXRvcC1kb3duIHtcXG4gICAgMCUgeyB0b3A6IC0yMDBweCB9XFxuICAgIDEwMCUgeyB0b3A6IDE1MDBweH1cXG59XFxuXFxuI2JhdHRsZXNoaXAtc2hhcGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxNTBweDtcXG4gICAgaGVpZ2h0OiA2MHB4O1xcbiAgICB0b3A6IDY1JTtcXG4gICAgYW5pbWF0aW9uOiBtb3ZlLWxlZnQtcmlnaHQgMTBzIGxpbmVhciBpbmZpbml0ZTsgLyogYWRqdXN0IHRoZSB0aW1lIGFzIG5lZWRlZCAqL1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIG1vdmUtbGVmdC1yaWdodCB7XFxuICAgIDAlIHsgbGVmdDogLTEwMCU7IH0gLyogU3RhcnQgZnJvbSBvZmYgdGhlIGxlZnQgb2YgdGhlIHNjcmVlbiAqL1xcbiAgICAxMDAlIHsgbGVmdDogMTAwJTsgfSAvKiBFbmQgb2ZmIHRoZSByaWdodCBvZiB0aGUgc2NyZWVuICovXFxufVxcblxcbiNkZXN0cm95ZXItc2hhcGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxMjBweDtcXG4gICAgaGVpZ2h0OiA2MHB4O1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpO1xcbiAgICBsZWZ0OiA4MCU7XFxuICAgIGFuaW1hdGlvbjogbW92ZS1kb3duLXRvcCAxMHMgbGluZWFyIGluZmluaXRlO1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIG1vdmUtZG93bi10b3Age1xcbiAgICAwJSB7IHRvcDogMTUwMHB4OyB9XFxuICAgIDEwMCUgeyB0b3A6IC0yMDBweDsgfVxcbn1cXG5cXG4jcGF0cm9sLXNoYXBlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogOTBweDtcXG4gICAgaGVpZ2h0OiA2MHB4O1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xcbiAgICB0b3A6IDkwJTtcXG4gICAgYW5pbWF0aW9uOiBtb3ZlLXJpZ2h0LWxlZnQgMTBzIGxpbmVhciBpbmZpbml0ZTtcXG4gICAgei1pbmRleDogMTtcXG59XFxuXFxuLyogTUFJTiAtIEdBTUUgKi9cXG5cXG4ucGxheWVyU2lkZSB7XFxuICAgIHdpZHRoOiA1MCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgcGFkZGluZzogNSU7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gICAgZ2FwOiAyZW07XFxuICAgIG1hcmdpbi10b3A6IDVlbTtcXG59XFxuXFxuLmdhbWVIZWFkZXIge1xcbiAgICB3aWR0aDogNDQwcHg7XFxuICAgIGZvbnQtc2l6ZTogMS41ZW07XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuI3VzZXJHYW1lSGVhZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0ZDMTE1OTtcXG59XFxuXFxuI2NvbXB1dGVyR2FtZUhlYWRlcntcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzcyN0Q5NTtcXG59XFxuXFxuLmdhbWVib2FyZENvbnRhaW5lciB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLnhIZWFkZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGxlZnQ7XFxuICAgIHBhZGRpbmctbGVmdDogMi41ZW07XFxufVxcblxcbi54SGVhZGVyU3F1YXJlIHtcXG4gICAgd2lkdGg6IDM4cHg7XFxuICAgIGhlaWdodDogMzhweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgZm9udC1zaXplOiAxZW07XFxufVxcblxcbi5ib3R0b21Cb2FyZCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLnlIZWFkZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4ueUhlYWRlclNxdWFyZSB7XFxuICAgIHdpZHRoOiAzOHB4O1xcbiAgICBoZWlnaHQ6IDM4cHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcbn1cXG5cXG4ueUhlYWRlclNoaXB5YXJkIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgZm9udC1zaXplOiAxZW07XFxuICAgIHdyaXRpbmctbW9kZTogdmVydGljYWwtcmw7XFxuICAgIHRleHQtb3JpZW50YXRpb246IG1peGVkO1xcbiAgICByb3RhdGU6IDE4MGRlZztcXG4gICAgbWFyZ2luLXRvcDogMS44ZW07XFxufVxcblxcbi5ncmlkUGFuZWxDb250YWluZXIge1xcbiAgICB3aWR0aDogMzgwcHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5nYW1lYm9hcmRHcmlkIHtcXG4gICAgd2lkdGg6IDM4MHB4O1xcbiAgICBoZWlnaHQ6IDM4MHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxufVxcblxcbiN1c2VyR2FtZWJvYXJkR3JpZCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLmdhbWVib2FyZFNxdWFyZSB7XFxuICAgIHdpZHRoOiAzNnB4O1xcbiAgICBoZWlnaHQ6IDM2cHg7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICNmZmY7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhMWRjZmY7XFxufVxcblxcbiN1c2VyR2FtZWJvYXJkR3JpZCAuaG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTk5OTk5O1xcbn1cXG5cXG4jdXNlckdhbWVib2FyZEdyaWQgLmhvdmVyTGltaXRzRXhjZWVkZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzIzNDM0O1xcbn1cXG5cXG4jY29tcHV0ZXJHYW1lYm9hcmRHcmlkIC5nYW1lYm9hcmRTcXVhcmU6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWI4OGU3O1xcbn1cXG5cXG4vKiBTSElQWUFSRCAqL1xcblxcbi5zdGF0dXNQYW5lbCB7XFxuICAgIHdpZHRoOiAzODJweDtcXG4gICAgaGVpZ2h0OiA3OHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxuICAgIG1hcmdpbi10b3A6IDM2cHg7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudChyZ2JhKDAsIDAsIDAsIDAuNSkgMnB4LCB0cmFuc3BhcmVudCAycHgpLCBsaW5lYXItZ3JhZGllbnQoOTBkZWcsIHJnYmEoMCwgMCwgMCwgMC41KSAycHgsIHRyYW5zcGFyZW50IDJweCk7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMzhweCAzOHB4O1xcbiAgICBnYXA6IDJweDtcXG59XFxuXFxuLmNhcnJpZXIge1xcbiAgICB3aWR0aDogMTg4cHg7XFxuICAgIGhlaWdodDogMzZweDtcXG59XFxuXFxuLmJhdHRsZXNoaXAge1xcbiAgICB3aWR0aDogMTUwcHg7XFxuICAgIGhlaWdodDogMzZweDtcXG59XFxuXFxuLnN1Ym1hcmluZSB7XFxuICAgIHdpZHRoOiAxMTJweDtcXG4gICAgaGVpZ2h0OiAzNnB4O1xcbn1cXG5cXG4uZGVzdHJveWVyIHtcXG4gICAgd2lkdGg6IDExMnB4O1xcbiAgICBoZWlnaHQ6IDM2cHg7XFxufVxcblxcbi5ib2F0IHtcXG4gICAgd2lkdGg6IDc0cHg7XFxuICAgIGhlaWdodDogMzZweDtcXG59XFxuXFxuLnVzZXJTaGlwIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBvcGFjaXR5OiAwLjc7XFxufVxcblxcbi51c2VyU2hpcDpob3ZlciB7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcblxcbi51c2VyU2hpcC5zZWxlY3RlZCB7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcblxcbi5pbnN0cnVjdGlvbnMge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBmb250LXNpemU6IDAuOGVtO1xcbiAgICBsaW5lLWhlaWdodDogMS41ZW07XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLyogRk9PVEVSICovXFxuXFxuI2Zvb3RlciB7XFxuICAgIGhlaWdodDogMTAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDc0NzQ3O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBib3JkZXItdG9wOiBzb2xpZCAxcHggIzAwMDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIHotaW5kZXg6IDM7XFxufVxcblxcbi5jcmVkaXRzIHtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGZvbnQtZmFtaWx5OiAnSUJNIFBsZXggTW9ubycsIG1vbm9zcGFjZTtcXG4gICAgZm9udC1zaXplOiAwLjhlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4vKiBTdHlsZSB0aGUgbGluayB0byByZW1vdmUgZGVmYXVsdCBzdHlsaW5nICovXFxuLmdpdGh1Yi1saW5rIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGNvbG9yOiBpbmhlcml0O1xcbn1cXG5cXG4vKiBBZGQgdGhlIGhvdmVyIGVmZmVjdCAqL1xcbi5naXRodWItaWNvbiB7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjVzIGVhc2UtaW4tb3V0OyAvKiBBZGQgYSB0cmFuc2l0aW9uIGZvciB0aGUgdHJhbnNmb3JtIHByb3BlcnR5ICovXFxufVxcblxcbi5naXRodWItbGluazpob3ZlciAuZ2l0aHViLWljb24ge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyAvKiBSb3RhdGUgdGhlIGljb24gMTgwIGRlZ3JlZXMgd2hlbiBob3ZlcmVkICovXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjVhNjkyZDlmZDJmYjhjMzQyYmVjZTRjMjY0MWE1MWNkLnN2Z1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmMDRkZjcxZDdjMWQ3ODZkYWFmMGI3NGI0YzA2YWNmZS5zdmdcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiMjNkZTg1ODFjOWE2NTg0NmFhYTEwYmEwMWVhZmY2YjAuc3ZnXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjZlZjk1N2M4ZmM5ZjI0MTc5NGE0Y2M4YWY2M2RlYjMxLnN2Z1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIwZTJiMDc4MjY4OWZlNzNiZjFkMDI4Nzg1MGM4NzA4OC5zdmdcIjsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJ2aWV3IiwibG9hZENvdmVyTWFpblVJIiwiY2FycmllclN2ZyIsInN1Ym1hcmluZVN2ZyIsImJhdHRsZXNoaXBTdmciLCJkZXN0cm95ZXJTdmciLCJwYXRyb2xTdmciLCJjcmVhdGVFbGVtZW50IiwidGFnIiwiY2xhc3NOYW1lIiwiaWQiLCJlbGVtZW50IiwiZG9jdW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRBdHRyaWJ1dGUiLCJnZXRFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJkZWxldGVNYWluVUkiLCJtYWluIiwiaW5uZXJIVE1MIiwibG9hZEdhbWVVSSIsInNlbGVjdGVkU2hpcExlbmd0aCIsIm9yaWVudGF0aW9uIiwic2VsZWN0ZWRTaGlwTmFtZSIsInVzZXJTaWRlIiwiY29tcHV0ZXJTaWRlIiwiYXBwZW5kQ2hpbGQiLCJ1c2VySGVhZGVyIiwiY29tcHV0ZXJIZWFkZXIiLCJ1c2VyVGl0bGUiLCJjb21wdXRlclRpdGxlIiwidGV4dENvbnRlbnQiLCJ1c2VyR2FtZWJvYXJkQ29udGFpbmVyIiwiY29tcHV0ZXJHYW1lYm9hcmRDb250YWluZXIiLCJ1c2VyWEhlYWRlciIsImNvbXB1dGVyWEhlYWRlciIsImkiLCJ1c2VyWEhlYWRlclNxdWFyZSIsImNvbXB1dGVyWEhlYWRlclNxdWFyZSIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsInVzZXJCb3R0b21Cb2FyZCIsImNvbXB1dGVyQm90dG9tQm9hcmQiLCJ1c2VyWUhlYWRlciIsImNvbXB1dGVyWUhlYWRlciIsInVzZXJZSGVhZGVyU3F1YXJlIiwiY29tcHV0ZXJZSGVhZGVyU3F1YXJlIiwidXNlcllIZWFkZXJTaGlweWFyZCIsImNvbXB1dGVyWUhlYWRlclNoaXB5YXJkIiwidXNlckdyaWRQYW5lbENvbnRhaW5lciIsImNvbXB1dGVyR3JpZFBhbmVsQ29udGFpbmVyIiwidXNlckdhbWVib2FyZCIsImNvbXB1dGVyR2FtZWJvYXJkIiwidXNlckdhbWVib2FyZFNxdWFyZSIsImNvbXB1dGVyR2FtZWJvYXJkU3F1YXJlIiwidXNlclN0YXR1c1BhbmVsIiwiY29tcHV0ZXJTdGF0dXNQYW5lbCIsInVzZXJDYXJyaWVyIiwidXNlckJhdHRsZXNoaXAiLCJ1c2VyRGVzdHJveWVyIiwidXNlclN1Ym1hcmluZSIsInVzZXJCb2F0IiwiY29tcHV0ZXJDYXJyaWVyIiwiY29tcHV0ZXJCYXR0bGVzaGlwIiwiY29tcHV0ZXJEZXN0cm95ZXIiLCJjb21wdXRlclN1Ym1hcmluZSIsImNvbXB1dGVyQm9hdCIsImluc3RydWN0aW9ucyIsInVzZXJTaGlwcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwic2hpcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb250YWlucyIsInNlbGVjdGVkU2hpcCIsInF1ZXJ5U2VsZWN0b3IiLCJyZW1vdmUiLCJ1c2VyQm9hcmRTcXVhcmVzIiwiQXJyYXkiLCJmcm9tIiwic3F1YXJlIiwiaW5kZXgiLCJzaWJsaW5nc1RvQ29sb3IiLCJzdGFydCIsInJvd1N0YXJ0Iiwicm93RW5kIiwiZXhwZWN0ZWRFbmQiLCJzbGljZSIsInNpYmxpbmciLCJsZW5ndGgiLCJwdXNoIiwiZSIsImtleSIsInNjcmVlbiIsImJvZHkiLCJoZWFkZXIiLCJmb290ZXIiLCJ0aXRsZSIsImNyZWRpdHMiLCJnbG93aW5nQnV0dG9uIiwiY2FycmllclNoYXBlIiwiZGF0YSIsInN1Ym1hcmluZVNoYXBlIiwiYmF0dGxlc2hpcFNoYXBlIiwiZGVzdHJveWVyU2hhcGUiLCJwYXRyb2xTaGFwZSJdLCJzb3VyY2VSb290IjoiIn0=