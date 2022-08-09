<template>
  <div class="bottom-wrapper" :class="{'hide-play': !showPlay}">
    <div class="bottom-playing-wrapper" @click.stop.prevent="onPlayingCardClick" v-if="showPlay">
      <div class="bottom-playing-left">
        <div class="icon-play-wrapper" @click.stop.prevent="togglePlay">
          <span class="icon-play_go" v-if="!isPlaying"></span>
          <span class="icon-play_pause" v-else></span>
        </div>
      </div>
      <div class="bottom-playing-right">
        <div class="bottom-playing-chapter-text">
          <span class="chapter-label">{{chapter ? chapter.label : ''}}</span>
          <span class="bottom-playing-page-text" v-if="currentSectionIndex && currentSectionTotal">( {{currentSectionIndex}} / {{currentSectionTotal}} )</span>
        </div>
        <div class="bottom-playing-page-text">{{playInfo ? playInfo.currentMinute : '00'}}:{{playInfo ? playInfo.currentSecond : '00'}} / {{playInfo ? playInfo.totalMinute : '00'}}:{{playInfo ? playInfo.totalSecond : '00'}}</div>
      </div>
    </div>
    <div class="bottom-btn-wrapper">
      <span class="bottom-btn-text">{{$t('detail.addOrRemoveShelf')}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      chapter: Object,
      currentSectionIndex: Number,
      currentSectionTotal: Number,
      showPlay: Boolean,
      isPlaying: Boolean,
      playInfo: Object
    },
    methods: {
      togglePlay() {
        this.$parent.togglePlay()
      },
      onPlayingCardClick() {
        this.$emit('onPlayingCardClick')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .bottom-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 110;
    width: 100%;
    height: 1.16rem;
    background: white;
    box-shadow: 0 -.02rem .02rem 0 rgba(0, 0, 0, .1);
    &.hide-play {
      height: .52rem;
    }
    .bottom-playing-wrapper {
      display: flex;
      width: 100%;
      height: .64rem;
      .bottom-playing-left {
        flex: 0 0 .7rem;
        width: .7rem;
        @include center;
        .icon-play-wrapper {
          flex: 0 0 1rem;
          @include center;
          &:active {
            opacity: .5;
          }
          .icon-play_go {
            font-size: .4rem;
            color: $color-blue;
          }
          .icon-play_pause {
            font-size: .4rem;
            color: $color-blue;
          }
        }
      }
      .bottom-playing-right {
        flex: 1;
        padding-right: .15rem;
        box-sizing: border-box;
        @include columnLeft;
        .bottom-playing-chapter-text {
          max-width: 3.05rem;
          color: #333;
          font-size: .16rem;
          line-height: .19rem;
          @include ellipsis;
        }
        .bottom-playing-page-text {
          color: #666;
          font-size: .1rem;
          margin-top: .05rem;
        }
      }
    }
    .bottom-btn-wrapper {
      width: 100%;
      height: .52rem;
      border-top: .01rem solid #eee;
      box-sizing: border-box;
      @include center;
      .bottom-btn-text {
        font-size: .14rem;
        color: $color-blue;
        font-weight: bold;
      }
    }
  }
</style>
