## Upload 上传

通过点击上传文件，YUpload 对 ElUpload 进行了封装，采用了照片墙的形式来展示文件。

### 基本用法

::: demo

```html
<template>
  <y-upload
    :disabled="disabled"
    :limit="4"
    :api="uploadAPI"
    :file-list="fileList"
    @on-success="handleUploadSuccess($event)"
    @on-remove="handleRemove($event)"
  ></y-upload>
</template>
<script>
  export default {
    data() {
      return {
        disabled: false,
        uploadAPI: null,
        fileList: []
      }
    },
    methods: {
      handleUploadSuccess(event) {
        console.log('上传成功', event)
      },
      handleRemove(event) {
        console.log('移除成功', event)
      }
    }
  }
</script>
```

:::

### 禁用上传

通过 disabled 来控制是否禁用上传功能。
::: demo

```html
<template>
  <y-upload
    :disabled="disabled"
    :limit="4"
    :api="uploadAPI"
    :file-list="fileList"
    @on-success="handleUploadSuccess($event)"
    @on-remove="handleRemove($event)"
  ></y-upload>
</template>
<script>
  export default {
    data() {
      return {
        disabled: true,
        uploadAPI: null,
        fileList: []
      }
    },
    methods: {
      handleUploadSuccess(event) {
        console.log('上传成功', event)
      },
      handleRemove(event) {
        console.log('移除成功', event)
      }
    }
  }
</script>
```

:::

### 限制上传个数

通过 limit 来限制上传个数，默认为 4。
::: demo

```html
<template>
  <y-upload
    :disabled="disabled"
    :limit="5"
    :api="uploadAPI"
    :file-list="fileList"
    @on-success="handleUploadSuccess($event)"
    @on-remove="handleRemove($event)"
  ></y-upload>
</template>
<script>
  export default {
    data() {
      return {
        disabled: true,
        uploadAPI: null,
        fileList: []
      }
    },
    methods: {
      handleUploadSuccess(event) {
        console.log('上传成功', event)
      },
      handleRemove(event) {
        console.log('移除成功', event)
      }
    }
  }
</script>
```

:::

### fileList 文件列表

::: demo

```html
<template>
  <y-upload
    :disabled="disabled"
    :limit="10"
    :api="uploadAPI"
    :file-list="fileList"
    @on-success="handleUploadSuccess($event)"
    @on-remove="handleRemove($event)"
  ></y-upload>
</template>
<script>
  export default {
    data() {
      return {
        disabled: false,
        uploadAPI: null,
        fileList: [
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
        ]
      }
    },
    methods: {
      handleUploadSuccess(event) {
        console.log('上传成功', event)
      },
      handleRemove(event) {
        console.log('移除成功', event)
      }
    }
  }
</script>
```

:::

### 是否开启裁剪

通过 isCropper 来控制是否开启裁剪，默认开启。
::: demo

```html
<template>
  <y-upload
    :disabled="disabled"
    :limit="5"
    :api="uploadAPI"
    :file-list="fileList"
    @on-success="handleUploadSuccess($event)"
    @on-remove="handleRemove($event)"
    :isCropper="false"
  ></y-upload>
</template>
<script>
  export default {
    data() {
      return {
        disabled: false,
        uploadAPI: null,
        fileList: []
      }
    },
    methods: {
      handleUploadSuccess(event) {
        console.log('上传成功', event)
      },
      handleRemove(event) {
        console.log('移除成功', event)
      }
    }
  }
</script>
```

:::

### 是否支持 PDF

通过 allowPdf 来控制是否开启裁剪，默认 false。
::: demo

```html
<template>
  <y-upload
    :disabled="disabled"
    :limit="5"
    :api="uploadAPI"
    :file-list="fileList"
    @on-success="handleUploadSuccess($event)"
    @on-remove="handleRemove($event)"
    :isCropper="false"
    allowPdf
  ></y-upload>
</template>
<script>
  export default {
    data() {
      return {
        disabled: false,
        uploadAPI: null,
        fileList: []
      }
    },
    methods: {
      handleUploadSuccess(event) {
        console.log('上传成功', event)
      },
      handleRemove(event) {
        console.log('移除成功', event)
      }
    }
  }
</script>
```

:::
### 拖动排序

::: demo

```html
<template>
  <y-upload
    :disabled="disabled"
    :limit="10"
    :file-list="fileList"
    :isDragging="true"
    @dragend="dragend"
    @on-success="handleUploadSuccess($event)"
    @on-remove="handleRemove($event)"
  >
  </y-upload>
</template>
<script>
  export default {
    data() {
      return {
        disabled: false,
        fileList: [
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
        ]
      }
    },
    methods: {
      dragend(event) {
        console.log('拖动', event)
      },
      handleUploadSuccess(event) {
        console.log('上传成功', event)
      },
      handleRemove(event) {
        console.log('移除成功', event)
      }
    }
  }
</script>
```

:::

### Attributes

| 参数          | 说明                                                                    | 类型     | 可选值 | 默认值 |
| ------------- | ----------------------------------------------------------------------- | -------- | ------ | ------ |
| api           | 必选参数，上传 API                                                      | function | ——     | ——     |
| disabled      | 是否禁用                                                                | boolean  | ——     | false  |
| limit         | 限制上传个数                                                            | number   | ——     | 4      |
| refUpload     | Upload 组件的 ref                                                       | string   | ——     | upload |
| fileList      | 文件列表                                                                | array    | ——     | []     |
| fixedBox      | 固定截图框大小 不允许改变                                               | boolean  | ——     | true   |
| fixed         | 是否开启截图框宽高固定比例                                              | boolean  | ——     | true   |
| fixedNumber   | 截图框的宽高比例                                                        | array    | ——     | [1, 1] |
| isCropper     | 是否开启剪裁框                                                          | boolean  | ——     | true   |
| isCompress    | 是否开启图片压缩                                                        | boolean  | ——     | false  |
| compressRatio | 图片的压缩宽度，根据该宽度和 fixedNumber 计算出高度，然后对图片进行压缩 | number   | ——     | 360    |
| maxSize       | ——                                                                      | number   | ——     | 1      |
| allowPdf      | 是否允许上传 PDF                                                        | boolean  | ——     | false  |
| isDragging    | 是否拖拽排序                                                            | boolean  | ——     | false  |

### Events

| 事件名称   | 说明           | 回调参数         |
| ---------- | -------------- | ---------------- |
| on-success | 上传成功的回调 | ({file: File, fileList: Array}) |
| on-remove | 上传成功的回调 | ({file: File, fileList: Array}) |
| dragend | 拖拽排序完成的回调 | (fileList: Array) |
