<template lang="pug">
  div.home
    p さぁ！勝負だ！
    router-link(to="/battle")
      Button 勝負する
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "home"
});
</script>
<style lang="postcss" scoped>
@import "../assets/index.postcss";
.home {
  @mixin container;
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & a {
    display: block;
    width: 100%;
    & button {
      width: 100%;
    }
  }
}
</style>
