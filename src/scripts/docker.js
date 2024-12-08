/**
 * Docker-Daten vom Server abrufen und aktualisieren.
 */
function fetchDockerData() {
    fetch('/dashboard/api/docker_control.php')
        .then(response => response.json())
        .then(data => {
            updateDockerStatus(data);
            updateDockerTable(data);
        })
        .catch(error => console.error('Fehler beim Abrufen der Docker-Daten:', error));
}

/**
 * Aktualisiert die Docker-Statusanzeige (grünes oder rotes Lämpchen).
 * @param {Object} dockerData - Die Docker-Daten vom Server.
 */
function updateDockerStatus(dockerData) {
    const dockerStatusElement = document.getElementById('docker-status-indicator');
    if (dockerStatusElement) {
        dockerStatusElement.innerHTML = dockerData.docker_status === 'running'
            ? '<span style="color: green;  font-weight: bold;">Status Aktiv 🟢</span>'
            : '<span style="color: red; font-weight: bold;">Status Ausgeschalten 🔴</span>';
    }
}

/**
 * Aktualisiert die Docker-Tabelle mit den Container-Daten.
 * @param {Object} dockerData - Die Docker-Daten vom Server.
 */
function updateDockerTable(dockerData) {
    const dockerTable = document.getElementById('docker-table');
    if (dockerTable) {
        if (dockerData.containers && dockerData.containers.length > 0) {
            dockerTable.innerHTML = dockerData.containers
                .filter(container => typeof container === 'string' && container.includes('|'))
                .map(container => {
                    const [id, name, status] = container.split('|');
                    return `<tr>
                        <td>${id}</td>
                        <td>${name}</td>
                        <td>${status}</td>
                        <td>
                            <button onclick="startDocker('${id}')">Starten</button>
                            <button onclick="stopDocker('${id}')">Stoppen</button>
                            <button onclick="deleteDocker('${id}')">Löschen</button>
                        </td>
                    </tr>`;
                }).join('');
        } else {
            dockerTable.innerHTML = '<tr><td colspan="4">Keine Docker-Container gefunden.</td></tr>';
        }
    }
}

// Initiales Abrufen der Docker-Daten.
document.addEventListener('DOMContentLoaded', fetchDockerData);
