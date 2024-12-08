
<?php


// Umgebungsvariable setzen
putenv('GIT_DISCOVERY_ACROSS_FILESYSTEM=1');

// Funktion zum Abrufen der letzten Git-Commits
function getGitCommits($limit = 10) {
    $commits = shell_exec("git log -n $limit --pretty=format:'%h|%an|%ar|%s' 2>&1");
    $commitsArray = explode("\n", trim($commits));
    return array_map(function($commit) {
        return explode('|', $commit);
    }, $commitsArray);
}

// Funktion zum Abrufen der letzten Änderungen an Dateien
function getFileChanges($limit = 50) {
    $changes = shell_exec("git log --name-status --pretty=format:'%h|%an|%ar|%s' 2>&1");
    $changesArray = explode("\n", trim($changes));
    $fileChanges = [];
    $currentCommit = null;

    foreach ($changesArray as $change) {
        if (preg_match('/^[a-f0-9]{7}/', $change)) {
            $currentCommit = explode('|', $change);
        } elseif ($currentCommit) {
            $fileChanges[] = array_merge($currentCommit, [$change]);
            if (count($fileChanges) >= $limit) break;
        }
    }
    return $fileChanges;
}

$commits = getGitCommits();
$fileChanges = getFileChanges();
?>
    <h1>Letzte Git-Commits</h1>
    <table>
        <thead>
            <tr>
                <th>Commit-Hash</th>
                <th>Autor</th>
                <th>Datum</th>
                <th>Nachricht</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($commits as $commit): ?>
                <tr>
                    <td><?php echo htmlspecialchars($commit[0] ?? 'Unbekannt'); ?></td>
                    <td><?php echo htmlspecialchars($commit[1] ?? 'Unbekannt'); ?></td>
                    <td><?php echo htmlspecialchars($commit[2] ?? 'Unbekannt'); ?></td>
                    <td><?php echo htmlspecialchars($commit[3] ?? 'Unbekannt'); ?></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    <h2>Letzte Änderungen an Dateien</h2>
    <table>
        <thead>
            <tr>
                <th>Commit-Hash</th>
                <th>Autor</th>
                <th>Datum</th>
                <th>Nachricht</th>
                <th>Dateiänderung</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($fileChanges as $change): ?>
                <tr>
                    <td><?php echo htmlspecialchars($change[1] ?? 'Unbekannt'); ?></td>
                    <td><?php echo htmlspecialchars($change[0] ?? 'Unbekannt'); ?></td>
                    <td><?php echo htmlspecialchars($change[1] ?? 'Unbekannt'); ?></td>
                    <td><?php echo htmlspecialchars($change[2] ?? 'Unbekannt'); ?></td>
                    <td><?php echo htmlspecialchars($change[3] ?? 'Unbekannt'); ?></td>
                    <td><?php echo htmlspecialchars($change[4] ?? ''); ?></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

