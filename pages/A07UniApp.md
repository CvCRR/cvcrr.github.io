<h1 align="center">UniApp</h1>

<div align="right">最近更新时间：2024-01-25</div>

## 介绍

|      | 内容                          |
|:----:|:---------------------------:|
| 概念   | 基于vue的前端开发框架                |
| 特点   | 开发一次，多端覆盖                   |
| 开发环境 | HBuilder X图形化界面、VSCode命令行形式 |

+ **开发一次，多端覆盖**：写一次代码，使用不同编译器可以转化为不同平台的运行程序

---

## 创建uni-app项目

### HBuilder X图形化界面

**概念**：官网下载并安装HBuilder X软件，uni-app集成开发环境。提供了运行到手机、模拟器等的实时渲染的调试模式，提供了各种打包的图形化操作界面。但对于ts的支持并不完善。

| HBuilder X创建项目目录           | 说明                        |
|:--------------------------:|:-------------------------:|
| pages                      | 各uni-app路由页面              |
| static                     | 静态资源                      |
| unpackage                  | 编译结果输出                    |
| App.vue、index.html、main.js | vue根组件、页面入口文件、js入口文件      |
| manifest.json              | 配置appid、应用名称、logo、版本等打包信息 |
| pages.json                 | 页面路由、窗口样式、tabBar配置        |
| uni.scss                   | uni-app的全局变量              |

---

### VSCode命令行形式

**概念**：在nodejs环境下，通过命令行使用包管理器初始化项目，详见uni-app官网。实例是基于vue3和ts版本的uni-app项目：

```git
npx degit dcloudio/uni-preset-vue#vite-ts 项目名称
```

| VSCode创建项目目录                                | 说明            |
|:-------------------------------------------:|:-------------:|
| node_modules、package.json、package-lock.json | node.js项目配置文件 |
| .gitignore、README.md                        | git相关配置文件     |
| tsconfig.json                               | ts相关配置文件      |
| vite.config.ts                              | vite模块配置文件    |
| src                                         | 静态资源和代码存储文件   |
| index.html                                  | 页面入口文件        |
| dist                                        | 编译结果输出        |

| 继上项目目录：src目录          | 说明                        |
|:---------------------:|:-------------------------:|
| components            | 通用组件                      |
| pages                 | 各uni-app路由页面              |
| pages/xxx             | xxx页面资源                   |
| pages/xxx/xxx.vue     | xxx页面入口                   |
| pages/xxx/components  | xxx页面的私有组件                |
| pagesXxx              | xxx页面模块下的分包的各路由页面         |
| static                | 图片等静态资源                   |
| services/xxx.ts       | 封装的xxx页面网络请求Api           |
| composables           | 组合式函数                     |
| stores                | pinia全局状态管理               |
| styles                | 字体图标等样式资源                 |
| types/global.d.ts     | 通用ts类型声明文件                |
| types/components.d.ts | 组件ts类型声明文件                |
| types/xxx.d.ts        | xxx页面的私有ts类型声明文件          |
| utils                 | 自封装工具                     |
| App.vue、main.ts       | vue根组件、js入口文件             |
| manifest.json         | 配置appid、应用名称、logo、版本等打包信息 |
| pages.json            | 页面路由、窗口样式、tabBar配置        |
| uni.scss              | uni-app内置的常用样式变量          |
| env.d.ts              | \                         |

+ **tabBar页的镜像普通页**：tarBar页是底部的一级导航页，固定顶部无返回按钮，若需要此按钮进行页面返回，则另外新建镜像普通页。

---

**VSCode相关插件推荐**

| VSCode相关插件推荐                     | 功能                  |
|:--------------------------------:|:-------------------:|
| mrmaoddxxaa.create-uniapp-view   | 右键创建 uni-app 页面     |
| uni-helper.uni-helper-vscode     | uni-app 代码提示        |
| evils.uniapp-vscode              | 鼠标悬停显示 uni-app 文档链接 |
| vue.volar                        | vue3 语法支持           |
| vue.vscode-typescript-vue-plugin | vue3 ts 插件          |
| editorconfig.editorconfig        | editorconfig        |
| dbaeumer.vscode-eslint           | eslint              |
| esbenp.prettier-vscode           | prettier            |

---

**uni-api，mp-api安装配置类型声明文件**

```git
pnpm install -D miniprogram-api-typings @uni-helper/uni-app-types
```

```json
//tsconfig.json
{
    "extends": "@vue/tsconfig/tsconfig.json",
    "compilerOptions": {
        "allowJs": true,
        "sourceMap": true,
        "baseUrl": ".",
        "paths": {"@/*": ["./src/*"]},
        "lib": ["esnext", "dom"],
        "types": [
            "@dcloudio/types", 
            "miniprogram-api-typings", //配置此处一
            "@uni-helper/uni-app-types"    //配置此处二
        ]
    },
    "vueCompilerOptions": {
        //配置vue编译器模式
        "nativeTags": ["block", "component", "template", "slot"]
    },
    "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

---

**manifest.json和pagets.json中注释问题**：通过VSCode设置关联为jsonc

---

## uni-ui组件库与easycom自动引入

**uni-ui组件库安装**

```git
pnpm install @dcloudio/uni-ui
```

**按需自动引入配置easycom**

```json
//pages.json
{
    "easycom": {
        "autoscan": true,
        "custom": {
            // uni-ui 引入规则如下配置
            "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue",
            // 自写通用组件自动引入配置，仿造上行正则
            "^My(.*)":"@/components/My$1.vue"
        }
    },
    // 其他内容，easycom与pages同级
    "pages":[]
}
```

**uni-ui安装配置类型声明文件**

```git
pnpm install -D @uni-helper/uni-ui-types
```

```json
//tsconfig.json
{
    "extends": "@vue/tsconfig/tsconfig.json",
    "compilerOptions": {
        "allowJs": true,
        "sourceMap": true,
        "baseUrl": ".",
        "paths": {"@/*": ["./src/*"]},
        "lib": ["esnext", "dom"],
        "types": [
            "@dcloudio/types", 
            "miniprogram-api-typings",
            "@uni-helper/uni-app-types"
            "@uni-helper/uni-ui-types"    //配置此处
        ]
    },
    //其他同级内容
    "vueCompilerOptions": {},
    "include": []
}
```

---

## 基于pinia-plugin-persistedstate的持久化存储

**概念**：有些全局属性不应该随着组件的注销而注销，需要保存到本地缓存，可以被全局调用，如token等用户会员信息，可使用pinia的persist插件，开启persist的pinia函数，会在pinia调用时**自动依据本地缓存进行赋值**，会在修改pinia创建的属性时**自动更新本地缓存**。

**安装插件pinia-plugin-persistedstate**

```git
pnpm install pinia-plugin-persistedstate
```

**配置插件pinia-plugin-persistedstate**

```typescript
//ts入口文件@/main.ts
import { createApp } from 'vue'
import App from '@/App.vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
const app = createApp(App)
const pinia = createPinia()
pinia.use(persist)    //使用pinia-plugin-persistedstate插件
app.use(pinia)    //使用inia插件
```

**使用插件pinia-plugin-persistedstate**

```typescript
//在需要持久化的pinia文件中
import { defineStore } from 'pinia'
export const useMenberStore = defineStore(
    'meber',
    ()=>{
        同setup语法糖的属性/方法/计算属性定义方式
        return {属性/方法/计算属性}
    },
    //网页端持久化
    //persist:true
    //小程序持久化，即重写网页端的写读本地存储方法
    persist: {
        storage:{
            getItem(key){return uni.getStorageSync(key)},
            setItem(key,value){return uni.setStorageSync(key,value)},
        }
    }
)
```

---

## 基于uni-api实现AJAX通信

### 用uni-api发送网络请求

```javascript
uni.request({
    url:服务器地址,
    data:{
        请求体内容
    },
    header:{
        请求头参数
    },
    method:请求方法,
    timeout:超时时间,
    success:(res)=>{
        收到服务器响应报文后执行,无论状态码如何
        console.log(`响应行状态码为：${res.statusCode}`)
        console.log(`响应体内容为：${res.data}`)
    },
    fail:(err)=>{
        console.log(`服务器无响应，网络错误，${err}`)
    }
})
```

---

### 用uni拦截器，实现请求拦截

**uni拦截器**：拦截指定uni-api调用周期的某阶段，添加一并处理。

```javascript
uni.addInterceptor('拦截API名称',{
    invoke(options){调用前拦截触发，对API传参options进行处理},
    returnValue(result){调用后拦截触发，对API返回值result进行处理}
})
```

**常见请求拦截**：对request、uploadFile设置基地址、修改超时时间，公共请求头，配置token

```typescript
const httpInterceptor = {
    invoke(options:UniApp.RequestOptions){
        if(!options.url.startsWith('http'){    //①设置基地址
            options.url = 'http://基地址' + options.url
        }
        options.timeout = 10000    //②修改默认60s超时时间为10s
        options.header = {    //③公共请求头
            ...options.header    //保留自己的请求头
            'key':'value'
        }
        const memberStore = useMemberStore()    //从pinia全局对象中导入token
        const token = memberStore.profile?.token
        if(!token){
            options.header.token = token    //④配置token
        }
    }
}
uni.addInterceptor('request',httpInterceptor)
uni.addInterceptor('uploadFile',httpInterceptor)
```

---

### 封装uni.request，实现响应拦截、ts类型定义

**思路**：借鉴axious实现原理，运用Promise异步函数，ts还需要运用泛型对服务器返回数据进行类型定义。

```typescript
interface Data<T> {    //泛型接口定义，对响应体内容进行类型定义
    code:string
    msg:string
    result:T    //此处在不同请求有不同类型的响应数据
}
const http = <T>(options:UniApp.RequestOptions)=>{//泛型函数定义
    return new Promise<Data<T>>((resolve,reject)=>{//泛型类实例化
        uni.request({
            ...options,
            success(res){
                //情况1：2xx请求成功
                if(res.statusCode>199 && res.statusCode<300){
                    resolve(res.data as Data<T>)//类型断言
                //情况2：401用户token失效，跳转至登录界面
                }else if(res.statusCode=== 401){
                    const memberStore = useMemberStore()
                    memberStore.clearProfile()
                    uni.navigateTo({url:'登录页面地址'})//跳转页面
                    reject(res)
                //情况3：其他错误，根据后端提示报错
                }else{
                    uni.showToast({//消息提示框
                        icon:'none',
                        title:(res.data as Data<T>).msg || '请求错误'
                    })
                    reject(res)
                }
            },
            //情况4：网络错误
            fail(err){
                uni.showToast({
                        icon:'none',
                        title:'网络错误，换个网络试试'
                    })
                reject(err)
            }
        })
    })
}
//使用封装函数http的实例
const getData = async()=>{
    const res = await http<number[]>({
        url:'某返回数组的请求地址'
    })
    console.log(`获取数据成功，${res.result}`)
}
```

+ 因为需要类型定义和封装为Promise对象，故而不使用uni拦截器

---

## 常用uniAPI

| 功能               | API                                                                      |
|:----------------:|:------------------------------------------------------------------------:|
| 拍摄或从手机相册中选择图片或视频 | `uni.chooseMedia()`                                                      |
| 切换tabBar         | `uni.switchTab({url:"目标路径"})`                                            |
| 页面跳转             | `uni.navigateTo({url:"目标路径"})`                                           |
| 页面跳转(不可返回)       | `uni.redirectTo({url:"目标路径"})`                                           |
| 页面后退             | `uni.navigateBack()`                                                     |
| 页面组件-轻提示         | `uni.showToast({icon:'none',title:'内容'})`                                |
| 页面组件-模态框         | `uni.showModal({content:'内容',success:(res)=>{if(res.confirm){//执行内容}}})` |
| 页面组件-大图预览        | `uni.previewImage({current:当前图片链接,urls:图片所在列表})`                         |

---

## 常用uni组件

| 组件名称     | API                                     |
|:--------:|:---------------------------------------:|
| 轮播图、滑动路由 | `<swiper></swiper>`                     |
| 列表选择器    | `<picker></picker>`                     |
| 圆点选择器    | `<radio-group></radio-group>`           |
| 滚动区域     | `<scroll-view></scroll-view>`           |
| 弹出层      | `<uni-popup></uni-popup>`               |
| 表单(内置校验) | `<uni-forms></uni-forms>`               |
| 滑动操作     | `<uni-swipe-action></uni-swipe-action>` |
| 倒计时      | `<uni-countdown></uni-countdown>`       |

+ 有uni-开头的时uni官方的扩展组件，需要安装uni-ui组件库

**常用uni组件中的类型声明文件UniHelper**

| 类型名称                                                                  | API                                |
|:---------------------------------------------------------------------:|:----------------------------------:|
| 组件`<swiper>`的事件`@change`的回调函数`onChange(e)`的事件参数`e`的类型                 | `UniHelper.SwiperOnChange`         |
| 组件`<button>`的事件`@getphonenumber`的回调函数`onGetphonenumber(e)`的事件参数`e`的类型 | `UniHelper.ButtonOnGetphonenumber` |
| 组件`<radio-group>`的事件`@change`的回调函数`onChange(e)`的事件参数`e`的类型            | `UniHelper.RadioGroupOnChange`     |
| 组件`<picker mode="data">`的事件`@change`的回调函数`onChange(e)`的事件参数`e`的类型     | `UniHelper.DataPickerOnChange`     |

+ 可见格式总结为：`UniHelper.[组件名]On[事件名]`

---

### 表单uni-form与内置校验

```typescript
<script setup lang="ts">
    const formData = ref({//双向绑定的数据
        receiver:'',
        contact：'',
        address：''
    })
    const formRef = ref()//用于调用校验api
    const rules = {//校验规则
        receiver:{//校验目标为与name属性值相同的表单
            rules:[
                {required:true,errorMessage:'请输入收货人姓名'},
                {minLength:3,maxLength:5,errorMessage:'姓名长度3-5个字符'},
            ]
        },
        contact:{
            rules:[
                {required:true,errorMessage:'请输入联系方式'},
                {pattern:/^1[3-9][0-9]{9}$/,errorMessage:'手机号格式不正确'},
            ]
        }.
        address:{
            rules:[
                {required:true,errorMessage:'请输入收货地址'},
            ]
        }
    }
    const onSubmit = async()=>{
        try{
            await formRef.value?.validate?.()//调用校验api
            console.log('校验成功')
        }catch{
            console.log('校验失败')
        }
    }
</script>
<template>
    <uni-forms ref="formRef" :modelValue="formData" :rules="rules">
        <uni-forms-item label="姓名" name="receiver">
            <uni-easyinput type="text" v-model="formData.receiver"/>
        </uni-forms-item>
        <uni-forms-item label="手机" name="contact">
            <uni-easyinput type="text" v-model="formData.contact"/>
        </uni-forms-item>
        <uni-forms-item name="address">
            <view class="label">地址</view>
            <input type="text" v-model="formData.address"/>
        </uni-forms-item>
    </uni-forms>
    <button @tap="onSubmit">保存并提交</button>
</template>
```

---

### SKU弹框

**概念**：存货单位(stock keeping unit)，实现依据某类商品有否及库存判断是否可选。可从uni-app**插件市场**中搜索下载。例插件`<vk-data-goods-sku-popup>`如下：

```typescript
<script setup >
    const isPopup = ref(false)
    const goodsInfo = ref({})
    onLoad(()=>{
        goodsInfo.value = {
            _id:"",//商品ID
            name:"",//商品名称
            goods_thumb:"",//商品图片
            spec_list:[//种类划分
                {name:"颜色",list:[{name:"红色"},{name:"黄色"},{name:"蓝色"}]},
                {name:"尺码",list:[{name:"20cm"},{name:"40cm"},{name:"60cm"}]},
            ],
            sku_list:[//各类商品，存货单元
                {
                    _id:"",//某类商品ID
                    goods_id:"",//商品ID(同上)
                    goods_name:"",//商品名称(同上)
                    image:"",//某类商品图片
                    price:30*100,//某类商品价格,需×100避免浮点数运算
                    stock:999,//某类商品库存
                    sku_name_arr:["红色","40cm"]
                    //某类商品所属分类,顺序需与种类划分数组对应
                },
                {
                    _id:"",
                    goods_id:"",
                    goods_name:"",
                    image:"",
                    price:20*100,
                    stock:899,
                    sku_name_arr:["蓝色","20cm"]
                },
            ]
        }
    })
    enum SkuMode = {Both = 1,Cart = 2,Buy = 3}
    const mode = ref<SkuMode>(SkuMode.Both)
</script>
<template>
    <vk-data-goods-sku-popup v-model="isPopup" :localdata="goodsInfo"/>
    <button @tap="isPopup=true">立即购买</button>
</template>
```

- 组件更多属性、事件详见该插件文档

---

## uni特性

### 传参跳转与接收

**跳转前页面的组件**

```typescript
<template>
    <view url="/pages/xxx/xxx?data=1">点击传参跳转的组件</view>
</template>
```

**跳转后页面的组件**

```typescript
<script setup lang="ts">
    const query = defineProps<{    //uni自动将查询参数添加到自定义属性
        data:string
    }>()
</script>
```

---

### 分包与预下载

**概念**：页面资源分为主包和分包，被设置为分包的页面会避免和主包一起下载，并按设定的规则进行预下载，从而提升用户打开页面的速度，优化用户体验。

```json
//src/pages.json
{
    "pages":[
        //主包各路由页面
    ],
    "subPackages":[
        //分包设置
        {
            "root":"pagesXxx",
            "pages":[
                //某分包各路由页面
            ]
        },
        {
            "root":"pagesXxx",
            "pages":[
                //某分包各路由页面
            ]
        },
    ],
    "preloadRule":{    //预下载规则设置
        "pages/xxx/xxx":{    //进入xxx主包页面时的规则如下
            "network":"all",    //网络条件
            "packages":["pagesXxx"]    //下载对应分包根目录
        }
    }
}
```

---

### 小程序页面生命周期

| 生命周期          | 函数        | 对应vue       | 应用场景         |
|:-------------:|:---------:|:-----------:|:------------:|
| uni/vue对象创建完成 | onLoad()  | onCreated() | 请求渲染         |
| 显示时           | onShow()  | /           | 请求渲染，同时有修改回显 |
| 页面原生对象创建完成    | onReady() | onMounted() | 调用原生对象       |

---

### 条件编译

**概念**：通过特殊注释，以`#ifdef [平台名称] || [平台名称]`开头，以`#endif`结尾，让代码按条件编译到不同平台。支持vue/js/ts/css/scss/pages.json等文件

```typescript
<script setup lang="ts">
//#ifdef MP-WEIIN
    console.log(`ts条件编译内容`)
//#endif
</script>
<template>
<!-- #ifdef MP-WEIXIN -->
    <view>组件条件编译内容</view>
<!-- #endif -->
</template>
```

---

### 跨端兼容

#### uni-app样式兼容

+ **小程序不支持css选择器的*通配符**：不适用通配符即可

+ **小程序一级标签page的样式在app端失效**：在css添加app条件编译内容`#app,`

+ **H5端默认开启样式隔离scoped导致骨架屏样式失效**：样式单独提出为less，然后在骨架屏和对应页面分别引入`@import`

+ **H5端、app端多出一层标签结构导致flex失效**：对多出标签条件编译额外添加flex

+ **tabBar页、普通页在各端的视口区域不一致**
  
  <image src="./images/2024-01-16-17-58-34-image.png"/>
  
  **导致H5端无法触发滚动触底事件**：添加高度`page{height:100%}`
  
  **导致H5端底部工具栏遮挡**：使用uni-css变量`.toolbar{bottom:var(--window-bottom)}`，顶部遮挡同理

+ **H5端在阻止冒泡行为后可能产生的bug**，额外添加`@tap.prevent="()=>{}"`

---

#### uni-app组件兼容

+ **无法跨端支持的组件**：条件编译隐藏

+ **H5端、app端无法使用pick组件mode属性**：使用uni-data-picker组件和uniCloud

---

#### uni-app的API兼容

+ **选择上传图片**：小程序`uni.chooseMedia()`，H5、app`uni.chooseImage()`

---

## 技巧写法

### 路由列表

**概念**：实现同一页面内，不同种类商品列表的路由，知识点如下：

```typescript
<script setup lang="ts">
    type Good = {    //商品的结构
        id:string;
        url:string;
        src:string;
        name:string;
        price:string;
    }
    type OnceRequest = {    //分页请求的商品列表数据
        page:number;
        pages:number;
        pageSize:number;
        goodList:Good[];
    }
    type Route = {    //路由列表的结构
        id:string;
        title:string;
        onceRequest:OnceRequest;
        //下行相当于在这里加finish?:boolean
    }
    //①利用交叉类型与可选属性，给各路由列表添加已经没有更多商品的变量
    const data = ref<(Route & {finish?:boolean})[]>([])
    //默认选中第一种商品列表的路由
    const activeIndex = ref(0)
    //请求数据并渲染
    onLoad(async()=>{
        data = await getDataApi()
    })
    //触底扩充渲染
    const onScrolltolower = async()=>{
        const curdata = data.value[activeIndex.value]//②地址传递
        if(curdata.onceRequest.page<curdata.onceRequest.pages){
            curdata.onceRequest.page++
        }else{
            curdata.finish = true    //③增加finish属性给⑧用
            return uni.showToast({icon:'none',title:'没有更多数据~'})
        }
        const res = await getTargetDataApi(略)
        curdata.onceRequest.gooList.push(...res)        
    }
</script>
<tempalate>
    //路由选项
    <view 
        v-for="(item,index) in data"
        :key="item.id"
        :class="{active:index===activeIndex}"    //④选中活跃
        @tap="activeIndex=index"    //⑤点击切换列表路由
    >
        <view> {{ item.title }} </view>
    </view>
    //商品列表主体
    <scroll-view
        v-for="(item,index) in data"
        :key="item.id"
        v-show="index===activeIndex"    //⑥v-show实现切换路由后的状态保持
        @scrolltolower = "onScrolltolower"
    >
        <view
            v-for="good in item.onceRequest.goodList"//⑦嵌套v-for
            :key="good.id"
            :url="good.url"
        >
            <image :src="good.src"></image>
            <view> {{ good.name }} </view>
            <view> {{ good.price }} </view>
        </view>
        <view>{{ item.finish?"没有更多数据~":"正在加载..."}}</view> //⑧
    </scroll-view>
</tempalate>
```

+ 上述是**v-show**实现的，还可以通过**条件更改渲染属性**，**滑动路由**(swiper轮播图组件)等来实现路由列表

---

### 组合式函数

**概念**：利用Vue组合式API来封装和复用有状态逻辑的函数。类似于创建Xxx类，面向对象的编程思想。

```typescript
//src/composables/index.ts
export const useXxx = () => {
    同setup语法糖的属性/方法/计算属性定义方式
    return {属性/方法/计算属性}    //作为局部变量必须返回
}
```

**与下列使用pinia全局状态管理的对比**：上述是全局类实例化不同对象，下列是全局对象

```typescript
//src/stores/xxx.ts
import { defineStore } from 'pinia'
export const useXxxStore = defineStore('xxx',()=>{
    同setup语法糖的属性/方法/计算属性定义方式
    return {属性/方法/计算属性}    //作为局部变量必须返回
})
```

---

### 基于ts枚举或常量的语义化传参

**概念**：将整形数据的传参变换为使用ts枚举、或者常量，使代码更具可读性

```typescript
//ts枚举
enum OrderState {
    DaiFuKuan = 1,
    DaiFaHuo = 2,
    DaiShouHuo = 3,
    DaiPingJia = 4,
    YiWanCheng = 5,
    YiQuXiao = 6
}
//js中使用常量对象
const OrderState = {
    DaiFuKuan:1,
    DaiFaHuo:2,
    DaiShouHuo:3,
    DaiPingJia:4,
    YiWanCheng:5,
    YiQuXiao:6
}
//整形数据的语义化传参
const orderCurrent = ref<OrderState>(1)//当前状态码
if(orderCurrent.value === OrderState.DaiFuKuan){
    //若当前状态为待付款，则执行的内容，取代写法：orderCurrent.value === 1
}
```

---

## 样式术语

### 安全区域

**概念**：不被遮挡的屏幕显示区域，使用`uni.getSystemInfoSync().safeAreaInsets`获取在竖屏方向中，安全区域到屏幕上下左右边的距离信息，以对固定顶部导航栏在不同机型上进行适配，例如下：

```typescript
<template>
    <view :style="{
        padding-top:uni.getSystemInfoSync().safeAreaInsets?.top + 'px'
    }"></view>
</tempalte>
```

---

### 固定顶部与滚动区域

**思路**：通过配置整个page标签为flex，让滚动区域占剩余部分。

```typescript
<template>
    <view>固定顶部</view>
    <scroll-view class="scroll-view">滚动区域</scroll-view>
</tempalte>
<style land="less">
    page{//小程序的body标签
        display:flex;    //整个页面flex布局
        height:100%;    //高度填满全屏
        .scroll-view{    //滚动占除固定顶部的剩余全部，实现固定顶部的固定
            flex:1
        }
    }
</style>
```

---

### 骨架屏

**概念**：在数据加载完成前，显示页面的骨架结构，缓解用户等待的焦虑情绪。

**思路**：调式工具自动生成骨架屏组件，配合vue的v-if语法，例如下：

```typescript
<script setup lang="ts">
    const isloading = ref(false)
    onLoad(async()=>{
        isloading.value = true
        await Promise.all([加载数据1,加载数据2])
        isloading.value = false
    })
</script>
<template>
    <view :v-if="isloading">骨架屏组件</view>
    <template v-else>
        <view>需加载的组件1</view>
        <view>需加载的组件2</view>
    </tempalte>
</tempalte>
```

---

## 微信小程序原生API

### 微信小程序语言

| 不同点   | 网页语言                 | 微信小程序语言/uni-app语言                 |
|:-----:|:--------------------:|:---------------------------------:|
| 标签名称  | HTML(div、span、img、a) | WXML(view、text、image、navigator)   |
| 属性节点  | `<a href="#"></a>`   | `<navigator url="#"></navigator>` |
| vue语言 | 不支持                  | 支持                                |
| 尺寸单位  | CSS(rem、vw/vh)       | WXSS(rem、vw/vh、rpx)               |
| 选择器   | 全部CSS选择器             | 部分CSS选择器（不支持*）                    |
| 全局样式  | 无                    | 文件app.wxss/文件uni.css              |
| 入口js  | 无                    | 文件app.js/文件main.js                |
| 提供组件  | 无                    | `<swiper> <scroll-view>`          |

### 滚动驱动动画

```typescript
<script setup lang="ts">
    const pages = getCurrentPages().at(-1)//获取此页面原生对象
    onReady(()=>{
        pages.animate(//微信原生对象的滚动驱动动画api
            "CSS选择器",//执行动画的对象
            [//动画帧
                {backgroundColor:`transparent`},
                {backgroundColor:`blue`} 
            ],
            1000,//动画持续时间
            {
                scrollSource:`#scrollView`,//对应滚动容器的ID选择器
                timeRange:1000,//与动画持续时间保持一致
                startScrollOffset:0,//开始执行动画的距离
                endScrollOffset:50//结束执行动画的距离
            }
        )
        pages.animate()//更多动画紧接添加
    })
</script>
<template>
    <view>固定顶部</view>
    <scroll-view id="scrollView">滚动区域</scroll-view>
</template>
```

  ---

### 微信手机登陆流程

```typescript
<script setup lang="ts">
    //获取code登陆凭证
    let code = ''
    onLoad(async()=>{
        const res = await wx.login()
        code = res.code
    })
    //获取用户手机号码
    const onGetphonenumber:UniHelper.ButtonOnGetphonenumber = async(e)=>{
        const encrytedData = e.detail!.encrytedData!
        const iv = e.detail!.iv!
        //向服务器发送以登陆
        const res = await postLoginAPI({code,encrytedData,iv})
        console.log(res)
    }
</script>
<template>
    <button
        open-type="getPhoneNumber"    //调用微信提供的手机授权登陆功能
        @getphonenumber="onGetphonenumber(e)"
    >
        手机号快捷登陆
    </button>
</template>
```

---

### 微信支付流程

```typescript
const onPayment = async()=>{
    const res = await getPayInfoAPI()//获取微信支付参数
    wx.requestPayment(res)//调用微信支付API
}
```

---

### 微信发布上线流程

+ 项目打包`pnpm build:mp-weixin`

+ 以微信开发者工具打开、测式、上传

+ 在微信公众号平台提交审核、发布
