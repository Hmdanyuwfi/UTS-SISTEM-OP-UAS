// Main JavaScript file for Linux Debian Installation Tutorial
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tutorial website loaded successfully!');
    
    // Initialize animations and interactions
    initializeAnimations();
    initializeSmoothScrolling();
    initializeParallaxEffects();
    initializeProgressIndicator();
    initializeCardAnimations();
    
    // Add welcome message
    showWelcomeMessage();
});

// Initialize entrance animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('fade-in');
                
                // Add staggered animation for list items
                const listItems = element.querySelectorAll('li');
                listItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateX(-20px)';
                        item.style.transition = 'all 0.5s ease';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, 100);
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all tutorial cards and sections
    document.querySelectorAll('.tutorial-card, .info-card, .section-header').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for better UX
function initializeSmoothScrolling() {
    // Add smooth scroll behavior to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Parallax effects for background
function initializeParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-particles');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Progress indicator for tutorial steps
function initializeProgressIndicator() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    document.body.appendChild(progressBar);
    
    // Add CSS for progress bar
    const style = document.createElement('style');
    style.textContent = `
        .progress-bar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: rgba(0, 0, 0, 0.3);
            z-index: 1000;
            backdrop-filter: blur(10px);
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #00ff88, #00ccff, #ff00ff);
            width: 0%;
            transition: width 0.3s ease;
            box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
        }
    `;
    document.head.appendChild(style);
    
    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        document.querySelector('.progress-fill').style.width = scrollPercent + '%';
    });
}

// Enhanced card animations
function initializeCardAnimations() {
    const cards = document.querySelectorAll('.tutorial-card, .info-card');
    
    cards.forEach((card, index) => {
        // Add hover sound effect (visual feedback)
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click ripple effect
        card.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(0, 255, 136, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
            `;
            
            card.style.position = 'relative';
            card.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

// Welcome message with typewriter effect
function showWelcomeMessage() {
    // Create welcome overlay
    const overlay = document.createElement('div');
    overlay.className = 'welcome-overlay';
    overlay.innerHTML = `
        <div class="welcome-content">
            <h2 class="welcome-title">Selamat Datang!</h2>
            <p class="welcome-text">Tutorial Instalasi Linux Debian di Oracle VirtualBox</p>
            <div class="welcome-author">oleh: MUHAMMAD HAMDAN YUWAFI</div>
            <button class="welcome-button" onclick="closeWelcome()">Mulai Tutorial</button>
        </div>
    `;
    
    // Add CSS for welcome overlay
    const welcomeStyle = document.createElement('style');
    welcomeStyle.textContent = `
        .welcome-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.5s ease;
        }
        
        .welcome-content {
            text-align: center;
            padding: 40px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            border: 2px solid rgba(0, 255, 136, 0.3);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            max-width: 500px;
            width: 90%;
        }
        
        .welcome-title {
            font-family: 'Orbitron', monospace;
            font-size: 32px;
            color: #00ff88;
            margin-bottom: 20px;
            text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
        }
        
        .welcome-text {
            font-size: 18px;
            color: #ffffff;
            margin-bottom: 15px;
            line-height: 1.6;
        }
        
        .welcome-author {
            font-size: 16px;
            color: #00ccff;
            margin-bottom: 30px;
            font-weight: 600;
        }
        
        .welcome-button {
            background: linear-gradient(45deg, #00ff88, #00ccff);
            color: #0a0a0a;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(0, 255, 136, 0.3);
        }
        
        .welcome-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(0, 255, 136, 0.5);
        }
    `;
    document.head.appendChild(welcomeStyle);
    
    document.body.appendChild(overlay);
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (document.querySelector('.welcome-overlay')) {
            closeWelcome();
        }
    }, 5000);
}

// Close welcome message
function closeWelcome() {
    const overlay = document.querySelector('.welcome-overlay');
    if (overlay) {
        overlay.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            overlay.remove();
        }, 500);
    }
}

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(fadeOutStyle);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeWelcome();
    }
});

// Add floating action button for quick navigation
function createFloatingActionButton() {
    const fab = document.createElement('div');
    fab.className = 'floating-action-button';
    fab.innerHTML = '↑';
    fab.title = 'Kembali ke atas';
    
    const fabStyle = document.createElement('style');
    fabStyle.textContent = `
        .floating-action-button {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(45deg, #00ff88, #00ccff);
            color: #0a0a0a;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
            z-index: 1000;
            opacity: 0;
            transform: translateY(100px);
        }
        
        .floating-action-button.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .floating-action-button:hover {
            transform: translateY(-5px) scale(1.1);
            box-shadow: 0 10px 25px rgba(0, 255, 136, 0.5);
        }
    `;
    document.head.appendChild(fabStyle);
    
    fab.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            fab.classList.add('visible');
        } else {
            fab.classList.remove('visible');
        }
    });
    
    document.body.appendChild(fab);
}

// Initialize floating action button
createFloatingActionButton();

// Console easter egg
console.log(`
🚀 Tutorial Instalasi Linux Debian di Oracle VirtualBox
👨‍💻 Dibuat oleh: MUHAMMAD HAMDAN YUWAFI
🎓 NIM: 102240058
🏫 ITSNU Pekalongan - Fakultas Sains dan Teknologi

Selamat belajar! 💚
`);

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Website loaded in ${Math.round(loadTime)}ms`);
});