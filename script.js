function throttle(callback, limit) {
    let wait = false;
    return function () {
        if (!wait) {
            callback.apply(null, arguments);
            wait = true;
            setTimeout(() => {
                wait = false;
            }, limit);
        }
    };
}

let currentScroll = 0;
let isScrollingDown = true;

// Setup marquee animation on slider elements
let tween = gsap.to(".slider", {
    xPercent: -100,
    repeat: -1,
    duration: 8,
    ease: "linear",
}).totalProgress(0.5);



// Scroll handler with throttle
window.addEventListener(
    "scroll",
    throttle(function () {
        let newScroll = window.pageYOffset;
        isScrollingDown = newScroll > currentScroll;

        // Reverse or play animation depending on scroll direction
        gsap.to(tween, {
            timeScale: isScrollingDown ? 1 : -1,
        });

        currentScroll = newScroll;
    }, 200)


);

window.addEventListener("wheel", function (value) {
    // console.log(value.deltaY);
    if (value.deltaY < 0) {
        gsap.to(".slider svg", {
            rotate: 0
        })
    } else {
        gsap.to(".slider svg", {
            rotate: 180
        })
    }
})




function createBalloons() {
    const colors = [
        '#ff6b6b', '#ffb8b8', '#ffd166', '#06d6a0', '#118ab2', '#073b4c',
        '#f72585', '#b5179e', '#7209b7', '#560bad', '#480ca8', '#3a0ca3',
        '#4361ee', '#4895ef', '#4cc9f0', '#80ed99', '#caffbf', '#fdffb6',
        '#ffadad', '#ffd6a5', '#9d4edd', '#e56b6f', '#ff9f1c', '#2ec4b6'
    ];

    const screenWidth = window.innerWidth;

    const totalBalloons = 12;
    const spacing = screenWidth / totalBalloons;

    for (let i = 0; i < totalBalloons; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloons';

        const leftPos = spacing * i + Math.random() * 20 - 10;
        const duration = 6 + Math.random() * 4;
        const size = 30 + Math.random() * 30;
        const color = colors[Math.floor(Math.random() * colors.length)];

        balloon.style.left = `${leftPos}px`;
        balloon.style.bottom = `-${size}px`;
        balloon.style.width = `${size}px`;
        balloon.style.height = `${size * 1.2}px`;
        balloon.style.backgroundColor = color;
        balloon.style.animationDuration = `${duration}s`;
        balloon.style.animationDelay = `0s`;
        balloon.style.zIndex = Math.floor(Math.random() * 11) + 5;


        const string = document.createElement('div');
        string.className = 'balloon-string';
        balloon.appendChild(string);

        document.body.appendChild(balloon);

        setTimeout(() => {
            balloon.remove();
        }, duration * 1000);
    }


    setTimeout(createBalloons, 3000);
}

document.addEventListener("DOMContentLoaded", createBalloons);
