<template>
  <div class="ebook-slide-bookmark">
    <div class="slide-bookmark-title">{{$t('book.bookmark')}} · {{bookmark ? bookmark.length : 0}}</div>
    <scroll class="slide-bookmark-list" :top="48" :bottom="48">
      <div class="slide-bookmark-item" v-for="(item, index) in bookmark" :key="index" @click="display(item.cfi)">
        <div class="slide-bookmark-item-icon">
          <div class="icon-bookmark"></div>
        </div>
        <div class="slide-bookmark-item-text">{{item.text}}</div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../common/Scroll'
  import { getBookmark } from '@/utils/localStorage'
  import { ebookMixin } from '@/utils/mixin'

  export default {
    mixins: [ebookMixin],
    components: {
      Scroll
    },
    data() {
      return {
        bookmark: null
      }
    },
    mounted() {
      this.bookmark = getBookmark(this.fileName)
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .ebook-slide-bookmark {
    width: 100%;
    .slide-bookmark-title {
      width: 100%;
      height: .48rem;
      font-size: .14rem;
      font-weight: bold;
      padding: 0 .15rem;
      box-sizing: border-box;
      @include left;
    }
    .slide-bookmark-list {
      padding: 0 .15rem;
      box-sizing: border-box;
      .slide-bookmark-item {
        display: flex;
        padding: .15rem 0;
        box-sizing: border-box;
        .slide-bookmark-item-icon {
          flex: 0 0 .29rem;
          @include left;
          .icon-bookmark {
            width: .2rem;
            height: .2rem;
            font-size: .12rem;
            border-radius: 50%;
            background: #bbb;
            @include center;
          }
        }
        .slide-bookmark-item-text {
          font-size: .14rem;
          line-height: .15rem;
          max-height: .45rem;
          @include ellipsis2(3);
        }
      }
    }
  }
</style>
