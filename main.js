// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // URL Redirect and Loading Screen
    const urlRedirect = document.getElementById('url-redirect');
    const loadingScreen = document.getElementById('loading-screen');
    
    // Show URL redirect first
    if (urlRedirect) {
        urlRedirect.classList.add('active');
        
        // Animate progress bar
        setTimeout(() => {
            const progress = urlRedirect.querySelector('.progress');
            progress.style.width = '100%';
        }, 100);
        
        // After URL redirect completes, show loading screen
        setTimeout(() => {
            urlRedirect.classList.remove('active');
            
            if (loadingScreen) {
                loadingScreen.classList.add('active');
                
                // Reset and animate progress bar
                setTimeout(() => {
                    const progress = loadingScreen.querySelector('.progress');
                    progress.style.width = '100%';
                }, 100);
                
                // Hide loading screen after it completes
                setTimeout(() => {
                    loadingScreen.classList.remove('active');
                    initAnimations();
                }, 3000);
            } else {
                initAnimations();
            }
        }, 3000);
    } else if (loadingScreen) {
        // If no URL redirect, just show loading screen
        loadingScreen.classList.add('active');
        
        // Animate progress bar
        setTimeout(() => {
            const progress = loadingScreen.querySelector('.progress');
            progress.style.width = '100%';
        }, 100);
        
        // Hide loading screen after it completes
        setTimeout(() => {
            loadingScreen.classList.remove('active');
            initAnimations();
        }, 3000);
    } else {
        // If no loading screens, init animations directly
        initAnimations();
    }
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Toggle icon between bars and X
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // FAQ Toggles
    const faqToggles = document.querySelectorAll('.faq-toggle');
    
    if (faqToggles.length > 0) {
        faqToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const faqItem = this.closest('.faq-item');
                faqItem.classList.toggle('active');
                
                // Toggle icon between plus and minus
                const icon = this.querySelector('i');
                if (icon.classList.contains('fa-plus')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
                
                // Close other FAQs
                const otherFaqs = document.querySelectorAll('.faq-item.active');
                otherFaqs.forEach(item => {
                    if (item !== faqItem) {
                        item.classList.remove('active');
                        const otherIcon = item.querySelector('.faq-toggle i');
                        otherIcon.classList.remove('fa-minus');
                        otherIcon.classList.add('fa-plus');
                    }
                });
            });
        });
    }
    
    // Success Stories Slider
    const sliderControls = document.querySelector('.slider-controls');
    
    if (sliderControls) {
        const prevBtn = sliderControls.querySelector('.prev-btn');
        const nextBtn = sliderControls.querySelector('.next-btn');
        const dots = sliderControls.querySelectorAll('.dot');
        
        let currentSlide = 0;
        const slides = document.querySelectorAll('.story-slide');
        
        // Initialize slider
        if (slides.length > 0) {
            // Show first slide
            slides[0].classList.add('active');
            
            // Previous button click
            prevBtn.addEventListener('click', function() {
                slides[currentSlide].classList.remove('active');
                dots[currentSlide].classList.remove('active');
                
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
            });
            
            // Next button click
            nextBtn.addEventListener('click', function() {
                slides[currentSlide].classList.remove('active');
                dots[currentSlide].classList.remove('active');
                
                currentSlide = (currentSlide + 1) % slides.length;
                
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
            });
            
            // Dot clicks
            dots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    slides[currentSlide].classList.remove('active');
                    dots[currentSlide].classList.remove('active');
                    
                    currentSlide = index;
                    
                    slides[currentSlide].classList.add('active');
                    dots[currentSlide].classList.add('active');
                });
            });
            
            // Auto slide
            setInterval(() => {
                slides[currentSlide].classList.remove('active');
                dots[currentSlide].classList.remove('active');
                
                currentSlide = (currentSlide + 1) % slides.length;
                
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
            }, 5000);
        }
    }
});

// Initialize animations
function initAnimations() {
    // Add animation classes to elements as they scroll into view
    const animatedElements = document.querySelectorAll('.solution-card, .join-card, .tech-feature, .factor-card, .team-member, .stat-item');
    
    if (animatedElements.length > 0) {
        // Initial check for elements in viewport
        checkElementsInViewport();
        
        // Check on scroll
        window.addEventListener('scroll', checkElementsInViewport);
    }
    
    function checkElementsInViewport() {
        animatedElements.forEach((element, index) => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                // Add animation with staggered delay
                setTimeout(() => {
                    element.classList.add('fade-in', 'animated');
                }, index * 150);
            }
        });
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
            rect.bottom >= 0
        );
    }
}

// Google Maps initialization
let google; // Declare google variable
function initMap() {
    const mapElement = document.getElementById('map');
    
    if (mapElement) {
        const location = { lat: 37.7749, lng: -122.4194 }; // San Francisco coordinates
        const map = new google.maps.Map(mapElement, {
            zoom: 14,
            center: location,
            styles: [
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [{"color": "#444444"}]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [{"color": "#f2f2f2"}]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [{"visibility": "off"}]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [{"saturation": -100}, {"lightness": 45}]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [{"visibility": "simplified"}]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [{"visibility": "off"}]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [{"visibility": "off"}]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [{"color": "#2e7d32"}, {"visibility": "on"}]
                }
            ]
        });
        
        const marker = new google.maps.Marker({
            position: location,
            map: map,
            title: 'CropTech Headquarters',
            icon: {
                url: 'images/map-marker.png',
                scaledSize: new google.maps.Size(40, 40)
            }
        });
        
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="map-info-window">
                    <h3>CropTech Headquarters</h3>
                    <p>123 AgriTech Park<br>Silicon Valley, CA 94025</p>
                    <a href="https://maps.google.com/maps?daddr=37.7749,-122.4194" target="_blank">Get Directions</a>
                </div>
            `
        });
        
        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        });
    }
}