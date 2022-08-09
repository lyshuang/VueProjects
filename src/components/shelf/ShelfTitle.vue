<template>
    <transition name="fade">
        <div class="shelf-title" :class="{'hide-shadow': ifHideShadow}" v-show="shelfTitleVisible">
            <div class="shelf-title-text-wrapper">
                <span class="shelf-title-text">{{title}}</span>
                <span class="shelf-title-sub-text" v-show="isEditMode">{{selectedText}}</span>
            </div>
            <div class="shelf-title-btn-wrapper shelf-title-left" v-if="showClear">
                <span class="shelf-title-btn-text" @click="clearCache">{{$t('shelf.clearCache')}}</span>
            </div>
            <div class="shelf-title-btn-wrapper shelf-title-right" v-if="showEdit">
                <span class="shelf-title-btn-text" @click="onEditClick">{{ isEditMode? $t('shelf.cancel') :$t('shelf.edit')}}</span>
            </div>
            <div class="shelf-title-btn-wrapper shelf-title-left" v-if="showBack">
                <span class="icon-back" @click="back"></span>
            </div>
            <div class="shelf-title-btn-wrapper" :class="{'shelf-title-left':changeGroupLeft, 'shelf-title-right': changeGroupRight}" 
                @click="changeGroup" v-if="showChangeGroup">
                <span class="shelf-title-btn-text">{{$t('shelf.editGroup')}}</span>
            </div>
        </div>
    </transition>
</template>
<script>
import { storeShelfMixin } from '@/utils/mixin'
import { clearLocalStorage, saveBookShelf } from '@/utils/localStorage'
import { clearLocalForage } from '@/utils/localForage'

export default {
    mixins: [storeShelfMixin],
    props: {
        title: String,
    },
    data(){
        return {
            ifHideShadow: true
        }
    },
    computed: {
        emptyCategory(){
            return !this.shelfCategory || !this.shelfCategory.itemList || this.shelfCategory.itemList.length === 0
        },
        showEdit(){
            return this.currentType === 1 || !this.emptyCategory
        },
        showClear(){
            return this.currentType === 1
        },
        showBack(){
            return this.currentType === 2 && !this.isEditMode
        },
        showChangeGroup(){
            return this.currentType === 2 && (this.isEditMode || this.emptyCategory)
        },
        //修改分组显示，要根据目录中是否有book依次来显示在左边还是右边
        changeGroupLeft(){
            return !this.emptyCategory
        },
        changeGroupRight(){
            return this.emptyCategory
        },
        popupCancelBtn(){
            return this.createPopupBtn(this.$t('shelf.cancel'), ()=>{
                this.hidePopup()
            })
        },
        selectedText(){
            const selectedNumber = this.shelfSelected ? this.shelfSelected.length : 0
            return selectedNumber <= 0
                    ? this.$t('shelf.selectBook')
                    : selectedNumber === 1
                    ? this.$t('shelf.haveSelectedBook').replace('$1', selectedNumber)
                    : this.$t('shelf.haveSelectedBooks').replace('$1', selectedNumber)
        }
    },
    watch: {
        offsetY(offsetY){
            if (offsetY > 0) {
                this.ifHideShadow = false
            } else {
                this.ifHideShadow = true
            }
        }
    },
    methods: {
        hidePopup() {
            this.popupMenu.hide()
        },
        createPopupBtn(text, onClick, type = 'normal'){
            // console.log(text, type);
            return {
                text: text,
                type: type,
                click: onClick
            }
        },
        back(){
            this.$router.go(-1)
            this.setIsEditMode(false)
        },
        onEditClick(){
           if (!this.isEditMode){ //取消模式
               this.setShelfSelected([])
               this.shelfList.forEach(item => {
                   item.selected = false
                   if(item.itemList) {
                       item.itemList.forEach(subItem => {
                           subItem.selected = false
                       })
                   }
               })
           }
            this.setIsEditMode(!this.isEditMode)
        },
        clearCache(){
            clearLocalForage()
            clearLocalStorage()
            this.setShelfList([])
            this.setShelfSelected([])
            this.getShelfList()
            this.simpleToast(this.$t('shelf.clearCacheSuccess'))
        },
        changeGroupName(){
            this.hidePopup()
            this.dialog({
                showNewGroup: true,
                groupName: this.shelfCategory.title
            }).show()
        },
        onComplete(){
            this.hidePopup()
            this.setShelfList(this.shelfList.filter(book=>book.id !== this.shelfCategory.id))
            .then(()=>{
                saveBookShelf(this.shelfList)
                this.$router.go(-1)
                this.setIsEditMode(false)
            })
        },
        deleteGroup () {
            if (!this.emptyCategory) {//当前分组有books，先将当前目录所有图书都置为选中状态，然后将当前所有图书移除到书架
                this.setShelfSelected(this.shelfCategory.itemList)
                this.moveOutOfGroup(this.onComplete)
            } else {
                this.onComplete()
            }
        },
        showDeleteGroup(){
            this.hidePopup()
            setTimeout(()=>{
                this.popupMenu = this.popup({
                    title: this.$t('shelf.deleteGroupTitle'),
                    btn: [
                        this.createPopupBtn(this.$t('shelf.confirm'), () => {
                        this.deleteGroup()
                        }, 'danger'),
                        this.popupCancelBtn
                    ]
                }).show()
            }, 200)
        },
        changeGroup(){
            // console.log('changeGroup');
            this.popupMenu = this.popup({
                btn: [
                this.createPopupBtn(this.$t('shelf.editGroupName'), () => {
                    this.changeGroupName()
                }),
                this.createPopupBtn(this.$t('shelf.deleteGroup'), () => {
                    this.showDeleteGroup()
                }, 'danger'),
                this.popupCancelBtn
                ]
            }).show()
            // console.log(this.popupMenu);
        }, 
    }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global";
    .shelf-title{
        position: relative;
        width: 100%;
        height: 0.42rem;
        background: white;
        z-index: 130;
        box-shadow: 0 .02rem .02rem 0 rgba(0, 0, 0, .1);
        &.hide-shadow {
            box-shadow: none;
        }
        .shelf-title-text-wrapper{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 0.42rem;
            @include columnCenter;
            .shelf-title-text{
                font-size: .16rem;
                line-height: .2rem;
                font-weight: bold;
                color: #333;
            }
            .shelf-title-sub-text{
                font-size: .1rem;
                color: #333;
            }
        }
        .shelf-title-btn-wrapper{
            position: absolute;
            top: 0;
            box-sizing: border-box;
            height: 100%;
            @include center;
            .shelf-title-btn-text{
                font-size: .14rem;
                color: #666;
            }
            .icon-back{
                font-size: .16rem;
                color: #666;
            }
            &.shelf-title-left{
                left: 0;
                padding-left: .15rem;
            }
            &.shelf-title-right{
                right: 0;
                padding-right: .15rem;
            }
        }
    }
</style>
