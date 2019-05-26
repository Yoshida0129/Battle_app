<template lang="pug">
  div.home
    p "貴様"は所詮...先の時代の"敗北者"じゃけェ...!!!
    div
      router-link(to="/battle")
        Button 取り消せよ、今の言葉...!!
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
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  & div {
    width: 80%;
    margin: 0 auto;
    & button {
      width: 100%;
      font-size: 15px;
      @mixin btn;
    }
  }
}
</style>
