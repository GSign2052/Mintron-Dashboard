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
        'status' => 'running',  // Hier könnte auch der Status des Docker-Daemons ermittelt werden
        'containers' => $docker_data
    ]
];

echo json_encode($data);
