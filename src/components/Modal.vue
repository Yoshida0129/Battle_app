<template lang="pug">
  section
    h1 {{ msg }}
    div(v-if="!is_win",)
      p なんで負けたか明日まで考えておいてください、
      p そしたら何か見えてくるはずです。
    p 敗北した回数:
      span {{ lose_count }}
    button(v-if="!is_win", @click="$emit('retry')") もう一度
    button(v-else, @click="$emit('retry', true)") 最初から
</template>

<script lang="ts">
export default {
  name: "modal",
  props: {
    msg: String,
    is_win: Boolean,
    is_finished: Boolean,
    lose_count: Number
  }
};
</script>

<style lang="postcss" scoped>
@import "../assets/index.postcss";
section {
  width: 500px;
  display: flex;
  flex-direction: column;
  & h1 {
    text-align: center;
  }
  & p {
    text-align: center;
    & > span {
      font-size: 1.2em;
      padding: 0 5px;
    }
  }
  & > button {
    width: 50%;
    margin: 0 auto;
    border-radius: 10px;
    @mixin btn;
  }
}
</style>
