/*eslint-env es6*/
import { mapGetters, mapActions } from "vuex"
import { FONT_SIZE_LIST, FONT_FAMILY, themeList, getReadTimeByMinute, showBookDetail } from "./book"
import { addCss, removeAllCss } from "./utils"
import * as Storage from './localStorage'
import { shelf } from '../api/book' 
import { gotoBookDetail, appendAddToShelf, computeId, removeAddFromShelf } from './store'

export const storeShelfMixin = {
  computed: {
    ...mapGetters([
      'isEditMode',
      'shelfList',
      'shelfSelected',
      'shelfTitleVisible',
      'offsetY',
      'shelfCategory',
      'currentType'
    ])
  },
  methods: {
    ...mapActions([
      'setIsEditMode',
      'setShelfList',
      'setShelfSelected',
      'setShelfTitleVisible',
      'setOffsetY',
      'setShelfCategory',
      'setCurrentType'
    ]),
    showBookDetail(book) {
      gotoBookDetail(this, book)
    },
    getCategoryList(title) {
      this.getShelfList().then(() => {
        const categoryList = this.shelfList.filter(book => book.type === 2 && book.title === title)[0]
        this.setShelfCategory(categoryList)
      })
    },
    getShelfList() {
      let shelfList = Storage.getBookShelf()
      if (!shelfList) {
        shelf().then(response => {
          // console.log('shelf-list:', response);
          if (response.status === 200 && response.data && response.data.bookList) {
            shelfList = appendAddToShelf(response.data.bookList)
            Storage.saveBookShelf(shelfList)
            return this.setShelfList(shelfList)
          }
        })
      } else {
        return this.setShelfList(shelfList)
      }
    },
    moveOutOfGroup(f) {
      this.setShelfList(this.shelfList.map(book => {
        if (book.type === 2 && book.itemList) {
          book.itemList = book.itemList.filter(subBook => !subBook.selected)
        }
        return book
      })).then(() => {//将要移除的books添加到书架最后
        const list = computeId(appendAddToShelf([].concat(removeAddFromShelf(this.shelfList), ...this.shelfSelected)))
        this.setShelfList(list).then(() => {
          this.simpleToast(this.$t('shelf.moveBookOutSuccess'))
          if (f) f()
        })
      })
    }
  }
}
export const storeHomeMixin = {
  computed: {
    ...mapGetters(['offsetY', 'hotSearchOffsetY', 'flapCardVisible'])
  },
  methods: {
    ...mapActions(['setOffsetY', 'setHotSearchOffsetY', 'setFlapCardVisible']),
    showBookDetail(book) {
      this.$router.push({
        path: '/store/detail',
        query: {
          fileName: book.fileName,
          category: book.categoryText
        }
      })
    }
  }
}

export const ebookHome = {
    methods: {
      showBookDetail(item) {
        showBookDetail(this, item)
      }
    }
}
export const ebookMixin = {
    computed: {
        ...mapGetters([
            'fileName',
            'menuVisible',
            'settingVisible',
            'defaultFontSize',
            'defaultFontFamily',
            'fontFamilyVisible',
            'defaultTheme',
            'bookAvailable',
            'progress',
            'section',
            'isPaginating',
            'currentBook',
            'navigation',
            'cover',
            'metadata',
            'paginate',
            'pagelist',
            'offsetY',
            'isBookmark',
            'speakingIconBottom'
        ]),
        themeList() {
            return themeList(this)
        },
        getSectionName() {
            if (this.section) {
              const section = this.currentBook.section(this.section)
              if (section && section.href && this.currentBook && this.currentBook.navigation) {
                return this.currentBook.navigation.get(section.href).label
                // return this.navigation[this.section].label
              }
            }
            // return this.section ? this.navigation[this.section].label : ''
          }
    },
    data(){
        return {
            fontSizeList: FONT_SIZE_LIST,
            fontFamily: FONT_FAMILY
        }
    },
    methods: {
        ...mapActions([
            'setMenuVisible',
            'setFileName',
            'setSettingVisible',
            'setDefaultFontSize',
            'setDefaultFontFamily',
            'setFontFamilyVisible',
            'setDefaultTheme',
            'setBookAvailable',
            'setProgress',
            'setSection',
            'setIsPaginating',
            'setCurrentBook',
            'setNavigation',
            'setCover',
            'setMetadata',
            'setPaginate',
            'setPagelist',
            'setOffsetY',
            'setIsBookmark',
            'setSpeakingIconBottom'
        ]),
        showFontFamilySetting() {
            this.setFontFamilyVisible(true)
          },
          showSetting(key) {
            this.setSettingVisible(key)
          },
          hideMenuVisible() {
            this.setMenuVisible(false)
            this.setSettingVisible(-1)
            this.setFontFamilyVisible(false)
          },
          toggleMenuVisible() {
            if (this.menuVisible) {
              this.setSettingVisible(-1)
              this.setFontFamilyVisible(false)
            }
            this.setMenuVisible(!this.menuVisible)
          },
          hideFontFamilySetting() {
            this.setFontFamilyVisible(false)
          },
          hideTitleAndMenu(){
            this.setMenuVisible(false)
            this.setSettingVisible(-1)
            this.setFontFamilyVisible(false)
        },
          setGlobalTheme(theme) {
            removeAllCss()
            // let baseURL='../assets'
            switch (theme) {
              case 'Default':
                // addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
                addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
                break
              case 'Eye':
                addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
                break
              case 'Gold':
                addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
                break
              case 'Night':
                addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
                break
              default:
                // this.setDefaultTheme('Default')
                addCss(`${baseURL}/theme/theme_default.css`)
                break
            }
          },
          // setGlobalTheme(theme){
          //   switch(theme){
          //     case 'Default':
          //       addCss('#cecece')
          //       break
          //     case 'Eye':
          //       addCss('#a9c1a9')
          //       break
          //     case 'Gold':
          //       addCss('#c6c2b6')
          //       break;
          //     case 'Night':
          //       addCss('#000')

          //   }
          // },
          registerTheme() {
            this.themeList.forEach(theme => {
              this.currentBook.rendition.themes.register(theme.name, theme.style)
            })
          },
          switchTheme() {
            const rules = this.themeList.filter(theme => theme.name === this.defaultTheme)[0]
            if (this.defaultFontFamily && this.defaultFontFamily !== 'Default') {
              rules.style.body['font-family'] = `${this.defaultFontFamily}!important`
            } else {
              rules.style.body['font-family'] = `Times New Roman!important`
            }
            // this.registerTheme()
            this.currentBook.rendition.themes.select(this.defaultTheme)
            this.currentBook.rendition.themes.fontSize(this.defaultFontSize)
            this.setGlobalTheme(this.defaultTheme)
          },
          setFontSize(fontSize) {
            this.setDefaultFontSize(fontSize).then(() => {
              this.switchTheme()
              Storage.saveFontSize(this.fileName, fontSize)
            })
          },
          // setTheme(theme) {
          //   this.setDefaultTheme(theme).then(() => {
          //     this.switchTheme()
          //     Storage.saveTheme(this.fileName, theme)
          //   })
          // },
          setFontFamily(font) {
            this.setDefaultFontFamily(font).then(() => {
              this.switchTheme()
              Storage.saveFontFamily(this.fileName, font)
            })
          },
          displaySection(cb) {
            const section = this.currentBook.section(this.section)
            if (section && section.href) {
                this.currentBook.rendition.display(section.href).then(() => {
                this.refreshLocation()
                if (cb) cb()
              })
            }
          },
          displayProgress() {
            const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
            this.currentBook.rendition.display(cfi).then(() => {
                this.refreshLocation()
            })
          },
          
          display(target, highlight = false) {
            if (target) {
              this.currentBook.rendition.display(target).then(() => {
                if (highlight) {
                  if (target.startsWith('epubcfi')) {
                    this.currentBook.getRange(target).then(range => {
                      this.currentBook.rendition.annotations.highlight(target, {}, (e) => {
                      })
                    })
                  }
                }
                this.refreshLocation()
              })
            } else {
              this.currentBook.rendition.display().then(() => {
                this.refreshLocation()
              })
            }
            this.hideMenuVisible()
          },
          refreshLocation() {
            const currentLocation = this.currentBook.rendition.currentLocation()
            // console.log(currentLocation); 
            if (currentLocation.start && currentLocation.start.index) {
              this.setSection(currentLocation.start.index)
              const progress = this.currentBook.locations.percentageFromCfi(currentLocation.start.cfi)
              this.setProgress(Math.floor(progress * 100))
              if (this.pagelist) {
                if (currentLocation.start.location <= 0) {
                  this.setPaginate('')
                } else {
                  this.setPaginate(currentLocation.start.location + ' / ' + this.pagelist.length)
                }
              } else {
                this.setPaginate('')
              }
              // 判断当前页是否是书签
              const cfistart = currentLocation.start.cfi
              const bookmark = Storage.getBookmark(this.fileName)
              if (bookmark) {
                if (bookmark.some(item => item.cfi === cfistart)) {
                  this.setIsBookmark(true)
                } else {
                  this.setIsBookmark(false)
                }
              } else {
                this.setIsBookmark(false)
              }
              Storage.saveLocation(this.fileName, cfistart)
            }
          },
          getReadTime() {
            return this.$t('book.haveRead').replace('$1', getReadTimeByMinute(this.fileName))
            // return ''
          }
    }
}
