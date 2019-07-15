# QT控件之Qtable Widget

## 表格基础属性

1. 新建表格

```c++
//方法1：
QTableWidget *tableWidget = new QTableWidget(10,5); 
// 构造了一个QTableWidget的对象，并且设置为10行，5列 

//方法2：
QTableWidget *tableWidget = new QTableWidget; 
tableWidget->setRowCount(10); //设置行数为10 
tableWidget->setColumnCount(5); //设置列数为5 
```

2. 设置表头

```c++
QStringList header; 
header<<"Month"<<"Description"; 
tableWidget->setHorizontalHeaderLabels(header); 
```

3. 添加表格内容

```c++
    //获取当前表格行号
    int RowCont = ui->tableWidget->rowCount();
    //在某行新增一行
    ui->tableWidget->insertRow(RowCont);//增加一行
    
    //添加某项
    tableItem = new QTableWidgetItem(item);
    ui->tableWidget->setItem(i,j, tableItem);

    tableWidget->setItem(0,0,new QTableWidgetItem("Jan")); 
    tableWidget->show(); 
```

## 表格编辑属性

在默认情况下，表格里的字符是可以更改的，比如双击一个单元格，就可以修改原来的内容，如果想禁止用户的这种操作，让这个表格对用户只读，也是可以进行设置的。

原型：
```c++
tableWidget->setEditTriggers(QAbstractItemView::EditTrigger);
```
QAbstractItemView.EditTrigger参数有多个，QAbstractItemView.NoEditTriggers是QAbstractItemView.EditTrigger枚举中的一个。

|参数|XX|XX|
|:-|:-:|:-|
|QAbstractItemView.NoEditTriggers   |0| 不能对表格内容进行修改| 
|QAbstractItemView.CurrentChanged   |1| 任何时候都能对单元格修改|
|QAbstractItemView.DoubleClicked    |2| 双击单元格|
|QAbstractItemView.SelectedClicked  |4| 单击已选中的内容 |
|QAbstractItemView.CurrentChanged   |8| 任何时候都能对单元格修改|
|QAbstractItemView.AnyKeyPressed    |16|    双击单元格|
|QAbstractItemView.AllEditTriggers  |31|    双击单元格|

[详情表格参考](https://www.cnblogs.com/retry/p/9329397.html)


    ui->tableWidget->setColumnCount(3);//只设置列数，行数动态中增加
    ui->tableWidget->setHorizontalHeaderLabels(QStringList()<<"article"<<"author"<<"profile");
    ui->tableWidget->setSelectionBehavior(QAbstractItemView::SelectRows);//整行选中的方式
    ui->tableWidget->setEditTriggers(QAbstractItemView::NoEditTriggers);//禁止修改
    ui->tableWidget->setSelectionMode(QAbstractItemView::SingleSelection);//可以选中单个

    ui->tableWidget->setColumnCount(6);//只设置列数，行数动态中增加

//    ui->tableWidget->setItem(1,0,new QTableWidgetItem("PaperName"));
//    tableItem = new QTableWidgetItem("hello");
//    ui->tableWidget->setItem(1,0, tableItem);
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::addItem(int i,int j,QString item)
{
    RowCont=ui->tableWidget->rowCount();
    ui->tableWidget->insertRow(RowCont);//增加一行

    tableItem = new QTableWidgetItem(item);
    ui->tableWidget->setItem(i,j, tableItem);
}