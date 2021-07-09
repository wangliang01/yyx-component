
const routes = [
  {
    path: '/',
    component: () => import('../views/Layout/src'),
    redirect: '/form',
    children: [
      {
        path: '/form',
        name: 'Form',
        component: () => import('../views/form'),
        meta: { title: '表单' }
      },
      {
        path: '/input',
        name: 'Input',
        component: () => import('../views/input'),
        meta: { title: 'Input输入框' }
      },
      {
        path: '/input-number',
        name: 'InputNumber',
        component: () => import('../views/input-number'),
        meta: { title: '数字输入框' }
      },
      {
        path: '/upload',
        name: 'Upload',
        component: () => import('../views/upload'),
        meta: { title: '文件上传' }
      },
      {
        path: '/table',
        name: 'Table',
        component: () => import('../views/table'),
        meta: { title: '表格' }
      },
      {
        path: '/table-pro',
        name: 'TablePro',
        component: () => import('../views/table-pro'),
        meta: { title: '高级表格' }
      },
      {
        path: '/cascader',
        name: 'Cascader',
        component: () => import('../views/cascader'),
        meta: { title: '级联选择器' }
      },
      {
        path: '/batch-import',
        name: 'BatchImport',
        component: () => import('../views/batch-import'),
        meta: { title: '批量导入' }
      },
      {
        path: '/tree-org',
        name: 'TreeOrg',
        component: () => import('../views/tree-org'),
        meta: { title: '组织结构树' }
      },
      {
        path: '/print',
        name: 'Print',
        component: () => import('../views/print'),
        meta: { title: '打印' }
      },
      {
        path: '/tag',
        name: 'Tag',
        component: () => import('../views/tag'),
        meta: { title: 'Tag标签' }
      },
      {
        path: '/dialog',
        name: 'Dialog',
        component: () => import('../views/dialog'),
        meta: { title: 'Dialog弹出框' }
      },
      {
        path: '/drawer',
        name: 'Drawer',
        component: () => import('../views/drawer'),
        meta: { title: 'Drawer抽屉' }
      },
      {
        path: '/image-viewer',
        name: 'ImageViewer',
        component: () => import('../views/image-viewer'),
        meta: { title: 'ImageViewer图片预览' }
      },
      {
        path: '/question',
        name: 'Question',
        component: () => import('../views/question'),
        meta: { title: 'Question问号' }
      },
      {
        path: '/image',
        name: 'Image',
        component: () => import('../views/image'),
        meta: { title: 'Image图片' }
      },
      {
        path: '/table-dialog',
        name: 'TableDialog',
        component: () => import('../views/table-dialog'),
        meta: { title: 'TableDialog表格弹窗' }
      },
      {
        path: '/text',
        name: 'Text',
        component: () => import('../views/text'),
        meta: { title: 'Text文本' }
      }
    ]
  }

]

module.exports = routes

