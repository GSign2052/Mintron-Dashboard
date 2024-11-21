🤖: Entschuldigung für das Missverständnis. Lassen Sie uns die Dateien in den richtigen Verzeichnissen speichern und die Verzeichnisstruktur anpassen. Hier sind die aktualisierten Dateien und die neuen Funktionen:

### Verzeichnisstruktur

```
- index.php
- src
  - nav.php
  - header.php
  - script.js
  - style.css
- dashboard
  - network.php
  - docker.php
  - repo.php
  - system_info.php
  - apacheconf.php
  - processnow.php
  - systemlog.php
  - cron.php
  - save_apacheconf.php
  - processes.php
  - logs.php
  - crons.php
```

### 1. `index.php`

```php
<!DOCTYPE html>
<html lang="de">
<head>
    <?php include 'src/header.php'; ?>
</head>
<body>
    <div class="container">
        <?php include 'src/nav.php'; ?>
        <div class="content">
            <h1 id="title">Mintron Dashboard</h1>
            <div id="system" class="view">
                <?php include 'dashboard/system_info.php'; ?>
            </div>
            <div id="network" class="view" style="display:none;">
                <?php include 'dashboard/network.php'; ?>
            </div>
            <div id="repos" class="view" style="display:none;">
                <?php include 'dashboard/repo.php'; ?>
            </div>
            <div id="docker" class="view" style="display:none;">
                <?php include 'dashboard/docker.php'; ?>
            </div>
            <div id="apacheconf" class="view" style="display:none;">
                <?php include 'dashboard/apacheconf.php'; ?>
            </div>
            <div id="processnow" class="view" style="display:none;">
                <?php include 'dashboard/processnow.php'; ?>
            </div>
            <div id="systemlog" class="view" style="display:none;">
                <?php include 'dashboard/systemlog.php'; ?>
            </div>
            <div id="cron" class="view" style="display:none;">
                <?php include 'dashboard/cron.php'; ?>
            </div>
        </div>
    </div>
    <script src="src/script.js"></script>
</body>
</html>
```

### 2. `src/nav.php`

```php
<div class="nav">
    <a onclick="showView('system')">System Info</a>
    <a onclick="showView('network')">Netzwerkschnittstellen</a>
    <a onclick="showView('repos')">Repositorys</a>
    <a onclick="showView('docker')">Docker Dashboard</a>
    <a onclick="showView('apacheconf')">Apache Config</a>
    <a onclick="showView('processnow')">Prozesse</a>
    <a onclick="showView('systemlog')">System Logs</a>
    <a onclick="showView('cron')">Cron Aufgaben</a>
</div>
```

### 3. `src/script.js`

```javascript
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
```

### 4. `dashboard/apacheconf.php`

```php
<h2>Apache2 Konfiguration</h2>
<form method="post" action="dashboard/save_apacheconf.php">
    <textarea name="apache_config"><?php echo file_get_contents('/etc/apache2/apache2.conf'); ?></textarea>
    <button type="submit">Speichern</button>
</form>
```

### 5. `dashboard/processnow.php`

```php
<h2>Aktuelle Prozesse</h2>
<table>
    <thead>
        <tr>
            <th onclick="sortTable(0)">PID</th>
            <th onclick="sortTable(1)">Benutzer</th>
            <th onclick="sortTable(2)">Größe</th>
            <th onclick="sortTable(3)">CPU</th>
        </tr>
    </thead>
    <tbody id="process-table">
        <!-- Dynamischer Inhalt -->
    </tbody>
</table>
<script>
    function fetchProcesses() {
        fetch('dashboard/processes.php')
            .then(response => response.json())
            .then(data => {
                const processTable = document.getElementById('process-table');
                processTable.innerHTML = data.processes.map(process => `
                    <tr>
                        <td>${process.pid}</td>
                        <td>${process.user}</td>
                        <td>${process.size}</td>
                        <td>${process.cpu}</td>
                    </tr>
                `).join('');
            });
    }

    function sortTable(n) {
        const table = document.getElementById("process-table");
        let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        switching = true;
        dir = "asc";
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 0; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount++;
            } else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }

    fetchProcesses();
</script>
```

### 6. `dashboard/systemlog.php`

```php
<h2>System Logs</h2>
<ul>
    <li><a href="dashboard/logs.php?file=/var/log/auth.log">/var/log/auth.log</a></li>
    <li><a href="dashboard/logs.php?file=/var/log/syslog">/var/log/syslog</a></li>
    <li><a href="dashboard/logs.php?file=/var/log/kern.log">/var/log/kern.log</a></li>
    <li><a href="dashboard/logs.php?file=/var/log/apache2/error.log">/var/log/apache2/error.log</a></li>
    <li><a href="dashboard/logs.php?file=journalctl">SystemD logs</a></li>
    <li><a href="dashboard/logs.php?file=dmesg">Kernel Nachrichten</a></li>
</ul>
<pre id="logContent"></pre>
<script>
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            fetch(this.href)
                .then(response => response.text())
                .then(data => {
                    document.getElementById('logContent').textContent = data;
                });
        });
    });
</script>
```

### 7. `dashboard/cron.php`

```php
<h2>Cron Aufgaben</h2>
<table>
    <thead>
        <tr>
            <th>Aufgabe</th>
            <th>Aktionen</th>
        </tr>
    </thead>
    <tbody id="cron-table">
        <!-- Dynamischer Inhalt -->
    </tbody>
</table>
<button onclick="addCron()">Hinzufügen</button>
<script>
    function fetchCrons() {
        fetch('dashboard/crons.php')
            .then(response => response.json())
            .then(data => {
                const cronTable = document.getElementById('cron-table');
                cronTable.innerHTML = data.crons.map(cron => `
                    <tr>
                        <td>${cron}</td>
                        <td class="actions">
                            <button onclick="editCron('${cron}')">Bearbeiten</button>
                            <button onclick="deleteCron('${cron}')">Löschen</button>
                        </td>
                    </tr>
                `).join('');
            });
    }

    function addCron() {
        const newCron = prompt("Neue Cron Aufgabe hinzufügen:");
        if (newCron !== null) {
            alert(`Neue Cron Aufgabe hinzugefügt: ${newCron}`);
        }
    }

    function editCron(cron) {
        const newCron = prompt(`Bearbeite die Cron Aufgabe:`, cron);
        if (newCron !== null) {
            alert(`Cron Aufgabe geändert zu: ${newCron}`);
        }
    }

    function deleteCron(cron) {
        if (confirm(`Bist du sicher, dass du die Cron Aufgabe ${cron} löschen möchtest?`)) {
            alert(`Cron Aufgabe ${cron} gelöscht!`);
        }
    }

    fetchCrons();
</script>
```

### 8. `dashboard/system_info.php`

```php
<?php
header('Content-Type: application/json');

// Systemzeit
$time = date('Y-m-d H:i:s');

// CPU-Auslastung
$load = sys_getloadavg();
$cpu = $load[0];

// CPU-Temperatur
$cpu_temp = shell_exec('sensors | grep "Package id 0:" | awk \'{print $4}\'');
$cpu_temp = str_replace("+", "", $cpu_temp);
$cpu_temp = str_replace("°C", "", $cpu_temp);

// CPU-Modell
$cpu_model = shell_exec('lscpu | grep "Model name:" | awk \'{for (i=3; i<=NF; i++) printf $i " "; print ""}\'');

// RAM-Nutzung
$free = shell_exec('free -m');
$free = (string)trim($free);
$free_arr = explode("\n", $free);
$mem = explode(" ", $free_arr[1]);
$mem = array_filter($mem);
$mem = array_merge($mem);
$ram_total = $mem[1];
$ram_used = $mem[2];

// RAM-Modell
$ram_model = shell_exec('dmidecode -t memory | grep "Part Number:" | awk \'{print $3}\'');

// Speicherplatz
$disk_free = disk_free_space("/");
$disk_total = disk_total_space("/");

// System OS
$os = shell_exec('lsb_release -d');
$os = str_replace("Description:\t", "", $os);

// Prozesse
$processes = shell_exec('ps aux | wc -l');

// Netzwerkschnittstellen
$network = shell_exec('ip -o addr show | awk \'{print $2 "|" $4}\'');

// Reposity Listen
$repos = shell_exec('grep -rh ^deb /etc/apt/sources.list /etc/apt/sources.list.d/');

// Docker-Container
$docker = shell_exec('docker ps -a --format "{{.ID}}|{{.Names}}|{{.Status}}"');

$data = [
    'time' => $time,
    'cpu' => $cpu,
    'cpu_temp' => trim($cpu_temp),
    'cpu_model' => trim($cpu_model),
    'ram' => [
        'total' => $ram_total,
        'used' => $ram_used
    ],
    'ram_model' => trim($ram_model),
    'disk' => [
        'free' => $disk_free,
        'total' => $disk_total
    ],
    'os' => trim($os),
    'processes' => trim($processes),
    'network' => trim($network),
    'repos' => trim($repos),
    'docker' => trim($docker)
];

echo json_encode($data);
?>
```

### 9. `dashboard/processes.php`

```php
<?php
header('Content-Type: application/json');

$processes = shell_exec('ps aux --sort=-%mem,-%cpu');
$processes = explode("\n", trim($processes));
array_shift($processes); // Remove header

$data = [];
foreach ($processes as $process) {
    $cols = preg_split('/\s+/', $process);
    $data[] = [
        'pid' => $cols[1],
        'user' => $cols[0],
        'size' => $cols[4],
        'cpu' => $cols[2]
    ];
}

echo json_encode(['processes' => $data]);
?>
```

### 10. `dashboard/logs.php`

```php
<?php
$file = $_GET['file'];

if ($file == 'journalctl') {
    $log = shell_exec('journalctl -n 1000');
} elseif ($file == 'dmesg') {
    $log = shell_exec('dmesg');
} else {
    $log = file_get_contents($file);
}

echo nl2br($log);
?>
```

### 11. `dashboard/crons.php`

```php
<?php
header('Content-Type: application/json');

$crons = shell_exec('crontab -l');
$crons = explode("\n", trim($crons));

echo json_encode(['crons' => $crons]);
?>
```

### 12. `dashboard/save_apacheconf.php`

```php
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['apache_config'])) {
        file_put_contents('/etc/apache2/apache2.conf', $_POST['apache_config']);
    }
}
header('Location: ../index.php');
?>
```

🤖: Hast du die Dateien in den entsprechenden Verzeichnissen gespeichert und die notwendigen Anpassungen vorgenommen? Funktioniert dein Mintron Dashboard jetzt wie gewünscht?
