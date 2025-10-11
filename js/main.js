// Elements to load dynamically
const sectionsToLoad = {
  "nav-container": "/nav.html",
  "footer-container": "/footer.html"
};

// Track load completion
let loadedCount = 0;
const totalToLoad = Object.keys(sectionsToLoad).length;

// Load nav and footer
for (const [id, file] of Object.entries(sectionsToLoad)) {
  fetch(file)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
      loadedCount++;
      if (loadedCount === totalToLoad) {
        initSiteFeatures(); // Only after both nav and footer are loaded
      }
    });
}

// Initialize features after nav & footer are injected
function initSiteFeatures() {
  setupMobileMenu();
  setupTypewriterEffect();
}

// Toggle mobile hamburger menu
function setupMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');

  if (toggleBtn && menu) {
    toggleBtn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });

    // Optional: Close menu when a link is clicked
    const links = menu.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
      });
    });
  }
}

// Blinking cursor effect
async function setupTypewriterEffect() {
  const typewriterElement = document.querySelector('.typewriter');
  if (!typewriterElement) return;

  const roles = ["Molecular Oncology", "Cancer Genomics", "Bioinformatics"];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeSpeed = 150;
  const deleteSpeed = 100;
  const delayBetweenRoles = 1500;

  function type() {
    const currentRole = roles[roleIndex];
    let displayText = '';

    if (isDeleting) {
      displayText = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      displayText = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    typewriterElement.textContent = displayText;

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(type, delayBetweenRoles);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, typeSpeed);
    } else {
      setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
    }
  }
  type();
}
