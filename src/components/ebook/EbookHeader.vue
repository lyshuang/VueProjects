<template>
  <div class="ebook-header" ref="header">
    <span class="ebook-header-text">{{getSectionName}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  import { ebookMixin } from '../../utils/mixin'

  export default {
    mixins: [ebookMixin]
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .ebook-header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 110;
    width: 100%;
    height: .48rem;
    padding: 0 .15rem;
    box-sizing: border-box;
    overflow: hidden;
    @include left;
    .ebook-header-text {
      font-size: .12rem;
      color: #6d7178;
    }
  }
</style>
