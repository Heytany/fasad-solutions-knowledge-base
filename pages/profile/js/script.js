document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementsByTagName("header")[0];
    document.body.style.paddingTop = `${header.clientHeight}px`;
});