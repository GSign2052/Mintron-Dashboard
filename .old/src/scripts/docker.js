function startDocker(id) {
    fetch(`/dashboard/docker_control.php?action=start&id=${id}`)
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
    fetch(`/dashboard/docker_control.php?action=stop&id=${id}`)
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
        fetch(`/dashboard/docker_control.php?action=delete&id=${id}`)
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

