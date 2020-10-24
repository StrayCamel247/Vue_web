/**
 * main组件名称
 *@desc 用于跨域调用接口，运行时，只需调用相应的接口名即可；打包编译无需注释代码，及其他操作
 *@author stray_camel
 *@param  -
 *@example 调用示例,title就是调试的接口名
 *   import title from './main'
 */

// /api 备用接口
// /develop 测试接口
// /master  线上接口
var title = 'http://localhost:8000/'
if (process.env.NODE_ENV === 'production') { // 不要动它
  title = 'http://localhost:8000/' // 不要动它
} else {
  title = 'http://localhost:8000/' // 可更改相应接口地址（注：请求失败或没用的，可直接替换成相应请求地址进行调试）
}
console.log(title)
export default title
