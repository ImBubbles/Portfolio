// I know it's spelled expand, but it's a play on words chill
const title = document.getElementById('navbar__title');

exspand(title);

const titleLetters = [...title.querySelectorAll('span')];

hoverBounce(titleLetters);

bounceTitle();

// Might not work for spaces
function exspand(text) {
    text.innerHTML = [...text.textContent]
        .map(char => '<span>' + char + '</span>')
        .join("");
}

function hoverBounce(letters) {
    letters.forEach((letter, index) => {
        letter.addEventListener('mouseenter', () => {
            bounce(letters, index);
        });

        letter.addEventListener('mouseleave', () => {
            unbounce(letters, index);
        });
    });
}

function bounce(letters, index) {
    const letter = letters[index];
    letter.style.transform = "translateY(-2px) scale(1, 1.2)";
    if(index > 0) {
        letters[index - 1].style.transform = "translateY(1px) scale(1, 1.1)";
    }
    if(index < letters.length - 1) {
        letters[index + 1].style.transform = "translateY(1px) scale(1, 1.1)";
    }
}

function unbounce(letters, index) {
    const letter = letters[index];
    letter.style.transform = "translateY(0) scale(1, 1)";
    if(index > 0) {
        letters[index - 1].style.transform = "translateY(0) scale(1, 1)";
    }
    if(index < letters.length - 1) {
        letters[index + 1].style.transform = "translateY(0) scale(1, 1)";
    }
}

function bounceTitle() {
    function animate() {
        for (let index = 0; index < titleLetters.length; index++) {
            setTimeout(() => {
                bounce(titleLetters, index);

                setTimeout(() => {
                    unbounce(titleLetters, index);
                }, 200);
            }, index * 100);
        }
    }

    animate();
    setInterval(animate, 4000);
}