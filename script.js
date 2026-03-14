const themeToggle = document.getElementById('theme-toggle-checkbox');
const darkIcon = document.getElementById('dark-mode-icon');
const lightIcon = document.getElementById('light-mode-icon');

let currentTheme = localStorage.getItem('theme');
if (!currentTheme) {
    currentTheme = "dark";
    localStorage.setItem('theme', currentTheme);
}
document.documentElement.setAttribute("data-theme", currentTheme);

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