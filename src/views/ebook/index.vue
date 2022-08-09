<template>
    <div class="ebook" ref="ebook">
        <ebook-header></ebook-header>
        <ebook-title></ebook-title>
        <ebook-reader></ebook-reader>
        <ebook-menu></ebook-menu>
        <ebook-bookmark></ebook-bookmark>
        <ebook-footer></ebook-footer>
    </div>
</template>

<script>
import EbookReader from '../../components/ebook/EbookReader'
import EbookTitle from '@/components/ebook/EbookTitle'
import EbookMenu from '@/components/ebook/EbookMenu.vue'
import { getReadTime, saveReadTime } from '../../utils/localStorage'
import { ebookMixin } from '@/utils/mixin'
import EbookBookmark from '@/components/ebook/EbookBookmark'
import EbookHeader from '@/components/ebook/EbookHeader'
import EbookFooter from '@/components/ebook/EbookFooter'

export default {
mixins: [ebookMixin],
  components: { EbookReader, EbookTitle, EbookMenu, EbookBookmark, EbookHeader, EbookFooter},
  watch: {
    offsetY(v){ //监听offsetY值，如果有变化则移动
        if (!this.menuVisible && this.bookAvailable){ //当标题栏存在并还在分页时不能下拉
          if (v > 0) {
            this.move(v)
          } else if (v === 0) {//下拉触发moveEnd事件，offsetY=0
            this.restore()
          }
        }
    }
  },
  methods: {
    restore(){
        this.$refs.ebook.style.top = 0
        this.$refs.ebook.style.transition = 'all .2s linear'
        setTimeout(() => {//下拉松开完成清除动画，防止动画影响下一次下拉
          this.$refs.ebook.style.transition = ''
        }, 200)
    },
      move(v){
        this.$refs.ebook.style.top = v / 100 + 'rem'
      },
      startLoopReadTime() {
        //从localStore中获取该图书的阅读时间
        let readTime = getReadTime(this.fileName)
        if (!readTime) {
          readTime = 0
        }
        this.task = setInterval(() => {
          // 每秒累加
          readTime++
          if (readTime % 30 === 0) {
            //将阅读时间每半个小时保存
            saveReadTime(this.fileName, readTime)
          }
        }, 1000)
      },
  },  
  mounted() {
      this.startLoopReadTime()
    },
    beforeDestroy() {
      if (this.task) {
        clearInterval(this.task)
      }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/global";
    .ebook {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
