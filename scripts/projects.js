const list = document.getElementById('projects__list');
const status = document.getElementById('projects__status');
const templateUrl = new URL('../components/project.html', import.meta.url);
const projectsUrl = new URL('../files/projects.json', import.meta.url);

async function loadProjects() {
    if (!list) return;

    if (status) {
        status.hidden = false;
        status.textContent = 'Loading projects...';
    }

    try {
        const [htmlResponse, projectsResponse] = await Promise.all([
            fetch(templateUrl),
            fetch(projectsUrl)
        ]);

        if (!htmlResponse.ok || !projectsResponse.ok) {
            throw new Error(`Project request failed (${htmlResponse.status}, ${projectsResponse.status}).`);
        }

        const [html, projects] = await Promise.all([
            htmlResponse.text(),
            projectsResponse.json()
        ]);
        if (!Array.isArray(projects)) {
            throw new Error('Project data must be an array.');
        }

        const fragment = document.createDocumentFragment();
        for (const project of projects) {
            const template = document.createElement('template');
            template.innerHTML = html.trim();
            const item = template.content.firstElementChild;
            if (!item) {
                throw new Error('The project template is empty.');
            }

            item.querySelector('.projects__project__title').textContent = project.name;

            const toolsElement = item.querySelector('.projects__project__tools__list');
            if (project.tools) {
                toolsElement.textContent = project.tools.join(', ');
            } else {
                toolsElement.remove();
            }

            item.querySelector('.projects__project__description').textContent = project.description;

            const github = item.querySelector('.projects__project__github');
            if (project.github) {
                github.href = project.github;
            } else {
                github.remove();
            }

            const spigotmc = item.querySelector('.projects__project__spigotmc');
            if (project.spigot) {
                spigotmc.href = project.spigot;
            } else {
                spigotmc.remove();
            }

            fragment.append(item);
        }

        list.replaceChildren(fragment);
        if (status) {
            status.hidden = true;
            status.replaceChildren();
        }
        window.dispatchEvent(new Event('resize'));
    } catch (error) {
        console.error('Unable to load projects.', error);
        if (!status) return;

        status.hidden = false;
        status.textContent = 'Projects could not be loaded. ';
        const retryButton = document.createElement('button');
        retryButton.type = 'button';
        retryButton.textContent = 'Retry';
        retryButton.addEventListener('click', loadProjects, { once: true });
        status.append(retryButton);
    }
}

loadProjects();