// Globals
let sections = document.querySelectorAll('section');
let navItems = document.getElementById('nav-items');
let adjustedHeaderHeight;

// Event listeners
navItems.addEventListener('click', event => {
    scrollToSection(event);
})

window.addEventListener('resize', () => {
    adjustedHeaderHeight = navItems.getBoundingClientRect().bottom + 70;
})

window.addEventListener('scroll', () => {
    adjustedHeaderHeight = navItems.getBoundingClientRect().bottom + 70;
    checkForSectionsInViewport();
});

// Functions
/**
* @description Dynamically builds the navigation menu
*              from available section elements.
*/
function buildNavList () {
    let fragment = new DocumentFragment();
    let i = 1;
    for (let section of sections) {
        // Update section
        section.setAttribute('data-section-link', `section-${i}`)

        // Create new nav-item
        let navItem = document.createElement('li');
        navItem.innerText = section.querySelector('h2').innerText;
        navItem.setAttribute('data-section-link', `section-${i}`)
        navItem.classList.toggle('nav-item');
        fragment.appendChild(navItem);
        i++;
    }
    navItems.appendChild(fragment);
}

/**
* @description Checks all sections to see which is currently
*              in the viewport.
*/
function checkForSectionsInViewport() {
    sections.forEach(section => {
        let navItem = document.querySelector(`li[data-section-link='${section.getAttribute('data-section-link')}']`);
        if (isInView(section)) {
            section.classList.add('active-section');
            navItem.classList.add('active-nav-item');
        }
        else {
            section.classList.remove('active-section');
            navItem.classList.remove('active-nav-item');
        }
    });
}

/**
* @description Checks to see if an element is within the viewport.
* @param {Element} element - A HTML Element
* @returns {boolean} True if element is within viewport, false, if
                     not.
*/
function isInView (element) {
    const ELEMENT_TOP = element.getBoundingClientRect().top;
    const ELEMENT_BOTTOM = element.getBoundingClientRect().bottom;
    return (
        (ELEMENT_TOP >= 0 && ELEMENT_BOTTOM <= window.innerHeight) ||
        (ELEMENT_TOP <= window.innerHeight && ELEMENT_BOTTOM >= window.innerHeight - 100)
    );
}

/**
* @description Scrolls to a section that has the same
*              data-section-link attribute as the
               nav-item that was clicked on.
* @param {Event} event - A browser event
*/
function scrollToSection(event) {
    const SECTION = document.querySelector(`section[data-section-link='${event.target.getAttribute('data-section-link')}']`);
    window.scrollBy({
        top: SECTION.getBoundingClientRect().top - adjustedHeaderHeight,
        behavior: 'smooth'
      });
}

buildNavList();
