// src/store/modules/Chat.js (新規ファイル)

import axios from 'axios';



export default {
    namespaced: true,
    state: {
        chatMessages: [],
        chatErrorMessage: '',
    },
    getters: {
        getChatMessages: (state) => state.chatMessages,
        getChatErrorMessage: (state) => state.chatErrorMessage,
    },
    mutations: {
        setChatMessages(state, messages) {
            state.chatMessages = messages;
        },
        setChatErrorMessage(state, message) {
            state.chatErrorMessage = message;
        },
    },
    actions: {
        async fetchChatMessages({ commit }, { senderId, receiverId }) {
            commit('setChatMessages', []);
            commit('setChatErrorMessage', '');
            try {   
            const url = `https://m3h-kusano-rec4.azurewebsites.net/api/SELECT_CHAT_MESSAGES?senderId=${senderId}&receiverId=${receiverId}`; 
            const response = await axios.get(url);
                let responseData = response.data;
                console.log(responseData);
                console.log(responseData.List);
                console.log(3);
                if (responseData && responseData.List && responseData.List.length > 0) {
                    commit('setChatMessages', responseData.List);
                } else {
                    commit('setChatErrorMessage', "まだメッセージがありません。");
                }
            } catch (error) {
                console.error("Fetch Chat Messages API Error:", error);
                commit('setChatErrorMessage', `メッセージ取得中にエラーが発生しました。`);
            }
        },
        
    async sendChatMessage({ commit }, { senderId, receiverId, message }) {//, rootState
        try {
            const url = 'https://m3h-kusano-rec4.azurewebsites.net/api/INSERT_Message?'; // あなたのINSERT APIのURL
            
            const payload = {
                SenderId: senderId,//rootState.users.getLoggedInUser.ID,
                ReceiveId: receiverId,
                Message: message
            };
            
            // POSTリクエストでデータを送信
            const response = await axios.post(url, payload);

            // APIレスポンスを処理
            let responseData = response.data;
            
            if (responseData && responseData.result) {
                console.log("Message sent successfully:", responseData.result);
                // 送信成功後、チャット履歴を再取得
                // ここでは、直接fetchChatMessagesを呼び出す
            } else {
                console.error("Failed to send message:", responseData.error);
                commit('setChatErrorMessage', 'メッセージの送信に失敗しました。');
            }
        } catch (error) {
            console.error("Send Message API Error:", error);
            commit('setChatErrorMessage', `メッセージ送信中にエラーが発生しました: ${error.message}`);
        }
    },    
    },
};