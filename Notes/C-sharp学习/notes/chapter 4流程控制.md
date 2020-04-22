# 流程控制

[源代码下载](http://www.wrox.com/go/beginningvisualc#2015programming)

## 4.1 布尔逻辑

运算符|类别|示例表达式|结果
-:|:-:|:-:|:-
==|二元|var1=var2==var3;|如果var2等于var3,var1的值就是true，否则为false
!= |二元|var1=var2!=var3;|如果var2不等于var3,var1的值就是true，否则为false
<  |二元|var1=var2< var3;|如果var2小于var3,var1的值就是true，否则为false
>  |二元|var1=var2> var3;|如果var2大于var3,var1的值就是true，否则为false
<= |二元|var1=var2<=var3;|如果var2小于等于var3,var1的值就是true，否则为false
>= |二元|var1=var2>=var3;|如果var2大于等于var3,var1的值就是true，否则为false

## 4.2 分支语句

C#的3种分支技术:三元运算符,if语句,switch语句。

### 1.三元运算符

 test ? resultIfTrue : resultIfFalse

```c#
string resultString = (myInteger<10) ? "Less than 10" :
                "Greater than or equal to 10";
 ```

### 2.if语句

　if (var1 == 1)
　　{
　　　 // Do something.
　　}
　　else if (var1 == 2)
　　{
　　 　// Do something else.
　　}

### 3.switch语句
