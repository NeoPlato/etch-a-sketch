let PENCOLOR = "#333333"
let DRAWING = false;
let ERASING = false;

let RANDOM = false;
let GRAYSCALE = false;


function drawGrid() {
    if (!DRAWING) return;
    if (GRAYSCALE) {
        if (!this.hasAttribute("grayscale")) {
            this.grayscale = Math.round(Math.random() * 255);
            rgbValue = this.grayscale.toString(16);
            this.style.backgroundColor = `#${rgbValue}${rgbValue}${rgbValue}`;
            return;
        }
        rgbValue = parseInt(this.style.backgroundColor.substr(1,2), 16);
        rgbValue = Math.max(Math.round(rgbValue - this.grayscale/10), 0);
        this.style.backgroundColor = `#${rgbValue}${rgbValue}${rgbValue}`;
        console.log(this.style.backgroundColor);
        return;
    }
    if (this.hasAttribute("style")) return;
    if (ERASING) {
        this.removeAttribute("style");
        return;
    }

    let color = "";
    RANDOM ? color = "#" + (Math.round(Math.random() * 0xffffff)).toString(16)
           : color = PENCOLOR;
    this.style.backgroundColor = color; 
}

function toggleEraser() {
    this.classList.toggle("active-button");
    ERASING = !ERASING;
}

function toggleRandom() {
    this.classList.toggle("active-button");
    RANDOM = !RANDOM;
    GRAYSCALE = RANDOM ? false : GRAYSCALE;

    if (RANDOM) {
        grayscale = document.querySelector("button#grayscale");
        grayscale.classList.remove("active-button");
        regular = document.querySelector("button#regular");
        regular.classList.remove("active-button");
    }
}

function toggleGrayscale() {
    this.classList.toggle("active-button");
    GRAYSCALE = !GRAYSCALE;
    RANDOM = GRAYSCALE ? false : RANDOM;

    if (GRAYSCALE) {
        random = document.querySelector("button#random");
        random.classList.remove("active-button");
        regular = document.querySelector("button#regular");
        regular.classList.remove("active-button");
    }
}

function toggleRegular() {
    this.classList.toggle("active-button");
    const isActive = this.classList.contains("active-button");

    if (isActive) {
        if (RANDOM) {
            let random = document.querySelector("button#random");
            random.classList.remove("active-button");
        }
        if (GRAYSCALE) {
            let grayscale = document.querySelector("button#grayscale");
            grayscale.classList.remove("active-button");
        }
    }

    RANDOM = isActive ? false : RANDOM;
    GRAYSCALE = isActive ? false : GRAYSCALE;
}

function createGrid(size) {
    container = document.querySelector("div.grid");
    container.textContent = "";
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size**2; i++) {
        square = document.createElement("div");
        square.classList.add("grid-square");
        square.addEventListener("mouseover", drawGrid);
        square.addEventListener("mousedown", drawGrid);
        container.appendChild(square);
    }
}

function updateGrid() {
    size = this.value;
    label = document.querySelector('.settings label[for="grid"]');
    label.innerText = `${size}×${size}`;
    createGrid(size);
}

function updateColor() {
    PENCOLOR = this.value;
}

function clearGrid() {
    const SQUARES = document.querySelectorAll(".grid div.grid-square");
    SQUARES.forEach(square => square.removeAttribute("style"));
}