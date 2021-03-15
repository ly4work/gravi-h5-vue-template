<template>
  <div
    class="md-example-child md-example-child-result-page md-example-child-result-page-0"
  >
    <h2>404</h2>
    <md-result-page type="lost"> </md-result-page>
  </div>
</template>

<script>
import { ResultPage } from "mand-mobile";

export default {
  name: "result-page-demo",
  components: {
    [ResultPage.name]: ResultPage,
  },
};
</script>

<style lang="less" scoped>
h2 {
  color: #666;
  font-family: 'Courier New', Courier, monospace;
}
.md-example-child-result-page-0 {
  background: #fff;
}
</style>
