<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 1">
      <div class="setting-theme">
        <div class="setting-theme-item" v-for="(item, index) in themeList" :key="index"
             @click="setTheme(item.name)">
          <div class="preview"
               :class="{'selected': item.name === defaultTheme}"
               :style="{background: item.style.body.background}"></div>
          <div class="text"
               :class="{'selected': item.name === defaultTheme}">{{item.alias}}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { ebookMixin } from '@/utils/mixin'
  import { saveTheme } from '@/utils/localStorage'

  export default {
    mixins: [ebookMixin],
    methods: {
      setTheme(theme) {
            this.setDefaultTheme(theme).then(() => {
              // this.currentBook.rendition.themes.select(theme)
              // // this.switchTheme()
              // this.setGlobalTheme(theme)
            })
            saveTheme(this.fileName, theme)
            Promise.all([
              this.setGlobalTheme(theme)
            ]).then(()=>{
                this.currentBook.rendition.themes.select(theme)
            })
            // this.currentBook.rendition.themes.select(theme)
              // this.switchTheme()
      },
    },
    mounted() {
      if(this.defaultTheme){
        this.setGlobalTheme(this.defaultTheme)
      }else{
          this.setGlobalTheme('Default')
      }
      
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .setting-wrapper {
    position: absolute;
    bottom: .4rem;
    left: 0;
    z-index: 190;
    width: 100%;
    height: .9rem;
    // background: white;   
    box-shadow: 0 -.08rem .08rem rgba(0, 0, 0, .15);
    .setting-theme {
      height: 100%;
      display: flex;
      .setting-theme-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: .05rem;
        box-sizing: border-box;
        .preview {
          flex: 1;
          border: .01rem solid #ccc;
          box-sizing: border-box;
          border: none;
          &.selected {
            box-shadow: 0 .04rem .06rem 0 rgba(0, 0, 0, .1);
            border: .02rem solid #5e6369;
          }
        }
        .text {
          flex: 0 0 .2rem;
          font-size: .14rem;
          @include center;
          color: #ccc;
          &.selected {
            color: #333;
          }
        }
      }
    }
  }
</style>
