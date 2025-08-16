gsap.registerPlugin(ScrollTrigger);

let animations = gsap.matchMedia();
let tl = gsap.timeline();

tl.from("#flag", {
  opacity: 0,
  delay: .7,
  scale: 0,
  duration: .8,
  ease: "elastic.out(1.75, 0.4)",

});

tl.from(".txt svg", {
  sagger: 0.5,
  scale: 0,
  duration: .8,
  transformOrigin: "center center",

  ease: "elastic.out(1.75, 0.4)",

});

tl.from(".cake", {
  // repeat: -1,
  opacity: 0,
  scale: 0.1,
  duration: .8,
  ease: "elastic.out(1.2, 0.4)",
});

tl.from(".container h1", {
  scale: 0.1,
  opacity: 0,
  duration: 0.5,
  ease: "elastic.out(1.75, 0.4)",
}, "-=0.5");



let tl2 = gsap.timeline();
// tl2.from(".card-container .box ",{
//   opacity: 0,
//   duration: 0.5, // <-- duration belongs here
//   x: 500,
//   stagger: 0.8,
//   scrollTrigger: {
//     trigger: ".card", // or ".card" depending on structure
//     scroller: "body",
//     // markers: true,
//     start: "top 50%",
//     // scrub: 1,
//   }
// });

tl.from(".card-container .box  .card", {
  // repeat: -1,
  opacity: 0,
  // y: -100,
  // skewy: -50,
  duration: 1,
  stagger: 1,
  scrollTrigger: {
    trigger: ".card-container .card",
    scroller: "body",
    start: "top 60%",
    // end: "bottom 20%",    
    scrub: true
  },
  ease: "sine.in"
})

// SIDER ANIMATION========================================
let move = gsap.to(".slider", {
  xPercent: -100,
  repeat: -1,
  duration: 8,
  ease: "linear",
}).totalProgress(0.5);

// ScrollTrigger logic to reverse animation on scroll direction
ScrollTrigger.create({
  trigger: "body",
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    let direction = self.direction;

    // 1 = scrolling down, -1 = up
    gsap.to(move, {
      timeScale: direction === 1 ? 1 : -1,
    });

    gsap.to(".slider svg", {
      rotate: direction === 1 ? 180 : 0
    });
  },
});

// on click picture
let container = document.querySelector(".moon-box");
let image = document.querySelector(".moon-box img");
let txt = document.querySelector(".moon-box span");

container.addEventListener("dblclick", function () {
  image.style.transform = "scale(1)";
  image.style.opacity = 1;
  txt.style.display = "none";
  image.style.objectFit = "fill";
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
