// Liste von chinesischen Symbolen
const chineseSymbols = ['汉', '字', '你', '好', '世', '界', '学', '习', '快', '乐', '希', '望', '自', '由', '梦', '想', '勇', '气', '智', '慧', '力', '量', '成', '功', '美', '丽', '爱', '家', '和', '平', '耐', '心', '友', '情', '幸', '福', '强', '大', '光', '明', '热', '情', '传', '承', '文', '化', '责', '任', '卓', '越'];

// Funktion, um zwischen verschiedenen Ansichten umzuschalten
function showView(view) {
    document.querySelectorAll('.view').forEach(el => el.style.display = 'none');
    document.getElementById(view).style.display = 'block';
}

// Realistischere Animationen hinzufügen (Gravitationseffekt und chinesische Symbole)
document.addEventListener('mousemove', function(e) {
    // Erstelle ein chinesisches Symbol bei Mausbewegung
    const starDust = document.createElement('div');
    starDust.className = 'starDustWave'; // Klasse für den Sternenstaub
    starDust.style.left = `${e.pageX}px`;
    starDust.style.top = `${e.pageY}px`;

    // Zufälliges chinesisches Symbol auswählen
    const randomSymbol = chineseSymbols[Math.floor(Math.random() * chineseSymbols.length)];
    starDust.textContent = randomSymbol; // Setze das zufällige Symbol als Textinhalt

    document.body.appendChild(starDust);

    // Nach einer kurzen Zeit wird der Partikel entfernt
    setTimeout(() => starDust.remove(), 2000); // Entfernt nach 5 Sekunden
});

document.addEventListener('click', function(e) {
    // Pulse-Effekt bei Klick (bleibt wie zuvor)
    const pulse = document.createElement('div');
    pulse.className = 'pulse';
    pulse.style.left = `${e.pageX - 25}px`; // Zentriere den Effekt
    pulse.style.top = `${e.pageY - 25}px`; // Zentriere den Effekt
    document.body.appendChild(pulse);
    
    // Nach einer kurzen Zeit wird der Puls entfernt
    setTimeout(() => pulse.remove(), 2000);
});
