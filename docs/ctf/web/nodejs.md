# Nodejs

## Jail escaping

### require
```javascript
const Module = require('module');
const originalRequire = Module.prototype.require;

Module.prototype.require = function() {
  return originalRequire.apply(this, arguments);
};
```
