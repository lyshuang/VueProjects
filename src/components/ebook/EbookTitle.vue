<template>
     <transition name="slide-down">
      <div class="title-wrapper" v-show="menuVisible">
        <div class="left">
          <span class="icon-back" @click="back"></span>
        </div>
        <div class="right">
          <div class="icon-wrapper">
            <span class="icon-shelf"></span>
          </div>
          <div class="icon-wrapper">
            <span class="icon-cart"></span>
          </div>
          <div class="icon-wrapper">
            <span class="icon-more"></span>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
import { ebookMixin } from "@/utils/mixin"
    export default {
        mixins: [ebookMixin],
        methods: {
            back(){
              this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/global";
    .title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 120;
    display: flex;
    width: 100%;
    height: .4rem;
    font-size: .2rem;
    // background: white;
    box-shadow: 0 .08rem .08rem rgba(0, 0, 0, .15);
    .left {
      flex: 0 0 .2rem;
      @include left;
      margin-left: .2rem;
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      .icon-wrapper {
        flex: 0 0 .4rem;
        @include right;
        .icon-cart {
          font-size: .2rem;
        }
      }
    }
  }
</style>
