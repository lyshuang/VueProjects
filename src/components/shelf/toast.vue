<template>
  <transition name="fade">
    <div class="toast-bg" v-show="visible">
      <div class="toast-wrapper">
        <div class="toast" v-html="text"></div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      text: [String, Number],
      timeout: {
        type: Number,
        default: 1500
      }
    },
    data() {
      return {
        visible: false
      }
    },
    methods: {
      hide() {
        this.visible = false
      },
      show() {
        clearTimeout(this.task)
        this.task = null
        this.visible = true
        this.task = setTimeout(() => {
          this.visible = false
        }, this.timeout)
      },
      continueShow() {
        clearTimeout(this.task)
        this.task = null
        this.visible = true
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .toast-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 0 0 -50%;
    z-index: 2500;
    width: 100%;
    @include center;
    .toast-wrapper {
      width: 60%;
      line-height: .2rem;
      padding: .1rem .2rem;
      box-sizing: border-box;
      background: #ccc;
      border-radius: .1rem;
      font-size: .14rem;
      color: white;
      .toast {
        text-align: center;
        word-break: break-all;
      }
    }
  }
</style>
