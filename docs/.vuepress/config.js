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
          sidebarDepth: 1
        },
        {
          title: '导航',
          path: 'nav',
          collapsable: false,
          sidebarDepth: 1
        }
      ],
      // 组件
      '/components/': [
        {
          title: '更新日志',
          path: 'changelog',
          collapsable: false,
          sidebarDepth: 1,
        },
        {
          title: '安装',
          path: 'installation',
          collapsable: false,
          sidebarDepth: 1,
        },
        {
          title: '快速上手',
          path: 'quickstart',
          collapsable: false,
          sidebarDepth: 1,
        },
        {
          title: '组件',
          path: 'button',
          collapsable: false,
          sidebarDepth: 1,
        }
      ]
    }
  }
}