document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Videos data
    const videos = [
        {
            id: "video1",
            title: "Konfiguracja elektronowa - najprostszy sposób",
            thumbnail: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            duration: "15 min",
            views: "250K"
        },
        {
            id: "video2",
            title: "Mol i masa molowa - szybka powtórka",
            thumbnail: "https://images.pexels.com/photos/954585/pexels-photo-954585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            duration: "12 min",
            views: "180K"
        },
        {
            id: "video3",
            title: "Stechiometria - jak rozwiązywać zadania",
            thumbnail: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            duration: "20 min",
            views: "320K"
        },
        {
            id: "video4",
            title: "Skład procentowy związków chemicznych",
            thumbnail: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            duration: "18 min",
            views: "210K"
        },
        {
            id: "video5",
            title: "Kwasy i zasady - teoria Brønsteda-Lowry'ego",
            thumbnail: "https://images.pexels.com/photos/4019766/pexels-photo-4019766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            duration: "25 min",
            views: "280K"
        },
        {
            id: "video6",
            title: "Reakcje redoks - bilansowanie",
            thumbnail: "https://images.pexels.com/photos/163037/london-millennium-bridge-st-pauls-cathedral-church-163037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            duration: "22 min",
            views: "195K"
        }
    ];

    // Populate videos grid
    const videoGrid = document.querySelector('.video-grid');
    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
      <div class="video-thumbnail">
        <img src="${video.thumbnail}" alt="${video.title}">
        <div class="video-play-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF0000">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
      <div class="video-info">
        <h3 class="video-title">${video.title}</h3>
        <div class="video-stats">
          <span>${video.duration}</span>
          <span>•</span>
          <span>${video.views} wyświetleń</span>
        </div>
      </div>
    `;
        videoGrid.appendChild(videoCard);
    });

    // Topics data
    const topics = [
        {
            id: "topic1",
            title: "Chemia nieorganiczna",
            description: "Pierwiastki, związki nieorganiczne, reakcje w roztworach wodnych.",
            color: "from-blue-500 to-blue-700"
        },
        {
            id: "topic2",
            title: "Chemia organiczna",
            description: "Węglowodory, ich pochodne, reakcje organiczne i mechanizmy.",
            color: "from-purple-500 to-purple-700"
        },
        {
            id: "topic3",
            title: "Budowa atomu",
            description: "Struktura atomu, orbitale atomowe, wiązania chemiczne.",
            color: "from-red-500 to-red-700"
        },
        {
            id: "topic4",
            title: "Termochemia",
            description: "Energia w reakcjach chemicznych, entropia, entalpia.",
            color: "from-orange-500 to-orange-700"
        },
        {
            id: "topic5",
            title: "Równowagi chemiczne",
            description: "Prawo działania mas, stałe równowagi, równowagi kwasowo-zasadowe.",
            color: "from-green-500 to-green-700"
        },
        {
            id: "topic6",
            title: "Biochemia",
            description: "Białka, węglowodany, lipidy, kwasy nukleinowe.",
            color: "from-teal-500 to-teal-700"
        }
    ];

    // Populate topics grid
    const topicsGrid = document.querySelector('.topics-grid');
    topics.forEach(topic => {
        const topicCard = document.createElement('div');
        topicCard.className = 'topic-card';
        topicCard.innerHTML = `
      <div class="topic-icon bg-gradient-to-r ${topic.color}">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2v20M2 12h20"/>
        </svg>
      </div>
      <h3 class="topic-title">${topic.title}</h3>
      <p class="topic-description">${topic.description}</p>
      <a href="#" class="btn btn-secondary">Zobacz materiały</a>
    `;
        topicsGrid.appendChild(topicCard);
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);

        // Show success message (in production, you'd send this to a server)
        const successMessage = document.createElement('div');
        successMessage.className = 'form-message success';
        successMessage.textContent = 'Wiadomość została wysłana. Dziękujemy za kontakt!';
        contactForm.appendChild(successMessage);

        // Reset form
        contactForm.reset();

        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    });

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');

        // Show success message (in production, you'd send this to a server)
        const successMessage = document.createElement('div');
        successMessage.className = 'form-message success';
        successMessage.textContent = 'Dziękujemy za zapisanie się do newslettera!';
        newsletterForm.appendChild(successMessage);

        // Reset form
        input.value = '';

        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    });

    // Update copyright year
    document.getElementById('current-year').textContent = new Date().getFullYear();
});