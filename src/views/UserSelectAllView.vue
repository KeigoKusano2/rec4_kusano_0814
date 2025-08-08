<template>
  <v-container>
    <v-row class="text-h4 mb-3 mt-5" justify="center">
      全ユーザー情報
    </v-row>
    <v-row class="mb-3 mt-3" justify="center">
      <v-btn v-on:click="fetchAllUsers" dark large color="indigo">
        全検索
      </v-btn>
    </v-row>
    <v-row class="mb-3 mt-3" justify="center">
      <p>{{ getSelectAllResultMessage }}</p>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="getAllUsersList"
      item-key="ID"
      class="elevation-1"
    >
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'UserElectAllView',
  data() {
    return {
      headers: [
        // テーブルのヘッダーを定義します。これはAPIの応答に合わせて調整してください。
        { text: 'ID', value: 'ID' },
        { text: 'Name', value: 'Name' },
        { text: 'Email', value: 'Email' },
        { text: 'Phone', value: 'Phone_number' }, // APIのキー名に合わせる
        { text: 'Address', value: 'Address' },
        { text: 'Birth', value: 'Date_of_birth' }, // APIのキー名に合わせる
        { text: 'Group', value: 'Group_id' }, // APIのキー名に合わせる (グループ名表示には工夫が必要な場合があります)
        { text: 'Created At', value: 'Created_at' },
        { text: 'Updated At', value: 'Updated_at' },
      ],
    };
  },
  computed: {
    
    ...mapGetters('users', [
      'getAllUsersList',         // Vuex getter からマッピング
      'getSelectAllResultMessage', // Vuex getter からマッピング
    ]),
  },
  methods: {
    ...mapActions('users', [
      'fetchAllUsers', // Vuex action をマッピング
    ]),
  },
  created() {
    // コンポーネントが作成されたときに自動でデータを読み込む
    this.fetchAllUsers();
  }
};
</script>