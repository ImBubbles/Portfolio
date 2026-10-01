const navbarFragmentUrl = new URL('../components/navbar.html', document.currentScript.src);

async function fillIfIDPresent(id, file) {
    const element = document.getElementById(id);
    if(!element) {
        return null;
    }
    await placeAtElement(element, file);
    return element;
}

async function placeAtElement(element, file) {
    const htmlResponse = await fetch(file);
    if (!htmlResponse.ok) {
        throw new Error(`Unable to load ${file}: ${htmlResponse.status}`);
    }
    const html = await htmlResponse.text();
    element.innerHTML = html.trim();
}

async function loadNavbar() {
    try {
        const navbar = await fillIfIDPresent('navbar', navbarFragmentUrl);
        if (!navbar) return;

        const title = document.getElementById('navbar__title');
        if (!title) return;

        title.textContent = navbar.dataset.title || '/hayden/portfolio';
        exspand(title);

        const titleLetters = [...title.querySelectorAll('span')];

        hoverBounce(titleLetters);
        bounceTitle(titleLetters);
        window.dispatchEvent(new Event('resize'));
    } catch (error) {
        console.error('Unable to initialize the navbar.', error);
    }
}

loadNavbar();