<template>
  <view>
    <view class="cu-list menu-avatar margin-top">
      <view class="cu-item" @click="onAccountCopy(state)">
        <image class="cu-avatar round lg" :src="state.douyin_avatar"></image>
        <view class="content">
          <text class="text-grey">{{ state.douyin_name }}</text>
          <view class="text-gray text-sm flex">
            <view class="text-cut">
              <text class="cuIcon-infofill text-red margin-right-xs"></text>
              {{ state.douyin_id }}
            </view>
          </view>
        </view>

        <view class="action" style="width: auto; margin-right: 10rpx">
          <view class="cu-tag round bg-black light">复制</view>
        </view>
      </view>
    </view>

    <view class="cu-card case no-card" v-for="item in videos" :key="item.id">
      <view class="cu-item shadow padding-bottom">
        <view class="image">
          <!-- <image :src="item.douyin_dynamic" mode="widthFix"></image> -->

          <video
            :src="item.douyin_link"
            :poster="item.douyin_cover"
            objectFit="contain"
            style="width: 100%"
            enable-danmu
            danmu-btn
            controls
          ></video>
          <view class="cu-bar bg-shadeBottom">
            <text class="text-cut">{{ item.douyin_description }}</text>
          </view>
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
import { Video } from "@/store/video";
import { InitStar, Star } from "@/store/star";

// 帮助函数
import { $toast } from "@/utils/message";
import { PAGE_RANK_INDEX, PAGE_RANK_SHOW } from "@/config";

@Component({})
export default class UserShow extends Vue {
  // 抖音模型
  @State((state) => state.star.lists) private stars!: Star[];
  @State((state) => state.star.loading) private loading!: boolean;
  @Action("star/show") private show!: Function;
  @Getter("star/getItem") private getItem!: Function;

  // 视频模型
  @State((state) => state.video.lists) private videos!: Video[];
  @State((state) => state.video.loading) private videosLoading!: boolean;
  @Action("video/init") private initVideos!: Function;
  @Action("video/refresh") private refreshVideos!: Function;

  // 数据
  private state = {
    ...InitStar,
  };

  // 页面加载
  onLoad(option: any) {
    this.initVideos();
    this.state.id = option.id;
    this.show({ id: option.id });
  }

  // 分享页面
  onShareAppMessage() {
    return {
      title: `${this.state.douyin_name}喊你回家啦~`,
      path: `${PAGE_RANK_SHOW}?id=${this.state.id}`,
    };
  }

  // 下拉刷新
  onPullDownRefresh() {}

  @Watch("stars")
  private onStarsChanged() {
    // 更新抖音
    this.state = {
      ...this.state,
      ...this.getItem(this.state.id),
    };

    // 设置标题
    uni.setNavigationBarTitle({ title: this.state.douyin_name });

    // 获取视频列表
    this.refreshVideos({ star_id: this.state.id });
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
