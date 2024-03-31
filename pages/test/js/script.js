document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementsByTagName("header")[0];
    document.body.style.marginTop = `${header.clientHeight}px`;
});

window.onload = function () {
    const iframe = document.getElementById("quiz");
    iframe.height = iframe.contentWindow.document.body.scrollHeight;
}