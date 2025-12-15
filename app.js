// ============================================
// ادامه توابع تست روزانه
// ============================================

// انتخاب پاسخ در تست
window.selectTestAnswer = function(selectedIndex, correctIndex, word) {
    const test = appState.dailyTest;
    const optionButtons = document.querySelectorAll('.option-btn');
    
    // غیرفعال کردن همه دکمه‌ها
    optionButtons.forEach(btn => btn.disabled = true);
    
    // نمایش پاسخ صحیح/غلط
    optionButtons.forEach((btn, index) => {
        if (index === correctIndex) {
            btn.classList.add('correct');
        } else if (index === selectedIndex) {
            btn.classList.add('incorrect');
        }
    });
    
    // بررسی پاسخ
    if (selectedIndex === correctIndex) {
        test.score++;
        showNotification('پاسخ صحیح! 🎉', 'success');
    } else {
        showNotification('پاسخ نادرست!', 'error');
    }
    
    // نمایش توضیح
    const data = A1_DICTIONARY[word];
    const explanation = `
        <div style="background: #f8f9fa; padding: 16px; border-radius: var(--border-radius-sm); margin-top: 20px; border-right: 4px solid ${selectedIndex === correctIndex ? 'var(--success)' : 'var(--danger)'};">
            <p><strong>${word}</strong> = ${data.persian}</p>
            <p><em>${data.englishDefinition}</em></p>
            <p>مثال: ${data.example.english}</p>
            ${data.collocation ? `<p>Collocation: ${data.collocation.english} (${data.collocation.persian})</p>` : ''}
        </div>
    `;
    
    document.querySelector('.test-question').insertAdjacentHTML('beforeend', explanation);
    
    // دکمه ادامه
    document.querySelector('.test-controls').innerHTML = `
        <button class="btn-primary" onclick="nextTestQuestion()">
            ${test.currentQuestion < 9 ? 'سوال بعدی' : 'پایان تست'}
            <i class="fas fa-forward"></i>
        </button>
    `;
};

// رد کردن سوال تست
window.skipTestQuestion = function() {
    const test = appState.dailyTest;
    test.currentQuestion++;
    
    if (test.currentQuestion < 10) {
        showTestQuestion();
    } else {
        completeDailyTest();
    }
};

// رفتن به سوال بعدی تست
window.nextTestQuestion = function() {
    const test = appState.dailyTest;
    test.currentQuestion++;
    
    if (test.currentQuestion < 10) {
        showTestQuestion();
    } else {
        completeDailyTest();
    }
};

// تکمیل تست روزانه
function completeDailyTest() {
    const test = appState.dailyTest;
    const today = new Date().toDateString();
    const timeSpent = Math.round((Date.now() - test.startTime) / 1000);
    
    test.completed = true;
    test.timeSpent = timeSpent;
    
    // ذخیره نتیجه
    appState.dailyTests.push({
        date: today,
        score: test.score,
        timeSpent: timeSpent,
        words: test.words
    });
    
    // آپدیت streak
    const lastTestDate = appState.dailyTests.length > 1 ? 
        appState.dailyTests[appState.dailyTests.length - 2].date : null;
    
    const todayObj = new Date(today);
    const yesterdayObj = new Date(todayObj);
    yesterdayObj.setDate(yesterdayObj.getDate() - 1);
    const yesterday = yesterdayObj.toDateString();
    
    if (lastTestDate === yesterday || appState.dailyTests.length === 1) {
        appState.progress.streak++;
    } else if (lastTestDate !== today) {
        appState.progress.streak = 1;
    }
    
    // آپدیت سطح
    const averageScore = appState.dailyTests.reduce((sum, t) => sum + t.score, 0) / appState.dailyTests.length;
    if (averageScore >= 9) appState.progress.level = 3;
    else if (averageScore >= 7) appState.progress.level = 2;
    else appState.progress.level = 1;
    
    // نمایش نتیجه
    showTestResult();
    
    // گزارش به تلگرام
    sendTelegramReport('daily_test_completed', {
        userId: appState.userId,
        score: test.score,
        timeSpent: timeSpent,
        streak: appState.progress.streak
    });
    
    saveState();
    updateUI();
}

// نمایش نتیجه تست
function showTestResult() {
    const test = appState.dailyTest;
    const passed = test.score >= 7;
    
    const timeFormatted = `${Math.floor(test.timeSpent / 60)}:${(test.timeSpent % 60).toString().padStart(2, '0')}`;
    
    const html = `
        <div class="test-page">
            <div class="test-container" style="background: ${passed ? '#e8f5e9' : '#f8d7da'}; border-color: ${passed ? 'var(--success)' : 'var(--danger)'};">
                <div class="test-header">
                    <h3><i class="fas ${passed ? 'fa-trophy' : 'fa-exclamation-triangle'}"></i> نتیجه تست روزانه</h3>
                    <p>${new Date().toLocaleDateString('fa-IR')}</p>
                </div>
                
                <div style="text-align: center; padding: 30px 20px;">
                    <div style="font-size: 72px; color: ${passed ? 'var(--success)' : 'var(--danger)'}; margin-bottom: 20px;">
                        ${test.score}/10
                    </div>
                    
                    <h2 style="margin-bottom: 16px; color: ${passed ? 'var(--success)' : 'var(--danger)'};">
                        ${passed ? '🎉 موفقیت‌آمیز! 🎉' : '📝 نیاز به تمرین بیشتر'}
                    </h2>
                    
                    <p style="color: var(--text-medium); margin-bottom: 30px;">
                        ${passed ? 
                            'آفرین! شما در این تست موفق شدید. به همین روال ادامه دهید.' : 
                            'نگران نباشید! با تمرین بیشتر قطعاً پیشرفت خواهید کرد.'
                        }
                    </p>
                    
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 30px 0;">
                        <div style="text-align: center;">
                            <div style="font-size: 24px; font-weight: 700; color: var(--primary);">${test.score * 10}%</div>
                            <div style="font-size: 14px; color: var(--text-light);">دقت</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 24px; font-weight: 700; color: var(--warning);">${timeFormatted}</div>
                            <div style="font-size: 14px; color: var(--text-light);">زمان</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 24px; font-weight: 700; color: var(--success);">${appState.progress.streak}</div>
                            <div style="font-size: 14px; color: var(--text-light);">روز متوالی</div>
                        </div>
                    </div>
                    
                    ${!passed ? `
                        <div style="background: #fff3cd; padding: 16px; border-radius: var(--border-radius-sm); margin: 20px 0; border-right: 4px solid #ffc107;">
                            <p style="margin: 0; color: #856404;">
                                <i class="fas fa-lightbulb"></i>
                                <strong>توصیه:</strong> روی لغت‌هایی که اشتباه پاسخ داده‌اید بیشتر تمرین کنید.
                            </p>
                        </div>
                    ` : ''}
                    
                    <div style="margin-top: 40px; display: flex; gap: 16px; justify-content: center;">
                        <button class="btn-secondary" onclick="reviewTestAnswers()">
                            <i class="fas fa-redo"></i>
                            مرور پاسخ‌ها
                        </button>
                        <button class="btn-primary" onclick="switchPage('test')">
                            <i class="fas fa-home"></i>
                            بازگشت
                        </button>
                        <button class="btn-success" onclick="practiceWeakWords()" ${test.score === 10 ? 'disabled' : ''}>
                            <i class="fas fa-dumbbell"></i>
                            تمرین لغات ضعیف
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    elements.contentArea.innerHTML = html;
}

// تایمر تست
function startTestTimer() {
    const test = appState.dailyTest;
    const totalTime = 15 * 60; // 15 دقیقه به ثانیه
    let remainingTime = totalTime;
    
    test.timerInterval = setInterval(() => {
        remainingTime--;
        
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        
        const timerElement = document.getElementById('testTimer');
        const remainingTimeElement = document.getElementById('remainingTime');
        
        if (timerElement) {
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        if (remainingTimeElement) {
            remainingTimeElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        // تغییر رنگ در 5 دقیقه پایانی
        if (remainingTime <= 300) { // 5 دقیقه
            if (timerElement) timerElement.style.color = 'var(--danger)';
            if (remainingTimeElement) remainingTimeElement.style.color = 'var(--danger)';
        }
        
        // اتمام زمان
        if (remainingTime <= 0) {
            clearInterval(test.timerInterval);
            completeDailyTest();
        }
    }, 1000);
}

// مرور پاسخ‌های تست
function reviewTestAnswers() {
    const test = appState.dailyTest;
    let currentIndex = 0;
    
    function showReviewQuestion() {
        if (currentIndex >= test.words.length) {
            closeModal();
            return;
        }
        
        const word = test.words[currentIndex];
        const data = A1_DICTIONARY[word];
        
        showModal(
            `مرور سوال ${currentIndex + 1} از 10`,
            `
                <div style="margin-bottom: 20px;">
                    <h4 style="color: var(--primary); margin-bottom: 16px;">کلمه: <strong>${word}</strong></h4>
                    
                    <div style="background: #f8f9fa; padding: 16px; border-radius: var(--border-radius-sm);">
                        <p><strong>معنی فارسی:</strong> ${data.persian}</p>
                        <p><strong>تعریف انگلیسی:</strong> ${data.englishDefinition}</p>
                        <p><strong>مثال:</strong> ${data.example.english}</p>
                        <p><strong>ترجمه مثال:</strong> ${data.example.persian}</p>
                        ${data.collocation ? `<p><strong>Collocation:</strong> ${data.collocation.english} (${data.collocation.persian})</p>` : ''}
                        ${data.phrase ? `<p><strong>Phrase:</strong> ${data.phrase.english} (${data.phrase.persian})</p>` : ''}
                        ${data.phrasalVerb ? `<p><strong>Phrasal Verb:</strong> ${data.phrasalVerb.english} (${data.phrasalVerb.persian})</p>` : ''}
                    </div>
                </div>
                
                <div style="margin-top: 20px; display: flex; justify-content: space-between;">
                    <button class="btn-secondary" onclick="speakWord('${word}')">
                        <i class="fas fa-volume-up"></i>
                        تلفظ
                    </button>
                    <button class="btn-secondary" onclick="toggleSaveWord('${word}')">
                        <i class="fas fa-bookmark"></i>
                        ذخیره
                    </button>
                </div>
            `,
            `
                <button class="btn-secondary" onclick="currentIndex = ${test.words.length - 1}; showReviewQuestion()">
                    <i class="fas fa-fast-forward"></i>
                    برو به آخر
                </button>
                <div style="flex-grow: 1; text-align: center;">
                    ${currentIndex + 1} / ${test.words.length}
                </div>
                <button class="btn-primary" onclick="currentIndex++; showReviewQuestion()">
                    ${currentIndex < test.words.length - 1 ? 'بعدی' : 'پایان'}
                    <i class="fas fa-forward"></i>
                </button>
            `
        );
    }
    
    showReviewQuestion();
}

// ============================================
// توابع سیستم لایتنر - ادامه
// ============================================

// حرکت لغت به جعبه بعدی در لایتنر
function moveToNextBox(word) {
    // پیدا کردن جعبه فعلی
    for (let boxNum = 1; boxNum <= 5; boxNum++) {
        const box = appState.leitnerSystem.boxes[boxNum];
        const index = box.indexOf(word);
        
        if (index !== -1) {
            // حذف از جعبه فعلی
            box.splice(index, 1);
            
            // اگر جعبه 5 نیست، به جعبه بعدی منتقل کن
            if (boxNum < 5) {
                appState.leitnerSystem.boxes[boxNum + 1].push(word);
                
                // اگر به جعبه 5 منتقل شد، به mastered اضافه کن
                if (boxNum + 1 === 5) {
                    appState.leitnerSystem.stats.masteredWords++;
                }
            } else {
                // اگر در جعبه 5 است، در همان جعبه بماند
                box.push(word);
            }
            
            // آپدیت تاریخ مرور بعدی
            const nextBox = Math.min(boxNum + 1, 5);
            const daysToAdd = Math.pow(2, nextBox - 1);
            const nextReviewDate = new Date();
            nextReviewDate.setDate(nextReviewDate.getDate() + daysToAdd);
            
            appState.leitnerSystem.lastReview[word] = new Date().toDateString();
            appState.leitnerSystem.nextReview[word] = nextReviewDate.toDateString();
            
            saveState();
            return;
        }
    }
}

// حرکت لغت به جعبه اول
function moveToFirstBox(word) {
    // حذف از تمام جعبه‌ها
    for (let boxNum = 1; boxNum <= 5; boxNum++) {
        const box = appState.leitnerSystem.boxes[boxNum];
        const index = box.indexOf(word);
        
        if (index !== -1) {
            box.splice(index, 1);
            
            // اگر از جعبه 5 حذف شد، از mastered کم کن
            if (boxNum === 5) {
                appState.leitnerSystem.stats.masteredWords--;
            }
            break;
        }
    }
    
    // اضافه به جعبه اول
    appState.leitnerSystem.boxes[1].push(word);
    
    // آپدیت تاریخ مرور
    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + 1);
    
    appState.leitnerSystem.lastReview[word] = new Date().toDateString();
    appState.leitnerSystem.nextReview[word] = nextReviewDate.toDateString();
    
    saveState();
}

// نمایش لغت‌های یک جعبه
function showBoxWords(boxNum) {
    const box = appState.leitnerSystem.boxes[boxNum] || [];
    
    if (box.length === 0) {
        showNotification(`جعبه ${boxNum} خالی است`, 'info');
        return;
    }
    
    const wordsList = box.map(word => {
        const data = A1_DICTIONARY[word];
        return `
            <div class="word-item">
                <div class="word-item-info">
                    <div class="word-item-main">
                        <span class="word-item-english">${word}</span>
                        <span class="word-item-persian">${data.persian}</span>
                    </div>
                    <div class="word-item-meta">
                        <small>آخرین مرور: ${appState.leitnerSystem.lastReview[word] || 'ندارد'}</small>
                        <small>مرور بعدی: ${appState.leitnerSystem.nextReview[word] || 'فوری'}</small>
                    </div>
                </div>
                <div class="word-item-actions">
                    <button class="action-btn sound-btn" onclick="speakWord('${word}')">
                        <i class="fas fa-volume-up"></i>
                    </button>
                    <button class="action-btn" onclick="removeFromLeitner('${word}')" style="color: var(--danger); border-color: var(--danger);" title="حذف از لایتنر">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="action-btn" onclick="moveToFirstBox('${word}')" style="color: var(--warning); border-color: var(--warning);" title="بازگردانی به جعبه اول">
                        <i class="fas fa-redo"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    showModal(
        `جعبه ${boxNum} - هر ${Math.pow(2, boxNum - 1)} روز`,
        `
            <div class="leitner-box-detail">
                <div style="background: var(--primary-light); padding: 16px; border-radius: var(--border-radius-sm); margin-bottom: 20px;">
                    <p><i class="fas fa-info-circle"></i> این جعبه هر ${Math.pow(2, boxNum - 1)} روز یکبار مرور می‌شود.</p>
                    <p>تعداد لغات: ${box.length}</p>
                </div>
                <div class="words-list" style="max-height: 400px; overflow-y: auto;">
                    ${wordsList}
                </div>
            </div>
        `,
        `
            <button class="btn-secondary" onclick="closeModal()">بستن</button>
            <button class="btn-primary" onclick="practiceBox(${boxNum})" ${box.length === 0 ? 'disabled' : ''}>
                <i class="fas fa-play"></i>
                تمرین این جعبه
            </button>
        `
    );
}

// تمرین لغت‌های یک جعبه خاص
function practiceBox(boxNum) {
    const box = appState.leitnerSystem.boxes[boxNum] || [];
    
    if (box.length === 0) {
        showNotification('این جعبه خالی است', 'warning');
        return;
    }
    
    closeModal();
    showPracticeSession(box, 'leitner');
}

// تمرین لغت‌های ضعیف
function practiceWeakWords() {
    const test = appState.dailyTest;
    if (!test || test.words.length === 0) {
        showNotification('ابتدا یک تست انجام دهید', 'warning');
        return;
    }
    
    // در اینجا می‌توانید منطق تشخیص لغات ضعیف را پیاده‌سازی کنید
    // برای نمونه، لغت‌های تست امروز را نشان می‌دهیم
    showPracticeSession(test.words.slice(0, 5), 'englishToPersian');
}

// ============================================
// توابع پیشرفت و دستاوردها
// ============================================

function renderAchievements() {
    const achievements = [
        { id: 1, name: 'شروع سفر', desc: 'اولین جستجو', icon: 'fa-search', earned: appState.searchCount > 0 },
        { id: 2, name: 'گردآورنده', desc: '5 لغت ذخیره کن', icon: 'fa-bookmark', earned: appState.savedWords.length >= 5 },
        { id: 3, name: 'حافظه برتر', desc: '10 لغت در لایتنر', icon: 'fa-brain', earned: appState.leitnerSystem.stats.totalWords >= 10 },
        { id: 4, name: 'تست گذر', desc: 'امتیاز کامل در تست', icon: 'fa-star', earned: appState.dailyTests.some(test => test.score === 10) },
        { id: 5, name: 'متعهد', desc: '7 روز متوالی', icon: 'fa-fire', earned: appState.progress.streak >= 7 },
        { id: 6, name: 'واژه‌یاب', desc: '50 جستجو', icon: 'fa-search-plus', earned: appState.searchCount >= 50 },
        { id: 7, name: 'استاد لایتنر', desc: '20 لغت مسلط', icon: 'fa-graduation-cap', earned: appState.leitnerSystem.stats.masteredWords >= 20 },
        { id: 8, name: 'ماهر', desc: 'دقت بالای 80%', icon: 'fa-chart-line', earned: calculateAverageAccuracy() >= 80 },
    ];
    
    return achievements.map(ach => `
        <div class="achievement-card ${ach.earned ? 'earned' : 'locked'}">
            <div class="achievement-icon">
                <i class="fas ${ach.icon} ${ach.earned ? '' : 'locked-icon'}"></i>
            </div>
            <div class="achievement-info">
                <div class="achievement-name">${ach.name}</div>
                <div class="achievement-desc">${ach.desc}</div>
            </div>
            <div class="achievement-status">
                ${ach.earned ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-lock"></i>'}
            </div>
        </div>
    `).join('');
}

function calculateAverageAccuracy() {
    if (appState.dailyTests.length === 0) return 0;
    const totalScore = appState.dailyTests.reduce((sum, test) => sum + test.score, 0);
    return (totalScore / (appState.dailyTests.length * 10)) * 100;
}

// ============================================
// توابع مدیریت داده‌ها
// ============================================

// خروجی گرفتن از لغت‌های ذخیره شده
function exportSavedWords() {
    if (appState.savedWords.length === 0) {
        showNotification('هیچ لغتی برای خروجی وجود ندارد', 'warning');
        return;
    }
    
    const data = appState.savedWords.map(word => {
        const wordData = A1_DICTIONARY[word];
        return {
            word: word,
            persian: wordData.persian,
            englishDefinition: wordData.englishDefinition,
            example: wordData.example,
            dateAdded: new Date().toISOString()
        };
    });
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `saved_words_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('لغت‌ها با موفقیت دانلود شدند', 'success');
}

// پاک کردن همه لغت‌های ذخیره شده
function clearSavedWords() {
    showModal(
        'تأیید پاک کردن',
        '<p>آیا مطمئن هستید که می‌خواهید همه لغت‌های ذخیره شده را پاک کنید؟</p><p>این عمل قابل بازگشت نیست.</p>',
        `
            <button class="btn-secondary" onclick="closeModal()">لغو</button>
            <button class="btn-danger" onclick="confirmClearSavedWords()">
                <i class="fas fa-trash"></i>
                پاک کردن
            </button>
        `
    );
}

function confirmClearSavedWords() {
    appState.savedWords = [];
    showNotification('همه لغت‌های ذخیره شده پاک شدند', 'info');
    closeModal();
    saveState();
    updateUI();
    showSavedWordsPage();
}

// ============================================
// توابع کمکی اضافی
// ============================================

// بررسی تست روزانه
function checkDailyTest() {
    const today = new Date().toDateString();
    const hasTodayTest = appState.dailyTests.some(test => test.date === today);
    
    if (!hasTodayTest) {
        // نمایش یادآوری
        const lastTest = appState.dailyTests[appState.dailyTests.length - 1];
        if (lastTest) {
            const lastTestDate = new Date(lastTest.date);
            const todayDate = new Date(today);
            const diffDays = Math.floor((todayDate - lastTestDate) / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                showNotification(`🔥 استریک شما ادامه دارد! تست امروز را انجام دهید.`, 'info');
            } else if (diffDays > 1) {
                showNotification(`📝 ${diffDays} روز از آخرین تست شما گذشته!`, 'warning');
            }
        }
    }
}

// بررسی مرورهای لایتنر
function checkLeitnerReviews() {
    const reviews = calculateTodayReviews();
    if (reviews.length > 0) {
        showNotification(`📚 ${reviews.length} لغت برای مرور امروز آماده است`, 'info');
    }
}

// تمرین لغت‌های ضعیف از تست
function practiceTestWeakWords() {
    // این تابع می‌تواند لغت‌هایی که در تست اخیر اشتباه پاسخ داده شده‌اند را تمرین دهد
    const lastTest = appState.dailyTests[appState.dailyTests.length - 1];
    if (!lastTest) {
        showNotification('ابتدا یک تست انجام دهید', 'warning');
        return;
    }
    
    showPracticeSession(lastTest.words.slice(0, 5), 'englishToPersian');
}

// ============================================
// اضافه کردن event listener برای responsive design
// ============================================

window.addEventListener('resize', updateUI);

// ============================================
// راه‌اندازی نهایی
// ============================================

// اضافه کردن CSS برای responsive
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-tabs {
            overflow-x: auto;
            padding-bottom: 8px;
        }
        
        .nav-tabs::-webkit-scrollbar {
            height: 4px;
        }
        
        .nav-tabs::-webkit-scrollbar-thumb {
            background: var(--primary-light);
            border-radius: 2px;
        }
        
        .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
        }
        
        .leitner-system .boxes-container {
            grid-template-columns: repeat(3, 1fr);
        }
        
        .test-controls {
            flex-direction: column;
            gap: 12px;
        }
        
        .test-controls > * {
            width: 100%;
        }
    }
    
    @media (max-width: 480px) {
        .leitner-system .boxes-container {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .stats-grid {
            grid-template-columns: 1fr !important;
        }
        
        .page-actions {
            flex-direction: column;
            gap: 8px;
        }
    }
`;

document.head.appendChild(style);

// پیام خوش‌آمدگویی
setTimeout(() => {
    if (appState.isGuest && appState.searchCount === 0) {
        showNotification('خوش آمدید! برای شروع یک کلمه انگلیسی جستجو کنید.', 'info');
    }
}, 1000);
