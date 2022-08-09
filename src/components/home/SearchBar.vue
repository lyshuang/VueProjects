<template>
 
    <div>
        <div class="search-bar" :class="{'hide-title': !titleVisible, 'hide-shadow': shadowVisible}">
        <transition name="title-move">
            <div class="search-bar-title-wrapper" v-show="titleVisible">
                <div class="title-icon-shake-wrapper" @click="showFlapCard">
                    <span class="icon-shake icon"></span>
                </div>
                <div class="title-icon-text-wrapper">
                    <span class="title-text title">{{$t('home.title')}}</span>
                </div>
            </div>
        </transition>
        <div class="title-icon-back-wrapper" :class="{'hide-title': !titleVisible}" @click="back">
            <span class="icon-back icon"></span>
        </div>
        <div class="search-bar-input-wrapper" :class="{'hide-title': !titleVisible}">      
            <div class="search-bar-blank" :class="{'hide-title': !titleVisible}"></div>
            <div class="search-bar-input">
                <span class="icon-search icon"></span>
                <input class="input" 
                        type="text"
                        :placeholder="$t('home.hint')"
                        v-model="searchText"
                        @click="showHotSearch"
                        @keyup.13.exact="search">
            </div>
        </div>
    </div>
    <hot-search-list v-show="hotSearchVisible" ref="hotSearch"></hot-search-list>
    </div>
</template>

<script>
import { storeHomeMixin } from '../../utils/mixin'
import HotSearchList from './HotSearchList'
    export default {
        mixins: [storeHomeMixin],
        components: {
            HotSearchList
        },
        data() {
           return {
                searchText: '',
                titleVisible: true,
                shadowVisible: false,
                hotSearchVisible: false,
            }
        },
        watch: {
            offsetY(newY){
                if (newY > 0) { //有滑动就隐藏标题栏
                    this.isShowTitle(false)
                    this.isHideShadow(false)
                } else {
                    this.isShowTitle(true)
                    this.isHideShadow(true)
                }
            },
            hotSearchOffsetY(offsetY){
                if (offsetY > 0){
                    this.isHideShadow(false)
                } else {
                    this.isHideShadow(true)
                }
            }
        },
        methods: {
            search(){
                this.$router.push({
                    path: '/store/list',
                    query: {
                        keyword: this.searchText
                    }
                })
            },
            showFlapCard(){
                this.setFlapCardVisible(true)
            },
            back(){
                if (this.offsetY > 0){
                    this.isHideShadow(false)
                } else {
                    this.isHideShadow(true)
                }
                if (this.hideHotSearch){
                    this.hideHotSearch()
                } else {
                    this.$router.push('/store/shelf')
                }
            },
            isShowTitle(flag) {
                this.titleVisible = flag
            },
            isHideShadow(flag){
                this.shadowVisible = flag
            },
            showHotSearch(){
                this.isHideShadow(true)
                this.hotSearchVisible = true
                this.isShowTitle(false)
                this.$nextTick(() => {//点击input历史记录显示的时候要让滚动条滚到初始位置
                    this.$refs.hotSearch.reset()
                })
            },
            hideHotSearch(){
                this.hotSearchVisible = false
                if (this.offsetY > 0) {
                    this.isShowTitle(false)
                    this.isHideShadow(false)
                } else {
                    this.isShowTitle(true)
                    this.isHideShadow(true)        
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/global";
    .search-bar{
        z-index: 100;
        position: relative;
        width: 100%;
        height: .94rem;
        z-index: 110;
        box-shadow: 0 .02rem .02rem 0 rgba(0, 0, 0, .1);
        &.hide-title{
            height: .52rem;
        }
        &.hide-shadow{
            box-shadow: none;
        }
        .search-bar-title-wrapper{
            position: absolute;
            top: 0;
            left: 0;
            z-index: 105;
            width: 100%;
            height: .42rem;
            .title-icon-text-wrapper{
               width: 100%;
               height: .42rem;
               @include center;
            }
            .title-icon-shake-wrapper{
                position: absolute;
                right: .15rem;
                top: 0;
                height: 0.42rem;
                 @include center;
            }
        }
        .title-icon-back-wrapper{
            position: absolute;
            left: .15rem;
            top: 0;
            height: 0.42rem;
            z-index: 150;
            transition: height $animationTime $animationType;
            @include center;
            &.hide-title {
                height: 0.52rem;
            }
        }
        .search-bar-input-wrapper{
            position: absolute;
            display: flex;
            top: .42rem;
            left: 0;
            padding: .1rem;
            width: 100%;
            box-sizing: border-box;
            transition: top $animationTime $animationType;
            &.hide-title{
                top: 0;
            }
            .search-bar-blank{
                flex: 0 0 0;
                width: 0;
                transition: all $animationTime $animationType;
                &.hide-title {
                    flex: 0 0 .31rem;
                    width: 0.31rem;
                }
            }
            .search-bar-input{
                flex: 1;
                width: 100%;
                height: 0.32rem;
                background: #f4f4f4;
                padding: .05rem, .15rem;
                border-radius: .2rem;
                border: .01rem solid #eee;    
                box-sizing: border-box;            
                @include center;
                .icon-search{
                    margin: .15rem;
                    color: #999                   
                }
                .input{
                    width: 100%;
                    height: 0.22rem;
                    border: none;
                    outline: none;
                    background: transparent;
                    color: #666;
                    &::-webkit-input-placeholder{
                    color: #ccc;
                    }
                }
                
            }
        }
    }

</style>
