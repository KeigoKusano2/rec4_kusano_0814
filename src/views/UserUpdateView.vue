<template>
  <v-container>
    <v-row class="text-h3 font-weight-bold text-center indigo--text mt-5">
      ユーザ更新
    </v-row>
    <v-row class="mt-5" align="center" justify="center">
      <v-col cols="6">
        <v-text-field
          v-model="ID"
          label="ID"
          outlined
          type="number"
          disabled
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-0" align="center" justify="center">
      <v-col cols="6">
        <v-text-field
          v-model="Name"
          label="氏名"
          placeholder="氏名を入力…"
          outlined
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-0" align="center" justify="center">
      <v-col cols="6">
        <v-text-field
          v-model="Email"
          label="メールアドレス"
          placeholder="メールアドレスを入力…"
          outlined
          :rules="[rules.required, rules.email]"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-0" align="center" justify="center">
      <v-col cols="6">
        <v-text-field
          v-model="Phone"
          label="電話番号"
          placeholder="電話番号を入力…"
          outlined
          :rules="[rules.required, rules.phone]"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-0" align="center" justify="center">
      <v-col cols="6">
        <v-text-field
          v-model="Address"
          label="住所"
          placeholder="住所を入力…"
          outlined
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-0" align="center" justify="center">
      <v-col cols="6">
        <v-text-field
          v-model="Birth"
          label="生年月日"
          placeholder="YYYY-MM-DD"
          outlined
          :rules="[rules.required, rules.birth]"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-0" align="center" justify="center">
      <v-col cols="6">
        <v-select
          v-model="selectedGroupId"
          :items="getGroupOption2"
          item-text="label"
          item-value="value"
          label="所属を選択"
          outlined
        ></v-select>
      </v-col>
    </v-row>
    <v-row class="mt-0" align="center" justify="center">
      <v-col cols="6">
        <v-text-field
          v-model="Password"
            label="パスワードを入力 (最大10桁)"
            placeholder="パスワードを入力…"
            outlined
            
          :rules="[rules.required, rules.passwordMax]"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-3" justify="center">
      <v-btn @click="handleUpdate" dark large color="orange">
        更新
      </v-btn>
    </v-row>
    <v-row class="mt-3" justify="center">
      <p :class="updateResultMessage.includes('成功') ? 'green--text' : 'red--text'">
        {{ updateResultMessage }}
      </p>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'UserUpdateView',
  data() {
    return {
      ID: '',
      Name: '',
      Email: '',
      Phone: '',
      Address: '',
      Birth: '',
      selectedGroupId: '',
      Password: '',
      updateResultMessage: '',
      rules: {
        required: value => !!value || '必須項目です。',
        email: value => /.+@.+\..+/.test(value) || '有効なメールアドレスを入力してください。',
        phone: value => /^\d{10,11}$/.test(value) || '有効な電話番号を入力してください。',
        birth: value => /^\d{4}-\d{2}-\d{2}$/.test(value) || 'YYYY-MM-DD形式で入力してください。',
        passwordMax: value => (value && value.length <= 10) || 'パスワードは10桁以下で入力してください。',
      },
    };
  },
  computed: {
    ...mapGetters('users', [
      'getLoggedInUser',
      //'getGroupOptions',
      'getGroupOption2'
    ]),
    
  },
  methods: {
    ...mapActions('users', [
      'updateUser',
      //'fetchUserGroups',
    ]),
    async handleUpdate() {
      const userData = {
        ID: this.ID,
        Name: this.Name,
        Email: this.Email,
        Phone: this.Phone,
        Address: this.Address,
        Birth: this.Birth,
        Group: this.selectedGroupId,
        Password: this.Password,
      };
      const result = await this.updateUser(userData);
      this.updateResultMessage = result.message;
    },
    // ログイン中のユーザー情報をフォームにセット
    setUserData() {
      
      if (this.getLoggedInUser) {
        this.ID = this.getLoggedInUser.ID;
        this.Name = this.getLoggedInUser.Name;
        this.Email = this.getLoggedInUser.Email;
        this.Phone = this.getLoggedInUser.Phone;//Phone_number
        this.Address = this.getLoggedInUser.Address;
        this.Birth = this.getLoggedInUser.Birth;//Date_of_birth
        this.selectedGroupId = this.getLoggedInUser.Group;//Group_id
        this.Password = this.getLoggedInUser.Password;
      }
    }
  },
  created() {
    // コンポーネントが作成されたときにグループ情報を取得し、ユーザー情報をセットする
    /*this.fetchUserGroups().then(() => {
        this.setUserData();
    });*/
    this.setUserData();
  },
  watch: {
    // ログインユーザー情報が更新されたらフォームを再設定
    getLoggedInUser(newVal) {
      if (newVal) {
        this.setUserData();
      }
    }
  }
};
</script>