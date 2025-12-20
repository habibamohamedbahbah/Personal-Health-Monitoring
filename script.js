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
