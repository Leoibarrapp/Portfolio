const gridLayer = document.getElementById('gridLayer');
let dots = [];

function createGrid() {
    // Limpiamos la cuadrícula existente
    gridLayer.innerHTML = '';
    dots = [];

    // Calculamos cuántos puntos caben
    const dotSize = 25; // Tamaño del punto + espaciado aproximado
    const cols = Math.ceil(gridLayer.offsetWidth / dotSize);
    const rows = Math.ceil(gridLayer.offsetHeight / dotSize);

    // Ajustamos las variables de CSS Grid
    gridLayer.style.setProperty('--grid-cols', cols);
    gridLayer.style.setProperty('--grid-rows', rows);
    gridLayer.style.setProperty('--dot-size', `${dotSize}px`);

    // Creamos y añadimos los puntos de forma eficiente
    const fragment = document.createDocumentFragment();
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const dotWrapper = document.createElement('div');
            dotWrapper.classList.add('dot-wrapper');

            const dot = document.createElement('div');
            dot.classList.add('dot');

            dotWrapper.appendChild(dot);
            fragment.appendChild(dotWrapper);

            // Guardamos la posición central matemáticamente
            dots.push({
                element: dot,
                x: c * dotSize + dotSize / 2,
                y: r * dotSize + dotSize / 2
            });
        }
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

// Evento para resaltar los puntos cercanos en un radio
window.addEventListener('mousemove', (e) => {
    const rect = gridLayer.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const radius = 120; // Radio del efecto hover

    dots.forEach(dot => {
        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;

        // Optimización: Si el punto está lejos, no hacemos cálculos matemáticos costosos
        if (Math.abs(dx) > radius || Math.abs(dy) > radius) {
            if (dot.isHighlighted) {
                dot.element.classList.remove('highlight');
                dot.element.style.transform = '';
                dot.element.style.opacity = '';
                dot.isHighlighted = false;
            }
            return;
        }

        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= radius) {
            const intensity = 1 - (dist / radius); // De 0 a 1 dependiendo de qué tan cerca esté

            // Escala entre 1x y 2.5x dependiendo de la intimidad
            const scale = 1 + (intensity * 1.5);

            dot.element.style.transform = `scale(${scale})`;
            dot.element.classList.add('highlight');
            dot.isHighlighted = true;
        } else {
            if (dot.isHighlighted) {
                dot.element.classList.remove('highlight');
                dot.element.style.transform = '';
                dot.isHighlighted = false;
            }
        }
    });
});

gridLayer.addEventListener('mouseleave', () => {
    dots.forEach(dot => {
        if (dot.isHighlighted) {
            dot.element.classList.remove('highlight');
            dot.element.style.transform = '';
            dot.isHighlighted = false;
        }
    });
});