<template>
  <div class="home-title-wrapper">
    <div class="label">{{label}}</div>
    <div class="btn" @click="click">{{btn}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      label: String,
      btn: String
    },
    methods: {
      click() {
        this.$emit('onClick')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .home-title-wrapper {
    position: relative;
    width: 100%;
    padding: .15rem .1rem;
    margin-top: .15rem;
    box-sizing: border-box;
    .label {
      position: absolute;
      left: 0;
      top: 0;
      font-size: .18rem;
      color: #333;
      font-weight: bold;
    }
    .btn {
      position: absolute;
      right: 0;
      top: 0;
      font-size: .14rem;
      color: rgba(64, 158, 255, 1);
      &:active {
        color: rgba(64, 158, 255, .5);
      }
    }
  }
</style>
