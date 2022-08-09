<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input class="slide-contents-search-input"
               type="text"
               :placeholder="$t('book.searchHint')"
               @click="isShowSearchPage(true)"
               v-model="searchText"
               @keyup.enter.exact="search()" 
               ref="searchInput">
      </div>
      <div class="slide-contents-search-cancel" v-if="searchVisible"
           @click="isShowSearchPage(false)">{{$t('book.cancel')}}
      </div>
    </div>
    <div class="slide-contents-book-wrapper" v-show="!searchVisible">
      <div class="slide-contents-book-img-wrapper">
        <!-- <img v-lazy="cover" class="slide-contents-book-img">-->
        <img :src="cover" class="slide-contents-book-img"> 
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">
          <span class="slide-contents-book-title-text">{{metadata.title}}</span>
        </div>
        <div class="slide-contents-book-author">
          <span class="slide-contents-book-author-text">{{metadata.creator}}</span>
        </div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress + '%'}}</span>
          <span class="progress-text">{{$t('book.haveRead2')}}</span>
        </div>
        <div class="slide-contents-book-time">{{getReadTime()}}</div>
      </div>
    </div>
    <scroll class="slide-contents-list" :top="156" :bottom="48" ref="scroll" v-show="!searchVisible">
      <div class="slide-contents-item" v-for="(item, index) in navigation" :key="index" @click="display(item.href)">
        <span class="slide-contents-item-label"
        :style="contentItemStyle(item)" 
        :class="{'selected': section === index}">
            {{item.label.trim()}}
        </span>
        <span class="slide-contents-item-page">{{item.page}}</span>
      </div>
    </scroll> 
    <scroll class="slide-search-list" :top="66" :bottom="48" ref="scroll" v-show="searchVisible">
      <div class="slide-search-item" v-for="(item, index) in searchList"
           :key="index" v-html="item.excerpt" @click="display(item.cfi, true)">
      </div>
    </scroll>
  </div>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin'
  import Scroll from '../common/Scroll'

  export default {
    mixins: [ebookMixin],
    components: {
      Scroll
    },
    data() {
      return {
        searchText: '',
        searchVisible: false,
        searchList: null
      }
    },
    methods: {
      contentItemStyle(item){
          return {
            marginLeft: `${item.level * 15 / 100}rem`
          }
      },
      isShowSearchPage(flag) {
        this.searchVisible = flag
        if (flag === false){
          this.searchText = ''
          this.searchList = null
        }
      },
      search() {
        if (this.searchText && this.searchText.length > 0){//保证查询的时候的输入文本不能为空
            this.doSearch(this.searchText).then(result => {
            this.searchList = result.map(item => {
              //将查询内容高亮显示
              item.excerpt = item.excerpt.replace(this.searchText, `<span class="content-search-text">${this.searchText}</span>`)
              return item
            })
            this.$refs.searchInput.blur()
          })
        }
      },
      doSearch(q) {
        return Promise.all(
          // spineItems:代表section
          this.currentBook.spine.spineItems.map(
            section => section.load(this.currentBook.load.bind(this.currentBook))
            .then(section.find.bind(section, q))
            .finally(section.unload.bind(section))) //unload:释放资源
        ).then(results => Promise.resolve([].concat.apply([], results))) //将二维数组降成一维数组
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .ebook-slide-contents {
    width: 100%;
    // 清除DOM元素之间的间距
    font-size: 0; 
    .slide-contents-search-wrapper {
      display: flex;
      width: 100%;
      height: .36rem;
      margin: .2rem 0 .1rem 0;
      padding: 0 .15rem;
      box-sizing: border-box;
      .slide-contents-search-input-wrapper {
        flex: 1;
        border-radius: .3rem;
        @include center;
        .slide-contents-search-icon {
          flex: 0 0 .28rem;
          @include center;
          .icon-search {
            font-size: .12rem;
          }
        }
        .slide-contents-search-input {
          flex: 1;
          width: 100%;
          height: .32rem;
          font-size: .14rem;
          background: transparent;
          border: none;
          &:focus {
            outline: none;
          }
        }
      }
      .slide-contents-search-cancel {
        flex: 0 0 .5rem;
        font-size: .14rem;
        @include right;
      }
    }
    .slide-contents-book-wrapper {
      display: flex;
      width: 100%;
      height: .9rem;
      padding: .1rem .15rem .2rem .15rem;
      box-sizing: border-box;
      .slide-contents-book-img-wrapper {
        flex: 0 0 .45rem;
        box-sizing: border-box;
        .slide-contents-book-img {
          width: .45rem;
          height: .6rem;
        }
      }
      .slide-contents-book-info-wrapper {
        flex: 1;
        @include columnLeft;
        .slide-contents-book-title {
          font-size: .14rem;
          line-height: .16rem;
          padding: 0 .1rem;
          box-sizing: border-box;
          @include left;
          .slide-contents-book-title-text {
            @include ellipsis2(1);
          }
        }
        .slide-contents-book-author {
          font-size: .12rem;
          line-height: .14rem;
          padding: 0 .1rem;
          box-sizing: border-box;
          margin-top: .05rem;
          @include left;
          .slide-contents-book-author-text {
            @include ellipsis2(1);
          }
        }
      }
      .slide-contents-book-progress-wrapper {
        flex: 0 0 .7rem;
        @include columnLeft;
        .slide-contents-book-progress {
          .progress {
            font-size: .14rem;
            line-height: .16rem;
          }
          .progress-text {
            font-size: .12rem;
            line-height: .14rem;
            margin-left: .02rem;
          }
        }
        .slide-contents-book-time {
          font-size: .12rem;
          line-height: .14rem;
          margin-top: .05rem;
        }
      }
    }
    .slide-contents-list {
      padding: 0 .15rem;
      box-sizing: border-box;
      .slide-contents-item {
        display: flex;
        padding: .2rem 0;
        box-sizing: border-box;
        .slide-contents-item-label {
          flex: 1;
          font-size: .14rem;
          line-height: .16rem;
          @include ellipsis;
        }
        .slide-contents-item-page {
          flex: 0 0 .3rem;
          font-size: .1rem;
          @include right;
        }
      }
    }
    .slide-search-list {
      padding: 0 .15rem;
      box-sizing: border-box;
      .slide-search-item {
        font-size: .14rem;
        line-height: .16rem;
        padding: .2rem 0;
        box-sizing: border-box;
      }
    }
  }
</style>
