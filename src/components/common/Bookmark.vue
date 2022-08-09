<template>
  <div class="ebook-bookmark-icon" :style="style" ref="bookmark" v-if="!menuVisible"></div>
</template>

<script type="text/ecmascript-6">
import { ebookMixin } from "@/utils/mixin"
  export default {
    mixins: [ebookMixin],
    props: {
      width: Number,
      height: Number,
      color: String
    },
    computed: {
      style() {
        if (this.color){
          return {
            borderColor: `${this.color} ${this.color} transparent ${this.color}`
          }
        } else {
          return {}
        }
      }
    },
    methods: {
      refresh() {//刷新宽高
      // console.log('h:', this.height, 'w:', this.width);
        if (this.height && this.width && this.width > 0 && this.height > 10) {
          this.$refs.bookmark.style.borderWidth = `${(this.height - 5) / 100}rem ${(this.width / 2) / 100}rem ${(5) / 100}rem ${(this.width / 2) / 100}rem`
        }
      }
    },
    mounted() {
      this.refresh()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .ebook-bookmark-icon {
    width: 0;
    height: 0;
    font-weight: bold;
    line-height: 0;
    border-width: .5rem .1rem .1rem .1rem;
    border-style: solid;
    border-color: white white transparent white;
  }
</style>
