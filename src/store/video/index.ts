// 包管理
import { Module } from 'vuex';
import { RootStore, List, InitList } from '@/store';

// 帮助函数
import { $toast } from '@/utils/message';
import { Response, $get } from '@/utils/request';

export interface VideoState extends List<Video> {
  star_id: number;
};

export interface Video {
  id: number;
  star_id: number;

  douyin_id: string;
  douyin_cover: string;
  douyin_dynamic: string;
  douyin_link: string;
  douyin_description: string;

  douyin_liked: number;
  douyin_shared: number;
  douyin_commented: number;
  liked: number;
};

export const InitStar: Video = {
  id: 0,
  star_id: 0,

  douyin_id: '',
  douyin_cover: '',
  douyin_dynamic: '',
  douyin_link: '',
  douyin_description: '',

  douyin_liked: 0,
  douyin_shared: 0,
  douyin_commented: 0,
  liked: 0,
};

export const video: Module<VideoState, RootStore> = {
  namespaced: true,

  state: {
    star_id: 0,
    page: 0,
    lists: [],
    loading: false,
    has_next: true,
  },

  getters: {
  },

  mutations: {
    /**
     * 初始化
     */
    init(state: VideoState, payload: number) {
      state.star_id = payload;
      state.page = 1;
      state.lists = [];
      state.loading = false;
      state.has_next = true;
    },

    /**
     * 视频获取
     */
    fetch(state: VideoState, payload: Response<Video[]>) {
      state.page = payload.meta.current_page;
      state.loading = false;
      state.has_next = payload.meta.current_page < payload.meta.last_page;
      state.lists = (payload.meta.current_page === 1 ? payload.data : [...state.lists, ...payload.data]);
    },

    /**
     * 视频加载
     */
    loading(state: VideoState, payload: boolean) {
      state.loading = payload;
    },
  },

  actions: {
    /**
     * 初始化
     */
    init({ commit }) {
      commit('init', 0);
    },

    /**
     * 视频刷新
     */
    refresh({ commit }, { star_id }) {
      commit('loading', true);
      commit('init', star_id);

      return $get<Response<Video[]>>({ url: `/star/${star_id}/videos`, data: { page: 1 } })
        .then(res => commit('fetch', res))
        .catch(err => $toast(err.message))
        .finally(() => {
          uni.stopPullDownRefresh();
          commit('loading', false)
        });
    },

    /**
     * 视频分页
     */
    next({ commit, state }) {
      if (!state.has_next) {
        $toast('无更多相关数据', 3000, false);
        return;
      }

      commit('loading', true);

      return $get<Response<Video[]>>({ url: `/star/${state.star_id}/videos`, data: { page: state.page + 1 } })
        .then(res => commit('fetch', res))
        .catch(err => $toast(err.message))
        .finally(() => commit('loading', false));
    },
  }
};

export default video;
