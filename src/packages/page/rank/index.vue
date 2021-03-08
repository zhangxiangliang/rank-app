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
        @click="onRankShow(item)"
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
          <view class="cu-tag round bg-black light">查看</view>
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
import { PAGE_RANK_INDEX, PAGE_RANK_SHOW } from "@/config";

@Component({})
export default class PageRank extends Vue {
  // 平台模型
  @State((state) => state.star.lists) private stars!: Star[];
  @State((state) => state.star.loading) private loading!: boolean;
  @Action("star/refresh") private refresh!: Function;

  // 页面加载
  onLoad(option: any) {
    this.refresh();
  }

  // 分享页面
  onShareAppMessage() {
    return {
      title: "电气鼠喊你回家啦~",
      path: PAGE_RANK_INDEX,
    };
  }

  // 下拉刷新
  onPullDownRefresh() {
    this.refresh();
  }

  // 抖音详情
  onRankShow(item: Star) {
    uni.navigateTo({ url: `${PAGE_RANK_SHOW}?id=${item.id}` });
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
