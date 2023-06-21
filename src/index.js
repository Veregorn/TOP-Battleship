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
        
        // Place user ship
        const res = user.placeShip(squareNum, shipName, orientation)

        // if "placeShip returns an error, show it"
        if (res.error) {
            view.showUserInfo(res.error)
        }
        else {
            view.showUserInfo(res.success) // Show success message
            view.updateUserGameboardShipPlacement(res.squares) // Update user board
            view.updateUserShipyard(shipName) // Update user shipyard
        }

    })

}

// Create the interface and player objects
view.loadCoverMainUI(loadMainUI)