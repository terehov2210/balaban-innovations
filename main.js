/* ==========================================================================
   Balaban Studio - Interactive Logic
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // 0. Header Sticky Scroll Behavior
    const mainHeader = document.getElementById('main-header');
    if (mainHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
        });
    }

    // 1. Menu Overlay Open/Close
    const menuTrigger = document.getElementById('menu-trigger-btn');
    const menuClose = document.getElementById('menu-close-btn');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuSubLinks = document.querySelectorAll('.menu-sub-links a');

    if (menuTrigger && menuOverlay) {
        menuTrigger.addEventListener('click', () => {
            menuOverlay.classList.add('open');
            document.body.style.overflow = 'hidden'; // prevent page scroll
        });
    }

    if (menuClose && menuOverlay) {
        menuClose.addEventListener('click', () => {
            menuOverlay.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    // Close menu when clicking sublinks
    menuSubLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuOverlay.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // 2. Language Switcher (UA / EN)
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            langBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            // Translate placeholders or key texts if needed
            const currentLang = e.currentTarget.id === 'lang-en' ? 'EN' : 'UA';
            console.log(`Language switched to: ${currentLang}`);
        });
    });

    // 3. Theme Toggle (Night / Day Mode) with LocalStorage persistence
    const themeToggle = document.getElementById('theme-toggle');
    
    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    if (savedTheme === 'light-theme') {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (document.body.classList.contains('light-theme')) {
                document.body.classList.remove('light-theme');
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
                document.body.classList.add('light-theme');
                localStorage.setItem('theme', 'light-theme');
            }
            
            // Rotate the theme button icon
            themeToggle.style.transform = 'scale(0.8) rotate(180deg)';
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 500);
            
            console.log('Theme toggled');
        });
    }

    // 4. Hero Section Accordion
    const accordionContainer = document.querySelector('.hero-accordion-container');
    const accordionCols = document.querySelectorAll('.accordion-col');

    if (accordionContainer && !accordionContainer.classList.contains('no-hover')) {
        function activateAccordionCol(targetCol) {
            accordionCols.forEach(c => {
                c.classList.remove('active');
                c.setAttribute('aria-expanded', 'false');
            });
            targetCol.classList.add('active');
            targetCol.setAttribute('aria-expanded', 'true');
        }

        accordionCols.forEach(col => {
            // Hover handling for desktop
            col.addEventListener('mouseenter', (e) => {
                if (window.innerWidth > 768) {
                    activateAccordionCol(e.currentTarget);
                }
            });

            // Click handling for tablet & mobile
            col.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    const isActive = e.currentTarget.classList.contains('active');
                    if (isActive) {
                        e.currentTarget.classList.remove('active');
                        e.currentTarget.setAttribute('aria-expanded', 'false');
                    } else {
                        activateAccordionCol(e.currentTarget);
                    }
                } else {
                    activateAccordionCol(e.currentTarget);
                }
            });

            // Keyboard handling (Enter/Space)
            col.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    activateAccordionCol(e.currentTarget);
                }
            });
        });
    } else if (accordionContainer && accordionContainer.classList.contains('no-hover')) {
        // Smooth scrolling to contact section for static cards
        accordionCols.forEach(col => {
            col.addEventListener('click', () => {
                const targetSection = document.querySelector('#contact');
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
            col.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const targetSection = document.querySelector('#contact');
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }

    // 5. Synapse Hotspots (Mobile/Tablet Touch Toggle Support)
    const hotspots = document.querySelectorAll('.synapse-hotspot');
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const isActive = hotspot.classList.contains('active');
            
            // Close all others
            hotspots.forEach(h => {
                h.classList.remove('active');
            });

            if (!isActive) {
                hotspot.classList.add('active');
            }
        });
    });

    // Close tooltips when clicking anywhere else on page
    document.addEventListener('click', () => {
        hotspots.forEach(h => {
            h.classList.remove('active');
        });
    });

    // 6. Projects Section Tabs & Background Switcher
    const projectTabs = document.querySelectorAll('.project-tab-item');
    const tabHighlighter = document.getElementById('tab-highlighter');
    const highlighterText = document.getElementById('highlighter-text');
    const projectBgs = document.querySelectorAll('.projects-bg');

    function updateTabHighlighter(tab) {
        if (!tabHighlighter || !tab) return;
        
        // Calculate offset position relative to tabs container parent
        const offsetTop = tab.offsetTop;
        const tabHeight = tab.offsetHeight;
        
        // Set transform coordinates on the highlighter glass box
        tabHighlighter.style.transform = `translateY(${offsetTop}px)`;
        
        // Update highlighter text
        if (highlighterText) {
            highlighterText.textContent = tab.getAttribute('data-label');
        }

        // Switch active background matching index
        const index = tab.getAttribute('data-index');
        projectBgs.forEach(bg => {
            if (bg.getAttribute('data-project-bg') === index) {
                bg.classList.add('active');
            } else {
                bg.classList.remove('active');
            }
        });
    }

    // Set initial position on load
    const initialTab = document.querySelector('.project-tab-item.active');
    if (initialTab) {
        // Wrap in timeout to guarantee DOM offset metrics are calculated correctly
        setTimeout(() => {
            updateTabHighlighter(initialTab);
        }, 300);
    }

    function activateProjectTab(tab) {
        projectTabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        updateTabHighlighter(tab);
    }

    projectTabs.forEach(tab => {
        tab.addEventListener('mouseenter', (e) => {
            activateProjectTab(e.currentTarget);
        });

        tab.addEventListener('click', (e) => {
            activateProjectTab(e.currentTarget);
        });

        // Keyboard handling (Enter/Space)
        tab.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activateProjectTab(e.currentTarget);
            }
        });
    });

    // Recalculate highlighter position on window resize
    window.addEventListener('resize', () => {
        const activeTab = document.querySelector('.project-tab-item.active');
        if (activeTab) {
            updateTabHighlighter(activeTab);
        }
    });

    // 7. News & Blog Slider - Draggable Carousel & Custom Follower Cursor
    const blogCarousel = document.getElementById('blog-carousel');
    const carouselTrack = document.getElementById('blog-carousel-track');
    const customCursor = document.getElementById('blog-custom-cursor');
    
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let trackX = 0;

    if (blogCarousel && carouselTrack) {
        // Track position for mouse custom follow cursor
        blogCarousel.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 768) {
                customCursor.classList.add('visible');
                // Calculate position relative to viewport
                customCursor.style.left = `${e.clientX}px`;
                customCursor.style.top = `${e.clientY}px`;
            }
        });

        blogCarousel.addEventListener('mouseleave', () => {
            customCursor.classList.remove('visible');
            isDragging = false;
        });

        // Mouse drag event handlers
        blogCarousel.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - carouselTrack.offsetLeft;
            scrollLeft = trackX;
            blogCarousel.style.cursor = 'grabbing';
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
            if (blogCarousel) {
                blogCarousel.style.cursor = '';
            }
        });

        blogCarousel.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - carouselTrack.offsetLeft;
            const walk = (x - startX) * 1.5; // Drag sensitivity multiplier
            let newTransformX = scrollLeft + walk;

            // Boundaries containment
            const maxScroll = -(carouselTrack.scrollWidth - blogCarousel.offsetWidth);
            if (newTransformX > 0) newTransformX = 0;
            if (newTransformX < maxScroll) newTransformX = maxScroll;

            trackX = newTransformX;
            carouselTrack.style.transform = `translateX(${trackX}px)`;
        });

        // Touch swipe support (for mobile/tablet)
        blogCarousel.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].pageX - carouselTrack.offsetLeft;
            scrollLeft = trackX;
        }, { passive: true });

        blogCarousel.addEventListener('touchend', () => {
            isDragging = false;
        });

        blogCarousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const x = e.touches[0].pageX - carouselTrack.offsetLeft;
            const walk = (x - startX) * 1.5;
            let newTransformX = scrollLeft + walk;

            const maxScroll = -(carouselTrack.scrollWidth - blogCarousel.offsetWidth);
            if (newTransformX > 0) newTransformX = 0;
            if (newTransformX < maxScroll) newTransformX = maxScroll;

            trackX = newTransformX;
            carouselTrack.style.transform = `translateX(${trackX}px)`;
        }, { passive: true });
    }

    // 8. Interactive Contact Form Handler
    const contactForm = document.getElementById('interactive-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Gather input fields data
            const name = document.getElementById('user-name').value;
            const interest = document.getElementById('user-interest').value;
            const email = document.getElementById('user-email').value;

            // Trigger beautiful notification instead of basic alert
            const successOverlay = document.createElement('div');
            successOverlay.className = 'success-message-overlay';
            successOverlay.innerHTML = `
                <div class="success-box">
                    <span class="success-icon">✓</span>
                    <h2>Дякуємо, ${name}!</h2>
                    <p>Заявку щодо теми "<strong>${interest === 'concept' ? 'Проектування' : interest === 'consulting' ? 'Консалтинг' : interest === 'building' ? 'Будівництво' : 'Винаходи'}</strong>" успішно надіслано.</p>
                    <p>Комерційну пропозицію буде відправлено на <strong>${email}</strong>.</p>
                    <button class="close-success-btn">Зрозуміло</button>
                </div>
            `;
            
            // Inject styles directly or rely on body stack
            document.body.appendChild(successOverlay);
            document.body.style.overflow = 'hidden';

            // Close notification handler
            const closeBtn = successOverlay.querySelector('.close-success-btn');
            closeBtn.addEventListener('click', () => {
                successOverlay.remove();
                document.body.style.overflow = '';
            });

            // Reset form inputs
            contactForm.reset();
        });
    }

    // 9. Footer Shadow Overlay Hue Animation (Unused and removed for performance)
});

// Styles injector for interactive overlays
const inlineStyles = document.createElement('style');
inlineStyles.textContent = `
    .success-message-overlay {
        position: fixed;
        inset: 0;
        background: rgba(13, 13, 13, 0.85);
        backdrop-filter: blur(8px);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }
    .success-box {
        background: #1a181d;
        border: 1px solid rgba(255, 94, 54, 0.4);
        border-radius: 16px;
        padding: 40px 30px;
        max-width: 480px;
        width: 100%;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        animation: boxPopUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    @keyframes boxPopUp {
        0% { transform: scale(0.85); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
    }
    .success-icon {
        display: inline-flex;
        width: 60px;
        height: 60px;
        background: rgba(255, 94, 54, 0.15);
        color: #ff5e36;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 20px;
        border: 1px solid rgba(255, 94, 54, 0.3);
    }
    .success-box h2 {
        font-size: 24px;
        margin-bottom: 15px;
        color: #fff;
    }
    .success-box p {
        font-size: 14px;
        color: #8f8e98;
        line-height: 1.6;
        margin-bottom: 12px;
    }
    .close-success-btn {
        background: #ff5e36;
        color: #fff;
        border: none;
        border-radius: 30px;
        padding: 12px 35px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        margin-top: 20px;
        transition: background 0.3s ease;
    }
    .close-success-btn:hover {
        background: #e04a25;
    }
`;
document.head.appendChild(inlineStyles);
