<template>
  <div class="shelf-item"
  :class="{'shelf-item-shadow': data.type === 1 || data.type === 2}"
  @click="onItemClick">
    <component class="shelf-item-comp"
    :class="{'is-edit': isEditMode && data.type === 2}"
    :is="item"
    :data="data"></component>
    <div class="icon-selected"
    v-show="isEditMode && data.type === 1"
    :class="{'is-selected': data.selected}"></div>
  </div>
</template>

<script>
import { storeShelfMixin } from '../../utils/mixin'
import ShelfBook from './ShelfItemBook'
import ShelfCategory from './ShelfItemCategory'
import ShelfAdd from './ShelfItemAdd'
import { gotoStoreHome } from '../../utils/store'
export default {
  mixins: [storeShelfMixin],
  props: {
    data: Object
  },
  computed: {
    item () {
      return this.data.type === 1
      ? this.book
      : (this.data.type === 2 ? this.category : this.add)
    }
  },
  data () {
    return {
      book: ShelfBook,
      category: ShelfCategory,
      add: ShelfAdd
    }
  },
  methods: {
    onItemClick () {
      if (this.isEditMode) {
        this.data.selected = !this.data.selected
        if (this.data.selected) { //book处于选中状态，将当前book加入到selfSelected数组中
          this.shelfSelected.pushWithoutDuplicate(this.data)
        } else { //book处于取消选中状态，将当前book从selfSelected数组中删除
          this.setShelfSelected(
            this.shelfSelected.filter(item => item.id !== this.data.id)
          )
        }
      } else {
        if (this.data.type === 1) {//非编辑模式下点击图书， 正常图书展示图书详情
          this.showBookDetail(this.data)
        } else if (this.data.type === 2) {//展示目录详情
          this.$router.push({
            path: '/store/category',
            query: {
              title: this.data.title
            }
          })
        } else {
          gotoStoreHome(this)
        }
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .shelf-item {
    position: relative;
    width: 100%;
    height: 100%;
    &.shelf-item-shadow {
      box-shadow: .02rem .02rem .06rem .02rem rgba(200, 200, 200, 0.938);
    }
    .shelf-item-comp {
      opacity: 1;
      &.is-edit {
        opacity: .5;
      }
    }
    .icon-selected {
      position: absolute;
      bottom: .02rem;
      right: .02rem;
      font-size: .18rem;
      color: rgba(0, 0, 0, .4);
      &.is-selected {
        color: $color-blue;
      }
    }
  }
</style>
