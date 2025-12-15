// ============================================
// سیستم کامل آموزشی A1 با لایتنر و تست
// ============================================

// پایگاه داده کامل 200 لغت A1
const A1_DICTIONARY = {
    // 1-20
    "be": {
        persian: "بودن",
        englishDefinition: "To exist or have a quality.",
        example: { english: "I want to be a teacher.", persian: "من می‌خواهم یک معلم باشم." },
        collocation: { english: "be happy", persian: "خوشحال بودن" },
        phrase: { english: "be careful", persian: "مواظب باش" },
        phrasalVerb: { english: "be up to", persian: "در حال انجام کاری بودن" }
    },
    "have": {
        persian: "داشتن",
        englishDefinition: "To own or possess something.",
        example: { english: "I have a book.", persian: "من یک کتاب دارم." },
        collocation: { english: "have time", persian: "زمان داشتن" },
        phrase: { english: "have a good day", persian: "روز خوبی داشته باشی" },
        phrasalVerb: { english: "have to", persian: "مجبور بودن" }
    },
    "go": {
        persian: "رفتن",
        englishDefinition: "To move from one place to another.",
        example: { english: "I go to school.", persian: "من به مدرسه می‌روم." },
        collocation: { english: "go home", persian: "به خانه رفتن" },
        phrase: { english: "go for it", persian: "انجامش بده" },
        phrasalVerb: { english: "go on", persian: "ادامه دادن" }
    },
    "work": {
        persian: "کار کردن",
        englishDefinition: "To do a job or activity.",
        example: { english: "I work in an office.", persian: "من در یک دفتر کار می‌کنم." },
        collocation: { english: "work hard", persian: "سخت کار کردن" },
        phrase: { english: "work in progress", persian: "در حال انجام" },
        phrasalVerb: { english: "work out", persian: "ورزش کردن" }
    },
    "see": {
        persian: "دیدن",
        englishDefinition: "To use your eyes to look.",
        example: { english: "I see a bird.", persian: "من یک پرنده می‌بینم." },
        collocation: { english: "see film", persian: "فیلم دیدن" },
        phrase: { english: "see you later", persian: "بعداً می‌بینمت" },
        phrasalVerb: { english: "see to", persian: "مراقب بودن" }
    },
    "say": {
        persian: "گفتن",
        englishDefinition: "To speak words.",
        example: { english: "Say your name.", persian: "اسمت را بگو." },
        collocation: { english: "say hello", persian: "سلام گفتن" },
        phrase: { english: "say when", persian: "وقتی کافی است بگو" },
        phrasalVerb: { english: "say up", persian: "بلند گفتن" }
    },
    "know": {
        persian: "دانستن",
        englishDefinition: "To have information.",
        example: { english: "I know the answer.", persian: "من جواب را می‌دانم." },
        collocation: { english: "know person", persian: "کسی را شناختن" },
        phrase: { english: "you know", persian: "می‌دونی" },
        phrasalVerb: { english: "know about", persian: "درباره چیزی دانستن" }
    },
    "like": {
        persian: "دوست داشتن",
        englishDefinition: "To find pleasant.",
        example: { english: "I like coffee.", persian: "من قهوه دوست دارم." },
        collocation: { english: "like music", persian: "موسیقی دوست داشتن" },
        phrase: { english: "like that", persian: "مثل آن" },
        phrasalVerb: { english: "like to", persian: "دوست داشتن که" }
    },
    "time": {
        persian: "زمان",
        englishDefinition: "Minutes, hours, days.",
        example: { english: "What time is it?", persian: "ساعت چند است؟" },
        collocation: { english: "long time", persian: "زمان طولانی" },
        phrase: { english: "time after time", persian: "بارها و بارها" },
        phrasalVerb: { english: "time out", persian: "وقت تمام شدن" }
    },
    "people": {
        persian: "مردم",
        englishDefinition: "Human beings.",
        example: { english: "Many people live here.", persian: "مردم زیادی اینجا زندگی می‌کنند." },
        collocation: { english: "young people", persian: "جوانان" },
        phrase: { english: "people say", persian: "مردم می‌گویند" },
        phrasalVerb: { english: "people up", persian: "پر از جمعیت کردن" }
    },
    // می‌توانید بقیه 190 لغت را اینجا اضافه کنید
};

// وضعیت برنامه
const appState = {
    // تنظیمات کاربر
    isMuted: false,
    isGuest: true,
    userId: null,
    activationCode: null,
    teacherChatId: null, // آی‌دی تلگرام شما
    
    // آمار
    searchCount: 0,
    savedWords: [],
    dailyTests: [],
    totalPracticeTime: 0,
    
    // سیستم لایتنر
    leitnerSystem: {
        boxes: {
            1: [], // هر روز
            2: [], // هر 2 روز
            3: [], // هر 4 روز
            4: [], // هر 8 روز
            5: []  // هر 16 روز
        },
        lastReview: {},
        nextReview: {},
        stats: {
            totalWords: 0,
            masteredWords: 0,
            reviewQueue: 0
        }
    },
    
    // تست روزانه
    dailyTest: {
        date: null,
        words: [],
        currentQuestion: 0,
        score: 0,
        completed: false,
        timeSpent: 0
    },
    
    // پیشرفت
    progress: {
        streak: 0,
        lastActive: null,
        totalWordsLearned: 0,
        accuracy: 0,
        level: 1
    },
    
    // UI state
    currentPage: 'dictionary'
};

// المنت‌های DOM
const elements = {
    // نوار بالایی
    soundControl: document.getElementById('soundControl'),
    userStatus: document.getElementById('userStatus'),
    userTypeText: document.getElementById('userTypeText'),
    searchCountBadge: document.getElementById('searchCountBadge'),
    activateBtn: document.getElementById('activateBtn'),
    
    // ناوبری
    navBtns: document.querySelectorAll('.nav-btn'),
    savedCountBadge: document.getElementById('savedCountBadge'),
    leitnerCountBadge: document.getElementById('leitnerCountBadge'),
    testCountBadge: document.getElementById('testCountBadge'),
    
    // محتوا
    contentArea: document.getElementById('contentArea'),
    
    // فعال‌سازی
    activationPanel: document.getElementById('activationPanel'),
    activationCodeInput: document.getElementById('activationCodeInput'),
    submitActivationBtn: document.getElementById('submitActivationBtn'),
    closeActivationBtn: document.getElementById('closeActivationBtn'),
    
    // مدال
    messageModal: document.getElementById('messageModal'),
    modalTitle: document.getElementById('modalTitle'),
    modalBody: document.getElementById('modalBody'),
    modalFooter: document.getElementById('modalFooter'),
    
    // نوت‌فیکیشن
    notificationContainer: document.getElementById('notificationContainer')
};

// ============================================
// تابع‌های اولیه
// ============================================

// بارگذاری برنامه
function initApp() {
    loadState();
    setupEventListeners();
    updateUI();
    showDictionaryPage();
    
    // بررسی تست روزانه
    checkDailyTest();
    
    // بررسی لایتنر
    checkLeitnerReviews();
    
    // گزارش بازدید
    sendTelegramReport('app_start', {
        userId: appState.userId,
        isGuest: appState.isGuest
    });
}

// بارگذاری از localStorage
function loadState() {
    const saved = localStorage.getItem('a1_dictionary_state');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            
            // فقط بعضی ویژگی‌ها را بارگذاری کن
            appState.isMuted = parsed.isMuted || false;
            appState.isGuest = parsed.isGuest !== undefined ? parsed.isGuest : true;
            appState.userId = parsed.userId || null;
            appState.searchCount = parsed.searchCount || 0;
            appState.savedWords = parsed.savedWords || [];
            appState.leitnerSystem = parsed.leitnerSystem || appState.leitnerSystem;
            appState.progress = parsed.progress || appState.progress;
            
            // اگر کاربر فعال شده
            if (!appState.isGuest) {
                showNotification('حساب شما فعال است!', 'success');
            }
        } catch (error) {
            console.error('خطا در بارگذاری:', error);
            resetState();
        }
    }
}

// ذخیره در localStorage
function saveState() {
    localStorage.setItem('a1_dictionary_state', JSON.stringify(appState));
}

// ریست وضعیت
function resetState() {
    appState.isGuest = true;
    appState.searchCount = 0;
    appState.savedWords = [];
    appState.leitnerSystem = {
        boxes: {1: [], 2: [], 3: [], 4: [], 5: []},
        lastReview: {},
        nextReview: {},
        stats: {totalWords: 0, masteredWords: 0, reviewQueue: 0}
    };
    saveState();
    updateUI();
    showNotification('داده‌ها ریست شدند', 'info');
}

// ============================================
// مدیریت رویدادها
// ============================================

function setupEventListeners() {
    // کنترل صدا
    elements.soundControl.addEventListener('click', toggleSound);
    
    // فعال‌سازی
    elements.activateBtn.addEventListener('click', showActivationPanel);
    elements.submitActivationBtn.addEventListener('click', submitActivation);
    elements.closeActivationBtn.addEventListener('click', hideActivationPanel);
    
    // ناوبری
    elements.navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.dataset.page;
            switchPage(page);
        });
    });
    
    // کلید Enter در input فعال‌سازی
    elements.activationCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') submitActivation();
    });
}

// ============================================
// مدیریت صفحات
// ============================================

function switchPage(page) {
    appState.currentPage = page;
    
    // آپدیت ناوبری
    elements.navBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.page === page) {
            btn.classList.add('active');
        }
    });
    
    // نمایش صفحه مربوطه
    switch(page) {
        case 'dictionary':
            showDictionaryPage();
            break;
        case 'saved':
            showSavedWordsPage();
            break;
        case 'leitner':
            showLeitnerPage();
            break;
        case 'test':
            showTestPage();
            break;
        case 'progress':
            showProgressPage();
            break;
    }
    
    updateUI();
}

// صفحه دیکشنری
function showDictionaryPage() {
    const html = `
        <div class="dictionary-page">
            <div class="search-section">
                <div class="search-container">
                    <input type="text" 
                           class="search-input" 
                           id="searchInput"
                           placeholder="کلمه انگلیسی را وارد کنید..."
                           dir="ltr">
                    <button class="search-btn" id="searchButton">
                        <i class="fas fa-search"></i>
                        جستجو
                    </button>
                </div>
                <div class="quick-words">
                    <p>کلمات پرکاربرد:</p>
                    ${['be', 'have', 'go', 'work', 'see', 'say', 'know', 'like'].map(word => `
                        <span class="word-chip" onclick="quickSearch('${word}')">${word}</span>
                    `).join('')}
                </div>
            </div>
            <div id="dictionaryResults">
                <div class="welcome-message">
                    <div style="text-align: center; padding: 40px 20px;">
                        <i class="fas fa-book-open" style="font-size: 48px; color: var(--primary); margin-bottom: 20px;"></i>
                        <h2 style="margin-bottom: 16px; color: var(--text-dark);">دیکشنری آموزشی A1</h2>
                        <p style="color: var(--text-light); margin-bottom: 24px;">کلمه انگلیسی مورد نظر خود را جستجو کنید</p>
                        <div class="user-limit-info">
                            ${appState.isGuest ? 
                                `<p style="background: #fff3cd; padding: 12px; border-radius: 8px; border: 1px solid #ffeaa7; color: #856404;">
                                    <i class="fas fa-info-circle"></i>
                                    حالت مهمان: ${5 - appState.searchCount} جستجوی باقی‌مانده
                                </p>` : 
                                `<p style="background: #d4edda; padding: 12px; border-radius: 8px; border: 1px solid #c3e6cb; color: #155724;">
                                    <i class="fas fa-check-circle"></i>
                                    حالت زبان‌آموز: جستجوی نامحدود
                                </p>`
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    elements.contentArea.innerHTML = html;
    
    // اضافه کردن event listeners برای صفحه دیکشنری
    setTimeout(() => {
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');
        
        if (searchInput && searchButton) {
            searchButton.addEventListener('click', handleSearch);
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleSearch();
            });
        }
    }, 100);
}

// صفحه ذخیره‌شده‌ها
function showSavedWordsPage() {
    if (appState.savedWords.length === 0) {
        elements.contentArea.innerHTML = `
            <div class="saved-page">
                <div class="page-header">
                    <h2 class="page-title">
                        <i class="fas fa-bookmark"></i>
                        لغت‌های ذخیره شده
                    </h2>
                </div>
                <div style="text-align: center; padding: 60px 20px;">
                    <i class="far fa-bookmark" style="font-size: 64px; color: var(--text-light); margin-bottom: 24px;"></i>
                    <h3 style="color: var(--text-medium); margin-bottom: 16px;">هیچ لغتی ذخیره نکرده‌اید</h3>
                    <p style="color: var(--text-light); margin-bottom: 32px;">برای ذخیره کردن لغت، روی آیکون کتاب در صفحه دیکشنری کلیک کنید</p>
                    <button class="btn-primary" onclick="switchPage('dictionary')">
                        <i class="fas fa-book"></i>
                        برو به دیکشنری
                    </button>
                </div>
            </div>
        `;
        return;
    }
    
    const wordsList = appState.savedWords.map(word => {
        const data = A1_DICTIONARY[word];
        if (!data) return '';
        
        return `
            <div class="word-item" onclick="showWordDetail('${word}')">
                <div class="word-item-info">
                    <div class="word-item-main">
                        <span class="word-item-english">${word}</span>
                        <span class="word-item-persian">${data.persian}</span>
                    </div>
                </div>
                <div class="word-item-actions">
                    <button class="action-btn sound-btn" onclick="event.stopPropagation(); speakWord('${word}')">
                        <i class="fas fa-volume-up"></i>
                    </button>
                    <button class="action-btn save-btn saved" onclick="event.stopPropagation(); removeFromSaved('${word}')">
                        <i class="fas fa-bookmark"></i>
                    </button>
                    <button class="action-btn" onclick="event.stopPropagation(); addToLeitner('${word}')" 
                            style="border-color: var(--success); color: var(--success);" 
                            title="اضافه به لایتنر">
                        <i class="fas fa-brain"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    elements.contentArea.innerHTML = `
        <div class="saved-page">
            <div class="page-header">
                <h2 class="page-title">
                    <i class="fas fa-bookmark"></i>
                    لغت‌های ذخیره شده (${appState.savedWords.length})
                </h2>
                <div class="page-actions">
                    <button class="btn-icon" onclick="practiceSavedWords()">
                        <i class="fas fa-play"></i>
                        تمرین
                    </button>
                    <button class="btn-icon" onclick="exportSavedWords()">
                        <i class="fas fa-download"></i>
                        خروجی
                    </button>
                    ${appState.savedWords.length > 0 ? `
                        <button class="btn-icon" onclick="clearSavedWords()" style="color: var(--danger);">
                            <i class="fas fa-trash"></i>
                            پاک کردن همه
                        </button>
                    ` : ''}
                </div>
            </div>
            <div class="words-list">
                ${wordsList}
            </div>
        </div>
    `;
}

// صفحه لایتنر
function showLeitnerPage() {
    const stats = appState.leitnerSystem.stats;
    const boxes = appState.leitnerSystem.boxes;
    
    // محاسبه لغات برای مرور امروز
    const today = new Date().toDateString();
    const wordsForReview = calculateTodayReviews();
    
    elements.contentArea.innerHTML = `
        <div class="leitner-page">
            <div class="page-header">
                <h2 class="page-title">
                    <i class="fas fa-brain"></i>
                    سیستم لایتنر
                </h2>
                <div class="page-actions">
                    <button class="btn-primary" onclick="startLeitnerPractice()" ${wordsForReview.length === 0 ? 'disabled' : ''}>
                        <i class="fas fa-play"></i>
                        شروع تمرین (${wordsForReview.length})
                    </button>
                    <button class="btn-icon" onclick="showLeitnerInfo()">
                        <i class="fas fa-info-circle"></i>
                        راهنما
                    </button>
                </div>
            </div>
            
            <div class="leitner-system">
                <div class="boxes-container">
                    ${[1, 2, 3, 4, 5].map(boxNum => {
                        const box = boxes[boxNum] || [];
                        const days = Math.pow(2, boxNum - 1);
                        return `
                            <div class="leitner-box box-${boxNum}" onclick="showBoxWords(${boxNum})">
                                <div class="box-title">جعبه ${boxNum}</div>
                                <div class="box-count">${box.length}</div>
                                <div class="box-info">هر ${days} روز</div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="stats-grid" style="grid-template-columns: repeat(4, 1fr); margin-top: 32px;">
                    <div class="stat-card">
                        <div class="stat-card-header">
                            <i class="fas fa-layer-group"></i>
                            <h3>کل لغات</h3>
                        </div>
                        <div class="stat-card-value">${stats.totalWords}</div>
                        <div class="stat-card-label">در سیستم لایتنر</div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-card-header">
                            <i class="fas fa-check-circle"></i>
                            <h3>مسلط شده</h3>
                        </div>
                        <div class="stat-card-value">${stats.masteredWords}</div>
                        <div class="stat-card-label">لغت در جعبه ۵</div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-card-header">
                            <i class="fas fa-clock"></i>
                            <h3>برای مرور</h3>
                        </div>
                        <div class="stat-card-value">${stats.reviewQueue}</div>
                        <div class="stat-card-label">لغت امروز</div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-card-header">
                            <i class="fas fa-chart-line"></i>
                            <h3>دقت</h3>
                        </div>
                        <div class="stat-card-value">${stats.totalWords > 0 ? Math.round((stats.masteredWords / stats.totalWords) * 100) : 0}%</div>
                        <div class="stat-card-label">میانگین دقت</div>
                    </div>
                </div>
                
                ${wordsForReview.length > 0 ? `
                    <div class="practice-session" style="margin-top: 32px;">
                        <div class="session-header">
                            <h3><i class="fas fa-play-circle"></i> تمرین امروز</h3>
                            <p>${wordsForReview.length} لغت برای مرور آماده است</p>
                        </div>
                        <div class="session-controls">
                            <button class="btn-success" onclick="startLeitnerPractice()">
                                <i class="fas fa-play"></i>
                                شروع تمرین
                            </button>
                            <button class="btn-secondary" onclick="postponeReviews()">
                                <i class="fas fa-clock"></i>
                                به فردا موکول کن
                            </button>
                        </div>
                    </div>
                ` : `
                    <div class="practice-session" style="margin-top: 32px; background: #e8f5e9; border-color: var(--success);">
                        <div class="session-header">
                            <h3><i class="fas fa-check-circle"></i> آفرین!</h3>
                            <p>همه لغت‌های امروز را مرور کرده‌اید</p>
                        </div>
                        <p style="text-align: center; color: var(--text-light); margin-bottom: 24px;">
                            می‌توانید لغت جدیدی به سیستم اضافه کنید یا تست روزانه را انجام دهید.
                        </p>
                        <div class="session-controls">
                            <button class="btn-primary" onclick="switchPage('dictionary')">
                                <i class="fas fa-book"></i>
                                برو به دیکشنری
                            </button>
                            <button class="btn-success" onclick="switchPage('test')">
                                <i class="fas fa-file-alt"></i>
                                تست روزانه
                            </button>
                        </div>
                    </div>
                `}
            </div>
        </div>
    `;
}

// صفحه تست روزانه
function showTestPage() {
    const today = new Date().toDateString();
    const todayTest = appState.dailyTests.find(test => test.date === today);
    
    elements.contentArea.innerHTML = `
        <div class="test-page">
            <div class="page-header">
                <h2 class="page-title">
                    <i class="fas fa-file-alt"></i>
                    تست روزانه
                </h2>
                <div class="page-actions">
                    ${todayTest ? `
                        <button class="btn-success" disabled>
                            <i class="fas fa-check-circle"></i>
                            انجام شده (${todayTest.score}/10)
                        </button>
                    ` : `
                        <button class="btn-primary" onclick="startDailyTest()">
                            <i class="fas fa-play"></i>
                            شروع تست
                        </button>
                    `}
                    <button class="btn-icon" onclick="showTestHistory()">
                        <i class="fas fa-history"></i>
                        تاریخچه
                    </button>
                </div>
            </div>
            
            ${todayTest ? `
                <div class="test-container" style="background: #e8f5e9; border-color: var(--success);">
                    <div class="test-header">
                        <h3><i class="fas fa-check-circle"></i> تست امروز انجام شده</h3>
                        <p>امتیاز شما: ${todayTest.score} از 10</p>
                    </div>
                    
                    <div class="stats-grid" style="grid-template-columns: repeat(3, 1fr); margin-top: 24px;">
                        <div class="stat-card">
                            <div class="stat-card-value">${todayTest.score * 10}%</div>
                            <div class="stat-card-label">دقت</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-card-value">${todayTest.timeSpent || '--'}</div>
                            <div class="stat-card-label">زمان صرف شده</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-card-value">${new Date().toLocaleDateString('fa-IR')}</div>
                            <div class="stat-card-label">تاریخ</div>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 32px;">
                        <button class="btn-primary" onclick="reviewTodayTest()">
                            <i class="fas fa-redo"></i>
                            مرور جواب‌ها
                        </button>
                        <button class="btn-secondary" onclick="showTestHistory()" style="margin-right: 12px;">
                            <i class="fas fa-history"></i>
                            تاریخچه تست‌ها
                        </button>
                    </div>
                </div>
            ` : `
                <div class="test-container">
                    <div class="test-header">
                        <h3><i class="fas fa-tasks"></i> تست روزانه</h3>
                        <p>10 سوال از لغت‌های A1 - زمان: 15 دقیقه</p>
                    </div>
                    
                    <div class="test-info">
                        <div style="background: var(--primary-light); padding: 20px; border-radius: var(--border-radius); margin-bottom: 24px;">
                            <h4><i class="fas fa-info-circle"></i> قوانین تست:</h4>
                            <ul style="margin-top: 12px; padding-right: 20px;">
                                <li>10 سوال تصادفی از لغت‌های A1</li>
                                <li>زمان هر تست: 15 دقیقه</li>
                                <li>هر پاسخ صحیح: 1 امتیاز</li>
                                <li>پاسخ غلط: 0 امتیاز</li>
                                <li>حداقل امتیاز قبولی: 7 از 10</li>
                            </ul>
                        </div>
                        
                        <div class="stats-grid" style="grid-template-columns: repeat(3, 1fr);">
                            <div class="stat-card">
                                <div class="stat-card-header">
                                    <i class="fas fa-fire"></i>
                                    <h3>Streak</h3>
                                </div>
                                <div class="stat-card-value">${appState.progress.streak}</div>
                                <div class="stat-card-label">روز متوالی</div>
                            </div>
                            
                            <div class="stat-card">
                                <div class="stat-card-header">
                                    <i class="fas fa-chart-bar"></i>
                                    <h3>میانگین</h3>
                                </div>
                                <div class="stat-card-value">
                                    ${appState.dailyTests.length > 0 ? 
                                        Math.round(appState.dailyTests.reduce((sum, test) => sum + test.score, 0) / appState.dailyTests.length) : 
                                        '--'
                                    }
                                </div>
                                <div class="stat-card-label">از 10</div>
                            </div>
                            
                            <div class="stat-card">
                                <div class="stat-card-header">
                                    <i class="fas fa-calendar-check"></i>
                                    <h3>تکمیل شده</h3>
                                </div>
                                <div class="stat-card-value">${appState.dailyTests.length}</div>
                                <div class="stat-card-label">تست</div>
                            </div>
                        </div>
                        
                        <div style="text-align: center; margin-top: 32px;">
                            <button class="btn-primary" onclick="startDailyTest()" style="padding: 16px 48px; font-size: 18px;">
                                <i class="fas fa-play-circle"></i>
                                شروع تست روزانه
                            </button>
                        </div>
                    </div>
                </div>
            `}
        </div>
    `;
}

// صفحه پیشرفت
function showProgressPage() {
    const totalWords = appState.savedWords.length + appState.leitnerSystem.stats.totalWords;
    const accuracy = appState.dailyTests.length > 0 ? 
        Math.round(appState.dailyTests.reduce((sum, test) => sum + test.score, 0) / appState.dailyTests.length) * 10 : 0;
    
    // محاسبه streak
    const today = new Date().toDateString();
    const lastActive = new Date(appState.progress.lastActive);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (appState.progress.lastActive === yesterday.toDateString()) {
        appState.progress.streak++;
    } else if (appState.progress.lastActive !== today) {
        appState.progress.streak = 1;
    }
    appState.progress.lastActive = today;
    
    elements.contentArea.innerHTML = `
        <div class="progress-page">
            <div class="page-header">
                <h2 class="page-title">
                    <i class="fas fa-chart-line"></i>
                    پیشرفت تحصیلی
                </h2>
                <div class="page-actions">
                    <button class="btn-icon" onclick="shareProgress()">
                        <i class="fas fa-share"></i>
                        اشتراک‌گذاری
                    </button>
                    <button class="btn-icon" onclick="exportProgress()">
                        <i class="fas fa-download"></i>
                        خروجی
                    </button>
                </div>
            </div>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-card-header">
                        <i class="fas fa-fire"></i>
                        <h3>Streak</h3>
                    </div>
                    <div class="stat-card-value">${appState.progress.streashow}</div>
                    <div class="stat-card-label">روز متوالی</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-card-header">
                        <i class="fas fa-book"></i>
                        <h3>لغات یادگرفته</h3>
                    </div>
                    <div class="stat-card-value">${totalWords}</div>
                    <div class="stat-card-label">لغت</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-card-header">
                        <i class="fas fa-brain"></i>
                        <h3>لغات مسلط</h3>
                    </div>
                    <div class="stat-card-value">${appState.leitnerSystem.stats.masteredWords}</div>
                    <div class="stat-card-label">در جعبه ۵</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-card-header">
                        <i class="fas fa-percentage"></i>
                        <h3>دقت کلی</h3>
                    </div>
                    <div class="stat-card-value">${accuracy}%</div>
                    <div class="stat-card-label">میانگین تست‌ها</div>
                </div>
            </div>
            
            <div class="progress-chart">
                <div class="chart-title">
                    <i class="fas fa-chart-bar"></i>
                    پیشرفت هفتگی
                </div>
                <div class="chart-container" id="progressChart">
                    <!-- نمودار با Chart.js یا CSS -->
                    <div style="text-align: center; padding: 40px;">
                        <i class="fas fa-chart-bar" style="font-size: 48px; color: var(--text-light); margin-bottom: 20px;"></i>
                        <p style="color: var(--text-light);">نمودار پیشرفت به زودی اضافه می‌شود</p>
                    </div>
                </div>
            </div>
            
            <div class="achievements-section">
                <h3><i class="fas fa-trophy"></i> دستاوردها</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin-top: 24px;">
                    ${renderAchievements()}
                </div>
            </div>
        </div>
    `;
}

// ============================================
// تابع‌های دیکشنری
// ============================================

// جستجوی لغت
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const word = searchInput.value.trim().toLowerCase();
    
    if (!word) {
        showNotification('لطفاً کلمه‌ای وارد کنید', 'warning');
        return;
    }
    
    // بررسی محدودیت مهمان
    if (appState.isGuest && appState.searchCount >= 5) {
        showActivationPanel();
        return;
    }
    
    if (!A1_DICTIONARY[word]) {
        showNotification(`کلمه "${word}" یافت نشد`, 'error');
        return;
    }
    
    // افزایش تعداد جستجو
    appState.searchCount++;
    
    // نمایش لغت
    showWordDetail(word);
    
    // تلفظ خودکار
    if (!appState.isMuted) {
        speakWord(word);
    }
    
    // گزارش به تلگرام
    sendTelegramReport('word_search', {
        userId: appState.userId,
        word: word,
        isGuest: appState.isGuest
    });
    
    saveState();
    updateUI();
}

// نمایش جزئیات لغت
function showWordDetail(word) {
    const data = A1_DICTIONARY[word];
    if (!data) return;
    
    const isSaved = appState.savedWords.includes(word);
    const inLeitner = Object.values(appState.leitnerSystem.boxes).some(box => box.includes(word));
    
    const html = `
        <div class="word-card">
            <div class="word-header">
                <div class="word-main">
                    <div class="word-title">
                        <span class="english-word">${word}</span>
                        <span class="word-level">A1</span>
                    </div>
                    <div class="persian-meaning">${data.persian}</div>
                    <div class="phonetic">
                        <i class="fas fa-volume-up"></i>
                        <span>تلفظ آمریکایی</span>
                    </div>
                </div>
                <div class="word-actions">
                    <button class="action-btn sound-btn" onclick="speakWord('${word}')">
                        <i class="fas fa-volume-up"></i>
                    </button>
                    <button class="action-btn save-btn ${isSaved ? 'saved' : ''}" onclick="toggleSaveWord('${word}')">
                        <i class="fas ${isSaved ? 'fa-bookmark' : 'fa-bookmark'                    }"></i>
                    </button>
                    ${inLeitner ? `
                        <button class="action-btn" style="border-color: var(--success); color: var(--success);" title="در لایتنر">
                            <i class="fas fa-brain"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
            
            <div class="info-section definition-section">
                <div class="section-title">
                    <i class="fas fa-info-circle"></i>
                    <span>تعریف انگلیسی</span>
                </div>
                <div class="english-text">${data.englishDefinition}</div>
                <div class="persian-text">تعریف: ${data.persian}</div>
            </div>
            
            <div class="info-section example-section">
                <div class="section-title">
                    <i class="fas fa-comment"></i>
                    <span>مثال</span>
                </div>
                <div class="english-text">${data.example.english}</div>
                <div class="persian-text">${data.example.persian}</div>
            </div>
            
            <div class="info-section collocation-section">
                <div class="section-title">
                    <i class="fas fa-link"></i>
                    <span>Collocation</span>
                </div>
                <div class="english-text">${data.collocation.english}</div>
                <div class="persian-text">${data.collocation.persian}</div>
            </div>
            
            <div class="info-section phrase-section">
                <div class="section-title">
                    <i class="fas fa-quote-right"></i>
                    <span>Phrase</span>
                </div>
                <div class="english-text">${data.phrase.english}</div>
                <div class="persian-text">${data.phrase.persian}</div>
            </div>
            
            <div class="info-section phrasal-section">
                <div class="section-title">
                    <i class="fas fa-bolt"></i>
                    <span>Phrasal Verb</span>
                </div>
                <div class="english-text">${data.phrasalVerb.english}</div>
                <div class="persian-text">${data.phrasalVerb.persian}</div>
            </div>
            
            <div style="margin-top: 32px; padding: 20px; background: var(--primary-light); border-radius: var(--border-radius);">
                <h4 style="margin-bottom: 16px;"><i class="fas fa-cogs"></i> اقدامات</h4>
                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <button class="btn-primary" onclick="speakWord('${word}')">
                        <i class="fas fa-volume-up"></i>
                        تلفظ
                    </button>
                    <button class="btn-secondary" onclick="toggleSaveWord('${word}')">
                        <i class="fas ${isSaved ? 'fa-bookmark' : 'fa-bookmark'}"></i>
                        ${isSaved ? 'حذف از ذخیره' : 'ذخیره لغت'}
                    </button>
                    ${!inLeitner ? `
                        <button class="btn-success" onclick="addToLeitner('${word}')">
                            <i class="fas fa-brain"></i>
                            اضافه به لایتنر
                        </button>
                    ` : ''}
                    <button class="btn-secondary" onclick="switchPage('dictionary')">
                        <i class="fas fa-search"></i>
                        جستجوی جدید
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('dictionaryResults').innerHTML = html;
}

// جستجوی سریع
function quickSearch(word) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = word;
        handleSearch();
    }
}

// تلفظ لغت
function speakWord(word) {
    if (appState.isMuted || !('speechSynthesis' in window)) return;
    
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.7;
    utterance.pitch = 1.0;
    
    // تلاش برای صدای زنانه
    const voices = speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => 
        v.lang === 'en-US' && 
        v.name.toLowerCase().includes('female')
    );
    
    if (femaleVoice) {
        utterance.voice = femaleVoice;
    }
    
    utterance.onstart = () => {
        showNotification(`در حال تلفظ: ${word}`, 'info');
    };
    
    utterance.onend = () => {
        // گزارش به تلگرام
        sendTelegramReport('pronunciation', {
            userId: appState.userId,
            word: word
        });
    };
    
    speechSynthesis.speak(utterance);
}

// ============================================
// مدیریت لغت‌های ذخیره شده
// ============================================

// ذخیره/حذف لغت
function toggleSaveWord(word) {
    const index = appState.savedWords.indexOf(word);
    
    if (index === -1) {
        // ذخیره لغت
        appState.savedWords.push(word);
        showNotification(`"${word}" ذخیره شد`, 'success');
        
        // گزارش به تلگرام
        sendTelegramReport('save_word', {
            userId: appState.userId,
            word: word,
            totalSaved: appState.savedWords.length
        });
    } else {
        // حذف لغت
        appState.savedWords.splice(index, 1);
        showNotification(`"${word}" از ذخیره‌ها حذف شد`, 'info');
        
        // حذف از لایتنر اگر وجود دارد
        removeFromLeitner(word);
    }
    
    saveState();
    updateUI();
    
    // اگر در صفحه ذخیره‌ها هستیم، رفرش کن
    if (appState.currentPage === 'saved') {
        showSavedWordsPage();
    }
}

// تمرین لغت‌های ذخیره شده
function practiceSavedWords() {
    if (appState.savedWords.length === 0) {
        showNotification('هیچ لغتی برای تمرین ندارید', 'warning');
        return;
    }
    
    showModal(
        'تمرین لغت‌های ذخیره شده',
        `
            <p>${appState.savedWords.length} لغت برای تمرین دارید.</p>
            <div style="margin: 20px 0;">
                <label style="display: block; margin-bottom: 8px;">تعداد لغت‌ها:</label>
                <input type="range" id="wordCount" min="5" max="${Math.min(appState.savedWords.length, 50)}" value="${Math.min(appState.savedWords.length, 20)}" style="width: 100%;">
                <div style="display: flex; justify-content: space-between; margin-top: 8px;">
                    <span>5</span>
                    <span id="selectedCount">${Math.min(appState.savedWords.length, 20)}</span>
                    <span>${Math.min(appState.savedWords.length, 50)}</span>
                </div>
            </div>
            <div style="margin: 20px 0;">
                <label style="display: block; margin-bottom: 8px;">نوع تمرین:</label>
                <select id="practiceType" style="width: 100%; padding: 10px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);">
                    <option value="englishToPersian">انگلیسی → فارسی</option>
                    <option value="persianToEnglish">فارسی → انگلیسی</option>
                    <option value="mixed">ترکیبی</option>
                </select>
            </div>
        `,
        `
            <button class="btn-secondary" onclick="closeModal()">لغو</button>
            <button class="btn-primary" onclick="startSavedWordsPractice()">شروع تمرین</button>
        `
    );
    
    // آپدیت تعداد انتخابی
    const wordCountInput = document.getElementById('wordCount');
    const selectedCountSpan = document.getElementById('selectedCount');
    wordCountInput.addEventListener('input', () => {
        selectedCountSpan.textContent = wordCountInput.value;
    });
}

function startSavedWordsPractice() {
    const wordCount = parseInt(document.getElementById('wordCount').value);
    const practiceType = document.getElementById('practiceType').value;
    
    closeModal();
    
    // انتخاب لغت‌های تصادفی
    const selectedWords = [...appState.savedWords]
        .sort(() => Math.random() - 0.5)
        .slice(0, wordCount);
    
    // نمایش تمرین
    showPracticeSession(selectedWords, practiceType);
}

// ============================================
// سیستم لایتنر
// ============================================

// اضافه کردن لغت به لایتنر
function addToLeitner(word) {
    if (!A1_DICTIONARY[word]) {
        showNotification('لغت یافت نشد', 'error');
        return;
    }
    
    // بررسی وجود در لایتنر
    for (let boxNum in appState.leitnerSystem.boxes) {
        if (appState.leitnerSystem.boxes[boxNum].includes(word)) {
            showNotification('این لغت قبلاً در لایتنر اضافه شده است', 'info');
            return;
        }
    }
    
    // اضافه به جعبه اول
    appState.leitnerSystem.boxes[1].push(word);
    appState.leitnerSystem.lastReview[word] = new Date().toDateString();
    appState.leitnerSystem.nextReview[word] = new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString();
    
    // آپدیت آمار
    appState.leitnerSystem.stats.totalWords++;
    appState.leitnerSystem.stats.reviewQueue++;
    
    showNotification(`"${word}" به سیستم لایتنر اضافه شد`, 'success');
    
    // گزارش به تلگرام
    sendTelegramReport('leitner_add', {
        userId: appState.userId,
        word: word,
        box: 1
    });
    
    saveState();
    updateUI();
    
    // اگر در صفحه لایتنر هستیم، رفرش کن
    if (appState.currentPage === 'leitner') {
        showLeitnerPage();
    }
}

// حذف از لایتنر
function removeFromLeitner(word) {
    let removed = false;
    
    for (let boxNum in appState.leitnerSystem.boxes) {
        const index = appState.leitnerSystem.boxes[boxNum].indexOf(word);
        if (index !== -1) {
            appState.leitnerSystem.boxes[boxNum].splice(index, 1);
            removed = true;
            
            // آپدیت آمار
            appState.leitnerSystem.stats.totalWords--;
            if (boxNum === '5') {
                appState.leitnerSystem.stats.masteredWords--;
            }
            
            break;
        }
    }
    
    if (removed) {
        delete appState.leitnerSystem.lastReview[word];
        delete appState.leitnerSystem.nextReview[word];
        
        showNotification(`"${word}" از لایتنر حذف شد`, 'info');
        saveState();
        updateUI();
    }
}

// محاسبه لغت‌های قابل مرور امروز
function calculateTodayReviews() {
    const today = new Date().toDateString();
    const reviews = [];
    
    // بررسی جعبه‌ها
    for (let boxNum in appState.leitnerSystem.boxes) {
        const box = appState.leitnerSystem.boxes[boxNum];
        for (let word of box) {
            const nextReview = appState.leitnerSystem.nextReview[word];
            if (!nextReview || new Date(nextReview) <= new Date(today)) {
                reviews.push(word);
            }
        }
    }
    
    appState.leitnerSystem.stats.reviewQueue = reviews.length;
    return reviews;
}

// شروع تمرین لایتنر
function startLeitnerPractice() {
    const reviews = calculateTodayReviews();
    
    if (reviews.length === 0) {
        showNotification('هیچ لغتی برای مرور امروز ندارید', 'info');
        return;
    }
    
    showPracticeSession(reviews, 'leitner');
}

// نمایش جلسه تمرین
function showPracticeSession(words, practiceType = 'englishToPersian') {
    let currentIndex = 0;
    let correctAnswers = 0;
    let totalQuestions = words.length;
    let startTime = Date.now();
    
    function showQuestion() {
        if (currentIndex >= words.length) {
            // پایان تمرین
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
            
            showModal(
                'پایان تمرین',
                `
                    <div style="text-align: center; padding: 20px;">
                        <i class="fas fa-trophy" style="font-size: 48px; color: var(--warning); margin-bottom: 20px;"></i>
                        <h3 style="margin-bottom: 16px;">آفرین! تمرین به پایان رسید</h3>
                        
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 30px 0;">
                            <div style="text-align: center;">
                                <div style="font-size: 32px; font-weight: 800; color: var(--primary);">${totalQuestions}</div>
                                <div style="font-size: 14px; color: var(--text-light);">تعداد سوالات</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 32px; font-weight: 800; color: var(--success);">${correctAnswers}</div>
                                <div style="font-size: 14px; color: var(--text-light);">پاسخ صحیح</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 32px; font-weight: 800; color: ${accuracy >= 70 ? 'var(--success)' : 'var(--danger)'};">${accuracy}%</div>
                                <div style="font-size: 14px; color: var(--text-light);">دقت</div>
                            </div>
                        </div>
                        
                        <p style="color: var(--text-light); margin-bottom: 24px;">
                            زمان صرف شده: ${Math.floor(timeSpent / 60)} دقیقه ${timeSpent % 60} ثانیه
                        </p>
                        
                        ${practiceType === 'leitner' ? `
                            <div style="background: var(--primary-light); padding: 16px; border-radius: var(--border-radius-sm); margin-bottom: 24px;">
                                <p style="margin-bottom: 8px;"><strong>به‌روزرسانی لایتنر:</strong></p>
                                <p>لغت‌هایی که صحیح پاسخ داده‌اید به جعبه بعدی منتقل شدند.</p>
                            </div>
                        ` : ''}
                    </div>
                `,
                `
                    <button class="btn-secondary" onclick="closeModal()">بستن</button>
                    ${practiceType === 'leitner' ? `
                        <button class="btn-primary" onclick="closeModal(); showLeitnerPage()">
                            بازگشت به لایتنر
                        </button>
                    ` : `
                        <button class="btn-primary" onclick="closeModal(); switchPage('saved')">
                            بازگشت به ذخیره‌ها
                        </button>
                    `}
                `
            );
            
            // گزارش به تلگرام
            sendTelegramReport('practice_completed', {
                userId: appState.userId,
                practiceType: practiceType,
                totalQuestions: totalQuestions,
                correctAnswers: correctAnswers,
                accuracy: accuracy,
                timeSpent: timeSpent
            });
            
            return;
        }
        
        const word = words[currentIndex];
        const data = A1_DICTIONARY[word];
        
        // تولید سوال بر اساس نوع تمرین
        let question, options, correctOption;
        
        if (practiceType === 'englishToPersian') {
            question = `معنی "${word}" چیست؟`;
            correctOption = data.persian;
            
            // تولید گزینه‌های غلط
            options = [correctOption];
            while (options.length < 4) {
                const randomWord = getRandomWord(words, word);
                const randomData = A1_DICTIONARY[randomWord];
                if (randomData && !options.includes(randomData.persian)) {
                    options.push(randomData.persian);
                }
            }
            
        } else if (practiceType === 'persianToEnglish') {
            question = `معادل انگلیسی "${data.persian}" چیست؟`;
            correctOption = word;
            
            // تولید گزینه‌های غلط
            options = [correctOption];
            while (options.length < 4) {
                const randomWord = getRandomWord(words, word);
                if (!options.includes(randomWord)) {
                    options.push(randomWord);
                }
            }
            
        } else { // mixed
            if (Math.random() > 0.5) {
                question = `معنی "${word}" چیست؟`;
                correctOption = data.persian;
                
                options = [correctOption];
                while (options.length < 4) {
                    const randomWord = getRandomWord(words, word);
                    const randomData = A1_DICTIONARY[randomWord];
                    if (randomData && !options.includes(randomData.persian)) {
                        options.push(randomData.persian);
                    }
                }
            } else {
                question = `معادل انگلیسی "${data.persian}" چیست؟`;
                correctOption = word;
                
                options = [correctOption];
                while (options.length < 4) {
                    const randomWord = getRandomWord(words, word);
                    if (!options.includes(randomWord)) {
                        options.push(randomWord);
                    }
                }
            }
        }
        
        // تصادفی‌سازی گزینه‌ها
        options = shuffleArray(options);
        const correctIndex = options.indexOf(correctOption);
        
        // نمایش سوال
        showModal(
            `سوال ${currentIndex + 1} از ${totalQuestions}`,
            `
                <div style="margin-bottom: 24px;">
                    <div style="background: var(--primary-light); padding: 20px; border-radius: var(--border-radius-sm); margin-bottom: 20px;">
                        <h3 style="text-align: center; color: var(--primary);">${question}</h3>
                    </div>
                    
                    <div class="options-container">
                        ${options.map((option, index) => `
                            <button class="option-btn" onclick="checkAnswer(${index}, ${correctIndex}, '${word}')">
                                ${option}
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
                    <button class="btn-secondary" onclick="speakWord('${word}')">
                        <i class="fas fa-volume-up"></i>
                        بشنو
                    </button>
                    <span style="color: var(--text-light);">
                        ${practiceType === 'leitner' ? 'سیستم لایتنر' : 'تمرین ذخیره‌ها'}
                    </span>
                </div>
            `,
            `
                <button class="btn-secondary" onclick="skipQuestion()">رد کردن</button>
            `,
            false // نباید بسته شود با کلیک بیرون
        );
    }
    
    // تابع بررسی پاسخ
    window.checkAnswer = (selectedIndex, correctIndex, word) => {
        const modalBody = document.getElementById('modalBody');
        const optionButtons = modalBody.querySelectorAll('.option-btn');
        
        // نمایش پاسخ صحیح/غلط
        optionButtons.forEach((btn, index) => {
            btn.disabled = true;
            if (index === correctIndex) {
                btn.classList.add('correct');
            } else if (index === selectedIndex) {
                btn.classList.add('incorrect');
            }
        });
        
        // آپدیت آمار
        if (selectedIndex === correctIndex) {
            correctAnswers++;
            
            // اگر در لایتنر است، به جعبه بعدی منتقل کن
            if (practiceType === 'leitner') {
                moveToNextBox(word);
            }
            
            showNotification('درست! 🎉', 'success');
        } else {
            // اگر در لایتنر است، به جعبه اول برگردان
            if (practiceType === 'leitner') {
                moveToFirstBox(word);
            }
            
            showNotification('غلط! پاسخ صحیح را ببینید', 'error');
        }
        
        // نمایش توضیح
        const data = A1_DICTIONARY[word];
        const explanation = `
            <div style="background: #f8f9fa; padding: 16px; border-radius: var(--border-radius-sm); margin-top: 20px;">
                <p><strong>${word}</strong> = ${data.persian}</p>
                <p><em>${data.englishDefinition}</em></p>
                <p>مثال: ${data.example.english}</p>
            </div>
        `;
        
        modalBody.insertAdjacentHTML('beforeend', explanation);
        
        // دکمه ادامه
        document.getElementById('modalFooter').innerHTML = `
            <button class="btn-primary" onclick="nextQuestion()">ادامه</button>
        `;
    };
    
    window.skipQuestion = () => {
        nextQuestion();
    };
    
    window.nextQuestion = () => {
        currentIndex++;
        closeModal();
        setTimeout(showQuestion, 300);
    };
    
    // شروع اولین سوال
    showQuestion();
}

// ============================================
// تست روزانه
// ============================================

// شروع تست روزانه
function startDailyTest() {
    const today = new Date().toDateString();
    
    // بررسی اینکه آیا امروز تست داده‌ایم
    if (appState.dailyTests.some(test => test.date === today)) {
        showNotification('امروز قبلاً تست داده‌اید', 'info');
        return;
    }
    
    // انتخاب 10 لغت تصادفی
    const allWords = Object.keys(A1_DICTIONARY);
    const testWords = [];
    
    while (testWords.length < 10 && testWords.length < allWords.length) {
        const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
        if (!testWords.includes(randomWord)) {
            testWords.push(randomWord);
        }
    }
    
    // ذخیره تست
    appState.dailyTest = {
        date: today,
        words: testWords,
        currentQuestion: 0,
        score: 0,
        completed: false,
        timeSpent: 0,
        startTime: Date.now()
    };
    
    // شروع تایمر
    startTestTimer();
    
    // نمایش سوال اول
    showTestQuestion();
}

// نمایش سوال تست
function showTestQuestion() {
    const test = appState.dailyTest;
    if (test.currentQuestion >= test.words.length) {
        completeDailyTest();
        return;
    }
    
    const word = test.words[test.currentQuestion];
    const data = A1_DICTIONARY[word];
    
    // تولید سوال
    const questionTypes = [
        { type: 'meaning', question: `معنی "${word}" چیست؟`, correct: data.persian },
        { type: 'definition', question: `کدام تعریف برای "${word}" صحیح است؟`, correct: data.englishDefinition },
        { type: 'example', question: `کدام جمله برای "${word}" صحیح است؟`, correct: data.example.english }
    ];
    
    const selectedType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    // تولید گزینه‌ها
    let options = [selectedType.correct];
    
    while (options.length < 4) {
        let wrongOption;
        
        if (selectedType.type === 'meaning') {
            const randomWord = getRandomWord(test.words, word);
            wrongOption = A1_DICTIONARY[randomWord]?.persian;
        } else if (selectedType.type === 'definition') {
            const randomWord = getRandomWord(test.words, word);
            wrongOption = A1_DICTIONARY[randomWord]?.englishDefinition;
        } else {
            const randomWord = getRandomWord(test.words, word);
            wrongOption = A1_DICTIONARY[randomWord]?.example.english;
        }
        
        if (wrongOption && !options.includes(wrongOption)) {
            options.push(wrongOption);
        }
    }
    
    // تصادفی‌سازی گزینه‌ها
    options = shuffleArray(options);
    const correctIndex = options.indexOf(selectedType.correct);
    
    // نمایش سوال
    elements.contentArea.innerHTML = `
        <div class="test-page">
            <div class="test-container">
                <div class="test-header">
                    <h3><i class="fas fa-file-alt"></i> تست روزانه</h3>
                    <p>سوال ${test.currentQuestion + 1} از 10</p>
                </div>
                
                <div class="test-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${((test.currentQuestion) / 10) * 100}%"></div>
                    </div>
                    <div class="progress-text">
                        <span>${test.currentQuestion} / 10</span>
                        <span id="testTimer">15:00</span>
                    </div>
                </div>
                
                <div class="test-question">
                    <div class="question-text">${selectedType.question}</div>
                    
                    <div class="options-container">
                        ${options.map((option, index) => `
                            <button class="option-btn" onclick="selectTestAnswer(${index}, ${correctIndex}, '${word}')">
                                ${option}
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div class="test-controls">
                    <button class="btn-secondary" onclick="speakWord('${word}')">
                        <i class="fas fa-volume-up"></i>
                        تلفظ
                    </button>
                    
                    <div class="test-timer">
                        <i class="fas fa-clock"></i>
                        <span id="remainingTime">15:00</span>
                    </div>
                    
                    <button class="btn-primary" onclick="skipTestQuestion()">
                        رد کردن
                        <i class="fas fa-forward"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// تابع‌های کمکی
// ============================================

// آپدیت UI
function updateUI() {
    // کنترل صدا
    const soundIcon = elements.soundControl.querySelector('i');
    const soundText = elements.soundControl.querySelector('span');
    
    if (appState.isMuted) {
        soundIcon.className = 'fas fa-volume-mute';
        soundText.textContent = 'صدا خاموش';
        elements.soundControl.classList.remove('active');
    } else {
        soundIcon.className = 'fas fa-volume-up';
        soundText.textContent = 'صدا روشن';
        elements.soundControl.classList.add('active');
    }
    
    // وضعیت کاربر
    if (appState.isGuest) {
        elements.userTypeText.textContent = 'مهمان';
        elements.searchCountBadge.textContent = Math.max(0, 5 - appState.searchCount);
        elements.userStatus.classList.remove('student');
        elements.userStatus.classList.add('guest');
    } else {
        elements.userTypeText.textContent = 'زبان‌آموز';
        elements.searchCountBadge.textContent = '∞';
        elements.userStatus.classList.remove('guest');
        elements.userStatus.classList.add('student');
    }
    
    // آمار
    elements.savedCountBadge.textContent = appState.savedWords.length;
    elements.leitnerCountBadge.textContent = appState.leitnerSystem.stats.totalWords;
    
    // تعداد تست‌های امروز
    const today = new Date().toDateString();
    const todayTests = appState.dailyTests.filter(test => test.date === today);
    elements.testCountBadge.textContent = todayTests.length > 0 ? '✓' : '!';
}

// نمایش پانل فعال‌سازی
function showActivationPanel() {
    elements.activationPanel.style.display = 'block';
    elements.activationCodeInput.focus();
}

function hideActivationPanel() {
    elements.activationPanel.style.display = 'none';
    elements.activationCodeInput.value = '';
}

// ارسال کد فعال‌سازی
function submitActivation() {
    const code = elements.activationCodeInput.value.trim().toUpperCase();
    
    if (!code) {
        showNotification('لطفاً کد فعال‌سازی را وارد کنید', 'warning');
        return;
    }
    
    // بررسی کد (در اینجا منطق واقعی بررسی کد را اضافه کنید)
    const isValid = validateActivationCode(code);
    
    if (isValid) {
        appState.isGuest = false;
        appState.userId = generateUserId();
        appState.activationCode = code;
        
        showNotification('حساب شما با موفقیت فعال شد! 🎉', 'success');
        hideActivationPanel();
        
        // گزارش به تلگرام
        sendTelegramReport('account_activated', {
            userId: appState.userId,
            code: code,
            timestamp: new Date().toISOString()
        });
        
        saveState();
        updateUI();
    } else {
        showNotification('کد فعال‌سازی نامعتبر است', 'error');
    }
}

// توابع کمکی عمومی
function getRandomWord(words, excludeWord) {
    const availableWords = words.filter(w => w !== excludeWord);
    return availableWords[Math.floor(Math.random() * availableWords.length)];
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function generateUserId() {
    return 'USER_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5).toUpperCase();
}

function validateActivationCode(code) {
    // در اینجا منطق واقعی بررسی کد را اضافه کنید
    // می‌توانید از API یا لیست کدهای معتبر استفاده کنید
    const validCodes = ['A1STUDENT2024', 'TEACHER123', 'TESTCODE', 'FARZAD2024'];
    return validCodes.includes(code);
}

// نمایش نوتیفیکیشن
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <div class="notification-content">${message}</div>
    `;
    
    elements.notificationContainer.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// نمایش مدال
function showModal(title, body, footer, closeOnOutsideClick = true) {
    elements.modalTitle.textContent = title;
    elements.modalBody.innerHTML = body;
    elements.modalFooter.innerHTML = footer;
    
    elements.messageModal.style.display = 'flex';
    
    if (closeOnOutsideClick) {
        elements.messageModal.onclick = (e) => {
            if (e.target === elements.messageModal) {
                closeModal();
            }
        };
    }
}

function closeModal() {
    elements.messageModal.style.display = 'none';
}

// ارسال گزارش به تلگرام
function sendTelegramReport(type, data) {
    if (!appState.teacherChatId) return;
    
    // در اینجا باید API تلگرام خود را اضافه کنید
    // مثال:
    // fetch(`https://api.telegram.org/botYOUR_BOT_TOKEN/sendMessage`, {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({
    //         chat_id: appState.teacherChatId,
    //         text: `📊 گزارش: ${type}\n${JSON.stringify(data, null, 2)}`
    //     })
    // });
    
    // برای تست در کنسول نمایش می‌دهیم
    console.log(`📊 گزارش تلگرام - ${type}:`, data);
}

// ============================================
// راه‌اندازی برنامه
// ============================================

// هنگامی که DOM بارگذاری شد
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    
    // تلفظ برای مرورگر
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => {
            console.log('صداهای در دسترس به‌روز شدند');
        };
    }
});

// توابع عمومی برای استفاده در HTML
window.toggleSound = function() {
    appState.isMuted = !appState.isMuted;
    updateUI();
};

window.showActivationPanel = showActivationPanel;
window.hideActivationPanel = hideActivationPanel;
window.submitActivation = submitActivation;
window.speakWord = speakWord;
window.toggleSaveWord = toggleSaveWord;
window.removeFromSaved = function(word) {
    toggleSaveWord(word);
};
window.addToLeitner = addToLeitner;
window.switchPage = switchPage;
window.quickSearch = quickSearch;
window.closeModal = closeModal;
