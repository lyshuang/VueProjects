<template>
  <div class="ebook-bookmark" ref="ebookBookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper" ref="iconDown">
        <span class="icon-down"></span>
      </div>
      <div class="ebook-bookmark-text">
        {{text}}
      </div>
    </div>
    <div class="ebook-bookmark-icon-wrapper" :style="isFixed ? fixedStyle : {}">
      <bookmark :width="15" :height="35" :color="color" ref="bookmark"></bookmark>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Bookmark from '../common/Bookmark'
  import { realPx } from '@/utils/utils'
  import { ebookMixin } from '@/utils/mixin'
  import { saveBookmark, getBookmark } from '../../utils/localStorage'

  const BLUE = '#346cbc'
  const WHITE = '#fff'
  export default {
    mixins: [ebookMixin],
    components: {
      Bookmark
    },
    computed: {
      height() {
        return realPx(35)
      },
      threshold() {
        return realPx(50)
      },
      fixedStyle() {
        return {
          position: 'fixed',
          right: `${(window.innerWidth - this.$refs.ebookBookmark.clientWidth) / 2}px`,
          top: 0
        }
      }
    },
    watch: {
      offsetY(v) {
        if (this.settingVisible > 0 || this.menuVisible || this.settingVisible >= 0) {
          return
        }
         //状态2：未到达零界状态
        if (v >= this.height && v < this.threshold) {
            this.beforeThreshold(v)
        } else if (v >= this.threshold) { //状态3：超越零界状态
            this.afterThreshold(v)         
        } else if (v > 0 && v < this.height) { //状态1
          // this.setBookmark = false
          this.beforeHight()
        } else if (v === 0) {
          this.restore()
        }
      },
      isBookmark(v) {
        this.isFixed = v
        if (v) { //如果是书签则更改颜色
          this.color = BLUE
        } else {
          this.color = WHITE
        }
      }
    },
    data() {
      return {
        color: WHITE,
        text: this.$t('book.pulldownAddMark'),
        setBookmark: false,
        isFixed: false
      }
    },
    methods: {
      restore(){ //状态4：归位操作
        setTimeout(() => {
          this.$refs.bookmark.style.top = `${-this.height / 100}rem`
          this.$refs.iconDown.style.transform = 'rotate(0deg)'
        }, 200)
        if (this.isFixed){ //如果已经固定了则将书签当前页内容保存到localStorge中
          this.setIsBookmark(true)
          this.addBookmark()
        } else {
          this.removeBookmark()
        }
      },
      beforeHight(){ //状态1：未超过书签高度
        if (!this.isBookmark) { //第一次向下拉添加书签
            this.text = this.$t('book.pulldownAddMark') //下拉添加书签
            this.color = WHITE   
            this.isFixed = false         
          } else { //第二次向下拉删除书签
            this.text = this.$t('book.pulldownDeleteMark')//下拉删除书签
            this.color = BLUE
            this.isFixed = true
          }                   
      },
      beforeThreshold(v){
        //状态2：未到达零界状态
        //让ebookBookmark一起拖动，实现相对静止
          this.$refs.ebookBookmark.style.top = `${-v / 100}rem`
          // console.log('ebookBookmark top:', this.$refs.ebookBookmark.style.top);
          const iconDown = this.$refs.iconDown
          this.beforeHight()
          if (iconDown.style.transform === 'rotate(180deg)') {
             iconDown.style.transform = 'rotate(0deg)'
          }
          this.isFixed = false
      },
      afterThreshold(v){ //状态3：超越零界状态
        this.$refs.ebookBookmark.style.top = `${-v / 100}rem`
          if (this.$refs.iconDown.style.transform === 'rotate(0deg)' ||
            this.$refs.iconDown.style.transform === '') {
            this.$refs.iconDown.style.transform = 'rotate(180deg)'
          }
          if (!this.isBookmark) {
            this.text = this.$t('book.releaseAddMark') //松手添加书签
            this.color = BLUE
            this.isFixed = true
          } else {
            this.text = this.$t('book.releaseDeleteMark') //松手删除书签
            this.color = WHITE
            this.isFixed = false
          }
      },
      addBookmark() {
        this.bookmark = getBookmark(this.fileName)
        if (!this.bookmark) {
          this.bookmark = []
        }
        const currentLocation = this.currentBook.rendition.currentLocation()
        // console.log('currentLocation:', currentLocation);
        //找到!之后的内容
        // const cfibase = currentLocation.start.cfi.replace(/!.*/, '').replace('epubcfi(', '')
        // cfibase: epubcfi(6/4[A387243_1_En_Book Frontmatter_OnlinePDF])
        const cfibase = currentLocation.start.cfi.replace(/!.*/, '')
        // console.log('cfibase:', cfibase)
        const cfistart = currentLocation.start.cfi.replace(/.*!/, '').replace(/\)$/, '')
        const cfiend = currentLocation.end.cfi.replace(/.*!/, '').replace(/\)$/, '')
        // console.log('cfistart:', cfistart, 'cfiend:', cfiend);
        //cfiRange: epubcfi(epubcfi(/6/4!,/4/2/2/2/1:0,/4/2/6/16/6/1:243)
        const cfiRange = `${cfibase}!,${cfistart},${cfiend})`
        const cfi = currentLocation.start.cfi
        //获取这个范围内的内容
        this.currentBook.getRange(cfiRange).then(range => {
          // console.log('range:', range);
          let text = range.toString()
          //查找两个空格
          text = text.replace(/\s\s/g, '')
          text = text.replace(/\r/g, '')
          text = text.replace(/\n/g, '')
          text = text.replace(/\t/g, '')
          text = text.replace(/\f/g, '')
          this.bookmark.push({
            cfi: cfi,
            text: text
          })
          this.setIsBookmark(true)
          saveBookmark(this.fileName, this.bookmark)
        })
      },
      removeBookmark() {
        const currentLocation = this.currentBook.rendition.currentLocation()
        const cfi = currentLocation.start.cfi
        this.bookmark = getBookmark(this.fileName)
        if (this.bookmark) {
          this.bookmark = this.bookmark.filter(item => item.cfi !== cfi)
          saveBookmark(this.fileName, this.bookmark)
        }
        // console.log('bookmark:', this.bookmark)
        this.setIsBookmark(false)
      }
    }
}
  
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .ebook-bookmark {
    position: absolute;
    top: -.35rem;
    left: 0;
    z-index: 500;
    width: 100%;
    height: .35rem;
    .ebook-bookmark-text-wrapper {
      position: absolute;
      right: .45rem;
      bottom: 0;
      display: flex;
      .ebook-bookmark-down-wrapper {
        font-size: .14rem;
        color: white;
        transition: all .2s linear;
        @include center;
      }
      .ebook-bookmark-text {
        font-size: .14rem;
        color: white;
      }
    }
    .ebook-bookmark-icon-wrapper {
      position: absolute;
      right: 0;
      bottom: 0;
      margin-right: .1rem;
    }
  }
</style>
