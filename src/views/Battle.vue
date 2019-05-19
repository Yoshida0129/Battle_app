<template>
  <div id="battle-form">
    <p>敗北者になった回数{{ lose_count }}</p>
    <section v-if="!is_modal_open && !is_finished">
      <p>自分のHP:{{ my_hp }}</p>
      <p>敵のHP:{{ enemy_hp }}</p>
    </section>
    <div class="button-container" v-if="!is_modal_open && !is_finished">
      <button @click="_choice(1)" :disabled="is_loading">
        <i class="fas fa-hand-paper paper-icon"></i>
      </button>
      <button @click="_choice(0)" :disabled="is_loading">
        <i class="fas fa-hand-scissors scissors-icon"></i>
      </button>
      <button @click="_choice(2)" :disabled="is_loading">
        <i class="fas fa-hand-rock rock-icon"></i>
      </button>
    </div>
    <div class="modal-background" v-else></div>
    <div v-if="is_modal_open" class="modal-container">
      <modal :msg="msg" @next="_next"></modal>
    </div>
    <div v-else-if="is_finished" class="modal-container">
      <modal
        :msg="msg"
        :is_win="is_win"
        :is_finished="true"
        :lose_count="lose_count"
        @retry="_retry"
      ></modal>
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
      my_hp: 3,
      enemy_hp: 3,
      lose_count: 0,
      is_loading: false,
      sec: 200,
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
        this.msg = "YOU LOSE";
      } else {
        this.is_modal_open = true;
        this.msg = "自分に1ダメージ";
      }
    },
    enemy_hp: function() {
      if (this.enemy_hp <= 0) {
        this.is_finished = true;
        this.is_win = true;
        this.msg = "YOU WIN";
      } else {
        this.is_modal_open = true;
        this.msg = "敵に1ダメージ！";
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
        if (val === 2) {
          this.my_hp--;
        } else if (val === 1) {
          this.enemy_hp--;
        } else {
          this.msg = "Draw";
          this.is_modal_open = true;
        }
      });
    },
    _retry(init?: boolean): void {
      this.my_hp = 3;
      this.enemy_hp = 3;
      this.msg = "";
      this.is_modal_open = false;
      this.is_finished = false;
      this.is_modal_open = false;
      this.is_loading = false;
      if (init) {
        this.lose_count = 0;
      }
    },
    _next(): void {
      this.is_modal_open = false;
      this.is_finished = false;
      this.is_loading = false;
      this.msg = "";
    }
  }
});
</script>
<style lang="scss" scoped>
#battle-form {
  width: 50%;
  height: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  
}
.button-container {
  width: 80%;
  height: 30%;
  margin: 0 auto;
  > button {
    width: calc(100% / 3);
    height: calc(100% / 3);
    > i {
      font-size: 20px;
    }
  }
  .paper-icon {
    color: #aa0000;
  }
  .scissors-icon {
    color: #00aa00;
    transform: rotate(90deg) scale(1, -1);
  }
  .rock-icon {
    color: #0000aa;
  }
}
.modal-background {
  z-index: 2;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
}
.modal-container {
  width: 50%;
  height: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}
</style>
