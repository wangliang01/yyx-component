
const routes = [
  {
    path: '/',
    component: () => import('../views/Layout/src'),
    redirect: '/form',
    children: [
      {
        path: 'button-more',
        name: 'ButtonMore',
        component: () => import('../views/button-more'),
        meta: { title: '更多按钮' }
      },
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
        path: '/batch-export',
        name: 'BatchImport',
        component: () => import('../views/batch-export'),
        meta: { title: '批量导出' }
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
        path: '/tips',
        name: 'Tips',
        component: () => import('../views/tips'),
        meta: { title: 'Tips提示' }
      },
      {
        path: '/image',
        name: 'Image',
        component: () => import('../views/image'),
        meta: { title: 'Image图片' }
      },
      {
        path: '/image-list',
        name: 'ImageList',
        component: () => import('../views/image-list'),
        meta: { title: 'ImageList图片列表' }
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
      },
      {
        path: '/card',
        name: 'Card',
        component: () => import('../views/card'),
        meta: { title: 'Card卡片' }
      },
      {
        path: '/descriptions',
        name: 'Card',
        component: () => import('../views/descriptions'),
        meta: { title: 'Descriptions' }
      },
      {
        path: '/block',
        name: 'Block',
        component: () => import('../views/block'),
        meta: { title: 'Block区块' }
      },
      {
        path: '/tree',
        name: 'Tree',
        component: () => import('../views/tree'),
        meta: { title: 'Tree树' }
      },
      {
        path: '/card-form',
        name: 'CardForm',
        component: () => import('../views/card-form'),
        meta: { title: 'CardForm 卡片表单' }
      },
      {
        path: '/container',
        name: 'Container',
        component: () => import('../views/container'),
        meta: { title: 'Container 容器' }
      },
      {
        path: '/checkbox',
        name: 'Checkbox',
        component: () => import('../views/checkbox'),
        meta: { title: 'Checkbox 容器' }
      },
      {
        path: '/table-mate',
        name: 'TableMate',
        component: () => import('../views/table-mate'),
        meta: { title: 'TableMate 前端分页表格' }
      },
      {
        path: '/transfer',
        name: 'Transfer',
        component: () => import('../views/transfer'),
        meta: { title: 'Transfer 选择器' }
      },
      {
        path: '/select',
        name: 'Select',
        component: () => import('../views/select'),
        meta: { title: 'Select 远程搜索' }
      },
      {
        path: '/select-pro',
        name: 'SelectPro',
        component: () => import('../views/select-pro'),
        meta: { title: 'SelectPro' }
      },
      {
        path: '/audit-form',
        name: 'AuditForm',
        component: () => import('../views/audit-form'),
        meta: { title: 'AuditForm 审核表单' }
      },
      {
        path: '/icon',
        name: 'Icon',
        component: () => import('../views/icon'),
        meta: { title: 'Icon 图标' }
      },
      {
        path: '/virtual-list',
        name: 'VirtualList',
        component: () => import('../views/virtual-list'),
        meta: { title: '虚拟表格' }
      },
      {
        path: '/data-board',
        name: 'DataBoard',
        component: () => import('../views/data-board'),
        meta: { title: '数据报表' }
      },
      {
        path: '/VirtualTable',
        name: 'VirtualTable',
        component: () => import('../views/virtual-table'),
        meta: { title: '虚拟表格2' }
      },
      {
        path: '/copy',
        name: 'Copy',
        component: () => import('../views/copy'),
        meta: { title: '复制' }
      },
      {
        path: '/date-picker',
        name: 'DatePicker',
        component: () => import('../views/date-picker'),
        meta: { title: 'datePicker' }
      },
      {
        path: '/tree-table',
        name: 'TreeTable',
        component: () => import('../views/tree-table'),
        meta: { title: 'TreeTable' }
      },
      {
        path: '/collapse',
        name: '折叠',
        component: () => import('../views/collapse'),
        meta: { title: 'y-collapse' }
      }
    ]
  }

]

module.exports = routes

