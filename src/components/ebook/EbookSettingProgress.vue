<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 2">
      <div class="setting-progress">
        <div class="read-time-wrapper">
          <span class="read-time-text">{{getReadTime()}}</span>
          <span class="icon-forward"></span>
        </div>
        <div class="progress-wrapper">
          <div class="progress-icon-wrapper">
            <span class="icon-back" @click="prevSection()"></span>
          </div>
          <input class="progress" type="range"
                 max="100"
                 min="0"
                 step="1"
                 @input="onProgressInput($event.target.value)"
                 @change="onProgressChange($event.target.value)"
                 :value="progress"
                 :disabled="!bookAvailable"
                 ref="progress">
          <div class="progress-icon-wrapper" @click="nextSection()">
            <span class="icon-forward"></span>
          </div>
        </div>
        <div class="text-wrapper">
          <span class="progress-section-text">{{getSectionName}}</span>
          <span class="progress-text">({{bookAvailable ? progress + '%' : $t('book.loading')}})</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { ebookMixin } from '../../utils/mixin'
  import { saveProgress } from '../../utils/localStorage'

  export default {
    mixins: [ebookMixin],
    data() {
      return {
        isProgressLoading: false
      }
    },
    methods: {
      prevSection() {
        if (this.section > 0 && !this.isProgressLoading) {
          this.isProgressLoading = true
          this.setSection(this.section - 1).then(() => {
            this.displaySection(() => {
              this.updateProgressBg()
              this.isProgressLoading = false
            })
          })
        }
      },
      nextSection() {
        // spine是书的总章节
        if (this.currentBook.spine.length - 1 > this.section && !this.isProgressLoading) {
          this.isProgressLoading = true
          this.setSection(this.section + 1).then(() => {
            this.displaySection(() => {
              this.updateProgressBg()
              this.isProgressLoading = false
            })
          })
        }
      },
      onProgressInput(progress) {
        this.setProgress(progress).then(() => {
          this.updateProgressBg()
          this.displayProgress()
        })
      },
      onProgressChange(progress) {
        this.setProgress(progress).then(() => {
          this.updateProgressBg()
          this.displayProgress()
        })
        saveProgress(this.fileName, progress)
      },
      updateProgressBg() {
        this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
      }
    },
    updated() {
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
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
    box-shadow: 0 -.08rem .08rem rgba(0, 0, 0, .15);
    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;
      .read-time-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: .4rem;
        @include center;
        font-size: .12rem;
      }
      .progress-wrapper {
        width: 100%;
        height: 100%;
        @include center;
        padding: 0 .15rem;
        box-sizing: border-box;
        .progress {
          flex: 1;
          width: 100%;
          -webkit-appearance: none;
          height: .02rem;
          background: -webkit-linear-gradient(#5d6268, #5d6268) no-repeat, #b4b5b7;
          background-size: 0 100% !important;
          margin: 0 .1rem;
          &:focus {
            outline: none;
          }
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: .2rem;
            width: .2rem;
            border-radius: 50%;
            background: #ceced0;
            box-shadow: 0 .04rem .06rem 0 rgba(0, 0, 0, .15);
            border: none;
          }
        }
        .progress-icon-wrapper {
          flex: 0 0 .22rem;
          font-size: .22rem;
          @include center;
        }
      }
      .text-wrapper {
        position: absolute;
        left: 0;
        bottom: .05rem;
        width: 100%;
        font-size: .12rem;
        text-align: center;
        padding: 0 .15rem;
        box-sizing: border-box;
        @include center;
        .progress-section-text {
          line-height: .15rem;
          @include ellipsis;
        }
      }
    }
  }
</style>
