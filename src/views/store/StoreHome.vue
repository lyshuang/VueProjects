<template>
    <div class="store-home">
        <search-bar></search-bar>
        <flap-card :data="random"></flap-card>
        <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
            <div class="banner-wrapper">
                <!-- <img :src="banner" alt=""> -->
                <div class="banner-img" :style="{backgroundImage: `url('${banner}')`}"></div>
                <guess-you-like :data="guessYouLike"></guess-you-like>
                <recommend :data="recommend" class="recommend"></recommend>
                <featured :data="featured" class="featured" :titleText="$t('home.featured')" :btnText="$t('home.seeAll')"></featured>
                <div class="category-list-wrapper" v-for="(item, index) in categoryList" :key="index">
                    <category-book :data="item"></category-book>
                </div>
                <category class="category" :data="categories"></category>
            </div>
        </scroll>
    </div>
</template>

<script>
    import FlapCard from '@/components/home/FlapCard'
    import SearchBar from '@/components/home/SearchBar'
    import Scroll from '@/components/common/Scroll.vue'
    import GuessYouLike from '@/components/home/GuessYouLike'
    import Recommend from '@/components/home/Recommend'
    import Featured from '@/components/home/Featured.vue'
    import CategoryBook from '@/components/home/CategoryBook.vue'
    import Category from '@/components/home/Category.vue'
    import { storeHomeMixin } from '../../utils/mixin'
    import { home } from '@/api/book'
    export default {
        data() {
            return {
                scrollTop: 94,
                random: null,
                banner: '',
                guessYouLike: null,
                recommend: null,
                featured: null,
                CategoryBook: null,
                categoryList: [],
                categories: null
            }
        },
        mixins: [storeHomeMixin],
        components: {
            SearchBar,
            Scroll,
            FlapCard,
            GuessYouLike,
            Recommend,
            Featured,
            CategoryBook,
            Category
        },
        methods: {
            onScroll(offsetY){
                this.setOffsetY(offsetY)
                if (offsetY > 0){
                    this.scrollTop = 52
                } else {
                    this.scrollTop = 94
                }
                this.$refs.scroll.refresh()
            }
        },
        mounted() {
            home().then(response => {
                if (response && response.status === 200){
                    const data = response.data
                    this.banner = data.banner
                    const randomIdx = Math.floor(Math.random() * data.random.length)
                    this.random = data.random[randomIdx]
                    this.guessYouLike = data.guessYouLike
                    this.recommend = data.recommend
                    this.featured = data.featured
                    this.categoryList = data.categoryList
                    this.categories = data.categories
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/global";
    .store-home {
        width: 100%;
        height: 100%;
        // background: white;
        .banner-wrapper{
            width: 100%;
            padding: .1rem;
            box-sizing: border-box;
            .banner-img{
                width: 100%;
                height: 1.5rem;
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
            .recommend{
                margin-top: .2rem;
            }
            .featured{
                margin-top: .2rem;
            }
            .category-list-wrapper{
                margin-top: .2rem;
            }
            .category{
                margin-top: .2rem;
            }
        }
        
    }
</style>
