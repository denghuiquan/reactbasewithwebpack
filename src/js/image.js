import React from 'react'
import image07 from '@/img/07-数据存取.png'

// console.log(JSON.stringify(image07)) 这里的打包构建根据当前目录结构输出了。
//  "../img/07-数据存取.8eab8fc8.png" 注定了dist文件目录只能部署在服务器根目录下

function Image () {
  return (<div className="login-title">
    <img className='image-center' src={image07} alt="Logo" />
  </div>
  )
}

export default Image
