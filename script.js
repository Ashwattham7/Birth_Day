
  // ================= POPUP ANIMATION =================
  gsap.from(".popup", {
    scale: 0,
    duration: 2.5,
    ease: "bounce.out"
  });

  // ================= WINDOW LOAD =================
  window.addEventListener("load", function () {
    const overlay = document.getElementById("popupOverlay");
    const closeBtn = document.getElementById("closePopup");
    const content = document.getElementById("pageContent");

    // ✅ Preload audio once
    const audio = new Audio("song.mp3");

    // ================= POPUP CLOSE =================
    closeBtn.addEventListener("click", () => {
      overlay.classList.add("hidden");
      content.classList.remove("hidden");
      content.style.display = "block";

      // play audio
      audio.play();

      // ✅ defer animations until after next paint
      requestAnimationFrame(() => {
        requestIdleCallback(setupAnimations);
      });
    });

    // ================= SPLIT TEXT FUNCTION =================
    function splitTextToSpans(element) {
      let text = element.innerText;
      let frag = document.createDocumentFragment();
      for (let char of text) {
        let span = document.createElement("span");
        span.textContent = char;
        frag.appendChild(span);
      }
      element.innerHTML = "";
      element.appendChild(frag);
    }

    // ================= SETUP ANIMATIONS =================
    function setupAnimations() {
      gsap.registerPlugin(ScrollTrigger);

      // Apply splitText on cards
      document.querySelectorAll(".card").forEach(card => {
        const h3 = card.querySelector("h3");
        const p = card.querySelector("p");
        if (h3) splitTextToSpans(h3);
        if (p) splitTextToSpans(p);
      });

      let split = new SplitText(".msg", { type: "chars" });
      let split2 = new SplitText(".container h1", { type: "chars" });

      // -------- Main Timeline --------
      let tl = gsap.timeline();
      gsap.set(split.chars, { opacity: 0 });

      tl.from("#flag", {
        opacity: 0,
        delay: .7,
        scale: 0,
        duration: .8,
        ease: "elastic.out(1.75, 0.4)",
      })
        .from(".txt svg", {
          stagger: 0.5,
          scale: 0,
          duration: .8,
          transformOrigin: "center center",
          ease: "elastic.out(1.75, 0.4)"
        })
        .from(".cake", {
          opacity: 0,
          scale: 0.1,
          duration: .8,
          ease: "elastic.out(1.2, 0.4)",
        })
        .from(".container h1", {
          scale: 0.1,
          opacity: 0,
          duration: 0.5,
          ease: "elastic.out(1.75, 0.4)",
        }, "-=0.5")
        .from(split2.chars, {
          y: -10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: {
            each: 0.15,
            repeat: -1,
            yoyo: true
          }
        });

      // Floating flag & cake
      gsap.to("#flag, .cake", {
        repeat: -1,
        yoyo: true,
        keyframes: [
          { x: -5, duration: 1.5, ease: "sine.inOut" },
          { x: 0, duration: 1.5, ease: "sine.inOut" }
        ],
      });

      // ================= WISHING CARDS =================
      let cardsTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".card-container",
          start: "top 60%",
          end: "bottom 120%",
          toggleActions: "play none none reverse",
        }
      });

      document.querySelectorAll(".card").forEach((card) => {
        cardsTl.from(card, {
          opacity: 0,
          scale: 0,
          duration: 0.8,
          ease: "sine.in"
        })
          .from(card.querySelectorAll("h3 span"), {
            opacity: 0,
            duration: 0.1,
            stagger: 0.1,
            ease: "power1.out"
          })
          .from(card.querySelectorAll("p span"), {
            opacity: 0,
            y: 40,
            duration: 0.05,
            stagger: 0.03,
            ease: "power1.out"
          })
          .from(card.querySelectorAll("img"), {
            opacity: 0,
            y: -300,
            ease: "power1.out"
          })
          .to(card.querySelectorAll("img"), {
            repeat: -1,
            yoyo: true,
            keyframes: [
              { y: -10, duration: 1.5, ease: "sine.inOut" },
              { y: 0, duration: 1.5, ease: "sine.inOut" }
            ],
          });
      });

      // ================= MOON CARDS =================
      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".msg",
          scroller: "body",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        }
      });

      tl2.from(".right img", { scale: 0 })
        .from(".middle img", { scale: 0 })
        .to(split.chars, {
          y: -20,
          opacity: 1,
          duration: 0.09,
          stagger: 0.05,
        })
        .from(".moon-box", { opacity: 0 });

      // Floating moon-box + images
      gsap.to(".animation-card img, .middle img, .moon-box", {
        repeat: -1,
        yoyo: true,
        keyframes: [
          { y: -10, duration: 1.5, ease: "sine.inOut" },
          { y: 0, duration: 1.5, ease: "sine.inOut" }
        ],
      });

      // ================= SLIDER =================
      let move = gsap.to(".slider", {
        xPercent: -100,
        repeat: -1,
        duration: 8,
        ease: "linear",
      }).totalProgress(0.5);

      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          let direction = self.direction;
          gsap.to(move, { timeScale: direction === 1 ? 1 : -1 });
          gsap.to(".slider svg", { rotate: direction === 1 ? 180 : 0 });
        },
      });

      // ================= DOUBLE CLICK ON MOON IMAGE =================
      let container = document.querySelector(".moon-box");
      let image = document.querySelector(".moon-box img");
      let txt = document.querySelector(".moon-box span");

      container.addEventListener("dblclick", function () {
        image.style.transform = "scale(1)";
        image.style.opacity = 1;
        txt.style.display = "none";
        image.style.objectFit = "fill";
      });

      // ================= BALLOONS =================
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
          balloon.style.zIndex = Math.floor(Math.random() * 11) + 5;

          const string = document.createElement('div');
          string.className = 'balloon-string';
          balloon.appendChild(string);

          document.body.appendChild(balloon);

          setTimeout(() => { balloon.remove(); }, duration * 1000);
        }

        setTimeout(createBalloons, 3000);
      }

      // ✅ call directly (DOMContentLoaded already passed)
      createBalloons();
    }
  });

