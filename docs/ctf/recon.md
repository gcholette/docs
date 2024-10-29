---
title: Web Recon
---

# Web Recon
## Port scanning
```bash
nmap -T4 -A -v -Pn -p- -oN scan_report.txt <host>
```
## Fuzzing
### Dirbusting
```bash
ffuf -u http://<url>/FUZZ -w /usr/share/wordlists/dirb/common.txt -ic
```
```bash
ffuf -w /usr/share/seclists/Discovery/Web-Content/web-extensions.txt:EXT -u http://<url>/indexEXT
```
```bash
ffuf -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-small.txt -u http://<url>/FUZZ -recursion -recursion-depth 1 -e .php -v -ic
```
```bash
gobuster dir -u http://<url> -w /usr/share/wordlists/dirb/common.txt -t 70
```
```shell
dirb https://<url> /usr/share/wordlists/dirb/common.txt
```

### Vhosts discovery
```bash
ffuf -u http://<url> -w /usr/share/dnsrecon/subdomains-top1mil.txt -H "Host: FUZZ.<domain>.com" -fc 301
```
```bash
gobuster vhost -u http://<url> -w <wordlist> --append-domain -t 70
```
```bash
gobuster vhost -u https://<url> -w <wordlist> --append-domain -k -t 70
```

### Dynamic wordlist building
```bash
cewl http://<url> -w cewl-generated-wordlist.txt
```

## Fingerprinting
```bash
curl -I https://inlanefreight.com
```
```bash
nikto -h https://www.<host> -Tuning b
```
```bash
whatweb <url>
```
```bash
pip3 install wafw00f
wafw00f <host>
```

## Crawling

```bash
wget https://raw.githubusercontent.com/gcholette/docs/refs/heads/main/static/scripts/reconspider.py
pip3 install scrapy
python3 ./reconspider.py http://<url>
```

## DNS
```bash
nslookup
whois $targetdomain
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

## Google dorking

| Operator           | Operator Description                                         | Example                                           |
|--------------------|--------------------------------------------------------------|---------------------------------------------------|
| *                  | Represents any character or word.                            | site:socialnetwork.com filetype:pdf user* manual  |
| ..                 | Finds results within a specified numerical range.            | site:ecommerce.com "price" 100..500               |
| " "                | Searches for exact phrases.                                  | "security policy"                                 |
| -                  | Excludes terms from the search results.                      | site:abc.xyz -inurl:removeme                      |
| AND                | Narrows results by requiring all terms to be present.        | site:example.com AND (inurl:admin OR inurl:login) |
| OR                 | Broadens results by including pages with any of the terms.   | "linux" OR "ubuntu" OR "debian"                   |
| NOT                | Excludes results containing the specified term.              | site:bank.com NOT inurl:login                     |
| filetype:          | Searches for files of a particular type.                     | filetype:pdf                                      |
| site:              | Limits results to a specific website or domain.              | site:abc.xyz                                      |
| inurl:             | Finds pages with a specific term in the URL.                 | inurl:login                                       |
| intitle:           | Finds pages with a specific term in the title.               | intitle:"something"                               |
| intext: or inbody: | Searches for a term within the body text of pages.           | intext:"something"                                |
| cache:             | Displays the cached version of a webpage (if available).     | cache:abc.xyz                                     |
| link:              | Finds pages that link to a specific webpage.                 | link:abc.xyz                                      |
| related:           | Finds websites related to a specific webpage.                | related:abc.xyz                                   |
| info:              | Provides a summary of information about a webpage.           | info:abc.xyz                                      |
| define:            | Provides definitions of a word or phrase.                    | define:phishing                                   |
| numrange:          | Searches for numbers within a specific range.                | site:abc.xyz numrange:1000-2000                   |
| allintext:         | Finds pages containing all specified words in the body text. | allintext:admin password reset                    |
| allinurl:          | Finds pages containing all specified words in the URL.       | allinurl:admin panel                              |
| allintitle:        | Finds pages containing all specified words in the title.     | allintitle:confidential report 2023               |

