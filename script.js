const showBtn = document.querySelector('.navBtn');
const topNav = document.querySelector('.top-nav');

showBtn.addEventListener('click', function(){
    if(topNav.classList.contains('showNav')){
        hideNav();
    } else {
        showNav();
    }
});

// Hide nav when clicking a link
const navLinks = document.querySelectorAll('.top-nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if(topNav.classList.contains('showNav')){
            hideNav();
        }
    });
});

// Hide nav when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-section') && topNav.classList.contains('showNav')) {
        hideNav();
    }
});

function showNav() {
    topNav.classList.add('showNav');
    showBtn.innerHTML = '<i class="fas fa-times"></i>';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when nav is open
}

function hideNav() {
    topNav.classList.remove('showNav');
    showBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = 'auto'; // Enable scrolling
}

// Add active class to current nav item
const currentLocation = window.location.pathname;
const menuItems = document.querySelectorAll('.top-nav a');
menuItems.forEach(item => {
    if(item.getAttribute('href') === currentLocation) {
        item.classList.add('active');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Gallery filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Initialize lightbox with enhanced options
    let gallery = new SimpleLightbox('.gallery a', {
        fadeSpeed: 200,
        captionDelay: 250,
        animationSpeed: 250,
        enableKeyboard: true,
        showCounter: false,
        scrollZoom: false,
        closeText: '×',
        close: true,
        closeOnOverlayClick: true,
        closeOnEscape: true,
        overlayOpacity: 0.9,
        className: 'custom-lightbox',
        widthRatio: 0.9,
        heightRatio: 0.9,
        disableScroll: true,
        docClose: true,
        swipeClose: true,
        alertError: false
    });

    // Add custom close button styles
    const customStyles = document.createElement('style');
    customStyles.textContent = `
        .custom-lightbox .sl-close {
            position: fixed;
            right: 20px;
            top: 20px;
            color: #fff;
            font-size: 30px;
            font-weight: bold;
            cursor: pointer;
            z-index: 10060;
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 50%;
            transition: all 0.3s ease;
        }

        .custom-lightbox .sl-close:hover {
            background: rgba(0, 0, 0, 0.8);
            transform: rotate(90deg);
        }

        .custom-lightbox .sl-overlay {
            background: #000;
        }

        .custom-lightbox .sl-wrapper {
            z-index: 10050;
        }
    `;
    document.head.appendChild(customStyles);

    // Add click event to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            // Filter gallery items
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || category === itemCategory) {
                    item.style.display = 'block';
                    // Add animation
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });

            // Refresh the lightbox after filtering
            gallery.refresh();
        });
    });
});

// Add this CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Blog Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('blogModal');
    const modalBody = modal.querySelector('.modal-body');
    const closeBtn = modal.querySelector('.close-modal');
    const templates = document.getElementById('blogTemplates');
    const readMoreBtns = document.querySelectorAll('.blog .btn');

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
    }

    // Open modal with correct content
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const blogType = this.closest('.blog').querySelector('.badge').textContent.toLowerCase();
            const content = templates.querySelector(`[data-blog-id="${blogType}"]`);
            
            if (content) {
                modalBody.innerHTML = content.innerHTML;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling

                // Add click event listeners to all CTA buttons in the modal
                const ctaButtons = modalBody.querySelectorAll('.modal-btn');
                ctaButtons.forEach(ctaBtn => {
                    ctaBtn.addEventListener('click', () => {
                        closeModal();
                        // Smooth scroll to contact section
                        document.querySelector('#contact').scrollIntoView({ 
                            behavior: 'smooth'
                        });
                    });
                });
            }
        });
    });

    // Close modal with close button
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});

// Scroll Reveal Animations
document.addEventListener('DOMContentLoaded', function() {
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: false
    });

    // Header animations
    sr.reveal('.about-content', { delay: 300 });
    sr.reveal('.social-icons', { delay: 500 });

    // About section animations
    sr.reveal('.about-image', { origin: 'left' });
    sr.reveal('.about-content', { origin: 'right' });
    sr.reveal('.specialty-item', { interval: 200 });

    // Blog section animations
    sr.reveal('.section-title', { origin: 'top' });
    sr.reveal('.blog', { 
        interval: 200,
        origin: 'bottom'
    });

    // Contact section animations
    sr.reveal('.info-card', { 
        interval: 200,
        origin: 'bottom'
    });
    sr.reveal('.booking-form', { origin: 'left' });
    sr.reveal('.location-map', { origin: 'right' });

    // Footer animations
    sr.reveal('.footer-section', { 
        interval: 200,
        origin: 'bottom'
    });
});