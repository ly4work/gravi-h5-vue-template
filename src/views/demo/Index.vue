<template>
  <div class="FlipClock">
    <FlipClock :flipStr="'ddhh'" />
    <FlipClock :flipStr="'hhiiss'" />
  </div>
</template>

<script>
import FlipClock from "./FlipClock";
export default {
  name: "demo",
  data() {
    return {
      timer: null,
      flipObjs: [],
      flipArr: [],
      titleArr: ["Days", "Hrs", "Min", "Secs"],
    };
  },
  components: { FlipClock },
  mounted() {},
};
</script>

<style lang="less"></style>
