<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['apache_config'])) {
        file_put_contents('/etc/apache2/apache2.conf', $_POST['apache_config']);
    }
    if (isset($_POST['php_ini'])) {
        file_put_contents('/etc/php/8.2/cli/php.ini', $_POST['php_ini']);
    }
}
header('Location: configs.php');
?>