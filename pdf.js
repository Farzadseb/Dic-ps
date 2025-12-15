// فایل منطق PDF - pdf.js

const PDF_LIBRARY = {
    vocabulary: [
        {
            id: 'vocab1',
            title: 'لغات پایه A1',
            description: '100 کلمه ضروری سطح مبتدی',
            pages: 5,
            size: '1.2 MB',
            url: 'pdfs/vocabulary-basic-a1.pdf',
            thumbnail: 'assets/pdf-thumbs/vocab-basic.jpg',
            downloads: 1245,
            rating: 4.8
        },
        {
            id: 'vocab2',
            title: 'لغات روزمره',
            description: 'کلمات پرکاربرد در مکالمات روزمره',
            pages: 8,
            size: '1.8 MB',
            url: 'pdfs/everyday-vocabulary.pdf',
            thumbnail: 'assets/pdf-thumbs/everyday.jpg',
            downloads: 987,
            rating: 4.7
        },
        {
            id: 'vocab3',
            title: 'لغات موضوعی',
            description: 'دسته‌بندی شده بر اساس موضوعات مختلف',
            pages: 12,
            size: '2.5 MB',
            url: 'pdfs/topical-vocabulary.pdf',
            thumbnail: 'assets/pdf-thumbs/topical.jpg',
            downloads: 756,
            rating: 4.9
        }
    ],
    grammar: [
        {
            id: 'grammar1',
            title: 'گرامر پایه A1',
            description: 'ساختارهای دستوری سطح مبتدی',
            pages: 10,
            size: '2.1 MB',
            url: 'pdfs/grammar-basic-a1.pdf',
            thumbnail: 'assets/pdf-thumbs/grammar-basic.jpg',
            downloads: 1543,
            rating: 4.6
        }
    ],
    conversation: [
        {
            id: 'conv1',
            title: 'مکالمات روزمره',
            description: 'دیالوگ‌های پرکاربرد در موقعیت‌های مختلف',
            pages: 6,
            size: '1.5 MB',
            url: 'pdfs/daily-conversations.pdf',
            thumbnail: 'assets/pdf-thumbs/conversation.jpg',
            downloads: 1123,
            rating: 4.8
        }
    ],
    exercises: [
        {
            id: 'ex1',
            title: 'تمرین‌های لغت',
            description: 'تمرین‌های متنوع برای تقویت لغات',
            pages: 7,
            size: '1.6 MB',
            url: 'pdfs/vocabulary-exercises.pdf',
            thumbnail: 'assets/pdf-thumbs/exercises.jpg',
            downloads: 876,
            rating: 4.7
        }
    ],
    worksheets: [
        {
            id: 'ws1',
            title: 'ورک‌شیت 1',
            description: 'ورک‌شیت آموزشی با فضای نوشتن',
            pages: 3,
            size: '0.8 MB',
            url: 'pdfs/worksheet-1.pdf',
            thumbnail: 'assets/pdf-thumbs/worksheet.jpg',
            downloads: 654,
            rating: 4.5
        }
    ]
};

let currentCategory = 'vocabulary';
let currentPDF = null;

// بارگذاری صفحه PDF
function initPDFPage() {
    showCategory('vocabulary');
}

// نمایش دسته‌بندی
function showCategory(category) {
    currentCategory = category;
    
    // آپدیت تب‌های فعال
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // نمایش محتوای دسته‌بندی
    const pdfs = PDF_LIBRARY[category];
    let contentHTML = `
        <div class="pdf-grid">
    `;
    
    pdfs.forEach(pdf => {
        contentHTML += `
            <div class="pdf-card">
                <div class="pdf-thumbnail">
                    <img src="${pdf.thumbnail}" alt="${pdf.title}" onerror="this.src='assets/pdf-thumbs/default.jpg'">
                    <div class="pdf-badge">PDF</div>
                </div>
                <div class="pdf-info">
                    <h3>${pdf.title}</h3>
                    <p>${pdf.description}</p>
                    <div class="pdf-meta">
                        <span><i class="fas fa-file"></i> ${pdf.pages} صفحه</span>
                        <span><i class="fas fa-hdd"></i> ${pdf.size}</span>
                        <span><i class="fas fa-download"></i> ${pdf.downloads}</span>
                        <span><i class="fas fa-star"></i> ${pdf.rating}</span>
                    </div>
                    <div class="pdf-actions">
                        <button class="btn-sm" onclick="viewPDF('${pdf.id}')">
                            <i class="fas fa-eye"></i>
                            مشاهده
                        </button>
                        <button class="btn-sm btn-primary" onclick="downloadPDF('${pdf.id}')">
                            <i class="fas fa-download"></i>
                            دانلود
                        </button>
                        <button class="btn-sm btn-secondary" onclick="addToFavorites('${pdf.id}')">
                            <i class="fas fa-bookmark"></i>
                            ذخیره
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    contentHTML += '</div>';
    document.getElementById('categoryContent').innerHTML = contentHTML;
}

// مشاهده PDF
function viewPDF(pdfId) {
    const pdf = findPDFById(pdfId);
    if (!pdf) return;
    
    currentPDF = pdf;
    document.getElementById('pdfTitle').textContent = pdf.title;
    document.getElementById('pdfViewerModal').style.display = 'flex';
    
    // نمایش PDF (در حالت واقعی از PDF.js استفاده کنید)
    document.getElementById('pdfViewer').innerHTML = `
        <div class="pdf-preview">
            <div class="preview-header">
                <h4>${pdf.title}</h4>
                <p>${pdf.description}</p>
            </div>
            <div class="preview-pages">
                <div class="page">
                    <h5>صفحه نمونه از "${pdf.title}"</h5>
                    <p>این یک پیش‌نمایش از فایل PDF است. برای مشاهده کامل فایل، آن را دانلود کنید.</p>
                    <div class="page-content">
                        <p><strong>اطلاعات فایل:</strong></p>
                        <ul>
                            <li>تعداد صفحات: ${pdf.pages}</li>
                            <li>حجم فایل: ${pdf.size}</li>
                            <li>تعداد دانلود: ${pdf.downloads}</li>
                            <li>امتیاز: ${pdf.rating}/5</li>
                        </ul>
                        <p><strong>دستورالعمل:</strong></p>
                        <p>این فایل برای مطالعه سطح A1 طراحی شده است. پیشنهاد می‌شود:</p>
                        <ol>
                            <li>فایل را دانلود و چاپ کنید</li>
                            <li>تمرین‌ها را به ترتیب انجام دهید</li>
                            <li>از قلم برای پر کردن جاهای خالی استفاده کنید</li>
                            <li>پاسخ‌ها را با معلم خود چک کنید</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div class="preview-footer">
                <p><i class="fas fa-info-circle"></i> برای مشاهده کامل فایل، دکمه دانلود را بزنید.</p>
            </div>
        </div>
    `;
}

// بقیه توابع PDF...
