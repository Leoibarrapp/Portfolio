const darkIcon = document.getElementById('dark-mode-icon');
const lightIcon = document.getElementById('light-mode-icon');

//obtiene el tema actual del localStorage
let currentTheme = localStorage.getItem('theme');
if (!currentTheme) {
    currentTheme = "dark";
    localStorage.setItem('theme', currentTheme);
}
document.documentElement.setAttribute("data-theme", currentTheme);

//cambia el tema del sitio web segun el activo
function toggleTheme() {
    currentTheme = localStorage.getItem('theme');

    document.documentElement.classList.add('theme-transition');

    if (currentTheme == "dark") {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem('theme', 'light');
    }
    else if (currentTheme == "light") {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem('theme', 'dark');
    }

    window.setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
    }, 400);
}

//crea el footer en cada pagina
document.addEventListener("DOMContentLoaded", () => {
    const footer = document.createElement('footer');
    footer.className = 'page-footer';
    footer.innerHTML = '<p> 2026 - Created by <span class="gradient-text">Leonardo Ibarra</p>';
    document.body.appendChild(footer);
})