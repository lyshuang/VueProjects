<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 0">
      <div class="setting-font-size">
        <div class="preview" :style="{fontSize: fontSizeList[0].fontSize + 'px'}">A</div>
        <div class="select">
          <div class="select-wrapper" v-for="(item, index) in fontSizeList" :key="index" @click="setFontSize(item.fontSize)">
            <div class="line"></div>
            <span class="fontSize-point"></span>
            <div class="point-wrapper">
              <div class="point" v-show="defaultFontSize === item.fontSize">
                <div class="small-point"></div>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div class="preview" :style="{fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'}">A</div>
      </div>
      <div class="setting-font-family" @click.stop="showFontFamilyPopup">
        <div class="setting-font-family-text-wrapper">
          <span class="setting-font-family-text">{{defaultFontFamily}}</span>
        </div>
        <div class="setting-font-family-icon-wrapper">
          <span class="icon-forward"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
import { saveFontSize } from '@/utils/localStorage'
export default {
    mixins: [ebookMixin],
    data() {
      return {
        styleLeft: {},
        styleRight: {}
      }
    },
    methods: {
        setFontSize(fontSize){
          // console.log('fontSize:', fontSize);
            this.setDefaultFontSize(fontSize)
            saveFontSize(this.fileName, fontSize)
            this.currentBook.rendition.themes.fontSize(fontSize  + 'px')
        },
        showFontFamilyPopup(){
            // console.log('clicked')
            this.setFontFamilyVisible(true)
        }
    //   genStyle() {
    //     const left = this.$refs.left.getBoundingClientRect().width
    //     const right = this.$refs.left.getBoundingClientRect().width
    //     const leftText = this.$refs.leftText.getBoundingClientRect().width
    //     const rightText = this.$refs.leftText.getBoundingClientRect().width
    //     const item = this.$refs.item[0].getBoundingClientRect().width
    //     this.styleLeft = {
    //       marginLeft: (left + item - leftText) / 2 + 'px',
    //       fontSize: this.fontSizeList[0].fontSize + 'px'
    //     }
    //     this.styleRight = {
    //       marginRight: (right + item - rightText) / 2 + 'px',
    //       fontSize: this.fontSizeList[this.fontSizeList.length - 1].fontSize + 'px'
    //     }
    //   }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
.setting-wrapper {
    position: absolute;
    bottom: .4rem;
    left: 0;
    z-index: 190;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: .8rem;
    // background: white;
    border-bottom: .01rem solid rgba(0, 0, 0, .10);
    border-top: .01rem solid rgba(0, 0, 0, .10);
    // box-shadow: px2rem(8) px2rem(-8) px2rem(20) rgba(0, 0, 0, .15);
    .setting-font-size {
      flex: 2;
      display: flex;
      height: 100%;
      .preview {
        flex: 0 0 .4rem;
        @include center;
      }
      .select {
        display: flex;
        flex: 1;
        .select-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          &:first-child {
            .line {
              &:first-child {
                border-top: none;
              }
            }
          }
          &:last-child {
            .line {
              &:last-child {
                border-top: none;
              }
            }
          }
          .line {
            flex: 1;
            height: 0;
            border-top: .01rem solid #ccc;
          }
          .fontSize-point{
                width: .03rem;
                height: .03rem;
                background: #ccc;
                border-radius: 50%;
            }
          .point-wrapper {
            position: relative;
            flex: 0 0 0;
            width: 0;
            // height: .15rem;
            border-left: .01rem solid #ccc;
            .point {
              position: absolute;
              top: -.08rem;
              left: -.1rem;
              width: .15rem;
              height: .15rem;
              border-radius: 50%;
              background: white;
              border: .01rem solid #ccc;
              box-shadow: 0 .04rem .04rem rgba(0, 0, 0, .15);
              @include center;
              .small-point {
                width: .05rem;
                height: .05rem;
                background: black;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
    .setting-font-family {
      flex: 1;
      font-size: .14rem;
      @include center;
      .setting-font-family-text-wrapper {
        @include center;
      }
      .setting-font-family-icon-wrapper {
        @include center;
      }
    }
  }
</style>
