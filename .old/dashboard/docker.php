<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Docker Dashboard</title>
    <link rel="stylesheet" href="/src/style.css">
</head>
<body>
    <h2>Docker Dashboard</h2>
    <div id="docker-status">
        <!-- Docker-Status wird hier angezeigt -->
    </div>
    <table>
        <thead>
            <tr>
                <th>Container ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>Aktionen</th>
            </tr>
        </thead>
        <tbody id="docker-table">
            <!-- Dynamischer Inhalt -->
        </tbody>
    </table>
    <button onclick="addDocker()">Hinzufügen</button>
    <h3>Letzte 25 Docker-Fehlerprotokolle:</h3>
    <div id="docker-logs">
        <!-- Docker-Fehlerprotokolle werden hier angezeigt -->
    </div>
</body>
</html>