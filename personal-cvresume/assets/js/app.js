const aside = document.getElementById('aside');

window.onload = () => {
    closse.addEventListener('click', hideAside);
}

function hideAside() {
    if (aside.dataset.toggle == 'true') {
        this.classList.add('show-aside');
        document.body.classList.add('hide-aside');
        aside.dataset.toggle = !true;

    } else {
        this.classList.remove('show-aside');
        document.body.classList.remove('hide-aside');
        aside.dataset.toggle = true;
    }
}