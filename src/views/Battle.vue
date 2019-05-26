<template lang="pug">
  div#battle-form
    section.info-container(v-if="!is_finished")
      div
        p 敗北者になった回数:
          span {{ lose_count }}
        section(v-if="!is_finished")
          p 自分のHP:
            span {{ my_hp }}
          p 敵のHP:
            span {{ enemy.hp }}
      p: i.fas(:class="_enemyChoice")
    div.button-container(v-if="!is_finished")
      button(@click="_choice(1)", :disabled="is_loading")
        i.fas.fa-hand-paper.paper-icon
      button(@click="_choice(0)" :disabled="is_loading")
        i.fas.fa-hand-scissors.scissors-icon
      button(@click="_choice(2)" :disabled="is_loading")
        i.fas.fa-hand-rock.rock-icon
    div.modal-container(v-else)
      modal(:msg="msg", :is_win="is_win" :is_finished="true" :lose_count="lose_count" @retry="_retry")
      div
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
      enemy: {
        hp: 3,
        choice: 3
      },
      lose_count: 0,
      is_loading: false,
      sec: 200,
      msg: "",
      is_finished: false,
      is_win: false
    };
  },
  components: {
    Modal
  },
  computed: {
    _enemy_hp(): number {
      return this.enemy.hp;
    },
    _enemyChoice(): any {
      return {
        "fa-hand-rock rock-icon": this.enemy.choice === 0,
        "fa-hand-paper paper-icon": this.enemy.choice === 1,
        "fa-hand-scissors scissors-icon": this.enemy.choice === 2
      };
    }
  },
  watch: {
    my_hp: function() {
      if (this.my_hp <= 0) {
        this.is_finished = true;
        this.lose_count++;
        this.is_win = false;
        this.msg = "YOU LOSE";
      }
    },
    _enemy_hp: function() {
      if (this.enemy.hp <= 0) {
        this.is_finished = true;
        this.is_win = true;
        this.msg = "YOU WIN";
      }
    }
  },
  methods: {
    _choice(user_choice: number): void {
      this.is_loading = true;
      setTimeout(this._judge, this.sec, user_choice);
    },
    _judge(user_choice: number): void {
      _judgePoint(user_choice).then(({ val, ai_choice }) => {
        this.enemy.choice = ai_choice;
        if (val === 2) {
          // lose
          this.my_hp--;
        } else if (val === 1) {
          // win
          this.enemy.hp--;
        }
        this.is_loading = false;
      });
    },
    _retry(init?: boolean): void {
      this.my_hp = 3;
      this.enemy.hp = 3;
      this.enemy.choice = 3;
      this.msg = "";
      this.is_finished = false;
      if (init) {
        this.lose_count = 0;
      }
    }
  }
});
</script>
<style lang="postcss" scoped>
@import "../assets/index.postcss";

#battle-form {
  width: 500px;
  height: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.info-container {
  @mixin container;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  & div {
    width: 350px;
    text-align: right;
    padding: 0 50px;
    & span {
      font-size: 1.2em;
      padding: 0 5px;
    }
  }
  & > p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 100%;
    font-size: 30px;
    border-radius: 0 10px 10px 0;
    border-left: 1px solid rgba(0, 0, 0, 0.3);
    & i {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.button-container {
  @mixin container;
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  & button {
    width: calc(100% / 3);
    height: 100%;
    & > i {
      font-size: 30px;
    }
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
.modal-container {
  @mixin container;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & div {
    z-index: -1;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
