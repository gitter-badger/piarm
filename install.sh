sudo rm -f pep.zip
sudo mkdir -p pep_backup
sudo mv alarm.py pep_backup 2>/dev/null
sudo mv restarter.py pep_backup 2>/dev/null
sudo mv alarmfunctionsr.py pep_backup 2>/dev/null
sudo mv dht22.py pep_backup 2>/dev/null
sudo mv dallas.py pep_backup 2>/dev/null
sudo mv rfsensor.py pep_backup 2>/dev/null
sudo mv globals.py pep_backup 2>/dev/null
sudo mv webcam.py pep_backup 2>/dev/null

sudo mv lcd_hd44780.py pep_backup 2>/dev/null
sudo mv lcd_nokia.py pep_backup 2>/dev/null
sudo mv lcdtest.py pep_backup 2>/dev/null
sudo mv publish.py pep_backup 2>/dev/null
sudo mv subscribe.py pep_backup 2>/dev/null

sudo wget www.privateeyepi.com/downloads/pep.zip
unzip -o pep.zip
sudo chmod 777 alarm.py
sudo chmod 777 dallas.py
sudo chmod 777 globals.py
sudo chmod 777 alarmfunctionsr.py
sudo chmod 777 dht22.py
sudo chmod 777 restarter.py
sudo chmod 777 pep_backup
sudo chmod 777 webcam.py

sudo chmod 777 lcd_hd44780.py
sudo chmod 777 lcd_nokia.py
sudo chmod 777 lcdtest.py
sudo chmod 777 publish.py
sudo chmod 777 subscribe.py

sudo apt-get install python-serial
