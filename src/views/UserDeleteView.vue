<template>
  <v-container>
    <v-row class="text-h3 font-weight-bold text-center indigo--text mt-5">
      アカウント削除
    </v-row>
    <v-row class="mt-5" justify="center">
      <v-col cols="6">
        <p>以下のIDのアカウントを削除しますか？</p>
        <v-text-field
          v-model="ID"
          label="ID"
          outlined
          disabled
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-3" justify="center">
      <v-btn @click="handleDelete" dark large color="red">
        アカウントを削除
      </v-btn>
    </v-row>
    <v-row class="mt-3" justify="center">
      <p :class="deleteResultMessage.includes('成功') ? 'green--text' : 'red--text'">
        {{ deleteResultMessage }}
      </p>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'UserDeleteView',
  data() {
    return {
      ID: '',
      deleteResultMessage: '',
    };
  },
  computed: {
    ...mapGetters('users', [
      'getLoggedInUser', // ログイン中のユーザー情報を取得
    ]),
  },
  methods: {
    ...mapActions('users', [
      'deleteUser',
      'logoutUser',
    ]),
    async handleDelete() {
      if (confirm('本当にアカウントを削除してもよろしいですか？この操作は元に戻せません。')) {
        const result = await this.deleteUser(this.ID);
        this.deleteResultMessage = result.message;
        if (result.success) {
          // 削除成功後、ログアウトしてログイン画面に遷移
          this.logoutUser();
          this.$router.push({ name: 'LoginView' });
        }
      }
    },
    setUserId() {
      if (this.getLoggedInUser) {
        this.ID = this.getLoggedInUser.ID;
      }
    }
  },
  created() {
    this.setUserId();
  },
  watch: {
    getLoggedInUser(newVal) {
      if (newVal) {
        this.setUserId();
      }
    }
  }
};
</script>