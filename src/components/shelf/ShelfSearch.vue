<template>
  <div class="shelf-search-wrapper"
  :class="{'search-top': ifInputClicked, 'hide-shadow': ifHideShadow}">
    <div class="shelf-search" :class="{'search-top': ifInputClicked}">
      <div class="search-wrapper">
        <div class="icon-search-wrapper">
          <span class="icon-search icon"></span>
        </div>
        <div class="search-input-wrapper">
          <input
          type="text"
          class="search-input"
          :placeholder="$t('shelf.search')"
          @click="onSearchClick"
          v-model="searchText"
          >
        </div>
        <div class="icon-clear-wrapper" v-show="searchText.length > 0" @click="clearSearchText">
          <span class="icon-close-circle-fill"></span>
        </div>
      </div>
      <div class="icon-locale-wrapper" v-if="!ifInputClicked" @click="switchLocale">
        <span class="icon-cn icon" v-if="lang === 'cn'"></span>
        <span class="icon-en icon" v-else></span>
      </div>
      <div class="cancel-btn-wrapper" @click="onCancelClick" v-else>
        <span class="cancel-text">{{$t('shelf.cancel')}}</span>
      </div>
    </div>
    <transition name="hot-search-move">
      <div class="shelf-search-tab-wrapper" v-if="ifInputClicked">
        <div class="shelf-search-tab-item"
        v-for="item in tabs"
        :key="item.id"
        @click="onTabClick(item.id)">
          <span class="shelf-search-tab-text"
          :class="{'is-selected': item.id === selectedTab}">
            {{item.text}}
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { setLocalStorage } from '@/utils/localStorage'
import { storeShelfMixin } from '../../utils/mixin'
export default {
  mixins: [storeShelfMixin],
  computed: {
    lang () {
      return this.$i18n.locale
    },
    tabs() {
      return [
        {
          id: 1,
          text: this.$t('shelf.default')
        },
        {
          id: 2,
          text: this.$t('shelf.progress')
        },
        {
          id: 3,
          text: this.$t('shelf.purchase')
        }
      ]
    }
  },
  watch: {
    offsetY(offsetY) {
      if (offsetY > 0 && this.ifInputClicked) { //发生滚动，点击搜索框出现阴影
        this.ifHideShadow = false
      } else {
        this.ifHideShadow = true
      }
    }
  },
  data () {
    return {
      ifInputClicked: false,
      searchText: '',
      selectedTab: 1,
      ifHideShadow: true
    }
  },
  methods: {
    onSearchClick () {
      this.ifInputClicked = true
      this.setShelfTitleVisible(false)
    },
    onCancelClick () {
      this.ifInputClicked = false
      this.setShelfTitleVisible(true)
    },
    switchLocale () {
      if (this.lang === 'en') {
        this.$i18n.locale = 'cn'
      } else {
        this.$i18n.locale = 'en'
      }
      setLocalStorage('locale', this.$i18n.locale)
    },
    clearSearchText () {
      this.searchText = ''
    },
    onTabClick (id) {
      this.selectedTab = id
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .shelf-search-wrapper {
    position: absolute;
    z-index: 105;
    width: 100%;
    top: 0;
    height: .94rem;
    font-size: .16rem;
    background-color: #fff;
    box-shadow: 0 .02rem .02rem 0 rgba(0, 0, 0, 0.1);
    &.search-top {
      position: fixed;
      left: 0;
      top: 0;
    }
    &.hide-shadow {
      box-shadow: none;
    }
    .shelf-search {
      position: absolute;
      top: .42rem;
      left: 0;
      z-index: 105;
      display: flex;
      width: 100%;
      height: .52rem;
      transition: top $animationTime linear;
      &.search-top {
        top: 0;
      }
      .search-wrapper {
        flex: 1;
        display: flex;
        margin: .08rem 0 .08rem .1rem;
        border: .01rem solid #ccc;
        border-radius: .03rem;
        .icon-search-wrapper {
          flex: 0 0 .22rem;
          @include right;
          .icon-search {
            font-size: .12rem;
          }
        }
        .search-input-wrapper {
          flex: 1;
          padding: 0 .1rem;
          box-sizing: border-box;
          @include center;
          .search-input {
            width: 100%;
            font-size: .14rem;
            color: #333;
            border: none;
            &:focus {
              outline: none;
            }
            &::-webkit-input-placeholder {
              font-size: .14rem;
              color: #ccc;
            }
          }
        }
        .icon-clear-wrapper {
          flex: 0 0 .24rem;
          @include left;
          .icon-close-circle-fill {
            font-size: .14rem;
            color: #ccc;
          }
        }
      }
      .icon-locale-wrapper {
        flex: 0 0 .55rem;
        @include center;
        .icon-cn, .icon-en {
          font-size: .22rem;
          color: #666;
        }
      }
      .cancel-btn-wrapper {
        flex: 0 0 .55rem;
        @include center;
        .cancel-text {
          font-size: .14rem;
          color: $color-blue;
        }
      }
    }
    .shelf-search-tab-wrapper {
      position: absolute;
      top: .52rem;
      left: 0;
      z-index: 105;
      display: flex;
      width: 100%;
      height: .42rem;
      .shelf-search-tab-item {
        flex: 1;
        @include center;
        .shelf-search-tab-text {
          font-size: .12rem;
          color: #999;
          &.is-selected {
            color: $color-blue;
          }
        }
      }
    }
  }
</style>
