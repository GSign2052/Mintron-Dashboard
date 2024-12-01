// Funktion, um zwischen verschiedenen Ansichten umzuschalten
function showView(view) {
    document.querySelectorAll('.view').forEach(el => el.style.display = 'none');
    document.getElementById(view).style.display = 'block';
}

// Realistischere Animationen hinzufügen
document.addEventListener('mousemove', function(e) {
    const wave = document.createElement('div');
    wave.className = 'wave';
    wave.style.left = `${e.pageX}px`;
    wave.style.top = `${e.pageY}px`;
    document.body.appendChild(wave);
    setTimeout(() => wave.remove(), 1000);
});

document.addEventListener('click', function(e) {
    const pulse = document.createElement('div');
    pulse.className = 'pulse';
    pulse.style.left = `${e.pageX - 25}px`; // Zentriere den Effekt
    pulse.style.top = `${e.pageY - 25}px`; // Zentriere den Effekt
    document.body.appendChild(pulse);
    setTimeout(() => pulse.remove(), 1000);
});
