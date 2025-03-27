document.addEventListener("DOMContentLoaded", function () {
    // ===== Scroll-Based Active Nav Highlight =====
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    function updateActiveLink(id) {
        navLinks.forEach(link => link.classList.remove("nav-active"));
        const activeLink = document.querySelector(`nav ul li a[href="#${id}"]`);
        if (activeLink) {
            activeLink.classList.add("nav-active");
        }
    }

    // Intersection Observer for Scroll Detection
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateActiveLink(entry.target.id);
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));

    // Click event to manually set the active link
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            updateActiveLink(this.getAttribute("href").substring(1));
        });
    });

    // ===== Scroll Animation for Elements =====
    const elements = document.querySelectorAll(".scroll-animate");

    function checkScroll() {
        elements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;

            if (inView) {
                el.classList.add("show");
                el.classList.remove("hide");
            } else {
                el.classList.add("hide");
                el.classList.remove("show");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Run once on load

    // ===== Alternative Scroll Tracking for Active Section =====
    function changeActiveNav() {
        let scrollPosition = window.scrollY + window.innerHeight / 2;

        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach((link) => {
                    link.classList.remove("nav-active");
                });

                document
                    .querySelector(`nav a[href="#${id}"]`)
                    ?.classList.add("nav-active");
            }
        });
    }

    window.addEventListener("scroll", changeActiveNav);
    changeActiveNav(); // Run once on load
});