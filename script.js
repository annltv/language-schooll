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
// ===== ТЕСТ НА УРОВЕНЬ (15 вопросов) =====
const testQuestions = [
    {
        question: 'Выберите правильное слово: "I ____ to school every day."',
        options: ['go', 'goes', 'going', 'went'],
        correct: 0
    },
    {
        question: 'Как переводится "Hello"?',
        options: ['Привет', 'Пока', 'Спасибо', 'Доброе утро'],
        correct: 0
    },
    {
        question: 'Выберите правильный перевод: "She is a teacher."',
        options: ['Он учитель', 'Она учительница', 'Они учителя', 'Мы учителя'],
        correct: 1
    },
    {
        question: 'Что означает "Благодарю" по-английски?',
        options: ['Please', 'Sorry', 'Thank you', 'Goodbye'],
        correct: 2
    },
    {
        question: 'Выберите правильный вариант: "We ____ playing football now."',
        options: ['am', 'is', 'are', 'be'],
        correct: 2
    },
    {
        question: 'Как сказать "Я люблю музыку" по-английски?',
        options: ['I love music', 'I like music', 'I enjoy music', 'I want music'],
        correct: 0
    },
    {
        question: 'Что означает слово "Beautiful"?',
        options: ['Уродливый', 'Красивый', 'Большой', 'Маленький'],
        correct: 1
    },
    {
        question: 'Выберите правильный артикль: "____ apple"',
        options: ['a', 'an', 'the', 'none'],
        correct: 1
    },
    {
        question: 'Как переводится "Thank you very much"?',
        options: ['Пожалуйста', 'Большое спасибо', 'Извините', 'Добрый день'],
        correct: 1
    },
    {
        question: 'Выберите правильную форму: "They ____ to the park yesterday."',
        options: ['go', 'goes', 'went', 'going'],
        correct: 2
    },
    {
        question: 'Что означает "До свидания" по-английски?',
        options: ['Hello', 'Goodbye', 'Sorry', 'Please'],
        correct: 1
    },
    {
        question: 'Как спросить "Как дела?" по-английски?',
        options: ['How are you?', 'What is your name?', 'Where are you?', 'How old are you?'],
        correct: 0
    },
    {
        question: 'Выберите правильный вариант: "She ____ a student."',
        options: ['am', 'is', 'are', 'be'],
        correct: 1
    },
    {
        question: 'Что означает слово "Friend"?',
        options: ['Враг', 'Друг', 'Семья', 'Коллега'],
        correct: 1
    },
    {
        question: 'Как переводится "I am happy"?',
        options: ['Я грустный', 'Я счастливый', 'Я устал', 'Я голоден'],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];
let testStarted = false;

// Функция для отображения вопроса
function renderQuestion(index) {
    const container = document.getElementById('testContent');
    const question = testQuestions[index];
    const total = testQuestions.length;
    const progress = Math.round(((index + 1) / total) * 100);
    
    let html = `
        <div class="test-question" id="question${index + 1}">
            <div class="question-header">
                <span class="question-number">Вопрос ${index + 1} из ${total}</span>
                <span class="question-progress">${progress}%</span>
            </div>
            <div class="progress-bar-full">
                <div class="progress-bar-fill" style="width: ${progress}%;"></div>
            </div>
            <h3>${question.question}</h3>
            <div class="test-options">
    `;
    
    question.options.forEach((option, optIndex) => {
        const letter = String.fromCharCode(65 + optIndex); // A, B, C, D
        html += `
            <button class="test-option" data-question="${index}" data-option="${optIndex}" data-correct="${optIndex === question.correct ? 'true' : 'false'}">
                <span class="option-letter">${letter}.</span> ${option}
            </button>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    
    // Добавляем обработчики на кнопки
    document.querySelectorAll('.test-option').forEach(btn => {
        btn.addEventListener('click', function() {
            handleAnswer(this);
        });
    });
    
    // Обновляем прогресс
    updateProgress(index);
}

// Обработка ответа
function handleAnswer(button) {
    if (button.disabled) return;
    
    const questionIndex = parseInt(button.dataset.question);
    const selectedOption = parseInt(button.dataset.option);
    const isCorrect = button.dataset.correct === 'true';
    
    // Сохраняем ответ
    userAnswers[questionIndex] = selectedOption;
    
    // Блокируем все кнопки в текущем вопросе
    const allOptions = button.parentElement.querySelectorAll('.test-option');
    allOptions.forEach(opt => {
        opt.disabled = true;
        if (opt.dataset.correct === 'true') {
            opt.classList.add('correct');
        } else if (opt === button && !isCorrect) {
            opt.classList.add('wrong');
        }
    });
    
    // Переход к следующему вопросу или показ результата
    setTimeout(() => {
        const nextIndex = questionIndex + 1;
        if (nextIndex < testQuestions.length) {
            renderQuestion(nextIndex);
        } else {
            showResult();
        }
    }, 800);
}

// Обновление прогресса
function updateProgress(index) {
    const total = testQuestions.length;
    const progress = Math.round(((index + 1) / total) * 100);
    const progressFill = document.querySelector('.progress-bar-fill');
    if (progressFill) {
        progressFill.style.width = progress + '%';
    }
}

// Показать результат
function showResult() {
    const container = document.getElementById('testContent');
    const correctCount = userAnswers.reduce((count, answer, index) => {
        return count + (answer === testQuestions[index].correct ? 1 : 0);
    }, 0);
    
    let level, detail, icon;
    const percent = (correctCount / testQuestions.length) * 100;
    
    if (percent >= 90) {
        level = '🌟 Продвинутый (C1-C2)';
        detail = 'Вы отлично владеете языком! Рекомендуем курсы для продвинутых.';
        icon = '🏆';
    } else if (percent >= 70) {
        level = '📚 Средне-продвинутый (B2)';
        detail = 'Хороший результат! Предлагаем курсы B2 для дальнейшего развития.';
        icon = '🌟';
    } else if (percent >= 50) {
        level = '📖 Средний (B1)';
        detail = 'Неплохо! Рекомендуем курсы B1 для укрепления знаний.';
        icon = '💪';
    } else if (percent >= 30) {
        level = '📗 Начально-средний (A2)';
        detail = 'Вы уже знаете основы! Курсы A2 помогут улучшить навыки.';
        icon = '📚';
    } else {
        level = '📘 Начальный (A1)';
        detail = 'Все начинается с первого шага! Приглашаем на курсы A1.';
        icon = '🌱';
    }
    
    const html = `
        <div class="test-result">
            <div class="result-icon">${icon}</div>
            <h3>🎉 Тест завершен!</h3>
            <div class="result-level">${level}</div>
            <p class="result-detail">${detail}</p>
            <div class="result-stats">
                <span class="stat-correct">✅ Правильно: ${correctCount}</span>
                <span class="stat-wrong">❌ Неправильно: ${testQuestions.length - correctCount}</span>
            </div>
            <p class="result-percent">Точность: ${Math.round(percent)}%</p>
            <button class="test-retry" onclick="resetTest()">🔄 Пройти заново</button>
            <button class="test-consult-btn" onclick="document.getElementById('contacts').scrollIntoView({behavior: 'smooth'})">
                📞 Записаться на курс
            </button>
        </div>
    `;
    
    container.innerHTML = html;
}

// Сброс теста
function resetTest() {
    currentQuestionIndex = 0;
    userAnswers = [];
    testStarted = false;
    renderQuestion(0);
    window.scrollTo({ top: document.getElementById('level-test').offsetTop - 100, behavior: 'smooth' });
}

// Запуск теста при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация теста
    const testContainer = document.getElementById('testContent');
    if (testContainer) {
        renderQuestion(0);
    }
});
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
