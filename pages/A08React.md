<h1 align="center">React</h1>

<div align="right">最近更新时间：2024-02-26</div>

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
| src/store                                   | redux目录      |

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

#### 父传子，插槽传值，特殊属性children接收

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

### 全局状态管理插件redux

**安装插件：工具包@reduxjs/toolkit、中间件react-redux**

```git
npm i @reduxjs/toolkit react-redux
```

**1.在src/store/modules/xxxStore.js下创建全局状态的xxx模块**

```javascript
import {createSlice} from '@reduxjs/toolkit'
const xxxStore = createSlice({    //用工具包方法创建store模块
    name:'xxx',
    initialState:{    //初始的state
        count:0,
        list:[]
    },
    reducers:{    //定义各动作的执行内容
        increment(state){
            state.count++
        },
        decrement(state){
            state.count--
        },
        setCount(state,action){    //传参动作，第2个参数action.payload接收
            state.count = action.payload
        },
        setList(state,action){    //待封装的异步动作
            state.count = action.payload
        }
    }
})
const {increment,decrement,setCount,setList} = xxxStore.actions
export {increment,decrement,setCount}//供组件dispatch触发的动作函数
/*    从xxxStore.actions获取的动作函数都是返回函数，
      之所以写法要函数返回函数，
      是因为dispatch()的参数是函数，
      函数返回函数执行后才符合参数要求，
      因此将setList自封装为异步动作函数写法如下（函数返回函数）
*/
const fetchList = ()=>{
    return aync (dispatch)=>{//获取dispatch的写法
        await axious.get('http://url')
        dispatch(setList())
    }
}
export {fetchList}//供组件dispatch触发的异步动作函数
//如果不写成函数返回函数，那么组件触发时就要写成dispatch(fetchList)，与默认写法不同

const reducer = xxxStore.reducer
export default reducer    //供根store挂载
```

**2.在src/store/index.js入口文件下，配置根store，将全部模块挂载到根模块上**

```javascript
import {configureStore} from '@reduxjs/toolkit'
import xxxReducer from './modules/xxxStore'
const store = configureStore({    //用工具包方法创建根store
    reducer:{
        xxx:xxxReducer
    }
})
export default store
```

**3.在src/index.js入口文件下，为React注入根store**

```javascript
import store from './store'
import {Provider} from 'react-redux'
root.render(
    <React.StrictMode>
        <Provider store={store}>    //用中间件包裹App，store属性绑定
            <App />
        </Provider>
    </React.StrictMode>
)
```

**4.在组件中使用全局状态xxx模块**

```javascript
import {useSelector,useDispatch} from 'react-redux'
import {increment,decrement,setCount,fetchList} from './store/modules/xxxStore'
function App(){
    const xxx = useSelector(state => state.xxx)    //用中间件获取数据
    const dispatch = useDispatch()    //用中间件获取动作触发器,参数是函数
    useEffect(()=>{
        dispatch(fetchList())
    },[dispatch])
    return (<div>
        <button onClick={()=>dispatch(increment())}>+</button>
        <span>{xxx.count}</span>
        <button onClick={()=>dispatch(decrement())}>-</button>
        <button onClick={()=>dispatch(setCount(0))}>恢复为0</button>
        <span>{xxx.list}</span>
    </div>)
}
```

| 关键对象      | 作用                      |
|:---------:|:-----------------------:|
| state状态   | 存储的全局状态                 |
| action对象  | 动作类型，唯一修改方法是dispatch某动作 |
| reducer函数 | 定义各`action.type`的执行的内容  |

+ 相较于Vue的pinia，redux需要依据动作才能对全局状态进行修改，且需要根store配置和根store数据引入，各自动作函数引入触发
+ redux调试工具（浏览器插件）：Redux DevTools

---

## 副作用函数useEffect（生命周期与监听器）

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
    useEffect(async()=>{
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
    useEffect(()=>{
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
import './index.css'//文件内容：.foo{color:'red',fontSize:'50px'}
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

---

## react路由

**1.安装依赖**

```git
npm i react-router-dom
```

**2.独立路由文件src/router/index.js，注册路由**

```javascript
import {createBrowserRouter} from 'react-router-dom'
import Login from '../page/Login'    //登陆页组件
import Article from '../page/Article'    //文章页组件
import More from '../page/More'    //更新页组件
import Board from '../page/More/Board'    //（更多页嵌套的）面板页组件
import About from '../page/More/About'    //（更多页嵌套的）关于页组件
const router = createBrowserRouter([    //路由注册
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/article/:id/:name',    //占位符，用于路由参数传参
        element:<Article/>
    },
    {
        path:'/more',
        element:<More/>,
        children:[    //嵌套路由
            {
                path:'/board',
                element:<Board/>
            },
            {
                path:'/about',
                element:<About/>
            },
        ]
    }
])
export default router
```

**3.在src/index.js入口js文件下，挂载路由**

```javascript
import {RouterProvider} from 'react-router-dom'
import router from './router'
root.render(
    <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>//路由挂载
    </React.StrictMode>
)
```

**4.各组件页面**

**登陆页：传参跳转**

```javascript
import {useNavigate} from 'react-router-dom'
function Login(){
    const navigate = useNavigate()
    return (<div>
        <div>登陆页</div>
        <button onClick={()=>{
            navigate('/article?id=1011&name=jack')
        }}>查询参数传参跳转至文章页</button>
        <button onClick={()=>{
            navigate('/article/1014/john')
        }}>路由参数传参跳转至文章页</button>
    </div>)
}
export default Login
```

**文章页：参数接收**

```javascript
import {useSearchParams,useParams} from 'react-router-dom'
function Article(){
    const [params1] = useSearchParams()
    const params2 = useParams()
    return (<div>
        <div>文章页</div>
        <div>查询参数{params1.get('id')}{params1.get('name')}</div>
        <div>路由参数{params2.id}{params2.name}</div>
    </div>)
}
export default Article
```

**更多页：嵌套路由的跳转与输出**

```javascript
import {Outlet,useNavigate} from 'react-router-dom'
function More(){
    const navigate = useNavigate()
    return (<div>
        <div>更多页</div>
        <button onClick={()=>{navigate('/more/board')}}>跳面板</button>
        <button onClick={()=>{navigate('/more/about')}}>跳关于</button>
        <Outlet/>    //嵌套路由输出位置
    </div>)
}
export default More
```

---
