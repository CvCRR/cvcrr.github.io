<h1 align="center">TypeScript</h1>

<div align="right">最近更新时间：2024-01-04</div>

## 介绍

|        | TypeScript                                 |
|:------:|:------------------------------------------:|
| 概念     | TypeScript是JavaScript的超集，TypeScript增加了类型支持 |
| 优势     | 在写代码时就检查出类型错误，并且有成员提示                      |
| 语言类型   | JavaScript的扩展语言、非独立的、静态语言                  |
| 运行平台   | 需先编译成js代码，才能运行于浏览器、nodejs                  |
| 编译工具   | npm全局模块包typescript，对应命令tsc（执行编译）           |
| 简化运行工具 | npm全局模块包ts-node，对应命令ts-node（执行运行）          |
| 集成开发环境 | 推荐VSCode                                   |

+ 超集：JavaScript有的TypeScript都有，且TypeScript还有JavaScript没有的

+ 静态语言：在编译时进行类型检查；动态语言：在运行时进行类型检查

---

## 类型注解

**概念**：给变量添加类型约束，以供VScode进行**类型检查**。

### 数据类型

| 数据类型    | 数据类型语法示例                    | 说明                                  |
|:-------:|:---------------------------:|:-----------------------------------:|
| 数字型     | `number`                    | \                                   |
| 字符型     | `string`                    | \                                   |
| 布尔型     | `boolean`                   | \                                   |
| 空       | `null`                      | \                                   |
| 未定义     | `undefined`                 | \                                   |
| 独一无二    | `symbol`                    | \                                   |
| 对象      | `object`                    | \                                   |
| 数组      | `Array<number>`             | 不推荐                                 |
| 数组      | `number[]`                  | 推荐                                  |
| 数组内联合类型 | （number\|string)[]          | 数组内可数字型可字符型                         |
| 联合类型    | number\|string[]            | 可数字型、可字符型数组                         |
| 别名      | `别名`                        | 类型别名，别名定义见下                         |
| 对象结构类型  | `{属性:数据类型,方法():数据类型}`       | 对象必须实现的内部结构的对象类型注解                  |
| 接口      | `接口`                        | 对象结构类型的专用别名，类进行接口实现，接口定义见下          |
| 元组      | `[number,number]`           | 元组，一种定长数组                           |
| 自定义类型   | `类`                         | 即自己写的类                              |
| 字面量类型   | `18`                        | 值就是数据类型，结合联合类型\|用以提供固定可选值           |
| 枚举      | `枚举`                        | 有键值对的固定可选值，枚举定义见下                   |
| 无返回     | `void`                      | 表示函数无返回值                            |
| 任何类型    | `any`                       | 失去类型提示、类型检查                         |
| 函数类型    | `(形参:数据类型,形参:数据类型)=>返回数据类型` | 函数表达式进行类型注解的特殊写法                    |
| 交叉类型    | `接口&接口`                     | 同时具有两个接口的所有成员，相同时相较于接口继承会报错，交叉类型会重载 |
| 泛型      | `泛型`                        | 函数调用时，接口使用时，类实例化时才各自赋予具体类型，泛型定义如下   |

---

#### 别名

```typescript
type 别名 = 数据类型
let 变量:别名 = 值

//函数类型别名
type 函数类型别名 = (形参:数据类型,形参:数据类型)=>返回数据类型
let 函数名:函数类型别名 = (形参,形参)=>{函数体}

//对象结构类型别名
type 对象结构类型别名 = {属性:数据类型,方法():数据类型}
let 对象名:对象结构类型别名 = (
    属性:值
    方法(){方法体}
)
```

---

#### 接口

**基础语法**

```typescript
interface 接口{    //相较于别名，没有等于号，关键词不同
    属性:数据类型;    //用逗号结束也可以、直接省略也可以，写一行不能省
    属性:数据类型;
    方法():数据类型;
    方法(形参:数据类型):数据类型;
}
let 对象:接口 = {
    必须实现接口的所有成员
}
```

**与接口等效的type**

```typescript
type 别名 = {
    属性:数据类型; //用逗号结束也可以、直接省略也可以，写一行不能省
    属性:数据类型;
    方法():返回数据类型;
    方法(形参:数据类型):返回数据类型;
}
let 对象:别名 = {
    对象体
}
```

**接口继承**：比type多的功能，接口存在的意义

```typescript
interface 子接口 extends 父接口 {
    扩展
}
```

**接口实现**：比type多的功能，接口存在的意义

```typescript
class 类名 implements 接口{
    必须实现接口的所有成员
}
```

**索引签名类型**：只规定必须实现的属性数据类型，不规定属性名，不规定属性个数

```typescript
interface 接口{
    [key:string]:number;    //对象下标都是字符串
}
let obj = {
    任意属性名:12,
    任意属性名:14,
}

//数组中的使用：泛型接口、索引签名
interface MyArray<Type>{
    [index:number]:Type;    //数组下标都是数字
}
let arr1:MyArray<number> = [1,3,5] 
arr1[0]
```

---

#### 枚举

```typescript
enum 枚举{
    属性 = 值; //用逗号结束也可以、直接省略也可以，写一行不能省
    属性 = 值;
    属性 = 值; //全部不赋值，默认从0开始自增
}
function 函数(形参:枚举){}
函数(枚举.属性)
```

+ 枚举在编译成js是普通对象。

+ 相较于用字面量与联合类型来提供固定可选值，枚举的编译效率更低，且不直观。

---

#### 泛型

**泛型函数**

```typescript
function 函数名<泛型>(形参:泛型,形参:泛型):泛型{函数体} //定义是占位符形式
函数名<number>(18,18)    //调用函数时，赋予泛型具体类型
函数名<string>('2','d')
函数名(18,18)    //可省略，支持类型推论，不准确就不省
函数名('2','d')
```

**泛型约束**：当访问声明为泛型的形参成员时出现报错，需要收缩类型

```typescript
//被解决的问题
function 函数名<泛型>(形参:泛型):泛型{
    console.log(`报错${形参.length}`)
}
//约束写法1
function 函数名<泛型>(形参:泛型[]):泛型[]{
    console.log(`可访问数组属性${形参.length}`)
}
//约束写法2
interface myLength{length:number}
function 函数名<泛型 extends myLength>(形参:泛型):泛型{
    console.log(`可访问数组属性${形参.length}`)
}
//约束写法3
function 函数名<泛型1,泛型2 extends keyof 泛型1>(形参1:泛型1,,形参2:泛型2){
    console.log(`可访问形参1的属性形参2为${形参1[形参2]}`)
}
函数名({name:'abc',age:18},'name')
函数名({name:'abc',age:18},'age')
```

---

**泛型接口**

```typescript
interface 接口<泛型>{
    属性:泛型;
    方法(形参:泛型):返回泛型;
}
let obj:接口<number>{    //接口使用时。赋予泛型具体类型，没有类型推论
    属性:18;
    方法(age){
        return age
    }
}
```

---

**泛型类**

```typescript
class 类名<泛型>{
    属性:泛型;
    方法(形参:泛型):返回泛型{
        return 形参
    };
}
const obj = new 类名<number>    //类实例化时。赋予泛型具体类型
obj.属性 = 18
obj.方法(18)

//实例2：实例化时可省略
class 类名<泛型>{
    属性:泛型;
    constructor(形参:泛型){
        this.属性 = 形参
    };
}
const obj = new 类名(200)    //支持类型推论，可省略
```

---

**泛型工具**：更像是接口生成工具

```typescript
interface 接口{
    属性1:number;
    属性2:number;
    方法(形参:string):string;
}
type 别名 = Partial<接口> //Partial按上述接口生成新的泛型接口，基于映射类型实现
type 别名 = Readonly<接口> //Readonly按上述接口生成新的只读接口
type 别名 = Pick<接口,属性1|属性2> //Pick按上述接口生成新的部分接口
type 别名 = Record<'属性3'|'属性4',数据类型> //Record批量给属性类型注解生成接口
```

---

### 变量类型注解

```typescript
let 变量:数据类型 = 值
```

---

### 函数类型注解

```typescript
function 函数(形参:数据类型,形参:数据类型):返回数据类型{
    函数体
    return 返回值
}

(形参:数据类型,形参:数据类型):返回数据类型 => 返回值

const 函数 = (形参:数据类型,形参:数据类型):返回数据类型 => 返回值

//注意这种用函数类型直接注解的方式
const 函数:(形参:数据类型,形参:数据类型) => 返回数据类型 = (形参,形参) => 返回值
```

**可选参数**

```typescript
function 函数(形参:数据类型,可选参数?:数据类型){
    函数体
    return 返回值
}
```

+ 可选参数只能出现在必选参数的后面

---

### 对象类型注解

```typescript
let 对象:{
    属性:数据类型;    //用逗号结束也可以、直接省略也可以，写一行不能省
    属性:数据类型;
    方法():返回数据类型;
    方法(形参:数据类型):返回数据类型;
} = {
    属性:值,
    属性:值,
    方法(){方法体},
    方法(形参){方法体}
}
let 对象:接口 = {
    必须实现接口的所有成员
}
```

**可选成员**

```typescript
function 函数(对象:{
    属性:数据类型;    //用逗号结束也可以、直接省略也可以，写一行不能省
    可选属性?:数据类型;
}){
    函数体
    return 返回值
}
```

+ 即当对象充当函数参数时，对象内部的成员是可设置为可选。

**映射类型**：根据已有类型的键或值，生成对象类型

```typescript
type 别名1 = 'x'|'y'|'z'
type 别名2 = {x:number,y:number,z:number} 
//根据已有类型的值生成对象类型
type 别名2 = {[Key in 别名1]:number}
//根据已有类型的键生成对象类型
type 别名3 = {[Key in keyof 别名2]:string}
```

+ 只能用在别名中，不能用于接口中

---

### 类的类型注解

```typescript
class 类名{
    变量:数据类型 = 值
    方法(形参:数据类型):返回数据类型{方法体}
}
class 类名 implements 接口{
    必须实现接口的所有成员
}
```

---

## 类型推论

**概念**：在符合以下情况时，可省略不写类型注解，仍然保有**类型检查**的机制，因为VScode会自动进行类型推论，暗自地添加上对应类型注解。

| 可省略类型注解的情况    | 类型推论的根据  |
|:-------------:|:--------:|
| 声明变量并初始化值     | 初始化值     |
| 函数返回值         | 返回值      |
| 泛型函数调用        | 传入函数参数   |
| 泛型类实例化给构造函数传值 | 传入构造函数参数 |

---

## 类型断言

**概念**：解决类型推论时，暗自添加地类型注解过于宽泛，导致访问不到独有属性的问题。

```typescript
const 变量 = 值 as 具体类型
const 变量 = <具体类型>值
```

+ 例如：a标签需要`as HTMLAnchorELement`

+ 得知标签的具体类型技巧：
  
  1. 打开网页，打开控制台，选中元素，有`$0`的当前被选中标识符。
  
  2. 在控制台的终端输入`console.dir($0)`，查看该标签对象的`_proto_`即可。

---

## 上下文注解

### typeof关键字

**概念**：扩展了js关键字`typeof`查询类型功能，可直接把查询结果作为数据类型。达到根据上下文来类型注解的目的。

```typescript
let p = {a:1,b:2,c:3}
console.log(typeof p) //原js功能
let q:typeof p //ts扩展功能
```

---

### 索引查询类型

**概念**：同js对象索引语法，找对象类型别名中的某键的类型。达到根据上下文来类型注解的目的。

```typescript
type 别名 = {属性1:数据类型1,属性2:数据类型2}
let 变量1:别名['属性1']
let 变量2:别名['属性2']
let 变量3:别名['属性1'|'属性2']
let 变量4:别名[keyof 别名]
```

---

## 类的可见性修饰符

**概念**：类的成员权限

```typescript
class 类名{
    public 成员 //公开
    protected 成员 //保护，子类可见，但实例对象不可见
    private 成员 //私有，子类、实例对象都不可见
    readonly 属性 //只读常量，只能在默认值和构造函数中进行赋值或修改
}
```

+ readonly不仅可用于类中，还可用于接口、对象中。

---

## 类型兼容性

**概念**：ts是根据数据类型的内在结构判断是否为同一类型，而不是外在名称，所以具有**相同内在结构，不同名称**的**接口与接口、接口与类、类与类、函数与函数之间**是可以用其一注解而接收另一实例化对象。

**内在结构考虑因素**：**参数个数、参数类型、参数返回值**
