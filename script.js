window.addEventListener("load", () => {
  
  setTimeout(() => {
    document.getElementById("loading-screen").style.opacity = "0";

    setTimeout(() => {
      document.getElementById("loading-screen").style.display = "none";
      document.getElementById("main-content").style.display = "block";
    }, 800); 
  }, 5000); 
});
/*looding screen script*/

function toggleMenu() {
  document.getElementById('navbar').classList.toggle('active');
}

document.addEventListener('click', e => {
  const navbar = document.getElementById('navbar');
  const menuIcon = document.querySelector('.menu-icon');
  if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
    navbar.classList.remove('active');
  }
});

// ===== القائمة المنسدلة Services =====
document.getElementById('servicesDropdown').addEventListener('click', function(e) {
  e.preventDefault();
  this.classList.toggle('active');
});

document.addEventListener('click', e => {
  const dropdown = document.getElementById('servicesDropdown');
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove('active');
  }
});
// يشتغل حتى لو كان اللودر سريع أو بطيء
document.addEventListener("DOMContentLoaded", () => {
  const holisticText = document.getElementById("holisticText");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // يشتغل مرة واحدة فقط
      }
    });
  }, { threshold: 0.3 });

  if (holisticText) {
    // نعطيه نص ثانية تأخير للتأكد من ظهور الصفحة
    setTimeout(() => observer.observe(holisticText), 600);
  }
});
// ===== البحث =====
const searchIcon = document.getElementById('searchIcon');
const searchBox = document.getElementById('searchBox');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchIcon.addEventListener('click', () => {
  searchBox.classList.toggle('active');
  if (searchBox.classList.contains('active')) {
    searchInput.focus();
  }
});

document.addEventListener('click', (e) => {
  if (!searchBox.contains(e.target) && !searchIcon.contains(e.target)) {
    searchBox.classList.remove('active');
  }
});

const searchableItems = [
  { name: 'Home', link: '#home' },
  { name: 'About', link: '#about' },
  { name: 'Services', link: '#services' },
  { name: 'Mental Health', link: '#services' },
  { name: 'Physical Health', link: '#services' },
  { name: 'Sign Language', link: '#services' },
  { name: 'Blog', link: '#blog' },
  { name: 'Contact', link: '#contact' },
  { name: 'Book Now', link: '#book' }
];

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  searchResults.innerHTML = '';

  if (query.trim() === '') return;

  const results = searchableItems.filter(item =>
    item.name.toLowerCase().includes(query)
  );

  if (results.length > 0) {
    results.forEach(item => {
      const a = document.createElement('a');
      a.href = item.link;
      a.textContent = item.name;
      searchResults.appendChild(a);
    });
  } else {
    searchResults.innerHTML = '<p style="color:#aaa; text-align:center;">No results found</p>';
  }
});

// ===== خلفية متغيرة =====
const heroBg = document.querySelector('.hero-bg');
const images = ["img4.jpg", "img11.jpeg", "img20.jpg"];
let current = 0;

heroBg.style.backgroundImage = `url(${images[current]})`;
heroBg.style.transition = "opacity 1.5s ease-in-out";

setInterval(() => {
  current = (current + 1) % images.length;
  heroBg.style.opacity = 0;

  setTimeout(() => {
    heroBg.style.backgroundImage = `url(${images[current]})`;
    heroBg.style.opacity = 1;
  }, 1000);
}, 10000);
/*home section background change*/


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
  /*physiotherapy image animation*/
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
      
      // إضافة تأثير ظهور سلس للمحتوى الرئيسي
      mainContent.style.opacity = "0";
      mainContent.style.transition = "opacity 0.5s ease";
      
      setTimeout(() => {
        mainContent.style.opacity = "1";
      }, 50);
    }
/*looding screen fade out and main content fade in*/

setTimeout(() => {
  const loadingScreen = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");

  if (loadingScreen) loadingScreen.style.opacity = "0";

  setTimeout(() => {
    if (loadingScreen) loadingScreen.style.display = "none";
    if (mainContent) mainContent.style.display = "block";

    // count-up
    const counter = document.getElementById("counter");
    if (counter) {
      let count = 0;
      const target = 35; 
      const duration = 800; 
      const stepTime = Math.abs(Math.floor(duration / target));

      const updateCounter = () => {
        count++;
        counter.textContent = `+${count}`;
        if (count < target) {
          setTimeout(updateCounter, stepTime);
        }
      };

      updateCounter(); 
    }

  }, 800); 
}, 5000);

