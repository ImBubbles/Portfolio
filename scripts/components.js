loadNavbar();
window.dispatchEvent(new Event('resize'));

async function fillIfIDPresent(id, file) {
    const element = document.getElementById(id);
    if(!element) {
        return;
    }
    await placeAtElement(element, file);
}

async function placeAtElement(element, file) {
    const htmlResponse = await fetch(file);
    const html = await htmlResponse.text();
    element.innerHTML = html.trim();
}

async function loadNavbar() {
    await fillIfIDPresent('navbar', '/components/navbar.html');
    const title = document.getElementById('navbar__title');

    if (!title) return;

    exspand(title);

    const titleLetters = [...title.querySelectorAll('span')];

    hoverBounce(titleLetters);
    bounceTitle(titleLetters);
}