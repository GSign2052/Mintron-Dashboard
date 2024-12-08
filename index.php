<!DOCTYPE html>
<html lang="de">

<head>
    <?php include 'src/header.php'; ?>
       <!-- Einbindung der JavaScript-Dateien -->
    <script src="/src/scripts/dashboard.js"></script>
    <script src="/src/scripts/docker.js"></script>
    <script src="/src/scripts/global.js"></script>
    <script src="/src/scripts/log-viewer.js"></script>
    <script src="/src/scripts/network.js"></script>
</head>

<body>
    <div class="stars"></div>
    <div class="nebula"></div>
    <div class="pulse"></div>
    <div class="container">
        <?php include 'src/nav.php'; ?>
        <div class="content">
            <h1 id="title">Mintron</h1>
            <div id="system" class="view">
    <p>Systemzeit: <span id="time"></span></p>
    <h3>Systemdetails</h3>
    <p>OS: <span id="os"></span></p>
    <p>Kernel: <span id="kernel"></span></p>
    <p>Uptime: <span id="uptime"></span></p>


    <h3>CPU</h3>
    <p>Auslastung: <span id="cpu"></span></p>
    <pre id="cpu_temp"></pre>

    <h3>RAM</h3>
    <p>RAM-Nutzung: <span id="ram"></span></p>
    <div class="progress-bar">
        <div id="ram-bar" class="progress"></div>
    </div>

    <h3>Speicherplatz</h3>
    <table id="disk-table">
        <thead>
            <tr>
                <th>Partition</th>
                <th>Gesamt</th>
                <th>Belegt</th>
                <th>Frei</th>
                <th>Auslastung</th>
                <th>Eingehängt</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</div>
            <div id="network" class="view" style="display:none;">
                <?php include 'dashboard/view/network.php'; ?>
            </div>
            <div id="repos" class="view" style="display:none;">
                <?php include 'dashboard/view/repo.php'; ?>
            </div>
            <div id="docker" class="view" style="display:none;">
                <?php include 'dashboard/view/docker.php'; ?>
            </div>
            <div id="updates" class="view" style="display:none;">
                <?php include 'dashboard/view/updates.php'; ?>
            </div>
            <div id="logs" class="view" style="display:none;">
                <?php include 'dashboard/view/logs.php'; ?> <!-- Neuer Abschnitt für Log Dateien -->
            </div>
        </div>
    </div>
 

</body>

</html>