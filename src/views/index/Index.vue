<template>
  <div class="pg-index ">
    <div class="pg-tab-bar _bigscreen">
      <md-tab-bar v-model="current" :items="items" :has-ink="false">
        <template slot="item" slot-scope="{ item }">
          <div class="custom-item">
            <div class="icon">
              <md-icon size="lg" :name="item.icon" />
            </div>
            <div class="text">
              <span v-text="item.label"></span>
            </div>
          </div>
        </template>
      </md-tab-bar>
    </div>
  </div>
</template>

<script>
import { TabBar, Icon } from "mand-mobile";

export default {
  name: "tab-bar-demo",
  components: {
    [TabBar.name]: TabBar,
    [Icon.name]: Icon,
  },
  data() {
    return {
      current: 1,
      items: [
        { name: 1, label: "首页", icon: "home" },
        { name: 2, label: "验证码", icon: "mobile-phone" },
        { name: 3, label: "表单", icon: "card-bag" },
        { name: 4, label: "我的", icon: "user" },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.pg-index {
  min-height: 100vh;
  .custom-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex: 1;
    .text {
      font-size: 24px;
      margin-top: 5px;
      font-weight: bold;
    }
  }
  .pg-tab-bar {
    position: fixed;
    bottom: 0;
    width: 100vw;
    .md-tab-bar {
      padding: 0;
      padding-top: 6px;
      padding-bottom: 22px;
      background: #fff;
      box-shadow: 0px 0 15px 10px rgb(212 212 212 / 12%);
    }
    &._bigscreen {
      .md-tab-bar {
        padding-bottom: 44px;
      }
    }
  }
}
</style>
