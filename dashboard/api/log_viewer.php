<?php
header('Content-Type: application/json');

// Alle .log Dateien im Verzeichnis /var/log/ auflisten
$log_files = glob('/var/log/*.log');
sort($log_files); // Alphabetisch sortieren

// Abrufen des Inhalts einer ausgewählten Log-Datei
$log_file = isset($_GET['file']) ? $_GET['file'] : null;
$log_content = '';
$allowed_files = glob('/var/log/*.log'); // Liste der erlaubten Log-Dateien
if (!in_array(realpath($log_file), array_map('realpath', $allowed_files))) {
    $log_content = "Zugriff verweigert."; // Fehlermeldung, wenn die Datei unzulässig ist
} else {
    $log_content = shell_exec("tail -n 50 " . escapeshellarg($log_file)); // Dateiinhalt
}


// Daten als JSON zurückgeben
$data = [
    'log_files' => $log_files,       // Liste der Log-Dateien
    'log_content' => $log_content   // Inhalt der ausgewählten Datei
];

echo json_encode($data);
?>
