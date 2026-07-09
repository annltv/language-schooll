// Обработка формы с отправкой
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Проверка заполнения
        const name = this.querySelector('input[type="text"]').value.trim();
        const phone = this.querySelector('input[type="tel"]').value.trim();
        const language = this.querySelector('select').value;

        if (!name || !phone || !language) {
            showToast('Пожалуйста, заполните все поля!', 'error');
            return;
        }

        // Имитация отправки на сервер
        showToast('✓ Заявка отправлена! Мы свяжемся с вами скоро.', 'success');

        // Очистка формы
        this.reset();

        // Отправка данных (здесь можно добавить реальный запрос)
        console.log('Данные формы:', {
            name: name,
            phone: phone,
            language: language
        });
    });

    // Функция показа уведомления
    function showToast(message, type = 'success') {
        toast.textContent = message;
        toast.style.background = type === 'error' 
            ? 'rgba(220, 53, 69, 0.9)' 
            : 'rgba(0, 0, 0, 0.8)';
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Плавная прокрутка для всех ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
// Анимация появления при скролле
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.course, .teacher-card').forEach(el => {
    observer.observe(el);
});
// Калькулятор стоимости
const languageSelect = document.getElementById('languageSelect');
const levelSelect = document.getElementById('levelSelect');
const priceDisplay = document.getElementById('priceDisplay');

function updatePrice() {
    const basePrice = parseFloat(languageSelect.value);
    const level = parseFloat(levelSelect.value);
    const total = Math.round(basePrice * level);
    priceDisplay.textContent = total;
}

languageSelect.addEventListener('change', updatePrice);
levelSelect.addEventListener('change', updatePrice);
// Переключение темы
const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
});
// Обратный отсчет (до 1 сентября 2026)
function startCountdown() {
    const targetDate = new Date('September 1, 2026 00:00:00').getTime();
    
    setInterval(() => {
        const now = new Date().getTime();
        const diff = targetDate - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }, 1000);
}
startCountdown();
