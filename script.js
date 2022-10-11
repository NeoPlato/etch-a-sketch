function createGrid(size) {
    container = document.querySelector("div.container");
    container.textContent = "";
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size**2; i++) {
        square = document.createElement("div");
        square.classList.add("grid-square");
        container.appendChild(square);
    }
}