<template>
  <div>
    <article v-if="is_finished">
      <p>{{ lose_count }}</p>
      <button v-if="!is_win" @click="$emit('retry')">
        Retry
      </button>
    </article>
    <article v-else>
      {{ msg }}
    </article>
  </div>
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
