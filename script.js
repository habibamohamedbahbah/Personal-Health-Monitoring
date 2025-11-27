window.addEventListener("load", () => {
  
  setTimeout(() => {
    document.getElementById("loading-screen").style.opacity = "0";

    setTimeout(() => {
      document.getElementById("loading-screen").style.display = "none";
      document.getElementById("main-content").style.display = "block";
    }, 800); 
  }, 5000); 
});