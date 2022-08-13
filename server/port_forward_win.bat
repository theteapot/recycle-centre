:: This allows other devices on the LAN to connect to the WSL docker instance
:: you will have to adjust connectaddress to whatever the WSL instance eth0 ip is
netsh interface portproxy add v4tov4 listenport=8888 listenaddress=0.0.0.0 connectport=8888 connectaddress=192.168.164.35