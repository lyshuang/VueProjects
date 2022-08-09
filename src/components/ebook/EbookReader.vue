<template>
    <div class="ebook-reader">        
        <div class="ebook-reader-mask"
            @touchmove="move"
            @touchend="moveEnd"
            @mousedown.left="onMouseEnter"
            @mousemove.left="onMouseMove"
            @mouseup.left="onMouseEnd" @click="onMaskClick">
        </div>    
        <div id="read"></div>
    </div>
</template>
<script>
    import Epub from 'epubjs'
    import { ebookMixin } from "@/utils/mixin"
    import { flatten } from "@/utils/book"
    import { getLocalForage } from '@/utils/localForage'
    import { getFontFamily, saveFontFamily, saveFontSize, getFontSize, getTheme, getLocation, saveTheme, getLocalStorage } from '@/utils/localStorage'

    global.ePub = Epub

    export default {
        mixins: [ebookMixin],
        methods: {
            move(e) {//获取下拉的y值
                let offsetY = 0
                if (this.firstOffsetY) {
                offsetY = e.changedTouches[0].clientY - this.firstOffsetY
                this.setOffsetY(offsetY)
                } else {
                this.firstOffsetY = e.changedTouches[0].clientY //第一个点击对象
                }
                e.preventDefault()
                e.stopPropagation()
            },
            /**鼠标状态
             * 1.鼠标进入
             * 2.鼠标点击进入后的移动
             * 3.鼠标从移动状态松手
             * 4.鼠标还原
             */
            onMouseEnter(e) { //1.鼠标进入
                // console.log('onMouseEnter')
                this.mouseMove = 1
                this.mouseStartTime = e.timeStamp
                e.preventDefault()
                e.stopPropagation()
            },
            onMouseMove(e) {
                // console.log('onMouseMove')
                if (this.mouseMove === 1) { //点下鼠标进入的时候将状态切为2，避免在界面还未点击移动，也会触发移动事件
                this.mouseMove = 2
                } else if (this.mouseMove === 2) { //保存鼠标偏移量
                    let offsetY = 0
                    if (this.firstOffsetY) {
                        offsetY = e.clientY - this.firstOffsetY
                        // this.$store.commit('SET_OFFSETY', offsetY)
                        this.setOffsetY(offsetY)
                    } else {
                        this.firstOffsetY = e.clientY
                    }
                }
                e.preventDefault()
                e.stopPropagation()
            },
            onMouseEnd(e) {
                if (this.mouseMove === 2) {
                // this.$store.dispatch('setOffsetY', 0)
                    this.setOffsetY(0)
                    this.firstOffsetY = null
                    this.mouseMove = 3 //不处理
                } else {
                    this.mouseMove = 4
                }
                this.mouseEndTime = e.timeStamp
                const time = this.mouseEndTime - this.mouseStartTime
                if (time < 200) {
                    this.mouseMove = 4
                }
                e.preventDefault()
                e.stopPropagation()
            },
            moveEnd(e) {
                this.setOffsetY(0)
                this.firstOffsetY = null
            },
            onMaskClick(e) {
                if (this.mouseMove && (this.mouseMove === 2 || this.mouseMove === 3)) {
                     return
                } else if (this.mouseMove === 1 || this.mouseMove === 4) {
                const offsetX = e.offsetX //offsetX点击事件距离父元素的距离
                const width = window.innerWidth
                if (offsetX > 0 && offsetX < width * 0.3) {
                    this.prevPage()
                } else if (offsetX > 0 && offsetX > width * 0.7) {
                    this.nextPage()
                } else {
                    this.toggleMenuVisible()
                }
                }
                this.mouseMove = 4
            },
            prevPage(){
                if (this.rendition) {
                    this.rendition.prev().then(() => {
                        this.refreshLocation()
                    })
                    this.hideTitleAndMenu()
                }
            },
            nextPage(){
                if (this.rendition) {
                    this.rendition.next().then(() => {
                        this.refreshLocation()
                    })
                    this.hideTitleAndMenu()
                }
            },
            toggleTitleAndMenu(){
                if (this.menuVisible){
                    this.setSettingVisible(-1)
                    this.setFontFamilyVisible(false)
                }
                this.setMenuVisible(!this.menuVisible)
                // this.$store.dispatch('setMenuVisible', !this.menuVisible)
            },
            initFontSize(){
                let fontSize = getFontSize(this.fileName)
                    if (!fontSize) {
                        fontSize = 16
                        saveFontSize(this.fileName, this.defaultFontSize)
                    } else {       
                        this.rendition.themes.font(fontSize)
                    }
                return fontSize
            },
            initFontFamily(){
                let font = getFontFamily(this.fileName)
                    if (!font) {
                        font = 'Default'
                        saveFontFamily(this.fileName, this.defaultFontFamily)
                    } else {
                        this.rendition.themes.font(font)
                        this.setDefaultFontFamily(font)
                    }
            },
            initTheme() {
                let defaultTheme = getTheme(this.fileName)
                if (!defaultTheme) {
                    defaultTheme = this.themeList[0].name
                    saveTheme(this.fileName, defaultTheme)
                }
                this.registerTheme()
                this.rendition.themes.select(defaultTheme)
                return defaultTheme
            },
            // initGesture(){
            //     this.rendition.on('touchstart', event => {
            //         console.log(event)
            //         // 获取在屏幕上的第一根手指
            //         this.touchStartX = event.changedTouches[0].clientX
            //         console.log('StartX', this.touchStartX)
            //         this.touchStartTime = event.timeStamp
            //     })
            //     this.rendition.on('touchend', event => {
            //         console.log('endX', event.changedTouches[0].clientX)
            //         const offsetX = event.changedTouches[0].clientX - this.touchStartX
            //         const time = event.timeStamp - this.touchStartTime
            //         if (time < 500 && offsetX > 40) { //从左往右划
            //             this.prevPage()
            //         } else if (time < 500 && offsetX < -40) {
            //             this.nextPage()
            //         } else {
            //             this.toggleTitleAndMenu()
            //         }
            //         // event.preventDefault()
            //         event.stopPropagation()
            //     })
            // },
            parseBook(){
                this.book.loaded.cover.then(cover => {
                    console.log('this book:', this.book)
                    console.log('cover:', cover)
                    this.book.archive.createUrl(cover).then(url => {
                        this.setCover(url)
                        this.book.loaded.metadata.then(metadata => {
                            this.setMetadata(metadata)
                        })
                        this.book.loaded.navigation.then(nav => {
                            // nav.toc:存放一级目录
                            let navItem = flatten(nav.toc)
                            function find (item, level = 0){
                                if (!item.parent) { //如果不存在父节点，当前Item就是第一层
                                    return level
                                } else {
                                    return find(navItem.filter(parentItem => parentItem.id === item.parent)[0], ++level)
                                }
                            }
                            navItem.forEach(item => {
                                item.level = find(item)
                            })
                            this.setNavigation(navItem)
                        })
                    })
                })
            },
            initRendition(){
                this.rendition = this.book.renderTo('read', {
                    flow: 'paginated',
                    manager: 'continuous',
                    snap: true,
                    width: innerWidth,
                    height: innerHeight,
                    // 支持微信兼容
                    // method: 'default'
                    // flow: 'scrolled' 现在还不能支持
                })
                Promise.all([ //给localStorge的图书设置默认值
                    this.setDefaultTheme(this.initTheme()),
                    this.setDefaultFontSize(this.initFontSize()),
                    this.setDefaultFontFamily(this.initFontFamily())
                ]).then(() => {
                    // this.switchTheme()
                    const location = getLocation(this.fileName)
                    if (location) {
                        this.display(location)
                    } else {
                        this.display()
                    }
                })
                this.rendition.hooks.content.register(contents => {
                    let baseURL='../assets'
                    Promise.all([                       
                        contents.addStylesheet(`${process.env.VUE_APP_RES_URL}fonts/daysOne.css`),
                        contents.addStylesheet(`${process.env.VUE_APP_RES_URL}fonts/cabin.css`),
                        contents.addStylesheet(`${process.env.VUE_APP_RES_URL}fonts/montserrat.css`),
                        contents.addStylesheet(`${process.env.VUE_APP_RES_URL}fonts/tangerine.css`)
                        // contents.addStylesheet(`${baseURL}/fonts/daysOne.css`),
                        // contents.addStylesheet(`${baseURL}/fonts/cabin.css`),
                        // contents.addStylesheet(`${baseURL}/fonts/montserrat.css`),
                        // contents.addStylesheet(`${baseURL}/fonts/tangerine.css`)
                    ]).then(() => {})
                })
            },
            initEpub(target) {
                // const bookUrl = process.env.VUE_APP_RES_URL + "epub/" + this.fileName + '.epub'
                this.book = new Epub(target)
                this.setCurrentBook(this.book)
                this.initRendition()
                // this.initGesture()
                this.parseBook()
                this.book.ready.then(() => {
                    //分页
                    return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
                }).then(locations => {
                    // console.log(locations, this.navigation);
                    // this.navigation.forEach(nav => {
                    //     nav.pagelist = []
                    // })
                    // locations.forEach(item => {
                    //     //匹配[*]!
                    //     const loc = item.match(/\[(.*)\]!/)[1]
                    //     this.navigation.forEach(nav => {
                    //         if (nav.href) {
                    //             const href = nav.href.mathch(/^(.*)\.html$/)[1]
                    //             if (href === loc) {
                    //                 nav.pagelist.push(item)
                    //             }
                    //         }
                    //     })
                    //     let currentPage = 1
                    //     this.navigation.forEach((nav, index) => {
                    //         if (index === 0) {
                    //             nav.page = 1
                    //         } else {
                    //             nav.page = currentPage
                    //         }
                    //         currentPage += nav.pagelist.length
                    //     })
                    // })
                    // this.setPagelist(locations)
                    this.setBookAvailable(true)
                    this.refreshLocation()
                })   
            }
        },
        mounted () {
            const books = this.$route.params.fileName.split('|')
            const fileName = books[1]
            getLocalForage(fileName, (err, blob) => {
                // console.log('mounted', fileName, blob);
                if(!err && blob){
                    // console.log('找到离线缓存电子书');
                    this.setFileName(books.join('/')).then(()=>{
                        this.initEpub(blob)
                    })
                }else {
                    // console.log('在线获取电子书');
                    this.setFileName(books.join('/')).then(()=>{
                        // console.log(`${process.env.VUE_APP_RES_URL}/epub/${this.fileName}.epub`)
                        this.initEpub(`${process.env.VUE_APP_RES_URL}/epub/${this.fileName}.epub`)
                        // this.initEpub(`${process.env.VUE_APP_EPUB_URL}/${this.fileName}.epub`)
                    })
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/global";
    .ebook-reader{
        position: absolute;
        // display: inline-block;
        top: .48rem;
        bottom: .48rem;
        left: 0;
        right: 0;
        overflow: hidden;
        z-index: 90;
        .ebook-reader-mask{
            position: absolute;
            z-index: 200;
            width: 100%;
            height: 100%;
            top: 0;
            bottom: 0;
            background: transparent;
            // background: yellow;
        }
        #read{
            position: absolute;
            z-index: 100;
            top: 0;
            bottom: 0;
        }
    }

</style>
