// https://github.com/SimGus/chrome-extension-v3-starter/blob/master/manifest.json

console.log("This prints to the console of the page (injected only if the page url matched)")

var rect = document.querySelector('.selection-rect');
var key = '';
var holding = false;
var selectionRectangle = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
};

if (!(rect)) {
    var div=document.createElement("div"); 
    div.className = 'selection-rect';
    document.body.appendChild(div);
    
    document.addEventListener('pointermove', e => 
    {
        if (!holding) {
        return;
        }
        selectionRectangle.right = e.clientX;
        selectionRectangle.bottom = e.clientY;
        showSelectionRectangle(selectionRectangle);
    })
    
    document.addEventListener('pointerdown', e => 
    {
        if(key == "z" && !holding) {
            console.log("holding")
            holding = true;
    
            selectionRectangle.left = e.clientX;
            selectionRectangle.top = e.clientY;
        }
    })
    
    document.addEventListener('pointerup', e => 
    {
        if(holding) {
            holding = false;
            hideSelectionRectangle();
            selectBoxes(selectionRectangle);
            selectionRectangle = {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
            };
        }
    })
    
    document.addEventListener('keydown', function(event) {
        if (event.key == "z" && key != "z") {
        key = event.key; // "a", "1", "Shift", etc.
        }
    });
    
    document.addEventListener('keyup', function(event) {
        if (event.key == "z") {
        key = ''; // "a", "1", "Shift", etc.
    
        if (holding) {
            hideSelectionRectangle();
            holding = false;
        }
        }
    });
    
    function selectBoxes(selection) {
        rectangleSelect(getAnchors(), selection).forEach(function(href) {
        window.open(href)
        });
    }
    
    function getAnchors() {
        return [...document.querySelectorAll("a")];
    }
    
    function rectangleSelect(inputElements, selectionRectangle) {
        var elements = [];
        inputElements.forEach(function(element) {
        var box = element.getBoundingClientRect();
    
        if (
            selectionRectangle.left <= box.left &&
            selectionRectangle.top <= box.top &&
            selectionRectangle.right >= box.right &&
            selectionRectangle.bottom >= box.bottom &&
            elements.includes(element.href) == false
        ) {
            elements.push(element.href);
        }
        });
        return elements;
    }
    
    function getSelectionRectNode() {
        return document.querySelector(".selection-rect");
    }
    
    function showSelectionRectangle(selection) {
        var rect = getSelectionRectNode();
        rect.style.left = `${selection.left}px`;
        rect.style.top = `${selection.top + window.scrollY}px`;
        rect.style.width = `${selection.right - selection.left}px`;
        rect.style.height = `${selection.bottom - selection.top}px`;
        rect.style.opacity = 0.5;
    }
    
    function hideSelectionRectangle() {
        var rect = getSelectionRectNode();
        rect.style.opacity = 0;
    }
}