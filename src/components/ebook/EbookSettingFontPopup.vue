<template>
  <transition name="popup-slide-up" v-if="fontFamilyVisible">
    <div class="ebook-popup-list" >
      <div class="ebook-popup-title">
        <div class="ebook-popup-title-icon" @click="hideFontFamilySetting">
          <span class="icon-down2"></span>
        </div>
        <span class="ebook-popup-title-text">{{$t('book.selectFont')}}</span>
      </div>
      <div class="ebook-popup-list-wrapper">
        <div class="ebook-popup-item" v-for="(item, index) in fontFamilyList" :key="index"
             @click="setFontFamily(item.font)">
          <div class="ebook-popup-item-text" :class="{'selected': isSelected(item)}">{{item.font}}</div>
          <div class="ebook-popup-item-check" v-if="isSelected(item)">
            <span class="icon-check"></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { FONT_FAMILY } from '@/utils/book'
import { ebookMixin } from '@/utils/mixin'
import { saveFontFamily } from '@/utils/localStorage'
export default {
    mixins: [ebookMixin],
    data(){
      return {
        fontFamilyList: FONT_FAMILY
      }
    },
    methods: {
      isSelected(item) {
        return this.defaultFontFamily === item.font
      },
      hideFontFamilySetting(){
        this.setFontFamilyVisible(false)
      },
      setFontFamily(font){
        this.setDefaultFontFamily(font)
        saveFontFamily(this.fileName, font)
        if (font === 'Default') {
            this.currentBook.rendition.themes.font('Times New Roman')
        } else {
          this.currentBook.rendition.themes.font(font)
        }
      }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .ebook-popup-list {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 350;
    width: 100%;
    font-size: 0;
    // background: white;
    box-shadow: 0 -.04rem 0.06rem rgba(0, 0, 0, .1);
    .ebook-popup-title {
      position: relative;
      text-align: center;
      padding: .15rem;
      border-bottom: .01rem solid #b8b9bb;
      box-sizing: border-box;
      @include center;
      .ebook-popup-title-text {
        font-size: .14rem;
        font-weight: bold;
      }
      .ebook-popup-title-icon {
        position: absolute;
        left: .15rem;
        top: 0;
        height: 100%;
        @include center;
        .icon-down2 {
          font-size: .16rem;
          font-weight: bold;
        }
      }
    }
    .ebook-popup-list-wrapper {
      .ebook-popup-item {
        display: flex;
        padding: .15rem;
        .ebook-popup-item-text {
          flex: 1;
          font-size: .14rem;
          text-align: left;
          &.selected {
            color: #346cb9;
            font-weight: bold;
          }
        }
        .ebook-popup-item-check {
          flex: 1;
          text-align: right;
          .icon-check {
            font-size: .14rem;
            font-weight: bold;
            color: #346cb9;
          }
        }
      }
    }
  }
</style>
