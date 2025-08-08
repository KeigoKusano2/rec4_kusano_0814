<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-h3 font-weight-bold text-center indigo--text">
        新規ユーザー登録
      </v-col>
    </v-row>

    <UserRegisterForm
      ref="userForm"
      :isIdDuplicate="getIsIdDuplicate"
      :idCheckMessage="getIdCheckMessage"
      :groupOptions="getGroupOption2"
      :insertResultMessage="getInsertResultMessage"
      @id-check="handleIdCheck"
      @submit="submitData"
    />

    <v-row class="mb-3 mt-3" justify="center">
      <p>{{ getInsertResultMessage }}</p>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import UserRegisterForm from '@/components/UserRegisterForm.vue';

export default {
  name: 'UserRegisterView',
  components: {
    UserRegisterForm,
  },
  computed: {
    ...mapGetters('users', [
      'getIsIdDuplicate',
      'getIdCheckMessage',
      'getGroupOption2',
      'getInsertResultMessage',
    ]),
  },
  methods: {
    ...mapActions('users', [
    'checkIdDuplication',
    'registerUser',
    //'fetchUserGroups',
  ]),
  ...mapMutations('users', [
    'clearUserRegisterForm',
    //'setInsertResultMessage',
  ]),

    // 子コンポーネントの `id-check` イベントを受け取る
    handleIdCheck(ID) {
      this.checkIdDuplication(ID);
    },

async submitData(userData) {
    // ...
    if (!this.getIsIdDuplicate) {
        const result = await this.registerUser(userData);
        if (result.success) {
          this.$refs.userForm.clearForm();
          this.clearUserRegisterForm();
          
          // pushの代わりにreplaceを使用
          this.$router.replace({ name: 'UserSelectAllView' });
        }
    }
  },
  },
  created() {
    // コンポーネントが作成されたときにグループ情報を取得
    //this.fetchUserGroups();
  },
  beforeDestroy() {
    this.clearUserRegisterForm();
  }
};
</script>