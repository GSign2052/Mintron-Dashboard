function fetchData() {
    fetch('dashboard/system_info.php')
        .then(response => response.json())
        .then(data => {
            document.getElementById('time').textContent = data.time;
            document.getElementById('cpu').textContent = data.cpu;
            document.getElementById('cpu_temp').textContent = data.cpu_temp;
            document.getElementById('cpu_model').textContent = data.cpu_model;
            document.getElementById('ram').textContent = `${data.ram.used} / ${data.ram.total}`;
            document.getElementById('ram_model').textContent = data.ram_model;
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
                        <td>Aktiv</td>
                        <td class="actions">
                            <button onclick="editNetwork('${iface}')">Bearbeiten</button>
                            <button onclick="deleteNetwork('${iface}')">Löschen</button>
                        </td>
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
                            <button onclick="editRepo('${repo}')">Bearbeiten</button>
                            <button onclick="deleteRepo('${repo}')">Löschen</button>
                        </td>
                    </tr>
                `).join('');
            }

            // Docker-Container laden
            const dockerTable = document.getElementById('docker-table');
            if (dockerTable) {
                dockerTable.innerHTML = data.docker.split('\n').map(container => {
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
        });
}

function showView(view) {
    document.querySelectorAll('.view').forEach(el => el.style.display = 'none');
    document.getElementById(view).style.display = 'block';
}

function addNetwork() {
    alert("Neue Netzwerkschnittstelle hinzufügen!");
}

function editNetwork(iface) {
    alert(`Netzwerkschnittstelle ${iface} bearbeiten!`);
}

function deleteNetwork(iface) {
    if (confirm(`Bist du sicher, dass du die Netzwerkschnittstelle ${iface} löschen möchtest?`)) {
        alert(`Netzwerkschnittstelle ${iface} gelöscht!`);
    }
}

function addRepo() {
    alert("Neues Repository hinzufügen!");
}

function editRepo(repo) {
    const newRepo = prompt(`Bearbeite das Repository:`, repo);
    if (newRepo !== null) {
        alert(`Repository geändert zu: ${newRepo}`);
    }
}

function deleteRepo(repo) {
    if (confirm(`Bist du sicher, dass du das Repository ${repo} löschen möchtest?`)) {
        alert(`Repository ${repo} gelöscht!`);
    }
}

function addDocker() {
    alert("Neuen Docker-Container hinzufügen!");
}

function startDocker(id) {
    alert(`Docker-Container ${id} starten!`);
}

function stopDocker(id) {
    alert(`Docker-Container ${id} stoppen!`);
}

function deleteDocker(id) {
    if (confirm(`Bist du sicher, dass du den Docker-Container ${id} löschen möchtest?`)) {
        alert(`Docker-Container ${id} gelöscht!`);
    }
}

fetchData();