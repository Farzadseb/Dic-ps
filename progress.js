// ============================================
// فایل منطق پیشرفت - progress.js
// ============================================

// نمایش صفحه پیشرفت
function showProgressPage() {
    const totalWords = appState.savedWords.length + appState.leitnerSystem.stats.totalWords;
    const accuracy = calculateAverageAccuracy();
    
    updateProgressStats();
    
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
                    <div class="stat-card-value">${appState.progress.streak}</div>
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
                <div class="chart-container">
                    <canvas id="progressChartCanvas"></canvas>
                </div>
            </div>
            
            <div class="achievements-section">
                <h3><i class="fas fa-trophy"></i> دستاوردها</h3>
                <div class="achievements-grid">
                    ${renderAchievements()}
                </div>
            </div>
            
            <div class="study-time">
                <h3><i class="fas fa-clock"></i> زمان مطالعه</h3>
                <div class="time-stats">
                    <div class="time-card">
                        <div class="time-value">${Math.floor(appState.totalPracticeTime / 60)}</div>
                        <div class="time-label">دقیقه</div>
                    </div>
                    <div class="time-card">
                        <div class="time-value">${appState.dailyTests.length}</div>
                        <div class="time-label">تست انجام شده</div>
                    </div>
                    <div class="time-card">
                        <div class="time-value">${appState.searchCount}</div>
                        <div class="time-label">جستجو</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // رسم نمودار
    renderProgressChart();
}

// محاسبه دقت متوسط
function calculateAverageAccuracy() {
    if (appState.dailyTests.length === 0) return 0;
    const totalScore = appState.dailyTests.reduce((sum, test) => sum + test.score, 0);
    return Math.round((totalScore / (appState.dailyTests.length * 10)) * 100);
}

// آپدیت آمار پیشرفت
function updateProgressStats() {
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
    
    saveState();
}

// رسم نمودار پیشرفت
function renderProgressChart() {
    const ctx = document.getElementById('progressChartCanvas');
    if (!ctx) return;
    
    const weeklyData = getWeeklyData();
    
    new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: weeklyData.labels,
            datasets: [{
                label: 'امتیاز تست',
                data: weeklyData.scores,
                borderColor: 'var(--primary)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4
            }, {
                label: 'لغات یادگرفته',
                data: weeklyData.words,
                borderColor: 'var(--success)',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    rtl: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// دریافت داده‌های هفتگی
function getWeeklyData() {
    const labels = [];
    const scores = [];
    const words = [];
    
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toLocaleDateString('fa-IR', { weekday: 'short' });
        labels.push(dateStr);
        
        // محاسبه امتیاز آن روز
        const dayTests = appState.dailyTests.filter(test => 
            new Date(test.date).toDateString() === date.toDateString()
        );
        scores.push(dayTests.length > 0 ? dayTests[0].score : 0);
        
        // محاسبه لغات آن روز (شبیه‌سازی)
        words.push(Math.floor(Math.random() * 5) + (dayTests.length > 0 ? dayTests[0].score : 0));
    }
    
    return { labels, scores, words };
}

// نمایش دستاوردها
function renderAchievements() {
    const achievements = [
        { id: 1, name: 'شروع سفر', desc: 'اولین جستجو', icon: 'fa-search', earned: appState.searchCount > 0 },
        { id: 2, name: 'گردآورنده', desc: '5 لغت ذخیره کن', icon: 'fa-bookmark', earned: appState.savedWords.length >= 5 },
        { id: 3, name: 'حافظه برتر', desc: '10 لغت در لایتنر', icon: 'fa-brain', earned: appState.leitnerSystem.stats.totalWords >= 10 },
        { id: 4, name: 'تست گذر', desc: 'امتیاز کامل در تست', icon: 'fa-star', earned: appState.dailyTests.some(test => test.score === 10) },
        { id: 5, name: 'متعهد', desc: '7 روز متوالی', icon: 'fa-fire', earned: appState.progress.streak >= 7 },
        { id: 6, name: 'واژه‌یاب', desc: '50 جستجو', icon: 'fa-search-plus', earned: appState.searchCount >= 50 },
        { id: 7, name: 'استاد لایتنر', desc: '20 لغت مسلط', icon: 'fa-graduation-cap', earned: appState.leitnerSystem.stats.masteredWords >= 20 }
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

// اشتراک‌گذاری پیشرفت
function shareProgress() {
    const progressText = `🎯 پیشرفت من در یادگیری زبان انگلیسی:
📊 امتیاز: ${calculateAverageAccuracy()}%
📖 لغات یادگرفته: ${appState.savedWords.length + appState.leitnerSystem.stats.totalWords}
🔥 استریک: ${appState.progress.streak} روز
💪 لغات مسلط: ${appState.leitnerSystem.stats.masteredWords}

#یادگیری_زبان #انگلیسی #پیشرفت`;
    
    if (navigator.share) {
        navigator.share({
            title: 'پیشرفت یادگیری زبان انگلیسی',
            text: progressText,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(progressText).then(() => {
            showNotification('پیشرفت شما کپی شد!', 'success');
        });
    }
}

// خروجی گرفتن از پیشرفت
function exportProgress() {
    const data = {
        userId: appState.userId,
        date: new Date().toISOString(),
        stats: {
            searchCount: appState.searchCount,
            savedWords: appState.savedWords.length,
            leitnerWords: appState.leitnerSystem.stats.totalWords,
            masteredWords: appState.leitnerSystem.stats.masteredWords,
            streak: appState.progress.streak,
            accuracy: calculateAverageAccuracy(),
            totalPracticeTime: appState.totalPracticeTime,
            dailyTests: appState.dailyTests.length
        },
        dailyTests: appState.dailyTests,
        savedWords: appState.savedWords,
        leitnerSystem: appState.leitnerSystem
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `progress_${appState.userId || 'guest'}_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('داده‌های پیشرفت دانلود شدند', 'success');
}
