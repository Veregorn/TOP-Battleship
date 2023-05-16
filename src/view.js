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

    // Load initial UI screen
    function loadMainUI() {
    
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
        loadMainUI
    }

})()