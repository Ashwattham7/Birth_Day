function splitTextToSpans(element) {
  let text = element.innerText;
  element.innerHTML = "";
  text.split("").forEach(char => {
    let span = document.createElement("span");
    span.textContent = char;
    element.appendChild(span);
  });
}

document.querySelectorAll(".card").forEach(card => {
  const h3 = card.querySelector("h3");
  const p = card.querySelector("p");

  if (h3) splitTextToSpans(h3);
  if (p) splitTextToSpans(p);
});

document.querySelectorAll(".msg").forEach(txt => {
  const h1 = txt.querySelector("h1");
  const p2 = txt.querySelector("p");

  if (h1) splitTextToSpans(h1);
  if (p2) splitTextToSpans(p2);
})


// gsap===========================================
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
  stagger: 0.5,
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

tl.to("#flag", {
  repeat: -1,
  yoyo: true,
  keyframes: [
    { x: -5, duration: 1.5, ease: "sine.inOut" },
    { x: 0, duration: 1.5, ease: "sine.inOut" }
  ],
}, "move");

tl.to(".txt svg", {
  repeat: -1,
  yoyo: true,
  keyframes: [
    { y: -5, duration: 1.5, ease: "sine.inOut" },
    { y: 0, duration: 1.5, ease: "sine.inOut" }
  ],
}, "-=0.1");

tl.to(".cake", {
  repeat: -1,
  yoyo: true,
  keyframes: [
    { y: -10, duration: 1.5, ease: "sine.inOut" },
    { y: 0, duration: 1.5, ease: "sine.inOut" }
  ],
}, "move");

// wishing cards==============================
tl.from(".card-container .box .card", {
  opacity: 0,
  x: -300,
  duration: 1,
  stagger: { each: 0.5, from: "left" },
  scrollTrigger: {
    trigger: ".card-container .card",
    scroller: "body",
    start: "top 80%",
    // start: "top 40%",
    // markers: true,
    end: "bottom 120%",
    toggleActions: "play none none reverse",

  },
  ease: "sine.in"
})


document.querySelectorAll(".card").forEach(card => {

  tl.from(card.querySelectorAll("h3 span"), {
    opacity: 0,
    duration: 0.1,
    stagger: 0.1,
    ease: "power1.out"
  });

  tl.from(card.querySelectorAll("p span"), {
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: "power1.out"
  });

  tl.from(card.querySelectorAll("img"), {
    opacity: 0,
    y: -300,
    ease: "power1.out"
  })

  tl.to(card.querySelectorAll("img"), {
    // opacity:0,
    repeat: -1,
    yoyo: true,
    keyframes: [
      { y: -10, duration: 1.5, ease: "sine.inOut" },
      { y: 0, duration: 1.5, ease: "sine.inOut" }
    ],
  });
});


// tl.from(".card img",{
//   opacity:0,
//   x:-300
// })
//   tl.to(".card img", {
//     repeat: -1,
//     yoyo: true,
//     keyframes: [
//       { y: -10, duration: 1.5, ease: "sine.inOut" },
//       { y: 0, duration: 1.5, ease: "sine.inOut" }
//     ],
//   });

// tl.from("h3 span", {
//   opacity: 0,
//   duration: 0.5,
//   stagger: 0.05,
//   ease: "power1.out"
// })
// tl.from(".card p span", {
//   opacity: 0,
//   duration: 0.5,
//   stagger: 0.05,
//   ease: "power1.out"
// })


// moon cards======================================
gsap.to(".animation-card img", {
  // opacity:0,
  // y:-100,
  repeat: -1,
  yoyo: true,
  keyframes: [
    { y: -10, duration: 1.5, ease: "sine.inOut" },
    { y: 0, duration: 1.5, ease: "sine.inOut" }
  ],
});


document.querySelectorAll(".msg").forEach(card => {
  let tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: card,
      scroller: "body",
      start: "top 80%",
      end: "bottom 60%", 
      toggleActions: "play none none reverse", 
    }
  });

  tl2.from(card.querySelectorAll("h1 span"), {
    opacity: 0,
    y:50,
    duration: 0.1,
    stagger: 0.1,
    ease: "back.out(2)"
  });

  tl2.from(card.querySelectorAll("p span"), {
    opacity: 0,
    y:30,
    duration: 0.9,
    stagger: 0.1,
    ease: "power1.out"
  });

  // tl.from(card.querySelectorAll("img"), {
  //   opacity: 0,
  //   y: -300,
  //   ease: "power1.out"
  // })

  // tl.to(card.querySelectorAll("img"), {
  //   // opacity:0,
  //   repeat: -1,
  //   yoyo: true,
  //   keyframes: [
  //     { y: -10, duration: 1.5, ease: "sine.inOut" },
  //     { y: 0, duration: 1.5, ease: "sine.inOut" }
  //   ],
  // });
});

gsap.from(".moon-box", {
  repeat: -1,
  yoyo: true,
  keyframes: [
    { y: -10, duration: 1.5, ease: "sine.inOut" },
    { y: 0, duration: 1.5, ease: "sine.inOut" }
  ],

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
