//先引入mockjs
import Mock from 'mockjs'
//再将那些数据引进来
import banner from './banner.json'
import floor from './floor.json'


//模拟数据:第一个参数请求地址，第二个参数请求数据
Mock.mock('/mock/banner', {code:200,data:banner})
Mock.mock('/mock/floor', {code:200,data:floor})


