<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {}
// document.addEventListener('DOMContentLoaded', () => {
//   const html = document.querySelector('html')
//   let fonstSize = window.innerWeight / 10
//   fonstSize = fonstSize > 50 ? 50 : fonstSize
//   html.style.fontSize = fonstSize + 'px'
// })
</script>

<style lang="scss" scope>
@import "./assets/styles/global.scss";
  #app{
    // position: fixed;
    // top: 0;
    // left: 0;
    // right: 0;
    // bottom: 0;
    // z-index: 0;
    width: 100%;
    height: 100%;
    background: #7d8188;
    overflow: hidden;
  }
</style>
