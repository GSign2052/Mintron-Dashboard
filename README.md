# Mintron Dashboard

Ein flexibles Dashboard zur Anzeige von Systeminformationen und zur Verwaltung diverser Komponenten wie Netzwerk, Docker und Repositorys.

---

## 💻 **Getestetes System**
- **Betriebssystem:** Linux Mint 22  
- **Webserver:** Apache2  
- **Programmiersprache:** PHP 8.2  

---

## 📂 **Verzeichnisstruktur**

```plaintext
├── index.php                   # Einstiegspunkt der Anwendung
├── src/                        # Quellcode-Ordner
│   ├── nav.php                 # Navigationselemente
│   ├── header.php              # Kopfbereich (Header) der Seiten
│   ├── script.js               # JavaScript für dynamische Funktionen
│   └── style.css               # CSS für das Design
├── dashboard/                  # Dashboard-Module
│   ├── network.php             # Netzwerkübersicht
│   ├── docker.php              # Docker-Status und Verwaltung
│   ├── repo.php                # Aktuelle Repository-Listen
│   └── system_info.php         # Systeminformationen:
│       ├── Systemzeit          # Aktuelle Systemzeit
│       ├── CPU                 # CPU-Daten (Auslastung, Temperatur, Treiber, Modell)
│       ├── Arbeitsspeicher     # RAM-Daten (Auslastung, Speichergröße, Treiber, Modell)
│       ├── Festplatte          # HDD/SSD-Daten (Auslastung, Speichergröße, Treiber, Modell)
│       ├── Betriebssystem      # OS-Details (Treiber, Modell)
│       └── Prozesse            # Übersicht über laufende Prozesse
```

---

## 🚀 **Installation**

### 1️⃣ **Systempakete installieren**
Führen Sie die folgenden Befehle aus, um benötigte Pakete und Tools zu installieren:

```bash
sudo apt update
sudo apt install -y lm-sensors lscpu dmidecode apache2 php8.2
```

### 2️⃣ **Sensoren einrichten**
Ermöglichen Sie die Erfassung von Temperatur- und Hardwaredaten:

```bash
sudo sensors-detect
```

### 3️⃣ **Apache2 konfigurieren**
Um die Anwendung über Apache2 verfügbar zu machen:

```bash
sudo nano /etc/apache2/sites-available/mintron.conf
```

Fügen Sie die folgende Konfiguration hinzu:

```plaintext
<VirtualHost *:80>
    ServerName localhost
    DocumentRoot /path/to/mintron

    <Directory /path/to/mintron>
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/mintron_error.log
    CustomLog ${APACHE_LOG_DIR}/mintron_access.log combined
</VirtualHost>
```

**Konfiguration aktivieren und Apache neustarten:**
```bash
sudo a2ensite mintron.conf
sudo systemctl reload apache2
```

---

## ⚙️ **Rechte konfigurieren**

Stellen Sie sicher, dass die Verzeichnisrechte korrekt gesetzt sind:

```bash
sudo chown -R www-data:www-data /path/to/mintron
sudo chmod -R 755 /path/to/mintron
```

---

## 🌟 **Funktionen des Dashboards**

### Netzwerkübersicht:
- Anzeige und Verwaltung der Netzwerkschnittstellen.

### Docker-Status:
- Übersicht über Docker-Container und Statusinformationen.

### Repository-Listen:
- Aktuelle Repositorys mit einfacher Navigation.

### Systeminformationen:
- **Systemzeit:** Anzeige der aktuellen Systemzeit.
- **CPU:** Informationen zu Auslastung, Temperatur, Treiber und Modell.
- **Arbeitsspeicher:** Details zu Auslastung, Gesamtspeicher, Treiber und Modell.
- **Festplatte:** Überblick über Speicherkapazität, Auslastung und Modellinformationen.
- **Betriebssystem:** Treiber und Modell des Betriebssystems.
- **Prozesse:** Übersicht über alle aktiven Prozesse mit Ressourcenverbrauch.

---

### To-Do-Liste für geplante Funktionen und zukünftige Integrationen

Hier ist eine strukturierte Übersicht der geplanten und zukünftigen Funktionen für das Mintron-Dashboard:

---

#### **1. Docker-Dashboard**
**Funktionen:**
- Container bearbeiten, starten, stoppen, löschen
- Neue Container hinzufügen
- Details anzeigen (z. B. Status, Name, ID)
- Log-Ansicht der Container
- Integration von Docker-Statistiken (Ressourcenverbrauch)

---

#### **2. Repository-Management (repo.php)**
**Funktionen:**
- Repositories anzeigen, bearbeiten und löschen
- Neues Repository hinzufügen
- Prüfung der Repository-Verfügbarkeit
- Automatische Aktualisierungsliste (`apt update`)
- Validierung von `sources.list`-Einträgen

---

#### **3. Netzwerkschnittstellen**
**Änderungen:**
- Überflüssige Buttons oder redundante Aktionen entfernen
- Details zu aktiven Schnittstellen anzeigen (z. B. IP-Adresse, MAC-Adresse, Status)
- Möglichkeit, Schnittstellen zu aktivieren oder deaktivieren

---

#### **4. Grafikkarten-Status und Informationen**
**Geplante Funktionen:**
- Anzeige der Grafikkarten-Treiber-Version
- Speichernutzung der GPU
- Temperaturüberwachung
- Unterstützung für NVIDIA/AMD/Intel GPUs (mit Tools wie `nvidia-smi` oder `rocm-smi`)

---

#### **5. Cron-Management (cron.php)**
**Funktionen:**
- Cron-Jobs anzeigen, hinzufügen, bearbeiten und löschen
- Details zu jedem Job (z. B. nächster Ausführungszeitpunkt, Kommando)
- Fehlerprüfung für Cron-Ausdrücke
- Log-Ansicht der letzten Cron-Ausführungen

---

#### **Zukünftige Integration (geplant):**

##### **Dateimanager**
- Anzeigen, Hochladen und Bearbeiten von Dateien direkt im Dashboard
- Rechte-Management (Lesen, Schreiben, Ausführen)
- Unterstützung für gängige Dateiformate

##### **Terminal**
- Ein eingebettetes Terminal für direkte Befehlsausführung
- Authentifizierung für sensible Operationen
- Unterstützung für Syntax-Highlighting

---

## 📖 **Hilfen**

<details>
<summary>❓ Apache2 installieren und konfigurieren</summary>

1. Installiere Apache2:
   ```bash
   sudo apt install apache2
   ```

2. Erstelle eine neue Konfigurationsdatei:
   ```bash
   sudo nano /etc/apache2/sites-available/mintron.conf
   ```
   (Inhalt siehe oben)

3. Aktiviere die Konfiguration und starte Apache neu:
   ```bash
   sudo a2ensite mintron.conf
   sudo systemctl reload apache2
   ```

4. Überprüfen, ob Apache läuft:
   ```bash
   systemctl status apache2
   ```
</details>

<details>
<summary>❓ PHP installieren</summary>

1. Füge das PHP-Repository hinzu (falls nicht vorhanden):
   ```bash
   sudo apt install software-properties-common
   sudo add-apt-repository ppa:ondrej/php
   ```

2. Installiere PHP 8.2:
   ```bash
   sudo apt update
   sudo apt install php8.2 libapache2-mod-php8.2
   ```

3. Überprüfen Sie die PHP-Version:
   ```bash
   php -v
   ```

4. Apache2 mit PHP-Unterstützung neustarten:
   ```bash
   sudo systemctl restart apache2
   ```
</details>

<details>
<summary>❓ Zusätzliche Pakete für ein neues System</summary>

Für ein komplett neues System sollten folgende Pakete zusätzlich installiert werden:

```bash
sudo apt install -y curl git unzip zip
```

Docker-Installation (falls benötigt):
```bash
sudo apt install -y docker.io
sudo systemctl enable --now docker
```

Nützliche Werkzeuge:
```bash
sudo apt install htop ncdu net-tools
```
</details>

<details>
<summary>❓ Rechte-Management</summary>

Stellen Sie sicher, dass Apache die richtigen Rechte hat:

```bash
sudo chown -R www-data:www-data /path/to/mintron
sudo chmod -R 755 /path/to/mintron
```

Wenn PHP-Dateien nicht ausführbar sind, prüfen Sie die Apache-Einstellungen:
```bash
sudo a2enmod php8.2
sudo systemctl restart apache2
```
</details>

---

## 🔗 **Dashboard starten**

Öffnen Sie das Dashboard nach der Installation im Webbrowser:

```plaintext
http://localhost/index.php
```
