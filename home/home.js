const gridLayer = document.getElementById('gridLayer');

function createGrid() {
    // Limpiamos la cuadrícula existente
    gridLayer.innerHTML = '';

    // Calculamos cuántos puntos caben
    const dotSize = 25; // Tamaño del punto + espaciado aproximado
    const cols = Math.ceil(window.innerWidth / dotSize);
    const rows = Math.ceil(window.innerHeight / dotSize);
    const totalDots = cols * rows;

    // Ajustamos las variables de CSS Grid
    gridLayer.style.setProperty('--grid-cols', cols);
    gridLayer.style.setProperty('--grid-rows', rows);

    // Creamos y añadimos los puntos de forma eficiente
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        fragment.appendChild(dot);
    }
    gridLayer.appendChild(fragment);
}

// Creamos la cuadrícula inicial
createGrid();

// Re-creamos la cuadrícula si se cambia el tamaño de la ventana
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(createGrid, 200); // Debounce para evitar sobrecarga
});