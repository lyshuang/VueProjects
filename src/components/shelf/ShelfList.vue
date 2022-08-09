<template>
  <div class="shelf-list" :style="{top: shelfListTop}">
    <transition-group name="list" tag="div" id="shelf-list">
      <div class="shelf-list-item-wrapper" v-for="item in data" :key="item.id">
        <shelf-item :data="item" :style="{height: itemHeight}"></shelf-item>
        <div class="shelf-list-title-wrapper">
          <span class="shelf-list-title title-small">{{item.title}}</span>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { storeShelfMixin } from '../../utils/mixin'
import ShelfItem from './ShelfItem'
import { realPx } from '../../utils/utils'

export default {
  mixins: [storeShelfMixin],
  components: {
    ShelfItem
  },
  props: {
    top: {
      type: Number,
      default: 94
    },
    data: Array
  },
  computed: {
    itemHeight () {
      // 图片的宽高比：250/350
      // w/25 = h/350
      // h = w*350/250
      // 因为书架每一行有3个item，每个item都有左右15px的padding
      // 一行的padding：15*2*3+15*2（最外层的padding）=120
      return ((window.innerWidth - realPx(120)) / 3) / 250 * 350 + 'px'
    },
    shelfListTop () {
      // return px2rem(this.top) + 'rem'
      return this.top / 100 + 'rem'
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .shelf-list {
    position: absolute;
    left: 0;
    z-index: 100;
    width: 100%; 
    #shelf-list {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      box-sizing: border-box;
      padding: 0 .15rem;
      .shelf-list-item-wrapper {
        flex: 0 0 33.33%;
        width: 33.33%;
        padding: .15rem;
        box-sizing: border-box;
        &.list-leave-active {
          display: none; //只要让她为none, transition过渡动画才会生效
        }
        &.list-move {
          transition: transform .5s;
        }
        .shelf-list-title-wrapper {
          margin-top: .1rem;
        }
      }
    }
    
  }
</style>
