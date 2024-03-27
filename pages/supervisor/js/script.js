document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementsByTagName("header")[0];
    document.body.style.marginTop = `${header.clientHeight}px`;

    const tabs = document.querySelectorAll("[data-tab]");
    let userActive = true;
    if (tabs) {
        tabs.forEach(function (element) {
            element.addEventListener("click", function () {
                this.classList.remove("unactive");

                if (this.id === "active-users") {
                    document.getElementById("unactive-users").classList.add("unactive");
                    userActive = true;
                }

                if (this.id === "unactive-users") {
                    document.getElementById("active-users").classList.add("unactive");
                    userActive = false;
                }

                filterApplying();
            });
        });
    }

    function filterApplying() {
        const arrayFilters = [];

        arrayFilters.push({ field: "active", type: "=", value: userActive })

        if (inputSearch.value.length >= 3) {
            arrayFilters.push({ field: customFilterNames, type: { value: inputSearch.value } })
        }

        arrayFilters.push({ field: "date_id", type: "keywords", value: getSelectedValues(document.getElementById('user-period')) });
        arrayFilters.push({ field: "status_id", type: "keywords", value: getSelectedValues(document.getElementById('user-status')) });

        table.setFilter(arrayFilters);
    }

    function customFilterNames(data, filterParams) {
        //data - the data for the row being filtered
        //filterParams - params object passed to the filter
        const dataName = String(data.name).toLocaleLowerCase();
        const dataMentorName = String(data.mentorName).toLocaleLowerCase();

        return dataName.includes(String(filterParams.value).toLocaleLowerCase()) ||
            dataMentorName.includes(String(filterParams.value).toLocaleLowerCase()); //must return a boolean, true if it passes the filter.
    }

    const inputSearch = document.querySelector("#user-name");
    const inputSearchBtn = document.querySelector("#user-name-btn");
    inputSearch.addEventListener("keypress", function (event) {
        if (event.key === "Enter" && this.value.length >= 3) {
            filterApplying();
        } else {
            table.clearFilter();
        }

        console.log(table.getFilters())
    });

    inputSearchBtn.addEventListener("click", function (event) {
        if (event.key === "Enter" && inputSearch.value.length >= 3) {
            filterApplying();
        } else {
            table.clearFilter();
        }

        console.log(table.getFilters())
    });

    const choicesStatus = new Choices('#user-status', {
        allowHTML: true,
        searchEnabled: false,
        placeholderValue: 'Статус',
        noChoicesText: 'Нет подходящих значений'
    });

    const choicesPeriod = new Choices('#user-period', {
        allowHTML: true,
        searchEnabled: false,
        placeholderValue: 'Срок',
        noChoicesText: 'Нет подходящих значений'
    });

    function getSelectedValues(select) {
        const selected = [];
        for (let option of select.options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }

        return selected.join(' ');
    }

    function setCounterForFilter() {
        const select = document.getElementById("user-status").closest('.supervisor__select');
        const length = choicesStatus?.itemList?.element?.children?.length || 0;
        if (length) {
            select.setAttribute('data-counter', length);
        } else {
            select.removeAttribute('data-counter');
        }

        const selectPeriod = document.getElementById("user-period").closest('.supervisor__select');
        const lengthPeriod = choicesPeriod?.itemList?.element?.children?.length || 0;
        if (lengthPeriod) {
            selectPeriod.setAttribute('data-counter', lengthPeriod);
        } else {
            selectPeriod.removeAttribute('data-counter');
        }

    }

    function addFilterItem(value, label, isPeriod = false) {
        const svgPattern = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.05025 5.05024L10 9.99999M10 9.99999L14.9497 14.9497M10 9.99999L14.9497 5.05024M10 9.99999L5.05025 14.9497" stroke="#171D23" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>`;
        const wrapper = document.querySelector('[data-filter-panel]');
        const itemPattern = Object.assign(document.createElement('div'), {
            innerHTML: `<span>${label}</span>${svgPattern}`,
        });
        const labelTheme = isPeriod ? 'period' : 'status';
        itemPattern.setAttribute('class', 'supervisor__filter-item');
        itemPattern.setAttribute('data-filter-item', value);
        itemPattern.setAttribute('data-filter-type', labelTheme);
        wrapper.appendChild(itemPattern)
        const element = document.querySelector(`[data-filter-type="${labelTheme}"][data-filter-item="${value}"]`);
        element.addEventListener("click", function () {
            isPeriod ? choicesPeriod.removeActiveItemsByValue(value) : choicesStatus.removeActiveItemsByValue(value);
            filterApplying();
            setCounterForFilter();
            this.remove();
        });
    }

    choicesStatus.passedElement.element.addEventListener(
        'addItem',
        function (event) {
            addFilterItem(event.detail.value, event.detail.label);
            filterApplying();
        },
        false,
    );

    choicesStatus.passedElement.element.addEventListener(
        'change',
        setCounterForFilter,
        false,
    );

    choicesPeriod.passedElement.element.addEventListener(
        'addItem',
        function (event) {
            addFilterItem(event.detail.value, event.detail.label, true);
            filterApplying();
        },
        false,
    );

    choicesPeriod.passedElement.element.addEventListener(
        'change',
        setCounterForFilter,
        false,
    );

    const tabledata = [
        { id: 1, active: true, status_id: 'plan-a', date_id: 'date-a', name: "Христорожденственкий Андрей Иванович", mentorName: "Христорожденственкий А. И.", start: "01.08.2023", end: "08.04.2024", status: "По плану" },
        { id: 2, active: true, status_id: 'plan-b', date_id: 'date-b', name: "Бипов Андрей Иванович", mentorName: "Христорожденственкий А. И.", start: "01.04.2023", end: "08.04.2023", status: "Без плана" },
        { id: 3, active: true, status_id: 'plan-c', date_id: 'date-c', name: "Слипов Андрей Иванович", mentorName: "Христорожденственкий А. И.", start: "01.01.2023", end: "08.04.2023", status: "Скурил план" },
        { id: 1, active: true, status_id: 'plan-a', date_id: 'date-a', name: "Христорожденственкий Андрей Иванович", mentorName: "Христорожденственкий А. И.", start: "01.08.2023", end: "08.04.2024", status: "По плану" },
        { id: 2, active: true, status_id: 'plan-b', date_id: 'date-b', name: "Бипов Андрей Иванович", mentorName: "Христорожденственкий А. И.", start: "01.04.2023", end: "08.04.2023", status: "Без плана" },
        { id: 3, active: true, status_id: 'plan-c', date_id: 'date-c', name: "Слипов Андрей Иванович", mentorName: "Христорожденственкий А. И.", start: "01.01.2023", end: "08.04.2023", status: "Скурил план" },
        { id: 1, active: true, status_id: 'plan-a', date_id: 'date-a', name: "Христорожденственкий Андрей Иванович", mentorName: "Христорожденственкий А. И.", start: "01.08.2023", end: "08.04.2024", status: "По плану" },
        { id: 2, active: true, status_id: 'plan-b', date_id: 'date-b', name: "Бипов Андрей Иванович", mentorName: "Христорожденственкий А. И.", start: "01.04.2023", end: "08.04.2023", status: "Без плана" },
        { id: 3, active: true, status_id: 'plan-c', date_id: 'date-c', name: "Слипов Андрей Иванович", mentorName: "Христорожденственкий А. И.", start: "01.01.2023", end: "08.04.2023", status: "Скурил план" },
        { id: 1, active: true, status_id: 'plan-a', date_id: 'date-a', name: "Христорожденственкий Андрей Иванович", mentorName: "Христорожденственкий А. И.", start: "01.08.2023", end: "08.04.2024", status: "По плану" },
        { id: 2, active: true, status_id: 'plan-b', date_id: 'date-b', name: "Бипов Андрей Иванович", mentorName: "Христорожденственкий А. И.", start: "01.04.2023", end: "08.04.2023", status: "Без плана" },
        { id: 3, active: true, status_id: 'plan-c', date_id: 'date-c', name: "Слипов Андрей Иванович", mentorName: "Христорожденственкий А. И.", start: "01.01.2023", end: "08.04.2023", status: "Скурил план" },
        { id: 1, active: true, status_id: 'plan-a', date_id: 'date-a', name: "Христорожденственкий Андрей Иванович", mentorName: "Христорожденственкий А. И.", start: "01.08.2023", end: "08.04.2024", status: "По плану" },
        { id: 2, active: true, status_id: 'plan-b', date_id: 'date-b', name: "Бипов Андрей Иванович", mentorName: "Христорожденственкий А. И.", start: "01.04.2023", end: "08.04.2023", status: "Без плана" },
        { id: 3, active: true, status_id: 'plan-c', date_id: 'date-c', name: "Слипов Андрей Иванович", mentorName: "Христорожденственкий А. И.", start: "01.01.2023", end: "08.04.2023", status: "Скурил план" },
        { id: 1, active: true, status_id: 'plan-a', date_id: 'date-a', name: "Христорожденственкий Андрей Иванович", mentorName: "Христорожденственкий А. И.", start: "01.08.2023", end: "08.04.2024", status: "По плану" },
        { id: 2, active: true, status_id: 'plan-b', date_id: 'date-b', name: "Бипов Андрей Иванович", mentorName: "Христорожденственкий А. И.", start: "01.04.2023", end: "08.04.2023", status: "Без плана" },
        { id: 3, active: true, status_id: 'plan-c', date_id: 'date-c', name: "Слипов Андрей Иванович", mentorName: "Христорожденственкий А. И.", start: "01.01.2023", end: "08.04.2023", status: "Скурил план" },
        { id: 1, active: true, status_id: 'plan-a', date_id: 'date-a', name: "Христорожденственкий Андрей Иванович", mentorName: "Христорожденственкий А. И.", start: "01.08.2023", end: "08.04.2024", status: "По плану" },
        { id: 2, active: true, status_id: 'plan-b', date_id: 'date-b', name: "Бипов Андрей Иванович", mentorName: "Христорожденственкий А. И.", start: "01.04.2023", end: "08.04.2023", status: "Без плана" },
        { id: 3, active: true, status_id: 'plan-c', date_id: 'date-c', name: "Слипов Андрей Иванович", mentorName: "Христорожденственкий А. И.", start: "01.01.2023", end: "08.04.2023", status: "Скурил план" },
        { id: 1, active: true, status_id: 'plan-a', date_id: 'date-a', name: "Христорожденственкий Андрей Иванович", mentorName: "Христорожденственкий А. И.", start: "01.08.2023", end: "08.04.2024", status: "По плану" },
        { id: 2, active: true, status_id: 'plan-b', date_id: 'date-b', name: "Бипов Андрей Иванович", mentorName: "Христорожденственкий А. И.", start: "01.04.2023", end: "08.04.2023", status: "Без плана" },
        { id: 3, active: true, status_id: 'plan-c', date_id: 'date-c', name: "Слипов Андрей Иванович", mentorName: "Христорожденственкий А. И.", start: "01.01.2023", end: "08.04.2023", status: "Скурил план" },
    ];

    const BtnFunction = function (cell, formatterParams) { //plain text value
        return `<button class="table-button" type="button">Принять решение</button>`;
    };

    const table = new Tabulator("#user-table", {
        locale: true,
        data: tabledata,           //load row data from array
        layout: "fitColumns",      //fit columns to width of table
        responsiveLayout: "hide",  //hide columns that don't fit on the table
        addRowPos: "top",          //when adding a new row, add it to the top of the table
        history: true,             //allow undo and redo actions on the table
        pagination: "local",       //paginate the data
        paginationSize: 9,         //allow 7 rows per page of data
        paginationCounter: "rows", //display count of paginated rows in footer
        initialSort: [             //set the initial sort order of the data
            { column: "name", dir: "asc" },
        ],
        initialFilter: [
            { field: "active", type: "=", value: userActive }
        ],
        columns: [                 //define the table columns
            { title: "ФИО стажера", field: "name", },
            { title: "Наставник", field: "mentorName", },
            {
                title: "Начало", field: "start", sorter: "date", width: 150, sorterParams: {
                    format: "dd.MM.yyyy",
                    alignEmptyValues: "top",
                }
            },
            {
                title: "Окончание", field: "end", sorter: "date", width: 150, sorterParams: {
                    format: "dd.MM.yyyy",
                    alignEmptyValues: "top",
                }
            },
            { title: "Статус", field: "status", width: 140 },
            {
                title: "Итог",
                headerSort: false,
                formatter: BtnFunction, width: 160, cellClick: function (e, cell) {
                    alert("Going To");
                }
            },
        ],
        langs: {
            "ru-ru": {
                "data": {
                    "loading": "Загрузка", //data loader text
                    "error": "Ошибка", //data error text
                },
                "groups": { //copy for the auto generated item count in group header
                    "item": "item", //the singular  for item
                    "items": "items", //the plural for items
                },
                "pagination": {
                    "page_size": "Page Size", //label for the page size select element
                    "page_title": "Show Page",//tooltip text for the numeric page button, appears in front of the page number (eg. "Show Page" will result in a tool tip of "Show Page 1" on the page 1 button)
                    "first": "В начало", //text for the first page button
                    "first_title": "На первую страницу", //tooltip text for the first page button
                    "last": "В конец",
                    "last_title": "На последнюю страницу",
                    "prev": "<",
                    "prev_title": "Предыдущая страница",
                    "next": ">",
                    "next_title": "Следующая страница",
                    "all": "All",
                    "counter": {
                        "showing": "Показано",
                        "of": "из",
                        "rows": "записей",
                        "pages": "pages",
                    }
                },
                "headerFilters": {
                    "default": "filter column...", //default header filter placeholder text
                    "columns": {
                        "name": "filter name...", //replace default header filter text for column name
                    }
                }
            }
        },

        renderStarted: function () {
            console.log('here')
            if (table("getPageMax") > 1) {
                document.querySelector(".tabulator-footer").show();
            } else {
                document.querySelector(".tabulator-footer").hide();
            }
        },
    });

    table.on("renderComplete", function () {
        const select = document.querySelector(".tabulator-paginator")
        if (table.getPageMax() > 1 && select) {
            select.style.visibility = 'visible';
        } else {
            select.style.visibility = 'hidden';
        }
    })
});