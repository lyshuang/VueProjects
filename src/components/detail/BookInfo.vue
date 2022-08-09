<template>
  <div class="cover-title-wrapper">
    <div class="cover-title-left-wrapper">
      <img class="cover-img" :src="cover">
    </div>
    <div class="cover-title-right-wrapper">
      <div class="detail-cover-title-wrapper">
        <div class="cover-title-text">{{title}}</div>
      </div>
      <div class="cover-author-wrapper">
        <div class="cover-author-text">{{author}}</div>
      </div>
      <div class="detail-cover-description-wrapper">
        <div class="detail-cover-description-text">{{desc}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      cover: String,
      title: String,
      author: String,
      desc: String
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .cover-title-wrapper {
    display: flex;
    width: 100%;
    padding: .1rem 0;
    border-bottom: .01rem solid #eee;
    box-sizing: border-box;
    .cover-title-left-wrapper {
      flex: 0 0 1.03rem;
      padding: .1rem 0 .1rem .15rem;
      box-sizing: border-box;
      @include top;
      .cover-img {
        width: 1.03rem;
        height: 1.46rem;
      }
    }
    .cover-title-right-wrapper {
      flex: 1;
      padding: .1rem .15rem;
      box-sizing: border-box;
      .detail-cover-title-wrapper {
        .cover-title-text {
          font-size: .18rem;
          line-height: .20rem;
          font-weight: bold;
          color: #333;
          @include ellipsis2(4)
        }
      }
      .cover-author-wrapper {
        margin-top: .05rem;
        .cover-author-text {
          font-size: .14rem;
          line-height: .16rem;
          color: $color-blue;
        }
      }
      .detail-cover-description-wrapper {
        margin-top: .05rem;
        .detail-cover-description-text {
          font-size: .14rem;
          line-height: .16rem;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
          color: #666;
          word-break: keep-all;
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          overflow-wrap: break-word;
        }
      }
    }
  }
</style>
