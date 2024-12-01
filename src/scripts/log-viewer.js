function viewLog(file) {
    fetch(`dashboard/log_viewer.php?file=${encodeURIComponent(file)}`)
        .then(response => response.json())
        .then(data => {
            const logContentContainer = document.getElementById('log-content');
            if (logContentContainer) {
                logContentContainer.innerHTML = `
                    <h2>Log Datei: ${file}</h2>
                    <pre>${data.log_content}</pre>
                `;
            }
        });
}
