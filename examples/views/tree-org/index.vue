<template>
  <div class="tree-org">
    <YTreeOrg
      :data="data"
      :horizontal="horizontal"
      :collapsable="collapsable"
      :label-style="style"
      @on-expand="onExpand"
      @on-node-click="onNodeClick"
      @on-blur="onBlur"
    ></YTreeOrg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        id: 0,
        label: 'xxx科技有限公司',
        children: [
          {
            id: 2,
            label: '产品研发部',
            style: { color: '#fff', backgroundColor: '#108ffe' },
            children: [
              {
                id: 5,
                label: '研发-前端'
              },
              {
                id: 6,
                label: '研发-后端'
              },
              {
                id: 9,
                label: 'UI设计'
              },
              {
                id: 10,
                label: '产品经理'
              }
            ]
          },
          {
            id: 3,
            label: '销售部',
            children: [
              {
                id: 7,
                label: '销售一部'
              },
              {
                id: 8,
                label: '销售二部'
              }
            ]
          },
          {
            id: 4,
            label: '财务部'
          },
          {
            id: 9,
            label: 'HR人事'
          }
        ]
      },
      horizontal: true,
      collapsable: true,
      expandAll: true,
      style: {
        background: '#fff',
        color: '#5e6d82'
      }
    }
  },
  created() {
    this.toggleExpand(this.data, this.expandAll)
  },
  methods: {
    onBlur(e, data) {
      const originLabel = data.label
      this.$nextTick(() => {
        data.label = e.target.innerText ? e.target.innerText : originLabel
      })
    },
    setLabel(label, nodeId) {
      // const node = this.findNode(nodeId)
    },
    findNode(nodeId) {
      let node = null
      if (this.data.id === nodeId) {
        return this.data
      }
      const children = this.data.children
      children.some(item => {
        node = this.findNode(item.id)
        return node
      })
      return node
    },
    onExpand(e, data) {
      e.stopPropagation()
      if ('expand' in data) {
        data.expand = !data.expand
        if (!data.expand && data.children) {
          this.collapse(data.children)
        }
      } else {
        this.$set(data, 'expand', true)
      }
    },
    onNodeClick(e, data) {
      // this.$message(data.label)
    },
    collapse(list) {
      list.forEach(child => {
        if (child.expand) {
          child.expand = false
        }
        child.children && this.collapse(child.children)
      })
    },
    expandChange() {
      this.toggleExpand(this.data, this.expandAll)
    },
    toggleExpand(data, val) {
      if (Array.isArray(data)) {
        data.forEach(item => {
          this.$set(item, 'expand', val)
          if (item.children) {
            this.toggleExpand(item.children, val)
          }
        })
      } else {
        this.$set(data, 'expand', val)
        if (data.children) {
          this.toggleExpand(data.children, val)
        }
      }
    }
  }
}
</script>
