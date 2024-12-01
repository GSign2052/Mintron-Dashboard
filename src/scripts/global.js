// Liste von chinesischen Symbolen
const chineseSymbols = ['汉', '字', '你', '好', '世', '界', '学', '习', '快', '乐', '希', '望', '自', '由', '梦', '想', '勇', '气', '智', '慧', '力', '量', '成', '功', '美', '丽', '爱', '家', '和', '平', '耐', '心', '友', '情', '幸', '福', '强', '大', '光', '明', '热', '情', '传', '承', '文', '化', '责', '任', '卓', '越'];

// Maximale Anzahl der Partikel auf 50 begrenzen
let particleCount = 0;

// Funktion für das Erstellen von Partikeln bei Mausbewegung
document.addEventListener('mousemove', function(e) {
    if (particleCount < 50) {  // Begrenze die Anzahl auf maximal 50
        // Erstelle ein chinesisches Symbol bei Mausbewegung
        const starDust = document.createElement('div');
        starDust.className = 'starDustWave'; // Klasse für den Sternenstaub
        starDust.style.left = `${e.pageX}px`;
        starDust.style.top = `${e.pageY}px`;

        // Zufälliges chinesisches Symbol auswählen
        const randomSymbol = chineseSymbols[Math.floor(Math.random() * chineseSymbols.length)];
        starDust.textContent = randomSymbol; // Setze das zufällige Symbol als Textinhalt

        document.body.appendChild(starDust);

        // Zähle die Partikel
        particleCount++;

        // Nach einer kurzen Zeit wird der Partikel entfernt
        setTimeout(() => {
            starDust.remove();
            particleCount--; // Reduziere die Partikelzahl
        }, 5000); // Entfernen nach 5 Sekunden
    }
});

// Funktion für den Pulse-Effekt bei Klick
document.addEventListener('click', function(e) {
    if (particleCount < 50) {  // Begrenze die Anzahl auf maximal 50
        // Erstelle ein chinesisches Symbol bei Klick
        const starDust = document.createElement('div');
        starDust.className = 'starDustWave'; // Klasse für den Sternenstaub
        starDust.style.left = `${e.pageX}px`;
        starDust.style.top = `${e.pageY}px`;

        // Zufälliges chinesisches Symbol auswählen
        const randomSymbol = chineseSymbols[Math.floor(Math.random() * chineseSymbols.length)];
        starDust.textContent = randomSymbol; // Setze das zufällige Symbol als Textinhalt

        document.body.appendChild(starDust);

        // Zähle die Partikel
        particleCount++;

        // Nach einer kurzen Zeit wird der Partikel entfernt
        setTimeout(() => {
            starDust.remove();
            particleCount--; // Reduziere die Partikelzahl
        }, 5000); // Entfernen nach 5 Sekunden
    }

    // Pulse-Effekt
    const pulse = document.createElement('div');
    pulse.className = 'pulse';
    pulse.style.left = `${e.pageX - 25}px`; // Zentriere den Effekt
    pulse.style.top = `${e.pageY - 25}px`; // Zentriere den Effekt
    document.body.appendChild(pulse);
    setTimeout(() => pulse.remove(), 1000); // Entferne den Pulse-Effekt nach 1 Sekunde
});
