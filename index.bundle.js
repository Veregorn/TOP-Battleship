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

    // Its computer turn - Block computer board
    _view__WEBPACK_IMPORTED_MODULE_1__.view.toggleComputerBoardStatus();
    const square = computer.generateAutoAttack();
    const attackRes = user.getGameBoard().receiveAttack(square);

    // If "receiveAttack" returns an error, show it
    if (attackRes.error) {
      _view__WEBPACK_IMPORTED_MODULE_1__.view.showComputerInfo(attackRes.error);
      _view__WEBPACK_IMPORTED_MODULE_1__.view.showUserInfo("");
    } else {
      // If not, read the result

      // If the attack was a hit, show it
      if (attackRes.type === "ShipHit") {
        _view__WEBPACK_IMPORTED_MODULE_1__.view.showComputerInfo("I hit a ship!");
        _view__WEBPACK_IMPORTED_MODULE_1__.view.showUserInfo("Oh no! One of your ships has been hit!");

        // If the ship was sunk, show it
        if (attackRes.sunk !== "") {
          _view__WEBPACK_IMPORTED_MODULE_1__.view.showComputerInfo("I sunk a ship!");
          _view__WEBPACK_IMPORTED_MODULE_1__.view.showUserInfo(`Your ${attackRes.sunk} is sunk now!`);
          _view__WEBPACK_IMPORTED_MODULE_1__.view.updateUserShipyardAfterComputerAttack(attackRes.sunk);

          // If all ships are sunk, finish the game
          if (user.getGameBoard().getGameOver()) {
            _view__WEBPACK_IMPORTED_MODULE_1__.view.showVictoryModal("Computer");
          }
        }
      } else if (attackRes.type === "Miss") {
        // If not, show a miss

        _view__WEBPACK_IMPORTED_MODULE_1__.view.showComputerInfo("I missed!");
        _view__WEBPACK_IMPORTED_MODULE_1__.view.showUserInfo("Phew! That was close!");
      }

      // Update user board
      _view__WEBPACK_IMPORTED_MODULE_1__.view.updateUserGameboard(square, attackRes.type);
    }

    // Its user turn - Unblock computer board
    _view__WEBPACK_IMPORTED_MODULE_1__.view.toggleComputerBoardStatus();
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

  // Toggle computer board status between blocked and unblocked
  function toggleComputerBoardStatus() {
    const computerGameboardGrid = getElement("computerGameboardGrid");
    if (computerGameboardGrid.classList.contains("blocked")) {
      computerGameboardGrid.classList.remove("blocked");
    } else {
      computerGameboardGrid.classList.add("blocked");
    }
  }

  // Toggle user board status between blocked and unblocked
  function toggleUserBoardStatus() {
    const userGameboardGrid = getElement("userGameboardGrid");
    if (userGameboardGrid.classList.contains("blocked")) {
      userGameboardGrid.classList.remove("blocked");
    } else {
      userGameboardGrid.classList.add("blocked");
    }
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
      toggleUserBoardStatus(); // Block user board

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
      toggleComputerBoardStatus();

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
      toggleUserBoardStatus();

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
      toggleUserBoardStatus();
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

  // Updates user gameboard when an attack is made
  function updateUserGameboard(squareNum, attackResult) {
    const userBoardSquare = document.querySelector(`#userGameboardGrid .gameboardSquare[data-index="${squareNum}"]`);
    if (attackResult === "Miss") {
      userBoardSquare.classList.add("miss");
    } else if (attackResult === "ShipHit") {
      userBoardSquare.classList.add("hit");
    }
  }

  // Updates computer shipyard when a ship is sunk
  function updateComputerShipyard(shipName) {
    const shipDiv = document.querySelector(`#computerStatusPanel .${shipName}`);
    shipDiv.classList.add("sunk");
  }

  // Updates user shipyard when a ship is sunk
  function updateUserShipyardAfterComputerAttack(shipName) {
    const shipDiv = document.querySelector(`#userStatusPanel .${shipName}`);
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
    showVictoryModal,
    toggleComputerBoardStatus,
    toggleUserBoardStatus,
    updateUserShipyardAfterComputerAttack,
    updateUserGameboard
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxXQUFXLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSyxVQUFVLFVBQVUsT0FBTyxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSyxVQUFVLFVBQVUsT0FBTyxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlB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SztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy92aWV3LmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvYXNzZXRzL2dyYXBoaWNzL2JhdHRsZXNoaXAuc3ZnIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2Fzc2V0cy9ncmFwaGljcy9jYXJyaWVyLnN2ZyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9hc3NldHMvZ3JhcGhpY3MvZGVzdHJveWVyLnN2ZyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9hc3NldHMvZ3JhcGhpY3MvcGF0cm9sLWJvYXQuc3ZnIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2Fzc2V0cy9ncmFwaGljcy9zdWJtYXJpbmUuc3ZnIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9pbmRleC5jc3M/NjM0OSIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEZhY3RvcnkgcmVwcmVzZW50aW5nIGEgZ2FtZSBib2FyZCBpbiB0aGUgZ2FtZVxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuXG4gICAgY29uc3QgX2JvYXJkID0gQXJyYXkoMTAwKS5maWxsKFwiV2F0ZXJcIikgLy8gQXJyYXkgb2YgMTAwIHNxdWFyZXMgcmVwcmVzZW50aW5nIHRoZSBnYW1lIGJvYXJkXG4gICAgY29uc3QgX3NoaXBzID0gW10gLy8gQXJyYXkgb2Ygc2hpcHMgb24gdGhlIGJvYXJkXG4gICAgbGV0IF9nYW1lb3ZlciA9IGZhbHNlXG5cbiAgICAvLyBHZXQgdGhlIGJvYXJkIGFycmF5XG4gICAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBfYm9hcmRcbiAgICBcbiAgICAvLyBHZXQgdGhlIHNoaXBzIGFycmF5XG4gICAgY29uc3QgZ2V0U2hpcHMgPSAoKSA9PiBfc2hpcHNcblxuICAgIC8vIEdldCBpZiB0aGUgZ2FtZSBpcyBvdmVyXG4gICAgY29uc3QgZ2V0R2FtZU92ZXIgPSAoKSA9PiBfZ2FtZW92ZXJcblxuICAgIC8vIFNldCBHYW1lIE92ZXJcbiAgICBjb25zdCBzZXRHYW1lT3ZlciA9ICgpID0+IHtcbiAgICAgICAgX2dhbWVvdmVyID0gdHJ1ZVxuICAgIH1cblxuICAgIC8vIEdldCBhIFNxdWFyZVxuICAgIGNvbnN0IGdldFNxdWFyZSA9IChzcXVhcmUpID0+IF9ib2FyZFtzcXVhcmVdXG5cbiAgICAvLyBTZXQgYSBTcXVhcmVcbiAgICBjb25zdCBzZXRTcXVhcmUgPSAobnVtLHZhbHVlKSA9PiB7XG4gICAgICAgIF9ib2FyZFtudW1dID0gdmFsdWVcbiAgICB9XG5cbiAgICAvLyBTZXQgYSBzaGlwIGluIHRoZSBhcnJheSBvZiBzaGlwc1xuICAgIGNvbnN0IHNldFNoaXAgPSAoc2hpcCkgPT4gZ2V0U2hpcHMoKS5wdXNoKHNoaXApXG5cbiAgICAvLyBSZXR1cm4gdHJ1ZSBpZiB0d28gc3F1YXJlcyBhcmUgaW4gdGhlIHNhbWUgbGluZSBpbiB0aGUgYm9hcmRcbiAgICBjb25zdCBpc1NhbWVMaW5lID0gKHgseSkgPT4gTWF0aC5mbG9vcih4IC8gMTApID09PSBNYXRoLmZsb29yKHkgLyAxMClcblxuICAgIC8vIFJldHVybiB0cnVlIGlmIG5leHQgc3F1YXJlIGlzIGluIHRoZSBzYW1lIGxpbmUgb3IgY29sdW1uIHRoYXQgcHJldmlvdXMgb25lXG4gICAgY29uc3QgaXNWYWxpZE5leHRTcXVhcmUgPSAoY3VycmVudCxuZXh0LGRpcmVjdGlvbikgPT4gXG4gICAgICAgIGRpcmVjdGlvbiA9PT0gXCJ4XCIgPyBpc1NhbWVMaW5lKG5leHQsIGN1cnJlbnQpIDogbmV4dCA8PSA5OVxuXG4gICAgLy8gUmV0dXJuIHRydWUgaWYgYSBzcXVhcmUgaXMgZW1wdHkgKG5vIG90aGVyIHNoaXAgaXMgcGxhY2VkIHRoZXJlKVxuICAgIGNvbnN0IGlzRW1wdHlTcXVhcmUgPSAoc3F1YXJlKSA9PiBcbiAgICAgICAgZ2V0U3F1YXJlKHNxdWFyZSkgPT09IFwiV2F0ZXJcIlxuXG4gICAgLy8gR2V0cyBuZXh0IHBvc2l0aW9uIGluIHRoZSBib2FyZCBkZXBlbmRpbmcgb24gc2hpcCBkaXJlY3Rpb24gcGxhY2VtZW50XG4gICAgY29uc3QgZ2V0TmV4dFBvc2l0aW9uID0gKGN1cnJlbnRQb3MsZGlyZWN0aW9uKSA9PiBcbiAgICAgICAgZGlyZWN0aW9uID09PSBcInhcIiA/IGN1cnJlbnRQb3MgKyAxIDogY3VycmVudFBvcyArIDEwXG5cbiAgICAvLyBQbGFjZXMgYSBzaGlwXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXAsc3RhcnRQb3MsZGlyZWN0aW9uKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBsZXQgbmV4dFBvcyA9IHN0YXJ0UG9zXG4gICAgICAgIGNvbnN0IHZhbGlkUG9zQXJyYXkgPSBbXVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHNoaXAuZ2V0TGVuZ3RoKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBUZXN0IGlmIHRoZSBuZXh0IHBvc2l0aW9uIGlzIHZhbGlkXG4gICAgICAgICAgICBpZiAoIWlzVmFsaWROZXh0U3F1YXJlKHN0YXJ0UG9zLG5leHRQb3MsZGlyZWN0aW9uKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBcIllvdSBhcmUgZXhjZWVkaW5nIHRoZSBsaW1pdHMgb2YgdGhlIGJvYXJkXCIgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUZXN0IGlmIHRoYXQgc3F1YXJlIGlzIGVtcHR5IChubyBvdGhlciBzaGlwIHBsYWNlZCB0aGVyZSlcbiAgICAgICAgICAgIGlmICghaXNFbXB0eVNxdWFyZShuZXh0UG9zKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBcIlRoYXQgc3F1YXJlIGlzIG5vdCBlbXB0eVwiIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gSW5zZXJ0IHRoZSB2YWxpZCBwb3NpdGlvbiBpbnRvIG91ciB0ZW1wIGFycmF5XG4gICAgICAgICAgICB2YWxpZFBvc0FycmF5LnB1c2gobmV4dFBvcylcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gVXBkYXRlIHBvc2l0aW9uXG4gICAgICAgICAgICBuZXh0UG9zID0gZ2V0TmV4dFBvc2l0aW9uKG5leHRQb3MsZGlyZWN0aW9uKVxuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXQgc3F1YXJlIHN0cmluZyB0byBzaGlwIG5hbWUgZm9yIGVhY2ggdmFsdWUgaW4gdGhlIHRlbXAgYXJyYXlcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWxpZFBvc0FycmF5Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBzZXRTcXVhcmUodmFsaWRQb3NBcnJheVtpXSxzaGlwLmdldE5hbWUoKSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFBsYWNlIHRoZSBzaGlwIGluIHRoZSBhcnJheSBvZiBzaGlwc1xuICAgICAgICBzZXRTaGlwKHNoaXApXG5cbiAgICAgICAgLy8gUmV0dXJuIGEgc3VjY2VzcyBtZXNzYWdlIGFuZCB0aGUgYXJyYXkgb2YgdmFsaWQgcG9zaXRpb25zXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiB2YWxpZFBvc0FycmF5LFxuICAgICAgICAgICAgc3VjY2VzczogYEEgJHtzaGlwLmdldE5hbWUoKX0gaGFzIGJlZW4gcGxhY2VkYFxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvLyBGaW5kIGFuZCByZXR1cm4gYSBTaGlwIGluIHRoZSBib2FyZFxuICAgIGNvbnN0IGZpbmRTaGlwID0gKHNoaXBOYW1lKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzaGlwID0gZ2V0U2hpcHMoKS5maW5kKHMgPT4gcy5nZXROYW1lKCkgPT09IHNoaXBOYW1lKVxuICAgICAgICBcbiAgICAgICAgLy8gSWYgbm8gc2hpcCBmb3VuZCwgcmV0dXJucyBhbiBlcnJvclxuICAgICAgICBpZiAoIXNoaXApIHtcbiAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBcIk5vIHNoaXAgZm91bmQgd2l0aCB0aGF0IG5hbWVcIiB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2hpcFxuXG4gICAgfVxuXG4gICAgLy8gQ2hlY2tzIGlmIHRoZSBnYW1lIGlzIG92ZXJcbiAgICBjb25zdCBjaGVja0dhbWVPdmVyID0gKCkgPT4ge1xuICAgICAgICBpZiAoZ2V0U2hpcHMoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHNldEdhbWVPdmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEZWxldGUgYSBzaGlwIGZyb20gdGhlIHNoaXBzIGFycmF5XG4gICAgY29uc3QgZGVsZXRlU2hpcCA9IChzaGlwTmFtZSkgPT4ge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgaW5kZXggPSBnZXRTaGlwcygpLmZpbmRJbmRleChzID0+IHMuZ2V0TmFtZSgpID09PSBzaGlwTmFtZSlcblxuICAgICAgICAvLyBJZiBubyBzaGlwIGZvdW5kLCByZXR1cm5zIGFuIGVycm9yXG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBcIlRoZXJlIGlzIG5vIHNoaXAgd2l0aCB0aGF0IG5hbWUgdG8gZGVsZXRlXCIgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBnZXRTaGlwcygpLnNwbGljZShpbmRleCwxKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgZ2FtZSBpcyBvdmVyXG4gICAgICAgIGNoZWNrR2FtZU92ZXIoKVxuXG4gICAgICAgIC8vIFJldHVybiBhIHN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBgU2hpcCBuYW1lZCBcIiR7c2hpcE5hbWV9XCIgaGFzIGJlZW4gZGVsZXRlZGAgfVxuXG4gICAgfVxuXG4gICAgLy8gdGFrZXMgYSBzcXVhcmUgbnVtYmVyLCBkZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRoZSBhdHRhY2sgaGl0IGEgc2hpcCBhbmQgdGhlbiBcbiAgICAvLyBzZW5kcyB0aGUg4oCYaGl04oCZIGZ1bmN0aW9uIHRvIHRoZSBjb3JyZWN0IHNoaXAsIG9yIHJlY29yZHMgdGhlIGNvb3JkaW5hdGVzIFxuICAgIC8vIG9mIHRoZSBtaXNzZWQgc2hvdFxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoc3F1YXJlTnVtYmVyKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzcXVhcmUgPSBnZXRTcXVhcmUoc3F1YXJlTnVtYmVyKVxuICAgICAgICBjb25zdCByZXN1bHQgPSB7dHlwZTogXCJcIiwgc3VjY2VzczogXCJcIiwgZXJyb3I6IFwiXCIsIHN1bms6IFwiXCIsIGdhbWVvdmVyOiBmYWxzZX1cblxuICAgICAgICAvLyBBdHRhY2sgZmFpbHNcbiAgICAgICAgaWYgKHNxdWFyZSA9PT0gXCJXYXRlclwiKSB7XG4gICAgICAgICAgICByZXN1bHQudHlwZSA9IFwiTWlzc1wiXG4gICAgICAgICAgICBzZXRTcXVhcmUoc3F1YXJlTnVtYmVyLHJlc3VsdC50eXBlKVxuICAgICAgICAgICAgcmVzdWx0LnN1Y2Nlc3MgPSBcIkhhaGFoYSEgQmV0dGVyIGx1Y2sgbmV4dCB0aW1lIVwiXG4gICAgICAgIH0gZWxzZSBpZiAoc3F1YXJlID09PSBcIk1pc3NcIiB8fCBzcXVhcmUgPT09IFwiU2hpcEhpdFwiKSB7IC8vIEludmFsaWQgYXR0YWNrIHJlY2VpdmVkXG4gICAgICAgICAgICByZXN1bHQuZXJyb3IgPSBcIlRoaXMgc3F1YXJlIHdhcyBhbHJlYWR5IGF0dGFja2VkIVwiXG4gICAgICAgIH0gZWxzZSB7IC8vIEF0dGFjayBoaXRzXG4gICAgICAgICAgICBjb25zdCBkYW1hZ2VkU2hpcCA9IGZpbmRTaGlwKHNxdWFyZSlcbiAgICAgICAgICAgIHJlc3VsdC50eXBlID0gXCJTaGlwSGl0XCJcbiAgICAgICAgICAgIHNldFNxdWFyZShzcXVhcmVOdW1iZXIscmVzdWx0LnR5cGUpXG4gICAgICAgICAgICBkYW1hZ2VkU2hpcC5oaXQoKVxuICAgICAgICAgICAgcmVzdWx0LnN1Y2Nlc3MgPSBcIkFyZ2doISBZb3UgaGl0IG15IHNoaXAhXCJcblxuICAgICAgICAgICAgLy8gTmVlZCB0byB0ZXN0IGlmIHNoaXAgaXMgc3Vua1xuICAgICAgICAgICAgaWYgKGRhbWFnZWRTaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmVzdWx0LnN1bmsgPSBkYW1hZ2VkU2hpcC5nZXROYW1lKClcbiAgICAgICAgICAgICAgICBkZWxldGVTaGlwKGRhbWFnZWRTaGlwLmdldE5hbWUoKSlcbiAgICAgICAgICAgICAgICBjaGVja0dhbWVPdmVyKClcblxuICAgICAgICAgICAgICAgIC8vIElmIGdhbWUgaXMgb3ZlciwgcmV0dXJuIHRoYXQgaW4gdGhlIHJlc3VsdFxuICAgICAgICAgICAgICAgIGlmIChnZXRHYW1lT3ZlcigpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5nYW1lb3ZlciA9IHRydWVcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0R2FtZU92ZXIsXG4gICAgICAgIGdldFNxdWFyZSxcbiAgICAgICAgcGxhY2VTaGlwLFxuICAgICAgICBmaW5kU2hpcCxcbiAgICAgICAgcmVjZWl2ZUF0dGFjayxcbiAgICAgICAgZ2V0U2hpcHMsXG4gICAgICAgIGdldEJvYXJkXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZCIsImltcG9ydCBcIi4vc3R5bGVzL2luZGV4LmNzc1wiXG5pbXBvcnQgeyB2aWV3IH0gZnJvbSBcIi4vdmlld1wiXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiXG5cbi8vIEZ1bmN0aW9uIHRvIGxvYWQgdGhlIG1haW4gVUlcbmZ1bmN0aW9uIGxvYWRNYWluVUkoKSB7XG4gICAgXG4gICAgLy8gTG9hZCB0aGUgbWFpbiBVSVxuICAgIHZpZXcubG9hZEdhbWVVSSgpXG5cbiAgICBjb25zdCB1c2VyID0gUGxheWVyKFwiSHVtYW5cIilcbiAgICBjb25zdCBjb21wdXRlciA9IFBsYXllcihcIkFJXCIpXG5cbiAgICAvLyBQbGFjZSBjb21wdXRlciBzaGlwc1xuICAgIGNvbXB1dGVyLnBsYWNlU2hpcHNSYW5kb21seSgpXG5cbiAgICAvLyBNYW5hZ2UgbWFudWFsIHBsYWNlbWVudCBidXR0b25cbiAgICB2aWV3Lm9uTWFudWFsUGxhY2VtZW50Q2xpY2soKVxuXG4gICAgLy8gTWFuYWdlIHJhbmRvbSBwbGFjZW1lbnQgYnV0dG9uXG4gICAgdmlldy5vblJhbmRvbVBsYWNlbWVudENsaWNrKCAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICB1c2VyLnBsYWNlU2hpcHNSYW5kb21seSgpIC8vIFBsYWNlIHVzZXIgc2hpcHMgcmFuZG9tbHlcbiAgICAgICAgdmlldy5sb2FkVXNlckdhbWVib2FyZCh1c2VyLmdldEdhbWVCb2FyZCgpLmdldEJvYXJkKCkpIC8vIExvYWQgdXNlciBib2FyZFxuICAgICAgICAvLyBEZWxldGUgRXZlbnQgTGlzdGVuZXJzIGFzc29jaWF0ZWQgd2l0aCB1c2VyIGdhbWVib2FyZFxuICAgICAgICB2aWV3LmRlbGV0ZVVzZXJHYW1lYm9hcmRFdmVudExpc3RlbmVycygpXG4gICAgICAgIC8vIHZpZXcubG9hZFVzZXJTaGlwc0luZm8odXNlci5nZXRTaGlwcygpKVxuXG4gICAgfSlcblxuICAgIC8vIFdhaXQgZm9yIHVzZXIgdG8gY2xpY2sgb24gYSBzcXVhcmVcbiAgICB2aWV3Lm9uVXNlckJvYXJkQ2xpY2soIChzcXVhcmVOdW0sIHNoaXBOYW1lLCBvcmllbnRhdGlvbikgPT4ge1xuICAgICAgICBcbiAgICAgICAgLy8gUGxhY2UgdXNlciBzaGlwXG4gICAgICAgIGNvbnN0IHJlcyA9IHVzZXIucGxhY2VTaGlwKHNxdWFyZU51bSwgc2hpcE5hbWUsIG9yaWVudGF0aW9uKVxuXG4gICAgICAgIC8vIGlmIFwicGxhY2VTaGlwIHJldHVybnMgYW4gZXJyb3IsIHNob3cgaXRcIlxuICAgICAgICBpZiAocmVzLmVycm9yKSB7XG4gICAgICAgICAgICB2aWV3LnNob3dVc2VySW5mbyhyZXMuZXJyb3IpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2aWV3LnNob3dVc2VySW5mbyhyZXMuc3VjY2VzcykgLy8gU2hvdyBzdWNjZXNzIG1lc3NhZ2VcbiAgICAgICAgICAgIHZpZXcudXBkYXRlVXNlckdhbWVib2FyZFNoaXBQbGFjZW1lbnQocmVzLnNxdWFyZXMpIC8vIFVwZGF0ZSB1c2VyIGJvYXJkXG4gICAgICAgICAgICB2aWV3LnVwZGF0ZVVzZXJTaGlweWFyZChzaGlwTmFtZSkgLy8gVXBkYXRlIHVzZXIgc2hpcHlhcmRcbiAgICAgICAgfVxuXG4gICAgfSlcblxuICAgIC8vIFdhaXQgZm9yIHVzZXIgdG8gY2xpY2sgb24gYSBzcXVhcmUgdG8gYXR0YWNrXG4gICAgdmlldy5vbkNvbXB1dGVyQm9hcmRDbGljayggKHNxdWFyZU51bSkgPT4ge1xuXG4gICAgICAgIC8vIEF0dGFjayB0aGUgc3F1YXJlXG4gICAgICAgIGNvbnN0IHJlcyA9IHVzZXIubWFudWFsQXR0YWNrKHNxdWFyZU51bSlcblxuICAgICAgICAvLyBJZiBcIm1hbnVhbEF0dGFja1wiIHJldHVybnMgYW4gZXJyb3IsIHNob3cgaXRcbiAgICAgICAgaWYgKHJlcy5lcnJvcikge1xuICAgICAgICAgICAgdmlldy5zaG93VXNlckluZm8ocmVzLmVycm9yKVxuICAgICAgICAgICAgdmlldy5zaG93Q29tcHV0ZXJJbmZvKFwiXCIpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGF0dGFja1JlcyA9IGNvbXB1dGVyLmdldEdhbWVCb2FyZCgpLnJlY2VpdmVBdHRhY2soc3F1YXJlTnVtKSAvLyBBdHRhY2sgY29tcHV0ZXIgYm9hcmRcblxuICAgICAgICAgICAgLy8gSWYgXCJyZWNlaXZlQXR0YWNrXCIgcmV0dXJucyBhbiBlcnJvciwgc2hvdyBpdFxuICAgICAgICAgICAgaWYgKGF0dGFja1Jlcy5lcnJvcikge1xuXG4gICAgICAgICAgICAgICAgdmlldy5zaG93VXNlckluZm8oYXR0YWNrUmVzLmVycm9yKVxuICAgICAgICAgICAgICAgIHZpZXcuc2hvd0NvbXB1dGVySW5mbyhcIlwiKVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHsgLy8gSWYgbm90LCByZWFkIHRoZSByZXN1bHRcblxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBhdHRhY2sgd2FzIGEgaGl0LCBzaG93IGl0XG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja1Jlcy50eXBlID09PSBcIlNoaXBIaXRcIikge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmlldy5zaG93VXNlckluZm8oXCJZb3UgaGl0IGEgc2hpcCFcIilcbiAgICAgICAgICAgICAgICAgICAgdmlldy5zaG93Q29tcHV0ZXJJbmZvKGF0dGFja1Jlcy5zdWNjZXNzKVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzaGlwIHdhcyBzdW5rLCBzaG93IGl0XG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRhY2tSZXMuc3VuayAhPT0gXCJcIikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LnNob3dVc2VySW5mbyhcIllvdSBzdW5rIGEgc2hpcCFcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcuc2hvd0NvbXB1dGVySW5mbyhgT2ggbm8hIG15ICR7YXR0YWNrUmVzLnN1bmt9IWApXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LnVwZGF0ZUNvbXB1dGVyU2hpcHlhcmQoYXR0YWNrUmVzLnN1bmspXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIGFsbCBzaGlwcyBhcmUgc3VuaywgZmluaXNoIHRoZSBnYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tcHV0ZXIuZ2V0R2FtZUJvYXJkKCkuZ2V0R2FtZU92ZXIoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcuc2hvd1ZpY3RvcnlNb2RhbChcIllvdVwiKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGF0dGFja1Jlcy50eXBlID09PSBcIk1pc3NcIikgeyAvLyBJZiBub3QsIHNob3cgYSBtaXNzXG5cbiAgICAgICAgICAgICAgICAgICAgdmlldy5zaG93VXNlckluZm8oXCJZb3UgbWlzc2VkIVwiKVxuICAgICAgICAgICAgICAgICAgICB2aWV3LnNob3dDb21wdXRlckluZm8oYXR0YWNrUmVzLnN1Y2Nlc3MpXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgY29tcHV0ZXIgYm9hcmRcbiAgICAgICAgICAgICAgICB2aWV3LnVwZGF0ZUNvbXB1dGVyR2FtZWJvYXJkKHNxdWFyZU51bSwgYXR0YWNrUmVzLnR5cGUpXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSXRzIGNvbXB1dGVyIHR1cm4gLSBCbG9jayBjb21wdXRlciBib2FyZFxuICAgICAgICB2aWV3LnRvZ2dsZUNvbXB1dGVyQm9hcmRTdGF0dXMoKVxuICAgICAgICBjb25zdCBzcXVhcmUgPSBjb21wdXRlci5nZW5lcmF0ZUF1dG9BdHRhY2soKVxuICAgICAgICBjb25zdCBhdHRhY2tSZXMgPSB1c2VyLmdldEdhbWVCb2FyZCgpLnJlY2VpdmVBdHRhY2soc3F1YXJlKVxuXG4gICAgICAgIC8vIElmIFwicmVjZWl2ZUF0dGFja1wiIHJldHVybnMgYW4gZXJyb3IsIHNob3cgaXRcbiAgICAgICAgaWYgKGF0dGFja1Jlcy5lcnJvcikge1xuXG4gICAgICAgICAgICB2aWV3LnNob3dDb21wdXRlckluZm8oYXR0YWNrUmVzLmVycm9yKVxuICAgICAgICAgICAgdmlldy5zaG93VXNlckluZm8oXCJcIilcblxuICAgICAgICB9XG4gICAgICAgIGVsc2UgeyAvLyBJZiBub3QsIHJlYWQgdGhlIHJlc3VsdFxuXG4gICAgICAgICAgICAvLyBJZiB0aGUgYXR0YWNrIHdhcyBhIGhpdCwgc2hvdyBpdFxuICAgICAgICAgICAgaWYgKGF0dGFja1Jlcy50eXBlID09PSBcIlNoaXBIaXRcIikge1xuXG4gICAgICAgICAgICAgICAgdmlldy5zaG93Q29tcHV0ZXJJbmZvKFwiSSBoaXQgYSBzaGlwIVwiKVxuICAgICAgICAgICAgICAgIHZpZXcuc2hvd1VzZXJJbmZvKFwiT2ggbm8hIE9uZSBvZiB5b3VyIHNoaXBzIGhhcyBiZWVuIGhpdCFcIilcblxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzaGlwIHdhcyBzdW5rLCBzaG93IGl0XG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja1Jlcy5zdW5rICE9PSBcIlwiKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmlldy5zaG93Q29tcHV0ZXJJbmZvKFwiSSBzdW5rIGEgc2hpcCFcIilcbiAgICAgICAgICAgICAgICAgICAgdmlldy5zaG93VXNlckluZm8oYFlvdXIgJHthdHRhY2tSZXMuc3Vua30gaXMgc3VuayBub3chYClcbiAgICAgICAgICAgICAgICAgICAgdmlldy51cGRhdGVVc2VyU2hpcHlhcmRBZnRlckNvbXB1dGVyQXR0YWNrKGF0dGFja1Jlcy5zdW5rKVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIGFsbCBzaGlwcyBhcmUgc3VuaywgZmluaXNoIHRoZSBnYW1lXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyLmdldEdhbWVCb2FyZCgpLmdldEdhbWVPdmVyKCkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5zaG93VmljdG9yeU1vZGFsKFwiQ29tcHV0ZXJcIilcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGF0dGFja1Jlcy50eXBlID09PSBcIk1pc3NcIikgeyAvLyBJZiBub3QsIHNob3cgYSBtaXNzXG5cbiAgICAgICAgICAgICAgICB2aWV3LnNob3dDb21wdXRlckluZm8oXCJJIG1pc3NlZCFcIilcbiAgICAgICAgICAgICAgICB2aWV3LnNob3dVc2VySW5mbyhcIlBoZXchIFRoYXQgd2FzIGNsb3NlIVwiKVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSB1c2VyIGJvYXJkXG4gICAgICAgICAgICB2aWV3LnVwZGF0ZVVzZXJHYW1lYm9hcmQoc3F1YXJlLCBhdHRhY2tSZXMudHlwZSlcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSXRzIHVzZXIgdHVybiAtIFVuYmxvY2sgY29tcHV0ZXIgYm9hcmRcbiAgICAgICAgdmlldy50b2dnbGVDb21wdXRlckJvYXJkU3RhdHVzKClcblxuICAgIH0pXG5cbn1cblxuLy8gQ3JlYXRlIHRoZSBpbnRlcmZhY2UgYW5kIHBsYXllciBvYmplY3RzXG52aWV3LmxvYWRDb3Zlck1haW5VSShsb2FkTWFpblVJKSIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIlxuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIlxuXG4vLyBGYWN0b3J5IHJlcHJlc2VudGluZyBhIHBsYXllciBpbiB0aGUgZ2FtZVxuY29uc3QgUGxheWVyID0gKHR5cGUpID0+IHtcblxuICAgIGNvbnN0IF9nYW1lQm9hcmQgPSBHYW1lYm9hcmQoKSAvLyBFYWNoIHBsYXllciBoYXMgYSBnYW1lIGJvYXJkXG4gICAgY29uc3QgX3R5cGUgPSB0eXBlIC8vIFBvc3NpYmxlIHZhbHVlczogXCJIdW1hblwiIG9yIFwiQUlcIlxuICAgIGNvbnN0IF9zaGlwcyA9IFtTaGlwKFwiY2FycmllclwiKSxTaGlwKFwiYmF0dGxlc2hpcFwiKSxTaGlwKFwiZGVzdHJveWVyXCIpLFNoaXAoXCJzdWJtYXJpbmVcIiksU2hpcChcImJvYXRcIildIC8vIEFycmF5IG9mIHNoaXBzIGEgcGxheWVyIGlzIHByb3ZpZGVkIHdpdGhcbiAgICBjb25zdCBfYXZhaWxhYmxlQXR0YWNrcyA9IEFycmF5LmZyb20oe2xlbmd0aDogMTAwfSwgKF8sIGluZGV4KSA9PiBpbmRleCkgLy8gQ3JlYXRlcyBhbiBhcnJheSBmcm9tIDAgdG8gOTlcblxuICAgIC8vIEdldHMgdGhlIGdhbWUgYm9hcmRcbiAgICBjb25zdCBnZXRHYW1lQm9hcmQgPSAoKSA9PiBfZ2FtZUJvYXJkXG4gICAgXG4gICAgLy8gR2V0cyB0aGUgcGxheWVyIHR5cGVcbiAgICBjb25zdCBnZXRQbGF5ZXJUeXBlID0gKCkgPT4gX3R5cGVcblxuICAgIC8vIEdldHMgdGhlIHBsYXllciBzaGlwcyBhcnJheVxuICAgIGNvbnN0IGdldFNoaXBzID0gKCkgPT4gX3NoaXBzXG5cbiAgICAvLyBHZXRzIHNoaXAgYXQgcG9zaXRpb24gaW4gdGhlIGFycmF5IG9mIHBsYXllcidzIHNoaXBzXG4gICAgY29uc3QgZ2V0U2hpcEF0UG9zID0gKHBvcykgPT4gX3NoaXBzW3Bvc11cblxuICAgIC8vIFJlY2VpdmVzIGEgbmFtZSBhbmQgcmV0dXJucyB0aGUgc2hpcCB3aXRoIHRoYXQgbmFtZSBvciBudWxsIGlmIGl0IGRvZXNuJ3QgZXhpc3RcbiAgICBjb25zdCBnZXRTaGlwQnlOYW1lID0gKG5hbWUpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX3NoaXBzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBpZiAoX3NoaXBzW2ldLmdldE5hbWUoKSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfc2hpcHNbaV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICBcbiAgICB9XG5cbiAgICAvLyBSZWNlaXZlcyBhIHNoaXAgbmFtZSBhbmQgZGVsZXRlcyBpdCBmcm9tIHRoZSBwbGF5ZXIncyBzaGlwcyBhcnJheVxuICAgIGNvbnN0IGRlbGV0ZVNoaXBCeU5hbWUgPSAobmFtZSkgPT4ge1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfc2hpcHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlmIChfc2hpcHNbaV0uZ2V0TmFtZSgpID09PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgX3NoaXBzLnNwbGljZShpLCAxKVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIEdldHMgdGhlIGF0dGFja3MgYXJyYXlcbiAgICBjb25zdCBnZXRBdmFpbGFibGVBdHRhY2tzID0gKCkgPT4gX2F2YWlsYWJsZUF0dGFja3NcblxuICAgIC8vIEdldHMgdGhlIHNxdWFyZSBhdCAncG9zJyBpbiB0aGUgJ19hdmFpbGFibGVBdHRhY2tzJyBhcnJheVxuICAgIGNvbnN0IGdldEF0dGFja0F0UG9zID0gKHBvcykgPT4gX2F2YWlsYWJsZUF0dGFja3NbcG9zXVxuXG4gICAgLy8gR2V0cyBpbmRleCBvZiBhIHNxdWFyZSBpbiB0aGUgJ19hdmFpbGFibGVBdHRhY2tzJyBhcnJheVxuICAgIGNvbnN0IGdldEluZGV4T2ZBdHRhY2sgPSAoc3F1YXJlKSA9PiBfYXZhaWxhYmxlQXR0YWNrcy5pbmRleE9mKHNxdWFyZSlcblxuICAgIC8vIFJlY2VpdmVzIGEgc3F1YXJlIGluIHJldHVybnMgdHJ1ZSBpZiB0aGF0IHNxdWFyZSBoYXNuJ3QgYmVlbiBhdHRhY2tlZCB5ZXRcbiAgICBjb25zdCBpc1ZhbGlkQXR0YWNrID0gKHNxdWFyZSkgPT4gZ2V0QXZhaWxhYmxlQXR0YWNrcygpLmluY2x1ZGVzKHNxdWFyZSlcblxuICAgIC8vIEdldHMgYSByYW5kb20gdmFsdWUgXCJ4XCIgb3IgXCJ5XCIgZm9yIHRoZSBvcmllbnRhdGlvbiBvZiBhIHNoaXBcbiAgICBjb25zdCBnZXRSYW5kb21EaXJlY3Rpb24gPSAoKSA9PiAoTWF0aC5yYW5kb20oKSA8IDAuNSA/IFwieFwiIDogXCJ5XCIpXG5cbiAgICAvLyBSYW5kb21seSBzaHVmZmxlcyBhbiBhcnJheSBcbiAgICBjb25zdCBzaHVmZmxlQXJyYXkgPSAoYXJyYXkpID0+IHtcbiAgICAgICAgY29uc3Qgc2h1ZmZsZWRBcnJheSA9IFsuLi5hcnJheV07XG4gICAgICAgIGZvciAobGV0IGkgPSBzaHVmZmxlZEFycmF5Lmxlbmd0aCAtIDE7IGkgPiAwOyBpIC09IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcbiAgICAgICAgICAgIFtzaHVmZmxlZEFycmF5W2ldLCBzaHVmZmxlZEFycmF5W2pdXSA9IFtzaHVmZmxlZEFycmF5W2pdLCBzaHVmZmxlZEFycmF5W2ldXVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaHVmZmxlZEFycmF5XG4gICAgfVxuICAgIFxuICAgIC8vIFBsYWNlcyBzaGlwcyByYW5kb21seSBvbiB0aGUgZ2FtZSBib2FyZFxuICAgIGNvbnN0IHBsYWNlU2hpcHNSYW5kb21seSA9ICgpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAvLyBDcmVhdGVzIGFuIG9yZGVyZWQgYXJyYXkgMCB0byA5OVxuICAgICAgICBjb25zdCBzdGFydFBvc2l0aW9uQ2FuZGlkYXRlcyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwMCB9LCAoXywgaW5kZXgpID0+IGluZGV4KTtcbiAgICAgICAgLy8gU2h1ZmZsZSBhcnJheSBwb3NpdGlvbnMgICAgICAgICAgICBcbiAgICAgICAgY29uc3Qgc2h1ZmZsZWRQb3NpdGlvbnMgPSBzaHVmZmxlQXJyYXkoc3RhcnRQb3NpdGlvbkNhbmRpZGF0ZXMpO1xuXG4gICAgICAgIC8vIFdoaWxlIHRoZSBhcnJheSBvZiBzaGlwcyBpcyBub3QgZW1wdHlcbiAgICAgICAgd2hpbGUgKGdldFNoaXBzKCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBJdGVyYXRlIFwic2h1ZmZsZWRQb3NpdGlvbnNcIiBhcnJheSB1bnRpbCBmaW5kIGEgdmFsaWQgc2hpcCBwbGFjZW1lbnRcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2h1ZmZsZWRQb3NpdGlvbnMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBnZXRSYW5kb21EaXJlY3Rpb24oKVxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGdldEdhbWVCb2FyZCgpLnBsYWNlU2hpcChnZXRTaGlwQXRQb3MoZ2V0U2hpcHMoKS5sZW5ndGggLSAxKSwgc2h1ZmZsZWRQb3NpdGlvbnNbal0sIGRpcmVjdGlvbilcblxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICBnZXRTaGlwcygpLnBvcCgpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8vIFBsYWNlcyBhIHNoaXAgbWFudWFsbHkgb24gdGhlIGdhbWVib2FyZFxuICAgIGNvbnN0IHBsYWNlU2hpcCA9IChzcXVhcmUsIHNoaXBOYW1lLCBvcmllbnRhdGlvbikgPT4ge1xuICAgICAgICBcbiAgICAgICAgLy8gR2V0IHRoZSBzaGlwXG4gICAgICAgIGNvbnN0IHNoaXAgPSBnZXRTaGlwQnlOYW1lKHNoaXBOYW1lKVxuXG4gICAgICAgIC8vIFRlc3QgaWYgc2hpcCBleGlzdHNcbiAgICAgICAgaWYgKCFzaGlwKSB7XG4gICAgICAgICAgICByZXR1cm4geyBlcnJvcjogXCJTaGlwIGRvZXNuJ3QgZXhpc3QhXCIgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2UgbmVlZCB0byB0cmFuc2xhdGUgXCJvcmllbnRhdGlvblwiIGludG8gXCJkaXJlY3Rpb25cIlxuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIgPyBcInhcIiA6IFwieVwiXG5cbiAgICAgICAgY29uc3QgcmVzID0gZ2V0R2FtZUJvYXJkKCkucGxhY2VTaGlwKHNoaXAsIHNxdWFyZSwgZGlyZWN0aW9uKVxuXG4gICAgICAgIC8vIElmIHNoaXAgcGxhY2VtZW50IHdhcyBzdWNjZXNzZnVsLCBcbiAgICAgICAgLy8gZGVsZXRlIGl0IGZyb20gdGhlIHBsYXllcidzIHNoaXBzIGFycmF5LFxuICAgICAgICAvLyByZXR1cm4gc3VjY2VzcyBtc2cgYW5kIHRoZSBhcnJheSBvZiBzcXVhcmVzIHRoaXMgc2hpcCBvY2N1cGllc1xuICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZGVsZXRlU2hpcEJ5TmFtZShzaGlwTmFtZSlcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IFwiU2hpcCBwbGFjZWRcIiwgc3F1YXJlczogcmVzLmRhdGEgfVxuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB7IGVycm9yOiBcIkludmFsaWQgc2hpcCBwbGFjZW1lbnRcIiB9XG5cbiAgICB9XG5cbiAgICAvLyBHZW5lcmF0ZXMgYSByYW5kb20gaW5kZXggZnJvbSB0aGF0IGFycmF5IG9mIGF2YWlsYWJsZSBhdHRhY2tzXG4gICAgY29uc3QgZ2VuZXJhdGVSYW5kb21JbmRleCA9ICgpID0+IFxuICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBnZXRBdmFpbGFibGVBdHRhY2tzKCkubGVuZ3RoKVxuXG4gICAgLy8gV2hlbiB3ZSBhdHRhY2sgYSBwb3NpdGlvbiBpbiBlbmVteSdzIGJvYXJkIFxuICAgIC8vIHdlIG5lZWQgdG8gZGVsZXRlIGl0IGZyb20gYXZhaWxhYmxlIGF0dGFja3MgdG8gbm90IHJlcGVhdCBpdCBpbiB0aGUgZnV0dXJlXG4gICAgY29uc3QgZGVsZXRlRnJvbUF2YWlsYWJsZUF0dGFja3MgPSAoaW5kZXgpID0+IHtcbiAgICAgICAgX2F2YWlsYWJsZUF0dGFja3Muc3BsaWNlKGluZGV4LDEpXG4gICAgfVxuXG4gICAgLy8gR2VuZXJhdGVzIGEgc3F1YXJlIHRvIGF0dGFja1xuICAgIGNvbnN0IGdlbmVyYXRlQXV0b0F0dGFjayA9ICgpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBnZW5lcmF0ZVJhbmRvbUluZGV4KClcbiAgICAgICAgICAgIGNvbnN0IHNxdWFyZSA9IGdldEF0dGFja0F0UG9zKGluZGV4KVxuICAgICAgICAgICAgZGVsZXRlRnJvbUF2YWlsYWJsZUF0dGFja3MoaW5kZXgpXG4gICAgICAgICAgICByZXR1cm4gc3F1YXJlXG5cbiAgICB9XG5cbiAgICAvLyBIdW1hbiBwbGF5ZXIgYXR0YWNrcyBhbiBzcGVjaWZpYyBsb2NhdGlvblxuICAgIGNvbnN0IG1hbnVhbEF0dGFjayA9IChzcXVhcmUpID0+IHtcblxuICAgICAgICAvLyBUZXN0IGlmIGlzIHZhbGlkIGF0dGFja1xuICAgICAgICBpZiAoIWlzVmFsaWRBdHRhY2soc3F1YXJlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3I6IFwiSW52YWxpZCBhdHRhY2shIFRoYXQgc3F1YXJlIHdhcyBhdHRhY2tlZCB5ZXRcIiB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZWxldGUgdGhhIHNxdWFyZSBmcm9tIHZhbGlkIGF0dGFja3MgYXJyYXlcbiAgICAgICAgZGVsZXRlRnJvbUF2YWlsYWJsZUF0dGFja3MoZ2V0SW5kZXhPZkF0dGFjayhzcXVhcmUpKVxuXG4gICAgICAgIC8vIFJldHVybiBzdWNjZXNzIG1zZ1xuICAgICAgICByZXR1cm4ge3N1Y2Nlc3M6IFwiUG9zaXRpb24gYXR0YWNrZWQhIFwifVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldEdhbWVCb2FyZCxcbiAgICAgICAgcGxhY2VTaGlwc1JhbmRvbWx5LFxuICAgICAgICBnZW5lcmF0ZUF1dG9BdHRhY2ssXG4gICAgICAgIGlzVmFsaWRBdHRhY2ssXG4gICAgICAgIG1hbnVhbEF0dGFjayxcbiAgICAgICAgZ2V0UGxheWVyVHlwZSxcbiAgICAgICAgZ2V0U2hpcHMsXG4gICAgICAgIGdldFJhbmRvbURpcmVjdGlvbixcbiAgICAgICAgcGxhY2VTaGlwLFxuICAgICAgICBnZXRTaGlwQnlOYW1lLFxuICAgICAgICBkZWxldGVTaGlwQnlOYW1lXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllciIsIi8vIEZhY3RvcnkgcmVwcmVzZW50aW5nIGEgU2hpcCBpbiB0aGUgZ2FtZVxuY29uc3QgU2hpcCA9IChuYW1lKSA9PiB7XG4gICAgXG4gICAgY29uc3QgX25hbWUgPSBuYW1lXG4gICAgXG4gICAgbGV0IF9sZW5ndGggPSAwIC8vIE51bWJlciBvZiBzcXVhcmVzIHRoZSBzaGlwIG9jY3VwaWVzXG5cbiAgICAvLyBDYXJyaWVyIDUgLSBCYXR0bGVzaGlwIDQgLSBEZXN0cm95ZXIgMyAtIFN1Ym1hcmluZSAzIC0gUGF0cm9sIEJvYXQgMlxuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICBcbiAgICAgICAgY2FzZSBfbmFtZSA9PT0gXCJjYXJyaWVyXCI6XG4gICAgICAgICAgICBfbGVuZ3RoID0gNVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBfbmFtZSA9PT0gXCJiYXR0bGVzaGlwXCI6XG4gICAgICAgICAgICBfbGVuZ3RoID0gNFxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBfbmFtZSA9PT0gXCJkZXN0cm95ZXJcIjpcbiAgICAgICAgICAgIF9sZW5ndGggPSAzXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIF9uYW1lID09PSBcInN1Ym1hcmluZVwiOlxuICAgICAgICAgICAgX2xlbmd0aCA9IDNcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgX25hbWUgPT09IFwiYm9hdFwiOlxuICAgICAgICAgICAgX2xlbmd0aCA9IDJcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBfbGVuZ3RoID0gMFxuICAgICAgICAgICAgYnJlYWtcblxuICAgIH1cblxuICAgIGxldCBfaGl0cyA9IDAgLy8gTnVtYmVyIG9mIHRpbWVzIHRoZSBzaGlwIGhhcyBiZWVuIGRhbWFnZWRcbiAgICBsZXQgX3N1bmsgPSBmYWxzZSAvLyBJbmRpY2F0ZXMgaWYgdGhlIHNoaXAgaGFzIGJlZW4gc3VuayBvciBub3RcblxuICAgIGNvbnN0IGdldE5hbWUgPSAoKSA9PiBfbmFtZVxuXG4gICAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gX2xlbmd0aFxuXG4gICAgY29uc3QgZ2V0SGl0cyA9ICgpID0+IF9oaXRzXG5cbiAgICBjb25zdCBoaXQgPSAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBpZiAoX2hpdHMgPCBfbGVuZ3RoKSB7XG4gICAgICAgICAgICBfaGl0cyArPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9oaXRzID09PSBfbGVuZ3RoKSB7XG4gICAgICAgICAgICBfc3VuayA9IHRydWVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGlzU3VuayA9ICgpID0+IF9zdW5rXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXROYW1lLFxuICAgICAgICBnZXRMZW5ndGgsXG4gICAgICAgIGdldEhpdHMsXG4gICAgICAgIGhpdCxcbiAgICAgICAgaXNTdW5rXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwIiwiLy8gSU1QT1JUU1xuaW1wb3J0IGNhcnJpZXJTdmcgZnJvbSBcIi4vYXNzZXRzL2dyYXBoaWNzL2NhcnJpZXIuc3ZnXCI7XG5pbXBvcnQgc3VibWFyaW5lU3ZnIGZyb20gXCIuL2Fzc2V0cy9ncmFwaGljcy9zdWJtYXJpbmUuc3ZnXCI7XG5pbXBvcnQgYmF0dGxlc2hpcFN2ZyBmcm9tIFwiLi9hc3NldHMvZ3JhcGhpY3MvYmF0dGxlc2hpcC5zdmdcIjtcbmltcG9ydCBkZXN0cm95ZXJTdmcgZnJvbSBcIi4vYXNzZXRzL2dyYXBoaWNzL2Rlc3Ryb3llci5zdmdcIjtcbmltcG9ydCBwYXRyb2xTdmcgZnJvbSBcIi4vYXNzZXRzL2dyYXBoaWNzL3BhdHJvbC1ib2F0LnN2Z1wiO1xuXG4vLyBBIG1vZHVsZSAob25seSBvbmUgaW5zdGFuY2UpIGZvciBhIFZpZXcgdGhhdCBjb250cm9sIERPTSBtYW5pcHVsYXRpb25cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0LCBpbXBvcnQvbm8tbXV0YWJsZS1leHBvcnRzLCBwcmVmZXItY29uc3QsIGZ1bmMtbmFtZXNcbmV4cG9ydCBsZXQgdmlldyA9IChmdW5jdGlvbigpIHtcblxuICAgIC8vIFNvbWUgdXNlZnVsIHZhcmlhYmxlc1xuICAgIGxldCBzZWxlY3RlZFNoaXBMZW5ndGggPSAwXG4gICAgbGV0IG9yaWVudGF0aW9uID0gXCJob3Jpem9udGFsXCJcbiAgICBsZXQgc2VsZWN0ZWRTaGlwTmFtZSA9IFwiXCJcbiAgICBsZXQgcGxhY2VkU2hpcHNDb3VudGVyID0gMFxuXG4gICAgLy8gQ3JlYXRlIGFuIGVsZW1lbnQgd2l0aCBhbiBvcHRpb25hbCBDU1MgY2xhc3MgYW5kIG9wdGlvbmFsIENTUyBpZFxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnLCBjbGFzc05hbWUsIGlkKSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpXG5cbiAgICAgICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLGlkKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnRcblxuICAgIH1cblxuICAgIC8vIFJldHJpZXZlIGFuIGVsZW1lbnQgZnJvbSB0aGUgRE9NXG4gICAgZnVuY3Rpb24gZ2V0RWxlbWVudChpZCkge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKVxuXG4gICAgICAgIHJldHVybiBlbGVtZW50XG5cbiAgICB9XG5cbiAgICAvLyBEZWxldGUgdGhlIGNvbnRlbnQgaW5zaWRlIFwibWFpblwiIDxkaXY+XG4gICAgZnVuY3Rpb24gZGVsZXRlTWFpblVJKCkge1xuICAgICAgICBjb25zdCBtYWluID0gZ2V0RWxlbWVudChcIm1haW5cIilcbiAgICAgICAgbWFpbi5pbm5lckhUTUwgPSBcIlwiXG4gICAgfVxuXG4gICAgLy8gU2hvd3MgaW5mbyBpbiB1c2VycyBcImluc3RydWN0aW9uc1wiIGRpdlxuICAgIGZ1bmN0aW9uIHNob3dVc2VySW5mbyhpbmZvKSB7XG5cbiAgICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnN0cnVjdGlvbnNcIilcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLnRleHRDb250ZW50ID0gaW5mb1xuXG4gICAgfVxuXG4gICAgLy8gU2hvd3MgaW5mbyBpbiBjb21wdXRlcnMgXCJpbnN0cnVjdGlvbnNcIiBkaXZcbiAgICBmdW5jdGlvbiBzaG93Q29tcHV0ZXJJbmZvKGluZm8pIHtcblxuICAgICAgICBjb25zdCBjb21wdXRlckluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXB1dGVySW5mb1wiKVxuICAgICAgICBjb21wdXRlckluZm8udGV4dENvbnRlbnQgPSBpbmZvXG5cbiAgICB9XG5cbiAgICAvLyBIYW5kbGVzIGEgY2xpY2sgb24gYSBzaGlwIGluIHRoZSB1c2VyJ3MgU2hpcHlhcmRcbiAgICBmdW5jdGlvbiBoYW5kbGVTaGlwQ2xpY2soc2hpcCkge1xuXG4gICAgICAgIC8vIElmIHNoaXAgaXMgYWxyZWFkeSBwbGFjZWQgb24gYm9hcmQsIHJldHVyblxuICAgICAgICBpZiAoc2hpcC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGFjZWRcIikpIHNob3dVc2VySW5mbyhcIlNoaXAgYWxyZWFkeSBwbGFjZWQgb24gYm9hcmRcIilcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgb3RoZXIgc2VsZWN0ZWQgc2hpcCwgcmVtb3ZlIHRoZSBzZWxlY3RlZCBjbGFzcyBmcm9tIGl0XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkU2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0ZWRcIilcbiAgICAgICAgaWYgKHNlbGVjdGVkU2hpcCkgc2VsZWN0ZWRTaGlwLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKVxuXG4gICAgICAgIC8vIEFkZCBzZWxlY3RlZCBjbGFzcyB0byB0aGUgY2xpY2tlZCBzaGlwXG4gICAgICAgIHNoaXAuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpXG5cbiAgICAgICAgLy8gVXBkYXRlIHNlbGVjdGVkIHNoaXAgYW5kIHNlbGVjdGVkU2hpcExlbmd0aCB2YXJpYWJsZXNcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgICAgIHNlbGVjdGVkU2hpcE5hbWUgPSBzaGlwLmNsYXNzTGlzdFswXVxuICAgICAgICBcbiAgICAgICAgc3dpdGNoIChzZWxlY3RlZFNoaXBOYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiY2FycmllclwiOlxuICAgICAgICAgICAgICAgIHNlbGVjdGVkU2hpcExlbmd0aCA9IDVcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBcImJhdHRsZXNoaXBcIjpcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFNoaXBMZW5ndGggPSA0XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgXCJkZXN0cm95ZXJcIjpcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFNoaXBMZW5ndGggPSAzXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgXCJzdWJtYXJpbmVcIjpcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFNoaXBMZW5ndGggPSAzXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgXCJib2F0XCI6XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRTaGlwTGVuZ3RoID0gMlxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHNlbGVjdGVkU2hpcExlbmd0aCA9IDBcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hhbmdlIGluc3RydWN0aW9ucyB0ZXh0XG4gICAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5zdHJ1Y3Rpb25zXCIpXG4gICAgICAgIGlmIChpbnN0cnVjdGlvbnMpIGluc3RydWN0aW9ucy50ZXh0Q29udGVudCA9IFwiU2VsZWN0IGEgcG9zaXRpb24gb24gdGhlIGJvYXJkIHRvIHBsYWNlIHRoZSBzaGlwLiBVc2UgVCBrZXkgdG8gcm90YXRlIHRoZSBzaGlwXCJcblxuICAgIH1cblxuICAgIC8vIExvYWRzIGdhbWUgVUlcbiAgICBmdW5jdGlvbiBsb2FkR2FtZVVJKCkge1xuICAgICAgICBcbiAgICAgICAgLy8gU0lERVNcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHVzZXJTaWRlID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwicGxheWVyU2lkZVwiLG51bGwpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyU2lkZSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInBsYXllclNpZGVcIixudWxsKVxuXG4gICAgICAgIGNvbnN0IG1haW4gPSBnZXRFbGVtZW50KFwibWFpblwiKVxuICAgICAgICBtYWluLmFwcGVuZENoaWxkKHVzZXJTaWRlKVxuICAgICAgICBtYWluLmFwcGVuZENoaWxkKGNvbXB1dGVyU2lkZSlcblxuICAgICAgICAvLyBIZWFkZXJzXG5cbiAgICAgICAgY29uc3QgdXNlckhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImdhbWVIZWFkZXJcIixcInVzZXJHYW1lSGVhZGVyXCIpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVySGVhZGVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiZ2FtZUhlYWRlclwiLFwiY29tcHV0ZXJHYW1lSGVhZGVyXCIpXG5cbiAgICAgICAgY29uc3QgdXNlclRpdGxlID0gY3JlYXRlRWxlbWVudChcImgyXCIsXCJwbGF5ZXJUaXRsZVwiLG51bGwpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyVGl0bGUgPSBjcmVhdGVFbGVtZW50KFwiaDJcIixcInBsYXllclRpdGxlXCIsbnVsbClcblxuICAgICAgICB1c2VyVGl0bGUudGV4dENvbnRlbnQgPSBcIllPVVIgRkxFRVRcIlxuICAgICAgICBjb21wdXRlclRpdGxlLnRleHRDb250ZW50ID0gXCJFTkVNWSBGTEVFVFwiXG5cbiAgICAgICAgdXNlckhlYWRlci5hcHBlbmRDaGlsZCh1c2VyVGl0bGUpXG4gICAgICAgIGNvbXB1dGVySGVhZGVyLmFwcGVuZENoaWxkKGNvbXB1dGVyVGl0bGUpXG5cbiAgICAgICAgdXNlclNpZGUuYXBwZW5kQ2hpbGQodXNlckhlYWRlcilcbiAgICAgICAgY29tcHV0ZXJTaWRlLmFwcGVuZENoaWxkKGNvbXB1dGVySGVhZGVyKVxuXG4gICAgICAgIC8vIEdhbWVib2FyZHNcblxuICAgICAgICBjb25zdCB1c2VyR2FtZWJvYXJkQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiZ2FtZWJvYXJkQ29udGFpbmVyXCIsXCJ1c2VyR2FtZWJvYXJkQ29udGFpbmVyXCIpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyR2FtZWJvYXJkQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiZ2FtZWJvYXJkQ29udGFpbmVyXCIsXCJjb21wdXRlckdhbWVib2FyZENvbnRhaW5lclwiKVxuXG4gICAgICAgIGNvbnN0IHVzZXJYSGVhZGVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwieEhlYWRlclwiLG51bGwpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyWEhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInhIZWFkZXJcIixudWxsKVxuXG4gICAgICAgIC8vIEdlbmVyYXRlIHRoZSB4SGVhZGVyIHNxdWFyZXNcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCB1c2VyWEhlYWRlclNxdWFyZSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInhIZWFkZXJTcXVhcmVcIixudWxsKVxuICAgICAgICAgICAgY29uc3QgY29tcHV0ZXJYSGVhZGVyU3F1YXJlID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwieEhlYWRlclNxdWFyZVwiLG51bGwpXG4gICAgICAgICAgICB1c2VyWEhlYWRlclNxdWFyZS50ZXh0Q29udGVudCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoNjUgKyBpKVxuICAgICAgICAgICAgY29tcHV0ZXJYSGVhZGVyU3F1YXJlLnRleHRDb250ZW50ID0gU3RyaW5nLmZyb21DaGFyQ29kZSg2NSArIGkpXG4gICAgICAgICAgICB1c2VyWEhlYWRlci5hcHBlbmRDaGlsZCh1c2VyWEhlYWRlclNxdWFyZSlcbiAgICAgICAgICAgIGNvbXB1dGVyWEhlYWRlci5hcHBlbmRDaGlsZChjb21wdXRlclhIZWFkZXJTcXVhcmUpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB1c2VyQm90dG9tQm9hcmQgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJib3R0b21Cb2FyZFwiLG51bGwpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQm90dG9tQm9hcmQgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJib3R0b21Cb2FyZFwiLG51bGwpXG5cbiAgICAgICAgY29uc3QgdXNlcllIZWFkZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJ5SGVhZGVyXCIsbnVsbClcbiAgICAgICAgY29uc3QgY29tcHV0ZXJZSGVhZGVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwieUhlYWRlclwiLG51bGwpXG5cbiAgICAgICAgLy8gR2VuZXJhdGUgdGhlIHlIZWFkZXIgc3F1YXJlc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJZSGVhZGVyU3F1YXJlID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwieUhlYWRlclNxdWFyZVwiLG51bGwpXG4gICAgICAgICAgICBjb25zdCBjb21wdXRlcllIZWFkZXJTcXVhcmUgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJ5SGVhZGVyU3F1YXJlXCIsbnVsbClcbiAgICAgICAgICAgIHVzZXJZSGVhZGVyU3F1YXJlLnRleHRDb250ZW50ID0gaSArIDFcbiAgICAgICAgICAgIGNvbXB1dGVyWUhlYWRlclNxdWFyZS50ZXh0Q29udGVudCA9IGkgKyAxXG4gICAgICAgICAgICB1c2VyWUhlYWRlci5hcHBlbmRDaGlsZCh1c2VyWUhlYWRlclNxdWFyZSlcbiAgICAgICAgICAgIGNvbXB1dGVyWUhlYWRlci5hcHBlbmRDaGlsZChjb21wdXRlcllIZWFkZXJTcXVhcmUpXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXNlcllIZWFkZXJTaGlweWFyZCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInlIZWFkZXJTaGlweWFyZFwiLG51bGwpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyWUhlYWRlclNoaXB5YXJkID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwieUhlYWRlclNoaXB5YXJkXCIsbnVsbClcbiAgICAgICAgdXNlcllIZWFkZXJTaGlweWFyZC50ZXh0Q29udGVudCA9IFwiU2hpcHlhcmRcIlxuICAgICAgICBjb21wdXRlcllIZWFkZXJTaGlweWFyZC50ZXh0Q29udGVudCA9IFwiU2hpcHlhcmRcIlxuICAgICAgICB1c2VyWUhlYWRlci5hcHBlbmRDaGlsZCh1c2VyWUhlYWRlclNoaXB5YXJkKVxuICAgICAgICBjb21wdXRlcllIZWFkZXIuYXBwZW5kQ2hpbGQoY29tcHV0ZXJZSGVhZGVyU2hpcHlhcmQpXG5cbiAgICAgICAgY29uc3QgdXNlckdyaWRQYW5lbENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImdyaWRQYW5lbENvbnRhaW5lclwiLFwidXNlckdyaWRQYW5lbENvbnRhaW5lclwiKVxuICAgICAgICBjb25zdCBjb21wdXRlckdyaWRQYW5lbENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImdyaWRQYW5lbENvbnRhaW5lclwiLFwiY29tcHV0ZXJHcmlkUGFuZWxDb250YWluZXJcIilcblxuICAgICAgICBjb25zdCB1c2VyR2FtZWJvYXJkID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiZ2FtZWJvYXJkR3JpZFwiLFwidXNlckdhbWVib2FyZEdyaWRcIilcbiAgICAgICAgdXNlckdhbWVib2FyZC5jbGFzc0xpc3QuYWRkKFwiYmxvY2tlZFwiKVxuICAgICAgICBjb25zdCBjb21wdXRlckdhbWVib2FyZCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImdhbWVib2FyZEdyaWRcIixcImNvbXB1dGVyR2FtZWJvYXJkR3JpZFwiKVxuICAgICAgICBjb21wdXRlckdhbWVib2FyZC5jbGFzc0xpc3QuYWRkKFwiYmxvY2tlZFwiKVxuXG4gICAgICAgIC8vIEdlbmVyYXRlIHRoZSBnYW1lYm9hcmQgc3F1YXJlc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCB1c2VyR2FtZWJvYXJkU3F1YXJlID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiZ2FtZWJvYXJkU3F1YXJlXCIsbnVsbClcbiAgICAgICAgICAgIHVzZXJHYW1lYm9hcmRTcXVhcmUuc2V0QXR0cmlidXRlKFwiZGF0YS1pbmRleFwiLGkpXG4gICAgICAgICAgICBjb25zdCBjb21wdXRlckdhbWVib2FyZFNxdWFyZSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImdhbWVib2FyZFNxdWFyZVwiLG51bGwpXG4gICAgICAgICAgICBjb21wdXRlckdhbWVib2FyZFNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWluZGV4XCIsaSlcbiAgICAgICAgICAgIHVzZXJHYW1lYm9hcmQuYXBwZW5kQ2hpbGQodXNlckdhbWVib2FyZFNxdWFyZSlcbiAgICAgICAgICAgIGNvbXB1dGVyR2FtZWJvYXJkLmFwcGVuZENoaWxkKGNvbXB1dGVyR2FtZWJvYXJkU3F1YXJlKVxuICAgICAgICB9XG5cbiAgICAgICAgdXNlckdyaWRQYW5lbENvbnRhaW5lci5hcHBlbmRDaGlsZCh1c2VyR2FtZWJvYXJkKVxuICAgICAgICBjb21wdXRlckdyaWRQYW5lbENvbnRhaW5lci5hcHBlbmRDaGlsZChjb21wdXRlckdhbWVib2FyZClcblxuICAgICAgICB1c2VyR2FtZWJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHVzZXJYSGVhZGVyKVxuICAgICAgICB1c2VyR2FtZWJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHVzZXJCb3R0b21Cb2FyZClcbiAgICAgICAgdXNlckJvdHRvbUJvYXJkLmFwcGVuZENoaWxkKHVzZXJZSGVhZGVyKVxuICAgICAgICB1c2VyQm90dG9tQm9hcmQuYXBwZW5kQ2hpbGQodXNlckdyaWRQYW5lbENvbnRhaW5lcilcblxuICAgICAgICBjb21wdXRlckdhbWVib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChjb21wdXRlclhIZWFkZXIpXG4gICAgICAgIGNvbXB1dGVyR2FtZWJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbXB1dGVyQm90dG9tQm9hcmQpXG4gICAgICAgIGNvbXB1dGVyQm90dG9tQm9hcmQuYXBwZW5kQ2hpbGQoY29tcHV0ZXJZSGVhZGVyKVxuICAgICAgICBjb21wdXRlckJvdHRvbUJvYXJkLmFwcGVuZENoaWxkKGNvbXB1dGVyR3JpZFBhbmVsQ29udGFpbmVyKVxuXG4gICAgICAgIHVzZXJTaWRlLmFwcGVuZENoaWxkKHVzZXJHYW1lYm9hcmRDb250YWluZXIpXG4gICAgICAgIGNvbXB1dGVyU2lkZS5hcHBlbmRDaGlsZChjb21wdXRlckdhbWVib2FyZENvbnRhaW5lcilcblxuICAgICAgICAvLyBGbGVldCBTdGF0dXMgUGFuZWxzXG5cbiAgICAgICAgY29uc3QgdXNlclN0YXR1c1BhbmVsID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwic3RhdHVzUGFuZWxcIixcInVzZXJTdGF0dXNQYW5lbFwiKVxuICAgICAgICBjb25zdCBjb21wdXRlclN0YXR1c1BhbmVsID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwic3RhdHVzUGFuZWxcIixcImNvbXB1dGVyU3RhdHVzUGFuZWxcIilcblxuICAgICAgICB1c2VyR3JpZFBhbmVsQ29udGFpbmVyLmFwcGVuZENoaWxkKHVzZXJTdGF0dXNQYW5lbClcbiAgICAgICAgY29tcHV0ZXJHcmlkUGFuZWxDb250YWluZXIuYXBwZW5kQ2hpbGQoY29tcHV0ZXJTdGF0dXNQYW5lbClcblxuICAgICAgICAvLyBDcmVhdGUgdGhlIHVzZXIgc2hpcHlhcmRcbiAgICAgICAgY29uc3QgdXNlckNhcnJpZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJjYXJyaWVyXCIsXCJ1c2VyQ2FycmllclwiKVxuICAgICAgICB1c2VyQ2Fycmllci5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKVxuICAgICAgICB1c2VyQ2Fycmllci5jbGFzc0xpc3QuYWRkKFwidXNlclNoaXBcIilcbiAgICAgICAgdXNlckNhcnJpZXIuY2xhc3NMaXN0LmFkZChcIm5vLWhvdmVyXCIpXG4gICAgICAgIHVzZXJDYXJyaWVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMTg4IDM2XCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiIHhtbG5zOnNlcmlmPVwiaHR0cDovL3d3dy5zZXJpZi5jb20vXCIgc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjtcIj5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMS4xMzcyOCwwLDAsMC43NTExNjcsLTE0LjI0NTUsLTAuNzU5Mzc2KVwiPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTE3NS4xNzcsMTUuMDE3QzE3NS4xNzcsOS41MDMgMTcwLjcsNS4wMjYgMTY1LjE4Niw1LjAyNkwyNS4xNCw1LjAyNkMxOS42MjYsNS4wMjYgMTUuMTQ5LDkuNTAzIDE1LjE0OSwxNS4wMTdMMTUuMTQ5LDM0Ljk5OEMxNS4xNDksNDAuNTEyIDE5LjYyNiw0NC45ODkgMjUuMTQsNDQuOTg5TDE2NS4xODYsNDQuOTg5QzE3MC43LDQ0Ljk4OSAxNzUuMTc3LDQwLjUxMiAxNzUuMTc3LDM0Ljk5OEwxNzUuMTc3LDE1LjAxN1pcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC0xMS4xOTI3LDIuOTgzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTQ5LjE3MjYsMi45ODMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtODcuMTQ5OCwyLjk4MylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLDI2LjgxNDUsMi45ODMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSw2NC43OTQ5LDIuOTgzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L3N2Zz5gXG4gICAgICAgIGNvbnN0IHVzZXJCYXR0bGVzaGlwID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiYmF0dGxlc2hpcFwiLFwidXNlckJhdHRsZXNoaXBcIilcbiAgICAgICAgdXNlckJhdHRsZXNoaXAuY2xhc3NMaXN0LmFkZChcInNoaXBcIilcbiAgICAgICAgdXNlckJhdHRsZXNoaXAuY2xhc3NMaXN0LmFkZChcInVzZXJTaGlwXCIpXG4gICAgICAgIHVzZXJCYXR0bGVzaGlwLmNsYXNzTGlzdC5hZGQoXCJuby1ob3ZlclwiKVxuICAgICAgICB1c2VyQmF0dGxlc2hpcC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDE1MCAzNlwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIiB4bWxuczpzZXJpZj1cImh0dHA6Ly93d3cuc2VyaWYuY29tL1wiIHN0eWxlPVwiZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjI7XCI+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTIwLjE2MjgsLTcuMDA3NDEpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLjI4ODYzLDAsMCwwLjc1MDMsOS4zMzU1LDIuNDgzOTMpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTk2Ljk1LDQzLjA0MkM5MS43NDMsNDUuNjM1IDg1LjI1Nyw0Ny45NjggNzguMDY2LDQ5Ljk4MkwyMi42NzEsNDkuOTgyQzE1Ljg4OCw0NC45MTEgMTAuNzQ0LDM3LjczOSAxMC43MywzMC4wMjZDMTAuNzE3LDIyLjMwOCAxNS44NDEsMTUuMTE1IDIyLjYxMiwxMC4wMTlMNzguMDM0LDEwLjAxOUM4NC44NDMsMTEuOTQ2IDkxLjAyMSwxNC4xNTkgOTYuMDg1LDE2LjU3N0w5NS45MzYsMTYuNTU2QzkwLjc2MywxNi41NTYgODYuNTYzLDIyLjUyMiA4Ni41NjMsMjkuODcyQzg2LjU2MywzNy4yMjEgOTAuNzYzLDQzLjE4OCA5NS45MzYsNDMuMTg4TDk2Ljk1LDQzLjA0MlpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDcuMzM1MDIsMCwwLDEuNDYxMjEsLTYzOS4yNDQsLTE5LjI1OTgpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEwNC4xODgsMjMuNjExQzEwMy42NzYsMjIuMjM2IDEwMi45OTgsMjEuMDMyIDEwMi4xOTMsMjAuMDI1QzEwNC4yNjIsMjEuMzM4IDEwNS45NjksMjIuNzA4IDEwNy4yNDgsMjQuMTVDMTA2LjgwMywyNS4yNTQgMTA2LjQ5OSwyNy41NiAxMDYuNDk5LDMwLjIxOUMxMDYuNDk5LDMyLjcwNSAxMDYuNzY1LDM0Ljg4MyAxMDcuMTY0LDM2LjA1OEMxMDUuNzQ5LDM3LjYyOSAxMDMuODI4LDM5LjExOSAxMDEuNDg4LDQwLjU0NUMxMDIuNTAxLDM5LjUwMyAxMDMuMzU2LDM4LjE3NiAxMDMuOTk2LDM2LjYxMkMxMDQuMTUxLDM2LjkwNyAxMDQuMzIxLDM3LjA1NyAxMDQuNDk4LDM3LjA1N0MxMDUuMjk4LDM3LjA1NyAxMDUuOTQ4LDM0LjAwOCAxMDUuOTQ4LDMwLjI1MkMxMDUuOTQ4LDI2LjQ5NyAxMDUuMjk4LDIzLjQ0OCAxMDQuNDk4LDIzLjQ0OEMxMDQuMzkyLDIzLjQ0OCAxMDQuMjg4LDIzLjUwMSAxMDQuMTg4LDIzLjYxMVpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDcuMzM1MDIsMCwwLDEuNDYxMjEsLTYzOS4yNDQsLTE5LjI1OTgpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEwOS4wMSwyNi41NzlDMTA5LjYyNCwyNy43MTggMTA5Ljk0NiwyOC44ODkgMTA5Ljk0NCwzMC4wNzJDMTA5Ljk0MiwzMS4yMTIgMTA5LjYzOSwzMi4zNDEgMTA5LjA2NCwzMy40NDhDMTA5LjE3LDMyLjQ5MyAxMDkuMjI5LDMxLjM5IDEwOS4yMjksMzAuMjE5QzEwOS4yMjksMjguODcyIDEwOS4xNTEsMjcuNjE1IDEwOS4wMSwyNi41NzlaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC02MC4xNzM2LDIuOTgzMilcIj5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsMTEuMTA5OCwtMC4xMTA5MjIpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSw2MC4xNzM2LC0yLjk4MzIpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEwNC44MTgsOC4yMzRDMTEwLjA4MSwxMC45MjMgMTEzLjAzNiwxNC4wNTYgMTEzLjAzNiwxNy4zODJDMTEzLjAzNiwyMSAxMDkuNTQsMjQuMzg4IDEwMy40MDMsMjcuMjNDOTkuMzQsMjUuODU4IDk2LjQ1LDIyLjIxMSA5Ni40NSwxNy45MzdDOTYuNDUsMTMuMTc5IDEwMC4wMzUsOS4xOTYgMTA0LjgxOCw4LjIzNFpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsNjAuMTczNiwtMi45ODMyKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMDQuODE4LDguMjM0QzEwNS41NDgsOC4wNzMgMTA2LjMwOCw3Ljk5NSAxMDcuMDg4LDcuOTk1QzExMi45Niw3Ljk5NSAxMTcuNzI3LDEyLjQ1IDExNy43MjcsMTcuOTM3QzExNy43MjcsMjMuNDI1IDExMi45NiwyNy44OCAxMDcuMDg4LDI3Ljg4QzEwNS43ODksMjcuODggMTA0LjU0MywyNy42NjIgMTAzLjQwMywyNy4yM0MxMDkuNTQsMjQuMzg4IDExMy4wMzYsMjEgMTEzLjAzNiwxNy4zODJDMTEzLjAzNiwxNC4wNTYgMTEwLjA4MSwxMC45MjMgMTA0LjgxOCw4LjIzNFpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsODYuNzc4OCwtMC4xMTA5MjIpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEwMC42NTcsNi4xNDlDMTA2LjAxMSw3LjMwNCAxMTAuMzQ5LDguNDg3IDExMy41OCw5LjY5OEMxMTQuNjEzLDExLjIxMiAxMTUuMTg1LDEzLjA0OCAxMTUuMTg1LDE1LjAxN0MxMTUuMTg1LDE2LjcyOCAxMTQuNzUzLDE4LjM0IDExMy45NzIsMTkuNzM1QzExMC41ODEsMjEuMDQyIDEwNS45MDEsMjIuMzMxIDEwMC4wMzcsMjMuNTQ5Qzk3LjExLDIxLjgzMiA5NS4xNjMsMTguNjUgOTUuMTYzLDE1LjAxN0M5NS4xNjMsMTEuMTMyIDk3LjM4OSw3Ljc2MiAxMDAuNjU3LDYuMTQ5WlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSw0OC43OTg3LC0wLjAwMDIpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtODcuMTE4MiwyLjg3MjI4KVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L3N2Zz5gXG4gICAgICAgIGNvbnN0IHVzZXJEZXN0cm95ZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJkZXN0cm95ZXJcIixcInVzZXJEZXN0cm95ZXJcIilcbiAgICAgICAgdXNlckRlc3Ryb3llci5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKVxuICAgICAgICB1c2VyRGVzdHJveWVyLmNsYXNzTGlzdC5hZGQoXCJ1c2VyU2hpcFwiKVxuICAgICAgICB1c2VyRGVzdHJveWVyLmNsYXNzTGlzdC5hZGQoXCJuby1ob3ZlclwiKVxuICAgICAgICB1c2VyRGVzdHJveWVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMTEyIDM2XCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiIHhtbG5zOnNlcmlmPVwiaHR0cDovL3d3dy5zZXJpZi5jb20vXCIgc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjtcIj5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtMzkuMTYyOCwtNy4wMDc0MSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEuMDY4MDYsMCwwLDAuNzUwMywzMC43MTk1LDIuNDgzOTMpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTk2Ljk1LDQzLjA0MkM5MS43NDMsNDUuNjM1IDg1LjI1Nyw0Ny45NjggNzguMDY2LDQ5Ljk4MkwyMi42NzEsNDkuOTgyQzE1Ljg4OCw0NC45MTEgMTAuNzQ0LDM3LjczOSAxMC43MywzMC4wMjZDMTAuNzE3LDIyLjMwOCAxNS44NDEsMTUuMTE1IDIyLjYxMiwxMC4wMTlMNzguMDM0LDEwLjAxOUM4NC44NDMsMTEuOTQ2IDkxLjAyMSwxNC4xNTkgOTYuMDg1LDE2LjU3N0w5NS45MzYsMTYuNTU2QzkwLjc2MywxNi41NTYgODYuNTYzLDIyLjUyMiA4Ni41NjMsMjkuODcyQzg2LjU2MywzNy4yMjEgOTAuNzYzLDQzLjE4OCA5NS45MzYsNDMuMTg4TDk2Ljk1LDQzLjA0MlpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEuMDY4MDYsMCwwLDAuNzUwMywzMC43MTk1LDIuNDgzOTMpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEwMi4xOTMsMjAuMDI1QzEwNy4wNzksMjMuMTI2IDEwOS45NSwyNi41NDYgMTA5Ljk0NCwzMC4wNzJDMTA5LjkzNywzMy43NTggMTA2Ljc4NSwzNy4zMTggMTAxLjQ4OCw0MC41NDVDMTAzLjgxMiwzOC4xNTMgMTA1LjMwOSwzNC4yNTkgMTA1LjMwOSwyOS44NzJDMTA1LjMwOSwyNS45NTMgMTA0LjExNSwyMi40MjggMTAyLjE5MywyMC4wMjVaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC0xMS4xNTE3LDIuODcyMjgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTA1LjMzNCw1LjA0MkMxMDcuNzczLDUuODU5IDEwOS45Nyw2LjcwNyAxMTEuODU3LDcuNjI5QzExMy45MSw5LjQzMiAxMTUuMTg1LDEyLjA3NyAxMTUuMTg1LDE1LjAxN0MxMTUuMTg1LDE4LjMwOCAxMTMuNTg3LDIxLjIzIDExMS4xMDQsMjMuMDI1TDExMC4zOTEsMjMuMzY1TDEwNi4yNTcsMjQuODk5TDEwNS4xNzQsMjUuMDA4Qzk5LjY0OSwyNS4wMDggOTUuMTYzLDIwLjUzMSA5NS4xNjMsMTUuMDE3Qzk1LjE2Myw5LjUwMyA5OS42NDksNS4wMjYgMTA1LjE3NCw1LjAyNkwxMDUuMzM0LDUuMDQyWlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTQ5LjE3NCwyLjg3MjI4KVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTg3LjE4ODEsMi44NzIyOClcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPC9zdmc+YFxuICAgICAgICBjb25zdCB1c2VyU3VibWFyaW5lID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwic3VibWFyaW5lXCIsXCJ1c2VyU3VibWFyaW5lXCIpXG4gICAgICAgIHVzZXJTdWJtYXJpbmUuY2xhc3NMaXN0LmFkZChcInNoaXBcIilcbiAgICAgICAgdXNlclN1Ym1hcmluZS5jbGFzc0xpc3QuYWRkKFwidXNlclNoaXBcIilcbiAgICAgICAgdXNlclN1Ym1hcmluZS5jbGFzc0xpc3QuYWRkKFwibm8taG92ZXJcIilcbiAgICAgICAgdXNlclN1Ym1hcmluZS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDExMiAzNlwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIiB4bWxuczpzZXJpZj1cImh0dHA6Ly93d3cuc2VyaWYuY29tL1wiIHN0eWxlPVwiZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjI7XCI+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEuMDY4MzYsMCwwLDAuNzUyMDAxLC00MC40MTAzLC00LjU0MTUzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEyOC4xMTYsMTAuMDE5QzEzNC44MTQsMTUuMTA4IDEzOS44NjUsMjIuMjUzIDEzOS44NTEsMjkuOTE1QzEzOS44MzcsMzcuNjg1IDEzNC42MTksNDQuOTA0IDEyNy43NjIsNDkuOTgyTDUyLjY5MSw0OS45ODJDNDUuODM0LDQ0LjkwNCA0MC42MTYsMzcuNjg1IDQwLjYwMiwyOS45MTVDNDAuNTg4LDIyLjI1MyA0NS42MzksMTUuMTA4IDUyLjMzNywxMC4wMTlMMTI4LjExNiwxMC4wMTlaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtMTEuMTksMy4wMDE1NylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC00OS4xODk2LDMuMDAxNTcpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtODcuMTY3MiwzLjAwMTU3KVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L3N2Zz5gXG4gICAgICAgIGNvbnN0IHVzZXJCb2F0ID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiYm9hdFwiLFwidXNlckJvYXRcIilcbiAgICAgICAgdXNlckJvYXQuY2xhc3NMaXN0LmFkZChcInNoaXBcIilcbiAgICAgICAgdXNlckJvYXQuY2xhc3NMaXN0LmFkZChcInVzZXJTaGlwXCIpXG4gICAgICAgIHVzZXJCb2F0LmNsYXNzTGlzdC5hZGQoXCJuby1ob3ZlclwiKVxuICAgICAgICB1c2VyQm9hdC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDc0IDM2XCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiIHhtbG5zOnNlcmlmPVwiaHR0cDovL3d3dy5zZXJpZi5jb20vXCIgc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjtcIj5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMC45NzY5NzMsMCwwLDAuNzUyMDQ4LC03LjA2NjQxLC00LjU2NzUzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTQ4LjAzNCwxMC4wMTlDNjYuMjUzLDE1LjE3OCA3OS45NTcsMjIuMzc0IDc5Ljk0NCwzMC4wNzJDNzkuOTMsMzcuNzU0IDY2LjI1Myw0NC44ODkgNDguMDY2LDQ5Ljk4MkwyMy45MDgsNDkuOTgyQzE2LjIwMSw0NC45MTEgMTAuMzU2LDM3LjczNiAxMC4zNDIsMzAuMDE4QzEwLjMyOCwyMi4zMDUgMTYuMTM5LDE1LjExNSAyMy44MTcsMTAuMDE5TDQ4LjAzNCwxMC4wMTlaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtNDkuMTc1MiwyLjk4MylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC04Ny4xNjYxLDIuOTgzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L3N2Zz5gXG4gICAgICAgIHVzZXJTdGF0dXNQYW5lbC5hcHBlbmRDaGlsZCh1c2VyQ2FycmllcilcbiAgICAgICAgdXNlclN0YXR1c1BhbmVsLmFwcGVuZENoaWxkKHVzZXJCYXR0bGVzaGlwKVxuICAgICAgICB1c2VyU3RhdHVzUGFuZWwuYXBwZW5kQ2hpbGQodXNlckRlc3Ryb3llcilcbiAgICAgICAgdXNlclN0YXR1c1BhbmVsLmFwcGVuZENoaWxkKHVzZXJTdWJtYXJpbmUpXG4gICAgICAgIHVzZXJTdGF0dXNQYW5lbC5hcHBlbmRDaGlsZCh1c2VyQm9hdClcblxuICAgICAgICAvLyBDcmVhdGUgdGhlIGVuZW15IHNoaXB5YXJkXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQ2FycmllciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImNhcnJpZXJcIixcImNvbXB1dGVyQ2FycmllclwiKVxuICAgICAgICBjb21wdXRlckNhcnJpZXIuY2xhc3NMaXN0LmFkZChcInNoaXBcIilcbiAgICAgICAgY29tcHV0ZXJDYXJyaWVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMTg4IDM2XCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiIHhtbG5zOnNlcmlmPVwiaHR0cDovL3d3dy5zZXJpZi5jb20vXCIgc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjtcIj5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMS4xMzcyOCwwLDAsMC43NTExNjcsLTE0LjI0NTUsLTAuNzU5Mzc2KVwiPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTE3NS4xNzcsMTUuMDE3QzE3NS4xNzcsOS41MDMgMTcwLjcsNS4wMjYgMTY1LjE4Niw1LjAyNkwyNS4xNCw1LjAyNkMxOS42MjYsNS4wMjYgMTUuMTQ5LDkuNTAzIDE1LjE0OSwxNS4wMTdMMTUuMTQ5LDM0Ljk5OEMxNS4xNDksNDAuNTEyIDE5LjYyNiw0NC45ODkgMjUuMTQsNDQuOTg5TDE2NS4xODYsNDQuOTg5QzE3MC43LDQ0Ljk4OSAxNzUuMTc3LDQwLjUxMiAxNzUuMTc3LDM0Ljk5OEwxNzUuMTc3LDE1LjAxN1pcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC0xMS4xOTI3LDIuOTgzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTQ5LjE3MjYsMi45ODMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtODcuMTQ5OCwyLjk4MylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLDI2LjgxNDUsMi45ODMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSw2NC43OTQ5LDIuOTgzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L3N2Zz5gXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQmF0dGxlc2hpcCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImJhdHRsZXNoaXBcIixcImNvbXB1dGVyQmF0dGxlc2hpcFwiKVxuICAgICAgICBjb21wdXRlckJhdHRsZXNoaXAuY2xhc3NMaXN0LmFkZChcInNoaXBcIilcbiAgICAgICAgY29tcHV0ZXJCYXR0bGVzaGlwLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMTUwIDM2XCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiIHhtbG5zOnNlcmlmPVwiaHR0cDovL3d3dy5zZXJpZi5jb20vXCIgc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjtcIj5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtMjAuMTYyOCwtNy4wMDc0MSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEuMjg4NjMsMCwwLDAuNzUwMyw5LjMzNTUsMi40ODM5MylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNOTYuOTUsNDMuMDQyQzkxLjc0Myw0NS42MzUgODUuMjU3LDQ3Ljk2OCA3OC4wNjYsNDkuOTgyTDIyLjY3MSw0OS45ODJDMTUuODg4LDQ0LjkxMSAxMC43NDQsMzcuNzM5IDEwLjczLDMwLjAyNkMxMC43MTcsMjIuMzA4IDE1Ljg0MSwxNS4xMTUgMjIuNjEyLDEwLjAxOUw3OC4wMzQsMTAuMDE5Qzg0Ljg0MywxMS45NDYgOTEuMDIxLDE0LjE1OSA5Ni4wODUsMTYuNTc3TDk1LjkzNiwxNi41NTZDOTAuNzYzLDE2LjU1NiA4Ni41NjMsMjIuNTIyIDg2LjU2MywyOS44NzJDODYuNTYzLDM3LjIyMSA5MC43NjMsNDMuMTg4IDk1LjkzNiw0My4xODhMOTYuOTUsNDMuMDQyWlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoNy4zMzUwMiwwLDAsMS40NjEyMSwtNjM5LjI0NCwtMTkuMjU5OClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTA0LjE4OCwyMy42MTFDMTAzLjY3NiwyMi4yMzYgMTAyLjk5OCwyMS4wMzIgMTAyLjE5MywyMC4wMjVDMTA0LjI2MiwyMS4zMzggMTA1Ljk2OSwyMi43MDggMTA3LjI0OCwyNC4xNUMxMDYuODAzLDI1LjI1NCAxMDYuNDk5LDI3LjU2IDEwNi40OTksMzAuMjE5QzEwNi40OTksMzIuNzA1IDEwNi43NjUsMzQuODgzIDEwNy4xNjQsMzYuMDU4QzEwNS43NDksMzcuNjI5IDEwMy44MjgsMzkuMTE5IDEwMS40ODgsNDAuNTQ1QzEwMi41MDEsMzkuNTAzIDEwMy4zNTYsMzguMTc2IDEwMy45OTYsMzYuNjEyQzEwNC4xNTEsMzYuOTA3IDEwNC4zMjEsMzcuMDU3IDEwNC40OTgsMzcuMDU3QzEwNS4yOTgsMzcuMDU3IDEwNS45NDgsMzQuMDA4IDEwNS45NDgsMzAuMjUyQzEwNS45NDgsMjYuNDk3IDEwNS4yOTgsMjMuNDQ4IDEwNC40OTgsMjMuNDQ4QzEwNC4zOTIsMjMuNDQ4IDEwNC4yODgsMjMuNTAxIDEwNC4xODgsMjMuNjExWlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoNy4zMzUwMiwwLDAsMS40NjEyMSwtNjM5LjI0NCwtMTkuMjU5OClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTA5LjAxLDI2LjU3OUMxMDkuNjI0LDI3LjcxOCAxMDkuOTQ2LDI4Ljg4OSAxMDkuOTQ0LDMwLjA3MkMxMDkuOTQyLDMxLjIxMiAxMDkuNjM5LDMyLjM0MSAxMDkuMDY0LDMzLjQ0OEMxMDkuMTcsMzIuNDkzIDEwOS4yMjksMzEuMzkgMTA5LjIyOSwzMC4yMTlDMTA5LjIyOSwyOC44NzIgMTA5LjE1MSwyNy42MTUgMTA5LjAxLDI2LjU3OVpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTYwLjE3MzYsMi45ODMyKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwxMS4xMDk4LC0wLjExMDkyMilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLDYwLjE3MzYsLTIuOTgzMilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTA0LjgxOCw4LjIzNEMxMTAuMDgxLDEwLjkyMyAxMTMuMDM2LDE0LjA1NiAxMTMuMDM2LDE3LjM4MkMxMTMuMDM2LDIxIDEwOS41NCwyNC4zODggMTAzLjQwMywyNy4yM0M5OS4zNCwyNS44NTggOTYuNDUsMjIuMjExIDk2LjQ1LDE3LjkzN0M5Ni40NSwxMy4xNzkgMTAwLjAzNSw5LjE5NiAxMDQuODE4LDguMjM0WlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSw2MC4xNzM2LC0yLjk4MzIpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEwNC44MTgsOC4yMzRDMTA1LjU0OCw4LjA3MyAxMDYuMzA4LDcuOTk1IDEwNy4wODgsNy45OTVDMTEyLjk2LDcuOTk1IDExNy43MjcsMTIuNDUgMTE3LjcyNywxNy45MzdDMTE3LjcyNywyMy40MjUgMTEyLjk2LDI3Ljg4IDEwNy4wODgsMjcuODhDMTA1Ljc4OSwyNy44OCAxMDQuNTQzLDI3LjY2MiAxMDMuNDAzLDI3LjIzQzEwOS41NCwyNC4zODggMTEzLjAzNiwyMSAxMTMuMDM2LDE3LjM4MkMxMTMuMDM2LDE0LjA1NiAxMTAuMDgxLDEwLjkyMyAxMDQuODE4LDguMjM0WlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSw4Ni43Nzg4LC0wLjExMDkyMilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTAwLjY1Nyw2LjE0OUMxMDYuMDExLDcuMzA0IDExMC4zNDksOC40ODcgMTEzLjU4LDkuNjk4QzExNC42MTMsMTEuMjEyIDExNS4xODUsMTMuMDQ4IDExNS4xODUsMTUuMDE3QzExNS4xODUsMTYuNzI4IDExNC43NTMsMTguMzQgMTEzLjk3MiwxOS43MzVDMTEwLjU4MSwyMS4wNDIgMTA1LjkwMSwyMi4zMzEgMTAwLjAzNywyMy41NDlDOTcuMTEsMjEuODMyIDk1LjE2MywxOC42NSA5NS4xNjMsMTUuMDE3Qzk1LjE2MywxMS4xMzIgOTcuMzg5LDcuNzYyIDEwMC42NTcsNi4xNDlaXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLDQ4Ljc5ODcsLTAuMDAwMilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC04Ny4xMTgyLDIuODcyMjgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvc3ZnPmBcbiAgICAgICAgY29uc3QgY29tcHV0ZXJEZXN0cm95ZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJkZXN0cm95ZXJcIixcImNvbXB1dGVyRGVzdHJveWVyXCIpXG4gICAgICAgIGNvbXB1dGVyRGVzdHJveWVyLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpXG4gICAgICAgIGNvbXB1dGVyRGVzdHJveWVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMTEyIDM2XCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiIHhtbG5zOnNlcmlmPVwiaHR0cDovL3d3dy5zZXJpZi5jb20vXCIgc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjtcIj5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtMzkuMTYyOCwtNy4wMDc0MSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEuMDY4MDYsMCwwLDAuNzUwMywzMC43MTk1LDIuNDgzOTMpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTk2Ljk1LDQzLjA0MkM5MS43NDMsNDUuNjM1IDg1LjI1Nyw0Ny45NjggNzguMDY2LDQ5Ljk4MkwyMi42NzEsNDkuOTgyQzE1Ljg4OCw0NC45MTEgMTAuNzQ0LDM3LjczOSAxMC43MywzMC4wMjZDMTAuNzE3LDIyLjMwOCAxNS44NDEsMTUuMTE1IDIyLjYxMiwxMC4wMTlMNzguMDM0LDEwLjAxOUM4NC44NDMsMTEuOTQ2IDkxLjAyMSwxNC4xNTkgOTYuMDg1LDE2LjU3N0w5NS45MzYsMTYuNTU2QzkwLjc2MywxNi41NTYgODYuNTYzLDIyLjUyMiA4Ni41NjMsMjkuODcyQzg2LjU2MywzNy4yMjEgOTAuNzYzLDQzLjE4OCA5NS45MzYsNDMuMTg4TDk2Ljk1LDQzLjA0MlpcIiBzdHlsZT1cImZpbGw6cmdiKDE1MywxNTMsMTUzKTtcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEuMDY4MDYsMCwwLDAuNzUwMywzMC43MTk1LDIuNDgzOTMpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEwMi4xOTMsMjAuMDI1QzEwNy4wNzksMjMuMTI2IDEwOS45NSwyNi41NDYgMTA5Ljk0NCwzMC4wNzJDMTA5LjkzNywzMy43NTggMTA2Ljc4NSwzNy4zMTggMTAxLjQ4OCw0MC41NDVDMTAzLjgxMiwzOC4xNTMgMTA1LjMwOSwzNC4yNTkgMTA1LjMwOSwyOS44NzJDMTA1LjMwOSwyNS45NTMgMTA0LjExNSwyMi40MjggMTAyLjE5MywyMC4wMjVaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC0xMS4xNTE3LDIuODcyMjgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTA1LjMzNCw1LjA0MkMxMDcuNzczLDUuODU5IDEwOS45Nyw2LjcwNyAxMTEuODU3LDcuNjI5QzExMy45MSw5LjQzMiAxMTUuMTg1LDEyLjA3NyAxMTUuMTg1LDE1LjAxN0MxMTUuMTg1LDE4LjMwOCAxMTMuNTg3LDIxLjIzIDExMS4xMDQsMjMuMDI1TDExMC4zOTEsMjMuMzY1TDEwNi4yNTcsMjQuODk5TDEwNS4xNzQsMjUuMDA4Qzk5LjY0OSwyNS4wMDggOTUuMTYzLDIwLjUzMSA5NS4xNjMsMTUuMDE3Qzk1LjE2Myw5LjUwMyA5OS42NDksNS4wMjYgMTA1LjE3NCw1LjAyNkwxMDUuMzM0LDUuMDQyWlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTQ5LjE3NCwyLjg3MjI4KVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTg3LjE4ODEsMi44NzIyOClcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPC9zdmc+YFxuICAgICAgICBjb25zdCBjb21wdXRlclN1Ym1hcmluZSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInN1Ym1hcmluZVwiLFwiY29tcHV0ZXJTdWJtYXJpbmVcIilcbiAgICAgICAgY29tcHV0ZXJTdWJtYXJpbmUuY2xhc3NMaXN0LmFkZChcInNoaXBcIilcbiAgICAgICAgY29tcHV0ZXJTdWJtYXJpbmUuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAxMTIgMzZcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCIgeG1sbnM6c2VyaWY9XCJodHRwOi8vd3d3LnNlcmlmLmNvbS9cIiBzdHlsZT1cImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyO1wiPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLjA2ODM2LDAsMCwwLjc1MjAwMSwtNDAuNDEwMywtNC41NDE1MylcIj5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMjguMTE2LDEwLjAxOUMxMzQuODE0LDE1LjEwOCAxMzkuODY1LDIyLjI1MyAxMzkuODUxLDI5LjkxNUMxMzkuODM3LDM3LjY4NSAxMzQuNjE5LDQ0LjkwNCAxMjcuNzYyLDQ5Ljk4Mkw1Mi42OTEsNDkuOTgyQzQ1LjgzNCw0NC45MDQgNDAuNjE2LDM3LjY4NSA0MC42MDIsMjkuOTE1QzQwLjU4OCwyMi4yNTMgNDUuNjM5LDE1LjEwOCA1Mi4zMzcsMTAuMDE5TDEyOC4xMTYsMTAuMDE5WlwiIHN0eWxlPVwiZmlsbDpyZ2IoMTUzLDE1MywxNTMpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTExLjE5LDMuMDAxNTcpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTA1LjE3NFwiIGN5PVwiMTUuMDE3XCIgcng9XCIxMC4wMTFcIiByeT1cIjkuOTkxXCIgc3R5bGU9XCJmaWxsOnJnYigxMDIsMTAyLDEwMik7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtNDkuMTg5NiwzLjAwMTU3KVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsLTg3LjE2NzIsMy4wMDE1NylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPC9zdmc+YFxuICAgICAgICBjb25zdCBjb21wdXRlckJvYXQgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJib2F0XCIsXCJjb21wdXRlckJvYXRcIilcbiAgICAgICAgY29tcHV0ZXJCb2F0LmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpXG4gICAgICAgIGNvbXB1dGVyQm9hdC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDc0IDM2XCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiIHhtbG5zOnNlcmlmPVwiaHR0cDovL3d3dy5zZXJpZi5jb20vXCIgc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjtcIj5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMC45NzY5NzMsMCwwLDAuNzUyMDQ4LC03LjA2NjQxLC00LjU2NzUzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTQ4LjAzNCwxMC4wMTlDNjYuMjUzLDE1LjE3OCA3OS45NTcsMjIuMzc0IDc5Ljk0NCwzMC4wNzJDNzkuOTMsMzcuNzU0IDY2LjI1Myw0NC44ODkgNDguMDY2LDQ5Ljk4MkwyMy45MDgsNDkuOTgyQzE2LjIwMSw0NC45MTEgMTAuMzU2LDM3LjczNiAxMC4zNDIsMzAuMDE4QzEwLjMyOCwyMi4zMDUgMTYuMTM5LDE1LjExNSAyMy44MTcsMTAuMDE5TDQ4LjAzNCwxMC4wMTlaXCIgc3R5bGU9XCJmaWxsOnJnYigxNTMsMTUzLDE1Myk7XCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwtNDkuMTc1MiwyLjk4MylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDUuMTc0XCIgY3k9XCIxNS4wMTdcIiByeD1cIjEwLjAxMVwiIHJ5PVwiOS45OTFcIiBzdHlsZT1cImZpbGw6cmdiKDEwMiwxMDIsMTAyKTtcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cIm1hdHJpeCgxLDAsMCwxLC04Ny4xNjYxLDIuOTgzKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwNS4xNzRcIiBjeT1cIjE1LjAxN1wiIHJ4PVwiMTAuMDExXCIgcnk9XCI5Ljk5MVwiIHN0eWxlPVwiZmlsbDpyZ2IoMTAyLDEwMiwxMDIpO1wiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L3N2Zz5gXG5cbiAgICAgICAgY29tcHV0ZXJTdGF0dXNQYW5lbC5hcHBlbmRDaGlsZChjb21wdXRlckNhcnJpZXIpXG4gICAgICAgIGNvbXB1dGVyU3RhdHVzUGFuZWwuYXBwZW5kQ2hpbGQoY29tcHV0ZXJCYXR0bGVzaGlwKVxuICAgICAgICBjb21wdXRlclN0YXR1c1BhbmVsLmFwcGVuZENoaWxkKGNvbXB1dGVyRGVzdHJveWVyKVxuICAgICAgICBjb21wdXRlclN0YXR1c1BhbmVsLmFwcGVuZENoaWxkKGNvbXB1dGVyU3VibWFyaW5lKVxuICAgICAgICBjb21wdXRlclN0YXR1c1BhbmVsLmFwcGVuZENoaWxkKGNvbXB1dGVyQm9hdClcblxuICAgICAgICAvLyBDcmVhdGUgYSBkaXYgdG8gc2hvdyBpbnN0cnVjdGlvbnMgdG8gdGhlIHVzZXJcbiAgICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gY3JlYXRlRWxlbWVudChcImRpdlwiLFwiaW5zdHJ1Y3Rpb25zXCIsbnVsbClcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLnRleHRDb250ZW50ID0gXCJTZWxlY3QgYSBwbGFjZW1lbnQgb3B0aW9uIGZvciB5b3VyIHNoaXBzXCJcbiAgICAgICAgdXNlclNpZGUuYXBwZW5kQ2hpbGQoaW5zdHJ1Y3Rpb25zKVxuXG4gICAgICAgIC8vIENyZWF0ZSBhIGRpdiB0byBzaG93IGluZm8gZnJvbSB0aGUgSUEgcGxheWVyXG4gICAgICAgIGNvbnN0IGNvbXB1dGVySW5mbyA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImNvbXB1dGVySW5mb1wiLG51bGwpXG4gICAgICAgIGNvbXB1dGVySW5mby50ZXh0Q29udGVudCA9IFwiTXkgc2hpcHMgaGFzIGJlZW4gcGxhY2VkLiBJJ20gd2FpdGluZyBmb3IgeW91IHRvIHN0YXJ0Li4uXCJcbiAgICAgICAgY29tcHV0ZXJTaWRlLmFwcGVuZENoaWxkKGNvbXB1dGVySW5mbylcblxuICAgICAgICAvLyBDcmVhdGUgYSBkaXYgdG8gc2hvdyBidXR0b25zIHRvIHRoZSB1c2VyXG4gICAgICAgIGNvbnN0IGJ1dHRvbnNDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJidXR0b25zQ29udGFpbmVyXCIsbnVsbClcbiAgICAgICAgdXNlclNpZGUuYXBwZW5kQ2hpbGQoYnV0dG9uc0NvbnRhaW5lcilcbiAgICAgICAgY29uc3QgbWFudWFsQnV0dG9uID0gY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLFwicGxhY2VtZW50QnV0dG9uXCIsXCJtYW51YWxCdXR0b25cIilcbiAgICAgICAgbWFudWFsQnV0dG9uLnRleHRDb250ZW50ID0gXCJNYW51YWwgUGxhY2VtZW50XCJcbiAgICAgICAgY29uc3QgcmFuZG9tQnV0dG9uID0gY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLFwicGxhY2VtZW50QnV0dG9uXCIsXCJyYW5kb21CdXR0b25cIilcbiAgICAgICAgcmFuZG9tQnV0dG9uLnRleHRDb250ZW50ID0gXCJSYW5kb20gUGxhY2VtZW50XCJcbiAgICAgICAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChtYW51YWxCdXR0b24pXG4gICAgICAgIGJ1dHRvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQocmFuZG9tQnV0dG9uKVxuXG4gICAgICAgIC8vIENyZWF0ZSBhIGRpdiB0byBzaG93IGEgbW9kYWwgd2luZG93IGFubm91bmNpbmcgdGhlIGVuZCBvZiB0aGUgZ2FtZVxuICAgICAgICBjb25zdCBtb2RhbCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixudWxsLFwidmljdG9yeU1vZGFsXCIpXG4gICAgICAgIGNvbnN0IG1vZGFsQ29udGVudCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixudWxsLG51bGwpXG4gICAgICAgIGNvbnN0IG1vZGFsVGV4dCA9IGNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsIFwibW9kYWwtdGV4dFwiKVxuICAgICAgICBjb25zdCByZXN0YXJ0QnV0dG9uID0gY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLG51bGwsXCJtb2RhbC1idXR0b25cIilcbiAgICAgICAgcmVzdGFydEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUmVzdGFydFwiXG4gICAgICAgIHJlc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCgpXG4gICAgICAgIH0pXG4gICAgICAgIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChtb2RhbFRleHQpXG4gICAgICAgIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChyZXN0YXJ0QnV0dG9uKVxuICAgICAgICBtb2RhbC5hcHBlbmRDaGlsZChtb2RhbENvbnRlbnQpXG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQobW9kYWwpXG5cbiAgICB9XG5cbiAgICAvLyBUb2dnbGUgY29tcHV0ZXIgYm9hcmQgc3RhdHVzIGJldHdlZW4gYmxvY2tlZCBhbmQgdW5ibG9ja2VkXG4gICAgZnVuY3Rpb24gdG9nZ2xlQ29tcHV0ZXJCb2FyZFN0YXR1cygpIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyR2FtZWJvYXJkR3JpZCA9IGdldEVsZW1lbnQoXCJjb21wdXRlckdhbWVib2FyZEdyaWRcIilcbiAgICAgICAgXG4gICAgICAgIGlmIChjb21wdXRlckdhbWVib2FyZEdyaWQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYmxvY2tlZFwiKSkge1xuICAgICAgICAgICAgY29tcHV0ZXJHYW1lYm9hcmRHcmlkLmNsYXNzTGlzdC5yZW1vdmUoXCJibG9ja2VkXCIpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb21wdXRlckdhbWVib2FyZEdyaWQuY2xhc3NMaXN0LmFkZChcImJsb2NrZWRcIilcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8gVG9nZ2xlIHVzZXIgYm9hcmQgc3RhdHVzIGJldHdlZW4gYmxvY2tlZCBhbmQgdW5ibG9ja2VkXG4gICAgZnVuY3Rpb24gdG9nZ2xlVXNlckJvYXJkU3RhdHVzKCkge1xuXG4gICAgICAgIGNvbnN0IHVzZXJHYW1lYm9hcmRHcmlkID0gZ2V0RWxlbWVudChcInVzZXJHYW1lYm9hcmRHcmlkXCIpXG5cbiAgICAgICAgaWYgKHVzZXJHYW1lYm9hcmRHcmlkLmNsYXNzTGlzdC5jb250YWlucyhcImJsb2NrZWRcIikpIHtcbiAgICAgICAgICAgIHVzZXJHYW1lYm9hcmRHcmlkLmNsYXNzTGlzdC5yZW1vdmUoXCJibG9ja2VkXCIpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB1c2VyR2FtZWJvYXJkR3JpZC5jbGFzc0xpc3QuYWRkKFwiYmxvY2tlZFwiKVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvLyBBc3NvY2lhdGVzIGFuIGV2ZW50IGxpc3RlbmVyIHRvIGV2ZXJ5IGNlbGwgb2YgdGhlIHVzZXIgYm9hcmRcbiAgICBmdW5jdGlvbiBvblVzZXJCb2FyZENsaWNrKGNhbGxiYWNrKSB7XG5cbiAgICAgICAgY29uc3QgdXNlckdhbWVib2FyZEdyaWQgPSBnZXRFbGVtZW50KFwidXNlckdhbWVib2FyZEdyaWRcIilcbiAgICAgICAgY29uc3QgdXNlckJvYXJkU3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjdXNlckdhbWVib2FyZEdyaWQgLmdhbWVib2FyZFNxdWFyZVwiKVxuICAgICAgICB1c2VyQm9hcmRTcXVhcmVzLmZvckVhY2goc3F1YXJlID0+IHtcbiAgICAgICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdXNlckdhbWVib2FyZEdyaWQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYmxvY2tlZFwiKSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhwYXJzZUludChzcXVhcmUuZ2V0QXR0cmlidXRlKFwiZGF0YS1pbmRleFwiKSwxMCksIHNlbGVjdGVkU2hpcE5hbWUsIG9yaWVudGF0aW9uKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICAvLyBBc3NvY2lhdGVzIGFuIGV2ZW50IGxpc3RlbmVyIHRvIGV2ZXJ5IGNlbGwgb2YgdGhlIGNvbXB1dGVyIGJvYXJkXG4gICAgZnVuY3Rpb24gb25Db21wdXRlckJvYXJkQ2xpY2soY2FsbGJhY2spIHtcblxuICAgICAgICBjb25zdCBjb21wdXRlckdhbWVib2FyZEdyaWQgPSBnZXRFbGVtZW50KFwiY29tcHV0ZXJHYW1lYm9hcmRHcmlkXCIpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQm9hcmRTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNjb21wdXRlckdhbWVib2FyZEdyaWQgLmdhbWVib2FyZFNxdWFyZVwiKVxuICAgICAgICBjb21wdXRlckJvYXJkU3F1YXJlcy5mb3JFYWNoKHNxdWFyZSA9PiB7XG4gICAgICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbXB1dGVyR2FtZWJvYXJkR3JpZC5jbGFzc0xpc3QuY29udGFpbnMoXCJibG9ja2VkXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHBhcnNlSW50KHNxdWFyZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWluZGV4XCIpLDEwKSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgLy8gQXNzb2NpYXRlcyBhbiBldmVudCBsaXN0ZW5lciB0byBcIk1hbnVhbCBQbGFjZW1lbnRcIiBidXR0b25cbiAgICBmdW5jdGlvbiBvbk1hbnVhbFBsYWNlbWVudENsaWNrKCkge1xuXG4gICAgICAgIGNvbnN0IG1hbnVhbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFudWFsQnV0dG9uXCIpXG4gICAgICAgIG1hbnVhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBEZWxldGUgdGhlIGJ1dHRvbnMgZnJvbSB0aGUgaW5zdHJ1Y3Rpb25zIGRpdlxuICAgICAgICAgICAgbWFudWFsQnV0dG9uLnJlbW92ZSgpXG4gICAgICAgICAgICBjb25zdCByYW5kb21CdXR0b24gPSBnZXRFbGVtZW50KFwicmFuZG9tQnV0dG9uXCIpXG4gICAgICAgICAgICByYW5kb21CdXR0b24ucmVtb3ZlKClcblxuICAgICAgICAgICAgLy8gQ2hhbmdlIGdhbWVib2FyZCBzdGF0dXNcbiAgICAgICAgICAgIHRvZ2dsZVVzZXJCb2FyZFN0YXR1cygpIC8vIEJsb2NrIHVzZXIgYm9hcmRcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQ2hhbmdlIGluc3RydWN0aW9ucyB0ZXh0XG4gICAgICAgICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluc3RydWN0aW9uc1wiKVxuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLnRleHRDb250ZW50ID0gXCJTZWxlY3QgYSBub3QgeWV0IHBsYWNlZCBzaGlwXCJcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQWRkaW5nIGV2ZW50IGxpc3RlbmVycyB0byB1c2VyIHNoaXBzXG4gICAgICAgICAgICBjb25zdCB1c2VyU2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnVzZXJTaGlwXCIpXG4gICAgICAgICAgICB1c2VyU2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgICAgICAgICBzaGlwLmNsYXNzTGlzdC5yZW1vdmUoXCJuby1ob3ZlclwiKVxuICAgICAgICAgICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4gaGFuZGxlU2hpcENsaWNrKHNoaXAsZXZlbnQpKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgLy8gQWRkaW5nIGV2ZW50IGxpc3RlbmVycyB0byB1c2VyIGJvYXJkIGNlbGxzXG4gICAgICAgICAgICBjb25zdCB1c2VyQm9hcmRTcXVhcmVzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3VzZXJHYW1lYm9hcmRHcmlkIC5nYW1lYm9hcmRTcXVhcmVcIikpXG4gICAgICAgICAgICB1c2VyQm9hcmRTcXVhcmVzLmZvckVhY2goKHNxdWFyZSxpbmRleCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBzaWJsaW5nc1RvQ29sb3IgPSBbXVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IGluZGV4XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvd1N0YXJ0ID0gc3RhcnQgLSAoc3RhcnQgJSAxMClcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93RW5kID0gcm93U3RhcnQgKyAxMFxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhwZWN0ZWRFbmQgPSBzdGFydCArIHNlbGVjdGVkU2hpcExlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4cGVjdGVkRW5kID4gcm93RW5kKSB7IC8vIGlmIHNoaXAgaXMgdG9vIGxvbmcgdG8gZml0IGluIHRoZSByb3dcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpYmxpbmdzVG9Db2xvciA9IHVzZXJCb2FyZFNxdWFyZXMuc2xpY2Uoc3RhcnQsIHJvd0VuZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWJsaW5nc1RvQ29sb3IuZm9yRWFjaChzaWJsaW5nID0+IHNpYmxpbmcuY2xhc3NMaXN0LmFkZChcImhvdmVyTGltaXRzRXhjZWVkZWRcIikpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIGlmIHNoaXAgZml0cyBpbiB0aGUgcm93XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWJsaW5nc1RvQ29sb3IgPSB1c2VyQm9hcmRTcXVhcmVzLnNsaWNlKHN0YXJ0LCBleHBlY3RlZEVuZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWJsaW5nc1RvQ29sb3IuZm9yRWFjaChzaWJsaW5nID0+IHNpYmxpbmcuY2xhc3NMaXN0LmFkZChcImhvdmVyXCIpKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gdmVydGljYWxcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgc3RhcnQgKyBzZWxlY3RlZFNoaXBMZW5ndGggKiAxMDsgaSArPSAxMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPCB1c2VyQm9hcmRTcXVhcmVzLmxlbmd0aCkgc2libGluZ3NUb0NvbG9yLnB1c2godXNlckJvYXJkU3F1YXJlc1tpXSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2libGluZ3NUb0NvbG9yLmxlbmd0aCA8IHNlbGVjdGVkU2hpcExlbmd0aCkgeyAvLyBpZiBzaGlwIGlzIHRvbyBsb25nIHRvIGZpdCBpbiB0aGUgY29sdW1uXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWJsaW5nc1RvQ29sb3IuZm9yRWFjaChzaWJsaW5nID0+IHNpYmxpbmcuY2xhc3NMaXN0LmFkZChcImhvdmVyTGltaXRzRXhjZWVkZWRcIikpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIGlmIHNoaXAgZml0cyBpbiB0aGUgY29sdW1uXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWJsaW5nc1RvQ29sb3IuZm9yRWFjaChzaWJsaW5nID0+IHNpYmxpbmcuY2xhc3NMaXN0LmFkZChcImhvdmVyXCIpKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdXNlckJvYXJkU3F1YXJlcy5mb3JFYWNoKHNpYmxpbmcgPT4gc2libGluZy5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJcIikpXG4gICAgICAgICAgICAgICAgICAgIHVzZXJCb2FyZFNxdWFyZXMuZm9yRWFjaChzaWJsaW5nID0+IHNpYmxpbmcuY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyTGltaXRzRXhjZWVkZWRcIikpXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIC8vIEFkZGluZyBldmVudCBsaXN0ZW5lciB0byBUIGtleSB0byByb3RhdGUgdGhlIHNlbGVjdGVkIHNoaXBcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGUua2V5ID09PSBcInRcIikgb3JpZW50YXRpb24gPSBvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIgPyBcInZlcnRpY2FsXCIgOiBcImhvcml6b250YWxcIlxuXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICAvLyBTaG93IGEgXCJTdGFydCBHYW1lXCIgYnV0dG9uXG4gICAgZnVuY3Rpb24gc2hvd1N0YXJ0R2FtZUJ1dHRvbigpIHtcblxuICAgICAgICAvLyBTaG93IHRoZSBcIlN0YXJ0IEdhbWVcIiBidXR0b25cbiAgICAgICAgY29uc3Qgc3RhcnRHYW1lQnV0dG9uID0gY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCBudWxsLCBcInN0YXJ0LWdhbWUtYnV0dG9uXCIpXG4gICAgICAgIHN0YXJ0R2FtZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiU1RBUlQgR0FNRVwiXG4gICAgICAgIHN0YXJ0R2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBEZWxldGUgXCJTdGFydCBHYW1lXCIgYnV0dG9uXG4gICAgICAgICAgICBzdGFydEdhbWVCdXR0b24ucmVtb3ZlKClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gRW5hYmxlIHRoZSBjb21wdXRlciBib2FyZFxuICAgICAgICAgICAgdG9nZ2xlQ29tcHV0ZXJCb2FyZFN0YXR1cygpXG5cbiAgICAgICAgICAgIC8vIENoYW5nZSBpbnN0cnVjdGlvbnMgdGV4dFxuICAgICAgICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnN0cnVjdGlvbnNcIilcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy50ZXh0Q29udGVudCA9IFwiQ2xpY2sgb24gYSBjZWxsIHRvIGF0dGFja1wiXG5cbiAgICAgICAgICAgIC8vIENoYW5nZSBjb21wdXRlciBpbmZvIHRleHRcbiAgICAgICAgICAgIGNvbnN0IGNvbXB1dGVySW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXJJbmZvXCIpXG4gICAgICAgICAgICBjb21wdXRlckluZm8udGV4dENvbnRlbnQgPSBcIkxhZGllcyBmaXJzdCwgcGxlYXNlLi4uXCJcblxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IGJ1dHRvbnNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1dHRvbnNDb250YWluZXJcIilcbiAgICAgICAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChzdGFydEdhbWVCdXR0b24pXG5cbiAgICB9XG5cbiAgICAvLyBBc3NvY2lhdGVzIGFuIGV2ZW50IGxpc3RlbmVyIHRvIFwiUmFuZG9tIFBsYWNlbWVudFwiIGJ1dHRvblxuICAgIGZ1bmN0aW9uIG9uUmFuZG9tUGxhY2VtZW50Q2xpY2soY2FsbGJhY2spIHtcblxuICAgICAgICBjb25zdCByYW5kb21CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JhbmRvbUJ1dHRvblwiKVxuICAgICAgICByYW5kb21CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICAgICAgLy8gRGVsZXRlIHRoZSBidXR0b25zIGZyb20gdGhlIGluc3RydWN0aW9ucyBkaXZcbiAgICAgICAgICAgIGNvbnN0IG1hbnVhbEJ1dHRvbiA9IGdldEVsZW1lbnQoXCJtYW51YWxCdXR0b25cIilcbiAgICAgICAgICAgIG1hbnVhbEJ1dHRvbi5yZW1vdmUoKVxuICAgICAgICAgICAgcmFuZG9tQnV0dG9uLnJlbW92ZSgpXG4gICAgICAgICAgICAvLyBDaGFuZ2UgaW5zdHJ1Y3Rpb25zIHRleHRcbiAgICAgICAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5zdHJ1Y3Rpb25zXCIpXG4gICAgICAgICAgICBpbnN0cnVjdGlvbnMudGV4dENvbnRlbnQgPSBcIkFsbCBzaGlwcyBwbGFjZWQuIENsaWNrIG9uIHRoZSBidXR0b24gYmVsb3cgdG8gc3RhcnQgdGhlIGdhbWVcIlxuICAgICAgICAgICAgLy8gQWRkIGNsYXNzIFwiLnBsYWNlZFwiIHRvIGFsbCB1c2VyIHNoaXBzXG4gICAgICAgICAgICBjb25zdCB1c2VyU2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnVzZXJTaGlwXCIpXG4gICAgICAgICAgICB1c2VyU2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzaGlwLmNsYXNzTGlzdC5hZGQoXCJwbGFjZWRcIilcbiAgICAgICAgICAgICAgICBzaGlwLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKVxuICAgICAgICAgICAgICAgIHNoaXAuY2xhc3NMaXN0LnJlbW92ZShcIm5vLWhvdmVyXCIpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFJldmVydCBnbG9iYWwgdmFyaWFibGVzIHRvIGRlZmF1bHQgdmFsdWVzXG4gICAgICAgICAgICBzZWxlY3RlZFNoaXBOYW1lID0gXCJcIlxuICAgICAgICAgICAgc2VsZWN0ZWRTaGlwTGVuZ3RoID0gMFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBCbG9jayB1c2VyIGdhbWVib2FyZFxuICAgICAgICAgICAgdG9nZ2xlVXNlckJvYXJkU3RhdHVzKClcblxuICAgICAgICAgICAgLy8gU2hvdyBcIlN0YXJ0IEdhbWVcIiBidXR0b25cbiAgICAgICAgICAgIHNob3dTdGFydEdhbWVCdXR0b24oKVxuXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICAvLyBMb2FkcyB0aGUgdXNlciBnYW1lYm9hcmRcbiAgICBmdW5jdGlvbiBsb2FkVXNlckdhbWVib2FyZChnYW1lYm9hcmQpIHtcblxuICAgICAgICBjb25zdCB1c2VyQm9hcmRTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiN1c2VyR2FtZWJvYXJkR3JpZCAuZ2FtZWJvYXJkU3F1YXJlXCIpXG4gICAgICAgIHVzZXJCb2FyZFNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlLGluZGV4KSA9PiB7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIHNoaXAgb24gdGhlIHNxdWFyZSwgYWRkIHRoZSBcIm9jY3VwaWVkXCIgY2xhc3MgdG8gaXRcbiAgICAgICAgICAgIGlmIChnYW1lYm9hcmRbaW5kZXhdICE9PSBcIldhdGVyXCIpIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwib2NjdXBpZWRcIilcbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIC8vIExvYWRzIGluaXRpYWwgVUkgc2NyZWVuXG4gICAgZnVuY3Rpb24gbG9hZENvdmVyTWFpblVJKGxvYWRNYWluVUlDYWxsYmFjaykge1xuICAgIFxuICAgICAgICAvLyBDcmVhdGUgYSBzY3JlZW4gPGRpdj48L2Rpdj4gdGhhdCBjb3ZlcnMgYWxsIHRoZSBzcGFjZSBhdmFpbGFibGUgb24gYnJvd3NlciBuYXZcbiAgICAgICAgY29uc3Qgc2NyZWVuID0gY3JlYXRlRWxlbWVudChcImRpdlwiLG51bGwsXCJzY3JlZW5cIilcblxuICAgICAgICAvLyBBcHBlbmQgaXQgdG8gYm9keSBlbGVtZW50XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyZWVuKVxuXG4gICAgICAgIC8vIENyZWF0ZSBoZWFkZXIsIG1haW4gYW5kIGZvb3RlciBkaXZzIGluc2lkZSBzY3JlZW4gZGl2XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIixudWxsLFwiaGVhZGVyXCIpXG4gICAgICAgIGNvbnN0IG1haW4gPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsbnVsbCxcIm1haW5cIilcbiAgICAgICAgY29uc3QgZm9vdGVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLG51bGwsXCJmb290ZXJcIilcbiAgICAgICAgXG4gICAgICAgIHNjcmVlbi5hcHBlbmRDaGlsZChoZWFkZXIpXG4gICAgICAgIHNjcmVlbi5hcHBlbmRDaGlsZChtYWluKVxuICAgICAgICBzY3JlZW4uYXBwZW5kQ2hpbGQoZm9vdGVyKVxuXG4gICAgICAgIC8vIENyZWF0ZSBhIHRpdGxlIGZvciB0aGUgZ2FtZSBhbmQgYXBwZW5kIGl0IHRvIHRoZSBoZWFkZXJcbiAgICAgICAgY29uc3QgdGl0bGUgPSBjcmVhdGVFbGVtZW50KFwiaDFcIixcInRpdGxlXCIsbnVsbClcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIkJBVFRMRVNISVBcIlxuICAgICAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpXG5cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBjcmVkaXRzIGFuZCBhcHBlbmQgdGhlbSB0byB0aGUgZm9vdGVyXG4gICAgICAgIGNvbnN0IGNyZWRpdHMgPSBjcmVhdGVFbGVtZW50KFwicFwiLFwiY3JlZGl0c1wiLG51bGwpXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBxdW90ZXNcbiAgICAgICAgY3JlZGl0cy5pbm5lckhUTUwgPSAnQ3JlYXRlZCBieSBWRVJFR09STi4gRm9sbG93IG15IHdvcmsgb24gR2l0SHViOiA8YnI+PGJyPjxhIGNsYXNzPVwiZ2l0aHViLWxpbmtcIiBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3ZlcmVnb3JuXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPjxzdmcgY2xhc3M9XCJnaXRodWItaWNvblwiIHdpZHRoPVwiMzJcIiBoZWlnaHQ9XCIzMlwiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTggMEMzLjU4IDAgMCAzLjU4IDAgOGMwIDMuNTQgMi4yOSA2LjUzIDUuNDcgNy41OS40LjA3LjU1LS4xNy41NS0uMzggMC0uMTktLjAxLS44Mi0uMDEtMS40OS0yLjAxLjM3LTIuNTMtLjQ5LTIuNjktLjk0LS4wOS0uMjMtLjQ4LS45NC0uODItMS4xMy0uMjgtLjE1LS42OC0uNTItLjAxLS41My42My0uMDEgMS4wOC41OCAxLjIzLjgyLjcyIDEuMjEgMS44Ny44NyAyLjMzLjY2LjA3LS41Mi4yOC0uODcuNTEtMS4wNy0xLjc4LS4yLTMuNjQtLjg5LTMuNjQtMy45NSAwLS44Ny4zMS0xLjU5LjgyLTIuMTUtLjA4LS4yLS4zNi0xLjAyLjA4LTIuMTIgMCAwIC42Ny0uMjEgMi4yLjgyLjY0LS4xOCAxLjMyLS4yNyAyLS4yNy42OCAwIDEuMzYuMDkgMiAuMjcgMS41My0xLjA0IDIuMi0uODIgMi4yLS44Mi40NCAxLjEuMTYgMS45Mi4wOCAyLjEyLjUxLjU2LjgyIDEuMjcuODIgMi4xNSAwIDMuMDctMS44NyAzLjc1LTMuNjUgMy45NS4yOS4yNS41NC43My41NCAxLjQ4IDAgMS4wNy0uMDEgMS45My0uMDEgMi4yIDAgLjIxLjE1LjQ2LjU1LjM4QTguMDEzIDguMDEzIDAgMCAwIDE2IDhjMC00LjQyLTMuNTgtOC04LTh6XCIvPjwvc3ZnPjwvYT4nXG4gICAgICAgIGZvb3Rlci5hcHBlbmRDaGlsZChjcmVkaXRzKVxuXG4gICAgICAgIC8vIE1haW4gY29udGVudFxuICAgICAgICBjb25zdCBnbG93aW5nQnV0dG9uID0gY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLFwiZ2xvd2luZy1idXR0b25cIixudWxsKVxuICAgICAgICBnbG93aW5nQnV0dG9uLnRleHRDb250ZW50ID0gXCJQTEFZXCJcbiAgICAgICAgZ2xvd2luZ0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZGVsZXRlTWFpblVJKClcbiAgICAgICAgICAgIGxvYWRNYWluVUlDYWxsYmFjaygpXG4gICAgICAgIH0pXG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQoZ2xvd2luZ0J1dHRvbilcblxuICAgICAgICAvLyBTVkcgU2hpcCBzaGFwZXNcbiAgICAgICAgY29uc3QgY2FycmllclNoYXBlID0gY3JlYXRlRWxlbWVudChcIm9iamVjdFwiLG51bGwsXCJjYXJyaWVyLXNoYXBlXCIpXG4gICAgICAgIGNhcnJpZXJTaGFwZS5kYXRhID0gY2FycmllclN2Z1xuICAgICAgICBtYWluLmFwcGVuZENoaWxkKGNhcnJpZXJTaGFwZSlcblxuICAgICAgICBjb25zdCBzdWJtYXJpbmVTaGFwZSA9IGNyZWF0ZUVsZW1lbnQoXCJvYmplY3RcIixudWxsLFwic3VibWFyaW5lLXNoYXBlXCIpXG4gICAgICAgIHN1Ym1hcmluZVNoYXBlLmRhdGEgPSBzdWJtYXJpbmVTdmdcbiAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChzdWJtYXJpbmVTaGFwZSlcblxuICAgICAgICBjb25zdCBiYXR0bGVzaGlwU2hhcGUgPSBjcmVhdGVFbGVtZW50KFwib2JqZWN0XCIsbnVsbCxcImJhdHRsZXNoaXAtc2hhcGVcIilcbiAgICAgICAgYmF0dGxlc2hpcFNoYXBlLmRhdGEgPSBiYXR0bGVzaGlwU3ZnXG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQoYmF0dGxlc2hpcFNoYXBlKVxuXG4gICAgICAgIGNvbnN0IGRlc3Ryb3llclNoYXBlID0gY3JlYXRlRWxlbWVudChcIm9iamVjdFwiLG51bGwsXCJkZXN0cm95ZXItc2hhcGVcIilcbiAgICAgICAgZGVzdHJveWVyU2hhcGUuZGF0YSA9IGRlc3Ryb3llclN2Z1xuICAgICAgICBtYWluLmFwcGVuZENoaWxkKGRlc3Ryb3llclNoYXBlKVxuXG4gICAgICAgIGNvbnN0IHBhdHJvbFNoYXBlID0gY3JlYXRlRWxlbWVudChcIm9iamVjdFwiLG51bGwsXCJwYXRyb2wtc2hhcGVcIilcbiAgICAgICAgcGF0cm9sU2hhcGUuZGF0YSA9IHBhdHJvbFN2Z1xuICAgICAgICBtYWluLmFwcGVuZENoaWxkKHBhdHJvbFNoYXBlKVxuXG4gICAgfVxuXG4gICAgLy8gRGVsZXRlIEV2ZW50IExpc3RlbmVycyBhc3NvY2lhdGVkIHdpdGggdXNlciBTaGlwcyBwbGFjZW1lbnQgKHdoZW4geWV0IHBsYWNlZClcbiAgICBmdW5jdGlvbiBkZWxldGVVc2VyR2FtZWJvYXJkRXZlbnRMaXN0ZW5lcnMoKSB7XG5cbiAgICAgICAgLy8gRmlyc3QgcmVtb3ZlIHRoZSBldmVudCBsaXN0ZW5lcnMgZnJvbSB0aGUgc2hpcHNcbiAgICAgICAgY29uc3QgdXNlclNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi51c2VyU2hpcFwiKVxuICAgICAgICB1c2VyU2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgICAgIHNoaXAucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4gaGFuZGxlU2hpcENsaWNrKHNoaXAsZXZlbnQpKVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIFRoZW4gcmVtb3ZlIHRoZSBldmVudCBsaXN0ZW5lcnMgZnJvbSB0aGUgZ2FtZWJvYXJkIHNxdWFyZXNcbiAgICAgICAgY29uc3QgdXNlckJvYXJkU3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjdXNlckdhbWVib2FyZEdyaWQgLmdhbWVib2FyZFNxdWFyZVwiKVxuICAgICAgICB1c2VyQm9hcmRTcXVhcmVzLmZvckVhY2goc3F1YXJlID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc3F1YXJlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7fSlcbiAgICAgICAgICAgIHNxdWFyZS5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsICgpID0+IHt9KVxuICAgICAgICAgICAgc3F1YXJlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCAoKSA9PiB7fSlcblxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgLy8gQ2hhbmdlIGJhY2tncm91bmQgY29sb3Igb2YgdGhlIHNxdWFyZXMgcGFzc2VkIGFzIGFyZ3VtZW50XG4gICAgZnVuY3Rpb24gdXBkYXRlVXNlckdhbWVib2FyZFNoaXBQbGFjZW1lbnQoYXJyYXlPZlNxdWFyZXMpIHtcblxuICAgICAgICBhcnJheU9mU3F1YXJlcy5mb3JFYWNoKHNxdWFyZSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHVzZXJCb2FyZFNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWluZGV4PVwiJHtzcXVhcmV9XCJdYClcbiAgICAgICAgICAgIHVzZXJCb2FyZFNxdWFyZS5jbGFzc0xpc3QuYWRkKFwib2NjdXBpZWRcIilcblxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgLy8gVXBkYXRlcyB1c2VyIHNoaXB5YXJkIHdoZW4gYSBzaGlwIGlzIHBsYWNlZFxuICAgIGZ1bmN0aW9uIHVwZGF0ZVVzZXJTaGlweWFyZChzaGlwTmFtZSkge1xuXG4gICAgICAgIGNvbnN0IHNoaXBEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtzaGlwTmFtZX1gKVxuICAgICAgICBzaGlwRGl2LmNsYXNzTGlzdC5hZGQoXCJwbGFjZWRcIilcbiAgICAgICAgc2hpcERpdi5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIilcblxuICAgICAgICAvLyBVcGRhdGUgZ2xvYmFsIHZhcmlhYmxlc1xuICAgICAgICBzZWxlY3RlZFNoaXBMZW5ndGggPSAwXG4gICAgICAgIHNlbGVjdGVkU2hpcE5hbWUgPSBcIlwiXG4gICAgICAgIHBsYWNlZFNoaXBzQ291bnRlciArPSAxXG5cbiAgICAgICAgLy8gSWYgYWxsIHNoaXBzIGFyZSBwbGFjZWQsXG4gICAgICAgIC8vIHNob3cgdGhlIFwiU3RhcnQgR2FtZVwiIGJ1dHRvbiwgXG4gICAgICAgIC8vIHVwZGF0ZSBpbmZvIGFuZCBibG9jayB1c2VyIGdhbWVib2FyZFxuICAgICAgICBpZiAocGxhY2VkU2hpcHNDb3VudGVyID09PSA1KSB7XG5cbiAgICAgICAgICAgIC8vIEJsb2NrIHVzZXIgZ2FtZWJvYXJkXG4gICAgICAgICAgICB0b2dnbGVVc2VyQm9hcmRTdGF0dXMoKVxuICAgICAgICAgICAgLy8gQ2hhbmdlIGluc3RydWN0aW9ucyB0ZXh0XG4gICAgICAgICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluc3RydWN0aW9uc1wiKVxuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLnRleHRDb250ZW50ID0gXCJBbGwgc2hpcHMgcGxhY2VkLiBDbGljayBvbiB0aGUgYnV0dG9uIGJlbG93IHRvIHN0YXJ0IHRoZSBnYW1lXCJcblxuICAgICAgICAgICAgLy8gU2hvdyBcIlN0YXJ0IEdhbWVcIiBidXR0b25cbiAgICAgICAgICAgIHNob3dTdGFydEdhbWVCdXR0b24oKVxuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIFVwZGF0ZXMgY29tcHV0ZXIgZ2FtZWJvYXJkIHdoZW4gYW4gYXR0YWNrIGlzIG1hZGVcbiAgICBmdW5jdGlvbiB1cGRhdGVDb21wdXRlckdhbWVib2FyZChzcXVhcmVOdW0sYXR0YWNrUmVzdWx0KSB7XG5cbiAgICAgICAgY29uc3QgY29tcHV0ZXJCb2FyZFNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjb21wdXRlckdhbWVib2FyZEdyaWQgLmdhbWVib2FyZFNxdWFyZVtkYXRhLWluZGV4PVwiJHtzcXVhcmVOdW19XCJdYClcblxuICAgICAgICBpZiAoYXR0YWNrUmVzdWx0ID09PSBcIk1pc3NcIikge1xuXG4gICAgICAgICAgICBjb21wdXRlckJvYXJkU3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpXG5cbiAgICAgICAgfSBlbHNlIGlmIChhdHRhY2tSZXN1bHQgPT09IFwiU2hpcEhpdFwiKSB7XG5cbiAgICAgICAgICAgIGNvbXB1dGVyQm9hcmRTcXVhcmUuY2xhc3NMaXN0LmFkZChcImhpdFwiKVxuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIFVwZGF0ZXMgdXNlciBnYW1lYm9hcmQgd2hlbiBhbiBhdHRhY2sgaXMgbWFkZVxuICAgIGZ1bmN0aW9uIHVwZGF0ZVVzZXJHYW1lYm9hcmQoc3F1YXJlTnVtLGF0dGFja1Jlc3VsdCkge1xuXG4gICAgICAgIGNvbnN0IHVzZXJCb2FyZFNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCN1c2VyR2FtZWJvYXJkR3JpZCAuZ2FtZWJvYXJkU3F1YXJlW2RhdGEtaW5kZXg9XCIke3NxdWFyZU51bX1cIl1gKVxuXG4gICAgICAgIGlmIChhdHRhY2tSZXN1bHQgPT09IFwiTWlzc1wiKSB7XG5cbiAgICAgICAgICAgIHVzZXJCb2FyZFNxdWFyZS5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKVxuXG4gICAgICAgIH0gZWxzZSBpZiAoYXR0YWNrUmVzdWx0ID09PSBcIlNoaXBIaXRcIikge1xuXG4gICAgICAgICAgICB1c2VyQm9hcmRTcXVhcmUuY2xhc3NMaXN0LmFkZChcImhpdFwiKVxuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIFVwZGF0ZXMgY29tcHV0ZXIgc2hpcHlhcmQgd2hlbiBhIHNoaXAgaXMgc3Vua1xuICAgIGZ1bmN0aW9uIHVwZGF0ZUNvbXB1dGVyU2hpcHlhcmQoc2hpcE5hbWUpIHtcblxuICAgICAgICBjb25zdCBzaGlwRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NvbXB1dGVyU3RhdHVzUGFuZWwgLiR7c2hpcE5hbWV9YClcbiAgICAgICAgc2hpcERpdi5jbGFzc0xpc3QuYWRkKFwic3Vua1wiKVxuXG4gICAgfVxuXG4gICAgLy8gVXBkYXRlcyB1c2VyIHNoaXB5YXJkIHdoZW4gYSBzaGlwIGlzIHN1bmtcbiAgICBmdW5jdGlvbiB1cGRhdGVVc2VyU2hpcHlhcmRBZnRlckNvbXB1dGVyQXR0YWNrKHNoaXBOYW1lKSB7XG5cbiAgICAgICAgY29uc3Qgc2hpcERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCN1c2VyU3RhdHVzUGFuZWwgLiR7c2hpcE5hbWV9YClcbiAgICAgICAgc2hpcERpdi5jbGFzc0xpc3QuYWRkKFwic3Vua1wiKVxuXG4gICAgfVxuXG4gICAgLy8gU2hvd3MgYSBtb2RhbCB3aW5kb3cgYW5ub3VuY2luZyB0aGUgd2lubmVyIGFuZCBhIGJ1dHRvbiB0byByZXN0YXJ0IHRoZSBnYW1lXG4gICAgZnVuY3Rpb24gc2hvd1ZpY3RvcnlNb2RhbCh3aW5uZXIpIHtcblxuICAgICAgICBjb25zdCBtb2RhbCA9IGdldEVsZW1lbnQoXCJ2aWN0b3J5TW9kYWxcIilcbiAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIlxuICAgICAgICBjb25zdCBtb2RhbFRleHQgPSBnZXRFbGVtZW50KFwibW9kYWwtdGV4dFwiKVxuICAgICAgICBtb2RhbFRleHQudGV4dENvbnRlbnQgPSBgJHt3aW5uZXJ9IHdpbnMhYFxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlRWxlbWVudCxcbiAgICAgICAgZ2V0RWxlbWVudCxcbiAgICAgICAgbG9hZENvdmVyTWFpblVJLFxuICAgICAgICBvblVzZXJCb2FyZENsaWNrLFxuICAgICAgICBvblJhbmRvbVBsYWNlbWVudENsaWNrLFxuICAgICAgICBsb2FkVXNlckdhbWVib2FyZCxcbiAgICAgICAgbG9hZEdhbWVVSSxcbiAgICAgICAgZGVsZXRlVXNlckdhbWVib2FyZEV2ZW50TGlzdGVuZXJzLFxuICAgICAgICBvbk1hbnVhbFBsYWNlbWVudENsaWNrLFxuICAgICAgICBzaG93VXNlckluZm8sXG4gICAgICAgIHVwZGF0ZVVzZXJHYW1lYm9hcmRTaGlwUGxhY2VtZW50LFxuICAgICAgICB1cGRhdGVVc2VyU2hpcHlhcmQsXG4gICAgICAgIG9uQ29tcHV0ZXJCb2FyZENsaWNrLFxuICAgICAgICBzaG93Q29tcHV0ZXJJbmZvLFxuICAgICAgICB1cGRhdGVDb21wdXRlckdhbWVib2FyZCxcbiAgICAgICAgdXBkYXRlQ29tcHV0ZXJTaGlweWFyZCxcbiAgICAgICAgc2hvd1ZpY3RvcnlNb2RhbCxcbiAgICAgICAgdG9nZ2xlQ29tcHV0ZXJCb2FyZFN0YXR1cyxcbiAgICAgICAgdG9nZ2xlVXNlckJvYXJkU3RhdHVzLFxuICAgICAgICB1cGRhdGVVc2VyU2hpcHlhcmRBZnRlckNvbXB1dGVyQXR0YWNrLFxuICAgICAgICB1cGRhdGVVc2VyR2FtZWJvYXJkXG4gICAgfVxuXG59KSgpIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1CcnVubytBY2UmZGlzcGxheT1zd2FwKTtcIl0pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9SUJNK1BsZXgrTW9ubyZkaXNwbGF5PXN3YXApO1wiXSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXHRib3JkZXI6IDA7XFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcblxcdGZvbnQ6IGluaGVyaXQ7XFxuXFx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG59XFxuYm9keSB7XFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxufVxcbm9sLCB1bCB7XFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXG59XFxuYmxvY2txdW90ZSwgcSB7XFxuXFx0cXVvdGVzOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuXFx0Y29udGVudDogJyc7XFxuXFx0Y29udGVudDogbm9uZTtcXG59XFxudGFibGUge1xcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxufVxcblxcbi8qIE1ZIE9XTiBTVFlMRVMgRlJPTSBIRVJFICovXFxuXFxuLyogRm9udHMgKi9cXG5cXG5hOnZpc2l0ZWQge1xcbiAgICBjb2xvcjogI2ZmZjtcXG59XFxuXFxuI3NjcmVlbiB7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDsgLyogb3IgXFxcImFic29sdXRlXFxcIiAqL1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIHotaW5kZXg6IDA7XFxufVxcblxcbi8qIEhFQURFUiAqL1xcblxcbiNoZWFkZXIge1xcbiAgICBoZWlnaHQ6IDEwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzQ3NDc0NztcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYm9yZGVyLWJvdHRvbTogc29saWQgMXB4ICMwMDA7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICB6LWluZGV4OiAzO1xcbn1cXG5cXG4udGl0bGUge1xcbiAgICBmb250LXNpemU6IDJlbTtcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBjb2xvcjogI2U4ZjkwMTtcXG59XFxuXFxuI21haW4ge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGhlaWdodDogODAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpO1xcbn1cXG5cXG4vKiBDT1ZFUiAqL1xcblxcbi5nbG93aW5nLWJ1dHRvbiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0Q0FGNTA7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBmb250LXNpemU6IDNlbTtcXG4gICAgcGFkZGluZzogMjBweCAzMHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjVzO1xcbiAgICBib3gtc2hhZG93OiAwIDAgNXB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcXG59XFxuICBcXG4uZ2xvd2luZy1idXR0b246aG92ZXIge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAwIDIwcHggcmdiYSg3NiwgMTc1LCA4MCwgMC42KTtcXG59XFxuXFxuQGtleWZyYW1lcyBnbG93aW5nMiB7XFxuICAgIDAlIHtcXG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDAgMTBweCByZ2JhKDc2LCAxNzUsIDgwLCAwLjIpO1xcbiAgICB9XFxuICAgIDUwJSB7XFxuICAgICAgICBib3gtc2hhZG93OiAwIDAgMTBweCByZ2JhKDAsIDAsIDAsIDAuMiksIDAgMCAyMHB4IHJnYmEoNzYsIDE3NSwgODAsIDAuNSk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICBib3gtc2hhZG93OiAwIDAgNXB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAwIDEwcHggcmdiYSg3NiwgMTc1LCA4MCwgMC4yKTtcXG4gICAgfVxcbn1cXG5cXG4uZ2xvd2luZy1idXR0b24ge1xcbiAgICBhbmltYXRpb246IGdsb3dpbmcyIDJzIGluZmluaXRlO1xcbn1cXG5cXG4vKiBDT1ZFUiBTSElQUyAqL1xcblxcbiNjYXJyaWVyLXNoYXBlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMTgwcHg7XFxuICAgIGhlaWdodDogNjBweDtcXG4gICAgdG9wOiAyMCU7XFxuICAgIGFuaW1hdGlvbjogbW92ZS1yaWdodC1sZWZ0IDEwcyBsaW5lYXIgaW5maW5pdGU7IC8qIGFkanVzdCB0aGUgdGltZSBhcyBuZWVkZWQgKi9cXG4gICAgei1pbmRleDogMTtcXG59XFxuXFxuQGtleWZyYW1lcyBtb3ZlLXJpZ2h0LWxlZnQge1xcbiAgICAwJSB7IHJpZ2h0OiAtMTAwJTsgfSAvKiBTdGFydCBmcm9tIG9mZiB0aGUgcmlnaHQgb2YgdGhlIHNjcmVlbiAqL1xcbiAgICAxMDAlIHsgcmlnaHQ6IDEwMCU7IH0gLyogRW5kIG9mZiB0aGUgbGVmdCBvZiB0aGUgc2NyZWVuICovXFxufVxcblxcbiNzdWJtYXJpbmUtc2hhcGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxMjBweDtcXG4gICAgaGVpZ2h0OiA2MHB4O1xcbiAgICBsZWZ0OiAyMCU7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXG4gICAgYW5pbWF0aW9uOiBtb3ZlLXRvcC1kb3duIDEwcyBsaW5lYXIgaW5maW5pdGU7XFxuICAgIHotaW5kZXg6IDE7XFxufVxcblxcbkBrZXlmcmFtZXMgbW92ZS10b3AtZG93biB7XFxuICAgIDAlIHsgdG9wOiAtMjAwcHggfVxcbiAgICAxMDAlIHsgdG9wOiAxNTAwcHh9XFxufVxcblxcbiNiYXR0bGVzaGlwLXNoYXBlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMTUwcHg7XFxuICAgIGhlaWdodDogNjBweDtcXG4gICAgdG9wOiA2NSU7XFxuICAgIGFuaW1hdGlvbjogbW92ZS1sZWZ0LXJpZ2h0IDEwcyBsaW5lYXIgaW5maW5pdGU7IC8qIGFkanVzdCB0aGUgdGltZSBhcyBuZWVkZWQgKi9cXG4gICAgei1pbmRleDogMTtcXG59XFxuXFxuQGtleWZyYW1lcyBtb3ZlLWxlZnQtcmlnaHQge1xcbiAgICAwJSB7IGxlZnQ6IC0xMDAlOyB9IC8qIFN0YXJ0IGZyb20gb2ZmIHRoZSBsZWZ0IG9mIHRoZSBzY3JlZW4gKi9cXG4gICAgMTAwJSB7IGxlZnQ6IDEwMCU7IH0gLyogRW5kIG9mZiB0aGUgcmlnaHQgb2YgdGhlIHNjcmVlbiAqL1xcbn1cXG5cXG4jZGVzdHJveWVyLXNoYXBlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMTIwcHg7XFxuICAgIGhlaWdodDogNjBweDtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTtcXG4gICAgbGVmdDogODAlO1xcbiAgICBhbmltYXRpb246IG1vdmUtZG93bi10b3AgMTBzIGxpbmVhciBpbmZpbml0ZTtcXG4gICAgei1pbmRleDogMTtcXG59XFxuXFxuQGtleWZyYW1lcyBtb3ZlLWRvd24tdG9wIHtcXG4gICAgMCUgeyB0b3A6IDE1MDBweDsgfVxcbiAgICAxMDAlIHsgdG9wOiAtMjAwcHg7IH1cXG59XFxuXFxuI3BhdHJvbC1zaGFwZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDkwcHg7XFxuICAgIGhlaWdodDogNjBweDtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcXG4gICAgdG9wOiA5MCU7XFxuICAgIGFuaW1hdGlvbjogbW92ZS1yaWdodC1sZWZ0IDEwcyBsaW5lYXIgaW5maW5pdGU7XFxuICAgIHotaW5kZXg6IDE7XFxufVxcblxcbi8qIE1BSU4gLSBHQU1FICovXFxuXFxuLnBsYXllclNpZGUge1xcbiAgICB3aWR0aDogNTAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIHBhZGRpbmc6IDUlO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICAgIGdhcDogMmVtO1xcbiAgICBtYXJnaW4tdG9wOiA1ZW07XFxufVxcblxcbi5nYW1lSGVhZGVyIHtcXG4gICAgd2lkdGg6IDQ0MHB4O1xcbiAgICBmb250LXNpemU6IDEuNWVtO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbiN1c2VyR2FtZUhlYWRlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGQzExNTk7XFxufVxcblxcbiNjb21wdXRlckdhbWVIZWFkZXJ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM3MjdEOTU7XFxufVxcblxcbi5nYW1lYm9hcmRDb250YWluZXIge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi54SGVhZGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAganVzdGlmeS1jb250ZW50OiBsZWZ0O1xcbiAgICBwYWRkaW5nLWxlZnQ6IDIuNWVtO1xcbn1cXG5cXG4ueEhlYWRlclNxdWFyZSB7XFxuICAgIHdpZHRoOiAzOHB4O1xcbiAgICBoZWlnaHQ6IDM4cHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcbn1cXG5cXG4uYm90dG9tQm9hcmQge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi55SGVhZGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuLnlIZWFkZXJTcXVhcmUge1xcbiAgICB3aWR0aDogMzhweDtcXG4gICAgaGVpZ2h0OiAzOHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBmb250LXNpemU6IDFlbTtcXG59XFxuXFxuLnlIZWFkZXJTaGlweWFyZCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcbiAgICB3cml0aW5nLW1vZGU6IHZlcnRpY2FsLXJsO1xcbiAgICB0ZXh0LW9yaWVudGF0aW9uOiBtaXhlZDtcXG4gICAgcm90YXRlOiAxODBkZWc7XFxuICAgIG1hcmdpbi10b3A6IDEuOGVtO1xcbn1cXG5cXG4uZ3JpZFBhbmVsQ29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDM4MHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uZ2FtZWJvYXJkR3JpZCB7XFxuICAgIHdpZHRoOiAzODBweDtcXG4gICAgaGVpZ2h0OiAzODBweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbn1cXG5cXG4jdXNlckdhbWVib2FyZEdyaWQge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuI3VzZXJHYW1lYm9hcmRHcmlkLmJsb2NrZWQge1xcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XFxufVxcblxcbi5nYW1lYm9hcmRTcXVhcmUge1xcbiAgICB3aWR0aDogMzZweDtcXG4gICAgaGVpZ2h0OiAzNnB4O1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjZmZmO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBmb250LXNpemU6IDFlbTtcXG4gICAgY3Vyc29yOiBpbmhlcml0O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTFkY2ZmO1xcbn1cXG5cXG4jdXNlckdhbWVib2FyZEdyaWQgLmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzk5OTk5OTtcXG4gICAgb3BhY2l0eTogMC43O1xcbn1cXG5cXG4jdXNlckdhbWVib2FyZEdyaWQgLm9jY3VwaWVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzk5OTk5OTtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuXFxuI3VzZXJHYW1lYm9hcmRHcmlkIC5ob3ZlckxpbWl0c0V4Y2VlZGVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2MyMzQzNDtcXG59XFxuXFxuI2NvbXB1dGVyR2FtZWJvYXJkR3JpZCAuZ2FtZWJvYXJkU3F1YXJlOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzFiODhlNztcXG59XFxuXFxuI2NvbXB1dGVyR2FtZWJvYXJkR3JpZC5ibG9ja2VkIC5nYW1lYm9hcmRTcXVhcmU6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTFkY2ZmO1xcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XFxufVxcblxcbi5nYW1lYm9hcmRTcXVhcmUubWlzcyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNjMjM0MzQ7XFxufVxcblxcbi5nYW1lYm9hcmRTcXVhcmUubWlzczpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNjMjM0MzQhaW1wb3J0YW50O1xcbn1cXG5cXG4uZ2FtZWJvYXJkU3F1YXJlLmhpdCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0Q0FGNTA7XFxufVxcblxcbi5nYW1lYm9hcmRTcXVhcmUuaGl0OmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRDQUY1MCFpbXBvcnRhbnQ7XFxufVxcblxcbi8qIFNISVBZQVJEICovXFxuXFxuLnN0YXR1c1BhbmVsIHtcXG4gICAgd2lkdGg6IDM4MnB4O1xcbiAgICBoZWlnaHQ6IDc4cHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAgbWFyZ2luLXRvcDogMzZweDtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHJnYmEoMCwgMCwgMCwgMC41KSAycHgsIHRyYW5zcGFyZW50IDJweCksIGxpbmVhci1ncmFkaWVudCg5MGRlZywgcmdiYSgwLCAwLCAwLCAwLjUpIDJweCwgdHJhbnNwYXJlbnQgMnB4KTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAzOHB4IDM4cHg7XFxuICAgIGdhcDogMnB4O1xcbn1cXG5cXG4uY2FycmllciB7XFxuICAgIHdpZHRoOiAxODhweDtcXG4gICAgaGVpZ2h0OiAzNnB4O1xcbn1cXG5cXG4uYmF0dGxlc2hpcCB7XFxuICAgIHdpZHRoOiAxNTBweDtcXG4gICAgaGVpZ2h0OiAzNnB4O1xcbn1cXG5cXG4uc3VibWFyaW5lIHtcXG4gICAgd2lkdGg6IDExMnB4O1xcbiAgICBoZWlnaHQ6IDM2cHg7XFxufVxcblxcbi5kZXN0cm95ZXIge1xcbiAgICB3aWR0aDogMTEycHg7XFxuICAgIGhlaWdodDogMzZweDtcXG59XFxuXFxuLmJvYXQge1xcbiAgICB3aWR0aDogNzRweDtcXG4gICAgaGVpZ2h0OiAzNnB4O1xcbn1cXG5cXG4udXNlclNoaXAge1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIG9wYWNpdHk6IDAuNztcXG59XFxuXFxuLnVzZXJTaGlwOmhvdmVyIHtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuXFxuLnVzZXJTaGlwLm5vLWhvdmVyOmhvdmVyIHtcXG4gICAgb3BhY2l0eTogMC43O1xcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XFxufVxcblxcbi51c2VyU2hpcC5zZWxlY3RlZCB7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcblxcbi51c2VyU2hpcC5wbGFjZWQge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XFxufVxcblxcbi5zaGlwLnN1bmsge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5zaGlwLnN1bms6OmFmdGVyIHtcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDJweDtcXG4gICAgYmFja2dyb3VuZDogcmdiKDIzMSwgOSwgOSk7XFxufVxcblxcbkBrZXlmcmFtZXMgZ2xvd2luZyB7XFxuICAgIDAlIHsgY29sb3I6ICNGQzExNTk7IH1cXG4gICAgNTAlIHsgY29sb3I6ICMwMDA7IH1cXG4gICAgMTAwJSB7IGNvbG9yOiAjRkMxMTU5OyB9XFxuICB9XFxuXFxuLmluc3RydWN0aW9ucyB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGZvbnQtc2l6ZTogMC44ZW07XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjVlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbmltYXRpb246IGdsb3dpbmcgMS41cyBsaW5lYXIgaW5maW5pdGU7XFxufVxcblxcbi5idXR0b25zQ29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGdhcDogMmVtO1xcbn1cXG5cXG4ucGxhY2VtZW50QnV0dG9uIHtcXG4gICAgd2lkdGg6IDE4MHB4O1xcbiAgICBoZWlnaHQ6IDUwcHg7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICNmZmY7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0Q0FGNTA7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBmb250LWZhbWlseTogJ0lCTSBQbGV4IE1vbm8nLCBtb25vc3BhY2U7XFxuICAgIGZvbnQtc2l6ZTogMC44ZW07XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgcGFkZGluZzogMWVtO1xcbn1cXG5cXG4ucGxhY2VtZW50QnV0dG9uOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzNlOGU0MTtcXG59XFxuXFxuI3N0YXJ0LWdhbWUtYnV0dG9uIHtcXG4gICAgd2lkdGg6IDE4MHB4O1xcbiAgICBoZWlnaHQ6IDUwcHg7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICNmZmY7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0Q0FGNTA7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBmb250LWZhbWlseTogJ0lCTSBQbGV4IE1vbm8nLCBtb25vc3BhY2U7XFxuICAgIGZvbnQtc2l6ZTogMC44ZW07XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgcGFkZGluZzogMWVtO1xcbn1cXG5cXG4jc3RhcnQtZ2FtZS1idXR0b246aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2U4ZTQxO1xcbn1cXG5cXG4uY29tcHV0ZXJJbmZvIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgZm9udC1zaXplOiAwLjhlbTtcXG4gICAgbGluZS1oZWlnaHQ6IDEuNWVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbiN2aWN0b3J5TW9kYWwge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHotaW5kZXg6IDE7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHRvcDogMDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgb3ZlcmZsb3c6IGF1dG87XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDAsMC40KTtcXG4gIH1cXG4gIFxcbiAgI3ZpY3RvcnlNb2RhbCA+IGRpdiB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZWZlZmU7XFxuICAgIHBhZGRpbmc6IDIwcHg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICM4ODg7XFxuICAgIHdpZHRoOiAzMCU7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICB9XFxuXFxuI21vZGFsLXRleHQge1xcbiAgICBmb250LWZhbWlseTogJ0lCTSBQbGV4IE1vbm8nLCBtb25vc3BhY2U7XFxuICAgIGZvbnQtc2l6ZTogMC44ZW07XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjVlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4jbW9kYWwtYnV0dG9uIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNENBRjUwOyAvKiBWZXJkZSAqL1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbn1cXG5cXG4jbW9kYWwtYnV0dG9uOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzNlOGU0MTtcXG59XFxuXFxuLyogRk9PVEVSICovXFxuXFxuI2Zvb3RlciB7XFxuICAgIGhlaWdodDogMTAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDc0NzQ3O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBib3JkZXItdG9wOiBzb2xpZCAxcHggIzAwMDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIHotaW5kZXg6IDM7XFxufVxcblxcbi5jcmVkaXRzIHtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGZvbnQtZmFtaWx5OiAnSUJNIFBsZXggTW9ubycsIG1vbm9zcGFjZTtcXG4gICAgZm9udC1zaXplOiAwLjhlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4vKiBTdHlsZSB0aGUgbGluayB0byByZW1vdmUgZGVmYXVsdCBzdHlsaW5nICovXFxuLmdpdGh1Yi1saW5rIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGNvbG9yOiBpbmhlcml0O1xcbn1cXG5cXG4vKiBBZGQgdGhlIGhvdmVyIGVmZmVjdCAqL1xcbi5naXRodWItaWNvbiB7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjVzIGVhc2UtaW4tb3V0OyAvKiBBZGQgYSB0cmFuc2l0aW9uIGZvciB0aGUgdHJhbnNmb3JtIHByb3BlcnR5ICovXFxufVxcblxcbi5naXRodWItbGluazpob3ZlciAuZ2l0aHViLWljb24ge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyAvKiBSb3RhdGUgdGhlIGljb24gMTgwIGRlZ3JlZXMgd2hlbiBob3ZlcmVkICovXFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvaW5kZXguY3NzXCJdLFwibmFtZXNc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O0FBQ3RCOztBQUVBO0lBQ0ksY0FBYztJQUNkLFdBQVc7SUFDWCxhQUFhO0lBQ2IsZ0JBQWdCO0lBQ2hCLHlCQUF5QixFQUFFLFVBQVU7SUFDckMsWUFBWTtJQUNaLFlBQVk7SUFDWixlQUFlO0lBQ2Ysa0JBQWtCO0lBQ2xCLHFCQUFxQjtJQUNyQixlQUFlO0FBQ25COztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBLFdBQVc7O0FBRVg7SUFDSSxXQUFXO0lBQ1gseUJBQXlCO0lBQ3pCLGFBQWE7SUFDYiwwQkFBMEI7SUFDMUIsbUJBQW1CO0lBQ25CLHVCQUF1QjtJQUN2QixVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsdUNBQXVDO0lBQ3ZDLGdCQUFnQjtJQUNoQixrQkFBa0I7QUFDdEI7O0FBRUEsNkNBQTZDO0FBQzdDO0lBQ0kscUJBQXFCO0lBQ3JCLHFCQUFxQjtJQUNyQixjQUFjO0FBQ2xCOztBQUVBLHlCQUF5QjtBQUN6QjtJQUNJLHNDQUFzQyxFQUFFLGdEQUFnRDtBQUM1Rjs7QUFFQTtJQUNJLHlCQUF5QixFQUFFLDZDQUE2QztBQUM1RVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXHRib3JkZXI6IDA7XFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcblxcdGZvbnQ6IGluaGVyaXQ7XFxuXFx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG59XFxuYm9keSB7XFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxufVxcbm9sLCB1bCB7XFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXG59XFxuYmxvY2txdW90ZSwgcSB7XFxuXFx0cXVvdGVzOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuXFx0Y29udGVudDogJyc7XFxuXFx0Y29udGVudDogbm9uZTtcXG59XFxudGFibGUge1xcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxufVxcblxcbi8qIE1ZIE9XTiBTVFlMRVMgRlJPTSBIRVJFICovXFxuXFxuLyogRm9udHMgKi9cXG5cXG5AaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1CcnVubytBY2UmZGlzcGxheT1zd2FwJyk7XFxuQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9SUJNK1BsZXgrTW9ubyZkaXNwbGF5PXN3YXAnKTtcXG5cXG5hOnZpc2l0ZWQge1xcbiAgICBjb2xvcjogI2ZmZjtcXG59XFxuXFxuI3NjcmVlbiB7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDsgLyogb3IgXFxcImFic29sdXRlXFxcIiAqL1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIHotaW5kZXg6IDA7XFxufVxcblxcbi8qIEhFQURFUiAqL1xcblxcbiNoZWFkZXIge1xcbiAgICBoZWlnaHQ6IDEwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzQ3NDc0NztcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYm9yZGVyLWJvdHRvbTogc29saWQgMXB4ICMwMDA7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICB6LWluZGV4OiAzO1xcbn1cXG5cXG4udGl0bGUge1xcbiAgICBmb250LXNpemU6IDJlbTtcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBjb2xvcjogI2U4ZjkwMTtcXG59XFxuXFxuI21haW4ge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGhlaWdodDogODAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpO1xcbn1cXG5cXG4vKiBDT1ZFUiAqL1xcblxcbi5nbG93aW5nLWJ1dHRvbiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0Q0FGNTA7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBmb250LXNpemU6IDNlbTtcXG4gICAgcGFkZGluZzogMjBweCAzMHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjVzO1xcbiAgICBib3gtc2hhZG93OiAwIDAgNXB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcXG59XFxuICBcXG4uZ2xvd2luZy1idXR0b246aG92ZXIge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAwIDIwcHggcmdiYSg3NiwgMTc1LCA4MCwgMC42KTtcXG59XFxuXFxuQGtleWZyYW1lcyBnbG93aW5nMiB7XFxuICAgIDAlIHtcXG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDAgMTBweCByZ2JhKDc2LCAxNzUsIDgwLCAwLjIpO1xcbiAgICB9XFxuICAgIDUwJSB7XFxuICAgICAgICBib3gtc2hhZG93OiAwIDAgMTBweCByZ2JhKDAsIDAsIDAsIDAuMiksIDAgMCAyMHB4IHJnYmEoNzYsIDE3NSwgODAsIDAuNSk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICBib3gtc2hhZG93OiAwIDAgNXB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAwIDEwcHggcmdiYSg3NiwgMTc1LCA4MCwgMC4yKTtcXG4gICAgfVxcbn1cXG5cXG4uZ2xvd2luZy1idXR0b24ge1xcbiAgICBhbmltYXRpb246IGdsb3dpbmcyIDJzIGluZmluaXRlO1xcbn1cXG5cXG4vKiBDT1ZFUiBTSElQUyAqL1xcblxcbiNjYXJyaWVyLXNoYXBlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMTgwcHg7XFxuICAgIGhlaWdodDogNjBweDtcXG4gICAgdG9wOiAyMCU7XFxuICAgIGFuaW1hdGlvbjogbW92ZS1yaWdodC1sZWZ0IDEwcyBsaW5lYXIgaW5maW5pdGU7IC8qIGFkanVzdCB0aGUgdGltZSBhcyBuZWVkZWQgKi9cXG4gICAgei1pbmRleDogMTtcXG59XFxuXFxuQGtleWZyYW1lcyBtb3ZlLXJpZ2h0LWxlZnQge1xcbiAgICAwJSB7IHJpZ2h0OiAtMTAwJTsgfSAvKiBTdGFydCBmcm9tIG9mZiB0aGUgcmlnaHQgb2YgdGhlIHNjcmVlbiAqL1xcbiAgICAxMDAlIHsgcmlnaHQ6IDEwMCU7IH0gLyogRW5kIG9mZiB0aGUgbGVmdCBvZiB0aGUgc2NyZWVuICovXFxufVxcblxcbiNzdWJtYXJpbmUtc2hhcGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxMjBweDtcXG4gICAgaGVpZ2h0OiA2MHB4O1xcbiAgICBsZWZ0OiAyMCU7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXG4gICAgYW5pbWF0aW9uOiBtb3ZlLXRvcC1kb3duIDEwcyBsaW5lYXIgaW5maW5pdGU7XFxuICAgIHotaW5kZXg6IDE7XFxufVxcblxcbkBrZXlmcmFtZXMgbW92ZS10b3AtZG93biB7XFxuICAgIDAlIHsgdG9wOiAtMjAwcHggfVxcbiAgICAxMDAlIHsgdG9wOiAxNTAwcHh9XFxufVxcblxcbiNiYXR0bGVzaGlwLXNoYXBlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMTUwcHg7XFxuICAgIGhlaWdodDogNjBweDtcXG4gICAgdG9wOiA2NSU7XFxuICAgIGFuaW1hdGlvbjogbW92ZS1sZWZ0LXJpZ2h0IDEwcyBsaW5lYXIgaW5maW5pdGU7IC8qIGFkanVzdCB0aGUgdGltZSBhcyBuZWVkZWQgKi9cXG4gICAgei1pbmRleDogMTtcXG59XFxuXFxuQGtleWZyYW1lcyBtb3ZlLWxlZnQtcmlnaHQge1xcbiAgICAwJSB7IGxlZnQ6IC0xMDAlOyB9IC8qIFN0YXJ0IGZyb20gb2ZmIHRoZSBsZWZ0IG9mIHRoZSBzY3JlZW4gKi9cXG4gICAgMTAwJSB7IGxlZnQ6IDEwMCU7IH0gLyogRW5kIG9mZiB0aGUgcmlnaHQgb2YgdGhlIHNjcmVlbiAqL1xcbn1cXG5cXG4jZGVzdHJveWVyLXNoYXBlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMTIwcHg7XFxuICAgIGhlaWdodDogNjBweDtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTtcXG4gICAgbGVmdDogODAlO1xcbiAgICBhbmltYXRpb246IG1vdmUtZG93bi10b3AgMTBzIGxpbmVhciBpbmZpbml0ZTtcXG4gICAgei1pbmRleDogMTtcXG59XFxuXFxuQGtleWZyYW1lcyBtb3ZlLWRvd24tdG9wIHtcXG4gICAgMCUgeyB0b3A6IDE1MDBweDsgfVxcbiAgICAxMDAlIHsgdG9wOiAtMjAwcHg7IH1cXG59XFxuXFxuI3BhdHJvbC1zaGFwZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDkwcHg7XFxuICAgIGhlaWdodDogNjBweDtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcXG4gICAgdG9wOiA5MCU7XFxuICAgIGFuaW1hdGlvbjogbW92ZS1yaWdodC1sZWZ0IDEwcyBsaW5lYXIgaW5maW5pdGU7XFxuICAgIHotaW5kZXg6IDE7XFxufVxcblxcbi8qIE1BSU4gLSBHQU1FICovXFxuXFxuLnBsYXllclNpZGUge1xcbiAgICB3aWR0aDogNTAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIHBhZGRpbmc6IDUlO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICAgIGdhcDogMmVtO1xcbiAgICBtYXJnaW4tdG9wOiA1ZW07XFxufVxcblxcbi5nYW1lSGVhZGVyIHtcXG4gICAgd2lkdGg6IDQ0MHB4O1xcbiAgICBmb250LXNpemU6IDEuNWVtO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbiN1c2VyR2FtZUhlYWRlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGQzExNTk7XFxufVxcblxcbiNjb21wdXRlckdhbWVIZWFkZXJ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM3MjdEOTU7XFxufVxcblxcbi5nYW1lYm9hcmRDb250YWluZXIge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi54SGVhZGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAganVzdGlmeS1jb250ZW50OiBsZWZ0O1xcbiAgICBwYWRkaW5nLWxlZnQ6IDIuNWVtO1xcbn1cXG5cXG4ueEhlYWRlclNxdWFyZSB7XFxuICAgIHdpZHRoOiAzOHB4O1xcbiAgICBoZWlnaHQ6IDM4cHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcbn1cXG5cXG4uYm90dG9tQm9hcmQge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi55SGVhZGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuLnlIZWFkZXJTcXVhcmUge1xcbiAgICB3aWR0aDogMzhweDtcXG4gICAgaGVpZ2h0OiAzOHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBmb250LXNpemU6IDFlbTtcXG59XFxuXFxuLnlIZWFkZXJTaGlweWFyZCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcbiAgICB3cml0aW5nLW1vZGU6IHZlcnRpY2FsLXJsO1xcbiAgICB0ZXh0LW9yaWVudGF0aW9uOiBtaXhlZDtcXG4gICAgcm90YXRlOiAxODBkZWc7XFxuICAgIG1hcmdpbi10b3A6IDEuOGVtO1xcbn1cXG5cXG4uZ3JpZFBhbmVsQ29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDM4MHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uZ2FtZWJvYXJkR3JpZCB7XFxuICAgIHdpZHRoOiAzODBweDtcXG4gICAgaGVpZ2h0OiAzODBweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbn1cXG5cXG4jdXNlckdhbWVib2FyZEdyaWQge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuI3VzZXJHYW1lYm9hcmRHcmlkLmJsb2NrZWQge1xcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XFxufVxcblxcbi5nYW1lYm9hcmRTcXVhcmUge1xcbiAgICB3aWR0aDogMzZweDtcXG4gICAgaGVpZ2h0OiAzNnB4O1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjZmZmO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZm9udC1mYW1pbHk6ICdCcnVubyBBY2UnO1xcbiAgICBmb250LXNpemU6IDFlbTtcXG4gICAgY3Vyc29yOiBpbmhlcml0O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTFkY2ZmO1xcbn1cXG5cXG4jdXNlckdhbWVib2FyZEdyaWQgLmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzk5OTk5OTtcXG4gICAgb3BhY2l0eTogMC43O1xcbn1cXG5cXG4jdXNlckdhbWVib2FyZEdyaWQgLm9jY3VwaWVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzk5OTk5OTtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuXFxuI3VzZXJHYW1lYm9hcmRHcmlkIC5ob3ZlckxpbWl0c0V4Y2VlZGVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2MyMzQzNDtcXG59XFxuXFxuI2NvbXB1dGVyR2FtZWJvYXJkR3JpZCAuZ2FtZWJvYXJkU3F1YXJlOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzFiODhlNztcXG59XFxuXFxuI2NvbXB1dGVyR2FtZWJvYXJkR3JpZC5ibG9ja2VkIC5nYW1lYm9hcmRTcXVhcmU6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTFkY2ZmO1xcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XFxufVxcblxcbi5nYW1lYm9hcmRTcXVhcmUubWlzcyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNjMjM0MzQ7XFxufVxcblxcbi5nYW1lYm9hcmRTcXVhcmUubWlzczpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNjMjM0MzQhaW1wb3J0YW50O1xcbn1cXG5cXG4uZ2FtZWJvYXJkU3F1YXJlLmhpdCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0Q0FGNTA7XFxufVxcblxcbi5nYW1lYm9hcmRTcXVhcmUuaGl0OmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRDQUY1MCFpbXBvcnRhbnQ7XFxufVxcblxcbi8qIFNISVBZQVJEICovXFxuXFxuLnN0YXR1c1BhbmVsIHtcXG4gICAgd2lkdGg6IDM4MnB4O1xcbiAgICBoZWlnaHQ6IDc4cHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAgbWFyZ2luLXRvcDogMzZweDtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHJnYmEoMCwgMCwgMCwgMC41KSAycHgsIHRyYW5zcGFyZW50IDJweCksIGxpbmVhci1ncmFkaWVudCg5MGRlZywgcmdiYSgwLCAwLCAwLCAwLjUpIDJweCwgdHJhbnNwYXJlbnQgMnB4KTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAzOHB4IDM4cHg7XFxuICAgIGdhcDogMnB4O1xcbn1cXG5cXG4uY2FycmllciB7XFxuICAgIHdpZHRoOiAxODhweDtcXG4gICAgaGVpZ2h0OiAzNnB4O1xcbn1cXG5cXG4uYmF0dGxlc2hpcCB7XFxuICAgIHdpZHRoOiAxNTBweDtcXG4gICAgaGVpZ2h0OiAzNnB4O1xcbn1cXG5cXG4uc3VibWFyaW5lIHtcXG4gICAgd2lkdGg6IDExMnB4O1xcbiAgICBoZWlnaHQ6IDM2cHg7XFxufVxcblxcbi5kZXN0cm95ZXIge1xcbiAgICB3aWR0aDogMTEycHg7XFxuICAgIGhlaWdodDogMzZweDtcXG59XFxuXFxuLmJvYXQge1xcbiAgICB3aWR0aDogNzRweDtcXG4gICAgaGVpZ2h0OiAzNnB4O1xcbn1cXG5cXG4udXNlclNoaXAge1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIG9wYWNpdHk6IDAuNztcXG59XFxuXFxuLnVzZXJTaGlwOmhvdmVyIHtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuXFxuLnVzZXJTaGlwLm5vLWhvdmVyOmhvdmVyIHtcXG4gICAgb3BhY2l0eTogMC43O1xcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XFxufVxcblxcbi51c2VyU2hpcC5zZWxlY3RlZCB7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcblxcbi51c2VyU2hpcC5wbGFjZWQge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XFxufVxcblxcbi5zaGlwLnN1bmsge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5zaGlwLnN1bms6OmFmdGVyIHtcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDJweDtcXG4gICAgYmFja2dyb3VuZDogcmdiKDIzMSwgOSwgOSk7XFxufVxcblxcbkBrZXlmcmFtZXMgZ2xvd2luZyB7XFxuICAgIDAlIHsgY29sb3I6ICNGQzExNTk7IH1cXG4gICAgNTAlIHsgY29sb3I6ICMwMDA7IH1cXG4gICAgMTAwJSB7IGNvbG9yOiAjRkMxMTU5OyB9XFxuICB9XFxuXFxuLmluc3RydWN0aW9ucyB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBmb250LWZhbWlseTogJ0JydW5vIEFjZSc7XFxuICAgIGZvbnQtc2l6ZTogMC44ZW07XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjVlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbmltYXRpb246IGdsb3dpbmcgMS41cyBsaW5lYXIgaW5maW5pdGU7XFxufVxcblxcbi5idXR0b25zQ29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGdhcDogMmVtO1xcbn1cXG5cXG4ucGxhY2VtZW50QnV0dG9uIHtcXG4gICAgd2lkdGg6IDE4MHB4O1xcbiAgICBoZWlnaHQ6IDUwcHg7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICNmZmY7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0Q0FGNTA7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBmb250LWZhbWlseTogJ0lCTSBQbGV4IE1vbm8nLCBtb25vc3BhY2U7XFxuICAgIGZvbnQtc2l6ZTogMC44ZW07XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgcGFkZGluZzogMWVtO1xcbn1cXG5cXG4ucGxhY2VtZW50QnV0dG9uOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzNlOGU0MTtcXG59XFxuXFxuI3N0YXJ0LWdhbWUtYnV0dG9uIHtcXG4gICAgd2lkdGg6IDE4MHB4O1xcbiAgICBoZWlnaHQ6IDUwcHg7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICNmZmY7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0Q0FGNTA7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBmb250LWZhbWlseTogJ0lCTSBQbGV4IE1vbm8nLCBtb25vc3BhY2U7XFxuICAgIGZvbnQtc2l6ZTogMC44ZW07XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgcGFkZGluZzogMWVtO1xcbn1cXG5cXG4jc3RhcnQtZ2FtZS1idXR0b246aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2U4ZTQxO1xcbn1cXG5cXG4uY29tcHV0ZXJJbmZvIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGZvbnQtZmFtaWx5OiAnQnJ1bm8gQWNlJztcXG4gICAgZm9udC1zaXplOiAwLjhlbTtcXG4gICAgbGluZS1oZWlnaHQ6IDEuNWVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbiN2aWN0b3J5TW9kYWwge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHotaW5kZXg6IDE7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHRvcDogMDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgb3ZlcmZsb3c6IGF1dG87XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDAsMC40KTtcXG4gIH1cXG4gIFxcbiAgI3ZpY3RvcnlNb2RhbCA+IGRpdiB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZWZlZmU7XFxuICAgIHBhZGRpbmc6IDIwcHg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICM4ODg7XFxuICAgIHdpZHRoOiAzMCU7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICB9XFxuXFxuI21vZGFsLXRleHQge1xcbiAgICBmb250LWZhbWlseTogJ0lCTSBQbGV4IE1vbm8nLCBtb25vc3BhY2U7XFxuICAgIGZvbnQtc2l6ZTogMC44ZW07XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjVlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4jbW9kYWwtYnV0dG9uIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNENBRjUwOyAvKiBWZXJkZSAqL1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbn1cXG5cXG4jbW9kYWwtYnV0dG9uOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzNlOGU0MTtcXG59XFxuXFxuLyogRk9PVEVSICovXFxuXFxuI2Zvb3RlciB7XFxuICAgIGhlaWdodDogMTAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDc0NzQ3O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBib3JkZXItdG9wOiBzb2xpZCAxcHggIzAwMDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIHotaW5kZXg6IDM7XFxufVxcblxcbi5jcmVkaXRzIHtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGZvbnQtZmFtaWx5OiAnSUJNIFBsZXggTW9ubycsIG1vbm9zcGFjZTtcXG4gICAgZm9udC1zaXplOiAwLjhlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4vKiBTdHlsZSB0aGUgbGluayB0byByZW1vdmUgZGVmYXVsdCBzdHlsaW5nICovXFxuLmdpdGh1Yi1saW5rIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGNvbG9yOiBpbmhlcml0O1xcbn1cXG5cXG4vKiBBZGQgdGhlIGhvdmVyIGVmZmVjdCAqL1xcbi5naXRodWItaWNvbiB7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjVzIGVhc2UtaW4tb3V0OyAvKiBBZGQgYSB0cmFuc2l0aW9uIGZvciB0aGUgdHJhbnNmb3JtIHByb3BlcnR5ICovXFxufVxcblxcbi5naXRodWItbGluazpob3ZlciAuZ2l0aHViLWljb24ge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyAvKiBSb3RhdGUgdGhlIGljb24gMTgwIGRlZ3JlZXMgd2hlbiBob3ZlcmVkICovXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjVhNjkyZDlmZDJmYjhjMzQyYmVjZTRjMjY0MWE1MWNkLnN2Z1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmMDRkZjcxZDdjMWQ3ODZkYWFmMGI3NGI0YzA2YWNmZS5zdmdcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiMjNkZTg1ODFjOWE2NTg0NmFhYTEwYmEwMWVhZmY2YjAuc3ZnXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjZlZjk1N2M4ZmM5ZjI0MTc5NGE0Y2M4YWY2M2RlYjMxLnN2Z1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIwZTJiMDc4MjY4OWZlNzNiZjFkMDI4Nzg1MGM4NzA4OC5zdmdcIjsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJHYW1lYm9hcmQiLCJfYm9hcmQiLCJBcnJheSIsImZpbGwiLCJfc2hpcHMiLCJfZ2FtZW92ZXIiLCJnZXRCb2FyZCIsImdldFNoaXBzIiwiZ2V0R2FtZU92ZXIiLCJzZXRHYW1lT3ZlciIsImdldFNxdWFyZSIsInNxdWFyZSIsInNldFNxdWFyZSIsIm51bSIsInZhbHVlIiwic2V0U2hpcCIsInNoaXAiLCJwdXNoIiwiaXNTYW1lTGluZSIsIngiLCJ5IiwiTWF0aCIsImZsb29yIiwiaXNWYWxpZE5leHRTcXVhcmUiLCJjdXJyZW50IiwibmV4dCIsImRpcmVjdGlvbiIsImlzRW1wdHlTcXVhcmUiLCJnZXROZXh0UG9zaXRpb24iLCJjdXJyZW50UG9zIiwicGxhY2VTaGlwIiwic3RhcnRQb3MiLCJuZXh0UG9zIiwidmFsaWRQb3NBcnJheSIsImkiLCJnZXRMZW5ndGgiLCJlcnJvciIsImxlbmd0aCIsImdldE5hbWUiLCJkYXRhIiwic3VjY2VzcyIsImZpbmRTaGlwIiwic2hpcE5hbWUiLCJmaW5kIiwicyIsImNoZWNrR2FtZU92ZXIiLCJkZWxldGVTaGlwIiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJzcGxpY2UiLCJyZWNlaXZlQXR0YWNrIiwic3F1YXJlTnVtYmVyIiwicmVzdWx0IiwidHlwZSIsInN1bmsiLCJnYW1lb3ZlciIsImRhbWFnZWRTaGlwIiwiaGl0IiwiaXNTdW5rIiwidmlldyIsIlBsYXllciIsImxvYWRNYWluVUkiLCJsb2FkR2FtZVVJIiwidXNlciIsImNvbXB1dGVyIiwicGxhY2VTaGlwc1JhbmRvbWx5Iiwib25NYW51YWxQbGFjZW1lbnRDbGljayIsIm9uUmFuZG9tUGxhY2VtZW50Q2xpY2siLCJsb2FkVXNlckdhbWVib2FyZCIsImdldEdhbWVCb2FyZCIsImRlbGV0ZVVzZXJHYW1lYm9hcmRFdmVudExpc3RlbmVycyIsIm9uVXNlckJvYXJkQ2xpY2siLCJzcXVhcmVOdW0iLCJvcmllbnRhdGlvbiIsInJlcyIsInNob3dVc2VySW5mbyIsInVwZGF0ZVVzZXJHYW1lYm9hcmRTaGlwUGxhY2VtZW50Iiwic3F1YXJlcyIsInVwZGF0ZVVzZXJTaGlweWFyZCIsIm9uQ29tcHV0ZXJCb2FyZENsaWNrIiwibWFudWFsQXR0YWNrIiwic2hvd0NvbXB1dGVySW5mbyIsImF0dGFja1JlcyIsInVwZGF0ZUNvbXB1dGVyU2hpcHlhcmQiLCJzaG93VmljdG9yeU1vZGFsIiwidXBkYXRlQ29tcHV0ZXJHYW1lYm9hcmQiLCJ0b2dnbGVDb21wdXRlckJvYXJkU3RhdHVzIiwiZ2VuZXJhdGVBdXRvQXR0YWNrIiwidXBkYXRlVXNlclNoaXB5YXJkQWZ0ZXJDb21wdXRlckF0dGFjayIsInVwZGF0ZVVzZXJHYW1lYm9hcmQiLCJsb2FkQ292ZXJNYWluVUkiLCJTaGlwIiwiX2dhbWVCb2FyZCIsIl90eXBlIiwiX2F2YWlsYWJsZUF0dGFja3MiLCJmcm9tIiwiXyIsImdldFBsYXllclR5cGUiLCJnZXRTaGlwQXRQb3MiLCJwb3MiLCJnZXRTaGlwQnlOYW1lIiwibmFtZSIsImRlbGV0ZVNoaXBCeU5hbWUiLCJnZXRBdmFpbGFibGVBdHRhY2tzIiwiZ2V0QXR0YWNrQXRQb3MiLCJnZXRJbmRleE9mQXR0YWNrIiwiaW5kZXhPZiIsImlzVmFsaWRBdHRhY2siLCJpbmNsdWRlcyIsImdldFJhbmRvbURpcmVjdGlvbiIsInJhbmRvbSIsInNodWZmbGVBcnJheSIsImFycmF5Iiwic2h1ZmZsZWRBcnJheSIsImoiLCJzdGFydFBvc2l0aW9uQ2FuZGlkYXRlcyIsInNodWZmbGVkUG9zaXRpb25zIiwicG9wIiwiZ2VuZXJhdGVSYW5kb21JbmRleCIsImRlbGV0ZUZyb21BdmFpbGFibGVBdHRhY2tzIiwiX25hbWUiLCJfbGVuZ3RoIiwiX2hpdHMiLCJfc3VuayIsImdldEhpdHMiLCJjYXJyaWVyU3ZnIiwic3VibWFyaW5lU3ZnIiwiYmF0dGxlc2hpcFN2ZyIsImRlc3Ryb3llclN2ZyIsInBhdHJvbFN2ZyIsInNlbGVjdGVkU2hpcExlbmd0aCIsInNlbGVjdGVkU2hpcE5hbWUiLCJwbGFjZWRTaGlwc0NvdW50ZXIiLCJjcmVhdGVFbGVtZW50IiwidGFnIiwiY2xhc3NOYW1lIiwiaWQiLCJlbGVtZW50IiwiZG9jdW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRBdHRyaWJ1dGUiLCJnZXRFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJkZWxldGVNYWluVUkiLCJtYWluIiwiaW5uZXJIVE1MIiwiaW5mbyIsImluc3RydWN0aW9ucyIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZXh0Q29udGVudCIsImNvbXB1dGVySW5mbyIsImhhbmRsZVNoaXBDbGljayIsImNvbnRhaW5zIiwic2VsZWN0ZWRTaGlwIiwicmVtb3ZlIiwidXNlclNpZGUiLCJjb21wdXRlclNpZGUiLCJhcHBlbmRDaGlsZCIsInVzZXJIZWFkZXIiLCJjb21wdXRlckhlYWRlciIsInVzZXJUaXRsZSIsImNvbXB1dGVyVGl0bGUiLCJ1c2VyR2FtZWJvYXJkQ29udGFpbmVyIiwiY29tcHV0ZXJHYW1lYm9hcmRDb250YWluZXIiLCJ1c2VyWEhlYWRlciIsImNvbXB1dGVyWEhlYWRlciIsInVzZXJYSGVhZGVyU3F1YXJlIiwiY29tcHV0ZXJYSGVhZGVyU3F1YXJlIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwidXNlckJvdHRvbUJvYXJkIiwiY29tcHV0ZXJCb3R0b21Cb2FyZCIsInVzZXJZSGVhZGVyIiwiY29tcHV0ZXJZSGVhZGVyIiwidXNlcllIZWFkZXJTcXVhcmUiLCJjb21wdXRlcllIZWFkZXJTcXVhcmUiLCJ1c2VyWUhlYWRlclNoaXB5YXJkIiwiY29tcHV0ZXJZSGVhZGVyU2hpcHlhcmQiLCJ1c2VyR3JpZFBhbmVsQ29udGFpbmVyIiwiY29tcHV0ZXJHcmlkUGFuZWxDb250YWluZXIiLCJ1c2VyR2FtZWJvYXJkIiwiY29tcHV0ZXJHYW1lYm9hcmQiLCJ1c2VyR2FtZWJvYXJkU3F1YXJlIiwiY29tcHV0ZXJHYW1lYm9hcmRTcXVhcmUiLCJ1c2VyU3RhdHVzUGFuZWwiLCJjb21wdXRlclN0YXR1c1BhbmVsIiwidXNlckNhcnJpZXIiLCJ1c2VyQmF0dGxlc2hpcCIsInVzZXJEZXN0cm95ZXIiLCJ1c2VyU3VibWFyaW5lIiwidXNlckJvYXQiLCJjb21wdXRlckNhcnJpZXIiLCJjb21wdXRlckJhdHRsZXNoaXAiLCJjb21wdXRlckRlc3Ryb3llciIsImNvbXB1dGVyU3VibWFyaW5lIiwiY29tcHV0ZXJCb2F0IiwiYnV0dG9uc0NvbnRhaW5lciIsIm1hbnVhbEJ1dHRvbiIsInJhbmRvbUJ1dHRvbiIsIm1vZGFsIiwibW9kYWxDb250ZW50IiwibW9kYWxUZXh0IiwicmVzdGFydEJ1dHRvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJsb2NhdGlvbiIsInJlbG9hZCIsImNvbXB1dGVyR2FtZWJvYXJkR3JpZCIsInRvZ2dsZVVzZXJCb2FyZFN0YXR1cyIsInVzZXJHYW1lYm9hcmRHcmlkIiwiY2FsbGJhY2siLCJ1c2VyQm9hcmRTcXVhcmVzIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJwYXJzZUludCIsImdldEF0dHJpYnV0ZSIsImNvbXB1dGVyQm9hcmRTcXVhcmVzIiwidXNlclNoaXBzIiwiZXZlbnQiLCJzaWJsaW5nc1RvQ29sb3IiLCJzdGFydCIsInJvd1N0YXJ0Iiwicm93RW5kIiwiZXhwZWN0ZWRFbmQiLCJzbGljZSIsInNpYmxpbmciLCJlIiwia2V5Iiwic2hvd1N0YXJ0R2FtZUJ1dHRvbiIsInN0YXJ0R2FtZUJ1dHRvbiIsImdhbWVib2FyZCIsImxvYWRNYWluVUlDYWxsYmFjayIsInNjcmVlbiIsImJvZHkiLCJoZWFkZXIiLCJmb290ZXIiLCJ0aXRsZSIsImNyZWRpdHMiLCJnbG93aW5nQnV0dG9uIiwiY2FycmllclNoYXBlIiwic3VibWFyaW5lU2hhcGUiLCJiYXR0bGVzaGlwU2hhcGUiLCJkZXN0cm95ZXJTaGFwZSIsInBhdHJvbFNoYXBlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImFycmF5T2ZTcXVhcmVzIiwidXNlckJvYXJkU3F1YXJlIiwic2hpcERpdiIsImF0dGFja1Jlc3VsdCIsImNvbXB1dGVyQm9hcmRTcXVhcmUiLCJ3aW5uZXIiLCJzdHlsZSIsImRpc3BsYXkiXSwic291cmNlUm9vdCI6IiJ9