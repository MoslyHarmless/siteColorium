document.addEventListener('DOMContentLoaded', () => {
    // 1. Изменение стиля навигации при скролле
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Анимация появления элементов при скролле (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Элемент должен появиться на 15% чтобы сработала анимация
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Прекращаем наблюдение после того как анимация сработала
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // Сразу запускаем анимацию для первого экрана если он в зоне видимости
    setTimeout(() => {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);
});

    // 3. Before/After Image Slider
    const slider = document.getElementById('compSlider');
    const imgBefore = document.getElementById('imgBefore');
    if(slider && imgBefore) {
        slider.addEventListener('input', (e) => {
            imgBefore.style.clipPath = `polygon(0 0, ${e.target.value}% 0, ${e.target.value}% 100%, 0 100%)`;
        });
    }

    // 4. Custom Video Player
    const video = document.getElementById('promo-video');
    const playBtn = document.getElementById('playBtn');
    if (video && playBtn) {
        playBtn.addEventListener('click', () => {
            if (video.paused) {
                // Remove muted attribute to hear sound if they click play
                video.muted = false;
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                        playBtn.style.opacity = '0';
                        video.parentElement.classList.add('is-playing'); video.setAttribute('controls', 'controls');
                    }).catch(error => { console.error("Error playing video:", error); });
                }
            } else {
                video.pause();
                playBtn.style.opacity = '1';
                video.parentElement.classList.remove('is-playing');
            }
        });
        
        video.addEventListener('ended', () => {
            playBtn.style.opacity = '1';
            video.parentElement.classList.remove('is-playing');
        });
    }


