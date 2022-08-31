const largeDeviceMediaQuery = window.matchMedia("(min-width: 1024px)");

function toggleNavbar(mediaQuery) {
    const navbarHeader = document.querySelector("#navbar h3");

    if (mediaQuery.matches) {
        // remove listener and set to default
        navbarHeader.removeEventListener("click", toggleNavbarList);
        hideNavbarList();
        showItems();
    } else {
        // add listener
        navbarHeader.addEventListener("click", toggleNavbarList);
        showItems(5);
    }
}

function toggleNavbarList() {
    const navbarList = document.querySelector(".nav-list");
    if (!navbarList.classList.contains("show")) {
        showNavbarList();
    } else {
        hideNavbarList();
    }
}

function showNavbarList() {
    const navbarList = document.querySelector(".nav-list");
    if (!navbarList.classList.contains("show")) {
        navbarList.classList.add("show");
    }
}

function hideNavbarList() {
    const navbarList = document.querySelector(".nav-list");
    if (navbarList.classList.contains("show")) {
        navbarList.classList.remove("show");
    }
}

function showItems(n) {
    let iconClassName;
    const navbarList = document.querySelector(".nav-list");
    const showButton = document.querySelector("#navbarShowMore > i")
    const itemHeight = navbarList.firstElementChild.offsetHeight;
    n = n || navbarList.children.length;
    iconClassName = n ? "fas fa-ellipsis-h" : "fas fa-angle-double-up";
    showButton.className = iconClassName;
    navbarList.style.height = itemHeight * n + "px";
}

document.addEventListener("DOMContentLoaded", function init() {
    const navbarHeader = document.querySelector("#navbar h3");
    if (!largeDeviceMediaQuery.matches) {
        navbarHeader.addEventListener("click", toggleNavbarList);
        showItems(5);
    }
    largeDeviceMediaQuery.addEventListener("change", toggleNavbar);
})