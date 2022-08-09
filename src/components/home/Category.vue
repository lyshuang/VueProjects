<template>
  <div class="category">
    <title-view :label="$t('home.category')" :btn="$t('home.seeAll')" @onClick="showBookList"></title-view>
    <div class="category-list">
      <div class="category-item-wrapper" v-for="(item, index) in data" :key="index" @click="showBookCategory(item)">
        <div class="category-item">
          <div class="content-wrapper">
            <div class="title title-medium">{{categoryText(item.category)}}</div>
            <div class="num sub-title-tiny">{{item.num + ' ' + $t('home.books')}}</div>
          </div>
          <div class="img-wrapper">
            <div class="img-group">
              <img class="img" :src="item.img1">
              <img class="img2" :src="item.img2">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import TitleView from './Title'
  import { categoryText, getCategoryName } from '../../utils/store'

  export default {
    components: {
      TitleView
    },
    props: {
      data: Array
    },
    methods: {
      showBookCategory(item) {
        this.$router.push({
          path: '/store/list',
          query: {
            category: getCategoryName(item.category),
            categoryText: this.categoryText(item.category)
          }
        })
      },
      categoryText(category) {
        return categoryText(category, this)
      },
      showBookList() {
        this.$router.push('/store/list')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .category {
    .category-list {
      display: flex;
      flex-flow: row wrap;
      width: 100%;
      .category-item-wrapper {
        flex: 0 0 50%;
        width: 50%;
        padding: 0 .05rem .1rem .05rem;
        box-sizing: border-box;
        &:nth-child(odd) {
          padding-left: .1rem;
        }
        &:nth-child(even) {
          padding-right: .1rem;
        }
        .category-item {
          display: flex;
          width: 100%;
          background: #eee;
          .img-wrapper {
            flex: 0 0 50%;
            width: 50%;
            padding: .2rem .1rem;
            box-sizing: border-box;
            .img-group {
              position: relative;
              width: 100%;
              height: .6rem;
              @include left;
              .img {
                position: absolute;
                left: 0;
                top: 0;
                z-index: 100;
                width: .45rem;
                height: .6rem;
              }
              .img2 {
                position: absolute;
                left: .3rem;
                top: .075rem;
                z-index: 99;
                width: .3rem;
                height: .45rem;
              }
            }
          }
          .content-wrapper {
            flex: 0 0 50%;
            width: 50%;
            @include columnCenter;
            .title {
              text-align: center;
            }
            .num {
              text-align: center;
              margin-top: .05rem;
            }
          }
        }
      }
    }
  }
</style>
