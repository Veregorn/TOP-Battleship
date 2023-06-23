"use strict";
(self["webpackChunktop_battleship"] = self["webpackChunktop_battleship"] || []).push([["index"],{

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Factory representing a game board in the game
const Gameboard = () => {
  const _board = Array(100).fill("Water"); // Array of 100 squares representing the game board
  const _ships = []; // Array of ships on the board
  let _gameover = false;

  // Get the board array
  const getBoard = () => _board;

  // Get the ships array
  const getShips = () => _ships;

  // Get if the game is over
  const getGameOver = () => _gameover;

  // Set Game Over
  const setGameOver = () => {
    _gameover = true;
  };

  // Get a Square
  const getSquare = square => _board[square];

  // Set a Square
  const setSquare = (num, value) => {
    _board[num] = value;
  };

  // Set a ship in the array of ships
  const setShip = ship => getShips().push(ship);

  // Return true if two squares are in the same line in the board
  const isSameLine = (x, y) => Math.floor(x / 10) === Math.floor(y / 10);

  // Return true if next square is in the same line or column that previous one
  const isValidNextSquare = (current, next, direction) => direction === "x" ? isSameLine(next, current) : next <= 99;

  // Return true if a square is empty (no other ship is placed there)
  const isEmptySquare = square => getSquare(square) === "Water";

  // Gets next position in the board depending on ship direction placement
  const getNextPosition = (currentPos, direction) => direction === "x" ? currentPos + 1 : currentPos + 10;

  // Places a ship
  const placeShip = (ship, startPos, direction) => {
    let nextPos = startPos;
    const validPosArray = [];
    for (let i = 1; i <= ship.getLength(); i += 1) {
      // Test if the next position is valid
      if (!isValidNextSquare(startPos, nextPos, direction)) {
        return {
          error: "You are exceeding the limits of the board"
        };
      }

      // Test if that square is empty (no other ship placed there)
      if (!isEmptySquare(nextPos)) {
        return {
          error: "That square is not empty"
        };
      }

      // Insert the valid position into our temp array
      validPosArray.push(nextPos);

      // Update position
      nextPos = getNextPosition(nextPos, direction);
    }

    // Set square string to ship name for each value in the temp array
    for (let i = 0; i < validPosArray.length; i += 1) {
      setSquare(validPosArray[i], ship.getName());
    }

    // Place the ship in the array of ships
    setShip(ship);

    // Return a success message and the array of valid positions
    return {
      data: validPosArray,
      success: `A ${ship.getName()} has been placed`
    };
  };

  // Find and return a Ship in the board
  const findShip = shipName => {
    const ship = getShips().find(s => s.getName() === shipName);

    // If no ship found, returns an error
    if (!ship) {
      return {
        error: "No ship found with that name"
      };
    }
    return ship;
  };

  // Checks if the game is over
  const checkGameOver = () => {
    if (getShips().length === 0) {
      setGameOver();
    }
  };

  // Delete a ship from the ships array
  const deleteShip = shipName => {
    const index = getShips().findIndex(s => s.getName() === shipName);

    // If no ship found, returns an error
    if (index === -1) {
      return {
        error: "There is no ship with that name to delete"
      };
    }
    getShips().splice(index, 1);

    // Check if the game is over
    checkGameOver();

    // Return a success message
    return {
      success: `Ship named "${shipName}" has been deleted`
    };
  };

  // takes a square number, determines whether or not the attack hit a ship and then 
  // sends the ‘hit’ function to the correct ship, or records the coordinates 
  // of the missed shot
  const receiveAttack = squareNumber => {
    const square = getSquare(squareNumber);
    const result = {
      type: "",
      success: "",
      error: "",
      sunk: "",
      gameover: false
    };

    // Attack fails
    if (square === "Water") {
      result.type = "Miss";
      setSquare(squareNumber, result.type);
      result.success = "Hahaha! Better luck next time!";
    } else if (square === "Miss" || square === "ShipHit") {
      // Invalid attack received
      result.error = "This square was already attacked!";
    } else {
      // Attack hits
      const damagedShip = findShip(square);
      result.type = "ShipHit";
      setSquare(squareNumber, result.type);
      damagedShip.hit();
      result.success = "Arggh! You hit my ship!";

      // Need to test if ship is sunk
      if (damagedShip.isSunk()) {
        result.sunk = damagedShip.getName();
        deleteShip(damagedShip.getName());
        checkGameOver();

        // If game is over, return that in the result
        if (getGameOver()) {
          result.gameover = true;
        }
      }
    }
    return result;
  };
  return {
    getGameOver,
    getSquare,
    placeShip,
    findShip,
    receiveAttack,
    getShips,
    getBoard
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.css */ "./src/styles/index.css");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ "./src/view.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/player.js");




// Function to load the main UI
function loadMainUI() {
  // Load the main UI
  _view__WEBPACK_IMPORTED_MODULE_1__.view.loadGameUI();
  const user = (0,_player__WEBPACK_IMPORTED_MODULE_2__["default"])("Human");
  const computer = (0,_player__WEBPACK_IMPORTED_MODULE_2__["default"])("AI");

  // Place computer ships
  computer.placeShipsRandomly();

  // Manage manual placement button
  _view__WEBPACK_IMPORTED_MODULE_1__.view.onManualPlacementClick();

  // Manage random placement button
  _view__WEBPACK_IMPORTED_MODULE_1__.view.onRandomPlacementClick(() => {
    user.placeShipsRandomly(); // Place user ships randomly
    _view__WEBPACK_IMPORTED_MODULE_1__.view.loadUserGameboard(user.getGameBoard().getBoard()); // Load user board
    // Delete Event Listeners associated with user gameboard
    _view__WEBPACK_IMPORTED_MODULE_1__.view.deleteUserGameboardEventListeners();
    // view.loadUserShipsInfo(user.getShips())
  });

  // Wait for user to click on a square
  _view__WEBPACK_IMPORTED_MODULE_1__.view.onUserBoardClick((squareNum, shipName, orientation) => {
    // Place user ship
    const res = user.placeShip(squareNum, shipName, orientation);

    // if "placeShip returns an error, show it"
    if (res.error) {
      _view__WEBPACK_IMPORTED_MODULE_1__.view.showUserInfo(res.error);
    } else {
      _view__WEBPACK_IMPORTED_MODULE_1__.view.showUserInfo(res.success); // Show success message
      _view__WEBPACK_IMPORTED_MODULE_1__.view.updateUserGameboardShipPlacement(res.squares); // Update user board
      _view__WEBPACK_IMPORTED_MODULE_1__.view.updateUserShipyard(shipName); // Update user shipyard
    }
  });

  // Wait for user to click on a square to attack
  _view__WEBPACK_IMPORTED_MODULE_1__.view.onComputerBoardClick(squareNum => {
    // Attack the square
    const res = user.manualAttack(squareNum);

    // If "manualAttack" returns an error, show it
    if (res.error) {
      _view__WEBPACK_IMPORTED_MODULE_1__.view.showUserInfo(res.error);
      _view__WEBPACK_IMPORTED_MODULE_1__.view.showComputerInfo("");
    } else {
      const attackRes = computer.getGameBoard().receiveAttack(squareNum); // Attack computer board

      // If "receiveAttack" returns an error, show it
      if (attackRes.error) {
        _view__WEBPACK_IMPORTED_MODULE_1__.view.showUserInfo(attackRes.error);
        _view__WEBPACK_IMPORTED_MODULE_1__.view.showComputerInfo("");
      } else {
        // If not, read the result

        // If the attack was a hit, show it
        if (attackRes.type === "ShipHit") {
          _view__WEBPACK_IMPORTED_MODULE_1__.view.showUserInfo("You hit a ship!");
          _view__WEBPACK_IMPORTED_MODULE_1__.view.showComputerInfo(attackRes.success);

          // If the ship was sunk, show it
          if (attackRes.sunk !== "") {
            _view__WEBPACK_IMPORTED_MODULE_1__.view.showUserInfo("You sunk a ship!");
            _view__WEBPACK_IMPORTED_MODULE_1__.view.showComputerInfo(`Oh no! my ${attackRes.sunk}!`);
            _view__WEBPACK_IMPORTED_MODULE_1__.view.updateComputerShipyard(attackRes.sunk);
          }
        } else if (attackRes.type === "Miss") {
          // If not, show a miss

          _view__WEBPACK_IMPORTED_MODULE_1__.view.showUserInfo("You missed!");
          _view__WEBPACK_IMPORTED_MODULE_1__.view.showComputerInfo(attackRes.success);
        }

        // Update computer board
        _view__WEBPACK_IMPORTED_MODULE_1__.view.updateComputerGameboard(squareNum, attackRes.type);
      }
    }

    // Computer attacks
    // const square = computer.generateAutoAttack()
  });
}

// Create the interface and player objects
_view__WEBPACK_IMPORTED_MODULE_1__.view.loadCoverMainUI(loadMainUI);

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");



// Factory representing a player in the game
const Player = type => {
  const _gameBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])(); // Each player has a game board
  const _type = type; // Possible values: "Human" or "AI"
  const _ships = [(0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])("carrier"), (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])("battleship"), (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])("destroyer"), (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])("submarine"), (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])("boat")]; // Array of ships a player is provided with
  const _availableAttacks = Array.from({
    length: 100
  }, (_, index) => index); // Creates an array from 0 to 99

  // Gets the game board
  const getGameBoard = () => _gameBoard;

  // Gets the player type
  const getPlayerType = () => _type;

  // Gets the player ships array
  const getShips = () => _ships;

  // Gets ship at position in the array of player's ships
  const getShipAtPos = pos => _ships[pos];

  // Receives a name and returns the ship with that name or null if it doesn't exist
  const getShipByName = name => {
    for (let i = 0; i < _ships.length; i += 1) {
      if (_ships[i].getName() === name) {
        return _ships[i];
      }
    }
    return null;
  };

  // Receives a ship name and deletes it from the player's ships array
  const deleteShipByName = name => {
    for (let i = 0; i < _ships.length; i += 1) {
      if (_ships[i].getName() === name) {
        _ships.splice(i, 1);
        break;
      }
    }
  };

  // Gets the attacks array
  const getAvailableAttacks = () => _availableAttacks;

  // Gets the square at 'pos' in the '_availableAttacks' array
  const getAttackAtPos = pos => _availableAttacks[pos];

  // Gets index of a square in the '_availableAttacks' array
  const getIndexOfAttack = square => _availableAttacks.indexOf(square);

  // Receives a square in returns true if that square hasn't been attacked yet
  const isValidAttack = square => getAvailableAttacks().includes(square);

  // Gets a random value "x" or "y" for the orientation of a ship
  const getRandomDirection = () => Math.random() < 0.5 ? "x" : "y";

  // Randomly shuffles an array 
  const shuffleArray = array => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  // Places ships randomly on the game board
  const placeShipsRandomly = () => {
    // Creates an ordered array 0 to 99
    const startPositionCandidates = Array.from({
      length: 100
    }, (_, index) => index);
    // Shuffle array positions            
    const shuffledPositions = shuffleArray(startPositionCandidates);

    // While the array of ships is not empty
    while (getShips().length > 0) {
      // Iterate "shuffledPositions" array until find a valid ship placement
      for (let j = 0; j < shuffledPositions.length; j += 1) {
        const direction = getRandomDirection();
        const result = getGameBoard().placeShip(getShipAtPos(getShips().length - 1), shuffledPositions[j], direction);
        if (result.success) {
          getShips().pop();
          break;
        }
      }
    }
  };

  // Places a ship manually on the gameboard
  const placeShip = (square, shipName, orientation) => {
    // Get the ship
    const ship = getShipByName(shipName);

    // Test if ship exists
    if (!ship) {
      return {
        error: "Ship doesn't exist!"
      };
    }

    // We need to translate "orientation" into "direction"
    const direction = orientation === "horizontal" ? "x" : "y";
    const res = getGameBoard().placeShip(ship, square, direction);

    // If ship placement was successful, 
    // delete it from the player's ships array,
    // return success msg and the array of squares this ship occupies
    if (res.success) {
      deleteShipByName(shipName);
      return {
        success: "Ship placed",
        squares: res.data
      };
    }
    return {
      error: "Invalid ship placement"
    };
  };

  // Generates a random index from that array of available attacks
  const generateRandomIndex = () => Math.floor(Math.random() * getAvailableAttacks().length);

  // When we attack a position in enemy's board 
  // we need to delete it from available attacks to not repeat it in the future
  const deleteFromAvailableAttacks = index => {
    _availableAttacks.splice(index, 1);
  };

  // Generates a square to attack
  const generateAutoAttack = () => {
    const index = generateRandomIndex();
    const square = getAttackAtPos(index);
    deleteFromAvailableAttacks(index);
    return square;
  };

  // Human player attacks an specific location
  const manualAttack = square => {
    // Test if is valid attack
    if (!isValidAttack(square)) {
      return {
        error: "Invalid attack! That square was attacked yet"
      };
    }

    // Delete tha square from valid attacks array
    deleteFromAvailableAttacks(getIndexOfAttack(square));

    // Return success msg
    return {
      success: "Position attacked! "
    };
  };
  return {
    getGameBoard,
    placeShipsRandomly,
    generateAutoAttack,
    isValidAttack,
    manualAttack,
    getPlayerType,
    getShips,
    getRandomDirection,
    placeShip,
    getShipByName,
    deleteShipByName
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Factory representing a Ship in the game
const Ship = name => {
  const _name = name;
  let _length = 0; // Number of squares the ship occupies

  // Carrier 5 - Battleship 4 - Destroyer 3 - Submarine 3 - Patrol Boat 2
  switch (true) {
    case _name === "carrier":
      _length = 5;
      break;
    case _name === "battleship":
      _length = 4;
      break;
    case _name === "destroyer":
      _length = 3;
      break;
    case _name === "submarine":
      _length = 3;
      break;
    case _name === "boat":
      _length = 2;
      break;
    default:
      _length = 0;
      break;
  }
  let _hits = 0; // Number of times the ship has been damaged
  let _sunk = false; // Indicates if the ship has been sunk or not

  const getName = () => _name;
  const getLength = () => _length;
  const getHits = () => _hits;
  const hit = () => {
    if (_hits < _length) {
      _hits += 1;
    }
    if (_hits === _length) {
      _sunk = true;
    }
  };
  const isSunk = () => _sunk;
  return {
    getName,
    getLength,
    getHits,
    hit,
    isSunk
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

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
  // Some useful variables
  let selectedShipLength = 0;
  let orientation = "horizontal";
  let selectedShipName = "";
  let placedShipsCounter = 0;

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

  // Shows info in users "instructions" div
  function showUserInfo(info) {
    const instructions = document.querySelector(".instructions");
    instructions.textContent = info;
  }

  // Shows info in computers "instructions" div
  function showComputerInfo(info) {
    const computerInfo = document.querySelector(".computerInfo");
    computerInfo.textContent = info;
  }

  // Handles a click on a ship in the user's Shipyard
  function handleShipClick(ship) {
    // If ship is already placed on board, return
    if (ship.classList.contains("placed")) showUserInfo("Ship already placed on board");

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
    const instructions = document.querySelector(".instructions");
    if (instructions) instructions.textContent = "Select a position on the board to place the ship. Use T key to rotate the ship";
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
    const userYHeaderShipyard = createElement("div", "yHeaderShipyard", null);
    const computerYHeaderShipyard = createElement("div", "yHeaderShipyard", null);
    userYHeaderShipyard.textContent = "Shipyard";
    computerYHeaderShipyard.textContent = "Shipyard";
    userYHeader.appendChild(userYHeaderShipyard);
    computerYHeader.appendChild(computerYHeaderShipyard);
    const userGridPanelContainer = createElement("div", "gridPanelContainer", "userGridPanelContainer");
    const computerGridPanelContainer = createElement("div", "gridPanelContainer", "computerGridPanelContainer");
    const userGameboard = createElement("div", "gameboardGrid", "userGameboardGrid");
    userGameboard.classList.add("blocked");
    const computerGameboard = createElement("div", "gameboardGrid", "computerGameboardGrid");
    computerGameboard.classList.add("blocked");

    // Generate the gameboard squares
    for (let i = 0; i < 100; i += 1) {
      const userGameboardSquare = createElement("div", "gameboardSquare", null);
      userGameboardSquare.setAttribute("data-index", i);
      const computerGameboardSquare = createElement("div", "gameboardSquare", null);
      computerGameboardSquare.setAttribute("data-index", i);
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
    userCarrier.classList.add("ship");
    userCarrier.classList.add("userShip");
    userCarrier.classList.add("no-hover");
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
    userBattleship.classList.add("ship");
    userBattleship.classList.add("userShip");
    userBattleship.classList.add("no-hover");
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
    userDestroyer.classList.add("ship");
    userDestroyer.classList.add("userShip");
    userDestroyer.classList.add("no-hover");
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
    userSubmarine.classList.add("ship");
    userSubmarine.classList.add("userShip");
    userSubmarine.classList.add("no-hover");
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
    userBoat.classList.add("ship");
    userBoat.classList.add("userShip");
    userBoat.classList.add("no-hover");
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
    computerCarrier.classList.add("ship");
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
    computerBattleship.classList.add("ship");
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
    computerDestroyer.classList.add("ship");
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
    computerSubmarine.classList.add("ship");
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
    computerBoat.classList.add("ship");
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
    instructions.textContent = "Select a placement option for your ships";
    userSide.appendChild(instructions);

    // Create a div to show info from the IA player
    const computerInfo = createElement("div", "computerInfo", null);
    computerInfo.textContent = "My ships has been placed. I'm waiting for you to start...";
    computerSide.appendChild(computerInfo);

    // Create a div to show buttons to the user
    const buttonsContainer = createElement("div", "buttonsContainer", null);
    userSide.appendChild(buttonsContainer);
    const manualButton = createElement("button", "placementButton", "manualButton");
    manualButton.textContent = "Manual Placement";
    const randomButton = createElement("button", "placementButton", "randomButton");
    randomButton.textContent = "Random Placement";
    buttonsContainer.appendChild(manualButton);
    buttonsContainer.appendChild(randomButton);
  }

  // Associates an event listener to every cell of the user board
  function onUserBoardClick(callback) {
    const userGameboardGrid = getElement("userGameboardGrid");
    const userBoardSquares = document.querySelectorAll("#userGameboardGrid .gameboardSquare");
    userBoardSquares.forEach(square => {
      square.addEventListener("click", () => {
        if (!userGameboardGrid.classList.contains("blocked")) {
          callback(parseInt(square.getAttribute("data-index"), 10), selectedShipName, orientation);
        }
      });
    });
  }

  // Associates an event listener to every cell of the computer board
  function onComputerBoardClick(callback) {
    const computerGameboardGrid = getElement("computerGameboardGrid");
    const computerBoardSquares = document.querySelectorAll("#computerGameboardGrid .gameboardSquare");
    computerBoardSquares.forEach(square => {
      square.addEventListener("click", () => {
        if (!computerGameboardGrid.classList.contains("blocked")) {
          callback(parseInt(square.getAttribute("data-index"), 10));
        }
      });
    });
  }

  // Associates an event listener to "Manual Placement" button
  function onManualPlacementClick() {
    const manualButton = document.querySelector("#manualButton");
    manualButton.addEventListener("click", () => {
      // Delete the buttons from the instructions div
      manualButton.remove();
      const randomButton = getElement("randomButton");
      randomButton.remove();

      // Change gameboard status
      const userGameboardGrid = getElement("userGameboardGrid");
      userGameboardGrid.classList.remove("blocked");

      // Change instructions text
      const instructions = document.querySelector(".instructions");
      instructions.textContent = "Select a not yet placed ship";

      // Adding event listeners to user ships
      const userShips = document.querySelectorAll(".userShip");
      userShips.forEach(ship => {
        ship.classList.remove("no-hover");
        ship.addEventListener("click", event => handleShipClick(ship, event));
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
      });

      // Adding event listener to T key to rotate the selected ship
      document.addEventListener("keydown", e => {
        if (e.key === "t") orientation = orientation === "horizontal" ? "vertical" : "horizontal";
      });
    });
  }

  // Show a "Start Game" button
  function showStartGameButton() {
    // Show the "Start Game" button
    const startGameButton = createElement("button", null, "start-game-button");
    startGameButton.textContent = "START GAME";
    startGameButton.addEventListener("click", () => {
      // Delete "Start Game" button
      startGameButton.remove();

      // Enable the computer board
      const computerGameboardGrid = getElement("computerGameboardGrid");
      computerGameboardGrid.classList.remove("blocked");

      // Change instructions text
      const instructions = document.querySelector(".instructions");
      instructions.textContent = "Click on a cell to attack";

      // Change computer info text
      const computerInfo = document.querySelector(".computerInfo");
      computerInfo.textContent = "Ladies first, please...";
    });
    const buttonsContainer = document.querySelector(".buttonsContainer");
    buttonsContainer.appendChild(startGameButton);
  }

  // Associates an event listener to "Random Placement" button
  function onRandomPlacementClick(callback) {
    const randomButton = document.querySelector("#randomButton");
    randomButton.addEventListener("click", () => {
      callback();
      // Delete the buttons from the instructions div
      const manualButton = getElement("manualButton");
      manualButton.remove();
      randomButton.remove();
      // Change instructions text
      const instructions = document.querySelector(".instructions");
      instructions.textContent = "All ships placed. Click on the button below to start the game";
      // Add class ".placed" to all user ships
      const userShips = document.querySelectorAll(".userShip");
      userShips.forEach(ship => {
        ship.classList.add("placed");
        ship.classList.remove("selected");
        ship.classList.remove("no-hover");
      });

      // Revert global variables to default values
      selectedShipName = "";
      selectedShipLength = 0;

      // Block user gameboard
      const userGameboardGrid = getElement("userGameboardGrid");
      userGameboardGrid.classList.add("blocked");

      // Show "Start Game" button
      showStartGameButton();
    });
  }

  // Loads the user gameboard
  function loadUserGameboard(gameboard) {
    const userBoardSquares = document.querySelectorAll("#userGameboardGrid .gameboardSquare");
    userBoardSquares.forEach((square, index) => {
      // If there is a ship on the square, add the "occupied" class to it
      if (gameboard[index] !== "Water") square.classList.add("occupied");
    });
  }

  // Loads initial UI screen
  function loadCoverMainUI(loadMainUICallback) {
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
    glowingButton.textContent = "PLAY";
    glowingButton.addEventListener("click", () => {
      deleteMainUI();
      loadMainUICallback();
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

  // Delete Event Listeners associated with user Ships placement (when yet placed)
  function deleteUserGameboardEventListeners() {
    // First remove the event listeners from the ships
    const userShips = document.querySelectorAll(".userShip");
    userShips.forEach(ship => {
      ship.removeEventListener("click", event => handleShipClick(ship, event));
    });

    // Then remove the event listeners from the gameboard squares
    const userBoardSquares = document.querySelectorAll("#userGameboardGrid .gameboardSquare");
    userBoardSquares.forEach(square => {
      square.removeEventListener("click", () => {});
      square.removeEventListener("mouseover", () => {});
      square.removeEventListener("mouseout", () => {});
    });
  }

  // Change background color of the squares passed as argument
  function updateUserGameboardShipPlacement(arrayOfSquares) {
    arrayOfSquares.forEach(square => {
      const userBoardSquare = document.querySelector(`[data-index="${square}"]`);
      userBoardSquare.classList.add("occupied");
    });
  }

  // Updates user shipyard when a ship is placed
  function updateUserShipyard(shipName) {
    const shipDiv = document.querySelector(`.${shipName}`);
    shipDiv.classList.add("placed");
    shipDiv.classList.remove("selected");

    // Update global variables
    selectedShipLength = 0;
    selectedShipName = "";
    placedShipsCounter += 1;

    // If all ships are placed,
    // show the "Start Game" button, 
    // update info and block user gameboard
    if (placedShipsCounter === 5) {
      // Block user gameboard
      const userGameboardGrid = getElement("userGameboardGrid");
      userGameboardGrid.classList.add("blocked");
      // Change instructions text
      const instructions = document.querySelector(".instructions");
      instructions.textContent = "All ships placed. Click on the button below to start the game";

      // Show "Start Game" button
      showStartGameButton();
    }
  }

  // Updates computer gameboard when an attack is made
  function updateComputerGameboard(squareNum, attackResult) {
    const computerBoardSquare = document.querySelector(`#computerGameboardGrid .gameboardSquare[data-index="${squareNum}"]`);
    if (attackResult === "Miss") {
      computerBoardSquare.classList.add("miss");
    } else if (attackResult === "ShipHit") {
      computerBoardSquare.classList.add("hit");
    }
  }

  // Updates computer shipyard when a ship is sunk
  function updateComputerShipyard(shipName) {
    const shipDiv = document.querySelector(`#computerStatusPanel .${shipName}`);
    shipDiv.classList.add("sunk");
  }
  return {
    createElement,
    getElement,
    loadCoverMainUI,
    onUserBoardClick,
    onRandomPlacementClick,
    loadUserGameboard,
    loadGameUI,
    deleteUserGameboardEventListeners,
    onManualPlacementClick,
    showUserInfo,
    updateUserGameboardShipPlacement,
    updateUserShipyard,
    onComputerBoardClick,
    showComputerInfo,
    updateComputerGameboard,
    updateComputerShipyard
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
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\n/* MY OWN STYLES FROM HERE */\n\n/* Fonts */\n\na:visited {\n    color: #fff;\n}\n\n#screen {\n    position: fixed; /* or \"absolute\" */\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: #fff;\n    display: flex;\n    flex-direction: column;\n    z-index: 0;\n}\n\n/* HEADER */\n\n#header {\n    height: 10%;\n    background-color: #474747;\n    display: flex;\n    border-bottom: solid 1px #000;\n    align-items: center;\n    justify-content: center;\n    z-index: 3;\n}\n\n.title {\n    font-size: 2em;\n    font-family: 'Bruno Ace';\n    color: #e8f901;\n}\n\n#main {\n    position: relative;\n    height: 80%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: rgb(255, 255, 255);\n}\n\n/* COVER */\n\n.glowing-button {\n    background-color: #4CAF50;\n    border: none;\n    border-radius: 20px;\n    color: white;\n    font-size: 3em;\n    padding: 20px 30px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    cursor: pointer;\n    transition: transform 0.5s;\n    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);\n}\n  \n.glowing-button:hover {\n    transform: scale(1.1);\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(76, 175, 80, 0.6);\n}\n\n@keyframes glowing2 {\n    0% {\n        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(76, 175, 80, 0.2);\n    }\n    50% {\n        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(76, 175, 80, 0.5);\n    }\n    100% {\n        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(76, 175, 80, 0.2);\n    }\n}\n\n.glowing-button {\n    animation: glowing2 2s infinite;\n}\n\n/* COVER SHIPS */\n\n#carrier-shape {\n    position: absolute;\n    width: 180px;\n    height: 60px;\n    top: 20%;\n    animation: move-right-left 10s linear infinite; /* adjust the time as needed */\n    z-index: 1;\n}\n\n@keyframes move-right-left {\n    0% { right: -100%; } /* Start from off the right of the screen */\n    100% { right: 100%; } /* End off the left of the screen */\n}\n\n#submarine-shape {\n    position: absolute;\n    width: 120px;\n    height: 60px;\n    left: 20%;\n    transform: rotate(90deg);\n    animation: move-top-down 10s linear infinite;\n    z-index: 1;\n}\n\n@keyframes move-top-down {\n    0% { top: -200px }\n    100% { top: 1500px}\n}\n\n#battleship-shape {\n    position: absolute;\n    width: 150px;\n    height: 60px;\n    top: 65%;\n    animation: move-left-right 10s linear infinite; /* adjust the time as needed */\n    z-index: 1;\n}\n\n@keyframes move-left-right {\n    0% { left: -100%; } /* Start from off the left of the screen */\n    100% { left: 100%; } /* End off the right of the screen */\n}\n\n#destroyer-shape {\n    position: absolute;\n    width: 120px;\n    height: 60px;\n    transform: rotate(270deg);\n    left: 80%;\n    animation: move-down-top 10s linear infinite;\n    z-index: 1;\n}\n\n@keyframes move-down-top {\n    0% { top: 1500px; }\n    100% { top: -200px; }\n}\n\n#patrol-shape {\n    position: absolute;\n    width: 90px;\n    height: 60px;\n    transform: rotate(180deg);\n    top: 90%;\n    animation: move-right-left 10s linear infinite;\n    z-index: 1;\n}\n\n/* MAIN - GAME */\n\n.playerSide {\n    width: 50%;\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    padding: 5%;\n    align-items: center;\n    justify-content: flex-start;\n    gap: 2em;\n    margin-top: 5em;\n}\n\n.gameHeader {\n    width: 440px;\n    font-size: 1.5em;\n    font-family: 'Bruno Ace';\n    color: #fff;\n    padding: 10px;\n    text-align: center;\n}\n\n#userGameHeader {\n    background-color: #FC1159;\n}\n\n#computerGameHeader{\n    background-color: #727D95;\n}\n\n.gameboardContainer {\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n}\n\n.xHeader {\n    display: flex;\n    flex-direction: row;\n    justify-content: left;\n    padding-left: 2.5em;\n}\n\n.xHeaderSquare {\n    width: 38px;\n    height: 38px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n}\n\n.bottomBoard {\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n}\n\n.yHeader {\n    display: flex;\n    flex-direction: column;\n}\n\n.yHeaderSquare {\n    width: 38px;\n    height: 38px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n}\n\n.yHeaderShipyard {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n    writing-mode: vertical-rl;\n    text-orientation: mixed;\n    rotate: 180deg;\n    margin-top: 1.8em;\n}\n\n.gridPanelContainer {\n    width: 380px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n\n.gameboardGrid {\n    width: 380px;\n    height: 380px;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n}\n\n#userGameboardGrid {\n    position: relative;\n    cursor: pointer;\n}\n\n#userGameboardGrid.blocked {\n    cursor: default;\n}\n\n.gameboardSquare {\n    width: 36px;\n    height: 36px;\n    border: solid 1px #fff;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n    cursor: inherit;\n    background-color: #a1dcff;\n}\n\n#userGameboardGrid .hover {\n    background-color: #999999;\n    opacity: 0.7;\n}\n\n#userGameboardGrid .occupied {\n    background-color: #999999;\n    opacity: 1;\n}\n\n#userGameboardGrid .hoverLimitsExceeded {\n    background-color: #c23434;\n}\n\n#computerGameboardGrid .gameboardSquare:hover {\n    background-color: #1b88e7;\n}\n\n#computerGameboardGrid.blocked .gameboardSquare:hover {\n    background-color: #a1dcff;\n    cursor: default;\n}\n\n.gameboardSquare.miss {\n    background-color: #c23434;\n}\n\n.gameboardSquare.miss:hover {\n    background-color: #c23434!important;\n}\n\n.gameboardSquare.hit {\n    background-color: #4CAF50;\n}\n\n.gameboardSquare.hit:hover {\n    background-color: #4CAF50!important;\n}\n\n/* SHIPYARD */\n\n.statusPanel {\n    width: 382px;\n    height: 78px;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    flex-wrap: wrap;\n    margin-top: 36px;\n    background-image: linear-gradient(rgba(0, 0, 0, 0.5) 2px, transparent 2px), linear-gradient(90deg, rgba(0, 0, 0, 0.5) 2px, transparent 2px);\n    background-size: 38px 38px;\n    gap: 2px;\n}\n\n.carrier {\n    width: 188px;\n    height: 36px;\n}\n\n.battleship {\n    width: 150px;\n    height: 36px;\n}\n\n.submarine {\n    width: 112px;\n    height: 36px;\n}\n\n.destroyer {\n    width: 112px;\n    height: 36px;\n}\n\n.boat {\n    width: 74px;\n    height: 36px;\n}\n\n.userShip {\n    cursor: pointer;\n    opacity: 0.7;\n}\n\n.userShip:hover {\n    opacity: 1;\n}\n\n.userShip.no-hover:hover {\n    opacity: 0.7;\n    cursor: default;\n}\n\n.userShip.selected {\n    opacity: 1;\n}\n\n.userShip.placed {\n    opacity: 1;\n    cursor: default;\n}\n\n.ship.sunk {\n    position: relative;\n}\n\n.ship.sunk::after {\n    content: \"\";\n    position: absolute;\n    top: 50%;\n    left: 0;\n    width: 100%;\n    height: 2px;\n    background: rgb(231, 9, 9);\n}\n\n@keyframes glowing {\n    0% { color: #FC1159; }\n    50% { color: #000; }\n    100% { color: #FC1159; }\n  }\n\n.instructions {\n    width: 100%;\n    font-family: 'Bruno Ace';\n    font-size: 0.8em;\n    line-height: 1.5em;\n    text-align: center;\n    display: flex;\n    flex-direction: column;\n    animation: glowing 1.5s linear infinite;\n}\n\n.buttonsContainer {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n    gap: 2em;\n}\n\n.placementButton {\n    width: 180px;\n    height: 50px;\n    border: solid 1px #fff;\n    background-color: #4CAF50;\n    color: #fff;\n    font-family: 'IBM Plex Mono', monospace;\n    font-size: 0.8em;\n    cursor: pointer;\n    border-radius: 10px;\n    padding: 1em;\n}\n\n.placementButton:hover {\n    background-color: #3e8e41;\n}\n\n#start-game-button {\n    width: 180px;\n    height: 50px;\n    border: solid 1px #fff;\n    background-color: #4CAF50;\n    color: #fff;\n    font-family: 'IBM Plex Mono', monospace;\n    font-size: 0.8em;\n    cursor: pointer;\n    border-radius: 10px;\n    padding: 1em;\n}\n\n#start-game-button:hover {\n    background-color: #3e8e41;\n}\n\n.computerInfo {\n    width: 100%;\n    font-family: 'Bruno Ace';\n    font-size: 0.8em;\n    line-height: 1.5em;\n    text-align: center;\n    display: flex;\n    flex-direction: column;\n}\n\n/* FOOTER */\n\n#footer {\n    height: 10%;\n    background-color: #474747;\n    display: flex;\n    border-top: solid 1px #000;\n    align-items: center;\n    justify-content: center;\n    z-index: 3;\n}\n\n.credits {\n    color: #fff;\n    font-family: 'IBM Plex Mono', monospace;\n    font-size: 0.8em;\n    text-align: center;\n}\n\n/* Style the link to remove default styling */\n.github-link {\n    display: inline-block;\n    text-decoration: none;\n    color: inherit;\n}\n\n/* Add the hover effect */\n.github-icon {\n    transition: transform 0.5s ease-in-out; /* Add a transition for the transform property */\n}\n\n.github-link:hover .github-icon {\n    transform: rotate(180deg); /* Rotate the icon 180 degrees when hovered */\n}", "",{"version":3,"sources":["webpack://./src/styles/index.css"],"names":[],"mappings":"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","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\n/* MY OWN STYLES FROM HERE */\n\n/* Fonts */\n\n@import url('https://fonts.googleapis.com/css2?family=Bruno+Ace&display=swap');\n@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap');\n\na:visited {\n    color: #fff;\n}\n\n#screen {\n    position: fixed; /* or \"absolute\" */\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: #fff;\n    display: flex;\n    flex-direction: column;\n    z-index: 0;\n}\n\n/* HEADER */\n\n#header {\n    height: 10%;\n    background-color: #474747;\n    display: flex;\n    border-bottom: solid 1px #000;\n    align-items: center;\n    justify-content: center;\n    z-index: 3;\n}\n\n.title {\n    font-size: 2em;\n    font-family: 'Bruno Ace';\n    color: #e8f901;\n}\n\n#main {\n    position: relative;\n    height: 80%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: rgb(255, 255, 255);\n}\n\n/* COVER */\n\n.glowing-button {\n    background-color: #4CAF50;\n    border: none;\n    border-radius: 20px;\n    color: white;\n    font-size: 3em;\n    padding: 20px 30px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    cursor: pointer;\n    transition: transform 0.5s;\n    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);\n}\n  \n.glowing-button:hover {\n    transform: scale(1.1);\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(76, 175, 80, 0.6);\n}\n\n@keyframes glowing2 {\n    0% {\n        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(76, 175, 80, 0.2);\n    }\n    50% {\n        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(76, 175, 80, 0.5);\n    }\n    100% {\n        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(76, 175, 80, 0.2);\n    }\n}\n\n.glowing-button {\n    animation: glowing2 2s infinite;\n}\n\n/* COVER SHIPS */\n\n#carrier-shape {\n    position: absolute;\n    width: 180px;\n    height: 60px;\n    top: 20%;\n    animation: move-right-left 10s linear infinite; /* adjust the time as needed */\n    z-index: 1;\n}\n\n@keyframes move-right-left {\n    0% { right: -100%; } /* Start from off the right of the screen */\n    100% { right: 100%; } /* End off the left of the screen */\n}\n\n#submarine-shape {\n    position: absolute;\n    width: 120px;\n    height: 60px;\n    left: 20%;\n    transform: rotate(90deg);\n    animation: move-top-down 10s linear infinite;\n    z-index: 1;\n}\n\n@keyframes move-top-down {\n    0% { top: -200px }\n    100% { top: 1500px}\n}\n\n#battleship-shape {\n    position: absolute;\n    width: 150px;\n    height: 60px;\n    top: 65%;\n    animation: move-left-right 10s linear infinite; /* adjust the time as needed */\n    z-index: 1;\n}\n\n@keyframes move-left-right {\n    0% { left: -100%; } /* Start from off the left of the screen */\n    100% { left: 100%; } /* End off the right of the screen */\n}\n\n#destroyer-shape {\n    position: absolute;\n    width: 120px;\n    height: 60px;\n    transform: rotate(270deg);\n    left: 80%;\n    animation: move-down-top 10s linear infinite;\n    z-index: 1;\n}\n\n@keyframes move-down-top {\n    0% { top: 1500px; }\n    100% { top: -200px; }\n}\n\n#patrol-shape {\n    position: absolute;\n    width: 90px;\n    height: 60px;\n    transform: rotate(180deg);\n    top: 90%;\n    animation: move-right-left 10s linear infinite;\n    z-index: 1;\n}\n\n/* MAIN - GAME */\n\n.playerSide {\n    width: 50%;\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    padding: 5%;\n    align-items: center;\n    justify-content: flex-start;\n    gap: 2em;\n    margin-top: 5em;\n}\n\n.gameHeader {\n    width: 440px;\n    font-size: 1.5em;\n    font-family: 'Bruno Ace';\n    color: #fff;\n    padding: 10px;\n    text-align: center;\n}\n\n#userGameHeader {\n    background-color: #FC1159;\n}\n\n#computerGameHeader{\n    background-color: #727D95;\n}\n\n.gameboardContainer {\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n}\n\n.xHeader {\n    display: flex;\n    flex-direction: row;\n    justify-content: left;\n    padding-left: 2.5em;\n}\n\n.xHeaderSquare {\n    width: 38px;\n    height: 38px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n}\n\n.bottomBoard {\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n}\n\n.yHeader {\n    display: flex;\n    flex-direction: column;\n}\n\n.yHeaderSquare {\n    width: 38px;\n    height: 38px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n}\n\n.yHeaderShipyard {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n    writing-mode: vertical-rl;\n    text-orientation: mixed;\n    rotate: 180deg;\n    margin-top: 1.8em;\n}\n\n.gridPanelContainer {\n    width: 380px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n\n.gameboardGrid {\n    width: 380px;\n    height: 380px;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n}\n\n#userGameboardGrid {\n    position: relative;\n    cursor: pointer;\n}\n\n#userGameboardGrid.blocked {\n    cursor: default;\n}\n\n.gameboardSquare {\n    width: 36px;\n    height: 36px;\n    border: solid 1px #fff;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n    cursor: inherit;\n    background-color: #a1dcff;\n}\n\n#userGameboardGrid .hover {\n    background-color: #999999;\n    opacity: 0.7;\n}\n\n#userGameboardGrid .occupied {\n    background-color: #999999;\n    opacity: 1;\n}\n\n#userGameboardGrid .hoverLimitsExceeded {\n    background-color: #c23434;\n}\n\n#computerGameboardGrid .gameboardSquare:hover {\n    background-color: #1b88e7;\n}\n\n#computerGameboardGrid.blocked .gameboardSquare:hover {\n    background-color: #a1dcff;\n    cursor: default;\n}\n\n.gameboardSquare.miss {\n    background-color: #c23434;\n}\n\n.gameboardSquare.miss:hover {\n    background-color: #c23434!important;\n}\n\n.gameboardSquare.hit {\n    background-color: #4CAF50;\n}\n\n.gameboardSquare.hit:hover {\n    background-color: #4CAF50!important;\n}\n\n/* SHIPYARD */\n\n.statusPanel {\n    width: 382px;\n    height: 78px;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    flex-wrap: wrap;\n    margin-top: 36px;\n    background-image: linear-gradient(rgba(0, 0, 0, 0.5) 2px, transparent 2px), linear-gradient(90deg, rgba(0, 0, 0, 0.5) 2px, transparent 2px);\n    background-size: 38px 38px;\n    gap: 2px;\n}\n\n.carrier {\n    width: 188px;\n    height: 36px;\n}\n\n.battleship {\n    width: 150px;\n    height: 36px;\n}\n\n.submarine {\n    width: 112px;\n    height: 36px;\n}\n\n.destroyer {\n    width: 112px;\n    height: 36px;\n}\n\n.boat {\n    width: 74px;\n    height: 36px;\n}\n\n.userShip {\n    cursor: pointer;\n    opacity: 0.7;\n}\n\n.userShip:hover {\n    opacity: 1;\n}\n\n.userShip.no-hover:hover {\n    opacity: 0.7;\n    cursor: default;\n}\n\n.userShip.selected {\n    opacity: 1;\n}\n\n.userShip.placed {\n    opacity: 1;\n    cursor: default;\n}\n\n.ship.sunk {\n    position: relative;\n}\n\n.ship.sunk::after {\n    content: \"\";\n    position: absolute;\n    top: 50%;\n    left: 0;\n    width: 100%;\n    height: 2px;\n    background: rgb(231, 9, 9);\n}\n\n@keyframes glowing {\n    0% { color: #FC1159; }\n    50% { color: #000; }\n    100% { color: #FC1159; }\n  }\n\n.instructions {\n    width: 100%;\n    font-family: 'Bruno Ace';\n    font-size: 0.8em;\n    line-height: 1.5em;\n    text-align: center;\n    display: flex;\n    flex-direction: column;\n    animation: glowing 1.5s linear infinite;\n}\n\n.buttonsContainer {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n    gap: 2em;\n}\n\n.placementButton {\n    width: 180px;\n    height: 50px;\n    border: solid 1px #fff;\n    background-color: #4CAF50;\n    color: #fff;\n    font-family: 'IBM Plex Mono', monospace;\n    font-size: 0.8em;\n    cursor: pointer;\n    border-radius: 10px;\n    padding: 1em;\n}\n\n.placementButton:hover {\n    background-color: #3e8e41;\n}\n\n#start-game-button {\n    width: 180px;\n    height: 50px;\n    border: solid 1px #fff;\n    background-color: #4CAF50;\n    color: #fff;\n    font-family: 'IBM Plex Mono', monospace;\n    font-size: 0.8em;\n    cursor: pointer;\n    border-radius: 10px;\n    padding: 1em;\n}\n\n#start-game-button:hover {\n    background-color: #3e8e41;\n}\n\n.computerInfo {\n    width: 100%;\n    font-family: 'Bruno Ace';\n    font-size: 0.8em;\n    line-height: 1.5em;\n    text-align: center;\n    display: flex;\n    flex-direction: column;\n}\n\n/* FOOTER */\n\n#footer {\n    height: 10%;\n    background-color: #474747;\n    display: flex;\n    border-top: solid 1px #000;\n    align-items: center;\n    justify-content: center;\n    z-index: 3;\n}\n\n.credits {\n    color: #fff;\n    font-family: 'IBM Plex Mono', monospace;\n    font-size: 0.8em;\n    text-align: center;\n}\n\n/* Style the link to remove default styling */\n.github-link {\n    display: inline-block;\n    text-decoration: none;\n    color: inherit;\n}\n\n/* Add the hover effect */\n.github-icon {\n    transition: transform 0.5s ease-in-out; /* Add a transition for the transform property */\n}\n\n.github-link:hover .github-icon {\n    transform: rotate(180deg); /* Rotate the icon 180 degrees when hovered */\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxXQUFXLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksV0FBVyxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sV0FBVyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSyxVQUFVLFVBQVUsT0FBTyxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSyxVQUFVLFVBQVUsT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxvQkFBb0IscUJBQXFCLHFCQUFxQixPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsV0FBVyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FB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Q0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy92aWV3LmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvYXNzZXRzL2dyYXBoaWNzL2JhdHRsZXNoaXAuc3ZnIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2Fzc2V0cy9ncmFwaGljcy9jYXJyaWVyLnN2ZyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9hc3NldHMvZ3JhcGhpY3MvZGVzdHJveWVyLnN2ZyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9hc3NldHMvZ3JhcGhpY3MvcGF0cm9sLWJvYXQuc3ZnIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2Fzc2V0cy9ncmFwaGljcy9zdWJtYXJpbmUuc3ZnIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9pbmRleC5jc3M/NjM0OSIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEZhY3RvcnkgcmVwcmVzZW50aW5nIGEgZ2FtZSBib2FyZCBpbiB0aGUgZ2FtZVxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuXG4gICAgY29uc3QgX2JvYXJkID0gQXJyYXkoMTAwKS5maWxsKFwiV2F0ZXJcIikgLy8gQXJyYXkgb2YgMTAwIHNxdWFyZXMgcmVwcmVzZW50aW5nIHRoZSBnYW1lIGJvYXJkXG4gICAgY29uc3QgX3NoaXBzID0gW10gLy8gQXJyYXkgb2Ygc2hpcHMgb24gdGhlIGJvYXJkXG4gICAgbGV0IF9nYW1lb3ZlciA9IGZhbHNlXG5cbiAgICAvLyBHZXQgdGhlIGJvYXJkIGFycmF5XG4gICAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBfYm9hcmRcbiAgICBcbiAgICAvLyBHZXQgdGhlIHNoaXBzIGFycmF5XG4gICAgY29uc3QgZ2V0U2hpcHMgPSAoKSA9PiBfc2hpcHNcblxuICAgIC8vIEdldCBpZiB0aGUgZ2FtZSBpcyBvdmVyXG4gICAgY29uc3QgZ2V0R2FtZU92ZXIgPSAoKSA9PiBfZ2FtZW92ZXJcblxuICAgIC8vIFNldCBHYW1lIE92ZXJcbiAgICBjb25zdCBzZXRHYW1lT3ZlciA9ICgpID0+IHtcbiAgICAgICAgX2dhbWVvdmVyID0gdHJ1ZVxuICAgIH1cblxuICAgIC8vIEdldCBhIFNxdWFyZVxuICAgIGNvbnN0IGdldFNxdWFyZSA9IChzcXVhcmUpID0+IF9ib2FyZFtzcXVhcmVdXG5cbiAgICAvLyBTZXQgYSBTcXVhcmVcbiAgICBjb25zdCBzZXRTcXVhcmUgPSAobnVtLHZhbHVlKSA9PiB7XG4gICAgICAgIF9ib2FyZFtudW1dID0gdmFsdWVcbiAgICB9XG5cbiAgICAvLyBTZXQgYSBzaGlwIGluIHRoZSBhcnJheSBvZiBzaGlwc1xuICAgIGNvbnN0IHNldFNoaXAgPSAoc2hpcCkgPT4gZ2V0U2hpcHMoKS5wdXNoKHNoaXApXG5cbiAgICAvLyBSZXR1cm4gdHJ1ZSBpZiB0d28gc3F1YXJlcyBhcmUgaW4gdGhlIHNhbWUgbGluZSBpbiB0aGUgYm9hcmRcbiAgICBjb25zdCBpc1NhbWVMaW5lID0gKHgseSkgPT4gTWF0aC5mbG9vcih4IC8gMTApID09PSBNYXRoLmZsb29yKHkgLyAxMClcblxuICAgIC8vIFJldHVybiB0cnVlIGlmIG5leHQgc3F1YXJlIGlzIGluIHRoZSBzYW1lIGxpbmUgb3IgY29sdW1uIHRoYXQgcHJldmlvdXMgb25lXG4gICAgY29uc3QgaXNWYWxpZE5leHRTcXVhcmUgPSAoY3VycmVudCxuZXh0LGRpcmVjdGlvbikgPT4gXG4gICAgICAgIGRpcmVjdGlvbiA9PT0gXCJ4XCIgPyBpc1NhbWVMaW5lKG5leHQsIGN1cnJlbnQpIDogbmV4dCA8PSA5OVxuXG4gICAgLy8gUmV0dXJuIHRydWUgaWYgYSBzcXVhcmUgaXMgZW1wdHkgKG5vIG90aGVyIHNoaXAgaXMgcGxhY2VkIHRoZXJlKVxuICAgIGNvbnN0IGlzRW1wdHlTcXVhcmUgPSAoc3F1YXJlKSA9PiBcbiAgICAgICAgZ2V0U3F1YXJlKHNxdWFyZSkgPT09IFwiV2F0ZXJcIlxuXG4gICAgLy8gR2V0cyBuZXh0IHBvc2l0aW9uIGluIHRoZSBib2FyZCBkZXBlbmRpbmcgb24gc2hpcCBkaXJlY3Rpb24gcGxhY2VtZW50XG4gICAgY29uc3QgZ2V0TmV4dFBvc2l0aW9uID0gKGN1cnJlbnRQb3MsZGlyZWN0aW9uKSA9PiBcbiAgICAgICAgZGlyZWN0aW9uID09PSBcInhcIiA/IGN1cnJlbnRQb3MgKyAxIDogY3VycmVudFBvcyArIDEwXG5cbiAgICAvLyBQbGFjZXMgYSBzaGlwXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXAsc3RhcnRQb3MsZGlyZWN0aW9uKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBsZXQgbmV4dFBvcyA9IHN0YXJ0UG9zXG4gICAgICAgIGNvbnN0IHZhbGlkUG9zQXJyYXkgPSBbXVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHNoaXAuZ2V0TGVuZ3RoKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBUZXN0IGlmIHRoZSBuZXh0IHBvc2l0aW9uIGlzIHZhbGlkXG4gICAgICAgICAgICBpZiAoIWlzVmFsaWROZXh0U3F1YXJlKHN0YXJ0UG9zLG5leHRQb3MsZGlyZWN0aW9uKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBcIllvdSBhcmUgZXhjZWVkaW5nIHRoZSBsaW1pdHMgb2YgdGhlIGJvYXJkXCIgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUZXN0IGlmIHRoYXQgc3F1YXJlIGlzIGVtcHR5IChubyBvdGhlciBzaGlwIHBsYWNlZCB0aGVyZSlcbiAgICAgICAgICAgIGlmICghaXNFbXB0eVNxdWFyZShuZXh0UG9zKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBcIlRoYXQgc3F1YXJlIGlzIG5vdCBlbXB0eVwiIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gSW5zZXJ0IHRoZSB2YWxpZCBwb3NpdGlvbiBpbnRvIG91ciB0ZW1wIGFycmF5XG4gICAgICAgICAgICB2YWxpZFBvc0FycmF5LnB1c2gobmV4dFBvcylcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gVXBkYXRlIHBvc2l0aW9uXG4gICAgICAgICAgICBuZXh0UG9zID0gZ2V0TmV4dFBvc2l0aW9uKG5leHRQb3MsZGlyZWN0aW9uKVxuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXQgc3F1YXJlIHN0cmluZyB0byBzaGlwIG5hbWUgZm9yIGVhY2ggdmFsdWUgaW4gdGhlIHRlbXAgYXJyYXlcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWxpZFBvc0FycmF5Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBzZXRTcXVhcmUodmFsaWRQb3NBcnJheVtpXSxzaGlwLmdldE5hbWUoKSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFBsYWNlIHRoZSBzaGlwIGluIHRoZSBhcnJheSBvZiBzaGlwc1xuICAgICAgICBzZXRTaGlwKHNoaXApXG5cbiAgICAgICAgLy8gUmV0dXJuIGEgc3VjY2VzcyBtZXNzYWdlIGFuZCB0aGUgYXJyYXkgb2YgdmFsaWQgcG9zaXRpb25zXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiB2YWxpZFBvc0FycmF5LFxuICAgICAgICAgICAgc3VjY2VzczogYEEgJHtzaGlwLmdldE5hbWUoKX0gaGFzIGJlZW4gcGxhY2VkYFxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvLyBGaW5kIGFuZCByZXR1cm4gYSBTaGlwIGluIHRoZSBib2FyZFxuICAgIGNvbnN0IGZpbmRTaGlwID0gKHNoaXBOYW1lKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzaGlwID0gZ2V0U2hpcHMoKS5maW5kKHMgPT4gcy5nZXROYW1lKCkgPT09IHNoaXBOYW1lKVxuICAgICAgICBcbiAgICAgICAgLy8gSWYgbm8gc2hpcCBmb3VuZCwgcmV0dXJucyBhbiBlcnJvclxuICAgICAgICBpZiAoIXNoaXApIHtcbiAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBcIk5vIHNoaXAgZm91bmQgd2l0aCB0aGF0IG5hbWVcIiB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2hpcFxuXG4gICAgfVxuXG4gICAgLy8gQ2hlY2tzIGlmIHRoZSBnYW1lIGlzIG92ZXJcbiAgICBjb25zdCBjaGVja0dhbWVPdmVyID0gKCkgPT4ge1xuICAgICAgICBpZiAoZ2V0U2hpcHMoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHNldEdhbWVPdmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEZWxldGUgYSBzaGlwIGZyb20gdGhlIHNoaXBzIGFycmF5XG4gICAgY29uc3QgZGVsZXRlU2hpcCA9IChzaGlwTmFtZSkgPT4ge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgaW5kZXggPSBnZXRTaGlwcygpLmZpbmRJbmRleChzID0+IHMuZ2V0TmFtZSgpID09PSBzaGlwTmFtZSlcblxuICAgICAgICAvLyBJZiBubyBzaGlwIGZvdW5kLCByZXR1cm5zIGFuIGVycm9yXG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBcIlRoZXJlIGlzIG5vIHNoaXAgd2l0aCB0aGF0IG5hbWUgdG8gZGVsZXRlXCIgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBnZXRTaGlwcygpLnNwbGljZShpbmRleCwxKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgZ2FtZSBpcyBvdmVyXG4gICAgICAgIGNoZWNrR2FtZU92ZXIoKVxuXG4gICAgICAgIC8vIFJldHVybiBhIHN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBgU2hpcCBuYW1lZCBcIiR7c2hpcE5hbWV9XCIgaGFzIGJlZW4gZGVsZXRlZGAgfVxuXG4gICAgfVxuXG4gICAgLy8gdGFrZXMgYSBzcXVhcmUgbnVtYmVyLCBkZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRoZSBhdHRhY2sgaGl0IGEgc2hpcCBhbmQgdGhlbiBcbiAgICAvLyBzZW5kcyB0aGUg4oCYaGl04oCZIGZ1bmN0aW9uIHRvIHRoZSBjb3JyZWN0IHNoaXAsIG9yIHJlY29yZHMgdGhlIGNvb3JkaW5hdGVzIFxuICAgIC8vIG9mIHRoZSBtaXNzZWQgc2hvdFxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoc3F1YXJlTnVtYmVyKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzcXVhcmUgPSBnZXRTcXVhcmUoc3F1YXJlTnVtYmVyKVxuICAgICAgICBjb25zdCByZXN1bHQgPSB7dHlwZTogXCJcIiwgc3VjY2VzczogXCJcIiwgZXJyb3I6IFwiXCIsIHN1bms6IFwiXCIsIGdhbWVvdmVyOiBmYWxzZX1cblxuICAgICAgICAvLyBBdHRhY2sgZmFpbHNcbiAgICAgICAgaWYgKHNxdWFyZSA9PT0gXCJXYXRlclwiKSB7XG4gICAgICAgICAgICByZXN1bHQudHlwZSA9IFwiTWlzc1wiXG4gICAgICAgICAgICBzZXRTcXVhcmUoc3F1YXJlTnVtYmVyLHJlc3VsdC50eXBlKVxuICAgICAgICAgICAgcmVzdWx0LnN1Y2Nlc3MgPSBcIkhhaGFoYSEgQmV0dGVyIGx1Y2sgbmV4dCB0aW1lIVwiXG4gICAgICAgIH0gZWxzZSBpZiAoc3F1YXJlID09PSBcIk1pc3NcIiB8fCBzcXVhcmUgPT09IFwiU2hpcEhpdFwiKSB7IC8vIEludmFsaWQgYXR0YWNrIHJlY2VpdmVkXG4gICAgICAgICAgICByZXN1bHQuZXJyb3IgPSBcIlRoaXMgc3F1YXJlIHdhcyBhbHJlYWR5IGF0dGFja2VkIVwiXG4gICAgICAgIH0gZWxzZSB7IC8vIEF0dGFjayBoaXRzXG4gICAgICAgICAgICBjb25zdCBkYW1hZ2VkU2hpcCA9IGZpbmRTaGlwKHNxdWFyZSlcbiAgICAgICAgICAgIHJlc3VsdC50eXBlID0gXCJTaGlwSGl0XCJcbiAgICAgICAgICAgIHNldFNxdWFyZShzcXVhcmVOdW1iZXIscmVzdWx0LnR5cGUpXG4gICAgICAgICAgICBkYW1hZ2VkU2hpcC5oaXQoKVxuICAgICAgICAgICAgcmVzdWx0LnN1Y2Nlc3MgPSBcIkFyZ2doISBZb3UgaGl0IG15IHNoaXAhXCJcblxuICAgICAgICAgICAgLy8gTmVlZCB0byB0ZXN0IGlmIHNoaXAgaXMgc3Vua1xuICAgICAgICAgICAgaWYgKGRhbWFnZWRTaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmVzdWx0LnN1bmsgPSBkYW1hZ2VkU2hpcC5nZXROYW1lKClcbiAgICAgICAgICAgICAgICBkZWxldGVTaGlwKGRhbWFnZWRTaGlwLmdldE5hbWUoKSlcbiAgICAgICAgICAgICAgICBjaGVja0dhbWVPdmVyKClcblxuICAgICAgICAgICAgICAgIC8vIElmIGdhbWUgaXMgb3ZlciwgcmV0dXJuIHRoYXQgaW4gdGhlIHJlc3VsdFxuICAgICAgICAgICAgICAgIGlmIChnZXRHYW1lT3ZlcigpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5nYW1lb3ZlciA9IHRydWVcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0R2FtZU92ZXIsXG4gICAgICAgIGdldFNxdWFyZSxcbiAgICAgICAgcGxhY2VTaGlwLFxuICAgICAgICBmaW5kU2hpcCxcbiAgICAgICAgcmVjZWl2ZUF0dGFjayxcbiAgICAgICAgZ2V0U2hpcHMsXG4gICAgICAgIGdldEJvYXJkXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZCIsImltcG9ydCBcIi4vc3R5bGVzL2luZGV4LmNzc1wiXG5pbXBvcnQgeyB2aWV3IH0gZnJvbSBcIi4vdmlld1wiXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiXG5cbi8vIEZ1bmN0aW9uIHRvIGxvYWQgdGhlIG1haW4gVUlcbmZ1bmN0aW9uIGxvYWRNYWluVUkoKSB7XG4gICAgXG4gICAgLy8gTG9hZCB0aGUgbWFpbiBVSVxuICAgIHZpZXcubG9hZEdhbWVVSSgpXG5cbiAgICBjb25zdCB1c2VyID0gUGxheWVyKFwiSHVtYW5cIilcbiAgICBjb25zdCBjb21wdXRlciA9IFBsYXllcihcIkFJXCIpXG5cbiAgICAvLyBQbGFjZSBjb21wdXRlciBzaGlwc1xuICAgIGNvbXB1dGVyLnBsYWNlU2hpcHNSYW5kb21seSgpXG5cbiAgICAvLyBNYW5hZ2UgbWFudWFsIHBsYWNlbWVudCBidXR0b25cbiAgICB2aWV3Lm9uTWFudWFsUGxhY2VtZW50Q2xpY2soKVxuXG4gICAgLy8gTWFuYWdlIHJhbmRvbSBwbGFjZW1lbnQgYnV0dG9uXG4gICAgdmlldy5vblJhbmRvbVBsYWNlbWVudENsaWNrKCAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICB1c2VyLnBsYWNlU2hpcHNSYW5kb21seSgpIC8vIFBsYWNlIHVzZXIgc2hpcHMgcmFuZG9tbHlcbiAgICAgICAgdmlldy5sb2FkVXNlckdhbWVib2FyZCh1c2VyLmdldEdhbWVCb2FyZCgpLmdldEJvYXJkKCkpIC8vIExvYWQgdXNlciBib2FyZFxuICAgICAgICAvLyBEZWxldGUgRXZlbnQgTGlzdGVuZXJzIGFzc29jaWF0ZWQgd2l0aCB1c2VyIGdhbWVib2FyZFxuICAgICAgICB2aWV3LmRlbGV0ZVVzZXJHYW1lYm9hcmRFdmVudExpc3RlbmVycygpXG4gICAgICAgIC8vIHZpZXcubG9hZFVzZXJTaGlwc0luZm8odXNlci5nZXRTaGlwcygpKVxuXG4gICAgfSlcblxuICAgIC8vIFdhaXQgZm9yIHVzZXIgdG8gY2xpY2sgb24gYSBzcXVhcmVcbiAgICB2aWV3Lm9uVXNlckJvYXJkQ2xpY2soIChzcXVhcmVOdW0sIHNoaXBOYW1lLCBvcmllbnRhdGlvbikgPT4ge1xuICAgICAgICBcbiAgICAgICAgLy8gUGxhY2UgdXNlciBzaGlwXG4gICAgICAgIGNvbnN0IHJlcyA9IHVzZXIucGxhY2VTaGlwKHNxdWFyZU51bSwgc2hpcE5hbWUsIG9yaWVudGF0aW9uKVxuXG4gICAgICAgIC8vIGlmIFwicGxhY2VTaGlwIHJldHVybnMgYW4gZXJyb3IsIHNob3cgaXRcIlxuICAgICAgICBpZiAocmVzLmVycm9yKSB7XG4gICAgICAgICAgICB2aWV3LnNob3dVc2VySW5mbyhyZXMuZXJyb3IpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2aWV3LnNob3dVc2VySW5mbyhyZXMuc3VjY2VzcykgLy8gU2hvdyBzdWNjZXNzIG1lc3NhZ2VcbiAgICAgICAgICAgIHZpZXcudXBkYXRlVXNlckdhbWVib2FyZFNoaXBQbGFjZW1lbnQocmVzLnNxdWFyZXMpIC8vIFVwZGF0ZSB1c2VyIGJvYXJkXG4gICAgICAgICAgICB2aWV3LnVwZGF0ZVVzZXJTaGlweWFyZChzaGlwTmFtZSkgLy8gVXBkYXRlIHVzZXIgc2hpcHlhcmRcbiAgICAgICAgfVxuXG4gICAgfSlcblxuICAgIC8vIFdhaXQgZm9yIHVzZXIgdG8gY2xpY2sgb24gYSBzcXVhcmUgdG8gYXR0YWNrXG4gICAgdmlldy5vbkNvbXB1dGVyQm9hcmRDbGljayggKHNxdWFyZU51bSkgPT4ge1xuXG4gICAgICAgIC8vIEF0dGFjayB0aGUgc3F1YXJlXG4gICAgICAgIGNvbnN0IHJlcyA9IHVzZXIubWFudWFsQXR0YWNrKHNxdWFyZU51bSlcblxuICAgICAgICAvLyBJZiBcIm1hbnVhbEF0dGFja1wiIHJldHVybnMgYW4gZXJyb3IsIHNob3cgaXRcbiAgICAgICAgaWYgKHJlcy5lcnJvcikge1xuICAgICAgICAgICAgdmlldy5zaG93VXNlckluZm8ocmVzLmVycm9yKVxuICAgICAgICAgICAgdmlldy5zaG93Q29tcHV0ZXJJbmZvKFwiXCIpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGF0dGFja1JlcyA9IGNvbXB1dGVyLmdldEdhbWVCb2FyZCgpLnJlY2VpdmVBdHRhY2soc3F1YXJlTnVtKSAvLyBBdHRhY2sgY29tcHV0ZXIgYm9hcmRcblxuICAgICAgICAgICAgLy8gSWYgXCJyZWNlaXZlQXR0YWNrXCIgcmV0dXJucyBhbiBlcnJvciwgc2hvdyBpdFxuICAgICAgICAgICAgaWYgKGF0dGFja1Jlcy5lcnJvcikge1xuXG4gICAgICAgICAgICAgICAgdmlldy5zaG93VXNlckluZm8oYXR0YWNrUmVzLmVycm9yKVxuICAgICAgICAgICAgICAgIHZpZXcuc2hvd0NvbXB1dGVySW5mbyhcIlwiKVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHsgLy8gSWYgbm90LCByZWFkIHRoZSByZXN1bHRcblxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBhdHRhY2sgd2FzIGEgaGl0LCBzaG93IGl0XG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja1Jlcy50eXBlID09PSBcIlNoaXBIaXRcIikge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmlldy5zaG93VXNlckluZm8oXCJZb3UgaGl0IGEgc2hpcCFcIilcbiAgICAgICAgICAgICAgICAgICAgdmlldy5zaG93Q29tcHV0ZXJJbmZvKGF0dGFja1Jlcy5zdWNjZXNzKVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzaGlwIHdhcyBzdW5rLCBzaG93IGl0XG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRhY2tSZXMuc3VuayAhPT0gXCJcIikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LnNob3dVc2VySW5mbyhcIllvdSBzdW5rIGEgc2hpcCFcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcuc2hvd0NvbXB1dGVySW5mbyhgT2ggbm8hIG15ICR7YXR0YWNrUmVzLnN1bmt9IWApXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LnVwZGF0ZUNvbXB1dGVyU2hpcHlhcmQoYXR0YWNrUmVzLnN1bmspXG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGF0dGFja1Jlcy50eXBlID09PSBcIk1pc3NcIikgeyAvLyBJZiBub3QsIHNob3cgYSBtaXNzXG5cbiAgICAgICAgICAgICAgICAgICAgdmlldy5zaG93VXNlckluZm8oXCJZb3UgbWlzc2VkIVwiKVxuICAgICAgICAgICAgICAgICAgICB2aWV3LnNob3dDb21wdXRlckluZm8oYXR0YWNrUmVzLnN1Y2Nlc3MpXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgY29tcHV0ZXIgYm9hcmRcbiAgICAgICAgICAgICAgICB2aWV3LnVwZGF0ZUNvbXB1dGVyR2FtZWJvYXJkKHNxdWFyZU51bSwgYXR0YWNrUmVzLnR5cGUpXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ29tcHV0ZXIgYXR0YWNrc1xuICAgICAgICAvLyBjb25zdCBzcXVhcmUgPSBjb21wdXRlci5nZW5lcmF0ZUF1dG9BdHRhY2soKVxuXG4gICAgfSlcblxufVxuXG4vLyBDcmVhdGUgdGhlIGludGVyZmFjZSBhbmQgcGxheWVyIG9iamVjdHNcbnZpZXcubG9hZENvdmVyTWFpblVJKGxvYWRNYWluVUkpIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiXG5cbi8vIEZhY3RvcnkgcmVwcmVzZW50aW5nIGEgcGxheWVyIGluIHRoZSBnYW1lXG5jb25zdCBQbGF5ZXIgPSAodHlwZSkgPT4ge1xuXG4gICAgY29uc3QgX2dhbWVCb2FyZCA9IEdhbWVib2FyZCgpIC8vIEVhY2ggcGxheWVyIGhhcyBhIGdhbWUgYm9hcmRcbiAgICBjb25zdCBfdHlwZSA9IHR5cGUgLy8gUG9zc2libGUgdmFsdWVzOiBcIkh1bWFuXCIgb3IgXCJBSVwiXG4gICAgY29uc3QgX3NoaXBzID0gW1NoaXAoXCJjYXJyaWVyXCIpLFNoaXAoXCJiYXR0bGVzaGlwXCIpLFNoaXAoXCJkZXN0cm95ZXJcIiksU2hpcChcInN1Ym1hcmluZVwiKSxTaGlwKFwiYm9hdFwiKV0gLy8gQXJyYXkgb2Ygc2hpcHMgYSBwbGF5ZXIgaXMgcHJvdmlkZWQgd2l0aFxuICAgIGNvbnN0IF9hdmFpbGFibGVBdHRhY2tzID0gQXJyYXkuZnJvbSh7bGVuZ3RoOiAxMDB9LCAoXywgaW5kZXgpID0+IGluZGV4KSAvLyBDcmVhdGVzIGFuIGFycmF5IGZyb20gMCB0byA5OVxuXG4gICAgLy8gR2V0cyB0aGUgZ2FtZSBib2FyZFxuICAgIGNvbnN0IGdldEdhbWVCb2FyZCA9ICgpID0+IF9nYW1lQm9hcmRcbiAgICBcbiAgICAvLyBHZXRzIHRoZSBwbGF5ZXIgdHlwZVxuICAgIGNvbnN0IGdldFBsYXllclR5cGUgPSAoKSA9PiBfdHlwZVxuXG4gICAgLy8gR2V0cyB0aGUgcGxheWVyIHNoaXBzIGFycmF5XG4gICAgY29uc3QgZ2V0U2hpcHMgPSAoKSA9PiBfc2hpcHNcblxuICAgIC8vIEdldHMgc2hpcCBhdCBwb3NpdGlvbiBpbiB0aGUgYXJyYXkgb2YgcGxheWVyJ3Mgc2hpcHNcbiAgICBjb25zdCBnZXRTaGlwQXRQb3MgPSAocG9zKSA9PiBfc2hpcHNbcG9zXVxuXG4gICAgLy8gUmVjZWl2ZXMgYSBuYW1lIGFuZCByZXR1cm5zIHRoZSBzaGlwIHdpdGggdGhhdCBuYW1lIG9yIG51bGwgaWYgaXQgZG9lc24ndCBleGlzdFxuICAgIGNvbnN0IGdldFNoaXBCeU5hbWUgPSAobmFtZSkgPT4ge1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfc2hpcHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlmIChfc2hpcHNbaV0uZ2V0TmFtZSgpID09PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9zaGlwc1tpXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIFxuICAgIH1cblxuICAgIC8vIFJlY2VpdmVzIGEgc2hpcCBuYW1lIGFuZCBkZWxldGVzIGl0IGZyb20gdGhlIHBsYXllcidzIHNoaXBzIGFycmF5XG4gICAgY29uc3QgZGVsZXRlU2hpcEJ5TmFtZSA9IChuYW1lKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9zaGlwcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgaWYgKF9zaGlwc1tpXS5nZXROYW1lKCkgPT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICBfc2hpcHMuc3BsaWNlKGksIDEpXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8gR2V0cyB0aGUgYXR0YWNrcyBhcnJheVxuICAgIGNvbnN0IGdldEF2YWlsYWJsZUF0dGFja3MgPSAoKSA9PiBfYXZhaWxhYmxlQXR0YWNrc1xuXG4gICAgLy8gR2V0cyB0aGUgc3F1YXJlIGF0ICdwb3MnIGluIHRoZSAnX2F2YWlsYWJsZUF0dGFja3MnIGFycmF5XG4gICAgY29uc3QgZ2V0QXR0YWNrQXRQb3MgPSAocG9zKSA9PiBfYXZhaWxhYmxlQXR0YWNrc1twb3NdXG5cbiAgICAvLyBHZXRzIGluZGV4IG9mIGEgc3F1YXJlIGluIHRoZSAnX2F2YWlsYWJsZUF0dGFja3MnIGFycmF5XG4gICAgY29uc3QgZ2V0SW5kZXhPZkF0dGFjayA9IChzcXVhcmUpID0+IF9hdmFpbGFibGVBdHRhY2tzLmluZGV4T2Yoc3F1YXJlKVxuXG4gICAgLy8gUmVjZWl2ZXMgYSBzcXVhcmUgaW4gcmV0dXJucyB0cnVlIGlmIHRoYXQgc3F1YXJlIGhhc24ndCBiZWVuIGF0dGFja2VkIHlldFxuICAgIGNvbnN0IGlzVmFsaWRBdHRhY2sgPSAoc3F1YXJlKSA9PiBnZXRBdmFpbGFibGVBdHRhY2tzKCkuaW5jbHVkZXMoc3F1YXJlKVxuXG4gICAgLy8gR2V0cyBhIHJhbmRvbSB2YWx1ZSBcInhcIiBvciBcInlcIiBmb3IgdGhlIG9yaWVudGF0aW9uIG9mIGEgc2hpcFxuICAgIGNvbnN0IGdldFJhbmRvbURpcmVjdGlvbiA9ICgpID0+IChNYXRoLnJhbmRvbSgpIDwgMC41ID8gXCJ4XCIgOiBcInlcIilcblxuICAgIC8vIFJhbmRvbWx5IHNodWZmbGVzIGFuIGFycmF5IFxuICAgIGNvbnN0IHNodWZmbGVBcnJheSA9IChhcnJheSkgPT4ge1xuICAgICAgICBjb25zdCBzaHVmZmxlZEFycmF5ID0gWy4uLmFycmF5XTtcbiAgICAgICAgZm9yIChsZXQgaSA9IHNodWZmbGVkQXJyYXkubGVuZ3RoIC0gMTsgaSA+IDA7IGkgLT0gMSkge1xuICAgICAgICAgICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgICAgICAgICAgW3NodWZmbGVkQXJyYXlbaV0sIHNodWZmbGVkQXJyYXlbal1dID0gW3NodWZmbGVkQXJyYXlbal0sIHNodWZmbGVkQXJyYXlbaV1dXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNodWZmbGVkQXJyYXlcbiAgICB9XG4gICAgXG4gICAgLy8gUGxhY2VzIHNoaXBzIHJhbmRvbWx5IG9uIHRoZSBnYW1lIGJvYXJkXG4gICAgY29uc3QgcGxhY2VTaGlwc1JhbmRvbWx5ID0gKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgIC8vIENyZWF0ZXMgYW4gb3JkZXJlZCBhcnJheSAwIHRvIDk5XG4gICAgICAgIGNvbnN0IHN0YXJ0UG9zaXRpb25DYW5kaWRhdGVzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAwIH0sIChfLCBpbmRleCkgPT4gaW5kZXgpO1xuICAgICAgICAvLyBTaHVmZmxlIGFycmF5IHBvc2l0aW9ucyAgICAgICAgICAgIFxuICAgICAgICBjb25zdCBzaHVmZmxlZFBvc2l0aW9ucyA9IHNodWZmbGVBcnJheShzdGFydFBvc2l0aW9uQ2FuZGlkYXRlcyk7XG5cbiAgICAgICAgLy8gV2hpbGUgdGhlIGFycmF5IG9mIHNoaXBzIGlzIG5vdCBlbXB0eVxuICAgICAgICB3aGlsZSAoZ2V0U2hpcHMoKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEl0ZXJhdGUgXCJzaHVmZmxlZFBvc2l0aW9uc1wiIGFycmF5IHVudGlsIGZpbmQgYSB2YWxpZCBzaGlwIHBsYWNlbWVudFxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaHVmZmxlZFBvc2l0aW9ucy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IGdldFJhbmRvbURpcmVjdGlvbigpXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZ2V0R2FtZUJvYXJkKCkucGxhY2VTaGlwKGdldFNoaXBBdFBvcyhnZXRTaGlwcygpLmxlbmd0aCAtIDEpLCBzaHVmZmxlZFBvc2l0aW9uc1tqXSwgZGlyZWN0aW9uKVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGdldFNoaXBzKCkucG9wKClcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgLy8gUGxhY2VzIGEgc2hpcCBtYW51YWxseSBvbiB0aGUgZ2FtZWJvYXJkXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHNxdWFyZSwgc2hpcE5hbWUsIG9yaWVudGF0aW9uKSA9PiB7XG4gICAgICAgIFxuICAgICAgICAvLyBHZXQgdGhlIHNoaXBcbiAgICAgICAgY29uc3Qgc2hpcCA9IGdldFNoaXBCeU5hbWUoc2hpcE5hbWUpXG5cbiAgICAgICAgLy8gVGVzdCBpZiBzaGlwIGV4aXN0c1xuICAgICAgICBpZiAoIXNoaXApIHtcbiAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBcIlNoaXAgZG9lc24ndCBleGlzdCFcIiB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBuZWVkIHRvIHRyYW5zbGF0ZSBcIm9yaWVudGF0aW9uXCIgaW50byBcImRpcmVjdGlvblwiXG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IG9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIiA/IFwieFwiIDogXCJ5XCJcblxuICAgICAgICBjb25zdCByZXMgPSBnZXRHYW1lQm9hcmQoKS5wbGFjZVNoaXAoc2hpcCwgc3F1YXJlLCBkaXJlY3Rpb24pXG5cbiAgICAgICAgLy8gSWYgc2hpcCBwbGFjZW1lbnQgd2FzIHN1Y2Nlc3NmdWwsIFxuICAgICAgICAvLyBkZWxldGUgaXQgZnJvbSB0aGUgcGxheWVyJ3Mgc2hpcHMgYXJyYXksXG4gICAgICAgIC8vIHJldHVybiBzdWNjZXNzIG1zZyBhbmQgdGhlIGFycmF5IG9mIHNxdWFyZXMgdGhpcyBzaGlwIG9jY3VwaWVzXG4gICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBkZWxldGVTaGlwQnlOYW1lKHNoaXBOYW1lKVxuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogXCJTaGlwIHBsYWNlZFwiLCBzcXVhcmVzOiByZXMuZGF0YSB9XG5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHsgZXJyb3I6IFwiSW52YWxpZCBzaGlwIHBsYWNlbWVudFwiIH1cblxuICAgIH1cblxuICAgIC8vIEdlbmVyYXRlcyBhIHJhbmRvbSBpbmRleCBmcm9tIHRoYXQgYXJyYXkgb2YgYXZhaWxhYmxlIGF0dGFja3NcbiAgICBjb25zdCBnZW5lcmF0ZVJhbmRvbUluZGV4ID0gKCkgPT4gXG4gICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGdldEF2YWlsYWJsZUF0dGFja3MoKS5sZW5ndGgpXG5cbiAgICAvLyBXaGVuIHdlIGF0dGFjayBhIHBvc2l0aW9uIGluIGVuZW15J3MgYm9hcmQgXG4gICAgLy8gd2UgbmVlZCB0byBkZWxldGUgaXQgZnJvbSBhdmFpbGFibGUgYXR0YWNrcyB0byBub3QgcmVwZWF0IGl0IGluIHRoZSBmdXR1cmVcbiAgICBjb25zdCBkZWxldGVGcm9tQXZhaWxhYmxlQXR0YWNrcyA9IChpbmRleCkgPT4ge1xuICAgICAgICBfYXZhaWxhYmxlQXR0YWNrcy5zcGxpY2UoaW5kZXgsMSlcbiAgICB9XG5cbiAgICAvLyBHZW5lcmF0ZXMgYSBzcXVhcmUgdG8gYXR0YWNrXG4gICAgY29uc3QgZ2VuZXJhdGVBdXRvQXR0YWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGdlbmVyYXRlUmFuZG9tSW5kZXgoKVxuICAgICAgICAgICAgY29uc3Qgc3F1YXJlID0gZ2V0QXR0YWNrQXRQb3MoaW5kZXgpXG4gICAgICAgICAgICBkZWxldGVGcm9tQXZhaWxhYmxlQXR0YWNrcyhpbmRleClcbiAgICAgICAgICAgIHJldHVybiBzcXVhcmVcblxuICAgIH1cblxuICAgIC8vIEh1bWFuIHBsYXllciBhdHRhY2tzIGFuIHNwZWNpZmljIGxvY2F0aW9uXG4gICAgY29uc3QgbWFudWFsQXR0YWNrID0gKHNxdWFyZSkgPT4ge1xuXG4gICAgICAgIC8vIFRlc3QgaWYgaXMgdmFsaWQgYXR0YWNrXG4gICAgICAgIGlmICghaXNWYWxpZEF0dGFjayhzcXVhcmUpKSB7XG4gICAgICAgICAgICByZXR1cm4geyBlcnJvcjogXCJJbnZhbGlkIGF0dGFjayEgVGhhdCBzcXVhcmUgd2FzIGF0dGFja2VkIHlldFwiIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERlbGV0ZSB0aGEgc3F1YXJlIGZyb20gdmFsaWQgYXR0YWNrcyBhcnJheVxuICAgICAgICBkZWxldGVGcm9tQXZhaWxhYmxlQXR0YWNrcyhnZXRJbmRleE9mQXR0YWNrKHNxdWFyZSkpXG5cbiAgICAgICAgLy8gUmV0dXJuIHN1Y2Nlc3MgbXNnXG4gICAgICAgIHJldHVybiB7c3VjY2VzczogXCJQb3NpdGlvbiBhdHRhY2tlZCEgXCJ9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0R2FtZUJvYXJkLFxuICAgICAgICBwbGFjZVNoaXBzUmFuZG9tbHksXG4gICAgICAgIGdlbmVyYXRlQXV0b0F0dGFjayxcbiAgICAgICAgaXNWYWxpZEF0dGFjayxcbiAgICAgICAgbWFudWFsQXR0YWNrLFxuICAgICAgICBnZXRQbGF5ZXJUeXBlLFxuICAgICAgICBnZXRTaGlwcyxcbiAgICAgICAgZ2V0UmFuZG9tRGlyZWN0aW9uLFxuICAgICAgICBwbGFjZVNoaXAsXG4gICAgICAgIGdldFNoaXBCeU5hbWUsXG4gICAgICAgIGRlbGV0ZVNoaXBCeU5hbWVcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyIiwiLy8gRmFjdG9yeSByZXByZXNlbnRpbmcgYSBTaGlwIGluIHRoZSBnYW1lXG5jb25zdCBTaGlwID0gKG5hbWUpID0+IHtcbiAgICBcbiAgICBjb25zdCBfbmFtZSA9IG5hbWVcbiAgICBcbiAgICBsZXQgX2xlbmd0aCA9IDAgLy8gTnVtYmVyIG9mIHNxdWFyZXMgdGhlIHNoaXAgb2NjdXBpZXNcblxuICAgIC8vIENhcnJpZXIgNSAtIEJhdHRsZXNoaXAgNCAtIERlc3Ryb3llciAzIC0gU3VibWFyaW5lIDMgLSBQYXRyb2wgQm9hdCAyXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgIFxuICAgICAgICBjYXNlIF9uYW1lID09PSBcImNhcnJpZXJcIjpcbiAgICAgICAgICAgIF9sZW5ndGggPSA1XG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIF9uYW1lID09PSBcImJhdHRsZXNoaXBcIjpcbiAgICAgICAgICAgIF9sZW5ndGggPSA0XG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIF9uYW1lID09PSBcImRlc3Ryb3llclwiOlxuICAgICAgICAgICAgX2xlbmd0aCA9IDNcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgX25hbWUgPT09IFwic3VibWFyaW5lXCI6XG4gICAgICAgICAgICBfbGVuZ3RoID0gM1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBfbmFtZSA9PT0gXCJib2F0XCI6XG4gICAgICAgICAgICBfbGVuZ3RoID0gMlxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIF9sZW5ndGggPSAwXG4gICAgICAgICAgICBicmVha1xuXG4gICAgfVxuXG4gICAgbGV0IF9oaXRzID0gMCAvLyBOdW1iZXIgb2YgdGltZXMgdGhlIHNoaXAgaGFzIGJlZW4gZGFtYWdlZFxuICAgIGxldCBfc3VuayA9IGZhbHNlIC8vIEluZGljYXRlcyBpZiB0aGUgc2hpcCBoYXMgYmVlbiBzdW5rIG9yIG5vdFxuXG4gICAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IF9uYW1lXG5cbiAgICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiBfbGVuZ3RoXG5cbiAgICBjb25zdCBnZXRIaXRzID0gKCkgPT4gX2hpdHNcblxuICAgIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGlmIChfaGl0cyA8IF9sZW5ndGgpIHtcbiAgICAgICAgICAgIF9oaXRzICs9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX2hpdHMgPT09IF9sZW5ndGgpIHtcbiAgICAgICAgICAgIF9zdW5rID0gdHJ1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaXNTdW5rID0gKCkgPT4gX3N1bmtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldE5hbWUsXG4gICAgICAgIGdldExlbmd0aCxcbiAgICAgICAgZ2V0SGl0cyxcbiAgICAgICAgaGl0LFxuICAgICAgICBpc1N1bmtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXAiLCIvLyBJTVBPUlRTXG5pbXBvcnQgY2FycmllclN2ZyBmcm9tIFwiLi9hc3NldHMvZ3JhcGhpY3MvY2Fycmllci5zdmdcIjtcbmltcG9ydCBzdWJtYXJpbmVTdmcgZnJvbSBcIi4vYXNzZXRzL2dyYXBoaWNzL3N1Ym1hcmluZS5zdmdcIjtcbmltcG9ydCBiYXR0bGVzaGlwU3ZnIGZyb20gXCIuL2Fzc2V0cy9ncmFwaGljcy9iYXR0bGVzaGlwLnN2Z1wiO1xuaW1wb3J0IGRlc3Ryb3llclN2ZyBmcm9tIFwiLi9hc3NldHMvZ3JhcGhpY3MvZGVzdHJveWVyLnN2Z1wiO1xuaW1wb3J0IHBhdHJvbFN2ZyBmcm9tIFwiLi9hc3NldHMvZ3JhcGhpY3MvcGF0cm9sLWJvYXQuc3ZnXCI7XG5cbi8vIEEgbW9kdWxlIChvbmx5IG9uZSBpbnN0YW5jZSkgZm9yIGEgVmlldyB0aGF0IGNvbnRyb2wgRE9NIG1hbmlwdWxhdGlvblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQsIGltcG9ydC9uby1tdXRhYmxlLWV4cG9ydHMsIHByZWZlci1jb25zdCwgZnVuYy1uYW1lc1xuZXhwb3J0IGxldCB2aWV3ID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gU29tZSB1c2VmdWwgdmFyaWFibGVzXG4gICAgbGV0IHNlbGVjdGVkU2hpcExlbmd0aCA9IDBcbiAgICBsZXQgb3JpZW50YXRpb24gPSBcImhvcml6b250YWxcIlxuICAgIGxldCBzZWxlY3RlZFNoaXBOYW1lID0gXCJcIlxuICAgIGxldCBwbGFjZWRTaGlwc0NvdW50ZXIgPSAwXG5cbiAgICAvLyBDcmVhdGUgYW4gZWxlbWVudCB3aXRoIGFuIG9wdGlvbmFsIENTUyBjbGFzcyBhbmQgb3B0aW9uYWwgQ1NTIGlkXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWcsIGNsYXNzTmFtZSwgaWQpIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZylcblxuICAgICAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImlkXCIsaWQpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudFxuXG4gICAgfVxuXG4gICAgLy8gUmV0cmlldmUgYW4gZWxlbWVudCBmcm9tIHRoZSBET01cbiAgICBmdW5jdGlvbiBnZXRFbGVtZW50KGlkKSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpXG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnRcblxuICAgIH1cblxuICAgIC8vIERlbGV0ZSB0aGUgY29udGVudCBpbnNpZGUgXCJtYWluXCIgPGRpdj5cbiAgICBmdW5jdGlvbiBkZWxldGVNYWluVUkoKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSBnZXRFbGVtZW50KFwibWFpblwiKVxuICAgICAgICBtYWluLmlubmVySFRNTCA9IFwiXCJcbiAgICB9XG5cbiAgICAvLyBTaG93cyBpbmZvIGluIHVzZXJzIFwiaW5zdHJ1Y3Rpb25zXCIgZGl2XG4gICAgZnVuY3Rpb24gc2hvd1VzZXJJbmZvKGluZm8pIHtcblxuICAgICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluc3RydWN0aW9uc1wiKVxuICAgICAgICBpbnN0cnVjdGlvbnMudGV4dENvbnRlbnQgPSBpbmZvXG5cbiAgICB9XG5cbiAgICAvLyBTaG93cyBpbmZvIGluIGNvbXB1dGVycyBcImluc3RydWN0aW9uc1wiIGRpdlxuICAgIGZ1bmN0aW9uIHNob3dDb21wdXRlckluZm8oaW5mbykge1xuXG4gICAgICAgIGNvbnN0IGNvbXB1dGVySW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXJJbmZvXCIpXG4gICAgICAgIGNvbXB1dGVySW5mby50ZXh0Q29udGVudCA9IGluZm9cblxuICAgIH1cblxuICAgIC8vIEhhbmRsZXMgYSBjbGljayBvbiBhIHNoaXAgaW4gdGhlIHVzZXIncyBTaGlweWFyZFxuICAgIGZ1bmN0aW9uIGhhbmRsZVNoaXBDbGljayhzaGlwKSB7XG5cbiAgICAgICAgLy8gSWYgc2hpcCBpcyBhbHJlYWR5IHBsYWNlZCBvbiBib2FyZCwgcmV0dXJuXG4gICAgICAgIGlmIChzaGlwLmNsYXNzTGlzdC5jb250YWlucyhcInBsYWNlZFwiKSkgc2hvd1VzZXJJbmZvKFwiU2hpcCBhbHJlYWR5IHBsYWNlZCBvbiBib2FyZFwiKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAvLyBJZiB0aGVyZSBpcyBvdGhlciBzZWxlY3RlZCBzaGlwLCByZW1vdmUgdGhlIHNlbGVjdGVkIGNsYXNzIGZyb20gaXRcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRTaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RlZFwiKVxuICAgICAgICBpZiAoc2VsZWN0ZWRTaGlwKSBzZWxlY3RlZFNoaXAuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpXG5cbiAgICAgICAgLy8gQWRkIHNlbGVjdGVkIGNsYXNzIHRvIHRoZSBjbGlja2VkIHNoaXBcbiAgICAgICAgc2hpcC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIilcblxuICAgICAgICAvLyBVcGRhdGUgc2VsZWN0ZWQgc2hpcCBhbmQgc2VsZWN0ZWRTaGlwTGVuZ3RoIHZhcmlhYmxlc1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICAgICAgc2VsZWN0ZWRTaGlwTmFtZSA9IHNoaXAuY2xhc3NMaXN0WzBdXG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggKHNlbGVjdGVkU2hpcE5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJjYXJyaWVyXCI6XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRTaGlwTGVuZ3RoID0gNVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIFwiYmF0dGxlc2hpcFwiOlxuICAgICAgICAgICAgICAgIHNlbGVjdGVkU2hpcExlbmd0aCA9IDRcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBcImRlc3Ryb3llclwiOlxuICAgICAgICAgICAgICAgIHNlbGVjdGVkU2hpcExlbmd0aCA9IDNcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBcInN1Ym1hcmluZVwiOlxuICAgICAgICAgICAgICAgIHNlbGVjdGVkU2hpcExlbmd0aCA9IDNcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBcImJvYXRcIjpcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFNoaXBMZW5ndGggPSAyXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRTaGlwTGVuZ3RoID0gMFxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGFuZ2UgaW5zdHJ1Y3Rpb25zIHRleHRcbiAgICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnN0cnVjdGlvbnNcIilcbiAgICAgICAgaWYgKGluc3RydWN0aW9ucykgaW5zdHJ1Y3Rpb25zLnRleHRDb250ZW50ID0gXCJTZWxlY3QgYSBwb3NpdGlvbiBvbiB0aGUgYm9hcmQgdG8gcGxhY2UgdGhlIHNoaXAuIFVzZSBUIGtleSB0byByb3RhdGUgdGhlIHNoaXBcIlxuXG4gICAgfVxuXG4gICAgLy8gTG9hZHMgZ2FtZSBVSVxuICAgIGZ1bmN0aW9uIGxvYWRHYW1lVUkoKSB7XG4gICAgICAgIFxuICAgICAgICAvLyBTSURFU1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdXNlclNpZGUgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJwbGF5ZXJTaWRlXCIsbnVsbClcbiAgICAgICAgY29uc3QgY29tcHV0ZXJTaWRlID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwicGxheWVyU2lkZVwiLG51bGwpXG5cbiAgICAgICAgY29uc3QgbWFpbiA9IGdldEVsZW1lbnQoXCJtYWluXCIpXG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQodXNlclNpZGUpXG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQoY29tcHV0ZXJTaWRlKVxuXG4gICAgICAgIC8vIEhlYWRlcnNcblxuICAgICAgICBjb25zdCB1c2VySGVhZGVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiZ2FtZUhlYWRlclwiLFwidXNlckdhbWVIZWFkZXJcIilcbiAgICAgICAgY29uc3QgY29tcHV0ZXJIZWFkZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJnYW1lSGVhZGVyXCIsXCJjb21wdXRlckdhbWVIZWFkZXJcIilcblxuICAgICAgICBjb25zdCB1c2VyVGl0bGUgPSBjcmVhdGVFbGVtZW50KFwiaDJcIixcInBsYXllclRpdGxlXCIsbnVsbClcbiAgICAgICAgY29uc3QgY29tcHV0ZXJUaXRsZSA9IGNyZWF0ZUVsZW1lbnQoXCJoMlwiLFwicGxheWVyVGl0bGVcIixudWxsKVxuXG4gICAgICAgIHVzZXJUaXRsZS50ZXh0Q29udGVudCA9IFwiWU9VUiBGTEVFVFwiXG4gICAgICAgIGNvbXB1dGVyVGl0bGUudGV4dENvbnRlbnQgPSBcIkVORU1ZIEZMRUVUXCJcblxuICAgICAgICB1c2VySGVhZGVyLmFwcGVuZENoaWxkKHVzZXJUaXRsZSlcbiAgICAgICAgY29tcHV0ZXJIZWFkZXIuYXBwZW5kQ2hpbGQoY29tcHV0ZXJUaXRsZSlcblxuICAgICAgICB1c2VyU2lkZS5hcHBlbmRDaGlsZCh1c2VySGVhZGVyKVxuICAgICAgICBjb21wdXRlclNpZGUuYXBwZW5kQ2hpbGQoY29tcHV0ZXJIZWFkZXIpXG5cbiAgICAgICAgLy8gR2FtZWJvYXJkc1xuXG4gICAgICAgIGNvbnN0IHVzZXJHYW1lYm9hcmRDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJnYW1lYm9hcmRDb250YWluZXJcIixcInVzZXJHYW1lYm9hcmRDb250YWluZXJcIilcbiAgICAgICAgY29uc3QgY29tcHV0ZXJHYW1lYm9hcmRDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJnYW1lYm9hcmRDb250YWluZXJcIixcImNvbXB1dGVyR2FtZWJvYXJkQ29udGFpbmVyXCIpXG5cbiAgICAgICAgY29uc3QgdXNlclhIZWFkZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJ4SGVhZGVyXCIsbnVsbClcbiAgICAgICAgY29uc3QgY29tcHV0ZXJYSGVhZGVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwieEhlYWRlclwiLG51bGwpXG5cbiAgICAgICAgLy8gR2VuZXJhdGUgdGhlIHhIZWFkZXIgc3F1YXJlc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJYSGVhZGVyU3F1YXJlID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwieEhlYWRlclNxdWFyZVwiLG51bGwpXG4gICAgICAgICAgICBjb25zdCBjb21wdXRlclhIZWFkZXJTcXVhcmUgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJ4SGVhZGVyU3F1YXJlXCIsbnVsbClcbiAgICAgICAgICAgIHVzZXJYSGVhZGVyU3F1YXJlLnRleHRDb250ZW50ID0gU3RyaW5nLmZyb21DaGFyQ29kZSg2NSArIGkpXG4gICAgICAgICAgICBjb21wdXRlclhIZWFkZXJTcXVhcmUudGV4dENvbnRlbnQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDY1ICsgaSlcbiAgICAgICAgICAgIHVzZXJYSGVhZGVyLmFwcGVuZENoaWxkKHVzZXJYSGVhZGVyU3F1YXJlKVxuICAgICAgICAgICAgY29tcHV0ZXJYSGVhZGVyLmFwcGVuZENoaWxkKGNvbXB1dGVyWEhlYWRlclNxdWFyZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHVzZXJCb3R0b21Cb2FyZCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImJvdHRvbUJvYXJkXCIsbnVsbClcbiAgICAgICAgY29uc3QgY29tcHV0ZXJCb3R0b21Cb2FyZCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImJvdHRvbUJvYXJkXCIsbnVsbClcblxuICAgICAgICBjb25zdCB1c2VyWUhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInlIZWFkZXJcIixudWxsKVxuICAgICAgICBjb25zdCBjb21wdXRlcllIZWFkZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJ5SGVhZGVyXCIsbnVsbClcblxuICAgICAgICAvLyBHZW5lcmF0ZSB0aGUgeUhlYWRlciBzcXVhcmVzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgdXNlcllIZWFkZXJTcXVhcmUgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJ5SGVhZGVyU3F1YXJlXCIsbnVsbClcbiAgICAgICAgICAgIGNvbnN0IGNvbXB1dGVyWUhlYWRlclNxdWFyZSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInlIZWFkZXJTcXVhcmVcIixudWxsKVxuICAgICAgICAgICAgdXNlcllIZWFkZXJTcXVhcmUudGV4dENvbnRlbnQgPSBpICsgMVxuICAgICAgICAgICAgY29tcHV0ZXJZSGVhZGVyU3F1YXJlLnRleHRDb250ZW50ID0gaSArIDFcbiAgICAgICAgICAgIHVzZXJZSGVhZGVyLmFwcGVuZENoaWxkKHVzZXJZSGVhZGVyU3F1YXJlKVxuICAgICAgICAgICAgY29tcHV0ZXJZSGVhZGVyLmFwcGVuZENoaWxkKGNvbXB1dGVyWUhlYWRlclNxdWFyZSlcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1c2VyWUhlYWRlclNoaXB5YXJkID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwieUhlYWRlclNoaXB5YXJkXCIsbnVsbClcbiAgICAgICAgY29uc3QgY29tcHV0ZXJZSGVhZGVyU2hpcHlhcmQgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJ5SGVhZGVyU2hpcHlhcmRcIixudWxsKVxuICAgICAgICB1c2VyWUhlYWRlclNoaXB5YXJkLnRleHRDb250ZW50ID0gXCJTaGlweWFyZFwiXG4gICAgICAgIGNvbXB1dGVyWUhlYWRlclNoaXB5YXJkLnRleHRDb250ZW50ID0gXCJTaGlweWFyZFwiXG4gICAgICAgIHVzZXJZSGVhZGVyLmFwcGVuZENoaWxkKHVzZXJZSGVhZGVyU2hpcHlhcmQpXG4gICAgICAgIGNvbXB1dGVyWUhlYWRlci5hcHBlbmRDaGlsZChjb21wdXRlcllIZWFkZXJTaGlweWFyZClcblxuICAgICAgICBjb25zdCB1c2VyR3JpZFBhbmVsQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiZ3JpZFBhbmVsQ29udGFpbmVyXCIsXCJ1c2VyR3JpZFBhbmVsQ29udGFpbmVyXCIpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyR3JpZFBhbmVsQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiZ3JpZFBhbmVsQ29udGFpbmVyXCIsXCJjb21wdXRlckdyaWRQYW5lbENvbnRhaW5lclwiKVxuXG4gICAgICAgIGNvbnN0IHVzZXJHYW1lYm9hcmQgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJnYW1lYm9hcmRHcmlkXCIsXCJ1c2VyR2FtZWJvYXJkR3JpZFwiKVxuICAgICAgICB1c2VyR2FtZWJvYXJkLmNsYXNzTGlzdC5hZGQoXCJibG9ja2VkXCIpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyR2FtZWJvYXJkID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiZ2FtZWJvYXJkR3JpZFwiLFwiY29tcHV0ZXJHYW1lYm9hcmRHcmlkXCIpXG4gICAgICAgIGNvbXB1dGVyR2FtZWJvYXJkLmNsYXNzTGlzdC5hZGQoXCJibG9ja2VkXCIpXG5cbiAgICAgICAgLy8gR2VuZXJhdGUgdGhlIGdhbWVib2FyZCBzcXVhcmVzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJHYW1lYm9hcmRTcXVhcmUgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJnYW1lYm9hcmRTcXVhcmVcIixudWxsKVxuICAgICAgICAgICAgdXNlckdhbWVib2FyZFNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWluZGV4XCIsaSlcbiAgICAgICAgICAgIGNvbnN0IGNvbXB1dGVyR2FtZWJvYXJkU3F1YXJlID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiZ2FtZWJvYXJkU3F1YXJlXCIsbnVsbClcbiAgICAgICAgICAgIGNvbXB1dGVyR2FtZWJvYXJkU3F1YXJlLnNldEF0dHJpYnV0ZShcImRhdGEtaW5kZXhcIixpKVxuICAgICAgICAgICAgdXNlckdhbWVib2FyZC5hcHBlbmRDaGlsZCh1c2VyR2FtZWJvYXJkU3F1YXJlKVxuICAgICAgICAgICAgY29tcHV0ZXJHYW1lYm9hcmQuYXBwZW5kQ2hpbGQoY29tcHV0ZXJHYW1lYm9hcmRTcXVhcmUpXG4gICAgICAgIH1cblxuICAgICAgICB1c2VyR3JpZFBhbmVsQ29udGFpbmVyLmFwcGVuZENoaWxkKHVzZXJHYW1lYm9hcmQpXG4gICAgICAgIGNvbXB1dGVyR3JpZFBhbmVsQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbXB1dGVyR2FtZWJvYXJkKVxuXG4gICAgICAgIHVzZXJHYW1lYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQodXNlclhIZWFkZXIpXG4gICAgICAgIHVzZXJHYW1lYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQodXNlckJvdHRvbUJvYXJkKVxuICAgICAgICB1c2VyQm90dG9tQm9hcmQuYXBwZW5kQ2hpbGQodXNlcllIZWFkZXIpXG4gICAgICAgIHVzZXJCb3R0b21Cb2FyZC5hcHBlbmRDaGlsZCh1c2VyR3JpZFBhbmVsQ29udGFpbmVyKVxuXG4gICAgICAgIGNvbXB1dGVyR2FtZWJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbXB1dGVyWEhlYWRlcilcbiAgICAgICAgY29tcHV0ZXJHYW1lYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoY29tcHV0ZXJCb3R0b21Cb2FyZClcbiAgICAgICAgY29tcHV0ZXJCb3R0b21Cb2FyZC5hcHBlbmRDaGlsZChjb21wdXRlcllIZWFkZXIpXG4gICAgICAgIGNvbXB1dGVyQm90dG9tQm9hcmQuYXBwZW5kQ2hpbGQoY29tcHV0ZXJHcmlkUGFuZWxDb250YWluZXIpXG5cbiAgICAgICAgdXNlclNpZGUuYXBwZW5kQ2hpbGQodXNlckdhbWVib2FyZENvbnRhaW5lcilcbiAgICAgICAgY29tcHV0ZXJTaWRlLmFwcGVuZENoaWxkKGNvbXB1dGVyR2FtZWJvYXJkQ29udGFpbmVyKVxuXG4gICAgICAgIC8vIEZsZWV0IFN0YXR1cyBQYW5lbHNcblxuICAgICAgICBjb25zdCB1c2VyU3RhdHVzUGFuZWwgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJzdGF0dXNQYW5lbFwiLFwidXNlclN0YXR1c1BhbmVsXCIpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyU3RhdHVzUGFuZWwgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJzdGF0dXNQYW5lbFwiLFwiY29tcHV0ZXJTdGF0dXNQYW5lbFwiKVxuXG4gICAgICAgIHVzZXJHcmlkUGFuZWxDb250YWluZXIuYXBwZW5kQ2hpbGQodXNlclN0YXR1c1BhbmVsKVxuICAgICAgICBjb21wdXRlckdyaWRQYW5lbENvbnRhaW5lci5hcHBlbmRDaGlsZChjb21wdXRlclN0YXR1c1BhbmVsKVxuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgdXNlciBzaGlweWFyZFxuICAgICAgICBjb25zdCB1c2VyQ2FycmllciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImNhcnJpZXJcIixcInVzZXJDYXJyaWVyXCIpXG4gICAgICAgIHVzZXJDYXJyaWVyLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpXG4gICAgICAgIHVzZXJDYXJyaWVyLmNsYXNzTGlzdC5hZGQoXCJ1c2VyU2hpcFwiKVxuICAgICAgICB1c2VyQ2Fycmllci5jbGFzc0xpc3QuYWRkKFwibm8taG92ZXJcIilcbiAgICAgICAgdXNlckNhcnJpZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAxODggMzZcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCIgeG1sbnM6c2VyaWY9XCJodHRwOi8vd3d3LnNlcmlmLmNvbS9cIiBzdHlsZT1cImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyO1wiPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLjEzNzI4LDAsMCwwLjc1MTE2NywtMTQuMjQ1NSwtMC43NTkzNzYpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTc1LjE3NywxNS4wMTdDMTc1LjE3Nyw5LjUwMyAxNzAuNyw1LjAyNiAxNjUuMTg2LDUuMDI2TDI1LjE0LDUuMDI2QzE5LjYyNiw1LjAyNiAxNS4xNDksOS41MDMgMTUuMTQ5LDE1LjAxN0wxNS4xNDksMzQuOTk4QzE1LjE0OSw0MC41MTIgMTkuNjI2LDQ0Ljk4OSAyNS4xNCw0NC45ODlMMTY1LjE4Niw0NC45ODlDMTcwLjcsNDQuOTg5IDE3NS4xNzcsNDAuNTEyIDE3NS4xNzcsMzQuOTk4TDE3NS4xNzcsMTUuMDE3WlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTExLjE5MjcsMi45ODMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtNDkuMTcyNiwyLjk4MylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC04Ny4xNDk4LDIuOTgzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsMjYuODE0NSwyLjk4MylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLDY0Ljc5NDksMi45ODMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvc3ZnPmBcbiAgICAgICAgY29uc3QgdXNlckJhdHRsZXNoaXAgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJiYXR0bGVzaGlwXCIsXCJ1c2VyQmF0dGxlc2hpcFwiKVxuICAgICAgICB1c2VyQmF0dGxlc2hpcC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKVxuICAgICAgICB1c2VyQmF0dGxlc2hpcC5jbGFzc0xpc3QuYWRkKFwidXNlclNoaXBcIilcbiAgICAgICAgdXNlckJhdHRsZXNoaXAuY2xhc3NMaXN0LmFkZChcIm5vLWhvdmVyXCIpXG4gICAgICAgIHVzZXJCYXR0bGVzaGlwLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMTUwIDM2XCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiIHhtbG5zOnNlcmlmPVwiaHR0cDovL3d3dy5zZXJpZi5jb20vXCIgc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjtcIj5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtMjAuMTYyOCwtNy4wMDc0MSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEuMjg4NjMsMCwwLDAuNzUwMyw5LjMzNTUsMi40ODM5MylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNOTYuOTUsNDMuMDQyQzkxLjc0Myw0NS42MzUgODUuMjU3LDQ3Ljk2OCA3OC4wNjYsNDkuOTgyTDIyLjY3MSw0OS45ODJDMTUuODg4LDQ0LjkxMSAxMC43NDQsMzcuNzM5IDEwLjczLDMwLjAyNkMxMC43MTcsMjIuMzA4IDE1Ljg0MSwxNS4xMTUgMjIuNjEyLDEwLjAxOUw3OC4wMzQsMTAuMDE5Qzg0Ljg0MywxMS45NDYgOTEuMDIxLDE0LjE1OSA5Ni4wODUsMTYuNTc3TDk1LjkzNiwxNi41NTZDOTAuNzYzLDE2LjU1NiA4Ni41NjMsMjIuNTIyIDg2LjU2MywyOS44NzJDODYuNTYzLDM3LjIyMSA5MC43NjMsNDMuMTg4IDk1LjkzNiw0My4xODhMOTYuOTUsNDMuMDQyWlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoNy4zMzUwMiwwLDAsMS40NjEyMSwtNjM5LjI0NCwtMTkuMjU5OClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTA0LjE4OCwyMy42MTFDMTAzLjY3NiwyMi4yMzYgMTAyLjk5OCwyMS4wMzIgMTAyLjE5MywyMC4wMjVDMTA0LjI2MiwyMS4zMzggMTA1Ljk2OSwyMi43MDggMTA3LjI0OCwyNC4xNUMxMDYuODAzLDI1LjI1NCAxMDYuNDk5LDI3LjU2IDEwNi40OTksMzAuMjE5QzEwNi40OTksMzIuNzA1IDEwNi43NjUsMzQuODgzIDEwNy4xNjQsMzYuMDU4QzEwNS43NDksMzcuNjI5IDEwMy44MjgsMzkuMTE5IDEwMS40ODgsNDAuNTQ1QzEwMi41MDEsMzkuNTAzIDEwMy4zNTYsMzguMTc2IDEwMy45OTYsMzYuNjEyQzEwNC4xNTEsMzYuOTA3IDEwNC4zMjEsMzcuMDU3IDEwNC40OTgsMzcuMDU3QzEwNS4yOTgsMzcuMDU3IDEwNS45NDgsMzQuMDA4IDEwNS45NDgsMzAuMjUyQzEwNS45NDgsMjYuNDk3IDEwNS4yOTgsMjMuNDQ4IDEwNC40OTgsMjMuNDQ4QzEwNC4zOTIsMjMuNDQ4IDEwNC4yODgsMjMuNTAxIDEwNC4xODgsMjMuNjExWlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoNy4zMzUwMiwwLDAsMS40NjEyMSwtNjM5LjI0NCwtMTkuMjU5OClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTA5LjAxLDI2LjU3OUMxMDkuNjI0LDI3LjcxOCAxMDkuOTQ2LDI4Ljg4OSAxMDkuOTQ0LDMwLjA3MkMxMDkuOTQyLDMxLjIxMiAxMDkuNjM5LDMyLjM0MSAxMDkuMDY0LDMzLjQ0OEMxMDkuMTcsMzIuNDkzIDEwOS4yMjksMzEuMzkgMTA5LjIyOSwzMC4yMTlDMTA5LjIyOSwyOC44NzIgMTA5LjE1MSwyNy42MTUgMTA5LjAxLDI2LjU3OVpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTYwLjE3MzYsMi45ODMyKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwxMS4xMDk4LC0wLjExMDkyMilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLDYwLjE3MzYsLTIuOTgzMilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTA0LjgxOCw4LjIzNEMxMTAuMDgxLDEwLjkyMyAxMTMuMDM2LDE0LjA1NiAxMTMuMDM2LDE3LjM4MkMxMTMuMDM2LDIxIDEwOS41NCwyNC4zODggMTAzLjQwMywyNy4yM0M5OS4zNCwyNS44NTggOTYuNDUsMjIuMjExIDk2LjQ1LDE3LjkzN0M5Ni40NSwxMy4xNzkgMTAwLjAzNSw5LjE5NiAxMDQuODE4LDguMjM0WlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSw2MC4xNzM2LC0yLjk4MzIpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEwNC44MTgsOC4yMzRDMTA1LjU0OCw4LjA3MyAxMDYuMzA4LDcuOTk1IDEwNy4wODgsNy45OTVDMTEyLjk2LDcuOTk1IDExNy43MjcsMTIuNDUgMTE3LjcyNywxNy45MzdDMTE3LjcyNywyMy40MjUgMTEyLjk2LDI3Ljg4IDEwNy4wODgsMjcuODhDMTA1Ljc4OSwyNy44OCAxMDQuNTQzLDI3LjY2MiAxMDMuNDAzLDI3LjIzQzEwOS41NCwyNC4zODggMTEzLjAzNiwyMSAxMTMuMDM2LDE3LjM4MkMxMTMuMDM2LDE0LjA1NiAxMTAuMDgxLDEwLjkyMyAxMDQuODE4LDguMjM0WlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSw4Ni43Nzg4LC0wLjExMDkyMilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTAwLjY1Nyw2LjE0OUMxMDYuMDExLDcuMzA0IDExMC4zNDksOC40ODcgMTEzLjU4LDkuNjk4QzExNC42MTMsMTEuMjEyIDExNS4xODUsMTMuMDQ4IDExNS4xODUsMTUuMDE3QzExNS4xODUsMTYuNzI4IDExNC43NTMsMTguMzQgMTEzLjk3MiwxOS43MzVDMTEwLjU4MSwyMS4wNDIgMTA1LjkwMSwyMi4zMzEgMTAwLjAzNywyMy41NDlDOTcuMTEsMjEuODMyIDk1LjE2MywxOC42NSA5NS4xNjMsMTUuMDE3Qzk1LjE2MywxMS4xMzIgOTcuMzg5LDcuNzYyIDEwMC42NTcsNi4xNDlaXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLDQ4Ljc5ODcsLTAuMDAwMilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC04Ny4xMTgyLDIuODcyMjgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvc3ZnPmBcbiAgICAgICAgY29uc3QgdXNlckRlc3Ryb3llciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImRlc3Ryb3llclwiLFwidXNlckRlc3Ryb3llclwiKVxuICAgICAgICB1c2VyRGVzdHJveWVyLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpXG4gICAgICAgIHVzZXJEZXN0cm95ZXIuY2xhc3NMaXN0LmFkZChcInVzZXJTaGlwXCIpXG4gICAgICAgIHVzZXJEZXN0cm95ZXIuY2xhc3NMaXN0LmFkZChcIm5vLWhvdmVyXCIpXG4gICAgICAgIHVzZXJEZXN0cm95ZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAxMTIgMzZcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCIgeG1sbnM6c2VyaWY9XCJodHRwOi8vd3d3LnNlcmlmLmNvbS9cIiBzdHlsZT1cImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyO1wiPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC0zOS4xNjI4LC03LjAwNzQxKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMS4wNjgwNiwwLDAsMC43NTAzLDMwLjcxOTUsMi40ODM5MylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNOTYuOTUsNDMuMDQyQzkxLjc0Myw0NS42MzUgODUuMjU3LDQ3Ljk2OCA3OC4wNjYsNDkuOTgyTDIyLjY3MSw0OS45ODJDMTUuODg4LDQ0LjkxMSAxMC43NDQsMzcuNzM5IDEwLjczLDMwLjAyNkMxMC43MTcsMjIuMzA4IDE1Ljg0MSwxNS4xMTUgMjIuNjEyLDEwLjAxOUw3OC4wMzQsMTAuMDE5Qzg0Ljg0MywxMS45NDYgOTEuMDIxLDE0LjE1OSA5Ni4wODUsMTYuNTc3TDk1LjkzNiwxNi41NTZDOTAuNzYzLDE2LjU1NiA4Ni41NjMsMjIuNTIyIDg2LjU2MywyOS44NzJDODYuNTYzLDM3LjIyMSA5MC43NjMsNDMuMTg4IDk1LjkzNiw0My4xODhMOTYuOTUsNDMuMDQyWlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMS4wNjgwNiwwLDAsMC43NTAzLDMwLjcxOTUsMi40ODM5MylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTAyLjE5MywyMC4wMjVDMTA3LjA3OSwyMy4xMjYgMTA5Ljk1LDI2LjU0NiAxMDkuOTQ0LDMwLjA3MkMxMDkuOTM3LDMzLjc1OCAxMDYuNzg1LDM3LjMxOCAxMDEuNDg4LDQwLjU0NUMxMDMuODEyLDM4LjE1MyAxMDUuMzA5LDM0LjI1OSAxMDUuMzA5LDI5Ljg3MkMxMDUuMzA5LDI1Ljk1MyAxMDQuMTE1LDIyLjQyOCAxMDIuMTkzLDIwLjAyNVpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTExLjE1MTcsMi44NzIyOClcIj5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMDUuMzM0LDUuMDQyQzEwNy43NzMsNS44NTkgMTA5Ljk3LDYuNzA3IDExMS44NTcsNy42MjlDMTEzLjkxLDkuNDMyIDExNS4xODUsMTIuMDc3IDExNS4xODUsMTUuMDE3QzExNS4xODUsMTguMzA4IDExMy41ODcsMjEuMjMgMTExLjEwNCwyMy4wMjVMMTEwLjM5MSwyMy4zNjVMMTA2LjI1NywyNC44OTlMMTA1LjE3NCwyNS4wMDhDOTkuNjQ5LDI1LjAwOCA5NS4xNjMsMjAuNTMxIDk1LjE2MywxNS4wMTdDOTUuMTYzLDkuNTAzIDk5LjY0OSw1LjAyNiAxMDUuMTc0LDUuMDI2TDEwNS4zMzQsNS4wNDJaXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtNDkuMTc0LDIuODcyMjgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtODcuMTg4MSwyLjg3MjI4KVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L3N2Zz5gXG4gICAgICAgIGNvbnN0IHVzZXJTdWJtYXJpbmUgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJzdWJtYXJpbmVcIixcInVzZXJTdWJtYXJpbmVcIilcbiAgICAgICAgdXNlclN1Ym1hcmluZS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKVxuICAgICAgICB1c2VyU3VibWFyaW5lLmNsYXNzTGlzdC5hZGQoXCJ1c2VyU2hpcFwiKVxuICAgICAgICB1c2VyU3VibWFyaW5lLmNsYXNzTGlzdC5hZGQoXCJuby1ob3ZlclwiKVxuICAgICAgICB1c2VyU3VibWFyaW5lLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMTEyIDM2XCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiIHhtbG5zOnNlcmlmPVwiaHR0cDovL3d3dy5zZXJpZi5jb20vXCIgc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjtcIj5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMS4wNjgzNiwwLDAsMC43NTIwMDEsLTQwLjQxMDMsLTQuNTQxNTMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTI4LjExNiwxMC4wMTlDMTM0LjgxNCwxNS4xMDggMTM5Ljg2NSwyMi4yNTMgMTM5Ljg1MSwyOS45MTVDMTM5LjgzNywzNy42ODUgMTM0LjYxOSw0NC45MDQgMTI3Ljc2Miw0OS45ODJMNTIuNjkxLDQ5Ljk4MkM0NS44MzQsNDQuOTA0IDQwLjYxNiwzNy42ODUgNDAuNjAyLDI5LjkxNUM0MC41ODgsMjIuMjUzIDQ1LjYzOSwxNS4xMDggNTIuMzM3LDEwLjAxOUwxMjguMTE2LDEwLjAxOVpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC0xMS4xOSwzLjAwMTU3KVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTQ5LjE4OTYsMy4wMDE1NylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC04Ny4xNjcyLDMuMDAxNTcpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvc3ZnPmBcbiAgICAgICAgY29uc3QgdXNlckJvYXQgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJib2F0XCIsXCJ1c2VyQm9hdFwiKVxuICAgICAgICB1c2VyQm9hdC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKVxuICAgICAgICB1c2VyQm9hdC5jbGFzc0xpc3QuYWRkKFwidXNlclNoaXBcIilcbiAgICAgICAgdXNlckJvYXQuY2xhc3NMaXN0LmFkZChcIm5vLWhvdmVyXCIpXG4gICAgICAgIHVzZXJCb2F0LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgNzQgMzZcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCIgeG1sbnM6c2VyaWY9XCJodHRwOi8vd3d3LnNlcmlmLmNvbS9cIiBzdHlsZT1cImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyO1wiPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgwLjk3Njk3MywwLDAsMC43NTIwNDgsLTcuMDY2NDEsLTQuNTY3NTMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNNDguMDM0LDEwLjAxOUM2Ni4yNTMsMTUuMTc4IDc5Ljk1NywyMi4zNzQgNzkuOTQ0LDMwLjA3MkM3OS45MywzNy43NTQgNjYuMjUzLDQ0Ljg4OSA0OC4wNjYsNDkuOTgyTDIzLjkwOCw0OS45ODJDMTYuMjAxLDQ0LjkxMSAxMC4zNTYsMzcuNzM2IDEwLjM0MiwzMC4wMThDMTAuMzI4LDIyLjMwNSAxNi4xMzksMTUuMTE1IDIzLjgxNywxMC4wMTlMNDguMDM0LDEwLjAxOVpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC00OS4xNzUyLDIuOTgzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTg3LjE2NjEsMi45ODMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvc3ZnPmBcbiAgICAgICAgdXNlclN0YXR1c1BhbmVsLmFwcGVuZENoaWxkKHVzZXJDYXJyaWVyKVxuICAgICAgICB1c2VyU3RhdHVzUGFuZWwuYXBwZW5kQ2hpbGQodXNlckJhdHRsZXNoaXApXG4gICAgICAgIHVzZXJTdGF0dXNQYW5lbC5hcHBlbmRDaGlsZCh1c2VyRGVzdHJveWVyKVxuICAgICAgICB1c2VyU3RhdHVzUGFuZWwuYXBwZW5kQ2hpbGQodXNlclN1Ym1hcmluZSlcbiAgICAgICAgdXNlclN0YXR1c1BhbmVsLmFwcGVuZENoaWxkKHVzZXJCb2F0KVxuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgZW5lbXkgc2hpcHlhcmRcbiAgICAgICAgY29uc3QgY29tcHV0ZXJDYXJyaWVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiY2FycmllclwiLFwiY29tcHV0ZXJDYXJyaWVyXCIpXG4gICAgICAgIGNvbXB1dGVyQ2Fycmllci5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKVxuICAgICAgICBjb21wdXRlckNhcnJpZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAxODggMzZcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCIgeG1sbnM6c2VyaWY9XCJodHRwOi8vd3d3LnNlcmlmLmNvbS9cIiBzdHlsZT1cImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyO1wiPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLjEzNzI4LDAsMCwwLjc1MTE2NywtMTQuMjQ1NSwtMC43NTkzNzYpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTc1LjE3NywxNS4wMTdDMTc1LjE3Nyw5LjUwMyAxNzAuNyw1LjAyNiAxNjUuMTg2LDUuMDI2TDI1LjE0LDUuMDI2QzE5LjYyNiw1LjAyNiAxNS4xNDksOS41MDMgMTUuMTQ5LDE1LjAxN0wxNS4xNDksMzQuOTk4QzE1LjE0OSw0MC41MTIgMTkuNjI2LDQ0Ljk4OSAyNS4xNCw0NC45ODlMMTY1LjE4Niw0NC45ODlDMTcwLjcsNDQuOTg5IDE3NS4xNzcsNDAuNTEyIDE3NS4xNzcsMzQuOTk4TDE3NS4xNzcsMTUuMDE3WlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTExLjE5MjcsMi45ODMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtNDkuMTcyNiwyLjk4MylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC04Ny4xNDk4LDIuOTgzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsMjYuODE0NSwyLjk4MylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLDY0Ljc5NDksMi45ODMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvc3ZnPmBcbiAgICAgICAgY29uc3QgY29tcHV0ZXJCYXR0bGVzaGlwID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiYmF0dGxlc2hpcFwiLFwiY29tcHV0ZXJCYXR0bGVzaGlwXCIpXG4gICAgICAgIGNvbXB1dGVyQmF0dGxlc2hpcC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKVxuICAgICAgICBjb21wdXRlckJhdHRsZXNoaXAuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAxNTAgMzZcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCIgeG1sbnM6c2VyaWY9XCJodHRwOi8vd3d3LnNlcmlmLmNvbS9cIiBzdHlsZT1cImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyO1wiPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC0yMC4xNjI4LC03LjAwNzQxKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMS4yODg2MywwLDAsMC43NTAzLDkuMzM1NSwyLjQ4MzkzKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk05Ni45NSw0My4wNDJDOTEuNzQzLDQ1LjYzNSA4NS4yNTcsNDcuOTY4IDc4LjA2Niw0OS45ODJMMjIuNjcxLDQ5Ljk4MkMxNS44ODgsNDQuOTExIDEwLjc0NCwzNy43MzkgMTAuNzMsMzAuMDI2QzEwLjcxNywyMi4zMDggMTUuODQxLDE1LjExNSAyMi42MTIsMTAuMDE5TDc4LjAzNCwxMC4wMTlDODQuODQzLDExLjk0NiA5MS4wMjEsMTQuMTU5IDk2LjA4NSwxNi41NzdMOTUuOTM2LDE2LjU1NkM5MC43NjMsMTYuNTU2IDg2LjU2MywyMi41MjIgODYuNTYzLDI5Ljg3MkM4Ni41NjMsMzcuMjIxIDkwLjc2Myw0My4xODggOTUuOTM2LDQzLjE4OEw5Ni45NSw0My4wNDJaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCg3LjMzNTAyLDAsMCwxLjQ2MTIxLC02MzkuMjQ0LC0xOS4yNTk4KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMDQuMTg4LDIzLjYxMUMxMDMuNjc2LDIyLjIzNiAxMDIuOTk4LDIxLjAzMiAxMDIuMTkzLDIwLjAyNUMxMDQuMjYyLDIxLjMzOCAxMDUuOTY5LDIyLjcwOCAxMDcuMjQ4LDI0LjE1QzEwNi44MDMsMjUuMjU0IDEwNi40OTksMjcuNTYgMTA2LjQ5OSwzMC4yMTlDMTA2LjQ5OSwzMi43MDUgMTA2Ljc2NSwzNC44ODMgMTA3LjE2NCwzNi4wNThDMTA1Ljc0OSwzNy42MjkgMTAzLjgyOCwzOS4xMTkgMTAxLjQ4OCw0MC41NDVDMTAyLjUwMSwzOS41MDMgMTAzLjM1NiwzOC4xNzYgMTAzLjk5NiwzNi42MTJDMTA0LjE1MSwzNi45MDcgMTA0LjMyMSwzNy4wNTcgMTA0LjQ5OCwzNy4wNTdDMTA1LjI5OCwzNy4wNTcgMTA1Ljk0OCwzNC4wMDggMTA1Ljk0OCwzMC4yNTJDMTA1Ljk0OCwyNi40OTcgMTA1LjI5OCwyMy40NDggMTA0LjQ5OCwyMy40NDhDMTA0LjM5MiwyMy40NDggMTA0LjI4OCwyMy41MDEgMTA0LjE4OCwyMy42MTFaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCg3LjMzNTAyLDAsMCwxLjQ2MTIxLC02MzkuMjQ0LC0xOS4yNTk4KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMDkuMDEsMjYuNTc5QzEwOS42MjQsMjcuNzE4IDEwOS45NDYsMjguODg5IDEwOS45NDQsMzAuMDcyQzEwOS45NDIsMzEuMjEyIDEwOS42MzksMzIuMzQxIDEwOS4wNjQsMzMuNDQ4QzEwOS4xNywzMi40OTMgMTA5LjIyOSwzMS4zOSAxMDkuMjI5LDMwLjIxOUMxMDkuMjI5LDI4Ljg3MiAxMDkuMTUxLDI3LjYxNSAxMDkuMDEsMjYuNTc5WlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtNjAuMTczNiwyLjk4MzIpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLDExLjEwOTgsLTAuMTEwOTIyKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsNjAuMTczNiwtMi45ODMyKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMDQuODE4LDguMjM0QzExMC4wODEsMTAuOTIzIDExMy4wMzYsMTQuMDU2IDExMy4wMzYsMTcuMzgyQzExMy4wMzYsMjEgMTA5LjU0LDI0LjM4OCAxMDMuNDAzLDI3LjIzQzk5LjM0LDI1Ljg1OCA5Ni40NSwyMi4yMTEgOTYuNDUsMTcuOTM3Qzk2LjQ1LDEzLjE3OSAxMDAuMDM1LDkuMTk2IDEwNC44MTgsOC4yMzRaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLDYwLjE3MzYsLTIuOTgzMilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTA0LjgxOCw4LjIzNEMxMDUuNTQ4LDguMDczIDEwNi4zMDgsNy45OTUgMTA3LjA4OCw3Ljk5NUMxMTIuOTYsNy45OTUgMTE3LjcyNywxMi40NSAxMTcuNzI3LDE3LjkzN0MxMTcuNzI3LDIzLjQyNSAxMTIuOTYsMjcuODggMTA3LjA4OCwyNy44OEMxMDUuNzg5LDI3Ljg4IDEwNC41NDMsMjcuNjYyIDEwMy40MDMsMjcuMjNDMTA5LjU0LDI0LjM4OCAxMTMuMDM2LDIxIDExMy4wMzYsMTcuMzgyQzExMy4wMzYsMTQuMDU2IDExMC4wODEsMTAuOTIzIDEwNC44MTgsOC4yMzRaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLDg2Ljc3ODgsLTAuMTEwOTIyKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMDAuNjU3LDYuMTQ5QzEwNi4wMTEsNy4zMDQgMTEwLjM0OSw4LjQ4NyAxMTMuNTgsOS42OThDMTE0LjYxMywxMS4yMTIgMTE1LjE4NSwxMy4wNDggMTE1LjE4NSwxNS4wMTdDMTE1LjE4NSwxNi43MjggMTE0Ljc1MywxOC4zNCAxMTMuOTcyLDE5LjczNUMxMTAuNTgxLDIxLjA0MiAxMDUuOTAxLDIyLjMzMSAxMDAuMDM3LDIzLjU0OUM5Ny4xMSwyMS44MzIgOTUuMTYzLDE4LjY1IDk1LjE2MywxNS4wMTdDOTUuMTYzLDExLjEzMiA5Ny4zODksNy43NjIgMTAwLjY1Nyw2LjE0OVpcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsNDguNzk4NywtMC4wMDAyKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTg3LjExODIsMi44NzIyOClcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPC9zdmc+YFxuICAgICAgICBjb25zdCBjb21wdXRlckRlc3Ryb3llciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImRlc3Ryb3llclwiLFwiY29tcHV0ZXJEZXN0cm95ZXJcIilcbiAgICAgICAgY29tcHV0ZXJEZXN0cm95ZXIuY2xhc3NMaXN0LmFkZChcInNoaXBcIilcbiAgICAgICAgY29tcHV0ZXJEZXN0cm95ZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAxMTIgMzZcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCIgeG1sbnM6c2VyaWY9XCJodHRwOi8vd3d3LnNlcmlmLmNvbS9cIiBzdHlsZT1cImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyO1wiPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC0zOS4xNjI4LC03LjAwNzQxKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMS4wNjgwNiwwLDAsMC43NTAzLDMwLjcxOTUsMi40ODM5MylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNOTYuOTUsNDMuMDQyQzkxLjc0Myw0NS42MzUgODUuMjU3LDQ3Ljk2OCA3OC4wNjYsNDkuOTgyTDIyLjY3MSw0OS45ODJDMTUuODg4LDQ0LjkxMSAxMC43NDQsMzcuNzM5IDEwLjczLDMwLjAyNkMxMC43MTcsMjIuMzA4IDE1Ljg0MSwxNS4xMTUgMjIuNjEyLDEwLjAxOUw3OC4wMzQsMTAuMDE5Qzg0Ljg0MywxMS45NDYgOTEuMDIxLDE0LjE1OSA5Ni4wODUsMTYuNTc3TDk1LjkzNiwxNi41NTZDOTAuNzYzLDE2LjU1NiA4Ni41NjMsMjIuNTIyIDg2LjU2MywyOS44NzJDODYuNTYzLDM3LjIyMSA5MC43NjMsNDMuMTg4IDk1LjkzNiw0My4xODhMOTYuOTUsNDMuMDQyWlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMS4wNjgwNiwwLDAsMC43NTAzLDMwLjcxOTUsMi40ODM5MylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTAyLjE5MywyMC4wMjVDMTA3LjA3OSwyMy4xMjYgMTA5Ljk1LDI2LjU0NiAxMDkuOTQ0LDMwLjA3MkMxMDkuOTM3LDMzLjc1OCAxMDYuNzg1LDM3LjMxOCAxMDEuNDg4LDQwLjU0NUMxMDMuODEyLDM4LjE1MyAxMDUuMzA5LDM0LjI1OSAxMDUuMzA5LDI5Ljg3MkMxMDUuMzA5LDI1Ljk1MyAxMDQuMTE1LDIyLjQyOCAxMDIuMTkzLDIwLjAyNVpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTExLjE1MTcsMi44NzIyOClcIj5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMDUuMzM0LDUuMDQyQzEwNy43NzMsNS44NTkgMTA5Ljk3LDYuNzA3IDExMS44NTcsNy42MjlDMTEzLjkxLDkuNDMyIDExNS4xODUsMTIuMDc3IDExNS4xODUsMTUuMDE3QzExNS4xODUsMTguMzA4IDExMy41ODcsMjEuMjMgMTExLjEwNCwyMy4wMjVMMTEwLjM5MSwyMy4zNjVMMTA2LjI1NywyNC44OTlMMTA1LjE3NCwyNS4wMDhDOTkuNjQ5LDI1LjAwOCA5NS4xNjMsMjAuNTMxIDk1LjE2MywxNS4wMTdDOTUuMTYzLDkuNTAzIDk5LjY0OSw1LjAyNiAxMDUuMTc0LDUuMDI2TDEwNS4zMzQsNS4wNDJaXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtNDkuMTc0LDIuODcyMjgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtODcuMTg4MSwyLjg3MjI4KVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L3N2Zz5gXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyU3VibWFyaW5lID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwic3VibWFyaW5lXCIsXCJjb21wdXRlclN1Ym1hcmluZVwiKVxuICAgICAgICBjb21wdXRlclN1Ym1hcmluZS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKVxuICAgICAgICBjb21wdXRlclN1Ym1hcmluZS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDExMiAzNlwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIiB4bWxuczpzZXJpZj1cImh0dHA6Ly93d3cuc2VyaWYuY29tL1wiIHN0eWxlPVwiZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjI7XCI+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEuMDY4MzYsMCwwLDAuNzUyMDAxLC00MC40MTAzLC00LjU0MTUzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEyOC4xMTYsMTAuMDE5QzEzNC44MTQsMTUuMTA4IDEzOS44NjUsMjIuMjUzIDEzOS44NTEsMjkuOTE1QzEzOS44MzcsMzcuNjg1IDEzNC42MTksNDQuOTA0IDEyNy43NjIsNDkuOTgyTDUyLjY5MSw0OS45ODJDNDUuODM0LDQ0LjkwNCA0MC42MTYsMzcuNjg1IDQwLjYwMiwyOS45MTVDNDAuNTg4LDIyLjI1MyA0NS42MzksMTUuMTA4IDUyLjMzNywxMC4wMTlMMTI4LjExNiwxMC4wMTlaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtMTEuMTksMy4wMDE1NylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC00OS4xODk2LDMuMDAxNTcpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtODcuMTY3MiwzLjAwMTU3KVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L3N2Zz5gXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQm9hdCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImJvYXRcIixcImNvbXB1dGVyQm9hdFwiKVxuICAgICAgICBjb21wdXRlckJvYXQuY2xhc3NMaXN0LmFkZChcInNoaXBcIilcbiAgICAgICAgY29tcHV0ZXJCb2F0LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgNzQgMzZcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCIgeG1sbnM6c2VyaWY9XCJodHRwOi8vd3d3LnNlcmlmLmNvbS9cIiBzdHlsZT1cImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyO1wiPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgwLjk3Njk3MywwLDAsMC43NTIwNDgsLTcuMDY2NDEsLTQuNTY3NTMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNNDguMDM0LDEwLjAxOUM2Ni4yNTMsMTUuMTc4IDc5Ljk1NywyMi4zNzQgNzkuOTQ0LDMwLjA3MkM3OS45MywzNy43NTQgNjYuMjUzLDQ0Ljg4OSA0OC4wNjYsNDkuOTgyTDIzLjkwOCw0OS45ODJDMTYuMjAxLDQ0LjkxMSAxMC4zNTYsMzcuNzM2IDEwLjM0MiwzMC4wMThDMTAuMzI4LDIyLjMwNSAxNi4xMzksMTUuMTE1IDIzLjgxNywxMC4wMTlMNDguMDM0LDEwLjAxOVpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC00OS4xNzUyLDIuOTgzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTg3LjE2NjEsMi45ODMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvc3ZnPmBcblxuICAgICAgICBjb21wdXRlclN0YXR1c1BhbmVsLmFwcGVuZENoaWxkKGNvbXB1dGVyQ2FycmllcilcbiAgICAgICAgY29tcHV0ZXJTdGF0dXNQYW5lbC5hcHBlbmRDaGlsZChjb21wdXRlckJhdHRsZXNoaXApXG4gICAgICAgIGNvbXB1dGVyU3RhdHVzUGFuZWwuYXBwZW5kQ2hpbGQoY29tcHV0ZXJEZXN0cm95ZXIpXG4gICAgICAgIGNvbXB1dGVyU3RhdHVzUGFuZWwuYXBwZW5kQ2hpbGQoY29tcHV0ZXJTdWJtYXJpbmUpXG4gICAgICAgIGNvbXB1dGVyU3RhdHVzUGFuZWwuYXBwZW5kQ2hpbGQoY29tcHV0ZXJCb2F0KVxuXG4gICAgICAgIC8vIENyZWF0ZSBhIGRpdiB0byBzaG93IGluc3RydWN0aW9ucyB0byB0aGUgdXNlclxuICAgICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJpbnN0cnVjdGlvbnNcIixudWxsKVxuICAgICAgICBpbnN0cnVjdGlvbnMudGV4dENvbnRlbnQgPSBcIlNlbGVjdCBhIHBsYWNlbWVudCBvcHRpb24gZm9yIHlvdXIgc2hpcHNcIlxuICAgICAgICB1c2VyU2lkZS5hcHBlbmRDaGlsZChpbnN0cnVjdGlvbnMpXG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgZGl2IHRvIHNob3cgaW5mbyBmcm9tIHRoZSBJQSBwbGF5ZXJcbiAgICAgICAgY29uc3QgY29tcHV0ZXJJbmZvID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiY29tcHV0ZXJJbmZvXCIsbnVsbClcbiAgICAgICAgY29tcHV0ZXJJbmZvLnRleHRDb250ZW50ID0gXCJNeSBzaGlwcyBoYXMgYmVlbiBwbGFjZWQuIEknbSB3YWl0aW5nIGZvciB5b3UgdG8gc3RhcnQuLi5cIlxuICAgICAgICBjb21wdXRlclNpZGUuYXBwZW5kQ2hpbGQoY29tcHV0ZXJJbmZvKVxuXG4gICAgICAgIC8vIENyZWF0ZSBhIGRpdiB0byBzaG93IGJ1dHRvbnMgdG8gdGhlIHVzZXJcbiAgICAgICAgY29uc3QgYnV0dG9uc0NvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImJ1dHRvbnNDb250YWluZXJcIixudWxsKVxuICAgICAgICB1c2VyU2lkZS5hcHBlbmRDaGlsZChidXR0b25zQ29udGFpbmVyKVxuICAgICAgICBjb25zdCBtYW51YWxCdXR0b24gPSBjcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsXCJwbGFjZW1lbnRCdXR0b25cIixcIm1hbnVhbEJ1dHRvblwiKVxuICAgICAgICBtYW51YWxCdXR0b24udGV4dENvbnRlbnQgPSBcIk1hbnVhbCBQbGFjZW1lbnRcIlxuICAgICAgICBjb25zdCByYW5kb21CdXR0b24gPSBjcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsXCJwbGFjZW1lbnRCdXR0b25cIixcInJhbmRvbUJ1dHRvblwiKVxuICAgICAgICByYW5kb21CdXR0b24udGV4dENvbnRlbnQgPSBcIlJhbmRvbSBQbGFjZW1lbnRcIlxuICAgICAgICBidXR0b25zQ29udGFpbmVyLmFwcGVuZENoaWxkKG1hbnVhbEJ1dHRvbilcbiAgICAgICAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChyYW5kb21CdXR0b24pXG5cbiAgICB9XG5cbiAgICAvLyBBc3NvY2lhdGVzIGFuIGV2ZW50IGxpc3RlbmVyIHRvIGV2ZXJ5IGNlbGwgb2YgdGhlIHVzZXIgYm9hcmRcbiAgICBmdW5jdGlvbiBvblVzZXJCb2FyZENsaWNrKGNhbGxiYWNrKSB7XG5cbiAgICAgICAgY29uc3QgdXNlckdhbWVib2FyZEdyaWQgPSBnZXRFbGVtZW50KFwidXNlckdhbWVib2FyZEdyaWRcIilcbiAgICAgICAgY29uc3QgdXNlckJvYXJkU3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjdXNlckdhbWVib2FyZEdyaWQgLmdhbWVib2FyZFNxdWFyZVwiKVxuICAgICAgICB1c2VyQm9hcmRTcXVhcmVzLmZvckVhY2goc3F1YXJlID0+IHtcbiAgICAgICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdXNlckdhbWVib2FyZEdyaWQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYmxvY2tlZFwiKSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhwYXJzZUludChzcXVhcmUuZ2V0QXR0cmlidXRlKFwiZGF0YS1pbmRleFwiKSwxMCksIHNlbGVjdGVkU2hpcE5hbWUsIG9yaWVudGF0aW9uKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICAvLyBBc3NvY2lhdGVzIGFuIGV2ZW50IGxpc3RlbmVyIHRvIGV2ZXJ5IGNlbGwgb2YgdGhlIGNvbXB1dGVyIGJvYXJkXG4gICAgZnVuY3Rpb24gb25Db21wdXRlckJvYXJkQ2xpY2soY2FsbGJhY2spIHtcblxuICAgICAgICBjb25zdCBjb21wdXRlckdhbWVib2FyZEdyaWQgPSBnZXRFbGVtZW50KFwiY29tcHV0ZXJHYW1lYm9hcmRHcmlkXCIpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQm9hcmRTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNjb21wdXRlckdhbWVib2FyZEdyaWQgLmdhbWVib2FyZFNxdWFyZVwiKVxuICAgICAgICBjb21wdXRlckJvYXJkU3F1YXJlcy5mb3JFYWNoKHNxdWFyZSA9PiB7XG4gICAgICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbXB1dGVyR2FtZWJvYXJkR3JpZC5jbGFzc0xpc3QuY29udGFpbnMoXCJibG9ja2VkXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHBhcnNlSW50KHNxdWFyZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWluZGV4XCIpLDEwKSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgLy8gQXNzb2NpYXRlcyBhbiBldmVudCBsaXN0ZW5lciB0byBcIk1hbnVhbCBQbGFjZW1lbnRcIiBidXR0b25cbiAgICBmdW5jdGlvbiBvbk1hbnVhbFBsYWNlbWVudENsaWNrKCkge1xuXG4gICAgICAgIGNvbnN0IG1hbnVhbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFudWFsQnV0dG9uXCIpXG4gICAgICAgIG1hbnVhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBEZWxldGUgdGhlIGJ1dHRvbnMgZnJvbSB0aGUgaW5zdHJ1Y3Rpb25zIGRpdlxuICAgICAgICAgICAgbWFudWFsQnV0dG9uLnJlbW92ZSgpXG4gICAgICAgICAgICBjb25zdCByYW5kb21CdXR0b24gPSBnZXRFbGVtZW50KFwicmFuZG9tQnV0dG9uXCIpXG4gICAgICAgICAgICByYW5kb21CdXR0b24ucmVtb3ZlKClcblxuICAgICAgICAgICAgLy8gQ2hhbmdlIGdhbWVib2FyZCBzdGF0dXNcbiAgICAgICAgICAgIGNvbnN0IHVzZXJHYW1lYm9hcmRHcmlkID0gZ2V0RWxlbWVudChcInVzZXJHYW1lYm9hcmRHcmlkXCIpXG4gICAgICAgICAgICB1c2VyR2FtZWJvYXJkR3JpZC5jbGFzc0xpc3QucmVtb3ZlKFwiYmxvY2tlZFwiKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBDaGFuZ2UgaW5zdHJ1Y3Rpb25zIHRleHRcbiAgICAgICAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5zdHJ1Y3Rpb25zXCIpXG4gICAgICAgICAgICBpbnN0cnVjdGlvbnMudGV4dENvbnRlbnQgPSBcIlNlbGVjdCBhIG5vdCB5ZXQgcGxhY2VkIHNoaXBcIlxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBBZGRpbmcgZXZlbnQgbGlzdGVuZXJzIHRvIHVzZXIgc2hpcHNcbiAgICAgICAgICAgIGNvbnN0IHVzZXJTaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudXNlclNoaXBcIilcbiAgICAgICAgICAgIHVzZXJTaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgICAgIHNoaXAuY2xhc3NMaXN0LnJlbW92ZShcIm5vLWhvdmVyXCIpXG4gICAgICAgICAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiBoYW5kbGVTaGlwQ2xpY2soc2hpcCxldmVudCkpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAvLyBBZGRpbmcgZXZlbnQgbGlzdGVuZXJzIHRvIHVzZXIgYm9hcmQgY2VsbHNcbiAgICAgICAgICAgIGNvbnN0IHVzZXJCb2FyZFNxdWFyZXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjdXNlckdhbWVib2FyZEdyaWQgLmdhbWVib2FyZFNxdWFyZVwiKSlcbiAgICAgICAgICAgIHVzZXJCb2FyZFNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlLGluZGV4KSA9PiB7XG5cbiAgICAgICAgICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpYmxpbmdzVG9Db2xvciA9IFtdXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93U3RhcnQgPSBzdGFydCAtIChzdGFydCAlIDEwKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCByb3dFbmQgPSByb3dTdGFydCArIDEwXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBleHBlY3RlZEVuZCA9IHN0YXJ0ICsgc2VsZWN0ZWRTaGlwTGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhwZWN0ZWRFbmQgPiByb3dFbmQpIHsgLy8gaWYgc2hpcCBpcyB0b28gbG9uZyB0byBmaXQgaW4gdGhlIHJvd1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2libGluZ3NUb0NvbG9yID0gdXNlckJvYXJkU3F1YXJlcy5zbGljZShzdGFydCwgcm93RW5kKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpYmxpbmdzVG9Db2xvci5mb3JFYWNoKHNpYmxpbmcgPT4gc2libGluZy5jbGFzc0xpc3QuYWRkKFwiaG92ZXJMaW1pdHNFeGNlZWRlZFwiKSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gaWYgc2hpcCBmaXRzIGluIHRoZSByb3dcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpYmxpbmdzVG9Db2xvciA9IHVzZXJCb2FyZFNxdWFyZXMuc2xpY2Uoc3RhcnQsIGV4cGVjdGVkRW5kKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpYmxpbmdzVG9Db2xvci5mb3JFYWNoKHNpYmxpbmcgPT4gc2libGluZy5jbGFzc0xpc3QuYWRkKFwiaG92ZXJcIikpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyB2ZXJ0aWNhbFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBzdGFydCArIHNlbGVjdGVkU2hpcExlbmd0aCAqIDEwOyBpICs9IDEwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA8IHVzZXJCb2FyZFNxdWFyZXMubGVuZ3RoKSBzaWJsaW5nc1RvQ29sb3IucHVzaCh1c2VyQm9hcmRTcXVhcmVzW2ldKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaWJsaW5nc1RvQ29sb3IubGVuZ3RoIDwgc2VsZWN0ZWRTaGlwTGVuZ3RoKSB7IC8vIGlmIHNoaXAgaXMgdG9vIGxvbmcgdG8gZml0IGluIHRoZSBjb2x1bW5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpYmxpbmdzVG9Db2xvci5mb3JFYWNoKHNpYmxpbmcgPT4gc2libGluZy5jbGFzc0xpc3QuYWRkKFwiaG92ZXJMaW1pdHNFeGNlZWRlZFwiKSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gaWYgc2hpcCBmaXRzIGluIHRoZSBjb2x1bW5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpYmxpbmdzVG9Db2xvci5mb3JFYWNoKHNpYmxpbmcgPT4gc2libGluZy5jbGFzc0xpc3QuYWRkKFwiaG92ZXJcIikpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB1c2VyQm9hcmRTcXVhcmVzLmZvckVhY2goc2libGluZyA9PiBzaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlclwiKSlcbiAgICAgICAgICAgICAgICAgICAgdXNlckJvYXJkU3F1YXJlcy5mb3JFYWNoKHNpYmxpbmcgPT4gc2libGluZy5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJMaW1pdHNFeGNlZWRlZFwiKSlcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgLy8gQWRkaW5nIGV2ZW50IGxpc3RlbmVyIHRvIFQga2V5IHRvIHJvdGF0ZSB0aGUgc2VsZWN0ZWQgc2hpcFxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09IFwidFwiKSBvcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIiA/IFwidmVydGljYWxcIiA6IFwiaG9yaXpvbnRhbFwiXG5cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIC8vIFNob3cgYSBcIlN0YXJ0IEdhbWVcIiBidXR0b25cbiAgICBmdW5jdGlvbiBzaG93U3RhcnRHYW1lQnV0dG9uKCkge1xuXG4gICAgICAgIC8vIFNob3cgdGhlIFwiU3RhcnQgR2FtZVwiIGJ1dHRvblxuICAgICAgICBjb25zdCBzdGFydEdhbWVCdXR0b24gPSBjcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIG51bGwsIFwic3RhcnQtZ2FtZS1idXR0b25cIilcbiAgICAgICAgc3RhcnRHYW1lQnV0dG9uLnRleHRDb250ZW50ID0gXCJTVEFSVCBHQU1FXCJcbiAgICAgICAgc3RhcnRHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIERlbGV0ZSBcIlN0YXJ0IEdhbWVcIiBidXR0b25cbiAgICAgICAgICAgIHN0YXJ0R2FtZUJ1dHRvbi5yZW1vdmUoKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBFbmFibGUgdGhlIGNvbXB1dGVyIGJvYXJkXG4gICAgICAgICAgICBjb25zdCBjb21wdXRlckdhbWVib2FyZEdyaWQgPSBnZXRFbGVtZW50KFwiY29tcHV0ZXJHYW1lYm9hcmRHcmlkXCIpXG4gICAgICAgICAgICBjb21wdXRlckdhbWVib2FyZEdyaWQuY2xhc3NMaXN0LnJlbW92ZShcImJsb2NrZWRcIilcblxuICAgICAgICAgICAgLy8gQ2hhbmdlIGluc3RydWN0aW9ucyB0ZXh0XG4gICAgICAgICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluc3RydWN0aW9uc1wiKVxuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLnRleHRDb250ZW50ID0gXCJDbGljayBvbiBhIGNlbGwgdG8gYXR0YWNrXCJcblxuICAgICAgICAgICAgLy8gQ2hhbmdlIGNvbXB1dGVyIGluZm8gdGV4dFxuICAgICAgICAgICAgY29uc3QgY29tcHV0ZXJJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlckluZm9cIilcbiAgICAgICAgICAgIGNvbXB1dGVySW5mby50ZXh0Q29udGVudCA9IFwiTGFkaWVzIGZpcnN0LCBwbGVhc2UuLi5cIlxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3QgYnV0dG9uc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uc0NvbnRhaW5lclwiKVxuICAgICAgICBidXR0b25zQ29udGFpbmVyLmFwcGVuZENoaWxkKHN0YXJ0R2FtZUJ1dHRvbilcblxuICAgIH1cblxuICAgIC8vIEFzc29jaWF0ZXMgYW4gZXZlbnQgbGlzdGVuZXIgdG8gXCJSYW5kb20gUGxhY2VtZW50XCIgYnV0dG9uXG4gICAgZnVuY3Rpb24gb25SYW5kb21QbGFjZW1lbnRDbGljayhjYWxsYmFjaykge1xuXG4gICAgICAgIGNvbnN0IHJhbmRvbUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmFuZG9tQnV0dG9uXCIpXG4gICAgICAgIHJhbmRvbUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgICAgICAvLyBEZWxldGUgdGhlIGJ1dHRvbnMgZnJvbSB0aGUgaW5zdHJ1Y3Rpb25zIGRpdlxuICAgICAgICAgICAgY29uc3QgbWFudWFsQnV0dG9uID0gZ2V0RWxlbWVudChcIm1hbnVhbEJ1dHRvblwiKVxuICAgICAgICAgICAgbWFudWFsQnV0dG9uLnJlbW92ZSgpXG4gICAgICAgICAgICByYW5kb21CdXR0b24ucmVtb3ZlKClcbiAgICAgICAgICAgIC8vIENoYW5nZSBpbnN0cnVjdGlvbnMgdGV4dFxuICAgICAgICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnN0cnVjdGlvbnNcIilcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy50ZXh0Q29udGVudCA9IFwiQWxsIHNoaXBzIHBsYWNlZC4gQ2xpY2sgb24gdGhlIGJ1dHRvbiBiZWxvdyB0byBzdGFydCB0aGUgZ2FtZVwiXG4gICAgICAgICAgICAvLyBBZGQgY2xhc3MgXCIucGxhY2VkXCIgdG8gYWxsIHVzZXIgc2hpcHNcbiAgICAgICAgICAgIGNvbnN0IHVzZXJTaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudXNlclNoaXBcIilcbiAgICAgICAgICAgIHVzZXJTaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHNoaXAuY2xhc3NMaXN0LmFkZChcInBsYWNlZFwiKVxuICAgICAgICAgICAgICAgIHNoaXAuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpXG4gICAgICAgICAgICAgICAgc2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwibm8taG92ZXJcIilcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gUmV2ZXJ0IGdsb2JhbCB2YXJpYWJsZXMgdG8gZGVmYXVsdCB2YWx1ZXNcbiAgICAgICAgICAgIHNlbGVjdGVkU2hpcE5hbWUgPSBcIlwiXG4gICAgICAgICAgICBzZWxlY3RlZFNoaXBMZW5ndGggPSAwXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEJsb2NrIHVzZXIgZ2FtZWJvYXJkXG4gICAgICAgICAgICBjb25zdCB1c2VyR2FtZWJvYXJkR3JpZCA9IGdldEVsZW1lbnQoXCJ1c2VyR2FtZWJvYXJkR3JpZFwiKVxuICAgICAgICAgICAgdXNlckdhbWVib2FyZEdyaWQuY2xhc3NMaXN0LmFkZChcImJsb2NrZWRcIilcblxuICAgICAgICAgICAgLy8gU2hvdyBcIlN0YXJ0IEdhbWVcIiBidXR0b25cbiAgICAgICAgICAgIHNob3dTdGFydEdhbWVCdXR0b24oKVxuXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICAvLyBMb2FkcyB0aGUgdXNlciBnYW1lYm9hcmRcbiAgICBmdW5jdGlvbiBsb2FkVXNlckdhbWVib2FyZChnYW1lYm9hcmQpIHtcblxuICAgICAgICBjb25zdCB1c2VyQm9hcmRTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiN1c2VyR2FtZWJvYXJkR3JpZCAuZ2FtZWJvYXJkU3F1YXJlXCIpXG4gICAgICAgIHVzZXJCb2FyZFNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlLGluZGV4KSA9PiB7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIHNoaXAgb24gdGhlIHNxdWFyZSwgYWRkIHRoZSBcIm9jY3VwaWVkXCIgY2xhc3MgdG8gaXRcbiAgICAgICAgICAgIGlmIChnYW1lYm9hcmRbaW5kZXhdICE9PSBcIldhdGVyXCIpIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwib2NjdXBpZWRcIilcbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIC8vIExvYWRzIGluaXRpYWwgVUkgc2NyZWVuXG4gICAgZnVuY3Rpb24gbG9hZENvdmVyTWFpblVJKGxvYWRNYWluVUlDYWxsYmFjaykge1xuICAgIFxuICAgICAgICAvLyBDcmVhdGUgYSBzY3JlZW4gPGRpdj48L2Rpdj4gdGhhdCBjb3ZlcnMgYWxsIHRoZSBzcGFjZSBhdmFpbGFibGUgb24gYnJvd3NlciBuYXZcbiAgICAgICAgY29uc3Qgc2NyZWVuID0gY3JlYXRlRWxlbWVudChcImRpdlwiLG51bGwsXCJzY3JlZW5cIilcblxuICAgICAgICAvLyBBcHBlbmQgaXQgdG8gYm9keSBlbGVtZW50XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyZWVuKVxuXG4gICAgICAgIC8vIENyZWF0ZSBoZWFkZXIsIG1haW4gYW5kIGZvb3RlciBkaXZzIGluc2lkZSBzY3JlZW4gZGl2XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixudWxsLFwiaGVhZGVyXCIpXG4gICAgICAgIGNvbnN0IG1haW4gPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsbnVsbCxcIm1haW5cIilcbiAgICAgICAgY29uc3QgZm9vdGVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLG51bGwsXCJmb290ZXJcIilcbiAgICAgICAgXG4gICAgICAgIHNjcmVlbi5hcHBlbmRDaGlsZChoZWFkZXIpXG4gICAgICAgIHNjcmVlbi5hcHBlbmRDaGlsZChtYWluKVxuICAgICAgICBzY3JlZW4uYXBwZW5kQ2hpbGQoZm9vdGVyKVxuXG4gICAgICAgIC8vIENyZWF0ZSBhIHRpdGxlIGZvciB0aGUgZ2FtZSBhbmQgYXBwZW5kIGl0IHRvIHRoZSBoZWFkZXJcbiAgICAgICAgY29uc3QgdGl0bGUgPSBjcmVhdGVFbGVtZW50KFwiaDFcIixcInRpdGxlXCIsbnVsbClcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIkJBVFRMRVNISVBcIlxuICAgICAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpXG5cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBjcmVkaXRzIGFuZCBhcHBlbmQgdGhlbSB0byB0aGUgZm9vdGVyXG4gICAgICAgIGNvbnN0IGNyZWRpdHMgPSBjcmVhdGVFbGVtZW50KFwicFwiLFwiY3JlZGl0c1wiLG51bGwpXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBxdW90ZXNcbiAgICAgICAgY3JlZGl0cy5pbm5lckhUTUwgPSAnQ3JlYXRlZCBieSBWRVJFR09STi4gRm9sbG93IG15IHdvcmsgb24gR2l0SHViOiA8YnI+PGJyPjxhIGNsYXNzPVwiZ2l0aHViLWxpbmtcIiBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3ZlcmVnb3JuXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPjxzdmcgY2xhc3M9XCJnaXRodWItaWNvblwiIHdpZHRoPVwiMzJcIiBoZWlnaHQ9XCIzMlwiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTggMEMzLjU4IDAgMCAzLjU4IDAgOGMwIDMuNTQgMi4yOSA2LjUzIDUuNDcgNy41OS40LjA3LjU1LS4xNy41NS0uMzggMC0uMTktLjAxLS44Mi0uMDEtMS40OS0yLjAxLjM3LTIuNTMtLjQ5LTIuNjktLjk0LS4wOS0uMjMtLjQ4LS45NC0uODItMS4xMy0uMjgtLjE1LS42OC0uNTItLjAxLS41My42My0uMDEgMS4wOC41OCAxLjIzLjgyLjcyIDEuMjEgMS44Ny44NyAyLjMzLjY2LjA3LS41Mi4yOC0uODcuNTEtMS4wNy0xLjc4LS4yLTMuNjQtLjg5LTMuNjQtMy45NSAwLS44Ny4zMS0xLjU5LjgyLTIuMTUtLjA4LS4yLS4zNi0xLjAyLjA4LTIuMTIgMCAwIC42Ny0uMjEgMi4yLjgyLjY0LS4xOCAxLjMyLS4yNyAyLS4yNy42OCAwIDEuMzYuMDkgMiAuMjcgMS41My0xLjA0IDIuMi0uODIgMi4yLS44Mi40NCAxLjEuMTYgMS45Mi4wOCAyLjEyLjUxLjU2LjgyIDEuMjcuODIgMi4xNSAwIDMuMDctMS44NyAzLjc1LTMuNjUgMy45NS4yOS4yNS41NC43My41NCAxLjQ4IDAgMS4wNy0uMDEgMS45My0uMDEgMi4yIDAgLjIxLjE1LjQ2LjU1LjM4QTguMDEzIDguMDEzIDAgMCAwIDE2IDhjMC00LjQyLTMuNTgtOC04LTh6XCIvPjwvc3ZnPjwvYT4nXG4gICAgICAgIGZvb3Rlci5hcHBlbmRDaGlsZChjcmVkaXRzKVxuXG4gICAgICAgIC8vIE1haW4gY29udGVudFxuICAgICAgICBjb25zdCBnbG93aW5nQnV0dG9uID0gY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLFwiZ2xvd2luZy1idXR0b25cIixudWxsKVxuICAgICAgICBnbG93aW5nQnV0dG9uLnRleHRDb250ZW50ID0gXCJQTEFZXCJcbiAgICAgICAgZ2xvd2luZ0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZGVsZXRlTWFpblVJKClcbiAgICAgICAgICAgIGxvYWRNYWluVUlDYWxsYmFjaygpXG4gICAgICAgIH0pXG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQoZ2xvd2luZ0J1dHRvbilcblxuICAgICAgICAvLyBTVkcgU2hpcCBzaGFwZXNcbiAgICAgICAgY29uc3QgY2FycmllclNoYXBlID0gY3JlYXRlRWxlbWVudChcIm9iamVjdFwiLG51bGwsXCJjYXJyaWVyLXNoYXBlXCIpXG4gICAgICAgIGNhcnJpZXJTaGFwZS5kYXRhID0gY2FycmllclN2Z1xuICAgICAgICBtYWluLmFwcGVuZENoaWxkKGNhcnJpZXJTaGFwZSlcblxuICAgICAgICBjb25zdCBzdWJtYXJpbmVTaGFwZSA9IGNyZWF0ZUVsZW1lbnQoXCJvYmplY3RcIixudWxsLFwic3VibWFyaW5lLXNoYXBlXCIpXG4gICAgICAgIHN1Ym1hcmluZVNoYXBlLmRhdGEgPSBzdWJtYXJpbmVTdmdcbiAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChzdWJtYXJpbmVTaGFwZSlcblxuICAgICAgICBjb25zdCBiYXR0bGVzaGlwU2hhcGUgPSBjcmVhdGVFbGVtZW50KFwib2JqZWN0XCIsbnVsbCxcImJhdHRsZXNoaXAtc2hhcGVcIilcbiAgICAgICAgYmF0dGxlc2hpcFNoYXBlLmRhdGEgPSBiYXR0bGVzaGlwU3ZnXG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQoYmF0dGxlc2hpcFNoYXBlKVxuXG4gICAgICAgIGNvbnN0IGRlc3Ryb3llclNoYXBlID0gY3JlYXRlRWxlbWVudChcIm9iamVjdFwiLG51bGwsXCJkZXN0cm95ZXItc2hhcGVcIilcbiAgICAgICAgZGVzdHJveWVyU2hhcGUuZGF0YSA9IGRlc3Ryb3llclN2Z1xuICAgICAgICBtYWluLmFwcGVuZENoaWxkKGRlc3Ryb3llclNoYXBlKVxuXG4gICAgICAgIGNvbnN0IHBhdHJvbFNoYXBlID0gY3JlYXRlRWxlbWVudChcIm9iamVjdFwiLG51bGwsXCJwYXRyb2wtc2hhcGVcIilcbiAgICAgICAgcGF0cm9sU2hhcGUuZGF0YSA9IHBhdHJvbFN2Z1xuICAgICAgICBtYWluLmFwcGVuZENoaWxkKHBhdHJvbFNoYXBlKVxuXG4gICAgfVxuXG4gICAgLy8gRGVsZXRlIEV2ZW50IExpc3RlbmVycyBhc3NvY2lhdGVkIHdpdGggdXNlciBTaGlwcyBwbGFjZW1lbnQgKHdoZW4geWV0IHBsYWNlZClcbiAgICBmdW5jdGlvbiBkZWxldGVVc2VyR2FtZWJvYXJkRXZlbnRMaXN0ZW5lcnMoKSB7XG5cbiAgICAgICAgLy8gRmlyc3QgcmVtb3ZlIHRoZSBldmVudCBsaXN0ZW5lcnMgZnJvbSB0aGUgc2hpcHNcbiAgICAgICAgY29uc3QgdXNlclNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi51c2VyU2hpcFwiKVxuICAgICAgICB1c2VyU2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgICAgIHNoaXAucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4gaGFuZGxlU2hpcENsaWNrKHNoaXAsZXZlbnQpKVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIFRoZW4gcmVtb3ZlIHRoZSBldmVudCBsaXN0ZW5lcnMgZnJvbSB0aGUgZ2FtZWJvYXJkIHNxdWFyZXNcbiAgICAgICAgY29uc3QgdXNlckJvYXJkU3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjdXNlckdhbWVib2FyZEdyaWQgLmdhbWVib2FyZFNxdWFyZVwiKVxuICAgICAgICB1c2VyQm9hcmRTcXVhcmVzLmZvckVhY2goc3F1YXJlID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc3F1YXJlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7fSlcbiAgICAgICAgICAgIHNxdWFyZS5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsICgpID0+IHt9KVxuICAgICAgICAgICAgc3F1YXJlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCAoKSA9PiB7fSlcblxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgLy8gQ2hhbmdlIGJhY2tncm91bmQgY29sb3Igb2YgdGhlIHNxdWFyZXMgcGFzc2VkIGFzIGFyZ3VtZW50XG4gICAgZnVuY3Rpb24gdXBkYXRlVXNlckdhbWVib2FyZFNoaXBQbGFjZW1lbnQoYXJyYXlPZlNxdWFyZXMpIHtcblxuICAgICAgICBhcnJheU9mU3F1YXJlcy5mb3JFYWNoKHNxdWFyZSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHVzZXJCb2FyZFNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWluZGV4PVwiJHtzcXVhcmV9XCJdYClcbiAgICAgICAgICAgIHVzZXJCb2FyZFNxdWFyZS5jbGFzc0xpc3QuYWRkKFwib2NjdXBpZWRcIilcblxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgLy8gVXBkYXRlcyB1c2VyIHNoaXB5YXJkIHdoZW4gYSBzaGlwIGlzIHBsYWNlZFxuICAgIGZ1bmN0aW9uIHVwZGF0ZVVzZXJTaGlweWFyZChzaGlwTmFtZSkge1xuXG4gICAgICAgIGNvbnN0IHNoaXBEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtzaGlwTmFtZX1gKVxuICAgICAgICBzaGlwRGl2LmNsYXNzTGlzdC5hZGQoXCJwbGFjZWRcIilcbiAgICAgICAgc2hpcERpdi5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIilcblxuICAgICAgICAvLyBVcGRhdGUgZ2xvYmFsIHZhcmlhYmxlc1xuICAgICAgICBzZWxlY3RlZFNoaXBMZW5ndGggPSAwXG4gICAgICAgIHNlbGVjdGVkU2hpcE5hbWUgPSBcIlwiXG4gICAgICAgIHBsYWNlZFNoaXBzQ291bnRlciArPSAxXG5cbiAgICAgICAgLy8gSWYgYWxsIHNoaXBzIGFyZSBwbGFjZWQsXG4gICAgICAgIC8vIHNob3cgdGhlIFwiU3RhcnQgR2FtZVwiIGJ1dHRvbiwgXG4gICAgICAgIC8vIHVwZGF0ZSBpbmZvIGFuZCBibG9jayB1c2VyIGdhbWVib2FyZFxuICAgICAgICBpZiAocGxhY2VkU2hpcHNDb3VudGVyID09PSA1KSB7XG5cbiAgICAgICAgICAgIC8vIEJsb2NrIHVzZXIgZ2FtZWJvYXJkXG4gICAgICAgICAgICBjb25zdCB1c2VyR2FtZWJvYXJkR3JpZCA9IGdldEVsZW1lbnQoXCJ1c2VyR2FtZWJvYXJkR3JpZFwiKVxuICAgICAgICAgICAgdXNlckdhbWVib2FyZEdyaWQuY2xhc3NMaXN0LmFkZChcImJsb2NrZWRcIilcbiAgICAgICAgICAgIC8vIENoYW5nZSBpbnN0cnVjdGlvbnMgdGV4dFxuICAgICAgICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnN0cnVjdGlvbnNcIilcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy50ZXh0Q29udGVudCA9IFwiQWxsIHNoaXBzIHBsYWNlZC4gQ2xpY2sgb24gdGhlIGJ1dHRvbiBiZWxvdyB0byBzdGFydCB0aGUgZ2FtZVwiXG5cbiAgICAgICAgICAgIC8vIFNob3cgXCJTdGFydCBHYW1lXCIgYnV0dG9uXG4gICAgICAgICAgICBzaG93U3RhcnRHYW1lQnV0dG9uKClcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvLyBVcGRhdGVzIGNvbXB1dGVyIGdhbWVib2FyZCB3aGVuIGFuIGF0dGFjayBpcyBtYWRlXG4gICAgZnVuY3Rpb24gdXBkYXRlQ29tcHV0ZXJHYW1lYm9hcmQoc3F1YXJlTnVtLGF0dGFja1Jlc3VsdCkge1xuXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQm9hcmRTcXVhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY29tcHV0ZXJHYW1lYm9hcmRHcmlkIC5nYW1lYm9hcmRTcXVhcmVbZGF0YS1pbmRleD1cIiR7c3F1YXJlTnVtfVwiXWApXG5cbiAgICAgICAgaWYgKGF0dGFja1Jlc3VsdCA9PT0gXCJNaXNzXCIpIHtcblxuICAgICAgICAgICAgY29tcHV0ZXJCb2FyZFNxdWFyZS5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKVxuXG4gICAgICAgIH0gZWxzZSBpZiAoYXR0YWNrUmVzdWx0ID09PSBcIlNoaXBIaXRcIikge1xuXG4gICAgICAgICAgICBjb21wdXRlckJvYXJkU3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJoaXRcIilcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvLyBVcGRhdGVzIGNvbXB1dGVyIHNoaXB5YXJkIHdoZW4gYSBzaGlwIGlzIHN1bmtcbiAgICBmdW5jdGlvbiB1cGRhdGVDb21wdXRlclNoaXB5YXJkKHNoaXBOYW1lKSB7XG5cbiAgICAgICAgY29uc3Qgc2hpcERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjb21wdXRlclN0YXR1c1BhbmVsIC4ke3NoaXBOYW1lfWApXG4gICAgICAgIHNoaXBEaXYuY2xhc3NMaXN0LmFkZChcInN1bmtcIilcblxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZUVsZW1lbnQsXG4gICAgICAgIGdldEVsZW1lbnQsXG4gICAgICAgIGxvYWRDb3Zlck1haW5VSSxcbiAgICAgICAgb25Vc2VyQm9hcmRDbGljayxcbiAgICAgICAgb25SYW5kb21QbGFjZW1lbnRDbGljayxcbiAgICAgICAgbG9hZFVzZXJHYW1lYm9hcmQsXG4gICAgICAgIGxvYWRHYW1lVUksXG4gICAgICAgIGRlbGV0ZVVzZXJHYW1lYm9hcmRFdmVudExpc3RlbmVycyxcbiAgICAgICAgb25NYW51YWxQbGFjZW1lbnRDbGljayxcbiAgICAgICAgc2hvd1VzZXJJbmZvLFxuICAgICAgICB1cGRhdGVVc2VyR2FtZWJvYXJkU2hpcFBsYWNlbWVudCxcbiAgICAgICAgdXBkYXRlVXNlclNoaXB5YXJkLFxuICAgICAgICBvbkNvbXB1dGVyQm9hcmRDbGljayxcbiAgICAgICAgc2hvd0NvbXB1dGVySW5mbyxcbiAgICAgICAgdXBkYXRlQ29tcHV0ZXJHYW1lYm9hcmQsXG4gICAgICAgIHVwZGF0ZUNvbXB1dGVyU2hpcHlhcmRcbiAgICB9XG5cbn0pKCkiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUJydW5vK0FjZSZkaXNwbGF5PXN3YXApO1wiXSk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1JQk0rUGxleCtNb25vJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcdGJvcmRlcjogMDtcXG5cXHRmb250LXNpemU6IDEwMCU7XFxuXFx0Zm9udDogaW5oZXJpdDtcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5ib2R5IHtcXG5cXHRsaW5lLWhlaWdodDogMTtcXG59XFxub2wsIHVsIHtcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlLCBxIHtcXG5cXHRxdW90ZXM6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG5cXHRjb250ZW50OiAnJztcXG5cXHRjb250ZW50OiBub25lO1xcbn1cXG50YWJsZSB7XFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXG59XFxuXFxuLyogTVkgT1dOIFNUWUxFUyBGUk9NIEhFUkUgKi9cXG5cXG4vKiBGb250cyAqL1xcblxcbmE6dmlzaXRlZCB7XFxuICAgIGNvbG9yOiAjZmZmO1xcbn1cXG5cXG4jc2NyZWVuIHtcXG4gICAgcG9zaXRpb246IGZpeGVkOyAvKiBvciBcXFwiYWJzb2x1dGVcXFwiICovXFxuICAgIHRvcDogMDtcXG4gICAgbGVmdDogMDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgei1pbmRleDogMDtcXG59XFxuXFxuLyogSEVBREVSICovXFxuXFxuI2hlYWRlciB7XFxuICAgIGhlaWdodDogMTAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDc0NzQ3O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBib3JkZXItYm90dG9tOiBzb2xpZCAxcHggIzAwMDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIHotaW5kZXg6IDM7XFxufVxcblxcbi50aXRsZSB7XFxuICAgIGZvbnQtc2l6ZTogMmVtO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGNvbG9yOiAjZThmOTAxO1xcbn1cXG5cXG4jbWFpbiB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgaGVpZ2h0OiA4MCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XFxufVxcblxcbi8qIENPVkVSICovXFxuXFxuLmdsb3dpbmctYnV0dG9uIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRDQUY1MDtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIGZvbnQtc2l6ZTogM2VtO1xcbiAgICBwYWRkaW5nOiAyMHB4IDMwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNXM7XFxuICAgIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiYSgwLCAwLCAwLCAwLjIpO1xcbn1cXG4gIFxcbi5nbG93aW5nLWJ1dHRvbjpob3ZlciB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcXG4gICAgYm94LXNoYWRvdzogMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDAgMjBweCByZ2JhKDc2LCAxNzUsIDgwLCAwLjYpO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGdsb3dpbmcyIHtcXG4gICAgMCUge1xcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDVweCByZ2JhKDAsIDAsIDAsIDAuMiksIDAgMCAxMHB4IHJnYmEoNzYsIDE3NSwgODAsIDAuMik7XFxuICAgIH1cXG4gICAgNTAlIHtcXG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAwIDIwcHggcmdiYSg3NiwgMTc1LCA4MCwgMC41KTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDAgMTBweCByZ2JhKDc2LCAxNzUsIDgwLCAwLjIpO1xcbiAgICB9XFxufVxcblxcbi5nbG93aW5nLWJ1dHRvbiB7XFxuICAgIGFuaW1hdGlvbjogZ2xvd2luZzIgMnMgaW5maW5pdGU7XFxufVxcblxcbi8qIENPVkVSIFNISVBTICovXFxuXFxuI2NhcnJpZXItc2hhcGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxODBweDtcXG4gICAgaGVpZ2h0OiA2MHB4O1xcbiAgICB0b3A6IDIwJTtcXG4gICAgYW5pbWF0aW9uOiBtb3ZlLXJpZ2h0LWxlZnQgMTBzIGxpbmVhciBpbmZpbml0ZTsgLyogYWRqdXN0IHRoZSB0aW1lIGFzIG5lZWRlZCAqL1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIG1vdmUtcmlnaHQtbGVmdCB7XFxuICAgIDAlIHsgcmlnaHQ6IC0xMDAlOyB9IC8qIFN0YXJ0IGZyb20gb2ZmIHRoZSByaWdodCBvZiB0aGUgc2NyZWVuICovXFxuICAgIDEwMCUgeyByaWdodDogMTAwJTsgfSAvKiBFbmQgb2ZmIHRoZSBsZWZ0IG9mIHRoZSBzY3JlZW4gKi9cXG59XFxuXFxuI3N1Ym1hcmluZS1zaGFwZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDEyMHB4O1xcbiAgICBoZWlnaHQ6IDYwcHg7XFxuICAgIGxlZnQ6IDIwJTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcbiAgICBhbmltYXRpb246IG1vdmUtdG9wLWRvd24gMTBzIGxpbmVhciBpbmZpbml0ZTtcXG4gICAgei1pbmRleDogMTtcXG59XFxuXFxuQGtleWZyYW1lcyBtb3ZlLXRvcC1kb3duIHtcXG4gICAgMCUgeyB0b3A6IC0yMDBweCB9XFxuICAgIDEwMCUgeyB0b3A6IDE1MDBweH1cXG59XFxuXFxuI2JhdHRsZXNoaXAtc2hhcGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxNTBweDtcXG4gICAgaGVpZ2h0OiA2MHB4O1xcbiAgICB0b3A6IDY1JTtcXG4gICAgYW5pbWF0aW9uOiBtb3ZlLWxlZnQtcmlnaHQgMTBzIGxpbmVhciBpbmZpbml0ZTsgLyogYWRqdXN0IHRoZSB0aW1lIGFzIG5lZWRlZCAqL1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIG1vdmUtbGVmdC1yaWdodCB7XFxuICAgIDAlIHsgbGVmdDogLTEwMCU7IH0gLyogU3RhcnQgZnJvbSBvZmYgdGhlIGxlZnQgb2YgdGhlIHNjcmVlbiAqL1xcbiAgICAxMDAlIHsgbGVmdDogMTAwJTsgfSAvKiBFbmQgb2ZmIHRoZSByaWdodCBvZiB0aGUgc2NyZWVuICovXFxufVxcblxcbiNkZXN0cm95ZXItc2hhcGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxMjBweDtcXG4gICAgaGVpZ2h0OiA2MHB4O1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpO1xcbiAgICBsZWZ0OiA4MCU7XFxuICAgIGFuaW1hdGlvbjogbW92ZS1kb3duLXRvcCAxMHMgbGluZWFyIGluZmluaXRlO1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIG1vdmUtZG93bi10b3Age1xcbiAgICAwJSB7IHRvcDogMTUwMHB4OyB9XFxuICAgIDEwMCUgeyB0b3A6IC0yMDBweDsgfVxcbn1cXG5cXG4jcGF0cm9sLXNoYXBlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogOTBweDtcXG4gICAgaGVpZ2h0OiA2MHB4O1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xcbiAgICB0b3A6IDkwJTtcXG4gICAgYW5pbWF0aW9uOiBtb3ZlLXJpZ2h0LWxlZnQgMTBzIGxpbmVhciBpbmZpbml0ZTtcXG4gICAgei1pbmRleDogMTtcXG59XFxuXFxuLyogTUFJTiAtIEdBTUUgKi9cXG5cXG4ucGxheWVyU2lkZSB7XFxuICAgIHdpZHRoOiA1MCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgcGFkZGluZzogNSU7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gICAgZ2FwOiAyZW07XFxuICAgIG1hcmdpbi10b3A6IDVlbTtcXG59XFxuXFxuLmdhbWVIZWFkZXIge1xcbiAgICB3aWR0aDogNDQwcHg7XFxuICAgIGZvbnQtc2l6ZTogMS41ZW07XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuI3VzZXJHYW1lSGVhZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0ZDMTE1OTtcXG59XFxuXFxuI2NvbXB1dGVyR2FtZUhlYWRlcntcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzcyN0Q5NTtcXG59XFxuXFxuLmdhbWVib2FyZENvbnRhaW5lciB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLnhIZWFkZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGxlZnQ7XFxuICAgIHBhZGRpbmctbGVmdDogMi41ZW07XFxufVxcblxcbi54SGVhZGVyU3F1YXJlIHtcXG4gICAgd2lkdGg6IDM4cHg7XFxuICAgIGhlaWdodDogMzhweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgZm9udC1zaXplOiAxZW07XFxufVxcblxcbi5ib3R0b21Cb2FyZCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLnlIZWFkZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4ueUhlYWRlclNxdWFyZSB7XFxuICAgIHdpZHRoOiAzOHB4O1xcbiAgICBoZWlnaHQ6IDM4cHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcbn1cXG5cXG4ueUhlYWRlclNoaXB5YXJkIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgZm9udC1zaXplOiAxZW07XFxuICAgIHdyaXRpbmctbW9kZTogdmVydGljYWwtcmw7XFxuICAgIHRleHQtb3JpZW50YXRpb246IG1peGVkO1xcbiAgICByb3RhdGU6IDE4MGRlZztcXG4gICAgbWFyZ2luLXRvcDogMS44ZW07XFxufVxcblxcbi5ncmlkUGFuZWxDb250YWluZXIge1xcbiAgICB3aWR0aDogMzgwcHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5nYW1lYm9hcmRHcmlkIHtcXG4gICAgd2lkdGg6IDM4MHB4O1xcbiAgICBoZWlnaHQ6IDM4MHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxufVxcblxcbiN1c2VyR2FtZWJvYXJkR3JpZCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4jdXNlckdhbWVib2FyZEdyaWQuYmxvY2tlZCB7XFxuICAgIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuXFxuLmdhbWVib2FyZFNxdWFyZSB7XFxuICAgIHdpZHRoOiAzNnB4O1xcbiAgICBoZWlnaHQ6IDM2cHg7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICNmZmY7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcbiAgICBjdXJzb3I6IGluaGVyaXQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhMWRjZmY7XFxufVxcblxcbiN1c2VyR2FtZWJvYXJkR3JpZCAuaG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTk5OTk5O1xcbiAgICBvcGFjaXR5OiAwLjc7XFxufVxcblxcbiN1c2VyR2FtZWJvYXJkR3JpZCAub2NjdXBpZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTk5OTk5O1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4jdXNlckdhbWVib2FyZEdyaWQgLmhvdmVyTGltaXRzRXhjZWVkZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzIzNDM0O1xcbn1cXG5cXG4jY29tcHV0ZXJHYW1lYm9hcmRHcmlkIC5nYW1lYm9hcmRTcXVhcmU6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWI4OGU3O1xcbn1cXG5cXG4jY29tcHV0ZXJHYW1lYm9hcmRHcmlkLmJsb2NrZWQgLmdhbWVib2FyZFNxdWFyZTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhMWRjZmY7XFxuICAgIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuXFxuLmdhbWVib2FyZFNxdWFyZS5taXNzIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2MyMzQzNDtcXG59XFxuXFxuLmdhbWVib2FyZFNxdWFyZS5taXNzOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2MyMzQzNCFpbXBvcnRhbnQ7XFxufVxcblxcbi5nYW1lYm9hcmRTcXVhcmUuaGl0IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRDQUY1MDtcXG59XFxuXFxuLmdhbWVib2FyZFNxdWFyZS5oaXQ6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNENBRjUwIWltcG9ydGFudDtcXG59XFxuXFxuLyogU0hJUFlBUkQgKi9cXG5cXG4uc3RhdHVzUGFuZWwge1xcbiAgICB3aWR0aDogMzgycHg7XFxuICAgIGhlaWdodDogNzhweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbiAgICBtYXJnaW4tdG9wOiAzNnB4O1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQocmdiYSgwLCAwLCAwLCAwLjUpIDJweCwgdHJhbnNwYXJlbnQgMnB4KSwgbGluZWFyLWdyYWRpZW50KDkwZGVnLCByZ2JhKDAsIDAsIDAsIDAuNSkgMnB4LCB0cmFuc3BhcmVudCAycHgpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDM4cHggMzhweDtcXG4gICAgZ2FwOiAycHg7XFxufVxcblxcbi5jYXJyaWVyIHtcXG4gICAgd2lkdGg6IDE4OHB4O1xcbiAgICBoZWlnaHQ6IDM2cHg7XFxufVxcblxcbi5iYXR0bGVzaGlwIHtcXG4gICAgd2lkdGg6IDE1MHB4O1xcbiAgICBoZWlnaHQ6IDM2cHg7XFxufVxcblxcbi5zdWJtYXJpbmUge1xcbiAgICB3aWR0aDogMTEycHg7XFxuICAgIGhlaWdodDogMzZweDtcXG59XFxuXFxuLmRlc3Ryb3llciB7XFxuICAgIHdpZHRoOiAxMTJweDtcXG4gICAgaGVpZ2h0OiAzNnB4O1xcbn1cXG5cXG4uYm9hdCB7XFxuICAgIHdpZHRoOiA3NHB4O1xcbiAgICBoZWlnaHQ6IDM2cHg7XFxufVxcblxcbi51c2VyU2hpcCB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgb3BhY2l0eTogMC43O1xcbn1cXG5cXG4udXNlclNoaXA6aG92ZXIge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4udXNlclNoaXAubm8taG92ZXI6aG92ZXIge1xcbiAgICBvcGFjaXR5OiAwLjc7XFxuICAgIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuXFxuLnVzZXJTaGlwLnNlbGVjdGVkIHtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuXFxuLnVzZXJTaGlwLnBsYWNlZCB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuXFxuLnNoaXAuc3VuayB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLnNoaXAuc3Vuazo6YWZ0ZXIge1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgbGVmdDogMDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMnB4O1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMjMxLCA5LCA5KTtcXG59XFxuXFxuQGtleWZyYW1lcyBnbG93aW5nIHtcXG4gICAgMCUgeyBjb2xvcjogI0ZDMTE1OTsgfVxcbiAgICA1MCUgeyBjb2xvcjogIzAwMDsgfVxcbiAgICAxMDAlIHsgY29sb3I6ICNGQzExNTk7IH1cXG4gIH1cXG5cXG4uaW5zdHJ1Y3Rpb25zIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgZm9udC1zaXplOiAwLjhlbTtcXG4gICAgbGluZS1oZWlnaHQ6IDEuNWVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFuaW1hdGlvbjogZ2xvd2luZyAxLjVzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuXFxuLmJ1dHRvbnNDb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZ2FwOiAyZW07XFxufVxcblxcbi5wbGFjZW1lbnRCdXR0b24ge1xcbiAgICB3aWR0aDogMTgwcHg7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggI2ZmZjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRDQUY1MDtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGZvbnQtZmFtaWx5OiAnSUJNIFBsZXggTW9ubycsIG1vbm9zcGFjZTtcXG4gICAgZm9udC1zaXplOiAwLjhlbTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICBwYWRkaW5nOiAxZW07XFxufVxcblxcbi5wbGFjZW1lbnRCdXR0b246aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2U4ZTQxO1xcbn1cXG5cXG4jc3RhcnQtZ2FtZS1idXR0b24ge1xcbiAgICB3aWR0aDogMTgwcHg7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggI2ZmZjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRDQUY1MDtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGZvbnQtZmFtaWx5OiAnSUJNIFBsZXggTW9ubycsIG1vbm9zcGFjZTtcXG4gICAgZm9udC1zaXplOiAwLjhlbTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICBwYWRkaW5nOiAxZW07XFxufVxcblxcbiNzdGFydC1nYW1lLWJ1dHRvbjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzZThlNDE7XFxufVxcblxcbi5jb21wdXRlckluZm8ge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBmb250LXNpemU6IDAuOGVtO1xcbiAgICBsaW5lLWhlaWdodDogMS41ZW07XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuLyogRk9PVEVSICovXFxuXFxuI2Zvb3RlciB7XFxuICAgIGhlaWdodDogMTAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDc0NzQ3O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBib3JkZXItdG9wOiBzb2xpZCAxcHggIzAwMDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIHotaW5kZXg6IDM7XFxufVxcblxcbi5jcmVkaXRzIHtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGZvbnQtZmFtaWx5OiAnSUJNIFBsZXggTW9ubycsIG1vbm9zcGFjZTtcXG4gICAgZm9udC1zaXplOiAwLjhlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4vKiBTdHlsZSB0aGUgbGluayB0byByZW1vdmUgZGVmYXVsdCBzdHlsaW5nICovXFxuLmdpdGh1Yi1saW5rIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGNvbG9yOiBpbmhlcml0O1xcbn1cXG5cXG4vKiBBZGQgdGhlIGhvdmVyIGVmZmVjdCAqL1xcbi5naXRodWItaWNvbiB7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjVzIGVhc2UtaW4tb3V0OyAvKiBBZGQgYSB0cmFuc2l0aW9uIGZvciB0aGUgdHJhbnNmb3JtIHByb3BlcnR5ICovXFxufVxcblxcbi5naXRodWItbGluazpob3ZlciAuZ2l0aHViLWljb24ge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyAvKiBSb3RhdGUgdGhlIGljb24gMTgwIGRlZ3JlZXMgd2hlbiBob3ZlcmVkICovXFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvaW5kZXguY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Q0FHQzs7QUFFRDs7Ozs7Ozs7Ozs7OztDQWFDLFNBQVM7Q0FDVCxVQUFVO0NBQ1YsU0FBUztDQUNULGVBQWU7Q0FDZixhQUFhO0NBQ2Isd0JBQXdCO0FBQ3pCO0FBQ0EsZ0RBQWdEO0FBQ2hEOztDQUVDLGNBQWM7QUFDZjtBQUNBO0NBQ0MsY0FBYztBQUNmO0FBQ0E7Q0FDQyxnQkFBZ0I7QUFDakI7QUFDQTtDQUNDLFlBQVk7QUFDYjtBQUNBOztDQUVDLFdBQVc7Q0FDWCxhQUFhO0FBQ2Q7QUFDQTtDQUNDLHlCQUF5QjtDQUN6QixpQkFBaUI7QUFDbEI7O0FBRUEsNEJBQTRCOztBQUU1QixVQUFVOztBQUtWO0lBQ0ksV0FBVztBQUNmOztBQUVBO0lBQ0ksZUFBZSxFQUFFLGtCQUFrQjtJQUNuQyxNQUFNO0lBQ04sT0FBTztJQUNQLFdBQVc7SUFDWCxZQUFZO0lBQ1osc0JBQXNCO0lBQ3RCLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsVUFBVTtBQUNkOztBQUVBLFdBQVc7O0FBRVg7SUFDSSxXQUFXO0lBQ1gseUJBQXlCO0lBQ3pCLGFBQWE7SUFDYiw2QkFBNkI7SUFDN0IsbUJBQW1CO0lBQ25CLHVCQUF1QjtJQUN2QixVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxjQUFjO0lBQ2Qsd0JBQXdCO0lBQ3hCLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxrQkFB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QkFBc0I7QUFDMUI7O0FBRUEsV0FBVzs7QUFFWDtJQUNJLFdBQVc7SUFDWCx5QkFBeUI7SUFDekIsYUFBYTtJQUNiLDBCQUEwQjtJQUMxQixtQkFBbUI7SUFDbkIsdUJBQXVCO0lBQ3ZCLFVBQVU7QUFDZDs7QUFFQTtJQUNJLFdBQVc7SUFDWCx1Q0FBdUM7SUFDdkMsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtBQUN0Qjs7QUFFQSw2Q0FBNkM7QUFDN0M7SUFDSSxxQkFBcUI7SUFDckIscUJBQXFCO0lBQ3JCLGNBQWM7QUFDbEI7O0FBRUEseUJBQXlCO0FBQ3pCO0lBQ0ksc0NBQXNDLEVBQUUsZ0RBQWdEO0FBQzVGOztBQUVBO0lBQ0kseUJBQXlCLEVBQUUsNkNBQTZDO0FBQzVFXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcdGJvcmRlcjogMDtcXG5cXHRmb250LXNpemU6IDEwMCU7XFxuXFx0Zm9udDogaW5oZXJpdDtcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5ib2R5IHtcXG5cXHRsaW5lLWhlaWdodDogMTtcXG59XFxub2wsIHVsIHtcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlLCBxIHtcXG5cXHRxdW90ZXM6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG5cXHRjb250ZW50OiAnJztcXG5cXHRjb250ZW50OiBub25lO1xcbn1cXG50YWJsZSB7XFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXG59XFxuXFxuLyogTVkgT1dOIFNUWUxFUyBGUk9NIEhFUkUgKi9cXG5cXG4vKiBGb250cyAqL1xcblxcbkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUJydW5vK0FjZSZkaXNwbGF5PXN3YXAnKTtcXG5AaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1JQk0rUGxleCtNb25vJmRpc3BsYXk9c3dhcCcpO1xcblxcbmE6dmlzaXRlZCB7XFxuICAgIGNvbG9yOiAjZmZmO1xcbn1cXG5cXG4jc2NyZWVuIHtcXG4gICAgcG9zaXRpb246IGZpeGVkOyAvKiBvciBcXFwiYWJzb2x1dGVcXFwiICovXFxuICAgIHRvcDogMDtcXG4gICAgbGVmdDogMDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgei1pbmRleDogMDtcXG59XFxuXFxuLyogSEVBREVSICovXFxuXFxuI2hlYWRlciB7XFxuICAgIGhlaWdodDogMTAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDc0NzQ3O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBib3JkZXItYm90dG9tOiBzb2xpZCAxcHggIzAwMDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIHotaW5kZXg6IDM7XFxufVxcblxcbi50aXRsZSB7XFxuICAgIGZvbnQtc2l6ZTogMmVtO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGNvbG9yOiAjZThmOTAxO1xcbn1cXG5cXG4jbWFpbiB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgaGVpZ2h0OiA4MCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XFxufVxcblxcbi8qIENPVkVSICovXFxuXFxuLmdsb3dpbmctYnV0dG9uIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRDQUY1MDtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIGZvbnQtc2l6ZTogM2VtO1xcbiAgICBwYWRkaW5nOiAyMHB4IDMwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNXM7XFxuICAgIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiYSgwLCAwLCAwLCAwLjIpO1xcbn1cXG4gIFxcbi5nbG93aW5nLWJ1dHRvbjpob3ZlciB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcXG4gICAgYm94LXNoYWRvdzogMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDAgMjBweCByZ2JhKDc2LCAxNzUsIDgwLCAwLjYpO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGdsb3dpbmcyIHtcXG4gICAgMCUge1xcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDVweCByZ2JhKDAsIDAsIDAsIDAuMiksIDAgMCAxMHB4IHJnYmEoNzYsIDE3NSwgODAsIDAuMik7XFxuICAgIH1cXG4gICAgNTAlIHtcXG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAwIDIwcHggcmdiYSg3NiwgMTc1LCA4MCwgMC41KTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDAgMTBweCByZ2JhKDc2LCAxNzUsIDgwLCAwLjIpO1xcbiAgICB9XFxufVxcblxcbi5nbG93aW5nLWJ1dHRvbiB7XFxuICAgIGFuaW1hdGlvbjogZ2xvd2luZzIgMnMgaW5maW5pdGU7XFxufVxcblxcbi8qIENPVkVSIFNISVBTICovXFxuXFxuI2NhcnJpZXItc2hhcGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxODBweDtcXG4gICAgaGVpZ2h0OiA2MHB4O1xcbiAgICB0b3A6IDIwJTtcXG4gICAgYW5pbWF0aW9uOiBtb3ZlLXJpZ2h0LWxlZnQgMTBzIGxpbmVhciBpbmZpbml0ZTsgLyogYWRqdXN0IHRoZSB0aW1lIGFzIG5lZWRlZCAqL1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIG1vdmUtcmlnaHQtbGVmdCB7XFxuICAgIDAlIHsgcmlnaHQ6IC0xMDAlOyB9IC8qIFN0YXJ0IGZyb20gb2ZmIHRoZSByaWdodCBvZiB0aGUgc2NyZWVuICovXFxuICAgIDEwMCUgeyByaWdodDogMTAwJTsgfSAvKiBFbmQgb2ZmIHRoZSBsZWZ0IG9mIHRoZSBzY3JlZW4gKi9cXG59XFxuXFxuI3N1Ym1hcmluZS1zaGFwZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDEyMHB4O1xcbiAgICBoZWlnaHQ6IDYwcHg7XFxuICAgIGxlZnQ6IDIwJTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcbiAgICBhbmltYXRpb246IG1vdmUtdG9wLWRvd24gMTBzIGxpbmVhciBpbmZpbml0ZTtcXG4gICAgei1pbmRleDogMTtcXG59XFxuXFxuQGtleWZyYW1lcyBtb3ZlLXRvcC1kb3duIHtcXG4gICAgMCUgeyB0b3A6IC0yMDBweCB9XFxuICAgIDEwMCUgeyB0b3A6IDE1MDBweH1cXG59XFxuXFxuI2JhdHRsZXNoaXAtc2hhcGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxNTBweDtcXG4gICAgaGVpZ2h0OiA2MHB4O1xcbiAgICB0b3A6IDY1JTtcXG4gICAgYW5pbWF0aW9uOiBtb3ZlLWxlZnQtcmlnaHQgMTBzIGxpbmVhciBpbmZpbml0ZTsgLyogYWRqdXN0IHRoZSB0aW1lIGFzIG5lZWRlZCAqL1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIG1vdmUtbGVmdC1yaWdodCB7XFxuICAgIDAlIHsgbGVmdDogLTEwMCU7IH0gLyogU3RhcnQgZnJvbSBvZmYgdGhlIGxlZnQgb2YgdGhlIHNjcmVlbiAqL1xcbiAgICAxMDAlIHsgbGVmdDogMTAwJTsgfSAvKiBFbmQgb2ZmIHRoZSByaWdodCBvZiB0aGUgc2NyZWVuICovXFxufVxcblxcbiNkZXN0cm95ZXItc2hhcGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxMjBweDtcXG4gICAgaGVpZ2h0OiA2MHB4O1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpO1xcbiAgICBsZWZ0OiA4MCU7XFxuICAgIGFuaW1hdGlvbjogbW92ZS1kb3duLXRvcCAxMHMgbGluZWFyIGluZmluaXRlO1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIG1vdmUtZG93bi10b3Age1xcbiAgICAwJSB7IHRvcDogMTUwMHB4OyB9XFxuICAgIDEwMCUgeyB0b3A6IC0yMDBweDsgfVxcbn1cXG5cXG4jcGF0cm9sLXNoYXBlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogOTBweDtcXG4gICAgaGVpZ2h0OiA2MHB4O1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xcbiAgICB0b3A6IDkwJTtcXG4gICAgYW5pbWF0aW9uOiBtb3ZlLXJpZ2h0LWxlZnQgMTBzIGxpbmVhciBpbmZpbml0ZTtcXG4gICAgei1pbmRleDogMTtcXG59XFxuXFxuLyogTUFJTiAtIEdBTUUgKi9cXG5cXG4ucGxheWVyU2lkZSB7XFxuICAgIHdpZHRoOiA1MCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgcGFkZGluZzogNSU7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gICAgZ2FwOiAyZW07XFxuICAgIG1hcmdpbi10b3A6IDVlbTtcXG59XFxuXFxuLmdhbWVIZWFkZXIge1xcbiAgICB3aWR0aDogNDQwcHg7XFxuICAgIGZvbnQtc2l6ZTogMS41ZW07XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuI3VzZXJHYW1lSGVhZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0ZDMTE1OTtcXG59XFxuXFxuI2NvbXB1dGVyR2FtZUhlYWRlcntcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzcyN0Q5NTtcXG59XFxuXFxuLmdhbWVib2FyZENvbnRhaW5lciB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLnhIZWFkZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGxlZnQ7XFxuICAgIHBhZGRpbmctbGVmdDogMi41ZW07XFxufVxcblxcbi54SGVhZGVyU3F1YXJlIHtcXG4gICAgd2lkdGg6IDM4cHg7XFxuICAgIGhlaWdodDogMzhweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgZm9udC1zaXplOiAxZW07XFxufVxcblxcbi5ib3R0b21Cb2FyZCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLnlIZWFkZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4ueUhlYWRlclNxdWFyZSB7XFxuICAgIHdpZHRoOiAzOHB4O1xcbiAgICBoZWlnaHQ6IDM4cHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcbn1cXG5cXG4ueUhlYWRlclNoaXB5YXJkIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgZm9udC1zaXplOiAxZW07XFxuICAgIHdyaXRpbmctbW9kZTogdmVydGljYWwtcmw7XFxuICAgIHRleHQtb3JpZW50YXRpb246IG1peGVkO1xcbiAgICByb3RhdGU6IDE4MGRlZztcXG4gICAgbWFyZ2luLXRvcDogMS44ZW07XFxufVxcblxcbi5ncmlkUGFuZWxDb250YWluZXIge1xcbiAgICB3aWR0aDogMzgwcHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5nYW1lYm9hcmRHcmlkIHtcXG4gICAgd2lkdGg6IDM4MHB4O1xcbiAgICBoZWlnaHQ6IDM4MHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxufVxcblxcbiN1c2VyR2FtZWJvYXJkR3JpZCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4jdXNlckdhbWVib2FyZEdyaWQuYmxvY2tlZCB7XFxuICAgIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuXFxuLmdhbWVib2FyZFNxdWFyZSB7XFxuICAgIHdpZHRoOiAzNnB4O1xcbiAgICBoZWlnaHQ6IDM2cHg7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICNmZmY7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcbiAgICBjdXJzb3I6IGluaGVyaXQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhMWRjZmY7XFxufVxcblxcbiN1c2VyR2FtZWJvYXJkR3JpZCAuaG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTk5OTk5O1xcbiAgICBvcGFjaXR5OiAwLjc7XFxufVxcblxcbiN1c2VyR2FtZWJvYXJkR3JpZCAub2NjdXBpZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTk5OTk5O1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4jdXNlckdhbWVib2FyZEdyaWQgLmhvdmVyTGltaXRzRXhjZWVkZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzIzNDM0O1xcbn1cXG5cXG4jY29tcHV0ZXJHYW1lYm9hcmRHcmlkIC5nYW1lYm9hcmRTcXVhcmU6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWI4OGU3O1xcbn1cXG5cXG4jY29tcHV0ZXJHYW1lYm9hcmRHcmlkLmJsb2NrZWQgLmdhbWVib2FyZFNxdWFyZTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhMWRjZmY7XFxuICAgIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuXFxuLmdhbWVib2FyZFNxdWFyZS5taXNzIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2MyMzQzNDtcXG59XFxuXFxuLmdhbWVib2FyZFNxdWFyZS5taXNzOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2MyMzQzNCFpbXBvcnRhbnQ7XFxufVxcblxcbi5nYW1lYm9hcmRTcXVhcmUuaGl0IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRDQUY1MDtcXG59XFxuXFxuLmdhbWVib2FyZFNxdWFyZS5oaXQ6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNENBRjUwIWltcG9ydGFudDtcXG59XFxuXFxuLyogU0hJUFlBUkQgKi9cXG5cXG4uc3RhdHVzUGFuZWwge1xcbiAgICB3aWR0aDogMzgycHg7XFxuICAgIGhlaWdodDogNzhweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbiAgICBtYXJnaW4tdG9wOiAzNnB4O1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQocmdiYSgwLCAwLCAwLCAwLjUpIDJweCwgdHJhbnNwYXJlbnQgMnB4KSwgbGluZWFyLWdyYWRpZW50KDkwZGVnLCByZ2JhKDAsIDAsIDAsIDAuNSkgMnB4LCB0cmFuc3BhcmVudCAycHgpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDM4cHggMzhweDtcXG4gICAgZ2FwOiAycHg7XFxufVxcblxcbi5jYXJyaWVyIHtcXG4gICAgd2lkdGg6IDE4OHB4O1xcbiAgICBoZWlnaHQ6IDM2cHg7XFxufVxcblxcbi5iYXR0bGVzaGlwIHtcXG4gICAgd2lkdGg6IDE1MHB4O1xcbiAgICBoZWlnaHQ6IDM2cHg7XFxufVxcblxcbi5zdWJtYXJpbmUge1xcbiAgICB3aWR0aDogMTEycHg7XFxuICAgIGhlaWdodDogMzZweDtcXG59XFxuXFxuLmRlc3Ryb3llciB7XFxuICAgIHdpZHRoOiAxMTJweDtcXG4gICAgaGVpZ2h0OiAzNnB4O1xcbn1cXG5cXG4uYm9hdCB7XFxuICAgIHdpZHRoOiA3NHB4O1xcbiAgICBoZWlnaHQ6IDM2cHg7XFxufVxcblxcbi51c2VyU2hpcCB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgb3BhY2l0eTogMC43O1xcbn1cXG5cXG4udXNlclNoaXA6aG92ZXIge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4udXNlclNoaXAubm8taG92ZXI6aG92ZXIge1xcbiAgICBvcGFjaXR5OiAwLjc7XFxuICAgIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuXFxuLnVzZXJTaGlwLnNlbGVjdGVkIHtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuXFxuLnVzZXJTaGlwLnBsYWNlZCB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuXFxuLnNoaXAuc3VuayB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLnNoaXAuc3Vuazo6YWZ0ZXIge1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgbGVmdDogMDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMnB4O1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMjMxLCA5LCA5KTtcXG59XFxuXFxuQGtleWZyYW1lcyBnbG93aW5nIHtcXG4gICAgMCUgeyBjb2xvcjogI0ZDMTE1OTsgfVxcbiAgICA1MCUgeyBjb2xvcjogIzAwMDsgfVxcbiAgICAxMDAlIHsgY29sb3I6ICNGQzExNTk7IH1cXG4gIH1cXG5cXG4uaW5zdHJ1Y3Rpb25zIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgZm9udC1zaXplOiAwLjhlbTtcXG4gICAgbGluZS1oZWlnaHQ6IDEuNWVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFuaW1hdGlvbjogZ2xvd2luZyAxLjVzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuXFxuLmJ1dHRvbnNDb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZ2FwOiAyZW07XFxufVxcblxcbi5wbGFjZW1lbnRCdXR0b24ge1xcbiAgICB3aWR0aDogMTgwcHg7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggI2ZmZjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRDQUY1MDtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGZvbnQtZmFtaWx5OiAnSUJNIFBsZXggTW9ubycsIG1vbm9zcGFjZTtcXG4gICAgZm9udC1zaXplOiAwLjhlbTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICBwYWRkaW5nOiAxZW07XFxufVxcblxcbi5wbGFjZW1lbnRCdXR0b246aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2U4ZTQxO1xcbn1cXG5cXG4jc3RhcnQtZ2FtZS1idXR0b24ge1xcbiAgICB3aWR0aDogMTgwcHg7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggI2ZmZjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRDQUY1MDtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGZvbnQtZmFtaWx5OiAnSUJNIFBsZXggTW9ubycsIG1vbm9zcGFjZTtcXG4gICAgZm9udC1zaXplOiAwLjhlbTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICBwYWRkaW5nOiAxZW07XFxufVxcblxcbiNzdGFydC1nYW1lLWJ1dHRvbjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzZThlNDE7XFxufVxcblxcbi5jb21wdXRlckluZm8ge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBmb250LXNpemU6IDAuOGVtO1xcbiAgICBsaW5lLWhlaWdodDogMS41ZW07XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuLyogRk9PVEVSICovXFxuXFxuI2Zvb3RlciB7XFxuICAgIGhlaWdodDogMTAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDc0NzQ3O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBib3JkZXItdG9wOiBzb2xpZCAxcHggIzAwMDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIHotaW5kZXg6IDM7XFxufVxcblxcbi5jcmVkaXRzIHtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGZvbnQtZmFtaWx5OiAnSUJNIFBsZXggTW9ubycsIG1vbm9zcGFjZTtcXG4gICAgZm9udC1zaXplOiAwLjhlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4vKiBTdHlsZSB0aGUgbGluayB0byByZW1vdmUgZGVmYXVsdCBzdHlsaW5nICovXFxuLmdpdGh1Yi1saW5rIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGNvbG9yOiBpbmhlcml0O1xcbn1cXG5cXG4vKiBBZGQgdGhlIGhvdmVyIGVmZmVjdCAqL1xcbi5naXRodWItaWNvbiB7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjVzIGVhc2UtaW4tb3V0OyAvKiBBZGQgYSB0cmFuc2l0aW9uIGZvciB0aGUgdHJhbnNmb3JtIHByb3BlcnR5ICovXFxufVxcblxcbi5naXRodWItbGluazpob3ZlciAuZ2l0aHViLWljb24ge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyAvKiBSb3RhdGUgdGhlIGljb24gMTgwIGRlZ3JlZXMgd2hlbiBob3ZlcmVkICovXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjVhNjkyZDlmZDJmYjhjMzQyYmVjZTRjMjY0MWE1MWNkLnN2Z1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmMDRkZjcxZDdjMWQ3ODZkYWFmMGI3NGI0YzA2YWNmZS5zdmdcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiMjNkZTg1ODFjOWE2NTg0NmFhYTEwYmEwMWVhZmY2YjAuc3ZnXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjZlZjk1N2M4ZmM5ZjI0MTc5NGE0Y2M4YWY2M2RlYjMxLnN2Z1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIwZTJiMDc4MjY4OWZlNzNiZjFkMDI4Nzg1MGM4NzA4OC5zdmdcIjsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJHYW1lYm9hcmQiLCJfYm9hcmQiLCJBcnJheSIsImZpbGwiLCJfc2hpcHMiLCJfZ2FtZW92ZXIiLCJnZXRCb2FyZCIsImdldFNoaXBzIiwiZ2V0R2FtZU92ZXIiLCJzZXRHYW1lT3ZlciIsImdldFNxdWFyZSIsInNxdWFyZSIsInNldFNxdWFyZSIsIm51bSIsInZhbHVlIiwic2V0U2hpcCIsInNoaXAiLCJwdXNoIiwiaXNTYW1lTGluZSIsIngiLCJ5IiwiTWF0aCIsImZsb29yIiwiaXNWYWxpZE5leHRTcXVhcmUiLCJjdXJyZW50IiwibmV4dCIsImRpcmVjdGlvbiIsImlzRW1wdHlTcXVhcmUiLCJnZXROZXh0UG9zaXRpb24iLCJjdXJyZW50UG9zIiwicGxhY2VTaGlwIiwic3RhcnRQb3MiLCJuZXh0UG9zIiwidmFsaWRQb3NBcnJheSIsImkiLCJnZXRMZW5ndGgiLCJlcnJvciIsImxlbmd0aCIsImdldE5hbWUiLCJkYXRhIiwic3VjY2VzcyIsImZpbmRTaGlwIiwic2hpcE5hbWUiLCJmaW5kIiwicyIsImNoZWNrR2FtZU92ZXIiLCJkZWxldGVTaGlwIiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJzcGxpY2UiLCJyZWNlaXZlQXR0YWNrIiwic3F1YXJlTnVtYmVyIiwicmVzdWx0IiwidHlwZSIsInN1bmsiLCJnYW1lb3ZlciIsImRhbWFnZWRTaGlwIiwiaGl0IiwiaXNTdW5rIiwidmlldyIsIlBsYXllciIsImxvYWRNYWluVUkiLCJsb2FkR2FtZVVJIiwidXNlciIsImNvbXB1dGVyIiwicGxhY2VTaGlwc1JhbmRvbWx5Iiwib25NYW51YWxQbGFjZW1lbnRDbGljayIsIm9uUmFuZG9tUGxhY2VtZW50Q2xpY2siLCJsb2FkVXNlckdhbWVib2FyZCIsImdldEdhbWVCb2FyZCIsImRlbGV0ZVVzZXJHYW1lYm9hcmRFdmVudExpc3RlbmVycyIsIm9uVXNlckJvYXJkQ2xpY2siLCJzcXVhcmVOdW0iLCJvcmllbnRhdGlvbiIsInJlcyIsInNob3dVc2VySW5mbyIsInVwZGF0ZVVzZXJHYW1lYm9hcmRTaGlwUGxhY2VtZW50Iiwic3F1YXJlcyIsInVwZGF0ZVVzZXJTaGlweWFyZCIsIm9uQ29tcHV0ZXJCb2FyZENsaWNrIiwibWFudWFsQXR0YWNrIiwic2hvd0NvbXB1dGVySW5mbyIsImF0dGFja1JlcyIsInVwZGF0ZUNvbXB1dGVyU2hpcHlhcmQiLCJ1cGRhdGVDb21wdXRlckdhbWVib2FyZCIsImxvYWRDb3Zlck1haW5VSSIsIlNoaXAiLCJfZ2FtZUJvYXJkIiwiX3R5cGUiLCJfYXZhaWxhYmxlQXR0YWNrcyIsImZyb20iLCJfIiwiZ2V0UGxheWVyVHlwZSIsImdldFNoaXBBdFBvcyIsInBvcyIsImdldFNoaXBCeU5hbWUiLCJuYW1lIiwiZGVsZXRlU2hpcEJ5TmFtZSIsImdldEF2YWlsYWJsZUF0dGFja3MiLCJnZXRBdHRhY2tBdFBvcyIsImdldEluZGV4T2ZBdHRhY2siLCJpbmRleE9mIiwiaXNWYWxpZEF0dGFjayIsImluY2x1ZGVzIiwiZ2V0UmFuZG9tRGlyZWN0aW9uIiwicmFuZG9tIiwic2h1ZmZsZUFycmF5IiwiYXJyYXkiLCJzaHVmZmxlZEFycmF5IiwiaiIsInN0YXJ0UG9zaXRpb25DYW5kaWRhdGVzIiwic2h1ZmZsZWRQb3NpdGlvbnMiLCJwb3AiLCJnZW5lcmF0ZVJhbmRvbUluZGV4IiwiZGVsZXRlRnJvbUF2YWlsYWJsZUF0dGFja3MiLCJnZW5lcmF0ZUF1dG9BdHRhY2siLCJfbmFtZSIsIl9sZW5ndGgiLCJfaGl0cyIsIl9zdW5rIiwiZ2V0SGl0cyIsImNhcnJpZXJTdmciLCJzdWJtYXJpbmVTdmciLCJiYXR0bGVzaGlwU3ZnIiwiZGVzdHJveWVyU3ZnIiwicGF0cm9sU3ZnIiwic2VsZWN0ZWRTaGlwTGVuZ3RoIiwic2VsZWN0ZWRTaGlwTmFtZSIsInBsYWNlZFNoaXBzQ291bnRlciIsImNyZWF0ZUVsZW1lbnQiLCJ0YWciLCJjbGFzc05hbWUiLCJpZCIsImVsZW1lbnQiLCJkb2N1bWVudCIsImNsYXNzTGlzdCIsImFkZCIsInNldEF0dHJpYnV0ZSIsImdldEVsZW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImRlbGV0ZU1haW5VSSIsIm1haW4iLCJpbm5lckhUTUwiLCJpbmZvIiwiaW5zdHJ1Y3Rpb25zIiwicXVlcnlTZWxlY3RvciIsInRleHRDb250ZW50IiwiY29tcHV0ZXJJbmZvIiwiaGFuZGxlU2hpcENsaWNrIiwiY29udGFpbnMiLCJzZWxlY3RlZFNoaXAiLCJyZW1vdmUiLCJ1c2VyU2lkZSIsImNvbXB1dGVyU2lkZSIsImFwcGVuZENoaWxkIiwidXNlckhlYWRlciIsImNvbXB1dGVySGVhZGVyIiwidXNlclRpdGxlIiwiY29tcHV0ZXJUaXRsZSIsInVzZXJHYW1lYm9hcmRDb250YWluZXIiLCJjb21wdXRlckdhbWVib2FyZENvbnRhaW5lciIsInVzZXJYSGVhZGVyIiwiY29tcHV0ZXJYSGVhZGVyIiwidXNlclhIZWFkZXJTcXVhcmUiLCJjb21wdXRlclhIZWFkZXJTcXVhcmUiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJ1c2VyQm90dG9tQm9hcmQiLCJjb21wdXRlckJvdHRvbUJvYXJkIiwidXNlcllIZWFkZXIiLCJjb21wdXRlcllIZWFkZXIiLCJ1c2VyWUhlYWRlclNxdWFyZSIsImNvbXB1dGVyWUhlYWRlclNxdWFyZSIsInVzZXJZSGVhZGVyU2hpcHlhcmQiLCJjb21wdXRlcllIZWFkZXJTaGlweWFyZCIsInVzZXJHcmlkUGFuZWxDb250YWluZXIiLCJjb21wdXRlckdyaWRQYW5lbENvbnRhaW5lciIsInVzZXJHYW1lYm9hcmQiLCJjb21wdXRlckdhbWVib2FyZCIsInVzZXJHYW1lYm9hcmRTcXVhcmUiLCJjb21wdXRlckdhbWVib2FyZFNxdWFyZSIsInVzZXJTdGF0dXNQYW5lbCIsImNvbXB1dGVyU3RhdHVzUGFuZWwiLCJ1c2VyQ2FycmllciIsInVzZXJCYXR0bGVzaGlwIiwidXNlckRlc3Ryb3llciIsInVzZXJTdWJtYXJpbmUiLCJ1c2VyQm9hdCIsImNvbXB1dGVyQ2FycmllciIsImNvbXB1dGVyQmF0dGxlc2hpcCIsImNvbXB1dGVyRGVzdHJveWVyIiwiY29tcHV0ZXJTdWJtYXJpbmUiLCJjb21wdXRlckJvYXQiLCJidXR0b25zQ29udGFpbmVyIiwibWFudWFsQnV0dG9uIiwicmFuZG9tQnV0dG9uIiwiY2FsbGJhY2siLCJ1c2VyR2FtZWJvYXJkR3JpZCIsInVzZXJCb2FyZFNxdWFyZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXJzZUludCIsImdldEF0dHJpYnV0ZSIsImNvbXB1dGVyR2FtZWJvYXJkR3JpZCIsImNvbXB1dGVyQm9hcmRTcXVhcmVzIiwidXNlclNoaXBzIiwiZXZlbnQiLCJzaWJsaW5nc1RvQ29sb3IiLCJzdGFydCIsInJvd1N0YXJ0Iiwicm93RW5kIiwiZXhwZWN0ZWRFbmQiLCJzbGljZSIsInNpYmxpbmciLCJlIiwia2V5Iiwic2hvd1N0YXJ0R2FtZUJ1dHRvbiIsInN0YXJ0R2FtZUJ1dHRvbiIsImdhbWVib2FyZCIsImxvYWRNYWluVUlDYWxsYmFjayIsInNjcmVlbiIsImJvZHkiLCJoZWFkZXIiLCJmb290ZXIiLCJ0aXRsZSIsImNyZWRpdHMiLCJnbG93aW5nQnV0dG9uIiwiY2FycmllclNoYXBlIiwic3VibWFyaW5lU2hhcGUiLCJiYXR0bGVzaGlwU2hhcGUiLCJkZXN0cm95ZXJTaGFwZSIsInBhdHJvbFNoYXBlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImFycmF5T2ZTcXVhcmVzIiwidXNlckJvYXJkU3F1YXJlIiwic2hpcERpdiIsImF0dGFja1Jlc3VsdCIsImNvbXB1dGVyQm9hcmRTcXVhcmUiXSwic291cmNlUm9vdCI6IiJ9