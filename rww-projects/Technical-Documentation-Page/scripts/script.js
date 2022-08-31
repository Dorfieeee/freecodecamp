const MIN_WIDTH_1024_QUERY = window.matchMedia("(min-width: 1024px)");

document.addEventListener("DOMContentLoaded", function init() {
    const navbarHeader = document.querySelector("#navbar header");
    const navbarList = document.querySelector(".nav-list");
    const navbarShowMoreBtn = document.querySelector("#navbarShowMore");
    const defaultListSize =
        navbarList.children.length >= 5 ? 5 : navbarList.children.length;
    let isShownMore = false;

    const changeBtnIcon = (isShownMore) => {
        const icon = navbarShowMoreBtn.firstElementChild;
        if (isShownMore) {
            icon.className = "fas fa-angle-double-up";
        } else {
            icon.className = "fas fa-ellipsis-h";
        }
    };

    const hideList = () => {
        setHeightTo({ n: defaultListSize, duration: 0 });
        changeBtnIcon((isShownMore = false));
        navbarShowMoreBtn["ariaHidden"] = false;
    }

    const showList = () => {
        setHeightTo({ n: -1, duration: 0 });
        navbarShowMoreBtn["ariaHidden"] = true;
    }
    
    const toggleNavbarList = (isClosed) => {
        console.log({isClosed});
        isClosed ? openList() : closeList();
    }
    
    const handleQueryChange = (mediaQuery) => {
        if (mediaQuery.matches) {
            // Query for larger devices => remove listener and set to default
            navbarHeader.removeEventListener("click", handleHeaderClick);
            showList();
        } else {
            // Query for smaller devices => add listener, show only some
            navbarHeader.addEventListener("click", handleHeaderClick);
            hideList();
        }
    };

    const setHeightTo = ({ n, duration = 0 }) => {
        let height = "auto", index = 0, count = n, mb = 10;

        if (n >= 0) {
            navbarList.style.height = height;
            height = 0;
            let children = navbarList.children;
            while (count > 0) {
                let child = children[index++];
                if (child.nodeName === "LI") count--;
                height += child.offsetHeight + mb;
            }
        }

        gsap.to(navbarList, {
            duration: duration,
            height: height,
        });
    };

    const handleShowMoreClick = (e) => {
        let duration = 0;
        if (!isShownMore) {
            setHeightTo({ n: -1, duration: duration });
            changeBtnIcon((isShownMore = true));
            navbarShowMoreBtn.setAttribute("title", "Show less");
        } else {
            setHeightTo({ n: defaultListSize, duration: duration });
            changeBtnIcon((isShownMore = false));
            navbarShowMoreBtn.setAttribute("title", "Show more");
        }
    };

    const handleHeaderClick = (e) => toggleNavbarList(isShownMore);

    // initialize navbar list button (hidden on larger devices)
    navbarShowMoreBtn.addEventListener("click", handleShowMoreClick);
    if (navbarList.children.length <= 5) {
        navbarShowMoreBtn.classList.add("hidden");
    }
    navbarHeader.addEventListener("click", handleHeaderClick);

    // initialize navbar list functionality if opened
    // on smaller screens from start
    if (!MIN_WIDTH_1024_QUERY.matches) {
        setHeightTo({ n: defaultListSize });
        changeBtnIcon((isShownMore = false));
    }
    // start listening for screen width change
    MIN_WIDTH_1024_QUERY.addEventListener("change", handleQueryChange);

    document.querySelectorAll(".main-section > header button").forEach((a) => {
        let titleText =
            "Copy link to this section: " + a.dataset.id.replace(/[_]/g, " ");

        a["aria-label"] = "Copy link for this header";
        a.setAttribute("type", "button");
        a.setAttribute("title", titleText);
    });
});
