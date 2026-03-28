import gsap from "gsap/dist/gsap";

let isMobile = $state(),
  countryCode = $state();

export const appManager = {
  setDeviceType: () => {
    isMobile = window.innerWidth < 768;
  },
  isMobile: () => {
    return isMobile;
  },
  setCountryCode: (code: string) => {
    countryCode = code.toLocaleLowerCase();
  },
  getCountryCode: () => {
    return countryCode;
  },
  // Add content animation on scroll using GSAP and ScrollTrigger plugin in all pages
  addContentAnimation: async () => {
    const scrollTrigger = await import("gsap/dist/ScrollTrigger");
    gsap.registerPlugin(scrollTrigger);
    document.querySelectorAll(".content").forEach((section) => {
      gsap
        .timeline({
          scrollTrigger: {
            scroller: ".main-inner",
            trigger: section,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        })
        .fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
          },
        );
    });
  },
  scrollToTop: () => {
    document.querySelector(".main-inner")!.scrollTo(0, 0);
  },
};
