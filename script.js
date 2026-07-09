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
// ===== ТЕСТ НА УРОВЕНЬ =====
let currentQuestion = 1;
let correctAnswers = 0;
let testStarted = false;

// Обработка ответов на тест
document.querySelectorAll('.test-option').forEach(button => {
    button.addEventListener('click', function() {
        if (this.disabled || testStarted) return;
        
        const isCorrect = this.dataset.correct === 'true';
        const allOptions = this.parentElement.querySelectorAll('.test-option');
        
        // Блокируем все кнопки в текущем вопросе
        allOptions.forEach(opt => {
            opt.disabled = true;
            if (opt.dataset.correct === 'true') {
                opt.classList.add('correct');
            } else if (opt === this && !isCorrect) {
                opt.classList.add('wrong');
            }
        });
        
        if (isCorrect) correctAnswers++;
        
        // Переход к следующему вопросу
        setTimeout(() => {
            const current = document.getElementById(`question${currentQuestion}`);
            current.style.display = 'none';
            currentQuestion++;
            
            if (currentQuestion <= 5) {
                document.getElementById(`question${currentQuestion}`).style.display = 'block';
                // Обновляем прогресс
                const progress = document.querySelector(`#question${currentQuestion} .question-progress`);
                if (progress) {
                    progress.textContent = `${(currentQuestion - 1) * 20}%`;
                }
            } else {
                showTestResult();
            }
        }, 800);
    });
});

function showTestResult() {
    const resultDiv = document.getElementById('testResult');
    resultDiv.style.display = 'block';
    
    let level, detail;
    switch(correctAnswers) {
        case 5:
            level = '🌟 Продвинутый (C1-C2)';
            detail = 'Вы отлично владеете языком! Рекомендуем курсы для продвинутых.';
            break;
        case 4:
            level = '📚 Средне-продвинутый (B2)';
            detail = 'Хороший результат! Предлагаем курсы B2 для дальнейшего развития.';
            break;
        case 3:
            level = '📖 Средний (B1)';
            detail = 'Неплохо! Рекомендуем курсы B1 для укрепления знаний.';
            break;
        case 2:
            level = '📗 Начально-средний (A2)';
            detail = 'Вы уже знаете основы! Курсы A2 помогут улучшить навыки.';
            break;
        default:
            level = '📘 Начальный (A1)';
            detail = 'Все начинается с первого шага! Приглашаем на курсы A1.';
    }
    
    document.getElementById('levelResult').textContent = level;
    document.getElementById('resultDetail').textContent = `${detail} Правильных ответов: ${correctAnswers}/5`;
}

function resetTest() {
    currentQuestion = 1;
    correctAnswers = 0;
    testStarted = false;
    
    document.querySelectorAll('.test-question').forEach(q => q.style.display = 'none');
    document.getElementById('question1').style.display = 'block';
    document.getElementById('testResult').style.display = 'none';
    
    document.querySelectorAll('.test-option').forEach(opt => {
        opt.disabled = false;
        opt.classList.remove('correct', 'wrong');
    });
    
    // Обновляем прогресс для первого вопроса
    const progress = document.querySelector('#question1 .question-progress');
    if (progress) progress.textContent = '20%';
}

// ===== ОТЗЫВЫ (показать больше) =====
let reviewCount = 4;

function showMoreReviews() {
    const container = document.getElementById('reviewsContainer');
    
    // Дополнительные отзывы
    const moreReviews = [
        {
            avatar: '👨',
            name: 'Павел Новиков',
            course: '🇬🇧 Английский B2',
            stars: '⭐⭐⭐⭐⭐',
            text: 'Отличная школа! Преподаватели профессионалы, материалы актуальные. Уже через месяц почувствовал прогресс в разговорной речи.',
            date: '25 мая 2026'
        },
        {
            avatar: '👩',
            name: 'Ольга Соколова',
            course: '🇨🇳 Китайский HSK 2',
            stars: '⭐⭐⭐⭐⭐',
            text: 'Китайский язык стал для меня открытием! Благодаря преподавателям я не только выучила иероглифы, но и полюбила китайскую культуру.',
            date: '20 мая 2026'
        },
        {
            avatar: '👨',
            name: 'Игорь Морозов',
            course: '🇪🇸 Испанский A2',
            stars: '⭐⭐⭐⭐',
            text: 'Испанский теперь мой любимый язык! Уроки проходят весело и интересно. Особенно нравится разговорная практика с носителями.',
            date: '15 мая 2026'
        }
    ];
    
    // Показываем по 2 отзыва за раз
    const start = reviewCount - 4;
    const end = Math.min(reviewCount + 2, 4 + moreReviews.length);
    
    for (let i = start; i < end && i < moreReviews.length + 4; i++) {
        if (i >= 4) {
            const review = moreReviews[i - 4];
            const card = document.createElement('div');
            card.className = 'review-card';
            card.style.animation = 'fadeIn 0.5s ease';
            card.innerHTML = `
                <div class="review-header">
                    <div class="review-avatar">${review.avatar}</div>
                    <div class="review-user">
                        <h4>${review.name}</h4>
                        <span class="review-course">${review.course}</span>
                    </div>
                    <div class="review-stars">${review.stars}</div>
                </div>
                <p class="review-text">"${review.text}"</p>
                <span class="review-date">${review.date}</span>
            `;
            container.appendChild(card);
        }
    }
    
    reviewCount += 2;
    
    // Скрываем кнопку если больше нет отзывов
    if (reviewCount >= 4 + moreReviews.length) {
        document.querySelector('.reviews-showmore').style.display = 'none';
    }
}

// ===== АНИМАЦИЯ ДЛЯ КАРТЫ СТУДЕНТОВ =====
const mapSection = document.querySelector('.map-students');
let mapAnimated = false;

const mapObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !mapAnimated) {
        mapAnimated = true;
        document.querySelectorAll('.country-fill').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }
});

mapObserver.observe(mapSection);
