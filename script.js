document.addEventListener("DOMContentLoaded", function() {
  gsap.from("ul li", {
    x: 100, // Starting position (you can adjust this value as needed)
    opacity: 0,
    duration: 1, // Duration for each animation
    stagger: 0.2, // Stagger start times by 0.2 seconds
    ease: "power2.out"
});
  
    const loaderText = document.querySelector(".loader-text");
    let progress = 0;

    const interval = setInterval(() => {
        progress++;
        loaderText.textContent = `${progress}%`;
        if (progress >= 100) {
            clearInterval(interval);

            const tl = gsap.timeline();
            tl.to("h1, ul, .loader-text", {
                y: -70,
                opacity: 0,
                duration: 0.5
            })
    gsap.to(".page2", {
    top: 0,
    duration: 2,
    ease: "power2.out"
});
        }
    }, 10); 

});
// Locomotive Scroll Initialization
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
});

// GSAP ScrollTrigger Proxy for Locomotive Scroll
ScrollTrigger.scrollerProxy("[data-scroll-container]", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
});

locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

// GSAP Animations
gsap.timeline({ delay: 4 }) // Starts after 4 seconds
  .from(".page1 h1", { x: -100, opacity: 0, duration: 1 })
  .from(".page1 ul li", { y: 100, opacity: 0, stagger: 0.2, duration: 1 }, "-=0.5")
  .from(".page2 .nav li", { y: -50, opacity: 0, stagger: 0.2, duration: 1 }, "-=0.5")
  .from(".page2 .content > div", { x: -100, opacity: 0, duration: 1 }, "-=0.5")
  .from(".page3 .page3-left", { x: -100, opacity: 0, duration: 1 }, "-=0.5")
  .from(".page3 .card", { y: 100, opacity: 0, stagger: 0.2, duration: 1 }, "-=0.5");

// ScrollTrigger Animations
gsap.utils.toArray(".page2, .page3").forEach((section, i) => {
  ScrollTrigger.create({
    trigger: section,
    start: "top center+=200",
    scroller: "[data-scroll-container]",
    onEnter: () => gsap.to(section, { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" })
  });
});
