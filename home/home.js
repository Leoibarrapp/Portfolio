const container = document.body;

//efecto de puntos brillantes que siguen al mouse
container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    container.style.setProperty('--x', `${x}px`);
    container.style.setProperty('--y', `${y}px`);
});