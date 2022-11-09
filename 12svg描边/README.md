# 12svg描边

#### 文字描边

figma是一个免费的基于浏览器的UI设计工具。https://www.figma.com/

设计文字后右击复制为SVG，在CSS中设置`stroke-dasharray`和`stroke-dashoffset`两个属性进行文字描边，设置fill属性设置文字填充

#### iconfont描边

找到要使用的iconfont图标，注意给每个path标签添加`stroke="white" stroke-width="2"`属性，其他操作和文字描边相同