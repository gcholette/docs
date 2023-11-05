# Nodejs

## Prototype Pollution
- [Hacktricks PP](https://book.hacktricks.xyz/pentesting-web/deserialization/nodejs-proto-prototype-pollution/prototype-pollution-to-rce)
- [CVE-2019-7609 Kibana article](https://research.securitum.com/prototype-pollution-rce-kibana-cve-2019-7609/)

## Jail escaping

### require
```javascript
const Module = require('module');
const originalRequire = Module.prototype.require;

Module.prototype.require = function() {
  return originalRequire.apply(this, arguments);
};
```
