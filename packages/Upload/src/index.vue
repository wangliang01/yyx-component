<template>
  <div>
    <el-upload
      :disabled="disabled"
      :class="{'off-add': this.limit<=defaultFile.length}"
      :ref="refUpload"
      list-type="picture-card"
      action=""
      :on-preview="handlePictureCardPreview"
      :before-upload="handleBeforeUpload"
      :on-remove="handleRemove"
      :file-list="defaultFile"
    >
      <i class="el-icon-plus"></i>
    </el-upload>

    <el-dialog :append-to-body="true" :visible.sync="dialogVisible">
      <img style="width:100%" :src="dialogImageUrl" alt="" />
    </el-dialog>

    <el-dialog :append-to-body="true" :visible.sync="modalImg" title="操作图片">
      <div class="cropper">
        <vueCropper
          style="width:100%;height:500px;"
          ref="cropper"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
          :info="true"
          :full="option.full"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :fixed="option.fixed"
          :fixedNumber="option.fixedNumber"
          :centerBox="option.centerBox"
          :infoTrue="option.infoTrue"
          :fixedBox="option.fixedBox"
          :canScale="option.canScale"
          :autoCropWidth="autoCropWidth"
          :autoCropHeight="autoCropHeight"
        ></vueCropper>
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
// import { uploadAPI } from '@/api'
export default {
  name: 'YUpload',
  components: {
    VueCropper
  },
  props: {
    disabled: {
      type: Boolean, // disabled === true 时显示新加
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
    /* 剪裁框属性 */
    autoCropWidth: {
      type: [String, Number],
      default: 360
    },
    autoCropHeight: {
      type: [String, Number],
      default: 360
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
    }
  },
  data() {
    return {
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
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'png', // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: this.autoCropWidth, // 默认生成截图框宽度
        autoCropHeight: this.autoCropHeight, // 默认生成截图框高度
        fixedBox: this.fixedBox, // 固定截图框大小 不允许改变
        fixed: this.fixed, // 是否开启截图框宽高固定比例
        fixedNumber: this.fixedNumber, // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: false // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
      this.default = fileList
      this.defaultFile = fileList
      this.$emit('on-remove', {
        file, fileList
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    async uploadSuccess() {
      if (this.isCropper) {
        this.$refs.cropper.getCropBlob(async data => {
          try {
            this.loading = true
            const formData = new FormData()
            formData.append('file', this.blobtoFile(data))
            // const res = await uploadAPI.upload(formData)
            // this.$refs[this.refUpload].fileList.push({
            //   url: res.data.url,
            //   name: '图片',
            //   status: 'finished'
            // })
            this.defaultFile = this.$refs[this.refUpload].fileList
            // this.handleSuccess(res)
            this.modalImg = false
          } catch (e) {
            console.error(e)
          } finally {
            this.loading = false
          }
        })
      } else {
        const formData = new FormData()
        formData.append('file', this.fileinfo)
        // const res = await uploadAPI.upload(formData)
        // this.$refs[this.refUpload].fileList.push({
        //   url: res.data.url,
        //   name: '图片',
        //   status: 'finished'
        // })
        // this.defaultFile = this.$refs[this.refUpload].fileList
        // this.handleSuccess(res)
        // this.modalImg = false
      }
    },
    blobtoFile(blob) {
      // blob转Base64
      const name = this.fileinfo.name.split('.')[0] + '.png'
      return new window.File([blob], name, { type: 'image/png' })
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
      const testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const imgExt = /(jpg|JPG|bmp|BMP|gif|GIF|ico|ICO|pcx|PCX|jpeg|JPEG|tif|TIF|png|PNG|raw|RAW|tga|TGA)$/
      if (!imgExt.test(testmsg) && this.isCropper) {
        this.$message({
          message: '请选择图片',
          type: 'warning'
        })
        return false
      }
      this.fileinfo = file
      const data = window.URL.createObjectURL(new Blob([file]))
      this.img = data
      if (this.isCropper) {
        this.modalImg = true
      } else {
        this.uploadSuccess()
      }
      return false // 取消自动上传
    },
    handleSuccess(response) {
      this.$emit('on-success', { file: response.data, fileList: this.defaultFile })
    }
  },
  watch: {
    fileList() {
      this.formatDefaultFile()
    }
  }
}
</script>

<style lang="scss">
.off-add {
  .el-upload--picture-card {
    display: none;
  }
}
</style>
