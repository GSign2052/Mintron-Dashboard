function fetchData() {
    fetch('dashboard/system_info.php')
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
            const networkTable = document.getElementById('network-table');
            if (networkTable) {
                networkTable.innerHTML = data.network.split('\n').map(row => {
                    const [iface, ip] = row.split('|');
                    return `<tr>
                        <td>${iface}</td>
                        <td>${ip}</td>
                    </tr>`;
                }).join('');
            }
            // Repositorys laden
            const reposTable = document.getElementById('repos-table');
            if (reposTable) {
                reposTable.innerHTML = data.repos.split('\n').map(repo => `
                    <tr>
                        <td>${repo}</td>
                        <td class="actions">
                            <button onclick="deleteRepo('${repo}')">Löschen</button>
                        </td>
                    </tr>
                `).join('');
            }
            // Docker-Container laden
            fetch('dashboard/docker_control.php')
                .then(response => response.json())
                .then(dockerData => {
                    // Docker-Status anzeigen
                    const dockerStatus = document.getElementById('docker-status');
                    if (dockerStatus) {
                        dockerStatus.innerHTML = dockerData.docker_status === 'running'
                            ? '<span style="color: green;">Docker läuft</span>'
                            : '<span style="color: red;">Docker gestoppt</span>';
                    }
                    // Docker-Fehlerprotokolle anzeigen
                    const dockerLogs = document.getElementById('docker-logs');
                    if (dockerLogs) {
                        dockerLogs.textContent = dockerData.docker_logs;
                    }
                    // Docker-Container anzeigen
                    const dockerTable = document.getElementById('docker-table');
                    if (dockerTable) {
                        if (dockerData.docker.length === 0 || dockerData.docker[0] === '') {
                            dockerTable.innerHTML = '<tr><td colspan="4">Es gibt keine Container</td></tr>';
                        } else {
                            dockerTable.innerHTML = dockerData.docker.map(container => {
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
                        }
                    }
                });
        });

    // Konfigurationsdaten laden
    fetch('dashboard/upconfig.php')
        .then(response => response.json())
        .then(data => {
            const configContainer = document.getElementById('upconfig');
            if (configContainer) {
                configContainer.innerHTML = `
                    <h2>Apache Konfigurationsdateien</h2>
                    <pre>${data.apache_conf_files}</pre>
                    <h2>Apache Fehlerprotokoll</h2>
                    <pre>${data.apache_error_log}</pre>
                    <h2>PHP Fehlerprotokoll</h2>
                    <pre>${data.php_error_log}</pre>
                `;
            }
        });

    // Log-Dateien laden
    fetch('dashboard/log_viewer.php')
        .then(response => response.json())
        .then(data => {
            const logFilesContainer = document.getElementById('log-files');
            if (logFilesContainer) {
                logFilesContainer.innerHTML = data.log_files.map(file => `
                    <div>
                        <a href="#" onclick="viewLog('${file}')">${file}</a>
                    </div>
                `).join('');
            }
        });
}

function viewLog(file) {
    fetch(`dashboard/log_viewer.php?file=${encodeURIComponent(file)}`)
        .then(response => response.json())
        .then(data => {
            const logContentContainer = document.getElementById('log-content');
            if (logContentContainer) {
                logContentContainer.innerHTML = `
                    <h2>Log Datei: ${file}</h2>
                    <pre>${data.log_content}</pre>
                `;
            }
        });
}

function showView(view) {
    document.querySelectorAll('.view').forEach(el => el.style.display = 'none');
    document.getElementById(view).style.display = 'block';
}

function addRepo() {
    const newRepo = prompt("Gib das neue Repository ein:");
    if (newRepo) {
        alert(`Repository ${newRepo} hinzugefügt!`);
        fetchData();
    }
}

function deleteRepo(repo) {
    if (confirm(`Bist du sicher, dass du das Repository ${repo} löschen möchtest?`)) {
        alert(`Repository ${repo} gelöscht!`);
        fetchData();
    }
}

function addDocker() {
    const name = prompt("Gib den Namen des neuen Docker-Containers ein:");
    const image = prompt("Gib das Docker-Image für den neuen Container ein:");
    if (name && image) {
        fetch(`dashboard/docker_control.php?action=create&name=${name}&image=${image}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(`Docker-Container ${name} erstellt!`);
                    fetchData();
                } else {
                    alert(`Fehler beim Erstellen des Docker-Containers: ${data.error}`);
                }
            });
    }
}

function startDocker(id) {
    fetch(`dashboard/docker_control.php?action=start&id=${id}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(`Docker-Container ${id} gestartet!`);
                fetchData();
            } else {
                alert(`Fehler beim Starten des Docker-Containers ${id}: ${data.error}`);
            }
        });
}

function stopDocker(id) {
    fetch(`dashboard/docker_control.php?action=stop&id=${id}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(`Docker-Container ${id} gestoppt!`);
                fetchData();
            } else {
                alert(`Fehler beim Stoppen des Docker-Containers ${id}: ${data.error}`);
            }
        });
}

function deleteDocker(id) {
    if (confirm(`Bist du sicher, dass du den Docker-Container ${id} löschen möchtest?`)) {
        fetch(`dashboard/docker_control.php?action=delete&id=${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(`Docker-Container ${id} gelöscht!`);
                    fetchData();
                } else {
                    alert(`Fehler beim Löschen des Docker-Containers ${id}: ${data.error}`);
                }
            });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetchData();
    setInterval(fetchData, 5000); // Aktualisiere die Daten alle 5 Sekunden
});

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