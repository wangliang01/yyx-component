<template>
  <div class="demo-block">
    <div class="source">
      <slot name="source"></slot>
    </div>
    <div class="button-wrapper" @click="isExpanded=!isExpanded">
      <i :class="iconClass"></i>
    </div>
    <transition
      name="slide-fade"
    >
      <div v-show="isExpanded" ref="highlight" v-highlightjs class="highlight">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'DemoBlock',
  components: {
  },
  data() {
    return {
      isExpanded: false
    }
  },
  computed: {
    iconClass() {
      this.clearMargin()
      return this.isExpanded ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
    }
  },
  watch: {
    isExpanded() {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  updated() {
    this.clearMargin()
  },
  methods: {
    init() {
      const el = this.$refs.highlight
      this.$nextTick(() => {
        if (this.isExpanded) {
          el.style.height = el.firstChild.getBoundingClientRect().height + 'px'
        } else {
          el.style.height = 0
        }
      })
    },
    clearMargin() {
      const pre = document.querySelector('.demo-block .highlight pre')
      if (pre) {
        pre.style.margin = 0
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  * {
    margin: 0;
  }
  .demo-block {
    border: solid 1px #ebebeb;
    border-radius: 3px;
    transition: .2s;
    overflow: hidden;
    &.hover {
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
    }
    code {
      font-family: Menlo, Monaco, Consolas, Courier, monospace;
    }
    .source {
      padding: 24px;
    }

    .button-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
    }

   .slide-fade-enter-active {
      height: 100%;
      transition: all .3s ease;
    }
    .slide-fade-leave-active {
      height: 100%;
      transition: all .3s ease
    }
    .slide-fade-enter {
      height: 0;
    }

    .slide-fade-leave-to {
      height: 0;
    }

    :deep .highlight {
      overflow: hidden;
      pre {
        margin: 0;
      }
      code.hljs {
        margin: 0;
        border: none;
        max-height: none;
        border-radius: 0;
        &::before {
          content: none;
        }
      }
    }
  }
</style>
