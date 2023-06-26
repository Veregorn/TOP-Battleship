import "./styles/index.css"
import { view } from "./view"
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

    // Wait for user to click on a square to attack
    view.onComputerBoardClick( (squareNum) => {

        // Attack the square
        const res = user.manualAttack(squareNum)

        // If "manualAttack" returns an error, show it
        if (res.error) {
            view.showUserInfo(res.error)
            view.showComputerInfo("")
        }
        else {

            const attackRes = computer.getGameBoard().receiveAttack(squareNum) // Attack computer board

            // If "receiveAttack" returns an error, show it
            if (attackRes.error) {

                view.showUserInfo(attackRes.error)
                view.showComputerInfo("")

            }
            else { // If not, read the result

                // If the attack was a hit, show it
                if (attackRes.type === "ShipHit") {
                    
                    view.showUserInfo("You hit a ship!")
                    view.showComputerInfo(attackRes.success)

                    // If the ship was sunk, show it
                    if (attackRes.sunk !== "") {

                        view.showUserInfo("You sunk a ship!")
                        view.showComputerInfo(`Oh no! my ${attackRes.sunk}!`)
                        view.updateComputerShipyard(attackRes.sunk)

                        // If all ships are sunk, finish the game
                        if (computer.getGameBoard().getGameOver()) {
                            
                            view.showVictoryModal("You")

                        }

                    }

                }
                else if (attackRes.type === "Miss") { // If not, show a miss

                    view.showUserInfo("You missed!")
                    view.showComputerInfo(attackRes.success)

                }

                // Update computer board
                view.updateComputerGameboard(squareNum, attackRes.type)

            }

        }

        // Its computer turn - Block computer board
        view.toggleComputerBoardStatus()
        const square = computer.generateAutoAttack()
        const attackRes = user.getGameBoard().receiveAttack(square)

        // If "receiveAttack" returns an error, show it
        if (attackRes.error) {

            view.showComputerInfo(attackRes.error)
            view.showUserInfo("")

        }
        else { // If not, read the result

            // If the attack was a hit, show it
            if (attackRes.type === "ShipHit") {

                view.showComputerInfo("I hit a ship!")
                view.showUserInfo("Oh no! One of your ships has been hit!")

                // If the ship was sunk, show it
                if (attackRes.sunk !== "") {

                    view.showComputerInfo("I sunk a ship!")
                    view.showUserInfo(`Your ${attackRes.sunk} is sunk now!`)
                    view.updateUserShipyardAfterComputerAttack(attackRes.sunk)

                    // If all ships are sunk, finish the game
                    if (user.getGameBoard().getGameOver()) {

                        view.showVictoryModal("Computer")

                    }

                }

            }
            else if (attackRes.type === "Miss") { // If not, show a miss

                view.showComputerInfo("I missed!")
                view.showUserInfo("Phew! That was close!")

            }

            // Update user board
            view.updateUserGameboard(square, attackRes.type)

        }

        // Its user turn - Unblock computer board
        view.toggleComputerBoardStatus()

    })

}

// Create the interface and player objects
view.loadCoverMainUI(loadMainUI)