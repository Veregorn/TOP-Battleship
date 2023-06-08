// IMPORTS
import interact from "interactjs";
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

    // Drag and drop functions
    /* function dragStart(event) {
        
        console.log("dragStart")
        
        event.dataTransfer.setData("text/plain", event.target.id) // Save the id of the element being dragged

    } */

    /* function dragOver(event) {
        
        event.preventDefault()

        // const data = event.dataTransfer.getData("text/plain")
        // const draggedShip = document.getElementById(data)

    } */

    /* function dragEnter(event) {

        console.log("dragenter")
    } */

    function dragEnd() {
        
        console.log("dragend")

    }

    /* function dragLeave() {

        console.log("dragleave")

    } */

    /* function dragDrop(event) {

        event.preventDefault()

        // Obtén la posición del div en el que se soltó el barco
        const x = event.clientX - offsetX
        const y = event.clientY - offsetY

        const draggedShipId = event.dataTransfer.getData("text/plain")
        const draggedShip = document.getElementById(draggedShipId)
        draggedShip.style.position = "absolute"
        draggedShip.style.left = x-55 + "px"
        draggedShip.style.top = y-128 + "px"
        draggedShip.style.opacity = "0.7"
        // event.target.appendChild(document.getElementById(draggedShip))

    } */

    /* function rotateShip() {

        console.log("rotate")

    } */

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
        userCarrier.classList.add("userShip")
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
            </svg>`
        // userCarrier.setAttribute("draggable","true")
        const userBattleship = createElement("div","battleship","userBattleship")
        userBattleship.classList.add("userShip")
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
            </svg>`
        // userBattleship.setAttribute("draggable","true")
        const userDestroyer = createElement("div","destroyer","userDestroyer")
        userDestroyer.classList.add("userShip")
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
            </svg>`
        // userDestroyer.setAttribute("draggable","true")
        const userSubmarine = createElement("div","submarine","userSubmarine")
        userSubmarine.classList.add("userShip")
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
            </svg>`
        // userSubmarine.setAttribute("draggable","true")
        const userBoat = createElement("div","boat","userBoat")
        userBoat.classList.add("userShip")
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
            </svg>`
        // userBoat.setAttribute("draggable","true")
        userStatusPanel.appendChild(userCarrier)
        userStatusPanel.appendChild(userBattleship)
        userStatusPanel.appendChild(userDestroyer)
        userStatusPanel.appendChild(userSubmarine)
        userStatusPanel.appendChild(userBoat)

        // Create the enemy shipyard
        const computerCarrier = createElement("div","carrier","computerCarrier")
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
            </svg>`
        computerCarrier.setAttribute("draggable","true")
        const computerBattleship = createElement("div","battleship","computerBattleship")
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
            </svg>`
        computerBattleship.setAttribute("draggable", "true")
        const computerDestroyer = createElement("div","destroyer","computerDestroyer")
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
            </svg>`
        computerDestroyer.setAttribute("draggable","true")
        const computerSubmarine = createElement("div","submarine","computerSubmarine")
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
            </svg>`
        computerSubmarine.setAttribute("draggable","true")
        const computerBoat = createElement("div","boat","computerBoat")
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
            </svg>`
        computerBoat.setAttribute("draggable","true")

        computerStatusPanel.appendChild(computerCarrier)
        computerStatusPanel.appendChild(computerBattleship)
        computerStatusPanel.appendChild(computerDestroyer)
        computerStatusPanel.appendChild(computerSubmarine)
        computerStatusPanel.appendChild(computerBoat)

        // Create a div to show instructions to the user
        const instructions = createElement("div","instructions",null)
        instructions.textContent = "Drag and drop your ships to place them on the board. Click on the board to rotate them."
        userSide.appendChild(instructions)

        // Adding event listeners to user ships
        /* const userShips = document.querySelectorAll(".userShip")
        userShips.forEach(ship => {
            ship.addEventListener("dragstart",dragStart)
            offsetX = ship.getBoundingClientRect().width/2
            offsetY = ship.getBoundingClientRect().height/2
            ship.addEventListener("dragend",dragEnd)
        }) */

        // Adding event listeners to user board
        /* const userBoard = document.querySelector("#userGameboardGrid")
        userBoard.addEventListener("dragover",dragOver)
        userBoard.addEventListener("dragenter",dragEnter)
        userBoard.addEventListener("dragleave",dragLeave)
        userBoard.addEventListener("drop",dragDrop)
        userBoard.addEventListener("click",rotateShip) */

        // Variables to store ship position
        let carrierPosX = 0
        let carrierPosY = 0
        let battleshipPosX = 0
        let battleshipPosY = 0
        let destroyerPosX = 0
        let destroyerPosY = 0
        let submarinePosX = 0
        let submarinePosY = 0
        let boatPosX = 0
        let boatPosY = 0

        // Adding code to use "interact.js" library
        interact(".userShip")
            .draggable({
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: "#userGameboardGrid",
                        endOnly: true
                    })
                ],
                listeners: {
                    move (event) {
                        if (event.target.id === "userCarrier") {
                            carrierPosX += event.dx
                            carrierPosY += event.dy
                            event.target.style.transform = `translate(${carrierPosX}px,${carrierPosY}px)`
                        } else if (event.target.id === "userBattleship") {
                            battleshipPosX += event.dx
                            battleshipPosY += event.dy
                            event.target.style.transform = `translate(${battleshipPosX}px,${battleshipPosY}px)`
                        } else if (event.target.id === "userDestroyer") {
                            destroyerPosX += event.dx
                            destroyerPosY += event.dy
                            event.target.style.transform = `translate(${destroyerPosX}px,${destroyerPosY}px)`
                        } else if (event.target.id === "userSubmarine") {
                            submarinePosX += event.dx
                            submarinePosY += event.dy
                            event.target.style.transform = `translate(${submarinePosX}px,${submarinePosY}px)`
                        } else if (event.target.id === "userBoat") {
                            boatPosX += event.dx
                            boatPosY += event.dy
                            event.target.style.transform = `translate(${boatPosX}px,${boatPosY}px)`
                        }
                    },
                    end (event) {
                        dragEnd(event)
                    }
                }
            })

        interact("#userGameboardGrid")
            .dropzone({
                accept: ".userShip",
                overlap: 0.75,
                ondropactivate: function (event) {
                    event.target.classList.add("drop-active")
                }
            })
            .on("dragenter", function (event) {
                const draggableElement = event.relatedTarget
                const dropzoneElement = event.target
                dropzoneElement.classList.add("drop-target")
                draggableElement.classList.add("can-drop")
            })
                
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