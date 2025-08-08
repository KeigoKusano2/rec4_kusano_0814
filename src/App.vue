<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <div v-if="getIsLoggedIn" class="d-flex align-center">
      <span class="mr-4">ようこそ、ID:{{ getLoggedInUser ? getLoggedInUser.ID : 'ID' }} {{ getLoggedInUser ? getLoggedInUser.Name : 'ユーザー' }}さん</span>
      <v-btn text to="/users">全ユーザー表示</v-btn> 
      <v-btn text to="/user-search">1件検索</v-btn>
      <v-btn text to="/user-update">ユーザー更新</v-btn>
      <v-btn text to="/user-delete">ユーザー削除</v-btn>
       <v-btn text @click="logout">
          <span class="mr-2">ログアウト</span>
        </v-btn>
      </div>

      <div v-else>
        <v-btn text to="/">
          <span class="mr-2">ログイン</span>
        </v-btn>
        <v-btn text to="/regist">
          <span class="mr-2">新規登録</span>
        </v-btn>
      </div>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters('users', [
      'getIsLoggedIn',
      'getLoggedInUser' 
    ]),
  },
  methods: {
    ...mapActions('users', [
      'logoutUser'
    ]),
    logout() {
      if (confirm('ログアウトをしてもよろしいですか？')) {
        this.logoutUser();
        this.$router.push({ name: 'LoginView' });
      }
    }
  },
};
</script>
