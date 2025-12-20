// No JS needed for this static page, but if you want hover effects or animations, add AOS script in HTML and init here
document.addEventListener("DOMContentLoaded", function() {
  // If using AOS for animations
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100
    });
  }
});