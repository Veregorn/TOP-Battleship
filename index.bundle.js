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

            // If all ships are sunk, finish the game
            if (computer.getGameBoard().getGameOver()) {
              _view__WEBPACK_IMPORTED_MODULE_1__.view.showVictoryModal("You");
            }
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

    // Create a div to show a modal window announcing the end of the game
    const modal = createElement("div", null, "victoryModal");
    const modalContent = createElement("div", null, null);
    const modalText = createElement("p", null, "modal-text");
    const restartButton = createElement("button", null, "modal-button");
    restartButton.textContent = "Restart";
    restartButton.addEventListener("click", () => {
      document.location.reload();
    });
    modalContent.appendChild(modalText);
    modalContent.appendChild(restartButton);
    modal.appendChild(modalContent);
    main.appendChild(modal);
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

  // Shows a modal window announcing the winner and a button to restart the game
  function showVictoryModal(winner) {
    const modal = getElement("victoryModal");
    modal.style.display = "block";
    const modalText = getElement("modal-text");
    modalText.textContent = `${winner} wins!`;
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
    updateComputerShipyard,
    showVictoryModal
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
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\n/* MY OWN STYLES FROM HERE */\n\n/* Fonts */\n\na:visited {\n    color: #fff;\n}\n\n#screen {\n    position: fixed; /* or \"absolute\" */\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: #fff;\n    display: flex;\n    flex-direction: column;\n    z-index: 0;\n}\n\n/* HEADER */\n\n#header {\n    height: 10%;\n    background-color: #474747;\n    display: flex;\n    border-bottom: solid 1px #000;\n    align-items: center;\n    justify-content: center;\n    z-index: 3;\n}\n\n.title {\n    font-size: 2em;\n    font-family: 'Bruno Ace';\n    color: #e8f901;\n}\n\n#main {\n    position: relative;\n    height: 80%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: rgb(255, 255, 255);\n}\n\n/* COVER */\n\n.glowing-button {\n    background-color: #4CAF50;\n    border: none;\n    border-radius: 20px;\n    color: white;\n    font-size: 3em;\n    padding: 20px 30px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    cursor: pointer;\n    transition: transform 0.5s;\n    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);\n}\n  \n.glowing-button:hover {\n    transform: scale(1.1);\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(76, 175, 80, 0.6);\n}\n\n@keyframes glowing2 {\n    0% {\n        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(76, 175, 80, 0.2);\n    }\n    50% {\n        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(76, 175, 80, 0.5);\n    }\n    100% {\n        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(76, 175, 80, 0.2);\n    }\n}\n\n.glowing-button {\n    animation: glowing2 2s infinite;\n}\n\n/* COVER SHIPS */\n\n#carrier-shape {\n    position: absolute;\n    width: 180px;\n    height: 60px;\n    top: 20%;\n    animation: move-right-left 10s linear infinite; /* adjust the time as needed */\n    z-index: 1;\n}\n\n@keyframes move-right-left {\n    0% { right: -100%; } /* Start from off the right of the screen */\n    100% { right: 100%; } /* End off the left of the screen */\n}\n\n#submarine-shape {\n    position: absolute;\n    width: 120px;\n    height: 60px;\n    left: 20%;\n    transform: rotate(90deg);\n    animation: move-top-down 10s linear infinite;\n    z-index: 1;\n}\n\n@keyframes move-top-down {\n    0% { top: -200px }\n    100% { top: 1500px}\n}\n\n#battleship-shape {\n    position: absolute;\n    width: 150px;\n    height: 60px;\n    top: 65%;\n    animation: move-left-right 10s linear infinite; /* adjust the time as needed */\n    z-index: 1;\n}\n\n@keyframes move-left-right {\n    0% { left: -100%; } /* Start from off the left of the screen */\n    100% { left: 100%; } /* End off the right of the screen */\n}\n\n#destroyer-shape {\n    position: absolute;\n    width: 120px;\n    height: 60px;\n    transform: rotate(270deg);\n    left: 80%;\n    animation: move-down-top 10s linear infinite;\n    z-index: 1;\n}\n\n@keyframes move-down-top {\n    0% { top: 1500px; }\n    100% { top: -200px; }\n}\n\n#patrol-shape {\n    position: absolute;\n    width: 90px;\n    height: 60px;\n    transform: rotate(180deg);\n    top: 90%;\n    animation: move-right-left 10s linear infinite;\n    z-index: 1;\n}\n\n/* MAIN - GAME */\n\n.playerSide {\n    width: 50%;\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    padding: 5%;\n    align-items: center;\n    justify-content: flex-start;\n    gap: 2em;\n    margin-top: 5em;\n}\n\n.gameHeader {\n    width: 440px;\n    font-size: 1.5em;\n    font-family: 'Bruno Ace';\n    color: #fff;\n    padding: 10px;\n    text-align: center;\n}\n\n#userGameHeader {\n    background-color: #FC1159;\n}\n\n#computerGameHeader{\n    background-color: #727D95;\n}\n\n.gameboardContainer {\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n}\n\n.xHeader {\n    display: flex;\n    flex-direction: row;\n    justify-content: left;\n    padding-left: 2.5em;\n}\n\n.xHeaderSquare {\n    width: 38px;\n    height: 38px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n}\n\n.bottomBoard {\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n}\n\n.yHeader {\n    display: flex;\n    flex-direction: column;\n}\n\n.yHeaderSquare {\n    width: 38px;\n    height: 38px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n}\n\n.yHeaderShipyard {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n    writing-mode: vertical-rl;\n    text-orientation: mixed;\n    rotate: 180deg;\n    margin-top: 1.8em;\n}\n\n.gridPanelContainer {\n    width: 380px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n\n.gameboardGrid {\n    width: 380px;\n    height: 380px;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n}\n\n#userGameboardGrid {\n    position: relative;\n    cursor: pointer;\n}\n\n#userGameboardGrid.blocked {\n    cursor: default;\n}\n\n.gameboardSquare {\n    width: 36px;\n    height: 36px;\n    border: solid 1px #fff;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n    cursor: inherit;\n    background-color: #a1dcff;\n}\n\n#userGameboardGrid .hover {\n    background-color: #999999;\n    opacity: 0.7;\n}\n\n#userGameboardGrid .occupied {\n    background-color: #999999;\n    opacity: 1;\n}\n\n#userGameboardGrid .hoverLimitsExceeded {\n    background-color: #c23434;\n}\n\n#computerGameboardGrid .gameboardSquare:hover {\n    background-color: #1b88e7;\n}\n\n#computerGameboardGrid.blocked .gameboardSquare:hover {\n    background-color: #a1dcff;\n    cursor: default;\n}\n\n.gameboardSquare.miss {\n    background-color: #c23434;\n}\n\n.gameboardSquare.miss:hover {\n    background-color: #c23434!important;\n}\n\n.gameboardSquare.hit {\n    background-color: #4CAF50;\n}\n\n.gameboardSquare.hit:hover {\n    background-color: #4CAF50!important;\n}\n\n/* SHIPYARD */\n\n.statusPanel {\n    width: 382px;\n    height: 78px;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    flex-wrap: wrap;\n    margin-top: 36px;\n    background-image: linear-gradient(rgba(0, 0, 0, 0.5) 2px, transparent 2px), linear-gradient(90deg, rgba(0, 0, 0, 0.5) 2px, transparent 2px);\n    background-size: 38px 38px;\n    gap: 2px;\n}\n\n.carrier {\n    width: 188px;\n    height: 36px;\n}\n\n.battleship {\n    width: 150px;\n    height: 36px;\n}\n\n.submarine {\n    width: 112px;\n    height: 36px;\n}\n\n.destroyer {\n    width: 112px;\n    height: 36px;\n}\n\n.boat {\n    width: 74px;\n    height: 36px;\n}\n\n.userShip {\n    cursor: pointer;\n    opacity: 0.7;\n}\n\n.userShip:hover {\n    opacity: 1;\n}\n\n.userShip.no-hover:hover {\n    opacity: 0.7;\n    cursor: default;\n}\n\n.userShip.selected {\n    opacity: 1;\n}\n\n.userShip.placed {\n    opacity: 1;\n    cursor: default;\n}\n\n.ship.sunk {\n    position: relative;\n}\n\n.ship.sunk::after {\n    content: \"\";\n    position: absolute;\n    top: 50%;\n    left: 0;\n    width: 100%;\n    height: 2px;\n    background: rgb(231, 9, 9);\n}\n\n@keyframes glowing {\n    0% { color: #FC1159; }\n    50% { color: #000; }\n    100% { color: #FC1159; }\n  }\n\n.instructions {\n    width: 100%;\n    font-family: 'Bruno Ace';\n    font-size: 0.8em;\n    line-height: 1.5em;\n    text-align: center;\n    display: flex;\n    flex-direction: column;\n    animation: glowing 1.5s linear infinite;\n}\n\n.buttonsContainer {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n    gap: 2em;\n}\n\n.placementButton {\n    width: 180px;\n    height: 50px;\n    border: solid 1px #fff;\n    background-color: #4CAF50;\n    color: #fff;\n    font-family: 'IBM Plex Mono', monospace;\n    font-size: 0.8em;\n    cursor: pointer;\n    border-radius: 10px;\n    padding: 1em;\n}\n\n.placementButton:hover {\n    background-color: #3e8e41;\n}\n\n#start-game-button {\n    width: 180px;\n    height: 50px;\n    border: solid 1px #fff;\n    background-color: #4CAF50;\n    color: #fff;\n    font-family: 'IBM Plex Mono', monospace;\n    font-size: 0.8em;\n    cursor: pointer;\n    border-radius: 10px;\n    padding: 1em;\n}\n\n#start-game-button:hover {\n    background-color: #3e8e41;\n}\n\n.computerInfo {\n    width: 100%;\n    font-family: 'Bruno Ace';\n    font-size: 0.8em;\n    line-height: 1.5em;\n    text-align: center;\n    display: flex;\n    flex-direction: column;\n}\n\n#victoryModal {\n    display: none;\n    position: fixed;\n    z-index: 1;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    overflow: auto;\n    background-color: rgba(0,0,0,0.4);\n  }\n  \n  #victoryModal > div {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    background-color: #fefefe;\n    padding: 20px;\n    border: 1px solid #888;\n    width: 30%;\n    box-sizing: border-box;\n  }\n\n#modal-text {\n    font-family: 'IBM Plex Mono', monospace;\n    font-size: 0.8em;\n    line-height: 1.5em;\n    text-align: center;\n}\n\n#modal-button {\n    display: block;\n    width: 100%;\n    padding: 10px;\n    margin-top: 20px;\n    background-color: #4CAF50; /* Verde */\n    color: white;\n    border: none;\n    cursor: pointer;\n    text-align: center;\n    text-decoration: none;\n    font-size: 16px;\n}\n\n#modal-button:hover {\n    background-color: #3e8e41;\n}\n\n/* FOOTER */\n\n#footer {\n    height: 10%;\n    background-color: #474747;\n    display: flex;\n    border-top: solid 1px #000;\n    align-items: center;\n    justify-content: center;\n    z-index: 3;\n}\n\n.credits {\n    color: #fff;\n    font-family: 'IBM Plex Mono', monospace;\n    font-size: 0.8em;\n    text-align: center;\n}\n\n/* Style the link to remove default styling */\n.github-link {\n    display: inline-block;\n    text-decoration: none;\n    color: inherit;\n}\n\n/* Add the hover effect */\n.github-icon {\n    transition: transform 0.5s ease-in-out; /* Add a transition for the transform property */\n}\n\n.github-link:hover .github-icon {\n    transform: rotate(180deg); /* Rotate the icon 180 degrees when hovered */\n}", "",{"version":3,"sources":["webpack://./src/styles/index.css"],"names":[],"mappings":"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","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\n/* MY OWN STYLES FROM HERE */\n\n/* Fonts */\n\n@import url('https://fonts.googleapis.com/css2?family=Bruno+Ace&display=swap');\n@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap');\n\na:visited {\n    color: #fff;\n}\n\n#screen {\n    position: fixed; /* or \"absolute\" */\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: #fff;\n    display: flex;\n    flex-direction: column;\n    z-index: 0;\n}\n\n/* HEADER */\n\n#header {\n    height: 10%;\n    background-color: #474747;\n    display: flex;\n    border-bottom: solid 1px #000;\n    align-items: center;\n    justify-content: center;\n    z-index: 3;\n}\n\n.title {\n    font-size: 2em;\n    font-family: 'Bruno Ace';\n    color: #e8f901;\n}\n\n#main {\n    position: relative;\n    height: 80%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: rgb(255, 255, 255);\n}\n\n/* COVER */\n\n.glowing-button {\n    background-color: #4CAF50;\n    border: none;\n    border-radius: 20px;\n    color: white;\n    font-size: 3em;\n    padding: 20px 30px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    cursor: pointer;\n    transition: transform 0.5s;\n    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);\n}\n  \n.glowing-button:hover {\n    transform: scale(1.1);\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(76, 175, 80, 0.6);\n}\n\n@keyframes glowing2 {\n    0% {\n        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(76, 175, 80, 0.2);\n    }\n    50% {\n        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(76, 175, 80, 0.5);\n    }\n    100% {\n        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(76, 175, 80, 0.2);\n    }\n}\n\n.glowing-button {\n    animation: glowing2 2s infinite;\n}\n\n/* COVER SHIPS */\n\n#carrier-shape {\n    position: absolute;\n    width: 180px;\n    height: 60px;\n    top: 20%;\n    animation: move-right-left 10s linear infinite; /* adjust the time as needed */\n    z-index: 1;\n}\n\n@keyframes move-right-left {\n    0% { right: -100%; } /* Start from off the right of the screen */\n    100% { right: 100%; } /* End off the left of the screen */\n}\n\n#submarine-shape {\n    position: absolute;\n    width: 120px;\n    height: 60px;\n    left: 20%;\n    transform: rotate(90deg);\n    animation: move-top-down 10s linear infinite;\n    z-index: 1;\n}\n\n@keyframes move-top-down {\n    0% { top: -200px }\n    100% { top: 1500px}\n}\n\n#battleship-shape {\n    position: absolute;\n    width: 150px;\n    height: 60px;\n    top: 65%;\n    animation: move-left-right 10s linear infinite; /* adjust the time as needed */\n    z-index: 1;\n}\n\n@keyframes move-left-right {\n    0% { left: -100%; } /* Start from off the left of the screen */\n    100% { left: 100%; } /* End off the right of the screen */\n}\n\n#destroyer-shape {\n    position: absolute;\n    width: 120px;\n    height: 60px;\n    transform: rotate(270deg);\n    left: 80%;\n    animation: move-down-top 10s linear infinite;\n    z-index: 1;\n}\n\n@keyframes move-down-top {\n    0% { top: 1500px; }\n    100% { top: -200px; }\n}\n\n#patrol-shape {\n    position: absolute;\n    width: 90px;\n    height: 60px;\n    transform: rotate(180deg);\n    top: 90%;\n    animation: move-right-left 10s linear infinite;\n    z-index: 1;\n}\n\n/* MAIN - GAME */\n\n.playerSide {\n    width: 50%;\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    padding: 5%;\n    align-items: center;\n    justify-content: flex-start;\n    gap: 2em;\n    margin-top: 5em;\n}\n\n.gameHeader {\n    width: 440px;\n    font-size: 1.5em;\n    font-family: 'Bruno Ace';\n    color: #fff;\n    padding: 10px;\n    text-align: center;\n}\n\n#userGameHeader {\n    background-color: #FC1159;\n}\n\n#computerGameHeader{\n    background-color: #727D95;\n}\n\n.gameboardContainer {\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n}\n\n.xHeader {\n    display: flex;\n    flex-direction: row;\n    justify-content: left;\n    padding-left: 2.5em;\n}\n\n.xHeaderSquare {\n    width: 38px;\n    height: 38px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n}\n\n.bottomBoard {\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n}\n\n.yHeader {\n    display: flex;\n    flex-direction: column;\n}\n\n.yHeaderSquare {\n    width: 38px;\n    height: 38px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n}\n\n.yHeaderShipyard {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n    writing-mode: vertical-rl;\n    text-orientation: mixed;\n    rotate: 180deg;\n    margin-top: 1.8em;\n}\n\n.gridPanelContainer {\n    width: 380px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n\n.gameboardGrid {\n    width: 380px;\n    height: 380px;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n}\n\n#userGameboardGrid {\n    position: relative;\n    cursor: pointer;\n}\n\n#userGameboardGrid.blocked {\n    cursor: default;\n}\n\n.gameboardSquare {\n    width: 36px;\n    height: 36px;\n    border: solid 1px #fff;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: 'Bruno Ace';\n    font-size: 1em;\n    cursor: inherit;\n    background-color: #a1dcff;\n}\n\n#userGameboardGrid .hover {\n    background-color: #999999;\n    opacity: 0.7;\n}\n\n#userGameboardGrid .occupied {\n    background-color: #999999;\n    opacity: 1;\n}\n\n#userGameboardGrid .hoverLimitsExceeded {\n    background-color: #c23434;\n}\n\n#computerGameboardGrid .gameboardSquare:hover {\n    background-color: #1b88e7;\n}\n\n#computerGameboardGrid.blocked .gameboardSquare:hover {\n    background-color: #a1dcff;\n    cursor: default;\n}\n\n.gameboardSquare.miss {\n    background-color: #c23434;\n}\n\n.gameboardSquare.miss:hover {\n    background-color: #c23434!important;\n}\n\n.gameboardSquare.hit {\n    background-color: #4CAF50;\n}\n\n.gameboardSquare.hit:hover {\n    background-color: #4CAF50!important;\n}\n\n/* SHIPYARD */\n\n.statusPanel {\n    width: 382px;\n    height: 78px;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    flex-wrap: wrap;\n    margin-top: 36px;\n    background-image: linear-gradient(rgba(0, 0, 0, 0.5) 2px, transparent 2px), linear-gradient(90deg, rgba(0, 0, 0, 0.5) 2px, transparent 2px);\n    background-size: 38px 38px;\n    gap: 2px;\n}\n\n.carrier {\n    width: 188px;\n    height: 36px;\n}\n\n.battleship {\n    width: 150px;\n    height: 36px;\n}\n\n.submarine {\n    width: 112px;\n    height: 36px;\n}\n\n.destroyer {\n    width: 112px;\n    height: 36px;\n}\n\n.boat {\n    width: 74px;\n    height: 36px;\n}\n\n.userShip {\n    cursor: pointer;\n    opacity: 0.7;\n}\n\n.userShip:hover {\n    opacity: 1;\n}\n\n.userShip.no-hover:hover {\n    opacity: 0.7;\n    cursor: default;\n}\n\n.userShip.selected {\n    opacity: 1;\n}\n\n.userShip.placed {\n    opacity: 1;\n    cursor: default;\n}\n\n.ship.sunk {\n    position: relative;\n}\n\n.ship.sunk::after {\n    content: \"\";\n    position: absolute;\n    top: 50%;\n    left: 0;\n    width: 100%;\n    height: 2px;\n    background: rgb(231, 9, 9);\n}\n\n@keyframes glowing {\n    0% { color: #FC1159; }\n    50% { color: #000; }\n    100% { color: #FC1159; }\n  }\n\n.instructions {\n    width: 100%;\n    font-family: 'Bruno Ace';\n    font-size: 0.8em;\n    line-height: 1.5em;\n    text-align: center;\n    display: flex;\n    flex-direction: column;\n    animation: glowing 1.5s linear infinite;\n}\n\n.buttonsContainer {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n    gap: 2em;\n}\n\n.placementButton {\n    width: 180px;\n    height: 50px;\n    border: solid 1px #fff;\n    background-color: #4CAF50;\n    color: #fff;\n    font-family: 'IBM Plex Mono', monospace;\n    font-size: 0.8em;\n    cursor: pointer;\n    border-radius: 10px;\n    padding: 1em;\n}\n\n.placementButton:hover {\n    background-color: #3e8e41;\n}\n\n#start-game-button {\n    width: 180px;\n    height: 50px;\n    border: solid 1px #fff;\n    background-color: #4CAF50;\n    color: #fff;\n    font-family: 'IBM Plex Mono', monospace;\n    font-size: 0.8em;\n    cursor: pointer;\n    border-radius: 10px;\n    padding: 1em;\n}\n\n#start-game-button:hover {\n    background-color: #3e8e41;\n}\n\n.computerInfo {\n    width: 100%;\n    font-family: 'Bruno Ace';\n    font-size: 0.8em;\n    line-height: 1.5em;\n    text-align: center;\n    display: flex;\n    flex-direction: column;\n}\n\n#victoryModal {\n    display: none;\n    position: fixed;\n    z-index: 1;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    overflow: auto;\n    background-color: rgba(0,0,0,0.4);\n  }\n  \n  #victoryModal > div {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    background-color: #fefefe;\n    padding: 20px;\n    border: 1px solid #888;\n    width: 30%;\n    box-sizing: border-box;\n  }\n\n#modal-text {\n    font-family: 'IBM Plex Mono', monospace;\n    font-size: 0.8em;\n    line-height: 1.5em;\n    text-align: center;\n}\n\n#modal-button {\n    display: block;\n    width: 100%;\n    padding: 10px;\n    margin-top: 20px;\n    background-color: #4CAF50; /* Verde */\n    color: white;\n    border: none;\n    cursor: pointer;\n    text-align: center;\n    text-decoration: none;\n    font-size: 16px;\n}\n\n#modal-button:hover {\n    background-color: #3e8e41;\n}\n\n/* FOOTER */\n\n#footer {\n    height: 10%;\n    background-color: #474747;\n    display: flex;\n    border-top: solid 1px #000;\n    align-items: center;\n    justify-content: center;\n    z-index: 3;\n}\n\n.credits {\n    color: #fff;\n    font-family: 'IBM Plex Mono', monospace;\n    font-size: 0.8em;\n    text-align: center;\n}\n\n/* Style the link to remove default styling */\n.github-link {\n    display: inline-block;\n    text-decoration: none;\n    color: inherit;\n}\n\n/* Add the hover effect */\n.github-icon {\n    transition: transform 0.5s ease-in-out; /* Add a transition for the transform property */\n}\n\n.github-link:hover .github-icon {\n    transform: rotate(180deg); /* Rotate the icon 180 degrees when hovered */\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLFdBQVcsVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxXQUFXLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSyxVQUFVLFVBQVUsT0FBTyxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSyxVQUFVLFVBQVUsT0FBTyxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLE9B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Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy92aWV3LmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvYXNzZXRzL2dyYXBoaWNzL2JhdHRsZXNoaXAuc3ZnIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2Fzc2V0cy9ncmFwaGljcy9jYXJyaWVyLnN2ZyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9hc3NldHMvZ3JhcGhpY3MvZGVzdHJveWVyLnN2ZyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9hc3NldHMvZ3JhcGhpY3MvcGF0cm9sLWJvYXQuc3ZnIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2Fzc2V0cy9ncmFwaGljcy9zdWJtYXJpbmUuc3ZnIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9pbmRleC5jc3M/NjM0OSIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEZhY3RvcnkgcmVwcmVzZW50aW5nIGEgZ2FtZSBib2FyZCBpbiB0aGUgZ2FtZVxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuXG4gICAgY29uc3QgX2JvYXJkID0gQXJyYXkoMTAwKS5maWxsKFwiV2F0ZXJcIikgLy8gQXJyYXkgb2YgMTAwIHNxdWFyZXMgcmVwcmVzZW50aW5nIHRoZSBnYW1lIGJvYXJkXG4gICAgY29uc3QgX3NoaXBzID0gW10gLy8gQXJyYXkgb2Ygc2hpcHMgb24gdGhlIGJvYXJkXG4gICAgbGV0IF9nYW1lb3ZlciA9IGZhbHNlXG5cbiAgICAvLyBHZXQgdGhlIGJvYXJkIGFycmF5XG4gICAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBfYm9hcmRcbiAgICBcbiAgICAvLyBHZXQgdGhlIHNoaXBzIGFycmF5XG4gICAgY29uc3QgZ2V0U2hpcHMgPSAoKSA9PiBfc2hpcHNcblxuICAgIC8vIEdldCBpZiB0aGUgZ2FtZSBpcyBvdmVyXG4gICAgY29uc3QgZ2V0R2FtZU92ZXIgPSAoKSA9PiBfZ2FtZW92ZXJcblxuICAgIC8vIFNldCBHYW1lIE92ZXJcbiAgICBjb25zdCBzZXRHYW1lT3ZlciA9ICgpID0+IHtcbiAgICAgICAgX2dhbWVvdmVyID0gdHJ1ZVxuICAgIH1cblxuICAgIC8vIEdldCBhIFNxdWFyZVxuICAgIGNvbnN0IGdldFNxdWFyZSA9IChzcXVhcmUpID0+IF9ib2FyZFtzcXVhcmVdXG5cbiAgICAvLyBTZXQgYSBTcXVhcmVcbiAgICBjb25zdCBzZXRTcXVhcmUgPSAobnVtLHZhbHVlKSA9PiB7XG4gICAgICAgIF9ib2FyZFtudW1dID0gdmFsdWVcbiAgICB9XG5cbiAgICAvLyBTZXQgYSBzaGlwIGluIHRoZSBhcnJheSBvZiBzaGlwc1xuICAgIGNvbnN0IHNldFNoaXAgPSAoc2hpcCkgPT4gZ2V0U2hpcHMoKS5wdXNoKHNoaXApXG5cbiAgICAvLyBSZXR1cm4gdHJ1ZSBpZiB0d28gc3F1YXJlcyBhcmUgaW4gdGhlIHNhbWUgbGluZSBpbiB0aGUgYm9hcmRcbiAgICBjb25zdCBpc1NhbWVMaW5lID0gKHgseSkgPT4gTWF0aC5mbG9vcih4IC8gMTApID09PSBNYXRoLmZsb29yKHkgLyAxMClcblxuICAgIC8vIFJldHVybiB0cnVlIGlmIG5leHQgc3F1YXJlIGlzIGluIHRoZSBzYW1lIGxpbmUgb3IgY29sdW1uIHRoYXQgcHJldmlvdXMgb25lXG4gICAgY29uc3QgaXNWYWxpZE5leHRTcXVhcmUgPSAoY3VycmVudCxuZXh0LGRpcmVjdGlvbikgPT4gXG4gICAgICAgIGRpcmVjdGlvbiA9PT0gXCJ4XCIgPyBpc1NhbWVMaW5lKG5leHQsIGN1cnJlbnQpIDogbmV4dCA8PSA5OVxuXG4gICAgLy8gUmV0dXJuIHRydWUgaWYgYSBzcXVhcmUgaXMgZW1wdHkgKG5vIG90aGVyIHNoaXAgaXMgcGxhY2VkIHRoZXJlKVxuICAgIGNvbnN0IGlzRW1wdHlTcXVhcmUgPSAoc3F1YXJlKSA9PiBcbiAgICAgICAgZ2V0U3F1YXJlKHNxdWFyZSkgPT09IFwiV2F0ZXJcIlxuXG4gICAgLy8gR2V0cyBuZXh0IHBvc2l0aW9uIGluIHRoZSBib2FyZCBkZXBlbmRpbmcgb24gc2hpcCBkaXJlY3Rpb24gcGxhY2VtZW50XG4gICAgY29uc3QgZ2V0TmV4dFBvc2l0aW9uID0gKGN1cnJlbnRQb3MsZGlyZWN0aW9uKSA9PiBcbiAgICAgICAgZGlyZWN0aW9uID09PSBcInhcIiA/IGN1cnJlbnRQb3MgKyAxIDogY3VycmVudFBvcyArIDEwXG5cbiAgICAvLyBQbGFjZXMgYSBzaGlwXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXAsc3RhcnRQb3MsZGlyZWN0aW9uKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBsZXQgbmV4dFBvcyA9IHN0YXJ0UG9zXG4gICAgICAgIGNvbnN0IHZhbGlkUG9zQXJyYXkgPSBbXVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHNoaXAuZ2V0TGVuZ3RoKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBUZXN0IGlmIHRoZSBuZXh0IHBvc2l0aW9uIGlzIHZhbGlkXG4gICAgICAgICAgICBpZiAoIWlzVmFsaWROZXh0U3F1YXJlKHN0YXJ0UG9zLG5leHRQb3MsZGlyZWN0aW9uKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBcIllvdSBhcmUgZXhjZWVkaW5nIHRoZSBsaW1pdHMgb2YgdGhlIGJvYXJkXCIgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUZXN0IGlmIHRoYXQgc3F1YXJlIGlzIGVtcHR5IChubyBvdGhlciBzaGlwIHBsYWNlZCB0aGVyZSlcbiAgICAgICAgICAgIGlmICghaXNFbXB0eVNxdWFyZShuZXh0UG9zKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBcIlRoYXQgc3F1YXJlIGlzIG5vdCBlbXB0eVwiIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gSW5zZXJ0IHRoZSB2YWxpZCBwb3NpdGlvbiBpbnRvIG91ciB0ZW1wIGFycmF5XG4gICAgICAgICAgICB2YWxpZFBvc0FycmF5LnB1c2gobmV4dFBvcylcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gVXBkYXRlIHBvc2l0aW9uXG4gICAgICAgICAgICBuZXh0UG9zID0gZ2V0TmV4dFBvc2l0aW9uKG5leHRQb3MsZGlyZWN0aW9uKVxuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXQgc3F1YXJlIHN0cmluZyB0byBzaGlwIG5hbWUgZm9yIGVhY2ggdmFsdWUgaW4gdGhlIHRlbXAgYXJyYXlcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWxpZFBvc0FycmF5Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBzZXRTcXVhcmUodmFsaWRQb3NBcnJheVtpXSxzaGlwLmdldE5hbWUoKSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFBsYWNlIHRoZSBzaGlwIGluIHRoZSBhcnJheSBvZiBzaGlwc1xuICAgICAgICBzZXRTaGlwKHNoaXApXG5cbiAgICAgICAgLy8gUmV0dXJuIGEgc3VjY2VzcyBtZXNzYWdlIGFuZCB0aGUgYXJyYXkgb2YgdmFsaWQgcG9zaXRpb25zXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiB2YWxpZFBvc0FycmF5LFxuICAgICAgICAgICAgc3VjY2VzczogYEEgJHtzaGlwLmdldE5hbWUoKX0gaGFzIGJlZW4gcGxhY2VkYFxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvLyBGaW5kIGFuZCByZXR1cm4gYSBTaGlwIGluIHRoZSBib2FyZFxuICAgIGNvbnN0IGZpbmRTaGlwID0gKHNoaXBOYW1lKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzaGlwID0gZ2V0U2hpcHMoKS5maW5kKHMgPT4gcy5nZXROYW1lKCkgPT09IHNoaXBOYW1lKVxuICAgICAgICBcbiAgICAgICAgLy8gSWYgbm8gc2hpcCBmb3VuZCwgcmV0dXJucyBhbiBlcnJvclxuICAgICAgICBpZiAoIXNoaXApIHtcbiAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBcIk5vIHNoaXAgZm91bmQgd2l0aCB0aGF0IG5hbWVcIiB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2hpcFxuXG4gICAgfVxuXG4gICAgLy8gQ2hlY2tzIGlmIHRoZSBnYW1lIGlzIG92ZXJcbiAgICBjb25zdCBjaGVja0dhbWVPdmVyID0gKCkgPT4ge1xuICAgICAgICBpZiAoZ2V0U2hpcHMoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHNldEdhbWVPdmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEZWxldGUgYSBzaGlwIGZyb20gdGhlIHNoaXBzIGFycmF5XG4gICAgY29uc3QgZGVsZXRlU2hpcCA9IChzaGlwTmFtZSkgPT4ge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgaW5kZXggPSBnZXRTaGlwcygpLmZpbmRJbmRleChzID0+IHMuZ2V0TmFtZSgpID09PSBzaGlwTmFtZSlcblxuICAgICAgICAvLyBJZiBubyBzaGlwIGZvdW5kLCByZXR1cm5zIGFuIGVycm9yXG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBcIlRoZXJlIGlzIG5vIHNoaXAgd2l0aCB0aGF0IG5hbWUgdG8gZGVsZXRlXCIgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBnZXRTaGlwcygpLnNwbGljZShpbmRleCwxKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgZ2FtZSBpcyBvdmVyXG4gICAgICAgIGNoZWNrR2FtZU92ZXIoKVxuXG4gICAgICAgIC8vIFJldHVybiBhIHN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBgU2hpcCBuYW1lZCBcIiR7c2hpcE5hbWV9XCIgaGFzIGJlZW4gZGVsZXRlZGAgfVxuXG4gICAgfVxuXG4gICAgLy8gdGFrZXMgYSBzcXVhcmUgbnVtYmVyLCBkZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRoZSBhdHRhY2sgaGl0IGEgc2hpcCBhbmQgdGhlbiBcbiAgICAvLyBzZW5kcyB0aGUg4oCYaGl04oCZIGZ1bmN0aW9uIHRvIHRoZSBjb3JyZWN0IHNoaXAsIG9yIHJlY29yZHMgdGhlIGNvb3JkaW5hdGVzIFxuICAgIC8vIG9mIHRoZSBtaXNzZWQgc2hvdFxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoc3F1YXJlTnVtYmVyKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzcXVhcmUgPSBnZXRTcXVhcmUoc3F1YXJlTnVtYmVyKVxuICAgICAgICBjb25zdCByZXN1bHQgPSB7dHlwZTogXCJcIiwgc3VjY2VzczogXCJcIiwgZXJyb3I6IFwiXCIsIHN1bms6IFwiXCIsIGdhbWVvdmVyOiBmYWxzZX1cblxuICAgICAgICAvLyBBdHRhY2sgZmFpbHNcbiAgICAgICAgaWYgKHNxdWFyZSA9PT0gXCJXYXRlclwiKSB7XG4gICAgICAgICAgICByZXN1bHQudHlwZSA9IFwiTWlzc1wiXG4gICAgICAgICAgICBzZXRTcXVhcmUoc3F1YXJlTnVtYmVyLHJlc3VsdC50eXBlKVxuICAgICAgICAgICAgcmVzdWx0LnN1Y2Nlc3MgPSBcIkhhaGFoYSEgQmV0dGVyIGx1Y2sgbmV4dCB0aW1lIVwiXG4gICAgICAgIH0gZWxzZSBpZiAoc3F1YXJlID09PSBcIk1pc3NcIiB8fCBzcXVhcmUgPT09IFwiU2hpcEhpdFwiKSB7IC8vIEludmFsaWQgYXR0YWNrIHJlY2VpdmVkXG4gICAgICAgICAgICByZXN1bHQuZXJyb3IgPSBcIlRoaXMgc3F1YXJlIHdhcyBhbHJlYWR5IGF0dGFja2VkIVwiXG4gICAgICAgIH0gZWxzZSB7IC8vIEF0dGFjayBoaXRzXG4gICAgICAgICAgICBjb25zdCBkYW1hZ2VkU2hpcCA9IGZpbmRTaGlwKHNxdWFyZSlcbiAgICAgICAgICAgIHJlc3VsdC50eXBlID0gXCJTaGlwSGl0XCJcbiAgICAgICAgICAgIHNldFNxdWFyZShzcXVhcmVOdW1iZXIscmVzdWx0LnR5cGUpXG4gICAgICAgICAgICBkYW1hZ2VkU2hpcC5oaXQoKVxuICAgICAgICAgICAgcmVzdWx0LnN1Y2Nlc3MgPSBcIkFyZ2doISBZb3UgaGl0IG15IHNoaXAhXCJcblxuICAgICAgICAgICAgLy8gTmVlZCB0byB0ZXN0IGlmIHNoaXAgaXMgc3Vua1xuICAgICAgICAgICAgaWYgKGRhbWFnZWRTaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmVzdWx0LnN1bmsgPSBkYW1hZ2VkU2hpcC5nZXROYW1lKClcbiAgICAgICAgICAgICAgICBkZWxldGVTaGlwKGRhbWFnZWRTaGlwLmdldE5hbWUoKSlcbiAgICAgICAgICAgICAgICBjaGVja0dhbWVPdmVyKClcblxuICAgICAgICAgICAgICAgIC8vIElmIGdhbWUgaXMgb3ZlciwgcmV0dXJuIHRoYXQgaW4gdGhlIHJlc3VsdFxuICAgICAgICAgICAgICAgIGlmIChnZXRHYW1lT3ZlcigpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5nYW1lb3ZlciA9IHRydWVcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0R2FtZU92ZXIsXG4gICAgICAgIGdldFNxdWFyZSxcbiAgICAgICAgcGxhY2VTaGlwLFxuICAgICAgICBmaW5kU2hpcCxcbiAgICAgICAgcmVjZWl2ZUF0dGFjayxcbiAgICAgICAgZ2V0U2hpcHMsXG4gICAgICAgIGdldEJvYXJkXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZCIsImltcG9ydCBcIi4vc3R5bGVzL2luZGV4LmNzc1wiXG5pbXBvcnQgeyB2aWV3IH0gZnJvbSBcIi4vdmlld1wiXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiXG5cbi8vIEZ1bmN0aW9uIHRvIGxvYWQgdGhlIG1haW4gVUlcbmZ1bmN0aW9uIGxvYWRNYWluVUkoKSB7XG4gICAgXG4gICAgLy8gTG9hZCB0aGUgbWFpbiBVSVxuICAgIHZpZXcubG9hZEdhbWVVSSgpXG5cbiAgICBjb25zdCB1c2VyID0gUGxheWVyKFwiSHVtYW5cIilcbiAgICBjb25zdCBjb21wdXRlciA9IFBsYXllcihcIkFJXCIpXG5cbiAgICAvLyBQbGFjZSBjb21wdXRlciBzaGlwc1xuICAgIGNvbXB1dGVyLnBsYWNlU2hpcHNSYW5kb21seSgpXG5cbiAgICAvLyBNYW5hZ2UgbWFudWFsIHBsYWNlbWVudCBidXR0b25cbiAgICB2aWV3Lm9uTWFudWFsUGxhY2VtZW50Q2xpY2soKVxuXG4gICAgLy8gTWFuYWdlIHJhbmRvbSBwbGFjZW1lbnQgYnV0dG9uXG4gICAgdmlldy5vblJhbmRvbVBsYWNlbWVudENsaWNrKCAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICB1c2VyLnBsYWNlU2hpcHNSYW5kb21seSgpIC8vIFBsYWNlIHVzZXIgc2hpcHMgcmFuZG9tbHlcbiAgICAgICAgdmlldy5sb2FkVXNlckdhbWVib2FyZCh1c2VyLmdldEdhbWVCb2FyZCgpLmdldEJvYXJkKCkpIC8vIExvYWQgdXNlciBib2FyZFxuICAgICAgICAvLyBEZWxldGUgRXZlbnQgTGlzdGVuZXJzIGFzc29jaWF0ZWQgd2l0aCB1c2VyIGdhbWVib2FyZFxuICAgICAgICB2aWV3LmRlbGV0ZVVzZXJHYW1lYm9hcmRFdmVudExpc3RlbmVycygpXG4gICAgICAgIC8vIHZpZXcubG9hZFVzZXJTaGlwc0luZm8odXNlci5nZXRTaGlwcygpKVxuXG4gICAgfSlcblxuICAgIC8vIFdhaXQgZm9yIHVzZXIgdG8gY2xpY2sgb24gYSBzcXVhcmVcbiAgICB2aWV3Lm9uVXNlckJvYXJkQ2xpY2soIChzcXVhcmVOdW0sIHNoaXBOYW1lLCBvcmllbnRhdGlvbikgPT4ge1xuICAgICAgICBcbiAgICAgICAgLy8gUGxhY2UgdXNlciBzaGlwXG4gICAgICAgIGNvbnN0IHJlcyA9IHVzZXIucGxhY2VTaGlwKHNxdWFyZU51bSwgc2hpcE5hbWUsIG9yaWVudGF0aW9uKVxuXG4gICAgICAgIC8vIGlmIFwicGxhY2VTaGlwIHJldHVybnMgYW4gZXJyb3IsIHNob3cgaXRcIlxuICAgICAgICBpZiAocmVzLmVycm9yKSB7XG4gICAgICAgICAgICB2aWV3LnNob3dVc2VySW5mbyhyZXMuZXJyb3IpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2aWV3LnNob3dVc2VySW5mbyhyZXMuc3VjY2VzcykgLy8gU2hvdyBzdWNjZXNzIG1lc3NhZ2VcbiAgICAgICAgICAgIHZpZXcudXBkYXRlVXNlckdhbWVib2FyZFNoaXBQbGFjZW1lbnQocmVzLnNxdWFyZXMpIC8vIFVwZGF0ZSB1c2VyIGJvYXJkXG4gICAgICAgICAgICB2aWV3LnVwZGF0ZVVzZXJTaGlweWFyZChzaGlwTmFtZSkgLy8gVXBkYXRlIHVzZXIgc2hpcHlhcmRcbiAgICAgICAgfVxuXG4gICAgfSlcblxuICAgIC8vIFdhaXQgZm9yIHVzZXIgdG8gY2xpY2sgb24gYSBzcXVhcmUgdG8gYXR0YWNrXG4gICAgdmlldy5vbkNvbXB1dGVyQm9hcmRDbGljayggKHNxdWFyZU51bSkgPT4ge1xuXG4gICAgICAgIC8vIEF0dGFjayB0aGUgc3F1YXJlXG4gICAgICAgIGNvbnN0IHJlcyA9IHVzZXIubWFudWFsQXR0YWNrKHNxdWFyZU51bSlcblxuICAgICAgICAvLyBJZiBcIm1hbnVhbEF0dGFja1wiIHJldHVybnMgYW4gZXJyb3IsIHNob3cgaXRcbiAgICAgICAgaWYgKHJlcy5lcnJvcikge1xuICAgICAgICAgICAgdmlldy5zaG93VXNlckluZm8ocmVzLmVycm9yKVxuICAgICAgICAgICAgdmlldy5zaG93Q29tcHV0ZXJJbmZvKFwiXCIpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGF0dGFja1JlcyA9IGNvbXB1dGVyLmdldEdhbWVCb2FyZCgpLnJlY2VpdmVBdHRhY2soc3F1YXJlTnVtKSAvLyBBdHRhY2sgY29tcHV0ZXIgYm9hcmRcblxuICAgICAgICAgICAgLy8gSWYgXCJyZWNlaXZlQXR0YWNrXCIgcmV0dXJucyBhbiBlcnJvciwgc2hvdyBpdFxuICAgICAgICAgICAgaWYgKGF0dGFja1Jlcy5lcnJvcikge1xuXG4gICAgICAgICAgICAgICAgdmlldy5zaG93VXNlckluZm8oYXR0YWNrUmVzLmVycm9yKVxuICAgICAgICAgICAgICAgIHZpZXcuc2hvd0NvbXB1dGVySW5mbyhcIlwiKVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHsgLy8gSWYgbm90LCByZWFkIHRoZSByZXN1bHRcblxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBhdHRhY2sgd2FzIGEgaGl0LCBzaG93IGl0XG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja1Jlcy50eXBlID09PSBcIlNoaXBIaXRcIikge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmlldy5zaG93VXNlckluZm8oXCJZb3UgaGl0IGEgc2hpcCFcIilcbiAgICAgICAgICAgICAgICAgICAgdmlldy5zaG93Q29tcHV0ZXJJbmZvKGF0dGFja1Jlcy5zdWNjZXNzKVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzaGlwIHdhcyBzdW5rLCBzaG93IGl0XG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRhY2tSZXMuc3VuayAhPT0gXCJcIikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LnNob3dVc2VySW5mbyhcIllvdSBzdW5rIGEgc2hpcCFcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcuc2hvd0NvbXB1dGVySW5mbyhgT2ggbm8hIG15ICR7YXR0YWNrUmVzLnN1bmt9IWApXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LnVwZGF0ZUNvbXB1dGVyU2hpcHlhcmQoYXR0YWNrUmVzLnN1bmspXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIGFsbCBzaGlwcyBhcmUgc3VuaywgZmluaXNoIHRoZSBnYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tcHV0ZXIuZ2V0R2FtZUJvYXJkKCkuZ2V0R2FtZU92ZXIoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcuc2hvd1ZpY3RvcnlNb2RhbChcIllvdVwiKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGF0dGFja1Jlcy50eXBlID09PSBcIk1pc3NcIikgeyAvLyBJZiBub3QsIHNob3cgYSBtaXNzXG5cbiAgICAgICAgICAgICAgICAgICAgdmlldy5zaG93VXNlckluZm8oXCJZb3UgbWlzc2VkIVwiKVxuICAgICAgICAgICAgICAgICAgICB2aWV3LnNob3dDb21wdXRlckluZm8oYXR0YWNrUmVzLnN1Y2Nlc3MpXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgY29tcHV0ZXIgYm9hcmRcbiAgICAgICAgICAgICAgICB2aWV3LnVwZGF0ZUNvbXB1dGVyR2FtZWJvYXJkKHNxdWFyZU51bSwgYXR0YWNrUmVzLnR5cGUpXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ29tcHV0ZXIgYXR0YWNrc1xuICAgICAgICAvLyBjb25zdCBzcXVhcmUgPSBjb21wdXRlci5nZW5lcmF0ZUF1dG9BdHRhY2soKVxuXG4gICAgfSlcblxufVxuXG4vLyBDcmVhdGUgdGhlIGludGVyZmFjZSBhbmQgcGxheWVyIG9iamVjdHNcbnZpZXcubG9hZENvdmVyTWFpblVJKGxvYWRNYWluVUkpIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiXG5cbi8vIEZhY3RvcnkgcmVwcmVzZW50aW5nIGEgcGxheWVyIGluIHRoZSBnYW1lXG5jb25zdCBQbGF5ZXIgPSAodHlwZSkgPT4ge1xuXG4gICAgY29uc3QgX2dhbWVCb2FyZCA9IEdhbWVib2FyZCgpIC8vIEVhY2ggcGxheWVyIGhhcyBhIGdhbWUgYm9hcmRcbiAgICBjb25zdCBfdHlwZSA9IHR5cGUgLy8gUG9zc2libGUgdmFsdWVzOiBcIkh1bWFuXCIgb3IgXCJBSVwiXG4gICAgY29uc3QgX3NoaXBzID0gW1NoaXAoXCJjYXJyaWVyXCIpLFNoaXAoXCJiYXR0bGVzaGlwXCIpLFNoaXAoXCJkZXN0cm95ZXJcIiksU2hpcChcInN1Ym1hcmluZVwiKSxTaGlwKFwiYm9hdFwiKV0gLy8gQXJyYXkgb2Ygc2hpcHMgYSBwbGF5ZXIgaXMgcHJvdmlkZWQgd2l0aFxuICAgIGNvbnN0IF9hdmFpbGFibGVBdHRhY2tzID0gQXJyYXkuZnJvbSh7bGVuZ3RoOiAxMDB9LCAoXywgaW5kZXgpID0+IGluZGV4KSAvLyBDcmVhdGVzIGFuIGFycmF5IGZyb20gMCB0byA5OVxuXG4gICAgLy8gR2V0cyB0aGUgZ2FtZSBib2FyZFxuICAgIGNvbnN0IGdldEdhbWVCb2FyZCA9ICgpID0+IF9nYW1lQm9hcmRcbiAgICBcbiAgICAvLyBHZXRzIHRoZSBwbGF5ZXIgdHlwZVxuICAgIGNvbnN0IGdldFBsYXllclR5cGUgPSAoKSA9PiBfdHlwZVxuXG4gICAgLy8gR2V0cyB0aGUgcGxheWVyIHNoaXBzIGFycmF5XG4gICAgY29uc3QgZ2V0U2hpcHMgPSAoKSA9PiBfc2hpcHNcblxuICAgIC8vIEdldHMgc2hpcCBhdCBwb3NpdGlvbiBpbiB0aGUgYXJyYXkgb2YgcGxheWVyJ3Mgc2hpcHNcbiAgICBjb25zdCBnZXRTaGlwQXRQb3MgPSAocG9zKSA9PiBfc2hpcHNbcG9zXVxuXG4gICAgLy8gUmVjZWl2ZXMgYSBuYW1lIGFuZCByZXR1cm5zIHRoZSBzaGlwIHdpdGggdGhhdCBuYW1lIG9yIG51bGwgaWYgaXQgZG9lc24ndCBleGlzdFxuICAgIGNvbnN0IGdldFNoaXBCeU5hbWUgPSAobmFtZSkgPT4ge1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfc2hpcHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlmIChfc2hpcHNbaV0uZ2V0TmFtZSgpID09PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9zaGlwc1tpXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIFxuICAgIH1cblxuICAgIC8vIFJlY2VpdmVzIGEgc2hpcCBuYW1lIGFuZCBkZWxldGVzIGl0IGZyb20gdGhlIHBsYXllcidzIHNoaXBzIGFycmF5XG4gICAgY29uc3QgZGVsZXRlU2hpcEJ5TmFtZSA9IChuYW1lKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9zaGlwcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgaWYgKF9zaGlwc1tpXS5nZXROYW1lKCkgPT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICBfc2hpcHMuc3BsaWNlKGksIDEpXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8gR2V0cyB0aGUgYXR0YWNrcyBhcnJheVxuICAgIGNvbnN0IGdldEF2YWlsYWJsZUF0dGFja3MgPSAoKSA9PiBfYXZhaWxhYmxlQXR0YWNrc1xuXG4gICAgLy8gR2V0cyB0aGUgc3F1YXJlIGF0ICdwb3MnIGluIHRoZSAnX2F2YWlsYWJsZUF0dGFja3MnIGFycmF5XG4gICAgY29uc3QgZ2V0QXR0YWNrQXRQb3MgPSAocG9zKSA9PiBfYXZhaWxhYmxlQXR0YWNrc1twb3NdXG5cbiAgICAvLyBHZXRzIGluZGV4IG9mIGEgc3F1YXJlIGluIHRoZSAnX2F2YWlsYWJsZUF0dGFja3MnIGFycmF5XG4gICAgY29uc3QgZ2V0SW5kZXhPZkF0dGFjayA9IChzcXVhcmUpID0+IF9hdmFpbGFibGVBdHRhY2tzLmluZGV4T2Yoc3F1YXJlKVxuXG4gICAgLy8gUmVjZWl2ZXMgYSBzcXVhcmUgaW4gcmV0dXJucyB0cnVlIGlmIHRoYXQgc3F1YXJlIGhhc24ndCBiZWVuIGF0dGFja2VkIHlldFxuICAgIGNvbnN0IGlzVmFsaWRBdHRhY2sgPSAoc3F1YXJlKSA9PiBnZXRBdmFpbGFibGVBdHRhY2tzKCkuaW5jbHVkZXMoc3F1YXJlKVxuXG4gICAgLy8gR2V0cyBhIHJhbmRvbSB2YWx1ZSBcInhcIiBvciBcInlcIiBmb3IgdGhlIG9yaWVudGF0aW9uIG9mIGEgc2hpcFxuICAgIGNvbnN0IGdldFJhbmRvbURpcmVjdGlvbiA9ICgpID0+IChNYXRoLnJhbmRvbSgpIDwgMC41ID8gXCJ4XCIgOiBcInlcIilcblxuICAgIC8vIFJhbmRvbWx5IHNodWZmbGVzIGFuIGFycmF5IFxuICAgIGNvbnN0IHNodWZmbGVBcnJheSA9IChhcnJheSkgPT4ge1xuICAgICAgICBjb25zdCBzaHVmZmxlZEFycmF5ID0gWy4uLmFycmF5XTtcbiAgICAgICAgZm9yIChsZXQgaSA9IHNodWZmbGVkQXJyYXkubGVuZ3RoIC0gMTsgaSA+IDA7IGkgLT0gMSkge1xuICAgICAgICAgICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgICAgICAgICAgW3NodWZmbGVkQXJyYXlbaV0sIHNodWZmbGVkQXJyYXlbal1dID0gW3NodWZmbGVkQXJyYXlbal0sIHNodWZmbGVkQXJyYXlbaV1dXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNodWZmbGVkQXJyYXlcbiAgICB9XG4gICAgXG4gICAgLy8gUGxhY2VzIHNoaXBzIHJhbmRvbWx5IG9uIHRoZSBnYW1lIGJvYXJkXG4gICAgY29uc3QgcGxhY2VTaGlwc1JhbmRvbWx5ID0gKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgIC8vIENyZWF0ZXMgYW4gb3JkZXJlZCBhcnJheSAwIHRvIDk5XG4gICAgICAgIGNvbnN0IHN0YXJ0UG9zaXRpb25DYW5kaWRhdGVzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAwIH0sIChfLCBpbmRleCkgPT4gaW5kZXgpO1xuICAgICAgICAvLyBTaHVmZmxlIGFycmF5IHBvc2l0aW9ucyAgICAgICAgICAgIFxuICAgICAgICBjb25zdCBzaHVmZmxlZFBvc2l0aW9ucyA9IHNodWZmbGVBcnJheShzdGFydFBvc2l0aW9uQ2FuZGlkYXRlcyk7XG5cbiAgICAgICAgLy8gV2hpbGUgdGhlIGFycmF5IG9mIHNoaXBzIGlzIG5vdCBlbXB0eVxuICAgICAgICB3aGlsZSAoZ2V0U2hpcHMoKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEl0ZXJhdGUgXCJzaHVmZmxlZFBvc2l0aW9uc1wiIGFycmF5IHVudGlsIGZpbmQgYSB2YWxpZCBzaGlwIHBsYWNlbWVudFxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaHVmZmxlZFBvc2l0aW9ucy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IGdldFJhbmRvbURpcmVjdGlvbigpXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZ2V0R2FtZUJvYXJkKCkucGxhY2VTaGlwKGdldFNoaXBBdFBvcyhnZXRTaGlwcygpLmxlbmd0aCAtIDEpLCBzaHVmZmxlZFBvc2l0aW9uc1tqXSwgZGlyZWN0aW9uKVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGdldFNoaXBzKCkucG9wKClcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgLy8gUGxhY2VzIGEgc2hpcCBtYW51YWxseSBvbiB0aGUgZ2FtZWJvYXJkXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHNxdWFyZSwgc2hpcE5hbWUsIG9yaWVudGF0aW9uKSA9PiB7XG4gICAgICAgIFxuICAgICAgICAvLyBHZXQgdGhlIHNoaXBcbiAgICAgICAgY29uc3Qgc2hpcCA9IGdldFNoaXBCeU5hbWUoc2hpcE5hbWUpXG5cbiAgICAgICAgLy8gVGVzdCBpZiBzaGlwIGV4aXN0c1xuICAgICAgICBpZiAoIXNoaXApIHtcbiAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBcIlNoaXAgZG9lc24ndCBleGlzdCFcIiB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBuZWVkIHRvIHRyYW5zbGF0ZSBcIm9yaWVudGF0aW9uXCIgaW50byBcImRpcmVjdGlvblwiXG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IG9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIiA/IFwieFwiIDogXCJ5XCJcblxuICAgICAgICBjb25zdCByZXMgPSBnZXRHYW1lQm9hcmQoKS5wbGFjZVNoaXAoc2hpcCwgc3F1YXJlLCBkaXJlY3Rpb24pXG5cbiAgICAgICAgLy8gSWYgc2hpcCBwbGFjZW1lbnQgd2FzIHN1Y2Nlc3NmdWwsIFxuICAgICAgICAvLyBkZWxldGUgaXQgZnJvbSB0aGUgcGxheWVyJ3Mgc2hpcHMgYXJyYXksXG4gICAgICAgIC8vIHJldHVybiBzdWNjZXNzIG1zZyBhbmQgdGhlIGFycmF5IG9mIHNxdWFyZXMgdGhpcyBzaGlwIG9jY3VwaWVzXG4gICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBkZWxldGVTaGlwQnlOYW1lKHNoaXBOYW1lKVxuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogXCJTaGlwIHBsYWNlZFwiLCBzcXVhcmVzOiByZXMuZGF0YSB9XG5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHsgZXJyb3I6IFwiSW52YWxpZCBzaGlwIHBsYWNlbWVudFwiIH1cblxuICAgIH1cblxuICAgIC8vIEdlbmVyYXRlcyBhIHJhbmRvbSBpbmRleCBmcm9tIHRoYXQgYXJyYXkgb2YgYXZhaWxhYmxlIGF0dGFja3NcbiAgICBjb25zdCBnZW5lcmF0ZVJhbmRvbUluZGV4ID0gKCkgPT4gXG4gICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGdldEF2YWlsYWJsZUF0dGFja3MoKS5sZW5ndGgpXG5cbiAgICAvLyBXaGVuIHdlIGF0dGFjayBhIHBvc2l0aW9uIGluIGVuZW15J3MgYm9hcmQgXG4gICAgLy8gd2UgbmVlZCB0byBkZWxldGUgaXQgZnJvbSBhdmFpbGFibGUgYXR0YWNrcyB0byBub3QgcmVwZWF0IGl0IGluIHRoZSBmdXR1cmVcbiAgICBjb25zdCBkZWxldGVGcm9tQXZhaWxhYmxlQXR0YWNrcyA9IChpbmRleCkgPT4ge1xuICAgICAgICBfYXZhaWxhYmxlQXR0YWNrcy5zcGxpY2UoaW5kZXgsMSlcbiAgICB9XG5cbiAgICAvLyBHZW5lcmF0ZXMgYSBzcXVhcmUgdG8gYXR0YWNrXG4gICAgY29uc3QgZ2VuZXJhdGVBdXRvQXR0YWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGdlbmVyYXRlUmFuZG9tSW5kZXgoKVxuICAgICAgICAgICAgY29uc3Qgc3F1YXJlID0gZ2V0QXR0YWNrQXRQb3MoaW5kZXgpXG4gICAgICAgICAgICBkZWxldGVGcm9tQXZhaWxhYmxlQXR0YWNrcyhpbmRleClcbiAgICAgICAgICAgIHJldHVybiBzcXVhcmVcblxuICAgIH1cblxuICAgIC8vIEh1bWFuIHBsYXllciBhdHRhY2tzIGFuIHNwZWNpZmljIGxvY2F0aW9uXG4gICAgY29uc3QgbWFudWFsQXR0YWNrID0gKHNxdWFyZSkgPT4ge1xuXG4gICAgICAgIC8vIFRlc3QgaWYgaXMgdmFsaWQgYXR0YWNrXG4gICAgICAgIGlmICghaXNWYWxpZEF0dGFjayhzcXVhcmUpKSB7XG4gICAgICAgICAgICByZXR1cm4geyBlcnJvcjogXCJJbnZhbGlkIGF0dGFjayEgVGhhdCBzcXVhcmUgd2FzIGF0dGFja2VkIHlldFwiIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERlbGV0ZSB0aGEgc3F1YXJlIGZyb20gdmFsaWQgYXR0YWNrcyBhcnJheVxuICAgICAgICBkZWxldGVGcm9tQXZhaWxhYmxlQXR0YWNrcyhnZXRJbmRleE9mQXR0YWNrKHNxdWFyZSkpXG5cbiAgICAgICAgLy8gUmV0dXJuIHN1Y2Nlc3MgbXNnXG4gICAgICAgIHJldHVybiB7c3VjY2VzczogXCJQb3NpdGlvbiBhdHRhY2tlZCEgXCJ9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0R2FtZUJvYXJkLFxuICAgICAgICBwbGFjZVNoaXBzUmFuZG9tbHksXG4gICAgICAgIGdlbmVyYXRlQXV0b0F0dGFjayxcbiAgICAgICAgaXNWYWxpZEF0dGFjayxcbiAgICAgICAgbWFudWFsQXR0YWNrLFxuICAgICAgICBnZXRQbGF5ZXJUeXBlLFxuICAgICAgICBnZXRTaGlwcyxcbiAgICAgICAgZ2V0UmFuZG9tRGlyZWN0aW9uLFxuICAgICAgICBwbGFjZVNoaXAsXG4gICAgICAgIGdldFNoaXBCeU5hbWUsXG4gICAgICAgIGRlbGV0ZVNoaXBCeU5hbWVcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyIiwiLy8gRmFjdG9yeSByZXByZXNlbnRpbmcgYSBTaGlwIGluIHRoZSBnYW1lXG5jb25zdCBTaGlwID0gKG5hbWUpID0+IHtcbiAgICBcbiAgICBjb25zdCBfbmFtZSA9IG5hbWVcbiAgICBcbiAgICBsZXQgX2xlbmd0aCA9IDAgLy8gTnVtYmVyIG9mIHNxdWFyZXMgdGhlIHNoaXAgb2NjdXBpZXNcblxuICAgIC8vIENhcnJpZXIgNSAtIEJhdHRsZXNoaXAgNCAtIERlc3Ryb3llciAzIC0gU3VibWFyaW5lIDMgLSBQYXRyb2wgQm9hdCAyXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgIFxuICAgICAgICBjYXNlIF9uYW1lID09PSBcImNhcnJpZXJcIjpcbiAgICAgICAgICAgIF9sZW5ndGggPSA1XG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIF9uYW1lID09PSBcImJhdHRsZXNoaXBcIjpcbiAgICAgICAgICAgIF9sZW5ndGggPSA0XG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIF9uYW1lID09PSBcImRlc3Ryb3llclwiOlxuICAgICAgICAgICAgX2xlbmd0aCA9IDNcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgX25hbWUgPT09IFwic3VibWFyaW5lXCI6XG4gICAgICAgICAgICBfbGVuZ3RoID0gM1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBfbmFtZSA9PT0gXCJib2F0XCI6XG4gICAgICAgICAgICBfbGVuZ3RoID0gMlxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIF9sZW5ndGggPSAwXG4gICAgICAgICAgICBicmVha1xuXG4gICAgfVxuXG4gICAgbGV0IF9oaXRzID0gMCAvLyBOdW1iZXIgb2YgdGltZXMgdGhlIHNoaXAgaGFzIGJlZW4gZGFtYWdlZFxuICAgIGxldCBfc3VuayA9IGZhbHNlIC8vIEluZGljYXRlcyBpZiB0aGUgc2hpcCBoYXMgYmVlbiBzdW5rIG9yIG5vdFxuXG4gICAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IF9uYW1lXG5cbiAgICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiBfbGVuZ3RoXG5cbiAgICBjb25zdCBnZXRIaXRzID0gKCkgPT4gX2hpdHNcblxuICAgIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGlmIChfaGl0cyA8IF9sZW5ndGgpIHtcbiAgICAgICAgICAgIF9oaXRzICs9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX2hpdHMgPT09IF9sZW5ndGgpIHtcbiAgICAgICAgICAgIF9zdW5rID0gdHJ1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaXNTdW5rID0gKCkgPT4gX3N1bmtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldE5hbWUsXG4gICAgICAgIGdldExlbmd0aCxcbiAgICAgICAgZ2V0SGl0cyxcbiAgICAgICAgaGl0LFxuICAgICAgICBpc1N1bmtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXAiLCIvLyBJTVBPUlRTXG5pbXBvcnQgY2FycmllclN2ZyBmcm9tIFwiLi9hc3NldHMvZ3JhcGhpY3MvY2Fycmllci5zdmdcIjtcbmltcG9ydCBzdWJtYXJpbmVTdmcgZnJvbSBcIi4vYXNzZXRzL2dyYXBoaWNzL3N1Ym1hcmluZS5zdmdcIjtcbmltcG9ydCBiYXR0bGVzaGlwU3ZnIGZyb20gXCIuL2Fzc2V0cy9ncmFwaGljcy9iYXR0bGVzaGlwLnN2Z1wiO1xuaW1wb3J0IGRlc3Ryb3llclN2ZyBmcm9tIFwiLi9hc3NldHMvZ3JhcGhpY3MvZGVzdHJveWVyLnN2Z1wiO1xuaW1wb3J0IHBhdHJvbFN2ZyBmcm9tIFwiLi9hc3NldHMvZ3JhcGhpY3MvcGF0cm9sLWJvYXQuc3ZnXCI7XG5cbi8vIEEgbW9kdWxlIChvbmx5IG9uZSBpbnN0YW5jZSkgZm9yIGEgVmlldyB0aGF0IGNvbnRyb2wgRE9NIG1hbmlwdWxhdGlvblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQsIGltcG9ydC9uby1tdXRhYmxlLWV4cG9ydHMsIHByZWZlci1jb25zdCwgZnVuYy1uYW1lc1xuZXhwb3J0IGxldCB2aWV3ID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gU29tZSB1c2VmdWwgdmFyaWFibGVzXG4gICAgbGV0IHNlbGVjdGVkU2hpcExlbmd0aCA9IDBcbiAgICBsZXQgb3JpZW50YXRpb24gPSBcImhvcml6b250YWxcIlxuICAgIGxldCBzZWxlY3RlZFNoaXBOYW1lID0gXCJcIlxuICAgIGxldCBwbGFjZWRTaGlwc0NvdW50ZXIgPSAwXG5cbiAgICAvLyBDcmVhdGUgYW4gZWxlbWVudCB3aXRoIGFuIG9wdGlvbmFsIENTUyBjbGFzcyBhbmQgb3B0aW9uYWwgQ1NTIGlkXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWcsIGNsYXNzTmFtZSwgaWQpIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZylcblxuICAgICAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImlkXCIsaWQpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudFxuXG4gICAgfVxuXG4gICAgLy8gUmV0cmlldmUgYW4gZWxlbWVudCBmcm9tIHRoZSBET01cbiAgICBmdW5jdGlvbiBnZXRFbGVtZW50KGlkKSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpXG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnRcblxuICAgIH1cblxuICAgIC8vIERlbGV0ZSB0aGUgY29udGVudCBpbnNpZGUgXCJtYWluXCIgPGRpdj5cbiAgICBmdW5jdGlvbiBkZWxldGVNYWluVUkoKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSBnZXRFbGVtZW50KFwibWFpblwiKVxuICAgICAgICBtYWluLmlubmVySFRNTCA9IFwiXCJcbiAgICB9XG5cbiAgICAvLyBTaG93cyBpbmZvIGluIHVzZXJzIFwiaW5zdHJ1Y3Rpb25zXCIgZGl2XG4gICAgZnVuY3Rpb24gc2hvd1VzZXJJbmZvKGluZm8pIHtcblxuICAgICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluc3RydWN0aW9uc1wiKVxuICAgICAgICBpbnN0cnVjdGlvbnMudGV4dENvbnRlbnQgPSBpbmZvXG5cbiAgICB9XG5cbiAgICAvLyBTaG93cyBpbmZvIGluIGNvbXB1dGVycyBcImluc3RydWN0aW9uc1wiIGRpdlxuICAgIGZ1bmN0aW9uIHNob3dDb21wdXRlckluZm8oaW5mbykge1xuXG4gICAgICAgIGNvbnN0IGNvbXB1dGVySW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXJJbmZvXCIpXG4gICAgICAgIGNvbXB1dGVySW5mby50ZXh0Q29udGVudCA9IGluZm9cblxuICAgIH1cblxuICAgIC8vIEhhbmRsZXMgYSBjbGljayBvbiBhIHNoaXAgaW4gdGhlIHVzZXIncyBTaGlweWFyZFxuICAgIGZ1bmN0aW9uIGhhbmRsZVNoaXBDbGljayhzaGlwKSB7XG5cbiAgICAgICAgLy8gSWYgc2hpcCBpcyBhbHJlYWR5IHBsYWNlZCBvbiBib2FyZCwgcmV0dXJuXG4gICAgICAgIGlmIChzaGlwLmNsYXNzTGlzdC5jb250YWlucyhcInBsYWNlZFwiKSkgc2hvd1VzZXJJbmZvKFwiU2hpcCBhbHJlYWR5IHBsYWNlZCBvbiBib2FyZFwiKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAvLyBJZiB0aGVyZSBpcyBvdGhlciBzZWxlY3RlZCBzaGlwLCByZW1vdmUgdGhlIHNlbGVjdGVkIGNsYXNzIGZyb20gaXRcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRTaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RlZFwiKVxuICAgICAgICBpZiAoc2VsZWN0ZWRTaGlwKSBzZWxlY3RlZFNoaXAuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpXG5cbiAgICAgICAgLy8gQWRkIHNlbGVjdGVkIGNsYXNzIHRvIHRoZSBjbGlja2VkIHNoaXBcbiAgICAgICAgc2hpcC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIilcblxuICAgICAgICAvLyBVcGRhdGUgc2VsZWN0ZWQgc2hpcCBhbmQgc2VsZWN0ZWRTaGlwTGVuZ3RoIHZhcmlhYmxlc1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICAgICAgc2VsZWN0ZWRTaGlwTmFtZSA9IHNoaXAuY2xhc3NMaXN0WzBdXG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggKHNlbGVjdGVkU2hpcE5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJjYXJyaWVyXCI6XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRTaGlwTGVuZ3RoID0gNVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIFwiYmF0dGxlc2hpcFwiOlxuICAgICAgICAgICAgICAgIHNlbGVjdGVkU2hpcExlbmd0aCA9IDRcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBcImRlc3Ryb3llclwiOlxuICAgICAgICAgICAgICAgIHNlbGVjdGVkU2hpcExlbmd0aCA9IDNcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBcInN1Ym1hcmluZVwiOlxuICAgICAgICAgICAgICAgIHNlbGVjdGVkU2hpcExlbmd0aCA9IDNcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBcImJvYXRcIjpcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFNoaXBMZW5ndGggPSAyXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRTaGlwTGVuZ3RoID0gMFxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGFuZ2UgaW5zdHJ1Y3Rpb25zIHRleHRcbiAgICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnN0cnVjdGlvbnNcIilcbiAgICAgICAgaWYgKGluc3RydWN0aW9ucykgaW5zdHJ1Y3Rpb25zLnRleHRDb250ZW50ID0gXCJTZWxlY3QgYSBwb3NpdGlvbiBvbiB0aGUgYm9hcmQgdG8gcGxhY2UgdGhlIHNoaXAuIFVzZSBUIGtleSB0byByb3RhdGUgdGhlIHNoaXBcIlxuXG4gICAgfVxuXG4gICAgLy8gTG9hZHMgZ2FtZSBVSVxuICAgIGZ1bmN0aW9uIGxvYWRHYW1lVUkoKSB7XG4gICAgICAgIFxuICAgICAgICAvLyBTSURFU1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdXNlclNpZGUgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJwbGF5ZXJTaWRlXCIsbnVsbClcbiAgICAgICAgY29uc3QgY29tcHV0ZXJTaWRlID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwicGxheWVyU2lkZVwiLG51bGwpXG5cbiAgICAgICAgY29uc3QgbWFpbiA9IGdldEVsZW1lbnQoXCJtYWluXCIpXG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQodXNlclNpZGUpXG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQoY29tcHV0ZXJTaWRlKVxuXG4gICAgICAgIC8vIEhlYWRlcnNcblxuICAgICAgICBjb25zdCB1c2VySGVhZGVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiZ2FtZUhlYWRlclwiLFwidXNlckdhbWVIZWFkZXJcIilcbiAgICAgICAgY29uc3QgY29tcHV0ZXJIZWFkZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJnYW1lSGVhZGVyXCIsXCJjb21wdXRlckdhbWVIZWFkZXJcIilcblxuICAgICAgICBjb25zdCB1c2VyVGl0bGUgPSBjcmVhdGVFbGVtZW50KFwiaDJcIixcInBsYXllclRpdGxlXCIsbnVsbClcbiAgICAgICAgY29uc3QgY29tcHV0ZXJUaXRsZSA9IGNyZWF0ZUVsZW1lbnQoXCJoMlwiLFwicGxheWVyVGl0bGVcIixudWxsKVxuXG4gICAgICAgIHVzZXJUaXRsZS50ZXh0Q29udGVudCA9IFwiWU9VUiBGTEVFVFwiXG4gICAgICAgIGNvbXB1dGVyVGl0bGUudGV4dENvbnRlbnQgPSBcIkVORU1ZIEZMRUVUXCJcblxuICAgICAgICB1c2VySGVhZGVyLmFwcGVuZENoaWxkKHVzZXJUaXRsZSlcbiAgICAgICAgY29tcHV0ZXJIZWFkZXIuYXBwZW5kQ2hpbGQoY29tcHV0ZXJUaXRsZSlcblxuICAgICAgICB1c2VyU2lkZS5hcHBlbmRDaGlsZCh1c2VySGVhZGVyKVxuICAgICAgICBjb21wdXRlclNpZGUuYXBwZW5kQ2hpbGQoY29tcHV0ZXJIZWFkZXIpXG5cbiAgICAgICAgLy8gR2FtZWJvYXJkc1xuXG4gICAgICAgIGNvbnN0IHVzZXJHYW1lYm9hcmRDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJnYW1lYm9hcmRDb250YWluZXJcIixcInVzZXJHYW1lYm9hcmRDb250YWluZXJcIilcbiAgICAgICAgY29uc3QgY29tcHV0ZXJHYW1lYm9hcmRDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJnYW1lYm9hcmRDb250YWluZXJcIixcImNvbXB1dGVyR2FtZWJvYXJkQ29udGFpbmVyXCIpXG5cbiAgICAgICAgY29uc3QgdXNlclhIZWFkZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJ4SGVhZGVyXCIsbnVsbClcbiAgICAgICAgY29uc3QgY29tcHV0ZXJYSGVhZGVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwieEhlYWRlclwiLG51bGwpXG5cbiAgICAgICAgLy8gR2VuZXJhdGUgdGhlIHhIZWFkZXIgc3F1YXJlc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJYSGVhZGVyU3F1YXJlID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwieEhlYWRlclNxdWFyZVwiLG51bGwpXG4gICAgICAgICAgICBjb25zdCBjb21wdXRlclhIZWFkZXJTcXVhcmUgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJ4SGVhZGVyU3F1YXJlXCIsbnVsbClcbiAgICAgICAgICAgIHVzZXJYSGVhZGVyU3F1YXJlLnRleHRDb250ZW50ID0gU3RyaW5nLmZyb21DaGFyQ29kZSg2NSArIGkpXG4gICAgICAgICAgICBjb21wdXRlclhIZWFkZXJTcXVhcmUudGV4dENvbnRlbnQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDY1ICsgaSlcbiAgICAgICAgICAgIHVzZXJYSGVhZGVyLmFwcGVuZENoaWxkKHVzZXJYSGVhZGVyU3F1YXJlKVxuICAgICAgICAgICAgY29tcHV0ZXJYSGVhZGVyLmFwcGVuZENoaWxkKGNvbXB1dGVyWEhlYWRlclNxdWFyZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHVzZXJCb3R0b21Cb2FyZCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImJvdHRvbUJvYXJkXCIsbnVsbClcbiAgICAgICAgY29uc3QgY29tcHV0ZXJCb3R0b21Cb2FyZCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImJvdHRvbUJvYXJkXCIsbnVsbClcblxuICAgICAgICBjb25zdCB1c2VyWUhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInlIZWFkZXJcIixudWxsKVxuICAgICAgICBjb25zdCBjb21wdXRlcllIZWFkZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJ5SGVhZGVyXCIsbnVsbClcblxuICAgICAgICAvLyBHZW5lcmF0ZSB0aGUgeUhlYWRlciBzcXVhcmVzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgdXNlcllIZWFkZXJTcXVhcmUgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJ5SGVhZGVyU3F1YXJlXCIsbnVsbClcbiAgICAgICAgICAgIGNvbnN0IGNvbXB1dGVyWUhlYWRlclNxdWFyZSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInlIZWFkZXJTcXVhcmVcIixudWxsKVxuICAgICAgICAgICAgdXNlcllIZWFkZXJTcXVhcmUudGV4dENvbnRlbnQgPSBpICsgMVxuICAgICAgICAgICAgY29tcHV0ZXJZSGVhZGVyU3F1YXJlLnRleHRDb250ZW50ID0gaSArIDFcbiAgICAgICAgICAgIHVzZXJZSGVhZGVyLmFwcGVuZENoaWxkKHVzZXJZSGVhZGVyU3F1YXJlKVxuICAgICAgICAgICAgY29tcHV0ZXJZSGVhZGVyLmFwcGVuZENoaWxkKGNvbXB1dGVyWUhlYWRlclNxdWFyZSlcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1c2VyWUhlYWRlclNoaXB5YXJkID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwieUhlYWRlclNoaXB5YXJkXCIsbnVsbClcbiAgICAgICAgY29uc3QgY29tcHV0ZXJZSGVhZGVyU2hpcHlhcmQgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJ5SGVhZGVyU2hpcHlhcmRcIixudWxsKVxuICAgICAgICB1c2VyWUhlYWRlclNoaXB5YXJkLnRleHRDb250ZW50ID0gXCJTaGlweWFyZFwiXG4gICAgICAgIGNvbXB1dGVyWUhlYWRlclNoaXB5YXJkLnRleHRDb250ZW50ID0gXCJTaGlweWFyZFwiXG4gICAgICAgIHVzZXJZSGVhZGVyLmFwcGVuZENoaWxkKHVzZXJZSGVhZGVyU2hpcHlhcmQpXG4gICAgICAgIGNvbXB1dGVyWUhlYWRlci5hcHBlbmRDaGlsZChjb21wdXRlcllIZWFkZXJTaGlweWFyZClcblxuICAgICAgICBjb25zdCB1c2VyR3JpZFBhbmVsQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiZ3JpZFBhbmVsQ29udGFpbmVyXCIsXCJ1c2VyR3JpZFBhbmVsQ29udGFpbmVyXCIpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyR3JpZFBhbmVsQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiZ3JpZFBhbmVsQ29udGFpbmVyXCIsXCJjb21wdXRlckdyaWRQYW5lbENvbnRhaW5lclwiKVxuXG4gICAgICAgIGNvbnN0IHVzZXJHYW1lYm9hcmQgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJnYW1lYm9hcmRHcmlkXCIsXCJ1c2VyR2FtZWJvYXJkR3JpZFwiKVxuICAgICAgICB1c2VyR2FtZWJvYXJkLmNsYXNzTGlzdC5hZGQoXCJibG9ja2VkXCIpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyR2FtZWJvYXJkID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiZ2FtZWJvYXJkR3JpZFwiLFwiY29tcHV0ZXJHYW1lYm9hcmRHcmlkXCIpXG4gICAgICAgIGNvbXB1dGVyR2FtZWJvYXJkLmNsYXNzTGlzdC5hZGQoXCJibG9ja2VkXCIpXG5cbiAgICAgICAgLy8gR2VuZXJhdGUgdGhlIGdhbWVib2FyZCBzcXVhcmVzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJHYW1lYm9hcmRTcXVhcmUgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJnYW1lYm9hcmRTcXVhcmVcIixudWxsKVxuICAgICAgICAgICAgdXNlckdhbWVib2FyZFNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWluZGV4XCIsaSlcbiAgICAgICAgICAgIGNvbnN0IGNvbXB1dGVyR2FtZWJvYXJkU3F1YXJlID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiZ2FtZWJvYXJkU3F1YXJlXCIsbnVsbClcbiAgICAgICAgICAgIGNvbXB1dGVyR2FtZWJvYXJkU3F1YXJlLnNldEF0dHJpYnV0ZShcImRhdGEtaW5kZXhcIixpKVxuICAgICAgICAgICAgdXNlckdhbWVib2FyZC5hcHBlbmRDaGlsZCh1c2VyR2FtZWJvYXJkU3F1YXJlKVxuICAgICAgICAgICAgY29tcHV0ZXJHYW1lYm9hcmQuYXBwZW5kQ2hpbGQoY29tcHV0ZXJHYW1lYm9hcmRTcXVhcmUpXG4gICAgICAgIH1cblxuICAgICAgICB1c2VyR3JpZFBhbmVsQ29udGFpbmVyLmFwcGVuZENoaWxkKHVzZXJHYW1lYm9hcmQpXG4gICAgICAgIGNvbXB1dGVyR3JpZFBhbmVsQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbXB1dGVyR2FtZWJvYXJkKVxuXG4gICAgICAgIHVzZXJHYW1lYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQodXNlclhIZWFkZXIpXG4gICAgICAgIHVzZXJHYW1lYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQodXNlckJvdHRvbUJvYXJkKVxuICAgICAgICB1c2VyQm90dG9tQm9hcmQuYXBwZW5kQ2hpbGQodXNlcllIZWFkZXIpXG4gICAgICAgIHVzZXJCb3R0b21Cb2FyZC5hcHBlbmRDaGlsZCh1c2VyR3JpZFBhbmVsQ29udGFpbmVyKVxuXG4gICAgICAgIGNvbXB1dGVyR2FtZWJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbXB1dGVyWEhlYWRlcilcbiAgICAgICAgY29tcHV0ZXJHYW1lYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoY29tcHV0ZXJCb3R0b21Cb2FyZClcbiAgICAgICAgY29tcHV0ZXJCb3R0b21Cb2FyZC5hcHBlbmRDaGlsZChjb21wdXRlcllIZWFkZXIpXG4gICAgICAgIGNvbXB1dGVyQm90dG9tQm9hcmQuYXBwZW5kQ2hpbGQoY29tcHV0ZXJHcmlkUGFuZWxDb250YWluZXIpXG5cbiAgICAgICAgdXNlclNpZGUuYXBwZW5kQ2hpbGQodXNlckdhbWVib2FyZENvbnRhaW5lcilcbiAgICAgICAgY29tcHV0ZXJTaWRlLmFwcGVuZENoaWxkKGNvbXB1dGVyR2FtZWJvYXJkQ29udGFpbmVyKVxuXG4gICAgICAgIC8vIEZsZWV0IFN0YXR1cyBQYW5lbHNcblxuICAgICAgICBjb25zdCB1c2VyU3RhdHVzUGFuZWwgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJzdGF0dXNQYW5lbFwiLFwidXNlclN0YXR1c1BhbmVsXCIpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyU3RhdHVzUGFuZWwgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJzdGF0dXNQYW5lbFwiLFwiY29tcHV0ZXJTdGF0dXNQYW5lbFwiKVxuXG4gICAgICAgIHVzZXJHcmlkUGFuZWxDb250YWluZXIuYXBwZW5kQ2hpbGQodXNlclN0YXR1c1BhbmVsKVxuICAgICAgICBjb21wdXRlckdyaWRQYW5lbENvbnRhaW5lci5hcHBlbmRDaGlsZChjb21wdXRlclN0YXR1c1BhbmVsKVxuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgdXNlciBzaGlweWFyZFxuICAgICAgICBjb25zdCB1c2VyQ2FycmllciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImNhcnJpZXJcIixcInVzZXJDYXJyaWVyXCIpXG4gICAgICAgIHVzZXJDYXJyaWVyLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpXG4gICAgICAgIHVzZXJDYXJyaWVyLmNsYXNzTGlzdC5hZGQoXCJ1c2VyU2hpcFwiKVxuICAgICAgICB1c2VyQ2Fycmllci5jbGFzc0xpc3QuYWRkKFwibm8taG92ZXJcIilcbiAgICAgICAgdXNlckNhcnJpZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAxODggMzZcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCIgeG1sbnM6c2VyaWY9XCJodHRwOi8vd3d3LnNlcmlmLmNvbS9cIiBzdHlsZT1cImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyO1wiPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLjEzNzI4LDAsMCwwLjc1MTE2NywtMTQuMjQ1NSwtMC43NTkzNzYpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTc1LjE3NywxNS4wMTdDMTc1LjE3Nyw5LjUwMyAxNzAuNyw1LjAyNiAxNjUuMTg2LDUuMDI2TDI1LjE0LDUuMDI2QzE5LjYyNiw1LjAyNiAxNS4xNDksOS41MDMgMTUuMTQ5LDE1LjAxN0wxNS4xNDksMzQuOTk4QzE1LjE0OSw0MC41MTIgMTkuNjI2LDQ0Ljk4OSAyNS4xNCw0NC45ODlMMTY1LjE4Niw0NC45ODlDMTcwLjcsNDQuOTg5IDE3NS4xNzcsNDAuNTEyIDE3NS4xNzcsMzQuOTk4TDE3NS4xNzcsMTUuMDE3WlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTExLjE5MjcsMi45ODMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtNDkuMTcyNiwyLjk4MylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC04Ny4xNDk4LDIuOTgzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsMjYuODE0NSwyLjk4MylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLDY0Ljc5NDksMi45ODMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvc3ZnPmBcbiAgICAgICAgY29uc3QgdXNlckJhdHRsZXNoaXAgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJiYXR0bGVzaGlwXCIsXCJ1c2VyQmF0dGxlc2hpcFwiKVxuICAgICAgICB1c2VyQmF0dGxlc2hpcC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKVxuICAgICAgICB1c2VyQmF0dGxlc2hpcC5jbGFzc0xpc3QuYWRkKFwidXNlclNoaXBcIilcbiAgICAgICAgdXNlckJhdHRsZXNoaXAuY2xhc3NMaXN0LmFkZChcIm5vLWhvdmVyXCIpXG4gICAgICAgIHVzZXJCYXR0bGVzaGlwLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMTUwIDM2XCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiIHhtbG5zOnNlcmlmPVwiaHR0cDovL3d3dy5zZXJpZi5jb20vXCIgc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjtcIj5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtMjAuMTYyOCwtNy4wMDc0MSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEuMjg4NjMsMCwwLDAuNzUwMyw5LjMzNTUsMi40ODM5MylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNOTYuOTUsNDMuMDQyQzkxLjc0Myw0NS42MzUgODUuMjU3LDQ3Ljk2OCA3OC4wNjYsNDkuOTgyTDIyLjY3MSw0OS45ODJDMTUuODg4LDQ0LjkxMSAxMC43NDQsMzcuNzM5IDEwLjczLDMwLjAyNkMxMC43MTcsMjIuMzA4IDE1Ljg0MSwxNS4xMTUgMjIuNjEyLDEwLjAxOUw3OC4wMzQsMTAuMDE5Qzg0Ljg0MywxMS45NDYgOTEuMDIxLDE0LjE1OSA5Ni4wODUsMTYuNTc3TDk1LjkzNiwxNi41NTZDOTAuNzYzLDE2LjU1NiA4Ni41NjMsMjIuNTIyIDg2LjU2MywyOS44NzJDODYuNTYzLDM3LjIyMSA5MC43NjMsNDMuMTg4IDk1LjkzNiw0My4xODhMOTYuOTUsNDMuMDQyWlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoNy4zMzUwMiwwLDAsMS40NjEyMSwtNjM5LjI0NCwtMTkuMjU5OClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTA0LjE4OCwyMy42MTFDMTAzLjY3NiwyMi4yMzYgMTAyLjk5OCwyMS4wMzIgMTAyLjE5MywyMC4wMjVDMTA0LjI2MiwyMS4zMzggMTA1Ljk2OSwyMi43MDggMTA3LjI0OCwyNC4xNUMxMDYuODAzLDI1LjI1NCAxMDYuNDk5LDI3LjU2IDEwNi40OTksMzAuMjE5QzEwNi40OTksMzIuNzA1IDEwNi43NjUsMzQuODgzIDEwNy4xNjQsMzYuMDU4QzEwNS43NDksMzcuNjI5IDEwMy44MjgsMzkuMTE5IDEwMS40ODgsNDAuNTQ1QzEwMi41MDEsMzkuNTAzIDEwMy4zNTYsMzguMTc2IDEwMy45OTYsMzYuNjEyQzEwNC4xNTEsMzYuOTA3IDEwNC4zMjEsMzcuMDU3IDEwNC40OTgsMzcuMDU3QzEwNS4yOTgsMzcuMDU3IDEwNS45NDgsMzQuMDA4IDEwNS45NDgsMzAuMjUyQzEwNS45NDgsMjYuNDk3IDEwNS4yOTgsMjMuNDQ4IDEwNC40OTgsMjMuNDQ4QzEwNC4zOTIsMjMuNDQ4IDEwNC4yODgsMjMuNTAxIDEwNC4xODgsMjMuNjExWlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoNy4zMzUwMiwwLDAsMS40NjEyMSwtNjM5LjI0NCwtMTkuMjU5OClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTA5LjAxLDI2LjU3OUMxMDkuNjI0LDI3LjcxOCAxMDkuOTQ2LDI4Ljg4OSAxMDkuOTQ0LDMwLjA3MkMxMDkuOTQyLDMxLjIxMiAxMDkuNjM5LDMyLjM0MSAxMDkuMDY0LDMzLjQ0OEMxMDkuMTcsMzIuNDkzIDEwOS4yMjksMzEuMzkgMTA5LjIyOSwzMC4yMTlDMTA5LjIyOSwyOC44NzIgMTA5LjE1MSwyNy42MTUgMTA5LjAxLDI2LjU3OVpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTYwLjE3MzYsMi45ODMyKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwxMS4xMDk4LC0wLjExMDkyMilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLDYwLjE3MzYsLTIuOTgzMilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTA0LjgxOCw4LjIzNEMxMTAuMDgxLDEwLjkyMyAxMTMuMDM2LDE0LjA1NiAxMTMuMDM2LDE3LjM4MkMxMTMuMDM2LDIxIDEwOS41NCwyNC4zODggMTAzLjQwMywyNy4yM0M5OS4zNCwyNS44NTggOTYuNDUsMjIuMjExIDk2LjQ1LDE3LjkzN0M5Ni40NSwxMy4xNzkgMTAwLjAzNSw5LjE5NiAxMDQuODE4LDguMjM0WlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSw2MC4xNzM2LC0yLjk4MzIpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEwNC44MTgsOC4yMzRDMTA1LjU0OCw4LjA3MyAxMDYuMzA4LDcuOTk1IDEwNy4wODgsNy45OTVDMTEyLjk2LDcuOTk1IDExNy43MjcsMTIuNDUgMTE3LjcyNywxNy45MzdDMTE3LjcyNywyMy40MjUgMTEyLjk2LDI3Ljg4IDEwNy4wODgsMjcuODhDMTA1Ljc4OSwyNy44OCAxMDQuNTQzLDI3LjY2MiAxMDMuNDAzLDI3LjIzQzEwOS41NCwyNC4zODggMTEzLjAzNiwyMSAxMTMuMDM2LDE3LjM4MkMxMTMuMDM2LDE0LjA1NiAxMTAuMDgxLDEwLjkyMyAxMDQuODE4LDguMjM0WlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSw4Ni43Nzg4LC0wLjExMDkyMilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTAwLjY1Nyw2LjE0OUMxMDYuMDExLDcuMzA0IDExMC4zNDksOC40ODcgMTEzLjU4LDkuNjk4QzExNC42MTMsMTEuMjEyIDExNS4xODUsMTMuMDQ4IDExNS4xODUsMTUuMDE3QzExNS4xODUsMTYuNzI4IDExNC43NTMsMTguMzQgMTEzLjk3MiwxOS43MzVDMTEwLjU4MSwyMS4wNDIgMTA1LjkwMSwyMi4zMzEgMTAwLjAzNywyMy41NDlDOTcuMTEsMjEuODMyIDk1LjE2MywxOC42NSA5NS4xNjMsMTUuMDE3Qzk1LjE2MywxMS4xMzIgOTcuMzg5LDcuNzYyIDEwMC42NTcsNi4xNDlaXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLDQ4Ljc5ODcsLTAuMDAwMilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC04Ny4xMTgyLDIuODcyMjgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvc3ZnPmBcbiAgICAgICAgY29uc3QgdXNlckRlc3Ryb3llciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImRlc3Ryb3llclwiLFwidXNlckRlc3Ryb3llclwiKVxuICAgICAgICB1c2VyRGVzdHJveWVyLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpXG4gICAgICAgIHVzZXJEZXN0cm95ZXIuY2xhc3NMaXN0LmFkZChcInVzZXJTaGlwXCIpXG4gICAgICAgIHVzZXJEZXN0cm95ZXIuY2xhc3NMaXN0LmFkZChcIm5vLWhvdmVyXCIpXG4gICAgICAgIHVzZXJEZXN0cm95ZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAxMTIgMzZcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCIgeG1sbnM6c2VyaWY9XCJodHRwOi8vd3d3LnNlcmlmLmNvbS9cIiBzdHlsZT1cImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyO1wiPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC0zOS4xNjI4LC03LjAwNzQxKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMS4wNjgwNiwwLDAsMC43NTAzLDMwLjcxOTUsMi40ODM5MylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNOTYuOTUsNDMuMDQyQzkxLjc0Myw0NS42MzUgODUuMjU3LDQ3Ljk2OCA3OC4wNjYsNDkuOTgyTDIyLjY3MSw0OS45ODJDMTUuODg4LDQ0LjkxMSAxMC43NDQsMzcuNzM5IDEwLjczLDMwLjAyNkMxMC43MTcsMjIuMzA4IDE1Ljg0MSwxNS4xMTUgMjIuNjEyLDEwLjAxOUw3OC4wMzQsMTAuMDE5Qzg0Ljg0MywxMS45NDYgOTEuMDIxLDE0LjE1OSA5Ni4wODUsMTYuNTc3TDk1LjkzNiwxNi41NTZDOTAuNzYzLDE2LjU1NiA4Ni41NjMsMjIuNTIyIDg2LjU2MywyOS44NzJDODYuNTYzLDM3LjIyMSA5MC43NjMsNDMuMTg4IDk1LjkzNiw0My4xODhMOTYuOTUsNDMuMDQyWlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMS4wNjgwNiwwLDAsMC43NTAzLDMwLjcxOTUsMi40ODM5MylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTAyLjE5MywyMC4wMjVDMTA3LjA3OSwyMy4xMjYgMTA5Ljk1LDI2LjU0NiAxMDkuOTQ0LDMwLjA3MkMxMDkuOTM3LDMzLjc1OCAxMDYuNzg1LDM3LjMxOCAxMDEuNDg4LDQwLjU0NUMxMDMuODEyLDM4LjE1MyAxMDUuMzA5LDM0LjI1OSAxMDUuMzA5LDI5Ljg3MkMxMDUuMzA5LDI1Ljk1MyAxMDQuMTE1LDIyLjQyOCAxMDIuMTkzLDIwLjAyNVpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTExLjE1MTcsMi44NzIyOClcIj5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMDUuMzM0LDUuMDQyQzEwNy43NzMsNS44NTkgMTA5Ljk3LDYuNzA3IDExMS44NTcsNy42MjlDMTEzLjkxLDkuNDMyIDExNS4xODUsMTIuMDc3IDExNS4xODUsMTUuMDE3QzExNS4xODUsMTguMzA4IDExMy41ODcsMjEuMjMgMTExLjEwNCwyMy4wMjVMMTEwLjM5MSwyMy4zNjVMMTA2LjI1NywyNC44OTlMMTA1LjE3NCwyNS4wMDhDOTkuNjQ5LDI1LjAwOCA5NS4xNjMsMjAuNTMxIDk1LjE2MywxNS4wMTdDOTUuMTYzLDkuNTAzIDk5LjY0OSw1LjAyNiAxMDUuMTc0LDUuMDI2TDEwNS4zMzQsNS4wNDJaXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtNDkuMTc0LDIuODcyMjgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtODcuMTg4MSwyLjg3MjI4KVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L3N2Zz5gXG4gICAgICAgIGNvbnN0IHVzZXJTdWJtYXJpbmUgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJzdWJtYXJpbmVcIixcInVzZXJTdWJtYXJpbmVcIilcbiAgICAgICAgdXNlclN1Ym1hcmluZS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKVxuICAgICAgICB1c2VyU3VibWFyaW5lLmNsYXNzTGlzdC5hZGQoXCJ1c2VyU2hpcFwiKVxuICAgICAgICB1c2VyU3VibWFyaW5lLmNsYXNzTGlzdC5hZGQoXCJuby1ob3ZlclwiKVxuICAgICAgICB1c2VyU3VibWFyaW5lLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMTEyIDM2XCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiIHhtbG5zOnNlcmlmPVwiaHR0cDovL3d3dy5zZXJpZi5jb20vXCIgc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjtcIj5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMS4wNjgzNiwwLDAsMC43NTIwMDEsLTQwLjQxMDMsLTQuNTQxNTMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTI4LjExNiwxMC4wMTlDMTM0LjgxNCwxNS4xMDggMTM5Ljg2NSwyMi4yNTMgMTM5Ljg1MSwyOS45MTVDMTM5LjgzNywzNy42ODUgMTM0LjYxOSw0NC45MDQgMTI3Ljc2Miw0OS45ODJMNTIuNjkxLDQ5Ljk4MkM0NS44MzQsNDQuOTA0IDQwLjYxNiwzNy42ODUgNDAuNjAyLDI5LjkxNUM0MC41ODgsMjIuMjUzIDQ1LjYzOSwxNS4xMDggNTIuMzM3LDEwLjAxOUwxMjguMTE2LDEwLjAxOVpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC0xMS4xOSwzLjAwMTU3KVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTQ5LjE4OTYsMy4wMDE1NylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC04Ny4xNjcyLDMuMDAxNTcpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvc3ZnPmBcbiAgICAgICAgY29uc3QgdXNlckJvYXQgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJib2F0XCIsXCJ1c2VyQm9hdFwiKVxuICAgICAgICB1c2VyQm9hdC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKVxuICAgICAgICB1c2VyQm9hdC5jbGFzc0xpc3QuYWRkKFwidXNlclNoaXBcIilcbiAgICAgICAgdXNlckJvYXQuY2xhc3NMaXN0LmFkZChcIm5vLWhvdmVyXCIpXG4gICAgICAgIHVzZXJCb2F0LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgNzQgMzZcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCIgeG1sbnM6c2VyaWY9XCJodHRwOi8vd3d3LnNlcmlmLmNvbS9cIiBzdHlsZT1cImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyO1wiPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgwLjk3Njk3MywwLDAsMC43NTIwNDgsLTcuMDY2NDEsLTQuNTY3NTMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNNDguMDM0LDEwLjAxOUM2Ni4yNTMsMTUuMTc4IDc5Ljk1NywyMi4zNzQgNzkuOTQ0LDMwLjA3MkM3OS45MywzNy43NTQgNjYuMjUzLDQ0Ljg4OSA0OC4wNjYsNDkuOTgyTDIzLjkwOCw0OS45ODJDMTYuMjAxLDQ0LjkxMSAxMC4zNTYsMzcuNzM2IDEwLjM0MiwzMC4wMThDMTAuMzI4LDIyLjMwNSAxNi4xMzksMTUuMTE1IDIzLjgxNywxMC4wMTlMNDguMDM0LDEwLjAxOVpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC00OS4xNzUyLDIuOTgzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTg3LjE2NjEsMi45ODMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvc3ZnPmBcbiAgICAgICAgdXNlclN0YXR1c1BhbmVsLmFwcGVuZENoaWxkKHVzZXJDYXJyaWVyKVxuICAgICAgICB1c2VyU3RhdHVzUGFuZWwuYXBwZW5kQ2hpbGQodXNlckJhdHRsZXNoaXApXG4gICAgICAgIHVzZXJTdGF0dXNQYW5lbC5hcHBlbmRDaGlsZCh1c2VyRGVzdHJveWVyKVxuICAgICAgICB1c2VyU3RhdHVzUGFuZWwuYXBwZW5kQ2hpbGQodXNlclN1Ym1hcmluZSlcbiAgICAgICAgdXNlclN0YXR1c1BhbmVsLmFwcGVuZENoaWxkKHVzZXJCb2F0KVxuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgZW5lbXkgc2hpcHlhcmRcbiAgICAgICAgY29uc3QgY29tcHV0ZXJDYXJyaWVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiY2FycmllclwiLFwiY29tcHV0ZXJDYXJyaWVyXCIpXG4gICAgICAgIGNvbXB1dGVyQ2Fycmllci5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKVxuICAgICAgICBjb21wdXRlckNhcnJpZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAxODggMzZcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCIgeG1sbnM6c2VyaWY9XCJodHRwOi8vd3d3LnNlcmlmLmNvbS9cIiBzdHlsZT1cImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyO1wiPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLjEzNzI4LDAsMCwwLjc1MTE2NywtMTQuMjQ1NSwtMC43NTkzNzYpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTc1LjE3NywxNS4wMTdDMTc1LjE3Nyw5LjUwMyAxNzAuNyw1LjAyNiAxNjUuMTg2LDUuMDI2TDI1LjE0LDUuMDI2QzE5LjYyNiw1LjAyNiAxNS4xNDksOS41MDMgMTUuMTQ5LDE1LjAxN0wxNS4xNDksMzQuOTk4QzE1LjE0OSw0MC41MTIgMTkuNjI2LDQ0Ljk4OSAyNS4xNCw0NC45ODlMMTY1LjE4Niw0NC45ODlDMTcwLjcsNDQuOTg5IDE3NS4xNzcsNDAuNTEyIDE3NS4xNzcsMzQuOTk4TDE3NS4xNzcsMTUuMDE3WlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTExLjE5MjcsMi45ODMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtNDkuMTcyNiwyLjk4MylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC04Ny4xNDk4LDIuOTgzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsMjYuODE0NSwyLjk4MylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLDY0Ljc5NDksMi45ODMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvc3ZnPmBcbiAgICAgICAgY29uc3QgY29tcHV0ZXJCYXR0bGVzaGlwID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiYmF0dGxlc2hpcFwiLFwiY29tcHV0ZXJCYXR0bGVzaGlwXCIpXG4gICAgICAgIGNvbXB1dGVyQmF0dGxlc2hpcC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKVxuICAgICAgICBjb21wdXRlckJhdHRsZXNoaXAuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAxNTAgMzZcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCIgeG1sbnM6c2VyaWY9XCJodHRwOi8vd3d3LnNlcmlmLmNvbS9cIiBzdHlsZT1cImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyO1wiPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC0yMC4xNjI4LC03LjAwNzQxKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMS4yODg2MywwLDAsMC43NTAzLDkuMzM1NSwyLjQ4MzkzKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk05Ni45NSw0My4wNDJDOTEuNzQzLDQ1LjYzNSA4NS4yNTcsNDcuOTY4IDc4LjA2Niw0OS45ODJMMjIuNjcxLDQ5Ljk4MkMxNS44ODgsNDQuOTExIDEwLjc0NCwzNy43MzkgMTAuNzMsMzAuMDI2QzEwLjcxNywyMi4zMDggMTUuODQxLDE1LjExNSAyMi42MTIsMTAuMDE5TDc4LjAzNCwxMC4wMTlDODQuODQzLDExLjk0NiA5MS4wMjEsMTQuMTU5IDk2LjA4NSwxNi41NzdMOTUuOTM2LDE2LjU1NkM5MC43NjMsMTYuNTU2IDg2LjU2MywyMi41MjIgODYuNTYzLDI5Ljg3MkM4Ni41NjMsMzcuMjIxIDkwLjc2Myw0My4xODggOTUuOTM2LDQzLjE4OEw5Ni45NSw0My4wNDJaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCg3LjMzNTAyLDAsMCwxLjQ2MTIxLC02MzkuMjQ0LC0xOS4yNTk4KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMDQuMTg4LDIzLjYxMUMxMDMuNjc2LDIyLjIzNiAxMDIuOTk4LDIxLjAzMiAxMDIuMTkzLDIwLjAyNUMxMDQuMjYyLDIxLjMzOCAxMDUuOTY5LDIyLjcwOCAxMDcuMjQ4LDI0LjE1QzEwNi44MDMsMjUuMjU0IDEwNi40OTksMjcuNTYgMTA2LjQ5OSwzMC4yMTlDMTA2LjQ5OSwzMi43MDUgMTA2Ljc2NSwzNC44ODMgMTA3LjE2NCwzNi4wNThDMTA1Ljc0OSwzNy42MjkgMTAzLjgyOCwzOS4xMTkgMTAxLjQ4OCw0MC41NDVDMTAyLjUwMSwzOS41MDMgMTAzLjM1NiwzOC4xNzYgMTAzLjk5NiwzNi42MTJDMTA0LjE1MSwzNi45MDcgMTA0LjMyMSwzNy4wNTcgMTA0LjQ5OCwzNy4wNTdDMTA1LjI5OCwzNy4wNTcgMTA1Ljk0OCwzNC4wMDggMTA1Ljk0OCwzMC4yNTJDMTA1Ljk0OCwyNi40OTcgMTA1LjI5OCwyMy40NDggMTA0LjQ5OCwyMy40NDhDMTA0LjM5MiwyMy40NDggMTA0LjI4OCwyMy41MDEgMTA0LjE4OCwyMy42MTFaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCg3LjMzNTAyLDAsMCwxLjQ2MTIxLC02MzkuMjQ0LC0xOS4yNTk4KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMDkuMDEsMjYuNTc5QzEwOS42MjQsMjcuNzE4IDEwOS45NDYsMjguODg5IDEwOS45NDQsMzAuMDcyQzEwOS45NDIsMzEuMjEyIDEwOS42MzksMzIuMzQxIDEwOS4wNjQsMzMuNDQ4QzEwOS4xNywzMi40OTMgMTA5LjIyOSwzMS4zOSAxMDkuMjI5LDMwLjIxOUMxMDkuMjI5LDI4Ljg3MiAxMDkuMTUxLDI3LjYxNSAxMDkuMDEsMjYuNTc5WlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtNjAuMTczNiwyLjk4MzIpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLDExLjEwOTgsLTAuMTEwOTIyKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsNjAuMTczNiwtMi45ODMyKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMDQuODE4LDguMjM0QzExMC4wODEsMTAuOTIzIDExMy4wMzYsMTQuMDU2IDExMy4wMzYsMTcuMzgyQzExMy4wMzYsMjEgMTA5LjU0LDI0LjM4OCAxMDMuNDAzLDI3LjIzQzk5LjM0LDI1Ljg1OCA5Ni40NSwyMi4yMTEgOTYuNDUsMTcuOTM3Qzk2LjQ1LDEzLjE3OSAxMDAuMDM1LDkuMTk2IDEwNC44MTgsOC4yMzRaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLDYwLjE3MzYsLTIuOTgzMilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTA0LjgxOCw4LjIzNEMxMDUuNTQ4LDguMDczIDEwNi4zMDgsNy45OTUgMTA3LjA4OCw3Ljk5NUMxMTIuOTYsNy45OTUgMTE3LjcyNywxMi40NSAxMTcuNzI3LDE3LjkzN0MxMTcuNzI3LDIzLjQyNSAxMTIuOTYsMjcuODggMTA3LjA4OCwyNy44OEMxMDUuNzg5LDI3Ljg4IDEwNC41NDMsMjcuNjYyIDEwMy40MDMsMjcuMjNDMTA5LjU0LDI0LjM4OCAxMTMuMDM2LDIxIDExMy4wMzYsMTcuMzgyQzExMy4wMzYsMTQuMDU2IDExMC4wODEsMTAuOTIzIDEwNC44MTgsOC4yMzRaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLDg2Ljc3ODgsLTAuMTEwOTIyKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMDAuNjU3LDYuMTQ5QzEwNi4wMTEsNy4zMDQgMTEwLjM0OSw4LjQ4NyAxMTMuNTgsOS42OThDMTE0LjYxMywxMS4yMTIgMTE1LjE4NSwxMy4wNDggMTE1LjE4NSwxNS4wMTdDMTE1LjE4NSwxNi43MjggMTE0Ljc1MywxOC4zNCAxMTMuOTcyLDE5LjczNUMxMTAuNTgxLDIxLjA0MiAxMDUuOTAxLDIyLjMzMSAxMDAuMDM3LDIzLjU0OUM5Ny4xMSwyMS44MzIgOTUuMTYzLDE4LjY1IDk1LjE2MywxNS4wMTdDOTUuMTYzLDExLjEzMiA5Ny4zODksNy43NjIgMTAwLjY1Nyw2LjE0OVpcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsNDguNzk4NywtMC4wMDAyKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTg3LjExODIsMi44NzIyOClcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPC9zdmc+YFxuICAgICAgICBjb25zdCBjb21wdXRlckRlc3Ryb3llciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImRlc3Ryb3llclwiLFwiY29tcHV0ZXJEZXN0cm95ZXJcIilcbiAgICAgICAgY29tcHV0ZXJEZXN0cm95ZXIuY2xhc3NMaXN0LmFkZChcInNoaXBcIilcbiAgICAgICAgY29tcHV0ZXJEZXN0cm95ZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAxMTIgMzZcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCIgeG1sbnM6c2VyaWY9XCJodHRwOi8vd3d3LnNlcmlmLmNvbS9cIiBzdHlsZT1cImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyO1wiPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC0zOS4xNjI4LC03LjAwNzQxKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMS4wNjgwNiwwLDAsMC43NTAzLDMwLjcxOTUsMi40ODM5MylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNOTYuOTUsNDMuMDQyQzkxLjc0Myw0NS42MzUgODUuMjU3LDQ3Ljk2OCA3OC4wNjYsNDkuOTgyTDIyLjY3MSw0OS45ODJDMTUuODg4LDQ0LjkxMSAxMC43NDQsMzcuNzM5IDEwLjczLDMwLjAyNkMxMC43MTcsMjIuMzA4IDE1Ljg0MSwxNS4xMTUgMjIuNjEyLDEwLjAxOUw3OC4wMzQsMTAuMDE5Qzg0Ljg0MywxMS45NDYgOTEuMDIxLDE0LjE1OSA5Ni4wODUsMTYuNTc3TDk1LjkzNiwxNi41NTZDOTAuNzYzLDE2LjU1NiA4Ni41NjMsMjIuNTIyIDg2LjU2MywyOS44NzJDODYuNTYzLDM3LjIyMSA5MC43NjMsNDMuMTg4IDk1LjkzNiw0My4xODhMOTYuOTUsNDMuMDQyWlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMS4wNjgwNiwwLDAsMC43NTAzLDMwLjcxOTUsMi40ODM5MylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTAyLjE5MywyMC4wMjVDMTA3LjA3OSwyMy4xMjYgMTA5Ljk1LDI2LjU0NiAxMDkuOTQ0LDMwLjA3MkMxMDkuOTM3LDMzLjc1OCAxMDYuNzg1LDM3LjMxOCAxMDEuNDg4LDQwLjU0NUMxMDMuODEyLDM4LjE1MyAxMDUuMzA5LDM0LjI1OSAxMDUuMzA5LDI5Ljg3MkMxMDUuMzA5LDI1Ljk1MyAxMDQuMTE1LDIyLjQyOCAxMDIuMTkzLDIwLjAyNVpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTExLjE1MTcsMi44NzIyOClcIj5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMDUuMzM0LDUuMDQyQzEwNy43NzMsNS44NTkgMTA5Ljk3LDYuNzA3IDExMS44NTcsNy42MjlDMTEzLjkxLDkuNDMyIDExNS4xODUsMTIuMDc3IDExNS4xODUsMTUuMDE3QzExNS4xODUsMTguMzA4IDExMy41ODcsMjEuMjMgMTExLjEwNCwyMy4wMjVMMTEwLjM5MSwyMy4zNjVMMTA2LjI1NywyNC44OTlMMTA1LjE3NCwyNS4wMDhDOTkuNjQ5LDI1LjAwOCA5NS4xNjMsMjAuNTMxIDk1LjE2MywxNS4wMTdDOTUuMTYzLDkuNTAzIDk5LjY0OSw1LjAyNiAxMDUuMTc0LDUuMDI2TDEwNS4zMzQsNS4wNDJaXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtNDkuMTc0LDIuODcyMjgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtODcuMTg4MSwyLjg3MjI4KVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L3N2Zz5gXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyU3VibWFyaW5lID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwic3VibWFyaW5lXCIsXCJjb21wdXRlclN1Ym1hcmluZVwiKVxuICAgICAgICBjb21wdXRlclN1Ym1hcmluZS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKVxuICAgICAgICBjb21wdXRlclN1Ym1hcmluZS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDExMiAzNlwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIiB4bWxuczpzZXJpZj1cImh0dHA6Ly93d3cuc2VyaWYuY29tL1wiIHN0eWxlPVwiZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjI7XCI+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEuMDY4MzYsMCwwLDAuNzUyMDAxLC00MC40MTAzLC00LjU0MTUzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEyOC4xMTYsMTAuMDE5QzEzNC44MTQsMTUuMTA4IDEzOS44NjUsMjIuMjUzIDEzOS44NTEsMjkuOTE1QzEzOS44MzcsMzcuNjg1IDEzNC42MTksNDQuOTA0IDEyNy43NjIsNDkuOTgyTDUyLjY5MSw0OS45ODJDNDUuODM0LDQ0LjkwNCA0MC42MTYsMzcuNjg1IDQwLjYwMiwyOS45MTVDNDAuNTg4LDIyLjI1MyA0NS42MzksMTUuMTA4IDUyLjMzNywxMC4wMTlMMTI4LjExNiwxMC4wMTlaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtMTEuMTksMy4wMDE1NylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC00OS4xODk2LDMuMDAxNTcpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtODcuMTY3MiwzLjAwMTU3KVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L3N2Zz5gXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQm9hdCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImJvYXRcIixcImNvbXB1dGVyQm9hdFwiKVxuICAgICAgICBjb21wdXRlckJvYXQuY2xhc3NMaXN0LmFkZChcInNoaXBcIilcbiAgICAgICAgY29tcHV0ZXJCb2F0LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgNzQgMzZcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCIgeG1sbnM6c2VyaWY9XCJodHRwOi8vd3d3LnNlcmlmLmNvbS9cIiBzdHlsZT1cImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyO1wiPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgwLjk3Njk3MywwLDAsMC43NTIwNDgsLTcuMDY2NDEsLTQuNTY3NTMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNNDguMDM0LDEwLjAxOUM2Ni4yNTMsMTUuMTc4IDc5Ljk1NywyMi4zNzQgNzkuOTQ0LDMwLjA3MkM3OS45MywzNy43NTQgNjYuMjUzLDQ0Ljg4OSA0OC4wNjYsNDkuOTgyTDIzLjkwOCw0OS45ODJDMTYuMjAxLDQ0LjkxMSAxMC4zNTYsMzcuNzM2IDEwLjM0MiwzMC4wMThDMTAuMzI4LDIyLjMwNSAxNi4xMzksMTUuMTE1IDIzLjgxNywxMC4wMTlMNDguMDM0LDEwLjAxOVpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC00OS4xNzUyLDIuOTgzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTg3LjE2NjEsMi45ODMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvc3ZnPmBcblxuICAgICAgICBjb21wdXRlclN0YXR1c1BhbmVsLmFwcGVuZENoaWxkKGNvbXB1dGVyQ2FycmllcilcbiAgICAgICAgY29tcHV0ZXJTdGF0dXNQYW5lbC5hcHBlbmRDaGlsZChjb21wdXRlckJhdHRsZXNoaXApXG4gICAgICAgIGNvbXB1dGVyU3RhdHVzUGFuZWwuYXBwZW5kQ2hpbGQoY29tcHV0ZXJEZXN0cm95ZXIpXG4gICAgICAgIGNvbXB1dGVyU3RhdHVzUGFuZWwuYXBwZW5kQ2hpbGQoY29tcHV0ZXJTdWJtYXJpbmUpXG4gICAgICAgIGNvbXB1dGVyU3RhdHVzUGFuZWwuYXBwZW5kQ2hpbGQoY29tcHV0ZXJCb2F0KVxuXG4gICAgICAgIC8vIENyZWF0ZSBhIGRpdiB0byBzaG93IGluc3RydWN0aW9ucyB0byB0aGUgdXNlclxuICAgICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJpbnN0cnVjdGlvbnNcIixudWxsKVxuICAgICAgICBpbnN0cnVjdGlvbnMudGV4dENvbnRlbnQgPSBcIlNlbGVjdCBhIHBsYWNlbWVudCBvcHRpb24gZm9yIHlvdXIgc2hpcHNcIlxuICAgICAgICB1c2VyU2lkZS5hcHBlbmRDaGlsZChpbnN0cnVjdGlvbnMpXG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgZGl2IHRvIHNob3cgaW5mbyBmcm9tIHRoZSBJQSBwbGF5ZXJcbiAgICAgICAgY29uc3QgY29tcHV0ZXJJbmZvID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiY29tcHV0ZXJJbmZvXCIsbnVsbClcbiAgICAgICAgY29tcHV0ZXJJbmZvLnRleHRDb250ZW50ID0gXCJNeSBzaGlwcyBoYXMgYmVlbiBwbGFjZWQuIEknbSB3YWl0aW5nIGZvciB5b3UgdG8gc3RhcnQuLi5cIlxuICAgICAgICBjb21wdXRlclNpZGUuYXBwZW5kQ2hpbGQoY29tcHV0ZXJJbmZvKVxuXG4gICAgICAgIC8vIENyZWF0ZSBhIGRpdiB0byBzaG93IGJ1dHRvbnMgdG8gdGhlIHVzZXJcbiAgICAgICAgY29uc3QgYnV0dG9uc0NvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImJ1dHRvbnNDb250YWluZXJcIixudWxsKVxuICAgICAgICB1c2VyU2lkZS5hcHBlbmRDaGlsZChidXR0b25zQ29udGFpbmVyKVxuICAgICAgICBjb25zdCBtYW51YWxCdXR0b24gPSBjcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsXCJwbGFjZW1lbnRCdXR0b25cIixcIm1hbnVhbEJ1dHRvblwiKVxuICAgICAgICBtYW51YWxCdXR0b24udGV4dENvbnRlbnQgPSBcIk1hbnVhbCBQbGFjZW1lbnRcIlxuICAgICAgICBjb25zdCByYW5kb21CdXR0b24gPSBjcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsXCJwbGFjZW1lbnRCdXR0b25cIixcInJhbmRvbUJ1dHRvblwiKVxuICAgICAgICByYW5kb21CdXR0b24udGV4dENvbnRlbnQgPSBcIlJhbmRvbSBQbGFjZW1lbnRcIlxuICAgICAgICBidXR0b25zQ29udGFpbmVyLmFwcGVuZENoaWxkKG1hbnVhbEJ1dHRvbilcbiAgICAgICAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChyYW5kb21CdXR0b24pXG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgZGl2IHRvIHNob3cgYSBtb2RhbCB3aW5kb3cgYW5ub3VuY2luZyB0aGUgZW5kIG9mIHRoZSBnYW1lXG4gICAgICAgIGNvbnN0IG1vZGFsID0gY3JlYXRlRWxlbWVudChcImRpdlwiLG51bGwsXCJ2aWN0b3J5TW9kYWxcIilcbiAgICAgICAgY29uc3QgbW9kYWxDb250ZW50ID0gY3JlYXRlRWxlbWVudChcImRpdlwiLG51bGwsbnVsbClcbiAgICAgICAgY29uc3QgbW9kYWxUZXh0ID0gY3JlYXRlRWxlbWVudChcInBcIiwgbnVsbCwgXCJtb2RhbC10ZXh0XCIpXG4gICAgICAgIGNvbnN0IHJlc3RhcnRCdXR0b24gPSBjcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsbnVsbCxcIm1vZGFsLWJ1dHRvblwiKVxuICAgICAgICByZXN0YXJ0QnV0dG9uLnRleHRDb250ZW50ID0gXCJSZXN0YXJ0XCJcbiAgICAgICAgcmVzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24ucmVsb2FkKClcbiAgICAgICAgfSlcbiAgICAgICAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKG1vZGFsVGV4dClcbiAgICAgICAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKHJlc3RhcnRCdXR0b24pXG4gICAgICAgIG1vZGFsLmFwcGVuZENoaWxkKG1vZGFsQ29udGVudClcbiAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChtb2RhbClcblxuICAgIH1cblxuICAgIC8vIEFzc29jaWF0ZXMgYW4gZXZlbnQgbGlzdGVuZXIgdG8gZXZlcnkgY2VsbCBvZiB0aGUgdXNlciBib2FyZFxuICAgIGZ1bmN0aW9uIG9uVXNlckJvYXJkQ2xpY2soY2FsbGJhY2spIHtcblxuICAgICAgICBjb25zdCB1c2VyR2FtZWJvYXJkR3JpZCA9IGdldEVsZW1lbnQoXCJ1c2VyR2FtZWJvYXJkR3JpZFwiKVxuICAgICAgICBjb25zdCB1c2VyQm9hcmRTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiN1c2VyR2FtZWJvYXJkR3JpZCAuZ2FtZWJvYXJkU3F1YXJlXCIpXG4gICAgICAgIHVzZXJCb2FyZFNxdWFyZXMuZm9yRWFjaChzcXVhcmUgPT4ge1xuICAgICAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF1c2VyR2FtZWJvYXJkR3JpZC5jbGFzc0xpc3QuY29udGFpbnMoXCJibG9ja2VkXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHBhcnNlSW50KHNxdWFyZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWluZGV4XCIpLDEwKSwgc2VsZWN0ZWRTaGlwTmFtZSwgb3JpZW50YXRpb24pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIC8vIEFzc29jaWF0ZXMgYW4gZXZlbnQgbGlzdGVuZXIgdG8gZXZlcnkgY2VsbCBvZiB0aGUgY29tcHV0ZXIgYm9hcmRcbiAgICBmdW5jdGlvbiBvbkNvbXB1dGVyQm9hcmRDbGljayhjYWxsYmFjaykge1xuXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyR2FtZWJvYXJkR3JpZCA9IGdldEVsZW1lbnQoXCJjb21wdXRlckdhbWVib2FyZEdyaWRcIilcbiAgICAgICAgY29uc3QgY29tcHV0ZXJCb2FyZFNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2NvbXB1dGVyR2FtZWJvYXJkR3JpZCAuZ2FtZWJvYXJkU3F1YXJlXCIpXG4gICAgICAgIGNvbXB1dGVyQm9hcmRTcXVhcmVzLmZvckVhY2goc3F1YXJlID0+IHtcbiAgICAgICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghY29tcHV0ZXJHYW1lYm9hcmRHcmlkLmNsYXNzTGlzdC5jb250YWlucyhcImJsb2NrZWRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2socGFyc2VJbnQoc3F1YXJlLmdldEF0dHJpYnV0ZShcImRhdGEtaW5kZXhcIiksMTApKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICAvLyBBc3NvY2lhdGVzIGFuIGV2ZW50IGxpc3RlbmVyIHRvIFwiTWFudWFsIFBsYWNlbWVudFwiIGJ1dHRvblxuICAgIGZ1bmN0aW9uIG9uTWFudWFsUGxhY2VtZW50Q2xpY2soKSB7XG5cbiAgICAgICAgY29uc3QgbWFudWFsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYW51YWxCdXR0b25cIilcbiAgICAgICAgbWFudWFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIERlbGV0ZSB0aGUgYnV0dG9ucyBmcm9tIHRoZSBpbnN0cnVjdGlvbnMgZGl2XG4gICAgICAgICAgICBtYW51YWxCdXR0b24ucmVtb3ZlKClcbiAgICAgICAgICAgIGNvbnN0IHJhbmRvbUJ1dHRvbiA9IGdldEVsZW1lbnQoXCJyYW5kb21CdXR0b25cIilcbiAgICAgICAgICAgIHJhbmRvbUJ1dHRvbi5yZW1vdmUoKVxuXG4gICAgICAgICAgICAvLyBDaGFuZ2UgZ2FtZWJvYXJkIHN0YXR1c1xuICAgICAgICAgICAgY29uc3QgdXNlckdhbWVib2FyZEdyaWQgPSBnZXRFbGVtZW50KFwidXNlckdhbWVib2FyZEdyaWRcIilcbiAgICAgICAgICAgIHVzZXJHYW1lYm9hcmRHcmlkLmNsYXNzTGlzdC5yZW1vdmUoXCJibG9ja2VkXCIpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIENoYW5nZSBpbnN0cnVjdGlvbnMgdGV4dFxuICAgICAgICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnN0cnVjdGlvbnNcIilcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy50ZXh0Q29udGVudCA9IFwiU2VsZWN0IGEgbm90IHlldCBwbGFjZWQgc2hpcFwiXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEFkZGluZyBldmVudCBsaXN0ZW5lcnMgdG8gdXNlciBzaGlwc1xuICAgICAgICAgICAgY29uc3QgdXNlclNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi51c2VyU2hpcFwiKVxuICAgICAgICAgICAgdXNlclNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICAgICAgc2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwibm8taG92ZXJcIilcbiAgICAgICAgICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IGhhbmRsZVNoaXBDbGljayhzaGlwLGV2ZW50KSlcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIC8vIEFkZGluZyBldmVudCBsaXN0ZW5lcnMgdG8gdXNlciBib2FyZCBjZWxsc1xuICAgICAgICAgICAgY29uc3QgdXNlckJvYXJkU3F1YXJlcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiN1c2VyR2FtZWJvYXJkR3JpZCAuZ2FtZWJvYXJkU3F1YXJlXCIpKVxuICAgICAgICAgICAgdXNlckJvYXJkU3F1YXJlcy5mb3JFYWNoKChzcXVhcmUsaW5kZXgpID0+IHtcblxuICAgICAgICAgICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsICgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgc2libGluZ3NUb0NvbG9yID0gW11cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBpbmRleFxuICAgICAgICAgICAgICAgICAgICBjb25zdCByb3dTdGFydCA9IHN0YXJ0IC0gKHN0YXJ0ICUgMTApXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvd0VuZCA9IHJvd1N0YXJ0ICsgMTBcblxuICAgICAgICAgICAgICAgICAgICBpZiAob3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4cGVjdGVkRW5kID0gc3RhcnQgKyBzZWxlY3RlZFNoaXBMZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleHBlY3RlZEVuZCA+IHJvd0VuZCkgeyAvLyBpZiBzaGlwIGlzIHRvbyBsb25nIHRvIGZpdCBpbiB0aGUgcm93XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWJsaW5nc1RvQ29sb3IgPSB1c2VyQm9hcmRTcXVhcmVzLnNsaWNlKHN0YXJ0LCByb3dFbmQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2libGluZ3NUb0NvbG9yLmZvckVhY2goc2libGluZyA9PiBzaWJsaW5nLmNsYXNzTGlzdC5hZGQoXCJob3ZlckxpbWl0c0V4Y2VlZGVkXCIpKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBpZiBzaGlwIGZpdHMgaW4gdGhlIHJvd1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2libGluZ3NUb0NvbG9yID0gdXNlckJvYXJkU3F1YXJlcy5zbGljZShzdGFydCwgZXhwZWN0ZWRFbmQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2libGluZ3NUb0NvbG9yLmZvckVhY2goc2libGluZyA9PiBzaWJsaW5nLmNsYXNzTGlzdC5hZGQoXCJob3ZlclwiKSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIHZlcnRpY2FsXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IHN0YXJ0ICsgc2VsZWN0ZWRTaGlwTGVuZ3RoICogMTA7IGkgKz0gMTApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpIDwgdXNlckJvYXJkU3F1YXJlcy5sZW5ndGgpIHNpYmxpbmdzVG9Db2xvci5wdXNoKHVzZXJCb2FyZFNxdWFyZXNbaV0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNpYmxpbmdzVG9Db2xvci5sZW5ndGggPCBzZWxlY3RlZFNoaXBMZW5ndGgpIHsgLy8gaWYgc2hpcCBpcyB0b28gbG9uZyB0byBmaXQgaW4gdGhlIGNvbHVtblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2libGluZ3NUb0NvbG9yLmZvckVhY2goc2libGluZyA9PiBzaWJsaW5nLmNsYXNzTGlzdC5hZGQoXCJob3ZlckxpbWl0c0V4Y2VlZGVkXCIpKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBpZiBzaGlwIGZpdHMgaW4gdGhlIGNvbHVtblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2libGluZ3NUb0NvbG9yLmZvckVhY2goc2libGluZyA9PiBzaWJsaW5nLmNsYXNzTGlzdC5hZGQoXCJob3ZlclwiKSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHVzZXJCb2FyZFNxdWFyZXMuZm9yRWFjaChzaWJsaW5nID0+IHNpYmxpbmcuY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyXCIpKVxuICAgICAgICAgICAgICAgICAgICB1c2VyQm9hcmRTcXVhcmVzLmZvckVhY2goc2libGluZyA9PiBzaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlckxpbWl0c0V4Y2VlZGVkXCIpKVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAvLyBBZGRpbmcgZXZlbnQgbGlzdGVuZXIgdG8gVCBrZXkgdG8gcm90YXRlIHRoZSBzZWxlY3RlZCBzaGlwXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChlLmtleSA9PT0gXCJ0XCIpIG9yaWVudGF0aW9uID0gb3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiID8gXCJ2ZXJ0aWNhbFwiIDogXCJob3Jpem9udGFsXCJcblxuICAgICAgICAgICAgfSlcblxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgLy8gU2hvdyBhIFwiU3RhcnQgR2FtZVwiIGJ1dHRvblxuICAgIGZ1bmN0aW9uIHNob3dTdGFydEdhbWVCdXR0b24oKSB7XG5cbiAgICAgICAgLy8gU2hvdyB0aGUgXCJTdGFydCBHYW1lXCIgYnV0dG9uXG4gICAgICAgIGNvbnN0IHN0YXJ0R2FtZUJ1dHRvbiA9IGNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgbnVsbCwgXCJzdGFydC1nYW1lLWJ1dHRvblwiKVxuICAgICAgICBzdGFydEdhbWVCdXR0b24udGV4dENvbnRlbnQgPSBcIlNUQVJUIEdBTUVcIlxuICAgICAgICBzdGFydEdhbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblxuICAgICAgICAgICAgLy8gRGVsZXRlIFwiU3RhcnQgR2FtZVwiIGJ1dHRvblxuICAgICAgICAgICAgc3RhcnRHYW1lQnV0dG9uLnJlbW92ZSgpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEVuYWJsZSB0aGUgY29tcHV0ZXIgYm9hcmRcbiAgICAgICAgICAgIGNvbnN0IGNvbXB1dGVyR2FtZWJvYXJkR3JpZCA9IGdldEVsZW1lbnQoXCJjb21wdXRlckdhbWVib2FyZEdyaWRcIilcbiAgICAgICAgICAgIGNvbXB1dGVyR2FtZWJvYXJkR3JpZC5jbGFzc0xpc3QucmVtb3ZlKFwiYmxvY2tlZFwiKVxuXG4gICAgICAgICAgICAvLyBDaGFuZ2UgaW5zdHJ1Y3Rpb25zIHRleHRcbiAgICAgICAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5zdHJ1Y3Rpb25zXCIpXG4gICAgICAgICAgICBpbnN0cnVjdGlvbnMudGV4dENvbnRlbnQgPSBcIkNsaWNrIG9uIGEgY2VsbCB0byBhdHRhY2tcIlxuXG4gICAgICAgICAgICAvLyBDaGFuZ2UgY29tcHV0ZXIgaW5mbyB0ZXh0XG4gICAgICAgICAgICBjb25zdCBjb21wdXRlckluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXB1dGVySW5mb1wiKVxuICAgICAgICAgICAgY29tcHV0ZXJJbmZvLnRleHRDb250ZW50ID0gXCJMYWRpZXMgZmlyc3QsIHBsZWFzZS4uLlwiXG5cbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBidXR0b25zQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b25zQ29udGFpbmVyXCIpXG4gICAgICAgIGJ1dHRvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoc3RhcnRHYW1lQnV0dG9uKVxuXG4gICAgfVxuXG4gICAgLy8gQXNzb2NpYXRlcyBhbiBldmVudCBsaXN0ZW5lciB0byBcIlJhbmRvbSBQbGFjZW1lbnRcIiBidXR0b25cbiAgICBmdW5jdGlvbiBvblJhbmRvbVBsYWNlbWVudENsaWNrKGNhbGxiYWNrKSB7XG5cbiAgICAgICAgY29uc3QgcmFuZG9tQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyYW5kb21CdXR0b25cIilcbiAgICAgICAgcmFuZG9tQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNhbGxiYWNrKClcbiAgICAgICAgICAgIC8vIERlbGV0ZSB0aGUgYnV0dG9ucyBmcm9tIHRoZSBpbnN0cnVjdGlvbnMgZGl2XG4gICAgICAgICAgICBjb25zdCBtYW51YWxCdXR0b24gPSBnZXRFbGVtZW50KFwibWFudWFsQnV0dG9uXCIpXG4gICAgICAgICAgICBtYW51YWxCdXR0b24ucmVtb3ZlKClcbiAgICAgICAgICAgIHJhbmRvbUJ1dHRvbi5yZW1vdmUoKVxuICAgICAgICAgICAgLy8gQ2hhbmdlIGluc3RydWN0aW9ucyB0ZXh0XG4gICAgICAgICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluc3RydWN0aW9uc1wiKVxuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLnRleHRDb250ZW50ID0gXCJBbGwgc2hpcHMgcGxhY2VkLiBDbGljayBvbiB0aGUgYnV0dG9uIGJlbG93IHRvIHN0YXJ0IHRoZSBnYW1lXCJcbiAgICAgICAgICAgIC8vIEFkZCBjbGFzcyBcIi5wbGFjZWRcIiB0byBhbGwgdXNlciBzaGlwc1xuICAgICAgICAgICAgY29uc3QgdXNlclNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi51c2VyU2hpcFwiKVxuICAgICAgICAgICAgdXNlclNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc2hpcC5jbGFzc0xpc3QuYWRkKFwicGxhY2VkXCIpXG4gICAgICAgICAgICAgICAgc2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIilcbiAgICAgICAgICAgICAgICBzaGlwLmNsYXNzTGlzdC5yZW1vdmUoXCJuby1ob3ZlclwiKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBSZXZlcnQgZ2xvYmFsIHZhcmlhYmxlcyB0byBkZWZhdWx0IHZhbHVlc1xuICAgICAgICAgICAgc2VsZWN0ZWRTaGlwTmFtZSA9IFwiXCJcbiAgICAgICAgICAgIHNlbGVjdGVkU2hpcExlbmd0aCA9IDBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQmxvY2sgdXNlciBnYW1lYm9hcmRcbiAgICAgICAgICAgIGNvbnN0IHVzZXJHYW1lYm9hcmRHcmlkID0gZ2V0RWxlbWVudChcInVzZXJHYW1lYm9hcmRHcmlkXCIpXG4gICAgICAgICAgICB1c2VyR2FtZWJvYXJkR3JpZC5jbGFzc0xpc3QuYWRkKFwiYmxvY2tlZFwiKVxuXG4gICAgICAgICAgICAvLyBTaG93IFwiU3RhcnQgR2FtZVwiIGJ1dHRvblxuICAgICAgICAgICAgc2hvd1N0YXJ0R2FtZUJ1dHRvbigpXG5cbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIC8vIExvYWRzIHRoZSB1c2VyIGdhbWVib2FyZFxuICAgIGZ1bmN0aW9uIGxvYWRVc2VyR2FtZWJvYXJkKGdhbWVib2FyZCkge1xuXG4gICAgICAgIGNvbnN0IHVzZXJCb2FyZFNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3VzZXJHYW1lYm9hcmRHcmlkIC5nYW1lYm9hcmRTcXVhcmVcIilcbiAgICAgICAgdXNlckJvYXJkU3F1YXJlcy5mb3JFYWNoKChzcXVhcmUsaW5kZXgpID0+IHtcbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIGEgc2hpcCBvbiB0aGUgc3F1YXJlLCBhZGQgdGhlIFwib2NjdXBpZWRcIiBjbGFzcyB0byBpdFxuICAgICAgICAgICAgaWYgKGdhbWVib2FyZFtpbmRleF0gIT09IFwiV2F0ZXJcIikgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJvY2N1cGllZFwiKVxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgLy8gTG9hZHMgaW5pdGlhbCBVSSBzY3JlZW5cbiAgICBmdW5jdGlvbiBsb2FkQ292ZXJNYWluVUkobG9hZE1haW5VSUNhbGxiYWNrKSB7XG4gICAgXG4gICAgICAgIC8vIENyZWF0ZSBhIHNjcmVlbiA8ZGl2PjwvZGl2PiB0aGF0IGNvdmVycyBhbGwgdGhlIHNwYWNlIGF2YWlsYWJsZSBvbiBicm93c2VyIG5hdlxuICAgICAgICBjb25zdCBzY3JlZW4gPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsbnVsbCxcInNjcmVlblwiKVxuXG4gICAgICAgIC8vIEFwcGVuZCBpdCB0byBib2R5IGVsZW1lbnRcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JlZW4pXG5cbiAgICAgICAgLy8gQ3JlYXRlIGhlYWRlciwgbWFpbiBhbmQgZm9vdGVyIGRpdnMgaW5zaWRlIHNjcmVlbiBkaXZcbiAgICAgICAgY29uc3QgaGVhZGVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLG51bGwsXCJoZWFkZXJcIilcbiAgICAgICAgY29uc3QgbWFpbiA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixudWxsLFwibWFpblwiKVxuICAgICAgICBjb25zdCBmb290ZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsbnVsbCxcImZvb3RlclwiKVxuICAgICAgICBcbiAgICAgICAgc2NyZWVuLmFwcGVuZENoaWxkKGhlYWRlcilcbiAgICAgICAgc2NyZWVuLmFwcGVuZENoaWxkKG1haW4pXG4gICAgICAgIHNjcmVlbi5hcHBlbmRDaGlsZChmb290ZXIpXG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgdGl0bGUgZm9yIHRoZSBnYW1lIGFuZCBhcHBlbmQgaXQgdG8gdGhlIGhlYWRlclxuICAgICAgICBjb25zdCB0aXRsZSA9IGNyZWF0ZUVsZW1lbnQoXCJoMVwiLFwidGl0bGVcIixudWxsKVxuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IFwiQkFUVExFU0hJUFwiXG4gICAgICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSlcblxuICAgICAgICAvLyBDcmVhdGUgdGhlIGNyZWRpdHMgYW5kIGFwcGVuZCB0aGVtIHRvIHRoZSBmb290ZXJcbiAgICAgICAgY29uc3QgY3JlZGl0cyA9IGNyZWF0ZUVsZW1lbnQoXCJwXCIsXCJjcmVkaXRzXCIsbnVsbClcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHF1b3Rlc1xuICAgICAgICBjcmVkaXRzLmlubmVySFRNTCA9ICdDcmVhdGVkIGJ5IFZFUkVHT1JOLiBGb2xsb3cgbXkgd29yayBvbiBHaXRIdWI6IDxicj48YnI+PGEgY2xhc3M9XCJnaXRodWItbGlua1wiIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vdmVyZWdvcm5cIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+PHN2ZyBjbGFzcz1cImdpdGh1Yi1pY29uXCIgd2lkdGg9XCIzMlwiIGhlaWdodD1cIjMyXCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNOCAwQzMuNTggMCAwIDMuNTggMCA4YzAgMy41NCAyLjI5IDYuNTMgNS40NyA3LjU5LjQuMDcuNTUtLjE3LjU1LS4zOCAwLS4xOS0uMDEtLjgyLS4wMS0xLjQ5LTIuMDEuMzctMi41My0uNDktMi42OS0uOTQtLjA5LS4yMy0uNDgtLjk0LS44Mi0xLjEzLS4yOC0uMTUtLjY4LS41Mi0uMDEtLjUzLjYzLS4wMSAxLjA4LjU4IDEuMjMuODIuNzIgMS4yMSAxLjg3Ljg3IDIuMzMuNjYuMDctLjUyLjI4LS44Ny41MS0xLjA3LTEuNzgtLjItMy42NC0uODktMy42NC0zLjk1IDAtLjg3LjMxLTEuNTkuODItMi4xNS0uMDgtLjItLjM2LTEuMDIuMDgtMi4xMiAwIDAgLjY3LS4yMSAyLjIuODIuNjQtLjE4IDEuMzItLjI3IDItLjI3LjY4IDAgMS4zNi4wOSAyIC4yNyAxLjUzLTEuMDQgMi4yLS44MiAyLjItLjgyLjQ0IDEuMS4xNiAxLjkyLjA4IDIuMTIuNTEuNTYuODIgMS4yNy44MiAyLjE1IDAgMy4wNy0xLjg3IDMuNzUtMy42NSAzLjk1LjI5LjI1LjU0LjczLjU0IDEuNDggMCAxLjA3LS4wMSAxLjkzLS4wMSAyLjIgMCAuMjEuMTUuNDYuNTUuMzhBOC4wMTMgOC4wMTMgMCAwIDAgMTYgOGMwLTQuNDItMy41OC04LTgtOHpcIi8+PC9zdmc+PC9hPidcbiAgICAgICAgZm9vdGVyLmFwcGVuZENoaWxkKGNyZWRpdHMpXG5cbiAgICAgICAgLy8gTWFpbiBjb250ZW50XG4gICAgICAgIGNvbnN0IGdsb3dpbmdCdXR0b24gPSBjcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsXCJnbG93aW5nLWJ1dHRvblwiLG51bGwpXG4gICAgICAgIGdsb3dpbmdCdXR0b24udGV4dENvbnRlbnQgPSBcIlBMQVlcIlxuICAgICAgICBnbG93aW5nQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBkZWxldGVNYWluVUkoKVxuICAgICAgICAgICAgbG9hZE1haW5VSUNhbGxiYWNrKClcbiAgICAgICAgfSlcbiAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChnbG93aW5nQnV0dG9uKVxuXG4gICAgICAgIC8vIFNWRyBTaGlwIHNoYXBlc1xuICAgICAgICBjb25zdCBjYXJyaWVyU2hhcGUgPSBjcmVhdGVFbGVtZW50KFwib2JqZWN0XCIsbnVsbCxcImNhcnJpZXItc2hhcGVcIilcbiAgICAgICAgY2FycmllclNoYXBlLmRhdGEgPSBjYXJyaWVyU3ZnXG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQoY2FycmllclNoYXBlKVxuXG4gICAgICAgIGNvbnN0IHN1Ym1hcmluZVNoYXBlID0gY3JlYXRlRWxlbWVudChcIm9iamVjdFwiLG51bGwsXCJzdWJtYXJpbmUtc2hhcGVcIilcbiAgICAgICAgc3VibWFyaW5lU2hhcGUuZGF0YSA9IHN1Ym1hcmluZVN2Z1xuICAgICAgICBtYWluLmFwcGVuZENoaWxkKHN1Ym1hcmluZVNoYXBlKVxuXG4gICAgICAgIGNvbnN0IGJhdHRsZXNoaXBTaGFwZSA9IGNyZWF0ZUVsZW1lbnQoXCJvYmplY3RcIixudWxsLFwiYmF0dGxlc2hpcC1zaGFwZVwiKVxuICAgICAgICBiYXR0bGVzaGlwU2hhcGUuZGF0YSA9IGJhdHRsZXNoaXBTdmdcbiAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChiYXR0bGVzaGlwU2hhcGUpXG5cbiAgICAgICAgY29uc3QgZGVzdHJveWVyU2hhcGUgPSBjcmVhdGVFbGVtZW50KFwib2JqZWN0XCIsbnVsbCxcImRlc3Ryb3llci1zaGFwZVwiKVxuICAgICAgICBkZXN0cm95ZXJTaGFwZS5kYXRhID0gZGVzdHJveWVyU3ZnXG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQoZGVzdHJveWVyU2hhcGUpXG5cbiAgICAgICAgY29uc3QgcGF0cm9sU2hhcGUgPSBjcmVhdGVFbGVtZW50KFwib2JqZWN0XCIsbnVsbCxcInBhdHJvbC1zaGFwZVwiKVxuICAgICAgICBwYXRyb2xTaGFwZS5kYXRhID0gcGF0cm9sU3ZnXG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQocGF0cm9sU2hhcGUpXG5cbiAgICB9XG5cbiAgICAvLyBEZWxldGUgRXZlbnQgTGlzdGVuZXJzIGFzc29jaWF0ZWQgd2l0aCB1c2VyIFNoaXBzIHBsYWNlbWVudCAod2hlbiB5ZXQgcGxhY2VkKVxuICAgIGZ1bmN0aW9uIGRlbGV0ZVVzZXJHYW1lYm9hcmRFdmVudExpc3RlbmVycygpIHtcblxuICAgICAgICAvLyBGaXJzdCByZW1vdmUgdGhlIGV2ZW50IGxpc3RlbmVycyBmcm9tIHRoZSBzaGlwc1xuICAgICAgICBjb25zdCB1c2VyU2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnVzZXJTaGlwXCIpXG4gICAgICAgIHVzZXJTaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgc2hpcC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiBoYW5kbGVTaGlwQ2xpY2soc2hpcCxldmVudCkpXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gVGhlbiByZW1vdmUgdGhlIGV2ZW50IGxpc3RlbmVycyBmcm9tIHRoZSBnYW1lYm9hcmQgc3F1YXJlc1xuICAgICAgICBjb25zdCB1c2VyQm9hcmRTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiN1c2VyR2FtZWJvYXJkR3JpZCAuZ2FtZWJvYXJkU3F1YXJlXCIpXG4gICAgICAgIHVzZXJCb2FyZFNxdWFyZXMuZm9yRWFjaChzcXVhcmUgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzcXVhcmUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHt9KVxuICAgICAgICAgICAgc3F1YXJlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKCkgPT4ge30pXG4gICAgICAgICAgICBzcXVhcmUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsICgpID0+IHt9KVxuXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICAvLyBDaGFuZ2UgYmFja2dyb3VuZCBjb2xvciBvZiB0aGUgc3F1YXJlcyBwYXNzZWQgYXMgYXJndW1lbnRcbiAgICBmdW5jdGlvbiB1cGRhdGVVc2VyR2FtZWJvYXJkU2hpcFBsYWNlbWVudChhcnJheU9mU3F1YXJlcykge1xuXG4gICAgICAgIGFycmF5T2ZTcXVhcmVzLmZvckVhY2goc3F1YXJlID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgdXNlckJvYXJkU3F1YXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaW5kZXg9XCIke3NxdWFyZX1cIl1gKVxuICAgICAgICAgICAgdXNlckJvYXJkU3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJvY2N1cGllZFwiKVxuXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICAvLyBVcGRhdGVzIHVzZXIgc2hpcHlhcmQgd2hlbiBhIHNoaXAgaXMgcGxhY2VkXG4gICAgZnVuY3Rpb24gdXBkYXRlVXNlclNoaXB5YXJkKHNoaXBOYW1lKSB7XG5cbiAgICAgICAgY29uc3Qgc2hpcERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3NoaXBOYW1lfWApXG4gICAgICAgIHNoaXBEaXYuY2xhc3NMaXN0LmFkZChcInBsYWNlZFwiKVxuICAgICAgICBzaGlwRGl2LmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKVxuXG4gICAgICAgIC8vIFVwZGF0ZSBnbG9iYWwgdmFyaWFibGVzXG4gICAgICAgIHNlbGVjdGVkU2hpcExlbmd0aCA9IDBcbiAgICAgICAgc2VsZWN0ZWRTaGlwTmFtZSA9IFwiXCJcbiAgICAgICAgcGxhY2VkU2hpcHNDb3VudGVyICs9IDFcblxuICAgICAgICAvLyBJZiBhbGwgc2hpcHMgYXJlIHBsYWNlZCxcbiAgICAgICAgLy8gc2hvdyB0aGUgXCJTdGFydCBHYW1lXCIgYnV0dG9uLCBcbiAgICAgICAgLy8gdXBkYXRlIGluZm8gYW5kIGJsb2NrIHVzZXIgZ2FtZWJvYXJkXG4gICAgICAgIGlmIChwbGFjZWRTaGlwc0NvdW50ZXIgPT09IDUpIHtcblxuICAgICAgICAgICAgLy8gQmxvY2sgdXNlciBnYW1lYm9hcmRcbiAgICAgICAgICAgIGNvbnN0IHVzZXJHYW1lYm9hcmRHcmlkID0gZ2V0RWxlbWVudChcInVzZXJHYW1lYm9hcmRHcmlkXCIpXG4gICAgICAgICAgICB1c2VyR2FtZWJvYXJkR3JpZC5jbGFzc0xpc3QuYWRkKFwiYmxvY2tlZFwiKVxuICAgICAgICAgICAgLy8gQ2hhbmdlIGluc3RydWN0aW9ucyB0ZXh0XG4gICAgICAgICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluc3RydWN0aW9uc1wiKVxuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLnRleHRDb250ZW50ID0gXCJBbGwgc2hpcHMgcGxhY2VkLiBDbGljayBvbiB0aGUgYnV0dG9uIGJlbG93IHRvIHN0YXJ0IHRoZSBnYW1lXCJcblxuICAgICAgICAgICAgLy8gU2hvdyBcIlN0YXJ0IEdhbWVcIiBidXR0b25cbiAgICAgICAgICAgIHNob3dTdGFydEdhbWVCdXR0b24oKVxuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIFVwZGF0ZXMgY29tcHV0ZXIgZ2FtZWJvYXJkIHdoZW4gYW4gYXR0YWNrIGlzIG1hZGVcbiAgICBmdW5jdGlvbiB1cGRhdGVDb21wdXRlckdhbWVib2FyZChzcXVhcmVOdW0sYXR0YWNrUmVzdWx0KSB7XG5cbiAgICAgICAgY29uc3QgY29tcHV0ZXJCb2FyZFNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjb21wdXRlckdhbWVib2FyZEdyaWQgLmdhbWVib2FyZFNxdWFyZVtkYXRhLWluZGV4PVwiJHtzcXVhcmVOdW19XCJdYClcblxuICAgICAgICBpZiAoYXR0YWNrUmVzdWx0ID09PSBcIk1pc3NcIikge1xuXG4gICAgICAgICAgICBjb21wdXRlckJvYXJkU3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpXG5cbiAgICAgICAgfSBlbHNlIGlmIChhdHRhY2tSZXN1bHQgPT09IFwiU2hpcEhpdFwiKSB7XG5cbiAgICAgICAgICAgIGNvbXB1dGVyQm9hcmRTcXVhcmUuY2xhc3NMaXN0LmFkZChcImhpdFwiKVxuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIFVwZGF0ZXMgY29tcHV0ZXIgc2hpcHlhcmQgd2hlbiBhIHNoaXAgaXMgc3Vua1xuICAgIGZ1bmN0aW9uIHVwZGF0ZUNvbXB1dGVyU2hpcHlhcmQoc2hpcE5hbWUpIHtcblxuICAgICAgICBjb25zdCBzaGlwRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NvbXB1dGVyU3RhdHVzUGFuZWwgLiR7c2hpcE5hbWV9YClcbiAgICAgICAgc2hpcERpdi5jbGFzc0xpc3QuYWRkKFwic3Vua1wiKVxuXG4gICAgfVxuXG4gICAgLy8gU2hvd3MgYSBtb2RhbCB3aW5kb3cgYW5ub3VuY2luZyB0aGUgd2lubmVyIGFuZCBhIGJ1dHRvbiB0byByZXN0YXJ0IHRoZSBnYW1lXG4gICAgZnVuY3Rpb24gc2hvd1ZpY3RvcnlNb2RhbCh3aW5uZXIpIHtcblxuICAgICAgICBjb25zdCBtb2RhbCA9IGdldEVsZW1lbnQoXCJ2aWN0b3J5TW9kYWxcIilcbiAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIlxuICAgICAgICBjb25zdCBtb2RhbFRleHQgPSBnZXRFbGVtZW50KFwibW9kYWwtdGV4dFwiKVxuICAgICAgICBtb2RhbFRleHQudGV4dENvbnRlbnQgPSBgJHt3aW5uZXJ9IHdpbnMhYFxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlRWxlbWVudCxcbiAgICAgICAgZ2V0RWxlbWVudCxcbiAgICAgICAgbG9hZENvdmVyTWFpblVJLFxuICAgICAgICBvblVzZXJCb2FyZENsaWNrLFxuICAgICAgICBvblJhbmRvbVBsYWNlbWVudENsaWNrLFxuICAgICAgICBsb2FkVXNlckdhbWVib2FyZCxcbiAgICAgICAgbG9hZEdhbWVVSSxcbiAgICAgICAgZGVsZXRlVXNlckdhbWVib2FyZEV2ZW50TGlzdGVuZXJzLFxuICAgICAgICBvbk1hbnVhbFBsYWNlbWVudENsaWNrLFxuICAgICAgICBzaG93VXNlckluZm8sXG4gICAgICAgIHVwZGF0ZVVzZXJHYW1lYm9hcmRTaGlwUGxhY2VtZW50LFxuICAgICAgICB1cGRhdGVVc2VyU2hpcHlhcmQsXG4gICAgICAgIG9uQ29tcHV0ZXJCb2FyZENsaWNrLFxuICAgICAgICBzaG93Q29tcHV0ZXJJbmZvLFxuICAgICAgICB1cGRhdGVDb21wdXRlckdhbWVib2FyZCxcbiAgICAgICAgdXBkYXRlQ29tcHV0ZXJTaGlweWFyZCxcbiAgICAgICAgc2hvd1ZpY3RvcnlNb2RhbFxuICAgIH1cblxufSkoKSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9QnJ1bm8rQWNlJmRpc3BsYXk9c3dhcCk7XCJdKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUlCTStQbGV4K01vbm8mZGlzcGxheT1zd2FwKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcblxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0Ym9yZGVyOiAwO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHRmb250OiBpbmhlcml0O1xcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxufVxcbmJvZHkge1xcblxcdGxpbmUtaGVpZ2h0OiAxO1xcbn1cXG5vbCwgdWwge1xcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGUsIHEge1xcblxcdHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICcnO1xcblxcdGNvbnRlbnQ6IG5vbmU7XFxufVxcbnRhYmxlIHtcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cXG5cXG4vKiBNWSBPV04gU1RZTEVTIEZST00gSEVSRSAqL1xcblxcbi8qIEZvbnRzICovXFxuXFxuYTp2aXNpdGVkIHtcXG4gICAgY29sb3I6ICNmZmY7XFxufVxcblxcbiNzY3JlZW4ge1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7IC8qIG9yIFxcXCJhYnNvbHV0ZVxcXCIgKi9cXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICB6LWluZGV4OiAwO1xcbn1cXG5cXG4vKiBIRUFERVIgKi9cXG5cXG4jaGVhZGVyIHtcXG4gICAgaGVpZ2h0OiAxMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0NzQ3NDc7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCAjMDAwO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgei1pbmRleDogMztcXG59XFxuXFxuLnRpdGxlIHtcXG4gICAgZm9udC1zaXplOiAyZW07XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgY29sb3I6ICNlOGY5MDE7XFxufVxcblxcbiNtYWluIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBoZWlnaHQ6IDgwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcXG59XFxuXFxuLyogQ09WRVIgKi9cXG5cXG4uZ2xvd2luZy1idXR0b24ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNENBRjUwO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgZm9udC1zaXplOiAzZW07XFxuICAgIHBhZGRpbmc6IDIwcHggMzBweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC41cztcXG4gICAgYm94LXNoYWRvdzogMCAwIDVweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxufVxcbiAgXFxuLmdsb3dpbmctYnV0dG9uOmhvdmVyIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xcbiAgICBib3gtc2hhZG93OiAwIDAgMTBweCByZ2JhKDAsIDAsIDAsIDAuMiksIDAgMCAyMHB4IHJnYmEoNzYsIDE3NSwgODAsIDAuNik7XFxufVxcblxcbkBrZXlmcmFtZXMgZ2xvd2luZzIge1xcbiAgICAwJSB7XFxuICAgICAgICBib3gtc2hhZG93OiAwIDAgNXB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAwIDEwcHggcmdiYSg3NiwgMTc1LCA4MCwgMC4yKTtcXG4gICAgfVxcbiAgICA1MCUge1xcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDAgMjBweCByZ2JhKDc2LCAxNzUsIDgwLCAwLjUpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDVweCByZ2JhKDAsIDAsIDAsIDAuMiksIDAgMCAxMHB4IHJnYmEoNzYsIDE3NSwgODAsIDAuMik7XFxuICAgIH1cXG59XFxuXFxuLmdsb3dpbmctYnV0dG9uIHtcXG4gICAgYW5pbWF0aW9uOiBnbG93aW5nMiAycyBpbmZpbml0ZTtcXG59XFxuXFxuLyogQ09WRVIgU0hJUFMgKi9cXG5cXG4jY2Fycmllci1zaGFwZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDE4MHB4O1xcbiAgICBoZWlnaHQ6IDYwcHg7XFxuICAgIHRvcDogMjAlO1xcbiAgICBhbmltYXRpb246IG1vdmUtcmlnaHQtbGVmdCAxMHMgbGluZWFyIGluZmluaXRlOyAvKiBhZGp1c3QgdGhlIHRpbWUgYXMgbmVlZGVkICovXFxuICAgIHotaW5kZXg6IDE7XFxufVxcblxcbkBrZXlmcmFtZXMgbW92ZS1yaWdodC1sZWZ0IHtcXG4gICAgMCUgeyByaWdodDogLTEwMCU7IH0gLyogU3RhcnQgZnJvbSBvZmYgdGhlIHJpZ2h0IG9mIHRoZSBzY3JlZW4gKi9cXG4gICAgMTAwJSB7IHJpZ2h0OiAxMDAlOyB9IC8qIEVuZCBvZmYgdGhlIGxlZnQgb2YgdGhlIHNjcmVlbiAqL1xcbn1cXG5cXG4jc3VibWFyaW5lLXNoYXBlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMTIwcHg7XFxuICAgIGhlaWdodDogNjBweDtcXG4gICAgbGVmdDogMjAlO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxuICAgIGFuaW1hdGlvbjogbW92ZS10b3AtZG93biAxMHMgbGluZWFyIGluZmluaXRlO1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIG1vdmUtdG9wLWRvd24ge1xcbiAgICAwJSB7IHRvcDogLTIwMHB4IH1cXG4gICAgMTAwJSB7IHRvcDogMTUwMHB4fVxcbn1cXG5cXG4jYmF0dGxlc2hpcC1zaGFwZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDE1MHB4O1xcbiAgICBoZWlnaHQ6IDYwcHg7XFxuICAgIHRvcDogNjUlO1xcbiAgICBhbmltYXRpb246IG1vdmUtbGVmdC1yaWdodCAxMHMgbGluZWFyIGluZmluaXRlOyAvKiBhZGp1c3QgdGhlIHRpbWUgYXMgbmVlZGVkICovXFxuICAgIHotaW5kZXg6IDE7XFxufVxcblxcbkBrZXlmcmFtZXMgbW92ZS1sZWZ0LXJpZ2h0IHtcXG4gICAgMCUgeyBsZWZ0OiAtMTAwJTsgfSAvKiBTdGFydCBmcm9tIG9mZiB0aGUgbGVmdCBvZiB0aGUgc2NyZWVuICovXFxuICAgIDEwMCUgeyBsZWZ0OiAxMDAlOyB9IC8qIEVuZCBvZmYgdGhlIHJpZ2h0IG9mIHRoZSBzY3JlZW4gKi9cXG59XFxuXFxuI2Rlc3Ryb3llci1zaGFwZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDEyMHB4O1xcbiAgICBoZWlnaHQ6IDYwcHg7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7XFxuICAgIGxlZnQ6IDgwJTtcXG4gICAgYW5pbWF0aW9uOiBtb3ZlLWRvd24tdG9wIDEwcyBsaW5lYXIgaW5maW5pdGU7XFxuICAgIHotaW5kZXg6IDE7XFxufVxcblxcbkBrZXlmcmFtZXMgbW92ZS1kb3duLXRvcCB7XFxuICAgIDAlIHsgdG9wOiAxNTAwcHg7IH1cXG4gICAgMTAwJSB7IHRvcDogLTIwMHB4OyB9XFxufVxcblxcbiNwYXRyb2wtc2hhcGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiA5MHB4O1xcbiAgICBoZWlnaHQ6IDYwcHg7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XFxuICAgIHRvcDogOTAlO1xcbiAgICBhbmltYXRpb246IG1vdmUtcmlnaHQtbGVmdCAxMHMgbGluZWFyIGluZmluaXRlO1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG4vKiBNQUlOIC0gR0FNRSAqL1xcblxcbi5wbGF5ZXJTaWRlIHtcXG4gICAgd2lkdGg6IDUwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBwYWRkaW5nOiA1JTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgICBnYXA6IDJlbTtcXG4gICAgbWFyZ2luLXRvcDogNWVtO1xcbn1cXG5cXG4uZ2FtZUhlYWRlciB7XFxuICAgIHdpZHRoOiA0NDBweDtcXG4gICAgZm9udC1zaXplOiAxLjVlbTtcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4jdXNlckdhbWVIZWFkZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkMxMTU5O1xcbn1cXG5cXG4jY29tcHV0ZXJHYW1lSGVhZGVye1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzI3RDk1O1xcbn1cXG5cXG4uZ2FtZWJvYXJkQ29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4ueEhlYWRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGp1c3RpZnktY29udGVudDogbGVmdDtcXG4gICAgcGFkZGluZy1sZWZ0OiAyLjVlbTtcXG59XFxuXFxuLnhIZWFkZXJTcXVhcmUge1xcbiAgICB3aWR0aDogMzhweDtcXG4gICAgaGVpZ2h0OiAzOHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBmb250LXNpemU6IDFlbTtcXG59XFxuXFxuLmJvdHRvbUJvYXJkIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4ueUhlYWRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbi55SGVhZGVyU3F1YXJlIHtcXG4gICAgd2lkdGg6IDM4cHg7XFxuICAgIGhlaWdodDogMzhweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgZm9udC1zaXplOiAxZW07XFxufVxcblxcbi55SGVhZGVyU2hpcHlhcmQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBmb250LXNpemU6IDFlbTtcXG4gICAgd3JpdGluZy1tb2RlOiB2ZXJ0aWNhbC1ybDtcXG4gICAgdGV4dC1vcmllbnRhdGlvbjogbWl4ZWQ7XFxuICAgIHJvdGF0ZTogMTgwZGVnO1xcbiAgICBtYXJnaW4tdG9wOiAxLjhlbTtcXG59XFxuXFxuLmdyaWRQYW5lbENvbnRhaW5lciB7XFxuICAgIHdpZHRoOiAzODBweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmdhbWVib2FyZEdyaWQge1xcbiAgICB3aWR0aDogMzgwcHg7XFxuICAgIGhlaWdodDogMzgwcHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG59XFxuXFxuI3VzZXJHYW1lYm9hcmRHcmlkIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbiN1c2VyR2FtZWJvYXJkR3JpZC5ibG9ja2VkIHtcXG4gICAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG5cXG4uZ2FtZWJvYXJkU3F1YXJlIHtcXG4gICAgd2lkdGg6IDM2cHg7XFxuICAgIGhlaWdodDogMzZweDtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggI2ZmZjtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgZm9udC1zaXplOiAxZW07XFxuICAgIGN1cnNvcjogaW5oZXJpdDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ExZGNmZjtcXG59XFxuXFxuI3VzZXJHYW1lYm9hcmRHcmlkIC5ob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM5OTk5OTk7XFxuICAgIG9wYWNpdHk6IDAuNztcXG59XFxuXFxuI3VzZXJHYW1lYm9hcmRHcmlkIC5vY2N1cGllZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM5OTk5OTk7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcblxcbiN1c2VyR2FtZWJvYXJkR3JpZCAuaG92ZXJMaW1pdHNFeGNlZWRlZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNjMjM0MzQ7XFxufVxcblxcbiNjb21wdXRlckdhbWVib2FyZEdyaWQgLmdhbWVib2FyZFNxdWFyZTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMxYjg4ZTc7XFxufVxcblxcbiNjb21wdXRlckdhbWVib2FyZEdyaWQuYmxvY2tlZCAuZ2FtZWJvYXJkU3F1YXJlOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ExZGNmZjtcXG4gICAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG5cXG4uZ2FtZWJvYXJkU3F1YXJlLm1pc3Mge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzIzNDM0O1xcbn1cXG5cXG4uZ2FtZWJvYXJkU3F1YXJlLm1pc3M6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzIzNDM0IWltcG9ydGFudDtcXG59XFxuXFxuLmdhbWVib2FyZFNxdWFyZS5oaXQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNENBRjUwO1xcbn1cXG5cXG4uZ2FtZWJvYXJkU3F1YXJlLmhpdDpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0Q0FGNTAhaW1wb3J0YW50O1xcbn1cXG5cXG4vKiBTSElQWUFSRCAqL1xcblxcbi5zdGF0dXNQYW5lbCB7XFxuICAgIHdpZHRoOiAzODJweDtcXG4gICAgaGVpZ2h0OiA3OHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxuICAgIG1hcmdpbi10b3A6IDM2cHg7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudChyZ2JhKDAsIDAsIDAsIDAuNSkgMnB4LCB0cmFuc3BhcmVudCAycHgpLCBsaW5lYXItZ3JhZGllbnQoOTBkZWcsIHJnYmEoMCwgMCwgMCwgMC41KSAycHgsIHRyYW5zcGFyZW50IDJweCk7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMzhweCAzOHB4O1xcbiAgICBnYXA6IDJweDtcXG59XFxuXFxuLmNhcnJpZXIge1xcbiAgICB3aWR0aDogMTg4cHg7XFxuICAgIGhlaWdodDogMzZweDtcXG59XFxuXFxuLmJhdHRsZXNoaXAge1xcbiAgICB3aWR0aDogMTUwcHg7XFxuICAgIGhlaWdodDogMzZweDtcXG59XFxuXFxuLnN1Ym1hcmluZSB7XFxuICAgIHdpZHRoOiAxMTJweDtcXG4gICAgaGVpZ2h0OiAzNnB4O1xcbn1cXG5cXG4uZGVzdHJveWVyIHtcXG4gICAgd2lkdGg6IDExMnB4O1xcbiAgICBoZWlnaHQ6IDM2cHg7XFxufVxcblxcbi5ib2F0IHtcXG4gICAgd2lkdGg6IDc0cHg7XFxuICAgIGhlaWdodDogMzZweDtcXG59XFxuXFxuLnVzZXJTaGlwIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBvcGFjaXR5OiAwLjc7XFxufVxcblxcbi51c2VyU2hpcDpob3ZlciB7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcblxcbi51c2VyU2hpcC5uby1ob3Zlcjpob3ZlciB7XFxuICAgIG9wYWNpdHk6IDAuNztcXG4gICAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG5cXG4udXNlclNoaXAuc2VsZWN0ZWQge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4udXNlclNoaXAucGxhY2VkIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG5cXG4uc2hpcC5zdW5rIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4uc2hpcC5zdW5rOjphZnRlciB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAycHg7XFxuICAgIGJhY2tncm91bmQ6IHJnYigyMzEsIDksIDkpO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGdsb3dpbmcge1xcbiAgICAwJSB7IGNvbG9yOiAjRkMxMTU5OyB9XFxuICAgIDUwJSB7IGNvbG9yOiAjMDAwOyB9XFxuICAgIDEwMCUgeyBjb2xvcjogI0ZDMTE1OTsgfVxcbiAgfVxcblxcbi5pbnN0cnVjdGlvbnMge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBmb250LXNpemU6IDAuOGVtO1xcbiAgICBsaW5lLWhlaWdodDogMS41ZW07XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYW5pbWF0aW9uOiBnbG93aW5nIDEuNXMgbGluZWFyIGluZmluaXRlO1xcbn1cXG5cXG4uYnV0dG9uc0NvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBnYXA6IDJlbTtcXG59XFxuXFxuLnBsYWNlbWVudEJ1dHRvbiB7XFxuICAgIHdpZHRoOiAxODBweDtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjZmZmO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNENBRjUwO1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgZm9udC1mYW1pbHk6ICdJQk0gUGxleCBNb25vJywgbW9ub3NwYWNlO1xcbiAgICBmb250LXNpemU6IDAuOGVtO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgIHBhZGRpbmc6IDFlbTtcXG59XFxuXFxuLnBsYWNlbWVudEJ1dHRvbjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzZThlNDE7XFxufVxcblxcbiNzdGFydC1nYW1lLWJ1dHRvbiB7XFxuICAgIHdpZHRoOiAxODBweDtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjZmZmO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNENBRjUwO1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgZm9udC1mYW1pbHk6ICdJQk0gUGxleCBNb25vJywgbW9ub3NwYWNlO1xcbiAgICBmb250LXNpemU6IDAuOGVtO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgIHBhZGRpbmc6IDFlbTtcXG59XFxuXFxuI3N0YXJ0LWdhbWUtYnV0dG9uOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzNlOGU0MTtcXG59XFxuXFxuLmNvbXB1dGVySW5mbyB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGZvbnQtc2l6ZTogMC44ZW07XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjVlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4jdmljdG9yeU1vZGFsIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICB6LWluZGV4OiAxO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB0b3A6IDA7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIG92ZXJmbG93OiBhdXRvO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsMCwwLDAuNCk7XFxuICB9XFxuICBcXG4gICN2aWN0b3J5TW9kYWwgPiBkaXYge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmZWZlO1xcbiAgICBwYWRkaW5nOiAyMHB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjODg4O1xcbiAgICB3aWR0aDogMzAlO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgfVxcblxcbiNtb2RhbC10ZXh0IHtcXG4gICAgZm9udC1mYW1pbHk6ICdJQk0gUGxleCBNb25vJywgbW9ub3NwYWNlO1xcbiAgICBmb250LXNpemU6IDAuOGVtO1xcbiAgICBsaW5lLWhlaWdodDogMS41ZW07XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuI21vZGFsLWJ1dHRvbiB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRDQUY1MDsgLyogVmVyZGUgKi9cXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG59XFxuXFxuI21vZGFsLWJ1dHRvbjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzZThlNDE7XFxufVxcblxcbi8qIEZPT1RFUiAqL1xcblxcbiNmb290ZXIge1xcbiAgICBoZWlnaHQ6IDEwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzQ3NDc0NztcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYm9yZGVyLXRvcDogc29saWQgMXB4ICMwMDA7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICB6LWluZGV4OiAzO1xcbn1cXG5cXG4uY3JlZGl0cyB7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBmb250LWZhbWlseTogJ0lCTSBQbGV4IE1vbm8nLCBtb25vc3BhY2U7XFxuICAgIGZvbnQtc2l6ZTogMC44ZW07XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLyogU3R5bGUgdGhlIGxpbmsgdG8gcmVtb3ZlIGRlZmF1bHQgc3R5bGluZyAqL1xcbi5naXRodWItbGluayB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICBjb2xvcjogaW5oZXJpdDtcXG59XFxuXFxuLyogQWRkIHRoZSBob3ZlciBlZmZlY3QgKi9cXG4uZ2l0aHViLWljb24ge1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC41cyBlYXNlLWluLW91dDsgLyogQWRkIGEgdHJhbnNpdGlvbiBmb3IgdGhlIHRyYW5zZm9ybSBwcm9wZXJ0eSAqL1xcbn1cXG5cXG4uZ2l0aHViLWxpbms6aG92ZXIgLmdpdGh1Yi1pY29uIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTsgLyogUm90YXRlIHRoZSBpY29uIDE4MCBkZWdyZWVzIHdoZW4gaG92ZXJlZCAqL1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL2luZGV4LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7O0NBR0M7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Q0FhQyxTQUFTO0NBQ1QsVUFBVTtDQUNWLFNBQVM7Q0FDVCxlQUFlO0NBQ2YsYUFBYTtDQUNiLHdCQUF3QjtBQUN6QjtBQUNBLGdEQUFnRDtBQUNoRDs7Q0FFQyxjQUFjO0FBQ2Y7QUFDQTtDQUNDLGNBQWM7QUFDZjtBQUNB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QUFFQSxXQUFXOztBQUVYO0lBQ0ksV0FBVztJQUNYLHlCQUF5QjtJQUN6QixhQUFhO0lBQ2IsMEJBQTBCO0lBQzFCLG1CQUFtQjtJQUNuQix1QkFBdUI7SUFDdkIsVUFBVTtBQUNkOztBQUVBO0lBQ0ksV0FBVztJQUNYLHVDQUF1QztJQUN2QyxnQkFBZ0I7SUFDaEIsa0JBQWtCO0FBQ3RCOztBQUVBLDZDQUE2QztBQUM3QztJQUNJLHFCQUFxQjtJQUNyQixxQkFBcUI7SUFDckIsY0FBYztBQUNsQjs7QUFFQSx5QkFBeUI7QUFDekI7SUFDSSxzQ0FBc0MsRUFBRSxnREFBZ0Q7QUFDNUY7O0FBRUE7SUFDSSx5QkFBeUIsRUFBRSw2Q0FBNkM7QUFDNUVcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcblxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0Ym9yZGVyOiAwO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHRmb250OiBpbmhlcml0O1xcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxufVxcbmJvZHkge1xcblxcdGxpbmUtaGVpZ2h0OiAxO1xcbn1cXG5vbCwgdWwge1xcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGUsIHEge1xcblxcdHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICcnO1xcblxcdGNvbnRlbnQ6IG5vbmU7XFxufVxcbnRhYmxlIHtcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cXG5cXG4vKiBNWSBPV04gU1RZTEVTIEZST00gSEVSRSAqL1xcblxcbi8qIEZvbnRzICovXFxuXFxuQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9QnJ1bm8rQWNlJmRpc3BsYXk9c3dhcCcpO1xcbkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUlCTStQbGV4K01vbm8mZGlzcGxheT1zd2FwJyk7XFxuXFxuYTp2aXNpdGVkIHtcXG4gICAgY29sb3I6ICNmZmY7XFxufVxcblxcbiNzY3JlZW4ge1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7IC8qIG9yIFxcXCJhYnNvbHV0ZVxcXCIgKi9cXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICB6LWluZGV4OiAwO1xcbn1cXG5cXG4vKiBIRUFERVIgKi9cXG5cXG4jaGVhZGVyIHtcXG4gICAgaGVpZ2h0OiAxMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0NzQ3NDc7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCAjMDAwO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgei1pbmRleDogMztcXG59XFxuXFxuLnRpdGxlIHtcXG4gICAgZm9udC1zaXplOiAyZW07XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgY29sb3I6ICNlOGY5MDE7XFxufVxcblxcbiNtYWluIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBoZWlnaHQ6IDgwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcXG59XFxuXFxuLyogQ09WRVIgKi9cXG5cXG4uZ2xvd2luZy1idXR0b24ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNENBRjUwO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgZm9udC1zaXplOiAzZW07XFxuICAgIHBhZGRpbmc6IDIwcHggMzBweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC41cztcXG4gICAgYm94LXNoYWRvdzogMCAwIDVweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxufVxcbiAgXFxuLmdsb3dpbmctYnV0dG9uOmhvdmVyIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xcbiAgICBib3gtc2hhZG93OiAwIDAgMTBweCByZ2JhKDAsIDAsIDAsIDAuMiksIDAgMCAyMHB4IHJnYmEoNzYsIDE3NSwgODAsIDAuNik7XFxufVxcblxcbkBrZXlmcmFtZXMgZ2xvd2luZzIge1xcbiAgICAwJSB7XFxuICAgICAgICBib3gtc2hhZG93OiAwIDAgNXB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAwIDEwcHggcmdiYSg3NiwgMTc1LCA4MCwgMC4yKTtcXG4gICAgfVxcbiAgICA1MCUge1xcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDAgMjBweCByZ2JhKDc2LCAxNzUsIDgwLCAwLjUpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDVweCByZ2JhKDAsIDAsIDAsIDAuMiksIDAgMCAxMHB4IHJnYmEoNzYsIDE3NSwgODAsIDAuMik7XFxuICAgIH1cXG59XFxuXFxuLmdsb3dpbmctYnV0dG9uIHtcXG4gICAgYW5pbWF0aW9uOiBnbG93aW5nMiAycyBpbmZpbml0ZTtcXG59XFxuXFxuLyogQ09WRVIgU0hJUFMgKi9cXG5cXG4jY2Fycmllci1zaGFwZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDE4MHB4O1xcbiAgICBoZWlnaHQ6IDYwcHg7XFxuICAgIHRvcDogMjAlO1xcbiAgICBhbmltYXRpb246IG1vdmUtcmlnaHQtbGVmdCAxMHMgbGluZWFyIGluZmluaXRlOyAvKiBhZGp1c3QgdGhlIHRpbWUgYXMgbmVlZGVkICovXFxuICAgIHotaW5kZXg6IDE7XFxufVxcblxcbkBrZXlmcmFtZXMgbW92ZS1yaWdodC1sZWZ0IHtcXG4gICAgMCUgeyByaWdodDogLTEwMCU7IH0gLyogU3RhcnQgZnJvbSBvZmYgdGhlIHJpZ2h0IG9mIHRoZSBzY3JlZW4gKi9cXG4gICAgMTAwJSB7IHJpZ2h0OiAxMDAlOyB9IC8qIEVuZCBvZmYgdGhlIGxlZnQgb2YgdGhlIHNjcmVlbiAqL1xcbn1cXG5cXG4jc3VibWFyaW5lLXNoYXBlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMTIwcHg7XFxuICAgIGhlaWdodDogNjBweDtcXG4gICAgbGVmdDogMjAlO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxuICAgIGFuaW1hdGlvbjogbW92ZS10b3AtZG93biAxMHMgbGluZWFyIGluZmluaXRlO1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIG1vdmUtdG9wLWRvd24ge1xcbiAgICAwJSB7IHRvcDogLTIwMHB4IH1cXG4gICAgMTAwJSB7IHRvcDogMTUwMHB4fVxcbn1cXG5cXG4jYmF0dGxlc2hpcC1zaGFwZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDE1MHB4O1xcbiAgICBoZWlnaHQ6IDYwcHg7XFxuICAgIHRvcDogNjUlO1xcbiAgICBhbmltYXRpb246IG1vdmUtbGVmdC1yaWdodCAxMHMgbGluZWFyIGluZmluaXRlOyAvKiBhZGp1c3QgdGhlIHRpbWUgYXMgbmVlZGVkICovXFxuICAgIHotaW5kZXg6IDE7XFxufVxcblxcbkBrZXlmcmFtZXMgbW92ZS1sZWZ0LXJpZ2h0IHtcXG4gICAgMCUgeyBsZWZ0OiAtMTAwJTsgfSAvKiBTdGFydCBmcm9tIG9mZiB0aGUgbGVmdCBvZiB0aGUgc2NyZWVuICovXFxuICAgIDEwMCUgeyBsZWZ0OiAxMDAlOyB9IC8qIEVuZCBvZmYgdGhlIHJpZ2h0IG9mIHRoZSBzY3JlZW4gKi9cXG59XFxuXFxuI2Rlc3Ryb3llci1zaGFwZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDEyMHB4O1xcbiAgICBoZWlnaHQ6IDYwcHg7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7XFxuICAgIGxlZnQ6IDgwJTtcXG4gICAgYW5pbWF0aW9uOiBtb3ZlLWRvd24tdG9wIDEwcyBsaW5lYXIgaW5maW5pdGU7XFxuICAgIHotaW5kZXg6IDE7XFxufVxcblxcbkBrZXlmcmFtZXMgbW92ZS1kb3duLXRvcCB7XFxuICAgIDAlIHsgdG9wOiAxNTAwcHg7IH1cXG4gICAgMTAwJSB7IHRvcDogLTIwMHB4OyB9XFxufVxcblxcbiNwYXRyb2wtc2hhcGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiA5MHB4O1xcbiAgICBoZWlnaHQ6IDYwcHg7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XFxuICAgIHRvcDogOTAlO1xcbiAgICBhbmltYXRpb246IG1vdmUtcmlnaHQtbGVmdCAxMHMgbGluZWFyIGluZmluaXRlO1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG4vKiBNQUlOIC0gR0FNRSAqL1xcblxcbi5wbGF5ZXJTaWRlIHtcXG4gICAgd2lkdGg6IDUwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBwYWRkaW5nOiA1JTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgICBnYXA6IDJlbTtcXG4gICAgbWFyZ2luLXRvcDogNWVtO1xcbn1cXG5cXG4uZ2FtZUhlYWRlciB7XFxuICAgIHdpZHRoOiA0NDBweDtcXG4gICAgZm9udC1zaXplOiAxLjVlbTtcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4jdXNlckdhbWVIZWFkZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkMxMTU5O1xcbn1cXG5cXG4jY29tcHV0ZXJHYW1lSGVhZGVye1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzI3RDk1O1xcbn1cXG5cXG4uZ2FtZWJvYXJkQ29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4ueEhlYWRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGp1c3RpZnktY29udGVudDogbGVmdDtcXG4gICAgcGFkZGluZy1sZWZ0OiAyLjVlbTtcXG59XFxuXFxuLnhIZWFkZXJTcXVhcmUge1xcbiAgICB3aWR0aDogMzhweDtcXG4gICAgaGVpZ2h0OiAzOHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBmb250LXNpemU6IDFlbTtcXG59XFxuXFxuLmJvdHRvbUJvYXJkIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4ueUhlYWRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbi55SGVhZGVyU3F1YXJlIHtcXG4gICAgd2lkdGg6IDM4cHg7XFxuICAgIGhlaWdodDogMzhweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgZm9udC1zaXplOiAxZW07XFxufVxcblxcbi55SGVhZGVyU2hpcHlhcmQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBmb250LXNpemU6IDFlbTtcXG4gICAgd3JpdGluZy1tb2RlOiB2ZXJ0aWNhbC1ybDtcXG4gICAgdGV4dC1vcmllbnRhdGlvbjogbWl4ZWQ7XFxuICAgIHJvdGF0ZTogMTgwZGVnO1xcbiAgICBtYXJnaW4tdG9wOiAxLjhlbTtcXG59XFxuXFxuLmdyaWRQYW5lbENvbnRhaW5lciB7XFxuICAgIHdpZHRoOiAzODBweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmdhbWVib2FyZEdyaWQge1xcbiAgICB3aWR0aDogMzgwcHg7XFxuICAgIGhlaWdodDogMzgwcHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG59XFxuXFxuI3VzZXJHYW1lYm9hcmRHcmlkIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbiN1c2VyR2FtZWJvYXJkR3JpZC5ibG9ja2VkIHtcXG4gICAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG5cXG4uZ2FtZWJvYXJkU3F1YXJlIHtcXG4gICAgd2lkdGg6IDM2cHg7XFxuICAgIGhlaWdodDogMzZweDtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggI2ZmZjtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgZm9udC1zaXplOiAxZW07XFxuICAgIGN1cnNvcjogaW5oZXJpdDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ExZGNmZjtcXG59XFxuXFxuI3VzZXJHYW1lYm9hcmRHcmlkIC5ob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM5OTk5OTk7XFxuICAgIG9wYWNpdHk6IDAuNztcXG59XFxuXFxuI3VzZXJHYW1lYm9hcmRHcmlkIC5vY2N1cGllZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM5OTk5OTk7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcblxcbiN1c2VyR2FtZWJvYXJkR3JpZCAuaG92ZXJMaW1pdHNFeGNlZWRlZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNjMjM0MzQ7XFxufVxcblxcbiNjb21wdXRlckdhbWVib2FyZEdyaWQgLmdhbWVib2FyZFNxdWFyZTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMxYjg4ZTc7XFxufVxcblxcbiNjb21wdXRlckdhbWVib2FyZEdyaWQuYmxvY2tlZCAuZ2FtZWJvYXJkU3F1YXJlOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ExZGNmZjtcXG4gICAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG5cXG4uZ2FtZWJvYXJkU3F1YXJlLm1pc3Mge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzIzNDM0O1xcbn1cXG5cXG4uZ2FtZWJvYXJkU3F1YXJlLm1pc3M6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzIzNDM0IWltcG9ydGFudDtcXG59XFxuXFxuLmdhbWVib2FyZFNxdWFyZS5oaXQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNENBRjUwO1xcbn1cXG5cXG4uZ2FtZWJvYXJkU3F1YXJlLmhpdDpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0Q0FGNTAhaW1wb3J0YW50O1xcbn1cXG5cXG4vKiBTSElQWUFSRCAqL1xcblxcbi5zdGF0dXNQYW5lbCB7XFxuICAgIHdpZHRoOiAzODJweDtcXG4gICAgaGVpZ2h0OiA3OHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxuICAgIG1hcmdpbi10b3A6IDM2cHg7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudChyZ2JhKDAsIDAsIDAsIDAuNSkgMnB4LCB0cmFuc3BhcmVudCAycHgpLCBsaW5lYXItZ3JhZGllbnQoOTBkZWcsIHJnYmEoMCwgMCwgMCwgMC41KSAycHgsIHRyYW5zcGFyZW50IDJweCk7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMzhweCAzOHB4O1xcbiAgICBnYXA6IDJweDtcXG59XFxuXFxuLmNhcnJpZXIge1xcbiAgICB3aWR0aDogMTg4cHg7XFxuICAgIGhlaWdodDogMzZweDtcXG59XFxuXFxuLmJhdHRsZXNoaXAge1xcbiAgICB3aWR0aDogMTUwcHg7XFxuICAgIGhlaWdodDogMzZweDtcXG59XFxuXFxuLnN1Ym1hcmluZSB7XFxuICAgIHdpZHRoOiAxMTJweDtcXG4gICAgaGVpZ2h0OiAzNnB4O1xcbn1cXG5cXG4uZGVzdHJveWVyIHtcXG4gICAgd2lkdGg6IDExMnB4O1xcbiAgICBoZWlnaHQ6IDM2cHg7XFxufVxcblxcbi5ib2F0IHtcXG4gICAgd2lkdGg6IDc0cHg7XFxuICAgIGhlaWdodDogMzZweDtcXG59XFxuXFxuLnVzZXJTaGlwIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBvcGFjaXR5OiAwLjc7XFxufVxcblxcbi51c2VyU2hpcDpob3ZlciB7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcblxcbi51c2VyU2hpcC5uby1ob3Zlcjpob3ZlciB7XFxuICAgIG9wYWNpdHk6IDAuNztcXG4gICAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG5cXG4udXNlclNoaXAuc2VsZWN0ZWQge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4udXNlclNoaXAucGxhY2VkIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG5cXG4uc2hpcC5zdW5rIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4uc2hpcC5zdW5rOjphZnRlciB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAycHg7XFxuICAgIGJhY2tncm91bmQ6IHJnYigyMzEsIDksIDkpO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGdsb3dpbmcge1xcbiAgICAwJSB7IGNvbG9yOiAjRkMxMTU5OyB9XFxuICAgIDUwJSB7IGNvbG9yOiAjMDAwOyB9XFxuICAgIDEwMCUgeyBjb2xvcjogI0ZDMTE1OTsgfVxcbiAgfVxcblxcbi5pbnN0cnVjdGlvbnMge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBmb250LXNpemU6IDAuOGVtO1xcbiAgICBsaW5lLWhlaWdodDogMS41ZW07XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYW5pbWF0aW9uOiBnbG93aW5nIDEuNXMgbGluZWFyIGluZmluaXRlO1xcbn1cXG5cXG4uYnV0dG9uc0NvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBnYXA6IDJlbTtcXG59XFxuXFxuLnBsYWNlbWVudEJ1dHRvbiB7XFxuICAgIHdpZHRoOiAxODBweDtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjZmZmO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNENBRjUwO1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgZm9udC1mYW1pbHk6ICdJQk0gUGxleCBNb25vJywgbW9ub3NwYWNlO1xcbiAgICBmb250LXNpemU6IDAuOGVtO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgIHBhZGRpbmc6IDFlbTtcXG59XFxuXFxuLnBsYWNlbWVudEJ1dHRvbjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzZThlNDE7XFxufVxcblxcbiNzdGFydC1nYW1lLWJ1dHRvbiB7XFxuICAgIHdpZHRoOiAxODBweDtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjZmZmO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNENBRjUwO1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgZm9udC1mYW1pbHk6ICdJQk0gUGxleCBNb25vJywgbW9ub3NwYWNlO1xcbiAgICBmb250LXNpemU6IDAuOGVtO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgIHBhZGRpbmc6IDFlbTtcXG59XFxuXFxuI3N0YXJ0LWdhbWUtYnV0dG9uOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzNlOGU0MTtcXG59XFxuXFxuLmNvbXB1dGVySW5mbyB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGZvbnQtc2l6ZTogMC44ZW07XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjVlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4jdmljdG9yeU1vZGFsIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICB6LWluZGV4OiAxO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB0b3A6IDA7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIG92ZXJmbG93OiBhdXRvO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsMCwwLDAuNCk7XFxuICB9XFxuICBcXG4gICN2aWN0b3J5TW9kYWwgPiBkaXYge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmZWZlO1xcbiAgICBwYWRkaW5nOiAyMHB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjODg4O1xcbiAgICB3aWR0aDogMzAlO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgfVxcblxcbiNtb2RhbC10ZXh0IHtcXG4gICAgZm9udC1mYW1pbHk6ICdJQk0gUGxleCBNb25vJywgbW9ub3NwYWNlO1xcbiAgICBmb250LXNpemU6IDAuOGVtO1xcbiAgICBsaW5lLWhlaWdodDogMS41ZW07XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuI21vZGFsLWJ1dHRvbiB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRDQUY1MDsgLyogVmVyZGUgKi9cXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG59XFxuXFxuI21vZGFsLWJ1dHRvbjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzZThlNDE7XFxufVxcblxcbi8qIEZPT1RFUiAqL1xcblxcbiNmb290ZXIge1xcbiAgICBoZWlnaHQ6IDEwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzQ3NDc0NztcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYm9yZGVyLXRvcDogc29saWQgMXB4ICMwMDA7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICB6LWluZGV4OiAzO1xcbn1cXG5cXG4uY3JlZGl0cyB7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBmb250LWZhbWlseTogJ0lCTSBQbGV4IE1vbm8nLCBtb25vc3BhY2U7XFxuICAgIGZvbnQtc2l6ZTogMC44ZW07XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLyogU3R5bGUgdGhlIGxpbmsgdG8gcmVtb3ZlIGRlZmF1bHQgc3R5bGluZyAqL1xcbi5naXRodWItbGluayB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICBjb2xvcjogaW5oZXJpdDtcXG59XFxuXFxuLyogQWRkIHRoZSBob3ZlciBlZmZlY3QgKi9cXG4uZ2l0aHViLWljb24ge1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC41cyBlYXNlLWluLW91dDsgLyogQWRkIGEgdHJhbnNpdGlvbiBmb3IgdGhlIHRyYW5zZm9ybSBwcm9wZXJ0eSAqL1xcbn1cXG5cXG4uZ2l0aHViLWxpbms6aG92ZXIgLmdpdGh1Yi1pY29uIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTsgLyogUm90YXRlIHRoZSBpY29uIDE4MCBkZWdyZWVzIHdoZW4gaG92ZXJlZCAqL1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCI1YTY5MmQ5ZmQyZmI4YzM0MmJlY2U0YzI2NDFhNTFjZC5zdmdcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZjA0ZGY3MWQ3YzFkNzg2ZGFhZjBiNzRiNGMwNmFjZmUuc3ZnXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjIzZGU4NTgxYzlhNjU4NDZhYWExMGJhMDFlYWZmNmIwLnN2Z1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCI2ZWY5NTdjOGZjOWYyNDE3OTRhNGNjOGFmNjNkZWIzMS5zdmdcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiMGUyYjA3ODI2ODlmZTczYmYxZDAyODc4NTBjODcwODguc3ZnXCI7IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiXSwibmFtZXMiOlsiR2FtZWJvYXJkIiwiX2JvYXJkIiwiQXJyYXkiLCJmaWxsIiwiX3NoaXBzIiwiX2dhbWVvdmVyIiwiZ2V0Qm9hcmQiLCJnZXRTaGlwcyIsImdldEdhbWVPdmVyIiwic2V0R2FtZU92ZXIiLCJnZXRTcXVhcmUiLCJzcXVhcmUiLCJzZXRTcXVhcmUiLCJudW0iLCJ2YWx1ZSIsInNldFNoaXAiLCJzaGlwIiwicHVzaCIsImlzU2FtZUxpbmUiLCJ4IiwieSIsIk1hdGgiLCJmbG9vciIsImlzVmFsaWROZXh0U3F1YXJlIiwiY3VycmVudCIsIm5leHQiLCJkaXJlY3Rpb24iLCJpc0VtcHR5U3F1YXJlIiwiZ2V0TmV4dFBvc2l0aW9uIiwiY3VycmVudFBvcyIsInBsYWNlU2hpcCIsInN0YXJ0UG9zIiwibmV4dFBvcyIsInZhbGlkUG9zQXJyYXkiLCJpIiwiZ2V0TGVuZ3RoIiwiZXJyb3IiLCJsZW5ndGgiLCJnZXROYW1lIiwiZGF0YSIsInN1Y2Nlc3MiLCJmaW5kU2hpcCIsInNoaXBOYW1lIiwiZmluZCIsInMiLCJjaGVja0dhbWVPdmVyIiwiZGVsZXRlU2hpcCIsImluZGV4IiwiZmluZEluZGV4Iiwic3BsaWNlIiwicmVjZWl2ZUF0dGFjayIsInNxdWFyZU51bWJlciIsInJlc3VsdCIsInR5cGUiLCJzdW5rIiwiZ2FtZW92ZXIiLCJkYW1hZ2VkU2hpcCIsImhpdCIsImlzU3VuayIsInZpZXciLCJQbGF5ZXIiLCJsb2FkTWFpblVJIiwibG9hZEdhbWVVSSIsInVzZXIiLCJjb21wdXRlciIsInBsYWNlU2hpcHNSYW5kb21seSIsIm9uTWFudWFsUGxhY2VtZW50Q2xpY2siLCJvblJhbmRvbVBsYWNlbWVudENsaWNrIiwibG9hZFVzZXJHYW1lYm9hcmQiLCJnZXRHYW1lQm9hcmQiLCJkZWxldGVVc2VyR2FtZWJvYXJkRXZlbnRMaXN0ZW5lcnMiLCJvblVzZXJCb2FyZENsaWNrIiwic3F1YXJlTnVtIiwib3JpZW50YXRpb24iLCJyZXMiLCJzaG93VXNlckluZm8iLCJ1cGRhdGVVc2VyR2FtZWJvYXJkU2hpcFBsYWNlbWVudCIsInNxdWFyZXMiLCJ1cGRhdGVVc2VyU2hpcHlhcmQiLCJvbkNvbXB1dGVyQm9hcmRDbGljayIsIm1hbnVhbEF0dGFjayIsInNob3dDb21wdXRlckluZm8iLCJhdHRhY2tSZXMiLCJ1cGRhdGVDb21wdXRlclNoaXB5YXJkIiwic2hvd1ZpY3RvcnlNb2RhbCIsInVwZGF0ZUNvbXB1dGVyR2FtZWJvYXJkIiwibG9hZENvdmVyTWFpblVJIiwiU2hpcCIsIl9nYW1lQm9hcmQiLCJfdHlwZSIsIl9hdmFpbGFibGVBdHRhY2tzIiwiZnJvbSIsIl8iLCJnZXRQbGF5ZXJUeXBlIiwiZ2V0U2hpcEF0UG9zIiwicG9zIiwiZ2V0U2hpcEJ5TmFtZSIsIm5hbWUiLCJkZWxldGVTaGlwQnlOYW1lIiwiZ2V0QXZhaWxhYmxlQXR0YWNrcyIsImdldEF0dGFja0F0UG9zIiwiZ2V0SW5kZXhPZkF0dGFjayIsImluZGV4T2YiLCJpc1ZhbGlkQXR0YWNrIiwiaW5jbHVkZXMiLCJnZXRSYW5kb21EaXJlY3Rpb24iLCJyYW5kb20iLCJzaHVmZmxlQXJyYXkiLCJhcnJheSIsInNodWZmbGVkQXJyYXkiLCJqIiwic3RhcnRQb3NpdGlvbkNhbmRpZGF0ZXMiLCJzaHVmZmxlZFBvc2l0aW9ucyIsInBvcCIsImdlbmVyYXRlUmFuZG9tSW5kZXgiLCJkZWxldGVGcm9tQXZhaWxhYmxlQXR0YWNrcyIsImdlbmVyYXRlQXV0b0F0dGFjayIsIl9uYW1lIiwiX2xlbmd0aCIsIl9oaXRzIiwiX3N1bmsiLCJnZXRIaXRzIiwiY2FycmllclN2ZyIsInN1Ym1hcmluZVN2ZyIsImJhdHRsZXNoaXBTdmciLCJkZXN0cm95ZXJTdmciLCJwYXRyb2xTdmciLCJzZWxlY3RlZFNoaXBMZW5ndGgiLCJzZWxlY3RlZFNoaXBOYW1lIiwicGxhY2VkU2hpcHNDb3VudGVyIiwiY3JlYXRlRWxlbWVudCIsInRhZyIsImNsYXNzTmFtZSIsImlkIiwiZWxlbWVudCIsImRvY3VtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0QXR0cmlidXRlIiwiZ2V0RWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwiZGVsZXRlTWFpblVJIiwibWFpbiIsImlubmVySFRNTCIsImluZm8iLCJpbnN0cnVjdGlvbnMiLCJxdWVyeVNlbGVjdG9yIiwidGV4dENvbnRlbnQiLCJjb21wdXRlckluZm8iLCJoYW5kbGVTaGlwQ2xpY2siLCJjb250YWlucyIsInNlbGVjdGVkU2hpcCIsInJlbW92ZSIsInVzZXJTaWRlIiwiY29tcHV0ZXJTaWRlIiwiYXBwZW5kQ2hpbGQiLCJ1c2VySGVhZGVyIiwiY29tcHV0ZXJIZWFkZXIiLCJ1c2VyVGl0bGUiLCJjb21wdXRlclRpdGxlIiwidXNlckdhbWVib2FyZENvbnRhaW5lciIsImNvbXB1dGVyR2FtZWJvYXJkQ29udGFpbmVyIiwidXNlclhIZWFkZXIiLCJjb21wdXRlclhIZWFkZXIiLCJ1c2VyWEhlYWRlclNxdWFyZSIsImNvbXB1dGVyWEhlYWRlclNxdWFyZSIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsInVzZXJCb3R0b21Cb2FyZCIsImNvbXB1dGVyQm90dG9tQm9hcmQiLCJ1c2VyWUhlYWRlciIsImNvbXB1dGVyWUhlYWRlciIsInVzZXJZSGVhZGVyU3F1YXJlIiwiY29tcHV0ZXJZSGVhZGVyU3F1YXJlIiwidXNlcllIZWFkZXJTaGlweWFyZCIsImNvbXB1dGVyWUhlYWRlclNoaXB5YXJkIiwidXNlckdyaWRQYW5lbENvbnRhaW5lciIsImNvbXB1dGVyR3JpZFBhbmVsQ29udGFpbmVyIiwidXNlckdhbWVib2FyZCIsImNvbXB1dGVyR2FtZWJvYXJkIiwidXNlckdhbWVib2FyZFNxdWFyZSIsImNvbXB1dGVyR2FtZWJvYXJkU3F1YXJlIiwidXNlclN0YXR1c1BhbmVsIiwiY29tcHV0ZXJTdGF0dXNQYW5lbCIsInVzZXJDYXJyaWVyIiwidXNlckJhdHRsZXNoaXAiLCJ1c2VyRGVzdHJveWVyIiwidXNlclN1Ym1hcmluZSIsInVzZXJCb2F0IiwiY29tcHV0ZXJDYXJyaWVyIiwiY29tcHV0ZXJCYXR0bGVzaGlwIiwiY29tcHV0ZXJEZXN0cm95ZXIiLCJjb21wdXRlclN1Ym1hcmluZSIsImNvbXB1dGVyQm9hdCIsImJ1dHRvbnNDb250YWluZXIiLCJtYW51YWxCdXR0b24iLCJyYW5kb21CdXR0b24iLCJtb2RhbCIsIm1vZGFsQ29udGVudCIsIm1vZGFsVGV4dCIsInJlc3RhcnRCdXR0b24iLCJhZGRFdmVudExpc3RlbmVyIiwibG9jYXRpb24iLCJyZWxvYWQiLCJjYWxsYmFjayIsInVzZXJHYW1lYm9hcmRHcmlkIiwidXNlckJvYXJkU3F1YXJlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwicGFyc2VJbnQiLCJnZXRBdHRyaWJ1dGUiLCJjb21wdXRlckdhbWVib2FyZEdyaWQiLCJjb21wdXRlckJvYXJkU3F1YXJlcyIsInVzZXJTaGlwcyIsImV2ZW50Iiwic2libGluZ3NUb0NvbG9yIiwic3RhcnQiLCJyb3dTdGFydCIsInJvd0VuZCIsImV4cGVjdGVkRW5kIiwic2xpY2UiLCJzaWJsaW5nIiwiZSIsImtleSIsInNob3dTdGFydEdhbWVCdXR0b24iLCJzdGFydEdhbWVCdXR0b24iLCJnYW1lYm9hcmQiLCJsb2FkTWFpblVJQ2FsbGJhY2siLCJzY3JlZW4iLCJib2R5IiwiaGVhZGVyIiwiZm9vdGVyIiwidGl0bGUiLCJjcmVkaXRzIiwiZ2xvd2luZ0J1dHRvbiIsImNhcnJpZXJTaGFwZSIsInN1Ym1hcmluZVNoYXBlIiwiYmF0dGxlc2hpcFNoYXBlIiwiZGVzdHJveWVyU2hhcGUiLCJwYXRyb2xTaGFwZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJhcnJheU9mU3F1YXJlcyIsInVzZXJCb2FyZFNxdWFyZSIsInNoaXBEaXYiLCJhdHRhY2tSZXN1bHQiLCJjb21wdXRlckJvYXJkU3F1YXJlIiwid2lubmVyIiwic3R5bGUiLCJkaXNwbGF5Il0sInNvdXJjZVJvb3QiOiIifQ==