<template>
  <div class="ebook-loading">
    <div class="ebook-loading-wrapper">
      <div class="ebook-loading-item" v-for="(item, index) in data" :key="index">
        <div class="ebook-loading-line-wrapper" v-for="(subItem, subIndex) in item" :key="subIndex">
          <div class="ebook-loading-line" ref="line"></div>
          <div class="ebook-loading-mask" ref="mask"></div>
        </div>
      </div>
      <div class="ebook-loading-center"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data() {
      return {
        data: [
          [{}, {}, {}],
          [{}, {}, {}]
        ],
        maskWidth: [
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 }
        ],
        lineWidth: [
          { value: 16 },
          { value: 16 },
          { value: 16 },
          { value: 16 },
          { value: 16 },
          { value: 16 }
        ],
        add: true, //控制mask的增加,线条的减少
        end: false //
      }
    },
    methods: {},
    mounted() {
      this.task = setInterval(() => {
        this.$refs.mask.forEach((item, index) => {
          const mask = this.$refs.mask[index] //DOM元素
          const line = this.$refs.line[index]
          let maskWidth = this.maskWidth[index] //获取对应宽度
          let lineWidth = this.lineWidth[index]
          if (index === 0) {
            if (this.add && maskWidth.value < 16) { //保证增加maks不能超过16
              maskWidth.value++
              lineWidth.value--
            } else if (!this.add && lineWidth.value < 16) {//当end时line的增加不能超过16
              maskWidth.value--
              lineWidth.value++
            }
          } else {
            if (this.add && maskWidth.value < 16) {
              let preMaskWidth = this.maskWidth[index - 1]
              if (preMaskWidth.value >= 8) {//线条增加到一半时
                maskWidth.value++
                lineWidth.value--
              }
            } else if (!this.add && lineWidth.value < 16) {
              let preLineWidth = this.lineWidth[index - 1]
              if (preLineWidth.value >= 8) {
                maskWidth.value--
                lineWidth.value++
              }
            }
          }
          mask.style.width = `${maskWidth.value / 100}rem`
          mask.style.flex = `0 0 ${maskWidth.value / 100}rem`
          line.style.width = `${lineWidth.value / 100}rem`
          line.style.flex = `0 0 ${lineWidth.value / 100}rem`

          if (index === this.maskWidth.length - 1) {//遍历到最后一根线
            if (this.add) {//mask增加到最长16或者初始就为0，就到头重新开始mask
              if (maskWidth.value === 16) {
                this.end = true
              }
            } else {
              if (maskWidth.value === 0) {
                this.end = true
              }
            }
          }
          if (this.end) {
            this.add = !this.add
            this.end = false
          }
        })
      }, 20)
    },
    beforeDestroy() {
      if (this.task) {
        clearInterval(this.task)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .ebook-loading {
    position: relative;
    z-index: 500;
    width: .63rem;
    height: .4rem;
    background: transparent;
    border: .015rem solid #d7d7d7;
    border-radius: 0.03rem;
    .ebook-loading-wrapper {
      display: flex;
      width: 100%;
      height: 100%;
      .ebook-loading-item {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 0.07rem 0;
        box-sizing: border-box;
        .ebook-loading-line-wrapper {
          flex: 1;
          padding: 0 0.07rem;
          box-sizing: border-box;
          @include left;
          .ebook-loading-mask {
            flex: 0 0 0;
            width: 0;
            height: .015rem;
          }
          .ebook-loading-line {
            flex: 0 0 .16rem;
            width: .16rem;
            height: .015rem;
            background: #d7d7d7;
          }
        }
      }
      .ebook-loading-center {
        position: absolute;
        left: 50%;
        top: 0;
        width: .015rem;
        height: 100%;
        background: #d7d7d7;
      }
    }
  }
</style>
