# 布局细节

The QSizePolicy class is a layout attribute describing horizontal and vertical resizing policy.
类QSizePolicy 是描述水平和垂直修改大小策略的一种而已属性

|属性|功能|
:-:|:-:
QSizePolicy::SizeType|The per-dimension sizing types used when constructing a QSizePolicy are:
QSizePolicy::Fixed | - the QWidget::sizeHint() is the only acceptable alternative, so the widget can never grow or shrink (e.g. the vertical direction of a push button).缺省大小(sizehint)是唯一可以接收的改变，因此定义这种类型部件不会发生任何改变。
QSizePolicy::Minimum | - the sizeHint() is minimal, and sufficient. The widget can be expanded, but there is no advantage to it being larger (e.g. the horizontal direction of a push button).缺省大小定义的部件最小大小，并且是充分的。部件允许扩展，但是并不倾向扩展。
QSizePolicy::Maximum | - the sizeHint() is a maximum. The widget can be shrunk any amount without detriment if other widgets need the space (e.g. a separator line). 缺省大小定义的部件是最大的，假如其它部件需要空间并且不会破坏这个部件，那么该部件允许缩小。
QSizePolicy::Preferred |- the sizeHint() is best, but the widget can be shrunk and still be useful. The widget can be expanded, but there is no advantage to it being larger than sizeHint() (the default QWidget policy).缺省大小是最佳效果，部件允许扩展或缩小，但并倾向于扩展（缺省策略）。
QSizePolicy::Expanding | - the sizeHint() is a sensible size, but the widget can be shrunk and still be useful. The widget can make use of extra space, so it should get as much space as possible (e.g. the horizontal direction of a slider).缺省大小是合理的大小，但部件允许缩小并且可用。这个部件可以利用额外的空间，因此它将会得到尽可能多的空间。
QSizePolicy::MinimumExpanding | - the sizeHint() is minimal, and sufficient. The widget can make use of extra space, so it should get as much space as possible (e.g. the horizontal direction of a slider).缺省大小是部件最小大小，并且是足够的。这个部件允许使用额外空间，因此它将会得到尽可能多的空间。
QSizePolicy::Ignored | - the sizeHint() is ignored. The widget will get as much space as possible.缺省大小将会被忽略，这个部件会得到尽可能多的空间。
