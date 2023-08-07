<h1 align="center">HTML5&CSS3&less</h1>

<div align="right">最近更新时间：2023-08-07</div>

## 介绍

|        | HTML5    | CSS3           | less         |
|:------:|:--------:|:--------------:|:------------:|
| 语言类型   | 超文本标记语言  | 层叠样式表          | css模块式、预处理语言 |
| 运行平台   | 浏览器      | 浏览器            | \            |
| 集成开发环境 | 推荐VScode | 推荐VScode       | 推荐VScode     |
| 书写位置   | html文件   | css文件、嵌入html文件 | less文件       |
| API文档  | MDN官方文档  | MDN官方文档        | \            |

| CSS嵌入html文件的三种方式  | 语法                                     |
|:-----------------:|:--------------------------------------:|
| html内部（head尾部子元素） | `<style> css代码块 </style>`              |
| html外部            | `<link rel="stylesheet" href="css文件">` |
| html行内            | `<div style="css代码行"></div>`           |

---

## HTML5

### 语法

| 分类   | 标签语法          | 属性语法                 |
|:----:|:-------------:|:--------------------:|
| 单标签  | `<br/>`       | `<br 属性="值"/>`       |
| 双标签  | `<div></div>` | `<div 属性="值"></div>` |
| 注释标签 | `<!--注释-->`   | \                    |

+ 单标签可不用"/"，简写为`<br>`

| 预留字符、转义字符 | 表示符号 |
|:---------:|:----:|
| `&nbsp;`  | 空格   |
| `&lt;`    | <    |
| `&gt;`    | >    |

---

### 骨架

| 骨架                                 | 说明                       |
|:----------------------------------:|:------------------------:|
| `<html></html>`                    | 整个网页，子标签：head、body       |
| `<head></head>`                    | 网页头部，子标签：title、meta、link |
| `<title></title>`                  | 网页标题（SEO优化）              |
| `<meta/>`                          | 编码声明、显示声明、SEO优化          |
| `<link rel="stylesheet" href=""/>` | 引入外部资源，css文件             |
| `<link rel="icon" href=""/>`       | 引入外部资源，网页图标              |
| `<body></body>`                    | 网页主体，子标签：script          |
| `<script></script>`                | 脚本代码                     |

+ 在VScode中用“!”快速生成骨架

+ SEO优化：搜索引擎优化，提高网页在搜索引擎的排行

| SEO优化                                        |
|:--------------------------------------------:|
| `<title>SEO标题</title>`                       |
| `<meta name="description" content="SEO描述"/>` |
| `<meta name="keywords" content="SEO关键词"/>`   |

---

### 文本

| 文本                  | 说明              |
|:-------------------:|:---------------:|
| `<h1></h1>`         | 标题，`h1-h6`共六级   |
| `<p></p>`           | 段落              |
| `<span></span>`     | 行内块             |
| `<strong></strong>` | 加粗，简写`<b></b>`  |
| `<em></em>`         | 倾斜，简写`<i></i>`  |
| `<ims></ims>`       | 下划线，简写`<u></u>` |
| `<del></del>`       | 删除线，简写`<s></s>` |
| `<br/>`             | 换行              |
| `<hr/>`             | 水平线             |
| `<div></div>`       | 块级              |

---

### 多媒体

| 多媒体               | 说明  | 属性                                               |
|:-----------------:|:---:|:------------------------------------------------:|
| `<a></a>`         | 超链接 | 跳转`href=` 新建页`target=`                           |
| `<img/>`          | 图片  | 路径`src=` 找不到`alt=`                               |
| `<audio></audio>` | 音频  | 路径`src=` 控制`control` <br/>循环`loop` 自动`autoplay`  |
| `<video></video>` | 视频  | 路径`src=` 控制`control` <br/>静音`muted` 自动`autoplay` |

---

### 列表

| 列表          | 嵌套                       | 说明   |
|:-----------:|:------------------------:|:----:|
| `<ol></ol>` | `<li>每行</li>`            | 无序列表 |
| `<ul></ul>` | `<li>每行</li>`            | 有序列表 |
| `<dl></dl>` | `<dt>分类</dt><dd>每行</dd>` | 定义列表 |

---

### 表格

```html
<table>
    <tr>
        <th>表头每格</th>
        <th>表头每格</th>
    </tr>
    <tr>
        <td>内容每格</td>
        <td>内容每格</td>
    </tr>
    <tr>
        <td>内容每格</td>
        <td>内容每格</td>
    </tr>
</table>
```

| th、td属性       | 说明           |
|:-------------:|:------------:|
| `colspan="n"` | 合并n列，被合并的不用写 |
| `rowspan="n"` | 合并n行，被合并的不用写 |

| 告诉浏览器结构           | 说明  |
|:-----------------:|:---:|
| `<thead></thead>` | 表头  |
| `<tbody></tbody>` | 表体  |
| `<tfoot></tfoot>` | 表脚  |

+ 包裹对应的`<tr></tr>`即可

---

### 表单

| 表单                         | 说明        | 属性                                      |
|:--------------------------:|:---------:|:---------------------------------------:|
| `<form></form>`            | 表单按区控件    | 提交方式`method=`                           |
| `<label></label>`          | 提示说明      | 关联`for="id"`                            |
| `<select></select>`        | 下拉菜单      | \                                       |
| `<option></option>`        | 下拉每项内容    | 选上`selected`<br/> 键`name=` 值`value=`    |
| `<textarea></textarea>`    | 文本域       | 键`name=` 值`value=`                      |
| `<button></button>`        | 按钮        | 禁用`disabled`<br/> 键`name=` 值`value=`    |
| `<input type="text"/>`     | 单行文本框     | 提示`placeholder=`<br/>键`name=` 值`value=` |
| `<input type="password"/>` | 密码框       | 键`name=` 值`value=`                      |
| `<input type="radio"/>`    | 单选框（圆框点选） | 选上`checked`<br/>键`name=` 值`value=`      |
| `<input type="checkbox"/>` | 多选框（方框勾选） | 选上`checked`<br/>键`name=` 值`value=`      |
| `<input type="file"/>`     | 上传文件      | 多个`multiple`<br/>获取文件`files=`           |

+ button默认属性`type=“submit”`，有默认事件提交

+ label关联属性的作用是扩大可交互区域

---

## CSS3

### 语法

```css
css选择器{
    属性:值;
    属性:值;
}
```

+ 相较于css用";"分隔，js对象和python字典是","分隔

+ 相较于css的值不需要引号，js对象和python字典的字符串值需要引号

---

### css选择器

| 选择器    | 类别  | 语法               | 结果      |
|:------:|:---:|:----------------:|:-------:|
| 标签选择器  | 基础  | `标签名`            | 标签      |
| 类名选择器  | 基础  | `.类名`            | 标签      |
| id选择器  | 基础  | `#id名`           | 标签      |
| 通配符选择器 | 基础  | `*`              | 标签      |
| 属性选择器  | 基础  | `[属性名]`          | 标签      |
| 属性值选择器 | 基础  | `[属性名=属性值]`      | 标签      |
| 后代选择器  | 复合  | `父基础选择器 后代基础选择器` | 标签      |
| 子代选择器  | 复合  | `父基础选择器>子代基础选择器` | 标签      |
| 并集选择器  | 复合  | `基础选择择器1,基础选择器2` | 标签      |
| 交集选择器  | 复合  | `基础选择器1基础选择器2`   | 标签      |
| 伪类选择器  | 特殊  | `基础选择器:伪类`       | 标签的特殊状态 |
| 伪元素选择器 | 特殊  | `基础选择器::伪元素`     | 标签的部分   |

| 伪类                         | 状态            |
|:--------------------------:|:-------------:|
| `link`                     | 访问前           |
| `visited`                  | 访问后           |
| `hover`                    | 鼠标悬停          |
| `active`                   | 鼠标点击时         |
| `checked/loop/disabled...` | 选择对应可省略值的标签属性 |
| `first-child`              | 选中第一个子元素节点    |
| `last-child`               | 选中最后一个子元素节点   |
| `nth-child(4)`             | 选中第4个子元素节点    |
| `nth-child(5n)`            | 选中5倍的子元素节点    |
| `nth-child(2n+1)`          | 选中奇数的子元素节点    |
| `nth-child(n+5)`           | 选中第5个及后的子元素节点 |
| `nth-child(5-n)`           | 选中前5个的子元素节点   |

+ n从0开始，子元素节点从1开始

| 伪元素           | 说明            |
|:-------------:|:-------------:|
| `after`       | 双标签前的部分       |
| `before`      | 双标签后的部分       |
| `placeholder` | 选中input提示文字部分 |

+ 伪元素内容属性：`content`

| 特性  | 说明           |
|:---:|:------------:|
| 继承性 | 后代会继承父级css属性 |
| 层叠性 | 会覆盖相同的css属性  |

+ 覆盖优先级：`通配符 < 标签 < 类 < id < 行内 < !important`

+ `!important`：写在属性值中的最后面，空格隔开，慎用

---

### 文本

| 说明     | 属性                | 值                                                             |
|:------:|:-----------------:|:-------------------------------------------------------------:|
| 文字倾斜   | `font-style`      | 倾斜`nomal` 倾斜`italic`                                          |
| 文字粗细   | `font-weight`     | 粗细`800`                                                       |
| 文字大小   | `font-size`       | 大小`16px`                                                      |
| 文字行高   | `line-height`     | 大小`20px`                                                      |
| 文字字体   | `font-family`     | 字体`Arial`                                                     |
| 文字复合属性 | `font`            | 有序组合`italic 800 16/20px Arial`                                |
| 段落缩进   | `text-indent`     | 字号`2em` 大小`20px`                                              |
| 段落水平排列 | `text-align`      | 靠左`left` 居中`center` 靠右`right`                                 |
| 修饰线    | `text-decoration` | 没有`none` 下划线`underline` <br/>删除线`line-thorough` 上划线`overline` |
| 文字颜色   | `color`           | 颜色`#ffffff`                                                   |

+ 字体族分类：无衬线字体(多用)、衬线字体

+ 行高妙用：文字在行内居中

+ 行高测量技巧：此行字顶到下行字顶的距离

| 颜色表示法   | 语法                      |
|:-------:|:-----------------------:|
| rgb表示法  | `rgb(255,255,255)`      |
| rgba表示法 | `rgba(255,255,255,0.9)` |
| 十六进制表示法 | `#fffff`或`#fff`         |

---

### 背景

| 说明      | 属性                      | 值                                                      |
|:-------:|:-----------------------:|:------------------------------------------------------:|
| 背景色     | `background-color`      | 颜色`#ffffff`                                            |
| 背景图     | `background-img`        | 路径`url(路径)`                                            |
| 背景图平铺方式 | `background-repeat`     | 不平铺`no-repeat` 平铺`repeat`水平平铺`repeat-x` 垂直平铺`repeat-y` |
| 背景图位置   | `background-position`   | 位置`center center`                                      |
| 背景图等比缩放 | `background-size`       | 覆盖`cover` 包含`contain` 百分比`100%`                        |
| 背景图固定   | `background-attachment` | 固定`fixed`                                              |
| 背景复合属性  | `background`            | 无序组合`url("路径") no-repeat center center 100% fixed`     |
| 渐变层     | `background-image`      | 直线渐变`linear-gradient()`<br/>圆形渐变`radial-gradient()`    |

+ `linear-gradient(to 方向,颜色 占比,颜色 占比)`

+ `radial-gradient(半径 at 圆心,颜色 占比,颜色 占比)`

+ 背景组成从下到上：背景色、背景图、渐变层

| 位置表示 | 语法                         |
|:----:|:--------------------------:|
| 水平   | 左`left` 中`center` 右`right` |
| 垂直   | 上`top` 中`center` 底`bottom` |

---

### 盒子模式

| 说明   | 属性               | 值                                                     |
|:----:|:----------------:|:-----------------------------------------------------:|
| 内容宽  | `width`          | 大小`100px`                                             |
| 内容高  | `height`         | 大小`100px`                                             |
| 显示模式 | `display`        | 不显示`none` 块级`block` <br/>行内块`inline-block` 行内`inline` |
| 行内对齐 | `vertical-align` | 基线`base` 顶部`top` 底部`bottom` 中部`middle`                |
| 内边距  | `padding`        | 大小`20px`                                              |
| 边框线  | `border`         | 组合`2px solid #000000`                                 |
| 外边距  | `margin`         | 大小`20px`                                              |
| 内减模式 | `box-sizing`     | 开启`border-box`                                        |
| 元素溢出 | `overflow`       | 隐藏`hidden` 滚动`scroll` 自动`auto`                        |
| 圆角   | `border-radius`  | 大小`20px`                                              |
| 阴影   | `box-shadow`     | 组合`x偏移 y偏移 模糊 扩散 颜色 inner`                            |

+ **合并现象**：两盒子接壤，以大的为准

+ **塌陷现象**：给子盒子加外边距，会作用于父盒子上，解决方法：1.给父盒子加内边距。2.父盒子设置`overflow:hidden`，让父盒子意识到自己的边界。3父盒子设置边框线，让盒子意识到自己的边界。

+ 支持某方向的内边距、外边距、边框线，格式`padding-left:20px;`

+ 盒子宽 = 外边距\*2 + 边框线\*2 + 内边距\*2 + 内容宽

+ 内减模式的内容宽 = 边框线\*2 + 内边距\*2 + 原内容宽

| 大小个数 | 边距组合简写            | 圆角组合简写                |
|:----:|:-----------------:|:---------------------:|
| 1    | `(上下左右)`          | `(左上右上右下左下)`          |
| 4    | `(上) (右) (下) (左)` | `(左上) (右上) (右下) (左下)` |
| 2    | `(上下) (右左)`       | `(左上右下) (右上左下)`       |
| 3    | `(上) (右左) (下)`    | `(左上) (右上左下) (右下)`    |

---

### 浮动排列

| 说明  | 属性      | 值                |
|:---:|:-------:|:----------------:|
| 浮动  | `float` | 左`left` 右`right` |

+ **标准流**：又叫文档流，网页默认排布规则

+ **浮动作用**：脱标行内块

+ **浮动影响**：子浮动标签不能撑开父标签，解决方法：1.新增子标签添加`clear:both;`。2.单伪元素添加`clear:both;`。3.双伪元素添加`clear:both;`。4.父盒子设置`overflow:hidden`。

---

### flex排列

| 说明        | 属性                | 值                                                                                                                          |
|:---------:|:-----------------:|:--------------------------------------------------------------------------------------------------------------------------:|
| 显示模式（父）   | `display`         | 排列`flex`                                                                                                                   |
| 主轴排列（父）   | `justify-content` | 开头`flex-start` <br/>尾部`flex-end` <br/>居中`center` <br/>空白中间`space-between` <br/>空白两侧`space-around` <br/>空白均匀`space-evently` |
| 侧轴拉伸（父）   | `align-items`     | 拉伸`strech`                                                                                                                 |
| 侧轴拉伸（子）   | `align-self`      | 拉伸`strech` 居中`center` <br/>开头`flex-start` 尾部`flex-end`                                                                     |
| 改轴（父）     | `flex-direction`  | 水平`row` 垂直`column `<br/>水平颠倒`row-reverse` <br/>垂直颠倒`column-reverse`                                                        |
| 换行（父）     | `flex-wrap`       | 换行`wrap` 不换行`nowrap`                                                                                                       |
| 换行侧轴排列（父） | `align-content`   | 开头`flex-start` <br/>尾部`flex-end` <br/>居中`center` <br/>空白中间`space-between` <br/>空白两侧`space-around` <br/>空白均匀`space-evently` |

---

### 定位

| 说明    | 属性         | 值                                   |
|:-----:|:----------:|:-----------------------------------:|
| 定位    | `position` | 相关`relative` 绝对`absolute` 固定`fixed` |
| 距左    | `left`     | 大小`100px`                           |
| 距上    | `top`      | 大小`100px`                           |
| 堆叠优先级 | `z-index`  | 值`2`                                |

+ z-index默认值0，越大优先级越高，用于固定定位

+ **定位作用**：脱标行内块

+ 用法：**子绝父相**，父相会改变后代的offsetParent，left对应offsetLeft，right对应offsetRight

---

### 转换

| 说明      | 属性                | 值                 |
|:-------:|:-----------------:|:-----------------:|
| 转换      | `transform`       | 见转换类型表            |
| 视距      | `perspective`     | 大小`1000px`        |
| 立体呈现（父） | `transform-style` | 三维呈现`preserve-3d` |

+ 视距取值参考范围`800-1200px`

| 转换类型 | 类别  | 值                                                                                               |
|:----:|:---:|:-----------------------------------------------------------------------------------------------:|
| 位移   | 平面  | `translate(50%,50%)`<br/>或`translateX(50%)`<br/>或`translateY(50%)`                              |
| 旋转   | 平面  | `rotate(5deg)`                                                                                  |
| 缩放   | 平面  | `scale(2)`                                                                                      |
| 倾斜   | 平面  | `skew(5deg)`                                                                                    |
| 位移   | 空间  | `translate3d(50%,50%,50%)`<br/>或`translateX(50%)`<br/>或`translateY(50%)`<br/>或`translateZ(50%)` |
| 旋转   | 空间  | `rotate3d(5deg,5deg,5deg)`<br/>`rotateX(5deg)`<br/>`rotateY(5deg)`<br/>`rotateZ(5deg)`          |
| 缩放   | 空间  | `scale3d(5deg,5deg,5deg)`<br/>`scaleX(5deg)`<br/>`scaleY(5deg)`<br/>`scaleZ(5deg)`              |

+ **左手法则**：拇指x轴正方向，四指y轴正方向，掌心z轴正方向

+ 位移百分比是自己宽度的百分比，可用在**固定定位居中**，如下
  
  ```css
  css选择器{
      display:fixed;
      left:50%;
      transform:translateX(50%);
  }
  ```

---

### 动画

| 说明     | 属性                          | 值                               |
|:------:|:---------------------------:|:-------------------------------:|
| 使用动画   | `animation-name`            | 名称`动画名`                         |
| 动画时长   | `animation-duration`        | 时长`2s`                          |
| 动画延迟   | `animation-delay`           | 延迟`2s`                          |
| 动画结束状态 | `animation-fill-mode`       | 开头`backwards`<br/> 最后`forwards` |
| 动画播放曲线 | `animation-timing-function` | 离散点`step(3)` 直线`linear`         |
| 动画重复次数 | `animation-iteration-count` | 次数`4` 无限`infinite`              |
| 动画往返播放 | `animation-direction`       | 往返`alternate`                   |
| 动画暂停   | `animation-play-state`      | 暂停`pause`                       |
| 动画复合   | `animation`                 | 无序组合                            |

+ 动画定义
  
  ```css
  @keyframes 动画名{
      from{CSS属性}    //开头一样可省略
      to{CSS属性}
  }
  
  @keyframes 动画名{
      0%{CSS属性}
      50%{CSS属性}
      100%{CSS属性}
  }
  ```

---

### 其他

| 说明      | 属性           | 值                               |
|:-------:|:------------:|:-------------------------------:|
| 过度      | `transition` | 目标大小`all 2s`                    |
| 透明度     | `opacity`    | 取值`0.99`                        |
| 悬浮光标    | `cursor`     | 手型`pointer` 工型`text` 移动型`moved` |
| 无序列表点样式 | `list-style` | 清空`none`                        |
| 输入框边框   | `outline`    | 清空`none`                        |

---

### 相对单位rem

**概念**：1rem=1html根字号大小，根字号一般设置为设备宽度的10%，rem又叫做**十分比单位**

**设置html根字号大小**

```css
@media(width:375px){
    html{
        font-size:37.5;
    }
}
```

+ 根字号设置可以引入第三方文件`flexible.js`
+ 相对的设备宽度都是逻辑宽度

---

### 相对单位vw、vh

**概念**：1vw=设备宽度1%，1vh=设备高度1%，vw、vh又叫做**百分比单位**

**注意**：混用vw和vh会导致盒子变形

**BookStrap设备宽度分级（参考）**：`576px 768px 992px 1200px 1400px`

---

### 媒体查询

```css
@media 关键词 媒体类型 (视口特性){
    css选择器{
        属性:值;
    }
}
```

+ **关键词**：与`and` 仅`only` 非`not`

+ **媒体类型**：屏幕`screen `打印预览`print `阅读模式`speech` 不区分`all`

| 视口特性                    | 说明     |
|:-----------------------:|:------:|
| `width:400px`           | =400px |
| `max-width:400px`       | ≤400px |
| `min-width:400px`       | ≥400px |
| `orientation:portrait`  | 横屏     |
| `orientation:landscape` | 竖屏     |

+ 利用层叠性设置取值范围

---

### css实现

| 实现        | 说明                                  |
|:---------:|:-----------------------------------:|
| css精灵     | 小图集成大图，用background-position控制显示哪张小图 |
| 字体图标      | 如阿里巴巴iconfont矢量图标库                  |
| 轮播图       | 分类：左右过度（父盒子overflow:hidden）、图片闪切    |
| 走马灯       | 无缝衔接，需在尾部，补充窗口长的头部                  |
| 逐帧动画      | 基于css精灵，动画播放曲线设置为steps()            |
| PxCooK软件  | 像素测量软件                              |
| 图标SEO优化   | 跳转首页、写入带隐藏的h1标签                     |
| 清除默认样式    | 项目开始前一般清除所有默认样式                     |
| BookStrap | 第三方组件库                              |

---

## less

| 功能               | 语法、说明                |
|:----------------:|:--------------------:|
| 注释               | `//单行注释`或` /*多行注释*/` |
| 变量定义             | `@变量名:值;`            |
| 变量使用             | `@变量名`               |
| 导入其他less文件       | `@import url(路径)`    |
| 导出css文件到（必须在第一行） | `//out:路径`           |
| 禁止导出（必须在第一行）     | `//out:false`        |
| 环境对象指针           | `&`                  |
| 直接嵌套是后代选择器       | `css选择器{css选择器{}}`   |

---
