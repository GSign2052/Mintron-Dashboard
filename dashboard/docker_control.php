<?php
header('Content-Type: application/json');

$action = isset($_GET['action']) ? $_GET['action'] : null;
$id = isset($_GET['id']) ? escapeshellarg($_GET['id']) : null;
$name = isset($_GET['name']) ? escapeshellarg($_GET['name']) : null;
$image = isset($_GET['image']) ? escapeshellarg($_GET['image']) : null;

switch ($action) {
    case 'start':
        $output = shell_exec("docker start $id 2>&1");
        if (strpos($output, 'Error') === false) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => $output]);
        }
        break;
    case 'stop':
        $output = shell_exec("docker stop $id 2>&1");
        if (strpos($output, 'Error') === false) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => $output]);
        }
        break;
    case 'delete':
        $output = shell_exec("docker rm $id 2>&1");
        if (strpos($output, 'Error') === false) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => $output]);
        }
        break;
    case 'create':
        $output = shell_exec("docker run -d --name $name $image 2>&1");
        if (strpos($output, 'Error') === false) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => $output]);
        }
        break;
    default:
        // Docker-Status abrufen
        $docker_status = shell_exec("systemctl is-active docker");
        $docker_status = trim($docker_status) === 'active' ? 'running' : 'stopped';

        // Docker-Fehlerprotokolle abrufen
        $docker_logs = shell_exec("journalctl -u docker.service --since '1 day ago' -p err -n 25");

        // Docker-Container-Informationen abrufen
        $output = shell_exec("docker ps -a --format '{{.ID}}|{{.Names}}|{{.Status}}'");
        $containers = explode("\n", trim($output));
        echo json_encode([
            'docker_status' => $docker_status,
            'docker_logs' => $docker_logs,
            'docker' => $containers
        ]);
        break;
}
?>