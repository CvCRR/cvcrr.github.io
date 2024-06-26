<h1 align="center">Vue</h1>

<div align="right">最近更新时间：2024-04-21</div>

## 介绍

|        | Vue                         |
|:------:|:---------------------------:|
| 概念     | 前端开发框架                      |
| 特点     | 数据驱动视图、双向数据绑定、虚拟DOM对象、组件式开发 |
| 原理     | MVVM                        |
| 语法基础组成 | 基础指令、组件操作、生命周期函数            |
| 重要插件   | 前端路由、pinia、Vant第三方组件库       |

+ **数据驱动视图**：依赖数据变化，自动重新渲染页面

+ **双向数据绑定**：页面数据变化，也自动同步到依赖数据

+ **虚拟DOM对象**：大部分操作省去了DOM对象的获取

+ **组件式开发**：将同类网页结构组件化，提高代码的复用性

+ **MVVM**：M是数据源、V是DOM结构，VM是vue实例，M到V，V到M的过程基于VM实例对象。

| 版本               | Vue2    | Vue3          |
|:----------------:|:-------:|:-------------:|
| vue文件\<script>支持 | 列表式API  | 列表式API、组合式API |
| 基于的打包框架          | webpack | vite          |
| 部分API的变化         | /       | /             |

---

## 列表式API

### vue指令

**概念**：封装了操作DOM对象的函数，在vue中叫指令，该指令基于vue专门的语法形式存在和使用。使用时基本将指令直接写入要被操作的DOM对象的html标签中，因此无需获取DOM。

#### 渲染指令

```javascript
<script>
    export default{    //输出的对象展开处理后是创建vue实例的依赖参数
        data(){    //本vue实例依赖的变量库
            return{
                key1:value1,
                key2:value2,
                key3:value3,
                key4:value4,
                listName:[
                    {id:1,data:"测试1"},
                    {id:2,data:"测试2"}
                ]
            }
        }
    }
</script>

<template><div>    //是根据最外层标签创建vue实例的标签对象

    //内容渲染指令：v-text不识别html文本，{{}}是插值表达式
    <div v-text="key1"></div>
    <div v-html="key1"></div>
    <div> {{ key }} </div>

    //属性渲染指令
    <div v-bind:普通属性="key1"></div>
    <div :普通属性="key1"></div>

    //条件渲染指令：if是移除标签，show是dispaly=none
    <div v-if="key1"></div>
    <div v-elseif="key2"></div>
    <div v-else="key3"></div>
    <div v-show="key4"></div>

    //循环渲染指令
    <div v-for="(item,index) in listName" :key="item.id">
        {{ item.data }}
    </div>

</div></template>
```

+ 指令属性的值：是以js代码行进行解析，所以支持写计算表达式、三目运算符等js代码行。字符串需要用单引号表示

---

#### 事件绑定指令

```javascript
<script>
    export default{
        methods:{    //本vue实例依赖的方法库
            method1:(e)=>{
                consolog.log(`调用方法1,事件对象为${e}`)
            },
            method2(e){
                consolog.log(`调用方法2,事件对象为${e}`)
            },
            method3(n,e){
                consolog.log(`调用方法3,传入参数为${n},事件对象为${e}`)
            }
        }
    }
</script>

<template><div>

    <div v-on:事件类型="method1"></div>
    <div @事件类型="method2"></div>
    <div @事件类型="method3("123",$event)"></div>
    <div @事件类型.stop="method1"></div>

</div></template>
```

| 事件修饰符    | 功能                                       |
|:--------:|:----------------------------------------:|
| .prevent | 阻止默认行为，即e.preventdefalut()               |
| .stop    | 阻止冒泡，即e.stopPropagation()                |
| .capture | 开启捕获，即addEventListener('事件类型',回调函数,true) |
| .once    | 触发1次事件后，删除该事件                            |
| .self    | 当e.target为自己时才触发                         |
| .按键      | 当e.key对应时才触发（只有键盘事件才有）                   |

---

#### 双向绑定指令

```javascript
<script>
    export default{
        data(){    //本vue实例依赖的变量库
            return{
                key1:value1,
            }
        }
    }
</script>

<template><div>

    <input v-model="key1"></input>
    <input v-model.trim="key1"></input>

</div></template>
```

+ 原理：对表格绑定了onchange事件，实时让依赖的变量更新为最新的value属性值，也就是有value属性的表单使用此命令才有意义。

| v-model修饰符 | 功能                                             |
|:----------:|:----------------------------------------------:|
| .number    | 转数字，即执行e.target.value = +e.target.value        |
| .trim      | 过滤字符，即执行e.target.value = e.target.value.trim() |
| .lazy      | 失焦点才获取，即改标签.onchange()为标签.onblur()             |

---

#### 自定义指令

**私有自定义指令**：在本组件中

```javascript
<script>
    export default{
        directives:{
            myCommand:{
                bind(){
                    console.log(`标签创建后执行`)
                },
                updata(){
                    console.log(`标签更新后执行`)
                }
            },
            myCommand2(el,binding){
                console.log(`标签创建后、更新后执行相同`)
                console.log(`写入的标签对象为${el}`)
                console.log(`经过js代码行解析的参数为${binding}`)
            }
        }
    }
</script>
```

**全局自定义指令**：在js入口文件中

```javascript
import Vue from 'vue'
Vue.directive('myCommand',(el,binding)=>{
    console.log(`标签创建后、更新后执行相同`)
    console.log(`写入的标签对象为${el}`)
    console.log(`经过js代码行解析的参数为${binding}`)
})
```

**自定义指令的使用**

```javascript
<script>
    export default{
        data(){    //本vue实例依赖的变量库
            return{
               key1:value1,
            }
        }
    }
</script>

<template><div>

    <div v-myCommand="key1"></div>

</div></template>
```

- 可见v-xxxx的指令属性，其值都是经过js代码行解析的

| 指令简写汇总 | 全写     | 功能        |
|:------:|:------:|:---------:|
| :      | v-bind | 属性渲染指令    |
| @      | v-on   | 事件绑定指令    |
| #      | v-slot | 插槽指明和接收通信 |

---

### 监听器

```javascript
<script>
    export default{
        data(){    //本vue实例依赖的变量库
            return{
                key1:value1,
                key2:value2
            }
        }
        watch:{    //监听器：对依赖变量库的变量进行变化监听
            key1:{
                handle(new,old){
                    console.log(`key1值变化了,新值为${new},旧值为${old}`)
                },
                immediate:true, //开始执行一次
                deep:true //key为复杂数据类型时，递归实现深度监听
            },
            key2(new,old){
                console.log(`key2值变化了,新值为${new},旧值为${old}`)
            }
        }
    }
</script>
```

---

### 计算属性

```javascript
<script>
    export default{
        data(){    //本vue实例依赖的变量库
            return{
               key1:value1,
               key2:value2
            }
        }
        computed:{    //计算属性：根据返回值创建变量，加入依赖变量库
            key3:()=>key1+key2
            key4(){
                return key1-key2
            }
        }
    }
</script>
```

---

### 组件操作

**概念**：一个vue文件就是一个vue组件，但还不是vue实例，只有在根组件直接或间接引入并使用该组件，才会根据该vue文件new创建一个vue实例，才能显示在网页页面上。引入和使用的次数可以是0-n次，因此提高了代码的复用性。组件操作的主要内容是组件引入和组件通信。

### 组件引入与注册

**局部引入**：只引入到本vue文件中

```javascript
<script>
    import Child from '@/compoents/Child.vue'
    export default{
        component:{    //组件注册、可以说是类的创建过程
            Child:Child
        }
    }
</script>

<template><div>

    <Child></Child>    //组件使用、可以说是实例化的过程
    <Child></Child>

</div></template>
```

**全局引入**：在入口js文件中引入到全部的vue文件中（vue2）

```javascript
import Child from '@/compoents/Child.vue'
import Vue from 'vue'
import app from '@/App.vue'
Vue.component('Child',Child)    //全局组件的引入和注册
new Vue({
    render:h=>h(app)    //用h函数将根组件实例化
}).$mount('#app')    //再挂入html中id为app的标签
```

---

### 组件通信

#### 自定义属性（父传子）

**父组件**

```javascript
<script>
    import Child from '@/compoents/Child.vue'
    export default{
        component:{
            Child:Child
        }
    }
</script>

<template><div>

    <Child color="red" msg="123"></Child> //父组件给自定义属性传值

</div></template>
```

**子组件**

```javascript
<script>
    export default{
        props:{    //自定义属性，根据父组件传入值创建变量加入依赖变量库
            color:{
                default:write,
                type:String,
            },
            msg:{
                default:null,
                type:String,
                required:true    //一定需要提供
            }
        }
    }
</script>

<template><div>

    <div :style="`color:${color}`"> {{ msg }} </div>

</div></template>
```

---

#### 自定义事件（子传父）

**父组件**

```javascript
<script>
    import Child from '@/compoents/Child.vue'
    export default{
        component:{
            Child:Child
        },
        methods:{
            method1(val){
                console.log(`接收到子组件的信息为${val}`)
            }
        }
    }
</script>

<template><div>

    <Child @textEvent="method1"></Child> //绑定自定义事件

</div></template>
```

**子组件**

```javascript
<script>
    export default{
        data(){
            return{
                key1:value1
            }
        },
        emits：['textEvent'], //声明自定义事件
        methods:{
            method1(){
                console.log(`处于发送时机`)
                $emit('textEvent',this.key1) //触发自定义事件
            }
        }
    }
</script>

<template><div>

    <div @click="method1"> {{ key1 }} </div>

</div></template>
```

+ script标签中的**this**：指向了本vue文件的vm实例对象

---

#### EventBus中间组件（万能跨组件通信）

**原理**：新建Vue实例作为通信的中间组件名叫bus，使用其`$emit`函数发送和`$on`函数接收使用。可见每个Vue组件都有这两个函数，自定义事件就是依赖于子组件的这两个函数。

**eventBus.js制作**

```javascript
import Vue from 'vue'
export default new Vue()
```

**发生方组件**

```javascript
<script>
    import bus from 'eventBus.js地址'
    export default{
        data(){
            return{
                key1:value1
            }
        },
        methods:{
            method1(){
                console.log(`处于发送时机`)
                bus.$emit('textEvent',this.key1)
            }
        }
    }
</script>

<template><div>

    <div @click="method1"> {{ key1 }} </div>

</div></template>
```

**接收方组件**

```javascript
<script>
    import bus from 'eventBus.js地址'
    export default{
        created(){    //在vm实例对象创建完成后
            console.log(`处于接收处理时机`)
            bus.$on('textEvent',(val)=>{
                console.log(`接收到兄弟组件的消息${val}`)
            })
        }
    }
</script>
```

---

#### ref和nextTick（子传父，父调子）

**概念**：ref是标签属性，用于获取DOM对象，操作DOM对象，或者获取子组件vm实例对象，实现子传父通信。nextTick是异步函数，等待网页元素更新后才执行。

```javascript
<script>
    import Child from '@/compoents/Child.vue'
    export default{
        component:{
            Child:Child
        },
        mounted(){    //在dom对象创建完成后
            console.log(`处于操作dom的时机`)
            this.$refs.div1.style.color = "red"
        },
        data(){
            return{
                key1:value1
            }
        }
        methods:{
            method1(){
                key1++
                console.log(`未自增，${this.$refs.div2.innerHtml}`)
                nextTick(()=>{
                    console.log(`已自增，${this.$refs.div2.innerHtml}`)
                })
            }
        }
    }
</script>

<template><div>

    <div ref="div1"></div>
    <div ref="div2" @click=“method1”> {{ key1 }} </div>
    <Child ref="div3"></Child>

</div></template>
```

---

#### 组件插槽（父传子）

**概念**：子组件提供的随意插入内容的区域

**父组件**

```javascript
<template><div>

    <Child>使用了默认插槽</Child>

    <Child>
        <template #slot2>
            使用了具名插槽
        </template>
    </Child>

    <Child>
        <template #slot3="val">
            使用了具名通信插槽，通信值为{{val}}
        </template>
    </Child>

</div></template>
```

- **必须新建**template标签，再用该标签属性说明使用哪个具名插槽。

- 非通信插槽直接**无值属性写法** `v-slot:插槽名` 或 `#插槽名` 。

- 通信插槽就利用属性值接收，**接收通信的属性值是变量**，可直接使用。

**子组件**

```javascript
<template><div>

    <slot></slot>    //默认插槽
    <slot name="slot2"></slot>    //具名插槽
    <slot name="slot3" msg="hello"></slot>    //具名通信插槽

</div></template>
```

---

### 动态组件

**概念**：component标签占位符，实现子组件的动态显示和隐藏，可用于实现路由

```javascript
<script>
    import Child from '@/compoents/Child.vue'
    export default{
        component:{
            Child:Child
        },
        data(){
            return{
                key1:Child
            }
        }
    }
</script>

<template><div>

    <component is="Child"></component> //只显示is属性值名字的子组件
    <component :is="key1"></component>

</div></template>
```

---

### 生命周期函数

**概念**：vm对象从创建到销毁的整个生命过程

| 生命周期函数        | 执行时机     | 实例                     |
|:-------------:|:--------:|:----------------------:|
| beforeCreated | vm对象创建前  | \                      |
| created       | vm对象创建后  | 请求报文发送、Eventbus接收、前端路由 |
| beforeMount   | DOM对象创建前 | \                      |
| mounted       | DOM对象创建后 | 操作DOM                  |
| beforeUpadata | 数据变化，更新前 | \                      |
| updata        | 数据变化，更新后 | \                      |
| beforeDestroy | 标签销毁前    | \                      |
| destroyed     | 标签销毁后    | \                      |
| deactivated   | 缓存后      | \                      |
| activated     | 缓存激活后    | \                      |

+ vue执行过程：通过mian.js入口对根组件进行Vue实例化，从而开启对树型后代组件的遍历，实现全部组件Vue实例化，最后通过vue-template-compilter对vm对象编译解析得到DOM对象进行显示。

---

## 组合式API

### 响应式数据

**概念**：值变会自动重新渲染的数据，只有需要渲染到页面上的数据才需要绑定。

#### reactive函数

```javascript
<script setup>    //无需export default
    import { reactive } from 'vue' 
    const key1 = reactive({data:5})
    method1(){
        key.data++
    }
</script>

<template><div>

    <button @click="method1"> {{ key1.data }} <button>

</div></template>
```

+ 要用对象包装，直接修改key1会导致**响应式丢失**

---

#### ref函数

```javascript
<script setup>
    import { ref } from 'vue' 
    const key1 = ref(5)
    method1(){
        key.value++
    }
</script>

<template><div>

    <button @click="method1"> {{ key1 }} <button>

</div></template>
```

+ ref自动包裹一层对象，在script中需要`.value`才能访问到，在template中可以直接使用。

+ 简单数据类型用ref，复杂数据类型用reactive，当然都用ref也可以。

---

**手写ref函数**：基于Proxy对象代理类，内部提供额外变量控制查改，避免无限递归

```javascript
const dataRef = ref({
    name: "Mike",
    favor: {food: "意大利面",sport:"足球"},
    subject: [
        "9856325",
        {name: "english",score: 98,},
        {name: "math",score: 90,}
    ]
})
function ref(data){
    data = {value:data}
    data = proxyFun(data)
    return data
}
function proxyFun(obj){
    return new Proxy(obj,{
        get:(target,property)=>{//内部提供额外变量
            if(typeof(target[property])==="object"){
                return proxyFun(target[property])
            }else{
                console.log(`获取了${property}数据`)
                return target[property]
            }
        },
        set:(target,property,newValue)=>{
            console.log(`修改了${property}数据`)
            target[property] = newValue
        }
    })
}
```

---

**Vue2响应式原理（已废弃）**：基于Object.defineProperty静态方法，使用额外的闭包变量控制查改，避免无限递归

```javascript
const listAPI = {
    data: () => {
        return {
            name: "Mike",
            favor: {food: "意大利面",sport:"足球"},
            subject: [
                "9856325",
                {name: "english",score: 98,},
                {name: "math",score: 90,}
            ]
        }
    }
}
const data = listAPI.data()
function addReactVue2(obj) {
    Object.keys(obj).forEach((key) => {
        definePropertyFun(obj, key, obj[key])
    })
}
function definePropertyFun(obj, key, value) {//闭包变量value
    if (typeof(value)==="object") {
        addReactVue2(value)
    } else {
        Object.defineProperty(obj, key, {
            get: () => {
                console.log(`获取了${key}数据`)
                return value    //使用额外的闭包变量控制查，避免无限递归
            },
            set: (newValue) => {
                console.log(`修改了${key}数据`)
                value = newValue    //使用额外的闭包变量控制改，避免无限递归
            }
        })
    }
}
addReactVue2(data)
```

---

### 计算属性

**概念**：也是一种响应式数据，具有额外的特性：计算属性的值会根据其计算依赖的响应式数据变化而重新计算。

```javascript
<script setup>
    import { ref,computed } from 'vue' 
    const key1 = ref(6)
    const key2 = ref(9)
    const key3 = computed(() => key1 + key2)
</script>
```

---

### 监听器

```javascript
<script setup>
    import { ref,watch } from 'vue' 
    const key1 = ref(6)
    watch(key1,(new,old)=>{
        console.log(`key1值变化了,新值为${new},旧值为${old}`)
    },{
        immediate:true,    //开始执行一次
        deep:true    //对象为复杂数据类型，递归实现深度监听
    })
</script>
```

---

### 生命周期函数

```javascript
<script setup>
    import { onUpdate } from 'vue' 
    onUpdate(()=>{
        console.log(`网页发生更新了`)
    })
</script>
```

+ setup中的生命周期函数可以写多个，不会被覆盖，按顺序执行，而在列表式API中只能有一个生命周期函数

+ setup没有beforeCreated和Created。

---

### 组件引入

**概念**：组件引入分局部引入和全局引入，vue3局部引入后是直接使用，无需注册，全局引入主要有以下两种方式

**方式一：函数形式全局引入**

```js
import { createApp } from 'vue';
import App from './App.vue'; 
import MyComponent from './MyComponent.vue';  
const app = createApp(App);

app.component('MyComponent', MyComponent);  

app.mount('#app');
```

**方式二：插件形式全局引入**

```js
//MyComponentsPlugin.js
export default {
  install(app, options) {
    app.component('MyComponent', MyComponent);
    //其他组件注册或插件逻辑
  }
}

// main.js 或其他入口文件  
import { createApp } from 'vue';  
import App from './App.vue';  
import MyComponentsPlugin from './MyComponentsPlugin';  
const app = createApp(App);

app.use(MyComponentsPlugin);

app.mount('#app');
```

---

### 组件通信

#### 自定义属性（父传子）

**父组件**

```javascript
<script setup>
    import Child from '@/compoents/Child.vue' //引入后无需注册
</script>

<template><div>

    <Child color="red" msg="123"></Child> //父组件给自定义属性传值

</div></template>
```

**子组件**

```javascript
<script setup>
    const props = defineProps({
        color:String,
        msg:String
    })
</script>

<template><div>

    <div :style="`color:${color}`"> {{ msg }} </div>

</div></template>
```

+ script内访问自定义属性需要用`props.color`，template直接使用`color`

---

#### 自定义事件（子传父）

**父组件**

```javascript
<script setup>
    import Child from '@/compoents/Child.vue'
    method1(val){
        console.log(`接收到子组件的信息为${val}`)
    }
</script>

<template><div>

    <Child @textEvent="method1"></Child> //绑定自定义事件

</div></template>
```

**子组件**

```javascript
<script setup>
    import { ref } from 'vue' 
    const key1 = ref(value1)
    const emits = defineEmits(['textEvent']) //声明自定义事件
    method1(){
        console.log(`处于发送时机`)
        emits('textEvent',key1.value) //触发自定义事件
    }
</script>

<template><div>

    <div @click="method1"> {{ key1 }} </div>

</div></template>
```

- script内无需用this指针访问变量，this指针也不用指向本vm实例对象。

---

#### provide通信（顶传底）

**顶部发送方组件**

```javascript
<script setup>
    import { ref,provide } from 'vue' 
    const key1 = ref(56)
    provide('textPhone',key1.value)    //发送
</script>
```

**底部接收方组件**

```javascript
<script setup>
    import { ref,inject } from 'vue' 
    const key1 = ref(null)
    key1.value = inject('textPhone')    //接收
</script>
```

+ 提供响应式数据时，为不产生**响应式丢失**，需传的信息封装为计算属性

---

#### ref获取标签（子传父，父调子）

```javascript
<script setup>
    import { ref } from 'vue'
    import Child from '@/compoents/Child.vue'
    const div1 = ref(null)
    console.log(`标签显示内容为${div1.value.innerHtml}`)
</script>

<template><div>

    <div ref="div1">测试</div>
    <Child ref="div2"></Child>

</div></template>
```

**setup语法糖中，子组件必须设置暴露，才能被父组件访问**

```javascript
<script setup> 
    defineExpose({
        暴露内容
    })                               
</script>
```

---

#### 全局状态管理插件Pinia

**概念**：全局状态管理，存储全局对象，实现万能的跨组件通讯

**在src/stores/xxx.js下新建文件并配置**

```javascript
import { defineStore } from 'pinia'
export const useXxxStore = defineStore('xxx',()=>{
    同setup语法糖的属性/方法/计算属性定义方式
    return {属性/方法/计算属性}    //作为局部变量必须返回
})
```

**在js入口文件配置**

```javascript
import { createApp } from 'vue'
import App from '@/App.vue'
import { createPinia } from 'pinia'
const app = createApp(App)
app.use(createPinia())    //使用Pinia插件
```

**在vue组件中使用**

```javascript
<script setup>
    import { useXxxStore } from './src/stores/xxx.js'
    import { storeToRefs } from 'pinia'
    const xxxStore = useXxxStore() //引入接收全局对象
    xxxStore.属性/方法/计算属性 //无解构时的使用方式
    const { 方法 } = xxxStore //方法直接解构
    const { 属性/计算属性 } = storeToRefs(xxxStore) //属性解构
<script>
```

- storeToRefs函数进行解构，解决**响应式丢失**的问题

---

## css相关

```javascript
<style lang=“less” scoped>
    对应css语法    
</style>
```

- lang：配置解析为less

- scoped：在本vue组件中，为标签添加上独有的自定义属性值，为css选择器交集选择该自定义属性，从而使得本vue组件的css，只能生效于本vue组件的标签中。

- **公共css**，引入js唯一入口文件

---

## vue-router

**概念**：监听hash地址的变化，显示不同的画面，会产生历史记录

### 基本用法

**在src/router/index.js下新建文件并配置**

```javascript
import { createRouter createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue //自动注册
//更多组件引入省略

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {path:'/home',component:Home},
    {path:'/',redirect:'/home'},
    {path:'/contents',component:Contents,redirect:'/home',
      children:[    //嵌套子路由
        {path:'usefulurl',component:UsefulUrl},
        {path:'sorting',component:Sorting,
          children:[
            {path:'select',component:SortingSelect},
            {path:'bubble',component:SortingBubble},
            {path:'insert',component:SortingInsert},
            {path:'merge',component:SortingMerge},
            {path:'bad',component:SortingBad},
            {path:'radix',component:SortingRadix},
            {path:'shell',component:SortingShell},
            {path:'quick',component:SortingQuick},
            {path:'heap',component:SortingHeap},
          ]
        },
        {path:'mynotes',component:MyNotes},
      ]
    }
  ]
})

router.beforeEach((to,from,next)=>{    //路由前置守卫
  const reg = /^([/]contents[/]sorting){1}/i
  if(reg.test(from.fullPath)){
    for(let i=0; i<100; i++){
      clearInterval(i)
    }
  }
  next()
})

router.afterEach(()=>{    //路由后置守卫
  window.scrollTo(0,0)
})

export default router
```

- path：路径，component：显示组件，redirect：重定向

**在js入口文件配置**

```javascript
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
const app = createApp(App) //注册并实例化根组件APP，替换index.html的#app标签
app.use(router)    //使用路由插件
```

**在vue组件中使用**

```javascript
<template><div>

    <router-view></router-view>

</div></template>
```

---

### 动态路由

#### props属性

**props是布尔值**

```js
const routerItem = {
    path:"/movies/:id",    //假如路由是/movies/98
    component:Movies,
    props:true
}
```

- Movies组件接收到`props.id=98`

---

**props是对象**

```js
const routerItem = {
    path:"/movies/:id",    //假如路由是/movies/98
    component:Movies,
    props:{key1:'value1'}
}
```

- Movies组件接收到`props.key1='value1'`

---

**props是函数**

```js
const routerItem = {
    path:"/movies/:id",    //假如路由是/movies/98
    component:Movies,
    props:(route)={    //相较于对象，可以获取使用:id参数
        return{
            key2:'value2',
            moviesId:route.params.id
        }
    }
}
```

- Movies组件接收到`props.key2='value2'`和`props.moviesId=98`

---

## Vue3项目搭建与组成

**1.使用vue官方脚手架**

```git
npm init vue@latest
```

**2.安装依赖**

```javascript
npm i
```

**3.启动**

```git
npm run dev
```

**4.打包**

```git
npm run build
```

---

| vue3项目文件夹目录                                 | 说明               |
|:-------------------------------------------:|:----------------:|
| node_moduled、package.lock.json、package.json | node.js项目配置文件    |
| .gitignore、README.md                        | git相关配置文件        |
| vite.config.js                              | vite模块配置文件       |
| eslintrc.js                                 | 安装ESlint模块后的配置文件 |
| public                                      | 动态资源存储文件夹        |
| src                                         | 静态资源和代码存储文件夹     |
| index.html                                  | 单页面的html唯一入口文件   |

| src文件夹目录   | 说明                          |
|:----------:|:---------------------------:|
| main.js    | js唯一入口文件，打包入口文件             |
| assets     | less、css文件、图片等，第三方静态资源也存放在这 |
| App.vue    | vue根组件                      |
| views      | 前段路由表引入和展示的vue组件            |
| components | 封装的可复用的vue组件                |
| router     | 存前端路由路由表配置文件index.js        |
| stores     | 存pinia插件类构造配置文件counter.js   |
| utils      | 自封装的js模块                    |
| api        | 自封装的同类请求方法                  |

---

## 编程式开发

|       | 声明式开发             | 编程式开发                             | 参数组成 = 返回             |
|:-----:|:-----------------:|:---------------------------------:|:---------------------:|
| 组件定义  | vue文件             | defineComponent函数                 | 状态逻辑+vNode对象 = VNode类 |
| 组件实例化 | 标签形式\<>           | h/createElement函数                 | 组件名+属性+子组件 = vNode对象  |
| 写入位置  | vue文件的\<template> | defineComponent第1个参数的render函数选项返回 | /                     |

### h函数

**概念**：h函数是等效于以标签形式\<>，创建vNode对象的函数方法

```ts
function h(
  type: string | Component,    //第一个参数：标签名或vue组件
  props?: object | null,    //第二个参数，标签各种属性，但不能使用vue指令
  children?: Children | Slot | Slots    //第三个参数，孩子vNode对象
): VNode    //返回：vNode对象
```

**手写h函数**

```javascript
function myH(tag,props,children){
    //dom对象创建
    if(typeof(tag) !== "string")return
    const el = document.createElement(tag)

    //props标签属性绑定
    for(const key in props){
        const value = prorps[key]
        switch(key){
            case "class":
                el.className = value
                break
            case "style" :
                bindStyle(el,value)
                break
            default:
                if(/^on[A-Z]/.test(key)){
                    el.addEventListener(getEvent(key),value)
                }else{
                    el.setAttribute(key,value)
                    break
                }
        }
    }

    //孩子绑定
    for(const key in children){
        const value = children[key]
        if(typeof(value) === "string"){
            el.append(document.createTextNode(value))
        }else{
            el.append(value)
        }
    }

    //返回dom对象
    return el
}
function bindStyle(el,obj){
    for(const key in obj){
        const value = obj[key]
        el.style[key]=value
    }
}
function getEvent(str){
    return str.silce(2).toLoewrCase()
}

const VNode = myH('div',{
    id:"box",
    class:"active",
    style:{color:"red",frontSize:"12px"},
    "data-selfProps":"selfPropsValue",
    onClick:()=>{console.log("点击了")}
},[
    "我是div标签",
    myH('span',null,"我是span标签"),
    myH('a',{href:"#"},"我是a标签")
])

document.querySelector("#app").append(VNode)
//等效于createApp(App).mount("#app")
```

---

### withDirectives函数

**概念**：让vNode对象能够使用vue的原生或自定义指令

```ts
function withDirectives(
    vnode: VNode,    //第一个参数：vNode对象
    directives: DirectiveArguments    //第二个参数：vue指令应用数组
): VNode    //返回：vNode对象

type DirectiveArguments = Array<    //注意是：数组嵌套数组
  | [ObjectDirective]    //[vue指令对象]
  | [ObjectDirective, any]    //[vue指令对象，传入binding参数的值]
>
```

**用法**

```js
const MyComponent = defineComponent({
  directives:{
    colorOnMounted:{
      mounted(el,binding){
        el.style.color=binding.value
      }
    },
    fontSizeOnMounted:{
      mounted(el,binding){
        el.style.fontSize=binding.value
      }
    }
  },
  setup(){
    return ()=>{
      return withDirectives(
                 h('div','测试'),
                 [[colorOnMounted,'red'],
                 [fontSizeOnMounted,'18px']])
    }
  }
})
```

---

### defineComponent函数

**概念**：在定义 Vue 组件时提供类型推导的辅助函数，用于无vue文件的组件开发

```ts
function defineComponent(
    component: ComponentOptions    //第一个参数：vue列表式API选项
):ComponentConstructor    //返回：vue组件（VNode类）
```

**用法**

```js
import { defineComponent,defineProps,h } from 'vue'
export default defineComponent({
    name:'MyButton',    //组件名
    props:{label:String,onClick:Function},    //自定义属性
    setup(props){    //预处理函数,参数接收自定义属性
        const label2 = '[' + props.label + ']'
        return {
            label2:props.label,
            onClick:props.onClick
        };
    }
    render(){    //vue会自动接收解构所有属性，同时不需要.value（如果有）
        return h('button', {
            onClick: onClick
        }, label2);
    }
});
```

---

### toRaw函数

**概念**：获取响应式对象的原始 JavaScript 对象，取消proxy代理，以能够兼容其他库

```ts
function toRaw<T>(proxy: T): T    //参数:响应式数据，即proxy代理对象
```

---

### toRef函数

**概念**：返回同源的响应式对象，让js的值传递变成引用传递

```ts
const state = reactive({
  foo: 1,
  bar: 2
})
const fooRef = toRef(state, 'foo')
fooRef.value++    //现在state.foo值为2
state.foo++    //现在fooRef.value值为3

const fooRef2 = ref(state.foo)//不同源，因为ref接收到的是一个纯数值
```

---

### watchEffect函数

**概念**：立即运行一个副作用函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。

```js
function watchEffet(
  effect: EffectFuntion,//第一个参数副作用函数
  options?: WatchEffectOptions
): StopHandle    //返回：停止该副作用的函数
```

---
