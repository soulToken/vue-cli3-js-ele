<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
     <transition name="fade-move">
          <keep-alive>
            <router-view class="viewer-detail"></router-view>
          </keep-alive>
     </transition>
  </div>
</template>

<script>
export default {
  name: "Index",
 
};
</script>
<style lang="less" scoped>
  .fade-move-enter,
  .fade-move-leave-to {
    opacity: 0;
    transform: translateX(-100px);
  }
  .fade-move-enter-to,
  .fade-move-leave {
    opacity: 1;
    transform: translateX(0);
  }
</style>
