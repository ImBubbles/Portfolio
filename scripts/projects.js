const response = await fetch('../files/projects.json');
const projects = await response.json();

const list = document.getElementById('projects__list');


/*
<a href="https://linkedin.com/in/haydenmholmes/" target="_blank" class="socials__link">
    <img src="../images/linkedin.png" alt="LinkedIn" class="socials__image">
</a>
 */

function createLinkButton(link, alt, src) {

    const li = document.createElement('li');
    li.classList.add('projects__link__item');

    const button = document.createElement('a');
    button.href = link;
    button.target = "_blank";
    button.classList.add("projects__project__link");
    const img = document.createElement('img');
    img.src = src;
    img.classList.add("projects__project__link__img");

    button.append(img);
    li.append(button);

    return li;
}

for (let i = 0; i < projects.length; i++) {
    const project = projects[i];

    const li = document.createElement('li');
    li.classList.add('projects__list__item');

    const title = document.createElement('h1');
    title.classList.add('projects__project__title');
    title.textContent = project.name;

    const tools = document.createElement('p');
    tools.classList.add('projects__project__tools');
    let toolsText = "Tools: ";
    let toolsList = project.tools;
    for(let j = 0; j < toolsList.length; j++) {
        toolsText += toolsList[j];
        if(j < toolsList.length - 1) {
            toolsText += ", ";
        }
    }
    tools.textContent = toolsText;

    const description = document.createElement('p');
    description.classList.add('projects__project__description');
    description.textContent = project.description;

    // create links

    const links = document.createElement('ul');
    links.classList.add('projects__project__links');
    if (project.github != null) {
        const github = createLinkButton(project.github, "GitHub", "../images/github.png");
        links.append(github);
    }

    if (project.spigot != null) {
        const spigot = createLinkButton(project.github, "GitHub", "../images/github.png");
        links.append(spigot);
    }

    // finish

    li.append(title, toolsText, description, links);
    list.append(li);
}