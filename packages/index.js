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
import CascaderPanel from './CascaderPanel'
import YBatchImport from './BatchImport'
import YSkuImport from './SkuImport'
import YInput from './Input'
import YTreeOrg from './TreeOrg'
import YPrint from './Print'
import Tag from './Tag'
import Dialog from './Dialog'
import Drawer from './Drawer'
import ImageViewer from './ImageViewer'
import Tips from './Tips'
import Image from './Image'
import ImageList from './ImageList'
import TableDialog from './TableDialog'
import Text from './Text'
import Card from './Card'
import Block from './Block'
import Tree from './Tree'
import CardForm from './CardForm'
import Container from './Container'
import Checkbox from './Checkbox'
import CheckboxGroup from './CheckboxGroup'
import TableMate from './TableMate'
import Transfer from './Transfer'
import AuditForm from './AuditForm'
import Select from './Select'
import Loading from 'element-ui/packages/loading'
import TableAir from './TableAir'
import Calendar from './Calendar'
import BatchExport from './BatchExport'
import VirtualList from './VirtualList'
import DataBoard from './DataBoard'
import YUploadList from './upload-list'
// import directives from '../directives'
import VueDND from '../directives/dragging'

const { YCategoryCascader, YAddressCascader, YCascader } = Cascader
const { YUpload, YAvatar } = Upload

// 组件列表
const components = [YButton, YTable, YForm, YInputNumber, YBackTop, YUpload, YUploadList, YTablePro, YCategoryCascader, YAddressCascader, YBatchImport, YSkuImport, YInput, YTreeOrg, YCascader, YPrint, YAvatar, Tag, Dialog, Drawer, ImageViewer, Tips, Image, ImageList, TableDialog, Text, Card, Block, Tree, CardForm, CascaderPanel, Container, Checkbox, CheckboxGroup, TableMate, Transfer, AuditForm, Select, TableAir, Calendar, BatchExport, VirtualList, DataBoard]

// 定义install方法，接收Vue作为参数，通过Vue.use()的方式注册组件
const install = Vue => {
  // 判断是否安装
  if (install.installed) return
  // 注册指令
  Vue.use(Loading.directive)
  // Vue.use(directives)
  Vue.use(VueDND)
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
  YUploadList,
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
  Tips,
  Image,
  ImageList,
  TableDialog,
  Text,
  Card,
  Block,
  Tree,
  CardForm,
  CascaderPanel,
  Container,
  Checkbox,
  CheckboxGroup,
  TableMate,
  Transfer,
  AuditForm,
  Select,
  TableAir,
  Calendar,
  BatchExport,
  VirtualList,
  DataBoard
}
