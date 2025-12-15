// تنظیمات
const CONFIG = {
    TELEGRAM_TOKEN: '8553224514:AAG0XXzA8da55jCGXnzStP-0IxHhnfkTPRw',
    TEACHER_CHAT_ID: '96991859',
    TEACHER_PHONE: '09017708544',
    TEACHER_NAME: 'استاد Fred'
};

// حالت برنامه
const state = {
    isMuted: false,
    isNightMode: false,
    isGuest: true,
    searchCount: 0,
    savedWords: []
};

// بارگذاری اولیه
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    setupEventListeners();
    updateUI();
    
    setTimeout(() => {
        showNotification('🎉 به دیکشنری A1 خوش آمدید!', 'success');
    }, 1000);
});

// بارگذاری حالت
function loadState() {
    const saved = localStorage.getItem('a1_state');
    if (saved) {
        Object.assign(state, JSON.parse(saved));
    }
    if (state.isNightMode) {
        document.body.classList.add('night-mode');
    }
}

// ذخیره حالت
function saveState() {
    localStorage.setItem('a1_state', JSON.stringify(state));
}

// راه‌اندازی رویدادها
function setupEventListeners() {
    // کنترل صدا
    document.getElementById('voiceControl').addEventListener('click', toggleVoice);
    
    // کنترل تم
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}

// تغییر صدا
function toggleVoice() {
    state.isMuted = !state.isMuted;
    updateVoiceButton();
    saveState();
    showNotification(state.isMuted ? '🔇 صدا خاموش' : '🔊 صدا روشن', 'info');
}

function updateVoiceButton() {
    const icon = document.querySelector('#voiceControl i');
    const text = document.querySelector('#voiceControl span');
    if (state.isMuted) {
        icon.className = 'fas fa-volume-mute';
        text.textContent = 'صدا خاموش';
    } else {
        icon.className = 'fas fa-volume-up';
        text.textContent = 'صدا روشن';
    }
}

// تغییر تم
function toggleTheme() {
    state.isNightMode = !state.isNightMode;
    document.body.classList.toggle('night-mode');
    updateThemeButton();
    saveState();
    showNotification(state.isNightMode ? '🌙 تم شب' : '☀️ تم روز', 'info');
}

function updateThemeButton() {
    const icon = document.querySelector('#themeToggle i');
    icon.className = state.isNightMode ? 'fas fa-sun' : 'fas fa-moon';
}

// جستجوی لغت
function searchWord() {
    const input = document.getElementById('searchInput');
    const word = input.value.trim().toLowerCase();
    
    if (!word) {
        showNotification('کلمه را وارد کنید', 'warning');
        return;
    }
    
    state.searchCount++;
    saveState();
    
    // نمایش نتیجه
    showWordResult(word);
    
    // تلفظ
    if (!state.isMuted) {
        speakWord(word);
    }
}

function quickSearch(word) {
    document.getElementById('searchInput').value = word;
    searchWord();
}

function showWordResult(word) {
    const resultDiv = document.getElementById('wordResult');
    resultDiv.innerHTML = `
        <div class="word-card">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                    <h2 style="color: var(--primary); margin: 0;">${word}</h2>
                    <p style="color: var(--text-dark); margin: 10px 0;">معنی: ...</p>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button class="btn-icon" onclick="speakWord('${word}')" style="background: var(--primary-light); color: var(--primary);">
                        <i class="fas fa-volume-up"></i>
                    </button>
                    <button class="btn-icon" onclick="saveWord('${word}')" style="background: var(--primary); color: white;">
                        <i class="fas fa-bookmark"></i>
                    </button>
                </div>
            </div>
            <div style="margin-top: 20px;">
                <button class="search-btn" onclick="contactTeacher()" style="width: 100%; background: var(--primary);">
                    <i class="fas fa-phone"></i> تماس با استاد برای آموزش کامل
                </button>
            </div>
        </div>
    `;
}

// تلفظ
function speakWord(word) {
    if ('speechSynthesis' in window && !state.isMuted) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.7;
        speechSynthesis.speak(utterance);
    }
}

// تغییر صفحه
function showPage(pageId) {
    // مخفی کردن همه صفحات
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // آپدیت دکمه‌ها
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // نمایش صفحه انتخاب شده
    document.getElementById(pageId + 'Page').classList.add('active');
    event.target.classList.add('active');
}

// تماس با استاد
function contactTeacher() {
    const message = `👤 کاربر: ${state.isGuest ? 'مهمان' : 'زبان‌آموز'}
📞 شماره: ${CONFIG.TEACHER_PHONE}
👨‍🏫 استاد: ${CONFIG.TEACHER_NAME}
⏰ زمان: ${new Date().toLocaleString('fa-IR')}`;
    
    // تلگرام
    fetch(`https://api.telegram.org/bot${CONFIG.TELEGRAM_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            chat_id: CONFIG.TEACHER_CHAT_ID,
            text: message
        })
    });
    
    // واتس‌اپ
    window.open(`https://wa.me/98${CONFIG.TEACHER_PHONE.substring(1)}?text=سلام%20استاد%20Fred%20میخواهم%20زبان%20یاد%20بگیرم`, '_blank');
    
    showNotification('✅ درخواست شما ارسال شد. استاد به زودی با شما تماس می‌گیرد.', 'success');
}

// نوتیفیکیشن
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#4f46e5'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// آپدیت UI
function updateUI() {
    updateVoiceButton();
    updateThemeButton();
}

// توابع عمومی
window.quickSearch = quickSearch;
window.contactTeacher = contactTeacher;
window.showPage = showPage;
window.speakWord = speakWord;
