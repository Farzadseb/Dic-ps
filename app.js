// پایگاه داده لغات A1
const A1_DICTIONARY = {
    "be": {
        persian: "بودن",
        englishDefinition: "To exist or have a quality.",
        example: {
            english: "I want to be a teacher.",
            persian: "من می‌خواهم یک معلم باشم."
        },
        collocation: {
            english: "be happy",
            persian: "خوشحال بودن"
        },
        phrase: {
            english: "be careful",
            persian: "مواظب باش"
        },
        phrasalVerb: {
            english: "be up to",
            persian: "در حال انجام کاری بودن"
        }
    },
    "have": {
        persian: "داشتن",
        englishDefinition: "To own or possess something.",
        example: {
            english: "I have a book.",
            persian: "من یک کتاب دارم."
        },
        collocation: {
            english: "have time",
            persian: "زمان داشتن"
        },
        phrase: {
            english: "have a good day",
            persian: "روز خوبی داشته باشی"
        },
        phrasalVerb: {
            english: "have to",
            persian: "مجبور بودن"
        }
    },
    "go": {
        persian: "رفتن",
        englishDefinition: "To move from one place to another.",
        example: {
            english: "I go to school.",
            persian: "من به مدرسه می‌روم."
        },
        collocation: {
            english: "go home",
            persian: "به خانه رفتن"
        },
        phrase: {
            english: "go for it",
            persian: "انجامش بده"
        },
        phrasalVerb: {
            english: "go on",
            persian: "ادامه دادن"
        }
    },
    "work": {
        persian: "کار کردن",
        englishDefinition: "To do a job or activity.",
        example: {
            english: "I work in an office.",
            persian: "من در یک دفتر کار می‌کنم."
        },
        collocation: {
            english: "work hard",
            persian: "سخت کار کردن"
        },
        phrase: {
            english: "work in progress",
            persian: "در حال انجام"
        },
        phrasalVerb: {
            english: "work out",
            persian: "ورزش کردن"
        }
    },
    "see": {
        persian: "دیدن",
        englishDefinition: "To use your eyes to look.",
        example: {
            english: "I see a bird.",
            persian: "من یک پرنده می‌بینم."
        },
        collocation: {
            english: "see film",
            persian: "فیلم دیدن"
        },
        phrase: {
            english: "see you later",
            persian: "بعداً می‌بینمت"
        },
        phrasalVerb: {
            english: "see to",
            persian: "مراقب بودن"
        }
    }
};

// المنت‌های DOM
const wordInput = document.getElementById('wordInput');
const searchBtn = document.getElementById('searchBtn');
const muteToggle = document.getElementById('muteToggle');
const muteIcon = document.getElementById('muteIcon');
const muteText = document.getElementById('muteText');
const resultsContainer = document.getElementById('resultsContainer');
const soundIndicator = document.querySelector('#soundIndicator .indicator-dot');
const soundIndicatorText = document.querySelector('#soundIndicator span');

// وضعیت
let isMuted = false;

// رویدادها
document.addEventListener('DOMContentLoaded', initApp);
searchBtn.addEventListener('click', handleSearch);
wordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});
muteToggle.addEventListener('click', toggleMute);

// مقداردهی اولیه
function initApp() {
    updateMuteUI();
    showWelcome();
    wordInput.focus();
}

// مدیریت جستجو
function handleSearch() {
    const word = wordInput.value.trim().toLowerCase();
    
    if (!word) {
        showError('لطفاً یک کلمه انگلیسی وارد کنید');
        return;
    }
    
    if (!A1_DICTIONARY[word]) {
        showError(`کلمه "${word}" یافت نشد. کلمات موجود: be, have, go, work, see`);
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        displayWordResult(word);
        if (!isMuted) {
            speakWord(word);
        }
    }, 300);
}

// نمایش نتیجه لغت
function displayWordResult(word) {
    const wordData = A1_DICTIONARY[word];
    
    const html = `
        <div class="word-card">
            <div class="word-header">
                <div class="word-title">
                    <div class="english-word">${word}</div>
                    <div class="persian-meaning">${wordData.persian}</div>
                </div>
                <button class="sound-btn" onclick="speakWord('${word}')" ${isMuted ? 'disabled' : ''}>
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-info-circle"></i>
                    <span>تعریف انگلیسی</span>
                </div>
                <div class="section-content">
                    <div class="english-text">${wordData.englishDefinition}</div>
                    <div class="persian-text">تعریف انگلیسی ساده برای سطح A1</div>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-comment-alt"></i>
                    <span>مثال</span>
                </div>
                <div class="section-content">
                    <div class="english-text">${wordData.example.english}</div>
                    <div class="persian-text">${wordData.example.persian}</div>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-link"></i>
                    <span>Collocation</span>
                </div>
                <div class="section-content">
                    <div class="english-text">${wordData.collocation.english}</div>
                    <div class="persian-text">${wordData.collocation.persian}</div>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-quote-right"></i>
                    <span>Phrase</span>
                </div>
                <div class="section-content">
                    <div class="english-text">${wordData.phrase.english}</div>
                    <div class="persian-text">${wordData.phrase.persian}</div>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-bolt"></i>
                    <span>Phrasal Verb</span>
                </div>
                <div class="section-content">
                    <div class="english-text">${wordData.phrasalVerb.english}</div>
                    <div class="persian-text">${wordData.phrasalVerb.persian}</div>
                </div>
            </div>
            
            <div class="pronunciation-message ${isMuted ? 'muted' : ''}">
                <i class="fas ${isMuted ? 'fa-volume-mute' : 'fa-volume-up'}"></i>
                <span>${isMuted ? 'حالت بی‌صدا فعال است - تلفظ پخش نمی‌شود' : 'تلفظ کلمه پخش شد'}</span>
            </div>
        </div>
    `;
    
    resultsContainer.innerHTML = html;
}

// تلفظ کلمه
function speakWord(word) {
    if (isMuted || !('speechSynthesis' in window)) return;
    
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.7;
    
    speechSynthesis.speak(utterance);
}

// تغییر حالت صدا
function toggleMute() {
    isMuted = !isMuted;
    updateMuteUI();
    
    if (isMuted) {
        speechSynthesis.cancel();
    }
}

// بروزرسانی UI صدا
function updateMuteUI() {
    if (isMuted) {
        // دکمه Mute
        muteIcon.className = 'fas fa-volume-mute';
        muteText.textContent = 'صدا خاموش';
        muteToggle.classList.remove('active');
        muteToggle.classList.add('inactive');
        
        // نشانگر در فوتر
        soundIndicator.classList.remove('active');
        soundIndicator.classList.add('inactive');
        soundIndicatorText.textContent = 'صدا غیرفعال';
    } else {
        // دکمه Mute
        muteIcon.className = 'fas fa-volume-up';
        muteText.textContent = 'صدا روشن';
        muteToggle.classList.remove('inactive');
        muteToggle.classList.add('active');
        
        // نشانگر در فوتر
        soundIndicator.classList.remove('inactive');
        soundIndicator.classList.add('active');
        soundIndicatorText.textContent = 'صدا فعال';
    }
}

// نمایش پیام خوش‌آمد
function showWelcome() {
    resultsContainer.innerHTML = `
        <div class="welcome-message">
            <div class="welcome-icon">
                <i class="fas fa-graduation-cap"></i>
            </div>
            <h2>به دیکشنری آموزشی A1 خوش آمدید</h2>
            <p>لغت انگلیسی خود را در کادر بالا جستجو کنید</p>
            
            <div class="sample-words">
                <p>برای شروع می‌توانید این کلمات را امتحان کنید:</p>
                <div class="word-buttons">
                    <button class="word-btn" onclick="searchWord('be')">be</button>
                    <button class="word-btn" onclick="searchWord('have')">have</button>
                    <button class="word-btn" onclick="searchWord('go')">go</button>
                    <button class="word-btn" onclick="searchWord('work')">work</button>
                    <button class="word-btn" onclick="searchWord('see')">see</button>
                </div>
            </div>
        </div>
    `;
}

// نمایش حالت لودینگ
function showLoading() {
    resultsContainer.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
            <h3>در حال جستجو...</h3>
            <p>لطفاً کمی صبر کنید</p>
        </div>
    `;
}

// نمایش خطا
function showError(message) {
    resultsContainer.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>کلمه یافت نشد</h3>
            <p>${message}</p>
            <button onclick="showWelcome()" class="search-btn" style="margin-top: 20px; width: auto; padding: 12px 24px;">
                <i class="fas fa-home"></i> بازگشت
            </button>
        </div>
    `;
}

// تابع کمکی برای جستجوی سریع
function searchWord(word) {
    wordInput.value = word;
    handleSearch();
                            }
