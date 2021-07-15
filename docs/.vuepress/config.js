module.exports = {
  title: 'yyx-component', // 设置网站标题
  description: '基于ElementUI二次开发的组件库', // 描述
  port: 9527, // 端口
  displayAllHeaders: true, // 显示所有页面的标题链接
  head: [
    ['script', { src: 'https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js' }],
  ],
  plugins: [
    'demo-block', {
      jsfiddle: false, // 是否显示 jsfiddle 链接
      codepen: false, // 是否显示 codepen 链接
    }
  ],
  themeConfig: { // 主题配置
    nav: [ // 头部导航条
      {
        text: '主页',
        link: '/'
      },
      {
        text: '指南',
        link: '/guide/design'
      },
      {
        text: '组件',
        link: '/components/quickstart'
      },
      {
        text: '主题',
        link: '/theme/'
      },
      {
        text: '资源',
        link: '/resource/'
      }
    ],
    sidebar: {
      // 指南
      '/guide/': [
        {
          title: '设计规范',
          path: 'design',
          collapsable: false,
        },
        {
          title: '导航',
          path: 'nav',
          collapsable: false,
        }
      ],
      // 组件
      '/components/': [
        {
          title: '更新日志',
          path: 'changelog',
          collapsable: false,
        },
        {
          title: '安装',
          path: 'installation',
          collapsable: false,
        },
        {
          title: '快速上手',
          path: 'quickstart',
          collapsable: false,
        },
        {
          title: '组件',
          children: [
           'button',
           'form',
           'table',
           'tablepro',
           'block',
           'card',
           'text',
           'image',
           'image-list',
           'image-viewer'
          ]
        }
      ]
    }
  }
}