<script lang="ts">
// NPM
import Vue from "vue";

// 模型
import store from "./store";

// 挂载全局变量
Vue.prototype.$store = store;

export default Vue.extend({
  mpType: "app",
  onLaunch() {},
  onShow() {
    store.dispatch("user/login");
  },
  onHide() {},
});
</script>

<style>
@import "colorui/animation.css";
@import "colorui/icon.css";
@import "colorui/main.css";
@import "styles/index.scss";
</style>
