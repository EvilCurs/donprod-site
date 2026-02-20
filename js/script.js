// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe sections
  document.querySelectorAll('.why-us, .products, .partner-products, .stats, .production, .gallery, .reviews, .cta-section, .contacts, .form-section, footer').forEach(section => {
    observer.observe(section);
  });

  // Observe individual cards and items
  document.querySelectorAll('.feature-card, .product-item, .partner-product-item, .stat-item, .fan-image, .advantage-card, .gallery-item, .review-card, .contact-item, .form-card, .newsletter img').forEach(item => {
    observer.observe(item);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: 'smooth'
        });
        
        // Закрываем мобильное меню после клика
        if (window.innerWidth <= 767) {
          const mainNav = document.getElementById('main-nav');
          const navToggle = document.getElementById('nav-toggle');
          if (mainNav && navToggle) {
            mainNav.classList.remove('active');
            navToggle.innerHTML = '<i class="ri-menu-line"></i>';
          }
        }
      }
    });
  });

  // Add rotation values for product cards
  document.querySelectorAll('.product-card').forEach((card, index) => {
    const rotations = ['-2deg', '2deg', '-1deg'];
    card.style.setProperty('--rotate', rotations[index] || '0deg');
  });

  // Анимация появления карточек продуктов
  const productItems = document.querySelectorAll('.product-item');
  productItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });

  // Анимация для карточек преимуществ
  const advantageCards = document.querySelectorAll('.advantage-card');
  advantageCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });
});

// Скрипт для изменения цвета хедера при прокрутке
window.addEventListener('scroll', function() {
  const header = document.getElementById('main-header');
  const scrollPosition = window.scrollY;
  
  if (scrollPosition > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Мобильное меню - проверяем существование элементов
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      mainNav.classList.toggle('active');
      this.innerHTML = mainNav.classList.contains('active') 
        ? '<i class="ri-close-line"></i>' 
        : '<i class="ri-menu-line"></i>';
    });

    // Закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
      if (mainNav.classList.contains('active') && 
          !mainNav.contains(e.target) && 
          e.target !== navToggle) {
        mainNav.classList.remove('active');
        navToggle.innerHTML = '<i class="ri-menu-line"></i>';
      }
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('#main-nav a').forEach(link => {
      link.addEventListener('click', function() {
        mainNav.classList.remove('active');
        navToggle.innerHTML = '<i class="ri-menu-line"></i>';
      });
    });
  }
});

// Функция открытия модального окна
function openModal(productType) {
  const modal = document.getElementById('product-modal');
  const modalTitle = document.getElementById('modal-title');
  const productList = document.getElementById('modal-product-list');
  
  if (!modal || !modalTitle || !productList) return;
  
  // Очищаем список
  productList.innerHTML = '';
  
  // Устанавливаем заголовок
  if (productData[productType]) {
    modalTitle.textContent = productData[productType].title;
    
    // Добавляем товары
    productData[productType].products.forEach(product => {
      const productItem = document.createElement('div');
      productItem.className = 'modal-product-item';
      productItem.innerHTML = `
        <img src="${product.img}" alt="${product.name}" class="modal-product-img">
        <div class="modal-product-info">
          <div class="modal-product-name">${product.name}</div>
          <div class="modal-product-specs">${product.specs}</div>
        </div>
      `;
      productList.appendChild(productItem);
    });
    
    // Показываем модальное окно
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

// Функция закрытия модального окна
function closeModal() {
  const modal = document.getElementById('product-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Закрытие модального окна при клике на overlay
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('product-modal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal();
      }
    });
  }
});

// Закрытие модального окна при нажатии Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// Предотвращаем всплытие события при клике на кнопку внутри карточки
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.product-item .btn-details').forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });
});

// Добавляем обработчик ошибок для файлов
window.addEventListener('error', function(e) {
  if (e.target.tagName === 'A' && 
      (e.target.href && (e.target.href.includes('каталог.pdf') || e.target.href.includes('прайс-лист.xlsx')))) {
    alert('Файл не найден. Убедитесь, что файлы "каталог.pdf" и "прайс-лист.xlsx" находятся в корневой папке сайта.');
    e.preventDefault();
  }
}, true);