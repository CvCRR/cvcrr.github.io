<h1 align="center">AJAX&nodejs&webpack&Git</h1>

## 介绍

| 前端框架基础  | 概念                    |
|:-------:|:---------------------:|
| AJAX    | 实现浏览器与服务器的通信          |
| nodejs  | js运行平台                |
| webpack | 项目压缩、整合、打包、转译等前端工程化框架 |
| Git     | 版本管理系统、多人合作开发系统       |

---

## AJAX

### HTTP报文

<table style="text-align:center">
    <tr>
        <th>HTTP请求报文组成</th><th>重要值</th><th>含义</th>
    </tr>
    <tr>
        <td rowspan="3">请求行</td><td>method</td><td>请求方法</td>
    </tr>
    <tr>
        <td>url</td><td>统一资源定位符</td>
    </tr>
    <tr>
        <td>version</td><td>版本</td>
    </tr>
    <tr>
        <td rowspan="4">请求头</td><td>Content-Type</td><td>表明附带的请求体格式</td>
    </tr>
    <tr>
        <td>Headers</td><td>请求头参数</td>
    </tr>
    <tr>
        <td>Cookie</td><td>用于身份验证</td>
    </tr>
    <tr>
        <td>User-Agent</td><td>表明请求端信息</td>
    </tr>
    <tr>
        <td>空行</td><td>\</td><td>\</td>
    </tr>
    <tr>
        <td>请求体</td><td>data</td><td>请求体内容</td>
    </tr>
</table>

<table style="text-align:center">
    <tr>
        <th>HTTP响应报文组成</th><th>重要值</th><th>含义</th>
    </tr>
    <tr>
        <td rowspan="3">状态行</td><td>version</td><td>版本</td>
    </tr>
    <tr>
        <td>status</td><td>状态码</td>
    </tr>
    <tr>
        <td>reason</td><td>状态描述</td>
    </tr>
    <tr>
        <td rowspan="2">响应头</td><td>Content-Type</td><td>表明附带的响应体格式</td>
    </tr>
    <tr>
        <td>Access-Control-Allow-Origin</td><td>允许跨域访问的对象</td>
    </tr>
    <tr>
        <td>空行</td><td>\</td><td>\</td>
    </tr>
    <tr>
        <td>响应体</td><td>data</td><td>响应体内容</td>
    </tr>
</table>

| url组成               |
|:-------------------:|
| `协议://域名/资源路径`      |
| `协议://域名/资源路径?请求参数` |
| `协议://域名/资源路径#哈希地址` |

| 请求方法   | 含义  |
|:------:|:---:|
| get    | 获取  |
| post   | 提交  |
| delete | 删除  |
| put    | 修改  |

| 状态码 | 含义    |
|:---:|:-----:|
| 1XX | 通知信息  |
| 2XX | 成功    |
| 3XX | 重定向   |
| 4XX | 客户端出错 |
| 5XX | 服务端出错 |

| 请求体、响应体常见格式         | 说明                 |
|:-------------------:|:------------------:|
| text/html           | html文件             |
| text/plain          | 纯文本                |
| text/css            | css文件              |
| text/javascript     | js文件               |
| multipart/form-data | 图片、音频等转的FormData格式 |
| application/json    | json文件             |
| application/xml     | xml文件              |

**formdata文件制作**

```javascript
const fd = new FormData()
fd.append("键名",“图片对象”)
fd.append("键名",“其他信息”)
```

---

### XMLHttpRequest类

**概念**：内置js类，实现http报文发送和接收，实际按照后端写的AJAX文档进行请求。

```javascript
let xhr = new XMLHttpRequest()
xhr.open('get','www.123.com')    //设置请求行
xhr.setRequestHeader('Content-Type','text/plain')    //设置请求头
xhr.send('请求体内容')    //设置请求体内容并发送
xhr.addEventListener('loaded',()=>{
    if(199 < xhr.status < 300){    //状态码判断
        console.log(xhr.responseText)    //获取响应体格式
        console.log(xhr.response)    //响应体内容
    }else{
        console.log(xhr.status)
        console.log(xhr.response)
    }
})
```

### Promise类

**概念**：内置js类，异步任务管理工具

```javascript
let promise = new Promise((resolve,reject)=>{ //初始状态为padding
    let xhr = new XMLHttpRequest()
    xhr.open('get','www.123.com')
    xhr.setRequestHeader('Content-Type','text/plain')
    xhr.send('请求体内容')
    xhr.addEventListener('loaded',()=>{
        if(199 < xhr.status < 300){
            //改变状态为fulfilled，参数写入promiseResult
            resolve(xhr.response)
        }else{
            //改变状态为rejected，参数写入promiseResult
            reject(new Error(xhr.response))
        }
    })
})
promise.then((result)=>{ //状态fulfilled才执行，result为promiseResult
    console.log(result)
})
promise.catch((error)=>{ //状态rejected才执行，error为promiseResult
    console.dir(error) 
})
```

+ `promise.promiseState`的**三种状态**：`padding、fulfilled、rejected`

+ `promise.promiseResult`存传入函数的参数，并传入`then/catch`函数。

---

### axios第三方库

**概念**：第三方js库，封装了XMLhttpRequest类和Promise类，提供使用方便的接口。

**库安装**

```git
npm i axios
```

**用法**

```javascript
const axios = require（"axios"）
axios({
    url:'www.123.com',
    params:{    //查询参数
        属性:值,
        属性:值,
    },
    method:'post',
    headers:请求头参数,
    data:请求体内容,
}).then((result)=>{
    请求成功执行内容
}).catch((error)=>{
    请求失败执行内容
}
```

+ 查询参数自动转换写入url

+ 默认method为get时，可不写

+ 自动根据请求体格式在请求头写入Content-type

**简写模式**

```javascript
axios.get('url',{
    params:{
        属性:值,
        属性:值,
    }
})

axios.post('url',请求体内容)
```

**基地址**

```javascript
//默认axios函数的基地址
axios.defaults.baseURL = 'URL'
//新建axios函数，专门的基地址
const axios1 = axios.create({baseURL:'URL'})    
```

**请求拦截器**

```javascript
axios.interceptors.request.use(
    config => { //config是axios函数参数
        公共请求配置 //如配置公共请求头config.headers=
        return config
    },error => {
        return Promise.reject(error)
    }
)
```

**响应拦截器**

```javascript
axios.interceptors.response.use(
    response => { //response是响应体内容
        公共响应处理 //如配置公共响应处理response=JSON.parse(response)
        return response
    },error => {
        return Promise.reject(error)
    }
)
```

---

### 回调函数地狱

**概念**：回调函数嵌套回调函数，一直嵌套下去，造成问题：耦合性严重，外部无法捕获内部异常。解决方法：promise链式调用，async和await关键字。

**promise链式调用**

```javascript
axios.get(www.123.com).then(result=>{
    return axios.get(www.234.com)
}).then(result=>{
    return axios.get(www.345.com)
}).then(result=>{
    return axios.get(www.456.com)
}).catch(error=>{
    console.dir(error) //捕获即为对应失败层
})
```

+ 假设最外层失败了，后面的then全部不会执行，所以捕获的就是最外层的失败。

+ 假设中间某层失败了，后面的then全部不会执行，所以捕获的就是中间某层的失败。

**async和await关键字**

```javascript
async function fun(){
    let promise = await axios.get(www.123.com)
    let promise2 = promise.then(result=>{
        return await axios.get(www.234.com)
    })
    let promise3 = promise2.then(result=>{
        return await axios.get(www.345.com)
    })
    let promise4 = promise3.then(result=>{
        return await axios.get(www.456.com)
    }).catch(error=>{
        console.dir(error) //捕获即为对应失败层
    })
}
fun()
```

---

### JS执行机制

| 任务分类      | 概念                        |
|:---------:|:-------------------------:|
| 同步任务与异步任务 | 耗时等待的都是异步任务               |
| 微任务与宏任务   | 异步任务细分，除了then大多耗时等待的都是宏任务 |

+ 所以任务总共划分为**三级**：同步任务、微任务、宏任务

+ **执行顺序**：同步任务优先执行，调入可执行的微任务在清空同步任务后，调入可执行的宏任务在清空同步任务和微任务后。

---

## nodejs

### 模块

**概念**：可供导入到另一个js文件的，一个js文件就是一个模块。

#### 默认导入导出

**定义导出的默认标准**

```javascript
module.exports = 被导入的对象
```

**导入的默认标准**

```javascript
const object = require('路径') //导入
```

---

#### ECMAScript导入导出

**在package.json文件中写入**

```json
{"type":"module"}
```

**定义导出的ECMAScript标准**

```javascript
export 被具名导入的对象
export 被具名导入的对象
export default 被默认导入的对象
```

**导入的ECMAScript标准**

```javascript
import object from "路径" //默认导入
import {同导出时的对象名} from "路径" //具名导入
```

---

### 模块包

**概念**：一整个nodejs项目文件就是一个模块包。项目文件可能有许多的js文件和其他文件，但只能有唯一的js入口文件。

| 项目文件组成            | 说明                  |
|:-----------------:|:-------------------:|
| package.json      | 模块包的信息、配置，(指明了入口文件) |
| package-lock.json | 锁定依赖模块的版本号          |
| node_modules文件夹   | 依赖模块存放位置            |

**nodejs项目初始化**：会生成package.json文件

```git
npm init -y
```

**第三方模块包的安装卸载**（全局模块包：封装了全局命令的模块包）

```git
npm i 包名    //普通模块包
npm i 包名 -g    //全局模块包
npm i 包名 --save-dev    //开发用模块包,简写-D
npm i 包名 --save    //普通模块包，简写-S，可省略
npm uni 包名
npm uni 包名 -g
```

**安装依赖**：直接拉去git远程仓库的项目，为了传输效率，忽略上传其依赖模块。安装依赖时，自动按package-lock.json对应版本的模块包下载全部。

```git
npm i
```

**项目运行、js文件运行**

```git
node js入口文件
```

**自定义命令的运行**：自定义命令配置在package.json的`script:{"自定义命令":"执行"}`

```git
npm run 自定义命令
```

---

### 内置模块

**概念**：内置的官方模块包，无需安装，但需引入。

| 模块包名        | 功能        |
|:-----------:|:---------:|
| fs          | 文件读写      |
| path        | 路径组合      |
| http        | 启动web服务   |
| url         | url解析     |
| querystring | url查询参数解析 |

---

#### fs模块包

```javascript
const fs = require('fs')
fs.writeFile('路径','写入内容',error=>{})
fs.readFile('路径',(error,data)=>{})
```

---

#### http模块包

```javascript
const http = require('http')
const web = http.createServer()
web.on('request',(request.response)=>{
    console.log(request)
    console.log(response)
})
web.listen(80,()=>{
    console.log('web服务启动成功')
})
```

| request对象实例成员 | 说明        |
|:-------------:|:---------:|
| `url`         | 查看请求行url  |
| `method`      | 查看请求行请求方法 |
| `headers`     | 查看请求头     |
| `trailers`    | 查看请求体内容   |

| response对象实例成员                                  | 说明         |
|:-----------------------------------------------:|:----------:|
| `writeHead('200',{'Content-Type':'text/plain')` | 设置状态行、响应头  |
| `end('响应体内容')`                                  | 设置响应体内容并发送 |

+ 允许跨域,，设置响应头键值对：`‘Access-Control-Allow-Origin’：‘*’`

---

### 第三方模块包

**概念**：需要安装的第三方模块包

| 模块包名           | 功能              |
|:--------------:|:---------------:|
| axios          | AJAX请求          |
| form-serialize | 将表单的所有键值对封装为对象  |
| dayjs          | 时间模块            |
| nodemon        | 全局模块包，保存后自动重新执行 |
| bootstrap      | 组件库             |

+ 按对应模块包名按照即可

---

#### form-serialize模块包

```javascript
const serialize= require('form-serialize')
cosnt object = serialize(表单标签对象,{hash:true,empty:true})
```

+ hash：true返回对象，false返回url格式的查询参数

+ empty：true空也要返回空对象

---

#### dayjs模块包

```javascript
const dayjs = require('dayjs')
const now = dayjs()
now.format('当前时间为YYYY-MM-DD HH:mm:ss')
```

---

#### nodemoon模块包

**安装**

```git
npm i nodemoon -g
```

**使用**

```git
nodemoon js文件
```

---

## webpack

**安装**

```git
npm i --save-dev webpack webpack-cli
```

| 项目文件组成            | 说明                |
|:-----------------:|:-----------------:|
| dist文件夹           | 打包输出根目录           |
| public文件夹         | 动态资源存放位置          |
| src文件夹            | 静态资源assets和代码存放位置 |
| node_modules文件夹   | 依赖模块存放位置          |
| package.lock.json | 锁定依赖模块的版本号        |
| package.json      | 模块包的信息、配置         |
| webpack.config.js | webpack主要配置文件     |

---

### 基础功能配置

**运行打包**：自定义命令配置在package.json的`script:{"build":"webpack"}`

```git
npm run build
```

**配置输入输出端**：于webpack.config.js文件中

```javascript
const path = require('path')
module.exports={
    entry:path.resolve(__dirname,'输入文件路径_默认src/index.js'),
    output:{
        path:path.resolve(__dirname,'输出文件夹目录路径_默认dist'),
        filename:'输出文件路径_默认main.js',
        clean:true //输出前清空文件夹目录
    }
}
```

**配置引入图片处理**：于webpack.config.js文件中

```javascript
module.exports={
    module:{
        rules:[{    //新增引入处理规则
            test:/\.(png|jpg|jpeg|gif)$/i,   
            type:'asset'
            generator:{
                filename:'assets/[hash][ext][query]'  
            }
        }]
    }
}
```

+ **处理规则**：小于8kb以二进制数据流形式写入js，大于8kb放入图床assets文件夹。

+ [hash]：hash编码重命名文件

+ [ext]：原引入文件格式

+ [query]：原引入文件的查询参数

+ [name]：原文件名

---

**配置显示错误行**：于webpack.config.js文件中

```javascript
config = {其他配置}
if(process.env.NODE_ENV==='开发环境'){   //开发环境才开启
    config.devtool = 'inline-source-map'
}
module.exports = config
```

**配置路径别名解析**：于webpack.config.js文件中

```javascript
module.exports={
    resolve:{
        '@':path.resolve(__dirname,'src') //让@代表src文件夹的路径
    }
}
```

---

### 开发环境插件

**概念**：提供保存自动重新打包，与网页热更新显示。

**安装**

```git
npm i --save-dev webpack-dev-server
```

**配置启动命令**

```javascript
"scripts":{"dev":"webpack serve --open --mode=development"}
```

---

### 更多环境插件

**概念**：提供除开发环境和生产环境外，的可自定义环境。

**安装**

```git
npm i --save-dev cross-env
```

**配置与添加环境案例**：于webpack.config.js文件中

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
'plugin':[
    new HtmlWebpackPlugin()
]
module.exports={
    module:{
        rules:[{
            test:/\.css$/i,
            use:[process.env.NODE_ENV === '自定义环境名' ?
                    MiniCssExtractPlugin.loader :
                    'style-loader','css-loaser'], 
            }]
    }
}
```

**配置在前端代码中能够被识别**（如html、js项目文件中）于webpack.config.js文件中

```javascript
const webpack = require('webpack')
module.exports={
    'plugin':[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':
                JSON.stringify(process.env.NODE_ENV)
        })
    ]
};
```

---

### 单独生成html文件插件

**概念**：解决默认html代码输出到js文件中

**安装**

```git
npm i --save-dev cross-env
```

**配置输入输出端**：于文件./webpack.config.js中

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
'plugin':[
    new HtmlWebpackPlugin({
        template:path.resolve(__dirname,'输入html文件路径'),
        filename:path.resolve(__dirname,'输出html文件路径')
    })
]
```

**配置开启CDN加速**：于文件./webpack.config.js中

```javascript
import object from '第三方模块名'
config={其他配置}
if(process.env.NODE_ENV==='生产环境'){   //生产环境才开启
    config.externals={
        '第三方模块名':'object'
    }
}
module.exports=config
'plugin':[
    new HtmlWebpackPlugin({
        template:path.resolve(__dirname,'输入html文件路径'),
        filename:path.resolve(__dirname,'输出html文件路径'),
        useCDN:process.env.NODE_ENV === '生产环境'
    })
]
```

**指定使用CDN加速的引入文件**：于输入html文件中

```html
<% if(htmlWebpackPlugin.options.useCDN){ %>
    <link href="CDN地址"/>
    <script src="CDN地址"></script>
<% } %>
```

---

### 引入css文件解析插件

**概念**：解决默认无法识别引入到js的css文件

```git
npm i --save-dev css-loader
```

**配置引入css文件处理**：于webpack.config.js文件中

```javascript
module.exports={
    module:{
        rules:[{    //新增引入处理规则
            test:/\.css$/i,
            use:['style-loader','css-loader']
        }]
    }
}
```

+ 注意：css文件都要引入到js文件中

---

### 单独生成css文件插件

**概念**：解决默认css代码输出到js文件中

**安装**

```git
npm i --save-dev mini-css-extract-plugin
```

**配置引入css文件处理**：于webpack.config.js文件中

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
'plugin':[
    new MiniCssExtractPlugin()
]
module.exports={
    module:{
        rules:[{
            test:/\.css$/i,
            use:[MiniCssExtractPlugin.loader,'css-loaser'], 
        }]
    }
}
```

---

### 压缩css插件

**概念**：解决单独生成的css文件没有压缩

**安装**

```git
npm i --save-dev css-minimizer-webpack-plugin
```

**配置输出压缩算法**：于webpack.config.js文件中

```javascript
const CssMinimizerWebpackPlugin = 
    require('css-minimizer-webpack-plugin')
module.exports={
    optimization:{
        minimizer:[
            ..., //保留JS压缩
            new CssMinimizerWebpackPlugin()
        ]
    }
}
```

---

### 引入less文件解析插件

**概念**：解决默认无法识别引入到js的less文件

```git
npm i --save-dev less less-loader
```

**配置引入less文件处理**：于webpack.config.js文件中

```javascript
module.exports={
    module:{
        rules:[{    //新增引入处理规则
            test:/\.less$/i,
            use:[MiniCssExtractPlugin.loader,'css-loader',less-loader]
        }]
    }
}
```

- 注意：less文件都要引入到js文件中

---

### 多页面打包配置方法

**概念**：上述都是单页面配置方法，此处归纳并展示多页面配置方法

```javascript
const path = require('path')
module.exports={
    entry:{
    'js-chunk1':path.resolve(__dirname,'src/js1.js'),
    'js-chunk2':path.resolve(__dirname,'src/js2.js'),
}
output:{
    path:path.resolve(__dirname,'默认文件夹目录路径dist'),
    filename:'./[name]/index.js' //输出同文件名的文件夹下
}
}                    
'plugin':[
    new HtmlWebpackPlugin({
        template:path.resolve(__dirname,'输入html1文件路径'),
        filename:path.resolve(__dirname,'输出html1文件路径'),
        chunks:['js-chunk1'] //这个页面对应的js
    }),
    new HtmlWebpackPlugin({
        template:path.resolve(__dirname,'输入html2文件路径'),
        filename:path.resolve(__dirname,'输出html2文件路径'),
        chunks:['js-chunk2'] //这个页面对应的js
    }),
    new MiniCssExtractPlugin({
        filename:'./[name]/index.css' //输出同文件名的文件夹下
    })
]
```

**配置提取公共js减少重复下载**

```javascript
module.exports={
    optimization:{ //输出优化
        splitChunks:{ //js-chunks分割算法
            chunks:'all', //所有js-chunks
            cacheGroups:{ //分割组
                common:{ //抽取公共模块
                    minSize:0, //抽取最小字节数无限制
                    minChunks:2, //抽取来源的最小引用数
                    reuseExistingChunk:true, //开启公共模块复用
                    name(module,chunks,cacheGroupKey){ //文件名和存放位置
                        const allchunksNames=
                            chunks.map((item)=>item.name).jion('-')
                        return ./js/${allchunksNames}
                    }
                }
            }
        }
    }
}
```

---

## Git

### 用户配置

```git
git config --global use.name "用户名"
git config --global use.email "用户邮箱"
git config --list    //查看全部配置
```

### 三个区域

| 分区  | 概念     |
|:---:|:------:|
| 工作区 | 代码书写区域 |
| 暂存区 | 缓冲暂存   |
| 版本区 | 生成版本   |

**项目仓库初始化**：生成.git隐藏文件，用于版本记录和文件跟踪。

```git
git init
```

**暂存区操作**

```git
git add 文件名    //暂存指定文件
git add .    //暂存全部文件
git ls-files    //查看暂存区全部文件
git rm 文件名    //移除暂存区文件
git restore 文件    //从暂存区恢复文件
```

**版本区操作**

```git
git commit -m "版本说明"    //生成版本
git log    //查看最近历史版本
git log --oneline    //简略查看最近历史版本
git relog --oneline    //简略查看全部历史版本
git reset --soft 版本号    //恢复版本，部分
git reset --hard 版本号    //恢复版本，彻底
git reset --mixed 版本号    //恢复版本，暂存区彻底，工作区部分
```

+ 部分：只恢复有的文件，不删除新产生的文件

| VSCode标识符 | 说明          |
|:---------:|:-----------:|
| U         | 未跟踪，只在工作区   |
| A         | 新添加，刚添加到暂存区 |
| M         | 已修改，未添加到暂存区 |
| 无标记       | 和最新版本相同     |

**忽略文件**：新建`gitignore`文件，文件一行写一个被忽略文件

---

### 分支

**概念**：实现多人对同项目同时开发，只能基于主分支进行创建、删除、合并

```git
git branch    //查看所有分支
git branch 分支名    //创建分支
git branch -d 分支名    //删除分支
git checkout 分支名    //切换分支
git merge 分支名    //合并分支
```

### 远程仓库

**概念**：git仓库部署在远程服务器，与之的交互操作

**链接**

```git
git remote add 远程仓库名 远程仓库地址    //链接
git remote remove 远程仓库名    //取消链接
git remote -v    //查看已链接
```

**拉取合并**

```git
git pull 远程仓库名 远程分支:本地分支
git pull 远程仓库名 远程分支    //到当前省略
git pull 远程仓库名    //主分支到当前省略
git pull --rebase 远程仓库名 本地分支    //强制合并，以远程分支为准
```

**推送**

```git
git push 远程仓库名 本地分支:远程分支
git push 远程仓库名 本地分支    //同名省略
git push --force 远程仓库名 本地分支    //强制推送，以本地分支为准
```
