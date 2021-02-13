<template>
  <view>
    <view class="cu-bar bg-white solid-bottom margin-top">
      <view class="action">
        <text class="cuIcon-title text-black"></text> 电气鼠
      </view>
    </view>

    <!-- <view class="cu-list menu-avatar">
      <view v-for="item in users" :key="item.account" class="cu-item">
        <image class="cu-avatar round lg" :src="item.avatar"></image>
        <view class="content">
          <view class="text-grey">{{ item.name }}</view>
          <view class="text-gray text-sm flex">
            <view class="text-cut">
              <text class="cuIcon-infofill text-red margin-right-xs"></text>
              {{ item.account }}
            </view>
          </view>
        </view>
        <view class="action" style="width: auto">
          <view class="cu-tag round bg-black">段位 {{ item.rank }}</view>
        </view>
      </view>
    </view> -->

    <view class="cu-list menu">
      <view v-for="item in users" :key="item.account" class="cu-item">
        <view class="content">
          <text class="cuIcon-title text-black"></text>
          <text class="text-grey">{{ item.name }} - {{ item.account }}</text>
        </view>
        <view class="action">
          <view class="cu-tag round bg-black light" @click="onAccountCopy(item)"
            >段位 {{ item.rank }}</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
// 装饰器
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Action, Getter, Mutation } from "vuex-class";

// 帮助函数
import { $toast } from "@/utils/message";
import { User, users } from "@/utils/mock";

@Component({})
export default class UserIndex extends Vue {
  private users = users;

  onAccountCopy(item: User) {
    uni.setClipboardData({
      data: item.account,
      success: () => $toast("复制成功"),
    });
  }
}
</script>

<style lang="scss">
</style>
