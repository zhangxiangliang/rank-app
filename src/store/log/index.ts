// 包管理
import { Module } from 'vuex';
import { RootStore, List, InitList } from '@/store';

// 帮助函数
import { $toast } from '@/utils/message';
import { Response, $get } from '@/utils/request';

export interface LogState extends List<Log> {
};

export interface Log {
  id: number;
  content: string[];
  create_time: string;
};

export const InitLog: Log = {
  id: 0,
  content: [],
  create_time: '',
};

export const log: Module<LogState, RootStore> = {
  namespaced: true,

  state: {
    lists: [],
    page: 0,
    loading: false,
    has_next: true,
  },

  getters: {
  },

  mutations: {
    /**
     * 平台获取
     */
    fetch(state: LogState, payload: Response<Log[]>) {
      state.page = payload.meta.current_page;
      state.loading = false;
      state.has_next = payload.meta.current_page < payload.meta.last_page;
      state.lists = (payload.meta.current_page === 1 ? payload.data : [...state.lists, ...payload.data]);
    },

    /**
     * 平台加载
     */
    loading(state: LogState, payload: boolean) {
      state.loading = payload;
    },
  },

  actions: {
    /**
     * 抖音刷新
     */
    refresh({ commit }) {
      commit('loading', true);

      return $get<Response<Log[]>>({ url: '/log', data: { page: 1 } })
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

      return $get<Response<Log[]>>({ url: '/log', data: { page: state.page + 1 } })
        .then(res => commit('fetch', res))
        .catch(err => $toast(err.message))
        .finally(() => commit('loading', false));
    },
  },
};

export default log;
