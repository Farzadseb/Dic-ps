// ============================================
// فایل اصلی برنامه - app.js
// ============================================

// پایگاه داده کامل 200 لغت A1
const A1_DICTIONARY = {}; // از فایل JSON لود می‌شود

// وضعیت برنامه
const appState = {
    isMuted: false,
    isGuest: true,
    userId: null,
    activationCode: null,
    teacherChatId: '96991859',
    
    // آمار
    searchCount: 0,
    savedWords: [],
    dailyTests: [],
    totalPracticeTime: 0,
    
    // سیستم لایتنر
    leitnerSystem: {
        boxes: { 1: [], 2: [], 3: [], 4: [], 5: [] },
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
    soundControl: document.getElementById('soundControl'),
    userStatus: document.getElementById('userStatus'),
    userTypeText: document.getElementById('userTypeText'),
    searchCountBadge: document.getElementById('searchCountBadge'),
    activateBtn: document.getElementById('activateBtn'),
    
    navBtns: document.querySelectorAll('.nav-btn'),
    savedCountBadge: document.getElementById('savedCountBadge'),
    leitnerCountBadge: document.getElementById('leitnerCountBadge'),
    testCountBadge: document.getElementById('testCountBadge'),
    
    contentArea: document.getElementById('contentArea'),
    
    activationPanel: document.getElementById('activationPanel'),
    activationCodeInput: document.getElementById('activationCodeInput'),
    submitActivationBtn: document.getElementById('submitActivationBtn'),
    closeActivationBtn: document.getElementById('closeActivationBtn'),
    
    messageModal: document.getElementById('messageModal'),
    modalTitle: document.getElementById('modalTitle'),
    modalBody: document.getElementById('modalBody'),
    modalFooter: document.getElementById('modalFooter'),
    
    notificationContainer: document.getElementById('notificationContainer')
};

// تنظیمات تلگرام
const TELEGRAM_CONFIG = {
    botToken: '8553224514:AAG0XXzA8da55jCGXnzStP-0IxHhnfkTPRw',
    teacherChatId: '96991859',
    botUsername: 'EnglishTeacherHelperBot',
    apiUrl: 'https://api.telegram.org/bot'
};

// بارگذاری برنامه
function initApp() {
    loadState();
    loadDictionary();
    setupEventListeners();
    updateUI();
    showPage('dictionary');
    
    checkAccountStatus();
    checkDailyTest();
    checkLeitnerReviews();
    
    sendTelegramReport('app_start', {
        userId: appState.userId,
        isGuest: appState.isGuest,
        userType: appState.userType,
        version: '1.0.0'
    });
    
    setTimeout(() => {
        if (appState.isGuest && appState.searchCount === 0) {
            showNotification('🎉 خوش آمدید! شما 5 جستجوی رایگان دارید.', 'info');
        }
    }, 1000);
}

// بارگذاری دیکشنری از JSON
async function loadDictionary() {
    try {
        const response = await fetch('pdcs_a1.json');
        if (!response.ok) {
            // اگر فایل اصلی موجود نبود، از نمونه استفاده کن
            const sampleResponse = await fetch('pdcs_a1_sample.json');
            Object.assign(A1_DICTIONARY, await sampleResponse.json());
            showNotification('دیکشنری نمونه بارگذاری شد', 'info');
        } else {
            Object.assign(A1_DICTIONARY, await response.json());
            showNotification('دیکشنری A1 بارگذاری شد', 'success');
        }
    } catch (error) {
        console.error('خطا در بارگذاری دیکشنری:', error);
        // دیکشنری پیش‌فرض
        Object.assign(A1_DICTIONARY, {
            "hello": {
                persian: "سلام",
                englishDefinition: "A greeting or expression of goodwill.",
                example: { english: "Hello, how are you?", persian: "سلام، حال شما چطور است؟" }
            },
            "goodbye": {
                persian: "خداحافظ",
                englishDefinition: "A word used when parting.",
                example: { english: "Goodbye, see you tomorrow!", persian: "خداحافظ، فردا می‌بینمت!" }
            }
        });
    }
}

// مدیریت رویدادها
function setupEventListeners() {
    elements.soundControl.addEventListener('click', toggleSound);
    elements.activateBtn.addEventListener('click', showActivationPanel);
    elements.submitActivationBtn.addEventListener('click', submitActivation);
    elements.closeActivationBtn.addEventListener('click', hideActivationPanel);
    
    elements.navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.dataset.page;
            showPage(page);
        });
    });
    
    elements.activationCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') submitActivation();
    });
}

// نمایش صفحات
async function showPage(page) {
    appState.currentPage = page;
    
    // آپدیت ناوبری
    elements.navBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.page === page) {
            btn.classList.add('active');
        }
    });
    
    // اگر صفحه خارجی است
    if (page.includes('.html')) {
        window.location.href = page;
        return;
    }
    
    // نمایش صفحه داخلی
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
        default:
            showDictionaryPage();
    }
    
    updateUI();
}

// بقیه توابع اصلی...
// (توابع handleSearch, showWordDetail, toggleSaveWord, etc.)
