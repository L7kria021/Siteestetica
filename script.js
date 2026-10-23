(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("menu");

  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    header.classList.toggle("is-open", open);
  };
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add("is-visible"));
  }

  const form = document.querySelector(".form");
  const status = form.querySelector(".form__status");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const missing = [...form.querySelectorAll("[required]")].find((f) => !f.value.trim() || !f.checkValidity());
    if (missing) {
      status.textContent = "Please fill in your name, phone and a valid email.";
      status.classList.add("is-error");
      missing.focus();
      return;
    }
    status.classList.remove("is-error");
    status.textContent = "Thank you! We received your request and will be in touch soon.";
    form.reset();
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
