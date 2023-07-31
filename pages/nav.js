class button{
    constructor(name,click){
        this.element = document.createElement('div')
        this.name = name
        this.click = click
        this.Initstyle()
    }
    Initstyle(){
        this.element.innerHTML = this.name
        this.element.style.backgroundColor = `#eee`
        this.element.style.position = `fixed`
        this.element.style.left = 0
        this.element.style.top = 0
        this.element.style.width = '50px'
        this.element.style.height = `50px`
        this.element.style.textAlign = `center`
        this.element.style.lineHeight = `50px`
        this.element.style.cursor = `pointer`
        this.element.addEventListener(`click`,this.click)
        this.element.style.zIndex = `1`
        document.body.appendChild(this.element)
    }
}


const nav = document.createElement('div')
document.body.appendChild(nav)
nav.style.position = `fixed`
nav.style.top = 0
nav.style.left = 0
nav.style.backgroundColor = `#eee`
nav.style.width = '200px'
nav.style.height = `${window.innerHeight}px`
nav.style.padding = `4em 2em`
nav.style.overflow = `scroll`
window.addEventListener(`resize`,()=>{
    nav.style.height = `${window.innerHeight}px`
})


let flag = true
const buttonOp = new button(`收起`,()=>{
    if(flag){
        nav.style.display = `none`
        buttonOp.element.innerHTML = `打开`
        flag = false
    }else{
        nav.style.display = `block`
        buttonOp.element.innerHTML = `收起`
        flag = true
    }
})
const buttonTop2 = new button(`回到顶部`,()=>{
    window.scrollTo(0,0)
})
buttonTop2.element.style.width = `100px`
buttonTop2.element.style.left = `50px`


const preview = document.querySelector(`.markdown-preview`)
const chdlist = Array.from(preview.children)
const sqlist = []
chdlist.forEach((item)=>{
    if(item.localName === `h2` || item.localName === `h3` || item.localName === `h4` || item.localName === `h5` || item.localName === `h6`){
        sqlist.push(item)
    }
})


sqlist.forEach((item)=>{
    const box = document.createElement(`div`)
    box.style.width = `400px`
    nav.appendChild(box)
    if(item.localName===`h2`)box.innerHTML = `${item.innerHTML}`
    if(item.localName===`h3`)box.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${item.innerHTML}`
    if(item.localName===`h4`)box.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${item.innerHTML}`
    if(item.localName===`h5`)box.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${item.innerHTML}`
    if(item.localName===`h6`)box.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${item.innerHTML}`
    box.style.lineHeight = `30px`
    box.addEventListener(`click`,()=>{
        window.scrollTo(0,item.offsetTop)
    })
    box.style.cursor = `pointer`
})


const buttom = document.createElement(`div`)
nav.appendChild(buttom)
buttom.style.height = `500px`





