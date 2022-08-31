document.addEventListener("DOMContentLoaded", init);

function init() {
    $("#survey-form").addEventListener("submit", submitSurvey);
    $("#start-survey-btn").addEventListener("click", playVideo);
    $("#repeat-btn").addEventListener("click", startSurvey);
    $("#hero-video").addEventListener("ended", startSurvey);
}

function toggleHidden(id) {
    $(id).classList.toggle("hidden");
}

function startSurvey() {
    transitionPageTo("#form-page");
}

function playVideo(e) {
    $("#hero-video").play();
}

function submitSurvey(e) {
    e.preventDefault();

    const form = $("#survey-form");
    const formData = Object.fromEntries(new FormData(form).entries());
    changeUserGratitudeMsg(formData["name"]);
    transitionPageTo("#summary-page");
    form.querySelectorAll("input").forEach((input) => {
        switch (input.type) {
            case "text":
            case "number":
            case "email":
                input["value"] = "";
                break;
            case "checkbox":
            case "radio":
                input["checked"] = "";
                break;
            default:
                break;
        }
    });
}

function transitionPageTo(nextPage) {
    const tl = gsap.timeline();
    const currentPage =
        "#" +
        Array.from(document.querySelectorAll(".page"))
            .filter((page) => !page.classList.contains("hidden"))
            .pop().id;

    tl.to(currentPage, {
        duration: 0.5,
        opacity: 0,
        onCompleteParams: [currentPage],
        onComplete: toggleHidden,
    });
    tl.to(".page", { duration: 0, opacity: 0 });
    tl.to(nextPage, {
        duration: 0.5,
        opacity: 1,
        onStartParams: [nextPage],
        onStart: toggleHidden,
    });
}

function changeUserGratitudeMsg(name) {
    $("#userGratitudeMsg").innerText = `Thank you for your time, ${name}!`
}

function $(selector) {
    return document.querySelector(selector);
}