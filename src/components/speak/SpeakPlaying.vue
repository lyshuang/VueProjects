<template>
  <div class="playing-item-wrapper">
    <div class="playing-item" :style="item" v-for="(item, index) in styles" :key="index" ref="playingItem"></div>
  </div>
</template>

<script>

  export default {
    props: {
      number: Number
    },
    computed: {
      styles() {
        const styles = new Array(this.number)
        for (let i = 0; i < styles.length; i++) {
          styles[i] = {
            // height: px2rem(this.random()) + 'rem'
            height: this.random()/100 + 'rem'
          }
        }
        return styles
      }
    },
    methods: {
      startAnimation() {
        this.task = setInterval(() => {
          this.$refs.playingItem.forEach(item => {
            // item.style.height = px2rem(this.random()) + 'rem'
            item.style.height = this.random()/100 + 'rem'
          })
        }, 200)
      },
      stopAnimation() {
        if (this.task) {
          clearInterval(this.task)
        }
      },
      random() {
        return Math.ceil(Math.random() * 10)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .playing-item-wrapper {
    @include center;
    .playing-item {
      flex: 0 0 .02rem;
      width: .02rem;
      height: .01rem;
      background: $color-blue;
      margin-left: .02rem;
      transition: all .2s ease-in-out;
      &:first-child {
        margin: 0;
      }
    }
  }
</style>
