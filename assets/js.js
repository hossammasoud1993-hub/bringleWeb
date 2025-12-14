<script>
// Social Media Click Handler
function handleSocialClick(platform) {
console.log(`Navigate to ${platform}`);
// In a real app, this would navigate to the social media platform
}

// Newsletter Form Submission
function handleNewsletterSubmit(event) {
event.preventDefault();

const emailInput = document.getElementById('emailInput');
const messageElement = document.getElementById('newsletterMessage');
const email = emailInput.value.trim();

// Clear previous message
messageElement.textContent = '';
messageElement.className = 'newsletter-message';

// Validate email
if (!email) {
messageElement.textContent = 'Please enter your email address';
messageElement.classList.add('error');
return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
messageElement.textContent = 'Please enter a valid email address';
messageElement.classList.add('error');
return;
}

// Disable button during submission
const submitButton = event.target.querySelector('button[type="submit"]');
submitButton.disabled = true;

// Simulate API call
setTimeout(() => {
messageElement.textContent = 'Thank you for subscribing!';
messageElement.classList.add('success');
emailInput.value = '';
submitButton.disabled = false;
}, 1000);
}

// Country Selector
let isDropdownOpen = false;

function toggleCountryDropdown() {
const dropdown = document.getElementById('countryDropdown');
const button = document.getElementById('countryButton');

isDropdownOpen = !isDropdownOpen;

if (isDropdownOpen) {
dropdown.classList.add('open');
button.classList.add('open');
} else {
dropdown.classList.remove('open');
button.classList.remove('open');
}
}

function selectCountry(country) {
const selectedCountryElement = document.getElementById('selectedCountry');
const dropdown = document.getElementById('countryDropdown');
const button = document.getElementById('countryButton');

selectedCountryElement.textContent = country;

// Update selected state
const buttons = dropdown.querySelectorAll('button');
buttons.forEach(btn => {
if (btn.textContent === country) {
    btn.classList.add('selected');
} else {
    btn.classList.remove('selected');
}
});

// Close dropdown
dropdown.classList.remove('open');
button.classList.remove('open');
isDropdownOpen = false;

console.log(`Country changed to: ${country}`);
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
const dropdown = document.getElementById('countryDropdown');
const button = document.getElementById('countryButton');

if (!button.contains(event.target) && !dropdown.contains(event.target)) {
if (isDropdownOpen) {
    dropdown.classList.remove('open');
    button.classList.remove('open');
    isDropdownOpen = false;
}
}
});

// Initialize selected country
document.addEventListener('DOMContentLoaded', function() {
const selectedCountry = document.getElementById('selectedCountry').textContent;
const dropdown = document.getElementById('countryDropdown');
const buttons = dropdown.querySelectorAll('button');

buttons.forEach(btn => {
if (btn.textContent === selectedCountry) {
    btn.classList.add('selected');
}
});
});
</script>







<script>
function handlePlayVideo(testimonialId) {
    console.log('Playing video for testimonial:', testimonialId);
    // Implement video playback functionality here
    alert('Play video for testimonial: ' + testimonialId);
}

function handleReadAllStories() {
    console.log('Navigating to all customer stories');
    // Implement navigation to stories page here
    alert('Navigate to all customer stories');
}
</script>
<script>
function handleDetailsClick(productId) {
    console.log('Navigating to details for product: ' + productId);
    // In a real application, this could navigate to a details page
    alert('Details for: ' + productId);
}
</script>

<!-- JavaScript for Mobile Menu -->
<script>
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuClose = document.getElementById('mobileMenuClose');
// const desktopNavItems = document.querySelectorAll('.nav-desktop .nav-item');
const mobileNavItems = document.querySelectorAll('.nav-mobile .nav-mobile-item');

// Toggle mobile menu
function toggleMobileMenu() {
    mobileMenuOverlay.classList.toggle('active');
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);
mobileMenuClose.addEventListener('click', toggleMobileMenu);

// Close menu when clicking overlay
mobileMenuOverlay.addEventListener('click', function(e) {
    if (e.target === mobileMenuOverlay) {
        toggleMobileMenu();
    }
});

// Handle desktop navigation clicks
desktopNavItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        desktopNavItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        console.log('Navigating to:', this.dataset.page);
    });
});

// Handle mobile navigation clicks
mobileNavItems.forEach(item => {
    item.addEventListener('click', function() {
        mobileNavItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        toggleMobileMenu();
        console.log('Navigating to:', this.dataset.page);
    });
});
</script>


<script>
// Get elements
const video = document.getElementById('videoPlayer');
const playButton = document.getElementById('playButton');
const muteButton = document.getElementById('muteButton');
const overlay = document.getElementById('videoOverlay');
const videoWrapper = document.getElementById('videoWrapper');

let isPlaying = false;
let isMuted = false;
let hasStarted = false;
let controlsTimeout;

// Intersection Observer for scroll-triggered autoplay
const observerOptions = {
threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting && !hasStarted) {
        // Try to autoplay with sound
        video.muted = false;
        isMuted = false;
        
        video.play()
            .then(() => {
                isPlaying = true;
                hasStarted = true;
                playButton.classList.add('playing');
                hideControlsWithDelay();
            })
            .catch((error) => {
                console.log('Autoplay with sound failed, trying muted:', error);
                // If autoplay with sound fails, try muted
                video.muted = true;
                isMuted = true;
                muteButton.classList.add('muted');
                
                video.play()
                    .then(() => {
                        isPlaying = true;
                        hasStarted = true;
                        playButton.classList.add('playing');
                        hideControlsWithDelay();
                    })
                    .catch(err => {
                        console.log('Autoplay failed:', err);
                    });
            });
    }
});
}, observerOptions);

observer.observe(video);

// Play/Pause functionality
playButton.addEventListener('click', () => {
if (isPlaying) {
    video.pause();
    isPlaying = false;
    playButton.classList.remove('playing');
    showControls();
} else {
    video.play();
    isPlaying = true;
    playButton.classList.add('playing');
    hideControlsWithDelay();
}
});

// Mute/Unmute functionality
muteButton.addEventListener('click', () => {
if (isMuted) {
    video.muted = false;
    isMuted = false;
    muteButton.classList.remove('muted');
} else {
    video.muted = true;
    isMuted = true;
    muteButton.classList.add('muted');
}
});

// Show/Hide controls on hover
videoWrapper.addEventListener('mouseenter', () => {
showControls();
clearTimeout(controlsTimeout);
});

videoWrapper.addEventListener('mouseleave', () => {
if (isPlaying) {
    hideControlsWithDelay();
}
});

function showControls() {
overlay.classList.remove('hidden');
}

function hideControls() {
if (isPlaying) {
    overlay.classList.add('hidden');
}
}

function hideControlsWithDelay() {
clearTimeout(controlsTimeout);
controlsTimeout = setTimeout(hideControls, 2000);
}

// Show controls when video is paused
video.addEventListener('pause', () => {
showControls();
});

video.addEventListener('play', () => {
hideControlsWithDelay();
});
</script>