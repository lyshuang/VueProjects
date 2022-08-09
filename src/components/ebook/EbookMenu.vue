<template>
    <div class="ebook-menu">
    <transition name="slide-up">
      <div class="menu-wrapper" :class="{'hide-box-shadow': !menuVisible}" v-show="menuVisible">
        <div class="icon-wrapper">
          <span class="icon-menu" @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress" @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright" @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-A" @click="showSetting(0)"></span>
        </div>
      </div>
    </transition>
    <ebook-setting-font></ebook-setting-font>
    <ebook-setting-font-popup></ebook-setting-font-popup>
    <ebook-setting-theme></ebook-setting-theme>
    <ebook-setting-progress></ebook-setting-progress>
    <ebook-slide></ebook-slide>
    </div>
</template>

<script>
    import { ebookMixin } from "@/utils/mixin"
    import EbookSettingFont from './EbookSettingFont'
    import EbookSettingFontPopup from './EbookSettingFontPopup'
    import EbookSettingTheme from "./EbookSettingTheme"
    import EbookSettingProgress from "./EbookSettingProgress"
    import EbookSlide from "./EbookSlide.vue"

    export default {
        mixins: [ebookMixin],
        components: {
            EbookSettingFont,
            EbookSettingFontPopup,
            EbookSettingTheme,
            EbookSettingProgress,
            EbookSlide
        },
        methods: {
            showSetting(key){
                this.setSettingVisible(key)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/global";
    .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 120;
    display: flex;
    width: 100%;
    height: .4rem;
    font-size: .2rem;
    // background: white;
    // box-shadow: px2rem(8) px2rem(-8) px2rem(20) rgba(0, 0, 0, .15);
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      @include center;
      .icon-progress {
        font-size: .18rem;
      }
      .icon-bright {
        font-size: .18rem;
      }
    }
  }
</style>
