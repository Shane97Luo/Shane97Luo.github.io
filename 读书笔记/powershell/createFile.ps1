<#
文档说明
======================
这是一个创建空文件的脚本

#>

#列出文件名，匹配带有字符"-"的行，写入tmp.txt
ls -Name  | where { $_ -match "chapter"} > tmp.txt

$tmp=Get-Content "tmp.txt"

$line = 0  
foreach ($tmpLine in $tmp){
    $line = $line+1 
}

New-Item chapter$line-.md #新建文件
Remove-Item tmp.txt
