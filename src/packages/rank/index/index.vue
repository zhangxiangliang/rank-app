<template>
  <view>
    <view class="cu-bar bg-white solid-bottom margin-top">
      <view class="action">
        <text class="cuIcon-title text-black"></text> 电气鼠
      </view>
    </view>

    <view class="cu-list menu-avatar">
      <view
        v-for="item in stars"
        :key="item.id"
        class="cu-item"
        @click="onAccountCopy(item)"
      >
        <image class="cu-avatar round lg" :src="item.douyin_avatar"></image>
        <view class="content">
          <text class="text-grey">{{ item.douyin_name }}</text>
          <view class="text-gray text-sm flex">
            <view class="text-cut">
              <text class="cuIcon-infofill text-red margin-right-xs"></text>
              {{ item.douyin_id }}
            </view>
          </view>
        </view>

        <view class="action" style="width: auto; margin-right: 10rpx">
          <view class="cu-tag round bg-black light">复制</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
// 装饰器
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Action, Getter, Mutation } from "vuex-class";

// 模型
import { Star } from "@/store/star";

// 帮助函数
import { $toast } from "@/utils/message";

@Component({})
export default class UserIndex extends Vue {
  // 平台模型
  @State((state) => state.star.lists) private stars!: Star[];
  @State((state) => state.star.loading) private loading!: boolean;
  @Action("star/refresh") private refresh!: Function;

  // 页面加载
  onLoad(option: any) {
    this.refresh();
  }

  // 下拉刷新
  onPullDownRefresh() {
    this.refresh();
  }

  // 复制抖音号
  onAccountCopy(item: Star) {
    uni.setClipboardData({
      data: item.douyin_id,
      success: () => $toast("复制成功"),
    });
  }
}
</script>

<style lang="scss">
</style>
