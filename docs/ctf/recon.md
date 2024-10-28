---
title: Recon
---

# Recon

## Port scanning
```bash
nmap -T4 -A -v -Pn -p- -oN scan_report.txt <host>
```

## Dirbusting
```bash
ffuf -u http://<url>/FUZZ -w /usr/share/wordlists/dirb/common.txt
```
```bash
gobuster dir -u http://<url> -w /usr/share/wordlists/dirb/common.txt -t 70
```
```shell
dirb https://<url> /usr/share/wordlists/dirb/common.txt
```

## Vhosts discovery
```bash
ffuf -u http://<url> -w /usr/share/dnsrecon/subdomains-top1mil.txt -H "Host: FUZZ.<domain>.com" -fc 301
```
```bash
gobuster vhost -u http://<url> -w <wordlist> --append-domain -t 70
```
```bash
gobuster vhost -u https://<url> -w <wordlist> --append-domain -k -t 70
```

## Dynamic wordlist building
```bash
cewl http://<url> -w cewl-generated-wordlist.txt
```

## Nikto
```bash
nikto -host <host>
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

