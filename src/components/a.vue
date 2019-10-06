<template>
  <div>
    <h1>a:</h1>
    <input type="text" v-model="aname" />
  </div>
</template>

<script>
import { mapState,mapMutations  } from "vuex";
export default {
  computed: {
    ...mapState(["nickname"])
  },
  data() {
    return {
      aname: this.nickname
    };
  },
  methods: {
    ...mapMutations(["setNickname"])
  },
  watch: {
    nickname(val) {
      this.aname = this.nickname;
    },
    aname(val) {
      this.setNickname(val);
    }
  }
  // watch: {
  //   aname(val) {
  //     this.$bus.$emit("change", val);
  //   }
  // },
  // created() {
  //   this.$bus.$on("change", val => {
  //     this.aname = val;
  //   });
  // }
};
</script>

<style>
</style>
