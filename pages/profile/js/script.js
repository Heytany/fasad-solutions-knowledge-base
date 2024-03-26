document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementsByTagName("header")[0];
    document.body.style.marginTop = `${header.clientHeight}px`;

    const status = document.getElementById('status-info');

    let statusContent;

    if (status) {
        switch (status.dataset.type) {
            case 'novice':
                statusContent = 'Добро пожаловать в мир новых знаний! Здесь вы найдете поддержку и понятные объяснения, чтобы уверенно стартовать в изучении предмета или навыка.';
                break;
            case 'advanced':
                statusContent = 'Поздравляем! Вы уже преодолели первый этап и готовы к более глубокому погружению. Вы уже знаете основы, и теперь мы поможем вам стать еще увереннее в своих знаниях.';
                break;
            case 'pro':
                statusContent = 'Добро пожаловать в высшую лигу! На этом уровне мы приглашаем вас стать настоящим мастером в вашей области. Этот уровень предназначен для тех, кто готов стать настоящим экспертом и делиться своими знаниями с другими.'
                break;
            default:
                statusContent = 'Empty';
        }
    }

    tippy('#status-info', {
        content: statusContent,
    });
});