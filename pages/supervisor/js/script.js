document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementsByTagName("header")[0];
    document.body.style.marginTop = `${header.clientHeight}px`;

    const tabs = document.querySelectorAll("[data-tab]");

    if (tabs) {
        tabs.forEach(function (element) {
            element.addEventListener("click", function () {
                this.classList.remove("unactive");

                if (this.id === "active-users") {
                    document.getElementById("unactive-users").classList.add("unactive");
                }

                if (this.id === "unactive-users") {
                    document.getElementById("active-users").classList.add("unactive");
                }
            });
        });
    }

    const choicesStatus = new Choices('#user-status', {
        allowHTML: true,
        searchEnabled: false,
        placeholderValue: 'Статус',
    });

    //removeActiveItemsByValue('Крыса Лариса')

    choicesStatus.passedElement.element.addEventListener(
        'addItem',
        function (event) {
            // do something creative here...
            console.log(event.detail.id);
            console.log(event.detail.value);
            console.log(event.detail.label);
            console.log(event.detail.customProperties);
            console.log(event.detail.groupValue);
        },
        false,
    );

    window.lox = choicesStatus

    choicesStatus.passedElement.element.addEventListener(
        'change',
        function () {
            const select = document.getElementById("user-status").closest('.supervisor__select');
            select.setAttribute('data-counter', choicesStatus.itemList.element.children.length)
        },
        false,
    );

});