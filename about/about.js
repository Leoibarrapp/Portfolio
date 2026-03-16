//agrega nombres a las imagenes
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('img.captioned');

    images.forEach(img => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('img-wrapper');

        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);

        const caption = document.createElement('span');
        caption.textContent = img.getAttribute('alt');
        caption.classList.add('img-caption');
        wrapper.appendChild(caption);
    });
});