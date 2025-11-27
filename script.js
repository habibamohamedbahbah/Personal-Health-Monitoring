<<<<<<< HEAD
window.addEventListener("load", () => {
  
  setTimeout(() => {
    document.getElementById("loading-screen").style.opacity = "0";

    setTimeout(() => {
      document.getElementById("loading-screen").style.display = "none";
      document.getElementById("main-content").style.display = "block";
    }, 800); 
  }, 5000); 
});  
=======
setTimeout(() => {
  const loadingScreen = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");

  if (loadingScreen) loadingScreen.style.opacity = "0";

  setTimeout(() => {
    if (loadingScreen) loadingScreen.style.display = "none";
    if (mainContent) mainContent.style.display = "block";

    // Count-Up Animation
    const counter = document.getElementById("counter");
    if (counter) {
      let count = 0;
      const target = 35; 
      const duration = 800; 
      const stepTime = Math.floor(duration / target);

      const updateCounter = () => {
        count++;
        counter.textContent = count; 
        if (count < target) {
          setTimeout(updateCounter, stepTime);
        }
      };

      updateCounter();
    }

  }, 800);

}, 5000);
>>>>>>> 58e8616368759a10f0a53a3f1a4299b962855062
