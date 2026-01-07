document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-button');
    const loadingScreen = document.getElementById('loading-screen');
    const infoScreen = document.getElementById('info-screen');
    const terminalFullscreen = document.getElementById('terminal-fullscreen');
    const pulseLoader = document.getElementById('pulse-loader');
    const progressBar = document.getElementById('progress-bar');
    const statusText = document.getElementById('status-text');
    
    startButton.addEventListener('click', function() {
        // Скрываем начальный экран и показываем полноэкранный терминал
        loadingScreen.style.display = 'none';
        terminalFullscreen.style.display = 'flex';
        
        // Запускаем процесс загрузки
        let progress = 0;
        const statusMessages = [
            "Preparing data",
            "Loading modules",
            "Establishing connection",
            "Processing information",
            "Finalizing setup"
        ];
        let statusIndex = 0;
        
        const interval = setInterval(function() {
            // Увеличиваем прогресс на случайное значение от 3 до 10%
            const increment = Math.floor(Math.random() * 8) + 3;
            progress += increment;
            
            // Обновляем статус каждые 20%
            if (progress >= (statusIndex + 1) * 20 && statusIndex < statusMessages.length - 1) {
                statusIndex++;
                statusText.textContent = statusMessages[statusIndex];
            }
            
            // Если достигли 100% или больше, завершаем
            if (progress >= 100) {
                progress = 100;
                statusText.textContent = "Complete!";
                clearInterval(interval);
                
                // После небольшой задержки показываем информационный экран и пульс
                setTimeout(function() {
                    terminalFullscreen.style.display = 'none';
                    infoScreen.style.display = 'block';
                    pulseLoader.style.display = 'flex';
                    
                    // Запускаем бесконечную анимацию пульса
                    startPulseAnimation();
                    
                    // Запускаем анимацию микросхемы
                    initChipAnimation();
                }, 1000);
            }
            
            // Обновляем прогресс-бар
            progressBar.style.width = progress + '%';
            progressBar.textContent = progress + '%';
        }, 300);
    });
    
    // Функция для запуска бесконечной анимации пульса
    function startPulseAnimation() {
        const pulsePath = document.querySelector('.pulse-loader svg path');
        if (pulsePath) {
            // Устанавливаем плавную зацикленную анимацию
            pulsePath.style.animation = 'heartRateSmooth 4s infinite ease-in-out';
        }
    }
    
    // Функция для управления анимацией микросхемы (ОБНОВЛЕННАЯ)
    function initChipAnimation() {
        const chipLoader = document.querySelector('.chip-loader');
        const traces = document.querySelectorAll('.trace-flow');
        const dots = document.querySelectorAll('.pulse-dot, .pulse-dot-small');
        const inputOutputDots = document.querySelectorAll('.input-dot, .output-dot');
        const chipBody = document.querySelector('.chip-body');
        const chipGlow = document.querySelector('.chip-glow');
        
        if (!chipLoader) return;
        
        // Интерактивность при клике (ОБНОВЛЕННЫЙ КОД)
        chipLoader.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const wasPaused = this.classList.contains('paused');
            this.classList.toggle('paused');
            
            const elements = [...traces, ...dots, ...inputOutputDots];
            
            if (wasPaused) {
                // Возобновляем анимацию
                elements.forEach(el => {
                    el.style.animationPlayState = 'running';
                });
                
                // Возобновляем анимацию тела чипа
                if (chipBody) {
                    chipBody.style.animationPlayState = 'running';
                }
                
                // Возобновляем анимацию свечения
                if (chipGlow) {
                    chipGlow.style.animationPlayState = 'running';
                }
                
                // Меняем текст
                const chipText = document.querySelector('.chip-text');
                if (chipText) chipText.textContent = '';
                
                const subtext = document.querySelector('.chip-subtext');
                if (subtext) subtext.textContent = '';
                
                this.style.filter = 'drop-shadow(0 0 20px rgba(178, 34, 34, 0.4))';
            } else {
                // Ставим на паузу
                elements.forEach(el => {
                    el.style.animationPlayState = 'paused';
                });
                
                // Ставим на паузу тело чипа
                if (chipBody) {
                    chipBody.style.animationPlayState = 'paused';
                }
                
                // Ставим на паузу свечение
                if (chipGlow) {
                    chipGlow.style.animationPlayState = 'paused';
                }
                
                // Меняем текст
                const chipText = document.querySelector('.chip-text');
                if (chipText) chipText.textContent = 'PAUSED';
                
                const subtext = document.querySelector('.chip-subtext');
                if (subtext) subtext.textContent = 'CLICK TO RESUME';
                
                this.style.filter = 'drop-shadow(0 0 10px rgba(100, 100, 100, 0.3))';
            }
        });
        
        // Эффект при наведении (ОБНОВЛЕННЫЙ КОД)
        chipLoader.addEventListener('mouseenter', function() {
            if (!this.classList.contains('paused')) {
                this.style.filter = 'drop-shadow(0 0 30px rgba(255, 0, 0, 0.8))';
                
                // Ускоряем анимацию
                traces.forEach(trace => {
                    trace.style.animationDuration = '2s';
                });
                
                // Ускоряем анимацию точек
                dots.forEach(dot => {
                    if (dot.classList.contains('pulse-dot')) {
                        dot.style.animationDuration = '1s';
                    }
                });
            }
        });
        
        chipLoader.addEventListener('mouseleave', function() {
            if (!this.classList.contains('paused')) {
                this.style.filter = 'drop-shadow(0 0 20px rgba(178, 34, 34, 0.4))';
                
                // Возвращаем нормальную скорость
                traces.forEach(trace => {
                    trace.style.animationDuration = '3s';
                });
                
                // Возвращаем нормальную скорость точкам
                dots.forEach(dot => {
                    if (dot.classList.contains('pulse-dot')) {
                        dot.style.animationDuration = '1.5s';
                    }
                });
            }
        });
        
        // Случайное мерцание трасс (ОБНОВЛЕННЫЙ КОД)
        setInterval(function() {
            if (!chipLoader.classList.contains('paused') && Math.random() > 0.7) {
                const randomTrace = traces[Math.floor(Math.random() * traces.length)];
                const originalStroke = randomTrace.getAttribute('stroke');
                
                randomTrace.setAttribute('stroke', '#FF0000');
                randomTrace.style.filter = 'drop-shadow(0 0 15px #FF0000)';
                randomTrace.style.strokeWidth = '3';
                
                setTimeout(function() {
                    if (!chipLoader.classList.contains('paused')) {
                        randomTrace.setAttribute('stroke', originalStroke);
                        randomTrace.style.filter = 'drop-shadow(0 0 10px currentColor)';
                        randomTrace.style.strokeWidth = '2';
                    }
                }, 300);
            }
        }, 2000);
        
        // Установка курсора
        chipLoader.style.cursor = 'pointer';
    }
});

// CSS для паузы анимации микросхемы (ОБНОВЛЕННЫЙ)
const chipPauseStyle = document.createElement('style');
chipPauseStyle.textContent = `
    .chip-loader.paused .trace-flow {
        animation-play-state: paused !important;
    }
    
    .chip-loader.paused .pulse-dot,
    .chip-loader.paused .pulse-dot-small,
    .chip-loader.paused .input-dot,
    .chip-loader.paused .output-dot {
        animation-play-state: paused !important;
    }
    
    .chip-loader.paused .chip-body {
        animation-play-state: paused !important;
    }
    
    .chip-loader.paused .chip-glow {
        animation-play-state: paused !important;
    }
    
    .chip-loader.paused .chip-text,
    .chip-loader.paused .chip-subtext {
        animation-play-state: paused !important;
    }
`;


document.head.appendChild(chipPauseStyle);
// Функция для инициализации плашек с кентами - ТОЛЬКО ФОЛБЭК
function initKents() {
    const kentImages = document.querySelectorAll('.kent-img');
    
    kentImages.forEach(img => {
        // Если изображение не загрузилось - показываем фолбэк
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="120" height="120" fill="%23111"/><text x="60" y="60" font-family="Arial" font-size="14" fill="%23ffcc00" text-anchor="middle" dy=".3em">IMG</text></svg>';
            this.alt = 'Image not found';
        });
    });
}

// Вызываем только фолбэк функцию
setTimeout(initKents, 1000);
