document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementsByTagName("header")[0];
    document.body.style.marginTop = `${header.clientHeight}px`;

    const status = document.getElementById('status-info');

    let statusContent;

    let lvl = 5;
    let progress = 75;

    function getNoun(number, one, two, five) {
        let n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) {
            return five;
        }
        n %= 10;
        if (n === 1) {
            return one;
        }
        if (n >= 2 && n <= 4) {
            return two;
        }
        return five;
    }

    if (status) {
        switch (status.dataset.type) {
            case 'novice':
                statusContent = `
                    <b>Вы – новичок!</b> <br>
                    <span>До следующего уровня пройдите еще ${lvl} ${getNoun(lvl, 'уровень', 'уровня', 'уровней')}</span>
                    <div style="background:#ECEEEE;" class="progress-bar">
                        <hr style="width: ${progress}%;">
                    </div>
                    <p>Добро пожаловать в мир новых знаний! Здесь вы найдете поддержку и понятные объяснения, чтобы уверенно стартовать в изучении предмета или навыка.</p>
                `;
                break;
            case 'advanced':
                statusContent = `
                <b style="color=#11CB99;">Вы – продвинутый!</b> <br>
                <span>До следующего уровня пройдите еще ${lvl} ${getNoun(lvl, 'уровень', 'уровня', 'уровней')}</span>
                <div style="background:#ECEEEE;" class="progress-bar">
                    <hr style="width: ${progress}%; background:#11CB99;">
                </div>
                <p>Поздравляем! Вы уже преодолели первый этап и готовы к более глубокому погружению. Вы уже знаете основы, и теперь мы поможем вам стать еще увереннее в своих знаниях.</p>
            `;
                break;
            case 'pro':
                statusContent = `
                <b style="color=#11CB99;">Вы – эксперт!</b> <br>
                <span>Поздравляем! Вы прошли все задания</span>
                <div style="background:#ECEEEE;" class="progress-bar">
                    <hr style="width:100%; background:#FFA65B;">
                </div>
                <p>Добро пожаловать в высшую лигу! На этом уровне мы приглашаем вас стать настоящим мастером в вашей области. Этот уровень предназначен для тех, кто готов стать настоящим экспертом и делиться своими знаниями с другими.</p>
            `;
                break;
            default:
                statusContent = 'Empty';
        }
    }

    tippy('#status-info', {
        content: statusContent,
        allowHTML: true,
    });
});