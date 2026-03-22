const container = document.body;

//efecto de puntos brillantes que siguen al mouse
container.addEventListener('mousemove', (e) => {
    container.style.setProperty('--x', `${e.pageX}px`);
    container.style.setProperty('--y', `${e.pageY}px`);
});