(function() {
    let isFirstPage = !sessionStorage.getItem('preloaderShown');
    let duration = isFirstPage ? 2000 : 1000;
    sessionStorage.setItem('preloaderShown', 'true');

    const preloaderDiv = document.createElement('div');
    preloaderDiv.id = 'sitePreloader';
    preloaderDiv.className = 'preloader-overlay';
    preloaderDiv.innerHTML = `
        <div class="logo-spinner">
            <div class="cube large-cube-1"></div>
            <div class="cube small-cube-1"></div>
            <div class="cube small-cube-2"></div>
            <div class="cube large-cube-2"></div>
        </div>
        <div class="preloader-text">Bright Quizzes</div>
    `;
    document.body.appendChild(preloaderDiv);

    function hidePreloader() {
        const preloader = document.getElementById('sitePreloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                if (preloader.parentNode) preloader.remove();
            }, 500);
        }
    }

    setTimeout(hidePreloader, duration);
})();