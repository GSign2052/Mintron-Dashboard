<?php
// Funktion zum Abrufen der letzten Git-Commits
function getGitCommits($limit = 10) {
    $commits = shell_exec("git log -n $limit --pretty=format:'%h - %an, %ar : %s'");
    return explode("\n", trim($commits));
}

// Funktion zum Abrufen der letzten Änderungen an Dateien
function getFileChanges() {
    $changes = shell_exec("git log --name-status --pretty=format:'%h - %an, %ar : %s'");
    $changesArray = explode("\n", trim($changes));
    $fileChanges = [];
    foreach ($changesArray as $change) {
        if (preg_match('/^[a-f0-9]{7}/', $change)) {
            $currentCommit = $change;
        } else {
            $fileChanges[] = $currentCommit . ' ' . $change;
        }
    }
    return $fileChanges;
}

$commits = getGitCommits();
$fileChanges = getFileChanges();
?>

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update Übersicht</title>
    <link rel="stylesheet" href="src/style.css">
</head>
<body>
    <h1>Update Übersicht</h1>
    <h2>Letzte Git-Commits</h2>
    <ul>
        <?php foreach ($commits as $commit): ?>
            <li><?php echo htmlspecialchars($commit); ?></li>
        <?php endforeach; ?>
    </ul>

    <h2>Letzte Änderungen an Dateien</h2>
    <ul>
        <?php foreach ($fileChanges as $change): ?>
            <li><?php echo htmlspecialchars($change); ?></li>
        <?php endforeach; ?>
    </ul>
</body>
</html>