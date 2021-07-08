module.exports = {
  title: 'yyx-component', // 设置网站标题
  description: '基于ElementUI二次开发的组件库', // 描述
  port: 9527, // 端口
  themeConfig: { // 主题配置
    nav: [ // 头部导航条
      {
        text: '主页',
        link: '/'
      },
      {
        text: '指南',
        link: '/guide/'
      },
      {
        text: '组件',
        link: '/components/'
      },
      {
        text: '主题',
        link: '/theme/'
      },
      {
        text: '资源',
        link: '/resource/'
      }
    ]
  }
}