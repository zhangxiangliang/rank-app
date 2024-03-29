// 包管理
import { Module } from 'vuex';
import { RootStore, List, InitList } from '@/store';

// 数据管理
import { Video } from '@/store/video';

// 帮助函数
import { $toast } from '@/utils/message';
import { Response, $get } from '@/utils/request';

export interface StarState extends List<Star> {
};

export interface Star {
  id: number;
  douyin_id: string;
  douyin_name: string;
  douyin_avatar: string;
  douyin_link: string;

  douyin_following: number;
  douyin_follower: number;
  douyin_liked: number;
  douyin_video: number;
  douyin_like: number;

  videos: Video[];
};

export const InitStar: Star = {
  id: 0,
  douyin_id: '',
  douyin_name: '',
  douyin_avatar: '',
  douyin_link: '',

  douyin_following: 0,
  douyin_follower: 0,
  douyin_liked: 0,
  douyin_video: 0,
  douyin_like: 0,

  videos: [],
};

export const star: Module<StarState, RootStore> = {
  namespaced: true,

  state: {
    lists: [],
    page: 0,
    loading: false,
    has_next: true,
  },

  getters: {
    /**
     * 获取抖音
     */
    getItem: (state) => (id: number) => {
      return state.lists.find(item => item.id === Number(id)) || InitStar;
    },
  },

  mutations: {
    /**
     * 抖音获取
     */
    fetch(state: StarState, payload: Response<Star[]>) {
      state.page = payload.meta.current_page;
      state.loading = false;
      state.has_next = payload.meta.current_page < payload.meta.last_page;
      state.lists = (payload.meta.current_page === 1 ? payload.data : [...state.lists, ...payload.data]);
    },

    /**
     * 抖音加载
     */
    loading(state: StarState, payload: boolean) {
      state.loading = payload;
    },

    /**
     * 详情
     */
    show(state: StarState, payload: Response<Star>) {
      state.lists = state.lists.map(item => {
        return item.id !== payload.data.id ? item : payload.data;
      });

      state.lists = state.lists.length === 0 ? [payload.data] : state.lists;
    },
  },

  actions: {
    /**
     * 抖音刷新
     */
    refresh({ commit }) {
      commit('loading', true);

      return $get<Response<Star[]>>({ url: '/star', data: { page: 1 } })
        .then(res => commit('fetch', res))
        .catch(err => $toast(err.message))
        .finally(() => {
          uni.stopPullDownRefresh();
          commit('loading', false)
        });
    },

    /**
     * 抖音分页
     */
    next({ commit, state }) {
      if (!state.has_next) {
        $toast('无更多相关数据', 3000, false);
        return;
      }

      commit('loading', true);

      return $get<Response<Star[]>>({ url: '/star', data: { page: state.page + 1 } })
        .then(res => commit('fetch', res))
        .catch(err => $toast(err.message))
        .finally(() => commit('loading', false));
    },

    /**
     * 抖音详情
     */
    show({ commit }, { id }) {
      return $get<Response<Star>>({ url: `/star/${id}`, data: {} })
        .then(res => commit('show', res))
        .catch(err => $toast(err.message));
    },
  },
};

export default star;
