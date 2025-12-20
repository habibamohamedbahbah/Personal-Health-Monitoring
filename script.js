
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
