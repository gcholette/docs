# Cryptography

## Håstad’s broadcast attack
When *e* RSA cyphers with same exponent (*e*) are known with different modulos.

```python
from Crypto.Util.number import long_to_bytes
import libnum

e = 2
cyphers = [ "37E00FA5F3ABD60...", "10E3E5867FF8DDD..." ]
modulos = [ "AC0FBAE225512C2...", "643FB17D89A5453..." ]

hex2int = lambda hexes: list(map(lambda x: int(x, 16), hexes))
res = libnum.solve_crt(hex2int(cyphers), hex2int(modulos))
val = libnum.nroot(res,e)

print(f"Decipher: {long_to_bytes(val).decode('utf-8')}")
```

## Hash extension attack
- [hash_extender](https://github.com/iagox86/hash_extender)
  - remove `-Werror` from makefile if it doesn't build

When the length of the secret and the cleartext message is known, and it's being encoded like `sha512(secret + message)`

Only those are vulnerable: MD4, MD5, RIPEMD-160, SHA-0, SHA-1, SHA-256, SHA-512, WHIRLPOOL

```bash
./hash_extender --data "known-text" --secret 16 --append "text-to-append" --signature c53bf847cc63b6b903c7d13417809a8a4697b7a582c623707a36105ab86dfd5387c7791b624eb1d1b4f109599eac9622c47610f6f3ecfc97cb0cdd3759f6a2b8 --format sha512
```

```python
import base64

payload = bytes.fromhex("757365726e616d653d67756573742669734c6f67676564496e3d46616c73658000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001782669734c6f67676564496e3d54727565")
signature = b"6dc7a25b308085b6853a62399820b68324c7ee13d451a57d7965a3429f2d17c03e7c82052359e15317582a522df5ae4277e8182f7a150336fa869a6fa4b76a0e"

print(base64.b64encode(payload) + b"." + base64.b64encode(signature))
```
