import '../fonts/iconfont.css'
import '../styles/index.scss'

// 导入Button组件
import YButton from './Button'
import YTable from './Table'
import YTablePro from './TablePro'
import YForm from './Form'
import YInputNumber from './InputNumber'
import YBackTop from './Backtop'
import Upload from './Upload'
import Cascader from './Cascader'
import YBatchImport from './BatchImport'
import YSkuImport from './SkuImport'
import YInput from './Input'
import YTreeOrg from './TreeOrg'
import YPrint from './Print'
import Tag from './Tag'
import Dialog from './Dialog'
import Drawer from './Drawer'
import ImageViewer from './ImageViewer'
import Question from './Question'
import Image from './Image'
import ImageList from './ImageList'
import TableDialog from './TableDialog'
import Text from './Text'
import Card from './Card'
import Block from './Block'
import Tree from './Tree'

const { YCategoryCascader, YAddressCascader, YCascader } = Cascader
const { YUpload, YAvatar } = Upload

// 组件列表
const components = [YButton, YTable, YForm, YInputNumber, YBackTop, YUpload, YTablePro, YCategoryCascader, YAddressCascader, YBatchImport, YSkuImport, YInput, YTreeOrg, YCascader, YPrint, YAvatar, Tag, Dialog, Drawer, ImageViewer, Question, Image, ImageList, TableDialog, Text, Card, Block, Tree]

// 定义install方法，接收Vue作为参数，通过Vue.use()的方式注册组件
const install = Vue => {
  // 判断是否安装
  if (install.installed) return
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name, component))
}

// 判断是否直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  // 导出的对象必须具有install，才能被Vue.use()方法安装
  install,
  // 以下是具休的组件列表
  YButton,
  YTable,
  YForm,
  YInputNumber,
  YBackTop,
  YUpload,
  YTablePro,
  YCategoryCascader,
  YAddressCascader,
  YCascader,
  YBatchImport,
  YSkuImport,
  YInput,
  YTreeOrg,
  YPrint,
  YAvatar,
  Tag,
  Dialog,
  Drawer,
  ImageViewer,
  Question,
  Image,
  ImageList,
  TableDialog,
  Text,
  Card,
  Block,
  Tree
}
