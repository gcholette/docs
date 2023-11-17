# Misc

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
