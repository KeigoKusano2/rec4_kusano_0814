<template>
  <v-container>
    <v-row class="text-h4 font-weight-bold text-center indigo--text mt-5">
      チャットルーム (相手ID: {{ id }})
    </v-row>
    <v-row class="mt-5" justify="center">
      <v-col cols="8">
        <v-card outlined class="pa-4 chat-box">
          <div v-if="getChatMessages.length > 0">
            <div v-for="message in getChatMessages" :key="message.ID" class="my-2"
                 :class="{ 'message-right': message.Sender_id == getLoggedInUser.ID, 'message-left': message.Sender_id != getLoggedInUser.ID }">
              <v-chip :color="message.Sender_id == getLoggedInUser.ID ? 'primary' : 'grey'"
                      label
                      dark>
                ID{{ message.Sender_id }}: {{ message.Message }}
              </v-chip>
              <div class="message-timestamp">
                {{ message.Created_at }}
              </div>
            </div>
          </div>
          <div v-else>
            <p>{{ getChatErrorMessage || 'まだメッセージがありません。' }}</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" class="mt-3">
      <v-col cols="8">
        <v-text-field
          v-model="newMessage"
          label="メッセージを入力"
          outlined
          append-icon="mdi-send"
          @click:append="sendMessage"
          @keyup.enter="sendMessage"
        ></v-text-field>
      </v-col>
    </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ChatView',
  props: ['id'],
  data() {
    return {
      newMessage: ''
    };
  },
  computed: {
    ...mapGetters('users', ['getLoggedInUser']),
    ...mapGetters('chat', [
      'getChatMessages',
      'getChatErrorMessage',
    ]),
  },
  methods: {
    ...mapActions('chat', [
      'fetchChatMessages',
      'sendChatMessage', // ★ 新しいアクションをマッピング
    ]),
    async sendMessage() {
      // ログイン中のユーザー情報が存在するか確認
      if (!this.getLoggedInUser || !this.getLoggedInUser.ID) {
        console.error("ログイン中のユーザー情報が取得できませんでした。");
        return; // 処理を中断
      }
      
      if (this.newMessage.trim() === '') return;
      
      await this.sendChatMessage({
        senderId: this.getLoggedInUser.ID,
        receiverId: this.id,
        message: this.newMessage
      });

      this.newMessage = '';
      
      await this.fetchChatMessages({
        senderId: this.getLoggedInUser.ID,
        receiverId: this.id
      });
    }
  },
  async created() {
    if (this.getLoggedInUser && this.getLoggedInUser.ID && this.id) {
      await this.fetchChatMessages({
        senderId: this.getLoggedInUser.ID,
        receiverId: this.id
      });
    } else {
      console.error("ユーザー情報またはチャット相手のIDが取得できませんでした。");
    }
  },
};
</script>
<style scoped>
.chat-box {
  max-height: 500px;
  overflow-y: auto;
}

.message-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.message-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.message-timestamp {
  font-size: 0.7rem;
  color: #757575;
  margin-top: 4px;
}
</style>