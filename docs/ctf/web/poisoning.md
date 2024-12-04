# Poisoning

## Log poisoning

If you can LFI the server log files, you may be able to inject malicious code in it. 

Try modifying the `User-Agent` header to poison the logs with something like a webshell.

Apache logs are in `/var/log/apache2/` or `C:\xampp\apache\logs\`

Nginx logs are in `/var/log/nginx/` or `C:\nginx\log\`

Also worth trying on 
 - `/proc/self/environ`
 - `/proc/self/fd/N`
 - `/var/log/sshd.log`
 - `/var/log/mail`
 - `/var/log/vsftpd.log`

## PHP session poisoning

If you can LFI the session file, you maybe be able to inject a webshell in it.

Sessions are stored under `/var/lib/php/sessions/sess_` like `/var/lib/php/sessions/sess_5l5305bt5292sh5jj2hl3minp3` where `5l5305bt5292sh5jj2hl3minp3` is the `PHPSESSID`.

