// IMPORTS



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
    }

    return {
        createElement,
        getElement,
        loadMainUI
    }

})()