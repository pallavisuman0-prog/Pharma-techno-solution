document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const backToTop = document.getElementById('back-to-top');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');

    // Sticky header + back-to-top visibility
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    const icon = mobileMenuToggle.querySelector('i');
                    icon.classList.replace('fa-times', 'fa-bars');
                }
                const offset = 80;
                const pos = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-list a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.pageYOffset >= section.offsetTop - 150) {
                current = section.getAttribute('id');
            }
        });
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            current = 'contact';
        }
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Hero Carousel
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.hero-indicators .indicator');
    const prevBtn = document.getElementById('hero-prev');
    const nextBtn = document.getElementById('hero-next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        if (slides.length === 0) return;
        
        slides[currentSlide].classList.remove('active');
        if (indicators[currentSlide]) {
            indicators[currentSlide].classList.remove('active');
        }

        currentSlide = (index + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');
        if (indicators[currentSlide]) {
            indicators[currentSlide].classList.add('active');
        }
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlideShow() {
        stopSlideShow();
        slideInterval = setInterval(nextSlide, 6000);
    }

    function stopSlideShow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startSlideShow();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startSlideShow();
        });
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            startSlideShow();
        });
    });

    if (slides.length > 0) {
        startSlideShow();
    }

    // Product Slider Navigation & Detail Switching
    const prodTrack = document.getElementById('prod-track');
    const prodPrev = document.getElementById('prod-prev');
    const prodNext = document.getElementById('prod-next');
    const productCards = document.querySelectorAll('.product-slide-card');
    const productDetails = document.querySelectorAll('.product-detail');

    // Slider Scroll Controls
    if (prodTrack && prodPrev && prodNext) {
        prodPrev.addEventListener('click', () => {
            const firstCard = prodTrack.querySelector('.product-slide-card');
            if (firstCard) {
                const cardWidth = firstCard.offsetWidth;
                prodTrack.scrollBy({ left: -(cardWidth + 30), behavior: 'smooth' });
            }
        });

        prodNext.addEventListener('click', () => {
            const firstCard = prodTrack.querySelector('.product-slide-card');
            if (firstCard) {
                const cardWidth = firstCard.offsetWidth;
                prodTrack.scrollBy({ left: cardWidth + 30, behavior: 'smooth' });
            }
        });
    }

    // Slide Card Click Switcher
    if (productCards.length > 0 && productDetails.length > 0) {
        productCards.forEach(card => {
            card.addEventListener('click', () => {
                const targetProduct = card.getAttribute('data-product');

                // Update active card indicator
                productCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');

                // Update active product detail panel below
                productDetails.forEach(detail => {
                    detail.classList.remove('active');
                });
                
                const targetDetail = document.getElementById(`detail-${targetProduct}`);
                if (targetDetail) {
                    targetDetail.classList.add('active');
                }

                // Scroll to the detail section on smaller screens so the user sees the description
                if (window.innerWidth <= 768 && targetDetail) {
                    const offset = 100;
                    const pos = targetDetail.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: pos, behavior: 'smooth' });
                }
            });
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form-section');
    const formSuccessMsg = document.getElementById('form-success-msg');

    if (contactForm && formSuccessMsg) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Hide form and show success message
            contactForm.style.display = 'none';
            formSuccessMsg.style.display = 'block';
            
            // Reset form
            contactForm.reset();
        });
    }

});
