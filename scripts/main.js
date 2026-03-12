document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. 導覽列滾動效果 ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 15, 15, 0.85)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(25, 25, 25, 0.6)';
            navbar.style.boxShadow = 'none';
        }
    });

    // --- 2. 燈箱 (Lightbox) 效果 ---
    const masonryItems = document.querySelectorAll('.masonry-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const closeBtn = document.querySelector('.lightbox-close');

    // 開啟燈箱
    masonryItems.forEach(item => {
        item.addEventListener('click', () => {
            const type = item.getAttribute('data-type');
            
            // 重置顯示狀態
            lightboxImg.style.display = 'none';
            lightboxVideo.style.display = 'none';
            lightboxVideo.pause();
            lightboxVideo.src = "";

            if (type === 'video') {
                const videoSrc = item.getAttribute('data-src');
                lightboxVideo.src = videoSrc;
                lightboxVideo.style.display = 'block';
                lightboxVideo.play();
            } else {
                const img = item.querySelector('img');
                const imgSrc = img.getAttribute('src');
                lightboxImg.src = imgSrc;
                lightboxImg.style.display = 'block';
            }

            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });
    });

    // 關閉燈箱函數
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        lightboxVideo.pause();
        setTimeout(() => {
            lightboxImg.src = '';
            lightboxVideo.src = '';
            lightboxImg.style.display = 'none';
            lightboxVideo.style.display = 'none';
        }, 300);
        document.body.style.overflow = 'auto'; 
    };

    // 點擊關閉按鈕
    closeBtn.addEventListener('click', closeLightbox);

    // 點擊燈箱背景關閉
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === document.querySelector('.lightbox-content')) {
            closeLightbox();
        }
    });

    // 監聽鍵盤 Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});
