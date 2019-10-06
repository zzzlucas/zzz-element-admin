<template>
  <div>
    <h1>b:</h1>
    <input type="text" v-model="bname" />
  </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["nickname"])
  },
  data() {
    return {
      bname: this.nickname
    };
  },
  methods:{
    ...mapMutations(['setNickname'])
  },
  watch: {
    nickname(val) {
      this.bname = this.nickname;
    },
    bname(val) {
      this.setNickname(val);
    }
  }
  // created() {
  //   this.$bus.$on("change", val => {
  //     this.bname = val;
  //   });
  // },
  // watch: {
  //   bname(val) {
  //     this.$bus.$emit("change", val);
  //   }
  // }
};
</script>

<style>
</style>
