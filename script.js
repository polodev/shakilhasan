// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const filterBtns = document.querySelectorAll('.filter-btn');
const testimonialDots = document.querySelectorAll('.dot');
const contactForm = document.getElementById('contactForm');

// Portfolio Items - Sample data
const portfolioItems = [
  {
    id: 1,
    title: 'Brand Identity Design',
    category: 'graphic-design',
    icon: 'fa-palette',
    description: 'Complete brand identity design for a tech startup including logo, color palette, typography, and brand guidelines.',
    client: 'TechNova Inc.',
    year: '2024'
  },
  {
    id: 2,
    title: 'Social Media Campaign',
    category: 'digital-marketing',
    icon: 'fa-hashtag',
    description: 'Successful social media marketing campaign for a retail brand that increased engagement by 150% and sales by 35%.',
    client: 'Fashion Forward',
    year: '2023'
  },
  {
    id: 3,
    title: 'E-commerce Website Design',
    category: 'ui-ux',
    icon: 'fa-shopping-cart',
    description: 'UI/UX design for an e-commerce platform with improved user flow that reduced cart abandonment by 25%.',
    client: 'ShopEasy',
    year: '2024'
  },
  {
    id: 4,
    title: 'Product Packaging',
    category: 'graphic-design',
    icon: 'fa-box-open',
    description: 'Creative packaging design for a cosmetic brand that helped establish premium market positioning.',
    client: 'Glow Cosmetics',
    year: '2023'
  },
  {
    id: 5,
    title: 'SEO Optimization',
    category: 'digital-marketing',
    icon: 'fa-search',
    description: 'SEO strategy that improved website ranking from page 3 to page 1 for key industry terms, increasing organic traffic by 200%.',
    client: 'Legal Services Co.',
    year: '2024'
  },
  {
    id: 6,
    title: 'Mobile App Interface',
    category: 'ui-ux',
    icon: 'fa-mobile-alt',
    description: 'User interface design for a fitness tracking app with intuitive navigation and personalized dashboard.',
    client: 'FitTrack',
    year: '2023'
  }
];

// Initialize Portfolio Items
function initPortfolio() {
  const portfolioGrid = document.querySelector('.portfolio-grid');
  
  portfolioItems.forEach(item => {
    const portfolioItem = document.createElement('div');
    portfolioItem.className = `portfolio-item ${item.category}`;
    
    portfolioItem.innerHTML = `
      <div class="portfolio-card">
        <div class="portfolio-icon">
          <i class="fas ${item.icon}"></i>
        </div>
        <h3>${item.title}</h3>
        <div class="portfolio-meta">
          <span><i class="fas fa-user"></i> ${item.client}</span>
          <span><i class="fas fa-calendar-alt"></i> ${item.year}</span>
        </div>
        <p>${item.description}</p>
        <div class="portfolio-tags">
          <span class="tag">${item.category.replace('-', ' ')}</span>
        </div>
      </div>
    `;
    
    portfolioGrid.appendChild(portfolioItem);
  });
}

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Portfolio Filtering
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
      if (filter === 'all' || item.classList.contains(filter)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.style.display = i === index ? 'block' : 'none';
  });
  
  testimonialDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// Initialize first testimonial
showTestimonial(currentTestimonial);

// Testimonial navigation with dots
testimonialDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentTestimonial = i;
    showTestimonial(currentTestimonial);
  });
});

// Auto-rotate testimonials
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 5000);

// Form Submission
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would normally send the form data to a server
    // For now, we'll just log it and show a success message
    console.log('Form submitted:', { name, email, subject, message });
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Adjust for header height
        behavior: 'smooth'
      });
    }
  });
});

// Reveal animations on scroll
function revealOnScroll() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.75) {
      section.classList.add('revealed');
    }
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initPortfolio();
  
  // Add revealed class to sections in view on load
  revealOnScroll();
  
  // Add revealed class to sections as they come into view on scroll
  window.addEventListener('scroll', revealOnScroll);
});