
const giftButton = document.getElementById("giftButton");
const message = document.getElementById("message");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let particles = [];
let animationRunning = false;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createConfetti() {
    particles = [];

    for (let i = 0; i < 180; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: -Math.random() * canvas.height,
            size: Math.random() * 8 + 3,
            speed: Math.random() * 4 + 2,
            color: [
                "#ff77a8",
                "#a78bfa",
                "#ffd166",
                "#7dd3fc",
                "#86efac"
            ][Math.floor(Math.random() * 5)],
            rotation: Math.random() * 360
        });
    }
}

function animateConfetti() {
    if (!animationRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
        ctx.save();

        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);

        ctx.restore();

        p.y += p.speed;
        p.rotation += 3;

        if (p.y > canvas.height) {
            p.y = -20;
            p.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(animateConfetti);
}

giftButton.addEventListener("click", () => {
    message.classList.remove("hidden");

    giftButton.textContent = "❤️ Happy Birthday ❤️";
    giftButton.disabled = true;

    createConfetti();
    animationRunning = true;
    animateConfetti();
});
