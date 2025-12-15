// پایگاه داده لغات
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

// المنت‌ها
const wordInput = document.getElementById('wordInput');
const searchBtn = document.getElementById('searchBtn');
const muteToggle = document.getElementById('muteToggle');
const resultsContainer = document.getElementById('resultsContainer');

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
    // فوکوس روی input
    wordInput.focus();
    
    // نمایش پیام خوش‌آمد
    showWelcome();
}

// جستجو
function handleSearch() {
    const word = wordInput.value.trim().toLowerCase();
    
    if (!word) {
        showError('لطفاً یک کلمه انگلیسی وارد کنید');
        return;
    }
    
    if (!A1_DICTIONARY[word]) {
        showError(`"${word}" یافت نشد. کلمات: be, have, go, work, see`);
        return;
    }
    
    // نمایش نتیجه
    displayWord(word);
    
    // تلفظ خودکار
    if (!isMuted && 'speechSynthesis' in window) {
        speakWord(word);
    }
}

// نمایش لغت
function displayWord(word) {
    const data = A1_DICTIONARY[word];
    
    const html = `
        <div class="word-card">
            <div class="word-header">
                <div class="word-title">
                    <div class="english-word">${word}</div>
                    <div class="persian-meaning">${data.persian}</div>
                </div>
                <button class="sound-btn" onclick="speakWord('${word}')" ${isMuted ? 'disabled' : ''}>
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            
            <div class="info-section">
                <div class="section-title">
                    <i class="fas fa-info-circle"></i>
                    <span>تعریف انگلیسی</span>
                </div>
                <div class="text-box definition-box">
                    <div class="english-box">${data.englishDefinition}</div>
                </div>
            </div>
            
            <div class="info-section">
                <div class="section-title">
                    <i class="fas fa-comment"></i>
                    <span>مثال</span>
                </div>
                <div class="text-box example-box">
                    <div class="english-box">${data.example.english}</div>
                    <div class="persian-box">${data.example.persian}</div>
                </div>
            </div>
            
            <div class="info-section">
                <div class="section-title">
                    <i class="fas fa-link"></i>
                    <span>Collocation</span>
                </div>
                <div class="text-box collocation-box">
                    <div class="english-box">${data.collocation.english}</div>
                    <div class="persian-box">${data.collocation.persian}</div>
                </div>
            </div>
            
            <div class="info-section">
                <div class="section-title">
                    <i class="fas fa-quote-right"></i>
                    <span>Phrase</span>
                </div>
                <div class="text-box phrase-box">
                    <div class="english-box">${data.phrase.english}</div>
                    <div class="persian-box">${data.phrase.persian}</div>
                </div>
            </div>
            
            <div class="info-section">
                <div class="section-title">
                    <i class="fas fa-bolt"></i>
                    <span>Phrasal Verb</span>
                </div>
                <div class="text-box phrasal-box">
                    <div class="english-box">${data.phrasalVerb.english}</div>
                    <div class="persian-box">${data.phrasalVerb.persian}</div>
                </div>
            </div>
            
            ${isMuted ? 
                '<div class="pronunciation-message"><i class="fas fa-volume-mute"></i> حالت بی‌صدا فعال است</div>' : 
                '<div class="pronunciation-message"><i class="fas fa-volume-up"></i> تلفظ پخش شد</div>'
            }
        </div>
    `;
    
    resultsContainer.innerHTML = html;
    
    // اسکرول به بالا
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// تلفظ کلمه
function speakWord(word) {
    if (isMuted || !('speechSynthesis' in window)) return;
    
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.7;
    
    // سعی برای صدای زنانه
    const voices = speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => 
        v.lang === 'en-US' && 
        v.name.toLowerCase().includes('female')
    );
    
    if (femaleVoice) utterance.voice = femaleVoice;
    
    speechSynthesis.speak(utterance);
}

// تغییر حالت صدا
function toggleMute() {
    isMuted = !isMuted;
    const icon = muteToggle.querySelector('i');
    const text = muteToggle.querySelector('span');
    
    if (isMuted) {
        icon.className = 'fas fa-volume-mute';
        text.textContent = 'صدا خاموش است';
        muteToggle.classList.add('muted');
    } else {
        icon.className = 'fas fa-volume-up';
        text.textContent = 'صدا روشن است';
        muteToggle.classList.remove('muted');
    }
}

// نمایش خوش‌آمد
function showWelcome() {
    resultsContainer.innerHTML = `
        <div class="welcome-card">
            <div class="welcome-icon">
                <i class="fas fa-language"></i>
            </div>
            <h2>لغت انگلیسی خود را جستجو کنید</h2>
            <p>کلمه مورد نظر را بنویسید و دکمه جستجو را بزنید</p>
            
            <div class="quick-guide">
                <h3><i class="fas fa-rocket"></i> نحوه استفاده:</h3>
                <p>1. کلمه انگلیسی را در کادر بالا بنویسید</p>
                <p>2. دکمه جستجو را بزنید یا Enter را فشار دهید</p>
                <p>3. اطلاعات کامل با تلفظ نمایش داده می‌شود</p>
            </div>
        </div>
    `;
}

// نمایش خطا
function showError(message) {
    resultsContainer.innerHTML = `
        <div class="error-card">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>کلمه یافت نشد</h3>
            <p>${message}</p>
            <button class="back-btn" onclick="showWelcome()">
                بازگشت
            </button>
        </div>
    `;
}

// تابع کمکی برای جستجوی سریع
function searchWord(word) {
    wordInput.value = word;
    handleSearch();
}
