<template>
  <div class="select-pro">
    <el-popover
      placement="top-start"
      trigger="focus"
      :width="width"
      :visible-arrow="false"
      popper-class="popper"
      @show="handleToggleSuffixIcon('el-icon-arrow-up')"
      @hide="handleToggleSuffixIcon('el-icon-arrow-down')"
    >
      <div class="el-scrollbar">
        <div
          class="el-select-dropdown__wrap el-scrollbar__wrap"
        >
          <ul class="el-scrollbar__view el-select-dropdown__list">
            <li v-for="item in $attrs.options" :key="item.value" class="el-select-dropdown__item" :class="{selected: showSelected(item)}" @click="handleItemClick(item)"><span>{{ item.label }}</span></li>
          </ul>
        </div>
      </div>
      <el-input slot="reference" ref="input" v-model="value" :suffix-icon="suffixIcon" @keydown.native.enter="handleSubmit" @focus="handleInputFocus" @blur="handleInputBlur">
        <template #prepend>
          <div class="prefix-wrapper">
            <el-tag v-for="item in showTags" :key="item.value" size="small" closable @close="handleCloseTag(item)">{{ item.label }}</el-tag>
            <el-tag v-if="selectTags.length > max" size="small">+{{ selectTags.length - max }}</el-tag>
          </div>
        </template>
      </el-input>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'YSelectPro',
  components: {},
  props: {
    max: {
      type: [String, Number],
      default: 2
    },
    remote: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: '',
      width: 150,
      suffixIcon: 'el-icon-arrow-down',
      selectTags: []
    }
  },
  computed: {
    showTags() {
      if (this.selectTags.length <= this.max) {
        return this.selectTags
      } else {
        return this.selectTags.slice(0, this.max)
      }
    }
  },
  mounted() {
    this.setWidth()
    window.addEventListener('resize', this.setWidth)
    this.$once('hook:beforeDes', () => {
      window.removeEventListener('resize', this.setWidth)
    })
  },
  methods: {
    setWidth() {
      this.width = this.$refs.input.$el.offsetWidth - 25
    },
    handleToggleSuffixIcon(suffixIcon) {
      this.suffixIcon = suffixIcon
    },
    handleSubmit(e) {
      const newItem = {
        label: e.target.value,
        value: e.target.value
      }
      const options = this.$attrs.options
      const index = options.findIndex(option => option.value === newItem.value)
      if (index === -1) {
        // 不存在，再追加
        if (this.remote) {
          // 需要与后台接口交互
          this.$emit('update', [...options, newItem])
        } else {
          this.$emit('update:options', [...options, newItem])
        }
      }
      // 清空Input
      this.value = ''
    },
    handleInputFocus() {
      const prepend = document.querySelector('.el-input-group__prepend')
      prepend && (prepend.style.borderColor = '#409EFF')
      prepend && (prepend.style.outline = 0)
    },
    handleInputBlur() {
      const prepend = document.querySelector('.el-input-group__prepend')
      prepend && (prepend.style.borderColor = '#DCDFE6')
    },
    handleItemClick(item) {
      const index = this.selectTags.findIndex(tag => tag.value === item.value)
      if (index === -1) {
        // 不存在，再追加
        this.selectTags.push(item)
      }
    },
    showSelected(item) {
      return !!this.selectTags.find(tag => tag.value === item.value)
    },
    handleCloseTag(item) {
      const index = this.selectTags.findIndex(tag => tag.value === item.value)
      if (index > -1) {
        this.selectTags.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
    width:8px;
    height:8px;
    background-color:#F5F5F5;
}
/*定义滚动条轨道
 内阴影+圆角*/
::-webkit-scrollbar-track
{
    -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);
    border-radius:10px;
    background-color:#F5F5F5;
}
/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
    border-radius:10px;
    -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);
    background-color:#ccc;
}
::v-deep .el-input .el-input__suffix {
  cursor: pointer;
}

::v-deep .el-select-dropdown__wrap{
  overflow: auto;
}

::v-deep  .el-input-group--prepend {
  &:focus {
    .el-input-group__prepend, .el-input__inner {
      border-color: #409EFF;
      outline: 0;
    }
  }
  .el-input-group__prepend{
    padding: 0 10px;
    background-color: #fff;
  }
  .el-input__inner{
    padding-left: 0;
    border-left: none;
  }
}

.popper {
  top: -10px;
}

.prefix-wrapper{
  ::v-deep .el-tag {
    margin-right: 10px;
    &:last-child{
      margin-right: 0;
    }
  }
}
</style>
