// 包管理
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

// 模型
import user, { UserState } from '@/store/user';
import star, { StarState } from '@/store/star';

Vue.use(Vuex);

export interface List<T> {
  lists: T[];
  page: number;
  loading: boolean;
  has_next: boolean;
}

export const InitList: List<any> = {
  lists: [],
  page: 0,
  loading: false,
  has_next: true,
}

export interface RootStore {
  user: UserState;
  star: StarState;
};

export const RootStore: StoreOptions<RootStore> = {
  modules: {
    user,
    star,
  },
};

export const store = new Vuex.Store(RootStore)

export default store;
