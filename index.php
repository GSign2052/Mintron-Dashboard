<!DOCTYPE html>
<html lang="de">
<head>
    <?php include 'src/header.php'; ?>
</head>
<body>
    <div class="container">
        <?php include 'src/nav.php'; ?>
        <div class="content">
            <h1 id="title">Mintron Dashboard</h1>
            <div id="system" class="view">
                <h2>Systemauslastung</h2>
                <p>Systemzeit: <span id="time"></span></p>
                <p>CPU-Auslastung: <span id="cpu"></span>%</p>
                <p>CPU-Temperatur: <span id="cpu_temp"></span> °C</p>
                <p>CPU-Modell: <span id="cpu_model"></span></p>
                <p>RAM-Nutzung: <span id="ram"></span> MB</p>
                <p>RAM-Modell: <span id="ram_model"></span></p>
                <p>Festplatte: <span id="disk"></span> GB frei</p>
                <p>System OS: <span id="os"></span></p>
                <p>Prozesse: <span id="processes"></span></p>
            </div>
            <div id="network" class="view" style="display:none;">
                <?php include 'dashboard/network.php'; ?>
            </div>
            <div id="repos" class="view" style="display:none;">
                <?php include 'dashboard/repo.php'; ?>
            </div>
            <div id="docker" class="view" style="display:none;">
                <?php include 'dashboard/docker.php'; ?>
            </div>
        </div>
    </div>
    <script src="src/script.js"></script>
</body>
</html>