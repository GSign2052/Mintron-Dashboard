<?php
header('Content-Type: application/json');

// Alle .log Dateien in /var/log/ auflisten
$log_files = glob('/var/log/*.log');
sort($log_files);

// Log-Datei-Inhalt abrufen
$log_file = isset($_GET['file']) ? $_GET['file'] : null;
$log_content = '';
if ($log_file && in_array($log_file, $log_files)) {
    $log_content = shell_exec("tail -n 50 " . escapeshellarg($log_file));
}

$data = [
    'log_files' => $log_files,
    'log_content' => $log_content
];

echo json_encode($data);
?>