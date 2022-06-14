// 代码拆分打包演示文件
import $ from 'jquery'
import _ from 'lodash'
console.log(_.join(['frontend', 'development'], ' '))
console.log($, '<-----$---')
console.log('main1.js')

const sum = (value1, value2) => {
 return value1 + value2
}

const obj = {
    name: 'huiquan',
    class: {
        id: 99987,
        classRoom: 998
    }
}

class Person {
    constructor(name) {
        this.name = name
    }
    say() {
        return `hello, ${this.name} is ${JSON.stringify(obj)}`
    }
}

console.log(new Person('huihui').say())