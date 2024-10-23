# Web proxies

## Proxychains

Modify `/etc/proxychains4.conf` and add the proxy's address

```
# ...
# socks4 	127.0.0.1 9050
http 127.0.0.1 8080
```

Run the cli tool with

```
proxychains <something>
proxychains curl x.x.x.x:xxxx
```

Request should be intercepted or logged in the proxy tool (burp/zap/...)
