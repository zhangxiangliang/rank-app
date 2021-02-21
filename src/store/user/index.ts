// 包管理
import { Module } from 'vuex';
import { RootStore } from '@/store';

// 帮助函数
import { $toast } from '@/utils/message';
import { Response, $post, getCodeByWechat } from '@/utils/request';

export interface UserState {
  login: boolean;
  mine: User;
};

export interface User {
  id: number;
  mobile: string;
  openid: string;
  token: string;
  avatar: string;
  username: string;
};

export const InitUser: User = {
  id: 0,
  mobile: '',
  openid: '',
  token: '',
  avatar: '',
  username: '',
};

export const user: Module<UserState, RootStore> = {
  namespaced: true,

  state: {
    login: false,
    mine: InitUser,
  },

  getters: {},

  mutations: {
    /**
     * 用户登录
     */
    login(state: UserState, payload: User) {
      state.login = true;
      state.mine = payload;
    },
  },

  actions: {
    /**
     * 用户登录
     */
    async login({ commit }: any) {
      const code = await getCodeByWechat();

      $post<Response<User>>({
        url: '/user/login',
        data: { code }
      })
        .then(res => commit('login', res.data))
        .catch(err => $toast(err.message));
    },
  },
};

export default user;
