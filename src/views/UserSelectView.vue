<template>
  <v-container>
    <v-row class="text-h4 mb-3 mt-5" justify="center">
      ユーザーをIDで検索 (1件)
    </v-row>
    <v-row class="mb-3 mt-3" align="center" justify="center">
      <v-col cols="4">
        <v-text-field
          class="ml-6 mr-6"
          v-model="searchId"
          label="検索するIDを入力"
          placeholder="IDを入力…"
          outlined
          type="number"
          :rules="[rules.required, rules.number]"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-btn v-on:click="handleSearchUserById" dark small color="blue">
          1件検索
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mb-3 mt-3" justify="center">
      <p>{{ getSearchResultMessage }}</p>
    </v-row>

    <v-row class="mb-3 mt-3" justify="center" v-if="getSearchedUser">
      <v-card class="pa-4" min-width="80%">
        <v-card-title>ID: {{ getSearchedUser.ID }} の検索結果</v-card-title>
        <v-card-text>
          <p><strong>Name:</strong> {{ getSearchedUser.Name }}</p>
          <p><strong>Email:</strong> {{ getSearchedUser.Email }}</p>
          <p><strong>Phone:</strong> {{ getSearchedUser.Phone_number }}</p>
          <p><strong>Address:</strong> {{ getSearchedUser.Address }}</p>
          <p><strong>Birth:</strong> {{ getSearchedUser.Date_of_birth }}</p>
          <p><strong>Group ID:</strong> {{ getSearchedUser.Group_id }}</p>
          <p><strong>Created:</strong> {{ getSearchedUser.Created_at }}</p>
          <p><strong>Updated:</strong> {{ getSearchedUser.Updated_at }}</p>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="startChat(getSearchedUser.ID)">
              チャットを開始
            </v-btn>
          </v-card-actions>
      </v-card>
    </v-row>

    <v-divider class="my-5"></v-divider>

    <v-row class="text-h4 mb-3" justify="center">
      チャット履歴のあるユーザー
    </v-row>
    <v-row v-if="getChatPartners.length > 0" justify="center">
      <v-col cols="8">
        <v-card outlined>
          <v-list dense>
            <v-list-item v-for="partner in getChatPartners" :key="partner.PartnerId">
              <v-list-item-content>
                <v-list-item-title>
                  ID: {{ partner.PartnerId }} - {{ partner.Name }}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn small color="primary" @click="startChat(partner.PartnerId)">
                  チャット
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else justify="center">
      <p>チャット履歴のあるユーザーはいません。</p>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'UserSelectView',
  data() {
    return {
      searchId: '',
      rules: {
        required: value => !!value || '必須項目です。',
        number: value => /^\d+$/.test(value) || '数値で入力してください。',
      },
    };
  },
  computed: {
    ...mapGetters('users', [
      'getSearchedUser',
      'getSearchResultMessage',
      'getLoggedInUser',   // ★ 追加
      'getChatPartners',   // ★ 追加
    ]),
  },
  methods: {
    ...mapActions('users', [
      'fetchUserById',
      'fetchChatPartners', // ★ 追加
    ]),
    ...mapMutations('users', [
      'clearSearchData',
    ]),

    async handleSearchUserById() {
      this.clearSearchData();
      await this.fetchUserById(this.searchId);
    },
    startChat(receiverId) {
      this.$router.push({
        name: 'ChatView',
        params: { id: receiverId }
      });
    },
  },
  async created() {
    // コンポーネントが作成された時にチャット相手のリストを取得する
    if (this.getLoggedInUser && this.getLoggedInUser.ID) {
      await this.fetchChatPartners(this.getLoggedInUser.ID);
    }
  },
  beforeDestroy() {
    this.clearSearchData();
  }
};
</script>