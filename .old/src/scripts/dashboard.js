// Funktion zum Abrufen der Systeminformationen
function fetchData() {
    fetch('/dashboard/system_info.php')
        .then(response => response.json())
        .then(data => {
            document.getElementById('time').textContent = data.time;
            document.getElementById('cpu').textContent = data.cpu;
            document.getElementById('cpu_temp').textContent = data.cpu_temp;
            document.getElementById('cpu_model').textContent = data.cpu_model;
            document.getElementById('ram').textContent = `${data.ram.used} / ${data.ram.total}`;
            document.getElementById('disk').textContent = (data.disk.free / (1024 * 1024 * 1024)).toFixed(2);
            document.getElementById('os').textContent = data.os;
            document.getElementById('processes').textContent = data.processes;

            // Netzwerkschnittstellen laden
            updateNetworkTable(data.network);
            // Repositories laden
            updateReposTable(data.repos);
            // Docker-Container laden
            updateDocker(data.docker);
        });
}

// Funktion zum Laden der Netzwerkschnittstellen
function updateNetworkTable(networkData) {
    const networkTable = document.getElementById('network-table');
    if (networkTable) {
        networkTable.innerHTML = networkData.split('\n').map(row => {
            const [iface, ip] = row.split('|');
            return `<tr>
                        <td>${iface}</td>
                        <td>${ip}</td>
                    </tr>`;
        }).join('');
    }
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

function updateDocker(dockerData) {
    const dockerTable = document.getElementById('docker-table');
    const dockerStatus = document.getElementById('docker-status');
    const dockerLogs = document.getElementById('docker-logs');
    
    // Überprüfe, ob dockerData die containers-Eigenschaft enthält
    if (dockerStatus) {
        dockerStatus.innerHTML = dockerData.status === 'running'
            ? '<span style="color: green;">Docker läuft</span>'
            : '<span style="color: red;">Docker gestoppt</span>';
    }
    
    if (dockerLogs) {
        dockerLogs.textContent = dockerData.logs || 'Keine Logs verfügbar';
    }
    
    // Prüfe, ob dockerData.containers existiert und nicht leer ist
    if (dockerTable) {
        if (dockerData.containers && dockerData.containers.length > 0) {
            dockerTable.innerHTML = dockerData.containers.map(container => {
                const [id, name, status] = container.split('|');
                return `<tr>
                            <td>${id}</td>
                            <td>${name}</td>
                            <td>${status}</td>
                            <td class="actions">
                                <button onclick="startDocker('${id}')">Starten</button>
                                <button onclick="stopDocker('${id}')">Stoppen</button>
                                <button onclick="deleteDocker('${id}')">Löschen</button>
                            </td>
                        </tr>`;
            }).join('');
        } else {
            // Falls containers leer oder nicht vorhanden sind
            dockerTable.innerHTML = '<tr><td colspan="4">Keine Docker-Container gefunden.</td></tr>';
        }
    }
}


document.addEventListener('DOMContentLoaded', function() {
    fetchData();
    setInterval(fetchData, 5000); // Daten alle 5 Sekunden aktualisieren
});
