// import "@/font/iconfont.css"
// import "@/css/index.css"

function packFont() {
  // 01 创建一个容器元素
  const oEle = document.createElement("div")
  const sp = document.createElement("span")
  sp.className = "iconfont icon-linggan lg-icon"
  oEle.appendChild(sp)

  return oEle
}

// 把容器元素插入到document的body或者对应的元素后。
document.body.appendChild(packFont())
