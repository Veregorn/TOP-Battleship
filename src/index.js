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
            return // Exit block
        }

        const userAttackRes = computer.getGameBoard().receiveAttack(squareNum) // Attack computer board

        // If "receiveAttack" returns an error, show it
        if (userAttackRes.error) {

            view.showUserInfo(userAttackRes.error)
            view.showComputerInfo("")

        }
        else { // If not, read the result

            // If the attack was a hit, show it
            if (userAttackRes.type === "ShipHit") {
                
                view.showUserInfo("You hit a ship!")
                view.showComputerInfo(userAttackRes.success)

                // If the ship was sunk, show it
                if (userAttackRes.sunk !== "") {

                    view.showUserInfo("You sunk a ship!")
                    view.showComputerInfo(`Oh no! my ${userAttackRes.sunk}!`)
                    view.updateComputerShipyard(userAttackRes.sunk)

                    // If all ships are sunk, finish the game
                    if (computer.getGameBoard().getGameOver()) {
                        
                        view.showVictoryModal("You")

                    }

                }

            }
            else if (userAttackRes.type === "Miss") { // If not, show a miss

                view.showUserInfo("You missed!")
                view.showComputerInfo(userAttackRes.success)

            }

            // Update computer board
            view.updateComputerGameboard(squareNum, userAttackRes.type)

        }

        // If game is not over, let computer attack
        if (!computer.getGameBoard().getGameOver()) {
            
            // Its computer turn - Block computer board
            view.toggleComputerBoardStatus()
            // Delay computer attack for 3 seconds to simulate thinking
            setTimeout( () => {

                const square = computer.generateAutoAttack()
                const computerAttackRes = user.getGameBoard().receiveAttack(square)

                // If "receiveAttack" returns an error, show it
                if (computerAttackRes.error) {

                    view.showComputerInfo(computerAttackRes.error)
                    view.showUserInfo("")

                }
                else { // If not, read the result

                    // If the attack was a hit, show it
                    if (computerAttackRes.type === "ShipHit") {

                        view.showComputerInfo("I hit a ship!")
                        view.showUserInfo("Oh no! One of your ships has been hit!")

                        // If the ship was sunk, show it
                        if (computerAttackRes.sunk !== "") {

                            view.showComputerInfo("I sunk a ship!")
                            view.showUserInfo(`Your ${computerAttackRes.sunk} is sunk now!`)
                            view.updateUserShipyardAfterComputerAttack(computerAttackRes.sunk)

                            // If all ships are sunk, finish the game
                            if (user.getGameBoard().getGameOver()) {

                                view.showVictoryModal("Computer")

                            }

                        }

                    }
                    else if (computerAttackRes.type === "Miss") { // If not, show a miss

                        view.showComputerInfo("I missed!")
                        view.showUserInfo("Phew! That was close!")

                    }

                    // Update user board
                    view.updateUserGameboard(square, computerAttackRes.type)

                }

                // Inform computer about the attack so it can update its strategy
                computer.updateStrategy(computerAttackRes)

                // Its user turn - Unblock computer board
                view.toggleComputerBoardStatus()

            }, 3000)

        }

    })

}

// Create the interface and player objects
view.loadCoverMainUI(loadMainUI)