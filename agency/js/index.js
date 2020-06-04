const tabNav = document.querySelector('.products-tab .tab-nav');
const tabLinks = document.querySelectorAll('.products-tab .tab-nav .tab-link');
const tabContent = document.querySelectorAll('.products-tab .tab-content');

window.addEventListener('load', () => hideTabsContent(1));

function hideTabsContent(index) {
    for (let i = index; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show-content');
        tabContent[i].classList.add('hide-content');
        tabLinks[i].classList.remove('active');
    }
}

function showTabsContent(index) {
    if (tabContent[index].classList.contains('hide-content')) {
        hideTabsContent(0);
        
        tabLinks[index].classList.add('active');
        tabContent[index].classList.remove('hide-content');
        tabContent[index].classList.add('show-content');
    }
}

tabNav.addEventListener('click', (e) => {
    const navTarget = e.target;

    if (navTarget.classList.contains('tab-link')) {
        for (let i = 0; i < tabLinks.length; i++) {
            if (navTarget === tabLinks[i]) {
                showTabsContent(i);
                return;
            }
        }
    }
})