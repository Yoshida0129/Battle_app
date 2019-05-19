<template>
  <div>
    <button @click="_choice(1)" :disabled="is_loading">
      ぱー
    </button>
    <button @click="_choice(0)" :disabled="is_loading">
      ちょき
    </button>
    <button @click="_choice(2)" :disabled="is_loading">
      ぐー
    </button>
    {{ my_hp }}
    {{ enemy_hp }}
    <div
      @click="
        is_modal_open = false;
        is_loading = false;
        msg = '';
      "
      v-if="is_modal_open"
    >
      <modal :msg="msg" />
    </div>
    <div v-if="is_finished">
      <modal
        :msg="msg"
        :is_win="is_win"
        :is_finished="true"
        :lose_count="lose_count"
        @retry="retry"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { _judgePoint } from "@/store/judge";
import Modal from "@/components/Modal.vue";
/*
0: Rock
1: Paper
2: Scissors
 */
export default Vue.extend({
  name: "Battle",
  data() {
    return {
      my_hp: 1,
      enemy_hp: 1,
      lose_count: 0,
      is_loading: false,
      sec: 3000,
      is_modal_open: false,
      msg: "",
      is_finished: false,
      is_win: false
    };
  },
  components: {
    Modal
  },
  watch: {
    my_hp: function() {
      if (this.my_hp <= 0) {
        this.is_finished = true;
        this.lose_count++;
        this.is_win = false;
      }
    },
    enemy_hp: function() {
      if (this.enemy_hp <= 0) {
        this.is_finished = true;
        this.msg = "Win";
        this.is_win = true;
      }
    }
  },
  methods: {
    _choice(user_choice: number): void {
      this.is_loading = true;
      setTimeout(this._judge, this.sec, user_choice);
    },
    _judge(user_choice: number): void {
      _judgePoint(user_choice).then((val: number) => {
        this.is_modal_open = true;
        if (val === 2) {
          this.my_hp--;
          this.msg = "Lose";
        } else if (val === 1) {
          this.enemy_hp--;
          this.msg = "Win";
        } else {
          this.msg = "Draw";
        }
      });
    },
    retry(): void {
      this.my_hp = 1;
      this.enemy_hp = 1;
      this.is_finished = false;
      this.msg = "";
      this.is_loading = false;
    }
  }
});
</script>
