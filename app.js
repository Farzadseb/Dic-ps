// دیکشنری تست با ۱۰ لغت اول
const A1_DICTIONARY = {
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
    }
};

// المنت‌ها
const wordInput = document.getElementById('wordInput');
const searchBtn = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('resultsContainer');

// رویدادها
searchBtn.addEventListener('click', handleSearch);
wordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

// جستجو
function handleSearch() {
    const word = wordInput.value.trim().toLowerCase();
    
    if (!word) {
        showError('لطفاً یک کلمه انگلیسی وارد کنید');
        return;
    }
    
    if (!A1_DICTIONARY[word]) {
        showError(`کلمه "${word}" یافت نشد. کلمات موجود: be, have, go, work, see, say, know, like, time, people`);
        return;
    }
    
    displayWordResult(word);
}

// نمایش نتیجه
function displayWordResult(word) {
    const data = A1_DICTIONARY[word];
    
    const html = `
        <div class="word-card">
            <div class="word-title">
                <div class="english-word">${word}</div>
                <div class="persian-meaning">${data.persian}</div>
            </div>
            
            <div class="section">
                <h3><i class="fas fa-info-circle"></i> تعریف انگلیسی</h3>
                <p>${data.englishDefinition}</p>
            </div>
            
            <div class="section">
                <h3><i class="fas fa-comment-alt"></i> مثال</h3>
                <p><strong>انگلیسی:</strong> ${data.example.english}</p>
                <p><strong>فارسی:</strong> ${data.example.persian}</p>
            </div>
            
            <div class="section">
                <h3><i class="fas fa-link"></i> Collocation</h3>
                <p><strong>انگلیسی:</strong> ${data.collocation.english}</p>
                <p><strong>فارسی:</strong> ${data.collocation.persian}</p>
            </div>
            
            <div class="section">
                <h3><i class="fas fa-quote-right"></i> Phrase</h3>
                <p><strong>انگلیسی:</strong> ${data.phrase.english}</p>
                <p><strong>فارسی:</strong> ${data.phrase.persian}</p>
            </div>
            
            <div class="section">
                <h3><i class="fas fa-bolt"></i> Phrasal Verb</h3>
                <p><strong>انگلیسی:</strong> ${data.phrasalVerb.english}</p>
                <p><strong>فارسی:</strong> ${data.phrasalVerb.persian}</p>
            </div>
        </div>
    `;
    
    resultsContainer.innerHTML = html;
    
    // تلفظ خودکار
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.7;
        speechSynthesis.speak(utterance);
    }
}

// نمایش خطا
function showError(message) {
    resultsContainer.innerHTML = `
        <div class="error">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>خطا</h3>
            <p>${message}</p>
            <button onclick="location.reload()" style="margin-top: 15px; padding: 10px 20px; background: var(--primary-color); color: white; border: none; border-radius: 8px;">
                دوباره امتحان کن
            </button>
        </div>
    `;
}
