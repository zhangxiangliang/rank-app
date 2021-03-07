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
          <image
            :src="item.douyin_dynamic"
            mode="widthFix"
            @click="onPlayVideo(item)"
          ></image>

          <view class="cu-bar bg-shadeBottom">
            <text class="text-cut">{{ item.douyin_description }}</text>
          </view>
        </view>
      </view>
    </view>

    <video
      v-if="video.id !== 0"
      :id="`video-${video.id}`"
      :src="video.douyin_link"
      :poster="video.douyin_cover"
      objectFit="contain"
      style="width: 100%; height: 0"
      controls
      @fullscreenchange="onFullScreenChange"
    ></video>

    <view
      v-if="videos.length === 0 && videosHasNext === false"
      class="text-center margin-top"
    >
      <view class="padding-lr bg-white padding-bottom">
        <view class="solid-bottom padding">
          <text class="text-black text-bold text-xl">提示</text>
        </view>
        <view class="padding">对不起，未查找到相关视频</view>
        <button class="cu-btn block bg-black lg" @click="onNavigateBack">
          返回上级
        </button>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
// 装饰器
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Action, Getter, Mutation } from "vuex-class";

// 模型
import { InitVideo, Video } from "@/store/video";
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
  @State((state) => state.video.has_next) private videosHasNext!: boolean;
  @Action("video/init") private initVideos!: Function;
  @Action("video/refresh") private refreshVideos!: Function;

  // 数据
  private state = {
    ...InitStar,
  };

  private videoContext: any = null;
  private video: Video = { ...InitVideo };

  // 页面加载
  onLoad(option: any) {
    this.initVideos();
    this.state.id = option.id;
    this.show({ id: option.id });
  }

  // 页面隐藏
  onHide() {
    if (this.videoContext) {
      this.videoContext.stop();
      this.videoContext.exitFullScreen();
      this.video = { ...InitVideo };
    }
  }

  // 页面显示
  onShow() {
    if (this.videoContext) {
      this.videoContext.stop();
      this.videoContext.exitFullScreen();
      this.video = { ...InitVideo };
    }
  }

  // 分享页面
  onShareAppMessage() {
    return {
      title: `${this.state.douyin_name}喊你回家啦~`,
      path: `${PAGE_RANK_SHOW}?id=${this.state.id}`,
    };
  }

  // 下拉刷新
  onPullDownRefresh() {
    this.onStarsChanged();
  }

  // 视频播放
  onPlayVideo(item: Video) {
    this.video = { ...item };

    uni.showLoading({ title: "加载中", mask: true });

    setTimeout(() => {
      uni.hideLoading();
      this.videoContext = uni.createVideoContext(`video-${item.id}`, this);
      this.videoContext.requestFullScreen({ direction: 0 });
      this.videoContext.play();
    }, 1000);
  }

  // 退出全屏
  onFullScreenChange(event: any) {
    if (!event.detail.fullScreen) {
      this.videoContext.stop();
      this.videoContext.exitFullScreen();
      this.video = { ...InitVideo };
    }
  }

  // 返回上级
  onNavigateBack() {
    uni.navigateBack({});
  }

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
