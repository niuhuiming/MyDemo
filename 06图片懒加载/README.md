## 图片懒加载

#### 写法一

##### 思路

通过监听每个目标距离 document 顶部距离以及 document 滚出视口的距离差来判断是否向 img 写入 src 值。

##### API简介

`Element.getBoundingClientRect()`方法返回一个 `DOMRect`对象，其提供了元素的大小及其相对于 [视口] 的位置。

`window.innerHeight`：浏览器窗口的视口（viewport）高度（以像素为单位），如果有高度滚动条，也包括滚动条高度。

#### 写法二

##### 思路

通过 InterSectionObserver造的对象来观察目标与视口是否有交叉，来决定是否让 img 有 src。