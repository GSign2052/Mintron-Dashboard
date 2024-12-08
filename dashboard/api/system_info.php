<?php
header('Content-Type: application/json');

// Systemzeit
$time = date('Y-m-d H:i:s');

// CPU-Auslastung
$load = sys_getloadavg();
$cpu = $load[0]; // Umwandlung in Prozent

// CPU-Temperatur
$cpu_temp_raw = shell_exec('sensors');
$cpu_temp_data = [];
if (!empty($cpu_temp_raw)) {
    foreach (explode("\n", $cpu_temp_raw) as $line) {
        if (preg_match('/Tctl|Tdie|fan[0-9]+/', $line)) {
            $cpu_temp_data[] = $line;
        }
    }
}

// CPU-Modell
$cpu_model = shell_exec('lscpu | grep "Model name:" | awk \'{for (i=3; i<=NF; i++) printf $i " "; print ""}\'');

// RAM-Nutzung
$free = shell_exec('free -m');
$free_arr = preg_split('/\s+/', explode("\n", $free)[1]);
$ram_total = $free_arr[1];
$ram_used = $free_arr[2];


// Speicherplatz (alle Partitionen)
$disk_info = [];
$disk_output = shell_exec('df -h --output=source,size,used,avail,pcent,target 2>&1');
if (!empty($disk_output)) {
    $disk_lines = explode("\n", trim($disk_output));
    array_shift($disk_lines); // Erste Zeile (Header) entfernen
    foreach ($disk_lines as $line) {
        $columns = preg_split('/\s+/', $line);
        if (count($columns) >= 6) {
            $disk_info[] = [
                'device' => $columns[0],
                'size' => $columns[1],
                'used' => $columns[2],
                'available' => $columns[3],
                'usage' => $columns[4],
                'mount' => $columns[5],
            ];
        }
    }
}


// Zusätzliche Systemdetails
$os = shell_exec('lsb_release -d 2>/dev/null');
$kernel = shell_exec('uname -r');
$uptime = shell_exec('uptime -p');

// Prozesse
$processes = shell_exec('ps aux | wc -l');

// Netzwerkschnittstellen
$network = shell_exec('ip -o addr show | awk \'{print $2 "|" $4}\'');

// Reposity Listen
$repos = shell_exec('grep -rh ^deb /etc/apt/sources.list /etc/apt/sources.list.d/');

$docker = shell_exec('docker ps -a --format "{{.ID}}|{{.Names}}|{{.Status}}"');
if (empty($docker)) {
    $docker = "Keine Container gefunden.";
}


// Docker-Container in ein Array umwandeln
$docker_arr = explode("\n", trim($docker));
$docker_data = [];
foreach ($docker_arr as $container) {
    $docker_data[] = explode("|", $container);
}

// Docker-Status abrufen
$docker_status = shell_exec('systemctl is-active docker');
$docker_status = trim($docker_status) === 'active' ? 'running' : 'stopped';

$data['docker']['status'] = $docker_status; // Korrekte Zuweisung


// Docker-Daten in das Array einfügen
$data = [
    'time' => $time,
    'cpu' => $cpu,
    'cpu_temp' => trim($cpu_temp),
    'cpu_model' => trim($cpu_model),
    'ram' => [
        'total' => $ram_total,
        'used' => $ram_used
    ],
    'disk' => [
        'free' => $disk_free,
        'total' => $disk_total
    ],
    'os' => trim($os),
    'processes' => trim($processes),
    'network' => trim($network),
    'repos' => trim($repos),
    'docker' => [
        'status' => $docker_status,  // Dynamischer Docker-Status
        'containers' => $docker_data
    ]
];

// Docker-Fehlerprotokolle abrufen
$docker_logs = shell_exec("journalctl -u docker.service --since '1 day ago' -p err -n 10");

// Docker-Daten erweitern
$data['docker']['logs'] = $docker_logs ? trim($docker_logs) : 'Keine Fehlerprotokolle gefunden.';


echo json_encode([
    'time' => $time,
    'cpu' => round($cpu, 2),
    'cpu_temp' => implode("\n", $cpu_temp_data),
    'ram' => [
        'total' => $ram_total,
        'used' => $ram_used,
    ],
    'disk' => $disk_info, // Hier muss `disk_info` korrekt übertragen werden
    'os' => trim($os) ?: 'Nicht verfügbar',
    'kernel' => trim($kernel) ?: 'Nicht verfügbar',
    'uptime' => trim($uptime) ?: 'Nicht verfügbar',
    'network' => $network,
    'repos' => $repos,
]);
?>
