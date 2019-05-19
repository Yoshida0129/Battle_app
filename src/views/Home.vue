<template>
  <div class="home">
    <router-link to="/battle">
      <Button>
        勝負する
      </Button>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "home"
});
</script>
