import Vue from 'vue'
import VueRouter from 'vue-router'

import UserRegisterView from '../views/UserRegisterView.vue'
import UserSelectAllView from '../views/UserSelectAllView.vue'; 
import UserSelectView from '../views/UserSelectView.vue'; 
import UserUpdateView from '../views/UserUpdateView.vue'; 
import UserDeleteView from '../views/UserDeleteView.vue';
import LoginView from '../views/LoginView.vue'; 
import ChatView from '../views/ChatView.vue'; 
import store from '../store'; // Vuexストアをインポート

Vue.use(VueRouter)

const routes = [
  {
    path: '/', // 初期画面をログイン画面に設定
    name: 'LoginView',
    component: LoginView,
  },
  {
    path: '/regist',
    name: 'UserRegisterView',
    component: UserRegisterView,
  },
  {
    path: '/users', // 例: 全ユーザー表示ページのパス
    name: 'UserSelectAllView',
    component: UserSelectAllView, // 追加
  },
  {
    path: '/user-search', // 例: 1件検索ページのパス
    name: 'user-search',
    component: UserSelectView, // 追加
  },
  {
    path: '/chat', // 例: 1件検索ページのパス
    name: 'ChatView',
    component: ChatView, // 追加
    props: true, 
    meta: { requiresAuth: true } 
  },
  {
    path: '/user-update', // 例: ユーザー更新ページのパス
    name: 'user-update',
    component: UserUpdateView, // 追加
  },
  {
    path: '/user-delete', // 例: ユーザー削除ページのパス
    name: 'user-delete',
    component: UserDeleteView, // 追加
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// グローバルナビゲーションガードの設定
router.beforeEach((to, from, next) => {
  const publicPages = ['LoginView', 'UserRegisterView']; // ログイン不要なルート
  const authRequired = !publicPages.includes(to.name);
  const loggedIn = store.getters['users/getIsLoggedIn'];

  // 新規登録成功直後の遷移を特別に許可するロジックを追加
  // fromがUserRegisterViewで、toがUserSelectAllViewの場合、loggedIn状態に関わらず許可する
  if (from.name === 'UserRegisterView' && to.name === 'UserSelectAllView') {
      next(); // 遷移を許可
      return;
  }

  if (authRequired && !loggedIn) {
    // ログインが必要で、かつログインしていない場合、ログイン画面にリダイレクト
    next({ name: 'LoginView' });
  } else {
    // ログイン済み、またはログイン不要なページへのアクセスは許可
    next();
  }
});

export default router
