# Cryptography

## Håstad’s Broadcast Attack
RSA, multiple cyphers with same *e* and different modulos

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
