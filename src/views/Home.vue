<template lang="pug">
  div.home
    router-link(to="/battle")
      Button 勝負する
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "home"
});
</script>
