const burger = document.querySelector('.burger-menu');
const menu = document.querySelector('.header-mobile');
const item = document.querySelector('.header-mobile-menu-item');
const submenu = document.querySelector('.submenu-mobile');
burger.addEventListener('click', () => {
    menu.classList.toggle('open');
    burger.classList.toggle('open');
    if (menu.classList.contains('open')) {
        document.body.style.overflow = 'hidden'; // Фиксируем скролл
    } else {
        document.body.style.overflow = ''; // Возвращаем скролл
    }
});
if (item) {
    item.addEventListener('click', function () {
        this.classList.toggle('active');
        submenu.classList.toggle('active');
    });
}

const swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 5000, // Задержка между слайдами
        disableOnInteraction: false,
    },
    on: {
        init: function () {
            createProgressBars(this.slides.length);
            updateProgressBars(this);
        },
        slideChange: function () {
            updateProgressBars(this);
        },
        autoplayTimeLeft: function (swiper, time, progress) {
            updateActiveProgressBar(swiper, progress);
        },
    },
});

// Создаем прогресс-бары
function createProgressBars(slidesCount) {
    const pagination = document.querySelector('.custom-pagination');
    pagination.innerHTML = ''; // Очищаем, если уже есть
    for (let i = 0; i < slidesCount; i++) {
        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        pagination.appendChild(progressBar);
    }
}

// Обновляем активный прогресс-бар
function updateProgressBars(swiper) {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach((bar, index) => {
        if (index === swiper.activeIndex) {
            bar.classList.add('active');
        } else {
            bar.classList.remove('active');
            bar.style.setProperty('--progress', 0); // Сбрасываем прогресс
        }
    });
}

// Обновляем заполнение активного прогресс-бара
function updateActiveProgressBar(swiper, progress) {
    const activeProgressBar = document.querySelector('.progress-bar.active');
    if (activeProgressBar) {
        activeProgressBar.style.setProperty('--progress', (1 - progress));
        const afterElement = activeProgressBar.querySelector('::after');
        if (afterElement) {
            afterElement.style.width = `${(1 - progress) * 100}%`;
        }
    }
}
const formButtons = document.querySelectorAll('.form-button, .header-form-button');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
const phoneInput = document.getElementById('phone');

// Открытие модального окна
formButtons.forEach(button => {
    button.addEventListener('click', () => {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Блокируем скролл
    });
});

// Закрытие модального окна
closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
    document.body.style.overflow = ''; // Восстанавливаем скролл
});

// Маска для телефона
phoneInput.addEventListener('input', handlePhoneInput);

function handlePhoneInput(e) {
    const input = e.target;
    let cleaned = input.value.replace(/\D/g, '');
    if (cleaned.startsWith('7')) cleaned = cleaned.substring(1);

    let formatted = '+7 ';
    if (e.inputType === 'deleteContentBackward') {
        formatted -= cleaned.substring(0, 10);
    }
    else {
        if (cleaned.length > 0) formatted += '(';
        formatted += cleaned.substring(0, 3);
        if (cleaned.length >= 3) formatted += ') ';
        formatted += cleaned.substring(3, 6);
        if (cleaned.length >= 6) formatted += '-';
        formatted += cleaned.substring(6, 8);
        if (cleaned.length >= 8) formatted += '-';
        formatted += cleaned.substring(8, 10);
    }


    input.value = formatted.trim();
}