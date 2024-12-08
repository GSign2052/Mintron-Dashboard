function viewLog(logFile) {
    fetch(`/dashboard/api/log_viewer.php?file=${encodeURIComponent(logFile)}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok');
        }
        return response.json();
    })
    .then(data => {
        const logContentElement = document.getElementById('log-content');
        if (logContentElement) {
            logContentElement.innerHTML = `
                <h3>Log-Inhalt:</h3>
                <pre>${data.log_content || 'Keine Daten verfügbar.'}</pre>
            `;
        }
    })
    .catch(error => {
        console.error('Fehler beim Abrufen der Log-Datei:', error);
    });
}
