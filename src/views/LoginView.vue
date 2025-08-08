<template>
  <v-container>
    <v-row class="text-h3 font-weight-bold text-center indigo--text mt-5">
      ログイン
    </v-row>
    <v-row class="mt-5" align="center" justify="center">
      <v-col cols="6">
        <v-text-field
          v-model="ID"
          label="ID"
          placeholder="IDを入力…"
          outlined
          type="number"
          :rules="[rules.required, rules.number]"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-0" align="center" justify="center">
      <v-col cols="6">
        <v-text-field
          v-model="Password"
          label="パスワード"
          placeholder="パスワードを入力…"
          outlined
          type="password"
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-3" justify="center">
      <v-btn class="mr-4" @click="handleLogin" dark large color="indigo">
        ログイン
      </v-btn>
    </v-row>
    <v-row class="mt-3" justify="center">
      <p :class="getLoginResultMessage.includes('成功') ? 'green--text' : 'red--text'">
        {{ getLoginResultMessage }}
      </p>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'LoginView',
  data() {
    return {
      ID: '',
      Password: '',
      rules: {
        required: value => !!value || '必須項目です。',
        number: value => /^\d+$/.test(value) || '数値で入力してください。',
      },
    };
  },
  computed: {
    ...mapGetters('users', [
      'getLoginResultMessage',
    ]),
    isFormValid() {
      return (
        !!this.ID &&
        !!this.Password &&
        /^\d+$/.test(this.ID)
      );
    }
  },
  methods: {
    ...mapActions('users', [
    'loginUser',
  ]),
  async handleLogin() {
    const result = await this.loginUser({ ID: this.ID, Password: this.Password });
    if (result.success) {
      // ログイン成功後、UserSelectAllViewに遷移する
      this.$router.push({ name: 'UserSelectAllView' }); 
    }
  },
    
  },
  created() {
    this.$store.commit('users/setLoginResultMessage', '');
  }
};
</script>

<style scoped>
.green--text {
  color: green;
}
.red--text {
  color: red;
}
</style>