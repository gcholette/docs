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

## Git Dumper
```
pip install git-dumper
git-dumper https://some-url/.git ./meow
ls ./meow
```