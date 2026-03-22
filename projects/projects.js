const modal = document.getElementById("modal-overlay");
const cards = document.querySelectorAll(".card");
const closeBtn = document.querySelector(".close-btn");

const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalCarouselSlides = document.getElementById("modal-carousel-slides");
const modalCarouselDots = document.getElementById("modal-carousel-dots");
const modalLinkButton = document.getElementById("modal-link-button");


//asigna a cada card sus propiedades, como titulo, descripcion, etc, y crea los elementos del carrusel
cards.forEach(card => {
    card.addEventListener("click", () => {
        const title = card.querySelector(".card-title").innerHTML;
        const description = card.querySelector(".card-full-description").innerHTML;
        const assets = card.querySelectorAll(".card-assets img, .card-assets video");
        const link = card.querySelector(".card-link-button");

        modalCarouselSlides.innerHTML = "";
        modalCarouselDots.innerHTML = "";

        slideIndex = 0;

        modalTitle.innerHTML = title;
        modalDescription.innerHTML = description;
        if (link) {
            modalLinkButton.style.display = "flex";
            modalLinkButton.onclick = () => window.open(link.href, "_blank");
            modalLinkButton.innerHTML = link.innerHTML || "Check the repository";

            if (card.classList.contains("work-badge")) {
                modalLinkButton.classList.remove("btn-primary");
                modalLinkButton.classList.remove("btn-yellow");
                modalLinkButton.classList.add("btn-accent");
            } else if (card.classList.contains("academic-badge")) {
                modalLinkButton.classList.remove("btn-accent");
                modalLinkButton.classList.remove("btn-yellow");
                modalLinkButton.classList.add("btn-primary");
            } else if (card.classList.contains("personal-badge")) {
                modalLinkButton.classList.remove("btn-primary");
                modalLinkButton.classList.remove("btn-accent");
                modalLinkButton.classList.add("btn-yellow");
            }
        } else {
            modalLinkButton.style.display = "none";
        }

        console.log(assets);

        const carouselWrapper = document.querySelector(".modal-carousel-wrapper");
        const modalContent = document.querySelector(".modal-content");

        if (assets.length > 0) {
            carouselWrapper.style.display = "flex";
            modalContent.style.width = "50%";
            assets.forEach((asset, index) => {
                const newSlide = document.createElement("div");
                newSlide.classList.add("modal-carousel-slide");

                const clonedAsset = asset.cloneNode(true);
                clonedAsset.removeAttribute("hidden");
                newSlide.appendChild(clonedAsset);

                modalCarouselSlides.appendChild(newSlide);

                const dot = document.createElement("span");
                dot.classList.add("carousel-dot");
                dot.addEventListener("click", () => {
                    slideIndex = index;
                    showSlides();
                });
                modalCarouselDots.appendChild(dot);
            });

            const carouselButtons = document.querySelectorAll(".modal-carousel-button");
            if (assets.length <= 1) {
                carouselButtons.forEach(btn => btn.style.display = "none");
                modalCarouselDots.style.display = "none";
            } else {
                carouselButtons.forEach(btn => btn.style.display = "block");
                modalCarouselDots.style.display = "flex";
            }
        }
        else {
            carouselWrapper.style.display = "none";
            modalContent.style.width = "100%";
        }

        modal.classList.add("show");

        showSlides();
    });
});

function closeModal() {
    modal.classList.remove("show");
    const videos = modal.querySelectorAll("video");
    videos.forEach(video => video.pause());
}

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

let slideIndex = 0;

//funcion que muestra las diapositivas
function showSlides() {
    const slides = document.querySelectorAll(".modal-carousel-slide");
    const dots = document.querySelectorAll(".carousel-dot");
    if (slides.length === 0) return;

    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    slides.forEach(slide => {
        slide.classList.remove("active");

        //pausa los videos cuando se cambia de diapositiva
        const video = slide.querySelector("video");
        if (video) {
            video.pause();
        }
    });
    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    slides[slideIndex].classList.add("active");
    if (dots.length > 0) {
        dots[slideIndex].classList.add("active");
    }
}

function nextSlide() {
    slideIndex++;
    showSlides();
}

function prevSlide() {
    slideIndex--;
    showSlides();
}