<template>
<div class="shelf-item-category">
  <div class="shelf-item-category-list" v-if="data.itemList.length > 0">
    <div class="shelf-item-category-item" v-for="(item, index) in data.itemList" :key="index">
      <img class="shelf-item-category-img" :src="item.cover">
    </div>
  </div>
  <div class="shelf-item-category-bg" v-else>
    <span class="icon-book2"></span>
  </div>
</div>
</template>

<script>
export default {
  props: {
    data: Object
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .shelf-item-category {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .shelf-item-category-list {
      display: flex;
      flex-flow: row wrap;
      align-content: flex-start;
      width: 100%;
      height: 100%;
      padding-top: .05rem;
      box-sizing: border-box;
      .shelf-item-category-item {
        flex: 0 0 33.33%;
        width: 33.33%;
        height: 33.33%;
        box-sizing: border-box;
        &:nth-child(3n+1) {//第一列
          padding: 0 .025rem .05rem .05rem;
        }
        &:nth-child(3n+2) {//第二列
          padding: 0 .025rem .05rem .025rem;
        }
        &:nth-child(3n+3) {//第三列
          padding: 0 .05rem .05rem .025rem;
        }
        .shelf-item-category-img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .shelf-item-category-bg {
      width: 100%;
      height: 100%;
      font-size: .36rem;
      @include center;
      color: #ccc;
    }
  }
</style>
