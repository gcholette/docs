# Authentification flaws

## Direct access
- Check how resources that require authentication behave when unauthenticated
- Modify 302 responses to 200 with burp

## IDOR
- Check if it's possible to do horizontal privilege escalation with something like userid

## Session tokens
- Check if they have sufficent entropy
- Try to decode the session token to see if it's tamperable

## Username enum
- Try to get different error messages on login or password reset forms; "Uknown username/email"
- See if there is a user search functionality by username/email
- Response timing, quick answer for good results and long answer for bad results for instance

```
ffuf -u <url> -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "username=FUZZ&password=something" -fr "Unknown username" -w /opt/useful/seclists/Usernames/xato-net-10-million-usernames.txt
```

## Password enum
- See the [login bruteforcing](../login_bruteforcing.md) section

Filter the wordlists by the website rules (6 to 16 chars, symbols, etc)

## Password reset
- Look for weak reset tokens and brute force them
- Look if it's possible to use the reset feature on arbitrary usernames

Don't forget the session id when necessary
```bash
ffuf -w ./wordlist.txt -u <url>?token=FUZZ -fr "Invalid"
```
## MFA
- Look if there are restrictions to brute force the OTP

Don't forget the session id when necessary
```bash
ffuf -w ./wordlist.txt -u <url> -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "token=FUZZ" -fr "Invalid"
```

## Security questions
- [world-cities.csv](https://raw.githubusercontent.com/datasets/world-cities/refs/heads/main/data/world-cities.csv)
    - `cat world-cities.csv | grep Canada | cut -d ',' -f1 > canada_cities.txt`
