document.addEventListener('DOMContentLoaded', function() {
    createConfetti();
    createBalloons();

    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
        }, 200 * (index + 1));
    });
});

document.getElementById('cake').addEventListener('click', function() {
    createConfetti();
    this.style.transform = 'scale(1.2)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 300);
    alert('Your wish will come true! 🎉');
});

function createConfetti() {
    const colors = ['#ff6b6b', '#ffb8b8', '#ffd166', '#06d6a0', '#118ab2', '#073b4c'];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        const fromLeft = Math.random() > 0.5;
        const leftPos = fromLeft ?
            Math.random() * window.innerWidth * 0.3 :
            window.innerWidth * 0.7 + Math.random() * window.innerWidth * 0.3;

        confetti.style.left = `${leftPos}px`;
        confetti.style.bottom = '0';

        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const animationDuration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;

        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.animationDuration = `${animationDuration}s`;
        confetti.style.animationDelay = `${delay}s`;

        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, (animationDuration + delay) * 1000);
    }
}

function createBalloons() {
    const colors = ['#ff6b6b', '#ffb8b8', '#ffd166', '#06d6a0', '#118ab2', '#073b4c'];
    for (let i = 0; i < 10; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloons';

        const leftPos = Math.random() * window.innerWidth;
        const delay = Math.random() * 15;
        const duration = 10 + Math.random() * 20;
        const size = 30 + Math.random() * 40;
        const color = colors[Math.floor(Math.random() * colors.length)];

        balloon.style.left = `${leftPos}px`;
        balloon.style.bottom = `-${size}px`;
        balloon.style.width = `${size}px`;
        balloon.style.height = `${size * 1.2}px`;
        balloon.style.backgroundColor = color;
        balloon.style.animationDuration = `${duration}s`;
        balloon.style.animationDelay = `${delay}s`;

        const string = document.createElement('div');
        string.className = 'balloon-string';
        balloon.appendChild(string);

        document.body.appendChild(balloon);

        setTimeout(() => {
            balloon.remove();
        }, (duration + delay) * 1000);
    }

    setTimeout(createBalloons, 3000);
}
createBalloons();