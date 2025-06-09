// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize countdown timer
    initCountdown();
    
    // Initialize navigation highlighting
    initNavigationHighlight();
});

function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initCountdown() {
    // Event date: June 9, 2025 at 10:00 AM Pacific Time
    const eventDate = new Date('2025-06-09T10:00:00-07:00'); // Pacific Time
    
    const countdownElements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };

    function updateCountdown() {
        const now = new Date();
        const timeDifference = eventDate.getTime() - now.getTime();

        if (timeDifference <= 0) {
            // Event has started or passed
            displayEventStatus();
            return;
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Update countdown display with animation
        updateCountdownElement(countdownElements.days, days);
        updateCountdownElement(countdownElements.hours, hours);
        updateCountdownElement(countdownElements.minutes, minutes);
        updateCountdownElement(countdownElements.seconds, seconds);
    }

    function updateCountdownElement(element, value) {
        const formattedValue = value.toString().padStart(2, '0');
        
        if (element && element.textContent !== formattedValue) {
            element.style.transform = 'scale(1.1)';
            element.textContent = formattedValue;
            
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 150);
        }
    }

    function displayEventStatus() {
        const now = new Date();
        const eventEnd = new Date(eventDate.getTime() + (3 * 60 * 60 * 1000)); // Assume 3-hour event
        
        if (now >= eventDate && now <= eventEnd) {
            // Event is currently happening
            document.getElementById('countdown').innerHTML = `
                <div class="countdown__item event-live">
                    <span class="countdown__number">🔴</span>
                    <span class="countdown__label">LIVE NOW</span>
                </div>
            `;
        } else if (now > eventEnd) {
            // Event has ended
            document.getElementById('countdown').innerHTML = `
                <div class="countdown__item event-ended">
                    <span class="countdown__number">✅</span>
                    <span class="countdown__label">EVENT ENDED</span>
                </div>
            `;
        }
    }

    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function initNavigationHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    function highlightNavigation() {
        const scrollPosition = window.scrollY + 100; // Offset for fixed nav

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('nav__link--active');
                });

                // Add active class to current section link
                const activeLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('nav__link--active');
                }
            }
        });
    }

    // Add CSS for active navigation state
    const style = document.createElement('style');
    style.textContent = `
        .nav__link--active {
            color: var(--color-primary) !important;
            background: rgba(33, 128, 141, 0.15) !important;
        }
        
        .event-live, .event-ended {
            grid-column: 1 / -1;
            background: rgba(255, 255, 255, 0.1) !important;
        }
        
        .event-live .countdown__number {
            color: #ff4444 !important;
            animation: pulse 2s infinite;
        }
        
        .event-ended .countdown__number {
            color: #44ff44 !important;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
    `;
    document.head.appendChild(style);

    // Listen for scroll events
    window.addEventListener('scroll', highlightNavigation);
    
    // Initial highlight
    highlightNavigation();
}

// Add intersection observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.glass-card, .feature-card, .countdown__item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initScrollAnimations, 100);
});

// Add click handlers for Discord watch party
document.addEventListener('DOMContentLoaded', function() {
    const discordMockup = document.querySelector('.discord-mockup');
    const joinButton = document.querySelector('a[href*="discord.gg"]');
    
    if (discordMockup && joinButton) {
        discordMockup.addEventListener('click', function() {
            joinButton.click();
        });
        
        // Add cursor pointer style
        discordMockup.style.cursor = 'pointer';
    }
});

// Add enhanced hover effects
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
});

// Add timezone update functionality
function updateTimezones() {
    const timezones = [
        { zone: 'Pacific Time (PT)', offset: -8, id: 'pt' },
        { zone: 'Eastern Time (ET)', offset: -5, id: 'et' },
        { zone: 'British Summer Time (BST)', offset: 1, id: 'bst' },
        { zone: 'Central European Summer Time (CEST)', offset: 2, id: 'cest' },
        { zone: 'India Standard Time (IST)', offset: 5.5, id: 'ist' },
        { zone: 'China Standard Time (CST)', offset: 8, id: 'cst' },
        { zone: 'Japan Standard Time (JST)', offset: 9, id: 'jst' },
        { zone: 'Australian Eastern Standard Time (AEST)', offset: 10, id: 'aest' },
        { zone: 'New Zealand Standard Time (NZST)', offset: 12, id: 'nzst' }
    ];

    function updateTimezoneDisplay() {
        const eventDate = new Date('2025-06-09T10:00:00-07:00'); // 10 AM PT
        const timezoneItems = document.querySelectorAll('.timezone-item');
        
        timezoneItems.forEach((item, index) => {
            if (timezones[index]) {
                const timeElement = item.querySelector('.timezone-time');
                const tz = timezones[index];
                
                // Calculate time in each timezone
                const localTime = new Date(eventDate.getTime() + (tz.offset * 60 * 60 * 1000));
                const hours = localTime.getUTCHours();
                const minutes = localTime.getUTCMinutes();
                
                let timeString = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
                
                // Add day indicator for next day times
                if (tz.offset >= 8) {
                    timeString += ' (Tuesday)';
                }
                
                if (timeElement) {
                    timeElement.textContent = timeString;
                }
            }
        });
    }

    // Update timezone display immediately
    updateTimezoneDisplay();
    
    // Update every minute
    setInterval(updateTimezoneDisplay, 60000);
}

// Initialize timezone updates
document.addEventListener('DOMContentLoaded', updateTimezones);