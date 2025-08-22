const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.height = document.body.scrollHeight;
canvas.width = window.innerWidth;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;
});

const dirMax = 1;
const dirMin = 1;
const sizeMax = 2;
const sizeMin = 1;
const color = '#000';

const maxDrawDistance = 125;

let particlesArray;

let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    cursorX = e.pageX;
    cursorY = e.pageY;
});

function getRandomParticle() {

    if(particlesArray == null) {
        return null;
    }

    let index = Math.trunc((Math.random() * particlesArray.length-1));
    return particlesArray[index];

}

function distance(x1, y1, x2, y2) {
    let xDis = x2 - x1;
    let yDis = y2 - y1;

    return Math.sqrt((xDis * xDis) + (yDis * yDis));
}

// Test the distance of two positions against "test" (Returns if <= test)
function againstDistance(test, x1, y1, x2, y2) {
    return distance(x1, y1, x2, y2) <= test;
}

function clampBorder(ceiling, floor, value) {
    if(value>ceiling) {
        return ceiling;
    }
    if(value<floor) {
        return floor;
    }
    return value;
}

class Particle {

    constructor(x, y, size, dirX, dirY, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.dirX = dirX;
        this.dirY = dirY;
        this.color = color;
    }

    drawCircle() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    drawToNear() {
        for(let i = 0; i < particlesArray.length; i++) {
            let particle = particlesArray[i];
            if(this.x===particle.x && this.y===particle.y){
                continue;
            }
            if(!againstDistance(maxDrawDistance, this.x, this.y, particle.x, particle.y)) {
                continue;
            }
            this.drawConnection(particle);
        }
    }

    drawConnection(particle2) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        if(particle2 == null) {
            return;
        }
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(particle2.x, particle2.y);
        ctx.stroke();
    }

    update() {

        // KEEP WITHIN CANVAS
        if(this.x > canvas.width || this.x < 0) {
            this.dirX = -this.dirX;
        }
        if(this.y > canvas.height || this.y < 0) {
            this.dirY = -this.dirY;
        }
        // SLOW
        if(this.dirX > dirMax || -this.dirX > dirMax) {
            this.dirX = this.dirX < 0 ? this.dirX+1 : this.dirX-1;
        }
        if(this.dirY > dirMax || -this.dirY > dirMax) {
            this.dirY = this.dirY < 0 ? this.dirY+1 : this.dirY-1;
        }
        // MOVE
        this.x += this.dirX;
        this.y += this.dirY;
        // DRAW
        this.drawCircle();
        this.drawToNear();

    }

}

function either(first, second) {
    return Math.random() > 0.5 ? first : second;
}

function between(floor, ceiling) {
    let rng = Math.random();
    if(rng===0)
        return floor;
    return rng * ceiling;
}

function init() {
    particlesArray = [];
    let particlesNum = (canvas.width * canvas.height) / 10000;
    for(let i = 0; i < particlesNum; i++) {
        let size = between(sizeMin, sizeMax);
        let x = (Math.random() * (canvas.width - size * 2) - (size * 2)) + (size * 2);
        let y = (Math.random() * (canvas.height - size * 2) - (size * 2)) + (size * 2);
        let dirX = between(dirMin, dirMax) * either(-1, 1);
        let dirY = between(dirMin, dirMax) * either(-1, 1);
        particlesArray.push(new Particle(x, y, size, dirX, dirY, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i<particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

init();
animate();
