// ===== LOADING SCREEN =====
window.addEventListener("load", () => {
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
    }, 5000);
});

// ===== MOBILE MENU =====
function toggleMenu() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.classList.toggle('active');
    }
}

document.addEventListener('click', e => {
    const navbar = document.getElementById('navbar');
    const menuIcon = document.querySelector('.menu-icon');
    
    if (navbar && menuIcon && !navbar.contains(e.target) && !menuIcon.contains(e.target)) {
        navbar.classList.remove('active');
    }
});

// ===== SERVICES DROPDOWN =====
const servicesDropdown = document.getElementById('servicesDropdown');
if (servicesDropdown) {
    servicesDropdown.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.toggle('active');
    });
}

document.addEventListener('click', e => {
    const dropdown = document.getElementById('servicesDropdown');
    if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

// ===== HOLISTIC TEXT ANIMATION =====
document.addEventListener("DOMContentLoaded", () => {
    const holisticText = document.getElementById("holisticText");
    
    if (holisticText) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        setTimeout(() => observer.observe(holisticText), 600);
    }
});

// ===== SEARCH FUNCTIONALITY =====
const searchIcon = document.getElementById('searchIcon');
const searchBox = document.getElementById('searchBox');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

if (searchIcon && searchBox) {
    searchIcon.addEventListener('click', () => {
        searchBox.classList.toggle('active');
        if (searchBox.classList.contains('active')) {
            searchInput.focus();
        }
    });
}

if (searchBox && searchIcon) {
    document.addEventListener('click', (e) => {
        if (!searchBox.contains(e.target) && !searchIcon.contains(e.target)) {
            searchBox.classList.remove('active');
        }
    });
}

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

if (searchInput && searchResults) {
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
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    const page = item.name.toLowerCase().includes('home') ? 'home' :
                                item.name.toLowerCase().includes('about') ? 'about' :
                                item.name.toLowerCase().includes('services') ? 'services' :
                                item.name.toLowerCase().includes('blog') ? 'blog' :
                                item.name.toLowerCase().includes('contact') ? 'contact' : 'home';
                    showPage(page);
                    searchBox.classList.remove('active');
                    searchInput.value = '';
                });
                searchResults.appendChild(a);
            });
        } else {
            searchResults.innerHTML = '<p style="color:#aaa; text-align:center;">No results found</p>';
        }
    });
}

// ===== HERO BACKGROUND SLIDESHOW =====
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
    const images = ["assets/images/img4.jpg", "assets/images/img11.jpeg", "assets/images/img20.jpg"];
    let heroCurrent = 0;
    
    heroBg.style.backgroundImage = `url(${images[heroCurrent]})`;
    heroBg.style.transition = "opacity 1.5s ease-in-out";
    
    setInterval(() => {
        heroCurrent = (heroCurrent + 1) % images.length;
        heroBg.style.opacity = 0;
        
        setTimeout(() => {
            heroBg.style.backgroundImage = `url(${images[heroCurrent]})`;
            heroBg.style.opacity = 1;
        }, 1000);
    }, 10000);
}

// ===== AOS INITIALIZATION =====
document.addEventListener("DOMContentLoaded", function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }
    
    // PHYSIO IMAGE ANIMATION
    const physioImg = document.querySelector('.physio-image');
    if (physioImg) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, { threshold: [0, 0.35, 0.6] });
        
        obs.observe(physioImg);
    }
    
    // TEAM MEMBER COUNTER
const counter = document.getElementById("counter");

if (counter) {
    let started = false; // علشان يشتغل مرة واحدة بس

    const target = 35;
    const duration = 1000;
    const stepTime = Math.floor(duration / target);

    const startCounter = () => {
        if (started) return;
        started = true;

        let count = 0;
        counter.textContent = "+0";

        const updateCounter = () => {
            count++;
            counter.textContent = `+${count}`;
            if (count < target) {
                setTimeout(updateCounter, stepTime);
            }
        };

        updateCounter();
    };

    // تشغيل العد عند الوصول للعنصر
    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                startCounter();
            }
        },
        { threshold: 0.5 } // لما نص العنصر يظهر
    );

    observer.observe(counter);
}
});

// TEAM MEMBER COUNTER ANIMATION - يشتغل على كل stats-box في الصفحة (Home + About)
document.addEventListener("DOMContentLoaded", function () {
    const teamCounters = document.querySelectorAll("#team-counter");

    teamCounters.forEach(teamCounter => {
        let count = 0;
        const target = 35;
        const duration = 2200;
        const stepTime = Math.floor(duration / target);

        const updateCounter = () => {
            count++;
            teamCounter.textContent = "+" + count;
            if (count < target) {
                setTimeout(updateCounter, stepTime);
            } else {
                teamCounter.textContent = "+" + target;
            }
        };

        const statsBox = teamCounter.closest('.stats-box');
        if (statsBox) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
                        updateCounter();
                        observer.unobserve(entry.target); // مرة واحدة بس
                    }
                });
            }, { threshold: [0, 0.4, 0.8] });

            observer.observe(statsBox);
        }
    });
});

// ===== STATISTICS COUNTER =====
document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.getElementById('stats');
    if (!statsSection) return;
    
    const counters = document.querySelectorAll('.counter');
    counters.forEach(c => c.textContent = '0');
    
    let hasStarted = false;
    
    const startCounters = () => {
        if (hasStarted) return;
        hasStarted = true;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            if (!target || target <= 0) return;
            
            const duration = 1500;
            const increment = target / 100;
            
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                
                if (current >= target) {
                    counter.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
            }, duration / 100);
        });
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasStarted) {
                startCounters();
                observer.unobserve(statsSection);
            }
        });
    }, {
        threshold: 0.4,
        rootMargin: '0px 0px -100px 0px'
    });
    
    observer.observe(statsSection);
});

// ===== VIDEO MODAL =====
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const closeBtn = document.getElementById('closeVideo');
    
    if (!modal || !modalVideo) return;
    
    function openVideo(src, btn) {
        if (!src) return;
        modalVideo.src = src;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        if (btn) btn.classList.add('playing');
        modalVideo.currentTime = 0;
        modalVideo.play().catch(() => {});
    }
    
    function closeVideo() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        modalVideo.pause();
        modalVideo.removeAttribute('src');
        modalVideo.load();
        const playingBtn = document.querySelector('.play-btn.playing');
        if (playingBtn) playingBtn.classList.remove('playing');
    }
    
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.play-btn');
        if (btn) {
            const src = btn.getAttribute('data-video');
            openVideo(src, btn);
        }
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeVideo);
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeVideo();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeVideo();
    });
});

// ===== ACCORDION =====
document.addEventListener("DOMContentLoaded", function () {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }
    
    // ACCORDION FUNCTIONALITY
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
            
            if (!isActive) item.classList.add('active');
        });
    });

    // ===== BLOG MODAL FUNCTIONALITY =====
    // Blog post data - mapping of post IDs to full content
    const blogPostsData = {
        1: {
            title: "How to build a supportive community in group therapy sessions",
            image: "assets/images/blog7.jpeg",
            fullText: "Building a supportive community in group therapy sessions is essential for mental and emotional healing. A strong community provides encouragement, understanding, and a sense of belonging during difficult times.\n\nKey strategies for building support:\n\n• Open Communication: Create an environment where members feel safe expressing their thoughts and feelings without judgment.\n\n• Active Listening: Practice listening with empathy and attention to what others are sharing.\n\n• Shared Experiences: Recognize that group members often face similar challenges, which can strengthen bonds.\n\n• Confidentiality: Maintain strict privacy and ensure all discussions remain confidential.\n\n• Group Participation: Encourage all members to contribute at their comfort level.\n\n• Regular Meetings: Consistency helps build trust and deeper connections.\n\nA strong support system enhances emotional resilience and promotes long-term mental health and well-being."
        },
        2: {
            title: "Overcoming anxiety: the role of psychologists in mental health",
            image: "assets/images/blog2.jpeg",
            fullText: "Anxiety disorders are among the most common mental health challenges, affecting emotional stability, concentration, and daily functioning. Persistent worry and fear can interfere with personal relationships and professional life.\n\nHow psychologists help:\n\n• Assessment and Diagnosis: Professional evaluation helps identify the type and severity of anxiety.\n\n• Cognitive Behavioral Therapy (CBT): This proven approach helps identify thought patterns that contribute to anxiety and develops healthier thinking strategies.\n\n• Exposure Therapy: Gradual exposure to anxiety triggers in a safe environment helps build confidence.\n\n• Mindfulness and Relaxation Techniques: Learning stress management tools provides relief and control.\n\n• Medication Consultation: When appropriate, psychologists can coordinate with psychiatrists for medication support.\n\n• Coping Strategies: Development of practical tools for managing anxiety in daily life.\n\nPsychological guidance empowers individuals to regain control over their thoughts and emotions, leading to long-term mental stability and improved quality of life."
        },
        3: {
            title: "Tips for Improving Foot Pain",
            image: "assets/images/blog8.png",
            fullText: "Foot pain can significantly impact your daily life and mobility. Understanding the causes and treatments can help you achieve relief and maintain an active lifestyle.\n\nCommon causes of foot pain:\n• Plantar fasciitis\n• Flat feet or high arches\n• Improper footwear\n• Repetitive strain\n• Muscle imbalances\n\nEffective solutions:\n\n• Proper Footwear: Invest in shoes with good arch support and cushioning.\n\n• Stretching Exercises: Regular foot and calf stretches improve flexibility and reduce tension.\n\n• Massage and Self-Care: Foot massages and warm water soaks promote circulation and relaxation.\n\n• Orthotic Insoles: Custom or over-the-counter insoles provide support and alignment.\n\n• Physical Therapy: Professional guidance helps address underlying biomechanical issues.\n\n• Rest and Ice: Allow adequate recovery time and use ice to reduce inflammation.\n\nConsistent care and preventive measures can help you maintain healthy feet and stay active."
        },
        4: {
            title: "The Importance of Movement",
            image: "assets/images/blog6.jpeg",
            fullText: "Movement and exercise are fundamental to maintaining physical and mental health. Regular activity strengthens your body, improves mood, and supports emotional well-being.\n\nBenefits of movement:\n\n• Physical Health: Exercise strengthens muscles and bones, improves cardiovascular health, and enhances metabolism.\n\n• Mental Well-being: Movement releases endorphins, reduces stress, and improves mood.\n\n• Balance and Coordination: Regular activity improves body awareness and stability.\n\n• Energy Levels: Physical activity increases energy and reduces fatigue.\n\n• Sleep Quality: Exercise promotes better sleep patterns.\n\nTypes of beneficial movement:\n• Cardiovascular exercise (walking, running, swimming)\n• Strength training\n• Flexibility work (stretching, yoga)\n• Daily movement (stairs, gardening, dancing)\n\nFinding activities you enjoy makes it easier to maintain a consistent exercise routine. Start gradually and increase intensity as your fitness improves."
        },
        5: {
            title: "Heat & Acupuncture: Reduces neck pain",
            image: "assets/images/blog1.jpeg",
            fullText: "Neck pain is one of the most common physical complaints in modern life, especially among people who spend long hours working at desks or using electronic devices. Poor posture, muscle tension, and stress are major contributors to chronic neck discomfort.\n\nBenefits of Heat Therapy:\n\n• Increases blood flow to the affected area\n• Helps muscles relax and reduces stiffness\n• Improves oxygen delivery to tissues\n• Accelerates the healing process\n• Reduces pain signals sent to the brain\n\nBenefits of Acupuncture:\n\n• Targets specific pressure points in the body\n• Releases endorphins for natural pain relief\n• Reduces inflammation\n• Balances the nervous system\n• Improves overall body function\n\nCombined Treatment Benefits:\n\nWhen heat therapy is combined with acupuncture, patients often experience faster pain relief and improved neck mobility compared to using either method alone. Regular sessions under the supervision of trained professionals can significantly improve posture, reduce recurring pain, and enhance overall physical comfort.\n\nAlways consult a licensed therapist to ensure the treatment is appropriate for your condition."
        },
        6: {
            title: "Stretching Techniques for Better Flexibility & Strength",
            image: "assets/images/blog4.jpeg",
            fullText: "Stretching is a fundamental component of physical health that is often overlooked. Regular stretching improves muscle elasticity, joint mobility, and posture while reducing the risk of injuries.\n\nTypes of Stretching:\n\n• Dynamic Stretching: Involves movement and is best performed before physical activity to prepare muscles for movement and enhance performance.\n\n• Static Stretching: Involves holding a position and is best performed after exercise. It helps muscles relax and recover, reducing soreness and stiffness.\n\n• Proprioceptive Neuromuscular Facilitation (PNF): An advanced technique involving contracting and relaxing muscles.\n\nBenefits of Regular Stretching:\n\n• Improves circulation and blood flow\n• Reduces stress on joints\n• Promotes better coordination and balance\n• Increases range of motion\n• Reduces muscle tension and soreness\n• Improves posture\n\nStretching Tips:\n\n• Warm up before stretching\n• Hold stretches for 15-30 seconds\n• Breathe deeply and relax\n• Never bounce or force a stretch\n• Consistency is key - stretch daily\n\nWhether you are an athlete or someone with a sedentary lifestyle, proper stretching techniques can significantly improve your physical well-being and prevent injuries."
        }
    };

    // Initialize blog modal
    const blogModal = document.getElementById('blogModal');
    const closeBlogModal = document.getElementById('closeBlogModal');
    const closeBlogModalBtn = document.getElementById('closeBlogModalBtn');

    function openBlogModal(postId) {
        const post = blogPostsData[postId];
        if (!post) return;

        document.getElementById('blogModalTitle').textContent = post.title;
        document.getElementById('blogModalImage').src = post.image;
        document.getElementById('blogModalText').textContent = post.fullText;

        blogModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeBlogModalFunc() {
        blogModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Close blog modal on button clicks
    if (closeBlogModal) {
        closeBlogModal.addEventListener('click', closeBlogModalFunc);
    }
    if (closeBlogModalBtn) {
        closeBlogModalBtn.addEventListener('click', closeBlogModalFunc);
    }

    // Close blog modal when clicking outside the card
    if (blogModal) {
        blogModal.addEventListener('click', (e) => {
            if (e.target === blogModal) {
                closeBlogModalFunc();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && blogModal && blogModal.classList.contains('active')) {
            closeBlogModalFunc();
        }
    });

    // Add click listeners to all blog posts
    document.querySelectorAll('.post').forEach(post => {
        const postId = post.getAttribute('data-id');
        const readMoreBtn = post.querySelector('.read-more, .read-more-btn');
        
        // Make entire post card clickable
        post.style.cursor = 'pointer';
        post.addEventListener('click', (e) => {
            // Avoid conflict if button is explicitly clicked
            if (e.target !== readMoreBtn) {
                openBlogModal(parseInt(postId));
            }
        });

        // Also handle read-more button click
        if (readMoreBtn) {
            readMoreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openBlogModal(parseInt(postId));
            });
        }
    });

    // BLOG POST READ MORE FUNCTIONALITY - Truncate text
    document.querySelectorAll('.post').forEach(post => {
        const paragraph = post.querySelector('.post-content p');
        
        if (paragraph) {
            const fullText = paragraph.textContent;
            const truncateLength = 150;
            const truncated = fullText.substring(0, truncateLength) + '...';
            
            // عرض النص المقتوص في البداية
            paragraph.textContent = truncated;
        }
    });

    // CORE IMAGE ANIMATION
    const coreImg = document.querySelector('.core-image');
    if (coreImg) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
                    entry.target.classList.add('in-view');
                }
            });
        }, { threshold: [0, 0.35, 0.6] });
        
        obs.observe(coreImg);
    }
});

// ===== TESTIMONIALS SLIDER =====
const testimonialItems = document.querySelectorAll('.testimonial-item');
if (testimonialItems.length > 0) {
    let current = 0;
    
    function showSlide(n) {
        testimonialItems.forEach((item, i) => {
            item.classList.remove('active');
            const dots = item.querySelectorAll('.testimonial-dots .dot');
            if (dots && dots[n]) {
                dots.forEach(dot => dot.classList.remove('active'));
                dots[n].classList.add('active');
            }
        });
        
        testimonialItems[n].classList.add('active');
        current = n;
    }
    
    function nextSlide() {
        current = (current + 1) % testimonialItems.length;
        showSlide(current);
    }
    
    // Initialize slider
    showSlide(0);
    
    // Auto advance every 8 seconds
    setInterval(nextSlide, 8000);
}

// ===== AUTHENTICATION MODAL =====
document.addEventListener("DOMContentLoaded", function () {
    const loginTrigger = document.getElementById("login-trigger");
    const dashboardLink = document.getElementById("dashboard-link");
    const homeLink = document.getElementById("home-link");
    const authModal = document.getElementById("authModal");
    const homePage = document.getElementById("homePage");
    const dashboardPage = document.getElementById("dashboardPageContent");
    
    if (!loginTrigger || !authModal) return;
    
    // OPEN MODAL
    loginTrigger.addEventListener("click", e => {
        e.preventDefault();
        authModal.style.display = "flex";
    });
    
    // CLOSE MODAL
    window.closeModal = () => {
        authModal.style.display = "none";
    };
    
    authModal.addEventListener("click", e => {
        if (e.target === authModal) closeModal();
    });
    
    // SWITCH TABS
    window.showLogin = () => {
        const loginTab = document.querySelectorAll(".tab-btn")[0];
        const signupTab = document.querySelectorAll(".tab-btn")[1];
        const loginForm = document.getElementById("loginForm");
        const signupForm = document.getElementById("signupForm");
        
        if (loginTab && signupTab) {
            loginTab.classList.add("active");
            signupTab.classList.remove("active");
        }
        
        if (loginForm) loginForm.classList.add("active");
        if (signupForm) signupForm.classList.remove("active");
    };
    
    window.showSignup = () => {
        const loginTab = document.querySelectorAll(".tab-btn")[0];
        const signupTab = document.querySelectorAll(".tab-btn")[1];
        const loginForm = document.getElementById("loginForm");
        const signupForm = document.getElementById("signupForm");
        
        if (loginTab && signupTab) {
            signupTab.classList.add("active");
            loginTab.classList.remove("active");
        }
        
        if (signupForm) signupForm.classList.add("active");
        if (loginForm) loginForm.classList.remove("active");
    };
    
    // SIGNUP VALIDATION
    window.validateSignup = function (e) {
        e.preventDefault();
        let valid = true;
        
        const name = document.getElementById("fullName")?.value.trim();
        const email = document.getElementById("email")?.value.trim();
        const phone = document.getElementById("phone")?.value.trim();
        const password = document.getElementById("password")?.value;
        const confirmPass = document.getElementById("confirmPass")?.value;
        const terms = document.getElementById("terms")?.checked;
        
        // Clear previous errors
        document.querySelectorAll(".error").forEach(el => el.textContent = "");
        
        // Validation checks
        if (!name || name.length < 12) {
            document.getElementById("nameError").textContent = "Full name must be at least 12 characters";
            valid = false;
        }
        
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById("emailError").textContent = "Invalid email";
            valid = false;
        }
        
        if (!phone || !/^01[0125][0-9]{8}$/.test(phone)) {
            document.getElementById("phoneError").textContent = "Phone must be 11 digits starting with 01";
            valid = false;
        }
        
        if (!password || !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password)) {
            document.getElementById("passError").textContent = "Password too weak";
            valid = false;
        }
        
        if (!confirmPass || confirmPass !== password) {
            document.getElementById("confirmError").textContent = "Passwords do not match";
            valid = false;
        }
        
        if (!terms) {
            alert("You must agree to Terms & Conditions");
            valid = false;
        }
        
        if (valid) {
            alert("Account created successfully! Welcome to VivaiQ 🎉");
            closeModal();
            
            if (loginTrigger) loginTrigger.style.display = "none";
            if (dashboardLink) dashboardLink.style.display = "inline-block";
            
            showDashboard();
        }
    };
    
    function showDashboard() {
        if (homePage) homePage.style.display = "none";
        if (dashboardPage) {
            dashboardPage.style.display = "block";
            dashboardPage.classList.add("active");
            startWellnessAnimation();
        }
        
        // Update navigation
        document.querySelectorAll('.page').forEach(page => {
            if (page !== dashboardPage) {
                page.style.display = 'none';
                page.classList.remove('active');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        if (dashboardLink) dashboardLink.classList.add('active');
    }
    
    function showHome() {
        if (dashboardPage) {
            dashboardPage.style.display = "none";
            dashboardPage.classList.remove("active");
        }
        if (homePage) {
            homePage.style.display = "block";
            homePage.classList.add("active");
        }
        
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const homeLink = document.getElementById('home-link');
        if (homeLink) homeLink.classList.add('active');
    }
    
    if (dashboardLink) {
        dashboardLink.addEventListener("click", e => {
            e.preventDefault();
            showDashboard();
        });
    }
    
    if (homeLink) {
        homeLink.addEventListener("click", e => {
            e.preventDefault();
            showHome();
        });
    }
    
    window.logout = function () {
        if (loginTrigger) loginTrigger.style.display = "inline-block";
        if (dashboardLink) dashboardLink.style.display = "none";
        // Show login form and hide signup form
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('signupForm').style.display = 'none';
        // Show the auth modal
        document.getElementById('authModal').style.display = 'flex';
        // Clear any existing alerts
        document.getElementById('loginAlert').textContent = '';
        // Show success message in the login form
        const loginAlert = document.getElementById('loginAlert');
        loginAlert.textContent = 'You have been successfully logged out.';
        loginAlert.style.color = 'green';
        loginAlert.style.display = 'block';
        // Clear user data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };
    
    function startWellnessAnimation() {
        const el = document.getElementById("wellnessScore");
        if (!el) return;
        
        let num = 0;
        const timer = setInterval(() => {
            num += 3;
            if (num >= 92) {
                num = 92;
                clearInterval(timer);
            }
            el.textContent = num;
        }, 40);
    }
});

// ===== PROFILE IMAGE UPLOAD =====
document.addEventListener("DOMContentLoaded", function () {
    const profileImage = document.getElementById("profileImage");
    const imageInput = document.getElementById("profileImageInput");
    const deleteBtn = document.getElementById("deletePhotoBtn");
    const defaultImage = "assets/images/img50.webp";
    
    if (!profileImage || !imageInput || !deleteBtn) return;
    
    // Load saved image
    const saved = localStorage.getItem("userProfileImage");
    if (saved) profileImage.src = saved;
    
    // Upload new image
    imageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                profileImage.src = ev.target.result;
                localStorage.setItem("userProfileImage", ev.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Delete image
    deleteBtn.addEventListener("click", () => {
        profileImage.src = defaultImage;
        localStorage.removeItem("userProfileImage");
    });
});

// ===== FLOATING SETTINGS =====
document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".floating-settings");
    const trigger = document.querySelector(".settings-trigger");
    
    if (!container || !trigger) return;
    
    // Toggle settings
    trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        container.classList.toggle("active");
    });
    
    // Close settings when clicking outside
    document.addEventListener("click", () => {
        container.classList.remove("active");
    });
    
    // Theme modes
    document.querySelectorAll("[data-mode]").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const mode = btn.getAttribute("data-mode");
            
            document.body.classList.remove("dark-mode", "high-contrast");
            document.querySelectorAll(".settings-circle").forEach(b => b.classList.remove("active"));
            
            if (mode === "dark") {
                document.body.classList.add("dark-mode");
                localStorage.setItem("theme", "dark");
            } else if (mode === "light") {
                document.body.classList.remove("dark-mode", "high-contrast");
                localStorage.setItem("theme", "light");
            } else if (mode === "contrast") {
                document.body.classList.add("high-contrast");
                localStorage.setItem("theme", "contrast");
            }
            btn.classList.add("active");
        });
    });
    
    // Font size
    let fontSize = parseInt(localStorage.getItem("fontSize") || "16");
    document.documentElement.style.fontSize = fontSize + "px";
    
    const fontPlus = document.getElementById("fontPlus");
    const fontMinus = document.getElementById("fontMinus");
    
    if (fontPlus) {
        fontPlus.addEventListener("click", (e) => {
            e.stopPropagation();
            if (fontSize < 26) {
                fontSize += 2;
                document.documentElement.style.fontSize = fontSize + "px";
                localStorage.setItem("fontSize", fontSize);
            }
        });
    }
    
    if (fontMinus) {
        fontMinus.addEventListener("click", (e) => {
            e.stopPropagation();
            if (fontSize > 12) {
                fontSize -= 2;
                document.documentElement.style.fontSize = fontSize + "px";
                localStorage.setItem("fontSize", fontSize);
            }
        });
    }
    
    // Load saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        document.querySelector("[data-mode='dark']")?.classList.add("active");
    } else if (savedTheme === "contrast") {
        document.body.classList.add("high-contrast");
        document.querySelector("[data-mode='contrast']")?.classList.add("active");
    }
});

// ==================== PAGE NAVIGATION SYSTEM ====================
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
        page.classList.remove('active');
    });
    
    // Show target page
    let targetPage;
    
    if (pageId === 'dashboard') {
        targetPage = document.getElementById('dashboardPageContent');
    } else {
        targetPage = document.getElementById(pageId + 'Page');
    }
    
    if (targetPage) {
        targetPage.style.display = 'block';
        targetPage.classList.add('active');
        
        // Reinitialize AOS for new page
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
        
        // Initialize components for the page
        initPageComponents(pageId);
    }
    
    // Update active navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.getElementById(pageId + '-link');
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // For sub-service links, also activate services link
    if (pageId === 'mental-health' || pageId === 'physical-health' || pageId === 'sign-language') {
        const servicesLink = document.getElementById('services-link');
        if (servicesLink) servicesLink.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close mobile menu if open
    const navbar = document.getElementById('navbar');
    if (navbar && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
    }
}

// Initialize page-specific components
function initPageComponents(pageId) {
    switch(pageId) {
        case 'mental-health':
            initMentalHealthPage();
            break;
        case 'physical-health':
            initPhysicalHealthPage();
            break;
        case 'sign-language':
            initSignLanguagePage();
            break;
        case 'blog':
            initBlogPage();
            break;
        case 'dashboard':
            initDashboardPage();
            break;
    }
}

// Initialize Mental Health page components
function initMentalHealthPage() {
    // Mood tracker
    const moodButtons = document.querySelectorAll('.mood-options button');
    moodButtons.forEach(button => {
        button.addEventListener('click', function() {
            const mood = this.getAttribute('data-mood');
            recordMood(mood);
        });
    });
    
    // Breathing exercise
    const breathingBtn = document.querySelector('.breathing-btn');
    if (breathingBtn) {
        breathingBtn.addEventListener('click', startBreathingExercise);
    }
    
    // Meditation session
    const meditationBtn = document.querySelector('.meditation-btn');
    if (meditationBtn) {
        meditationBtn.addEventListener('click', startMeditationSession);
    }
    
    // Goal setting
    const addGoalBtn = document.querySelector('.add-goal');
    if (addGoalBtn) {
        addGoalBtn.addEventListener('click', addNewGoal);
    }
    
    // Chat functionality
    initChat();
}

// Initialize Physical Health page
function initPhysicalHealthPage() {
    console.log('Physical Health page initialized');
}

// Initialize Sign Language page
function initSignLanguagePage() {
    console.log('Sign Language page initialized');
}

// Blog posts data
        const posts = [
            {
                title: "How to build a supportive community in group therapy sessions",
                img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                content: "<p>A supportive community in group therapy is created through clear guidelines, emotional safety, and active participation. Therapists should encourage empathy, model positive behavior, and use group activities to help members connect. Shared goals and reflection time strengthen trust and create a sense of belonging. When people feel safe, heard, and respected, the group becomes a powerful space for healing and growth.</p><p>Simple habits that protect your body as it grows and becomes stronger.</p>"
            },
            {
                title: "Overcoming anxiety: the role of psychologists in mental health",
                img: "https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                content: "<p>Psychologists play a key role in helping individuals overcome anxiety by providing a safe space to understand their feelings, identify triggers, and develop healthier coping strategies. Through evidence-based therapies like CBT, mindfulness training, and behavior modification, they guide people in changing negative thought patterns and managing stress more effectively. Psychologists also offer long-term emotional support, teach practical skills for everyday life, and help individuals build confidence as they work toward recovery and overall mental well-being.</p>"
            },
            {
                title: "Tips for Improving Foot Pain",
                img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                content: "<p>Foot pain can often be relieved with simple daily habits. Start by wearing supportive, well-fitted shoes and avoiding long periods of standing. Gentle stretching of the calves, arches, and toes helps reduce tension. Applying ice can ease swelling, while warm foot soaks relax tight muscles. Maintaining a healthy weight lowers pressure on the feet, and using cushioned insoles or orthotics adds extra support. If pain continues or gets worse, consulting a physical therapist or podiatrist ensures proper diagnosis and treatment.</p>"
            },
            {
                title: "The Importance of Movement",
                img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                content: "<p>Movement is essential for maintaining both physical and mental health. Regular activity improves strength, flexibility, and circulation while reducing the risk of chronic pain and injury. It also boosts mood, lowers stress, and enhances energy levels. Even simple daily movements—like walking, stretching, or light exercise—help keep the body balanced and the mind clear. Consistent movement is one of the easiest and most effective ways to support overall well-being.</p>"
            },
            {
                title: "Heat & Acupuncture: Reduces neck pain",
                img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                content: "<p>Heat therapy and acupuncture are effective natural remedies for neck pain relief. Heat helps relax tense muscles, improve circulation, and reduce stiffness, making it ideal for chronic pain and muscle tension. Acupuncture works by stimulating specific points that release endorphins and restore energy flow, addressing both physical tension and underlying imbalances. When combined, these therapies provide comprehensive relief while promoting overall wellness and preventing future pain.</p>"
            },
            {
                title: "Stretching Techniques for Better Flexibility & Strength",
                img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                content: "<p>Regular stretching is essential for building flexibility and maintaining muscle strength throughout life. Dynamic stretches before exercise prepare muscles for movement and improve performance, while static stretches after activity help reduce soreness and enhance recovery. Incorporating full-body stretching routines—targeting legs, back, shoulders, and arms—increases range of motion and prevents injuries. Consistent stretching also improves posture, reduces tension, and boosts physical confidence. Even just 10-15 minutes daily can transform flexibility and keep your body feeling strong and balanced.</p>"
            },
            {
                title: "Mindfulness Meditation for Stress Reduction",
                img: "https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                content: "<p>Mindfulness meditation has been scientifically proven to reduce stress and improve mental clarity. By focusing on the present moment without judgment, individuals can break free from anxious thoughts and emotional reactivity. Regular practice rewires the brain to handle stress more effectively, improves concentration, and promotes emotional resilience. Even just 10 minutes a day can make a significant difference in overall wellbeing.</p>"
            },
            {
                title: "Nutrition Tips for Optimal Mental Health",
                img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                content: "<p>The connection between nutrition and mental health is stronger than many realize. Omega-3 fatty acids, B vitamins, and antioxidants play crucial roles in brain function and mood regulation. A balanced diet rich in whole foods, lean proteins, and healthy fats can reduce symptoms of depression and anxiety. Avoiding processed foods and sugar spikes helps maintain stable energy and mood throughout the day.</p>"
            }
        ];

       // Blog Data
const blogPosts = [
    {
        id: 1,
        title: "Heat & Acupuncture: Reduces Neck Pain",
        image: "blog_image_1.jpeg",
        excerpt: "Neck pain is one of the most common physical complaints in modern life...",
        fullContent: `
            <img src="blog_image_1.jpeg" alt="Heat & Acupuncture">
            <h3>Heat & Acupuncture: Reduces Neck Pain</h3>
            <p>Neck pain is one of the most common physical complaints in modern life, especially among people who spend long hours working at desks or using electronic devices. Poor posture, muscle tension, and stress are major contributors to chronic neck discomfort.</p>
            <p>Heat therapy works by increasing blood flow to the affected area, helping muscles relax and reducing stiffness. Warmth also improves oxygen delivery to tissues, which accelerates the healing process and reduces pain signals sent to the brain.</p>
            <p>Acupuncture, on the other hand, is a traditional therapeutic technique that targets specific pressure points in the body. By stimulating these points, acupuncture helps release endorphins, reduce inflammation, and balance the nervous system.</p>
            <p>When heat therapy is combined with acupuncture, patients often experience faster pain relief and improved neck mobility compared to using either method alone.</p>
            <p>Regular sessions under the supervision of trained professionals can significantly improve posture, reduce recurring pain, and enhance overall physical comfort. Always consult a licensed therapist to ensure the treatment is appropriate for your condition.</p>
        `
    },
    {
        id: 2,
        title: "Foot Pain Relief & Prevention",
        image: "blog_image_2.jpeg",
        excerpt: "Foot pain can have a serious impact on daily activities, mobility, and overall quality of life...",
        fullContent: `
            <img src="blog_image_2.jpeg" alt="Foot Pain Relief">
            <h3>Foot Pain Relief & Prevention</h3>
            <p>Foot pain can have a serious impact on daily activities, mobility, and overall quality of life. It is often caused by prolonged standing, improper footwear, flat feet, or repetitive strain on the joints and muscles of the feet.</p>
            <p>Simple lifestyle adjustments can make a big difference. Wearing supportive shoes, maintaining a healthy weight, and avoiding excessive pressure on the feet help prevent long-term problems. Stretching exercises also play an important role in improving flexibility and reducing tension.</p>
            <p>Foot massages and warm water soaks improve circulation and relax the muscles, while orthotic insoles provide proper alignment and shock absorption.</p>
            <p>Healthy foot care not only reduces pain but also improves balance, posture, and overall body alignment.</p>
            <p>Taking small preventive steps every day can protect your feet from chronic pain and keep you active and comfortable for years to come.</p>
        `
    },
    {
        id: 3,
        title: "Stretching Techniques for Better Flexibility & Strength",
        image: "blog_image_3.jpeg",
        excerpt: "Stretching is a fundamental component of physical health that is often overlooked...",
        fullContent: `
            <img src="blog_image_3.jpeg" alt="Stretching Techniques">
            <h3>Stretching Techniques for Better Flexibility & Strength</h3>
            <p>Stretching is a fundamental component of physical health that is often overlooked. Regular stretching improves muscle elasticity, joint mobility, and posture while reducing the risk of injuries.</p>
            <p>Dynamic stretching before physical activity prepares the muscles for movement and enhances performance. Static stretching after exercise helps muscles relax and recover, reducing soreness and stiffness.</p>
            <p>Incorporating stretching into your daily routine improves circulation, reduces stress on joints, and promotes better coordination and balance.</p>
            <p>Consistent stretching supports long-term flexibility, reduces muscle tension, and enhances overall physical performance.</p>
            <p>Whether you are an athlete or someone with a sedentary lifestyle, proper stretching techniques can significantly improve your physical well-being.</p>
        `
    },
    {
        id: 4,
        title: "Overcoming Anxiety: The Role of Psychologists",
        image: "blog-img-4.jpeg",
        excerpt: "Anxiety disorders are among the most common mental health challenges...",
        fullContent: `
            <img src="blog-img-4.jpeg" alt="Overcoming Anxiety">
            <h3>Overcoming Anxiety: The Role of Psychologists</h3>
            <p>Anxiety disorders are among the most common mental health challenges, affecting emotional stability, concentration, and daily functioning. Persistent worry and fear can interfere with personal relationships and professional life.</p>
            <p>Psychologists help individuals identify anxiety triggers and understand thought patterns that contribute to stress. Through therapeutic techniques such as cognitive behavioral therapy (CBT), patients learn how to manage negative thoughts and develop healthier coping mechanisms.</p>
            <p>Professional support also provides a safe space for expressing emotions and building emotional resilience.</p>
            <p>Psychological guidance empowers individuals to regain control over their thoughts and emotions, leading to long-term mental stability.</p>
            <p>Seeking help early can prevent anxiety from escalating and improve overall quality of life.</p>
        `
    },
    {
        id: 5,
        title: "Managing Stress in Modern Life",
        image: "blog-img-05.jpeg",
        excerpt: "Modern life exposes individuals to constant pressure from work...",
        fullContent: `
            <img src="blog-img-05.jpeg" alt="Managing Stress">
            <h3>Managing Stress in Modern Life</h3>
            <p>Modern life exposes individuals to constant pressure from work, social responsibilities, and digital overload. Chronic stress affects both mental and physical health, leading to fatigue, sleep problems, and reduced concentration.</p>
            <p>Effective stress management starts with awareness. Identifying stress sources allows individuals to make positive changes in daily routines. Mindfulness practices, deep breathing, and regular physical activity are powerful tools for reducing tension.</p>
            <p>Adequate sleep, balanced nutrition, and setting personal boundaries also play a crucial role in maintaining emotional balance.</p>
            <p>Managing stress is not about eliminating challenges, but about learning how to respond to them in a healthy way.</p>
            <p>A balanced lifestyle improves mental clarity, emotional well-being, and overall life satisfaction.</p>
        `
    },
    {
        id: 6,
        title: "How to Build a Supportive Community",
        image: "blog-img-6.jpeg",
        excerpt: "A supportive community is essential for mental and emotional well-being...",
        fullContent: `
            <img src="blog-img-6.jpeg" alt="Supportive Community">
            <h3>How to Build a Supportive Community</h3>
            <p>A supportive community is essential for mental and emotional well-being. Strong social connections provide encouragement, understanding, and a sense of belonging during difficult times.</p>
            <p>Building a supportive environment starts with open communication and empathy. Sharing experiences and listening without judgment strengthens trust and emotional bonds.</p>
            <p>Group activities, support groups, and community programs help individuals feel connected and reduce feelings of isolation.</p>
            <p>A strong support system enhances emotional resilience and promotes long-term mental health.</p>
            <p>Surrounding yourself with positive and understanding people creates a foundation for personal growth and psychological stability.</p>
        `
    }
];

// Blog Slider for Home Page
let currentSlide = 0;
const cardsPerView = 3;
let cardWidth = 380; // card width + gap

function initBlogSlider() {
    const track = document.getElementById('blogCardsTrack');
    if (!track) return;
    
    track.innerHTML = '';
    
    blogPosts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'blog-card-home';
        card.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <div class="blog-card-content">
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <a href="#" data-page="blog" class="nav-link read-full-btn">
                    Read Full Article <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        track.appendChild(card);
    });
    
    updateSliderPosition();
}

function updateSliderPosition() {
    const track = document.getElementById('blogCardsTrack');
    if (!track) return;
    
    const maxSlides = Math.ceil(blogPosts.length / cardsPerView) - 1;
    currentSlide = Math.min(Math.max(currentSlide, 0), maxSlides);
    
    const translateX = -currentSlide * (cardWidth * cardsPerView);
    track.style.transform = `translateX(${translateX}px)`;
    
    // Update button states
    const prevBtn = document.getElementById('prevBlogBtn');
    const nextBtn = document.getElementById('nextBlogBtn');
    
    if (prevBtn) prevBtn.disabled = currentSlide === 0;
    if (nextBtn) nextBtn.disabled = currentSlide >= maxSlides;
}

function nextBlogSlide() {
    const maxSlides = Math.ceil(blogPosts.length / cardsPerView) - 1;
    if (currentSlide < maxSlides) {
        currentSlide++;
        updateSliderPosition();
    }
}

function prevBlogSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSliderPosition();
    }
}

// Blog Page Grid
function initBlogPage() {
    const grid = document.getElementById('blogPageGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    blogPosts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'blog-page-card';
        card.setAttribute('data-id', post.id);
        card.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <div class="blog-page-content">
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <a href="#" class="read-full-btn" onclick="openBlogModal(${post.id}); return false;">
                    Read Full Article <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Blog Modal Functions
function openBlogModal(postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (!post) return;
    
    const modalOverlay = document.getElementById('blogModalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    if (modalOverlay && modalTitle && modalBody) {
        modalTitle.textContent = post.title;
        modalBody.innerHTML = post.fullContent;
        modalOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeBlogModal() {
    const modalOverlay = document.getElementById('blogModalOverlay');
    if (modalOverlay) {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize blog slider for home page
    initBlogSlider();
    
    // Initialize blog page grid
    initBlogPage();
    
    // Event listeners for blog navigation
    const prevBtn = document.getElementById('prevBlogBtn');
    const nextBtn = document.getElementById('nextBlogBtn');
    
    if (prevBtn) prevBtn.addEventListener('click', prevBlogSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextBlogSlide);
    
    // Event listener for close modal button
    const closeBtn = document.getElementById('closeModal');
    if (closeBtn) closeBtn.addEventListener('click', closeBlogModal);
    
    // Close modal when clicking outside
    const modalOverlay = document.getElementById('blogModalOverlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeBlogModal();
            }
        });
    }
    
    // Update card width on resize
    window.addEventListener('resize', function() {
        cardWidth = window.innerWidth >= 768 ? 380 : 300;
        updateSliderPosition();
    });
    
    // Initialize card width
    cardWidth = window.innerWidth >= 768 ? 380 : 300;
});

// Page switching function
function showPage(pageId) {
    // ... your existing page switching code ...
    
    // If switching to blog page, initialize it
    if (pageId === 'blog') {
        setTimeout(initBlogPage, 100);
    }
    
    // If switching to home page, initialize slider
    if (pageId === 'home') {
        setTimeout(() => {
            initBlogSlider();
            updateSliderPosition();
        }, 100);
    }
}
        // Function to render posts
        function renderPosts(postsArray, container, isModal = false) {
            if (!container) return;
            
            let postsHTML = '';
            
            postsArray.forEach((post, index) => {
                const shortContent = post.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...';
                
                if (isModal) {
                    postsHTML += `
                        <div class="modal-post" data-id="${index + 1}">
                            <img src="${post.img}" alt="${post.title}">
                            <div class="modal-post-content">
                                <h3>${post.title}</h3>
                                <p>${shortContent}</p>
                            </div>
                        </div>
                    `;
                } else {
                    postsHTML += `
                        <div class="post" data-id="${index + 1}">
                            <img src="${post.img}" alt="${post.title}">
                            <div class="post-content">
                                <h2>${post.title}</h2>
                                <p>${shortContent}</p>
                                <button class="read-more-btn">Read Article</button>
                            </div>
                        </div>
                    `;
                }
            });
            
            container.innerHTML = postsHTML;
        }
        
        // Function to show modal with all posts
        function showModalWithPosts() {
            const modal = document.getElementById('postsModal');
            modal.classList.add('active');
        }
        
        // Function to show single post
        function showSinglePost(post) {
            const singlePost = document.getElementById('single');
            const blogSection = document.querySelector('.blog-section');
            
            singlePost.innerHTML = `
                <a href="#" class="back-btn" onclick="backToBlog()">← Back to Articles</a>
                <img src="${post.img}" alt="${post.title}">
                <h1>${post.title}</h1>
                ${post.content}
            `;
            
            singlePost.classList.remove('slide-out');
            singlePost.classList.add('active');
            singlePost.style.display = 'block';
        }
        
        // Back to blog function
        function backToBlog() {
            const singlePost = document.getElementById('single');
            const blogSection = document.querySelector('.blog-section');
            
            // Animate single post out (to the right)
            singlePost.classList.remove('active');
            singlePost.classList.add('slide-out');
            
            // Wait for animation to complete, then show blog section
            setTimeout(() => {
                singlePost.style.display = 'none';
                blogSection.style.display = 'grid';
                blogSection.style.animation = 'slideInLeft 0.5s forwards';
                
                // Reset animation after it completes
                setTimeout(() => {
                    blogSection.style.animation = '';
                }, 500);
            }, 500);
        }
        
        // Initialize the blog page when DOM is loaded
        document.addEventListener('DOMContentLoaded', initBlogPage);
// Initialize Dashboard page
function initDashboardPage() {
    // Update dashboard data
    updateDashboardData();
    
    // Setup profile image upload
    setupProfileImageUpload();
}

// Record mood function
function recordMood(mood) {
    const moods = {
        'happy': '😊 Happy',
        'neutral': '😐 Neutral',
        'sad': '😔 Sad',
        'stressed': '😣 Stressed',
        'angry': '😡 Angry'
    };
    
    const date = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Store in localStorage
    const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    moodHistory.push({
        date: date,
        mood: mood,
        timestamp: Date.now()
    });
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
    
    // Show feedback
    alert(`Mood recorded: ${moods[mood]}\nDate: ${date}`);
    
    // Update history dashboard if exists
    updateMoodHistoryDashboard();
}

// Update mood history dashboard
function updateMoodHistoryDashboard() {
    const historyBox = document.querySelector('.history-box');
    if (historyBox) {
        const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
        if (moodHistory.length > 0) {
            historyBox.innerHTML = moodHistory.map(entry => 
                `<div class="history-item">
                    <strong>${entry.date}</strong>: ${entry.mood}
                </div>`
            ).join('');
        } else {
            historyBox.innerHTML = '<p>No mood data yet — start tracking today!</p>';
        }
    }
}

// Start breathing exercise
function startBreathingExercise() {
    const steps = [
        "Breathe in slowly through your nose for 4 seconds...",
        "Hold your breath for 4 seconds...",
        "Breathe out slowly through your mouth for 6 seconds...",
        "Repeat this cycle 5 times..."
    ];
    
    let step = 0;
    showExerciseStep(steps[step]);
    
    const interval = setInterval(() => {
        step++;
        if (step < steps.length) {
            showExerciseStep(steps[step]);
        } else {
            clearInterval(interval);
            alert("Great job! You've completed the breathing exercise. Take a moment to notice how you feel.");
        }
    }, 5000);
}

// Show exercise step
function showExerciseStep(step) {
    // You can replace this with a better UI
    alert(step);
}

// Start meditation session
function startMeditationSession() {
    alert("Starting a 5-minute guided meditation.\n\nFind a comfortable position and close your eyes if you can.\n\nFocus on your breath. Notice the sensation of air entering and leaving your body.\n\nIf thoughts come, gently return your attention to your breath.\n\nWe'll guide you through this for the next 5 minutes.");
    
    // Timer for meditation
    setTimeout(() => {
        alert("Meditation session complete. Take a moment to notice how you feel.");
    }, 300000); // 5 minutes
}

// Add new goal
function addNewGoal() {
    const goalInput = document.querySelector('.goal-box input');
    const goalList = document.querySelector('.goal-list');
    
    if (!goalInput || !goalList) return;
    
    const text = goalInput.value.trim();
    if (!text) {
        alert('Please enter a goal');
        return;
    }
    
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${text}</span>
        <div>
            <button class="complete-goal">✓</button>
            <button class="delete-goal">×</button>
        </div>
    `;
    
    goalList.appendChild(li);
    goalInput.value = '';
    
    // Add event listeners
    li.querySelector('.complete-goal').addEventListener('click', function() {
        li.classList.toggle('completed');
    });
    
    li.querySelector('.delete-goal').addEventListener('click', function() {
        li.remove();
    });
    
    // Store in localStorage
    const goals = JSON.parse(localStorage.getItem('goals') || '[]');
    goals.push(text);
    localStorage.setItem('goals', JSON.stringify(goals));
}

// Initialize chat functionality
function initChat() {
    const chatBox = document.getElementById("mentalAIChat");
    if (!chatBox) return;

    const chatMessages = chatBox.querySelector(".chat-messages");
    const input = chatBox.querySelector(".chat-input-container input");
    const sendBtn = chatBox.querySelector(".chat-input-container .send-btn");

    if (!chatMessages || !input || !sendBtn) return;

    function appendMessage(text, cls) {
        const m = document.createElement("div");
        m.className = `chat-message ${cls}`;
        m.innerHTML = `<div class="message-text">${text}</div>`;
        chatMessages.appendChild(m);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function sendMessage() {
        const txt = input.value.trim();
        if (!txt) return;
        
        appendMessage(txt, "user");
        input.value = "";
        input.disabled = true;
        sendBtn.disabled = true;

        // Typing indicator
        const typing = document.createElement("div");
        typing.className = "chat-message bot typing";
        typing.innerHTML = `<div class="message-text">Typing...</div>`;
        chatMessages.appendChild(typing);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            // Simulate API call with timeout
            setTimeout(() => {
                typing.remove();
                
                // Simple response logic based on keywords
                let response = "I understand you're saying: \"" + txt + "\". How does that make you feel?";
                
                if (txt.toLowerCase().includes('anxiety') || txt.toLowerCase().includes('stress')) {
                    response = "Anxiety and stress are common experiences. Have you tried deep breathing exercises? Try breathing in for 4 seconds, holding for 4, and exhaling for 6. Repeat 5 times.";
                } else if (txt.toLowerCase().includes('sad') || txt.toLowerCase().includes('depress')) {
                    response = "I'm sorry you're feeling this way. Remember that feelings are temporary. Would you like to talk about what's been happening recently?";
                } else if (txt.toLowerCase().includes('happy') || txt.toLowerCase().includes('good')) {
                    response = "That's wonderful to hear! Celebrating positive moments is important. What contributed to these good feelings?";
                }
                
                appendMessage(response, "bot");
                input.disabled = false;
                sendBtn.disabled = false;
                input.focus();
            }, 1500);
            
        } catch (err) {
            typing.remove();
            appendMessage("I'm having trouble connecting right now. Please try again in a moment.", "bot");
            console.error(err);
            input.disabled = false;
            sendBtn.disabled = false;
            input.focus();
        }
    }

    sendBtn.addEventListener("click", (e) => { 
        e.preventDefault(); 
        sendMessage(); 
    });
    
    input.addEventListener("keydown", (e) => { 
        if (e.key === "Enter") { 
            e.preventDefault(); 
            sendMessage(); 
        } 
    });

    // Welcome message
    setTimeout(() => appendMessage("Hello! I'm here to listen. How are you feeling today?", "bot"), 500);
}

// Back to blog function
window.backToBlog = function() {
    const singlePost = document.getElementById('single');
    const blogSection = document.querySelector('.blog-section');
    
    if (singlePost && blogSection) {
        singlePost.style.display = 'none';
        singlePost.classList.remove('active');
        blogSection.style.display = 'block';
    }
};

// Load existing goals
function loadGoals() {
    const goalList = document.querySelector('.goal-list');
    if (!goalList) return;
    
    const goals = JSON.parse(localStorage.getItem('goals') || '[]');
    
    goals.forEach(goal => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${goal}</span>
            <div>
                <button class="complete-goal">✓</button>
                <button class="delete-goal">×</button>
            </div>
        `;
        
        goalList.appendChild(li);
        
        // Add event listeners
        li.querySelector('.complete-goal').addEventListener('click', function() {
            li.classList.toggle('completed');
        });
        
        li.querySelector('.delete-goal').addEventListener('click', function() {
            li.remove();
            // Remove from localStorage
            const updatedGoals = goals.filter(g => g !== goal);
            localStorage.setItem('goals', JSON.stringify(updatedGoals));
        });
    });
}

// Update dashboard data
function updateDashboardData() {
    // Load saved image
    const savedImage = localStorage.getItem('userProfileImage');
    if (savedImage) {
        const profileImage = document.getElementById('profileImage');
        if (profileImage) profileImage.src = savedImage;
    }
    
    // Load mood history
    updateMoodHistoryDashboard();
    
    // Load goals
    loadGoals();
}

// Initialize page navigation
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to all navigation links
    document.querySelectorAll('.nav-link[data-page]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
        });
    });
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
    
    // Show home page by default
    showPage('home');
    
    // Load existing goals
    loadGoals();
    // Load mood history
    updateMoodHistoryDashboard();
});
// ==================== PAGE NAVIGATION SYSTEM ====================
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
        page.classList.remove('active');
    });
    
    // Show target page
    let targetPage;
    
    // Handle service pages
    if (pageId === 'mental-health') {
        targetPage = document.getElementById('mentalHealthServicesPage');
    } else if (pageId === 'physical-health') {
        targetPage = document.getElementById('physicalHealthServicesPage');
    } else if (pageId === 'sign-language') {
        targetPage = document.getElementById('signLanguagePage');
    } else if (pageId === 'dashboard') {
        targetPage = document.getElementById('dashboardPageContent');
    } else {
        targetPage = document.getElementById(pageId + 'Page');
    }
    
    if (targetPage) {
        targetPage.style.display = 'block';
        targetPage.classList.add('active');
        
        // Reinitialize AOS for new page
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
        
        // Initialize components for the page
        initPageComponents(pageId);
    }
    
    // Update active navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.getElementById(pageId + '-link');
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // For sub-service links, also activate services link
    if (pageId === 'mental-health' || pageId === 'physical-health' || pageId === 'sign-language') {
        const servicesLink = document.getElementById('services-link');
        if (servicesLink) servicesLink.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close mobile menu if open
    const navbar = document.getElementById('navbar');
    if (navbar && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
    }
}

// Update navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Update service links to point to specific service pages
    document.querySelectorAll('[data-page="mental-health"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('mental-health');
        });
    });
    
    document.querySelectorAll('[data-page="physical-health"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('physical-health');
        });
    });
    
    document.querySelectorAll('[data-page="sign-language"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('sign-language');
        });
    });
    
    // Remove old service blocks from home page
    const homePage = document.getElementById('homePage');
    const serviceBlocks = homePage.querySelectorAll('.service-block');
    serviceBlocks.forEach(block => {
        block.remove();
    });
});
// ==================== MODAL LOGIN/SIGNUP SYSTEM ====================

// ==================== API CONFIGURATION ====================
const API_BASE_URL = 'http://localhost:5002/api';

// ==================== AUTHENTICATION FUNCTIONS ====================

async function signupUser(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Store token
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            return { success: true, data };
        } else {
            return { success: false, error: data.message || 'Signup failed' };
        }
    } catch (error) {
        console.error('Signup error:', error);
        return { success: false, error: 'Network error. Please try again.' };
    }
}

async function loginUser(credentials) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Store token and user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            return { success: true, data };
        } else {
            return { success: false, error: data.message || 'Login failed' };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'Network error. Please try again.' };
    }
}

function checkAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
        return {
            isLoggedIn: true,
            user: JSON.parse(user)
        };
    }
    
    return { isLoggedIn: false };
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
}

// ==================== UPDATE SIGNUP VALIDATION ====================

async function validateSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById("fullName")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const password = document.getElementById("password")?.value;
    const confirmPass = document.getElementById("confirmPass")?.value;
    const terms = document.getElementById("terms")?.checked;
    
    // Clear previous errors
    document.querySelectorAll(".error").forEach(el => el.textContent = "");
    
    // Validation
    let valid = true;
    
    if (!name || name.length < 12) {
        document.getElementById("nameError").textContent = "Full name must be at least 12 characters";
        valid = false;
    }
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById("emailError").textContent = "Invalid email";
        valid = false;
    }
    
    if (!phone || !/^01[0125][0-9]{8}$/.test(phone)) {
        document.getElementById("phoneError").textContent = "Phone must be 11 digits starting with 01";
        valid = false;
    }
    
    if (!password || !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password)) {
        document.getElementById("passError").textContent = "Password too weak";
        valid = false;
    }
    
    if (!confirmPass || confirmPass !== password) {
        document.getElementById("confirmError").textContent = "Passwords do not match";
        valid = false;
    }
    
    if (!terms) {
        alert("You must agree to Terms & Conditions");
        valid = false;
    }
    
    if (valid) {
        // Prepare data for API
        const userData = {
            name: name,
            email: email,
            phone: phone,
            password: password,
            role: "patient" // Default role
        };
        
        // Show loading
        const submitBtn = document.querySelector('#signupForm button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Creating account...';
        submitBtn.disabled = true;
        
        // Send to backend
        const result = await signupUser(userData);
        
        if (result.success) {
            // Success
            alert("Account created successfully! Welcome to VivaiQ 🎉");
            closeModal();
            
            // Update UI
            document.getElementById("login-trigger").style.display = "none";
            document.getElementById("dashboard-link").style.display = "inline-block";
            document.getElementById("userNameDisplay").textContent = name;
            
            // Show dashboard
            showPage('dashboard');
        } else {
            // Error
            alert(`Error: ${result.error}`);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
}

// ==================== UPDATE LOGIN FUNCTION ====================

async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.querySelector('#loginForm input[type="email"]')?.value;
    const password = document.querySelector('#loginForm input[type="password"]')?.value;
    
    if (!email || !password) {
        alert('Please enter email and password');
        return;
    }
    
    // Show loading
    const submitBtn = document.querySelector('#loginForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Logging in...';
    submitBtn.disabled = true;
    
    // Send to backend
    const result = await loginUser({ email, password });
    
    if (result.success) {
        // Success
        alert(`Welcome back, ${result.data.user.name}!`);
        closeModal();
        
        // Update UI
        document.getElementById("login-trigger").style.display = "none";
        document.getElementById("dashboard-link").style.display = "inline-block";
        document.getElementById("userNameDisplay").textContent = result.data.user.name;
        
        // Show dashboard
        showPage('dashboard');
    } else {
        // Error
        alert(`Login failed: ${result.error}`);
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// ==================== UPDATE INITIALIZATION ====================

document.addEventListener("DOMContentLoaded", function() {
    // Check if user is already logged in
    const auth = checkAuth();
    
    if (auth.isLoggedIn) {
        document.getElementById("login-trigger").style.display = "none";
        document.getElementById("dashboard-link").style.display = "inline-block";
        document.getElementById("userNameDisplay").textContent = auth.user.name;
    }
    
    // Update form submission handlers
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', validateSignup);
    }
    
    // Update logout function
    window.logout = function() {
        // Clear user data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        
        // Show login form and hide dashboard link
        const loginTrigger = document.getElementById('login-trigger');
        const dashboardLink = document.getElementById('dashboard-link');
        
        if (loginTrigger) loginTrigger.style.display = "inline-block";
        if (dashboardLink) dashboardLink.style.display = "none";
        
        // Show login form and hide signup form
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        
        if (loginForm) {
            loginForm.style.display = 'block';
            loginForm.classList.add('active');
        }
        if (signupForm) {
            signupForm.style.display = 'none';
            signupForm.classList.remove('active');
        }
        
        // Show the auth modal
        const authModal = document.getElementById('authModal');
        if (authModal) {
            authModal.style.display = 'flex';
        }
        
        // Show success message in the login form
        const loginAlert = document.getElementById('loginAlert');
        if (loginAlert) {
            loginAlert.textContent = 'You have been successfully logged out.';
            loginAlert.style.color = 'green';
            loginAlert.style.display = 'block';
        }
        
        // Redirect to home page
        window.location.href = 'index.html';
    };
});
//==================== Mental Health Configuration ====================let currentService = '';
let moods = JSON.parse(localStorage.getItem('moods') || '{}');
let waterCount = parseInt(localStorage.getItem('waterCount')) || 0;
let timerInterval;
let unlockedVideos = [true, false, false]; // للفيديوهات المقفلة
let quizAnswers = {};

// وظائف Modal الأساسية
function openService(serviceId) {
    currentService = serviceId;
    
    // إخفاء الصفحة الرئيسية (الشاشة اللي فيها كروت الخدمات)
    const mainServices = document.getElementById('mainServices'); // غيري الـ ID لو مختلف عندك
    if (mainServices) {
        mainServices.style.display = 'none';
    }
    
    const modal = document.getElementById('serviceModal');
    const modalBody = document.getElementById('modalBody');
    
    // تعبئة المحتوى بناءً على الخدمة المختارة
    let content = '';
    const serviceTitles = {
        'emotional': 'Emotional Support',
        'ai-assistant': 'AI Mental Assistant',
        'mood': 'Mood Tracking',
        'stress': 'Stress Management',
        'mindfulness': 'Mindfulness',
        'tests': 'Self Assessment Tests',
        'videos': 'Therapy Videos',
        'reports': 'AI Reports',
        'emergency': 'Emergency Help'
    };
    
    content = `
        <h2 style="color: #5a4241; margin-bottom: 20px;">
            <i class="bi ${getServiceIcon(serviceId)}"></i> 
            ${serviceTitles[serviceId]}
        </h2>
        <div id="serviceContent"></div>
    `;
    
    modalBody.innerHTML = content;
    modal.style.display = 'block';
    
    // تحميل المحتوى المحدد
    setTimeout(() => loadServiceContent(serviceId), 10);
}

function closeModal() {
    const modal = document.getElementById('serviceModal');
    modal.style.display = 'none';
    
    // إرجاع إظهار الصفحة الرئيسية (كروت الخدمات)
    const mainServices = document.getElementById('mainServices'); // نفس الـ ID
    if (mainServices) {
        mainServices.style.display = 'grid'; // أو 'flex' أو 'block' حسب الـ CSS الأصلي
    }
    
    currentService = '';
}

function getServiceIcon(serviceId) {
    const icons = {
        'emotional': 'bi-heart',
        'ai-assistant': 'bi-robot',
        'mood': 'bi-emoji-smile',
        'stress': 'bi-lightning',
        'mindfulness': 'bi-wind',
        'tests': 'bi-clipboard-check',
        'videos': 'bi-play-circle',
        'reports': 'bi-file-earmark-pdf',
        'emergency': 'bi-exclamation-triangle'
    };
    return icons[serviceId] || 'bi-question-circle';
}

// تحميل محتوى الخدمات
function loadServiceContent(serviceId) {
    const contentDiv = document.getElementById('serviceContent');
    
    switch(serviceId) {
        case 'emotional':
            loadEmotionalSupport(contentDiv);
            break;
        case 'ai-assistant':
            loadAIAssistant(contentDiv);
            break;
        case 'mood':
            loadMoodTracking(contentDiv);
            break;
        case 'stress':
            loadStressManagement(contentDiv);
            break;
        case 'mindfulness':
            loadMindfulness(contentDiv);
            break;
        case 'tests':
            loadSelfTests(contentDiv);
            break;
        case 'videos':
            loadTherapyVideos(contentDiv);
            break;
        case 'reports':
            loadAIReports(contentDiv);
            break;
        case 'emergency':
            loadEmergencyHelp(contentDiv);
            break;
    }
}

// 1️⃣ Emotional Support
function loadEmotionalSupport(container) {
    const affirmations = [
        "You're not alone 💙",
        "Your feelings are valid",
        "Every day is a new chance",
        "You are strong",
        "Rest is important",
        "Small steps count",
        "Progress over perfection",
        "Be kind to yourself",
        "This too shall pass",
        "You matter"
    ];
    
    let html = `
        <p style="margin-bottom: 30px; font-size: 18px;">
            Flip these cards for positive affirmations whenever you need support.
        </p>
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px;">
    `;
    
    affirmations.forEach((msg, index) => {
        html += `
            <div class="flip-card" onclick="flipCard(this)">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <i class="bi bi-chat-heart" style="font-size: 24px;"></i>
                    </div>
                    <div class="flip-card-back">
                        ${msg}
                    </div>
                </div>
            </div>
        `;
    });
    
    html += `</div>`;
    container.innerHTML = html;
}

function flipCard(card) {
    const inner = card.querySelector('.flip-card-inner');
    inner.style.transform = inner.style.transform === 'rotateY(180deg)' 
        ? 'rotateY(0deg)' 
        : 'rotateY(180deg)';
}
// 2️⃣ AI Assistant
let responses = {
    'stress': "Let's try some breathing exercises. Inhale for 4 seconds, hold for 4, exhale for 6. Repeat 5 times.",
    'anxious': "You're safe. Try grounding: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.",
    'sad': "It's okay to feel this way. Would you like to try mood tracking to better understand your feelings?",
    'tired': "Rest is productive. Maybe a short walk or stretching could help refresh you.",
    'angry': "Take a moment. Try counting backwards from 10. Would you like stress management tips?",
    'happy': "That's wonderful! Keep celebrating the good moments.",
    'overwhelmed': "Let's break things down. What's one small thing you can do right now?",
    'lonely': "You're not alone. Would you like me to suggest some connection activities?",
    'confused': "Let me help you clarify. Tell me more about what's on your mind.",
    'proud': "I'm proud of you too! Celebrating your achievements is important.",
    'default': "Thanks for sharing. How can I support you today?"
};

function loadAIAssistant(container) {
    let html = `
        <div style="max-width: 800px; margin: 0 auto;">
            <h3 style="color: #5a4241; margin-bottom: 10px;">AI Mental Health Assistant</h3>
            <p style="margin-bottom: 20px; color: #666;">Chat with our AI assistant for emotional support and coping strategies.</p>
            
            <div class="chat-container" style="background: white; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); padding: 20px; margin-bottom: 20px;">
                <div id="aiChatMessages" style="height: 300px; overflow-y: auto; padding: 10px; background: #f9f9f9; border-radius: 8px; margin-bottom: 20px;">
                    <div style="color: #5a4241; text-align: center; padding: 20px;">
                        <i class="bi bi-robot" style="font-size: 32px; color: #8c7473; margin-bottom: 10px;"></i><br>
                        <strong style="font-size: 16px;">Hello! I'm your AI mental health assistant</strong><br>
                        <small style="color: #666;">I'm here to listen and provide support. How are you feeling today?</small>
                    </div>
                </div>
                
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <input type="text" id="aiInput" placeholder="Share how you're feeling..." 
                           style="flex: 1; padding: 12px 15px; border: 2px solid #ddd; border-radius: 8px; 
                                  font-size: 14px; color: #333;"
                           onkeypress="handleAIInputKeypress(event)">
                    <button onclick="sendAIMessage()" 
                            style="background: #5a4241; color: white; border: none; padding: 12px 24px; 
                                   border-radius: 8px; cursor: pointer; font-weight: bold;
                                   transition: background 0.3s; min-width: 100px;"
                            onmouseover="this.style.background='#7a5c58'"
                            onmouseout="this.style.background='#5a4241'">
                        Send
                    </button>
                </div>
                
                <div style="margin-top: 25px;">
                    <p style="color: #5a4241; font-weight: bold; margin-bottom: 10px;">Quick emotions:</p>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${Object.keys(responses).filter(k => k !== 'default').map(key => 
                            `<button onclick="sendQuickMessage('${key}')" 
                                    style="background: ${getEmotionColor(key)}; color: white; border: none; 
                                           padding: 8px 16px; border-radius: 20px; cursor: pointer; font-size: 13px;
                                           transition: transform 0.2s;"
                                    onmouseover="this.style.transform='translateY(-2px)'"
                                    onmouseout="this.style.transform='translateY(0)'">
                                ${getEmotionEmoji(key)} ${capitalizeFirstLetter(key)}
                            </button>`
                        ).join('')}
                    </div>
                </div>
                
                <div style="margin-top: 25px; border-top: 1px solid #eee; padding-top: 15px;">
                    <p style="color: #5a4241; font-weight: bold; margin-bottom: 10px;">Suggested topics:</p>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        <button onclick="suggestTopic('coping strategies')" class="topic-btn">Coping Strategies</button>
                        <button onclick="suggestTopic('mindfulness')" class="topic-btn">Mindfulness</button>
                        <button onclick="suggestTopic('sleep tips')" class="topic-btn">Sleep Tips</button>
                        <button onclick="suggestTopic('stress management')" class="topic-btn">Stress Management</button>
                        <button onclick="suggestTopic('self care')" class="topic-btn">Self Care</button>
                        <button onclick="suggestTopic('anxiety relief')" class="topic-btn">Anxiety Relief</button>
                    </div>
                </div>
            </div>
            
            <div style="text-align: center; color: #888; font-size: 12px; margin-top: 15px;">
                <i class="bi bi-info-circle"></i> This AI assistant provides general mental health support. 
                For emergencies, please contact a professional.
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    
    // إضافة الأنماط
    addAIChatStyles();
}

function addAIChatStyles() {
    const style = document.createElement('style');
    style.textContent = `
        #aiChatMessages::-webkit-scrollbar {
            width: 6px;
        }
        #aiChatMessages::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }
        #aiChatMessages::-webkit-scrollbar-thumb {
            background: #8c7473;
            border-radius: 10px;
        }
        .user-message {
            background: #5a4241;
            color: white;
            padding: 12px 15px;
            border-radius: 15px 15px 5px 15px;
            margin: 8px 0;
            max-width: 70%;
            margin-left: auto;
            text-align: left;
            word-wrap: break-word;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .ai-message {
            background: #e8f4f8;
            color: #333;
            padding: 12px 15px;
            border-radius: 15px 15px 15px 5px;
            margin: 8px 0;
            max-width: 70%;
            text-align: left;
            word-wrap: break-word;
            border-left: 4px solid #8c7473;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        .topic-btn {
            background: #f0f0f0;
            color: #5a4241;
            border: 1px solid #ddd;
            padding: 6px 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.3s;
        }
        .topic-btn:hover {
            background: #5a4241;
            color: white;
        }
        .typing-indicator {
            display: inline-block;
            background: #e8f4f8;
            color: #666;
            padding: 8px 15px;
            border-radius: 15px 15px 15px 5px;
            font-style: italic;
        }
        .typing-dots span {
            animation: typing 1.4s infinite;
            display: inline-block;
        }
        .typing-dots span:nth-child(2) {
            animation-delay: 0.2s;
        }
        .typing-dots span:nth-child(3) {
            animation-delay: 0.4s;
        }
        @keyframes typing {
            0%, 60%, 100% { opacity: 0.3; }
            30% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

function getEmotionColor(emotion) {
    const colors = {
        'stress': '#e74c3c',
        'anxious': '#f39c12',
        'sad': '#3498db',
        'tired': '#95a5a6',
        'angry': '#e67e22',
        'happy': '#2ecc71',
        'overwhelmed': '#9b59b6',
        'lonely': '#34495e',
        'confused': '#1abc9c',
        'proud': '#f1c40f'
    };
    return colors[emotion] || '#8c7473';
}

function getEmotionEmoji(emotion) {
    const emojis = {
        'stress': '😫',
        'anxious': '😰',
        'sad': '😔',
        'tired': '😴',
        'angry': '😠',
        'happy': '😊',
        'overwhelmed': '😵',
        'lonely': '😞',
        'confused': '😕',
        'proud': '😌'
    };
    return emojis[emotion] || '💭';
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function handleAIInputKeypress(event) {
    if (event.key === 'Enter') {
        sendAIMessage();
    }
}

function sendAIMessage() {
    const input = document.getElementById('aiInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    const chat = document.getElementById('aiChatMessages');
    
    // إضافة رسالة المستخدم باللون الأسود
    chat.innerHTML += `
        <div class="user-message">
            <strong>You:</strong> ${message}
        </div>
    `;
    
    // حفظ الرسالة الأصلية
    const originalMessage = message;
    
    // تفريغ حقل الإدخال فوراً
    input.value = '';
    
    // إظهار مؤشر الكتابة
    chat.innerHTML += `
        <div class="typing-indicator">
            <span class="typing-dots">
                AI is typing<span>.</span><span>.</span><span>.</span>
            </span>
        </div>
    `;
    chat.scrollTop = chat.scrollHeight;
    
    // محاكاة تأخير للرد
    setTimeout(() => {
        // إزالة مؤشر الكتابة
        const typingIndicators = chat.querySelectorAll('.typing-indicator');
        typingIndicators.forEach(indicator => indicator.remove());
        
        // توليد رد ذكي
        let response = generateAIResponse(originalMessage);
        
        // إضافة رد المساعد
        chat.innerHTML += `
            <div class="ai-message">
                <strong><i class="bi bi-robot"></i> Assistant:</strong> ${response}
            </div>
        `;
        
        chat.scrollTop = chat.scrollHeight;
        
        // حفظ المحادثة
        saveChatHistory(originalMessage, response);
        
    }, 1000 + Math.random() * 1000); // تأخير عشوائي بين 1-2 ثانية
}

function generateAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // تحليل المشاعر باستخدام كلمات مفتاحية
    if (lowerMessage.includes('stress') || lowerMessage.includes('stressed') || lowerMessage.includes('pressure')) {
        return responses.stress;
    } else if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('panic') || lowerMessage.includes('worried')) {
        return responses.anxious;
    } else if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('depression') || lowerMessage.includes('unhappy')) {
        return responses.sad;
    } else if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted') || lowerMessage.includes('fatigue') || lowerMessage.includes('sleepy')) {
        return responses.tired;
    } else if (lowerMessage.includes('angry') || lowerMessage.includes('mad') || lowerMessage.includes('furious') || lowerMessage.includes('rage')) {
        return responses.angry;
    } else if (lowerMessage.includes('happy') || lowerMessage.includes('good') || lowerMessage.includes('great') || lowerMessage.includes('joy')) {
        return responses.happy;
    } else if (lowerMessage.includes('overwhelmed') || lowerMessage.includes('too much') || lowerMessage.includes('can\'t handle')) {
        return responses.overwhelmed;
    } else if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || lowerMessage.includes('isolated')) {
        return responses.lonely;
    } else if (lowerMessage.includes('confused') || lowerMessage.includes('confusion') || lowerMessage.includes('not sure')) {
        return responses.confused;
    } else if (lowerMessage.includes('proud') || lowerMessage.includes('accomplish') || lowerMessage.includes('achievement')) {
        return responses.proud;
    } else if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('need')) {
        return "I'm here to help you. Can you tell me more about what's bothering you?";
    } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
        return "You're welcome! I'm glad I could help. Remember, I'm always here when you need to talk.";
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return "Hello! How are you feeling today? I'm here to listen and support you.";
    } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
        return "Take care of yourself! Remember to practice self-care. Come back anytime you need to talk.";
    } else {
        // رد أكثر ذكاءً بناءً على تحليل النص
        if (lowerMessage.includes('?')) {
            return "That's an important question. Let me think about how best to support you with that...";
        } else if (message.length < 10) {
            return "I sense you might be having a hard time putting your feelings into words. That's okay. Take your time.";
        } else {
            // تحليل أكثر تقدماً
            const words = lowerMessage.split(' ');
            const positiveWords = ['good', 'better', 'improve', 'happy', 'great', 'fine', 'okay'];
            const negativeWords = ['bad', 'worse', 'hard', 'difficult', 'struggle', 'pain', 'hurt'];
            
            const positiveCount = words.filter(word => positiveWords.includes(word)).length;
            const negativeCount = words.filter(word => negativeWords.includes(word)).length;
            
            if (positiveCount > negativeCount) {
                return "It sounds like you're having a relatively positive day. That's great! What's helping you feel this way?";
            } else if (negativeCount > positiveCount) {
                return "I hear that you're going through a tough time. Would you like to talk more about what's challenging?";
            } else {
                return responses.default;
            }
        }
    }
}

function sendQuickMessage(feeling) {
    const quickMessages = {
        'stress': "I'm feeling stressed and overwhelmed",
        'anxious': "I'm feeling anxious and worried",
        'sad': "I'm feeling sad and low",
        'tired': "I'm feeling tired and exhausted",
        'angry': "I'm feeling angry and frustrated",
        'happy': "I'm feeling happy and content!",
        'overwhelmed': "I'm feeling completely overwhelmed",
        'lonely': "I'm feeling lonely and isolated",
        'confused': "I'm feeling confused and uncertain",
        'proud': "I'm feeling proud of my progress"
    };
    
    document.getElementById('aiInput').value = quickMessages[feeling];
    sendAIMessage();
}

function suggestTopic(topic) {
    const topicMessages = {
        'coping strategies': "Can you suggest some coping strategies for difficult emotions?",
        'mindfulness': "I'd like to learn more about mindfulness practices",
        'sleep tips': "I'm having trouble sleeping. Any tips?",
        'stress management': "How can I better manage my stress levels?",
        'self care': "What are some good self-care activities I can try?",
        'anxiety relief': "What can help with anxiety in the moment?"
    };
    
    document.getElementById('aiInput').value = topicMessages[topic];
    sendAIMessage();
}

function saveChatHistory(userMessage, aiResponse) {
    try {
        let chatHistory = JSON.parse(localStorage.getItem('aiChatHistory') || '[]');
        chatHistory.push({
            timestamp: new Date().toISOString(),
            user: userMessage,
            ai: aiResponse
        });
        
        // حفظ آخر 50 رسالة فقط
        if (chatHistory.length > 50) {
            chatHistory = chatHistory.slice(-50);
        }
        
        localStorage.setItem('aiChatHistory', JSON.stringify(chatHistory));
    } catch (e) {
        console.log("Could not save chat history");
    }
}

function loadChatHistory() {
    try {
        const chatHistory = JSON.parse(localStorage.getItem('aiChatHistory') || '[]');
        const chat = document.getElementById('aiChatMessages');
        
        chat.innerHTML = `
            <div style="color: #5a4241; text-align: center; padding: 20px;">
                <i class="bi bi-robot" style="font-size: 32px; color: #8c7473; margin-bottom: 10px;"></i><br>
                <strong style="font-size: 16px;">AI Mental Health Assistant</strong><br>
                <small style="color: #666;">Continuing our conversation...</small>
            </div>
        `;
        
        chatHistory.forEach(entry => {
            chat.innerHTML += `
                <div class="user-message">
                    <strong>You:</strong> ${entry.user}
                </div>
                <div class="ai-message">
                    <strong><i class="bi bi-robot"></i> Assistant:</strong> ${entry.ai}
                </div>
            `;
        });
        
        chat.scrollTop = chat.scrollHeight;
    } catch (e) {
        console.log("Could not load chat history");
    }
}

// تهيئة المحادثة عند التحميل
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // تحميل تاريخ المحادثة إذا كان موجوداً
        setTimeout(loadChatHistory, 500);
    });
} else {
    setTimeout(loadChatHistory, 500);
}
// 3️⃣ Mood Tracking
function loadMoodTracking(container) {
    const today = new Date().toISOString().split('T')[0];
    const todayMood = moods[today] || 'Not recorded yet';
    
    let html = `
        <div style="text-align: center;">
            <h3>How are you feeling today?</h3>
            <p style="margin-bottom: 30px;">Select your current mood:</p>
            
            <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 20px; margin-bottom: 40px;">
                <button class="mood-btn" onclick="recordMood('😊', 'Happy')">😊 Happy</button>
                <button class="mood-btn" onclick="recordMood('😐', 'Neutral')">😐 Neutral</button>
                <button class="mood-btn" onclick="recordMood('😔', 'Sad')">😔 Sad</button>
                <button class="mood-btn" onclick="recordMood('😡', 'Angry')">😡 Angry</button>
                <button class="mood-btn" onclick="recordMood('😴', 'Tired')">😴 Tired</button>
                <button class="mood-btn" onclick="recordMood('😰', 'Anxious')">😰 Anxious</button>
            </div>
            
            <div id="moodAnimation" style="font-size: 80px; height: 100px; margin: 20px 0;"></div>
            
            <div style="background: #a69d9dff; padding: 20px; border-radius: 12px; margin-top: 30px;">
                <h4>📊 Your Mood History</h4>
                <div id="moodHistory" style="margin-top: 15px;"></div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    updateMoodHistory();
}

function recordMood(emoji, label) {
    const today = new Date().toISOString().split('T')[0];
    moods[today] = { emoji, label, time: new Date().toLocaleTimeString() };
    localStorage.setItem('moods', JSON.stringify(moods));
    
    // عرض أنيميشن
    const animationDiv = document.getElementById('moodAnimation');
    animationDiv.innerHTML = emoji;
    animationDiv.style.animation = 'fadeIn 0.5s';
    
    setTimeout(() => {
        animationDiv.innerHTML = `Recorded: ${label} ${emoji}`;
        updateMoodHistory();
    }, 1000);
}

function updateMoodHistory() {
    const historyDiv = document.getElementById('moodHistory');
    if (!historyDiv) return;
    
    const moodEntries = Object.entries(moods).slice(-7); // آخر 7 أيام
    
    if (moodEntries.length === 0) {
        historyDiv.innerHTML = '<p style="color: #666;">No mood records yet. Select a mood above!</p>';
        return;
    }
    
    let html = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">';
    
    moodEntries.reverse().forEach(([date, mood]) => {
        html += `
            <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <div style="font-size: 30px; margin-bottom: 5px;">${mood.emoji}</div>
                <div><strong>${mood.label}</strong></div>
                <div style="font-size: 12px; color: #666;">${date}</div>
                <div style="font-size: 11px; color: #888;">${mood.time}</div>
            </div>
        `;
    });
    
    html += '</div>';
    historyDiv.innerHTML = html;
}

// 4️⃣ Stress Management
function loadStressManagement(container) {
    let html = `
        <div style="display: grid; gap: 25px;">
            <!-- To-Do List -->
            <div style="background: #5a4241; padding: 25px; border-radius: 12px;">
                <h3><i class="bi bi-list-check"></i> Simplify Your Tasks</h3>
                <p>Break down overwhelming tasks into manageable steps:</p>
                
                <div style="display: flex; gap: 10px; margin: 15px 0;">
                    <input type="text" id="todoInput" placeholder="Add a simple task..." 
                           style="flex: 1; padding: 10px; border: 2px solid #8c7473; border-radius: 6px;">
                    <button onclick="addTodoItem()" 
                            style="background: #8c7473; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
                        Add
                    </button>
                </div>
                
                <ul id="todoList" class="todo-list"></ul>
            </div>
            
            <!-- Timer -->
            <div style="background: #5a4241; padding: 25px; border-radius: 12px;">
                <h3><i class="bi bi-clock"></i> Take a Break Timer</h3>
                <p>Set a timer for a 10-minute walk or stretch:</p>
                
                <div class="timer-display" id="timerDisplay">10:00</div>
                
                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button onclick="startTimer(600)" 
                            style="background: #8c7473; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer;">
                        Start 10 min
                    </button>
                    <button onclick="startTimer(300)" 
                            style="background: #a1887f; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer;">
                        Start 5 min
                    </button>
                    <button onclick="resetTimer()" 
                            style="background: #917b73ff; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer;">
                        Reset
                    </button>
                </div>
            </div>
            
            <!-- Water Tracker -->
            <div style="background: #5a4241; padding: 25px; border-radius: 12px;">
                <h3><i class="bi bi-cup"></i> Hydration Challenge</h3>
                <p>Track your water intake for today:</p>
                
                <div style="text-align: center; margin: 25px 0;">
                    <div style="font-size: 48px; color: #8c7473;" id="waterCounter">${waterCount}</div>
                    <div>glasses today</div>
                </div>
                
                <button onclick="addWater()" 
                        style="background: #8c7473; color: white; border: none; padding: 15px 30px; font-size: 18px; border-radius: 8px; cursor: pointer; width: 100%;">
                    + Add Glass of Water
                </button>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    loadTodoList();
    // تحديث عداد الماء عند التحميل
    document.getElementById('waterCounter').textContent = waterCount;
}

function addTodoItem() {
    const input = document.getElementById('todoInput');
    if (!input.value.trim()) return;
    
    const list = document.getElementById('todoList');
    const item = document.createElement('li');
    
    item.innerHTML = `
        <span>${input.value}</span>
        <button onclick="this.parentElement.remove()" 
                style="background: #a1887f; color: white; border: none; border-radius: 4px; padding: 5px 10px; cursor: pointer;">
            ✓
        </button>
    `;
    
    list.appendChild(item);
    input.value = '';
}

function loadTodoList() {
    const list = document.getElementById('todoList');
    if (list && list.children.length === 0) {
        list.innerHTML = '<p style="color: #666; text-align: center;">Add your first task above!</p>';
    }
}

function startTimer(seconds) {
    clearInterval(timerInterval);
    
    let timeLeft = seconds;
    const timerDisplay = document.getElementById('timerDisplay');
    
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        
        timerDisplay.textContent = `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        timerDisplay.style.color = timeLeft < 60 ? '#f44336' : '#8c7473';
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Time's up! 🎉";
            alert("Break time is over! Good job taking care of yourself.");
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById('timerDisplay').textContent = "10:00";
    document.getElementById('timerDisplay').style.color = "#8c7473";
}

function addWater() {
    waterCount++;
    localStorage.setItem('waterCount', waterCount);
    const counter = document.getElementById('waterCounter');
    if (counter) {
        counter.textContent = waterCount;
        counter.style.transform = 'scale(1.2)';
        setTimeout(() => counter.style.transform = 'scale(1)', 300);
    }
}

// 5️⃣ Mindfulness
function loadMindfulness(container) {
    let html = `
        <div style="text-align: center;">
            <h3>Mindfulness & Meditation</h3>
            <p style="margin-bottom: 30px; font-size: 18px;color: #5a4241;">
                Take a few minutes to center yourself with these exercises.
            </p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 25px; margin: 40px 0;">
                <!-- Breathing Exercise -->
                <div style="background: #fff; padding: 25px; border-radius: 12px;color : #5a4241;">
                    <h4><i class="bi bi-wind"></i> Breathing Exercise</h4>
                    <div style="margin: 20px 0; ">
                        <div style="font-size: 24px; color: #5a4241;" id="breathText">Breathe In</div>
                        <div style="width: 150px; height: 150px; border-radius: 50%; border: 4px solid #5a4241; margin: 20px auto; position: relative;" id="breathCircle">
                            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 20px; color: #946e6dff;" id="breathTimer">4</div>
                        </div>
                    </div>
                    <button onclick="startBreathing()" 
                            style="background: #5a4241; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer;">
                        Start Breathing Exercise
                    </button>
                </div>
        
        </div>
    `;
    
    container.innerHTML = html;
}

function startBreathing() {
    const breathText = document.getElementById('breathText');
    const breathTimer = document.getElementById('breathTimer');
    const breathCircle = document.getElementById('breathCircle');
    
    let cycle = 0;
    const totalCycles = 5;
    
    function breathAnimation(step) {
        if (cycle >= totalCycles) {
            breathText.textContent = "Exercise Complete!";
            breathTimer.textContent = "✓";
            breathCircle.style.borderColor = "#8c7473";
            return;
        }
        
        switch(step) {
            case 0: // Breathe In
                breathText.textContent = "Breathe In";
                breathTimer.textContent = "4";
                breathCircle.style.borderColor = "#8c7473";
                breathCircle.style.transform = "scale(1.2)";
                setTimeout(() => breathAnimation(1), 4000);
                break;
                
            case 1: // Hold
                breathText.textContent = "Hold";
                breathTimer.textContent = "4";
                breathCircle.style.borderColor = "#b69493ff";
                setTimeout(() => breathAnimation(2), 4000);
                break;
                
            case 2: // Breathe Out
                breathText.textContent = "Breathe Out";
                breathTimer.textContent = "6";
                breathCircle.style.borderColor = "#ccb0afff";
                breathCircle.style.transform = "scale(1)";
                setTimeout(() => {
                    cycle++;
                    breathAnimation(0);
                }, 6000);
                break;
        }
    }
    
    breathAnimation(0);
}

// 6️⃣ Self Tests
function loadSelfTests(container) {
    const questions = [
        "Do you often feel sad or down most of the day?",
        "Have you lost interest in activities you used to enjoy?",
        "Do you have trouble sleeping or sleep too much?",
        "Do you feel tired or low energy most days?",
        "Do you often feel anxious or worried?",
        "Do you find it hard to concentrate?",
        "Do you experience frequent headaches or physical tension?",
        "Do you avoid social situations more than usual?",
        "Do you feel hopeless about the future?"
    ];
    
    let html = `
        <div style="max-width: 700px; margin: 0 auto; color : #5a4241;">
            <h3 style="color: #5a4241;">Self-Assessment Quiz</h3>
            <div style="background: #aa9188ff; padding: 20px; border-radius: 12px; margin: 20px 0;color : #5a4241;">
                <p><strong>⚠️ Important:</strong> This is not a medical diagnosis. 
                It's a simple check-in tool. If you're concerned about your mental health, 
                please consult a professional.</p>
            </div>
            
            <div id="quizContainer">
                <form id="quizForm">
                    ${questions.map((q, i) => `
                        <div class="test-question" style="animation-delay: ${i * 0.1}s;">
                            <p><strong>${i+1}.</strong> ${q}</p>
                            <div style="display: flex; justify-content: center; gap: 20px; margin: 15px 0;">
                                <label style="cursor: pointer;">
                                    <input type="radio" name="q${i}" value="0" required> 
                                    Never
                                </label>
                                <label style="cursor: pointer;">
                                    <input type="radio" name="q${i}" value="1"> 
                                    Sometimes
                                </label>
                                <label style="cursor: pointer;">
                                    <input type="radio" name="q${i}" value="2"> 
                                    Often
                                </label>
                            </div>
                        </div>
                    `).join('')}
                </form>
            </div>
            
            <div style="text-align: center; margin-top: 40px;">
                <button onclick="calculateQuizScore()" 
                        style="background: #5a4241ff; color: white; border: none; padding: 15px 40px; font-size: 18px; border-radius: 8px; cursor: pointer;">
                    Get My Results
                </button>
            </div>
            
            <div id="quizResult" style="margin-top: 30px;"></div>
        </div>
    `;
    
    container.innerHTML = html;
    
    setTimeout(() => {
        document.querySelectorAll('.test-question').forEach((q, i) => {
            q.style.opacity = '1';
            q.style.transform = 'translateY(0)';
        });
    }, 100);
}

function calculateQuizScore() {
    const form = document.getElementById('quizForm');
    let score = 0;
    let answered = 0;
    
    for (let i = 0; i < 9; i++) {
        const selected = form.querySelector(`input[name="q${i}"]:checked`);
        if (selected) {
            score += parseInt(selected.value);
            answered++;
        }
    }
    
    if (answered < 9) {
        alert("Please answer all questions before submitting.");
        return;
    }
    
    let result = '';
    let color = '#5a4241';
    let suggestions = [];
    
    if (score <= 6) {
        result = 'Low stress level';
        color = '#5a4241';
        suggestions = [
            "Continue your good self-care habits",
            "Regular mood tracking can help maintain balance",
            "Try mindfulness exercises for prevention"
        ];
    } else if (score <= 12) {
        result = 'Medium stress level';
        color = '#8c7473';
        suggestions = [
            "Consider trying stress management techniques",
            "Regular breaks and hydration can help",
            "Mindfulness exercises may be beneficial"
        ];
    } else {
        result = 'High stress level';
        color = '#f44336';
        suggestions = [
            "Consider talking to a mental health professional",
            "Practice daily mindfulness and self-care",
            "Use the emergency resources if needed"
        ];
    }
    
    const resultDiv = document.getElementById('quizResult');
    resultDiv.innerHTML = `
        <div style="background: ${color}20; border-left: 4px solid ${color}; padding: 25px; border-radius: 8px;">
            <h3 style="color: ${color}; margin-top: 0;">Your Result: ${result}</h3>
            <p><strong>Score:</strong> ${score} out of 18</p>
            <p><strong>Suggestions:</strong></p>
            <ul style="text-align: left;">
                ${suggestions.map(s => `<li>${s}</li>`).join('')}
            </ul>
            <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 6px;">
                <p style="font-size: 14px; color: #666;">
                    <i class="bi bi-info-circle"></i> 
                    Remember: This is not a clinical diagnosis. If you're concerned about your mental health, 
                    please speak with a healthcare provider.
                </p>
            </div>
        </div>
    `;
    
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}
// 7️⃣ Therapy Videos
let videoSeries = [
    {
        title: "Anxiety Management",
        videos: [
            { id: 0, title: "Understanding Anxiety", youtubeId: "xHweDBgDsEQ", unlocked: true },
            { id: 1, title: "Coping Techniques", youtubeId: "db3K8b3ftaY", unlocked: false },
            { id: 2, title: "Breathing Exercises", youtubeId: "lZeZQvyxyyU", unlocked: false }
        ]
    },
    {
        title: "Mindfulness",
        videos: [
            { id: 3, title: "Beginner's Guide", youtubeId: "oYdrMpnE93s", unlocked: true },
            { id: 4, title: "Daily Practice", youtubeId: "NECs97k_8Z4", unlocked: false }
        ]
    }
];

let currentVideoInfo = {
    seriesIndex: -1,
    videoIndex: -1
};

let currentContainer = null;

function loadTherapyVideos(container) {
    currentContainer = container;
    
    // محاولة جلب التقدم المحفوظ من localStorage
    try {
        const savedProgress = localStorage.getItem('therapyVideosProgress');
        if (savedProgress) {
            const parsed = JSON.parse(savedProgress);
            // تحديث حالة الفتح/القفل فقط
            videoSeries.forEach((series, sIndex) => {
                if (parsed[sIndex]) {
                    series.videos.forEach((video, vIndex) => {
                        if (parsed[sIndex].videos[vIndex]) {
                            video.unlocked = parsed[sIndex].videos[vIndex].unlocked;
                        }
                    });
                }
            });
        }
    } catch (e) {
        console.log("Could not load saved progress, using default");
    }
    
    let html = `
        <div style="text-align: center;">
            <h3>Therapy & Educational Videos</h3>
            <p style="margin-bottom: 30px;">
                Watch these videos to learn coping techniques. Complete one video to unlock the next in the series.
            </p>
            
            ${videoSeries.map((series, seriesIndex) => `
                <div style="margin-bottom: 40px;">
                    <h4 style="color: #a1887f; text-align: left; margin-bottom: 20px;">
                        ${series.title}
                    </h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;">
                        ${series.videos.map((video, videoIndex) => `
                            <div class="video-card ${video.unlocked ? '' : 'locked'}" 
                                 onclick="${video.unlocked ? `playVideoSimple(${seriesIndex}, ${videoIndex})` : ''}"
                                 style="width: 200px; padding: 20px; border-radius: 12px; 
                                        background: ${video.unlocked ? '#f5f5f5' : '#eee'}; 
                                        cursor: ${video.unlocked ? 'pointer' : 'not-allowed'};
                                        border: 2px solid ${video.unlocked ? '#5a4241' : '#ccc'};
                                        transition: all 0.3s;">
                                ${video.unlocked ? `
                                    <div>
                                        <i class="bi bi-play-circle" style="font-size: 40px; color: #5a4241; margin-bottom: 10px;"></i>
                                        <div style="font-weight: bold; color: #5a4241;">${video.title}</div>
                                    </div>
                                ` : `
                                    <div>
                                        <i class="bi bi-lock" style="font-size: 40px; color: #999; margin-bottom: 10px;"></i>
                                        <div style="color: #999;">${video.title}</div>
                                        <small style="color: #999;">Complete previous video</small>
                                    </div>
                                `}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
            
            <div id="videoPlayerContainer" style="display: none; margin-top: 40px;">
                <h4 id="videoTitle" style="color: #5a4241; margin-bottom: 20px;"></h4>
                <div style="position: relative; width: 100%; max-width: 800px; margin: 0 auto;">
                    <div id="videoPlayer" style="width: 100%; height: 450px; border-radius: 12px; 
                                                box-shadow: 0 4px 12px rgba(0,0,0,0.1); 
                                                background: #000; position: relative; overflow: hidden;">
                        <div id="videoPlaceholder" style="display: flex; align-items: center; justify-content: center; 
                                                          width: 100%; height: 100%; color: white; font-size: 18px;">
                            Loading video...
                        </div>
                    </div>
                    <button onclick="completeVideo()" 
                            style="position: absolute; top: 10px; right: 10px; background: #5a4241; color: white; 
                                   border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;
                                   font-weight: bold; transition: background 0.3s; z-index: 1000;"
                            onmouseover="this.style.background='#7a5c58'"
                            onmouseout="this.style.background='#5a4241'">
                        ✓ Mark Complete
                    </button>
                    <button onclick="closeVideoPlayer()" 
                            style="position: absolute; top: 10px; left: 10px; background: #777; color: white; 
                                   border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;
                                   font-weight: bold; transition: background 0.3s; z-index: 1000;"
                            onmouseover="this.style.background='#555'"
                            onmouseout="this.style.background='#777'">
                        ✕ Close
                    </button>
                    <button onclick="resetVideoProgress()" 
                            style="position: absolute; top: 50px; right: 10px; background: #dc3545; color: white; 
                                   border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer;
                                   font-size: 12px; transition: background 0.3s; z-index: 1000;"
                            onmouseover="this.style.background='#c82333'"
                            onmouseout="this.style.background='#dc3545'">
                        Reset Progress
                    </button>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    
    // تحميل الأنماط
    addVideoStyles();
}

// بديل أبسط: استخدام iframe مباشرة
function playVideoSimple(seriesIndex, videoIndex) {
    try {
        const container = document.getElementById('videoPlayerContainer');
        const videoTitle = document.getElementById('videoTitle');
        const videoPlayer = document.getElementById('videoPlayer');
        const videoPlaceholder = document.getElementById('videoPlaceholder');
        
        if (!container || !videoTitle || !videoPlayer) {
            console.error('Required elements not found');
            return;
        }
        
        const videoData = videoSeries[seriesIndex].videos[videoIndex];
        
        // تحديث العنوان
        videoTitle.textContent = videoData.title;
        container.style.display = 'block';
        
        // حفظ معلومات الفيديو الحالي
        currentVideoInfo.seriesIndex = seriesIndex;
        currentVideoInfo.videoIndex = videoIndex;
        
        // إظهار عنصر التحميل
        if (videoPlaceholder) {
            videoPlaceholder.style.display = 'flex';
        }
        
        // إنشاء رابط YouTube الصحيح
        const embedUrl = `https://www.youtube.com/embed/${videoData.youtubeId}?autoplay=1&rel=0&modestbranding=1`;
        
        // تنظيف المشغل السابق
        videoPlayer.innerHTML = `
            <iframe width="100%" height="100%" 
                    src="${embedUrl}"
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                    style="border-radius: 12px; border: none;">
            </iframe>
            <div id="videoPlaceholder" style="display: none; align-items: center; justify-content: center; 
                                              width: 100%; height: 100%; color: white; font-size: 18px;
                                              position: absolute; top: 0; left: 0;">
                Loading video...
            </div>
        `;
        
        // إخفاء عنصر التحميل بعد وقت قصير
        setTimeout(() => {
            const placeholder = document.getElementById('videoPlaceholder');
            if (placeholder) {
                placeholder.style.display = 'none';
            }
        }, 1000);
        
        // التمرير إلى الفيديو
        container.scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error playing video:', error);
        alert('Error loading video. Please try again.');
    }
}

function openVideoInNewTab(youtubeId) {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
}

function completeVideo() {
    const { seriesIndex, videoIndex } = currentVideoInfo;
    
    if (seriesIndex === -1 || videoIndex === -1) {
        alert("No video is currently playing!");
        return;
    }
    
    // فتح الفيديو التالي في نفس السلسلة
    const series = videoSeries[seriesIndex];
    const nextVideoIndex = videoIndex + 1;
    
    if (nextVideoIndex < series.videos.length) {
        series.videos[nextVideoIndex].unlocked = true;
        
        // حفظ التقدم في localStorage
        try {
            localStorage.setItem('therapyVideosProgress', JSON.stringify(videoSeries));
        } catch (e) {
            console.log("Could not save to localStorage");
        }
        
        // إخفاء مشغل الفيديو
        const container = document.getElementById('videoPlayerContainer');
        if (container) {
            container.style.display = 'none';
        }
        
        // عرض رسالة
        setTimeout(() => {
            alert("Great job completing this video! The next video in the series is now unlocked.");
            
            // إعادة تحميل القائمة لتظهر التغييرات
            if (currentContainer) {
                loadTherapyVideos(currentContainer);
            }
            
            // فتح الفيديو التالي بعد لحظة
            setTimeout(() => {
                playVideoSimple(seriesIndex, nextVideoIndex);
            }, 500);
        }, 300);
        
    } else {
        // إذا كان هذا آخر فيديو في السلسلة
        alert("Congratulations! You've completed all videos in this series!");
        const container = document.getElementById('videoPlayerContainer');
        if (container) {
            container.style.display = 'none';
        }
    }
}

function closeVideoPlayer() {
    const container = document.getElementById('videoPlayerContainer');
    if (container) {
        container.style.display = 'none';
    }
}

// إضافة CSS للفيديوهات
function addVideoStyles() {
    if (document.getElementById('video-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'video-styles';
    style.textContent = `
        .video-card {
            transition: transform 0.3s, box-shadow 0.3s;
        }
        .video-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 16px rgba(0,0,0,0.15);
        }
        .video-card.locked {
            opacity: 0.7;
        }
        .video-card.locked:hover {
            transform: none;
            box-shadow: none;
        }
        #videoPlayerContainer {
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}

// دالة لإعادة تعيين التقدم
function resetVideoProgress() {
    if (confirm("Are you sure you want to reset all video progress? This cannot be undone.")) {
        try {
            localStorage.removeItem('therapyVideosProgress');
        } catch (e) {
            console.log("Could not remove from localStorage");
        }
        
        // إعادة تعيين الفيديوهات إلى الحالة الافتراضية
        videoSeries = [
            {
                title: "Anxiety Management",
                videos: [
                    { id: 0, title: "Understanding Anxiety", youtubeId: "xHweDBgDsEQ", unlocked: true },
                    { id: 1, title: "Coping Techniques", youtubeId: "db3K8b3ftaY", unlocked: false },
                    { id: 2, title: "Breathing Exercises", youtubeId: "lZeZQvyxyyU", unlocked: false }
                ]
            },
            {
                title: "Mindfulness",
                videos: [
                    { id: 3, title: "Beginner's Guide", youtubeId: "oYdrMpnE93s", unlocked: true },
                    { id: 4, title: "Daily Practice", youtubeId: "NECs97k_8Z4", unlocked: false }
                ]
            }
        ];
        
        if (currentContainer) {
            loadTherapyVideos(currentContainer);
        }
        
        // إخفاء مشغل الفيديو
        const container = document.getElementById('videoPlayerContainer');
        if (container) {
            container.style.display = 'none';
        }
        
        alert("Video progress has been reset to default.");
    }
}

// إذا كان هناك مشكلة في localStorage، استخدم نظام بديل
function checkLocalStorage() {
    try {
        const test = '__test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        console.log('localStorage is not available');
        return false;
    }
}

// تهيئة النظام
function initVideoSystem() {
    // تحقق من localStorage
    if (!checkLocalStorage()) {
        console.log('Using fallback storage system');
        // يمكنك إضافة نظام تخزين بديل هنا
    }
    
    // تحميل الأنماط
    addVideoStyles();
    
    // تعيين الدالة الرئيسية لتشغيل الفيديو
    window.playVideo = playVideoSimple;
}

// استدعاء التهيئة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideoSystem);
} else {
    initVideoSystem();
}

// إضافة معلومات تصحيح
console.log("Therapy Videos module loaded successfully");
// 8️⃣ AI Reports
function loadAIReports(container) {
    let html = `
        <div style="text-align: center;color : #5a4241;">
            <h3>Your Mental Health Report</h3>
            <p style="margin-bottom: 30px;color : #5a4241;">
                Get personalized insights based on your mood tracking and activities.
            </p>
            
            <button onclick="generateReport()" 
                    style="background: #5a4241; color: white; border: none; padding: 15px 40px; font-size: 18px; border-radius: 8px; cursor: pointer; margin-bottom: 30px;">
                Generate Weekly Report
            </button>
            
            <div id="reportContent" style="background: #a1887f; padding: 30px; border-radius: 12px; text-align: left; display: none;">
                <!-- سيتم ملء المحتوى هنا -->
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

function generateReport() {
    const moodEntries = Object.entries(moods);
    const reportDiv = document.getElementById('reportContent');
    
    if (moodEntries.length === 0) {
        reportDiv.innerHTML = `
            <div style="text-align: center; padding: 40px;color : #5a4241;">
                <i class="bi bi-bar-chart" style="font-size: 48px; color: #5a4241;"></i>
                <h3>No Data Yet</h3>
                <p>Start tracking your mood to generate a personalized report.</p>
            </div>
        `;
        reportDiv.style.display = 'block';
        reportDiv.scrollIntoView({ behavior: 'smooth' });
        return;
    }
    
    const moodCounts = { '😊':0, '😐':0, '😔':0, '😡':0, '😴':0, '😰':0 };
    moodEntries.forEach(([date, mood]) => {
        moodCounts[mood.emoji] = (moodCounts[mood.emoji] || 0) + 1;
    });
    
    const total = moodEntries.length;
    const mostCommonMood = Object.entries(moodCounts).reduce((a,b) => b[1] > a[1] ? b : a)[0];
    
    let tips = [];
    if (mostCommonMood === '😊') {
        tips = ["Keep up the great work!", "Continue practicing self-care", "Share positive habits with others"];
    } else if (mostCommonMood === '😔' || mostCommonMood === '😡') {
        tips = ["Try mindfulness exercises", "Consider talking to someone", "Use stress management tools"];
    } else {
        tips = ["Regular mood tracking helps", "Balance is key - try different activities", "Stay hydrated and take breaks"];
    }
    
    const reportHTML = `
        <div style="animation: fadeIn 1s;">
            <h3 style="color: #5a4241; text-align: center;">Your Weekly Insights</h3>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 30px 0;">
                <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 36px;color : #5a4241;">${total}</div>
                    <div>Days Tracked</div>
                </div>
                
                <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 36px;color : #5a4241;">${mostCommonMood}</div>
                    <div>Most Common Mood</div>
                </div>
                
                <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 36px;color : #5a4241;">${Math.round((moodCounts['😊'] / total) * 100) || 0}%</div>
                    <div>Positive Days</div>
                </div>
            </div>
            
            <div style="background: white; padding: 25px; border-radius: 8px; margin: 20px 0;color : #5a4241;">
                <h4><i class="bi bi-lightbulb"></i> Personalized Suggestions</h4>
                <ul>
                    ${tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
            
            <div style="background: white; padding: 25px; border-radius: 8px;color : #5a4241;">
                <h4><i class="bi bi-bar-chart"></i> Mood Distribution</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 15px;">
                    ${Object.entries(moodCounts).filter(([_, count]) => count > 0).map(([emoji, count]) => `
                        <div style="flex: 1; min-width: 100px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                <span>${emoji}</span>
                                <span>${count}</span>
                            </div>
                            <div style="background: #f0f0f0; border-radius: 4px; height: 10px;">
                                <div style="background: #5a4241; width: ${(count/total)*100}%; height: 100%; border-radius: 4px;"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #666; font-size: 14px;">
                    <i class="bi bi-info-circle"></i>
                    Report generated on ${new Date().toLocaleDateString()} • Keep tracking for better insights!
                </p>
            </div>
        </div>
    `;
    
    reportDiv.innerHTML = reportHTML;
    reportDiv.style.display = 'block';
    reportDiv.scrollIntoView({ behavior: 'smooth' });
}

// 9️⃣ Emergency Help
function loadEmergencyHelp(container) {
    const hotlines = [
        { country: "Egypt", services: [
            { name: "Police (نجدة)", number: "122" },
            { name: "Ambulance (إسعاف)", number: "123" },
            { name: "Fire Department (مطافئ)", number: "180" }
        ]}
        
    ];
    
    let html = `
        <div style="text-align: center;">
            <div style="background: #ffffffff; border: 3px solid #5a4e4eff; border-radius: 12px; padding: 30px; margin-bottom: 30px;">
                <h2 style="color: #5a4e4eff; margin-top: 0;">🚨 Emergency Help</h2>
                <p style="font-size: 20px; font-weight: bold;color : #5a4e4eff;">
                    If you're in crisis or feel unsafe, please seek immediate help.
                </p>
                <p style="font-size: 18px;color : ##5a4e4eff;">
                    Call emergency services or a trusted person right now.
                </p>
            </div>
            
            <div style="display: grid; gap: 25px;">
                ${hotlines.map(country => `
                    <div style="background: #ffffffff; border-radius: 12px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                        <h4 style="color: #5a4241; margin-top: 0;">${country.country}</h4>
                        <div style="display: grid; gap: 15px; color: #5a4241;">
                            ${country.services.map(service => `
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 15px; background: #f9f9f9; border-radius: 8px;">
                                    <span style="font-weight: bold; color: #5a4241;">${service.name}</span>
                                    <button onclick="callNumber('${service.number}')" 
                                            style="background: #5a4241; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
                                        ${service.number}
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
           
            
        
        </div>
    `;
    
    container.innerHTML = html;
}

function callNumber(number) {
    if (confirm(`Do you want to call ${number}?`)) {
        alert(`Calling ${number}... Please use your phone to make the call.`);
    }
}
document.getElementById('serviceModal').addEventListener('click', function(e) {
    if (e.target.id === 'serviceModal') {
        closeModal();
    }
});

// تهيئة عند تحميل الصفحة// ...existing code...

// ==================== CLOSE MODAL HANDLER ====================
document.addEventListener('DOMContentLoaded', function() {
  // Close modal when clicking close button
  document.addEventListener('click', function(e) {
    // Close button: any element with class close, close-btn, close-button
    if (e.target.closest('.close, .close-btn, .close-button, [data-close]')) {
      const modal = e.target.closest('.modal');
      if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
      }
      return;
    }

    // Close when clicking outside modal (on the overlay)
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
      e.target.classList.remove('active');
    }
  });

  // Close modal when pressing Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(modal => {
        if (modal.style.display === 'block' || modal.classList.contains('active')) {
          modal.style.display = 'none';
          modal.classList.remove('active');
        }
      });
    }
  });
});
 
//===================== Physical-Health-CARE ====================
// script.js - Physical Health & Rehabilitation System

// ===== المتغيرات العامة =====

let currentTimerSeconds = 0;
let rehabProgress = 0;
let reps = {
    beginner: 0,
    intermediate: 0,
    advanced: 0
};

// ===== دوال إدارة النوافذ =====

// عرض تفاصيل الخدمة
function showServiceDetail(serviceType) {
    const modal = document.getElementById('service-detail-modal');
    const title = document.getElementById('detail-title');
    const content = document.getElementById('detail-content');
    
    // تعيين العنوان والمحتوى بناءً على نوع الخدمة
    switch(serviceType) {
        case 'movement-therapy':
            title.innerHTML = '<i class="fas fa-walking"></i> Movement Therapy';
            content.innerHTML = getMovementTherapyContent();
            break;
        case 'pain-management':
            title.innerHTML = '<i class="fas fa-pills"></i> Pain Management';
            content.innerHTML = getPainManagementContent();
            break;
        case 'rehabilitation':
            title.innerHTML = '<i class="fas fa-sync-alt"></i> Rehabilitation';
            content.innerHTML = getRehabilitationContent();
            break;
        case 'posture-correction':
            title.innerHTML = '<i class="fas fa-user-check"></i> Posture Correction';
            content.innerHTML = getPostureCorrectionContent();
            break;
        case 'flexibility':
            title.innerHTML = '<i class="fas fa-arrows-alt-h"></i> Flexibility';
            content.innerHTML = getFlexibilityContent();
            break;
        case 'strength-training':
            title.innerHTML = '<i class="fas fa-dumbbell"></i> Strength Training';
            content.innerHTML = getStrengthTrainingContent();
            break;
        case 'physical-assessment':
            title.innerHTML = '<i class="fas fa-heartbeat"></i> Physical Assessment';
            content.innerHTML = getPhysicalAssessmentContent();
            break;
        case 'exercise-plans':
            title.innerHTML = '<i class="fas fa-calendar-alt"></i> Exercise Plans';
            content.innerHTML = getExercisePlansContent();
            break;
        case 'wellness-programs':
            title.innerHTML = '<i class="fas fa-shield-alt"></i> Wellness Programs';
            content.innerHTML = getWellnessProgramsContent();
            break;
        default:
            title.innerHTML = '<i class="fas fa-running"></i> Service Details';
            content.innerHTML = '<p>Service details not available.</p>';
    }
    
    // إظهار النافذة
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // إضافة تأثيرات CSS
    document.documentElement.style.setProperty('--modal-open', '1');
    
    // تسجيل الحدث في Analytics (محاكاة)
    logServiceView(serviceType);
}

// إغلاق نافذة التفاصيل
function closeServiceDetail() {
    const modal = document.getElementById('service-detail-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // إزالة تأثيرات CSS
    document.documentElement.style.removeProperty('--modal-open');
    
    // إيقاف أي تايمر نشط
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// ===== دوال المحتوى الديناميكي =====

// Movement Therapy Content
function getMovementTherapyContent() {
    return `
        <div class="detail-section" style="color: #5a4241;">
            <h3>Gentle Movement Exercises</h3>
            <p>Perform these exercises slowly and stop if you feel pain. Hold each position for 5-10 seconds.</p>
            
            <div class="detail-grid">
                <div class="detail-card" onclick="toggleCard(this)">
                    <div class="card-header">Neck Exercises</div>
                    <div class="card-content">
                        <p><strong>Instructions:</strong> Slowly tilt your head side to side, then rotate gently.</p>
                        <img src="https://www.verywellfit.com/thmb/DVpQXRRXIsN6lN_wOWKfpQMgfr8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Verywell-1-3567200-NeckRoll0-1379-5991bc7503f4020011a3d513.gif" alt="Neck exercise GIF">
                        <p><strong>Repetitions:</strong> 5 times each direction</p>
                        <p><strong>Benefits:</strong> Relieves neck tension, improves range of motion</p>
                    </div>
                </div>
                
                <div class="detail-card" onclick="toggleCard(this)">
                    <div class="card-header">Shoulder Exercises</div>
                    <div class="card-content">
                        <p><strong>Instructions:</strong> Roll shoulders forward and backward in circular motions.</p>
                        <img src="https://spotebi.com/wp-content/uploads/2015/03/shoulder-rolls-exercise-illustration.gif" alt="Shoulder rolls GIF">
                        <p><strong>Repetitions:</strong> 10 times each direction</p>
                        <p><strong>Benefits:</strong> Reduces shoulder stiffness, improves posture</p>
                    </div>
                </div>
                
                <div class="detail-card" onclick="toggleCard(this)">
                    <div class="card-header">Back Exercises</div>
                    <div class="card-content">
                        <p><strong>Instructions:</strong> Gently arch and round your back while seated or standing.</p>
                        <img src="https://cdn.jefit.com/assets/img/exercises/gifs/814.gif" alt="Back stretch GIF">
                        <p><strong>Repetitions:</strong> Hold for 10 seconds, repeat 5 times</p>
                        <p><strong>Benefits:</strong> Increases spinal flexibility, relieves back pain</p>
                    </div>
                </div>
            </div>
            
         
            
            <div class="big-card" style="background: #bda095ff; color: #5a4241;">
                <h4>Movement Therapy Tips</h4>
                <p>• Start with small movements and gradually increase range<br>
                • Focus on smooth, controlled motions<br>
                • Breathe deeply throughout each exercise<br>
                • Perform exercises in a comfortable, supported position</p>
            </div>
        </div>
    `;
}

function getPainManagementContent() {
    return `
        <div class="detail-section" style="color: #5a4241;">
            <h3>Pain Management Techniques</h3>
            <div class="warning" style="color: #5a4241; background-color: #b99e94ff; padding: 10px; border-radius: 5px; ">
                <i class="fas fa-exclamation-triangle"></i> Important: This is not a medical diagnosis. Always consult a healthcare professional for persistent pain.
            </div>
           
            <div class="detail-grid">
                <div class="detail-card">
                    <div class="card-header">Back Pain Relief</div>
                    <div class="card-content" style="display:block;">
                        <p><strong>Recommended Techniques:</strong></p>
                        <ul class="custom-list">
                            <li><i class="fas fa-check-circle" style="color: #5a4241; margin-right: 10px;"></i> Gentle cat-cow stretches
                                <br><img src="https://i.ytimg.com/vi/tT00XNqJ3uA/maxresdefault.jpg" alt="Cat-Cow Stretch Demonstration" style="width:100%; max-width:400px; border-radius:8px; margin-top:8px;">
                                <br><img src="https://images.ctfassets.net/hjcv6wdwxsdz/5SSByGmQytP4bBWZkO46vx/904217e36b96a1ea075882146e554c20/woman-doing-cat-cow-stretch-on-yoga-mat.png?w=1200" alt="Woman performing Cat-Cow" style="width:100%; max-width:400px; border-radius:8px; margin-top:8px;">
                            </li>
                            <li><i class="fas fa-check-circle" style="color: #5a4241; margin-right: 10px;"></i> Heat therapy (15-20 minutes)
                                <br><img src="https://embed.widencdn.net/img/veritas/gvxmqxdc1n/576x324px/woman-receiving-heat-therapy-back.jpeg?u=at8tiu&use=idsla&k=c" alt="Heat therapy on back" style="width:100%; max-width:400px; border-radius:8px; margin-top:8px;">
                            </li>
                            <li><i class="fas fa-check-circle" style="color: #5a4241; margin-right: 10px;"></i> Proper sitting posture</li>
                            <li><i class="fas fa-check-circle" style="color: #5a4241; margin-right: 10px;"></i> Deep breathing exercises</li>
                        </ul>
                        <button class="detail-button" onclick="showPainReliefExercise('back')">
                            <i class="fas fa-play"></i> Show Back Pain Exercise
                        </button>
                    </div>
                </div>
               
                <div class="detail-card">
                    <div class="card-header">Neck Pain Relief</div>
                    <div class="card-content" style="display:block;">
                        <p><strong>Recommended Techniques:</strong></p>
                        <ul class="custom-list">
                            <li><i class="fas fa-check-circle" style="color: #5a4241; margin-right: 10px;"></i> Gentle neck rotations
                                <br><img src="https://i.ytimg.com/vi/PruXF-NE2zI/maxresdefault.jpg" alt="Neck rotation exercise" style="width:100%; max-width:400px; border-radius:8px; margin-top:8px;">
                            </li>
                            <li><i class="fas fa-check-circle" style="color: #5a4241; margin-right: 10px;"></i> Chin tucks
                                <br><img src="https://backintelligence.com/wp-content/uploads/2018/01/Chin-tucks-exercise.webp" alt="Chin tuck exercise" style="width:100%; max-width:400px; border-radius:8px; margin-top:8px;">
                            </li>
                            <li><i class="fas fa-check-circle" style="color: #5a4241; margin-right: 10px;"></i> Shoulder shrugs
                                <br><img src="https://i.ytimg.com/vi/ja_P3YhmAlE/maxresdefault.jpg" alt="Shoulder shrugs demonstration" style="width:100%; max-width:400px; border-radius:8px; margin-top:8px;">
                            </li>
                            <li><i class="fas fa-check-circle" style="color: #5a4241; margin-right: 10px;"></i> Ice pack application
                                <br><img src="https://www.verywellhealth.com/thmb/IOVLhq9824rtSPOsys9GOue3hCU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1000963594-75295546468f4e8184eb3dd816e8e6d7.jpg" alt="Ice pack on neck" style="width:100%; max-width:400px; border-radius:8px; margin-top:8px;">
                            </li>
                        </ul>
                        <button class="detail-button" onclick="showPainReliefExercise('neck')">
                            <i class="fas fa-play"></i> Show Neck Pain Exercise
                        </button>
                    </div>
                </div>
               
                <div class="detail-card">
                    <div class="card-header">Knee Pain Relief</div>
                    <div class="card-content" style="display:block;">
                        <p><strong>Recommended Techniques:</strong></p>
                        <ul class="custom-list">
                            <li><i class="fas fa-check-circle" style="color: #5a4241; margin-right: 10px;"></i> Quadriceps stretches
                                <br><img src="https://myrehabconnection.com/wp-content/uploads/2017/05/5-simple-options-for-quad-mobility.png" alt="Quadriceps stretch options" style="width:100%; max-width:400px; border-radius:8px; margin-top:8px;">
                            </li>
                            <li><i class="fas fa-check-circle" style="color: #5a4241; margin-right: 10px;"></i> Straight leg raises
                                <br><img src="https://i.ytimg.com/vi/zo2pqw794B0/maxresdefault.jpg" alt="Straight leg raise for knee" style="width:100%; max-width:400px; border-radius:8px; margin-top:8px;">
                                <br><img src="https://images.ctfassets.net/hjcv6wdwxsdz/7FDTGOpmvLnoBRJM9Dy5lh/c7b54dcfab78a9e4e360005a10386fe3/woman-doing-straight-leg-raise-on-yoga-mat.png?w=1200" alt="Woman doing straight leg raise" style="width:100%; max-width:400px; border-radius:8px; margin-top:8px;">
                            </li>
                            <li><i class="fas fa-check-circle" style="color: #5a4241; margin-right: 10px;"></i> Ice therapy after activity
                                <br><img src="https://orthonj.org/wp-content/uploads/2023/11/cold-comporess-on-knee-1024x683.jpg" alt="Ice pack on knee" style="width:100%; max-width:400px; border-radius:8px; margin-top:8px;">
                            </li>
                            <li><i class="fas fa-check-circle" style="color: #5a4241; margin-right: 10px;"></i> Proper footwear</li>
                        </ul>
                        <button class="detail-button" onclick="showPainReliefExercise('knee')">
                            <i class="fas fa-play"></i> Show Knee Pain Exercise
                        </button>
                    </div>
                </div>
            </div>
           
            <button class="detail-button" onclick="savePainJournal()">
                <i class="fas fa-save"></i> Save Entry
            </button>
            <p id="journal-save-message" style="display: none; color: green; margin-top: 10px;">Entry saved!</p>
           
        </div>
    `;
}
// Rehabilitation Content
function getRehabilitationContent() {
    return `
        <div class="detail-section" style="color: #5a4241;">
            <h3>Rehabilitation Program</h3>
            <p>Follow these steps in order for a safe rehabilitation process. Check off each step as you complete it.</p>
            
            <div class="progress-bar">
                <div class="progress-fill" id="rehab-progress-bar" style="width: ${rehabProgress}%"></div>
            </div>
            <p style="text-align: center; font-weight: bold; margin-top: 10px;">Progress: <span id="rehab-progress-text">${rehabProgress}%</span></p>
            
            <ul class="checkbox-list" id="rehab-steps">
                <li><input type="checkbox" id="step1" onchange="updateRehabProgress()"> <label for="step1">Step 1: Initial Assessment & Light Movement</label></li>
                <li><input type="checkbox" id="step2" onchange="updateRehabProgress()"> <label for="step2">Step 2: Gentle Stretching & Flexibility</label></li>
                <li><input type="checkbox" id="step3" onchange="updateRehabProgress()"> <label for="step3">Step 3: Strengthening Exercises</label></li>
                <li><input type="checkbox" id="step4" onchange="updateRehabProgress()"> <label for="step4">Step 4: Functional Training</label></li>
                <li><input type="checkbox" id="step5" onchange="updateRehabProgress()"> <label for="step5">Step 5: Return to Normal Activity</label></li>
            </ul>
            
            <div style="display: flex; gap: 15px; justify-content: center; margin-top: 30px;">
                <button class="detail-button" onclick="resetRehabProgress()">
                    <i class="fas fa-redo"></i> Reset Progress
                </button>
                <button class="detail-button" onclick="exportRehabProgress()">
                    <i class="fas fa-download"></i> Export Progress
                </button>
            </div>
            
            <div class="big-card">
                <h4>Rehabilitation Milestones</h4>
                <div class="milestones">
                    <div class="milestone ${rehabProgress >= 20 ? 'completed' : ''}">
                        <i class="fas ${rehabProgress >= 20 ? 'fa-check-circle' : 'fa-circle'}"></i>
                        <span>Initial Assessment Completed</span>
                    </div>
                    <div class="milestone ${rehabProgress >= 40 ? 'completed' : ''}">
                        <i class="fas ${rehabProgress >= 40 ? 'fa-check-circle' : 'fa-circle'}"></i>
                        <span>Flexibility Improved</span>
                    </div>
                    <div class="milestone ${rehabProgress >= 60 ? 'completed' : ''}">
                        <i class="fas ${rehabProgress >= 60 ? 'fa-check-circle' : 'fa-circle'}"></i>
                        <span>Strength Restored</span>
                    </div>
                    <div class="milestone ${rehabProgress >= 80 ? 'completed' : ''}">
                        <i class="fas ${rehabProgress >= 80 ? 'fa-check-circle' : 'fa-circle'}"></i>
                        <span>Functional Activities</span>
                    </div>
                    <div class="milestone ${rehabProgress >= 100 ? 'completed' : ''}">
                        <i class="fas ${rehabProgress >= 100 ? 'fa-check-circle' : 'fa-circle'}"></i>
                        <span>Full Recovery</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Posture Correction Content// Posture Correction Content
function getPostureCorrectionContent() {
    return `
        <div class="detail-section" style="color: #5a4241;">
            <h3>Posture Correction Techniques</h3>
            <p>Proper posture reduces strain on muscles and joints. Hover over images to compare correct vs. incorrect postures.</p>
            
            <div class="posture-grid">
                <div class="posture-card">
                    <h4>Sitting Posture</h4>
                    <p><em>Hover to compare correct vs. incorrect</em></p>
                    <div class="posture-wrapper" onmouseenter="playPostureAudio('sitting')">
                        <img class="wrong" src="https://media.istockphoto.com/id/540602134/vector/correct-and-bad-sitting-position-vector-medical-infographics.jpg?s=1024x1024&w=is&k=20&c=tYH1sEwWiqhFp9amDnUEe4TXwpfSADKm8QrAuqBwRKw=" alt="Wrong sitting posture">
                        <img class="correct" src="https://png.pngtree.com/png-vector/20251016/ourlarge/pngtree-correct-and-incorrect-sitting-posture-comparison-png-image_17648073.webp" alt="Correct sitting posture">
                    </div>
                    <button class="detail-button" onclick="startPostureCheck('sitting')">
                        <i class="fas fa-stopwatch"></i> Start 5-Minute Posture Check
                    </button>
                </div>
                
                <div class="posture-card">
                    <h4>Standing Posture</h4>
                    <p><em>Hover to compare correct vs. incorrect</em></p>
                    <div class="posture-wrapper" onmouseenter="playPostureAudio('standing')">
                        <img class="wrong" src="https://www.shutterstock.com/image-vector/good-poor-standing-posture-comparison-260nw-655273228.jpg" alt="Wrong standing posture">
                        <img class="correct" src="https://media.istockphoto.com/id/505217916/vector/correct-alignment-of-body-in-standing-posture.jpg?s=612x612&w=0&k=20&c=0haqoS49Jye2pQSbOla1FulmVdM6CEqyxc_A16WEvKk=" alt="Correct standing posture">
                    </div>
                    <button class="detail-button" onclick="startPostureCheck('standing')">
                        <i class="fas fa-stopwatch"></i> Start 5-Minute Posture Check
                    </button>
                </div>
            </div>
            
            <div class="big-card">
                <h4>Posture Reminder System</h4>
                <div class="reminder-settings">
                    <label for="reminder-interval">Set Posture Reminder Every:</label>
                    <select id="reminder-interval" onchange="setPostureReminder()">
                        <option value="15">15 minutes</option>
                        <option value="30" selected>30 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">60 minutes</option>
                    </select>
                    <button class="detail-button" onclick="testPostureReminder()">
                        <i class="fas fa-bell"></i> Test Reminder
                    </button>
                </div>
                <p id="reminder-status" style="margin-top: 15px; color: #5a4241;"></p>
            </div>
        </div>
    `;
}

// Flexibility Content
function getFlexibilityContent() {
    return `
        <div class="detail-section" style="color: #5a4241;">
            <h3>Flexibility Training</h3>
            <p>Improve your range of motion with these stretching exercises. Hold each stretch for the recommended time.</p>
            
            <div class="detail-grid">
                <div class="detail-card">
                    <div class="card-header">Hamstring Stretch</div>
                    <div class="card-content" style="display:block;">
                        <p><strong>Instructions:</strong> Sit with one leg extended, reach toward your toes.</p>
                        <img src="https://cdn.prod.website-files.com/66c501d753ae2a8c705375b6/67fe0447643ba443d6a39e90_67ea81551a440a62ddce87d6_AF_Flex-and-Mobility_WorldsGreatestStretch.gif" alt="Stretching GIF">
                        <p><strong>Hold Time:</strong> 30 seconds each leg</p>
                        <div class="timer-display" id="flexibility-timer" style="color: #5a4241;" background-color="#a1887f">00:30</div>
                        <div class="timer-controls">
                            <button class="detail-button" onclick="startFlexibilityTimer(30, 'flexibility-timer')">
                                <i class="fas fa-play-circle"></i> Start Timer
                            </button>
                            <button class="detail-button" onclick="pauseTimer('flexibility-timer')">
                                <i class="fas fa-pause-circle"></i> Pause
                            </button>
                            <button class="detail-button" onclick="resetTimer('flexibility-timer', 30)">
                                <i class="fas fa-redo"></i> Reset
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="detail-card">
                    <div class="card-header">Shoulder & Chest Stretch</div>
                    <div class="card-content" style="display:block;">
                        <p><strong>Instructions:</strong> Clasp hands behind back, gently lift arms.</p>
                         <img src="https://fitnessprogramer.com/wp-content/uploads/2022/02/Chest-and-Front-of-Shoulder-Stretch.gif" alt="Stretching GIF">
                        <p><strong>Hold Time:</strong> 20 seconds, repeat 3 times</p>
                        <div class="timer-display" id="shoulder-timer" style="color: #5a4241;" background-color="#a1887f">00:20</div>
                        <div class="timer-controls">
                            <button class="detail-button" onclick="startFlexibilityTimer(20, 'shoulder-timer')">
                                <i class="fas fa-play-circle"></i> Start Timer
                            </button>
                            <button class="detail-button" onclick="pauseTimer('shoulder-timer')">
                                <i class="fas fa-pause-circle"></i> Pause
                            </button>
                            <button class="detail-button" onclick="resetTimer('shoulder-timer', 20)">
                                <i class="fas fa-redo"></i> Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="big-card">
                <h4>Flexibility Progress Tracker</h4>
                <div class="progress-tracker">
                    <label>Today's Flexibility Score (1-10):</label>
                    <input type="range" min="1" max="10" value="5" id="flexibility-score" onchange="updateFlexibilityScore()" style="color: #5a4241;">
                    <span id="score-display">5/10</span>
                    <button class="detail-button" onclick="saveFlexibilityScore()">
                        <i class="fas fa-chart-line"></i> Track Progress
                    </button>
                    <div id="flexibility-history" style="margin-top: 15px;"></div>
                </div>
            </div>
        </div>
    `;
}

// Strength Training Content
function getStrengthTrainingContent() {
    return `
        <div class="detail-section" style="color: #5a4241;">
            <h3>Strength Training Programs</h3>
            <p>Build muscle strength safely with these progressive exercises. Track your repetitions below.</p>
            
            <div class="detail-grid">
                <div class="detail-card">
                    <div class="card-header">Beginner Level</div>
                    <div class="card-content" style="display:block;">
                        <p><strong>Exercises:</strong> Wall push-ups, chair squats, leg lifts</p>
                        <p><strong>Recommended:</strong> 2 sets of 10 reps each</p>
                        <div class="reps" id="reps-beginner">${reps.beginner}</div>
                        <p>Total Repetitions</p>
                        <div class="reps-controls">
                            <button class="detail-button" onclick="incrementReps('beginner')">
                                <i class="fas fa-plus-circle"></i> +1 Rep
                            </button>
                            <button class="detail-button" onclick="decrementReps('beginner')">
                                <i class="fas fa-minus-circle"></i> -1 Rep
                            </button>
                            <button class="detail-button" onclick="resetReps('beginner')">
                                <i class="fas fa-redo"></i> Reset
                            </button>
                        </div>
                        <p id="beginner-goal" style="margin-top: 10px;">Goal: 20 reps</p>
                    </div>
                </div>
                
                <div class="detail-card">
                    <div class="card-header">Intermediate Level</div>
                    <div class="card-content" style="display:block;">
                        <p><strong>Exercises:</strong> Regular push-ups, lunges, planks</p>
                        <p><strong>Recommended:</strong> 3 sets of 15 reps each</p>
                        <div class="reps" id="reps-intermediate">${reps.intermediate}</div>
                        <p>Total Repetitions</p>
                        <div class="reps-controls">
                            <button class="detail-button" onclick="incrementReps('intermediate')">
                                <i class="fas fa-plus-circle"></i> +1 Rep
                            </button>
                            <button class="detail-button" onclick="decrementReps('intermediate')">
                                <i class="fas fa-minus-circle"></i> -1 Rep
                            </button>
                            <button class="detail-button" onclick="resetReps('intermediate')">
                                <i class="fas fa-redo"></i> Reset
                            </button>
                        </div>
                        <p id="intermediate-goal" style="margin-top: 10px;">Goal: 45 reps</p>
                    </div>
                </div>
                
                <div class="detail-card">
                    <div class="card-header">Advanced Level</div>
                    <div class="card-content" style="display:block;">
                        <p><strong>Exercises:</strong> Weighted exercises, advanced variations</p>
                        <p><strong>Recommended:</strong> 4 sets of 20 reps each</p>
                        <div class="reps" id="reps-advanced">${reps.advanced}</div>
                        <p>Total Repetitions</p>
                        <div class="reps-controls">
                            <button class="detail-button" onclick="incrementReps('advanced')">
                                <i class="fas fa-plus-circle"></i> +1 Rep
                            </button>
                            <button class="detail-button" onclick="decrementReps('advanced')">
                                <i class="fas fa-minus-circle"></i> -1 Rep
                            </button>
                            <button class="detail-button" onclick="resetReps('advanced')">
                                <i class="fas fa-redo"></i> Reset
                            </button>
                        </div>
                        <p id="advanced-goal" style="margin-top: 10px;">Goal: 80 reps</p>
                    </div>
                </div>
            </div>
            
           
        </div>
    `;
}

// Physical Assessment Content
function getPhysicalAssessmentContent() {
    return `
        <div class="detail-section" style="color: #5a4241;">
            <h3>Physical Self-Assessment</h3>
            <p>Use these tools to assess your current physical condition. Results are for informational purposes only.</p>
            
            <div class="assessment-grid">
                <div class="slider-container">
                    <label for="pain-level">Pain Level (0 = No pain, 10 = Worst pain):</label>
                    <input type="range" id="pain-level" min="0" max="10" value="0" oninput="updateAssessmentValue('pain')">
                    <div class="slider-value">
                        <span id="pain-value">0</span>/10
                        <span class="slider-label" id="pain-label">No Pain</span>
                    </div>
                </div>
                
                <div class="slider-container">
                    <label for="mobility-level">Mobility (0 = Very limited, 10 = Full mobility):</label>
                    <input type="range" id="mobility-level" min="0" max="10" value="5" oninput="updateAssessmentValue('mobility')">
                    <div class="slider-value">
                        <span id="mobility-value">5</span>/10
                        <span class="slider-label" id="mobility-label">Moderate</span>
                    </div>
                </div>
                
                <div class="slider-container">
                    <label for="flexibility-level">Flexibility (0 = Very stiff, 10 = Very flexible):</label>
                    <input type="range" id="flexibility-level" min="0" max="10" value="5" oninput="updateAssessmentValue('flexibility')">
                    <div class="slider-value">
                        <span id="flexibility-value">5</span>/10
                        <span class="slider-label" id="flexibility-label">Moderate</span>
                    </div>
                </div>
                
                <div class="slider-container">
                    <label for="strength-level">Strength (0 = Very weak, 10 = Very strong):</label>
                    <input type="range" id="strength-level" min="0" max="10" value="5" oninput="updateAssessmentValue('strength')">
                    <div class="slider-value">
                        <span id="strength-value">5</span>/10
                        <span class="slider-label" id="strength-label">Moderate</span>
                    </div>
                </div>
            </div>
            
            <div class="assessment-controls">
                <button class="detail-button" onclick="generateAssessmentRecommendation()">
                    <i class="fas fa-clipboard-check"></i> Get Personalized Recommendation
                </button>
                <button class="detail-button" onclick="saveAssessmentResults()">
                    <i class="fas fa-save"></i> Save Assessment
                </button>
                <button class="detail-button" onclick="comparePreviousAssessment()">
                    <i class="fas fa-chart-bar"></i> Compare to Previous
                </button>
            </div>
            
            <div class="assessment-result" id="assessment-result">
                <h4>Assessment Recommendation</h4>
                <p id="recommendation-text">Based on your inputs, we recommend focusing on flexibility exercises and gentle mobility work. Consider consulting with a physical therapist for a comprehensive assessment.</p>
                <div id="recommendation-details"></div>
            </div>
        </div>
    `;
}

// Exercise Plans Content
function getExercisePlansContent() {
    return `
        <div class="detail-section" style="color: #5a4241;">
            <h3>7-Day Exercise Plan</h3>
            <p>Complete one day at a time. Check off each day as you finish your exercises.</p>
            
            <div class="exercise-plan">
                <div class="plan-header">
                    <h4>Weekly Exercise Plan</h4>
                    <button class="detail-button" onclick="resetExercisePlan()">
                        <i class="fas fa-redo"></i> Reset Week
                    </button>
                </div>
                
                <ul class="checkbox-list" id="exercise-plan-list">
                    <li><input type="checkbox" id="day1" onchange="updateExercisePlanProgress()"> <label for="day1">Day 1: Light Warm-up & Stretching (10-15 minutes)</label></li>
                    <li><input type="checkbox" id="day2" onchange="updateExercisePlanProgress()"> <label for="day2">Day 2: Mobility Exercises & Light Strength (15 minutes)</label></li>
                    <li><input type="checkbox" id="day3" onchange="updateExercisePlanProgress()"> <label for="day3">Day 3: Active Recovery - Walking & Stretching (20 minutes)</label></li>
                    <li><input type="checkbox" id="day4" onchange="updateExercisePlanProgress()"> <label for="day4">Day 4: Strength Focus - Bodyweight Exercises (20 minutes)</label></li>
                    <li><input type="checkbox" id="day5" onchange="updateExercisePlanProgress()"> <label for="day5">Day 5: Flexibility & Balance Training (15 minutes)</label></li>
                    <li><input type="checkbox" id="day6" onchange="updateExercisePlanProgress()"> <label for="day6">Day 6: Full Body Workout (25 minutes)</label></li>
                    <li><input type="checkbox" id="day7" onchange="updateExercisePlanProgress()"> <label for="day7">Day 7: Active Recovery & Planning Next Week (15 minutes)</label></li>
                </ul>
                
                <div class="plan-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" id="plan-progress-bar"></div>
                    </div>
                    <p style="text-align: center; margin-top: 10px;"><span id="plan-progress-text">0</span> of 7 days completed</p>
                </div>
                
                <div class="completion" id="plan-completion">
                    🎉 Week Completed! Great job! 🏆
                </div>
                
                <div class="plan-notes">
                    <h5>Weekly Notes:</h5>
                    <textarea id="plan-notes-text" placeholder="Add notes about your progress, challenges, or achievements this week..."></textarea>
                    <button class="detail-button" onclick="savePlanNotes()">
                        <i class="fas fa-save"></i> Save Notes
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Wellness Programs Content
function getWellnessProgramsContent() {
    return `
        <div class="detail-section" style="color: #5a4241;">
            <h3>Wellness Programs</h3>
            <p>Choose a program that fits your lifestyle and goals. Each program includes exercises, nutrition tips, and mindfulness practices.</p>
            
            <div class="program-selection">
                <div class="program-card" onclick="selectWellnessProgram('office')">
                    <div class="program-icon">
                        <i class="fas fa-desktop"></i>
                    </div>
                    <h4>Office Wellness</h4>
                    <p>For desk workers. Focus on posture and strain relief.</p>
                    <div class="program-duration">10-15 min/day</div>
                </div>
                
                <div class="program-card" onclick="selectWellnessProgram('beginner')">
                    <div class="program-icon">
                        <i class="fas fa-user-plus"></i>
                    </div>
                    <h4>Beginner Wellness</h4>
                    <p>For fitness newcomers. Gentle introduction to exercise.</p>
                    <div class="program-duration">15 min/day</div>
                </div>
                
                <div class="program-card" onclick="selectWellnessProgram('recovery')">
                    <div class="program-icon">
                        <i class="fas fa-heartbeat"></i>
                    </div>
                    <h4>Recovery Program</h4>
                    <p>Post-injury rehabilitation. Safe return to activity.</p>
                    <div class="program-duration">20 min/day</div>
                </div>
                
                <div class="program-card" onclick="selectWellnessProgram('stress')">
                    <div class="program-icon">
                        <i class="fas fa-spa"></i>
                    </div>
                    <h4>Stress Relief</h4>
                    <p>Focus on relaxation and mental wellbeing.</p>
                    <div class="program-duration">15 min/day</div>
                </div>
            </div>
            
            <div class="selected-program" id="selected-program">
                <h4 id="program-title">Select a program to view details</h4>
                <div id="program-content">
                    <p>Click on any program above to see detailed information, exercises, and start the program.</p>
                </div>
                <button class="detail-button" id="start-program-btn" style="display: none;" onclick="startSelectedProgram()">
                    <i class="fas fa-play"></i> Start This Program
                </button>
            </div>
            
            <div class="big-card">
                <h4>Wellness Tracker</h4>
                <div class="wellness-tracker">
                    <div class="tracker-item">
                        <span>Daily Exercise:</span>
                        <input type="checkbox" id="daily-exercise" onchange="updateWellnessTracker()">
                    </div>
                    <div class="tracker-item">
                        <span>Hydration (8 glasses):</span>
                        <input type="checkbox" id="hydration" onchange="updateWellnessTracker()">
                    </div>
                    <div class="tracker-item">
                        <span>Mindfulness (10 min):</span>
                        <input type="checkbox" id="mindfulness" onchange="updateWellnessTracker()">
                    </div>
                    <div class="tracker-item">
                        <span>Sleep (7-8 hours):</span>
                        <input type="checkbox" id="sleep" onchange="updateWellnessTracker()">
                    </div>
                    <div class="tracker-score">
                        <h5>Wellness Score: <span id="wellness-score">0%</span></h5>
                        <div class="progress-bar">
                            <div class="progress-fill" id="wellness-progress"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ===== دوال الوظائف التفاعلية =====

// تبديل حالة البطاقة (فتح/إغلاق)
function toggleCard(card) {
    card.classList.toggle('active');
    
    // إضافة تأثير صوتي بسيط
    playClickSound();
    
    // إذا تم فتح البطاقة، قم بإغلاق البطاقات الأخرى في نفس المجموعة
    if (card.classList.contains('active')) {
        const parentGrid = card.closest('.detail-grid');
        if (parentGrid) {
            const otherCards = parentGrid.querySelectorAll('.detail-card:not(.active)');
            otherCards.forEach(otherCard => {
                otherCard.classList.remove('active');
            });
        }
    }
}

// تحديث تقدم إعادة التأهيل
function updateRehabProgress() {
    const checkboxes = document.querySelectorAll('#rehab-steps input[type="checkbox"]');
    let checkedCount = 0;
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) checkedCount++;
    });
    
    rehabProgress = (checkedCount / checkboxes.length) * 100;
    
    const progressBar = document.getElementById('rehab-progress-bar');
    const progressText = document.getElementById('rehab-progress-text');
    
    if (progressBar) {
        progressBar.style.width = rehabProgress + '%';
    }
    
    if (progressText) {
        progressText.textContent = Math.round(rehabProgress) + '%';
    }
    
    // تحديث معالم التقدم
    updateMilestones();
    
    // تشغيل صوت الإنجاز إذا اكتمل التقدم
    if (rehabProgress === 100) {
        playAchievementSound();
        showNotification('🎉 Rehabilitation Complete!', 'You have completed all steps of the rehabilitation program.');
    }
    
    // حفظ التقدم في التخزين المحلي
    saveToLocalStorage('rehabProgress', rehabProgress);
}

// تحديث المعالم
function updateMilestones() {
    const milestones = document.querySelectorAll('.milestone');
    if (!milestones.length) return;
    
    milestones.forEach((milestone, index) => {
        const threshold = (index + 1) * 20;
        if (rehabProgress >= threshold) {
            milestone.classList.add('completed');
            milestone.querySelector('i').className = 'fas fa-check-circle';
        } else {
            milestone.classList.remove('completed');
            milestone.querySelector('i').className = 'fas fa-circle';
        }
    });
}

// إعادة تعيين تقدم إعادة التأهيل
function resetRehabProgress() {
    if (!confirm('Are you sure you want to reset your rehabilitation progress? This cannot be undone.')) {
        return;
    }
    
    const checkboxes = document.querySelectorAll('#rehab-steps input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    rehabProgress = 0;
    
    const progressBar = document.getElementById('rehab-progress-bar');
    const progressText = document.getElementById('rehab-progress-text');
    
    if (progressBar) {
        progressBar.style.width = '0%';
    }
    
    if (progressText) {
        progressText.textContent = '0%';
    }
    
    // إعادة تعيين المعالم
    updateMilestones();
    
    // إزالة التقدم من التخزين المحلي
    localStorage.removeItem('rehabProgress');
    
    showNotification('Progress Reset', 'Rehabilitation progress has been reset to zero.');
}

// تصدير تقدم إعادة التأهيل
function exportRehabProgress() {
    const progressData = {
        rehabProgress: rehabProgress,
        date: new Date().toISOString(),
        steps: []
    };
    
    const checkboxes = document.querySelectorAll('#rehab-steps input[type="checkbox"]');
    checkboxes.forEach((checkbox, index) => {
        progressData.steps.push({
            step: index + 1,
            completed: checkbox.checked,
            label: checkbox.nextElementSibling.textContent
        });
    });
    
    const dataStr = JSON.stringify(progressData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `rehab-progress-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showNotification('Export Complete', 'Rehabilitation progress has been exported as JSON file.');
}

// إدارة العدادات
function startFlexibilityTimer(seconds, timerId) {
    const display = document.getElementById(timerId);
    
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    let timeLeft = seconds;
    display.textContent = formatTime(timeLeft);
    display.style.color = '#3498db';
    display.classList.remove('timer-complete');
    
    timerInterval = setInterval(() => {
        timeLeft--;
        display.textContent = formatTime(timeLeft);
        
        if (timeLeft <= 5) {
            display.style.color = '#e74c3c';
        }
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            display.textContent = "Time's up!";
            display.style.color = '#2ecc71';
            display.classList.add('timer-complete');
            
            playTimerCompleteSound();
            showNotification('Timer Complete', 'Time is up! Move to the next stretch.');
        }
    }, 1000);
}

function pauseTimer(timerId) {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        showNotification('Timer Paused', 'Timer has been paused.');
    }
}

function resetTimer(timerId, initialSeconds) {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    const display = document.getElementById(timerId);
    display.textContent = formatTime(initialSeconds);
    display.style.color = '#3498db';
    display.classList.remove('timer-complete');
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// إدارة التكرارات
function incrementReps(level) {
    if (reps[level] === undefined) {
        reps[level] = 0;
    }
    
    reps[level]++;
    updateRepsDisplay(level);
    
    // التحقق من الوصول إلى الهدف
    checkRepsGoal(level);
    
    // حفظ في التخزين المحلي
    saveToLocalStorage('reps', reps);
}

function decrementReps(level) {
    if (reps[level] > 0) {
        reps[level]--;
        updateRepsDisplay(level);
        
        // حفظ في التخزين المحلي
        saveToLocalStorage('reps', reps);
    }
}

function resetReps(level) {
    if (confirm(`Are you sure you want to reset ${level} level reps to 0?`)) {
        reps[level] = 0;
        updateRepsDisplay(level);
        
        // إزالة من التخزين المحلي
        const savedReps = JSON.parse(localStorage.getItem('reps') || '{}');
        delete savedReps[level];
        localStorage.setItem('reps', JSON.stringify(savedReps));
    }
}

function updateRepsDisplay(level) {
    const repsElement = document.getElementById(`reps-${level}`);
    if (repsElement) {
        repsElement.textContent = reps[level];
        
        // تأثير مرئي
        repsElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            repsElement.style.transform = 'scale(1)';
        }, 300);
    }
}

function checkRepsGoal(level) {
    const goals = {
        beginner: 20,
        intermediate: 45,
        advanced: 80
    };
    
    if (reps[level] >= goals[level]) {
        showNotification('Goal Achieved!', `You've reached ${goals[level]} reps at ${level} level! Consider progressing to the next level.`);
        playAchievementSound();
    }
}

// التقييم الذاتي
function updateAssessmentValue(type) {
    const slider = document.getElementById(`${type}-level`);
    const valueDisplay = document.getElementById(`${type}-value`);
    const labelDisplay = document.getElementById(`${type}-label`);
    
    if (slider && valueDisplay) {
        const value = parseInt(slider.value);
        valueDisplay.textContent = value;
        
        if (labelDisplay) {
            labelDisplay.textContent = getAssessmentLabel(type, value);
        }
    }
}

function getAssessmentLabel(type, value) {
    const labels = {
        pain: ['No Pain', 'Mild', 'Moderate', 'Severe', 'Worst'],
        mobility: ['Very Limited', 'Limited', 'Moderate', 'Good', 'Excellent'],
        flexibility: ['Very Stiff', 'Stiff', 'Moderate', 'Flexible', 'Very Flexible'],
        strength: ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong']
    };
    
    const index = Math.floor(value / 2.5);
    return labels[type][index] || 'Moderate';
}

function generateAssessmentRecommendation() {
    const pain = parseInt(document.getElementById('pain-level').value);
    const mobility = parseInt(document.getElementById('mobility-level').value);
    const flexibility = parseInt(document.getElementById('flexibility-level').value);
    const strength = parseInt(document.getElementById('strength-level').value);
    
    let recommendation = '';
    let details = '';
    
    if (pain >= 7) {
        recommendation = 'High pain level detected. Consult a healthcare professional before starting any exercise program.';
        details = '<ul><li>Focus on pain management techniques</li><li>Gentle movements only</li><li>Consider heat/cold therapy</li></ul>';
    } else if (mobility <= 3 && flexibility <= 3) {
        recommendation = 'Limited mobility and flexibility detected. Start with gentle range-of-motion exercises.';
        details = '<ul><li>Begin with seated stretches</li><li>Focus on joint mobility</li><li>Progress slowly to standing exercises</li></ul>';
    } else if (strength <= 3) {
        recommendation = 'Lower strength levels detected. Begin with bodyweight exercises and gradually increase intensity.';
        details = '<ul><li>Start with wall push-ups</li><li>Use resistance bands</li><li>Focus on proper form</li></ul>';
    } else if (mobility >= 7 && flexibility >= 7 && strength >= 7 && pain <= 2) {
        recommendation = 'Excellent scores! You have good physical condition. You can safely progress to more challenging exercises.';
        details = '<ul><li>Advanced strength training</li><li>High-intensity intervals</li><li>Sport-specific training</li></ul>';
    } else {
        recommendation = 'Balanced scores detected. A comprehensive program focusing on all aspects of fitness is recommended.';
        details = '<ul><li>Combine strength and flexibility</li><li>Include cardio exercises</li><li>Focus on functional movements</li></ul>';
    }
    
    document.getElementById('recommendation-text').textContent = recommendation;
    document.getElementById('recommendation-details').innerHTML = details;
    document.getElementById('assessment-result').style.display = 'block';
    
    // حفظ نتائج التقييم
    saveAssessmentResults();
    
    // التمرير إلى النتائج
    document.getElementById('assessment-result').scrollIntoView({ behavior: 'smooth' });
}

function saveAssessmentResults() {
    const assessmentData = {
        date: new Date().toISOString(),
        pain: parseInt(document.getElementById('pain-level').value),
        mobility: parseInt(document.getElementById('mobility-level').value),
        flexibility: parseInt(document.getElementById('flexibility-level').value),
        strength: parseInt(document.getElementById('strength-level').value)
    };
    
    // الحصول على التقييمات السابقة
    const previousAssessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    previousAssessments.push(assessmentData);
    
    // حفظ فقط آخر 10 تقييمات
    if (previousAssessments.length > 10) {
        previousAssessments.shift();
    }
    
    localStorage.setItem('assessments', JSON.stringify(previousAssessments));
    
    showNotification('Assessment Saved', 'Your assessment results have been saved.');
}

function comparePreviousAssessment() {
    const assessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    
    if (assessments.length < 2) {
        showNotification('No Previous Data', 'You need at least two assessments to compare.');
        return;
    }
    
    const current = assessments[assessments.length - 1];
    const previous = assessments[assessments.length - 2];
    
    let comparison = '<h5>Comparison with Previous Assessment:</h5><ul>';
    
    comparison += `<li>Pain: ${previous.pain} → ${current.pain} (${current.pain - previous.pain > 0 ? '↑' : '↓'})</li>`;
    comparison += `<li>Mobility: ${previous.mobility} → ${current.mobility} (${current.mobility - previous.mobility > 0 ? '↑' : '↓'})</li>`;
    comparison += `<li>Flexibility: ${previous.flexibility} → ${current.flexibility} (${current.flexibility - previous.flexibility > 0 ? '↑' : '↓'})</li>`;
    comparison += `<li>Strength: ${previous.strength} → ${current.strength} (${current.strength - previous.strength > 0 ? '↑' : '↓'})</li>`;
    comparison += '</ul>';
    
    // عرض المقارنة في نافذة منبثقة
    alert(`Assessment Comparison:\n\nPain: ${previous.pain} → ${current.pain}\nMobility: ${previous.mobility} → ${current.mobility}\nFlexibility: ${previous.flexibility} → ${current.flexibility}\nStrength: ${previous.strength} → ${current.strength}`);
}

// خطط التمارين
function updateExercisePlanProgress() {
    const checkboxes = document.querySelectorAll('#exercise-plan-list input[type="checkbox"]');
    let checkedCount = 0;
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) checkedCount++;
    });
    
    const progressBar = document.getElementById('plan-progress-bar');
    const progressText = document.getElementById('plan-progress-text');
    const completionElement = document.getElementById('plan-completion');
    
    if (progressBar) {
        const progressPercent = (checkedCount / checkboxes.length) * 100;
        progressBar.style.width = progressPercent + '%';
    }
    
    if (progressText) {
        progressText.textContent = checkedCount;
    }
    
    if (completionElement) {
        if (checkedCount === checkboxes.length) {
            completionElement.style.display = 'block';
            playAchievementSound();
        } else {
            completionElement.style.display = 'none';
        }
    }
    
    // حفظ التقدم في التخزين المحلي
    saveToLocalStorage('exercisePlanProgress', checkedCount);
}

function resetExercisePlan() {
    if (!confirm('Are you sure you want to reset your exercise plan progress?')) {
        return;
    }
    
    const checkboxes = document.querySelectorAll('#exercise-plan-list input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    updateExercisePlanProgress();
    
    // إزالة الملاحظات
    document.getElementById('plan-notes-text').value = '';
    
    localStorage.removeItem('exercisePlanProgress');
    localStorage.removeItem('planNotes');
    
    showNotification('Plan Reset', 'Exercise plan has been reset.');
}

function savePlanNotes() {
    const notes = document.getElementById('plan-notes-text').value;
    localStorage.setItem('planNotes', notes);
    
    const saveMessage = document.createElement('div');
    saveMessage.textContent = 'Notes saved!';
    saveMessage.style.color = 'green';
    saveMessage.style.marginTop = '10px';
    
    const notesContainer = document.querySelector('.plan-notes');
    const existingMessage = notesContainer.querySelector('.save-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    saveMessage.className = 'save-message';
    notesContainer.appendChild(saveMessage);
    
    setTimeout(() => {
        saveMessage.style.opacity = '0';
        setTimeout(() => saveMessage.remove(), 500);
    }, 2000);
}

// برامج العافية
let selectedProgram = null;

function selectWellnessProgram(programType) {
    selectedProgram = programType;
    
    const programs = {
        office: {
            title: 'Office Wellness Program',
            content: 'Designed for desk workers to reduce strain and improve posture. Includes desk stretches, ergonomic tips, and eye exercises.',
            exercises: ['Desk neck stretches', 'Shoulder rolls', 'Wrist exercises', 'Posture checks'],
            duration: '10-15 minutes daily'
        },
        beginner: {
            title: 'Beginner Wellness Program',
            content: 'Gentle introduction to fitness for newcomers. Focus on building consistency and basic movement patterns.',
            exercises: ['Basic stretches', 'Walking program', 'Light strength exercises', 'Breathing exercises'],
            duration: '15 minutes daily'
        },
        recovery: {
            title: 'Recovery Program',
            content: 'Post-injury rehabilitation focus. Safe progression back to normal activity with monitoring.',
            exercises: ['Range of motion', 'Gentle strengthening', 'Balance exercises', 'Pain management'],
            duration: '20 minutes daily'
        },
        stress: {
            title: 'Stress Relief Program',
            content: 'Focus on relaxation and mental wellbeing. Combines gentle movement with mindfulness practices.',
            exercises: ['Gentle yoga', 'Meditation', 'Breathing exercises', 'Progressive relaxation'],
            duration: '15 minutes daily'
        }
    };
    
    const program = programs[programType];
    if (!program) return;
    
    document.getElementById('program-title').textContent = program.title;
    
    let contentHTML = `<p>${program.content}</p>`;
    contentHTML += `<p><strong>Duration:</strong> ${program.duration}</p>`;
    contentHTML += `<h5>Exercises Include:</h5><ul>`;
    program.exercises.forEach(exercise => {
        contentHTML += `<li>${exercise}</li>`;
    });
    contentHTML += `</ul>`;
    
    document.getElementById('program-content').innerHTML = contentHTML;
    document.getElementById('start-program-btn').style.display = 'block';
    
    // إضافة فئة نشطة للبرنامج المحدد
    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach(card => {
        card.classList.remove('active');
    });
    
    const selectedCard = document.querySelector(`.program-card[onclick*="${programType}"]`);
    if (selectedCard) {
        selectedCard.classList.add('active');
    }
}

function startSelectedProgram() {
    if (!selectedProgram) {
        showNotification('No Program Selected', 'Please select a program first.');
        return;
    }
    
    showNotification('Program Started', `You have started the ${selectedProgram} wellness program!`);
    
    // بدء تتبع البرنامج
    const programStart = {
        program: selectedProgram,
        startDate: new Date().toISOString(),
        completedDays: 0
    };
    
    localStorage.setItem('currentProgram', JSON.stringify(programStart));
    
    // إعادة توجيه إلى صفحة التتبع (يمكن تعديل هذا حسب احتياجاتك)
    setTimeout(() => {
        alert(`Starting ${selectedProgram} program! In a full application, this would redirect to the program tracking page.`);
    }, 1000);
}

function updateWellnessTracker() {
    const checkboxes = document.querySelectorAll('.wellness-tracker input[type="checkbox"]');
    let checkedCount = 0;
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) checkedCount++;
    });
    
    const progressPercent = (checkedCount / checkboxes.length) * 100;
    const scoreElement = document.getElementById('wellness-score');
    const progressBar = document.getElementById('wellness-progress');
    
    if (scoreElement) {
        scoreElement.textContent = Math.round(progressPercent) + '%';
    }
    
    if (progressBar) {
        progressBar.style.width = progressPercent + '%';
    }
    
    // حفظ حالة التتبع
    const trackerState = {};
    checkboxes.forEach(checkbox => {
        trackerState[checkbox.id] = checkbox.checked;
    });
    
    saveToLocalStorage('wellnessTracker', trackerState);
}

// ===== دوال مساعدة =====

// عرض الإشعارات
function showNotification(title, message) {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-title">${title}</div>
        <div class="notification-message">${message}</div>
        <button class="notification-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // إضافة الأنماط إذا لم تكن موجودة
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-left: 4px solid #3498db;
                padding: 15px;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 10000;
                max-width: 300px;
                animation: slideIn 0.3s ease;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .notification-title {
                font-weight: bold;
                margin-bottom: 5px;
                color: #2c3e50;
            }
            .notification-close {
                position: absolute;
                top: 5px;
                right: 5px;
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                color: #7f8c8d;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // إزالة الإشعار تلقائياً بعد 5 ثوانٍ
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// تشغيل الأصوات
function playClickSound() {
    // محاكاة صوت النقر
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        console.log('Audio not supported or muted');
    }
}

function playTimerCompleteSound() {
    // محاكاة صوت انتهاء المؤقت
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 1200;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log('Audio not supported or muted');
    }
}

function playAchievementSound() {
    // محاكاة صوت الإنجاز
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // نغمة الإنجاز
        const playNote = (frequency, startTime, duration) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        };
        
        playNote(523.25, audioContext.currentTime, 0.3); // C5
        playNote(659.25, audioContext.currentTime + 0.1, 0.3); // E5
        playNote(783.99, audioContext.currentTime + 0.2, 0.3); // G5
    } catch (e) {
        console.log('Audio not supported or muted');
    }
}

// حفظ البيانات في التخزين المحلي
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error('Failed to save to localStorage:', e);
    }
}

// تحميل البيانات من التخزين المحلي
function loadFromLocalStorage(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
        console.error('Failed to load from localStorage:', e);
        return defaultValue;
    }
}

// تسجيل عرض الخدمة (محاكاة للتحليلات)
function logServiceView(serviceType) {
    const views = loadFromLocalStorage('serviceViews', {});
    
    if (!views[serviceType]) {
        views[serviceType] = 0;
    }
    
    views[serviceType]++;
    saveToLocalStorage('serviceViews', views);
    
    // يمكن إضافة مزيد من منطق التحليلات هنا
    console.log(`Service viewed: ${serviceType}, Total views: ${views[serviceType]}`);
}

// تهيئة التطبيق
function initializeApp() {
    console.log('Physical Health & Rehabilitation System Initialized');
    
    // تحميل البيانات المحفوظة
    const savedRehabProgress = loadFromLocalStorage('rehabProgress', 0);
    if (savedRehabProgress > 0) {
        rehabProgress = savedRehabProgress;
    }
    
    const savedReps = loadFromLocalStorage('reps', {});
    if (Object.keys(savedReps).length > 0) {
        reps = { ...reps, ...savedReps };
    }
    
    // إعداد مستمعي الأحداث
    setupEventListeners();
    
    // التحقق من وجود بيانات سابقة
    checkForPreviousData();
    
    showNotification('Welcome!', 'Physical Health & Rehabilitation system is ready. Click on any service to begin.');
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // إغلاق النافذة المنبثقة عند النقر خارجها
    document.addEventListener('click', (event) => {
        const modal = document.getElementById('service-detail-modal');
        if (modal && event.target === modal) {
            closeServiceDetail();
        }
    });
    
    // إغلاق النافذة المنبثقة بمفتاح Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeServiceDetail();
        }
    });
    
    // تحميل الصور المفقودة
    document.addEventListener('error', (event) => {
        if (event.target.tagName === 'IMG') {
            event.target.style.display = 'none';
            console.log('Image failed to load:', event.target.src);
        }
    }, true);
}

// التحقق من وجود بيانات سابقة
function checkForPreviousData() {
    const hasPreviousData = localStorage.getItem('rehabProgress') || 
                           localStorage.getItem('reps') || 
                           localStorage.getItem('assessments');
    
    if (hasPreviousData) {
        console.log('Previous user data found');
    }
}

// دالة للعودة (محاكاة التنقل)
function goBack() {
    showNotification('Navigation', 'Returning to services page...');
    
    // في تطبيق حقيقي، هذا سينتقل إلى صفحة أخرى
    // هنا سنقوم فقط بإخفاء المحتوى التفصيلي إذا كان مفتوحاً
    closeServiceDetail();
    
    return false; // منع السلوك الافتراضي للرابط
}

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initializeApp);

// جعل الدوال متاحة عالمياً
window.showServiceDetail = showServiceDetail;
window.closeServiceDetail = closeServiceDetail;
window.toggleCard = toggleCard;
window.updateRehabProgress = updateRehabProgress;
window.resetRehabProgress = resetRehabProgress;
window.exportRehabProgress = exportRehabProgress;
window.startFlexibilityTimer = startFlexibilityTimer;
window.pauseTimer = pauseTimer;
window.resetTimer = resetTimer;
window.incrementReps = incrementReps;
window.decrementReps = decrementReps;
window.resetReps = resetReps;
window.updateAssessmentValue = updateAssessmentValue;
window.generateAssessmentRecommendation = generateAssessmentRecommendation;
window.saveAssessmentResults = saveAssessmentResults;
window.comparePreviousAssessment = comparePreviousAssessment;
window.updateExercisePlanProgress = updateExercisePlanProgress;
window.resetExercisePlan = resetExercisePlan;
window.savePlanNotes = savePlanNotes;
window.selectWellnessProgram = selectWellnessProgram;
window.startSelectedProgram = startSelectedProgram;
window.updateWellnessTracker = updateWellnessTracker;
window.goBack = goBack;

// دوال إضافية للوظائف المحددة
window.showPainReliefExercise = function(type) {
    alert(`Showing ${type} pain relief exercise. In a full application, this would play a video demonstration.`);
};

window.playPostureAudio = function(type) {
    console.log(`Playing posture guidance audio for ${type}`);
};

window.startPostureCheck = function(type) {
    showNotification('Posture Check Started', `5-minute ${type} posture check timer started.`);
    startFlexibilityTimer(300, 'posture-timer');
};

window.setPostureReminder = function() {
    const interval = document.getElementById('reminder-interval').value;
    document.getElementById('reminder-status').textContent = `Posture reminders set for every ${interval} minutes.`;
    showNotification('Reminder Set', `You will be reminded to check your posture every ${interval} minutes.`);
};

window.testPostureReminder = function() {
    showNotification('Posture Reminder', 'Time to check your posture! Sit/stand up straight!');
};

window.savePainJournal = function() {
    const text = document.getElementById('pain-journal-text').value;
    if (text.trim()) {
        const entries = loadFromLocalStorage('painJournal', []);
        entries.push({
            date: new Date().toISOString(),
            text: text
        });
        saveToLocalStorage('painJournal', entries);
        
        document.getElementById('journal-save-message').style.display = 'block';
        setTimeout(() => {
            document.getElementById('journal-save-message').style.display = 'none';
        }, 2000);
        
        document.getElementById('pain-journal-text').value = '';
    }
};

window.updateFlexibilityScore = function() {
    const slider = document.getElementById('flexibility-score');
    const display = document.getElementById('score-display');
    if (slider && display) {
        display.textContent = slider.value + '/10';
    }
};

window.saveFlexibilityScore = function() {
    const score = document.getElementById('flexibility-score').value;
    const history = loadFromLocalStorage('flexibilityHistory', []);
    history.push({
        date: new Date().toLocaleDateString(),
        score: parseInt(score)
    });
    
    // حفظ فقط آخر 7 سجلات
    if (history.length > 7) {
        history.shift();
    }
    
    saveToLocalStorage('flexibilityHistory', history);
    displayFlexibilityHistory(history);
    
    showNotification('Score Saved', `Flexibility score of ${score}/10 saved.`);
};

window.displayFlexibilityHistory = function(history) {
    const container = document.getElementById('flexibility-history');
    if (!container) return;
    
    if (history.length === 0) {
        container.innerHTML = '<p>No history yet. Track your progress!</p>';
        return;
    }
    
    let html = '<h5>Recent Scores:</h5><ul>';
    history.forEach(entry => {
        html += `<li>${entry.date}: ${entry.score}/10</li>`;
    });
    html += '</ul>';
    
    container.innerHTML = html;
};

window.updateStrengthChart = function() {
    alert('Strength chart would update here. In a full implementation, this would use Chart.js or similar library.');
};

console.log('Physical Health & Rehabilitation System - Script loaded successfully');
// في ملف script.js

// دالة لجعل الاسم ديناميكيًا
function updateDashboardUser() {
    // جلب الاسم من نموذج التسجيل أو استخدام اسم افتراضي
    const savedName = localStorage.getItem('userName') || 'Guest User';
    const userNameDisplay = document.getElementById('userNameDisplay');
    
    if (userNameDisplay) {
        userNameDisplay.textContent = savedName;
    }
    
    // جلب الصورة المحفوظة
    const savedImage = localStorage.getItem('profileImage');
    const profileImage = document.getElementById('profileImage');
    
    if (savedImage && profileImage) {
        profileImage.src = savedImage;
    }
}

// دالة لحفظ بيانات المستخدم عند التسجيل
function saveUserData(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName')?.value;
    const email = document.getElementById('email')?.value;
    
    if (fullName && fullName.length >= 12) {
        // حفظ الاسم في localStorage
        localStorage.setItem('userName', fullName);
        localStorage.setItem('userEmail', email);
        
        // تحديث الداشبورد
        updateDashboardUser();
        
        // إغلاق المودال
        closeModal();
        
        // عرض زر الداشبورد وإخفاء زر تسجيل الدخول
        const loginBtn = document.getElementById('login-trigger');
        const dashboardBtn = document.getElementById('dashboard-link');
        
        if (loginBtn && dashboardBtn) {
            loginBtn.style.display = 'none';
            dashboardBtn.style.display = 'block';
        }
        
        return true;
    }
    return false;
}

// دالة لمعالجة تحميل الصورة
document.addEventListener('DOMContentLoaded', function() {
    const profileImageInput = document.getElementById('profileImageInput');
    const deletePhotoBtn = document.getElementById('deletePhotoBtn');
    
    // تحديث الداشبورد عند التحميل
    updateDashboardUser();
    
    // معالجة تغيير صورة الملف الشخصي
    if (profileImageInput) {
        profileImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const profileImage = document.getElementById('profileImage');
                    if (profileImage) {
                        profileImage.src = e.target.result;
                        // حفظ الصورة في localStorage
                        localStorage.setItem('profileImage', e.target.result);
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // معالجة حذف الصورة
    if (deletePhotoBtn) {
        deletePhotoBtn.addEventListener('click', function() {
            const profileImage = document.getElementById('profileImage');
            if (profileImage) {
                profileImage.src = 'assets/images/img50.webp'; // الصورة الافتراضية
                localStorage.removeItem('profileImage');
            }
        });
    }
    
    // ربط نموذج التسجيل بدالة حفظ البيانات
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', saveUserData);
    }
});

// دالة تسجيل الخروج
function logout() {
    // مسح بيانات المستخدم من localStorage
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('profileImage');
    
    // تحديث واجهة المستخدم
    const loginBtn = document.getElementById('login-trigger');
    const dashboardBtn = document.getElementById('dashboard-link');
    
    if (loginBtn && dashboardBtn) {
        loginBtn.style.display = 'block';
        dashboardBtn.style.display = 'none';
    }
    
    // العودة للصفحة الرئيسية
    showPage('home');
    
    // إعادة تعيين الصورة الافتراضية
    const profileImage = document.getElementById('profileImage');
    if (profileImage) {
        profileImage.src = 'assets/images/img50.webp';
    }
}// ==================== SIGN LANGUAGE SERVICES ====================

// Service Data for Sign Language
const signLanguageServices = {
    'Signed Videos': {
    icon: 'bi-camera-video',
    title: 'Signed Videos',
    description: 'Professional medical videos translated into sign language',
    content: `
        <div class="service-detail-content">
            <h3><i class="bi bi-camera-video"></i> Signed Videos</h3>
            <p>Accessible medical education videos with professional sign language interpretation.</p>

            <div class="features">
                <div class="feature">
                    <i class="fas fa-video"></i>
                    <span>Medical Procedure Demonstrations</span>
                </div>
                <div class="feature">
                    <i class="fas fa-pills"></i>
                    <span>Medication Instruction Videos</span>
                </div>
                <div class="feature">
                    <i class="fas fa-user-md"></i>
                    <span>Doctor Consultation Videos</span>
                </div>
                <div class="feature">
                    <i class="fas fa-ambulance"></i>
                    <span>Emergency Response Guides</span>
                </div>
            </div>

            <!-- 📷 Sign Language Detection -->
            <div class="sign-detection">
                <h4>Live Sign Language to Text</h4>
                <video id="signCamera" autoplay muted></video>
                <p class="recognized-text">
                    <strong>Recognized Text:</strong>
                    <span id="signOutput">Waiting for sign...</span>
                </p>
            </div>

            <div class="service-actions">
                <button onclick="startSignCamera()" class="action-btn">
                    <i class="fas fa-camera"></i> Start Detection
                </button>
                <button onclick="stopSignCamera()" class="action-btn secondary">
                    <i class="fas fa-stop"></i> Stop
                </button>
            </div>
        </div>
    `
    
},
'Signed Consultations': {
    icon: 'bi-chat-dots',
    title: 'Signed Consultations',
    description: 'Real-time video consultations with sign language interpreters',
    content: `
        <div class="service-detail-content">
            <h3><i class="bi bi-chat-dots"></i> Signed Consultations</h3>
            <p>Upload a sign language video and receive an interpreted medical response.</p>

            <div class="features">
                <div class="feature">
                    <i class="fas fa-upload"></i>
                    <span>Upload Sign Language Video</span>
                </div>
                <div class="feature">
                    <i class="fas fa-brain"></i>
                    <span>AI Sign Language Analysis</span>
                </div>
                <div class="feature">
                    <i class="fas fa-video"></i>
                    <span>Interpreted Response Video</span>
                </div>
                <div class="feature">
                    <i class="fas fa-shield-alt"></i>
                    <span>Secure & Private</span>
                </div>
            </div>

            <!-- 📤 Upload Section -->
            <div class="upload-section">
                <input type="file" id="signVideoUpload" accept="video/*">
                <p id="uploadStatus">No video uploaded</p>
            </div>

            <!-- 📥 Result -->
            <div class="result-section">
                <h4>Interpreted Result</h4>
                <video id="responseVideo" controls style="display:none;"></video>
                <p id="interpretedText"></p>
            </div>

            <div class="service-actions">
                <button onclick="uploadSignVideo()" class="action-btn">
                    <i class="fas fa-cloud-upload-alt"></i> Upload & Analyze
                </button>
            </div>
        </div>
    `
},
'Visual Learning': {
        icon: 'bi-eye',
        title: 'Visual Learning',
        description: 'Interactive visual tools for medical education',
        content: `
            <div class="service-detail-content">
                <h3><i class="bi bi-eye"></i> Visual Learning</h3>
                <p>Interactive medical education using visual tools designed for deaf learners.</p>
                
                <div class="features">
                    <div class="feature">
                        <i class="fas fa-cube"></i>
                        <span>3D Anatomy Models</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-brain"></i>
                        <span>Medical Animations</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-gamepad"></i>
                        <span>Interactive Learning</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-chart-line"></i>
                        <span>Progress Tracking</span>
                    </div>
                </div>
                
                <div class="service-actions">
                    <button onclick="exploreVisualLearning()" class="action-btn">
                        <i class="fas fa-graduation-cap"></i> Explore Tools
                    </button>
                    <button onclick="tryVisualDemo()" class="action-btn secondary">
                        <i class="fas fa-play-circle"></i> Try Demo
                    </button>
                </div>
            </div>
        `
    },
    
    'Inclusive Therapy': {
        icon: 'bi-person-check',
        title: 'Inclusive Therapy',
        description: 'Therapeutic services designed for the deaf community',
        content: `
            <div class="service-detail-content">
                <h3><i class="bi bi-person-check"></i> Inclusive Therapy</h3>
                <p>Mental health services provided by therapists fluent in sign language and familiar with deaf culture.</p>
                
                <div class="features">
                    <div class="feature">
                        <i class="fas fa-hands-helping"></i>
                        <span>Deaf-Aware Therapists</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-users"></i>
                        <span>Group Therapy Sessions</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-home"></i>
                        <span>Family Counseling</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-heart"></i>
                        <span>Trauma-Informed Care</span>
                    </div>
                </div>
                
                <div class="service-actions">
                    <button onclick="bookInclusiveTherapy()" class="action-btn">
                        <i class="fas fa-calendar-alt"></i> Book Session
                    </button>
                    <button onclick="viewTherapists()" class="action-btn secondary">
                        <i class="fas fa-user-nurse"></i> View Therapists
                    </button>
                </div>
            </div>
        `
    },
    
    'Subtitled Content': {
        icon: 'bi-chat-square-text',
        title: 'Subtitled Content',
        description: 'Comprehensive subtitling and captioning services',
        content: `
            <div class="service-detail-content">
                <h3><i class="bi bi-chat-square-text"></i> Subtitled Content</h3>
                <p>Professional subtitling services for all medical content, ensuring accessibility for all.</p>
                
                <div class="features">
                    <div class="feature">
                        <i class="fas fa-closed-captioning"></i>
                        <span>Real-time Captioning</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-language"></i>
                        <span>Multiple Languages</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-check-circle"></i>
                        <span>ADA Compliant</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-tachometer-alt"></i>
                        <span>Fast Turnaround</span>
                    </div>
                </div>
                
                <div class="service-actions">
                    <button onclick="requestSubtitles()" class="action-btn">
                        <i class="fas fa-upload"></i> Request Subtitles
                    </button>
                    <button onclick="viewSubtitleSamples()" class="action-btn secondary">
                        <i class="fas fa-eye"></i> View Samples
                    </button>
                </div>
            </div>
        `
    },
    
    'Accessible AI Tools': {
        icon: 'bi-cpu',
        title: 'Accessible AI Tools',
        description: 'AI-powered accessibility tools for healthcare',
        content: `
            <div class="service-detail-content">
                <h3><i class="bi bi-cpu"></i> Accessible AI Tools</h3>
                <p>Advanced AI tools designed to enhance healthcare accessibility for the deaf community.</p>
                
                <div class="features">
                    <div class="feature">
                        <i class="fas fa-robot"></i>
                        <span>Sign Language Recognition</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-microphone"></i>
                        <span>Speech-to-Text AI</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-brain"></i>
                        <span>Predictive Assistance</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-chart-bar"></i>
                        <span>Accessibility Analytics</span>
                    </div>
                </div>
                
                <div class="service-actions">
                    <button onclick="tryAIToolsDemo()" class="action-btn">
                        <i class="fas fa-play"></i> Try AI Demo
                    </button>
                    <button onclick="requestCustomAITools()" class="action-btn secondary">
                        <i class="fas fa-tools"></i> Request Tools
                    </button>
                </div>
            </div>
        `
    }
};

// Sign Language Service Functions
function showSignLanguageDetail(serviceName) {
    const service = signLanguageServices[serviceName];
    if (!service) return;
    
    // إغلاق أي modal مفتوح حالياً
    document.querySelectorAll('.modal, .service-detail-modal').forEach(modal => {
        modal.style.display = 'none';
    });
    
    // إنشاء modal خاص بـ Sign Language إذا لم يكن موجوداً
    let modal = document.getElementById('signLanguageModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'signLanguageModal';
        modal.className = 'sign-language-modal service-detail-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <button class="close-modal" onclick="closeSignLanguageDetail()">&times;</button>
                </div>
                <div class="modal-body" id="signLanguageContent"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // تعبئة المحتوى
    const contentDiv = document.getElementById('signLanguageContent');
    contentDiv.innerHTML = service.content;
    
    // إظهار الـ modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeSignLanguageDetail() {
    const modal = document.getElementById('signLanguageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Action Functions for Sign Language Services
function playSignLanguageVideo() {
    alert('Playing sign language video sample. In a real application, this would launch a video player.');
}

function requestCustomSignVideo() {
    alert('Custom video request form would open here.');
}

function scheduleSignConsultation() {
    alert('Sign language consultation scheduling would open here.');
}

function viewInterpreters() {
    alert('Interpreter directory would open here.');
}

function exploreVisualLearning() {
    alert('Visual learning tools page would open here.');
}

function tryVisualDemo() {
    alert('Visual learning demo would launch here.');
}

function bookInclusiveTherapy() {
    alert('Inclusive therapy booking would open here.');
}

function requestSubtitles() {
    alert('Subtitle request form would open here.');
}

function viewSubtitleSamples() {
    alert('Subtitle samples would display here.');
}

function tryAIToolsDemo() {
    alert('AI tools demo would launch here.');
}

function requestCustomAITools() {
    alert('AI tools request form would open here.');
}

// Initialize Sign Language Page
function initSignLanguagePage() {
    console.log('Sign Language page initialized');
    
    // Add CSS for Sign Language modal if not exists
    if (!document.querySelector('#signLanguageCSS')) {
        const css = document.createElement('style');
        css.id = 'signLanguageCSS';
        css.textContent = `
            .sign-language-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.7);
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .sign-language-modal .modal-content {
                background: white;
                width: 90%;
                max-width: 800px;
                max-height: 80vh;
                margin: 10vh auto;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            }
            
            .sign-language-modal .modal-header {
                background: #5a4241;
                color: white;
                padding: 20px;
                display: flex;
                justify-content: flex-end;
            }
            
            .sign-language-modal .close-modal {
                background: none;
                border: none;
                color: white;
                font-size: 28px;
                cursor: pointer;
                padding: 0;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.3s;
            }
            
            .sign-language-modal .close-modal:hover {
                background-color: rgba(255,255,255,0.2);
            }
            
            .sign-language-modal .modal-body {
                padding: 30px;
                overflow-y: auto;
                max-height: calc(80vh - 80px);
            }
            
            .service-detail-content h3 {
                color: #5a4241;
                margin-top: 0;
                font-size: 28px;
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .service-detail-content .features {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                margin: 30px 0;
            }
            
            .service-detail-content .feature {
                background: #f9f7f5;
                padding: 20px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                gap: 15px;
                border-left: 4px solid #8c7473;
            }
            
            .service-detail-content .feature i {
                font-size: 24px;
                color: #8c7473;
                width: 40px;
                text-align: center;
            }
            
            .service-detail-content .feature span {
                font-weight: 600;
                color: #5a4241;
            }
            
            .service-actions {
                display: flex;
                gap: 15px;
                margin-top: 30px;
                flex-wrap: wrap;
            }
            
            .action-btn {
                background: #5a4241;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                display: flex;
                align-items: center;
                gap: 10px;
                transition: background-color 0.3s;
            }
            
            .action-btn:hover {
                background: #8c7473;
            }
            
            .action-btn.secondary {
                background: transparent;
                color: #5a4241;
                border: 2px solid #5a4241;
            }
            
            .action-btn.secondary:hover {
                background: #5a4241;
                color: white;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(css);
    }
    
    // Add event listeners to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            const serviceName = this.textContent.trim();
            showSignLanguageDetail(serviceName);
        });
    });
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('signLanguageModal');
    if (modal && event.target === modal) {
        closeSignLanguageDetail();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeSignLanguageDetail();
    }
});
