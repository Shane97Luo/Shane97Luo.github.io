# code

## 中文字符处理

Qt中的中文显示，经常会出现乱码，但在UI设计界面上添加的中文是不会出现乱码的，如果你刚使用qt，那么你肯定会碰到这个问题。
网上搜索一下，找到的都是这种：

### v-4.8及其以下

```c++
#include <QTextCodec>
QTextCodec::setCodecForTr(QTextCodec::codecForName("UTF8"));
QTextCodec::setCodecForLocale(QTextCodec::codecForName("UTF8"));
QTextCodec::setCodecForCStrings(QTextCodec::codecForName("UTF8"));
```

### v-5.0

Qt5中，一些函数已经被取消了，而且网上很多都是不推荐这种写法。所以当时找到的是自行转换：

1. 方法1

    ```c++
    QTextCodec * BianMa = QTextCodec::codecForName("GBK");
    QMessageBox::information(this, "提示", BianMa->toUnicode("中文显示!"));
    ```

2. 方法2

其实也可以通过QString定义的静态函数，先转换成Unicode类型：
QString::fromLocal8Bit("提示")
不过在Qt5中，提供了一个专门的处理宏，来支持中文常量，那就是QStringLiteral，但它只能处理常量。

```c++
QMessageBox::information(this, QString::fromLocal8Bit("提示"), 
            QStringLiteral("中文显示"));
const char* info = "中文显示";
//不支持
QString strInfo = QStringLiteral(info);
//支持
QString strInfo = QString::fromLocal8Bit(info);
```

对于中文常量，使用QStringLiteral即可解决，对于字符串变量，使用QString自带函数也可以轻松解决。

## 消息框

```c++
void MainWindow::on_action_O_triggered()
{
    QMessageBox::information(this,"消息","选择了打开菜单栏");
}

void MainWindow::on_action_S_triggered()
{
    QMessageBox::information(this,"消息","选择了保存菜单栏");
}

void MainWindow::on_action_E_triggered()
{
//    QMessageBox::information(this,"警告","您确定要退出程式");
    QMessageBox::warning(this,tr("退出"),tr("你确定要退出本程序"),
                        tr("是"),tr("否"),tr("放弃"));
    close();
}

void MainWindow::on_action_3_triggered()
{
    QColor m_color = QColorDialog::getColor(Qt::blue,this,tr("颜色对话框"));
    ui->statusBar->showMessage(tr("你选择的是：红色：%1，绿色%2，蓝色%3").
    arg(m_color.red()).arg(m_color.green()).arg(m_color.blue()));
}

void MainWindow::on_action_4_triggered()
{
    bool ok=true;
    QFont font=QFontDialog::getFont(&ok,this->font());
    ui->statusBar->showMessage(tr("你选择的字体是：%1").arg(font.family()));
}
```
