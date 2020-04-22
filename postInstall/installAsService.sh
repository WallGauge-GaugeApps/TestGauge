#!/bin/bash
# From DOS prompt type (git update-index --chmod=+x installAsService.sh) to make this file executable.
set -e
echo "NPM post install shell that installs this app as service starts now..."
echo "Set irdclient as defalut group for testGauge -> sudo chown :irdclient ../testGauge"
sudo chown :irdclient ../testGauge
echo "Give default group write access to the testGauge directory -> sudo chmod g+w ../testGauge"
sudo chmod g+w ../testGauge
echo "Install D-Bus config file for this service -> sudo cp ./postInstall/dbus.conf /etc/dbus-1/system.d/testGauge.conf"
sudo cp ./postInstall/dbus.conf /etc/dbus-1/system.d/testGauge.conf
echo "Install systemd service file -> sudo cp -n ./postInstall/server.service /etc/systemd/system/testGauge.service"
sudo cp -n ./postInstall/server.service /etc/systemd/system/testGauge.service
echo "Enable the servers to start on reboot -> systemctl enable testGauge.service"
sudo systemctl enable testGauge.service
echo "Start the service now -> systemctl start testGauge.service"
sudo systemctl start testGauge.service
echo "NPM Post install shell is complete."
#echo "To start this servers please reboot the server. After reboot Type -> journalctl -u testGauge -f <- to see status."