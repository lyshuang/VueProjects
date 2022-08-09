<template>
  <div>
    <div class="hot-search-title">
      <span class="label">{{label}}</span>
      <span class="btn">{{btn}}</span>
    </div>
    <div class="hot-search-list">
      <div class="hot-search-item" v-for="(item, index) in hotSearch" :key="index">
        <div class="icon-wrapper">
          <span class="icon-book icon" v-if="item.type === 1"></span>
          <span class="icon-search icon" v-if="item.type === 2"></span>
        </div>
        <div class="hot-search-text-wrapper">
          <div class="text" ref="searchText">{{item.text}}</div>
          <div class="num" v-if="item.num">{{item.num}}人搜索</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { realPx } from '@/utils/utils'

  export default {
    props: {
      label: String,
      btn: String,
      hotSearch: Array
    },
    mounted() {
      this.$refs.searchText.forEach(item => {
        item.style.width = window.innerWidth - realPx(20) - realPx(40) + 'px'
      })
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .hot-search-title {
    display: flex;
    width: 100%;
    font-size: .13rem;
    padding: .1rem;
    box-sizing: border-box;
    .label {
      flex: 1;
      text-align: left;
      font-weight: bold;
      color: #666;
    }
    .btn {
      flex: 1;
      text-align: right;
      font-weight: bold;
      color: #409EFF;
    }
  }
  .hot-search-list {
    width: 100%;
    padding: 0 .1rem;
    box-sizing: border-box;
    .hot-search-item {
      padding: .1rem 0;
      display: flex;
      .icon-wrapper {
        flex: 0 0 .4rem;
        @include center;
        .icon-book {
          font-size: .16rem;
        }
        .icon-search {
          font-size: .16rem;
        }
      }
      .hot-search-text-wrapper {
        flex: 1;
        height: .35rem;
        @include columnLeft;
        .text {
          flex: 1;
          height: 100%;
          font-size: .14rem;
          font-weight: bold;
          color: #666;
          @include ellipsis;
          @include left;
        }
        .num {
          font-size: .12rem;
          color: #999;
          margin-top: .05rem;
        }
      }
    }
  }
</style>
