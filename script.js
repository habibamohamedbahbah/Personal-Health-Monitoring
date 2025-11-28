document.addEventListener("DOMContentLoaded", function() {
  AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const img = document.querySelector('.physio-image');
  if (!img) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  }, { threshold: [0, 0.35, 0.6] });

  obs.observe(img);
});

/* physiotherapy image animation */
setTimeout(() => {
  const loadingScreen = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");

  if (loadingScreen) {
    loadingScreen.style.opacity = "0";
    loadingScreen.style.transition = "opacity 0.8s ease";
  }

  setTimeout(() => {
    if (loadingScreen) {
      loadingScreen.style.display = "none";
    }
    if (mainContent) {
      mainContent.style.display = "block";

      mainContent.style.opacity = "0";
      mainContent.style.transition = "opacity 0.5s ease";

      setTimeout(() => {
        mainContent.style.opacity = "1";
      }, 50);
    }
  }, 800); 
}, 1500);    
