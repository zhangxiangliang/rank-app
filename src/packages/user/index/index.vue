<template>
  <view>
    <view class="navbar">
      <view class="avatar">
        <open-data type="userAvatarUrl"></open-data>
      </view>
      <view class="text-lg">
        <open-data type="userNickName"></open-data>
      </view>
      <view class="margin-top-sm">
        <text>陪伴您每一个夜晚</text>
      </view>

      <image mode="scaleToFill" class="gif-wave" src="@/static/avatar/wave.gif">
      </image>
    </view>
  </view>
</template>

<script lang="ts">
// 装饰器
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Action, Getter, Mutation } from "vuex-class";

// 模型
import { User } from "@/store/user";

// 帮助函数
import { CONFIG_APP_NAME } from "@/config";

@Component({})
export default class UserIndex extends Vue {
  public CONFIG_APP_NAME = CONFIG_APP_NAME;
}
</script>

<style lang="scss">
</style>
