(function() {
    // ===================== القائمة الجانبية =====================
    function initSideMenu() {
        const hamburger = document.getElementById('hamburgerBtn');
        const sideMenu = document.getElementById('sideMenu');
        const overlay = document.getElementById('overlayBg');
        if (!hamburger || !sideMenu || !overlay) {
            setTimeout(initSideMenu, 100);
            return;
        }
        let isAnimating = false;
        function closeMenu() {
            if (isAnimating) return;
            isAnimating = true;
            sideMenu.classList.remove('open');
            overlay.classList.remove('active');
            hamburger.classList.remove('active');
            setTimeout(() => { isAnimating = false; }, 300);
        }
        function openMenu() {
            if (isAnimating) return;
            isAnimating = true;
            sideMenu.classList.add('open');
            overlay.classList.add('active');
            hamburger.classList.add('active');
            setTimeout(() => { isAnimating = false; }, 300);
        }
        hamburger.removeEventListener('click', hamburger._listener);
        overlay.removeEventListener('click', overlay._listener);
        const hamburgerHandler = (e) => {
            e.stopPropagation();
            sideMenu.classList.contains('open') ? closeMenu() : openMenu();
        };
        const overlayHandler = () => closeMenu();
        hamburger.addEventListener('click', hamburgerHandler);
        overlay.addEventListener('click', overlayHandler);
        hamburger._listener = hamburgerHandler;
        overlay._listener = overlayHandler;

        document.querySelectorAll('.menu-list li[data-link]').forEach(li => {
            li.removeEventListener('click', li._listener);
            const handler = (e) => {
                e.stopPropagation();
                const link = li.getAttribute('data-link');
                if (link) window.location.href = link;
                closeMenu();
            };
            li.addEventListener('click', handler);
            li._listener = handler;
        });
    }

    // ===================== الثيمات =====================
    function initThemes() {
        const themeRadios = document.querySelectorAll('input[name="theme"]');
        if (themeRadios.length === 0) {
            setTimeout(initThemes, 100);
            return;
        }
        function applyTheme(themeName) {
            document.body.classList.remove('theme-dark', 'theme-light', 'theme-neon');
            document.body.classList.add(`theme-${themeName}`);
            localStorage.setItem('bright_theme', themeName);
        }
        const savedTheme = localStorage.getItem('bright_theme') || 'dark';
        if (savedTheme === 'dark') themeRadios[0].checked = true;
        else if (savedTheme === 'light') themeRadios[1].checked = true;
        else if (savedTheme === 'neon') themeRadios[2].checked = true;
        applyTheme(savedTheme);
        themeRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.checked) applyTheme(e.target.value);
            });
        });
    }

    // ===================== الاقتراحات العشوائية (تؤدي إلى النماذج) =====================
    function initRandomSuggestions() {
        const stripContainer = document.querySelector('.suggestions-strip .strip-cards');
        if (!stripContainer) return;

        const allSuggestions = [
            { name: "🏆 أولمبياد - فيزياء مبتدئين", link: "olympiad.html?category=juniors&subject=science" },
            { name: "🧪 أولمبياد - كيمياء شباب", link: "olympiad.html?category=youth&subject=chemistry" },
            { name: "💻 أولمبياد - معلوماتية عاشر", link: "olympiad.html?category=grade10&subject=informatics" },
            { name: "📐 رياضيات - الصف التاسع", link: "grade9.html?subject=math" },
            { name: "🧬 أحياء - متفوقين سابع", link: "outstanding.html?grade=7&subject=biology" },
            { name: "⚡ فيزياء - متفوقين عاشر", link: "outstanding.html?grade=10&subject=physics" },
            { name: "🔬 علوم عامة - أولمبياد مبتدئين", link: "olympiad.html?category=juniors&subject=science" },
            { name: "📊 رياضيات - أولمبياد شباب", link: "olympiad.html?category=youth&subject=math" },
            { name: "🧠 قدرات عقلية - متفوقين سابع", link: "outstanding.html?grade=7&subject=mental" },
            { name: "📖 لغة عربية - تاسع", link: "grade9.html?subject=arabic" },
            { name: "🇬🇧 English - Grade 9", link: "grade9.html?subject=english" },
            { name: "🕌 تربية إسلامية - تاسع", link: "grade9.html?subject=islamic" },
            { name: "🌍 اجتماعيات - تاسع", link: "grade9.html?subject=social" },
            { name: "🎲 مختلط كامل (جميع الأقسام)", link: "quiz.html?mixed=full" }
        ];

        // اختيار 5 عشوائية
        const shuffled = [...allSuggestions];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        const selected = shuffled.slice(0, 5);

        stripContainer.innerHTML = '';
        selected.forEach(sugg => {
            const a = document.createElement('a');
            a.className = 'strip-card';
            a.href = sugg.link;
            a.textContent = sugg.name;
            stripContainer.appendChild(a);
        });
    }

    // بدء التشغيل
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initSideMenu();
            initThemes();
            initRandomSuggestions();
        });
    } else {
        initSideMenu();
        initThemes();
        initRandomSuggestions();
    }
})();