const htmlResponse = await fetch('/components/project.html');
const html = await htmlResponse.text();

const projectsResponse = await fetch('/files/projects.json');
const projects = await projectsResponse.json();

const list = document.getElementById('projects__list');

for (const project of projects) {
    // Turn the HTML template into DOM elements
    const template = document.createElement('template');
    template.innerHTML = html.trim();

    const li = template.content.firstElementChild;

    // Basic information
    li.querySelector('.projects__project__title').textContent = project.name;

    const toolsElement = li.querySelector('.projects__project__tools__list');
    if(project.tools) {
        toolsElement.textContent =
            `${project.tools.join(', ')}`;
    } else {
        toolsElement.remove();
    }

    li.querySelector('.projects__project__description').textContent =
        project.description;

    // GitHub
    const github = li.querySelector('.projects__project__github');
    if (project.github) {
        github.href = project.github;
    } else {
        github.remove();
    }

    // SpigotMC
    const spigotmc = li.querySelector('.projects__project__spigotmc');
    if (project.spigot) {
        spigotmc.href = project.spigot;
    } else {
        spigotmc.remove();
    }

    list.append(li);
    window.dispatchEvent(new Event('resize'));
}