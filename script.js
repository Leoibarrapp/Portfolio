const themeToggle = document.getElementById('theme-toggle-checkbox');
const darkIcon = document.getElementById('dark-mode-icon');
const lightIcon = document.getElementById('light-mode-icon');

let currentTheme = localStorage.getItem('theme') || "dark";
document.documentElement.setAttribute("data-theme", currentTheme);

if (currentTheme == "dark") {
    darkIcon.style.display = "block";
    lightIcon.style.display = "none";
}
else if (currentTheme == "light") {
    darkIcon.style.display = "none";
    lightIcon.style.display = "block";
}

function toggleTheme() {
    currentTheme = localStorage.getItem('theme');

    if (currentTheme == "dark") {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem('theme', 'light');

        darkIcon.style.display = "none";
        lightIcon.style.display = "block";
    }
    else if (currentTheme == "light") {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem('theme', 'dark');

        darkIcon.style.display = "block";
        lightIcon.style.display = "none";
    }
}