<template>
    <div class="store-shelf">
        <shelf-title :title="$t('shelf.title')"></shelf-title>
        <scroll class="store-shelf-scroll-wrapper" :top="0" @onScroll="onScroll">
            <shelf-search></shelf-search>
            <shelf-list :data="shelfList"></shelf-list>
        </scroll>
        <shelf-footer></shelf-footer>
    </div>
</template>

<script>
import ShelfTitle from '@/components/shelf/ShelfTitle.vue'
import Scroll from '@/components/common/Scroll.vue'
import ShelfSearch from '@/components/shelf/ShelfSearch.vue'
import ShelfList from '@/components/shelf/ShelfList.vue'
import shelfFooter from '@/components/shelf/shelfFooter.vue'
import { storeShelfMixin } from '@/utils/mixin'
export default {
    mixins: [storeShelfMixin],
    components: {
        ShelfTitle,
        Scroll,
        ShelfSearch,
        ShelfList,
        shelfFooter
    },
    methods: {
        onScroll(offsetY){
            this.setOffsetY(offsetY)
        }
    },
    mounted() {
        this.getShelfList()
        // this.setShelfCategory([])
        this.setCurrentType(1)
    }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global";
.store-shelf{
    position: relative;
    width: 100%;
    height: 100%;
    top: 0;
    background: white;
    .store-shelf-scroll-wrapper{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 101;
    }
}
</style>
