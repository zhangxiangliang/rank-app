<template>
  <view>
    <view class="navbar">
      <view class="avatar">
        <open-data type="userAvatarUrl"></open-data>
      </view>

      <view class="text-lg">
        <open-data type="userNickName"></open-data>
      </view>

      <image mode="scaleToFill" class="gif-wave" :src="CONFIG_WAVE"> </image>
    </view>

    <view class="cu-list menu margin-bottom-xl shadow-lg">
      <view class="cu-item arrow" @click="onPriviewQrcode">
        <view class="content">
          <text class="cuIcon-appreciatefill text-red"></text>
          <text class="text-grey">赞赏支持</text>
        </view>
      </view>

      <view class="cu-item arrow">
        <view class="content">
          <text class="cuIcon-writefill text-cyan"></text>
          <text class="text-grey">联系作者</text>
          <button class="contact" open-type="contact">联系作者</button>
        </view>
      </view>

      <view class="cu-item arrow">
        <navigator class="content" :url="PAGE_LOG_INDEX" hover-class="none">
          <text class="cuIcon-formfill text-green"></text>
          <text class="text-grey">更新日志</text>
        </navigator>
      </view>
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
import {
  CONFIG_APP_NAME,
  CONFIG_QRCODE,
  CONFIG_WAVE,
  PAGE_LOG_INDEX,
  PAGE_USER_INDEX,
} from "@/config";

@Component({})
export default class PageUser extends Vue {
  public CONFIG_WAVE = CONFIG_WAVE;
  public CONFIG_QRCODE = CONFIG_QRCODE;
  public PAGE_LOG_INDEX = PAGE_LOG_INDEX;
  public CONFIG_APP_NAME = CONFIG_APP_NAME;

  // 分享页面
  onShareAppMessage() {
    return {
      title: "电气鼠喊你回家啦~",
      path: PAGE_USER_INDEX,
    };
  }

  // 赞赏码
  onPriviewQrcode() {
    uni.previewImage({
      urls: [CONFIG_QRCODE],
    });
  }
}
</script>

<style lang="scss">
.contact {
  display: inline-block;
  position: absolute;
  width: 100%;
  background: salmon;
  opacity: 0;
}
</style>
