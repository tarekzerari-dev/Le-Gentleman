/**
 * Le Gentleman — Main App Logic
 * Hamburger menu, scroll effects, animations
 */
document.addEventListener("DOMContentLoaded", () => {

    // ── Hamburger Menu ──────────────────────────────────
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector("header nav");
    const body = document.body;

    if (hamburger && nav) {
        hamburger.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("open");
            hamburger.classList.toggle("active", isOpen);
            hamburger.setAttribute("aria-expanded", isOpen);
            body.classList.toggle("nav-open", isOpen);
        });

        // Close menu when clicking a nav link
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("open");
                hamburger.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
                body.classList.remove("nav-open");
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (nav.classList.contains("open") &&
                !nav.contains(e.target) &&
                !hamburger.contains(e.target)) {
                nav.classList.remove("open");
                hamburger.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
                body.classList.remove("nav-open");
            }
        });
    }

    // ── Header Scroll Effect ────────────────────────────
    const header = document.querySelector("header");
    if (header) {
        let lastScroll = 0;
        window.addEventListener("scroll", () => {
            const currentScroll = window.scrollY;
            header.classList.toggle("scrolled", currentScroll > 50);
            lastScroll = currentScroll;
        }, { passive: true });
    }

    // ── Scroll Reveal Animations ────────────────────────
    const revealElements = document.querySelectorAll(".reveal");
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ── Active Nav Link Highlighting ────────────────────
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("header nav a");

    if (sections.length > 0 && navLinks.length > 0) {
        const highlightNav = () => {
            const scrollY = window.scrollY + 100;
            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute("id");
                if (scrollY >= top && scrollY < top + height) {
                    navLinks.forEach(link => {
                        link.classList.remove("active");
                        if (link.getAttribute("href").includes("#" + id)) {
                            link.classList.add("active");
                        }
                    });
                }
            });
        };
        window.addEventListener("scroll", highlightNav, { passive: true });
        highlightNav();
    }
});
