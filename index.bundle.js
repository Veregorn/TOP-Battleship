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

  // Functions to make SVGs draggable
  /* function allowDrop(ev) {
      ev.preventDefault();
  }
  
  function drag(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
      ev.preventDefault();
      const data = ev.dataTransfer.getData("text");
      ev.target.appendChild(document.getElementById(data));
  } */

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
    userCarrier.setAttribute("draggable", "true");
    const userBattleship = createElement("div", "battleship", "userBattleship");
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
    userBattleship.setAttribute("draggable", "true");
    const userDestroyer = createElement("div", "destroyer", "userDestroyer");
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
    userDestroyer.setAttribute("draggable", "true");
    const userSubmarine = createElement("div", "submarine", "userSubmarine");
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
    userSubmarine.setAttribute("draggable", "true");
    const userBoat = createElement("div", "boat", "userBoat");
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
    userBoat.setAttribute("draggable", "true");
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
    computerCarrier.setAttribute("draggable", "true");
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
    computerBattleship.setAttribute("draggable", "true");
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
    computerDestroyer.setAttribute("draggable", "true");
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
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Bruno+Ace&display=swap);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\n/* MY OWN STYLES FROM HERE */\n\n/* Fonts */\n\na:visited {\n    color: #fff;\n}\n\n#screen {\n    position: fixed; /* or \"absolute\" */\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: #fff;\n    display: flex;\n    flex-direction: column;\n    z-index: 0;\n}\n\n/* HEADER */\n\n#header {\n    height: 10%;\n    background-color: #474747;\n    display: flex;\n    border-bottom: solid 1px #000;\n    align-items: center;\n    justify-content: center;\n    z-index: 3;\n}\n\n.title {\n    font-size: 2em;\n    font-family: 'Bruno Ace';\n    color: #e8f901;\n}\n\n#main {\n    position: relative;\n    height: 80%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: rgb(255, 255, 255);\n}\n\n/* COVER */\n\n.glowing-button {\n    background-color: #4CAF50;\n    border: none;\n    border-radius: 20px;\n    color: white;\n    font-size: 3em;\n    padding: 20px 30px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    cursor: pointer;\n    transition: transform 0.5s;\n    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);\n}\n  \n.glowing-button:hover {\n    transform: scale(1.1);\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(76, 175, 80, 0.6);\n}\n\n@keyframes glowing {\n    0% {\n        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(76, 175, 80, 0.2);\n    }\n    50% {\n        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(76, 175, 80, 0.5);\n    }\n    100% {\n        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(76, 175, 80, 0.2);\n    }\n}\n\n.glowing-button {\n    animation: glowing 2s infinite;\n}\n\n/* COVER SHIPS */\n\n#carrier-shape {\n    position: absolute;\n    width: 180px;\n    height: 60px;\n    top: 20%;\n    animation: move-right-left 10s linear infinite; /* adjust the time as needed */\n    z-index: 1;\n}\n\n@keyframes move-right-left {\n    0% { right: -100%; } /* Start from off the right of the screen */\n    100% { right: 100%; } /* End off the left of the screen */\n}\n\n#submarine-shape {\n    position: absolute;\n    width: 120px;\n    height: 60px;\n    left: 20%;\n    transform: rotate(90deg);\n    animation: move-top-down 10s linear infinite;\n    z-index: 1;\n}\n\n@keyframes move-top-down {\n    0% { top: -200px }\n    100% { top: 1500px}\n}\n\n#battleship-shape {\n    position: absolute;\n    width: 150px;\n    height: 60px;\n    top: 65%;\n    animation: move-left-right 10s linear infinite; /* adjust the time as needed */\n    z-index: 1;\n}\n\n@keyframes move-left-right {\n    0% { left: -100%; } /* Start from off the left of the screen */\n    100% { left: 100%; } /* End off the right of the screen */\n}\n\n#destroyer-shape {\n    position: absolute;\n    width: 120px;\n    height: 60px;\n    transform: rotate(270deg);\n    left: 80%;\n    animation: move-down-top 10s linear infinite;\n    z-index: 1;\n}\n\n@keyframes move-down-top {\n    0% { top: 1500px; }\n    100% { top: -200px; }\n}\n\n#patrol-shape {\n    position: absolute;\n    width: 90px;\n    height: 60px;\n    transform: rotate(180deg);\n    top: 90%;\n    animation: move-right-left 10s linear infinite;\n    z-index: 1;\n}\n\n/* MAIN - GAME */\n\n.playerSide {\n    width: 50%;\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    padding: 5%;\n    align-items: center;\n    justify-content: center;\n    gap: 4em;\n}\n\n.gameHeader {\n    width: 440px;\n    font-size: 1.5em;\n    font-family: 'Bruno Ace';\n    color: #fff;\n    padding: 10px;\n    text-align: center;\n}\n\n#userGameHeader {\n    background-color: #FC1159;\n}\n\n#computerGameHeader{\n    background-color: #727D95;\n}\n\n.gameboardContainer {\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n}\n\n.xHeader {\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    padding-left: 2em;\n}\n\n.xHeaderSquare {\n    width: 38px;\n    height: 38px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n}\n\n.bottomBoard {\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n}\n\n.yHeader {\n    display: flex;\n    flex-direction: column;\n}\n\n.yHeaderSquare {\n    width: 38px;\n    height: 38px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n}\n\n.gameboardGrid {\n    width: 380px;\n    height: 380px;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n}\n\n.gameboardSquare {\n    width: 36px;\n    height: 36px;\n    border: solid 1px #fff;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n    cursor: pointer;\n    background-color: #a1dcff;\n}\n\n.gameboardSquare:hover {\n    background-color: #1b88e7;\n}\n\n/* SHIPYARD */\n\n.statusPanelContainer {\n    width: 80%;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start;\n    gap: 50px;\n}\n\n.panelTitle {\n    writing-mode: vertical-rl;\n    text-orientation: mixed;\n    rotate: 180deg;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n}\n\n.statusPanel {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start;\n    flex-wrap: wrap;\n    gap: 20px;\n}\n\n.carrier {\n    width: 188px;\n    height: 36px;\n}\n\n.battleship {\n    width: 150px;\n    height: 36px;\n}\n\n.submarine {\n    width: 112px;\n    height: 36px;\n}\n\n.destroyer {\n    width: 112px;\n    height: 36px;\n}\n\n.boat {\n    width: 74px;\n    height: 36px;\n}\n\n.shipShape {\n    cursor: move;\n}\n\n/* FOOTER */\n\n#footer {\n    height: 10%;\n    background-color: #474747;\n    display: flex;\n    border-top: solid 1px #000;\n    align-items: center;\n    justify-content: center;\n    z-index: 3;\n}\n\n.credits {\n    color: #fff;\n    font-family: 'IBM Plex Mono', monospace;\n    font-size: 0.8em;\n    text-align: center;\n}\n\n/* Style the link to remove default styling */\n.github-link {\n    display: inline-block;\n    text-decoration: none;\n    color: inherit;\n}\n\n/* Add the hover effect */\n.github-icon {\n    transition: transform 0.5s ease-in-out; /* Add a transition for the transform property */\n}\n\n.github-link:hover .github-icon {\n    transform: rotate(180deg); /* Rotate the icon 180 degrees when hovered */\n}", "",{"version":3,"sources":["webpack://./src/styles/index.css"],"names":[],"mappings":"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","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\n/* MY OWN STYLES FROM HERE */\n\n/* Fonts */\n\n@import url('https://fonts.googleapis.com/css2?family=Bruno+Ace&display=swap');\n@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap');\n\na:visited {\n    color: #fff;\n}\n\n#screen {\n    position: fixed; /* or \"absolute\" */\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: #fff;\n    display: flex;\n    flex-direction: column;\n    z-index: 0;\n}\n\n/* HEADER */\n\n#header {\n    height: 10%;\n    background-color: #474747;\n    display: flex;\n    border-bottom: solid 1px #000;\n    align-items: center;\n    justify-content: center;\n    z-index: 3;\n}\n\n.title {\n    font-size: 2em;\n    font-family: 'Bruno Ace';\n    color: #e8f901;\n}\n\n#main {\n    position: relative;\n    height: 80%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: rgb(255, 255, 255);\n}\n\n/* COVER */\n\n.glowing-button {\n    background-color: #4CAF50;\n    border: none;\n    border-radius: 20px;\n    color: white;\n    font-size: 3em;\n    padding: 20px 30px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    cursor: pointer;\n    transition: transform 0.5s;\n    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);\n}\n  \n.glowing-button:hover {\n    transform: scale(1.1);\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(76, 175, 80, 0.6);\n}\n\n@keyframes glowing {\n    0% {\n        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(76, 175, 80, 0.2);\n    }\n    50% {\n        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(76, 175, 80, 0.5);\n    }\n    100% {\n        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(76, 175, 80, 0.2);\n    }\n}\n\n.glowing-button {\n    animation: glowing 2s infinite;\n}\n\n/* COVER SHIPS */\n\n#carrier-shape {\n    position: absolute;\n    width: 180px;\n    height: 60px;\n    top: 20%;\n    animation: move-right-left 10s linear infinite; /* adjust the time as needed */\n    z-index: 1;\n}\n\n@keyframes move-right-left {\n    0% { right: -100%; } /* Start from off the right of the screen */\n    100% { right: 100%; } /* End off the left of the screen */\n}\n\n#submarine-shape {\n    position: absolute;\n    width: 120px;\n    height: 60px;\n    left: 20%;\n    transform: rotate(90deg);\n    animation: move-top-down 10s linear infinite;\n    z-index: 1;\n}\n\n@keyframes move-top-down {\n    0% { top: -200px }\n    100% { top: 1500px}\n}\n\n#battleship-shape {\n    position: absolute;\n    width: 150px;\n    height: 60px;\n    top: 65%;\n    animation: move-left-right 10s linear infinite; /* adjust the time as needed */\n    z-index: 1;\n}\n\n@keyframes move-left-right {\n    0% { left: -100%; } /* Start from off the left of the screen */\n    100% { left: 100%; } /* End off the right of the screen */\n}\n\n#destroyer-shape {\n    position: absolute;\n    width: 120px;\n    height: 60px;\n    transform: rotate(270deg);\n    left: 80%;\n    animation: move-down-top 10s linear infinite;\n    z-index: 1;\n}\n\n@keyframes move-down-top {\n    0% { top: 1500px; }\n    100% { top: -200px; }\n}\n\n#patrol-shape {\n    position: absolute;\n    width: 90px;\n    height: 60px;\n    transform: rotate(180deg);\n    top: 90%;\n    animation: move-right-left 10s linear infinite;\n    z-index: 1;\n}\n\n/* MAIN - GAME */\n\n.playerSide {\n    width: 50%;\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    padding: 5%;\n    align-items: center;\n    justify-content: center;\n    gap: 4em;\n}\n\n.gameHeader {\n    width: 440px;\n    font-size: 1.5em;\n    font-family: 'Bruno Ace';\n    color: #fff;\n    padding: 10px;\n    text-align: center;\n}\n\n#userGameHeader {\n    background-color: #FC1159;\n}\n\n#computerGameHeader{\n    background-color: #727D95;\n}\n\n.gameboardContainer {\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n}\n\n.xHeader {\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    padding-left: 2em;\n}\n\n.xHeaderSquare {\n    width: 38px;\n    height: 38px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n}\n\n.bottomBoard {\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n}\n\n.yHeader {\n    display: flex;\n    flex-direction: column;\n}\n\n.yHeaderSquare {\n    width: 38px;\n    height: 38px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n}\n\n.gameboardGrid {\n    width: 380px;\n    height: 380px;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n}\n\n.gameboardSquare {\n    width: 36px;\n    height: 36px;\n    border: solid 1px #fff;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n    cursor: pointer;\n    background-color: #a1dcff;\n}\n\n.gameboardSquare:hover {\n    background-color: #1b88e7;\n}\n\n/* SHIPYARD */\n\n.statusPanelContainer {\n    width: 80%;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start;\n    gap: 50px;\n}\n\n.panelTitle {\n    writing-mode: vertical-rl;\n    text-orientation: mixed;\n    rotate: 180deg;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n}\n\n.statusPanel {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start;\n    flex-wrap: wrap;\n    gap: 20px;\n}\n\n.carrier {\n    width: 188px;\n    height: 36px;\n}\n\n.battleship {\n    width: 150px;\n    height: 36px;\n}\n\n.submarine {\n    width: 112px;\n    height: 36px;\n}\n\n.destroyer {\n    width: 112px;\n    height: 36px;\n}\n\n.boat {\n    width: 74px;\n    height: 36px;\n}\n\n.shipShape {\n    cursor: move;\n}\n\n/* FOOTER */\n\n#footer {\n    height: 10%;\n    background-color: #474747;\n    display: flex;\n    border-top: solid 1px #000;\n    align-items: center;\n    justify-content: center;\n    z-index: 3;\n}\n\n.credits {\n    color: #fff;\n    font-family: 'IBM Plex Mono', monospace;\n    font-size: 0.8em;\n    text-align: center;\n}\n\n/* Style the link to remove default styling */\n.github-link {\n    display: inline-block;\n    text-decoration: none;\n    color: inherit;\n}\n\n/* Add the hover effect */\n.github-icon {\n    transition: transform 0.5s ease-in-out; /* Add a transition for the transform property */\n}\n\n.github-link:hover .github-icon {\n    transform: rotate(180deg); /* Rotate the icon 180 degrees when hovered */\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2pDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL3ZpZXcuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL2luZGV4LmNzcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9hc3NldHMvZ3JhcGhpY3MvYmF0dGxlc2hpcC5zdmciLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvYXNzZXRzL2dyYXBoaWNzL2NhcnJpZXIuc3ZnIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2Fzc2V0cy9ncmFwaGljcy9kZXN0cm95ZXIuc3ZnIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2Fzc2V0cy9ncmFwaGljcy9wYXRyb2wtYm9hdC5zdmciLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvYXNzZXRzL2dyYXBoaWNzL3N1Ym1hcmluZS5zdmciLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL2luZGV4LmNzcz82MzQ5Iiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguY3NzXCJcbmltcG9ydCB7IHZpZXcgfSBmcm9tIFwiLi92aWV3XCJcblxudmlldy5sb2FkQ292ZXJNYWluVUkoKSIsIi8vIElNUE9SVFNcbmltcG9ydCBjYXJyaWVyU3ZnIGZyb20gXCIuL2Fzc2V0cy9ncmFwaGljcy9jYXJyaWVyLnN2Z1wiO1xuaW1wb3J0IHN1Ym1hcmluZVN2ZyBmcm9tIFwiLi9hc3NldHMvZ3JhcGhpY3Mvc3VibWFyaW5lLnN2Z1wiO1xuaW1wb3J0IGJhdHRsZXNoaXBTdmcgZnJvbSBcIi4vYXNzZXRzL2dyYXBoaWNzL2JhdHRsZXNoaXAuc3ZnXCI7XG5pbXBvcnQgZGVzdHJveWVyU3ZnIGZyb20gXCIuL2Fzc2V0cy9ncmFwaGljcy9kZXN0cm95ZXIuc3ZnXCI7XG5pbXBvcnQgcGF0cm9sU3ZnIGZyb20gXCIuL2Fzc2V0cy9ncmFwaGljcy9wYXRyb2wtYm9hdC5zdmdcIjtcblxuLy8gQSBtb2R1bGUgKG9ubHkgb25lIGluc3RhbmNlKSBmb3IgYSBWaWV3IHRoYXQgY29udHJvbCBET00gbWFuaXB1bGF0aW9uXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCwgaW1wb3J0L25vLW11dGFibGUtZXhwb3J0cywgcHJlZmVyLWNvbnN0LCBmdW5jLW5hbWVzXG5leHBvcnQgbGV0IHZpZXcgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBDcmVhdGUgYW4gZWxlbWVudCB3aXRoIGFuIG9wdGlvbmFsIENTUyBjbGFzcyBhbmQgb3B0aW9uYWwgQ1NTIGlkXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWcsIGNsYXNzTmFtZSwgaWQpIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZylcblxuICAgICAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImlkXCIsaWQpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudFxuXG4gICAgfVxuXG4gICAgLy8gUmV0cmlldmUgYW4gZWxlbWVudCBmcm9tIHRoZSBET01cbiAgICBmdW5jdGlvbiBnZXRFbGVtZW50KGlkKSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpXG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnRcblxuICAgIH1cblxuICAgIC8vIERlbGV0ZSB0aGUgY29udGVudCBpbnNpZGUgXCJtYWluXCIgPGRpdj5cbiAgICBmdW5jdGlvbiBkZWxldGVNYWluVUkoKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSBnZXRFbGVtZW50KFwibWFpblwiKVxuICAgICAgICBtYWluLmlubmVySFRNTCA9IFwiXCJcbiAgICB9XG5cbiAgICAvLyBGdW5jdGlvbnMgdG8gbWFrZSBTVkdzIGRyYWdnYWJsZVxuICAgIC8qIGZ1bmN0aW9uIGFsbG93RHJvcChldikge1xuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBkcmFnKGV2KSB7XG4gICAgICAgIGV2LmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dFwiLCBldi50YXJnZXQuaWQpO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBkcm9wKGV2KSB7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBldi5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHRcIik7XG4gICAgICAgIGV2LnRhcmdldC5hcHBlbmRDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhKSk7XG4gICAgfSAqL1xuXG4gICAgLy8gTG9hZHMgZ2FtZSBVSVxuICAgIGZ1bmN0aW9uIGxvYWRHYW1lVUkoKSB7XG4gICAgICAgIFxuICAgICAgICAvLyBTSURFU1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdXNlclNpZGUgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJwbGF5ZXJTaWRlXCIsbnVsbClcbiAgICAgICAgY29uc3QgY29tcHV0ZXJTaWRlID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwicGxheWVyU2lkZVwiLG51bGwpXG5cbiAgICAgICAgY29uc3QgbWFpbiA9IGdldEVsZW1lbnQoXCJtYWluXCIpXG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQodXNlclNpZGUpXG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQoY29tcHV0ZXJTaWRlKVxuXG4gICAgICAgIC8vIEhlYWRlcnNcblxuICAgICAgICBjb25zdCB1c2VySGVhZGVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiZ2FtZUhlYWRlclwiLFwidXNlckdhbWVIZWFkZXJcIilcbiAgICAgICAgY29uc3QgY29tcHV0ZXJIZWFkZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJnYW1lSGVhZGVyXCIsXCJjb21wdXRlckdhbWVIZWFkZXJcIilcblxuICAgICAgICBjb25zdCB1c2VyVGl0bGUgPSBjcmVhdGVFbGVtZW50KFwiaDJcIixcInBsYXllclRpdGxlXCIsbnVsbClcbiAgICAgICAgY29uc3QgY29tcHV0ZXJUaXRsZSA9IGNyZWF0ZUVsZW1lbnQoXCJoMlwiLFwicGxheWVyVGl0bGVcIixudWxsKVxuXG4gICAgICAgIHVzZXJUaXRsZS50ZXh0Q29udGVudCA9IFwiWU9VUiBGTEVFVFwiXG4gICAgICAgIGNvbXB1dGVyVGl0bGUudGV4dENvbnRlbnQgPSBcIkVORU1ZIEZMRUVUXCJcblxuICAgICAgICB1c2VySGVhZGVyLmFwcGVuZENoaWxkKHVzZXJUaXRsZSlcbiAgICAgICAgY29tcHV0ZXJIZWFkZXIuYXBwZW5kQ2hpbGQoY29tcHV0ZXJUaXRsZSlcblxuICAgICAgICB1c2VyU2lkZS5hcHBlbmRDaGlsZCh1c2VySGVhZGVyKVxuICAgICAgICBjb21wdXRlclNpZGUuYXBwZW5kQ2hpbGQoY29tcHV0ZXJIZWFkZXIpXG5cbiAgICAgICAgLy8gR2FtZWJvYXJkc1xuXG4gICAgICAgIGNvbnN0IHVzZXJHYW1lYm9hcmRDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJnYW1lYm9hcmRDb250YWluZXJcIixcInVzZXJHYW1lYm9hcmRDb250YWluZXJcIilcbiAgICAgICAgY29uc3QgY29tcHV0ZXJHYW1lYm9hcmRDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJnYW1lYm9hcmRDb250YWluZXJcIixcImNvbXB1dGVyR2FtZWJvYXJkQ29udGFpbmVyXCIpXG5cbiAgICAgICAgY29uc3QgdXNlclhIZWFkZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJ4SGVhZGVyXCIsbnVsbClcbiAgICAgICAgY29uc3QgY29tcHV0ZXJYSGVhZGVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwieEhlYWRlclwiLG51bGwpXG5cbiAgICAgICAgLy8gR2VuZXJhdGUgdGhlIHhIZWFkZXIgc3F1YXJlc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJYSGVhZGVyU3F1YXJlID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwieEhlYWRlclNxdWFyZVwiLG51bGwpXG4gICAgICAgICAgICBjb25zdCBjb21wdXRlclhIZWFkZXJTcXVhcmUgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJ4SGVhZGVyU3F1YXJlXCIsbnVsbClcbiAgICAgICAgICAgIHVzZXJYSGVhZGVyU3F1YXJlLnRleHRDb250ZW50ID0gU3RyaW5nLmZyb21DaGFyQ29kZSg2NSArIGkpXG4gICAgICAgICAgICBjb21wdXRlclhIZWFkZXJTcXVhcmUudGV4dENvbnRlbnQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDY1ICsgaSlcbiAgICAgICAgICAgIHVzZXJYSGVhZGVyLmFwcGVuZENoaWxkKHVzZXJYSGVhZGVyU3F1YXJlKVxuICAgICAgICAgICAgY29tcHV0ZXJYSGVhZGVyLmFwcGVuZENoaWxkKGNvbXB1dGVyWEhlYWRlclNxdWFyZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHVzZXJCb3R0b21Cb2FyZCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImJvdHRvbUJvYXJkXCIsbnVsbClcbiAgICAgICAgY29uc3QgY29tcHV0ZXJCb3R0b21Cb2FyZCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImJvdHRvbUJvYXJkXCIsbnVsbClcblxuICAgICAgICBjb25zdCB1c2VyWUhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInlIZWFkZXJcIixudWxsKVxuICAgICAgICBjb25zdCBjb21wdXRlcllIZWFkZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJ5SGVhZGVyXCIsbnVsbClcblxuICAgICAgICAvLyBHZW5lcmF0ZSB0aGUgeUhlYWRlciBzcXVhcmVzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgdXNlcllIZWFkZXJTcXVhcmUgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJ5SGVhZGVyU3F1YXJlXCIsbnVsbClcbiAgICAgICAgICAgIGNvbnN0IGNvbXB1dGVyWUhlYWRlclNxdWFyZSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInlIZWFkZXJTcXVhcmVcIixudWxsKVxuICAgICAgICAgICAgdXNlcllIZWFkZXJTcXVhcmUudGV4dENvbnRlbnQgPSBpICsgMVxuICAgICAgICAgICAgY29tcHV0ZXJZSGVhZGVyU3F1YXJlLnRleHRDb250ZW50ID0gaSArIDFcbiAgICAgICAgICAgIHVzZXJZSGVhZGVyLmFwcGVuZENoaWxkKHVzZXJZSGVhZGVyU3F1YXJlKVxuICAgICAgICAgICAgY29tcHV0ZXJZSGVhZGVyLmFwcGVuZENoaWxkKGNvbXB1dGVyWUhlYWRlclNxdWFyZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHVzZXJHYW1lYm9hcmQgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJnYW1lYm9hcmRHcmlkXCIsXCJ1c2VyR2FtZWJvYXJkR3JpZFwiKVxuICAgICAgICBjb25zdCBjb21wdXRlckdhbWVib2FyZCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImdhbWVib2FyZEdyaWRcIixcImNvbXB1dGVyR2FtZWJvYXJkR3JpZFwiKVxuXG4gICAgICAgIC8vIEdlbmVyYXRlIHRoZSBnYW1lYm9hcmQgc3F1YXJlc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCB1c2VyR2FtZWJvYXJkU3F1YXJlID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiZ2FtZWJvYXJkU3F1YXJlXCIsbnVsbClcbiAgICAgICAgICAgIGNvbnN0IGNvbXB1dGVyR2FtZWJvYXJkU3F1YXJlID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiZ2FtZWJvYXJkU3F1YXJlXCIsbnVsbClcbiAgICAgICAgICAgIHVzZXJHYW1lYm9hcmQuYXBwZW5kQ2hpbGQodXNlckdhbWVib2FyZFNxdWFyZSlcbiAgICAgICAgICAgIGNvbXB1dGVyR2FtZWJvYXJkLmFwcGVuZENoaWxkKGNvbXB1dGVyR2FtZWJvYXJkU3F1YXJlKVxuICAgICAgICB9XG5cbiAgICAgICAgdXNlckdhbWVib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZCh1c2VyWEhlYWRlcilcbiAgICAgICAgdXNlckdhbWVib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZCh1c2VyQm90dG9tQm9hcmQpXG4gICAgICAgIHVzZXJCb3R0b21Cb2FyZC5hcHBlbmRDaGlsZCh1c2VyWUhlYWRlcilcbiAgICAgICAgdXNlckJvdHRvbUJvYXJkLmFwcGVuZENoaWxkKHVzZXJHYW1lYm9hcmQpXG5cbiAgICAgICAgY29tcHV0ZXJHYW1lYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoY29tcHV0ZXJYSGVhZGVyKVxuICAgICAgICBjb21wdXRlckdhbWVib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChjb21wdXRlckJvdHRvbUJvYXJkKVxuICAgICAgICBjb21wdXRlckJvdHRvbUJvYXJkLmFwcGVuZENoaWxkKGNvbXB1dGVyWUhlYWRlcilcbiAgICAgICAgY29tcHV0ZXJCb3R0b21Cb2FyZC5hcHBlbmRDaGlsZChjb21wdXRlckdhbWVib2FyZClcblxuICAgICAgICB1c2VyU2lkZS5hcHBlbmRDaGlsZCh1c2VyR2FtZWJvYXJkQ29udGFpbmVyKVxuICAgICAgICBjb21wdXRlclNpZGUuYXBwZW5kQ2hpbGQoY29tcHV0ZXJHYW1lYm9hcmRDb250YWluZXIpXG5cbiAgICAgICAgLy8gRmxlZXQgU3RhdHVzIFBhbmVsc1xuICAgICAgICBjb25zdCB1c2VyU3RhdHVzUGFuZWxDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJzdGF0dXNQYW5lbENvbnRhaW5lclwiLFwidXNlclN0YXR1c1BhbmVsQ29udGFpbmVyXCIpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyU3RhdHVzUGFuZWxDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJzdGF0dXNQYW5lbENvbnRhaW5lclwiLFwiY29tcHV0ZXJTdGF0dXNQYW5lbENvbnRhaW5lclwiKVxuXG4gICAgICAgIGNvbnN0IHVzZXJTdGF0dXNIZWFkZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJzdGF0dXNIZWFkZXJcIixudWxsKVxuICAgICAgICBjb25zdCBjb21wdXRlclN0YXR1c0hlYWRlciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInN0YXR1c0hlYWRlclwiLG51bGwpXG5cbiAgICAgICAgY29uc3QgdXNlclN0YXR1c1RpdGxlID0gY3JlYXRlRWxlbWVudChcImgyXCIsXCJwYW5lbFRpdGxlXCIsbnVsbClcbiAgICAgICAgY29uc3QgY29tcHV0ZXJTdGF0dXNUaXRsZSA9IGNyZWF0ZUVsZW1lbnQoXCJoMlwiLFwicGFuZWxUaXRsZVwiLG51bGwpXG5cbiAgICAgICAgdXNlclN0YXR1c1RpdGxlLnRleHRDb250ZW50ID0gXCJTaGlweWFyZFwiXG4gICAgICAgIGNvbXB1dGVyU3RhdHVzVGl0bGUudGV4dENvbnRlbnQgPSBcIlNoaXB5YXJkXCJcblxuICAgICAgICB1c2VyU3RhdHVzSGVhZGVyLmFwcGVuZENoaWxkKHVzZXJTdGF0dXNUaXRsZSlcbiAgICAgICAgY29tcHV0ZXJTdGF0dXNIZWFkZXIuYXBwZW5kQ2hpbGQoY29tcHV0ZXJTdGF0dXNUaXRsZSlcblxuICAgICAgICB1c2VyU3RhdHVzUGFuZWxDb250YWluZXIuYXBwZW5kQ2hpbGQodXNlclN0YXR1c0hlYWRlcilcbiAgICAgICAgY29tcHV0ZXJTdGF0dXNQYW5lbENvbnRhaW5lci5hcHBlbmRDaGlsZChjb21wdXRlclN0YXR1c0hlYWRlcilcblxuICAgICAgICBjb25zdCB1c2VyU3RhdHVzUGFuZWwgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJzdGF0dXNQYW5lbFwiLFwidXNlclN0YXR1c1BhbmVsXCIpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyU3RhdHVzUGFuZWwgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJzdGF0dXNQYW5lbFwiLFwiY29tcHV0ZXJTdGF0dXNQYW5lbFwiKVxuXG4gICAgICAgIHVzZXJTdGF0dXNQYW5lbENvbnRhaW5lci5hcHBlbmRDaGlsZCh1c2VyU3RhdHVzUGFuZWwpXG4gICAgICAgIGNvbXB1dGVyU3RhdHVzUGFuZWxDb250YWluZXIuYXBwZW5kQ2hpbGQoY29tcHV0ZXJTdGF0dXNQYW5lbClcblxuICAgICAgICB1c2VyU2lkZS5hcHBlbmRDaGlsZCh1c2VyU3RhdHVzUGFuZWxDb250YWluZXIpXG4gICAgICAgIGNvbXB1dGVyU2lkZS5hcHBlbmRDaGlsZChjb21wdXRlclN0YXR1c1BhbmVsQ29udGFpbmVyKVxuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgdXNlciBzaGlweWFyZFxuICAgICAgICBjb25zdCB1c2VyQ2FycmllciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImNhcnJpZXJcIixcInVzZXJDYXJyaWVyXCIpXG4gICAgICAgIHVzZXJDYXJyaWVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMTg4IDM2XCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiIHhtbG5zOnNlcmlmPVwiaHR0cDovL3d3dy5zZXJpZi5jb20vXCIgc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjtcIj5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMS4xMzcyOCwwLDAsMC43NTExNjcsLTE0LjI0NTUsLTAuNzU5Mzc2KVwiPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTE3NS4xNzcsMTUuMDE3QzE3NS4xNzcsOS41MDMgMTcwLjcsNS4wMjYgMTY1LjE4Niw1LjAyNkwyNS4xNCw1LjAyNkMxOS42MjYsNS4wMjYgMTUuMTQ5LDkuNTAzIDE1LjE0OSwxNS4wMTdMMTUuMTQ5LDM0Ljk5OEMxNS4xNDksNDAuNTEyIDE5LjYyNiw0NC45ODkgMjUuMTQsNDQuOTg5TDE2NS4xODYsNDQuOTg5QzE3MC43LDQ0Ljk4OSAxNzUuMTc3LDQwLjUxMiAxNzUuMTc3LDM0Ljk5OEwxNzUuMTc3LDE1LjAxN1pcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC0xMS4xOTI3LDIuOTgzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTQ5LjE3MjYsMi45ODMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtODcuMTQ5OCwyLjk4MylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLDI2LjgxNDUsMi45ODMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSw2NC43OTQ5LDIuOTgzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L3N2Zz5gXG4gICAgICAgIHVzZXJDYXJyaWVyLnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLFwidHJ1ZVwiKVxuICAgICAgICBjb25zdCB1c2VyQmF0dGxlc2hpcCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImJhdHRsZXNoaXBcIixcInVzZXJCYXR0bGVzaGlwXCIpXG4gICAgICAgIHVzZXJCYXR0bGVzaGlwLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMTUwIDM2XCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiIHhtbG5zOnNlcmlmPVwiaHR0cDovL3d3dy5zZXJpZi5jb20vXCIgc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjtcIj5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtMjAuMTYyOCwtNy4wMDc0MSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEuMjg4NjMsMCwwLDAuNzUwMyw5LjMzNTUsMi40ODM5MylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNOTYuOTUsNDMuMDQyQzkxLjc0Myw0NS42MzUgODUuMjU3LDQ3Ljk2OCA3OC4wNjYsNDkuOTgyTDIyLjY3MSw0OS45ODJDMTUuODg4LDQ0LjkxMSAxMC43NDQsMzcuNzM5IDEwLjczLDMwLjAyNkMxMC43MTcsMjIuMzA4IDE1Ljg0MSwxNS4xMTUgMjIuNjEyLDEwLjAxOUw3OC4wMzQsMTAuMDE5Qzg0Ljg0MywxMS45NDYgOTEuMDIxLDE0LjE1OSA5Ni4wODUsMTYuNTc3TDk1LjkzNiwxNi41NTZDOTAuNzYzLDE2LjU1NiA4Ni41NjMsMjIuNTIyIDg2LjU2MywyOS44NzJDODYuNTYzLDM3LjIyMSA5MC43NjMsNDMuMTg4IDk1LjkzNiw0My4xODhMOTYuOTUsNDMuMDQyWlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoNy4zMzUwMiwwLDAsMS40NjEyMSwtNjM5LjI0NCwtMTkuMjU5OClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTA0LjE4OCwyMy42MTFDMTAzLjY3NiwyMi4yMzYgMTAyLjk5OCwyMS4wMzIgMTAyLjE5MywyMC4wMjVDMTA0LjI2MiwyMS4zMzggMTA1Ljk2OSwyMi43MDggMTA3LjI0OCwyNC4xNUMxMDYuODAzLDI1LjI1NCAxMDYuNDk5LDI3LjU2IDEwNi40OTksMzAuMjE5QzEwNi40OTksMzIuNzA1IDEwNi43NjUsMzQuODgzIDEwNy4xNjQsMzYuMDU4QzEwNS43NDksMzcuNjI5IDEwMy44MjgsMzkuMTE5IDEwMS40ODgsNDAuNTQ1QzEwMi41MDEsMzkuNTAzIDEwMy4zNTYsMzguMTc2IDEwMy45OTYsMzYuNjEyQzEwNC4xNTEsMzYuOTA3IDEwNC4zMjEsMzcuMDU3IDEwNC40OTgsMzcuMDU3QzEwNS4yOTgsMzcuMDU3IDEwNS45NDgsMzQuMDA4IDEwNS45NDgsMzAuMjUyQzEwNS45NDgsMjYuNDk3IDEwNS4yOTgsMjMuNDQ4IDEwNC40OTgsMjMuNDQ4QzEwNC4zOTIsMjMuNDQ4IDEwNC4yODgsMjMuNTAxIDEwNC4xODgsMjMuNjExWlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoNy4zMzUwMiwwLDAsMS40NjEyMSwtNjM5LjI0NCwtMTkuMjU5OClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTA5LjAxLDI2LjU3OUMxMDkuNjI0LDI3LjcxOCAxMDkuOTQ2LDI4Ljg4OSAxMDkuOTQ0LDMwLjA3MkMxMDkuOTQyLDMxLjIxMiAxMDkuNjM5LDMyLjM0MSAxMDkuMDY0LDMzLjQ0OEMxMDkuMTcsMzIuNDkzIDEwOS4yMjksMzEuMzkgMTA5LjIyOSwzMC4yMTlDMTA5LjIyOSwyOC44NzIgMTA5LjE1MSwyNy42MTUgMTA5LjAxLDI2LjU3OVpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTYwLjE3MzYsMi45ODMyKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwxMS4xMDk4LC0wLjExMDkyMilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLDYwLjE3MzYsLTIuOTgzMilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTA0LjgxOCw4LjIzNEMxMTAuMDgxLDEwLjkyMyAxMTMuMDM2LDE0LjA1NiAxMTMuMDM2LDE3LjM4MkMxMTMuMDM2LDIxIDEwOS41NCwyNC4zODggMTAzLjQwMywyNy4yM0M5OS4zNCwyNS44NTggOTYuNDUsMjIuMjExIDk2LjQ1LDE3LjkzN0M5Ni40NSwxMy4xNzkgMTAwLjAzNSw5LjE5NiAxMDQuODE4LDguMjM0WlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSw2MC4xNzM2LC0yLjk4MzIpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEwNC44MTgsOC4yMzRDMTA1LjU0OCw4LjA3MyAxMDYuMzA4LDcuOTk1IDEwNy4wODgsNy45OTVDMTEyLjk2LDcuOTk1IDExNy43MjcsMTIuNDUgMTE3LjcyNywxNy45MzdDMTE3LjcyNywyMy40MjUgMTEyLjk2LDI3Ljg4IDEwNy4wODgsMjcuODhDMTA1Ljc4OSwyNy44OCAxMDQuNTQzLDI3LjY2MiAxMDMuNDAzLDI3LjIzQzEwOS41NCwyNC4zODggMTEzLjAzNiwyMSAxMTMuMDM2LDE3LjM4MkMxMTMuMDM2LDE0LjA1NiAxMTAuMDgxLDEwLjkyMyAxMDQuODE4LDguMjM0WlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSw4Ni43Nzg4LC0wLjExMDkyMilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTAwLjY1Nyw2LjE0OUMxMDYuMDExLDcuMzA0IDExMC4zNDksOC40ODcgMTEzLjU4LDkuNjk4QzExNC42MTMsMTEuMjEyIDExNS4xODUsMTMuMDQ4IDExNS4xODUsMTUuMDE3QzExNS4xODUsMTYuNzI4IDExNC43NTMsMTguMzQgMTEzLjk3MiwxOS43MzVDMTEwLjU4MSwyMS4wNDIgMTA1LjkwMSwyMi4zMzEgMTAwLjAzNywyMy41NDlDOTcuMTEsMjEuODMyIDk1LjE2MywxOC42NSA5NS4xNjMsMTUuMDE3Qzk1LjE2MywxMS4xMzIgOTcuMzg5LDcuNzYyIDEwMC42NTcsNi4xNDlaXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLDQ4Ljc5ODcsLTAuMDAwMilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC04Ny4xMTgyLDIuODcyMjgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvc3ZnPmBcbiAgICAgICAgdXNlckJhdHRsZXNoaXAuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsXCJ0cnVlXCIpXG4gICAgICAgIGNvbnN0IHVzZXJEZXN0cm95ZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJkZXN0cm95ZXJcIixcInVzZXJEZXN0cm95ZXJcIilcbiAgICAgICAgdXNlckRlc3Ryb3llci5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDExMiAzNlwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIiB4bWxuczpzZXJpZj1cImh0dHA6Ly93d3cuc2VyaWYuY29tL1wiIHN0eWxlPVwiZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjI7XCI+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTM5LjE2MjgsLTcuMDA3NDEpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLjA2ODA2LDAsMCwwLjc1MDMsMzAuNzE5NSwyLjQ4MzkzKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk05Ni45NSw0My4wNDJDOTEuNzQzLDQ1LjYzNSA4NS4yNTcsNDcuOTY4IDc4LjA2Niw0OS45ODJMMjIuNjcxLDQ5Ljk4MkMxNS44ODgsNDQuOTExIDEwLjc0NCwzNy43MzkgMTAuNzMsMzAuMDI2QzEwLjcxNywyMi4zMDggMTUuODQxLDE1LjExNSAyMi42MTIsMTAuMDE5TDc4LjAzNCwxMC4wMTlDODQuODQzLDExLjk0NiA5MS4wMjEsMTQuMTU5IDk2LjA4NSwxNi41NzdMOTUuOTM2LDE2LjU1NkM5MC43NjMsMTYuNTU2IDg2LjU2MywyMi41MjIgODYuNTYzLDI5Ljg3MkM4Ni41NjMsMzcuMjIxIDkwLjc2Myw0My4xODggOTUuOTM2LDQzLjE4OEw5Ni45NSw0My4wNDJaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLjA2ODA2LDAsMCwwLjc1MDMsMzAuNzE5NSwyLjQ4MzkzKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMDIuMTkzLDIwLjAyNUMxMDcuMDc5LDIzLjEyNiAxMDkuOTUsMjYuNTQ2IDEwOS45NDQsMzAuMDcyQzEwOS45MzcsMzMuNzU4IDEwNi43ODUsMzcuMzE4IDEwMS40ODgsNDAuNTQ1QzEwMy44MTIsMzguMTUzIDEwNS4zMDksMzQuMjU5IDEwNS4zMDksMjkuODcyQzEwNS4zMDksMjUuOTUzIDEwNC4xMTUsMjIuNDI4IDEwMi4xOTMsMjAuMDI1WlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtMTEuMTUxNywyLjg3MjI4KVwiPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEwNS4zMzQsNS4wNDJDMTA3Ljc3Myw1Ljg1OSAxMDkuOTcsNi43MDcgMTExLjg1Nyw3LjYyOUMxMTMuOTEsOS40MzIgMTE1LjE4NSwxMi4wNzcgMTE1LjE4NSwxNS4wMTdDMTE1LjE4NSwxOC4zMDggMTEzLjU4NywyMS4yMyAxMTEuMTA0LDIzLjAyNUwxMTAuMzkxLDIzLjM2NUwxMDYuMjU3LDI0Ljg5OUwxMDUuMTc0LDI1LjAwOEM5OS42NDksMjUuMDA4IDk1LjE2MywyMC41MzEgOTUuMTYzLDE1LjAxN0M5NS4xNjMsOS41MDMgOTkuNjQ5LDUuMDI2IDEwNS4xNzQsNS4wMjZMMTA1LjMzNCw1LjA0MlpcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC00OS4xNzQsMi44NzIyOClcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC04Ny4xODgxLDIuODcyMjgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvc3ZnPmBcbiAgICAgICAgdXNlckRlc3Ryb3llci5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIixcInRydWVcIilcbiAgICAgICAgY29uc3QgdXNlclN1Ym1hcmluZSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInN1Ym1hcmluZVwiLFwidXNlclN1Ym1hcmluZVwiKVxuICAgICAgICB1c2VyU3VibWFyaW5lLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMTEyIDM2XCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiIHhtbG5zOnNlcmlmPVwiaHR0cDovL3d3dy5zZXJpZi5jb20vXCIgc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjtcIj5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMS4wNjgzNiwwLDAsMC43NTIwMDEsLTQwLjQxMDMsLTQuNTQxNTMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTI4LjExNiwxMC4wMTlDMTM0LjgxNCwxNS4xMDggMTM5Ljg2NSwyMi4yNTMgMTM5Ljg1MSwyOS45MTVDMTM5LjgzNywzNy42ODUgMTM0LjYxOSw0NC45MDQgMTI3Ljc2Miw0OS45ODJMNTIuNjkxLDQ5Ljk4MkM0NS44MzQsNDQuOTA0IDQwLjYxNiwzNy42ODUgNDAuNjAyLDI5LjkxNUM0MC41ODgsMjIuMjUzIDQ1LjYzOSwxNS4xMDggNTIuMzM3LDEwLjAxOUwxMjguMTE2LDEwLjAxOVpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC0xMS4xOSwzLjAwMTU3KVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTQ5LjE4OTYsMy4wMDE1NylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC04Ny4xNjcyLDMuMDAxNTcpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvc3ZnPmBcbiAgICAgICAgdXNlclN1Ym1hcmluZS5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIixcInRydWVcIilcbiAgICAgICAgY29uc3QgdXNlckJvYXQgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJib2F0XCIsXCJ1c2VyQm9hdFwiKVxuICAgICAgICB1c2VyQm9hdC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDc0IDM2XCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiIHhtbG5zOnNlcmlmPVwiaHR0cDovL3d3dy5zZXJpZi5jb20vXCIgc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjtcIj5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMC45NzY5NzMsMCwwLDAuNzUyMDQ4LC03LjA2NjQxLC00LjU2NzUzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTQ4LjAzNCwxMC4wMTlDNjYuMjUzLDE1LjE3OCA3OS45NTcsMjIuMzc0IDc5Ljk0NCwzMC4wNzJDNzkuOTMsMzcuNzU0IDY2LjI1Myw0NC44ODkgNDguMDY2LDQ5Ljk4MkwyMy45MDgsNDkuOTgyQzE2LjIwMSw0NC45MTEgMTAuMzU2LDM3LjczNiAxMC4zNDIsMzAuMDE4QzEwLjMyOCwyMi4zMDUgMTYuMTM5LDE1LjExNSAyMy44MTcsMTAuMDE5TDQ4LjAzNCwxMC4wMTlaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtNDkuMTc1MiwyLjk4MylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC04Ny4xNjYxLDIuOTgzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L3N2Zz5gXG4gICAgICAgIHVzZXJCb2F0LnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLFwidHJ1ZVwiKVxuICAgICAgICB1c2VyU3RhdHVzUGFuZWwuYXBwZW5kQ2hpbGQodXNlckNhcnJpZXIpXG4gICAgICAgIHVzZXJTdGF0dXNQYW5lbC5hcHBlbmRDaGlsZCh1c2VyQmF0dGxlc2hpcClcbiAgICAgICAgdXNlclN0YXR1c1BhbmVsLmFwcGVuZENoaWxkKHVzZXJEZXN0cm95ZXIpXG4gICAgICAgIHVzZXJTdGF0dXNQYW5lbC5hcHBlbmRDaGlsZCh1c2VyU3VibWFyaW5lKVxuICAgICAgICB1c2VyU3RhdHVzUGFuZWwuYXBwZW5kQ2hpbGQodXNlckJvYXQpXG5cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBlbmVteSBzaGlweWFyZFxuICAgICAgICBjb25zdCBjb21wdXRlckNhcnJpZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJjYXJyaWVyXCIsXCJjb21wdXRlckNhcnJpZXJcIilcbiAgICAgICAgY29tcHV0ZXJDYXJyaWVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMTg4IDM2XCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiIHhtbG5zOnNlcmlmPVwiaHR0cDovL3d3dy5zZXJpZi5jb20vXCIgc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjtcIj5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMS4xMzcyOCwwLDAsMC43NTExNjcsLTE0LjI0NTUsLTAuNzU5Mzc2KVwiPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTE3NS4xNzcsMTUuMDE3QzE3NS4xNzcsOS41MDMgMTcwLjcsNS4wMjYgMTY1LjE4Niw1LjAyNkwyNS4xNCw1LjAyNkMxOS42MjYsNS4wMjYgMTUuMTQ5LDkuNTAzIDE1LjE0OSwxNS4wMTdMMTUuMTQ5LDM0Ljk5OEMxNS4xNDksNDAuNTEyIDE5LjYyNiw0NC45ODkgMjUuMTQsNDQuOTg5TDE2NS4xODYsNDQuOTg5QzE3MC43LDQ0Ljk4OSAxNzUuMTc3LDQwLjUxMiAxNzUuMTc3LDM0Ljk5OEwxNzUuMTc3LDE1LjAxN1pcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC0xMS4xOTI3LDIuOTgzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTQ5LjE3MjYsMi45ODMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtODcuMTQ5OCwyLjk4MylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLDI2LjgxNDUsMi45ODMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSw2NC43OTQ5LDIuOTgzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L3N2Zz5gXG4gICAgICAgIGNvbXB1dGVyQ2Fycmllci5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIixcInRydWVcIilcbiAgICAgICAgY29uc3QgY29tcHV0ZXJCYXR0bGVzaGlwID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiYmF0dGxlc2hpcFwiLFwiY29tcHV0ZXJCYXR0bGVzaGlwXCIpXG4gICAgICAgIGNvbXB1dGVyQmF0dGxlc2hpcC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDE1MCAzNlwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIiB4bWxuczpzZXJpZj1cImh0dHA6Ly93d3cuc2VyaWYuY29tL1wiIHN0eWxlPVwiZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjI7XCI+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTIwLjE2MjgsLTcuMDA3NDEpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLjI4ODYzLDAsMCwwLjc1MDMsOS4zMzU1LDIuNDgzOTMpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTk2Ljk1LDQzLjA0MkM5MS43NDMsNDUuNjM1IDg1LjI1Nyw0Ny45NjggNzguMDY2LDQ5Ljk4MkwyMi42NzEsNDkuOTgyQzE1Ljg4OCw0NC45MTEgMTAuNzQ0LDM3LjczOSAxMC43MywzMC4wMjZDMTAuNzE3LDIyLjMwOCAxNS44NDEsMTUuMTE1IDIyLjYxMiwxMC4wMTlMNzguMDM0LDEwLjAxOUM4NC44NDMsMTEuOTQ2IDkxLjAyMSwxNC4xNTkgOTYuMDg1LDE2LjU3N0w5NS45MzYsMTYuNTU2QzkwLjc2MywxNi41NTYgODYuNTYzLDIyLjUyMiA4Ni41NjMsMjkuODcyQzg2LjU2MywzNy4yMjEgOTAuNzYzLDQzLjE4OCA5NS45MzYsNDMuMTg4TDk2Ljk1LDQzLjA0MlpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDcuMzM1MDIsMCwwLDEuNDYxMjEsLTYzOS4yNDQsLTE5LjI1OTgpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEwNC4xODgsMjMuNjExQzEwMy42NzYsMjIuMjM2IDEwMi45OTgsMjEuMDMyIDEwMi4xOTMsMjAuMDI1QzEwNC4yNjIsMjEuMzM4IDEwNS45NjksMjIuNzA4IDEwNy4yNDgsMjQuMTVDMTA2LjgwMywyNS4yNTQgMTA2LjQ5OSwyNy41NiAxMDYuNDk5LDMwLjIxOUMxMDYuNDk5LDMyLjcwNSAxMDYuNzY1LDM0Ljg4MyAxMDcuMTY0LDM2LjA1OEMxMDUuNzQ5LDM3LjYyOSAxMDMuODI4LDM5LjExOSAxMDEuNDg4LDQwLjU0NUMxMDIuNTAxLDM5LjUwMyAxMDMuMzU2LDM4LjE3NiAxMDMuOTk2LDM2LjYxMkMxMDQuMTUxLDM2LjkwNyAxMDQuMzIxLDM3LjA1NyAxMDQuNDk4LDM3LjA1N0MxMDUuMjk4LDM3LjA1NyAxMDUuOTQ4LDM0LjAwOCAxMDUuOTQ4LDMwLjI1MkMxMDUuOTQ4LDI2LjQ5NyAxMDUuMjk4LDIzLjQ0OCAxMDQuNDk4LDIzLjQ0OEMxMDQuMzkyLDIzLjQ0OCAxMDQuMjg4LDIzLjUwMSAxMDQuMTg4LDIzLjYxMVpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDcuMzM1MDIsMCwwLDEuNDYxMjEsLTYzOS4yNDQsLTE5LjI1OTgpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEwOS4wMSwyNi41NzlDMTA5LjYyNCwyNy43MTggMTA5Ljk0NiwyOC44ODkgMTA5Ljk0NCwzMC4wNzJDMTA5Ljk0MiwzMS4yMTIgMTA5LjYzOSwzMi4zNDEgMTA5LjA2NCwzMy40NDhDMTA5LjE3LDMyLjQ5MyAxMDkuMjI5LDMxLjM5IDEwOS4yMjksMzAuMjE5QzEwOS4yMjksMjguODcyIDEwOS4xNTEsMjcuNjE1IDEwOS4wMSwyNi41NzlaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC02MC4xNzM2LDIuOTgzMilcIj5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsMTEuMTA5OCwtMC4xMTA5MjIpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSw2MC4xNzM2LC0yLjk4MzIpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEwNC44MTgsOC4yMzRDMTEwLjA4MSwxMC45MjMgMTEzLjAzNiwxNC4wNTYgMTEzLjAzNiwxNy4zODJDMTEzLjAzNiwyMSAxMDkuNTQsMjQuMzg4IDEwMy40MDMsMjcuMjNDOTkuMzQsMjUuODU4IDk2LjQ1LDIyLjIxMSA5Ni40NSwxNy45MzdDOTYuNDUsMTMuMTc5IDEwMC4wMzUsOS4xOTYgMTA0LjgxOCw4LjIzNFpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsNjAuMTczNiwtMi45ODMyKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMDQuODE4LDguMjM0QzEwNS41NDgsOC4wNzMgMTA2LjMwOCw3Ljk5NSAxMDcuMDg4LDcuOTk1QzExMi45Niw3Ljk5NSAxMTcuNzI3LDEyLjQ1IDExNy43MjcsMTcuOTM3QzExNy43MjcsMjMuNDI1IDExMi45NiwyNy44OCAxMDcuMDg4LDI3Ljg4QzEwNS43ODksMjcuODggMTA0LjU0MywyNy42NjIgMTAzLjQwMywyNy4yM0MxMDkuNTQsMjQuMzg4IDExMy4wMzYsMjEgMTEzLjAzNiwxNy4zODJDMTEzLjAzNiwxNC4wNTYgMTEwLjA4MSwxMC45MjMgMTA0LjgxOCw4LjIzNFpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsODYuNzc4OCwtMC4xMTA5MjIpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEwMC42NTcsNi4xNDlDMTA2LjAxMSw3LjMwNCAxMTAuMzQ5LDguNDg3IDExMy41OCw5LjY5OEMxMTQuNjEzLDExLjIxMiAxMTUuMTg1LDEzLjA0OCAxMTUuMTg1LDE1LjAxN0MxMTUuMTg1LDE2LjcyOCAxMTQuNzUzLDE4LjM0IDExMy45NzIsMTkuNzM1QzExMC41ODEsMjEuMDQyIDEwNS45MDEsMjIuMzMxIDEwMC4wMzcsMjMuNTQ5Qzk3LjExLDIxLjgzMiA5NS4xNjMsMTguNjUgOTUuMTYzLDE1LjAxN0M5NS4xNjMsMTEuMTMyIDk3LjM4OSw3Ljc2MiAxMDAuNjU3LDYuMTQ5WlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSw0OC43OTg3LC0wLjAwMDIpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtODcuMTE4MiwyLjg3MjI4KVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L3N2Zz5gXG4gICAgICAgIGNvbXB1dGVyQmF0dGxlc2hpcC5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgXCJ0cnVlXCIpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyRGVzdHJveWVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiZGVzdHJveWVyXCIsXCJjb21wdXRlckRlc3Ryb3llclwiKVxuICAgICAgICBjb21wdXRlckRlc3Ryb3llci5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDExMiAzNlwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIiB4bWxuczpzZXJpZj1cImh0dHA6Ly93d3cuc2VyaWYuY29tL1wiIHN0eWxlPVwiZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjI7XCI+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTM5LjE2MjgsLTcuMDA3NDEpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLjA2ODA2LDAsMCwwLjc1MDMsMzAuNzE5NSwyLjQ4MzkzKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk05Ni45NSw0My4wNDJDOTEuNzQzLDQ1LjYzNSA4NS4yNTcsNDcuOTY4IDc4LjA2Niw0OS45ODJMMjIuNjcxLDQ5Ljk4MkMxNS44ODgsNDQuOTExIDEwLjc0NCwzNy43MzkgMTAuNzMsMzAuMDI2QzEwLjcxNywyMi4zMDggMTUuODQxLDE1LjExNSAyMi42MTIsMTAuMDE5TDc4LjAzNCwxMC4wMTlDODQuODQzLDExLjk0NiA5MS4wMjEsMTQuMTU5IDk2LjA4NSwxNi41NzdMOTUuOTM2LDE2LjU1NkM5MC43NjMsMTYuNTU2IDg2LjU2MywyMi41MjIgODYuNTYzLDI5Ljg3MkM4Ni41NjMsMzcuMjIxIDkwLjc2Myw0My4xODggOTUuOTM2LDQzLjE4OEw5Ni45NSw0My4wNDJaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLjA2ODA2LDAsMCwwLjc1MDMsMzAuNzE5NSwyLjQ4MzkzKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMDIuMTkzLDIwLjAyNUMxMDcuMDc5LDIzLjEyNiAxMDkuOTUsMjYuNTQ2IDEwOS45NDQsMzAuMDcyQzEwOS45MzcsMzMuNzU4IDEwNi43ODUsMzcuMzE4IDEwMS40ODgsNDAuNTQ1QzEwMy44MTIsMzguMTUzIDEwNS4zMDksMzQuMjU5IDEwNS4zMDksMjkuODcyQzEwNS4zMDksMjUuOTUzIDEwNC4xMTUsMjIuNDI4IDEwMi4xOTMsMjAuMDI1WlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtMTEuMTUxNywyLjg3MjI4KVwiPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEwNS4zMzQsNS4wNDJDMTA3Ljc3Myw1Ljg1OSAxMDkuOTcsNi43MDcgMTExLjg1Nyw3LjYyOUMxMTMuOTEsOS40MzIgMTE1LjE4NSwxMi4wNzcgMTE1LjE4NSwxNS4wMTdDMTE1LjE4NSwxOC4zMDggMTEzLjU4NywyMS4yMyAxMTEuMTA0LDIzLjAyNUwxMTAuMzkxLDIzLjM2NUwxMDYuMjU3LDI0Ljg5OUwxMDUuMTc0LDI1LjAwOEM5OS42NDksMjUuMDA4IDk1LjE2MywyMC41MzEgOTUuMTYzLDE1LjAxN0M5NS4xNjMsOS41MDMgOTkuNjQ5LDUuMDI2IDEwNS4xNzQsNS4wMjZMMTA1LjMzNCw1LjA0MlpcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC00OS4xNzQsMi44NzIyOClcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC04Ny4xODgxLDIuODcyMjgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvc3ZnPmBcbiAgICAgICAgY29tcHV0ZXJEZXN0cm95ZXIuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsXCJ0cnVlXCIpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyU3VibWFyaW5lID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwic3VibWFyaW5lXCIsXCJjb21wdXRlclN1Ym1hcmluZVwiKVxuICAgICAgICBjb25zdCBjb21wdXRlckJvYXQgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJib2F0XCIsXCJjb21wdXRlckJvYXRcIilcblxuICAgICAgICBjb21wdXRlclN0YXR1c1BhbmVsLmFwcGVuZENoaWxkKGNvbXB1dGVyQ2FycmllcilcbiAgICAgICAgY29tcHV0ZXJTdGF0dXNQYW5lbC5hcHBlbmRDaGlsZChjb21wdXRlckJhdHRsZXNoaXApXG4gICAgICAgIGNvbXB1dGVyU3RhdHVzUGFuZWwuYXBwZW5kQ2hpbGQoY29tcHV0ZXJEZXN0cm95ZXIpXG4gICAgICAgIGNvbXB1dGVyU3RhdHVzUGFuZWwuYXBwZW5kQ2hpbGQoY29tcHV0ZXJTdWJtYXJpbmUpXG4gICAgICAgIGNvbXB1dGVyU3RhdHVzUGFuZWwuYXBwZW5kQ2hpbGQoY29tcHV0ZXJCb2F0KVxuXG4gICAgfVxuXG4gICAgLy8gTG9hZHMgaW5pdGlhbCBVSSBzY3JlZW5cbiAgICBmdW5jdGlvbiBsb2FkQ292ZXJNYWluVUkoKSB7XG4gICAgXG4gICAgICAgIC8vIENyZWF0ZSBhIHNjcmVlbiA8ZGl2PjwvZGl2PiB0aGF0IGNvdmVycyBhbGwgdGhlIHNwYWNlIGF2YWlsYWJsZSBvbiBicm93c2VyIG5hdlxuICAgICAgICBjb25zdCBzY3JlZW4gPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsbnVsbCxcInNjcmVlblwiKVxuXG4gICAgICAgIC8vIEFwcGVuZCBpdCB0byBib2R5IGVsZW1lbnRcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JlZW4pXG5cbiAgICAgICAgLy8gQ3JlYXRlIGhlYWRlciwgbWFpbiBhbmQgZm9vdGVyIGRpdnMgaW5zaWRlIHNjcmVlbiBkaXZcbiAgICAgICAgY29uc3QgaGVhZGVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLG51bGwsXCJoZWFkZXJcIilcbiAgICAgICAgY29uc3QgbWFpbiA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixudWxsLFwibWFpblwiKVxuICAgICAgICBjb25zdCBmb290ZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsbnVsbCxcImZvb3RlclwiKVxuICAgICAgICBcbiAgICAgICAgc2NyZWVuLmFwcGVuZENoaWxkKGhlYWRlcilcbiAgICAgICAgc2NyZWVuLmFwcGVuZENoaWxkKG1haW4pXG4gICAgICAgIHNjcmVlbi5hcHBlbmRDaGlsZChmb290ZXIpXG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgdGl0bGUgZm9yIHRoZSBnYW1lIGFuZCBhcHBlbmQgaXQgdG8gdGhlIGhlYWRlclxuICAgICAgICBjb25zdCB0aXRsZSA9IGNyZWF0ZUVsZW1lbnQoXCJoMVwiLFwidGl0bGVcIixudWxsKVxuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IFwiQkFUVExFU0hJUFwiXG4gICAgICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSlcblxuICAgICAgICAvLyBDcmVhdGUgdGhlIGNyZWRpdHMgYW5kIGFwcGVuZCB0aGVtIHRvIHRoZSBmb290ZXJcbiAgICAgICAgY29uc3QgY3JlZGl0cyA9IGNyZWF0ZUVsZW1lbnQoXCJwXCIsXCJjcmVkaXRzXCIsbnVsbClcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHF1b3Rlc1xuICAgICAgICBjcmVkaXRzLmlubmVySFRNTCA9ICdDcmVhdGVkIGJ5IFZFUkVHT1JOLiBGb2xsb3cgbXkgd29yayBvbiBHaXRIdWI6IDxicj48YnI+PGEgY2xhc3M9XCJnaXRodWItbGlua1wiIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vdmVyZWdvcm5cIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+PHN2ZyBjbGFzcz1cImdpdGh1Yi1pY29uXCIgd2lkdGg9XCIzMlwiIGhlaWdodD1cIjMyXCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNOCAwQzMuNTggMCAwIDMuNTggMCA4YzAgMy41NCAyLjI5IDYuNTMgNS40NyA3LjU5LjQuMDcuNTUtLjE3LjU1LS4zOCAwLS4xOS0uMDEtLjgyLS4wMS0xLjQ5LTIuMDEuMzctMi41My0uNDktMi42OS0uOTQtLjA5LS4yMy0uNDgtLjk0LS44Mi0xLjEzLS4yOC0uMTUtLjY4LS41Mi0uMDEtLjUzLjYzLS4wMSAxLjA4LjU4IDEuMjMuODIuNzIgMS4yMSAxLjg3Ljg3IDIuMzMuNjYuMDctLjUyLjI4LS44Ny41MS0xLjA3LTEuNzgtLjItMy42NC0uODktMy42NC0zLjk1IDAtLjg3LjMxLTEuNTkuODItMi4xNS0uMDgtLjItLjM2LTEuMDIuMDgtMi4xMiAwIDAgLjY3LS4yMSAyLjIuODIuNjQtLjE4IDEuMzItLjI3IDItLjI3LjY4IDAgMS4zNi4wOSAyIC4yNyAxLjUzLTEuMDQgMi4yLS44MiAyLjItLjgyLjQ0IDEuMS4xNiAxLjkyLjA4IDIuMTIuNTEuNTYuODIgMS4yNy44MiAyLjE1IDAgMy4wNy0xLjg3IDMuNzUtMy42NSAzLjk1LjI5LjI1LjU0LjczLjU0IDEuNDggMCAxLjA3LS4wMSAxLjkzLS4wMSAyLjIgMCAuMjEuMTUuNDYuNTUuMzhBOC4wMTMgOC4wMTMgMCAwIDAgMTYgOGMwLTQuNDItMy41OC04LTgtOHpcIi8+PC9zdmc+PC9hPidcbiAgICAgICAgZm9vdGVyLmFwcGVuZENoaWxkKGNyZWRpdHMpXG5cbiAgICAgICAgLy8gTWFpbiBjb250ZW50XG4gICAgICAgIGNvbnN0IGdsb3dpbmdCdXR0b24gPSBjcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsXCJnbG93aW5nLWJ1dHRvblwiLG51bGwpXG4gICAgICAgIGdsb3dpbmdCdXR0b24udGV4dENvbnRlbnQgPSBcIlNUQVJUXCJcbiAgICAgICAgZ2xvd2luZ0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZGVsZXRlTWFpblVJKClcbiAgICAgICAgICAgIGxvYWRHYW1lVUkoKVxuICAgICAgICB9KVxuICAgICAgICBtYWluLmFwcGVuZENoaWxkKGdsb3dpbmdCdXR0b24pXG5cbiAgICAgICAgLy8gU1ZHIFNoaXAgc2hhcGVzXG4gICAgICAgIGNvbnN0IGNhcnJpZXJTaGFwZSA9IGNyZWF0ZUVsZW1lbnQoXCJvYmplY3RcIixudWxsLFwiY2Fycmllci1zaGFwZVwiKVxuICAgICAgICBjYXJyaWVyU2hhcGUuZGF0YSA9IGNhcnJpZXJTdmdcbiAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChjYXJyaWVyU2hhcGUpXG5cbiAgICAgICAgY29uc3Qgc3VibWFyaW5lU2hhcGUgPSBjcmVhdGVFbGVtZW50KFwib2JqZWN0XCIsbnVsbCxcInN1Ym1hcmluZS1zaGFwZVwiKVxuICAgICAgICBzdWJtYXJpbmVTaGFwZS5kYXRhID0gc3VibWFyaW5lU3ZnXG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQoc3VibWFyaW5lU2hhcGUpXG5cbiAgICAgICAgY29uc3QgYmF0dGxlc2hpcFNoYXBlID0gY3JlYXRlRWxlbWVudChcIm9iamVjdFwiLG51bGwsXCJiYXR0bGVzaGlwLXNoYXBlXCIpXG4gICAgICAgIGJhdHRsZXNoaXBTaGFwZS5kYXRhID0gYmF0dGxlc2hpcFN2Z1xuICAgICAgICBtYWluLmFwcGVuZENoaWxkKGJhdHRsZXNoaXBTaGFwZSlcblxuICAgICAgICBjb25zdCBkZXN0cm95ZXJTaGFwZSA9IGNyZWF0ZUVsZW1lbnQoXCJvYmplY3RcIixudWxsLFwiZGVzdHJveWVyLXNoYXBlXCIpXG4gICAgICAgIGRlc3Ryb3llclNoYXBlLmRhdGEgPSBkZXN0cm95ZXJTdmdcbiAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChkZXN0cm95ZXJTaGFwZSlcblxuICAgICAgICBjb25zdCBwYXRyb2xTaGFwZSA9IGNyZWF0ZUVsZW1lbnQoXCJvYmplY3RcIixudWxsLFwicGF0cm9sLXNoYXBlXCIpXG4gICAgICAgIHBhdHJvbFNoYXBlLmRhdGEgPSBwYXRyb2xTdmdcbiAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChwYXRyb2xTaGFwZSlcblxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZUVsZW1lbnQsXG4gICAgICAgIGdldEVsZW1lbnQsXG4gICAgICAgIGxvYWRDb3Zlck1haW5VSVxuICAgIH1cblxufSkoKSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9QnJ1bm8rQWNlJmRpc3BsYXk9c3dhcCk7XCJdKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUlCTStQbGV4K01vbm8mZGlzcGxheT1zd2FwKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcblxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0Ym9yZGVyOiAwO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHRmb250OiBpbmhlcml0O1xcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxufVxcbmJvZHkge1xcblxcdGxpbmUtaGVpZ2h0OiAxO1xcbn1cXG5vbCwgdWwge1xcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGUsIHEge1xcblxcdHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICcnO1xcblxcdGNvbnRlbnQ6IG5vbmU7XFxufVxcbnRhYmxlIHtcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cXG5cXG4vKiBNWSBPV04gU1RZTEVTIEZST00gSEVSRSAqL1xcblxcbi8qIEZvbnRzICovXFxuXFxuYTp2aXNpdGVkIHtcXG4gICAgY29sb3I6ICNmZmY7XFxufVxcblxcbiNzY3JlZW4ge1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7IC8qIG9yIFxcXCJhYnNvbHV0ZVxcXCIgKi9cXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICB6LWluZGV4OiAwO1xcbn1cXG5cXG4vKiBIRUFERVIgKi9cXG5cXG4jaGVhZGVyIHtcXG4gICAgaGVpZ2h0OiAxMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0NzQ3NDc7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCAjMDAwO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgei1pbmRleDogMztcXG59XFxuXFxuLnRpdGxlIHtcXG4gICAgZm9udC1zaXplOiAyZW07XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgY29sb3I6ICNlOGY5MDE7XFxufVxcblxcbiNtYWluIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBoZWlnaHQ6IDgwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcXG59XFxuXFxuLyogQ09WRVIgKi9cXG5cXG4uZ2xvd2luZy1idXR0b24ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNENBRjUwO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgZm9udC1zaXplOiAzZW07XFxuICAgIHBhZGRpbmc6IDIwcHggMzBweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC41cztcXG4gICAgYm94LXNoYWRvdzogMCAwIDVweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxufVxcbiAgXFxuLmdsb3dpbmctYnV0dG9uOmhvdmVyIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xcbiAgICBib3gtc2hhZG93OiAwIDAgMTBweCByZ2JhKDAsIDAsIDAsIDAuMiksIDAgMCAyMHB4IHJnYmEoNzYsIDE3NSwgODAsIDAuNik7XFxufVxcblxcbkBrZXlmcmFtZXMgZ2xvd2luZyB7XFxuICAgIDAlIHtcXG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDAgMTBweCByZ2JhKDc2LCAxNzUsIDgwLCAwLjIpO1xcbiAgICB9XFxuICAgIDUwJSB7XFxuICAgICAgICBib3gtc2hhZG93OiAwIDAgMTBweCByZ2JhKDAsIDAsIDAsIDAuMiksIDAgMCAyMHB4IHJnYmEoNzYsIDE3NSwgODAsIDAuNSk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICBib3gtc2hhZG93OiAwIDAgNXB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAwIDEwcHggcmdiYSg3NiwgMTc1LCA4MCwgMC4yKTtcXG4gICAgfVxcbn1cXG5cXG4uZ2xvd2luZy1idXR0b24ge1xcbiAgICBhbmltYXRpb246IGdsb3dpbmcgMnMgaW5maW5pdGU7XFxufVxcblxcbi8qIENPVkVSIFNISVBTICovXFxuXFxuI2NhcnJpZXItc2hhcGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxODBweDtcXG4gICAgaGVpZ2h0OiA2MHB4O1xcbiAgICB0b3A6IDIwJTtcXG4gICAgYW5pbWF0aW9uOiBtb3ZlLXJpZ2h0LWxlZnQgMTBzIGxpbmVhciBpbmZpbml0ZTsgLyogYWRqdXN0IHRoZSB0aW1lIGFzIG5lZWRlZCAqL1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIG1vdmUtcmlnaHQtbGVmdCB7XFxuICAgIDAlIHsgcmlnaHQ6IC0xMDAlOyB9IC8qIFN0YXJ0IGZyb20gb2ZmIHRoZSByaWdodCBvZiB0aGUgc2NyZWVuICovXFxuICAgIDEwMCUgeyByaWdodDogMTAwJTsgfSAvKiBFbmQgb2ZmIHRoZSBsZWZ0IG9mIHRoZSBzY3JlZW4gKi9cXG59XFxuXFxuI3N1Ym1hcmluZS1zaGFwZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDEyMHB4O1xcbiAgICBoZWlnaHQ6IDYwcHg7XFxuICAgIGxlZnQ6IDIwJTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcbiAgICBhbmltYXRpb246IG1vdmUtdG9wLWRvd24gMTBzIGxpbmVhciBpbmZpbml0ZTtcXG4gICAgei1pbmRleDogMTtcXG59XFxuXFxuQGtleWZyYW1lcyBtb3ZlLXRvcC1kb3duIHtcXG4gICAgMCUgeyB0b3A6IC0yMDBweCB9XFxuICAgIDEwMCUgeyB0b3A6IDE1MDBweH1cXG59XFxuXFxuI2JhdHRsZXNoaXAtc2hhcGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxNTBweDtcXG4gICAgaGVpZ2h0OiA2MHB4O1xcbiAgICB0b3A6IDY1JTtcXG4gICAgYW5pbWF0aW9uOiBtb3ZlLWxlZnQtcmlnaHQgMTBzIGxpbmVhciBpbmZpbml0ZTsgLyogYWRqdXN0IHRoZSB0aW1lIGFzIG5lZWRlZCAqL1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIG1vdmUtbGVmdC1yaWdodCB7XFxuICAgIDAlIHsgbGVmdDogLTEwMCU7IH0gLyogU3RhcnQgZnJvbSBvZmYgdGhlIGxlZnQgb2YgdGhlIHNjcmVlbiAqL1xcbiAgICAxMDAlIHsgbGVmdDogMTAwJTsgfSAvKiBFbmQgb2ZmIHRoZSByaWdodCBvZiB0aGUgc2NyZWVuICovXFxufVxcblxcbiNkZXN0cm95ZXItc2hhcGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxMjBweDtcXG4gICAgaGVpZ2h0OiA2MHB4O1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpO1xcbiAgICBsZWZ0OiA4MCU7XFxuICAgIGFuaW1hdGlvbjogbW92ZS1kb3duLXRvcCAxMHMgbGluZWFyIGluZmluaXRlO1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIG1vdmUtZG93bi10b3Age1xcbiAgICAwJSB7IHRvcDogMTUwMHB4OyB9XFxuICAgIDEwMCUgeyB0b3A6IC0yMDBweDsgfVxcbn1cXG5cXG4jcGF0cm9sLXNoYXBlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogOTBweDtcXG4gICAgaGVpZ2h0OiA2MHB4O1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xcbiAgICB0b3A6IDkwJTtcXG4gICAgYW5pbWF0aW9uOiBtb3ZlLXJpZ2h0LWxlZnQgMTBzIGxpbmVhciBpbmZpbml0ZTtcXG4gICAgei1pbmRleDogMTtcXG59XFxuXFxuLyogTUFJTiAtIEdBTUUgKi9cXG5cXG4ucGxheWVyU2lkZSB7XFxuICAgIHdpZHRoOiA1MCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgcGFkZGluZzogNSU7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBnYXA6IDRlbTtcXG59XFxuXFxuLmdhbWVIZWFkZXIge1xcbiAgICB3aWR0aDogNDQwcHg7XFxuICAgIGZvbnQtc2l6ZTogMS41ZW07XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuI3VzZXJHYW1lSGVhZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0ZDMTE1OTtcXG59XFxuXFxuI2NvbXB1dGVyR2FtZUhlYWRlcntcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzcyN0Q5NTtcXG59XFxuXFxuLmdhbWVib2FyZENvbnRhaW5lciB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLnhIZWFkZXIge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIHBhZGRpbmctbGVmdDogMmVtO1xcbn1cXG5cXG4ueEhlYWRlclNxdWFyZSB7XFxuICAgIHdpZHRoOiAzOHB4O1xcbiAgICBoZWlnaHQ6IDM4cHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcbn1cXG5cXG4uYm90dG9tQm9hcmQge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi55SGVhZGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuLnlIZWFkZXJTcXVhcmUge1xcbiAgICB3aWR0aDogMzhweDtcXG4gICAgaGVpZ2h0OiAzOHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBmb250LXNpemU6IDFlbTtcXG59XFxuXFxuLmdhbWVib2FyZEdyaWQge1xcbiAgICB3aWR0aDogMzgwcHg7XFxuICAgIGhlaWdodDogMzgwcHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG59XFxuXFxuLmdhbWVib2FyZFNxdWFyZSB7XFxuICAgIHdpZHRoOiAzNnB4O1xcbiAgICBoZWlnaHQ6IDM2cHg7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICNmZmY7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhMWRjZmY7XFxufVxcblxcbi5nYW1lYm9hcmRTcXVhcmU6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWI4OGU3O1xcbn1cXG5cXG4vKiBTSElQWUFSRCAqL1xcblxcbi5zdGF0dXNQYW5lbENvbnRhaW5lciB7XFxuICAgIHdpZHRoOiA4MCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gICAgZ2FwOiA1MHB4O1xcbn1cXG5cXG4ucGFuZWxUaXRsZSB7XFxuICAgIHdyaXRpbmctbW9kZTogdmVydGljYWwtcmw7XFxuICAgIHRleHQtb3JpZW50YXRpb246IG1peGVkO1xcbiAgICByb3RhdGU6IDE4MGRlZztcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBmb250LXNpemU6IDFlbTtcXG59XFxuXFxuLnN0YXR1c1BhbmVsIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxuICAgIGdhcDogMjBweDtcXG59XFxuXFxuLmNhcnJpZXIge1xcbiAgICB3aWR0aDogMTg4cHg7XFxuICAgIGhlaWdodDogMzZweDtcXG59XFxuXFxuLmJhdHRsZXNoaXAge1xcbiAgICB3aWR0aDogMTUwcHg7XFxuICAgIGhlaWdodDogMzZweDtcXG59XFxuXFxuLnN1Ym1hcmluZSB7XFxuICAgIHdpZHRoOiAxMTJweDtcXG4gICAgaGVpZ2h0OiAzNnB4O1xcbn1cXG5cXG4uZGVzdHJveWVyIHtcXG4gICAgd2lkdGg6IDExMnB4O1xcbiAgICBoZWlnaHQ6IDM2cHg7XFxufVxcblxcbi5ib2F0IHtcXG4gICAgd2lkdGg6IDc0cHg7XFxuICAgIGhlaWdodDogMzZweDtcXG59XFxuXFxuLnNoaXBTaGFwZSB7XFxuICAgIGN1cnNvcjogbW92ZTtcXG59XFxuXFxuLyogRk9PVEVSICovXFxuXFxuI2Zvb3RlciB7XFxuICAgIGhlaWdodDogMTAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDc0NzQ3O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBib3JkZXItdG9wOiBzb2xpZCAxcHggIzAwMDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIHotaW5kZXg6IDM7XFxufVxcblxcbi5jcmVkaXRzIHtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGZvbnQtZmFtaWx5OiAnSUJNIFBsZXggTW9ubycsIG1vbm9zcGFjZTtcXG4gICAgZm9udC1zaXplOiAwLjhlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4vKiBTdHlsZSB0aGUgbGluayB0byByZW1vdmUgZGVmYXVsdCBzdHlsaW5nICovXFxuLmdpdGh1Yi1saW5rIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGNvbG9yOiBpbmhlcml0O1xcbn1cXG5cXG4vKiBBZGQgdGhlIGhvdmVyIGVmZmVjdCAqL1xcbi5naXRodWItaWNvbiB7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjVzIGVhc2UtaW4tb3V0OyAvKiBBZGQgYSB0cmFuc2l0aW9uIGZvciB0aGUgdHJhbnNmb3JtIHByb3BlcnR5ICovXFxufVxcblxcbi5naXRodWItbGluazpob3ZlciAuZ2l0aHViLWljb24ge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyAvKiBSb3RhdGUgdGhlIGljb24gMTgwIGRlZ3JlZXMgd2hlbiBob3ZlcmVkICovXFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvaW5kZXguY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Q0FHQzs7QUFFRDs7Ozs7Ozs7Ozs7OztDQWFDLFNBQVM7Q0FDVCxVQUFVO0NBQ1YsU0FBUztDQUNULGVBQWU7Q0FDZixhQUFhO0NBQ2Isd0JBQXdCO0FBQ3pCO0FBQ0EsZ0RBQWdEO0FBQ2hEOztDQUVDLGNBQWM7QUFDZjtBQUNBO0NBQ0MsY0FBYztBQUNmO0FBQ0E7Q0FDQyxnQkFBZ0I7QUFDakI7QUFDQTtDQUNDLFlBQVk7QUFDYjtBQUNBOztDQUVDLFdBQVc7Q0FDWCxhQUFhO0FBQ2Q7QUFDQTtDQUNDLHlCQUF5QjtDQUN6QixpQkFBaUI7QUFDbEI7O0FBRUEsNEJBQTRCOztBQUU1QixVQUFVOztBQUtWO0lBQ0ksV0FBVztBQUNmOztBQUVBO0lBQ0ksZUFBZSxFQUFFLGtCQUFrQjtJQUNuQyxNQUFNO0lBQ04sT0FBTztJQUNQLFdBQVc7SUFDWCxZQUFZO0lBQ1osc0JBQXNCO0lBQ3RCLGFBQWE7SUFDYixzQkFB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QUFXO0lBQ1gsdUNBQXVDO0lBQ3ZDLGdCQUFnQjtJQUNoQixrQkFBa0I7QUFDdEI7O0FBRUEsNkNBQTZDO0FBQzdDO0lBQ0kscUJBQXFCO0lBQ3JCLHFCQUFxQjtJQUNyQixjQUFjO0FBQ2xCOztBQUVBLHlCQUF5QjtBQUN6QjtJQUNJLHNDQUFzQyxFQUFFLGdEQUFnRDtBQUM1Rjs7QUFFQTtJQUNJLHlCQUF5QixFQUFFLDZDQUE2QztBQUM1RVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXHRib3JkZXI6IDA7XFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcblxcdGZvbnQ6IGluaGVyaXQ7XFxuXFx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG59XFxuYm9keSB7XFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxufVxcbm9sLCB1bCB7XFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXG59XFxuYmxvY2txdW90ZSwgcSB7XFxuXFx0cXVvdGVzOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuXFx0Y29udGVudDogJyc7XFxuXFx0Y29udGVudDogbm9uZTtcXG59XFxudGFibGUge1xcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxufVxcblxcbi8qIE1ZIE9XTiBTVFlMRVMgRlJPTSBIRVJFICovXFxuXFxuLyogRm9udHMgKi9cXG5cXG5AaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1CcnVubytBY2UmZGlzcGxheT1zd2FwJyk7XFxuQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9SUJNK1BsZXgrTW9ubyZkaXNwbGF5PXN3YXAnKTtcXG5cXG5hOnZpc2l0ZWQge1xcbiAgICBjb2xvcjogI2ZmZjtcXG59XFxuXFxuI3NjcmVlbiB7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDsgLyogb3IgXFxcImFic29sdXRlXFxcIiAqL1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIHotaW5kZXg6IDA7XFxufVxcblxcbi8qIEhFQURFUiAqL1xcblxcbiNoZWFkZXIge1xcbiAgICBoZWlnaHQ6IDEwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzQ3NDc0NztcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYm9yZGVyLWJvdHRvbTogc29saWQgMXB4ICMwMDA7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICB6LWluZGV4OiAzO1xcbn1cXG5cXG4udGl0bGUge1xcbiAgICBmb250LXNpemU6IDJlbTtcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBjb2xvcjogI2U4ZjkwMTtcXG59XFxuXFxuI21haW4ge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGhlaWdodDogODAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpO1xcbn1cXG5cXG4vKiBDT1ZFUiAqL1xcblxcbi5nbG93aW5nLWJ1dHRvbiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0Q0FGNTA7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBmb250LXNpemU6IDNlbTtcXG4gICAgcGFkZGluZzogMjBweCAzMHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjVzO1xcbiAgICBib3gtc2hhZG93OiAwIDAgNXB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcXG59XFxuICBcXG4uZ2xvd2luZy1idXR0b246aG92ZXIge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAwIDIwcHggcmdiYSg3NiwgMTc1LCA4MCwgMC42KTtcXG59XFxuXFxuQGtleWZyYW1lcyBnbG93aW5nIHtcXG4gICAgMCUge1xcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDVweCByZ2JhKDAsIDAsIDAsIDAuMiksIDAgMCAxMHB4IHJnYmEoNzYsIDE3NSwgODAsIDAuMik7XFxuICAgIH1cXG4gICAgNTAlIHtcXG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAwIDIwcHggcmdiYSg3NiwgMTc1LCA4MCwgMC41KTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDAgMTBweCByZ2JhKDc2LCAxNzUsIDgwLCAwLjIpO1xcbiAgICB9XFxufVxcblxcbi5nbG93aW5nLWJ1dHRvbiB7XFxuICAgIGFuaW1hdGlvbjogZ2xvd2luZyAycyBpbmZpbml0ZTtcXG59XFxuXFxuLyogQ09WRVIgU0hJUFMgKi9cXG5cXG4jY2Fycmllci1zaGFwZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDE4MHB4O1xcbiAgICBoZWlnaHQ6IDYwcHg7XFxuICAgIHRvcDogMjAlO1xcbiAgICBhbmltYXRpb246IG1vdmUtcmlnaHQtbGVmdCAxMHMgbGluZWFyIGluZmluaXRlOyAvKiBhZGp1c3QgdGhlIHRpbWUgYXMgbmVlZGVkICovXFxuICAgIHotaW5kZXg6IDE7XFxufVxcblxcbkBrZXlmcmFtZXMgbW92ZS1yaWdodC1sZWZ0IHtcXG4gICAgMCUgeyByaWdodDogLTEwMCU7IH0gLyogU3RhcnQgZnJvbSBvZmYgdGhlIHJpZ2h0IG9mIHRoZSBzY3JlZW4gKi9cXG4gICAgMTAwJSB7IHJpZ2h0OiAxMDAlOyB9IC8qIEVuZCBvZmYgdGhlIGxlZnQgb2YgdGhlIHNjcmVlbiAqL1xcbn1cXG5cXG4jc3VibWFyaW5lLXNoYXBlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMTIwcHg7XFxuICAgIGhlaWdodDogNjBweDtcXG4gICAgbGVmdDogMjAlO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxuICAgIGFuaW1hdGlvbjogbW92ZS10b3AtZG93biAxMHMgbGluZWFyIGluZmluaXRlO1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIG1vdmUtdG9wLWRvd24ge1xcbiAgICAwJSB7IHRvcDogLTIwMHB4IH1cXG4gICAgMTAwJSB7IHRvcDogMTUwMHB4fVxcbn1cXG5cXG4jYmF0dGxlc2hpcC1zaGFwZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDE1MHB4O1xcbiAgICBoZWlnaHQ6IDYwcHg7XFxuICAgIHRvcDogNjUlO1xcbiAgICBhbmltYXRpb246IG1vdmUtbGVmdC1yaWdodCAxMHMgbGluZWFyIGluZmluaXRlOyAvKiBhZGp1c3QgdGhlIHRpbWUgYXMgbmVlZGVkICovXFxuICAgIHotaW5kZXg6IDE7XFxufVxcblxcbkBrZXlmcmFtZXMgbW92ZS1sZWZ0LXJpZ2h0IHtcXG4gICAgMCUgeyBsZWZ0OiAtMTAwJTsgfSAvKiBTdGFydCBmcm9tIG9mZiB0aGUgbGVmdCBvZiB0aGUgc2NyZWVuICovXFxuICAgIDEwMCUgeyBsZWZ0OiAxMDAlOyB9IC8qIEVuZCBvZmYgdGhlIHJpZ2h0IG9mIHRoZSBzY3JlZW4gKi9cXG59XFxuXFxuI2Rlc3Ryb3llci1zaGFwZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDEyMHB4O1xcbiAgICBoZWlnaHQ6IDYwcHg7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7XFxuICAgIGxlZnQ6IDgwJTtcXG4gICAgYW5pbWF0aW9uOiBtb3ZlLWRvd24tdG9wIDEwcyBsaW5lYXIgaW5maW5pdGU7XFxuICAgIHotaW5kZXg6IDE7XFxufVxcblxcbkBrZXlmcmFtZXMgbW92ZS1kb3duLXRvcCB7XFxuICAgIDAlIHsgdG9wOiAxNTAwcHg7IH1cXG4gICAgMTAwJSB7IHRvcDogLTIwMHB4OyB9XFxufVxcblxcbiNwYXRyb2wtc2hhcGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiA5MHB4O1xcbiAgICBoZWlnaHQ6IDYwcHg7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XFxuICAgIHRvcDogOTAlO1xcbiAgICBhbmltYXRpb246IG1vdmUtcmlnaHQtbGVmdCAxMHMgbGluZWFyIGluZmluaXRlO1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG4vKiBNQUlOIC0gR0FNRSAqL1xcblxcbi5wbGF5ZXJTaWRlIHtcXG4gICAgd2lkdGg6IDUwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBwYWRkaW5nOiA1JTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGdhcDogNGVtO1xcbn1cXG5cXG4uZ2FtZUhlYWRlciB7XFxuICAgIHdpZHRoOiA0NDBweDtcXG4gICAgZm9udC1zaXplOiAxLjVlbTtcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4jdXNlckdhbWVIZWFkZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkMxMTU5O1xcbn1cXG5cXG4jY29tcHV0ZXJHYW1lSGVhZGVye1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzI3RDk1O1xcbn1cXG5cXG4uZ2FtZWJvYXJkQ29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4ueEhlYWRlciB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgcGFkZGluZy1sZWZ0OiAyZW07XFxufVxcblxcbi54SGVhZGVyU3F1YXJlIHtcXG4gICAgd2lkdGg6IDM4cHg7XFxuICAgIGhlaWdodDogMzhweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgZm9udC1zaXplOiAxZW07XFxufVxcblxcbi5ib3R0b21Cb2FyZCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLnlIZWFkZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4ueUhlYWRlclNxdWFyZSB7XFxuICAgIHdpZHRoOiAzOHB4O1xcbiAgICBoZWlnaHQ6IDM4cHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcbn1cXG5cXG4uZ2FtZWJvYXJkR3JpZCB7XFxuICAgIHdpZHRoOiAzODBweDtcXG4gICAgaGVpZ2h0OiAzODBweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbn1cXG5cXG4uZ2FtZWJvYXJkU3F1YXJlIHtcXG4gICAgd2lkdGg6IDM2cHg7XFxuICAgIGhlaWdodDogMzZweDtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggI2ZmZjtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgZm9udC1zaXplOiAxZW07XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ExZGNmZjtcXG59XFxuXFxuLmdhbWVib2FyZFNxdWFyZTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMxYjg4ZTc7XFxufVxcblxcbi8qIFNISVBZQVJEICovXFxuXFxuLnN0YXR1c1BhbmVsQ29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDgwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgICBnYXA6IDUwcHg7XFxufVxcblxcbi5wYW5lbFRpdGxlIHtcXG4gICAgd3JpdGluZy1tb2RlOiB2ZXJ0aWNhbC1ybDtcXG4gICAgdGV4dC1vcmllbnRhdGlvbjogbWl4ZWQ7XFxuICAgIHJvdGF0ZTogMTgwZGVnO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcbn1cXG5cXG4uc3RhdHVzUGFuZWwge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAgZ2FwOiAyMHB4O1xcbn1cXG5cXG4uY2FycmllciB7XFxuICAgIHdpZHRoOiAxODhweDtcXG4gICAgaGVpZ2h0OiAzNnB4O1xcbn1cXG5cXG4uYmF0dGxlc2hpcCB7XFxuICAgIHdpZHRoOiAxNTBweDtcXG4gICAgaGVpZ2h0OiAzNnB4O1xcbn1cXG5cXG4uc3VibWFyaW5lIHtcXG4gICAgd2lkdGg6IDExMnB4O1xcbiAgICBoZWlnaHQ6IDM2cHg7XFxufVxcblxcbi5kZXN0cm95ZXIge1xcbiAgICB3aWR0aDogMTEycHg7XFxuICAgIGhlaWdodDogMzZweDtcXG59XFxuXFxuLmJvYXQge1xcbiAgICB3aWR0aDogNzRweDtcXG4gICAgaGVpZ2h0OiAzNnB4O1xcbn1cXG5cXG4uc2hpcFNoYXBlIHtcXG4gICAgY3Vyc29yOiBtb3ZlO1xcbn1cXG5cXG4vKiBGT09URVIgKi9cXG5cXG4jZm9vdGVyIHtcXG4gICAgaGVpZ2h0OiAxMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0NzQ3NDc7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJvcmRlci10b3A6IHNvbGlkIDFweCAjMDAwO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgei1pbmRleDogMztcXG59XFxuXFxuLmNyZWRpdHMge1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgZm9udC1mYW1pbHk6ICdJQk0gUGxleCBNb25vJywgbW9ub3NwYWNlO1xcbiAgICBmb250LXNpemU6IDAuOGVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi8qIFN0eWxlIHRoZSBsaW5rIHRvIHJlbW92ZSBkZWZhdWx0IHN0eWxpbmcgKi9cXG4uZ2l0aHViLWxpbmsge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgY29sb3I6IGluaGVyaXQ7XFxufVxcblxcbi8qIEFkZCB0aGUgaG92ZXIgZWZmZWN0ICovXFxuLmdpdGh1Yi1pY29uIHtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNXMgZWFzZS1pbi1vdXQ7IC8qIEFkZCBhIHRyYW5zaXRpb24gZm9yIHRoZSB0cmFuc2Zvcm0gcHJvcGVydHkgKi9cXG59XFxuXFxuLmdpdGh1Yi1saW5rOmhvdmVyIC5naXRodWItaWNvbiB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7IC8qIFJvdGF0ZSB0aGUgaWNvbiAxODAgZGVncmVlcyB3aGVuIGhvdmVyZWQgKi9cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiNWE2OTJkOWZkMmZiOGMzNDJiZWNlNGMyNjQxYTUxY2Quc3ZnXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImYwNGRmNzFkN2MxZDc4NmRhYWYwYjc0YjRjMDZhY2ZlLnN2Z1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIyM2RlODU4MWM5YTY1ODQ2YWFhMTBiYTAxZWFmZjZiMC5zdmdcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiNmVmOTU3YzhmYzlmMjQxNzk0YTRjYzhhZjYzZGViMzEuc3ZnXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjBlMmIwNzgyNjg5ZmU3M2JmMWQwMjg3ODUwYzg3MDg4LnN2Z1wiOyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbInZpZXciLCJsb2FkQ292ZXJNYWluVUkiLCJjYXJyaWVyU3ZnIiwic3VibWFyaW5lU3ZnIiwiYmF0dGxlc2hpcFN2ZyIsImRlc3Ryb3llclN2ZyIsInBhdHJvbFN2ZyIsImNyZWF0ZUVsZW1lbnQiLCJ0YWciLCJjbGFzc05hbWUiLCJpZCIsImVsZW1lbnQiLCJkb2N1bWVudCIsImNsYXNzTGlzdCIsImFkZCIsInNldEF0dHJpYnV0ZSIsImdldEVsZW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImRlbGV0ZU1haW5VSSIsIm1haW4iLCJpbm5lckhUTUwiLCJsb2FkR2FtZVVJIiwidXNlclNpZGUiLCJjb21wdXRlclNpZGUiLCJhcHBlbmRDaGlsZCIsInVzZXJIZWFkZXIiLCJjb21wdXRlckhlYWRlciIsInVzZXJUaXRsZSIsImNvbXB1dGVyVGl0bGUiLCJ0ZXh0Q29udGVudCIsInVzZXJHYW1lYm9hcmRDb250YWluZXIiLCJjb21wdXRlckdhbWVib2FyZENvbnRhaW5lciIsInVzZXJYSGVhZGVyIiwiY29tcHV0ZXJYSGVhZGVyIiwiaSIsInVzZXJYSGVhZGVyU3F1YXJlIiwiY29tcHV0ZXJYSGVhZGVyU3F1YXJlIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwidXNlckJvdHRvbUJvYXJkIiwiY29tcHV0ZXJCb3R0b21Cb2FyZCIsInVzZXJZSGVhZGVyIiwiY29tcHV0ZXJZSGVhZGVyIiwidXNlcllIZWFkZXJTcXVhcmUiLCJjb21wdXRlcllIZWFkZXJTcXVhcmUiLCJ1c2VyR2FtZWJvYXJkIiwiY29tcHV0ZXJHYW1lYm9hcmQiLCJ1c2VyR2FtZWJvYXJkU3F1YXJlIiwiY29tcHV0ZXJHYW1lYm9hcmRTcXVhcmUiLCJ1c2VyU3RhdHVzUGFuZWxDb250YWluZXIiLCJjb21wdXRlclN0YXR1c1BhbmVsQ29udGFpbmVyIiwidXNlclN0YXR1c0hlYWRlciIsImNvbXB1dGVyU3RhdHVzSGVhZGVyIiwidXNlclN0YXR1c1RpdGxlIiwiY29tcHV0ZXJTdGF0dXNUaXRsZSIsInVzZXJTdGF0dXNQYW5lbCIsImNvbXB1dGVyU3RhdHVzUGFuZWwiLCJ1c2VyQ2FycmllciIsInVzZXJCYXR0bGVzaGlwIiwidXNlckRlc3Ryb3llciIsInVzZXJTdWJtYXJpbmUiLCJ1c2VyQm9hdCIsImNvbXB1dGVyQ2FycmllciIsImNvbXB1dGVyQmF0dGxlc2hpcCIsImNvbXB1dGVyRGVzdHJveWVyIiwiY29tcHV0ZXJTdWJtYXJpbmUiLCJjb21wdXRlckJvYXQiLCJzY3JlZW4iLCJib2R5IiwiaGVhZGVyIiwiZm9vdGVyIiwidGl0bGUiLCJjcmVkaXRzIiwiZ2xvd2luZ0J1dHRvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJjYXJyaWVyU2hhcGUiLCJkYXRhIiwic3VibWFyaW5lU2hhcGUiLCJiYXR0bGVzaGlwU2hhcGUiLCJkZXN0cm95ZXJTaGFwZSIsInBhdHJvbFNoYXBlIl0sInNvdXJjZVJvb3QiOiIifQ==