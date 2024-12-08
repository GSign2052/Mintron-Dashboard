// Funktion zum Formatieren von CPU-Temperatur- und Lüfterdaten mit Emojis oder Bildern
function formatCpuTemp(cpuTempData) {
    return cpuTempData
        .split('\n')
        .map(line => {
            if (line.includes('fan')) {
                // Emoji für Lüfter oder Bild für Lüfter
                return `🌀 ${line}`;
            } else if (line.includes('Tctl')) {
                // Emoji für Temperatur (🌡️) oder hohe Temperatur (🔥)
                return `🌡️ ${line}`;
            } else if (line.includes('Tdie')) {
                return `🔥 ${line}`;
            }
            return line; // Standardzeile
        })
        .join('\n'); // Zusammenführen der Zeilen
}

// Funktion zum Abrufen der Systeminformationen
function fetchData() {
    fetch('/dashboard/api/system_info.php')
        .then(response => response.json())
        .then(data => {
            // Systemzeit anzeigen
            document.getElementById('time').textContent = data.time;

            // CPU-Auslastung
            const cpuElement = document.getElementById('cpu');
            cpuElement.textContent = `${data.cpu.toFixed(2)}%`;
            cpuElement.style.color = data.cpu > 75 ? 'red' : data.cpu > 50 ? 'orange' : 'green';

            // CPU-Temperatur formatieren und aktualisieren
            const formattedTemp = formatCpuTemp(data.cpu_temp);
            document.getElementById('cpu_temp').textContent = formattedTemp;

            // RAM-Anzeige aktualisieren
            const ramUsed = data.ram.used;
            const ramTotal = data.ram.total;
            const ramElement = document.getElementById('ram');
            ramElement.textContent = `${ramUsed} / ${ramTotal} MB`;
            document.getElementById('ram-bar').style.width = `${(ramUsed / ramTotal) * 100}%`;

            // Speicherplatz anzeigen
            const diskTable = document.getElementById('disk-table');
            diskTable.innerHTML = data.disk.map(disk => `
                <tr>
                    <td>${disk.device}</td>
                    <td>${disk.size}</td>
                    <td>${disk.used}</td>
                    <td>${disk.available}</td>
                    <td>${disk.usage}</td>
                    <td>${disk.mount}</td>
                </tr>
            `).join('');

            // Weitere Systemdetails
            document.getElementById('os').textContent = data.os;
            document.getElementById('kernel').textContent = data.kernel;
            document.getElementById('uptime').textContent = data.uptime;

            // Netzwerkschnittstellen laden
            updateNetworkTable(data.network);
            // Repositories laden
            updateReposTable(data.repos);
        });
}



// Funktion zum Laden der Repositories
function updateReposTable(reposData) {
    const reposTable = document.getElementById('repos-table');
    if (reposTable) {
        reposTable.innerHTML = reposData.split('\n').map(repo => `
            <tr>
                <td>${repo}</td>
                <td class="actions">
                    <button onclick="deleteRepo('${repo}')">Löschen</button>
                </td>
            </tr>
        `).join('');
    }
}

// Initiales Abrufen der Systemdaten
document.addEventListener('DOMContentLoaded', function() {
    fetchData();
    setInterval(fetchData, 5000); // Daten alle 5 Sekunden aktualisieren
});

function showView(view) {
    document.querySelectorAll('.view').forEach(el => el.style.display = 'none');

    const target = document.getElementById(view);
    if (target) target.style.display = 'block';
    else console.error(`Ansicht "${view}" nicht gefunden.`);
}

