// Funktion für zufällige Planeten
function spawnRandomPlanet() {
    const planets = ['💵', '💴', '💶', '💷', '💱'];
    const planet = document.createElement('div');

    // Zufälliges Symbol auswählen
    planet.textContent = planets[Math.floor(Math.random() * planets.length)];
    planet.className = 'planet';

    // Zufällige Position
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;
    planet.style.left = `${randomX}px`;
    planet.style.top = `${randomY}px`;

    document.body.appendChild(planet);

    // Entfernen nach 10 Sekunden
    setTimeout(() => planet.remove(), 10000);
}

// Planeten alle paar Sekunden spawnen lassen
setInterval(spawnRandomPlanet, 1500);



