#select 命令，只是选择，并没有真正实现"过滤"
#ls -Name  | Select-String -Pattern "-" | sort > index.txt
#ls -Name  | Select-String -Pattern "-"

#列出文件名，匹配带有字符"-"的行，写入index1.txt
ls -Name  | where { $_ -match "-"} > index1.txt

$sku=Get-Content ".\index1.txt"
"#shaneluo97.github.io  " > index1.md 
"  " >> index1.md  
$line = 0  
foreach ($skuLine in $sku){
    $newLine = $skuLine.Insert($skuLine.Length,"](./$skuLine)  ")
    $newLine = $newLine.Insert(0,"$line . [")
    $line = $line+1 
    $newLine >> index1.md
}