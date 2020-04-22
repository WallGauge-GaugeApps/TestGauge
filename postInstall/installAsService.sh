#!/bin/bash
# From DOS prompt type (git update-index --chmod=+x installAsService.sh) to make this file executable.
set -e
echo "NPM post install shell that installs this app as service starts now..."
echo "Set irdclient as defalut group for TestGauge -> sudo chown :irdclient ../TestGauge"
sudo chown :irdclient ../TestGauge
echo "Give default group write access to the TestGauge directory -> sudo chmod g+w ../TestGauge"
sudo chmod g+w ../TestGauge
echo "Install D-Bus config file for this service -> sudo cp ./postInstall/dbus.conf /etc/dbus-1/system.d/TestGauge.conf"
sudo cp ./postInstall/dbus.conf /etc/dbus-1/system.d/TestGauge.conf
echo "Install systemd service file -> sudo cp -n ./postInstall/server.service /etc/systemd/system/TestGauge.service"
sudo cp -n ./postInstall/server.service /etc/systemd/system/TestGauge.service
echo "Enable the servers to start on reboot -> systemctl enable TestGauge.service"
sudo systemctl enable TestGauge.service
echo "Start the service now -> systemctl start TestGauge.service"
sudo systemctl start TestGauge.service
echo "NPM Post install shell is complete."
#echo "To start this servers please reboot the server. After reboot Type -> journalctl -u TestGauge -f <- to see status."