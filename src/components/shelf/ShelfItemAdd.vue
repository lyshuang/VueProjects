<template>
<div class="shelf-item-add">
  <span class="icon-add"></span>
</div>
</template>

<script>
export default {}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .shelf-item-add {
    width: 100%;
    height: 100%;
    border: .01rem solid #ccc;
    box-sizing: border-box;
    @include center;
    .icon-add {
      font-size: .4rem;
      color: #ccc;
    }
  }
</style>
