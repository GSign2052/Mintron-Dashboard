Mintron Dashboard

System (Tested)
Linux Mint 22

Verzeichnisstruktur
- index.php
- src
  - nav.php
  - header.php
  - script.js
  - style.css
- dashboard
  - network.php
+ Netzwerkschnittstellen
  - docker.php
+ docker-Übersicht
  - repo.php
+ aktuelle reposity listen
  - system_info.php
+ Systemzeit
+ CPU (Auslastung, Temperatur, Treiber, Modell Informationen)
+ Arbeitspeicher (Auslastung, Speicher, Treiber, Modell Informationen)
+ Festplatte (Auslastung, Speicher, Treiber, Modell Informationen)
+ System OS  (Treiber, Modell)
+ Prozesse (Auslastung, Speicher, Treiber, Modell Informationen)

Installationen:
sudo apt install lm-sensors lscpu dmidecode
sudo sensors-detect
sudo apt install apache2
php.8.2
Rechte
