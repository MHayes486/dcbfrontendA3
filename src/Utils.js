import gsap from "gsap";

class Utils {
  isMobile() {
    let viewportWidth = window.innerWidth;
    if (viewportWidth <= 768) {
      return true;
    } else {
      return false;
    }
  }

  pageIntroAnim() {
    const pageContent = document.querySelector(".page-content");
    if (!pageContent) return;
    gsap.fromTo(
      pageContent,
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 }
    );
  }

  //bounce screen on error screen
  errorBounceAnim() {
    const pageContent = document.querySelector(".page-content");
    var tl = gsap.timeline({ repeat: 1 });

    tl.to(pageContent, { duration: 0.05, x: 5, y: 0 });
    tl.to(pageContent, { duration: 0.05, x: -5, y: -0.2 });
    tl.to(pageContent, { duration: 0.15, x: 5, y: 0.2 });
    tl.to(pageContent, { duration: 0.15, x: -5, y: 0 });
    tl.to(pageContent, { duration: 0.25, ease: "elastic", x: 5, y: 0 });
    tl.to(pageContent, { duration: 0.25, ease: "elastic", x: -5, y: 0 });
    tl.to(pageContent, { duration: 0.1, x: 0, y: 0 });
  }
}

export default new Utils();
