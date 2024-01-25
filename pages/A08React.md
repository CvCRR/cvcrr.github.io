<h1 align="center">React</h1>

<div align="right">最近更新时间：2024-01-25</div>

## 介绍

|        | 内容                             |
|:------:|:------------------------------:|
| 概念     | 前端开发框架                         |
| 特点     | 组件式开发，相较于Vue：生态更丰富、写法更贴近JS原生语法 |
| 集成开发环境 | VScode(使用creat-react-app)      |

---

## 创建项目

```git
npx creat-react-app [项目名称]
```

| 项目目录                                        | 内容           |
|:-------------------------------------------:|:------------:|
| node_modules、package-lock.json、package.json | nodejs项目相关配置 |
| .gitignore、README.md                        | git相关配置      |
| public                                      | 不打包资源目录      |
| src/App.js                                  | react根组件     |
| src/index.js                                | js入口文件       |

---

## JSX语法

**概念**：JSX语法是JS和HTML的模板结构，在HTML中使用{}，{}内识别为JS语法。

### 渲染写法

```javascript
const data = "Hello World"
const value = "#" 
const list = {
    {id:1001,name:"Vue"},
    {id:1002,name:"React"},
    {id:1003,name:"Angular"}.    
}
const isShow = true
const condition = 0 //0 1 2
function getDOM(
    if(condition===0){return <div>条件0显示</div>}
    if(condition===1){return <div>条件1显示</div>}
    if(condition===2){return <div>条件2显示</div>}
)
function App(){
    return (<div>

        {/*内容渲染、属性渲染：{}即可*/}
        <a href={value}> {data} <a>

        {/*循环渲染：基于list.map()返回的标签数组*/}
        <ul>
            {list.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>

        {/*条件渲染：基于逻辑中断与、基于三目运算符、基于条件返回函数*/}
        {isShow && <span>Hello World</span>}
        {isShow ? <span>Hello World<span/> : <span>Nothing</span>}
        {getDOM()}

    </div>)
}
export default App
```

+ 可见React在{}的支持下需要**灵活运用JS原生语法**，Vue则自创对应的指令

---

### 事件绑定写法

```javascript
const method1 = (e){console.log(`接收事件对象为${e}`)}
const method2 = (num){console.log(`接收参数为${num}`)}
const method3 = (num.e){console.log(`接收参数为${num},接收事件对象为${e}`)}
function App(){
    return (<div>
        <button on事件类型={method1}>点击</button>
        <button on事件类型={()=>method2(”123“)}>点击</button>
        <button on事件类型={()=>method3(“123”,e)}>点击</button>
    </div>)
}
export default App
```

+ `on事件类型`是标签的原生属性，接收值为回调函数，传参时一定要写成**箭头函数返回函数调用**，若不用箭头函数，则接收值变为函数调用得到的返回值。Vue事件绑定指令中则不需要箭头函数。

---

### 响应式数据useState

**概念**：实现值变重渲的响应式效果，需要使用useState和其返回的修改函数。

```javascript
import {useState} from 'react'
function App(){
    const [count,setCount] = useState(0)    //数组解构接收
    const method1 = ()=>{
        setCount(count++)    //响应式数据修改的写法
        count++    //下列写法不具有响应式
    }
    const [form,setForm] = useState({name:"Jack"})
    const method2 = ()=>{
        setForm({
            ...form,
            name:"John"
        })    //响应式对象数据修改的写法，基于对象展开与重写覆盖
    }
    return (<div>
        <button onClick={method1}>{count}</button>
        <button onClick={method2}>{form.name}</button>
    </div>)
}
export default App
```

+ 可见useState返回修改函数的**接收参数**是**修改后的值**，Vue的ref和reactive则直接修改值

---

### 双向数据绑定

```javascript
import {useState} from 'react'
const [value setValue] = useState('')
function App(){
    return (<div>
        <input
            value={value}
            onChange={(e)=>{setValue(e.target.value)}}
        />
    </div>)
}
export default App
```

+ 可见React双向数据绑定**需手动实现**，Vue则直接使用v-model双向数据绑定指令

---

## 组件使用

```javascript
function Child(){
    return (
        <div>子组件</div>
    )
}
function App(){
    return (<div>
        {/*组件使用，标签形式直接使用*/}
        <Child></Child>
    </div>)
}
export default App
```

---

## 组件通信

### 自定义属性

#### 父传子，自定义属性传值

```javascript
function Son(props) {
    return (<div>
        <div style={{color:props.color}}></div>
    </div>)
}
function App(){
    const color = "red"    //待发送信息
    return (<div>
        <Son color={color}></Son>    //可传：变量、值、函数、对象、JSX
    </div>)
}
```

+ 大同于Vue，相较于Vue，React子组件只用声明props即可，不用注册和类型定义父组件的自定义属性`const props = defineProps({color:String})`

---

#### 父传子，插槽传值，props特殊属性children接收

```javascript
function Son(props) {
    return (<div>
        子组件接收为：{props.children}
    </div>)
}
function App(){
    return (<div>
        <Son>
            <span>Hello World</span>    //待发送信息
        </Son>
    </div>)
}
```

+ 可见Vue的默认插槽写法在React中通过props特殊属性children接收

---

#### 子传父，自定义属性传递函数

```javascript
function Son(props) {
    const color = "red"    //待发送信息
    const onClick = ()=>{
        props.onGetSonMsg(color)
    }
    return (<div>
        <button onClick={onClick}>发送</button>
    </div>)
}
function App(){
    const getMsg = (val)=>{
        console.log(`子组件传的值是{val}`)
    }
    return (<div>
        <Son onGetSonMsg={getMsg}></Son>
    </div>)
}
```

+ 可见Vue子传父自定义事件的底层实现原理是基于自定义属性传递函数，只是Vue区别并封装了defineEmits，emit的函数供子组件使用。

---

#### 亲兄弟通信，子传父后父传子

```javascript
import {useState} from 'react'
function A(props) {
    const color = "red"    //待发送信息
    const onClick = ()=>{
        props.onGetSonMsg(color)
    }
    return (<div>
        <button onClick={onClick}>发送</button>
    </div>)
}
function B(props) {
    return (<div>
        <div style={{color:props.color}}></div>
    </div>)
}
function App(){
    const [color,setColor] = useState('')    //中间存储
    const getMsg = (val)=>{
        console.log(`A组件传的值是{val}`)
        setColor(val)
    }
    return (<div>
        <A onGetSonMsg={getMsg}></A>
        <B color={color}></B>
    </div>)
}
```

---

### ref获取标签（父调子，子传父）

```javascript
import {useRef} from "react"
const box = useRef(null)
function App(){
    return (<div>
        <div ref={box}></div>
    </div>)
}
export default App
```

- 大同于Vue，React的ref赋值用属性渲染{}，Vue的ref赋值用同名字符串

---

### Context机制（顶传底）

```javascript
import {createContext,useContext} from "react"
const MsgContext = createContext()//①创建Context对象，在顶/底都能引用的地方
function A(props) {
    return (<div>
        <B></B>
    </div>)
}
function B(props) {
    const color = useContext(MsgContext)//③底使用Context获取数据
    return (<div>
        <div style={{color:color}}></div>
    </div>)
}
function App(){
    const color = "red"    //待发送信息
    return (<div>
        <MsgContext.Provide value={color}>//②顶使用Context并发送数据
            <A></A>
        <MsgContext.Provide>
    </div>)
}
```

+ 可见Vue的provide和inject函数直接使用，依赖于键值对形式的存取更加方便，而React的语法步骤多，存依赖于Context对象的Provide标签，取依赖于同个Context对象的useContext函数读取。

---

## 生命周期与监听器useEffect

| useEffect第二个参数 | 第一个回调函数执行时机 | 类似于Vue         |
|:--------------:|:-----------:|:--------------:|
| 不写             | 组件加载，组件更新   | mounted和updata |
| []             | 组件加载        | mounted        |
| [变量]           | 该变量变化       | 监听器watch       |

**常见应用：数据的请求渲染**

```javascript
import {useState,useEffect} from "react"
function App(){
    const [list,setList] = useState([])
    useEffect(async()={
        const res = await fetch("www.123.com")
        cosnt jsonRes = JSON.parse(res)
        setList(jsonRes.data)
    },[])
    return (<div>
        {list.map((item)=> <li key={item.id}>{item.name}</li>}
    </div>)
}
```

**清除副作用**

```javascript
import {useState,useEffect} from "react"
function Son(){
    useEffect(()={
        const timer = setInterval(()=>{console.log('定时器执行中')},1000)
        return ()=>{    //组件注销时执行，类似于Vue的destroyed
            clearInterval(timer)
        }
    },[])
    return (<div>
        Son组件
    </div>)
}
function App(){
    const [show,setShow] = useState(true)
    return (<div>
        {show && <Son/>}
        <button onClick={()=>setShow(false)}>注销Son组件</button>
    </div>)
}
```

---

## 自定义Hook函数

**概念**：自定义useXxx开头的函数，实现逻辑的封装和复用，类似于创建Xxx类，面向对象的编程思想，同Vue的组合式函数的思想和实现原理

```javascript
function useXxx(){
    React相关变量/函数的逻辑定义
    return {供解构使用的属性/方法}    //作为局部变量必须返回
}
```

+ 所有Hook函数（useXxx）不能使用于组件外，不能使用于if和for的内部，必须在某组件的最外层作用域中使用

---

## 样式写法

```javascript
import './index.css'
const style = {
    color:'red',
    fontSize:'50px'
}
function App(){
    return (<div>
        <div style={style}>行内样式<div>
        <div className="foo">引入样式<div>
    </div>)
}
export default App
```

+ webpack的js引入方式
