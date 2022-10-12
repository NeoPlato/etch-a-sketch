let PENCOLOR = "#333333"
let DRAWING = false;

function drawGrid(e) {
    if (e.type === "mouseover" && !DRAWING) return;
    this.style.backgroundColor = PENCOLOR; 
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