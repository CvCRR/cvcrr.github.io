<h1 align="center">UniApp</h1>

<div align="right">最近更新时间：2024-01-04</div>

## 介绍

|        | 内容                          |
|:------:|:---------------------------:|
| 概念     | 基于vue的前端开发框架                |
| 特点     | 开发一次，多端覆盖                   |
| 集成开发环境 | HBuilder X图形化界面、VSCode命令行形式 |

+ **开发一次，多端覆盖**：写一次代码，使用不同编译器可以转化为不同平台的运行程序

---

## 创建uni-app项目

### HBuilder X图形化界面

**概念**：官网下载并安装HBuilder X软件

| HBuilder X创建项目目录           | 说明                        |
|:--------------------------:|:-------------------------:|
| pages                      | 各uni-app路由页面              |
| static                     | 静态资源                      |
| unpackage                  | 编译结果输出                    |
| App.vue、index.html、main.js | vue根组件、页面入口文件、js入口文件      |
| manifest.json              | 配置appid、应用名称、logo、版本等打包信息 |
| pages.json                 | 页面路由、窗口样式、tabBar配置        |
| uni.scss                   | uni-app内置的常用样式变量          |

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
| composables           | \                         |
| pages                 | 各uni-app路由页面              |
| pages/xxx/components  | xxx页面的私有组件                |
| static                | 静态资源                      |
| services/xxx.ts       | 封装的xxx页面网络请求Api           |
| stores                | pinia目录                   |
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
export const useCounterStore = defineStore(
    '唯一标识名',
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

**思路**：借鉴axious实现原理，运用Promise异步函数，ts还需要运用泛型进行类型定义。

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

## 固定顶部

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

### 固定与滚动区域

**思路**：通过配置整个page标签为flex，让滚动区域占剩余部分。

```typescript
<template>
    <view>固定顶部</view>
    <scroll-view class="scroll-view">滚动区域</scroll-view>
</tempalte>
<style land="less">
    page{
        display:flex;    //整个页面flex布局
        height:100%;    //高度填满全屏
        .scroll-view{    //滚动占除固定顶部的剩余全部，实现固定顶部的固定
            flex:1
        }
    }
</style>
```

---

## 骨架屏

**概念**：在数据加载完成前，显示页面的骨架结构，缓解用户等待的焦虑情绪。

**思路**：调式工具自动生成骨架屏组件，配合vue的v-if语法，例如下：

```typescript
<script setup>
    const isloading = ref(false)
    onLoad(async()=>{
        isloading.value = true
        await Promise.all([加载数据1,加载数据2])
        isloading.value = false
    })
</script>
<template>
    <view :v-if="isloading">骨架屏组件</view>
    <template>
        <view>需加载的组件1</view>
        <view>需加载的组件2</view>
    </tempalte>
</tempalte>
```

---

## 传参跳转

**跳转前页面的组件**

```typescript
<template>
    <view url="/pages/xxx/xxx?type=1">点击传参跳转的组件</view>
</template>
```

**跳转后页面的组件**

```typescript
<script setup>
    const query = defineProps<{    //uni自动将查询参数添加到自定义属性
        type:string
    }>()
</script>
```

---

## 路由列表

**概念**：实现同一页面内，不同种类商品列表的路由，知识点如下：

```typescript
<script>
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
        const curdata = data.value[activeIndex]    //②地址传递
        if(curdata.onceRequest.page<curdata.onceRequest.pages){
            curdata.onceRequest.page++
        }else{
            curdata.finish = true    //③增加finish属性给⑧用
            return uni.showToast({icon:'none',title:'没有更多数据~'})
        }
        const res = await getTargetDataApi(略)
        const curdata.onceRequest.gooList.push(...res)        
    }
</script>
<tempalate>
    //路由列表选项
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
        v-show="index===activeIndex"    //⑥v-show实现持久化渲染
        @scrolltolower = "onScrolltolower"
    >
        <view
            v-for="good in item.onceList.list"    //⑦嵌套v-for
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
