        var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        // --- أضف هذا الجزء للتحريك التلقائي ---
        autoplay: {
            delay: 3000, // سرعة التحرك (2.5 ثانية)
            disableOnInteraction: false, // يستمر في التحرك حتى لو ضغط المستخدم عليه
        },
        // -------------------------------------
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });

    const counters = document.querySelectorAll('.counter');
const speed = 200; // كلما قل الرقم زادت السرعة

const startCount = (counter) => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = target.toLocaleString() + '+'; // إضافة علامة + في النهاية
        }
    };
    updateCount();
};

// تشغيل العداد عند التمرير فقط
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            startCount(entry.target);
            observer.unobserve(entry.target); // تشغيله مرة واحدة فقط
        }
    });
}, { threshold: 1 });

counters.forEach(counter => observer.observe(counter));
// الشريط العلوي
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});
