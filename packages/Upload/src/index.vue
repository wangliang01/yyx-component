<template>
  <div v-if="!refresh">
    <el-upload :ref="refUpload" :disabled="disabled" :class="{'off-add': limit<=defaultFile.length}" list-type="picture-card" action="" :on-preview="handlePictureCardPreview" :before-upload="handleBeforeUpload" :on-remove="handleRemove" :file-list="defaultFile">
      <i class="el-icon-plus"></i>
    </el-upload>

    <!-- <el-dialog :append-to-body="true" :visible.sync="dialogVisible">
      <img style="width:100%" :src="dialogImageUrl" alt="">
    </el-dialog> -->
    <!-- 预览大图 -->
    <y-image-viewer :visible.sync="dialogVisible" :url-list="[dialogImageUrl]"></y-image-viewer>

    <el-dialog :append-to-body="true" :visible.sync="modalImg" title="操作图片">
      <div class="cropper">
        <vueCropper
          ref="cropper"
          style="width:100%;height:500px;"
          :high="option.high"
          :img="option.img"
          :output-size="option.size"
          :output-type="option.outputType"
          :info="true"
          :full="option.full"
          :can-move="option.canMove"
          :can-move-box="option.canMoveBox"
          :original="option.original"
          :auto-crop="option.autoCrop"
          :fixed="option.fixed"
          :fixed-number="option.fixedNumber"
          :center-box="option.centerBox"
          :info-true="option.infoTrue"
          :fixed-box="option.fixedBox"
          :can-scale="option.canScale"
        >
        </vueCropper>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modalImg = false">取 消</el-button>
        <el-button :loading="loading" type="primary" @click="uploadSuccess()">确 定</el-button>
      </span>
      <!--cropper-->
    </el-dialog>
  </div>
</template>
<script>

import { VueCropper } from 'vue-cropper'

const defaultAPI = function(params) {
  return new Promise(resolve => {
    resolve(
      {
        data: {
          url: 'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/common/image/png/abe074b524fd8888f85b58e4ce09832e.png'
        }
      }
    )
  })
}
export default {
  name: 'YUpload',
  components: {
    VueCropper
  },
  props: {
    api: {
      type: Function,
      default: defaultAPI
    },
    disabled: {
      type: Boolean, // disabled === true 时不可以新加 也不能删除
      default: false
    },
    limit: {
      type: Number,
      default: 4
    },
    refUpload: {
      type: String,
      default: 'upload'
    },
    fileList: {
      type: Array,
      default: () => []
    },
    fixedBox: {
      type: Boolean,
      default: () => true
    }, // 固定截图框大小 不允许改变
    fixed: {
      type: Boolean,
      default: () => true
    }, // 是否开启截图框宽高固定比例
    fixedNumber: {
      type: Array,
      default: () => [1, 1]
    }, // 截图框的宽高比例
    /* 是否开启剪裁框 */
    isCropper: {
      type: Boolean,
      default: () => true
    },
    isCompress: {
      type: Boolean,
      default: false
    },
    // 图片的压缩宽度，根据该宽度和fixedNumber计算出高度，然后对图片进行压缩
    compressRatio: {
      type: Number,
      default: 360
    },
    maxSize: {
      type: Number,
      default: 1
    },
    allowPdf: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      refresh: false,
      loading: false,
      dialogImageUrl: '',
      defaultFile: [],
      img: '',
      dialogVisible: false,
      modalImg: false
    }
  },
  computed: {
    option() {
      return {
        img: this.img, // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        high: true, // 是否根据dpr生成适合屏幕的高清图片
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'png', // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        fixedBox: this.fixedBox, // 固定截图框大小 不允许改变
        fixed: this.fixed, // 是否开启截图框宽高固定比例
        fixedNumber: this.fixedNumber, // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: false // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      }
    }
  },
  watch: {
    fileList() {
      this.formatDefaultFile()
    }
  },
  mounted() {
    this.formatDefaultFile()
  },
  methods: {
    handleRemove(file, fileList) {
      this.default = fileList
      this.defaultFile = fileList
      this.$emit('on-remove', {
        file,
        fileList
      })
    },
    handlePictureCardPreview(file) {
      if (file.pdf) {
        window.open(file.pdf)
        return
      }
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    async uploadSuccess(isPdf) {
      this.loading = true
      if (this.isCropper && !isPdf) {
        this.$refs.cropper.getCropBlob(async(data) => {
          let base64 = await this.blobToDataURL(data) // 转base64
          if (this.isCompress) {
            // 如果要压缩图片
            base64 = await this.compress(base64) // 压缩
          }
          const blob = this.dataURLtoBlob(base64) // 转blob
          try {
            const formData = new FormData()
            formData.append('file', this.blobtoFile(blob))
            const res = await this.api(formData)
            this.$refs[this.refUpload].fileList.push({
              url: res.data.url,
              name: '图片',
              status: 'finished'
            })
            this.defaultFile = this.$refs[this.refUpload].fileList
            this.handleSuccess(res)
            this.modalImg = false
          } finally {
            this.loading = false
          }
        })
      } else {
        const formData = new FormData()
        formData.append('file', this.fileinfo)
        const res = await this.api(formData)
        this.$refs[this.refUpload].fileList.push({
          url: res.data.url,
          name: '图片',
          status: 'finished'
        })
        this.defaultFile = this.$refs[this.refUpload].fileList
        this.handleSuccess(res)
        this.modalImg = false
        this.loading = false
      }
    },
    // blob转File 上传的时候用
    blobtoFile(blob) {
      const name = this.fileinfo.name.split('.')[0] + '.png'
      return new window.File([blob], name, { type: 'image/png' })
    },
    // Base64转blob 压缩图片之后用
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(',')
      var mime = arr[0].match(/:(.*?);/)[1]
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
    },
    // blob转Base64 压缩图片之前用
    blobToDataURL(blob) {
      return new Promise((resolve) => {
        const a = new FileReader()
        a.readAsDataURL(blob)
        a.onload = (res) => {
          resolve(res.currentTarget.result)
        }
      })
    },
    // 压缩图片
    compress(src) {
      return new Promise((resolve) => {
        const img = new Image()
        img.src = src
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          // 默认按照 compressRatio 压缩，如果没默认值按宽360压缩
          const width = this.compressRatio
          const height = this.compressRatio * (img.height / img.width)
          canvas.width = width
          canvas.height = height
          // 铺底色
          ctx.fillStyle = '#fff'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0, width, height)
          // 进行最小压缩
          const ndata = canvas.toDataURL('image/jpeg', 1)
          resolve(ndata)
        }
      })
    },
    handleBeforeUpload(file) {
      const check = this.fileList.length >= this.limit
      if (check) {
        this.$message({
          message: '上传失败，已达上传上限',
          type: 'warning'
        })
        return false
      }
      const fileSize = file.size / 1024 / 1024
      if (fileSize > this.maxSize) {
        this.$message({
          message: `上传图片大小不能超过 ${this.maxSize}MB!`,
          type: 'warning'
        })
        return false
      }
      const testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      let imgExt = /(jpg|JPG|bmp|BMP|gif|GIF|ico|ICO|pcx|PCX|jpeg|JPEG|tif|TIF|png|PNG|raw|RAW|tga|TGA)$/
      if (this.allowPdf) {
        imgExt = /(jpg|JPG|bmp|BMP|gif|GIF|ico|ICO|pcx|PCX|jpeg|JPEG|tif|TIF|png|PNG|raw|RAW|tga|TGA|pdf)$/
      }
      if (!imgExt.test(testmsg)) {
        this.$message({
          message: `请选择图片${this.allowPdf ? '或pdf' : ''}`,
          type: 'warning'
        })
        return false
      }
      this.fileinfo = file
      const data = window.URL.createObjectURL(new Blob([file]))
      this.img = data
      if (this.isCropper && testmsg !== 'pdf') {
        this.modalImg = true
      } else {
        this.uploadSuccess(testmsg === 'pdf')
      }
      return false // 取消自动上传
    },
    formatDefaultFile() {
      this.defaultFile = this.fileList.map(item => {
        if (item.split('.').pop() === 'pdf') {
          return {
            pdf: item,
            url: 'https://yyx-mall.oss-cn-chengdu.aliyuncs.com/common/image/png/icon-pdf.png',
            name: '图片',
            status: 'finished'
          }
        } else {
          return {
            url: item,
            name: '图片',
            status: 'finished'
          }
        }
      })
      this.refresh = true
      this.$nextTick(() => {
        this.refresh = false
      })
    },
    handleSuccess(response) {
      this.$emit('on-success', {
        file: response.data,
        fileList: this.defaultFile
      })
    }
  }
}
</script>

<style>
.crop-info {
  display: none;
}
.off-add .el-upload--picture-card {
  display: none;
}
</style>
