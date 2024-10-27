---
title: Recon
---

# Recon

## nmap
```shell
nmap -T4 -A -v -Pn -p- -oN scan_report.txt $target
```

## ffuf
```shell
ffuf -u http://<url>/FUZZ -w /usr/share/wordlists/dirb/common.txt
```

```shell
ffuf -u http://<url> -w /usr/share/dnsrecon/subdomains-top1mil.txt -H "Host: FUZZ.<domain>.com" -fc 301
```

## CeWL
```shell
cewl http://<url> -w wordlist-to-save.txt
```

## gobuster
```shell
gobuster dir -u http://<url> -w /usr/share/wordlists/dirb/common.txt
```

## Nikto
```shell
nikto -host <ip>
```

## dirb
```shell
dirb $target /usr/share/wordlists/dirb/common.txt
```

## DNS

```bash
nslookup
host $targetdomain
dig $targetdomain
dig $targetdomain A
dig $targetdomain CNAME
dig $targetdomain NS
dig $targetdomain MX
dig +short $targetdomain
dig +trace $targetdomain
dig -x $targetip
```

### Zone transfer

```bash
dig axfr <domain-to-transfer> @<source-dns-server>
dig axfr example.xyz @10.0.0.3
dig axfr zonetransfer.me @nsztm1.digi.ninja
```

## Git Dumper
```
pip install git-dumper
git-dumper https://some-url/.git ./meow
ls ./meow
```
