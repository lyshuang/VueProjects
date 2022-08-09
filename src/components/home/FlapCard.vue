<template>
    <div class="flap-card-wrapper" v-show="flapCardVisible">
        <div class="flap-card-bg" :class="{'animation': runFlapCardAnimation}" v-show="runFlapCardAnimation">
            <div class="flap-card" v-for="(item, index) in flapCardList" :key="index"
                    :style="{zIndex: item.zIndex}">
                <div class="flap-card-circle">
                    <div class="flap-card-semi-circle flap-card-semi-circle-left" :style="semiCircleStyle(item, 'left')" ref="left"></div>
                    <div class="flap-card-semi-circle flap-card-semi-circle-right" :style="semiCircleStyle(item, 'right')" ref="right"></div>
                </div>
            </div>
            <div class="point-wrapper">
                <div class="point" :class="{'animation': runPointAnimation}" v-for="(item, index) in pointList" :key="index"></div>
            </div>
        </div>
        <div class="book-card" :class="{'animation': runBookCardAnimation}" v-show="runBookCardAnimation">
            <div class="book-card-wrapper">
                <div class="img-wrapper">
                    <!-- <img class="img" v-lazy="data.cover"> -->
                    <img :src="data ? data.cover : ''" class="img">
                </div>
                <div class="content-wrapper">
                <div class="title">{{data ? data.title : ''}}</div>
                <div class="author sub-title-medium">{{data ? data.author : ''}}</div>
                <div class="category">{{categoryText()}}</div>
                </div>
                <div class="read-btn" @click.stop="showBookDetail(data)">{{$t('home.readNow')}}</div>
            </div>
        </div>
        <div class="close-btn-wrapper">
            <span class="icon-close" @click="close"></span>
        </div>
    </div>
</template>
<!-- 卡片翻转逻辑：正面右圆围着中心翻转，颜色不断加深，背面左圆围着中心翻转，颜色不断变浅，当背面圆翻转到90度时要覆盖正面圆 -->
<script>
import { storeHomeMixin } from '@/utils/mixin'
import { flapCardList, categoryText } from '../../utils/store'
export default {
   mixins: [storeHomeMixin],
   props: {
       data: Object
   },
   data() {
       return {
           flapCardList,
           front: 0,
           back: 1,
           intervalTime: 50,
           runFlapCardAnimation: false,
           firstShowTime: 300,
           pointTime: 750,
           pointList: null,
           runPointAnimation: false,
           runBookCardAnimation: false
       }
   },
   watch: {
       flapCardVisible(v){
           if (v) {
               this.runAnimation()
           }
       }
   },
   methods: {
       close() {
           this.setFlapCardVisible(false)
           this.stopAnimation()
       },
       semiCircleStyle(item, dir) {
           return {
               backgroundColor: `rgb(${item.r}, ${item.g}, ${item.b})`,
               backgroundSize: item.backgroundSize,
               backgroundImage: dir === 'left' ? item.imgLeft : item.imgRight
           }
       },
       rotate(index, type){
           const item = this.flapCardList[index]
           let dom
           if (type === 'front') {
               dom = this.$refs.right[index]
           } else { //back
               dom = this.$refs.left[index]
           }
           dom.style.transform = `rotateY(${item.rotateDegree}deg)`
           dom.style.backgroundColor = `rgb(${item.r}, ${item._g}, ${item.b})`
       },
       flapCardRotate(){
           const frontFlapCard = this.flapCardList[this.front]
               const backFlapCard = this.flapCardList[this.back]
               //加深
               frontFlapCard.rotateDegree += 10
               frontFlapCard._g -= 5
               //变浅
               backFlapCard.rotateDegree -= 10
               if (backFlapCard.rotateDegree < 90) {
                   //还未转到90°时无法看到，不让它有颜色变化，
                   //到90°时就能显示了，这时候就不断变浅到平面时到初始位置 
                   backFlapCard._g += 5
               }
               //第一个临界点，让背面圆覆盖正面圆，如果是初始状态正面圆转动9次到达90°，但是
               //背面圆此时是转动到-90°，无法执行下列逻辑，因此需要先让背面左侧圆和右侧圆重叠，一起翻转，
               //要先执行prepare让背面圆到180°，此时正面圆转到90°，背面圆也会转到(180-90)°
               if (frontFlapCard.rotateDegree === 90 && backFlapCard.rotateDegree === 90){
                   backFlapCard.zIndex += 2
               }
               this.rotate(this.front, 'front')
               this.rotate(this.back, 'back')
               //这时正面圆(90+90)和背面圆(90-90)都到了左侧位置
               if (frontFlapCard.rotateDegree === 180 && backFlapCard.rotateDegree === 0){
                   this.next()
               }
       },
       prepare() {
           //让背面的左侧半圆和右侧半圆重叠
           const backFlapCard = this.flapCardList[this.back]
           backFlapCard.rotateDegree = 180
           //(不要了)因为后续和正面圆一起转动到90度时转动了9次，并且颜色也不断在变浅所以到90度时无法显示初始颜色
           //需要先减去5*9，让它先加深，以便到90°后不断变浅
           backFlapCard._g = backFlapCard.g - 5 * 9
           this.rotate(this.back, 'back')
       },
       next(){
           //让正面圆和背面圆归位
           const frontFlapCard = this.flapCardList[this.front]
           const backFlapCard = this.flapCardList[this.back]
           frontFlapCard.rotateDegree = 0
           backFlapCard.rotateDegree = 0
           frontFlapCard._g = frontFlapCard.g
           backFlapCard._g = backFlapCard.g
           this.rotate(this.front, 'front')
           this.rotate(this.back, 'back')
           //开始下一组的翻转
           this.front++
           this.back++
           const len = this.flapCardList.length
           //判断溢出
           if (this.front >= len){
               this.front = 0
           }
           if (this.back >= len){
               this.back = 0
           }
           // 开始下一组的翻转之前要先改变zIndex
           // 100 -> 96
           // 99 -> 100
           // 98 -> 99
           // 97 -> 98
           // 96 -> 97
           // 当前这一组的front和back因为已经自加1了，所以现在其各自下标是1和2
           //front：100 -> 100 - ((0-1+5)%5=4)=96
           //back: 99 -> 100 - (1-2+5)%5=97
           this.flapCardList.forEach((item, index) => {
               item.zIndex = 100 - ((index - this.front + len) % len)
           })
           this.prepare()
       },
       startPointAnimation(){
           this.runPointAnimation = true
           setTimeout(() => {
            // this.stopAnimation()
            this.runPointAnimation = false
          }, 1000)
       },
       startFlapCardAnimation() {
           this.prepare()
           this.task = setInterval(() => {
            //    this.prepare()
               this.flapCardRotate()
           }, this.intervalTime)         
       },
       reset() {
           this.front = 0
           this.back = 1
           this.flapCardList.forEach((item, index) => {
               item.zIndex = 100 - index
               item._g = item.g
               item.rotateDegree = 0
               this.rotate(index, 'front')
               this.rotate(index, 'back')
           })
           this.runBookCardAnimation = false
           this.runFlapCardAnimation = false
           this.runPointAnimation = false
       },
       stopAnimation() {
           if (this.task){
               clearInterval(this.task)
           }
           if (this.timeout){
               clearInterval(this.timeout)
           }
           if (this.timeout2){
               clearInterval(this.timeout2)
           }
           this.reset()
       },
       runAnimation() {
           this.runFlapCardAnimation = true
           this.timeout = setTimeout(() => {
               this.startFlapCardAnimation()
               this.startPointAnimation()
           }, 300)
           this.timeout2 = setTimeout(() => {
               this.stopAnimation()
               this.runBookCardAnimation = true
           }, 3000)
       },
       categoryText() {
           if (this.data){
               categoryText(this.data.category, this)
           } else {
               return ''
           }
       }
   },
   created() {
       this.pointList = []
       for (let i = 0; i < 18; i++) {
           this.pointList.push(`point${i}`)
       }
   },
   mounted() {
    //    console.log('mounted');
    //    if(this.data){
    //        console.log(this.data);
    //    }
   }
}
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/global";
    @import "../../assets/styles/flapCard.scss";
    .flap-card-wrapper{
        z-index: 300;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.6);
        @include center;
        @include absCenter;
        .flap-card-bg{
            position: relative;
            width: 0.64rem;
            height: 0.64rem;
            background: white;
            border-radius: .05rem;
            transform: scale(0);
            opacity: 0;
            &.animation {
                animation: flap-card-move .3s ease-in both;
            }
            @keyframes flap-card-move {
                0% {
                transform: scale(0);
                opacity: 0;
                }
                50% {
                transform: scale(1.2);
                opacity: 1;
                }
                75% {
                transform: scale(.9);
                opacity: 1;
                }
                100% {
                transform: scale(1);
                opacity: 1;
                }
            }
            .flap-card{                
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                width: .48rem;
                height: .48rem;               
                @include absCenter;
                .flap-card-circle{
                    display: flex;;
                    width: 100%;
                    height: 100%;
                    .flap-card-semi-circle{
                        flex: 0 0 50%;
                        width: 50%;
                        height: 100%;   
                        background: no-repeat;  
                        backface-visibility: hidden;                  
                    }
                    .flap-card-semi-circle-left{
                        border-radius: .24rem 0 0 .24rem;
                        background-position: center right;
                        transform-origin: right;
                    }
                    .flap-card-semi-circle-right{
                        border-radius: 0 .24rem .24rem 0;
                        background-position: center left;
                        transform-origin: left;
                    }
                }
            }
            .point-wrapper {
                position: absolute;
                top: 50%;
                left: 50%;
                z-index: 2000;
                @include center;
                .point {
                @include absCenter;
                z-index: 3000;
                border-radius: 50%;
                transform: scale(0);
                &.animation {
                    @for $i from 1 to length($moves) {
                    &:nth-child(#{$i}) {
                        @include move($i);
                    }
                    }
                }
                }
            }
        }
        .book-card {
            position: relative;
            // width: 1.8rem;
            // height: 2rem;
            width: 65%;
            max-width: 4rem;
            max-height: 5rem;
            box-sizing: border-box;
            border-radius: .15rem;
            background: white;
            &.animation {
                animation: scale .3s ease-in both;
                @keyframes scale {
                    0% {
                        transform: scale(0);
                        opacity: 0;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
            }
            .book-card-wrapper {
                width: 100%;
                height: 100%;               
                // margin-bottom: .3rem;
                @include columnTop;
                .img-wrapper {
                    width: 100%;
                    margin-top: .2rem;
                    @include center;
                    .img {
                        width: 1rem;
                        height: 1.3rem;
                    }
                }
                .content-wrapper {
                padding: 0 .2rem;
                margin-top: .2rem;
                .title {
                    color: #333;
                    font-weight: bold;
                    font-size: .16rem;
                    line-height: .2rem;
                    max-height: .4rem;
                    text-align: center;
                    @include ellipsis2(2);
                }
                // .author {
                //     // margin: .1rem;
                //     // text-align: center;
                //     // font-size: .14rem;
                //     // line-height: .2rem;
                //     // @include ellipsis2(2)
                // }
                .category {
                    color: #999;
                    font-size: .14rem;
                    margin-top: .1rem;
                    text-align: center;
                }
                }
                .read-btn {
                    // position: absolute;
                    // bottom: 0;
                    // left: 0;
                    // z-index: 1100;
                    width: 100%;
                    border-radius: 0 0 .15rem .15rem;
                    padding: .15rem 0;
                    text-align: center;
                    color: white;
                    font-size: .14rem;
                    background: $color-blue;
                }
            }
    }
        .close-btn-wrapper {
            position: absolute;
            left: 0;
            bottom: 5%;
            z-index: 310;
            width: 100%;
            @include center;
            .icon-close {
                width: 0.45rem;
                height: 0.45rem;
                border-radius: 50%;
                font-size: .25rem;
                color: white;
                @include center;
                background: #333;
            }
        }
    }
</style>
