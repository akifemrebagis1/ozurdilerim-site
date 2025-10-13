document.addEventListener('DOMContentLoaded', () => {
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    const flowerContainer = document.getElementById('flower-container');
    const replayButton = document.getElementById('replay-button');
    let isOpened = false;

    // Çiçek emojileri
    const flowers = ['🌸', '🌺', '🌷', '🌹', '🌼', '💐', '🌻'];
    
    function createFlower() {
        const flower = document.createElement('div');
        flower.className = 'flower';
        
        // Rastgele çiçek seç
        flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
        
        // Başlangıç pozisyonu
        const startPosition = Math.random() * 4; // 4 kenar
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        flower.style.left = `${x}px`;
        flower.style.top = `${y}px`;
        
        // Rastgele hareket ve animasyon
        const duration = 1000 + Math.random() * 2000; // 1-3 saniye
        const delay = Math.random() * 500; // 0-500ms gecikme
        const angle = -30 + Math.random() * 60; // -30 to +30 derece
        const distance = 100 + Math.random() * 200; // 100-300px hareket
        
        flower.style.animation = `flower-burst ${duration}ms ease-out ${delay}ms forwards`;
        
        // DOM'a ekle
        flowerContainer.appendChild(flower);
        
        // Animasyon bitince DOM'dan kaldır
        setTimeout(() => {
            flower.remove();
        }, duration + delay);
    }

    function burstFlowers() {
        // Çiçekleri temizle
        flowerContainer.innerHTML = '';
        
        // 30-40 arası çiçek oluştur
        const flowerCount = 30 + Math.floor(Math.random() * 10);
        
        // Çiçekleri oluştur
        for (let i = 0; i < flowerCount; i++) {
            setTimeout(createFlower, i * 50); // Her çiçek için küçük gecikme
        }
    }

    function openEnvelope() {
        if (isOpened) return;
        
        isOpened = true;
        envelopeWrapper.classList.add('open');
        
        // Çiçekleri biraz gecikmeyle başlat
        setTimeout(burstFlowers, 600);

        // Tekrar oynat butonunu göster
        setTimeout(() => {
            replayButton.classList.add('visible');
        }, 1200);
    }

    function resetEnvelope() {
        isOpened = false;
        envelopeWrapper.classList.remove('open');
        flowerContainer.innerHTML = '';
        replayButton.classList.remove('visible');
    }

    // Event Listeners
    envelopeWrapper.addEventListener('click', openEnvelope);
    envelopeWrapper.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openEnvelope();
        }
    });

    // Tekrar oynat butonu için event listener
    replayButton.addEventListener('click', () => {
        resetEnvelope();
        // Kısa bir gecikme sonra tekrar aç
        setTimeout(openEnvelope, 300);
    });
});