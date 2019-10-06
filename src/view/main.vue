<template>
  <div>
    <headerbar></headerbar>
    <section style="height:calc(100vh - 61px);display:flex;">
      <leftbar @collapse-change="changeWidth"></leftbar>
      <article
        style="padding:20px;box-sizing:border-box;overflow-y:scroll;overflow-x:hidden"
        :style="{width:'calc(100vw - '+leftWidth+'px)'}"
      >
        <router-view></router-view>
      </article>
    </section>
  </div>
</template>

<script>
import { header, left} from "@/components";
export default {
  components: {
    headerbar: header,
    leftbar: left,
  },
  data() {
    return {
      leftWidth: 201
    };
  },
  methods: {
    changeWidth(val) {
      if (val) this.leftWidth = 65;
      else this.leftWidth = 201;
    }
  }
};
</script>

<style>
</style>
