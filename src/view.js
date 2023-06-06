// IMPORTS
import carrierSvg from "./assets/graphics/carrier.svg";
import submarineSvg from "./assets/graphics/submarine.svg";
import battleshipSvg from "./assets/graphics/battleship.svg";
import destroyerSvg from "./assets/graphics/destroyer.svg";
import patrolSvg from "./assets/graphics/patrol-boat.svg";

// A module (only one instance) for a View that control DOM manipulation
// eslint-disable-next-line import/prefer-default-export, import/no-mutable-exports, prefer-const, func-names
export let view = (function() {

    // Create an element with an optional CSS class and optional CSS id
    function createElement(tag, className, id) {
        
        const element = document.createElement(tag)

        if (className) {
            element.classList.add(className)
        }

        if (id) {
            element.setAttribute("id",id)
        }

        return element

    }

    // Retrieve an element from the DOM
    function getElement(id) {
        
        const element = document.getElementById(id)

        return element

    }

    // Delete the content inside "main" <div>
    function deleteMainUI() {
        const main = getElement("main")
        main.innerHTML = ""
    }

    // Loads game UI
    function loadGameUI() {
        
        // SIDES
        
        const userSide = createElement("div","playerSide",null)
        const computerSide = createElement("div","playerSide",null)

        const main = getElement("main")
        main.appendChild(userSide)
        main.appendChild(computerSide)

        // Headers

        const userHeader = createElement("div","gameHeader","userGameHeader")
        const computerHeader = createElement("div","gameHeader","computerGameHeader")

        const userTitle = createElement("h2","playerTitle",null)
        const computerTitle = createElement("h2","playerTitle",null)

        userTitle.textContent = "YOUR FLEET"
        computerTitle.textContent = "ENEMY FLEET"

        userHeader.appendChild(userTitle)
        computerHeader.appendChild(computerTitle)

        userSide.appendChild(userHeader)
        computerSide.appendChild(computerHeader)

        // Gameboards

        const userGameboardContainer = createElement("div","gameboardContainer","userGameboardContainer")
        const computerGameboardContainer = createElement("div","gameboardContainer","computerGameboardContainer")

        const userXHeader = createElement("div","xHeader",null)
        const computerXHeader = createElement("div","xHeader",null)

        // Generate the xHeader squares
        for (let i = 0; i < 10; i += 1) {
            const userXHeaderSquare = createElement("div","xHeaderSquare",null)
            const computerXHeaderSquare = createElement("div","xHeaderSquare",null)
            userXHeaderSquare.textContent = String.fromCharCode(65 + i)
            computerXHeaderSquare.textContent = String.fromCharCode(65 + i)
            userXHeader.appendChild(userXHeaderSquare)
            computerXHeader.appendChild(computerXHeaderSquare)
        }

        const userBottomBoard = createElement("div","bottomBoard",null)
        const computerBottomBoard = createElement("div","bottomBoard",null)

        const userYHeader = createElement("div","yHeader",null)
        const computerYHeader = createElement("div","yHeader",null)

        // Generate the yHeader squares
        for (let i = 0; i < 10; i += 1) {
            const userYHeaderSquare = createElement("div","yHeaderSquare",null)
            const computerYHeaderSquare = createElement("div","yHeaderSquare",null)
            userYHeaderSquare.textContent = i + 1
            computerYHeaderSquare.textContent = i + 1
            userYHeader.appendChild(userYHeaderSquare)
            computerYHeader.appendChild(computerYHeaderSquare)
        }

        const userGameboard = createElement("div","gameboardGrid","userGameboardGrid")
        const computerGameboard = createElement("div","gameboardGrid","computerGameboardGrid")

        // Generate the gameboard squares
        for (let i = 0; i < 100; i += 1) {
            const userGameboardSquare = createElement("div","gameboardSquare",null)
            const computerGameboardSquare = createElement("div","gameboardSquare",null)
            userGameboard.appendChild(userGameboardSquare)
            computerGameboard.appendChild(computerGameboardSquare)
        }

        userGameboardContainer.appendChild(userXHeader)
        userGameboardContainer.appendChild(userBottomBoard)
        userBottomBoard.appendChild(userYHeader)
        userBottomBoard.appendChild(userGameboard)

        computerGameboardContainer.appendChild(computerXHeader)
        computerGameboardContainer.appendChild(computerBottomBoard)
        computerBottomBoard.appendChild(computerYHeader)
        computerBottomBoard.appendChild(computerGameboard)

        userSide.appendChild(userGameboardContainer)
        computerSide.appendChild(computerGameboardContainer)

        // Fleet Status Panels
        const userStatusPanelContainer = createElement("div","statusPanelContainer","userStatusPanelContainer")
        const computerStatusPanelContainer = createElement("div","statusPanelContainer","computerStatusPanelContainer")

        const userStatusHeader = createElement("div","statusHeader",null)
        const computerStatusHeader = createElement("div","statusHeader",null)

        const userStatusTitle = createElement("h2","panelTitle",null)
        const computerStatusTitle = createElement("h2","panelTitle",null)

        userStatusTitle.textContent = "Shipyard"
        computerStatusTitle.textContent = "Shipyard"

        userStatusHeader.appendChild(userStatusTitle)
        computerStatusHeader.appendChild(computerStatusTitle)

        userStatusPanelContainer.appendChild(userStatusHeader)
        computerStatusPanelContainer.appendChild(computerStatusHeader)

        const userStatusPanel = createElement("div","statusPanel","userStatusPanel")
        const computerStatusPanel = createElement("div","statusPanel","computerStatusPanel")

        userStatusPanelContainer.appendChild(userStatusPanel)
        computerStatusPanelContainer.appendChild(computerStatusPanel)

        userSide.appendChild(userStatusPanelContainer)
        computerSide.appendChild(computerStatusPanelContainer)

        // Create the user shipyard
        const userCarrier = createElement("div","carrier","userCarrier")
        const userBattleship = createElement("div","battleship","userBattleship")
        userBattleship.setAttribute("background-image","url('./assets/graphics/battleship.svg')")
        userBattleship.setAttribute("draggable","true")
        const userDestroyer = createElement("div","destroyer","userDestroyer")
        const userSubmarine = createElement("div","submarine","userSubmarine")
        const userBoat = createElement("div","boat","userBoat")

        userStatusPanel.appendChild(userCarrier)
        userStatusPanel.appendChild(userBattleship)
        userStatusPanel.appendChild(userDestroyer)
        userStatusPanel.appendChild(userSubmarine)
        userStatusPanel.appendChild(userBoat)

        // Create the enemy shipyard
        const computerCarrier = createElement("div","carrier","computerCarrier")
        const computerBattleship = createElement("div","battleship","computerBattleship")
        const computerDestroyer = createElement("div","destroyer","computerDestroyer")
        const computerSubmarine = createElement("div","submarine","computerSubmarine")
        const computerBoat = createElement("div","boat","computerBoat")

        computerStatusPanel.appendChild(computerCarrier)
        computerStatusPanel.appendChild(computerBattleship)
        computerStatusPanel.appendChild(computerDestroyer)
        computerStatusPanel.appendChild(computerSubmarine)
        computerStatusPanel.appendChild(computerBoat)

        // SVG Ship shapes
        const carrierShape = createElement("object","carrier",null)
        carrierShape.data = carrierSvg
        userCarrier.appendChild(carrierShape)
        computerCarrier.appendChild(carrierShape.cloneNode(true))

        // const battleshipShape = createElement("object","battleship",null)
        // battleshipShape.data = battleshipSvg
        // userBattleship.appendChild(battleshipShape)
        // computerBattleship.appendChild(battleshipShape.cloneNode(true))

        const destroyerShape = createElement("object","destroyer",null)
        destroyerShape.data = destroyerSvg
        userDestroyer.appendChild(destroyerShape)
        computerDestroyer.appendChild(destroyerShape.cloneNode(true))

        const submarineShape = createElement("object","submarine",null)
        submarineShape.data = submarineSvg
        userSubmarine.appendChild(submarineShape)
        computerSubmarine.appendChild(submarineShape.cloneNode(true))

        const boatShape = createElement("object","boat",null)
        boatShape.data = patrolSvg
        userBoat.appendChild(boatShape)
        computerBoat.appendChild(boatShape.cloneNode(true))

    }

    // Loads initial UI screen
    function loadCoverMainUI() {
    
        // Create a screen <div></div> that covers all the space available on browser nav
        const screen = createElement("div",null,"screen")

        // Append it to body element
        document.body.appendChild(screen)

        // Create header, main and footer divs inside screen div
        const header = createElement("div",null,"header")
        const main = createElement("div",null,"main")
        const footer = createElement("div",null,"footer")
        
        screen.appendChild(header)
        screen.appendChild(main)
        screen.appendChild(footer)

        // Create a title for the game and append it to the header
        const title = createElement("h1","title",null)
        title.textContent = "BATTLESHIP"
        header.appendChild(title)

        // Create the credits and append them to the footer
        const credits = createElement("p","credits",null)
        // eslint-disable-next-line quotes
        credits.innerHTML = 'Created by VEREGORN. Follow my work on GitHub: <br><br><a class="github-link" href="https://github.com/veregorn" target="_blank" rel="noopener noreferrer"><svg class="github-icon" width="32" height="32" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg></a>'
        footer.appendChild(credits)

        // Main content
        const glowingButton = createElement("button","glowing-button",null)
        glowingButton.textContent = "START"
        glowingButton.addEventListener("click", () => {
            deleteMainUI()
            loadGameUI()
        })
        main.appendChild(glowingButton)

        // SVG Ship shapes
        const carrierShape = createElement("object",null,"carrier-shape")
        carrierShape.data = carrierSvg
        main.appendChild(carrierShape)

        const submarineShape = createElement("object",null,"submarine-shape")
        submarineShape.data = submarineSvg
        main.appendChild(submarineShape)

        const battleshipShape = createElement("object",null,"battleship-shape")
        battleshipShape.data = battleshipSvg
        main.appendChild(battleshipShape)

        const destroyerShape = createElement("object",null,"destroyer-shape")
        destroyerShape.data = destroyerSvg
        main.appendChild(destroyerShape)

        const patrolShape = createElement("object",null,"patrol-shape")
        patrolShape.data = patrolSvg
        main.appendChild(patrolShape)

    }

    return {
        createElement,
        getElement,
        loadCoverMainUI
    }

})()