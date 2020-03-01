function observer(selector, controlsSelector) {
    return function() {
        const sections = document.querySelectorAll(selector);
        const controls = document.querySelectorAll(controlsSelector);

        if (!controls[0].classList.contains('active')) controls[0].classList.add('active');

        window.addEventListener('scroll', () => {
            const scrollTopValue = window.pageYOffset;

            const sectionsCordinate = {
                first: [sections[0].clientHeight / 2],
                second: [sections[0].clientHeight, sections[1].clientHeight / 2],
                third: [sections[0].clientHeight, sections[1].clientHeight, sections[2].clientHeight / 2],
                fourth: [sections[0].clientHeight, sections[1].clientHeight, sections[2].clientHeight, sections[3].clientHeight / 2],
                fifth: [sections[0].clientHeight, sections[1].clientHeight, sections[2].clientHeight, sections[3].clientHeight, sections[4].clientHeight / 2],
                sixth: [sections[0].clientHeight, sections[1].clientHeight, sections[2].clientHeight, sections[3].clientHeight, sections[4].clientHeight, sections[5].clientHeight / 2],

                getSumValues: function(key) {
                    return this[key].reduce((curr, prev) => curr + prev);
                }
            }

            const isBetweenTopAndFirst = scrollTopValue >= 0 && scrollTopValue <= sectionsCordinate.getSumValues('first');
            const isBetweenFirstAndSecond = scrollTopValue >= sectionsCordinate.getSumValues('first') && scrollTopValue <= sectionsCordinate.getSumValues('second');
            const isBetweenSecondAndThird = scrollTopValue >= sectionsCordinate.getSumValues('second') && scrollTopValue <= sectionsCordinate.getSumValues('third');
            const isBetweenThirdAndFourth = scrollTopValue >= sectionsCordinate.getSumValues('third') && scrollTopValue <= sectionsCordinate.getSumValues('fourth');
            const isBetweenFourthAndFifth = scrollTopValue >= sectionsCordinate.getSumValues('fourth') && scrollTopValue <= sectionsCordinate.getSumValues('fifth');
            const isBetweenFifthAndSixth = scrollTopValue >= sectionsCordinate.getSumValues('fifth') && scrollTopValue <= sectionsCordinate.getSumValues('sixth');;

            if (isBetweenTopAndFirst) {
                controls[0].classList.add('active');
                controls[1].classList.remove('active');
            } else {
                controls[0].classList.remove('active');
                controls[1].classList.add('active');
            }

            if (isBetweenFirstAndSecond) {
                controls[1].classList.add('active');
                controls[2].classList.remove('active');
            } else {
                controls[1].classList.remove('active');
                controls[2].classList.add('active');
            }

            if (isBetweenSecondAndThird) {
                controls[2].classList.add('active');
                controls[3].classList.remove('active');
            } else {
                controls[2].classList.remove('active');
                controls[3].classList.add('active');
            }

            if (isBetweenThirdAndFourth) {
                controls[3].classList.add('active');
                controls[4].classList.remove('active');
            } else {
                controls[3].classList.remove('active');
                controls[4].classList.add('active');
            }

            if (isBetweenFourthAndFifth) {
                controls[4].classList.add('active');
                controls[5].classList.remove('active');
            } else {
                controls[4].classList.remove('active');
                controls[5].classList.add('active');
            }

            if (isBetweenFifthAndSixth) {
                controls[5].classList.add('active');
            } else {
                controls[5].classList.remove('active');
            }
        });
    };
}

window.addEventListener('load', () => {
    const sectionsObserver =  observer('section', '.controls li');
    sectionsObserver();
});