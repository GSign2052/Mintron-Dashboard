<?php
header('Content-Type: application/json');

// Debugging-Ausgabe
error_log("upconfig.php wird aufgerufen");

// Apache-Konfigurationsdateien abrufen
$apache_conf_files = shell_exec('cat /etc/apache2/sites-available/*.conf 2>&1');
$apache_conf_files = $apache_conf_files ? $apache_conf_files : "Apache-Konfigurationsdateien nicht gefunden";

// Apache-Fehlerprotokoll abrufen
$apache_error_log = file_get_contents('/var/log/apache2/error.log');
$apache_error_log = $apache_error_log ? $apache_error_log : "Apache-Fehlerprotokoll nicht gefunden";

// PHP-Fehlerprotokoll abrufen
$php_error_log = file_get_contents('/var/log/php_errors.log');
$php_error_log = $php_error_log ? $php_error_log : "PHP-Fehlerprotokoll nicht gefunden";

$data = [
    'apache_conf_files' => $apache_conf_files,
    'apache_error_log' => $apache_error_log,
    'php_error_log' => $php_error_log
];

echo json_encode($data);
?>