    <h2>Docker Dashboard</h2>
    <button class="button" onclick="addRepo()">Hinzufügen</button>
    <div id="docker-status-indicator"></div>
    <span id="docker-status-light" style="width: 20px; height: 20px; border-radius: 50%; display: inline-block;"></span>
    <span id="docker-status-text"></span>


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
    <h3>Letzte 25 Docker-Fehlerprotokolle:</h3>
    <div id="docker-logs">
        <!-- Docker-Fehlerprotokolle werden hier angezeigt -->
    </div>
