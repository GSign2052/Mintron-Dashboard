<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Konfigurationsdateien</title>
    <style>
        body {
            background-color: #000;
            color: #00FF00;
            font-family: 'Courier New', Courier, monospace;
        }
        .container {
            padding: 20px;
        }
        textarea {
            width: 100%;
            height: 400px;
            background-color: #111;
            color: #00FF00;
            border: 1px solid #00FF00;
            padding: 10px;
        }
        button {
            background-color: #00FF00;
            color: #000;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Apache2 Konfiguration</h1>
        <form method="post" action="save_config.php">
            <textarea name="apache_config"><?php echo file_get_contents('/etc/apache2/apache2.conf'); ?></textarea>
            <button type="submit">Speichern</button>
        </form>
        <h1>PHP.ini</h1>
        <form method="post" action="save_config.php">
            <textarea name="php_ini"><?php echo file_get_contents('/etc/php/8.2/cli/php.ini'); ?></textarea>
            <button type="submit">Speichern</button>
        </form>
    </div>
</body>
</html>