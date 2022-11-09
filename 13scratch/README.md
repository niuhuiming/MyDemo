# 13scratch（刮刮乐）

设置`canvas`的`globalCompositeOperation`属性为`destination-out`，表示重叠部分为透明，实现刮刮乐的效果。

`canvas`的`getImageData`方法返回`ImageData`对象，该对象拷贝了画布指定矩形的像素数据。在此项目中使用该方法判断擦除面积，当擦除面积大于50%时，清除剩余画布元素。
