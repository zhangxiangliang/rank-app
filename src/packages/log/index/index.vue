<template>
  <view>
    <view class="cu-timeline">
      <view v-for="item in logs" :key="item.id" class="cu-item text-green">
        <view class="bg-gradual-green content shadow">
          <view class="cu-capsule radius">
            <view class="cu-tag bg-white text-green">{{ item.version }}</view>
            <view class="cu-tag line-white">{{ item.created_at }}</view>
          </view>
          <view class="margin-top-sm text-content">
            <view v-for="(text, index) in item.content" :key="index">
              {{ index + 1 }}.{{ text }}
            </view>
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
import { Log } from "@/store/log";

// 帮助函数
import { $toast } from "@/utils/message";
import { PAGE_LOG_INDEX } from "@/config";

@Component({})
export default class UserIndex extends Vue {
  // 平台模型
  @State((state) => state.log.lists) private logs!: Log[];
  @State((state) => state.log.loading) private loading!: boolean;
  @Action("log/refresh") private refresh!: Function;

  // 页面加载
  onLoad(option: any) {
    this.refresh();
  }

  // 分享页面
  onShareAppMessage() {
    return {
      title: "电气鼠又更新啦~",
      path: PAGE_LOG_INDEX,
    };
  }

  // 下拉刷新
  onPullDownRefresh() {
    this.refresh();
  }
}
</script>

<style lang="scss">
</style>
