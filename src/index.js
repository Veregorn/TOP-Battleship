import "./styles/index.css"
import { view } from "./view"
import Gameboard from "./gameboard"
import Player from "./player"

// Function to load the main UI
function loadMainUI() {
    
    // Load the main UI
    view.loadGameUI()

    const user = Player("Human")
    const computer = Player("AI")

    // Place computer ships
    computer.placeShipsRandomly()

    // Manage manual placement button
    view.onManualPlacementClick()

    // Manage random placement button
    view.onRandomPlacementClick( () => {
        
        user.placeShipsRandomly() // Place user ships randomly
        view.loadUserGameboard(user.getGameBoard().getBoard()) // Load user board
        // Delete Event Listeners associated with user gameboard
        view.deleteUserGameboardEventListeners()
        // view.loadUserShipsInfo(user.getShips())

    })

    // Wait for user to click on a square
    view.onUserBoardClick( (squareNum, shipName, orientation) => {
        user.placeShip(squareNum, shipName, orientation) // Esto no existe pero algo hay que crear
    })

}

// Create the interface and player objects
view.loadCoverMainUI(loadMainUI)